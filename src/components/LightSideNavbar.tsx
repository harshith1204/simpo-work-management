
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

interface LightSideNavbarProps {
  activeSubmodule: string;
  onSubmoduleSelect: (submodule: string) => void;
  collapsed: boolean;
}

const modules = [
  { id: "recommended", name: "Recommended" },
  { id: "apps", name: "Apps" },
  { id: "ai-agents", name: "AI Agents" },
  { id: "workflows", name: "Workflows" },
];

const LightSideNavbar = ({ activeSubmodule, onSubmoduleSelect, collapsed }: LightSideNavbarProps) => {
  if (collapsed) return null;

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {modules.map((module) => {
            const isActive = activeSubmodule === module.id;
            return (
              <li key={module.id}>
                <button
                  onClick={() => onSubmoduleSelect(module.id)}
                  className={cn(
                    "w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left",
                    isActive
                      ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100"
                      : "text-gray-700 hover:text-blue-700 hover:bg-gray-50"
                  )}
                >
                  <span>{module.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Help and Support at bottom */}
      <div className="p-4 border-t border-gray-100">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-gray-600 hover:text-blue-700 hover:bg-gray-50 rounded-xl"
        >
          <HelpCircle className="w-4 h-4 mr-3" />
          Help and Support
        </Button>
      </div>
    </div>
  );
};

export default LightSideNavbar;
