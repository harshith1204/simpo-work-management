
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Sprints = () => {
  const currentSprint = {
    name: "Sprint 3 - Design System",
    status: "Active",
    startDate: "Mar 18, 2024",
    endDate: "Apr 1, 2024",
    progress: 60
  };

  const sprintTasks = [
    { id: 1, title: "Create button components", status: "Completed", assignee: "Sarah", points: 5 },
    { id: 2, title: "Design color palette", status: "In Progress", assignee: "Mike", points: 3 },
    { id: 3, title: "Typography system", status: "In Progress", assignee: "Emily", points: 8 },
    { id: 4, title: "Icon library setup", status: "Todo", assignee: "Alex", points: 5 },
    { id: 5, title: "Form components", status: "Todo", assignee: "Sarah", points: 13 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Todo": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Sprint Summary */}
      <Card className="swiss-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl">{currentSprint.name}</CardTitle>
              <p className="text-gray-600 mt-1">
                {currentSprint.startDate} - {currentSprint.endDate}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {currentSprint.status}
              </span>
              <Button className="swiss-button">Edit Sprint</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{currentSprint.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${currentSprint.progress}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sprint Tasks */}
      <Card className="swiss-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Sprint Tasks</CardTitle>
            <Button variant="outline" size="sm">Add Task</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sprintTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm">
                    👤
                  </div>
                  <div>
                    <h4 className="font-medium">{task.title}</h4>
                    <p className="text-sm text-gray-600">Assigned to {task.assignee}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium">{task.points} pts</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sprint Actions */}
      <div className="flex space-x-4">
        <Button className="swiss-button">Start New Sprint</Button>
        <Button variant="outline">View Sprint History</Button>
        <Button variant="outline">Sprint Planning</Button>
      </div>
    </div>
  );
};

export default Sprints;
