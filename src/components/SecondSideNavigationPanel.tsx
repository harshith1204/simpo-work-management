
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface SecondSideNavigationPanelProps {
  activeModule: string;
  activeSubmodule: string;
  onSubmoduleSelect: (submodule: string) => void;
}

const workManagementModules = [
  { id: "home", name: "Home", route: "/" },
  { id: "your-work", name: "Your Work", route: "/work/summary" },
  { id: "inbox", name: "Inbox", route: "/inbox/all" },
  { id: "projects", name: "Projects", route: "/projects" },
  { id: "issues", name: "Issues", route: "/issues" },
  { id: "cycles", name: "Cycles", route: "/cycles/active" },
  { id: "analytics", name: "Analytics", route: "/analytics" },
  { id: "tasks", name: "Tasks", route: "/tasks" },
  { id: "roadmap", name: "Roadmap", route: "/roadmap" },
  { id: "settings", name: "Settings", route: "/settings" },
];

const hrmsModules = [
  { id: "hrms-home", name: "Dashboard", route: "/hrms" },
  { id: "company-setup", name: "Company Setup", route: "/hrms/company-setup" },
  { id: "employee-master", name: "Employee Master", route: "/hrms/employees" },
  { id: "leave-management", name: "Leave Management", route: "/hrms/leave" },
  { id: "attendance", name: "Attendance", route: "/hrms/attendance" },
  { id: "payroll", name: "Payroll", route: "/hrms/payroll" },
  { id: "compliance", name: "Compliance", route: "/hrms/compliance" },
  { id: "documents", name: "Documents", route: "/hrms/documents" },
  { id: "reports", name: "Reports", route: "/hrms/reports" },
  { id: "permissions", name: "Permissions", route: "/hrms/permissions" },
];

const attendanceModules = [
  { id: "attendance-dashboard", name: "Dashboard", route: "/attendance" },
  { id: "my-attendance", name: "My Attendance", route: "/attendance/my-attendance" },
  { id: "team-attendance", name: "Team Attendance", route: "/attendance/team" },
  { id: "requests", name: "Requests", route: "/attendance/requests" },
  { id: "shift-management", name: "Shift Management", route: "/attendance/shifts" },
  { id: "attendance-settings", name: "Settings", route: "/attendance/settings" },
];

const crmModules = [
  { id: "leads", name: "Leads", route: "/crm/leads" },
  { id: "contacts", name: "Contacts", route: "/crm/contacts" },
  { id: "accounts", name: "Accounts", route: "/crm/accounts" },
  { id: "opportunities", name: "Opportunities", route: "/crm/opportunities" },
  { id: "tasks", name: "Tasks", route: "/crm/tasks" },
  { id: "meetings", name: "Meetings", route: "/crm/meetings" },
  { id: "analytics", name: "Analytics", route: "/crm/analytics" },
  { id: "reports", name: "Reports", route: "/crm/reports" },
];

const payrollModules = [
  { id: "payroll-dashboard", name: "Dashboard", route: "/payroll" },
  { id: "payroll-processing", name: "Process Payroll", route: "/payroll/process" },
  { id: "statutory-reports", name: "Statutory Reports", route: "/payroll/reports" },
  { id: "settings", name: "Settings", route: "/payroll/settings" },
];

const getModulesForActiveModule = (activeModule: string) => {
  switch (activeModule) {
    case "work-management":
      return workManagementModules;
    case "hrms":
      return hrmsModules;
    case "attendance":
      return attendanceModules;
    case "crm":
      return crmModules;
    case "payroll":
      return payrollModules;
    default:
      return [];
  }
};

const SecondSideNavigationPanel = ({ activeModule, activeSubmodule, onSubmoduleSelect }: SecondSideNavigationPanelProps) => {
  const navigate = useNavigate();
  const modules = getModulesForActiveModule(activeModule);

  const handleSubmoduleClick = (submodule: { id: string; name: string; route: string }) => {
    onSubmoduleSelect(submodule.id);
    navigate(submodule.route);
  };

  // Don't render if no modules
  if (modules.length === 0) {
    return null;
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col font-dm-sans">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900 capitalize">
          {activeModule.replace("-", " ")}
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {modules.map((module) => {
            const isActive = activeSubmodule === module.id;
            return (
              <li key={module.id}>
                <button
                  onClick={() => handleSubmoduleClick(module)}
                  className={cn(
                    "w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 text-left",
                    isActive
                      ? "bg-gray-100 text-gray-900 font-semibold"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <span>{module.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default SecondSideNavigationPanel;
