
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import TabLayout from "@/components/TabLayout";
import OpenIssues from "./issues/OpenIssues";
import ClosedIssues from "./issues/ClosedIssues";

const Issues = () => {
  const tabs = [
    { id: "open", name: "Open Issues", component: OpenIssues },
    { id: "closed", name: "Closed Issues", component: ClosedIssues },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Search Bar */}
      <div className="max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search issues..."
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      {/* Tab Layout */}
      <TabLayout tabs={tabs} defaultTab="open" />
    </div>
  );
};

export default Issues;
