
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import YourWorkLayout from "./pages/work/YourWorkLayout";
import Projects from "./pages/Projects";
import Issues from "./pages/Issues";
import Tasks from "./pages/Tasks";
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background font-sans antialiased">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="work/summary" element={<YourWorkLayout />} />
            <Route path="projects" element={<Projects />} />
            <Route path="issues" element={<Issues />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
