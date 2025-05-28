
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Tasks = () => {
  const columns = [
    { title: "Backlog", tasks: [
      { id: 1, title: "User research interviews", assignee: "👤", priority: "High", dueDate: "Mar 25" },
      { id: 2, title: "Create wireframes", assignee: "👤", priority: "Medium", dueDate: "Mar 28" }
    ]},
    { title: "In Progress", tasks: [
      { id: 3, title: "Design homepage mockup", assignee: "👤", priority: "High", dueDate: "Mar 22" },
      { id: 4, title: "Set up development environment", assignee: "👤", priority: "Low", dueDate: "Mar 24" }
    ]},
    { title: "In Review", tasks: [
      { id: 5, title: "Logo design variations", assignee: "👤", priority: "Medium", dueDate: "Mar 20" }
    ]},
    { title: "Completed", tasks: [
      { id: 6, title: "Project kickoff meeting", assignee: "👤", priority: "High", dueDate: "Mar 15" },
      { id: 7, title: "Stakeholder interviews", assignee: "👤", priority: "Medium", dueDate: "Mar 18" }
    ]}
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button className="swiss-button">Create Task</Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors w-64"
            />
          </div>
          <Button variant="outline" size="sm">Filters</Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-screen">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="space-y-4">
            {/* Column Header */}
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">{column.title}</h3>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                {column.tasks.length}
              </span>
            </div>

            {/* Tasks */}
            <div className="space-y-3">
              {column.tasks.map((task) => (
                <Card key={task.id} className="swiss-card hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-sm mb-3">{task.title}</h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                          {task.assignee}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{task.dueDate}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
