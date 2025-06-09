
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  DollarSign, 
  Calendar, 
  UserCheck, 
  Heart,
  FileText,
  Calculator,
  BookOpen,
  Download,
  ArrowRight
} from "lucide-react";

interface AppsScreenProps {
  onAppSelect: (appId: string) => void;
  onInstallApp: (appId: string) => void;
  installedApps: string[];
}

const appCategories = {
  people: {
    name: "People",
    apps: [
      {
        id: "employees",
        name: "Employees",
        description: "Manage your workforce with comprehensive employee profiles",
        icon: Users,
        tags: ["HR", "Management"],
        installed: false
      },
      {
        id: "payroll",
        name: "Payroll",
        description: "Smart salary management and compliance made simple",
        icon: DollarSign,
        tags: ["Finance", "HR", "Compliance"],
        installed: false
      },
      {
        id: "attendance",
        name: "Attendance",
        description: "Track employee attendance and working hours efficiently",
        icon: Calendar,
        tags: ["HR", "Time Tracking"],
        installed: false
      },
      {
        id: "leave-management",
        name: "Leave Management",
        description: "Streamline leave requests and approvals",
        icon: UserCheck,
        tags: ["HR", "Management"],
        installed: false
      },
      {
        id: "engage",
        name: "Engage",
        description: "Boost employee engagement and satisfaction",
        icon: Heart,
        tags: ["HR", "Engagement"],
        installed: false
      }
    ]
  },
  finance: {
    name: "Finance",
    apps: [
      {
        id: "invoice",
        name: "Invoice",
        description: "Create and manage professional invoices",
        icon: FileText,
        tags: ["Finance", "Billing"],
        installed: false
      },
      {
        id: "quotation",
        name: "Quotation",
        description: "Generate quotes and proposals quickly",
        icon: Calculator,
        tags: ["Sales", "Finance"],
        installed: false
      },
      {
        id: "ledger",
        name: "Ledger",
        description: "Comprehensive accounting and bookkeeping",
        icon: BookOpen,
        tags: ["Finance", "Accounting"],
        installed: false
      }
    ]
  }
};

const AppsScreen = ({ onAppSelect, onInstallApp, installedApps }: AppsScreenProps) => {
  return (
    <div className="flex-1 p-8 bg-[#F9F9FB] overflow-auto">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">App Store</h1>
          <p className="text-gray-600">Discover and install apps to enhance your workspace</p>
        </div>

        {Object.entries(appCategories).map(([categoryKey, category]) => (
          <div key={categoryKey} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Function: {category.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {category.apps.map((app) => {
                const Icon = app.icon;
                const isInstalled = installedApps.includes(app.id);
                
                return (
                  <Card 
                    key={app.id} 
                    className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-gray-200"
                    onClick={() => onAppSelect(app.id)}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="p-3 bg-[#271A29] rounded-lg text-white">
                          <Icon className="w-6 h-6" />
                        </div>
                        {isInstalled && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Installed
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg group-hover:text-[#271A29] transition-colors">
                        {app.name}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600 line-clamp-2">
                        {app.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-2 mb-4">
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
                      <div className="flex items-center justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#271A29] hover:bg-[#271A29]/10 p-0 h-auto"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAppSelect(app.id);
                          }}
                        >
                          View Details
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                        {!isInstalled && (
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onInstallApp(app.id);
                            }}
                            className="bg-[#271A29] hover:bg-[#1a0920]"
                          >
                            <Download className="w-4 h-4 mr-2" />
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
    </div>
  );
};

export default AppsScreen;
