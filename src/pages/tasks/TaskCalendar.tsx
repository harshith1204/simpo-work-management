
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const TaskCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 1, 15)); // February 2024

  const calendarTasks = [
    { id: 1, title: "Design Review", date: "2024-02-15", time: "10:00 AM", type: "meeting", priority: "High" },
    { id: 2, title: "Code Review Due", date: "2024-02-16", time: "2:00 PM", type: "deadline", priority: "Medium" },
    { id: 3, title: "Sprint Planning", date: "2024-02-19", time: "9:00 AM", type: "meeting", priority: "High" },
    { id: 4, title: "User Testing", date: "2024-02-20", time: "11:00 AM", type: "task", priority: "Medium" },
    { id: 5, title: "Release Deployment", date: "2024-02-22", time: "3:00 PM", type: "deadline", priority: "Critical" },
    { id: 6, title: "Team Standup", date: "2024-02-23", time: "9:30 AM", type: "meeting", priority: "Low" },
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getTasksForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return calendarTasks.filter(task => task.date === dateStr);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "meeting": return "bg-blue-100 text-blue-800";
      case "deadline": return "bg-red-100 text-red-800";
      case "task": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  return (
    <div className="space-y-6 font-dm-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Task Calendar</h2>
          <p className="text-gray-600 mt-1">Schedule and deadline overview</p>
        </div>
        <Button className="bg-[#270E2B] hover:bg-[#270E2B]/90 text-white px-6 py-2 rounded-lg font-medium">
          <Plus className="w-4 h-4 mr-2" />
          Schedule Task
        </Button>
      </div>

      {/* Calendar Navigation */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center font-medium text-gray-600 text-sm">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before the first day of the month */}
            {Array.from({ length: firstDay }, (_, i) => (
              <div key={`empty-${i}`} className="h-24 p-1"></div>
            ))}
            
            {/* Days of the month */}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const tasksForDay = getTasksForDate(day);
              const isToday = day === 15; // Highlighting today as example
              
              return (
                <div 
                  key={day} 
                  className={`h-24 p-1 border border-gray-200 hover:bg-gray-50 cursor-pointer ${
                    isToday ? 'bg-blue-50 border-blue-300' : ''
                  }`}
                >
                  <div className={`text-sm font-medium mb-1 ${
                    isToday ? 'text-blue-600' : 'text-gray-900'
                  }`}>
                    {day}
                  </div>
                  <div className="space-y-1">
                    {tasksForDay.slice(0, 2).map(task => (
                      <div 
                        key={task.id} 
                        className={`text-xs p-1 rounded truncate ${getTypeColor(task.type)}`}
                        title={task.title}
                      >
                        {task.title}
                      </div>
                    ))}
                    {tasksForDay.length > 2 && (
                      <div className="text-xs text-gray-500 p-1">
                        +{tasksForDay.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Tasks */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming This Week</h3>
          <div className="space-y-3">
            {calendarTasks.slice(0, 4).map(task => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="font-medium text-gray-900">{task.title}</div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-3 h-3" />
                      <span>{task.date} at {task.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getTypeColor(task.type)} variant="outline">
                    {task.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskCalendar;
