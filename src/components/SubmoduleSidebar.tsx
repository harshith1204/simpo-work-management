
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface SubmoduleSidebarProps {
  activeModule: string;
  activeSubmodule: string;
  onSubmoduleSelect: (submodule: string) => void;
}

const submoduleConfig = {
  "home": [
    { id: "dashboard", name: "Dashboard", route: "/" },
    { id: "overview", name: "Overview", route: "/overview" },
    { id: "activity", name: "Recent Activity", route: "/activity" },
  ],
  "your-work": [
    { id: "summary", name: "Summary", route: "/work/summary" },
    { id: "assigned", name: "Assigned", route: "/work/assigned" },
    { id: "created", name: "Created", route: "/work/created" },
    { id: "subscribed", name: "Subscribed", route: "/work/subscribed" },
    { id: "activity", name: "Activity", route: "/work/activity" },
  ],
  "inbox": [
    { id: "all-mail", name: "All Mail", route: "/inbox/all" },
    { id: "mentions", name: "Mentions", route: "/inbox/mentions" },
    { id: "notifications", name: "Notifications", route: "/inbox/notifications" },
  ],
  "projects": [
    { id: "overview", name: "Overview", route: "/projects" },
    { id: "team", name: "Team", route: "/projects/team" },
    { id: "timeline", name: "Timeline", route: "/projects/timeline" },
    { id: "resources", name: "Resources", route: "/projects/resources" },
  ],
  "issues": [
    { id: "backlog", name: "Backlog", route: "/issues" },
    { id: "in-progress", name: "In Progress", route: "/issues/progress" },
    { id: "completed", name: "Completed", route: "/issues/completed" },
    { id: "archived", name: "Archived", route: "/issues/archived" },
  ],
  "cycles": [
    { id: "active", name: "Active Cycles", route: "/cycles/active" },
    { id: "planned", name: "Planned", route: "/cycles/planned" },
    { id: "completed", name: "Completed", route: "/cycles/completed" },
  ],
  "analytics": [
    { id: "overview", name: "Overview", route: "/analytics" },
    { id: "velocity", name: "Velocity", route: "/analytics/velocity" },
    { id: "burndown", name: "Burndown", route: "/analytics/burndown" },
    { id: "reports", name: "Reports", route: "/analytics/reports" },
  ],
  "tasks": [
    { id: "my-tasks", name: "My Tasks", route: "/tasks" },
    { id: "team-tasks", name: "Team Tasks", route: "/tasks/team" },
    { id: "priority", name: "Priority", route: "/tasks/priority" },
    { id: "upcoming", name: "Upcoming", route: "/tasks/upcoming" },
  ],
  "roadmap": [
    { id: "releases", name: "Upcoming Releases", route: "/roadmap" },
    { id: "feature-board", name: "Feature Board", route: "/roadmap/features" },
    { id: "dependencies", name: "Dependencies", route: "/roadmap/dependencies" },
  ],
  "settings": [
    { id: "general", name: "General", route: "/settings" },
    { id: "team", name: "Team", route: "/settings/team" },
    { id: "integrations", name: "Integrations", route: "/settings/integrations" },
    { id: "billing", name: "Billing", route: "/settings/billing" },
  ],
};

const SubmoduleSidebar = ({ activeModule, activeSubmodule, onSubmoduleSelect }: SubmoduleSidebarProps) => {
  const navigate = useNavigate();
  const submodules = submoduleConfig[activeModule as keyof typeof submoduleConfig] || [];

  const handleSubmoduleClick = (submodule: { id: string; name: string; route: string }) => {
    onSubmoduleSelect(submodule.id);
    navigate(submodule.route);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col font-dm-sans">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900 capitalize">
          {activeModule.replace("-", " ")}
        </h2>
      </div>

      {/* Submodules */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {submodules.map((submodule) => {
            const isActive = activeSubmodule === submodule.id;
            return (
              <li key={submodule.id}>
                <button
                  onClick={() => handleSubmoduleClick(submodule)}
                  className={cn(
                    "w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 text-left",
                    isActive
                      ? "bg-gray-100 text-gray-900 font-semibold"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <span>{submodule.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default SubmoduleSidebar;
