
import { TrendingUp, Target, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Burnup = () => {
  const burnupData = {
    sprint: {
      name: "Sprint 24 - Q1 2024",
      startDate: "2024-02-01",
      endDate: "2024-02-28",
      totalScope: 45,
      completedWork: 32,
      daysElapsed: 15,
      totalDays: 28,
    },
    dailyProgress: [
      { day: 1, scope: 42, completed: 0 },
      { day: 2, scope: 43, completed: 2 },
      { day: 3, scope: 43, completed: 4 },
      { day: 4, scope: 44, completed: 6 },
      { day: 5, scope: 44, completed: 9 },
      { day: 6, scope: 45, completed: 12 },
      { day: 7, scope: 45, completed: 15 },
      { day: 8, scope: 45, completed: 18 },
      { day: 9, scope: 45, completed: 21 },
      { day: 10, scope: 45, completed: 24 },
      { day: 11, scope: 45, completed: 26 },
      { day: 12, scope: 45, completed: 28 },
      { day: 13, scope: 45, completed: 30 },
      { day: 14, scope: 45, completed: 31 },
      { day: 15, scope: 45, completed: 32 },
    ],
    projections: {
      onTrack: true,
      projectedCompletion: "2024-02-26",
      velocityTrend: "stable",
      scopeChanges: 3,
    }
  };

  const progressPercentage = (burnupData.sprint.completedWork / burnupData.sprint.totalScope) * 100;
  const timeProgressPercentage = (burnupData.sprint.daysElapsed / burnupData.sprint.totalDays) * 100;

  return (
    <div className="space-y-6 font-dm-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Burnup Chart</h2>
          <p className="text-gray-600 mt-1">Sprint progress and scope tracking</p>
        </div>
      </div>

      {/* Sprint Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Scope</p>
                <p className="text-2xl font-bold text-gray-900">{burnupData.sprint.totalScope}</p>
                <p className="text-xs text-gray-500">story points</p>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{burnupData.sprint.completedWork}</p>
                <p className="text-xs text-gray-500">story points</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Days Elapsed</p>
                <p className="text-2xl font-bold text-orange-600">{burnupData.sprint.daysElapsed}</p>
                <p className="text-xs text-gray-500">of {burnupData.sprint.totalDays} days</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Velocity</p>
                <p className="text-2xl font-bold text-purple-600">2.1</p>
                <p className="text-xs text-gray-500">points/day</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Work Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Completed Work</span>
                <span>{progressPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <div className="text-xs text-gray-600">
                {burnupData.sprint.completedWork} of {burnupData.sprint.totalScope} story points
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Time Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Sprint Timeline</span>
                <span>{timeProgressPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={timeProgressPercentage} className="h-3" />
              <div className="text-xs text-gray-600">
                {burnupData.sprint.daysElapsed} of {burnupData.sprint.totalDays} days elapsed
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Burnup Chart Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Burnup Chart - {burnupData.sprint.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 relative bg-gray-50 rounded-lg p-4">
            {/* Chart Grid */}
            <div className="absolute inset-4 grid grid-cols-7 grid-rows-5 gap-0">
              {Array.from({ length: 35 }, (_, i) => (
                <div key={i} className="border-r border-b border-gray-200 border-opacity-30"></div>
              ))}
            </div>

            {/* Chart Lines Simulation */}
            <div className="absolute inset-4 flex items-end">
              <svg className="w-full h-full" viewBox="0 0 300 200">
                {/* Scope Line (Red) */}
                <polyline
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                  points="0,40 50,38 100,36 150,34 200,32 250,30 300,30"
                />
                
                {/* Completed Work Line (Green) */}
                <polyline
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="3"
                  points="0,200 20,190 40,180 60,165 80,150 100,130 120,110 140,95 160,80 180,70 200,60 220,50 240,45 260,40 280,35"
                />
                
                {/* Ideal Line (Dashed) */}
                <polyline
                  fill="none"
                  stroke="#6b7280"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  points="0,200 300,30"
                />
              </svg>
            </div>

            {/* Legend */}
            <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-sm border border-gray-200">
              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-0.5 bg-red-500"></div>
                  <span>Scope</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-0.5 bg-green-500"></div>
                  <span>Completed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-0.5 bg-gray-500 border-dashed"></div>
                  <span>Ideal</span>
                </div>
              </div>
            </div>

            {/* Y-Axis Label */}
            <div className="absolute left-0 top-1/2 -rotate-90 text-xs text-gray-600 font-medium">
              Story Points
            </div>
            
            {/* X-Axis Label */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 font-medium">
              Sprint Days
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sprint Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sprint Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">On Track for Completion</span>
                <span className={`text-sm font-medium ${burnupData.projections.onTrack ? 'text-green-600' : 'text-red-600'}`}>
                  {burnupData.projections.onTrack ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Projected Completion</span>
                <span className="text-sm font-medium text-gray-900">{burnupData.projections.projectedCompletion}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Velocity Trend</span>
                <span className="text-sm font-medium text-blue-600 capitalize">{burnupData.projections.velocityTrend}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Scope Changes</span>
                <span className="text-sm font-medium text-orange-600">{burnupData.projections.scopeChanges}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Work Completion Rate</div>
                <div className="text-2xl font-bold text-green-600">{progressPercentage.toFixed(1)}%</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Remaining Work</div>
                <div className="text-2xl font-bold text-blue-600">{burnupData.sprint.totalScope - burnupData.sprint.completedWork}</div>
                <div className="text-xs text-gray-500">story points</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Days Remaining</div>
                <div className="text-2xl font-bold text-orange-600">{burnupData.sprint.totalDays - burnupData.sprint.daysElapsed}</div>
                <div className="text-xs text-gray-500">working days</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Burnup;
