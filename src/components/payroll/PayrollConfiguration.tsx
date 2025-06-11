
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, Settings, Shield, DollarSign, Calendar, Clock, Receipt, FileText, Users, Bell } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanyDetails from "./config/CompanyDetails";
import PayrollSettings from "./config/PayrollSettings";
import ComplianceSettings from "./config/ComplianceSettings";
import SalaryComponentsStructure from "./config/SalaryComponentsStructure";
import LeavePolicy from "./config/LeavePolicy";
import OfficeTimings from "./config/OfficeTimings";
import AttendanceSettings from "./config/AttendanceSettings";
import ReimbursementSettings from "./config/ReimbursementSettings";
import PayslipSettings from "./config/PayslipSettings";
import RolePermissions from "./config/RolePermissions";
import NotificationSettings from "./config/NotificationSettings";

interface PayrollConfigurationProps {
  onBack: () => void;
}

const PayrollConfiguration = ({ onBack }: PayrollConfigurationProps) => {
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  const handleSectionComplete = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId]);
    }
  };

  const settingSections = [
    {
      id: "company-details",
      title: "Company",
      icon: Building2,
      component: CompanyDetails,
      description: "Company information and registration details"
    },
    {
      id: "payroll-settings",
      title: "Payroll",
      icon: Settings,
      component: PayrollSettings,
      description: "Core payroll configuration and processing rules"
    },
    {
      id: "compliance",
      title: "Compliance",
      icon: Shield,
      component: ComplianceSettings,
      description: "Statutory compliance and tax settings"
    },
    {
      id: "salary-components",
      title: "Salary Components",
      icon: DollarSign,
      component: SalaryComponentsStructure,
      description: "Define salary structure and components"
    },
    {
      id: "leave-policy",
      title: "Leave Policy",
      icon: Calendar,
      component: LeavePolicy,
      description: "Leave types, policies and accrual rules"
    },
    {
      id: "office-timings",
      title: "Work Schedule",
      icon: Clock,
      component: OfficeTimings,
      description: "Working hours and shift configurations"
    },
    {
      id: "attendance",
      title: "Attendance",
      icon: Users,
      component: AttendanceSettings,
      description: "Attendance tracking and integration settings"
    },
    {
      id: "reimbursement",
      title: "Reimbursements",
      icon: Receipt,
      component: ReimbursementSettings,
      description: "Expense categories and reimbursement policies"
    },
    {
      id: "payslip-settings",
      title: "Payslip",
      icon: FileText,
      component: PayslipSettings,
      description: "Payslip format and display preferences"
    },
    {
      id: "roles-access",
      title: "User Roles",
      icon: Shield,
      component: RolePermissions,
      description: "Access control and permission management"
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: Bell,
      component: NotificationSettings,
      description: "Email and SMS notification preferences"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center">
          <Button variant="outline" size="icon" className="mr-4" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payroll Settings</h1>
            <p className="text-gray-600 mt-1">Configure your payroll system settings and policies</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Left Sidebar - Settings Menu */}
        <div className="w-80 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings Categories</h2>
            <div className="space-y-2">
              {settingSections.map((section) => {
                const Icon = section.icon;
                const isCompleted = completedSections.includes(section.id);
                return (
                  <div
                    key={section.id}
                    className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${isCompleted ? 'bg-green-100' : 'bg-gray-100 group-hover:bg-blue-100'}`}>
                        <Icon className={`w-5 h-5 ${isCompleted ? 'text-green-600' : 'text-gray-600 group-hover:text-blue-600'}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 group-hover:text-blue-900">
                          {section.title}
                          {isCompleted && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Configured
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1">
          <Tabs defaultValue="company-details" className="w-full">
            <TabsList className="w-full justify-start bg-white border-b border-gray-200 rounded-none h-auto p-0">
              {settingSections.map((section) => {
                const Icon = section.icon;
                return (
                  <TabsTrigger
                    key={section.id}
                    value={section.id}
                    className="flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-none"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{section.title}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {settingSections.map((section) => {
              const Component = section.component;
              return (
                <TabsContent key={section.id} value={section.id} className="mt-0">
                  <div className="p-6">
                    <Component onComplete={() => handleSectionComplete(section.id)} />
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PayrollConfiguration;
