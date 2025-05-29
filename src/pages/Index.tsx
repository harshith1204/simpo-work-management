
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Plus, CheckSquare, Clock, Users, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const Index = () => {
  const [date, setDate] = useState<Date>(new Date());

  // Dummy metrics based on selected date
  const getMetricsForDate = (selectedDate: Date) => {
    const day = selectedDate.getDate();
    return {
      taskCompletion: Math.min(95, 60 + (day % 30)),
      activeIssues: Math.max(1, 15 - (day % 10)),
      deadlinesToday: Math.max(0, (day % 5)),
      teamMembers: 12 + (day % 3)
    };
  };

  const metrics = getMetricsForDate(date);

  return (
    <div className="p-6 space-y-6 bg-[#F9F9FB] min-h-screen font-dm-sans">
      {/* Header with Date Picker */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-[#3D5AFE]">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-[#3D5AFE]/10">
                <CheckSquare className="h-6 w-6 text-[#3D5AFE]" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Task Completion</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.taskCompletion}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Issues</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.activeIssues}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100">
                <TrendingUp className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Due Today</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.deadlinesToday}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Team Members</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.teamMembers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#3D5AFE] rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">Task "API Documentation" was completed</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">New issue reported in "Security Updates"</p>
                  <p className="text-xs text-gray-500">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">Project "Website Redesign" milestone reached</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Security Audit Review</p>
                  <p className="text-xs text-gray-500">Due today</p>
                </div>
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">High</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Mobile App Testing</p>
                  <p className="text-xs text-gray-500">Due tomorrow</p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Medium</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Documentation Update</p>
                  <p className="text-xs text-gray-500">Due in 3 days</p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Low</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
