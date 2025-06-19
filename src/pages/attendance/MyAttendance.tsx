
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Play, Square, Calendar, FileText, MapPin, Camera, Wifi, Timer } from "lucide-react";

const MyAttendance = () => {
  const currentStatus = {
    isCheckedIn: true,
    checkInTime: "09:15 AM",
    workingHours: "7h 23m",
    status: "Working",
    location: "Office",
    todayHours: "7h 23m",
    weekHours: "36h 15m",
    breakTime: "45m"
  };

  const todaySchedule = {
    shiftStart: "09:00 AM",
    shiftEnd: "06:00 PM",
    lunchBreak: "01:00 PM - 02:00 PM",
    totalHours: "8h 00m"
  };

  const weeklyStats = [
    { day: "Mon", date: "16", hours: "9h 15m", status: "Present", checkIn: "09:15", checkOut: "18:30" },
    { day: "Tue", date: "17", hours: "8h 45m", status: "Present", checkIn: "09:10", checkOut: "17:55" },
    { day: "Wed", date: "18", hours: "9h 00m", status: "Present", checkIn: "09:00", checkOut: "18:00" },
    { day: "Thu", date: "19", hours: "8h 30m", status: "Present", checkIn: "09:15", checkOut: "17:45" },
    { day: "Fri", date: "20", hours: "7h 23m", status: "Present", checkIn: "09:15", checkOut: "-" },
  ];

  const recentPunches = [
    { 
      date: "Today", 
      fullDate: "Dec 20, 2024",
      checkIn: "09:15 AM", 
      checkOut: "-", 
      totalHours: "7h 23m",
      mode: "Mobile App", 
      location: "Office",
      notes: "",
      status: "ongoing"
    },
    { 
      date: "Yesterday", 
      fullDate: "Dec 19, 2024",
      checkIn: "09:10 AM", 
      checkOut: "06:30 PM", 
      totalHours: "9h 20m",
      mode: "Biometric", 
      location: "Office",
      notes: "",
      status: "completed"
    },
    { 
      date: "Dec 18", 
      fullDate: "Dec 18, 2024",
      checkIn: "09:45 AM", 
      checkOut: "06:45 PM", 
      totalHours: "9h 00m",
      mode: "Mobile App", 
      location: "Office",
      notes: "Traffic delay",
      status: "late"
    },
    { 
      date: "Dec 17", 
      fullDate: "Dec 17, 2024",
      checkIn: "09:00 AM", 
      checkOut: "06:15 PM", 
      totalHours: "9h 15m",
      mode: "Biometric", 
      location: "Office",
      notes: "",
      status: "completed"
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Attendance</h1>
          <p className="text-gray-600 mt-1">Track your daily attendance and working hours</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Request Regularisation
          </Button>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            View Calendar
          </Button>
        </div>
      </div>

      {/* Clock In/Out Widget - Enhanced */}
      <Card className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-0 shadow-lg">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Clock In/Out Section */}
            <div className="lg:col-span-1 flex flex-col items-center justify-center text-center">
              <div className="p-6 bg-white rounded-full shadow-lg mb-6">
                <Clock className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {currentStatus.isCheckedIn ? 'Checked In' : 'Not Checked In'}
              </h3>
              <p className="text-gray-600 mb-4">
                {currentStatus.isCheckedIn ? `Since ${currentStatus.checkInTime}` : 'Start your workday'}
              </p>
              {currentStatus.isCheckedIn ? (
                <Button size="lg" className="bg-red-600 hover:bg-red-700 px-8 py-4 h-auto">
                  <Square className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold">Check Out</div>
                    <div className="text-sm opacity-90">End your workday</div>
                  </div>
                </Button>
              ) : (
                <Button size="lg" className="bg-green-600 hover:bg-green-700 px-8 py-4 h-auto">
                  <Play className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold">Check In</div>
                    <div className="text-sm opacity-90">Start your workday</div>
                  </div>
                </Button>
              )}
            </div>

            {/* Current Status */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Today's Status</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Timer className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-600">Working Hours</span>
                    </div>
                    <span className="font-semibold text-gray-900">{currentStatus.workingHours}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-green-600" />
                      <span className="text-gray-600">Location</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">{currentStatus.location}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-purple-600" />
                      <span className="text-gray-600">Break Time</span>
                    </div>
                    <span className="font-semibold text-gray-900">{currentStatus.breakTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shift Schedule */}
            <div className="lg:col-span-1">
              <h4 className="font-semibold text-gray-900 mb-4">Today's Schedule</h4>
              <div className="bg-white rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Shift Start</span>
                  <span className="font-semibold">{todaySchedule.shiftStart}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Shift End</span>
                  <span className="font-semibold">{todaySchedule.shiftEnd}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Lunch Break</span>
                  <span className="font-semibold text-sm">{todaySchedule.lunchBreak}</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Hours</span>
                    <span className="font-bold text-blue-600">{todaySchedule.totalHours}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Overview */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>This Week Overview</span>
              <Badge variant="outline">Week 51</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-900">{stat.day}</div>
                      <div className="text-xs text-gray-500">{stat.date}</div>
                    </div>
                    <div className="w-px h-10 bg-gray-300"></div>
                    <div>
                      <div className="font-medium text-gray-900">{stat.hours}</div>
                      <div className="text-sm text-gray-600">{stat.checkIn} - {stat.checkOut}</div>
                    </div>
                  </div>
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
              ))}
            </div>
            <div className="mt-6 pt-6 border-t">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">44h 50m</div>
                  <div className="text-sm text-gray-600">Total Hours</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">8h 58m</div>
                  <div className="text-sm text-gray-600">Avg Daily</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">100%</div>
                  <div className="text-sm text-gray-600">Attendance</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Calendar */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>December 2024</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center border">
              <div className="text-center text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-3" />
                <p className="font-medium">Monthly Calendar</p>
                <p className="text-sm">Color-coded attendance view</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>Present</span>
                </div>
                <span className="font-medium">18 days</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                  <span>Late</span>
                </div>
                <span className="font-medium">2 days</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span>Absent</span>
                </div>
                <span className="font-medium">0 days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Punches Timeline */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Punch History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPunches.map((punch, index) => (
              <div key={index} className="flex items-center justify-between p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                <div className="flex items-center space-x-6">
                  <div className="text-center min-w-[80px]">
                    <div className="text-sm font-medium text-gray-900">{punch.date}</div>
                    <div className="text-xs text-gray-500">{punch.fullDate}</div>
                  </div>
                  
                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Check In</p>
                      <p className="font-semibold text-gray-900">{punch.checkIn}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Check Out</p>
                      <p className="font-semibold text-gray-900">{punch.checkOut}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Total Hours</p>
                      <p className="font-semibold text-blue-600">{punch.totalHours}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Mode</p>
                      <div className="flex items-center space-x-1">
                        {punch.mode === "Mobile App" ? <Camera className="w-3 h-3" /> : <Wifi className="w-3 h-3" />}
                        <Badge variant="outline" className="text-xs">{punch.mode}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {punch.notes && (
                    <div className="text-right max-w-[200px]">
                      <p className="text-sm text-gray-600 italic">"{punch.notes}"</p>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Badge 
                      className={
                        punch.status === "completed" ? "bg-green-100 text-green-800" :
                        punch.status === "ongoing" ? "bg-blue-100 text-blue-800" :
                        punch.status === "late" ? "bg-orange-100 text-orange-800" :
                        "bg-gray-100 text-gray-800"
                      }
                    >
                      {punch.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
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

export default MyAttendance;
