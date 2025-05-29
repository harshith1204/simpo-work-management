
import { Zap, Target, Users, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SprintStats = () => {
  const sprintData = {
    currentSprint: {
      name: "Sprint 24",
      velocity: 32,
      capacity: 40,
      commitment: 35,
      completed: 28,
      teamSize: 6,
    },
    historicalVelocity: [
      { sprint: "Sprint 20", velocity: 28, capacity: 35, efficiency: 80 },
      { sprint: "Sprint 21", velocity: 31, capacity: 38, efficiency: 82 },
      { sprint: "Sprint 22", velocity: 29, capacity: 36, efficiency: 81 },
      { sprint: "Sprint 23", velocity: 33, capacity: 40, efficiency: 83 },
      { sprint: "Sprint 24", velocity: 32, capacity: 40, efficiency: 80 },
    ],
    teamMetrics: [
      { member: "Alex Rodriguez", velocity: 8, capacity: 10, efficiency: 80 },
      { member: "Sarah Chen", velocity: 7, capacity: 8, efficiency: 88 },
      { member: "Emily Davis", velocity: 6, capacity: 8, efficiency: 75 },
      { member: "David Park", velocity: 5, capacity: 6, efficiency: 83 },
      { member: "Mike Johnson", velocity: 4, capacity: 5, efficiency: 80 },
      { member: "Lisa Wang", velocity: 2, capacity: 3, efficiency: 67 },
    ],
    sprintGoals: [
      { goal: "Complete user authentication module", status: "completed", points: 13 },
      { goal: "Implement payment gateway integration", status: "in-progress", points: 8 },
      { goal: "Design mobile app wireframes", status: "completed", points: 5 },
      { goal: "Setup automated testing pipeline", status: "pending", points: 9 },
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 85) return "text-green-600";
    if (efficiency >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const averageVelocity = sprintData.historicalVelocity.reduce((sum, sprint) => sum + sprint.velocity, 0) / sprintData.historicalVelocity.length;
  const averageEfficiency = sprintData.historicalVelocity.reduce((sum, sprint) => sum + sprint.efficiency, 0) / sprintData.historicalVelocity.length;

  return (
    <div className="space-y-6 font-dm-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sprint Statistics</h2>
          <p className="text-gray-600 mt-1">Team velocity and performance metrics</p>
        </div>
      </div>

      {/* Current Sprint Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sprint Velocity</p>
                <p className="text-2xl font-bold text-blue-600">{sprintData.currentSprint.velocity}</p>
                <p className="text-xs text-gray-500">story points</p>
              </div>
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Team Capacity</p>
                <p className="text-2xl font-bold text-green-600">{sprintData.currentSprint.capacity}</p>
                <p className="text-xs text-gray-500">story points</p>
              </div>
              <Target className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Team Size</p>
                <p className="text-2xl font-bold text-purple-600">{sprintData.currentSprint.teamSize}</p>
                <p className="text-xs text-gray-500">members</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Efficiency</p>
                <p className="text-2xl font-bold text-orange-600">
                  {((sprintData.currentSprint.velocity / sprintData.currentSprint.capacity) * 100).toFixed(0)}%
                </p>
                <p className="text-xs text-gray-500">capacity used</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Historical Velocity */}
      <Card>
        <CardHeader>
          <CardTitle>Velocity Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-sm text-gray-600">Average Velocity</div>
                <div className="text-2xl font-bold text-blue-600">{averageVelocity.toFixed(1)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Average Efficiency</div>
                <div className="text-2xl font-bold text-green-600">{averageEfficiency.toFixed(1)}%</div>
              </div>
            </div>

            {sprintData.historicalVelocity.map((sprint, index) => (
              <div key={sprint.sprint} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-16 text-sm font-medium text-gray-900">{sprint.sprint}</div>
                <div className="flex-1 grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Velocity</div>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 transition-all duration-300"
                          style={{ width: `${(sprint.velocity / 40) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{sprint.velocity}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Capacity</div>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-600 transition-all duration-300"
                          style={{ width: `${(sprint.capacity / 40) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{sprint.capacity}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Efficiency</div>
                    <div className={`text-sm font-semibold ${getEfficiencyColor(sprint.efficiency)}`}>
                      {sprint.efficiency}%
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
          <CardTitle>Individual Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sprintData.teamMetrics.map((member, index) => (
              <div key={member.member} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-[#270E2B] rounded-full text-white text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{member.member}</div>
                    <div className="text-sm text-gray-600">{member.velocity} of {member.capacity} points</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#270E2B] transition-all duration-300"
                      style={{ width: `${(member.velocity / member.capacity) * 100}%` }}
                    />
                  </div>
                  <div className={`text-sm font-semibold ${getEfficiencyColor(member.efficiency)} w-12`}>
                    {member.efficiency}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sprint Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Sprint Goals Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sprintData.sprintGoals.map((goal, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{goal.goal}</div>
                  <div className="text-sm text-gray-600 mt-1">{goal.points} story points</div>
                </div>
                <Badge className={getStatusColor(goal.status)}>
                  {goal.status.replace('-', ' ')}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SprintStats;
