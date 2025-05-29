
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const Settings = () => {
  const [activeTab, setActiveTab] = useState<string>("");

  const tabs = [
    { id: "general", label: "General" },
    { id: "permissions", label: "Permissions" },
    { id: "billing", label: "Billing" },
    { id: "integrations", label: "Integrations" },
  ];

  return (
    <div className="flex gap-8">
      {/* Left Sidebar Navigation */}
      <div className="w-64 space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-blue-50 text-blue-600 font-semibold"
                : "text-black hover:text-blue-600 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1">
        {!activeTab ? (
          <Card className="simpo-card">
            <CardContent className="text-center py-16">
              <h3 className="text-lg font-semibold text-black mb-2">Settings</h3>
              <p className="text-gray-600">Select a setting option to begin.</p>
            </CardContent>
          </Card>
        ) : (
          <Card className="simpo-card">
            <CardContent className="py-8">
              <h3 className="text-lg font-semibold text-black mb-6 capitalize">{activeTab} Settings</h3>
              <p className="text-gray-600">
                {activeTab} configuration options will be implemented here.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Settings;
