import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MainSidebar from "./MainSidebar";
import SubmoduleSidebar from "./SubmoduleSidebar";
import Header from "./Header";
import TopNavbar from "./TopNavbar";
import PayrollManagement from "@/pages/PayrollManagement";

const Layout = () => {
  const [activeModule, setActiveModule] = useState("work-management");
  const [activeSubmodule, setActiveSubmodule] = useState("your-work");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [payrollInstalled, setPayrollInstalled] = useState(false);
  const [showPayrollApp, setShowPayrollApp] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    
    // Update active module and submodule based on current path
    if (path.startsWith("/hrms")) {
      setActiveModule("hrms");
      if (path === "/hrms") {
        setActiveSubmodule("hrms-home");
      } else if (path.startsWith("/hrms/company-setup")) {
        setActiveSubmodule("company-setup");
      } else if (path.startsWith("/hrms/employees")) {
        setActiveSubmodule("employee-master");
      } else if (path.startsWith("/hrms/leave")) {
        setActiveSubmodule("leave-management");
      } else if (path.startsWith("/hrms/attendance")) {
        setActiveSubmodule("attendance");
      } else if (path.startsWith("/hrms/payroll")) {
        setActiveSubmodule("payroll");
      } else if (path.startsWith("/hrms/compliance")) {
        setActiveSubmodule("compliance");
      } else if (path.startsWith("/hrms/documents")) {
        setActiveSubmodule("documents");
      } else if (path.startsWith("/hrms/reports")) {
        setActiveSubmodule("hrms-reports");
      } else if (path.startsWith("/hrms/permissions")) {
        setActiveSubmodule("role-permissions");
      }
    } else {
      setActiveModule("work-management");
      // Update active submodule based on current path
      if (path === "/" || path.startsWith("/work")) {
        setActiveSubmodule("your-work");
      } else if (path.startsWith("/inbox")) {
        setActiveSubmodule("inbox");
      } else if (path.startsWith("/projects")) {
        setActiveSubmodule("projects");
      } else if (path.startsWith("/issues")) {
        setActiveSubmodule("issues");
      } else if (path.startsWith("/cycles")) {
        setActiveSubmodule("cycles");
      } else if (path.startsWith("/analytics")) {
        setActiveSubmodule("analytics");
      } else if (path.startsWith("/tasks")) {
        setActiveSubmodule("tasks");
      } else if (path.startsWith("/roadmap")) {
        setActiveSubmodule("roadmap");
      } else if (path.startsWith("/settings")) {
        setActiveSubmodule("settings");
      }
    }
  }, [location.pathname]);

  const handleModuleSelect = (module: string) => {
    if (module === "payroll") {
      setShowPayrollApp(true);
      setActiveModule(module);
    } else {
      setShowPayrollApp(false);
      setActiveModule(module);
      // Navigate to the appropriate route based on module
      if (module === "hrms") {
        navigate("/hrms");
      } else if (module === "work-management") {
        navigate("/");
      }
    }
  };

  const handleInstallPayroll = () => {
    setPayrollInstalled(true);
  };

  const handleBackToApps = () => {
    setShowPayrollApp(false);
    setActiveModule("work-management");
    navigate("/");
  };

  const handleNavigateToEmployees = () => {
    setShowPayrollApp(false);
    setActiveModule("hrms");
    setActiveSubmodule("employee-master");
    navigate("/hrms/employees");
  };

  if (showPayrollApp) {
    return (
      <div className="min-h-screen bg-[#F9F9FB] flex flex-col w-full font-dm-sans">
        <TopNavbar 
          onInstallPayroll={handleInstallPayroll}
          isPayrollInstalled={payrollInstalled}
        />
        <div className="flex flex-1">
          <MainSidebar 
            activeModule={activeModule} 
            onModuleSelect={handleModuleSelect}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            payrollInstalled={payrollInstalled}
          />
          <div className="flex-1 overflow-auto">
            <PayrollManagement 
              onBack={handleBackToApps}
              onNavigateToEmployees={handleNavigateToEmployees}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9FB] flex flex-col w-full font-dm-sans">
      <TopNavbar 
        onInstallPayroll={handleInstallPayroll}
        isPayrollInstalled={payrollInstalled}
      />
      <div className="flex flex-1">
        <MainSidebar 
          activeModule={activeModule} 
          onModuleSelect={handleModuleSelect}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          payrollInstalled={payrollInstalled}
        />
        <SubmoduleSidebar 
          activeModule={activeModule}
          activeSubmodule={activeSubmodule}
          onSubmoduleSelect={setActiveSubmodule}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
