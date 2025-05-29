
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
import Summary from "./pages/work/Summary";
import AssignedToMe from "./pages/work/AssignedToMe";
import CreatedByMe from "./pages/work/CreatedByMe";
import Subscribed from "./pages/work/Subscribed";
import Activity from "./pages/work/Activity";
import AllMail from "./pages/inbox/AllMail";
import Mentions from "./pages/inbox/Mentions";
import Active from "./pages/cycles/Active";
import Completed from "./pages/cycles/Completed";
import Upcoming from "./pages/cycles/Upcoming";
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
            <Route path="/work/summary" element={<Summary />} />
            <Route path="/work/assigned" element={<AssignedToMe />} />
            <Route path="/work/created" element={<CreatedByMe />} />
            <Route path="/work/subscribed" element={<Subscribed />} />
            <Route path="/work/activity" element={<Activity />} />
            <Route path="/inbox/all" element={<AllMail />} />
            <Route path="/inbox/mentions" element={<Mentions />} />
            <Route path="/cycles/active" element={<Active />} />
            <Route path="/cycles/completed" element={<Completed />} />
            <Route path="/cycles/upcoming" element={<Upcoming />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/:view" element={<Tasks />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:view" element={<Projects />} />
            <Route path="/issues" element={<Issues />} />
            <Route path="/issues/:view" element={<Issues />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/analytics/:view" element={<Analytics />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/roadmap/:view" element={<Roadmap />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/:view" element={<Settings />} />
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
