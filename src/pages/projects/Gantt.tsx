
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Gantt = () => {
  const tasks = [
    { 
      id: 1, 
      name: "Project Planning", 
      startDate: "2024-01-01", 
      endDate: "2024-01-15", 
      progress: 100,
      assignee: "Alex Johnson"
    },
    { 
      id: 2, 
      name: "Design Phase", 
      startDate: "2024-01-10", 
      endDate: "2024-02-05", 
      progress: 75,
      assignee: "Sarah Chen"
    },
    { 
      id: 3, 
      name: "Development Sprint 1", 
      startDate: "2024-01-25", 
      endDate: "2024-02-20", 
      progress: 45,
      assignee: "Mike Rodriguez"
    },
    { 
      id: 4, 
      name: "Testing & QA", 
      startDate: "2024-02-15", 
      endDate: "2024-03-10", 
      progress: 0,
      assignee: "Emily Davis"
    },
    { 
      id: 5, 
      name: "Deployment", 
      startDate: "2024-03-05", 
      endDate: "2024-03-15", 
      progress: 0,
      assignee: "David Kim"
    }
  ];

  const getProgressColor = (progress: number) => {
    if (progress === 100) return "bg-green-500";
    if (progress > 0) return "bg-blue-500";
    return "bg-gray-300";
  };

  const getStatusBadge = (progress: number) => {
    if (progress === 100) return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
    if (progress > 0) return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
    return <Badge className="bg-gray-100 text-gray-800">Not Started</Badge>;
  };

  return (
    <div className="p-6 font-dm-sans">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gantt Chart</h2>
        <p className="text-gray-600 mt-1">Timeline view of project tasks and milestones</p>
      </div>

      <Card>
        <CardContent className="p-0">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b font-medium text-sm text-gray-700">
            <div className="col-span-3">Task Name</div>
            <div className="col-span-2">Assignee</div>
            <div className="col-span-2">Start Date</div>
            <div className="col-span-2">End Date</div>
            <div className="col-span-2">Progress</div>
            <div className="col-span-1">Status</div>
          </div>

          {/* Tasks */}
          {tasks.map((task) => (
            <div key={task.id} className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50 transition-colors">
              <div className="col-span-3">
                <div className="font-medium text-gray-900">{task.name}</div>
              </div>
              <div className="col-span-2">
                <div className="text-sm text-gray-600">{task.assignee}</div>
              </div>
              <div className="col-span-2">
                <div className="text-sm text-gray-600">{task.startDate}</div>
              </div>
              <div className="col-span-2">
                <div className="text-sm text-gray-600">{task.endDate}</div>
              </div>
              <div className="col-span-2">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getProgressColor(task.progress)}`}
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600">{task.progress}%</span>
                </div>
              </div>
              <div className="col-span-1">
                {getStatusBadge(task.progress)}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Timeline Visual */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline View</h3>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {tasks.map((task, index) => (
                <div key={task.id} className="flex items-center space-x-4">
                  <div className="w-32 text-sm font-medium text-gray-900 truncate">
                    {task.name}
                  </div>
                  <div className="flex-1 relative">
                    <div className="h-8 bg-gray-100 rounded-lg relative overflow-hidden">
                      <div 
                        className={`h-full rounded-lg ${getProgressColor(task.progress)} opacity-80`}
                        style={{ width: `${task.progress}%` }}
                      ></div>
                      <div className="absolute inset-0 flex items-center px-3">
                        <span className="text-xs font-medium text-gray-700">
                          {task.startDate} - {task.endDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Gantt;
