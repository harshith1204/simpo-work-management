
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { User, Trophy, TrendingUp } from "lucide-react";

const TeamInsights = () => {
  const teamData = [
    { name: "Sarah", tasks: 21, color: "#3B82F6" },
    { name: "Jane", tasks: 18, color: "#10B981" },
    { name: "Rahul", tasks: 15, color: "#F59E0B" },
    { name: "Mike", tasks: 12, color: "#EF4444" },
    { name: "Anna", tasks: 9, color: "#8B5CF6" },
  ];

  const leaderboard = [
    { rank: 1, name: "Sarah", tasks: 21, trend: "+5", icon: Trophy, color: "text-yellow-500" },
    { rank: 2, name: "Jane", tasks: 18, trend: "+3", icon: User, color: "text-gray-500" },
    { rank: 3, name: "Rahul", tasks: 15, trend: "+2", icon: User, color: "text-orange-500" },
    { rank: 4, name: "Mike", tasks: 12, trend: "+1", icon: User, color: "text-gray-400" },
    { rank: 5, name: "Anna", tasks: 9, trend: "+4", icon: User, color: "text-gray-400" },
  ];

  return (
    <div className="space-y-6 font-dm-sans">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Team Insights</h2>
        <p className="text-gray-600 mt-1">Task contribution and team performance metrics</p>
      </div>

      {/* Team Contribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Task Contribution by Team Member</CardTitle>
          <p className="text-sm text-gray-600">Number of tasks completed this month</p>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tasks" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>Team Leaderboard</CardTitle>
          <p className="text-sm text-gray-600">Top performers based on completed tasks</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboard.map((member) => {
              const IconComponent = member.icon;
              return (
                <div 
                  key={member.rank} 
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-gray-200">
                      <span className="text-sm font-bold text-gray-600">#{member.rank}</span>
                    </div>
                    <IconComponent className={`w-5 h-5 ${member.color}`} />
                    <div>
                      <div className="font-medium text-gray-900">{member.name}</div>
                      <div className="text-sm text-gray-500">{member.tasks} tasks completed</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm font-medium">{member.trend}</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">{member.tasks}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">5</div>
                <div className="text-sm text-gray-600">Active Team Members</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">75</div>
                <div className="text-sm text-gray-600">Total Tasks This Month</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamInsights;
