import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { answers } = await request.json();
    if (!answers) {
      return NextResponse.json({ error: 'Invalid request: "answers" are required.' }, { status: 400 });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: 'Server configuration error: Missing API Key.' }, { status: 500 });
    }

    const SYMI_BLUEPRINT_PROMPT = `
      You are a professional Systems Analyst for Symi. Your role is to analyze a potential client's responses and generate a structured JSON object representing their strategic blueprint. Do not output any text before or after the JSON object. All projections must be logically derived from the client's answers to feel authentic.

      CLIENT'S ASSESSMENT DATA:
      - Primary Client Transformation Goal: "${answers.main_goal || 'Not specified'}"
      - Current Business Models: "${Array.isArray(answers.business_model) ? answers.business_model.join(', ') : answers.business_model || 'Not specified'}"
      - Biggest Scaling Challenge: "${answers.scaling_challenge || 'Not specified'}"

      YOUR TASK:
      Generate a JSON object with the following structure.

      {
        "coreDiagnosis": "A detailed, three-paragraph analysis. The first paragraph identifies the core challenge. The second paragraph explains the downstream effects of this challenge. The third paragraph frames this as a significant opportunity for systemic improvement. Use \\n for new paragraphs.",
        "strategicObjective": "A clear, high-level goal for a new system that directly addresses the diagnosis.",
        "kpis": {
          "timeSavings": { "value": "5-10", "unit": "hours/week" },
          "clientSuccess": { "value": "+30%", "unit": "increase" },
          "agentsDeployed": { "value": 3, "unit": "intelligent agents" },
          "timeline": { "value": 4, "unit": "weeks" }
        },
        "timeline": [
          { "milestone": "Deep Dive & Scoping", "duration": 1 },
          { "milestone": "Dashboard & Automation Build", "duration": 2 },
          { "milestone": "Delivery & Onboarding", "duration": 1 }
        ],
        "components": [
          { "name": "Automated Onboarding", "weight": 40 },
          { "name": "Progress Tracking", "weight": 30 },
          { "name": "Client Communication", "weight": 20 },
          { "name": "Resource Hub", "weight": 10 }
        ]
      }
    `;

    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: SYMI_BLUEPRINT_PROMPT }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.6,
        }
      })
    });

    if (!geminiResponse.ok) {
        throw new Error(`Gemini API failed with status: ${geminiResponse.status}`);
    }

    const data = await geminiResponse.json();
    const blueprintJSON = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!blueprintJSON) {
      throw new Error('No JSON returned from Gemini.');
    }
    
    return NextResponse.json({ blueprint: blueprintJSON });

  } catch (error) {
    console.error('Error in generate-blueprint function:', error);
    return NextResponse.json({ error: 'Failed to generate blueprint.' }, { status: 500 });
  }
}
