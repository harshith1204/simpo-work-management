
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Issues from "./pages/Issues";
import Roadmap from "./pages/Roadmap";
import Analytics from "./pages/Analytics";
import Team from "./pages/Team";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import ProjectDetail from "./pages/ProjectDetail";
import IssueDetail from "./pages/IssueDetail";
import RoadmapDetail from "./pages/RoadmapDetail";
import MilestoneDetail from "./pages/MilestoneDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<ProjectDetail />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="issues" element={<Issues />} />
            <Route path="issues/:id" element={<IssueDetail />} />
            <Route path="roadmap" element={<Roadmap />} />
            <Route path="roadmap/:id" element={<RoadmapDetail />} />
            <Route path="milestone/:id" element={<MilestoneDetail />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="team" element={<Team />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
