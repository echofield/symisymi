import { useState } from 'react';
import { Sparkles, Bot, X, Send } from 'lucide-react';

const agents = [
  { id: 'Oracle', name: 'Oracle', description: 'Provides strategic insights.' },
  { id: 'Economist', name: 'Economist Agent (Soon)', description: 'Analyzes market trends.' },
  { id: 'Planner', name: 'Planner Agent (Soon)', description: 'Creates actionable steps.' },
];

export default function AgentCenter({ isOpen, onClose }) {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAgentSelect = (agent) => {
    if (agent.id !== 'Oracle') return;
    setSelectedAgent(agent);
    setMessages([{ text: `You are now speaking with the Oracle. What truth do you seek?`, sender: 'agent' }]);
  };

  const handleBack = () => {
    setSelectedAgent(null);
    setMessages([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      const response = await fetch(`${apiUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, agent_id: selectedAgent.id }),
      });

      if (!response.ok) throw new Error('API request failed');
      
      const data = await response.json();
      const agentMessage = { text: data.response, sender: 'agent' };
      setMessages(prev => [...prev, agentMessage]);

    } catch (error) {
      console.error("Error communicating with agent backend:", error);
      const errorMessage = { text: "Sorry, I was unable to connect to the agent.", sender: 'agent' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleQuickPrompt = (prompt) => { setInput(prompt); };

  if (!isOpen) return null;

  return (
    // Simplified styling to prevent freezing
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-end" onClick={onClose}>
      <div 
        className="w-full max-w-lg h-full p-4 flex flex-col bg-gray-900 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 flex-shrink-0">
          <h2 className="text-2xl font-bold flex items-center gap-2"><Sparkles className="text-teal-400"/>Agent Command Center</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10"><X className="w-5 h-5"/></button>
        </div>
        
        {/* This is the fully functional UI */}
        <div className="flex-grow flex flex-col bg-black/20 rounded-xl overflow-hidden border border-white/10">
          {selectedAgent ? (
            // Chat View
            <>
              <div className="p-4 border-b border-white/10 flex justify-between items-center">
                <div className='flex items-center gap-3'>
                   <Bot className="w-6 h-6 text-purple-400"/>
                   <span className="font-semibold">{selectedAgent.name}</span>
                </div>
                <button onClick={handleBack} className="text-sm text-gray-400 hover:text-white">Change Agent</button>
              </div>
              <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-purple-600' : 'bg-gray-700'}`}>
                      <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                ))}
                {isLoading && <div className="flex justify-start"><div className="px-4 py-2 rounded-2xl bg-gray-700 text-sm">...</div></div>}
              </div>
              <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
                <div className="relative">
                  <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question..."
                    className="w-full bg-gray-800 rounded-lg p-3 pr-12 text-sm focus:outline-none"
                  />
                  <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md bg-purple-600 hover:bg-purple-700 disabled:bg-gray-500">
                    <Send className="w-4 h-4"/>
                  </button>
                </div>
              </form>
            </>
          ) : (
            // Agent Selection View
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4 text-white">Select an Agent</h3>
              <div className="space-y-3">
                {agents.map(agent => (
                  <button 
                    key={agent.id} 
                    onClick={() => handleAgentSelect(agent)} 
                    disabled={agent.id !== 'Oracle'} 
                    className="w-full text-left p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center gap-4 disabled:opacity-50 disabled:hover:bg-white/5"
                  >
                    <div className="p-2 bg-gradient-to-br from-purple-500/20 to-teal-500/20 rounded-lg"><Bot className="w-6 h-6 text-purple-400"/></div>
                    <div>
                      <p className="font-semibold text-white">{agent.name}</p>
                      <p className="text-sm text-gray-400">{agent.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
