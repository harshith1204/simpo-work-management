
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
  ],
  "your-work": [
    { id: "summary", name: "Summary", route: "/work/summary" },
    { id: "assigned", name: "Assigned to me", route: "/work/assigned" },
    { id: "created", name: "Created by me", route: "/work/created" },
    { id: "subscribed", name: "Subscribed", route: "/work/subscribed" },
    { id: "activity", name: "Activity", route: "/work/activity" },
  ],
  "inbox": [
    { id: "all-messages", name: "All Messages", route: "/inbox/all" },
    { id: "mentions", name: "Mentions", route: "/inbox/mentions" },
  ],
  "projects": [
    { id: "active", name: "Active Projects", route: "/projects" },
    { id: "archived", name: "Archived Projects", route: "/projects/archived" },
  ],
  "issues": [
    { id: "open", name: "Open", route: "/issues" },
    { id: "in-progress", name: "In Progress", route: "/issues/progress" },
    { id: "closed", name: "Closed", route: "/issues/closed" },
  ],
  "cycles": [
    { id: "current", name: "Current Cycle", route: "/cycles/current" },
    { id: "past", name: "Past Cycles", route: "/cycles/past" },
  ],
  "analytics": [
    { id: "productivity", name: "Productivity", route: "/analytics" },
    { id: "burndown", name: "Burndown", route: "/analytics/burndown" },
    { id: "timelines", name: "Timelines", route: "/analytics/timelines" },
  ],
  "tasks": [
    { id: "my-tasks", name: "My Tasks", route: "/tasks" },
    { id: "team-tasks", name: "Team Tasks", route: "/tasks/team" },
    { id: "completed", name: "Completed", route: "/tasks/completed" },
  ],
  "roadmap": [
    { id: "planning", name: "Planning", route: "/roadmap" },
    { id: "releases", name: "Releases", route: "/roadmap/releases" },
  ],
  "settings": [
    { id: "team", name: "Team", route: "/settings" },
    { id: "roles", name: "Roles", route: "/settings/roles" },
    { id: "notifications", name: "Notifications", route: "/settings/notifications" },
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
