"use client"; // We need this to manage state for the agent panel

import { useState } from 'react';
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import AgentCenter from '@/components/AgentCenter'; // CORRECTED IMPORT PATH

const inter = Inter({ subsets: ["latin"] });

// We remove metadata from here because this is now a Client Component.
// Metadata should be defined in a parent layout or the page itself.

export default function RootLayout({ children }) {
  const [isAgentCenterOpen, setIsAgentCenterOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <title>SYMI OS | Mars</title>
        <meta name="description" content="The intelligent layer that transforms your goals and strategies into living systems." />
      </head>
      <body className={`${inter.className} text-gray-800`}>
        {/* Changed to minimalist white/light gray background */}
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
          {/* Subtle animated orbs - much lighter and less visible */}
          <div className="fixed inset-0 opacity-40 -z-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>

          {/* Optional: Add subtle dot pattern for texture */}
          <div className="fixed inset-0 -z-10" 
            style={{
              backgroundImage: `radial-gradient(circle, #e5e7eb 1px, transparent 1px)`,
              backgroundSize: '30px 30px',
              opacity: 0.2
            }}
          />

          <div className="relative z-10 flex h-screen">
            <Sidebar onAgentCenterClick={() => setIsAgentCenterOpen(true)} />
            <main className="flex-1 p-6 overflow-y-auto">
              {children}
            </main>
          </div>
          <AgentCenter isOpen={isAgentCenterOpen} onClose={() => setIsAgentCenterOpen(false)} />
        </div>
      </body>
    </html>
  );
}