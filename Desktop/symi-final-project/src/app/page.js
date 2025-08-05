'use client';

import React, { useState, useEffect } from 'react';
import { Check, ChevronDown, Clock, Users, Zap, Calendar, Key, Target, Microscope } from 'lucide-react';

// --- Page Components (Header, HeroSection, etc. are unchanged) ---
const Header = ({ onStartAudit }) => (
    <header className="absolute top-0 left-0 p-6 w-full z-20">
        <div className="container mx-auto flex justify-between items-center">
            <span className="font-semibold text-gray-800">Symi System</span>
            <div className="flex items-center space-x-4">
                <a href="#pricing" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors hidden md:inline-block">
                    Pricing
                </a>
                <button onClick={onStartAudit} className="btn btn-primary">Start Audit</button>
            </div>
        </div>
    </header>
);

const HeroSection = ({ onStartAudit }) => (
    <section className="relative w-full h-screen flex flex-col items-center justify-center text-center">
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[600px] h-[600px] bg-purple-200 rounded-full opacity-40 blur-3xl" />
        </div>
        <div className="relative z-10 px-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-gray-900">
                Turn Vision Into Living Systems
            </h1>
            <p className="max-w-2xl mx-auto mt-6 text-lg md:text-xl text-gray-600">
                The intelligent layer that transforms your goals and strategies into systems that think, act, and evolve with you.
            </p>
             <div className="mt-8">
                <button onClick={onStartAudit} className="btn btn-primary text-lg px-8 py-4">
                    Generate My Blueprint
                </button>
            </div>
        </div>
    </section>
);


const PricingSection = () => (
    <section id="pricing" className="w-full py-20">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Execution Path</h2>
                <p className="text-lg text-gray-600">
                    From personal transformation to scaling your practice—your strategy becomes a living system.
                </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
                <div className="price-card">
                    <div className="flex-grow">
                        <h3 className="text-2xl font-bold mb-2">Business Twin Starter</h3>
                        <p className="text-gray-600 mb-6">Your strategy, fully executed through an intelligent system.</p>
                        <div className="mb-6">
                            <span className="text-4xl font-bold">€1,200</span>
                            <span className="text-lg text-gray-500"> one-time setup</span>
                            <div className="text-lg text-gray-500 mt-2">+ <span className="font-bold text-gray-800">€60/month</span></div>
                        </div>
                        <ul className="space-y-3 mb-8 text-left">
                            <li className="feature-item"><Check className="checkmark" /><span><b>Core Process Mapping & Blueprint</b></span></li>
                            <li className="feature-item"><Check className="checkmark" /><span>Personalized Client Dashboard</span></li>
                            <li className="feature-item"><Check className="checkmark" /><span><b>1 Key Workflow Automation</b> (e.g., Onboarding)</span></li>
                            <li className="feature-item"><Check className="checkmark" /><span>Pre-built automations to save hours/week</span></li>
                            <li className="feature-item"><Check className="checkmark" /><span>Basic Analytics & Progress Tracking</span></li>
                            <li className="feature-item"><Check className="checkmark" /><span>Email & Chat Support</span></li>
                        </ul>
                    </div>
                    <a href="https://buy.stripe.com/00wbJ1ckk9j13PreZN9Zm01" target="_blank" rel="noopener noreferrer"
                       className="btn btn-primary w-full text-center">Activate Now</a>
                </div>
                <div className="price-card recommended">
                    <div className="flex-grow">
                        <h3 className="text-2xl font-bold mb-2">SYMI OS</h3>
                        <p className="text-gray-600 mb-6">The complete infrastructure to scale your practice with peace of mind.</p>
                        <div className="mb-6"><span className="text-4xl font-bold">From €2,500</span></div>
                        <ul className="space-y-3 mb-8 text-left">
                            <li className="feature-item"><Check className="checkmark" /><strong>Everything in Starter, plus:</strong></li>
                            <li className="feature-item"><Check className="checkmark" /><span>A-to-Z Automated Client Journey</span></li>
                            <li className="feature-item"><Check className="checkmark" /><span>Advanced Multi-Step Automations</span></li>
                            <li className="feature-item"><Check className="checkmark" /><span>Client Portal with Personalized Access</span></li>
                            <li className="feature-item"><Check className="checkmark" /><span><b>Integration with 2 External Tools</b> (e.g., Calendar, Email)</span></li>
                            <li className="feature-item"><Check className="checkmark" /><span>Dedicated System Architect Support</span></li>
                        </ul>
                    </div>
                    <a href="mailto:contact@symi.system?subject=SYMI%20OS%20Inquiry" className="btn w-full text-center">Explore SYMI OS</a>
                </div>
            </div>
        </div>
    </section>
);

