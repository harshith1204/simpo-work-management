
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import TopNavigationBar from "./TopNavigationBar";
import FirstSideNavigationPanel from "./FirstSideNavigationPanel";
import SecondSideNavigationPanel from "./SecondSideNavigationPanel";
import Header from "./Header";

const Layout = () => {
  const [activeModule, setActiveModule] = useState("work-management");
  const [activeSubmodule, setActiveSubmodule] = useState("your-work");
  const [showAppsScreen, setShowAppsScreen] = useState(false);
  const location = useLocation();

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
        setActiveSubmodule("reports");
      } else if (path.startsWith("/hrms/permissions")) {
        setActiveSubmodule("permissions");
      }
    } else if (path.startsWith("/crm")) {
      setActiveModule("crm");
      // Set appropriate CRM submodule based on path
      if (path.startsWith("/crm/leads")) {
        setActiveSubmodule("leads");
      } else if (path.startsWith("/crm/contacts")) {
        setActiveSubmodule("contacts");
      } else if (path.startsWith("/crm/accounts")) {
        setActiveSubmodule("accounts");
      } else if (path.startsWith("/crm/opportunities")) {
        setActiveSubmodule("opportunities");
      } else if (path.startsWith("/crm/tasks")) {
        setActiveSubmodule("tasks");
      } else if (path.startsWith("/crm/meetings")) {
        setActiveSubmodule("meetings");
      } else if (path.startsWith("/crm/analytics")) {
        setActiveSubmodule("analytics");
      } else if (path.startsWith("/crm/reports")) {
        setActiveSubmodule("reports");
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

  const handleAppsClick = () => {
    setShowAppsScreen(true);
  };

  const handleModuleSelect = (module: string) => {
    setActiveModule(module);
    setShowAppsScreen(false);
    // Reset submodule when changing main module
    if (module === "hrms") {
      setActiveSubmodule("hrms-home");
    } else if (module === "crm") {
      setActiveSubmodule("leads");
    } else if (module === "work-management") {
      setActiveSubmodule("your-work");
    }
  };

  if (showAppsScreen) {
    return (
      <div className="min-h-screen bg-[#F9F9FB] flex flex-col w-full font-dm-sans">
        <TopNavigationBar onAppsClick={handleAppsClick} />
        <div className="flex flex-1">
          {/* Apps screen content would go here */}
          <div className="flex-1 p-8">
            <h1 className="text-2xl font-bold mb-4">Apps</h1>
            <p className="text-gray-600">App store content coming soon...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9FB] flex flex-col w-full font-dm-sans">
      <TopNavigationBar onAppsClick={handleAppsClick} />
      <div className="flex flex-1">
        <FirstSideNavigationPanel 
          activeModule={activeModule}
          onModuleSelect={handleModuleSelect}
        />
        <SecondSideNavigationPanel 
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
