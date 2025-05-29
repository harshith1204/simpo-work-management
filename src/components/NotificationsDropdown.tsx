
import { useState } from "react";
import { Bell, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuHeader,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NotificationsDropdown = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New issue assigned",
      message: "ISS-001: Login page not responsive has been assigned to you",
      time: "5 minutes ago",
      read: false,
      type: "assignment"
    },
    {
      id: 2,
      title: "Project milestone completed",
      message: "Website Redesign milestone 'Design System Ready' has been completed",
      time: "1 hour ago",
      read: false,
      type: "milestone"
    },
    {
      id: 3,
      title: "Comment on your issue",
      message: "Sarah Wilson commented on ISS-003: User profile images not loading",
      time: "2 hours ago",
      read: true,
      type: "comment"
    },
    {
      id: 4,
      title: "Due date reminder",
      message: "Task 'Mobile responsive layout' is due tomorrow",
      time: "3 hours ago",
      read: false,
      type: "reminder"
    },
    {
      id: 5,
      title: "New team member",
      message: "Alex Chen has joined the Website Redesign project",
      time: "1 day ago",
      read: true,
      type: "team"
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "assignment": return "📋";
      case "milestone": return "🎯";
      case "comment": return "💬";
      case "reminder": return "⏰";
      case "team": return "👥";
      default: return "📌";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 text-white">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 bg-white" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="font-semibold">Notifications</h4>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              <Check className="w-4 h-4 mr-1" />
              Mark all read
            </Button>
          )}
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
            >
              <div className="flex items-start space-x-3">
                <div className="text-lg">{getTypeIcon(notification.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{notification.title}</p>
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        className="p-1 h-auto"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t">
          <Button variant="ghost" className="w-full text-sm">
            View all notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsDropdown;