const FaqSection = () => {
    const faqItems = [
        { q: "What exactly is a \"living system\"?", a: "Unlike static documents or to-do lists, SYMI creates intelligent systems that adapt, remind, optimize, and evolve based on your progress and changing needs. It's an active partner in your execution." },
        { q: "How is this different from project management tools?", a: "Project management tracks tasks. SYMI creates intelligence—systems that understand your objectives, anticipate needs, and optimize execution automatically. Think of it as the brain, while a PM tool is the to-do list." },
        { q: "What technology do you use?", a: "We build on top of powerful, no-code platforms like Airtable and Softr, which allows for rapid development, robust security, and infinite scalability without the overhead of custom-coded applications." },
        { q: "Is this for solo consultants or for teams?", a: "Both. The Business Twin Starter is perfect for solo experts looking to productize their service. SYMI OS is designed for growing teams that need a scalable infrastructure to ensure consistent delivery and client experience." },
        { q: "Can I cancel or modify my system?", a: "Yes. The monthly hosting and maintenance fee can be paused or canceled anytime. Your system is built to be flexible and can be modified or expanded as your business strategy evolves. We build for growth, not lock-in." },
    ];
    return (
        <section id="faq" className="w-full py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                </div>
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqItems.map((item, index) => (
                        <details key={index} className="faq-item bg-white/50 rounded-2xl border border-white/30 transition">
                            <summary>
                                <span>{item.q}</span>
                                <ChevronDown className="faq-icon w-5 h-5" />
                            </summary>
                            <div className="faq-content">{item.a}</div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- UPGRADED BLUEPRINT RESULTS COMPONENT ---
const BlueprintResults = ({ blueprint, onRestart }) => {
    if (!blueprint) {
        return (
            <div className="text-center py-20">
                <p>Generating your strategic paper...</p>
            </div>
        );
    }
    
    const kpiItems = [
        { icon: <Clock size={24} />, value: blueprint.kpis?.timeSavings?.value || 'N/A', label: "Hours Saved / Week" },
        { icon: <Users size={24} />, value: blueprint.kpis?.clientSuccess?.value || 'N/A', label: "Client Success Rate" },
        { icon: <Zap size={24} />, value: blueprint.kpis?.agentsDeployed?.value || 'N/A', label: "Autonomous Agents" },
        { icon: <Calendar size={24} />, value: blueprint.kpis?.timeline?.value || 'N/A', label: "Implementation Time" }
    ];

    const AnalysisCard = ({ icon, title, content }) => (
        <div className="text-left bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
                <div className="text-purple-600">{icon}</div>
                <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
            </div>
            <div className="space-y-4 whitespace-pre-wrap text-gray-700 leading-relaxed">
                {content || "No analysis available."}
            </div>
        </div>
    );

    return (
        <section id="blueprint" className="w-full py-12 md:py-20 blueprint-reveal">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="text-center">
                        <p className="text-sm uppercase tracking-widest text-purple-600">A CONFIDENTIAL STRATEGIC PAPER FOR</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4">Your Vision: "{blueprint.visionStatement}"</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {kpiItems.map(item => (
                            <div key={item.label} className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-xl p-4 text-center">
                                <div className="text-purple-600 mx-auto mb-2 w-10 h-10 flex items-center justify-center">{item.icon}</div>
                                <p className="text-2xl font-bold text-gray-800">{item.value}</p>
                                <p className="text-xs text-gray-600">{item.label}</p>
                            </div>
                        ))}
                    </div>

                    <AnalysisCard icon={<Target size={28} />} title="Executive Diagnosis" content={blueprint.executiveDiagnosis} />
                    <AnalysisCard icon={<Key size={28} />} title="IP Excavation & Asset Activation" content={blueprint.ipExcavation} />
                    <AnalysisCard icon={<Microscope size={28} />} title="Bottleneck Forensics" content={blueprint.bottleneckForensics} />
                    
                    <div className="text-center border-t border-gray-300 pt-8 mt-8">
                        <p className="text-lg italic text-gray-700">Strategic Seal:</p>
                        <p className="text-xl font-semibold text-purple-700 mt-2">"{blueprint.strategicSeal}"</p>
                    </div>

                     <div className="text-center mt-12">
                        <a href="#pricing" className="btn btn-primary text-lg px-8 py-4">View Execution Paths</a>
                    </div>
                </div>
            </div>
        </section>
    );
};


// --- Main App Component ---
export default function HomePage() {
    const [appState, setAppState] = useState('landing');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [blueprint, setBlueprint] = useState(null);
    const [error, setError] = useState(null);

    // ADDED BACK THE DEEPER QUESTIONS
    const questions = [
        { id: 'main_goal', question: 'In one sentence, what legacy do you want to create through your work?', type: 'textarea', placeholder: 'The impact I want to have is...' },
        { id: 'business_model', question: 'How do you currently monetize your expertise?', type: 'radio', options: ['Trading time for money (1:1 services)', 'Group programs/cohorts', 'Digital products/courses', 'Hybrid model (services + products)', 'Building automated client systems'] },
        { id: 'scaling_challenge', question: 'What keeps you awake at night about scaling?', type: 'radio', options: ['Client results aren\'t consistent at scale', 'Manual processes eating profitability', 'Can\'t break time-for-money constraints', 'Growth requires unsustainable personal effort', 'Don\'t know how to productize my methodology'] },
        { id: 'client_lifecycle', question: 'What is the most time-consuming part of your client lifecycle?', type: 'radio', options: ['Attracting & converting leads', 'Onboarding new clients', 'Delivering the core service/program', 'Managing ongoing client communication', 'Offboarding & collecting feedback'] },
        { id: 'biggest_asset', question: 'What is your single most valuable piece of intellectual property (e.g., a framework, a process)?', type: 'textarea', placeholder: 'e.g., My 5-step "Clarity Catalyst" framework...' },
        { id: 'tech_stack', question: 'What are the 2-3 most critical software tools you currently use?', type: 'textarea', placeholder: 'e.g., Zoom, Google Docs, Stripe...' },
        { id: 'email', question: 'Where should we send your confidential strategic paper?', type: 'email', placeholder: 'Your best email address...' }
    ];

    const handleAnswer = (questionId, value) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const validateEmail = (email) => {
        if (!email) return false;
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleNext = () => {
        const currentQ = questions[currentQuestion];
        if (!answers[currentQ.id] || answers[currentQ.id].length === 0) return;
        if (currentQ.type === 'email' && !validateEmail(answers[currentQ.id])) return;
        
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter' && appState === 'audit') {
                if (document.activeElement.tagName.toLowerCase() === 'textarea' && !e.shiftKey) {
                    e.preventDefault();
                    handleNext();
                } else if (document.activeElement.tagName.toLowerCase() !== 'textarea') {
                    e.preventDefault();
                    handleNext();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [appState, currentQuestion, answers]);

    const handleSubmit = async () => {
        setAppState('scanning');
        setError(null);

        try {
            const response = await fetch('/api/generate-blueprint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch blueprint.');
            }

            const data = await response.json();
            const parsedBlueprint = JSON.parse(data.blueprint);
            setBlueprint(parsedBlueprint);
            
        } catch (err)
        {
            console.error("Error fetching blueprint:", err);
            setError(err.message);
        } finally {
             setAppState('report');
        }
    };
    
    const handleRestart = () => {
        setAnswers({});
        setCurrentQuestion(0);
        setBlueprint(null);
        setError(null);
        setAppState('landing');
    };

    const renderAudit = () => (
        <div className="audit-container">
            <div className="w-full max-w-2xl mx-auto bg-white/50 p-6 md:p-8 rounded-2xl shadow-lg border border-white/30 question-fade-in"
                 style={{ backdropFilter: 'blur(20px)' }}>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    />
                </div>
                
                <h2 className="question-text">{questions[currentQuestion].question}</h2>
                
                <div className="mt-6">
                    {questions[currentQuestion].type === 'textarea' && (
                        <textarea
                            rows="4"
                            className="form-textarea"
                            placeholder={questions[currentQuestion].placeholder}
                            onChange={e => handleAnswer(questions[currentQuestion].id, e.target.value)}
                            value={answers[questions[currentQuestion].id] || ''}
                            autoFocus
                        />
                    )}
                    {questions[currentQuestion].type === 'email' && (
                        <input
                            type="email"
                            className="form-input"
                            placeholder={questions[currentQuestion].placeholder}
                            onChange={e => handleAnswer(questions[currentQuestion].id, e.target.value)}
                            value={answers[questions[currentQuestion].id] || ''}
                            autoFocus
                        />
                    )}
                    {questions[currentQuestion].type === 'radio' && (
                        <div className="space-y-3">
                            {questions[currentQuestion].options.map(option => (
                                <label
                                    key={option}
                                    className={`radio-option ${answers[questions[currentQuestion].id] === option ? 'selected' : ''}`}
                                >
                                    <input
                                        type="radio"
                                        name={questions[currentQuestion].id}
                                        value={option}
                                        className="sr-only"
                                        onChange={() => {
                                            handleAnswer(questions[currentQuestion].id, option);
                                            setTimeout(handleNext, 250);
                                        }}
                                        checked={answers[questions[currentQuestion].id] === option}
                                    />
                                    <span className="flex-1">{option}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-8 flex justify-between items-center">
                    {currentQuestion > 0 ? (
                        <button onClick={handleBack} className="btn nav-button">← Back</button>
                    ) : <div />}
                    <span className="question-counter">{currentQuestion + 1} / {questions.length}</span>
                    <button
                        onClick={handleNext}
                        className="btn btn-primary nav-button"
                        disabled={!answers[questions[currentQuestion].id] || answers[questions[currentQuestion].id].length === 0}
                    >
                        {currentQuestion === questions.length - 1 ? 'Generate Blueprint →' : 'Next →'}
                    </button>
                </div>
            </div>
        </div>
    );
    
    const renderScanning = () => (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="loader">
                <span className="loader-text">analyzing</span>
                <span className="load"></span>
            </div>
            <p className="font-mono text-gray-500 mt-6">Aria is composing your strategic paper...</p>
        </div>
    );

    const renderContent = () => {
        switch (appState) {
            case 'audit':
                return renderAudit();
            case 'scanning':
                return renderScanning();
            case 'report':
                 if (error) {
                    return (
                        <div className="text-center py-20">
                            <h2 className="text-2xl font-bold text-red-600">Generation Failed</h2>
                            <p className="text-gray-600 mt-4">{error}</p>
                            <button onClick={handleRestart} className="btn btn-primary mt-6">Try Again</button>
                        </div>
                    );
                }
                return (
                    <div className="pt-24"> 
                        <Header onStartAudit={handleRestart} />
                        <BlueprintResults blueprint={blueprint} onRestart={handleRestart} />
                        <PricingSection />
                        <FaqSection />
                    </div>
                );
            case 'landing':
            default:
                return (
                    <>
                        <Header onStartAudit={() => setAppState('audit')} />
                        <main>
                            <HeroSection onStartAudit={() => setAppState('audit')} />
                            <div className="container mx-auto px-6">
                               <PricingSection />
                               <FaqSection />
                            </div>
                        </main>
                    </>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 relative">
            <div className="fixed inset-0 opacity-30 -z-10">
                <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                <div className="absolute top-0 right-0 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
            </div>
            {renderContent()}
        </div>
    );
}
