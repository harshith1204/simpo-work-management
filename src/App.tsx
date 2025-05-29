
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import YourWorkLayout from "./pages/work/YourWorkLayout";
import Projects from "./pages/Projects";
import Issues from "./pages/Issues";
import Tasks from "./pages/Tasks";
import Settings from "./pages/Settings";
import InboxLayout from "./pages/inbox/InboxLayout";
import CyclesLayout from "./pages/cycles/CyclesLayout";
import Analytics from "./pages/Analytics";
import Roadmap from "./pages/Roadmap";
import ProjectDetail from "./pages/ProjectDetail";
import IssueDetail from "./pages/IssueDetail";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background font-sans antialiased">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="work/*" element={<YourWorkLayout />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<ProjectDetail />} />
            <Route path="issues" element={<Issues />} />
            <Route path="issues/:id" element={<IssueDetail />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="settings" element={<Settings />} />
            <Route path="inbox/*" element={<InboxLayout />} />
            <Route path="cycles/*" element={<CyclesLayout />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="roadmap" element={<Roadmap />} />
          </Route>
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
