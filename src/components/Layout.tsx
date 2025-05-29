
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import MainSidebar from "./MainSidebar";
import SubmoduleSidebar from "./SubmoduleSidebar";
import Header from "./Header";

const Layout = () => {
  const [activeModule, setActiveModule] = useState("work-management");
  const [activeSubmodule, setActiveSubmodule] = useState("your-work");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    
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
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#F9F9FB] flex w-full font-dm-sans">
      <MainSidebar 
        activeModule={activeModule} 
        onModuleSelect={setActiveModule}
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
  );
};

export default Layout;
