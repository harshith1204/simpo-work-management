import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import StatCard from "@/components/StatCard";
import DonutChart from "@/components/DonutChart";
import BarChart from "@/components/BarChart";
import IssueTable from "@/components/IssueTable";
import ActivityTimeline from "@/components/ActivityTimeline";
import CollaboratorsSection from "@/components/CollaboratorsSection";
import ProjectCard from "@/components/ProjectCard";
import { AlertTriangle, CheckSquare, Clock, FileText } from "lucide-react";

const Index = () => {
  const [searchCollaborators, setSearchCollaborators] = useState("");

  // Summary data - removed trend percentages
  const summaryStats = [
    { title: "Issues Assigned", value: 12, icon: AlertTriangle },
    { title: "Issues Overdue", value: 3, icon: Clock },
    { title: "Issues Created", value: 28, icon: FileText },
    { title: "Issues Completed", value: 45, icon: CheckSquare },
  ];

  // Issue status chart data
  const issueStatusData = [
    { name: "Backlog", value: 15, color: "#94A3B8" },
    { name: "Started", value: 8, color: "#3B82F6" },
    { name: "Completed", value: 22, color: "#10B981" },
    { name: "Cancelled", value: 3, color: "#EF4444" },
  ];

  // Priority chart data
  const priorityData = [
    { name: "Urgent", value: 5 },
    { name: "High", value: 12 },
    { name: "Medium", value: 18 },
    { name: "Low", value: 8 },
  ];

  // Sample issues for tables
  const assignedIssues = [
    { id: "ISS-001", title: "Fix login authentication bug", priority: "High", dueDate: "2024-02-15", blockedBy: "ISS-002", status: "pending" },
    { id: "ISS-003", title: "Update user dashboard UI", priority: "Medium", dueDate: "2024-02-20", blockedBy: null, status: "pending" },
    { id: "ISS-005", title: "Implement dark mode", priority: "Low", dueDate: "2024-02-25", blockedBy: null, status: "completed" },
  ];

  const createdIssues = [
    { id: "ISS-010", title: "Add search functionality", priority: "High", dueDate: "2024-02-18", blockedBy: null, status: "pending" },
    { id: "ISS-011", title: "Performance optimization", priority: "Medium", dueDate: "2024-02-22", blockedBy: "ISS-010", status: "pending" },
    { id: "ISS-012", title: "Mobile responsiveness", priority: "High", dueDate: "2024-02-14", blockedBy: null, status: "completed" },
  ];

  // Activity timeline data
  const activities = [
    { id: 1, action: "Completed issue ISS-005: Implement dark mode", user: "You", timestamp: "2 hours ago" },
    { id: 2, action: "Created new issue ISS-012: Mobile responsiveness", user: "You", timestamp: "4 hours ago" },
    { id: 3, action: "Updated priority for ISS-010", user: "John Doe", timestamp: "6 hours ago" },
    { id: 4, action: "Assigned ISS-011 to Sarah Wilson", user: "You", timestamp: "1 day ago" },
  ];

  // Recent projects data
  const recentProjects = [
    { id: 1, name: "E-commerce Platform", description: "Modern shopping experience", status: "active" as const, progress: 75, dueDate: "2024-03-15", teamSize: 8 },
    { id: 2, name: "Mobile App Redesign", description: "iOS and Android updates", status: "active" as const, progress: 45, dueDate: "2024-04-01", teamSize: 5 },
    { id: 3, name: "Analytics Dashboard", description: "Business intelligence tool", status: "completed" as const, progress: 100, dueDate: "2024-02-10", teamSize: 6 },
  ];

  return (
    <div className="p-6 space-y-6 font-dm-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your project overview</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Issue Tables */}
        <div className="lg:col-span-2 space-y-6">
          {/* Assigned to You */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Assigned to You</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="pending">
                <TabsList className="mb-4">
                  <TabsTrigger value="pending">Pending ({assignedIssues.filter(i => i.status === 'pending').length})</TabsTrigger>
                  <TabsTrigger value="completed">Completed ({assignedIssues.filter(i => i.status === 'completed').length})</TabsTrigger>
                </TabsList>
                <TabsContent value="pending">
                  <IssueTable issues={assignedIssues.filter(i => i.status === 'pending')} />
                </TabsContent>
                <TabsContent value="completed">
                  <IssueTable issues={assignedIssues.filter(i => i.status === 'completed')} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Created by You */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Created by You</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="pending">
                <TabsList className="mb-4">
                  <TabsTrigger value="pending">Pending ({createdIssues.filter(i => i.status === 'pending').length})</TabsTrigger>
                  <TabsTrigger value="completed">Completed ({createdIssues.filter(i => i.status === 'completed').length})</TabsTrigger>
                </TabsList>
                <TabsContent value="pending">
                  <IssueTable issues={createdIssues.filter(i => i.status === 'pending')} />
                </TabsContent>
                <TabsContent value="completed">
                  <IssueTable issues={createdIssues.filter(i => i.status === 'completed')} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Charts Row - Added padding and auto layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-8">
                <DonutChart data={issueStatusData} title="Issue Status" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8">
                <BarChart data={priorityData} title="Issues by Priority" color="#F59E0B" />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column - Activity & Collaborators */}
        <div className="space-y-6">
          {/* Your Issue Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Your Issue Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <ActivityTimeline activities={activities} />
            </CardContent>
          </Card>

          {/* Collaborators */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Collaborators</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search collaborators..."
                  value={searchCollaborators}
                  onChange={(e) => setSearchCollaborators(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent>
              <CollaboratorsSection searchTerm={searchCollaborators} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Projects - Removed New Project button */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
