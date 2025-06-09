
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign, Calendar, Heart, FileText, Receipt, BarChart3 } from "lucide-react";

interface App {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  installed: boolean;
}

interface AppGroup {
  category: string;
  apps: App[];
}

const Apps = () => {
  const [installedApps, setInstalledApps] = useState<string[]>([]);

  const appGroups: AppGroup[] = [
    {
      category: "People",
      apps: [
        {
          id: "employees",
          name: "Employees",
          description: "Manage employee profiles, organizational chart, and employee data",
          icon: <Users className="w-6 h-6" />,
          tags: ["HR", "Management"],
          installed: false
        },
        {
          id: "payroll",
          name: "Payroll",
          description: "Handle salary processing, deductions, and compliance automatically",
          icon: <DollarSign className="w-6 h-6" />,
          tags: ["Finance", "HR", "Compliance"],
          installed: false
        },
        {
          id: "attendance",
          name: "Attendance",
          description: "Track employee attendance, time logs, and working hours",
          icon: <Calendar className="w-6 h-6" />,
          tags: ["HR", "Tracking"],
          installed: false
        },
        {
          id: "leave-management",
          name: "Leave Management",
          description: "Manage leave requests, approvals, and leave balances",
          icon: <Calendar className="w-6 h-6" />,
          tags: ["HR", "Management"],
          installed: false
        },
        {
          id: "engage",
          name: "Engage",
          description: "Employee engagement surveys and feedback management",
          icon: <Heart className="w-6 h-6" />,
          tags: ["HR", "Engagement"],
          installed: false
        }
      ]
    },
    {
      category: "Finance",
      apps: [
        {
          id: "invoice",
          name: "Invoice",
          description: "Create, send, and manage invoices with automated follow-ups",
          icon: <FileText className="w-6 h-6" />,
          tags: ["Finance", "Billing"],
          installed: false
        },
        {
          id: "quotation",
          name: "Quotation",
          description: "Generate professional quotes and proposals for clients",
          icon: <Receipt className="w-6 h-6" />,
          tags: ["Sales", "Finance"],
          installed: false
        },
        {
          id: "ledger",
          name: "Ledger",
          description: "Complete accounting and financial record management",
          icon: <BarChart3 className="w-6 h-6" />,
          tags: ["Finance", "Accounting"],
          installed: false
        }
      ]
    }
  ];

  const handleInstall = (appId: string) => {
    setInstalledApps([...installedApps, appId]);
  };

  return (
    <div className="p-6 space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Apps</h1>
        <p className="text-gray-600">Discover and install apps to extend your workspace functionality</p>
      </div>

      {appGroups.map((group) => (
        <div key={group.category} className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
            {group.category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {group.apps.map((app) => {
              const isInstalled = installedApps.includes(app.id);
              return (
                <Card key={app.id} className="hover:shadow-lg transition-all duration-200 border border-gray-200 rounded-xl">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                          {app.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg font-semibold text-gray-900">
                            {app.name}
                          </CardTitle>
                        </div>
                      </div>
                      {isInstalled && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Installed
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {app.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {app.tags.map((tag) => (
                          <Badge 
                            key={tag} 
                            variant="outline" 
                            className="text-xs border-gray-300 text-gray-600"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      {!isInstalled && (
                        <Button 
                          size="sm"
                          onClick={() => handleInstall(app.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium"
                        >
                          Install
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Apps;
