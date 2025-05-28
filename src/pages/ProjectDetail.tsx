
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProjectDetail = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold">Website Redesign</h1>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            In Progress
          </span>
        </div>
        <Button className="swiss-button">Edit Project</Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Project Details */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="swiss-card">
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    A comprehensive redesign of our company website to improve user experience, 
                    modernize the visual design, and optimize for mobile devices. This project 
                    includes user research, wireframing, design system creation, and development.
                  </p>
                </CardContent>
              </Card>

              <Card className="swiss-card">
                <CardHeader>
                  <CardTitle>Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                      <p className="text-sm text-yellow-800">
                        Remember to conduct user testing before final implementation
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                      <p className="text-sm text-blue-800">
                        Design system components are ready for development phase
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              <Card className="swiss-card">
                <CardHeader>
                  <CardTitle>Project Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Start Date</label>
                    <p className="text-sm">March 1, 2024</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Due Date</label>
                    <p className="text-sm">May 15, 2024</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Progress</label>
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">65% complete</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="swiss-card">
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Sarah Wilson", role: "Project Manager" },
                      { name: "Mike Johnson", role: "UI Designer" },
                      { name: "Emily Davis", role: "Developer" },
                      { name: "Alex Chen", role: "UX Researcher" }
                    ].map((member, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          👤
                        </div>
                        <div>
                          <p className="text-sm font-medium">{member.name}</p>
                          <p className="text-xs text-gray-500">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tasks">
          <Card className="swiss-card">
            <CardContent className="p-8">
              <div className="text-center text-gray-500">
                <p>Task management interface will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roadmap">
          <Card className="swiss-card">
            <CardContent className="p-8">
              <div className="text-center text-gray-500">
                <p>Project roadmap timeline will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files">
          <Card className="swiss-card">
            <CardContent className="p-8">
              <div className="text-center text-gray-500">
                <p>File management system will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetail;
