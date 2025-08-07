import { User, Link, CreditCard, Bell } from 'lucide-react';

// Updated glass style for light theme
const glassStyle = {
  backdropFilter: 'blur(10px) saturate(200%)',
  background: 'rgba(255, 255, 255, 0.7)',
  border: '1px solid rgba(255, 255, 255, 0.8)',
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
};

const settingsCards = [
  {
    icon: User,
    title: 'Profile Management',
    description: 'Update your name, email, and password.',
  },
  {
    icon: Link,
    title: 'Integrations',
    description: 'Connect your social media, calendar, and other tools.',
  },
  {
    icon: CreditCard,
    title: 'Billing & Subscription',
    description: 'Manage your SYMI OS plan and payment methods.',
  },
  {
    icon: Bell,
    title: 'Notifications',
    description: 'Control how and when you receive alerts.',
  },
];

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Settings</h1>
      <p className="text-gray-600 mb-8 max-w-2xl">
        Manage your account, integrations, and preferences to tailor SYMI OS to your workflow.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsCards.map((card, index) => (
          <div key={index} className="rounded-2xl p-6 hover:shadow-xl transition-shadow" style={glassStyle}>
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-teal-100 rounded-lg">
                <card.icon className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{card.title}</h3>
            </div>
            <p className="text-gray-600 mb-6">{card.description}</p>
            <button className="w-full py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
              Go to Settings
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}