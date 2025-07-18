import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import TopNavigationBar from "./TopNavigationBar";
import FirstSideNavigationPanel from "./FirstSideNavigationPanel";
import SecondSideNavigationPanel from "./SecondSideNavigationPanel";
import AppsNavigationPanel from "./AppsNavigationPanel";
import AppsScreen from "./AppsScreen";
import AppDetailPage from "./AppDetailPage";
import AppIntroPopup from "./AppIntroPopup";
import Header from "./Header";
import PayrollApp from "./PayrollApp";
import PayrollConfiguration from "./payroll/PayrollConfiguration";

const Layout = () => {
  const [activeModule, setActiveModule] = useState("work-management");
  const [activeSubmodule, setActiveSubmodule] = useState("your-work");
  const [showAppsScreen, setShowAppsScreen] = useState(false);
  const [showAppDetail, setShowAppDetail] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState("");
  const [activeAppsSection, setActiveAppsSection] = useState("apps");
  const [isFirstSidebarCollapsed, setIsFirstSidebarCollapsed] = useState(false);
  const [installedApps, setInstalledApps] = useState<string[]>([]);
  const [showIntroPopup, setShowIntroPopup] = useState(false);
  const [introAppId, setIntroAppId] = useState("");
  const [showPayrollScreen, setShowPayrollScreen] = useState(false);
  const [showPayrollConfiguration, setShowPayrollConfiguration] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Check if we're on AI writer routes
  const isAIWriterRoute = location.pathname.startsWith("/ai-writer");

  useEffect(() => {
    const path = location.pathname;
    
    // Handle AI Writer routes - collapse first sidebar and hide second sidebar
    if (path.startsWith("/ai-writer")) {
      setIsFirstSidebarCollapsed(true);
      setShowAppsScreen(false);
      setShowPayrollScreen(false);
      setShowPayrollConfiguration(false);
      setActiveModule("ai-writer");
      return;
    }
    
    // Reset first sidebar collapse for non-AI writer routes
    if (!path.startsWith("/ai-writer")) {
      setIsFirstSidebarCollapsed(false);
    }
    
    // Check if we're on payroll settings route
    if (path === "/payroll/settings") {
      setShowPayrollConfiguration(true);
      setShowPayrollScreen(false);
      setShowAppsScreen(false);
      setActiveModule("payroll");
      setActiveSubmodule("settings");
      return;
    }
    
    // Check if we're on payroll configuration route
    if (path === "/payroll/configuration") {
      setShowPayrollConfiguration(true);
      setShowPayrollScreen(false);
      setShowAppsScreen(false);
      setActiveModule("payroll");
      setActiveSubmodule("configuration");
      return;
    }
    
    // Check if we're on payroll routes
    if (path.startsWith("/payroll")) {
      setShowPayrollScreen(true);
      setShowPayrollConfiguration(false);
      setActiveModule("payroll");
      setShowAppsScreen(false);
      setIsFirstSidebarCollapsed(false);
      
      if (path === "/payroll/setup") {
        setActiveSubmodule("payroll-setup");
      } else if (path === "/payroll") {
        setActiveSubmodule("payroll-dashboard");
      }
      return;
    }
    
    // Reset payroll states for other routes
    setShowPayrollScreen(false);
    setShowPayrollConfiguration(false);
    
    // Update active module and submodule based on current path
    if (path.startsWith("/attendance")) {
      setActiveModule("attendance");
      setShowAppsScreen(false);
      if (path === "/attendance") {
        setActiveSubmodule("attendance-dashboard");
      } else if (path.startsWith("/attendance/my-attendance")) {
        setActiveSubmodule("my-attendance");
      } else if (path.startsWith("/attendance/team")) {
        setActiveSubmodule("team-attendance");
      } else if (path.startsWith("/attendance/requests")) {
        setActiveSubmodule("requests");
      } else if (path.startsWith("/attendance/shifts")) {
        setActiveSubmodule("shift-management");
      } else if (path.startsWith("/attendance/settings")) {
        setActiveSubmodule("attendance-settings");
      }
    } else if (path.startsWith("/hrms")) {
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
    setShowAppDetail(false);
    setIsFirstSidebarCollapsed(true);
    setShowPayrollScreen(false);
    setShowPayrollConfiguration(false);
  };

  const handleModuleSelect = (module: string) => {
    setActiveModule(module);
    setShowAppsScreen(false);
    setShowAppDetail(false);
    setIsFirstSidebarCollapsed(false);
    setShowPayrollScreen(false);
    setShowPayrollConfiguration(false);
    
    // Show intro popup for installed apps when clicked
    if (installedApps.includes(module)) {
      setIntroAppId(module);
      setShowIntroPopup(true);
      return;
    }
    
    // Reset submodule when changing main module
    if (module === "hrms") {
      setActiveSubmodule("hrms-home");
    } else if (module === "attendance") {
      setActiveSubmodule("attendance-dashboard");
    } else if (module === "crm") {
      setActiveSubmodule("leads");
    } else if (module === "work-management") {
      setActiveSubmodule("your-work");
    } else if (module === "payroll") {
      setActiveSubmodule("payroll-dashboard");
    }
  };

  const handleAppSelect = (appId: string) => {
    setSelectedAppId(appId);
    setShowAppDetail(true);
  };

  const handleBackToApps = () => {
    setShowAppDetail(false);
    setSelectedAppId("");
  };

  const handleInstallApp = (appId: string) => {
    if (!installedApps.includes(appId)) {
      setInstalledApps(prev => [...prev, appId]);
      // Show intro popup after installation
      setIntroAppId(appId);
      setShowIntroPopup(true);
    }
  };

  const handleSetupApp = () => {
    if (introAppId === "payroll") {
      setShowPayrollScreen(true);
      setShowAppsScreen(false);
      setShowPayrollConfiguration(false);
      setIsFirstSidebarCollapsed(false);
      setActiveModule("payroll");
      setActiveSubmodule("payroll-dashboard");
    }
    // Handle other app setups here
  };

  const handleNavigateToEmployees = () => {
    navigate("/hrms/employees");
    setActiveModule("hrms");
    setActiveSubmodule("employee-master");
    setShowPayrollScreen(false);
    setShowPayrollConfiguration(false);
    setShowAppsScreen(false);
    setIsFirstSidebarCollapsed(false);
  };

  const handleBackFromPayroll = () => {
    setShowPayrollScreen(false);
    setShowPayrollConfiguration(false);
    setShowAppsScreen(true);
    setIsFirstSidebarCollapsed(true);
  };

  const handleBackFromConfiguration = () => {
    setShowPayrollConfiguration(false);
    navigate("/payroll");
    setShowPayrollScreen(true);
  };

  // Payroll Configuration Full Screen Layout
  if (showPayrollConfiguration) {
    return (
      <div className="min-h-screen bg-[#F9F9FB] w-full font-dm-sans">
        <PayrollConfiguration onBack={handleBackFromConfiguration} />
        <AppIntroPopup
          isOpen={showIntroPopup}
          onClose={() => setShowIntroPopup(false)}
          appId={introAppId}
          onSetup={handleSetupApp}
        />
      </div>
    );
  }

  // Payroll Screen Layout
  if (showPayrollScreen) {
    return (
      <div className="min-h-screen bg-[#F9F9FB] flex flex-col w-full font-dm-sans">
        <TopNavigationBar onAppsClick={handleAppsClick} />
        <div className="flex flex-1">
          <FirstSideNavigationPanel 
            activeModule={activeModule}
            onModuleSelect={handleModuleSelect}
            isCollapsed={isFirstSidebarCollapsed}
            onToggleCollapse={() => setIsFirstSidebarCollapsed(!isFirstSidebarCollapsed)}
            installedApps={installedApps}
          />
          <SecondSideNavigationPanel 
            activeModule={activeModule}
            activeSubmodule={activeSubmodule}
            onSubmoduleSelect={setActiveSubmodule}
          />
          <div className="flex-1">
            <PayrollApp 
              onBack={handleBackFromPayroll}
              onNavigateToEmployees={handleNavigateToEmployees}
            />
          </div>
        </div>
        <AppIntroPopup
          isOpen={showIntroPopup}
          onClose={() => setShowIntroPopup(false)}
          appId={introAppId}
          onSetup={handleSetupApp}
        />
      </div>
    );
  }

  // Apps Screen Layout
  if (showAppsScreen) {
    return (
      <div className="min-h-screen bg-[#F9F9FB] flex flex-col w-full font-dm-sans">
        <TopNavigationBar onAppsClick={handleAppsClick} />
        <div className="flex flex-1">
          <FirstSideNavigationPanel 
            activeModule={activeModule}
            onModuleSelect={handleModuleSelect}
            isCollapsed={isFirstSidebarCollapsed}
            onToggleCollapse={() => setIsFirstSidebarCollapsed(!isFirstSidebarCollapsed)}
            installedApps={installedApps}
          />
          {showAppDetail ? (
            <>
              <AppsNavigationPanel 
                activeSection={activeAppsSection}
                onSectionSelect={setActiveAppsSection}
              />
              <AppDetailPage
                appId={selectedAppId}
                onBack={handleBackToApps}
                onInstall={handleInstallApp}
                isInstalled={installedApps.includes(selectedAppId)}
              />
            </>
          ) : (
            <>
              <AppsNavigationPanel 
                activeSection={activeAppsSection}
                onSectionSelect={setActiveAppsSection}
              />
              <AppsScreen
                onAppSelect={handleAppSelect}
                onInstallApp={handleInstallApp}
                installedApps={installedApps}
              />
            </>
          )}
        </div>
        <AppIntroPopup
          isOpen={showIntroPopup}
          onClose={() => setShowIntroPopup(false)}
          appId={introAppId}
          onSetup={handleSetupApp}
        />
      </div>
    );
  }

  // AI Writer Layout - No second navigation panel, collapsed first panel
  if (isAIWriterRoute) {
    return (
      <div className="min-h-screen bg-[#F9F9FB] flex flex-col w-full font-dm-sans">
        <TopNavigationBar onAppsClick={handleAppsClick} />
        <div className="flex flex-1">
          <FirstSideNavigationPanel 
            activeModule={activeModule}
            onModuleSelect={handleModuleSelect}
            isCollapsed={isFirstSidebarCollapsed}
            onToggleCollapse={() => setIsFirstSidebarCollapsed(!isFirstSidebarCollapsed)}
            installedApps={installedApps}
          />
          {/* No SecondSideNavigationPanel for AI Writer routes */}
          <div className="flex-1 flex flex-col min-w-0">
            <main className="flex-1 overflow-auto">
              <Outlet />
            </main>
          </div>
        </div>
        <AppIntroPopup
          isOpen={showIntroPopup}
          onClose={() => setShowIntroPopup(false)}
          appId={introAppId}
          onSetup={handleSetupApp}
        />
      </div>
    );
  }

  // Regular Layout
  return (
    <div className="min-h-screen bg-[#F9F9FB] flex flex-col w-full font-dm-sans">
      <TopNavigationBar onAppsClick={handleAppsClick} />
      <div className="flex flex-1">
        <FirstSideNavigationPanel 
          activeModule={activeModule}
          onModuleSelect={handleModuleSelect}
          isCollapsed={isFirstSidebarCollapsed}
          onToggleCollapse={() => setIsFirstSidebarCollapsed(!isFirstSidebarCollapsed)}
          installedApps={installedApps}
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
      <AppIntroPopup
        isOpen={showIntroPopup}
        onClose={() => setShowIntroPopup(false)}
        appId={introAppId}
        onSetup={handleSetupApp}
      />
    </div>
  );
};

export default Layout;
