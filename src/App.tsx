
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Tasks from "./pages/Tasks";
import Roadmap from "./pages/Roadmap";
import Issues from "./pages/Issues";
import IssueDetail from "./pages/IssueDetail";
import Integrations from "./pages/Integrations";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<ProjectDetail />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="tasks/team" element={<Tasks />} />
            <Route path="tasks/priority" element={<Tasks />} />
            <Route path="tasks/upcoming" element={<Tasks />} />
            <Route path="roadmap" element={<Roadmap />} />
            <Route path="roadmap/features" element={<Roadmap />} />
            <Route path="roadmap/dependencies" element={<Roadmap />} />
            <Route path="issues" element={<Issues />} />
            <Route path="issues/progress" element={<Issues />} />
            <Route path="issues/completed" element={<Issues />} />
            <Route path="issues/archived" element={<Issues />} />
            <Route path="issues/:id" element={<IssueDetail />} />
            <Route path="integrations" element={<Integrations />} />
            <Route path="settings" element={<Settings />} />
            <Route path="settings/team" element={<Settings />} />
            <Route path="settings/integrations" element={<Settings />} />
            <Route path="settings/billing" element={<Settings />} />
            <Route path="analytics" element={<Dashboard />} />
            <Route path="analytics/velocity" element={<Dashboard />} />
            <Route path="analytics/burndown" element={<Dashboard />} />
            <Route path="analytics/reports" element={<Dashboard />} />
            <Route path="cycles/active" element={<Dashboard />} />
            <Route path="cycles/planned" element={<Dashboard />} />
            <Route path="cycles/completed" element={<Dashboard />} />
            <Route path="work/summary" element={<Dashboard />} />
            <Route path="work/assigned" element={<Dashboard />} />
            <Route path="work/created" element={<Dashboard />} />
            <Route path="work/subscribed" element={<Dashboard />} />
            <Route path="work/activity" element={<Dashboard />} />
            <Route path="inbox/all" element={<Dashboard />} />
            <Route path="inbox/mentions" element={<Dashboard />} />
            <Route path="inbox/notifications" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
