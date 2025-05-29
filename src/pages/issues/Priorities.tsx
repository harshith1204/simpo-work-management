
import { ArrowUp, ArrowDown, Minus, AlertTriangle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Priorities = () => {
  const prioritizedIssues = [
    {
      id: "ISS-002",
      title: "API rate limiting causing timeouts",
      priority: "Critical",
      impact: "High",
      urgency: "High",
      assignee: "David Park",
      dueDate: "2024-02-16",
      estimatedEffort: "8 hours",
      businessValue: "High",
      category: "Backend",
    },
    {
      id: "ISS-001",
      title: "Login page not responsive on mobile devices",
      priority: "High",
      impact: "Medium",
      urgency: "High",
      assignee: "Alex Rodriguez",
      dueDate: "2024-02-18",
      estimatedEffort: "4 hours",
      businessValue: "Medium",
      category: "Frontend",
    },
    {
      id: "ISS-005",
      title: "Email notifications not being sent",
      priority: "High",
      impact: "High",
      urgency: "Medium",
      assignee: "Kevin Brown",
      dueDate: "2024-02-20",
      estimatedEffort: "6 hours",
      businessValue: "High",
      category: "Backend",
    },
    {
      id: "ISS-003",
      title: "User profile images not loading correctly",
      priority: "Medium",
      impact: "Medium",
      urgency: "Medium",
      assignee: "Lisa Wang",
      dueDate: "2024-02-22",
      estimatedEffort: "3 hours",
      businessValue: "Medium",
      category: "Frontend",
    },
    {
      id: "ISS-004",
      title: "Database connection pooling optimization",
      priority: "Low",
      impact: "Low",
      urgency: "Low",
      assignee: "James Lee",
      dueDate: "2024-02-25",
      estimatedEffort: "12 hours",
      businessValue: "Low",
      category: "Backend",
    },
  ];

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "Critical": return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case "High": return <ArrowUp className="w-4 h-4 text-orange-600" />;
      case "Medium": return <Minus className="w-4 h-4 text-yellow-600" />;
      case "Low": return <ArrowDown className="w-4 h-4 text-green-600" />;
      default: return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-800 border-red-300";
      case "High": return "bg-orange-100 text-orange-800 border-orange-300";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Low": return "bg-green-100 text-green-800 border-green-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getValueColor = (value: string) => {
    switch (value) {
      case "High": return "text-green-600 bg-green-50";
      case "Medium": return "text-yellow-600 bg-yellow-50";
      case "Low": return "text-gray-600 bg-gray-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="space-y-6 font-dm-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Issue Priorities</h2>
          <p className="text-gray-600 mt-1">Issues sorted by priority and business impact</p>
        </div>
        <Button className="bg-[#270E2B] hover:bg-[#270E2B]/90 text-white px-6 py-2 rounded-lg font-medium">
          Prioritization Matrix
        </Button>
      </div>

      {/* Priority Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">1</div>
            <div className="text-sm text-gray-600">Critical</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">2</div>
            <div className="text-sm text-gray-600">High</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">1</div>
            <div className="text-sm text-gray-600">Medium</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">1</div>
            <div className="text-sm text-gray-600">Low</div>
          </CardContent>
        </Card>
      </div>

      {/* Prioritized Issues List */}
      <div className="space-y-4">
        {prioritizedIssues.map((issue, index) => (
          <Card key={issue.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-semibold text-gray-600">
                      {index + 1}
                    </div>
                    <Badge className={getPriorityColor(issue.priority)}>
                      {getPriorityIcon(issue.priority)}
                      <span className="ml-1">{issue.priority}</span>
                    </Badge>
                    <span className="text-sm font-medium text-[#270E2B]">{issue.id}</span>
                    <Badge variant="outline">{issue.category}</Badge>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 hover:text-[#270E2B] cursor-pointer">
                    {issue.title}
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Impact</div>
                      <div className={`text-sm font-medium px-2 py-1 rounded-md ${getValueColor(issue.impact)}`}>
                        {issue.impact}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Urgency</div>
                      <div className={`text-sm font-medium px-2 py-1 rounded-md ${getValueColor(issue.urgency)}`}>
                        {issue.urgency}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Business Value</div>
                      <div className={`text-sm font-medium px-2 py-1 rounded-md ${getValueColor(issue.businessValue)}`}>
                        {issue.businessValue}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Effort</div>
                      <div className="text-sm font-medium text-gray-700">
                        {issue.estimatedEffort}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right ml-6">
                  <div className="text-sm text-gray-600 mb-1">Assignee</div>
                  <div className="font-medium text-gray-900 mb-2">{issue.assignee}</div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    {issue.dueDate}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Priorities;
