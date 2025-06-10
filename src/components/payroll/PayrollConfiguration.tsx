
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, Settings, Shield, DollarSign, Calendar, Clock, Receipt, FileText, Users, Bell } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PayrollSettings from "./config/PayrollSettings";

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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="w-5 h-5" />
                <span>Company Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Legal and operational details required for payroll setup.</p>
              <div className="text-center py-8">
                <p className="text-sm text-gray-500">Company Details configuration will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payroll-settings" className="mt-6">
          <PayrollSettings onComplete={() => handleSectionComplete("payroll-settings")} />
        </TabsContent>

        <TabsContent value="compliance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Compliance & Statutory</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Set regulatory IDs and percentages for payroll deductions.</p>
              <div className="text-center py-8">
                <p className="text-sm text-gray-500">Compliance settings will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="salary-components" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5" />
                <span>Salary Components & Structure</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Define salary heads and reusable structures for automation.</p>
              <div className="text-center py-8">
                <p className="text-sm text-gray-500">Salary components configuration will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leave-policy" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Leave Policy</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Manage leave types, entitlement logic, and salary deductions.</p>
              <div className="text-center py-8">
                <p className="text-sm text-gray-500">Leave policy configuration will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="office-timings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Office Timings & Shifts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Manage working hours and shift-wise schedules.</p>
              <div className="text-center py-8">
                <p className="text-sm text-gray-500">Office timings configuration will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Attendance Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Link attendance to payroll rules and automation.</p>
              <div className="text-center py-8">
                <p className="text-sm text-gray-500">Attendance settings will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reimbursement" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Receipt className="w-5 h-5" />
                <span>Reimbursement Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Enable or restrict reimbursements per company policy.</p>
              <div className="text-center py-8">
                <p className="text-sm text-gray-500">Reimbursement settings will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payslip-settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Payslip Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Design how employee payslips will look and what they include.</p>
              <div className="text-center py-8">
                <p className="text-sm text-gray-500">Payslip settings will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles-access" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Roles & Access Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Control who can view, edit, approve or run payroll actions.</p>
              <div className="text-center py-8">
                <p className="text-sm text-gray-500">Roles & access configuration will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Notification Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Set up alerts and communication for payroll events.</p>
              <div className="text-center py-8">
                <p className="text-sm text-gray-500">Notification settings will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PayrollConfiguration;
