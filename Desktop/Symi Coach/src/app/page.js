"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// FINAL DEFINITIVE FIX: Using the src-based absolute path
const Dashboard = dynamic(() => import('@/app/components/Dashboard.js'), {
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-screen w-full"><p className="text-lg text-gray-600">Loading Dashboard...</p></div>
});

export default function HomePage() {
    const [step, setStep] = useState(0); // 0: Audit, 1: Scanning, 2: Report
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [blueprintData, setBlueprintData] = useState(null);

    const questions = [
        { id: 'main_goal', question: 'Before we begin — what transformation do you want to create for your clients?', type: 'textarea', placeholder: 'Describe the outcome you help people achieve...' },
        { id: 'business_model', question: 'How do you currently work with clients? (Select all that apply)', type: 'checkbox', options: [ 'One-on-one sessions (trading time for money)', 'Group programs (manual but scalable)', 'Digital products (automated but low-touch)', 'Mix of services and systems', 'Building toward automated client systems' ] },
        { id: 'scaling_challenge', question: 'What\'s your biggest challenge in scaling your expertise?', type: 'radio', options: [ 'Limited by hours in the day', 'Clients don\'t follow through between sessions', 'Hard to track client progress and results', 'Manual work that could be automated', 'Want to productize but don\'t know how' ] },
        { id: 'email', question: 'Where should we send your personalized Expert OS blueprint?', type: 'email', placeholder: 'Your primary email...' }
    ];

    const handleAnswer = (questionId, value) => {
        setAnswers(prev => {
            const newAnswers = { ...prev };
            if (questions[currentQuestion].type === 'checkbox') {
                const currentValues = prev[questionId] || [];
                if (currentValues.includes(value)) {
                    newAnswers[questionId] = currentValues.filter(v => v !== value);
                } else {
                    newAnswers[questionId] = [...currentValues, value];
                }
            } else {
                newAnswers[questionId] = value;
            }
            return newAnswers;
        });
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        setStep(1);
        try {
            const response = await fetch('/api/generate-blueprint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers })
            });
            if (!response.ok) throw new Error('API request failed');
            const data = await response.json();
            setBlueprintData(JSON.parse(data.blueprint));
            setStep(2);
        } catch (error) {
            console.error("Failed to generate blueprint:", error);
            setStep(0);
        }
    };

    const renderAudit = () => (
        <div className="w-full max-w-2xl bg-white/50 p-8 rounded-2xl shadow-lg border border-white/30" style={{ backdropFilter: 'blur(20px)' }}>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{questions[currentQuestion].question}</h2>
            <div className="mt-6">
                {questions[currentQuestion].type === 'textarea' && <textarea rows="4" className="form-input" placeholder={questions[currentQuestion].placeholder} onChange={e => handleAnswer(questions[currentQuestion].id, e.target.value)} />}
                {questions[currentQuestion].type === 'email' && <input type="email" className="form-input" placeholder={questions[currentQuestion].placeholder} onChange={e => handleAnswer(questions[currentQuestion].id, e.target.value)} />}
                {(questions[currentQuestion].type === 'radio' || questions[currentQuestion].type === 'checkbox') && (
                    <div className="space-y-3">
                        {questions[currentQuestion].options.map(option => (
                            <label key={option} className="block w-full cursor-pointer bg-white border-2 border-gray-200 rounded-lg p-4 text-lg text-gray-700 hover:border-purple-500 transition-colors duration-200 has-[:checked]:border-purple-600 has-[:checked]:bg-purple-50">
                                <input type={questions[currentQuestion].type} name={questions[currentQuestion].id} value={option} className="hidden" onChange={() => handleAnswer(questions[currentQuestion].id, option)} />
                                {option}
                            </label>
                        ))}
                    </div>
                )}
            </div>
            <div className="mt-8 flex justify-end">
                <button onClick={handleNext} className="btn btn-primary">
                    {currentQuestion === questions.length - 1 ? 'Generate My Blueprint →' : 'Next →'}
                </button>
            </div>
        </div>
    );

    const renderScanning = () => (
        <div className="text-center">
            <div className="loader mx-auto"><span className="loader-text">analyzing</span><span className="load"></span></div>
            <p className="font-mono text-gray-500 mt-6">Performing your Clarity Ritual...</p>
        </div>
    );

    const renderContent = () => {
        switch (step) {
            case 0: return renderAudit();
            case 1: return renderScanning();
            case 2: return <Dashboard data={blueprintData} />;
            default: return renderAudit();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 text-gray-800">
            <div className="fixed inset-0 opacity-30 -z-10">
                <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                <div className="absolute top-0 right-0 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
            </div>
            <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
                {renderContent()}
            </div>
        </div>
    );
}
