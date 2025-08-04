'use client';

import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { Clock, TrendingUp, Bot, Calendar } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

// --- UI Sub-Components ---
const KpiCard = ({ icon, title, value, color }) => (
    <div className={`relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm`}>
        <div className={`absolute -top-3 -right-3 flex h-16 w-16 items-center justify-center rounded-full opacity-20 ${color}`}>
            {icon}
        </div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
    </div>
);

const Sidebar = () => (
    <aside className="p-4 w-64 flex-shrink-0 hidden lg:flex">
        <div className="rounded-3xl p-6 h-full flex flex-col" style={{
            backdropFilter: 'blur(20px)',
            background: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 12px 40px rgba(31, 38, 135, 0.2)'
        }}>
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-teal-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
                    Your Blueprint
                </span>
            </div>
            <nav className="flex-1 space-y-2">
                 <button className="flex items-center gap-4 p-4 rounded-xl transition-colors w-full bg-white/20 text-white shadow-lg">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    <span className="font-medium text-sm">Dashboard</span>
                </button>
            </nav>
            <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-sm text-gray-700">Powered by Symi</p>
            </div>
        </div>
    </aside>
);


// --- Main Dashboard Component ---
export default function Dashboard({ data }) {
    const timelineChartData = {
        labels: data.timeline.map(item => item.milestone),
        datasets: [{
            data: data.timeline.map(item => item.duration),
            backgroundColor: 'rgba(168, 144, 254, 0.8)',
            borderColor: 'rgba(147, 120, 232, 1)',
            borderWidth: 1,
            borderRadius: 4,
        }]
    };
    const componentsChartData = {
        labels: data.components.map(item => item.name),
        datasets: [{
            data: data.components.map(item => item.weight),
            backgroundColor: ['#A890FE', '#8b5cf6', '#6d28d9', '#5b21b6'],
            hoverOffset: 4,
            borderColor: '#f9fafb',
            borderWidth: 4,
        }]
    };

    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-6">
                 <div className="bg-white/50 p-6 rounded-2xl border border-white/30 mb-8 shadow-lg" style={{ backdropFilter: 'blur(20px)' }}>
                    <h2 className="font-semibold text-lg mb-2 text-gray-800">Core Diagnosis & Strategic Objective</h2>
                    <div className="text-gray-600 space-y-4" dangerouslySetInnerHTML={{ __html: data.coreDiagnosis.replace(/\n/g, '<br />') }} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <KpiCard icon={<Clock className="w-8 h-8"/>} title="Projected Time Savings" value={data.kpis.timeSavings.value} color="bg-gradient-to-br from-purple-300 to-indigo-300" />
                    <KpiCard icon={<TrendingUp className="w-8 h-8"/>} title="Projected Client Success" value={data.kpis.clientSuccess.value} color="bg-gradient-to-br from-teal-300 to-cyan-300" />
                    <KpiCard icon={<Bot className="w-8 h-8"/>} title="Key Agents Deployed" value={data.kpis.agentsDeployed.value} color="bg-gradient-to-br from-orange-300 to-amber-300" />
                    <KpiCard icon={<Calendar className="w-8 h-8"/>} title="Implementation Timeline" value={`${data.kpis.timeline.value} wks`} color="bg-gradient-to-br from-green-300 to-lime-300" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div className="lg:col-span-3 bg-white/50 p-6 rounded-2xl border border-white/30 shadow-lg" style={{ backdropFilter: 'blur(20px)' }}>
                        <h3 className="font-semibold text-lg mb-4">Projected Implementation Roadmap</h3>
                        <Bar data={timelineChartData} options={{ indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { grid: { display: false } } } }} />
                    </div>
                    <div className="lg:col-span-2 bg-white/50 p-6 rounded-2xl border border-white/30 shadow-lg" style={{ backdropFilter: 'blur(20px)' }}>
                        <h3 className="font-semibold text-lg mb-4">Recommended System Components</h3>
                        <Doughnut data={componentsChartData} options={{ plugins: { legend: { position: 'bottom' } } }} />
                    </div>
                </div>
            </main>
        </div>
    );
};
