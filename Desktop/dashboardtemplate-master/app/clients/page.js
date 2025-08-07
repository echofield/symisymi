"use client";

import { useState } from 'react';
import { clients } from '@/components/clients/mock-data';
import { ChevronRight, MessageSquare, CheckCircle, AlertTriangle, Star } from 'lucide-react';

// Main component for the Clients Page
export default function ClientsPage() {
  const [selectedClient, setSelectedClient] = useState(clients[0]);

  const getStatusPill = (status) => {
    switch (status) {
      case 'On Track':
        return <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full flex items-center gap-1"><CheckCircle className="w-3 h-3"/>{status}</span>;
      case 'At Risk':
        return <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full flex items-center gap-1"><AlertTriangle className="w-3 h-3"/>{status}</span>;
      case 'New':
        return <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full flex items-center gap-1"><Star className="w-3 h-3"/>{status}</span>;
      default:
        return <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">{status}</span>;
    }
  };

  // Updated glass style for light theme
  const glassStyle = {
    backdropFilter: 'blur(10px) saturate(200%)',
    background: 'rgba(255, 255, 255, 0.7)',
    border: '1px solid rgba(255, 255, 255, 0.8)',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Clients Command Center</h1>
      <div className="flex gap-6 h-[calc(100vh-120px)]">
        
        {/* Left Panel: Client List */}
        <div className="w-1/3 rounded-2xl p-4 flex flex-col" style={glassStyle}>
          <h2 className="text-xl font-semibold mb-4 px-2 text-gray-800">All Clients ({clients.length})</h2>
          <ul className="space-y-2 overflow-y-auto pr-2">
            {clients.map(client => (
              <li key={client.id}>
                <button
                  onClick={() => setSelectedClient(client)}
                  className={`w-full text-left p-3 rounded-lg flex items-center gap-4 transition-colors ${
                    selectedClient.id === client.id ? 'bg-purple-50 border border-purple-200' : 'hover:bg-gray-50'
                  }`}
                >
                  <img src={client.avatar} alt={client.name} className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{client.name}</p>
                    <p className="text-sm text-gray-500">{client.plan}</p>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${selectedClient.id === client.id ? 'translate-x-1 text-purple-600' : ''}`} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Panel: Client Detail */}
        <div className="w-2/3 rounded-2xl p-6" style={glassStyle}>
          {selectedClient && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <img src={selectedClient.avatar} alt={selectedClient.name} className="w-16 h-16 rounded-full" />
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-gray-800">{selectedClient.name}</h2>
                    {getStatusPill(selectedClient.status)}
                  </div>
                  <p className="text-gray-500">Last contact: {selectedClient.lastContact}</p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Plan Progress: {selectedClient.plan}</h3>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-teal-500 h-4 rounded-full" 
                    style={{ width: `${selectedClient.progress}%` }}
                  ></div>
                </div>
                <p className="text-right text-sm text-gray-600 mt-1">{selectedClient.progress}% Complete</p>
              </div>

              {/* AI Prompting Section */}
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-800">
                  <MessageSquare className="w-5 h-5 text-teal-600"/>
                  AI-Powered Message Prompt
                </h3>
                <p className="text-sm text-gray-500 mb-4">Draft a personalized message based on recent activity.</p>
                <textarea 
                  className="w-full h-32 p-3 rounded-lg bg-white border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder={`e.g., "Congratulate ${selectedClient.name} on their progress..."`}
                ></textarea>
                <button className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-teal-600 text-white rounded-lg hover:from-purple-700 hover:to-teal-700 transition-all font-semibold shadow-lg">
                  Generate & Send
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}