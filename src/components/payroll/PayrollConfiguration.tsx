
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

      {/* Settings Content */}
      <Tabs defaultValue="company-details" className="w-full">
        <TabsList className="grid w-full grid-cols-6 lg:grid-cols-11 h-auto gap-1 p-1">
          <TabsTrigger 
            value="company-details" 
            className="flex items-center space-x-1 px-2 py-2 text-xs"
          >
            <Building2 className="w-3 h-3" />
            <span className="hidden sm:inline">Company</span>
          </TabsTrigger>
          <TabsTrigger 
            value="payroll-settings" 
            className="flex items-center space-x-1 px-2 py-2 text-xs"
          >
            <Settings className="w-3 h-3" />
            <span className="hidden sm:inline">Payroll</span>
          </TabsTrigger>
          <TabsTrigger 
            value="compliance" 
            className="flex items-center space-x-1 px-2 py-2 text-xs"
          >
            <Shield className="w-3 h-3" />
            <span className="hidden sm:inline">Compliance</span>
          </TabsTrigger>
          <TabsTrigger 
            value="salary-components" 
            className="flex items-center space-x-1 px-2 py-2 text-xs"
          >
            <DollarSign className="w-3 h-3" />
            <span className="hidden sm:inline">Salary</span>
          </TabsTrigger>
          <TabsTrigger 
            value="leave-policy" 
            className="flex items-center space-x-1 px-2 py-2 text-xs"
          >
            <Calendar className="w-3 h-3" />
            <span className="hidden sm:inline">Leave</span>
          </TabsTrigger>
          <TabsTrigger 
            value="office-timings" 
            className="flex items-center space-x-1 px-2 py-2 text-xs"
          >
            <Clock className="w-3 h-3" />
            <span className="hidden sm:inline">Timings</span>
          </TabsTrigger>
          <TabsTrigger 
            value="attendance" 
            className="flex items-center space-x-1 px-2 py-2 text-xs"
          >
            <Users className="w-3 h-3" />
            <span className="hidden sm:inline">Attendance</span>
          </TabsTrigger>
          <TabsTrigger 
            value="reimbursement" 
            className="flex items-center space-x-1 px-2 py-2 text-xs"
          >
            <Receipt className="w-3 h-3" />
            <span className="hidden sm:inline">Reimburse</span>
          </TabsTrigger>
          <TabsTrigger 
            value="payslip-settings" 
            className="flex items-center space-x-1 px-2 py-2 text-xs"
          >
            <FileText className="w-3 h-3" />
            <span className="hidden sm:inline">Payslip</span>
          </TabsTrigger>
          <TabsTrigger 
            value="roles-access" 
            className="flex items-center space-x-1 px-2 py-2 text-xs"
          >
            <Shield className="w-3 h-3" />
            <span className="hidden sm:inline">Roles</span>
          </TabsTrigger>
          <TabsTrigger 
            value="notifications" 
            className="flex items-center space-x-1 px-2 py-2 text-xs"
          >
            <Bell className="w-3 h-3" />
            <span className="hidden sm:inline">Notify</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="company-details" className="mt-6">
          <CompanyDetails onComplete={() => handleSectionComplete("company-details")} />
        </TabsContent>

        <TabsContent value="payroll-settings" className="mt-6">
          <PayrollSettings onComplete={() => handleSectionComplete("payroll-settings")} />
        </TabsContent>

        <TabsContent value="compliance" className="mt-6">
          <ComplianceSettings onComplete={() => handleSectionComplete("compliance")} />
        </TabsContent>

        <TabsContent value="salary-components" className="mt-6">
          <SalaryComponentsStructure onComplete={() => handleSectionComplete("salary-components")} />
        </TabsContent>

        <TabsContent value="leave-policy" className="mt-6">
          <LeavePolicy onComplete={() => handleSectionComplete("leave-policy")} />
        </TabsContent>

        <TabsContent value="office-timings" className="mt-6">
          <OfficeTimings onComplete={() => handleSectionComplete("office-timings")} />
        </TabsContent>

        <TabsContent value="attendance" className="mt-6">
          <AttendanceSettings onComplete={() => handleSectionComplete("attendance")} />
        </TabsContent>

        <TabsContent value="reimbursement" className="mt-6">
          <ReimbursementSettings onComplete={() => handleSectionComplete("reimbursement")} />
        </TabsContent>

        <TabsContent value="payslip-settings" className="mt-6">
          <PayslipSettings onComplete={() => handleSectionComplete("payslip-settings")} />
        </TabsContent>

        <TabsContent value="roles-access" className="mt-6">
          <RolePermissions onComplete={() => handleSectionComplete("roles-access")} />
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <NotificationSettings onComplete={() => handleSectionComplete("notifications")} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PayrollConfiguration;
