
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, Settings, Shield, DollarSign, Calendar, Clock, Receipt, FileText, Users, Bell } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
    <div className="min-h-screen bg-[#F9F9FB] w-full">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="outline" className="mr-4" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Payroll
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Payroll Configuration</h1>
              <p className="text-gray-600 mt-2">Configure all payroll settings and rules</p>
            </div>
          </div>
        </div>

        {/* Configuration Accordion */}
        <Card>
          <CardHeader>
            <CardTitle>Configuration Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full space-y-2">
              {configSections.map((section) => {
                const Icon = section.icon;
                const Component = section.component;
                return (
                  <AccordionItem key={section.id} value={section.id} className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">{section.name}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 pb-2">
                      <Component onComplete={() => handleSectionComplete(section.id)} />
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PayrollConfiguration;
