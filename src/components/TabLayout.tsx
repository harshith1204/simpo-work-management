
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
                "py-4 px-2 text-sm font-medium border-b-2 transition-all duration-200 relative",
                activeTab === tab.id
                  ? "border-[#270E2B] text-[#270E2B]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              {tab.name}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#270E2B] rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto bg-[#F9F9FB]">
        <div className="p-6">
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
    </div>
  );
};

export default TabLayout;
