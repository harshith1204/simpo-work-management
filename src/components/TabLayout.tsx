
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  name: string;
  component: React.ComponentType;
}

interface TabLayoutProps {
  tabs: Tab[];
  defaultTab?: string;
}

const TabLayout = ({ tabs, defaultTab }: TabLayoutProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const activeTabComponent = tabs.find(tab => tab.id === activeTab)?.component;
  const ActiveComponent = activeTabComponent;

  return (
    <div className="flex flex-col h-full font-dm-sans">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "py-4 px-2 text-sm font-medium border-b-2 transition-colors duration-200",
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
};

export default TabLayout;
