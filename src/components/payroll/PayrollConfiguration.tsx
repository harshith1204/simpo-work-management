
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

  const configSections = [
    { id: "company", name: "Company Details", icon: Building2, component: CompanyDetails },
    { id: "payroll", name: "Payroll Settings", icon: Settings, component: PayrollSettings },
    { id: "compliance", name: "Compliance & Statutory", icon: Shield, component: ComplianceSettings },
    { id: "salary", name: "Salary Components & Structure", icon: DollarSign, component: SalaryComponentsStructure },
    { id: "leave", name: "Leave Policy", icon: Calendar, component: LeavePolicy },
    { id: "office", name: "Office Timings & Shifts", icon: Clock, component: OfficeTimings },
    { id: "attendance", name: "Attendance Settings", icon: Clock, component: AttendanceSettings },
    { id: "reimbursement", name: "Reimbursement Settings", icon: Receipt, component: ReimbursementSettings },
    { id: "payslip", name: "Payslip Settings", icon: FileText, component: PayslipSettings },
    { id: "roles", name: "Roles & Access Management", icon: Users, component: RolePermissions },
    { id: "notifications", name: "Notification Settings", icon: Bell, component: NotificationSettings },
  ];

  const handleSectionComplete = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId]);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center">
        <Button variant="outline" size="icon" className="mr-4" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payroll Settings</h1>
          <p className="text-gray-600 mt-2">Configure all payroll settings and rules</p>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="company" className="w-full">
        <TabsList className="grid grid-cols-4 lg:grid-cols-11 w-full h-auto flex-wrap gap-1">
          {configSections.map((section) => {
            const Icon = section.icon;
            return (
              <TabsTrigger 
                key={section.id} 
                value={section.id} 
                className="flex items-center space-x-1 px-2 py-2 text-xs lg:text-sm whitespace-nowrap min-w-0"
              >
                <Icon className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                <span className="hidden lg:inline truncate">{section.name}</span>
                <span className="lg:hidden truncate">{section.name.split(' ')[0]}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {configSections.map((section) => {
          const Component = section.component;
          return (
            <TabsContent key={section.id} value={section.id} className="mt-6">
              <Component onComplete={() => handleSectionComplete(section.id)} />
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default PayrollConfiguration;
