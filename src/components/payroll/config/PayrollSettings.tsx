
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Upload, Settings, Calendar, Building, Shield, DollarSign, Users, Bell, Clock, Receipt, FileText, CreditCard } from "lucide-react";

interface PayrollSettingsProps {
  onComplete: () => void;
}

const PayrollSettings = ({ onComplete }: PayrollSettingsProps) => {
  // Company Details State
  const [companyDetails, setCompanyDetails] = useState({
    companyName: "",
    panNumber: "",
    gstNumber: "",
    cinNumber: "",
    registeredAddress: "",
    hrContactName: "",
    hrContactPhone: "",
    companyLogo: null as File | null
  });

  const [workLocations, setWorkLocations] = useState([
    { name: "", city: "", state: "", pin: "" }
  ]);

  // Payroll Settings State
  const [payrollSettings, setPayrollSettings] = useState({
    frequency: "",
    cycleStartDate: "",
    disbursementDay: "",
    prorataRule: "calendar",
    autoLock: false,
    enableGratuity: false,
    defaultSalaryStructure: ""
  });

  // Compliance State
  const [complianceSettings, setComplianceSettings] = useState({
    pf: {
      enabled: false,
      registrationNumber: "",
      adminCode: "",
      employeeContribution: "12",
      employerContribution: "12"
    },
    esi: {
      enabled: false,
      registrationNumber: "",
      employeeContribution: "0.75",
      employerContribution: "3.25"
    },
    pt: {
      enabled: false,
      state: ""
    },
    tds: {
      tanNumber: "",
      enableDeclaration: false,
      autoCalculation: false
    }
  });

  // Salary Components State
  const [salaryComponents, setSalaryComponents] = useState([
    { name: "Basic Salary", type: "earning", taxable: true, fixed: true, amount: "" }
  ]);

  const [salaryTemplates, setSalaryTemplates] = useState([
    { name: "Standard Template", components: [], roles: [], allowOverrides: true }
  ]);

  // Leave Policy State
  const [leavePolicy, setLeavePolicy] = useState([
    {
      type: "Annual Leave",
      quota: 21,
      carryForward: true,
      maxCarryForward: 5,
      encashment: false,
      cycle: "calendar",
      autoLOP: true
    }
  ]);

  // Office Timings State
  const [officeTimings, setOfficeTimings] = useState({
    inTime: "09:00",
    outTime: "18:00",
    workingDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    breakDuration: 60,
    gracePeriod: 15,
    minHours: 8,
    enableOvertime: false
  });

  const [shifts, setShifts] = useState([
    { name: "General Shift", inTime: "09:00", outTime: "18:00", breakDuration: 60, roles: [] }
  ]);

  // Attendance Settings State
  const [attendanceSettings, setAttendanceSettings] = useState({
    source: "manual",
    overtimeTracking: false,
    markLOP: true,
    gracePeriod: 15,
    syncWithPayroll: true
  });

  // Reimbursement Settings State
  const [reimbursements, setReimbursements] = useState([
    {
      type: "Travel",
      monthlyCap: 5000,
      taxable: false,
      approvalFlow: "manual",
      showInPayslip: true
    }
  ]);

  // Bank & Payout Settings State
  const [bankSettings, setBankSettings] = useState({
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    paymentMethod: "manual",
    exportFormat: "excel"
  });

  // Payslip Settings State
  const [payslipSettings, setPayslipSettings] = useState({
    format: "modern",
    showCTCBreakdown: false,
    showEmployerContributions: false,
    showBankAccount: true,
    showLeaveSummary: true
  });

  // Roles & Access State
  const [roles, setRoles] = useState([
    {
      name: "HR Admin",
      permissions: {
        view: true,
        edit: true,
        approve: true,
        finalize: false,
        payslipView: true
      }
    }
  ]);

  // Notification Settings State
  const [notifications, setNotifications] = useState({
    payslipGenerated: true,
    pendingPayroll: true,
    complianceDeadlines: true,
    weeklySummary: false,
    summaryDay: "monday"
  });

  const addWorkLocation = () => {
    setWorkLocations([...workLocations, { name: "", city: "", state: "", pin: "" }]);
  };

  const removeWorkLocation = (index: number) => {
    setWorkLocations(workLocations.filter((_, i) => i !== index));
  };

  const updateWorkLocation = (index: number, field: string, value: string) => {
    const updated = workLocations.map((location, i) => 
      i === index ? { ...location, [field]: value } : location
    );
    setWorkLocations(updated);
  };

  const addSalaryComponent = () => {
    setSalaryComponents([...salaryComponents, { name: "", type: "earning", taxable: true, fixed: true, amount: "" }]);
  };

  const addLeaveType = () => {
    setLeavePolicy([...leavePolicy, {
      type: "",
      quota: 0,
      carryForward: false,
      maxCarryForward: 0,
      encashment: false,
      cycle: "calendar",
      autoLOP: false
    }]);
  };

  const addShift = () => {
    setShifts([...shifts, { name: "", inTime: "09:00", outTime: "18:00", breakDuration: 60, roles: [] }]);
  };

  const addReimbursementType = () => {
    setReimbursements([...reimbursements, {
      type: "",
      monthlyCap: 0,
      taxable: false,
      approvalFlow: "manual",
      showInPayslip: true
    }]);
  };

  const addRole = () => {
    setRoles([...roles, {
      name: "",
      permissions: {
        view: false,
        edit: false,
        approve: false,
        finalize: false,
        payslipView: false
      }
    }]);
  };

  const handleSave = () => {
    console.log("Saving all payroll settings:", {
      companyDetails,
      workLocations,
      payrollSettings,
      complianceSettings,
      salaryComponents,
      salaryTemplates,
      leavePolicy,
      officeTimings,
      shifts,
      attendanceSettings,
      reimbursements,
      bankSettings,
      payslipSettings,
      roles,
      notifications
    });
    onComplete();
  };

  return (
    <Card className="w-full max-w-none">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="w-5 h-5" />
          <span>Payroll Settings</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="company" className="w-full">
          <TabsList className="grid grid-cols-11 w-full mb-6 h-auto p-1 overflow-x-auto">
            <TabsTrigger value="company" className="text-xs px-2 py-2 whitespace-nowrap">
              <Building className="w-4 h-4 mr-1" />
              Company
            </TabsTrigger>
            <TabsTrigger value="payroll" className="text-xs px-2 py-2 whitespace-nowrap">
              <Settings className="w-4 h-4 mr-1" />
              Payroll
            </TabsTrigger>
            <TabsTrigger value="compliance" className="text-xs px-2 py-2 whitespace-nowrap">
              <Shield className="w-4 h-4 mr-1" />
              Compliance
            </TabsTrigger>
            <TabsTrigger value="salary" className="text-xs px-2 py-2 whitespace-nowrap">
              <DollarSign className="w-4 h-4 mr-1" />
              Salary
            </TabsTrigger>
            <TabsTrigger value="leave" className="text-xs px-2 py-2 whitespace-nowrap">
              <Calendar className="w-4 h-4 mr-1" />
              Leave
            </TabsTrigger>
            <TabsTrigger value="timings" className="text-xs px-2 py-2 whitespace-nowrap">
              <Clock className="w-4 h-4 mr-1" />
              Timings
            </TabsTrigger>
            <TabsTrigger value="attendance" className="text-xs px-2 py-2 whitespace-nowrap">
              <Clock className="w-4 h-4 mr-1" />
              Attendance
            </TabsTrigger>
            <TabsTrigger value="reimbursement" className="text-xs px-2 py-2 whitespace-nowrap">
              <Receipt className="w-4 h-4 mr-1" />
              Reimburse
            </TabsTrigger>
            <TabsTrigger value="bank" className="text-xs px-2 py-2 whitespace-nowrap">
              <CreditCard className="w-4 h-4 mr-1" />
              Bank
            </TabsTrigger>
            <TabsTrigger value="payslip" className="text-xs px-2 py-2 whitespace-nowrap">
              <FileText className="w-4 h-4 mr-1" />
              Payslip
            </TabsTrigger>
            <TabsTrigger value="roles" className="text-xs px-2 py-2 whitespace-nowrap">
              <Users className="w-4 h-4 mr-1" />
              Roles
            </TabsTrigger>
            <TabsTrigger value="notifications" className="text-xs px-2 py-2 whitespace-nowrap">
              <Bell className="w-4 h-4 mr-1" />
              Notify
            </TabsTrigger>
          </TabsList>

          {/* 1. Company Details Tab */}
          <TabsContent value="company" className="space-y-6 mt-6">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Company Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={companyDetails.companyName}
                    onChange={(e) => setCompanyDetails({...companyDetails, companyName: e.target.value})}
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <Label htmlFor="panNumber">PAN Number *</Label>
                  <Input
                    id="panNumber"
                    value={companyDetails.panNumber}
                    onChange={(e) => setCompanyDetails({...companyDetails, panNumber: e.target.value})}
                    placeholder="AAACH1234C"
                    maxLength={10}
                  />
                </div>
                <div>
                  <Label htmlFor="gstNumber">GST Number (Optional)</Label>
                  <Input
                    id="gstNumber"
                    value={companyDetails.gstNumber}
                    onChange={(e) => setCompanyDetails({...companyDetails, gstNumber: e.target.value})}
                    placeholder="15 character alphanumeric"
                    maxLength={15}
                  />
                </div>
                <div>
                  <Label htmlFor="cinNumber">CIN Number (Optional)</Label>
                  <Input
                    id="cinNumber"
                    value={companyDetails.cinNumber}
                    onChange={(e) => setCompanyDetails({...companyDetails, cinNumber: e.target.value})}
                    placeholder="21 characters"
                    maxLength={21}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="registeredAddress">Registered Office Address</Label>
                <Textarea
                  id="registeredAddress"
                  value={companyDetails.registeredAddress}
                  onChange={(e) => setCompanyDetails({...companyDetails, registeredAddress: e.target.value})}
                  placeholder="Enter complete registered address"
                  rows={3}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label>Work Locations</Label>
                  <Button onClick={addWorkLocation} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Location
                  </Button>
                </div>
                <div className="space-y-4">
                  {workLocations.map((location, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg">
                      <Input
                        placeholder="Location Name"
                        value={location.name}
                        onChange={(e) => updateWorkLocation(index, 'name', e.target.value)}
                      />
                      <Input
                        placeholder="City"
                        value={location.city}
                        onChange={(e) => updateWorkLocation(index, 'city', e.target.value)}
                      />
                      <Input
                        placeholder="State"
                        value={location.state}
                        onChange={(e) => updateWorkLocation(index, 'state', e.target.value)}
                      />
                      <Input
                        placeholder="PIN"
                        value={location.pin}
                        onChange={(e) => updateWorkLocation(index, 'pin', e.target.value)}
                      />
                      <Button
                        onClick={() => removeWorkLocation(index)}
                        size="sm"
                        variant="outline"
                        disabled={workLocations.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hrContactName">HR Contact Person</Label>
                  <Input
                    id="hrContactName"
                    value={companyDetails.hrContactName}
                    onChange={(e) => setCompanyDetails({...companyDetails, hrContactName: e.target.value})}
                    placeholder="Contact person name"
                  />
                </div>
                <div>
                  <Label htmlFor="hrContactPhone">HR Contact Phone</Label>
                  <Input
                    id="hrContactPhone"
                    value={companyDetails.hrContactPhone}
                    onChange={(e) => setCompanyDetails({...companyDetails, hrContactPhone: e.target.value})}
                    placeholder="10-digit phone number"
                    maxLength={10}
                  />
                </div>
              </div>

              <div>
                <Label>Company Logo</Label>
                <div className="mt-2 flex items-center space-x-4">
                  <Button variant="outline" onClick={() => document.getElementById('logo-upload')?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Logo
                  </Button>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setCompanyDetails({...companyDetails, companyLogo: e.target.files?.[0] || null})}
                  />
                  {companyDetails.companyLogo && (
                    <span className="text-sm text-gray-600">{companyDetails.companyLogo.name}</span>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* 2. Payroll Settings Tab */}
          <TabsContent value="payroll" className="space-y-6 mt-6">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Payroll Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Payroll Frequency</Label>
                  <Select onValueChange={(value) => setPayrollSettings({...payrollSettings, frequency: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="cycleStartDate">Payroll Cycle Start Date</Label>
                  <Input
                    id="cycleStartDate"
                    type="date"
                    value={payrollSettings.cycleStartDate}
                    onChange={(e) => setPayrollSettings({...payrollSettings, cycleStartDate: e.target.value})}
                  />
                </div>

                <div>
                  <Label>Salary Disbursement Day</Label>
                  <Select onValueChange={(value) => setPayrollSettings({...payrollSettings, disbursementDay: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1st of month</SelectItem>
                      <SelectItem value="5">5th of month</SelectItem>
                      <SelectItem value="7">7th of month</SelectItem>
                      <SelectItem value="15">15th of month</SelectItem>
                      <SelectItem value="25">25th of month</SelectItem>
                      <SelectItem value="last">Last working day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Default Salary Structure</Label>
                  <Select onValueChange={(value) => setPayrollSettings({...payrollSettings, defaultSalaryStructure: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select structure" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Structure</SelectItem>
                      <SelectItem value="executive">Executive Structure</SelectItem>
                      <SelectItem value="junior">Junior Staff Structure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Prorata Calculation Rule</Label>
                <RadioGroup 
                  value={payrollSettings.prorataRule} 
                  onValueChange={(value) => setPayrollSettings({...payrollSettings, prorataRule: value})}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="calendar" id="calendar" />
                    <Label htmlFor="calendar">Calendar Days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="working" id="working" />
                    <Label htmlFor="working">Working Days</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Auto-lock After Approval</Label>
                    <p className="text-sm text-gray-600">Automatically lock payroll after final approval</p>
                  </div>
                  <Switch
                    checked={payrollSettings.autoLock}
                    onCheckedChange={(checked) => setPayrollSettings({...payrollSettings, autoLock: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Gratuity Calculation</Label>
                    <p className="text-sm text-gray-600">Calculate gratuity for eligible employees</p>
                  </div>
                  <Switch
                    checked={payrollSettings.enableGratuity}
                    onCheckedChange={(checked) => setPayrollSettings({...payrollSettings, enableGratuity: checked})}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* 3. Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6 mt-6">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Compliance & Statutory</h3>
              
              <Tabs defaultValue="pf" className="w-full">
                <TabsList className="grid grid-cols-4 w-full max-w-md">
                  <TabsTrigger value="pf">PF</TabsTrigger>
                  <TabsTrigger value="esi">ESI</TabsTrigger>
                  <TabsTrigger value="pt">PT</TabsTrigger>
                  <TabsTrigger value="tds">TDS</TabsTrigger>
                </TabsList>

                <TabsContent value="pf" className="space-y-4 mt-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium">Provident Fund (PF)</h4>
                      <Switch
                        checked={complianceSettings.pf.enabled}
                        onCheckedChange={(checked) => setComplianceSettings({
                          ...complianceSettings,
                          pf: {...complianceSettings.pf, enabled: checked}
                        })}
                      />
                    </div>
                    {complianceSettings.pf.enabled && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>PF Registration Number</Label>
                          <Input
                            value={complianceSettings.pf.registrationNumber}
                            onChange={(e) => setComplianceSettings({
                              ...complianceSettings,
                              pf: {...complianceSettings.pf, registrationNumber: e.target.value}
                            })}
                            placeholder="Enter PF registration number"
                          />
                        </div>
                        <div>
                          <Label>PF Admin/Sub Code</Label>
                          <Input
                            value={complianceSettings.pf.adminCode}
                            onChange={(e) => setComplianceSettings({
                              ...complianceSettings,
                              pf: {...complianceSettings.pf, adminCode: e.target.value}
                            })}
                            placeholder="Enter admin code"
                          />
                        </div>
                        <div>
                          <Label>Employee Contribution (%)</Label>
                          <Input
                            type="number"
                            value={complianceSettings.pf.employeeContribution}
                            onChange={(e) => setComplianceSettings({
                              ...complianceSettings,
                              pf: {...complianceSettings.pf, employeeContribution: e.target.value}
                            })}
                          />
                        </div>
                        <div>
                          <Label>Employer Contribution (%)</Label>
                          <Input
                            type="number"
                            value={complianceSettings.pf.employerContribution}
                            onChange={(e) => setComplianceSettings({
                              ...complianceSettings,
                              pf: {...complianceSettings.pf, employerContribution: e.target.value}
                            })}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="esi" className="space-y-4 mt-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium">Employee State Insurance (ESI)</h4>
                      <Switch
                        checked={complianceSettings.esi.enabled}
                        onCheckedChange={(checked) => setComplianceSettings({
                          ...complianceSettings,
                          esi: {...complianceSettings.esi, enabled: checked}
                        })}
                      />
                    </div>
                    {complianceSettings.esi.enabled && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>ESI Registration Number</Label>
                          <Input
                            value={complianceSettings.esi.registrationNumber}
                            onChange={(e) => setComplianceSettings({
                              ...complianceSettings,
                              esi: {...complianceSettings.esi, registrationNumber: e.target.value}
                            })}
                            placeholder="Enter ESI registration number"
                          />
                        </div>
                        <div></div>
                        <div>
                          <Label>Employee Contribution (%)</Label>
                          <Input
                            type="number"
                            value={complianceSettings.esi.employeeContribution}
                            onChange={(e) => setComplianceSettings({
                              ...complianceSettings,
                              esi: {...complianceSettings.esi, employeeContribution: e.target.value}
                            })}
                          />
                        </div>
                        <div>
                          <Label>Employer Contribution (%)</Label>
                          <Input
                            type="number"
                            value={complianceSettings.esi.employerContribution}
                            onChange={(e) => setComplianceSettings({
                              ...complianceSettings,
                              esi: {...complianceSettings.esi, employerContribution: e.target.value}
                            })}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="pt" className="space-y-4 mt-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium">Professional Tax (PT)</h4>
                      <Switch
                        checked={complianceSettings.pt.enabled}
                        onCheckedChange={(checked) => setComplianceSettings({
                          ...complianceSettings,
                          pt: {...complianceSettings.pt, enabled: checked}
                        })}
                      />
                    </div>
                    {complianceSettings.pt.enabled && (
                      <div>
                        <Label>PT Applicable State</Label>
                        <Select onValueChange={(value) => setComplianceSettings({
                          ...complianceSettings,
                          pt: {...complianceSettings.pt, state: value}
                        })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="maharashtra">Maharashtra</SelectItem>
                            <SelectItem value="karnataka">Karnataka</SelectItem>
                            <SelectItem value="westbengal">West Bengal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="tds" className="space-y-4 mt-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="text-lg font-medium mb-4">Tax Deducted at Source (TDS)</h4>
                    <div className="space-y-4">
                      <div>
                        <Label>TAN Number</Label>
                        <Input
                          value={complianceSettings.tds.tanNumber}
                          onChange={(e) => setComplianceSettings({
                            ...complianceSettings,
                            tds: {...complianceSettings.tds, tanNumber: e.target.value}
                          })}
                          placeholder="Enter TAN number"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Enable Employee Tax Declaration</Label>
                        <Switch
                          checked={complianceSettings.tds.enableDeclaration}
                          onCheckedChange={(checked) => setComplianceSettings({
                            ...complianceSettings,
                            tds: {...complianceSettings.tds, enableDeclaration: checked}
                          })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Enable Auto TDS Calculation</Label>
                        <Switch
                          checked={complianceSettings.tds.autoCalculation}
                          onCheckedChange={(checked) => setComplianceSettings({
                            ...complianceSettings,
                            tds: {...complianceSettings.tds, autoCalculation: checked}
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>

          {/* 4. Salary Components & Structure Tab */}
          <TabsContent value="salary" className="space-y-6 mt-6">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Salary Components & Structure</h3>
              
              <Tabs defaultValue="components" className="w-full">
                <TabsList className="grid grid-cols-2 w-full max-w-md">
                  <TabsTrigger value="components">Components</TabsTrigger>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                </TabsList>

                <TabsContent value="components" className="space-y-4 mt-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-medium">Salary Components</h4>
                    <Button onClick={addSalaryComponent} size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Component
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {salaryComponents.map((component, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <Label>Component Name</Label>
                            <Input
                              value={component.name}
                              onChange={(e) => {
                                const updated = [...salaryComponents];
                                updated[index].name = e.target.value;
                                setSalaryComponents(updated);
                              }}
                              placeholder="e.g., Basic Salary"
                            />
                          </div>
                          <div>
                            <Label>Type</Label>
                            <Select value={component.type} onValueChange={(value) => {
                              const updated = [...salaryComponents];
                              updated[index].type = value;
                              setSalaryComponents(updated);
                            }}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="earning">Earning</SelectItem>
                                <SelectItem value="deduction">Deduction</SelectItem>
                                <SelectItem value="reimbursement">Reimbursement</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={component.taxable}
                                onCheckedChange={(checked) => {
                                  const updated = [...salaryComponents];
                                  updated[index].taxable = checked;
                                  setSalaryComponents(updated);
                                }}
                              />
                              <Label>Taxable</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={component.fixed}
                                onCheckedChange={(checked) => {
                                  const updated = [...salaryComponents];
                                  updated[index].fixed = checked;
                                  setSalaryComponents(updated);
                                }}
                              />
                              <Label>Fixed</Label>
                            </div>
                          </div>
                          <div>
                            <Label>Amount/Formula</Label>
                            <Input
                              value={component.amount}
                              onChange={(e) => {
                                const updated = [...salaryComponents];
                                updated[index].amount = e.target.value;
                                setSalaryComponents(updated);
                              }}
                              placeholder="Amount or formula"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="templates" className="space-y-4 mt-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-medium">Salary Templates</h4>
                    <Button size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Template
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {salaryTemplates.map((template, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="space-y-4">
                          <div>
                            <Label>Template Name</Label>
                            <Input
                              value={template.name}
                              placeholder="e.g., Executive Template"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label>Allow HR Overrides</Label>
                            <Switch checked={template.allowOverrides} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>

          {/* 5. Leave Policy Tab */}
          <TabsContent value="leave" className="space-y-6 mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Leave Policy</h3>
                <Button onClick={addLeaveType} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Leave Type
                </Button>
              </div>
              
              <div className="space-y-4">
                {leavePolicy.map((leave, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Leave Type</Label>
                        <Input
                          value={leave.type}
                          onChange={(e) => {
                            const updated = [...leavePolicy];
                            updated[index].type = e.target.value;
                            setLeavePolicy(updated);
                          }}
                          placeholder="e.g., Annual Leave"
                        />
                      </div>
                      <div>
                        <Label>Annual Quota</Label>
                        <Input
                          type="number"
                          value={leave.quota}
                          onChange={(e) => {
                            const updated = [...leavePolicy];
                            updated[index].quota = parseInt(e.target.value);
                            setLeavePolicy(updated);
                          }}
                        />
                      </div>
                      <div>
                        <Label>Leave Cycle</Label>
                        <Select value={leave.cycle} onValueChange={(value) => {
                          const updated = [...leavePolicy];
                          updated[index].cycle = value;
                          setLeavePolicy(updated);
                        }}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="calendar">Calendar Year</SelectItem>
                            <SelectItem value="doj">DOJ Anniversary</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={leave.carryForward}
                          onCheckedChange={(checked) => {
                            const updated = [...leavePolicy];
                            updated[index].carryForward = checked;
                            setLeavePolicy(updated);
                          }}
                        />
                        <Label>Carry Forward</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={leave.encashment}
                          onCheckedChange={(checked) => {
                            const updated = [...leavePolicy];
                            updated[index].encashment = checked;
                            setLeavePolicy(updated);
                          }}
                        />
                        <Label>Encashment</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={leave.autoLOP}
                          onCheckedChange={(checked) => {
                            const updated = [...leavePolicy];
                            updated[index].autoLOP = checked;
                            setLeavePolicy(updated);
                          }}
                        />
                        <Label>Auto LOP</Label>
                      </div>
                      {leave.carryForward && (
                        <div>
                          <Label>Max Carry Forward</Label>
                          <Input
                            type="number"
                            value={leave.maxCarryForward}
                            onChange={(e) => {
                              const updated = [...leavePolicy];
                              updated[index].maxCarryForward = parseInt(e.target.value);
                              setLeavePolicy(updated);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* 6. Office Timings & Shifts Tab */}
          <TabsContent value="timings" className="space-y-6 mt-6">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Office Timings & Shifts</h3>
              
              <div className="border rounded-lg p-4">
                <h4 className="text-lg font-medium mb-4">Default Office Hours</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>In Time</Label>
                    <Input
                      type="time"
                      value={officeTimings.inTime}
                      onChange={(e) => setOfficeTimings({...officeTimings, inTime: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Out Time</Label>
                    <Input
                      type="time"
                      value={officeTimings.outTime}
                      onChange={(e) => setOfficeTimings({...officeTimings, outTime: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Break Duration (minutes)</Label>
                    <Input
                      type="number"
                      value={officeTimings.breakDuration}
                      onChange={(e) => setOfficeTimings({...officeTimings, breakDuration: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label>Grace Period (minutes)</Label>
                    <Input
                      type="number"
                      value={officeTimings.gracePeriod}
                      onChange={(e) => setOfficeTimings({...officeTimings, gracePeriod: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label>Min Hours for Full Day</Label>
                    <Input
                      type="number"
                      value={officeTimings.minHours}
                      onChange={(e) => setOfficeTimings({...officeTimings, minHours: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={officeTimings.enableOvertime}
                      onCheckedChange={(checked) => setOfficeTimings({...officeTimings, enableOvertime: checked})}
                    />
                    <Label>Enable Overtime</Label>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium">Shifts</h4>
                  <Button onClick={addShift} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Shift
                  </Button>
                </div>
                <div className="space-y-4">
                  {shifts.map((shift, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <Label>Shift Name</Label>
                          <Input
                            value={shift.name}
                            onChange={(e) => {
                              const updated = [...shifts];
                              updated[index].name = e.target.value;
                              setShifts(updated);
                            }}
                            placeholder="e.g., Night Shift"
                          />
                        </div>
                        <div>
                          <Label>In Time</Label>
                          <Input
                            type="time"
                            value={shift.inTime}
                            onChange={(e) => {
                              const updated = [...shifts];
                              updated[index].inTime = e.target.value;
                              setShifts(updated);
                            }}
                          />
                        </div>
                        <div>
                          <Label>Out Time</Label>
                          <Input
                            type="time"
                            value={shift.outTime}
                            onChange={(e) => {
                              const updated = [...shifts];
                              updated[index].outTime = e.target.value;
                              setShifts(updated);
                            }}
                          />
                        </div>
                        <div>
                          <Label>Break (minutes)</Label>
                          <Input
                            type="number"
                            value={shift.breakDuration}
                            onChange={(e) => {
                              const updated = [...shifts];
                              updated[index].breakDuration = parseInt(e.target.value);
                              setShifts(updated);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* 7. Attendance Settings Tab */}
          <TabsContent value="attendance" className="space-y-6 mt-6">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Attendance Settings</h3>
              
              <div className="border rounded-lg p-4 space-y-4">
                <div>
                  <Label>Attendance Source</Label>
                  <Select value={attendanceSettings.source} onValueChange={(value) => setAttendanceSettings({...attendanceSettings, source: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Manual Upload</SelectItem>
                      <SelectItem value="biometric">Biometric Device</SelectItem>
                      <SelectItem value="app">Mobile App</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Grace Period (minutes)</Label>
                  <Input
                    type="number"
                    value={attendanceSettings.gracePeriod}
                    onChange={(e) => setAttendanceSettings({...attendanceSettings, gracePeriod: parseInt(e.target.value)})}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Enable Overtime Tracking</Label>
                    <Switch
                      checked={attendanceSettings.overtimeTracking}
                      onCheckedChange={(checked) => setAttendanceSettings({...attendanceSettings, overtimeTracking: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Mark LOP on Missing Attendance</Label>
                    <Switch
                      checked={attendanceSettings.markLOP}
                      onCheckedChange={(checked) => setAttendanceSettings({...attendanceSettings, markLOP: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Sync Attendance with Payroll</Label>
                    <Switch
                      checked={attendanceSettings.syncWithPayroll}
                      onCheckedChange={(checked) => setAttendanceSettings({...attendanceSettings, syncWithPayroll: checked})}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* 8. Reimbursement Settings Tab */}
          <TabsContent value="reimbursement" className="space-y-6 mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Reimbursement Settings</h3>
                <Button onClick={addReimbursementType} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Type
                </Button>
              </div>
              
              <div className="space-y-4">
                {reimbursements.map((reimbursement, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Reimbursement Type</Label>
                        <Input
                          value={reimbursement.type}
                          onChange={(e) => {
                            const updated = [...reimbursements];
                            updated[index].type = e.target.value;
                            setReimbursements(updated);
                          }}
                          placeholder="e.g., Travel, Internet"
                        />
                      </div>
                      <div>
                        <Label>Monthly Cap (₹)</Label>
                        <Input
                          type="number"
                          value={reimbursement.monthlyCap}
                          onChange={(e) => {
                            const updated = [...reimbursements];
                            updated[index].monthlyCap = parseInt(e.target.value);
                            setReimbursements(updated);
                          }}
                        />
                      </div>
                      <div>
                        <Label>Approval Flow</Label>
                        <Select value={reimbursement.approvalFlow} onValueChange={(value) => {
                          const updated = [...reimbursements];
                          updated[index].approvalFlow = value;
                          setReimbursements(updated);
                        }}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="auto">Auto Approval</SelectItem>
                            <SelectItem value="manual">Manual Approval</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={reimbursement.taxable}
                          onCheckedChange={(checked) => {
                            const updated = [...reimbursements];
                            updated[index].taxable = checked;
                            setReimbursements(updated);
                          }}
                        />
                        <Label>Taxable</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={reimbursement.showInPayslip}
                          onCheckedChange={(checked) => {
                            const updated = [...reimbursements];
                            updated[index].showInPayslip = checked;
                            setReimbursements(updated);
                          }}
                        />
                        <Label>Show in Payslip</Label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* 9. Bank & Payout Settings Tab */}
          <TabsContent value="bank" className="space-y-6 mt-6">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Bank & Payout Settings</h3>
              
              <div className="border rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Bank Account Holder Name</Label>
                    <Input
                      value={bankSettings.accountHolderName}
                      onChange={(e) => setBankSettings({...bankSettings, accountHolderName: e.target.value})}
                      placeholder="As per bank records"
                    />
                  </div>
                  <div>
                    <Label>Account Number</Label>
                    <Input
                      value={bankSettings.accountNumber}
                      onChange={(e) => setBankSettings({...bankSettings, accountNumber: e.target.value})}
                      placeholder="Bank account number"
                    />
                  </div>
                  <div>
                    <Label>IFSC Code</Label>
                    <Input
                      value={bankSettings.ifscCode}
                      onChange={(e) => setBankSettings({...bankSettings, ifscCode: e.target.value})}
                      placeholder="11-character IFSC code"
                      maxLength={11}
                    />
                  </div>
                  <div>
                    <Label>Payment Method</Label>
                    <Select value={bankSettings.paymentMethod} onValueChange={(value) => setBankSettings({...bankSettings, paymentMethod: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Manual Export</SelectItem>
                        <SelectItem value="api">Bank API Integration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Export Format</Label>
                    <Select value={bankSettings.exportFormat} onValueChange={(value) => setBankSettings({...bankSettings, exportFormat: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excel">Excel Format</SelectItem>
                        <SelectItem value="csv">CSV Format</SelectItem>
                        <SelectItem value="txt">TXT Format</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* 10. Payslip Settings Tab */}
          <TabsContent value="payslip" className="space-y-6 mt-6">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Payslip Settings</h3>
              
              <div className="border rounded-lg p-4 space-y-4">
                <div>
                  <Label>Payslip Format</Label>
                  <Select value={payslipSettings.format} onValueChange={(value) => setPayslipSettings({...payslipSettings, format: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="classic">Classic</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Show CTC Breakdown</Label>
                    <Switch
                      checked={payslipSettings.showCTCBreakdown}
                      onCheckedChange={(checked) => setPayslipSettings({...payslipSettings, showCTCBreakdown: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Show Employer Contributions</Label>
                    <Switch
                      checked={payslipSettings.showEmployerContributions}
                      onCheckedChange={(checked) => setPayslipSettings({...payslipSettings, showEmployerContributions: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Include Bank Account Info</Label>
                    <Switch
                      checked={payslipSettings.showBankAccount}
                      onCheckedChange={(checked) => setPayslipSettings({...payslipSettings, showBankAccount: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Include Leave Summary</Label>
                    <Switch
                      checked={payslipSettings.showLeaveSummary}
                      onCheckedChange={(checked) => setPayslipSettings({...payslipSettings, showLeaveSummary: checked})}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* 11. Access & Roles Tab */}
          <TabsContent value="roles" className="space-y-6 mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Access & Roles</h3>
                <Button onClick={addRole} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Role
                </Button>
              </div>
              
              <div className="space-y-4">
                {roles.map((role, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="space-y-4">
                      <div>
                        <Label>Role Name</Label>
                        <Input
                          value={role.name}
                          onChange={(e) => {
                            const updated = [...roles];
                            updated[index].name = e.target.value;
                            setRoles(updated);
                          }}
                          placeholder="e.g., HR Admin, Finance"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-base font-medium">Access Rights</Label>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-2">
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={role.permissions.view}
                              onCheckedChange={(checked) => {
                                const updated = [...roles];
                                updated[index].permissions.view = checked;
                                setRoles(updated);
                              }}
                            />
                            <Label>View</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={role.permissions.edit}
                              onCheckedChange={(checked) => {
                                const updated = [...roles];
                                updated[index].permissions.edit = checked;
                                setRoles(updated);
                              }}
                            />
                            <Label>Edit</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={role.permissions.approve}
                              onCheckedChange={(checked) => {
                                const updated = [...roles];
                                updated[index].permissions.approve = checked;
                                setRoles(updated);
                              }}
                            />
                            <Label>Approve</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={role.permissions.finalize}
                              onCheckedChange={(checked) => {
                                const updated = [...roles];
                                updated[index].permissions.finalize = checked;
                                setRoles(updated);
                              }}
                            />
                            <Label>Finalize</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={role.permissions.payslipView}
                              onCheckedChange={(checked) => {
                                const updated = [...roles];
                                updated[index].permissions.payslipView = checked;
                                setRoles(updated);
                              }}
                            />
                            <Label>Payslip View</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* 12. Notification Settings Tab */}
          <TabsContent value="notifications" className="space-y-6 mt-6">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Notification Settings</h3>
              
              <div className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notify Employees When Payslip is Generated</Label>
                    <p className="text-sm text-gray-600">Send email/SMS when payslip is ready</p>
                  </div>
                  <Switch
                    checked={notifications.payslipGenerated}
                    onCheckedChange={(checked) => setNotifications({...notifications, payslipGenerated: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Alert HR/Admin on Pending Payroll</Label>
                    <p className="text-sm text-gray-600">Notify when payroll approval is pending</p>
                  </div>
                  <Switch
                    checked={notifications.pendingPayroll}
                    onCheckedChange={(checked) => setNotifications({...notifications, pendingPayroll: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Compliance Deadline Alerts</Label>
                    <p className="text-sm text-gray-600">Remind about PF, ESI, TDS deadlines</p>
                  </div>
                  <Switch
                    checked={notifications.complianceDeadlines}
                    onCheckedChange={(checked) => setNotifications({...notifications, complianceDeadlines: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Weekly Payroll Summary to Admin</Label>
                    <p className="text-sm text-gray-600">Send weekly summary email</p>
                  </div>
                  <Switch
                    checked={notifications.weeklySummary}
                    onCheckedChange={(checked) => setNotifications({...notifications, weeklySummary: checked})}
                  />
                </div>

                {notifications.weeklySummary && (
                  <div>
                    <Label>Summary Day</Label>
                    <Select value={notifications.summaryDay} onValueChange={(value) => setNotifications({...notifications, summaryDay: value})}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monday">Monday</SelectItem>
                        <SelectItem value="tuesday">Tuesday</SelectItem>
                        <SelectItem value="wednesday">Wednesday</SelectItem>
                        <SelectItem value="thursday">Thursday</SelectItem>
                        <SelectItem value="friday">Friday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

        </Tabs>

        <div className="flex justify-end mt-8 pt-6 border-t">
          <Button onClick={handleSave} size="lg">
            Save All Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PayrollSettings;
