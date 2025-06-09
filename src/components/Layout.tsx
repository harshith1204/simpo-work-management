
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DarkTopNavbar from "./DarkTopNavbar";
import LightSideNavbar from "./LightSideNavbar";
import SubmoduleSidebar from "./SubmoduleSidebar";
import Header from "./Header";
import Apps from "@/pages/Apps";

const Layout = () => {
  const [activeModule, setActiveModule] = useState("work-management");
  const [activeSubmodule, setActiveSubmodule] = useState("your-work");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAppsScreen, setShowAppsScreen] = useState(false);
  const [appsSubmodule, setAppsSubmodule] = useState("recommended");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    
    // Update active module and submodule based on current path
    if (path.startsWith("/hrms")) {
      setActiveModule("hrms");
      setShowAppsScreen(false);
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
      setShowAppsScreen(false);
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
    setActiveModule("apps");
  };

  const handleCollapseClick = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleUpgradeClick = () => {
    console.log("Upgrade clicked");
  };

  if (showAppsScreen) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col w-full">
        <DarkTopNavbar
          companyName="TechCorp Solutions"
          userName="John Doe"
          credits={4920}
          trialDaysLeft={30}
          onAppsClick={handleAppsClick}
          onUpgradeClick={handleUpgradeClick}
          onCollapseClick={handleCollapseClick}
        />
        <div className="flex flex-1">
          <LightSideNavbar
            activeSubmodule={appsSubmodule}
            onSubmoduleSelect={setAppsSubmodule}
            collapsed={sidebarCollapsed}
          />
          <div className="flex-1 overflow-auto">
            {appsSubmodule === "apps" ? <Apps /> : (
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4 capitalize">
                  {appsSubmodule.replace("-", " ")}
                </h1>
                <p className="text-gray-600">This section is coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-full">
      <DarkTopNavbar
        companyName="TechCorp Solutions"
        userName="John Doe"
        credits={4920}
        trialDaysLeft={30}
        onAppsClick={handleAppsClick}
        onUpgradeClick={handleUpgradeClick}
        onCollapseClick={handleCollapseClick}
      />
      <div className="flex flex-1">
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
