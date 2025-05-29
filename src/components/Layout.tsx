
import { useState } from "react";
import { Outlet } from "react-router-dom";
import MainSidebar from "./MainSidebar";
import SubmoduleSidebar from "./SubmoduleSidebar";
import Header from "./Header";

const Layout = () => {
  const [activeModule, setActiveModule] = useState("work-management");
  const [activeSubmodule, setActiveSubmodule] = useState("your-work");

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
