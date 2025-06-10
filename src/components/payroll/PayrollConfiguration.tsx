
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
    { id: "salary", name: "Salary Components", icon: DollarSign, component: SalaryComponentsStructure },
    { id: "leave", name: "Leave Policy", icon: Calendar, component: LeavePolicy },
    { id: "office", name: "Office Timings", icon: Clock, component: OfficeTimings },
    { id: "attendance", name: "Attendance Settings", icon: Clock, component: AttendanceSettings },
    { id: "reimbursement", name: "Reimbursements", icon: Receipt, component: ReimbursementSettings },
    { id: "payslip", name: "Payslip Settings", icon: FileText, component: PayslipSettings },
    { id: "roles", name: "Role Permissions", icon: Users, component: RolePermissions },
    { id: "notifications", name: "Notifications", icon: Bell, component: NotificationSettings },
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
          <h1 className="text-3xl font-bold text-gray-900">Payroll Configuration</h1>
          <p className="text-gray-600 mt-2">Configure all payroll settings and rules</p>
        </div>
      </div>

      {/* Configuration Tabs */}
      <Tabs defaultValue="company" className="w-full">
        <TabsList className="grid grid-cols-6 lg:grid-cols-11 w-full">
          {configSections.map((section) => {
            const Icon = section.icon;
            return (
              <TabsTrigger key={section.id} value={section.id} className="flex items-center space-x-1">
                <Icon className="w-4 h-4" />
                <span className="hidden lg:inline">{section.name}</span>
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
