
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import DatePicker from "@/components/DatePicker";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Generate dummy metrics based on selected date
  const getMetricsForDate = (date: Date | undefined) => {
    if (!date) return { completion: 0, activeIssues: 0, deadlinesToday: 0 };
    
    const dayOfWeek = date.getDay();
    const completion = 65 + (dayOfWeek * 5);
    const activeIssues = 8 - dayOfWeek;
    const deadlinesToday = Math.max(0, 3 - dayOfWeek);
    
    return { completion, activeIssues, deadlinesToday };
  };

  const metrics = getMetricsForDate(selectedDate);

  return (
    <div className="p-6 space-y-6 font-dm-sans">
      {/* Header with Date Picker */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600 mt-1">Welcome back! Here's your overview</p>
        </div>
        <DatePicker onDateChange={setSelectedDate} />
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-[#270E2B]">{metrics.completion}%</div>
            <div className="text-sm text-gray-600">Task Completion Rate</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-orange-600">{metrics.activeIssues}</div>
            <div className="text-sm text-gray-600">Active Issues</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-600">{metrics.deadlinesToday}</div>
            <div className="text-sm text-gray-600">Deadlines Due Today</div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-sm text-gray-700">Task "Website Redesign" marked as complete</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="text-sm text-gray-700">New issue reported in Authentication module</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                <span className="text-sm text-gray-700">Sprint planning meeting scheduled</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-red-50">
                <span className="text-sm font-medium">Mobile App Testing</span>
                <span className="text-xs text-red-600">Due Today</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-yellow-50">
                <span className="text-sm font-medium">API Documentation</span>
                <span className="text-xs text-yellow-600">Due Tomorrow</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-blue-50">
                <span className="text-sm font-medium">User Feedback Review</span>
                <span className="text-xs text-blue-600">Due in 3 days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
