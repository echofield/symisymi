import { Film, FileText, Lock, Globe } from 'lucide-react';

// FIXED: Glass style for LIGHT theme (was 0.05, now 0.7)
const glassStyle = {
  backdropFilter: 'blur(10px) saturate(200%)',
  background: 'rgba(255, 255, 255, 0.7)',  // Changed from 0.05 to 0.7
  border: '1px solid rgba(255, 255, 255, 0.8)',  // Changed from 0.1 to 0.8
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',  // Added shadow for depth
};

// Mock data for content items
const contentItems = [
  { title: "Q3 Marketing Campaign Brief", type: "Document", tier: "Premium", icon: FileText, tierIcon: Lock },
  { title: "New Client Onboarding Video", type: "Video", tier: "Standard", icon: Film, tierIcon: Lock },
  { title: "Public Blog Post: 5 SEO Tips", type: "Document", tier: "Public", icon: FileText, tierIcon: Globe },
  { title: "Advanced Lead Gen Funnel", type: "Video", tier: "Premium", icon: Film, tierIcon: Lock },
  { title: "Standard Welcome Packet", type: "Document", tier: "Standard", icon: FileText, tierIcon: Lock },
];

const TierPill = ({ tier, icon: Icon }) => {
  // FIXED: Changed colors for light theme
  const styles = {
    Premium: 'bg-purple-100 text-purple-700 border border-purple-200',  // Light purple
    Standard: 'bg-blue-100 text-blue-700 border border-blue-200',       // Light blue
    Public: 'bg-gray-100 text-gray-700 border border-gray-200',         // Light gray
  };
  return (
    <span className={`px-2 py-1 text-xs rounded-full flex items-center gap-1.5 ${styles[tier]}`}>
      <Icon className="w-3 h-3" />
      {tier}
    </span>
  );
};

export default function ContentHubPage() {
  return (
    <div>
      {/* FIXED: Changed text colors for light theme */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Content Hub</h1>
      <p className="text-gray-600 mb-8 max-w-2xl">
        This is your central library for all client-facing materials. Manage your tiered content, from public-facing articles to exclusive resources for your premium clients.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentItems.map((item, index) => (
          <div key={index} className="rounded-2xl p-5 flex flex-col justify-between hover:shadow-lg transition-shadow" style={glassStyle}>
            <div>
              <div className="flex justify-between items-start mb-4">
                {/* FIXED: Icon background for light theme */}
                <div className="p-3 bg-gradient-to-br from-purple-100 to-teal-100 rounded-lg">
                  <item.icon className="w-6 h-6 text-teal-600" />
                </div>
                <TierPill tier={item.tier} icon={item.tierIcon} />
              </div>
              {/* FIXED: Text colors */}
              <h3 className="text-lg font-semibold mb-1 text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.type}</p>
            </div>
            {/* FIXED: Button for light theme */}
            <button className="mt-6 w-full py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
              Manage
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}