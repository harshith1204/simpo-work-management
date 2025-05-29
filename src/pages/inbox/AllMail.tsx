
import { FileText, MessageCircle, Wrench, Clock, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const AllMail = () => {
  const mailItems = [
    {
      id: 1,
      type: "task",
      icon: FileText,
      subject: "Design Review Meeting",
      snippet: "Can you please review the new UI mockups for the dashboard redesign? I've uploaded the latest versions to the project folder.",
      from: "Sarah",
      timestamp: "Today at 2:30 PM",
      isRead: false,
    },
    {
      id: 2,
      type: "comment",
      icon: MessageCircle,
      subject: "Sprint Planning", 
      snippet: "We are planning next week's sprint and need your input on the task priorities. Please join the meeting tomorrow at 10 AM.",
      from: "Dev Team",
      timestamp: "Yesterday at 4:15 PM",
      isRead: true,
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "task": return "bg-blue-100 text-blue-800";
      case "comment": return "bg-green-100 text-green-800";
      case "issue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 font-dm-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">All Mail</h2>
          <p className="text-gray-600 mt-1">All your work-related updates and notifications</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="rounded-full">
              Unread
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              Assigned
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              Subscribed
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              Mentions
            </Button>
          </div>
        </div>
      </div>

      {/* Mail List */}
      <div className="space-y-2">
        {mailItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Card 
              key={item.id} 
              className={`hover:shadow-md transition-all duration-200 border cursor-pointer ${
                !item.isRead ? 'bg-blue-50 border-blue-200' : 'border-gray-200'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`font-medium ${!item.isRead ? 'text-gray-900 font-semibold' : 'text-gray-700'}`}>
                        {item.subject}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {!item.isRead && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{item.timestamp}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">From: {item.from}</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {item.snippet}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Load More */}
      <div className="flex justify-center pt-4">
        <Button variant="outline" className="px-6">
          Load More Messages
        </Button>
      </div>
    </div>
  );
};

export default AllMail;
