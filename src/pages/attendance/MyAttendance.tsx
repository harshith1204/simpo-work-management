
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Play, Square, Calendar, FileText } from "lucide-react";

const MyAttendance = () => {
  const currentStatus = {
    isCheckedIn: true,
    checkInTime: "09:15 AM",
    workingHours: "7h 23m",
    status: "Working"
  };

  const weeklyStats = [
    { day: "Mon", hours: "9h 15m", status: "Present" },
    { day: "Tue", hours: "8h 45m", status: "Present" },
    { day: "Wed", hours: "9h 00m", status: "Present" },
    { day: "Thu", hours: "8h 30m", status: "Present" },
    { day: "Fri", hours: "9h 20m", status: "Present" },
  ];

  const recentPunches = [
    { date: "Today", checkIn: "09:15 AM", checkOut: "-", mode: "Mobile", notes: "" },
    { date: "Yesterday", checkIn: "09:10 AM", checkOut: "06:30 PM", mode: "Biometric", notes: "" },
    { date: "Dec 17", checkIn: "09:45 AM", checkOut: "06:45 PM", mode: "Mobile", notes: "Traffic delay" },
    { date: "Dec 16", checkIn: "09:00 AM", checkOut: "06:15 PM", mode: "Biometric", notes: "" },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Attendance</h1>
          <p className="text-gray-600 mt-2">Track your daily attendance and working hours</p>
        </div>
        <Button variant="outline">
          <FileText className="w-4 h-4 mr-2" />
          Request Regularisation
        </Button>
      </div>

      {/* Clock In/Out Widget */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white rounded-full shadow-sm">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Current Status</h3>
                <p className="text-gray-600">
                  {currentStatus.isCheckedIn ? `Checked in at ${currentStatus.checkInTime}` : 'Not checked in'}
                </p>
                <p className="text-sm text-gray-500">Working hours: {currentStatus.workingHours}</p>
              </div>
            </div>
            <div className="text-right">
              <Badge className="bg-green-100 text-green-800 mb-3">{currentStatus.status}</Badge>
              <div className="space-x-2">
                {currentStatus.isCheckedIn ? (
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Square className="w-4 h-4 mr-2" />
                    Check Out
                  </Button>
                ) : (
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Play className="w-4 h-4 mr-2" />
                    Check In
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Monthly Calendar</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-2" />
                <p>Color-coded attendance calendar</p>
                <p className="text-sm">Green: Present, Orange: Late, Red: Absent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Stats */}
        <Card>
          <CardHeader>
            <CardTitle>This Week Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weeklyStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="font-medium text-gray-900">{stat.day}</span>
                  <div className="text-right">
                    <p className="text-sm font-medium">{stat.hours}</p>
                    <Badge 
                      className={
                        stat.status === "Present" 
                          ? "bg-green-100 text-green-800"
                          : "bg-orange-100 text-orange-800"
                      }
                    >
                      {stat.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Hours:</span>
                <span className="font-semibold">44h 50m</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-600">Avg Daily:</span>
                <span className="font-semibold">8h 58m</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Punches Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Punch Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPunches.map((punch, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-sm font-medium text-gray-900 w-16">{punch.date}</div>
                  <div className="flex space-x-8">
                    <div>
                      <p className="text-xs text-gray-500">Check In</p>
                      <p className="font-medium">{punch.checkIn}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Check Out</p>
                      <p className="font-medium">{punch.checkOut}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Mode</p>
                      <Badge variant="outline">{punch.mode}</Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {punch.notes && (
                    <p className="text-sm text-gray-600 italic">{punch.notes}</p>
                  )}
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyAttendance;
