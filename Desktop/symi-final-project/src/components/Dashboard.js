'use client';

import React, { useState } from 'react';
import { Check, ChevronRight, Clock, Users, Target, Zap, BarChart, Lightbulb, ArrowRight } from 'lucide-react';

const Dashboard = ({ data, onNavigate }) => {
    // Default data if none is provided, to prevent errors on initial render or API failure
    const safeData = data || {
        userGoal: "Define Your Legacy",
        businessModel: "",
        coreDiagnosis: { challenge: "Awaiting analysis...", impact: "...", opportunity: "..." },
        kpis: { timeSavings: "0h", clientSuccess: "+0%", agents: "0", timeline: "0 wks" },
        timeline: [],
        components: [],
        recommendation: { plan: "N/A", reason: "" }
    };

    const { userGoal, businessModel, coreDiagnosis, kpis, timeline, components, recommendation } = safeData;

    // Enhanced color palette for the chart
    const chartColors = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

    const systemComponents = components.map((name, index) => ({
        name,
        value: 100 / (components.length || 1), // Distribute value evenly, avoid division by zero
        color: chartColors[index % chartColors.length]
    }));

    // Function to calculate paths for the donut chart segments
    const createDonutPath = (value, offset) => {
        const radius = 80;
        const innerRadius = 50;
        const angle = (value / 100) * Math.PI * 2;
        const largeArcFlag = angle >= Math.PI ? 1 : 0;
        
        const x1 = 100 + radius * Math.cos(offset - Math.PI / 2);
        const y1 = 100 + radius * Math.sin(offset - Math.PI / 2);
        const x2 = 100 + radius * Math.cos(offset + angle - Math.PI / 2);
        const y2 = 100 + radius * Math.sin(offset + angle - Math.PI / 2);
        
        const ix1 = 100 + innerRadius * Math.cos(offset - Math.PI / 2);
        const iy1 = 100 + innerRadius * Math.sin(offset - Math.PI / 2);
        const ix2 = 100 + innerRadius * Math.cos(offset + angle - Math.PI / 2);
        const iy2 = 100 + innerRadius * Math.sin(offset + angle - Math.PI / 2);
        
        return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${ix1} ${iy1} Z`;
    };
    let cumulativeOffset = 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
            <header className="p-6 w-full bg-white/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-200">
                <div className="container mx-auto flex justify-between items-center">
                    <button onClick={() => onNavigate && onNavigate('landing')} className="font-mono text-sm font-semibold hover:text-purple-600 transition-colors">
                        SYMI
                    </button>
                    <button onClick={() => onNavigate && onNavigate('pricing')} className="btn btn-primary hover:scale-105 transition-transform">
                        View Pricing & Plans
                    </button>
                </div>
            </header>

            <main className="container mx-auto p-4 md:p-8">
                {/* DYNAMIC: Vision/Goal Section */}
                <div className="text-center mb-12">
                    <p className="text-sm uppercase tracking-wide text-purple-600 mb-4">Your Personalized System Blueprint</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Your Vision: "{userGoal}"</h2>
                    <p className="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">Here's the strategic blueprint to bridge the gap between your current state and your ultimate goal.</p>
                </div>

                {/* DYNAMIC: Priority Action Alert */}
                {businessModel === 'Trading time for money (1:1 services)' && (
                    <div className="bg-purple-100 border-l-4 border-purple-500 text-purple-800 p-6 rounded-2xl mb-12 shadow-md max-w-4xl mx-auto">
                        <h3 className="font-bold text-xl flex items-center gap-3"><Lightbulb size={24}/> Priority Action: Productize Your Expertise</h3>
                        <p className="mt-2 text-lg">
                            Based on your 1:1 model, the highest-leverage first step is to package your knowledge into a scalable format. This blueprint focuses on creating a group program or digital product framework to break the time-for-money barrier.
                        </p>
                    </div>
                )}

                {/* KPI Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                     <div className="bg-white/60 p-6 rounded-2xl border border-white/50 shadow-lg flex items-center gap-4" style={{backdropFilter: 'blur(20px)'}}><Clock className="w-10 h-10 text-purple-500"/><div><div className="text-3xl font-bold">{kpis.timeSavings}</div><div className="text-gray-500">Hours Saved / Week</div></div></div>
                     <div className="bg-white/60 p-6 rounded-2xl border border-white/50 shadow-lg flex items-center gap-4" style={{backdropFilter: 'blur(20px)'}}><Users className="w-10 h-10 text-blue-500"/><div><div className="text-3xl font-bold">{kpis.clientSuccess}</div><div className="text-gray-500">Client Success Rate</div></div></div>
                     <div className="bg-white/60 p-6 rounded-2xl border border-white/50 shadow-lg flex items-center gap-4" style={{backdropFilter: 'blur(20px)'}}><Zap className="w-10 h-10 text-green-500"/><div><div className="text-3xl font-bold">{kpis.agents}</div><div className="text-gray-500">Autonomous Agents</div></div></div>
                     <div className="bg-white/60 p-6 rounded-2xl border border-white/50 shadow-lg flex items-center gap-4" style={{backdropFilter: 'blur(20px)'}}><Target className="w-10 h-10 text-orange-500"/><div><div className="text-3xl font-bold">{kpis.timeline}</div><div className="text-gray-500">Implementation Time</div></div></div>
                </div>
                
                {/* Core Diagnosis */}
                <div className="bg-white/60 p-8 rounded-2xl border border-white/50 shadow-lg mb-12 max-w-5xl mx-auto" style={{backdropFilter: 'blur(20px)'}}>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">Core Diagnosis</h3>
                    <div className="space-y-4 text-lg">
                        <p><strong>Challenge:</strong> {coreDiagnosis.challenge}</p>
                        <p><strong>Impact:</strong> {coreDiagnosis.impact}</p>
                        <p><strong>Opportunity:</strong> <span className="text-green-600 font-semibold">{coreDiagnosis.opportunity}</span></p>
                    </div>
                </div>

                {/* Roadmap & System Components */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Roadmap */}
                    <div className="lg:col-span-2 bg-white/60 p-8 rounded-2xl border border-white/50 shadow-lg" style={{backdropFilter: 'blur(20px)'}}>
                       <h3 className="text-2xl font-bold mb-6 text-gray-800">Your Implementation Roadmap</h3>
                       <div className="space-y-4">
                           {timeline.map((item, index) => (
                               <div key={index} className="flex items-start">
                                   <div className="flex flex-col items-center mr-4">
                                       <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">{index + 1}</div>
                                       {index < timeline.length - 1 && <div className="w-0.5 h-12 bg-purple-200 mt-1"></div>}
                                   </div>
                                   <div className="bg-white p-4 rounded-lg flex-1 border border-gray-200">
                                       <p className="font-semibold text-gray-800">{item}</p>
                                   </div>
                               </div>
                           ))}
                       </div>
                    </div>
                    {/* System Components */}
                    <div className="bg-white/60 p-8 rounded-2xl border border-white/50 shadow-lg" style={{backdropFilter: 'blur(20px)'}}>
                        <h3 className="text-2xl font-bold mb-6 text-gray-800">Your System Components</h3>
                        <div className="relative flex justify-center items-center">
                            <svg viewBox="0 0 200 200" className="w-56 h-56 transform -rotate-90">
                                {systemComponents.map((component, index) => {
                                    const path = createDonutPath(component.value, cumulativeOffset);
                                    cumulativeOffset += (component.value / 100) * Math.PI * 2;
                                    return <path key={index} d={path} fill={component.color} />;
                                })}
                            </svg>
                            <div className="absolute text-center transform rotate-90">
                                <span className="text-4xl font-bold text-gray-800">{components.length}</span>
                                <p className="text-gray-500">Core Modules</p>
                            </div>
                        </div>
                        <ul className="mt-6 space-y-3">
                            {systemComponents.map((component, index) => (
                                <li key={index} className="flex items-center text-gray-700">
                                    <span className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: component.color }}></span>
                                    {component.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-16 bg-white/60 p-10 rounded-2xl max-w-4xl mx-auto border border-white/50 shadow-xl" style={{backdropFilter: 'blur(20px)'}}>
                    <h3 className="text-3xl font-bold text-gray-800">Ready to build your living system?</h3>
                    <p className="text-lg text-gray-600 mt-4">Based on your audit, the <strong className="text-purple-600">{recommendation.plan}</strong> is your recommended path forward.</p>
                    <p className="text-gray-500 mt-2">{recommendation.reason}</p>
                    <button onClick={() => onNavigate && onNavigate('pricing')} className="btn btn-primary text-lg px-8 py-4 mt-8 group">
                        Activate Your Blueprint <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
