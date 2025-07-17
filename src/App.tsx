
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
import RoadmapDetail from "./pages/RoadmapDetail";

// HRMS Pages
import HRMSDashboard from "./pages/hrms/HRMSDashboard";
import CompanySetup from "./pages/hrms/CompanySetup";
import EmployeeMaster from "./pages/hrms/EmployeeMaster";
import LeaveManagement from "./pages/hrms/LeaveManagement";
import AttendanceManagement from "./pages/hrms/AttendanceManagement";
import PayrollManagement from "./pages/PayrollManagement";
import ComplianceCenter from "./pages/hrms/ComplianceCenter";
import DocumentCenter from "./pages/hrms/DocumentCenter";
import HRMSReports from "./pages/hrms/HRMSReports";
import RolePermissions from "./pages/hrms/RolePermissions";

// Attendance Pages
import AttendanceDashboard from "./pages/attendance/AttendanceDashboard";
import MyAttendance from "./pages/attendance/MyAttendance";
import TeamAttendance from "./pages/attendance/TeamAttendance";
import RequestsManagement from "./pages/attendance/RequestsManagement";
import ShiftManagement from "./pages/attendance/ShiftManagement";
import AttendanceSettings from "./pages/attendance/AttendanceSettings";

// AI Writer Pages
import AIWriter from "./pages/AIWriter";
import AIBlogWriter from "./pages/AIBlogWriter";
import AIAdsWriter from "./pages/AIAdsWriter";

// Product Catalogue
import ProductCatalogue from "./pages/ProductCatalogue";

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
            <Route path="roadmap/:id" element={<RoadmapDetail />} />
            
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
            
            {/* Attendance Management Routes */}
            <Route path="attendance" element={<AttendanceDashboard />} />
            <Route path="attendance/my-attendance" element={<MyAttendance />} />
            <Route path="attendance/team" element={<TeamAttendance />} />
            <Route path="attendance/requests" element={<RequestsManagement />} />
            <Route path="attendance/shifts" element={<ShiftManagement />} />
            <Route path="attendance/settings" element={<AttendanceSettings />} />
            
            {/* AI Writer Routes */}
            <Route path="ai-writer" element={<AIWriter />} />
            <Route path="ai-writer/blog" element={<AIBlogWriter />} />
            <Route path="ai-writer/ads" element={<AIAdsWriter />} />
            
            {/* Product Catalogue Route */}
            <Route path="product-catalogue" element={<ProductCatalogue />} />
            
            {/* Payroll Routes - handled by Layout component */}
            <Route path="payroll" element={<div />} />
            <Route path="payroll/*" element={<div />} />
          </Route>
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
