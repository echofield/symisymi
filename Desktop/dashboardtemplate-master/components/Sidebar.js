"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Rocket, Users, Library, BarChart3, Settings, Sparkles } from 'lucide-react';

const navItems = [
    { href: '/', icon: Rocket, label: 'Dashboard' },
    { href: '/clients', icon: Users, label: 'Clients' },
    { href: '/content-hub', icon: Library, label: 'Content Hub' },
    { href: '/analytics', icon: BarChart3, label: 'Analytics' },
    { href: '/settings', icon: Settings, label: 'Settings' },
];

// Updated glass style for light theme
const glassStrongStyle = {
    backdropFilter: 'blur(20px)',
    background: 'rgba(255, 255, 255, 0.7)',
    border: '1px solid rgba(255, 255, 255, 0.8)',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)'
};

export default function Sidebar({ onAgentCenterClick }) {
    const pathname = usePathname();

    return (
        <aside className="p-4 w-64 flex-shrink-0">
            <div className="rounded-3xl p-6 h-full flex flex-col" style={glassStrongStyle}>
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-teal-500 rounded-full flex items-center justify-center">
                        <Rocket className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
                        SYMI OS
                    </span>
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map(item => {
                        const isActive = pathname === item.href;
                        return (
                            <Link 
                                key={item.label} 
                                href={item.href} 
                                className={`flex items-center gap-4 p-4 rounded-xl transition-all w-full ${
                                    isActive 
                                        ? 'bg-purple-50 text-purple-700 shadow-sm border border-purple-100' 
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            >
                                <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-purple-600' : ''}`} />
                                <span className="font-medium text-sm">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
                
                {/* Agent Center Button */}
                <div className="mb-4">
                    <button 
                        onClick={onAgentCenterClick} 
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-teal-500 text-white hover:from-purple-600 hover:to-teal-600 transition-all shadow-lg"
                    >
                        <Sparkles className="w-5 h-5" />
                        <span className="font-medium text-sm">Agent Center</span>
                    </button>
                </div>

                <div className="mt-2 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500">Powered by Symi</p>
                </div>
            </div>
        </aside>
    );
}