
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AttendanceCalendarProps {
  isOpen: boolean;
  onClose: () => void;
  onDateSelect?: (date: string) => void;
}

const AttendanceCalendar = ({ isOpen, onClose, onDateSelect }: AttendanceCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  if (!isOpen) return null;

  // Sample attendance data
  const attendanceData = {
    "2024-12-01": { status: "present", checkIn: "09:15", checkOut: "18:30", hours: "9h 15m" },
    "2024-12-02": { status: "present", checkIn: "09:00", checkOut: "18:00", hours: "9h 00m" },
    "2024-12-03": { status: "late", checkIn: "09:45", checkOut: "18:30", hours: "8h 45m" },
    "2024-12-04": { status: "present", checkIn: "09:10", checkOut: "18:15", hours: "9h 05m" },
    "2024-12-05": { status: "wfh", checkIn: "09:30", checkOut: "18:00", hours: "8h 30m" },
    "2024-12-06": { status: "present", checkIn: "09:05", checkOut: "18:20", hours: "9h 15m" },
    "2024-12-07": { status: "weekend", checkIn: "-", checkOut: "-", hours: "-" },
    "2024-12-08": { status: "weekend", checkIn: "-", checkOut: "-", hours: "-" },
    "2024-12-09": { status: "leave", checkIn: "-", checkOut: "-", hours: "-" },
    "2024-12-10": { status: "present", checkIn: "09:20", checkOut: "18:25", hours: "9h 05m" },
    "2024-12-11": { status: "absent", checkIn: "-", checkOut: "-", hours: "-" },
    "2024-12-12": { status: "present", checkIn: "09:00", checkOut: "18:10", hours: "9h 10m" },
    "2024-12-13": { status: "late", checkIn: "09:50", checkOut: "18:30", hours: "8h 40m" },
    "2024-12-14": { status: "weekend", checkIn: "-", checkOut: "-", hours: "-" },
    "2024-12-15": { status: "weekend", checkIn: "-", checkOut: "-", hours: "-" },
    "2024-12-16": { status: "present", checkIn: "09:15", checkOut: "18:30", hours: "9h 15m" },
    "2024-12-17": { status: "wfh", checkIn: "09:00", checkOut: "17:45", hours: "8h 45m" },
    "2024-12-18": { status: "present", checkIn: "09:25", checkOut: "18:20", hours: "8h 55m" },
    "2024-12-19": { status: "late", checkIn: "09:45", checkOut: "18:30", hours: "8h 45m" },
    "2024-12-20": { status: "present", checkIn: "09:15", checkOut: "-", hours: "7h 23m" },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present": return "bg-green-500";
      case "late": return "bg-orange-500";
      case "absent": return "bg-red-500";
      case "leave": return "bg-yellow-500";
      case "wfh": return "bg-blue-500";
      case "weekend": return "bg-gray-300";
      default: return "bg-gray-200";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present": return <Badge className="bg-green-100 text-green-800">Present</Badge>;
      case "late": return <Badge className="bg-orange-100 text-orange-800">Late</Badge>;
      case "absent": return <Badge className="bg-red-100 text-red-800">Absent</Badge>;
      case "leave": return <Badge className="bg-yellow-100 text-yellow-800">Leave</Badge>;
      case "wfh": return <Badge className="bg-blue-100 text-blue-800">WFH</Badge>;
      case "weekend": return <Badge className="bg-gray-100 text-gray-800">Weekend</Badge>;
      default: return null;
    }
  };

  const selectedDateKey = selectedDate?.toISOString().split('T')[0];
  const selectedAttendance = selectedDateKey ? attendanceData[selectedDateKey as keyof typeof attendanceData] : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle>Attendance Calendar</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calendar */}
              <div className="lg:col-span-2">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  month={currentMonth}
                  onMonthChange={setCurrentMonth}
                  className="rounded-md border p-3"
                  modifiers={{
                    present: (date) => {
                      const key = date.toISOString().split('T')[0];
                      return attendanceData[key as keyof typeof attendanceData]?.status === "present";
                    },
                    late: (date) => {
                      const key = date.toISOString().split('T')[0];
                      return attendanceData[key as keyof typeof attendanceData]?.status === "late";
                    },
                    absent: (date) => {
                      const key = date.toISOString().split('T')[0];
                      return attendanceData[key as keyof typeof attendanceData]?.status === "absent";
                    },
                    leave: (date) => {
                      const key = date.toISOString().split('T')[0];
                      return attendanceData[key as keyof typeof attendanceData]?.status === "leave";
                    },
                    wfh: (date) => {
                      const key = date.toISOString().split('T')[0];
                      return attendanceData[key as keyof typeof attendanceData]?.status === "wfh";
                    },
                    weekend: (date) => {
                      const key = date.toISOString().split('T')[0];
                      return attendanceData[key as keyof typeof attendanceData]?.status === "weekend";
                    }
                  }}
                  modifiersStyles={{
                    present: { backgroundColor: '#22c55e', color: 'white' },
                    late: { backgroundColor: '#f97316', color: 'white' },
                    absent: { backgroundColor: '#ef4444', color: 'white' },
                    leave: { backgroundColor: '#eab308', color: 'white' },
                    wfh: { backgroundColor: '#3b82f6', color: 'white' },
                    weekend: { backgroundColor: '#9ca3af', color: 'white' }
                  }}
                />
              </div>

              {/* Details Panel */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Selected Date Details</h4>
                  {selectedAttendance ? (
                    <div className="space-y-3">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">
                          {selectedDate?.toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                        <div className="mt-2">
                          {getStatusBadge(selectedAttendance.status)}
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Check In:</span>
                          <span className="font-medium">{selectedAttendance.checkIn}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Check Out:</span>
                          <span className="font-medium">{selectedAttendance.checkOut}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Hours:</span>
                          <span className="font-medium">{selectedAttendance.hours}</span>
                        </div>
                      </div>

                      {selectedAttendance.status !== "weekend" && selectedAttendance.status !== "leave" && (
                        <div className="pt-3">
                          <Button 
                            size="sm" 
                            className="w-full"
                            onClick={() => {
                              if (onDateSelect && selectedDateKey) {
                                onDateSelect(selectedDateKey);
                                onClose();
                              }
                            }}
                          >
                            Request Regularisation
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-4">
                      Select a date to view details
                    </div>
                  )}
                </div>

                {/* Legend */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Legend</h4>
                  <div className="space-y-2 text-sm">
                    {[
                      { status: "present", label: "Present", color: "bg-green-500" },
                      { status: "late", label: "Late", color: "bg-orange-500" },
                      { status: "absent", label: "Absent", color: "bg-red-500" },
                      { status: "leave", label: "Leave", color: "bg-yellow-500" },
                      { status: "wfh", label: "Work from Home", color: "bg-blue-500" },
                      { status: "weekend", label: "Weekend", color: "bg-gray-400" }
                    ].map((item) => (
                      <div key={item.status} className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded ${item.color}`}></div>
                        <span className="text-gray-700">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Monthly Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Present Days:</span>
                      <span className="font-medium text-green-600">18</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Late Days:</span>
                      <span className="font-medium text-orange-600">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Absent Days:</span>
                      <span className="font-medium text-red-600">1</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">WFH Days:</span>
                      <span className="font-medium text-blue-600">2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Leave Days:</span>
                      <span className="font-medium text-yellow-600">1</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttendanceCalendar;
