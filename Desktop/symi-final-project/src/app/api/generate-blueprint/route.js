import { NextResponse } from 'next/server';

// Helper function to create the Gemini prompt
const createGeminiPrompt = (answers) => `
  You are Aria, a Lead Systems Architect for Symi. Your tone is professional, insightful, and strategic.
  Based on the following client data, your only task is to generate a structured JSON object.
  Do not output any text, explanation, or markdown formatting before or after the JSON object.

  **Client Data:**
  - Transformation Goal: "${answers.main_goal || 'Not specified'}"
  - Business Model: "${answers.business_model || 'Not specified'}"
  - Scaling Challenge: "${answers.scaling_challenge || 'Not specified'}"
  - Lifecycle Bottleneck: "${answers.client_lifecycle || 'Not specified'}"
  - Valuable IP: "${answers.biggest_asset || 'Not specified'}"
  - Tech Stack: "${answers.tech_stack || 'Not specified'}"

  **Generate a JSON object with this exact structure:**
  {
    "visionStatement": "A refined, one-sentence version of the client's transformation goal.",
    "executiveDiagnosis": "A detailed 2-3 paragraph analysis of the core strategic challenge, its downstream effects, and the opportunity it presents. Use \\n for paragraph breaks.",
    "ipExcavation": "A 2-paragraph analysis of the client's dormant vs. exploited IP and how to map it to their revenue engine. Use \\n for paragraph breaks.",
    "bottleneckForensics": "A 2-paragraph analysis categorizing the primary constraint (technical, human, or strategic) and its impact. Use \\n for paragraph breaks.",
    "kpis": {
      "timeSavings": { "value": "10-15", "unit": "hours/week" },
      "clientSuccess": { "value": "+25%", "unit": "increase" },
      "agentsDeployed": { "value": 4, "unit": "intelligent agents" },
      "timeline": { "value": "5", "unit": "weeks" }
    },
    "strategicSeal": "A single, powerful sentence that captures the soul of the transformation."
  }
`;

// Helper function to create the OpenAI prompt
const createOpenAIPrompt = (answers) => `
  You are Aria, a Lead Systems Architect for Symi. Your tone is professional, insightful, and strategic.
  Based on the following client data, generate a structured JSON object.
  Your response must be only the JSON object, with no additional text or markdown.

  **Client Data:**
  - Transformation Goal: "${answers.main_goal || 'Not specified'}"
  - Business Model: "${answers.business_model || 'Not specified'}"
  - Scaling Challenge: "${answers.scaling_challenge || 'Not specified'}"
  - Lifecycle Bottleneck: "${answers.client_lifecycle || 'Not specified'}"
  - Valuable IP: "${answers.biggest_asset || 'Not specified'}"
  - Tech Stack: "${answers.tech_stack || 'Not specified'}"

  **Respond with a JSON object with this exact structure:**
  {
    "visionStatement": "A refined, one-sentence version of the client's transformation goal.",
    "executiveDiagnosis": "A detailed 2-3 paragraph analysis of the core strategic challenge, its downstream effects, and the opportunity it presents. Use \\n for paragraph breaks.",
    "ipExcavation": "A 2-paragraph analysis of the client's dormant vs. exploited IP and how to map it to their revenue engine. Use \\n for paragraph breaks.",
    "bottleneckForensics": "A 2-paragraph analysis categorizing the primary constraint (technical, human, or strategic) and its impact. Use \\n for paragraph breaks.",
    "kpis": {
      "timeSavings": { "value": "10-15", "unit": "hours/week" },
      "clientSuccess": { "value": "+25%", "unit": "increase" },
      "agentsDeployed": { "value": 4, "unit": "intelligent agents" },
      "timeline": { "value": "5", "unit": "weeks" }
    },
    "strategicSeal": "A single, powerful sentence that captures the soul of the transformation."
  }
`;

export async function POST(request) {
  const { answers } = await request.json();
  if (!answers) {
    return NextResponse.json({ error: 'Invalid request: "answers" are required.' }, { status: 400 });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  try {
    // --- ATTEMPT 1: GEMINI API ---
    if (GEMINI_API_KEY) {
      try {
        console.log("Attempting to generate blueprint with Gemini...");
        const geminiPrompt = createGeminiPrompt(answers);
        const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: geminiPrompt }] }],
            generationConfig: { responseMimeType: "application/json", temperature: 0.6 }
          })
        });

        if (!geminiResponse.ok) {
          // This will trigger the catch block and initiate the fallback
          throw new Error(`Gemini API failed with status: ${geminiResponse.status}`);
        }

        const data = await geminiResponse.json();
        const blueprintJSON = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!blueprintJSON) {
          throw new Error('No content returned from Gemini.');
        }

        console.log("Successfully generated blueprint with Gemini.");
        return NextResponse.json({ blueprint: blueprintJSON });

      } catch (geminiError) {
        console.warn("Gemini generation failed, attempting fallback to OpenAI...", geminiError.message);
        // If Gemini fails, we fall through to the OpenAI attempt below
      }
    }

    // --- ATTEMPT 2: OPENAI API (FALLBACK) ---
    if (OPENAI_API_KEY) {
      try {
        console.log("Attempting to generate blueprint with OpenAI...");
        const openAIPrompt = createOpenAIPrompt(answers);
        const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: openAIPrompt }],
            response_format: { type: "json_object" },
            temperature: 0.5,
          })
        });

        if (!openAIResponse.ok) {
          throw new Error(`OpenAI API failed with status: ${openAIResponse.status}`);
        }

        const data = await openAIResponse.json();
        const blueprintJSON = data.choices?.[0]?.message?.content;

        if (!blueprintJSON) {
          throw new Error('No content returned from OpenAI.');
        }

        console.log("Successfully generated blueprint with OpenAI.");
        return NextResponse.json({ blueprint: blueprintJSON });

      } catch (openAIError) {
        console.error("OpenAI generation also failed:", openAIError.message);
        // If OpenAI also fails, we fall through to the final error
      }
    }

    // If both attempts fail, or no keys are provided
    throw new Error("All AI services failed or no API keys were provided.");

  } catch (error) {
    console.error('Error in generate-blueprint function:', error.message);
    return NextResponse.json({ error: `Failed to generate blueprint: ${error.message}` }, { status: 500 });
  }
}
