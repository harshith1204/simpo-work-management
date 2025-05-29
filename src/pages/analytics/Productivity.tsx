
import { TrendingUp, TrendingDown, BarChart3, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Productivity = () => {
  const productivityData = {
    thisWeek: {
      tasksCompleted: 28,
      hoursWorked: 162,
      avgTasksPerDay: 5.6,
      efficiency: 94,
    },
    lastWeek: {
      tasksCompleted: 24,
      hoursWorked: 158,
      avgTasksPerDay: 4.8,
      efficiency: 89,
    },
    teamMembers: [
      { name: "Alex Rodriguez", tasksCompleted: 12, efficiency: 96, trend: "up" },
      { name: "Sarah Chen", tasksCompleted: 10, efficiency: 94, trend: "up" },
      { name: "Emily Davis", tasksCompleted: 8, efficiency: 91, trend: "stable" },
      { name: "David Park", tasksCompleted: 7, efficiency: 88, trend: "down" },
      { name: "Mike Johnson", tasksCompleted: 6, efficiency: 85, trend: "up" },
    ],
    weeklyTrend: [
      { day: "Mon", tasks: 6, hours: 8.2 },
      { day: "Tue", tasks: 5, hours: 7.8 },
      { day: "Wed", tasks: 7, hours: 8.5 },
      { day: "Thu", tasks: 4, hours: 7.2 },
      { day: "Fri", tasks: 6, hours: 8.1 },
    ],
  };

  const getChangeIndicator = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    const isPositive = change > 0;
    return {
      value: Math.abs(change).toFixed(1),
      isPositive,
      Icon: isPositive ? TrendingUp : TrendingDown,
    };
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down": return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <BarChart3 className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6 font-dm-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Productivity Analytics</h2>
          <p className="text-gray-600 mt-1">Team performance insights and trends</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tasks Completed</p>
                <p className="text-2xl font-bold text-gray-900">{productivityData.thisWeek.tasksCompleted}</p>
              </div>
              <div className="flex items-center space-x-1 text-sm">
                {(() => {
                  const change = getChangeIndicator(productivityData.thisWeek.tasksCompleted, productivityData.lastWeek.tasksCompleted);
                  return (
                    <>
                      <change.Icon className={`w-4 h-4 ${change.isPositive ? 'text-green-600' : 'text-red-600'}`} />
                      <span className={change.isPositive ? 'text-green-600' : 'text-red-600'}>
                        {change.value}%
                      </span>
                    </>
                  );
                })()}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Hours Worked</p>
                <p className="text-2xl font-bold text-gray-900">{productivityData.thisWeek.hoursWorked}</p>
              </div>
              <div className="flex items-center space-x-1 text-sm">
                {(() => {
                  const change = getChangeIndicator(productivityData.thisWeek.hoursWorked, productivityData.lastWeek.hoursWorked);
                  return (
                    <>
                      <change.Icon className={`w-4 h-4 ${change.isPositive ? 'text-green-600' : 'text-red-600'}`} />
                      <span className={change.isPositive ? 'text-green-600' : 'text-red-600'}>
                        {change.value}%
                      </span>
                    </>
                  );
                })()}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Tasks/Day</p>
                <p className="text-2xl font-bold text-gray-900">{productivityData.thisWeek.avgTasksPerDay}</p>
              </div>
              <div className="flex items-center space-x-1 text-sm">
                {(() => {
                  const change = getChangeIndicator(productivityData.thisWeek.avgTasksPerDay, productivityData.lastWeek.avgTasksPerDay);
                  return (
                    <>
                      <change.Icon className={`w-4 h-4 ${change.isPositive ? 'text-green-600' : 'text-red-600'}`} />
                      <span className={change.isPositive ? 'text-green-600' : 'text-red-600'}>
                        {change.value}%
                      </span>
                    </>
                  );
                })()}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Efficiency</p>
                <p className="text-2xl font-bold text-gray-900">{productivityData.thisWeek.efficiency}%</p>
              </div>
              <div className="flex items-center space-x-1 text-sm">
                {(() => {
                  const change = getChangeIndicator(productivityData.thisWeek.efficiency, productivityData.lastWeek.efficiency);
                  return (
                    <>
                      <change.Icon className={`w-4 h-4 ${change.isPositive ? 'text-green-600' : 'text-red-600'}`} />
                      <span className={change.isPositive ? 'text-green-600' : 'text-red-600'}>
                        {change.value}%
                      </span>
                    </>
                  );
                })()}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>Daily Productivity Trend</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {productivityData.weeklyTrend.map((day, index) => (
              <div key={day.day} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-medium text-gray-600">{day.day}</div>
                <div className="flex-1 flex items-center space-x-4">
                  <div className="flex items-center space-x-2 w-32">
                    <span className="text-sm text-gray-600">Tasks:</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 transition-all duration-300"
                          style={{ width: `${(day.tasks / 10) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{day.tasks}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 w-32">
                    <span className="text-sm text-gray-600">Hours:</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-600 transition-all duration-300"
                          style={{ width: `${(day.hours / 10) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{day.hours}h</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Team Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {productivityData.teamMembers.map((member, index) => (
              <div key={member.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-[#270E2B] rounded-full text-white text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{member.name}</div>
                    <div className="text-sm text-gray-600">{member.tasksCompleted} tasks completed</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Efficiency</div>
                    <div className="font-semibold text-gray-900">{member.efficiency}%</div>
                  </div>
                  <div className="flex items-center">
                    {getTrendIcon(member.trend)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Productivity;
