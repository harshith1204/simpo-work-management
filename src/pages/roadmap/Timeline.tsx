
import { Calendar, Clock, Flag, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Timeline = () => {
  const timelineEvents = [
    {
      id: 1,
      title: "Q1 Security Audit Complete",
      description: "Comprehensive security review and penetration testing",
      date: "2024-03-15",
      status: "completed",
      type: "milestone",
      quarter: "Q1"
    },
    {
      id: 2,
      title: "Mobile App Beta Launch",
      description: "Initial beta release for iOS and Android platforms",
      date: "2024-03-30",
      status: "completed",
      type: "release",
      quarter: "Q1"
    },
    {
      id: 3,
      title: "API Performance Optimization",
      description: "Database optimization and caching implementation",
      date: "2024-04-15",
      status: "in-progress",
      type: "feature",
      quarter: "Q2"
    },
    {
      id: 4,
      title: "Advanced Analytics Dashboard",
      description: "Real-time analytics and reporting capabilities",
      date: "2024-05-30",
      status: "upcoming",
      type: "feature",
      quarter: "Q2"
    },
    {
      id: 5,
      title: "Multi-language Support",
      description: "Internationalization for global markets",
      date: "2024-06-15",
      status: "upcoming",
      type: "feature",
      quarter: "Q2"
    },
    {
      id: 6,
      title: "Mid-Year Review",
      description: "Strategic review and planning session",
      date: "2024-06-30",
      status: "upcoming",
      type: "milestone",
      quarter: "Q2"
    },
    {
      id: 7,
      title: "AI Integration Phase 1",
      description: "Machine learning powered recommendations",
      date: "2024-08-15",
      status: "planning",
      type: "feature",
      quarter: "Q3"
    },
    {
      id: 8,
      title: "Enterprise Features Launch",
      description: "Advanced enterprise security and compliance",
      date: "2024-09-30",
      status: "planning",
      type: "release",
      quarter: "Q3"
    },
    {
      id: 9,
      title: "Global Expansion",
      description: "Launch in European and Asian markets",
      date: "2024-11-15",
      status: "planning",
      type: "milestone",
      quarter: "Q4"
    },
    {
      id: 10,
      title: "Year-End Platform Review",
      description: "Annual performance review and 2025 planning",
      date: "2024-12-31",
      status: "planning",
      type: "milestone",
      quarter: "Q4"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "in-progress": return <Clock className="w-5 h-5 text-blue-600" />;
      case "upcoming": return <Calendar className="w-5 h-5 text-orange-600" />;
      case "planning": return <Flag className="w-5 h-5 text-gray-400" />;
      default: return <Calendar className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 border-green-200";
      case "in-progress": return "bg-blue-100 text-blue-800 border-blue-200";
      case "upcoming": return "bg-orange-100 text-orange-800 border-orange-200";
      case "planning": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "milestone": return "🎯";
      case "release": return "🚀";
      case "feature": return "⚡";
      default: return "📋";
    }
  };

  const quarters = ["Q1", "Q2", "Q3", "Q4"];

  return (
    <div className="space-y-6 font-dm-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">2024 Product Timeline</h2>
          <p className="text-gray-600 mt-1">Roadmap timeline with key milestones and releases</p>
        </div>
      </div>

      {/* Quarter Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {quarters.map((quarter) => {
          const quarterEvents = timelineEvents.filter(event => event.quarter === quarter);
          const completedCount = quarterEvents.filter(event => event.status === "completed").length;
          
          return (
            <Card key={quarter}>
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{quarter} 2024</h3>
                  <div className="text-2xl font-bold text-blue-600 mb-1">{quarterEvents.length}</div>
                  <div className="text-sm text-gray-600">Items</div>
                  <div className="mt-2 text-xs text-gray-500">
                    {completedCount} completed
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-[#270E2B]" />
            <span>Timeline View</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {timelineEvents.map((event, index) => (
              <div key={event.id} className="flex items-start space-x-4">
                {/* Timeline Line */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
                    {getStatusIcon(event.status)}
                  </div>
                  {index < timelineEvents.length - 1 && (
                    <div className="w-px h-16 bg-gray-200 mt-2"></div>
                  )}
                </div>

                {/* Event Content */}
                <div className="flex-1 pb-8">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{event.title}</h3>
                        <span className="text-lg">{getTypeIcon(event.type)}</span>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}>
                          {event.status.replace("-", " ").toUpperCase()}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Flag className="w-3 h-3" />
                          <span>{event.quarter}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700">Completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">In Progress</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-orange-600" />
              <span className="text-sm text-gray-700">Upcoming</span>
            </div>
            <div className="flex items-center space-x-2">
              <Flag className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">Planning</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-lg">🎯</span>
                <span className="text-sm text-gray-700">Milestone</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">🚀</span>
                <span className="text-sm text-gray-700">Release</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">⚡</span>
                <span className="text-sm text-gray-700">Feature</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Timeline;
