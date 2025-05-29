
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import TabLayout from "@/components/TabLayout";
import Overview from "./projects/Overview";
import Files from "./projects/Files";

const Projects = () => {
  const tabs = [
    { id: "overview", name: "Overview", component: Overview },
    { id: "files", name: "Files", component: Files },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Search Bar */}
      <div className="max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search projects..."
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      {/* Tab Layout */}
      <TabLayout tabs={tabs} defaultTab="overview" />
    </div>
  );
};

export default Projects;
