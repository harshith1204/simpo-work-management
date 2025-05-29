
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Tasks from "./pages/Tasks";
import Projects from "./pages/Projects";
import Issues from "./pages/Issues";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Roadmap from "./pages/Roadmap";
import NotFound from "./pages/NotFound";
import RecentActivity from "./pages/RecentActivity";
import YourWorkLayout from "./pages/work/YourWorkLayout";
import InboxLayout from "./pages/inbox/InboxLayout";
import CyclesLayout from "./pages/cycles/CyclesLayout";
import CreateIssueModal from "./components/CreateIssueModal";
import { useState } from "react";

function App() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="/recent-activity" element={<RecentActivity />} />
            <Route path="/work/*" element={<YourWorkLayout />} />
            <Route path="/inbox/*" element={<InboxLayout />} />
            <Route path="/cycles/*" element={<CyclesLayout />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/issues" element={<Issues />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        
        {/* Global create issue modal - can be triggered from anywhere */}
        <CreateIssueModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={(data) => console.log('New issue created:', data)}
        />
      </div>
    </Router>
  );
}

export default App;
