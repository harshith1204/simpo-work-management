import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Issues from "./pages/Issues";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import Settings from "./pages/Settings";
import Sprints from "./pages/Sprints";
import ProjectDetail from "./pages/ProjectDetail";
import IssueDetail from "./pages/IssueDetail";
import MilestoneDetail from "./pages/MilestoneDetail";
import Roadmap from "./pages/Roadmap";
import RoadmapDetail from "./pages/RoadmapDetail";
import Analytics from "./pages/Analytics";
import Tasks from "./pages/Tasks";
import RecentActivity from "./pages/RecentActivity";
import Dashboard from "./pages/Dashboard";
import Integrations from "./pages/Integrations";
import NotFound from "./pages/NotFound";
import AppStore from "./pages/AppStore";
import AppDetail from "./pages/AppDetail";
import PayrollSetup from "./pages/PayrollSetup";

// HRMS Pages
import HRMSDashboard from "./pages/hrms/HRMSDashboard";
import CompanySetup from "./pages/hrms/CompanySetup";
import EmployeeMaster from "./pages/hrms/EmployeeMaster";
import LeaveManagement from "./pages/hrms/LeaveManagement";
import AttendanceManagement from "./pages/hrms/AttendanceManagement";
import PayrollManagement from "./pages/hrms/PayrollManagement";
import ComplianceCenter from "./pages/hrms/ComplianceCenter";
import DocumentCenter from "./pages/hrms/DocumentCenter";
import HRMSReports from "./pages/hrms/HRMSReports";
import RolePermissions from "./pages/hrms/RolePermissions";

// Work Management Pages
import YourWorkLayout from "./pages/work/YourWorkLayout";
import Summary from "./pages/work/Summary";
import AssignedToMe from "./pages/work/AssignedToMe";
import CreatedByMe from "./pages/work/CreatedByMe";
import Subscribed from "./pages/work/Subscribed";
import Activity from "./pages/work/Activity";

// Inbox Pages
import InboxLayout from "./pages/inbox/InboxLayout";
import AllMail from "./pages/inbox/AllMail";
import Mentions from "./pages/inbox/Mentions";

// Issues Pages
import OpenIssues from "./pages/issues/OpenIssues";
import ClosedIssues from "./pages/issues/ClosedIssues";
import BugReports from "./pages/issues/BugReports";
import Priorities from "./pages/issues/Priorities";

// Projects Pages
import Overview from "./pages/projects/Overview";
import Boards from "./pages/projects/Boards";
import Files from "./pages/projects/Files";
import Gantt from "./pages/projects/Gantt";

// Cycles Pages
import CyclesLayout from "./pages/cycles/CyclesLayout";
import Active from "./pages/cycles/Active";
import Completed from "./pages/cycles/Completed";
import Upcoming from "./pages/cycles/Upcoming";

// Analytics Pages
import AnalyticsOverview from "./pages/analytics/Overview";
import Burnup from "./pages/analytics/Burnup";
import SprintStats from "./pages/analytics/SprintStats";
import TeamInsights from "./pages/analytics/TeamInsights";
import Productivity from "./pages/analytics/Productivity";

// Tasks Pages
import MyTasks from "./pages/tasks/MyTasks";
import TeamTasks from "./pages/tasks/TeamTasks";
import TaskCalendar from "./pages/tasks/TaskCalendar";

// Roadmap Pages
import Timeline from "./pages/roadmap/Timeline";
import Goals from "./pages/roadmap/Goals";
import Q1Plan from "./pages/roadmap/Q1Plan";
import Q2Plan from "./pages/roadmap/Q2Plan";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Work Management Routes */}
              <Route index element={<Index />} />
              <Route path="work" element={<YourWorkLayout />}>
                <Route index element={<Summary />} />
                <Route path="assigned" element={<AssignedToMe />} />
                <Route path="created" element={<CreatedByMe />} />
                <Route path="subscribed" element={<Subscribed />} />
                <Route path="activity" element={<Activity />} />
              </Route>

              {/* Inbox Routes */}
              <Route path="inbox" element={<InboxLayout />}>
                <Route index element={<AllMail />} />
                <Route path="mentions" element={<Mentions />} />
              </Route>

              {/* Issues Routes */}
              <Route path="issues" element={<Issues />}>
                <Route index element={<OpenIssues />} />
                <Route path="closed" element={<ClosedIssues />} />
                <Route path="bugs" element={<BugReports />} />
                <Route path="priorities" element={<Priorities />} />
              </Route>
              <Route path="issues/:id" element={<IssueDetail />} />

              {/* Projects Routes */}
              <Route path="projects" element={<Projects />}>
                <Route index element={<Overview />} />
                <Route path="boards" element={<Boards />} />
                <Route path="files" element={<Files />} />
                <Route path="gantt" element={<Gantt />} />
              </Route>
              <Route path="projects/:id" element={<ProjectDetail />} />

              {/* Cycles Routes */}
              <Route path="cycles" element={<CyclesLayout />}>
                <Route index element={<Active />} />
                <Route path="completed" element={<Completed />} />
                <Route path="upcoming" element={<Upcoming />} />
              </Route>

              {/* Analytics Routes */}
              <Route path="analytics" element={<Analytics />}>
                <Route index element={<AnalyticsOverview />} />
                <Route path="burnup" element={<Burnup />} />
                <Route path="sprint-stats" element={<SprintStats />} />
                <Route path="team-insights" element={<TeamInsights />} />
                <Route path="productivity" element={<Productivity />} />
              </Route>

              {/* Tasks Routes */}
              <Route path="tasks" element={<Tasks />}>
                <Route index element={<MyTasks />} />
                <Route path="team" element={<TeamTasks />} />
                <Route path="calendar" element={<TaskCalendar />} />
              </Route>

              {/* Roadmap Routes */}
              <Route path="roadmap" element={<Roadmap />}>
                <Route index element={<Timeline />} />
                <Route path="goals" element={<Goals />} />
                <Route path="q1" element={<Q1Plan />} />
                <Route path="q2" element={<Q2Plan />} />
              </Route>
              <Route path="roadmap/:id" element={<RoadmapDetail />} />
              <Route path="milestones/:id" element={<MilestoneDetail />} />

              {/* HRMS Routes */}
              <Route path="hrms" element={<HRMSDashboard />} />
              <Route path="hrms/company-setup" element={<CompanySetup />} />
              <Route path="hrms/employees" element={<EmployeeMaster />} />
              <Route path="hrms/leave" element={<LeaveManagement />} />
              <Route path="hrms/attendance" element={<AttendanceManagement />} />
              <Route path="hrms/payroll" element={<PayrollManagement />} />
              <Route path="hrms/compliance" element={<ComplianceCenter />} />
              <Route path="hrms/documents" element={<DocumentCenter />} />
              <Route path="hrms/reports" element={<HRMSReports />} />
              <Route path="hrms/permissions" element={<RolePermissions />} />

              {/* Other Routes */}
              <Route path="team" element={<Team />} />
              <Route path="settings" element={<Settings />} />
              <Route path="sprints" element={<Sprints />} />
              <Route path="recent-activity" element={<RecentActivity />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="integrations" element={<Integrations />} />
              
              {/* Payroll Setup Route */}
              <Route path="payroll/setup" element={<PayrollSetup />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
