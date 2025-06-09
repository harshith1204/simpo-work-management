
import { cn } from "@/lib/utils";
import { 
  Star,
  Grid3X3,
  Bot,
  Workflow,
  Headphones
} from "lucide-react";

interface AppsNavigationPanelProps {
  activeSection: string;
  onSectionSelect: (section: string) => void;
}

const navigationSections = [
  { id: "recommended", name: "Recommended", icon: Star },
  { id: "apps", name: "Apps", icon: Grid3X3 },
  { id: "ai-agents", name: "AI Agents", icon: Bot },
  { id: "workflow", name: Work Flow", icon: Workflow },
];

const AppsNavigationPanel = ({ activeSection, onSectionSelect }: AppsNavigationPanelProps) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col font-dm-sans">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900">App Store</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {navigationSections.map((section) => {
            const isActive = activeSection === section.id;
            const Icon = section.icon;
            return (
              <li key={section.id}>
                <button
                  onClick={() => onSectionSelect(section.id)}
                  className={cn(
                    "w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-[#271A29] text-white"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span>{section.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Help and Support at bottom */}
      <div className="p-4 border-t border-gray-100">
        <button className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200">
          <Headphones className="w-5 h-5 mr-3" />
          <span>Help and Support</span>
        </button>
      </div>
    </div>
  );
};

export default AppsNavigationPanel;
