
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

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="/recent-activity" element={<RecentActivity />} />
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
      </div>
    </Router>
  );
}

export default App;
