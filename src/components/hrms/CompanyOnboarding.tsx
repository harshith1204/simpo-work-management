
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Building,
  Map,
  Calendar,
  FileText,
  Users,
  Upload,
  FileIcon,
  Banknote,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CompanyOnboardingProps {
  onComplete: () => void;
  onCancel: () => void;
}

const CompanyOnboarding = ({ onComplete, onCancel }: CompanyOnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Welcome & Terms
    companyName: "",
    industryType: "",
    countryOfOperation: "",
    timeZone: "",
    numberOfEmployees: "",
    
    // Company Profile
    legalCompanyName: "",
    shortName: "",
    companyLogo: null,
    website: "",
    gstNumber: "",
    registeredAddress: "",
    communicationEmail: "",
    supportPhone: "",
    
    // Org Structure
    departments: ["HR", "Engineering", "Sales", "Marketing", "Finance"],
    reportingHierarchy: "",
    multiLocation: false,
    officeLocations: [],
    
    // Fiscal Setup
    fiscalYearStart: "",
    costCenters: [{ name: "Corporate", code: "CC001" }],
    
    // Compliance
    pfApplicable: true,
    pfNumber: "",
    esiApplicable: true,
    esiNumber: "",
    ptApplicable: true,
    panNumber: "",
    bankName: "",
    bankAccount: "",
    ifsc: "",
    
    // Leave & Attendance
    weeklyOffPattern: "sat-sun",
    attendanceTracking: "geo",
    leaveTypes: [
      { name: "Earned Leave", quota: 15 },
      { name: "Sick Leave", quota: 12 },
      { name: "Casual Leave", quota: 7 }
    ],
    carryForwardPolicy: "max-10",
    gracePeriod: "15",
    
    // Payroll
    payrollFrequency: "monthly",
    salaryComponents: [
      { name: "Basic", type: "fixed", percentage: "50" },
      { name: "HRA", type: "fixed", percentage: "25" },
      { name: "Special Allowance", type: "fixed", percentage: "25" }
    ],
    payCycle: "25",
    prorateLogic: "calendar",
    
    // Users & Roles
    primaryAdmin: { name: "", email: "", role: "hr-admin" },
    additionalUsers: [],
    
    // Documents & Templates
    offerLetterTemplate: null,
    hrPolicies: [],
    welcomeEmail: "",
    
    // Terms
    acceptTerms: false
  });

  const { toast } = useToast();

  const totalSteps = 10;
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { id: 1, title: "Welcome", icon: Building },
    { id: 2, title: "Company Profile", icon: Building },
    { id: 3, title: "Organization Structure", icon: Users },
    { id: 4, title: "Fiscal & Cost Centers", icon: Calendar },
    { id: 5, title: "Statutory & Compliance", icon: FileText },
    { id: 6, title: "Leave & Attendance", icon: Clock },
    { id: 7, title: "Payroll Cycle", icon: Banknote },
    { id: 8, title: "Users & Roles", icon: Users },
    { id: 9, title: "Document Templates", icon: FileIcon },
    { id: 10, title: "Review & Confirm", icon: Check }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Company Setup Completed",
      description: "Your company has been successfully onboarded.",
    });
    onComplete();
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateArray = (field: string, index: number, key: string, value: any) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray[index] = { ...newArray[index], [key]: value };
      return { ...prev, [field]: newArray };
    });
  };

  const addToArray = (field: string, item: any) => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], item] }));
  };

  const removeFromArray = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_: any, i: number) => i !== index)
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: // Welcome & Terms
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Building className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Welcome to Simpo HRMS</h2>
              <p className="text-gray-600 mt-2">Let's set up your company profile to get started</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => updateFormData("companyName", e.target.value)}
                    placeholder="Enter company name"
                    maxLength={100}
                  />
                </div>
                <div>
                  <Label>Industry Type *</Label>
                  <Select value={formData.industryType} onValueChange={(value) => updateFormData("industryType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it">Information Technology</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Country of Operation *</Label>
                  <Select value={formData.countryOfOperation} onValueChange={(value) => updateFormData("countryOfOperation", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in">India</SelectItem>
                      <SelectItem value="sg">Singapore</SelectItem>
                      <SelectItem value="my">Malaysia</SelectItem>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Time Zone</Label>
                  <Select value={formData.timeZone} onValueChange={(value) => updateFormData("timeZone", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ist">(GMT+5:30) Indian Standard Time</SelectItem>
                      <SelectItem value="sgt">(GMT+8:00) Singapore Time</SelectItem>
                      <SelectItem value="est">(GMT-5:00) Eastern Standard Time</SelectItem>
                      <SelectItem value="gmt">(GMT+0:00) Greenwich Mean Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="numberOfEmployees">Number of Employees</Label>
                <Input
                  id="numberOfEmployees"
                  type="number"
                  value={formData.numberOfEmployees}
                  onChange={(e) => updateFormData("numberOfEmployees", e.target.value)}
                  placeholder="Enter approximate number"
                />
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <p className="text-sm text-blue-800">
                This wizard will guide you through setting up your HRMS system with company details, 
                organizational structure, compliance information, and more.
              </p>
            </div>
          </div>
        );

      case 2: // Company Profile
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="legalCompanyName">Legal Company Name *</Label>
                  <Input
                    id="legalCompanyName"
                    value={formData.legalCompanyName}
                    onChange={(e) => updateFormData("legalCompanyName", e.target.value)}
                    placeholder="Enter legal company name"
                  />
                </div>
                <div>
                  <Label htmlFor="shortName">Display Name *</Label>
                  <Input
                    id="shortName"
                    value={formData.shortName}
                    onChange={(e) => updateFormData("shortName", e.target.value)}
                    placeholder="Short name (max 20 chars)"
                    maxLength={20}
                  />
                </div>
              </div>

              <div>
                <Label>Company Logo</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center mt-1">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-4">
                    Drag and drop logo image here or click to browse
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    Recommended size: 200x200px. JPG, PNG or SVG.
                  </p>
                  <Button variant="outline">Select File</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="website">Website URL</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => updateFormData("website", e.target.value)}
                    placeholder="https://www.example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="gstNumber">GST/PAN/CIN Number</Label>
                  <Input
                    id="gstNumber"
                    value={formData.gstNumber}
                    onChange={(e) => updateFormData("gstNumber", e.target.value)}
                    placeholder="Enter registration number"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="registeredAddress">Registered Address *</Label>
                <Textarea
                  id="registeredAddress"
                  value={formData.registeredAddress}
                  onChange={(e) => updateFormData("registeredAddress", e.target.value)}
                  placeholder="Enter full registered address"
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="communicationEmail">Communication Email *</Label>
                  <Input
                    id="communicationEmail"
                    type="email"
                    value={formData.communicationEmail}
                    onChange={(e) => updateFormData("communicationEmail", e.target.value)}
                    placeholder="company@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="supportPhone">Support Phone</Label>
                  <Input
                    id="supportPhone"
                    value={formData.supportPhone}
                    onChange={(e) => updateFormData("supportPhone", e.target.value)}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3: // Organization Structure
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label>Departments *</Label>
                <div className="space-y-2 mt-2">
                  {formData.departments.map((dept, index) => (
                    <div key={index} className="flex items-center">
                      <Input
                        value={dept}
                        onChange={(e) => {
                          const newDepts = [...formData.departments];
                          newDepts[index] = e.target.value;
                          updateFormData("departments", newDepts);
                        }}
                        className="mr-2"
                      />
                      <Button 
                        variant="ghost"
                        size="sm"
                        type="button"
                        onClick={() => removeFromArray("departments", index)}
                      >
                        <Check className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => addToArray("departments", "")}
                  className="mt-2"
                >
                  Add Department
                </Button>
              </div>

              <div>
                <Label>Default Reporting Hierarchy *</Label>
                <Select 
                  value={formData.reportingHierarchy} 
                  onValueChange={(value) => updateFormData("reportingHierarchy", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select hierarchy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">CEO → VP → Director → Manager → Employee</SelectItem>
                    <SelectItem value="flat">CEO → Team Lead → Employee</SelectItem>
                    <SelectItem value="matrix">Project Manager + Functional Manager → Employee</SelectItem>
                    <SelectItem value="custom">Custom Structure</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="multiLocation"
                  checked={formData.multiLocation}
                  onCheckedChange={(checked) => updateFormData("multiLocation", checked)}
                />
                <Label htmlFor="multiLocation">Enable Multi-Location Support</Label>
              </div>

              {formData.multiLocation && (
                <div>
                  <Label className="block mb-2">Office Locations</Label>
                  <div className="space-y-2">
                    {formData.officeLocations.map((location: any, index: number) => (
                      <div key={index} className="grid grid-cols-3 gap-2">
                        <Input
                          placeholder="Office Name"
                          value={location.name}
                          onChange={(e) => updateArray("officeLocations", index, "name", e.target.value)}
                        />
                        <Input
                          placeholder="City"
                          value={location.city}
                          onChange={(e) => updateArray("officeLocations", index, "city", e.target.value)}
                        />
                        <div className="flex">
                          <Input
                            placeholder="Country"
                            value={location.country}
                            onChange={(e) => updateArray("officeLocations", index, "country", e.target.value)}
                            className="mr-2"
                          />
                          <Button 
                            variant="ghost"
                            size="sm"
                            type="button"
                            onClick={() => removeFromArray("officeLocations", index)}
                          >
                            <Check className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={() => addToArray("officeLocations", { name: "", city: "", country: "" })}
                    className="mt-2"
                  >
                    Add Location
                  </Button>
                </div>
              )}
            </div>
          </div>
        );

      case 4: // Fiscal & Cost Centers
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="fiscalYearStart">Fiscal Year Start *</Label>
                <Input
                  id="fiscalYearStart"
                  type="date"
                  value={formData.fiscalYearStart}
                  onChange={(e) => updateFormData("fiscalYearStart", e.target.value)}
                  placeholder="Select fiscal year start date"
                />
              </div>

              <div>
                <Label className="block mb-2">Cost Centers</Label>
                <div className="space-y-2">
                  {formData.costCenters.map((center: any, index: number) => (
                    <div key={index} className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Cost Center Name"
                        value={center.name}
                        onChange={(e) => updateArray("costCenters", index, "name", e.target.value)}
                      />
                      <div className="flex">
                        <Input
                          placeholder="Cost Center Code"
                          value={center.code}
                          onChange={(e) => updateArray("costCenters", index, "code", e.target.value)}
                          className="mr-2"
                        />
                        <Button 
                          variant="ghost"
                          size="sm"
                          type="button"
                          onClick={() => removeFromArray("costCenters", index)}
                        >
                          <Check className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => addToArray("costCenters", { name: "", code: "" })}
                  className="mt-2"
                >
                  Add Cost Center
                </Button>
              </div>

              <div>
                <Label className="block mb-2">Department to Cost Center Mapping</Label>
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      {formData.departments.map((dept, index) => (
                        <div key={index} className="grid grid-cols-2 gap-2">
                          <div className="text-sm py-2 font-medium">{dept}</div>
                          <Select defaultValue="">
                            <SelectTrigger>
                              <SelectValue placeholder="Select cost center" />
                            </SelectTrigger>
                            <SelectContent>
                              {formData.costCenters.map((center: any, idx: number) => (
                                <SelectItem key={idx} value={center.code}>{center.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );

      case 5: // Statutory & Compliance
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="pfApplicable"
                      checked={formData.pfApplicable}
                      onCheckedChange={(checked) => updateFormData("pfApplicable", checked)}
                    />
                    <Label htmlFor="pfApplicable">PF Applicable</Label>
                  </div>
                  {formData.pfApplicable && (
                    <div>
                      <Label htmlFor="pfNumber">PF Registration Number *</Label>
                      <Input
                        id="pfNumber"
                        value={formData.pfNumber}
                        onChange={(e) => updateFormData("pfNumber", e.target.value)}
                        placeholder="Enter PF number"
                      />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="esiApplicable"
                      checked={formData.esiApplicable}
                      onCheckedChange={(checked) => updateFormData("esiApplicable", checked)}
                    />
                    <Label htmlFor="esiApplicable">ESI Applicable</Label>
                  </div>
                  {formData.esiApplicable && (
                    <div>
                      <Label htmlFor="esiNumber">ESI Registration Number *</Label>
                      <Input
                        id="esiNumber"
                        value={formData.esiNumber}
                        onChange={(e) => updateFormData("esiNumber", e.target.value)}
                        placeholder="Enter ESI number"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="ptApplicable"
                  checked={formData.ptApplicable}
                  onCheckedChange={(checked) => updateFormData("ptApplicable", checked)}
                />
                <Label htmlFor="ptApplicable">PT Applicable by State</Label>
              </div>

              <div>
                <Label htmlFor="panNumber">PAN Number *</Label>
                <Input
                  id="panNumber"
                  value={formData.panNumber}
                  onChange={(e) => updateFormData("panNumber", e.target.value)}
                  placeholder="Format: ABCDE1234F"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bankName">Bank Name for Salary Credit *</Label>
                  <Input
                    id="bankName"
                    value={formData.bankName}
                    onChange={(e) => updateFormData("bankName", e.target.value)}
                    placeholder="Enter bank name"
                  />
                </div>
                <div>
                  <Label htmlFor="ifsc">IFSC Code *</Label>
                  <Input
                    id="ifsc"
                    value={formData.ifsc}
                    onChange={(e) => updateFormData("ifsc", e.target.value)}
                    placeholder="Enter IFSC code"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bankAccount">Bank Account Number *</Label>
                <Input
                  id="bankAccount"
                  value={formData.bankAccount}
                  onChange={(e) => updateFormData("bankAccount", e.target.value)}
                  placeholder="Enter account number"
                />
              </div>
            </div>
          </div>
        );

      case 6: // Leave & Attendance
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label>Weekly Off Pattern *</Label>
                <Select 
                  value={formData.weeklyOffPattern} 
                  onValueChange={(value) => updateFormData("weeklyOffPattern", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select weekly off pattern" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sat-sun">Saturday-Sunday</SelectItem>
                    <SelectItem value="sun">Sunday only</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Attendance Tracking Mode *</Label>
                <Select 
                  value={formData.attendanceTracking} 
                  onValueChange={(value) => updateFormData("attendanceTracking", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select tracking mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="geo">Geo-location</SelectItem>
                    <SelectItem value="biometric">Biometric</SelectItem>
                    <SelectItem value="manual">Manual Entry</SelectItem>
                    <SelectItem value="web">Web Check-in</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="gracePeriod">Attendance Grace Period (minutes)</Label>
                <Input
                  id="gracePeriod"
                  value={formData.gracePeriod}
                  onChange={(e) => updateFormData("gracePeriod", e.target.value)}
                  placeholder="Enter minutes (e.g. 15)"
                />
              </div>

              <div>
                <Label className="block mb-2">Leave Types</Label>
                <div className="space-y-2">
                  {formData.leaveTypes.map((type: any, index: number) => (
                    <div key={index} className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Leave Type Name"
                        value={type.name}
                        onChange={(e) => updateArray("leaveTypes", index, "name", e.target.value)}
                      />
                      <div className="flex">
                        <Input
                          type="number"
                          placeholder="Annual Quota"
                          value={type.quota}
                          onChange={(e) => updateArray("leaveTypes", index, "quota", e.target.value)}
                          className="mr-2"
                        />
                        <Button 
                          variant="ghost"
                          size="sm"
                          type="button"
                          onClick={() => removeFromArray("leaveTypes", index)}
                        >
                          <Check className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => addToArray("leaveTypes", { name: "", quota: "" })}
                  className="mt-2"
                >
                  Add Leave Type
                </Button>
              </div>

              <div>
                <Label>Leave Carry Forward Policy</Label>
                <Select 
                  value={formData.carryForwardPolicy} 
                  onValueChange={(value) => updateFormData("carryForwardPolicy", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No Carry Forward</SelectItem>
                    <SelectItem value="all">Carry Forward All</SelectItem>
                    <SelectItem value="max-10">Maximum 10 Days</SelectItem>
                    <SelectItem value="percentage">50% of Balance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 7: // Payroll Cycle
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label>Payroll Frequency *</Label>
                <Select 
                  value={formData.payrollFrequency} 
                  onValueChange={(value) => updateFormData("payrollFrequency", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="block mb-2">Salary Components</Label>
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      {formData.salaryComponents.map((component: any, index: number) => (
                        <div key={index} className="grid grid-cols-3 gap-2">
                          <Input
                            placeholder="Component Name"
                            value={component.name}
                            onChange={(e) => updateArray("salaryComponents", index, "name", e.target.value)}
                          />
                          <Select 
                            value={component.type} 
                            onValueChange={(value) => updateArray("salaryComponents", index, "type", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fixed">Fixed</SelectItem>
                              <SelectItem value="variable">Variable</SelectItem>
                              <SelectItem value="deduction">Deduction</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="flex">
                            <Input
                              placeholder="% of CTC"
                              value={component.percentage}
                              onChange={(e) => updateArray("salaryComponents", index, "percentage", e.target.value)}
                              className="mr-2"
                            />
                            <Button 
                              variant="ghost"
                              size="sm"
                              type="button"
                              onClick={() => removeFromArray("salaryComponents", index)}
                            >
                              <Check className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      type="button"
                      onClick={() => addToArray("salaryComponents", { name: "", type: "fixed", percentage: "" })}
                      className="mt-2"
                    >
                      Add Component
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Label htmlFor="payCycle">Default Pay Cycle Cutoff Date *</Label>
                <Input
                  id="payCycle"
                  value={formData.payCycle}
                  onChange={(e) => updateFormData("payCycle", e.target.value)}
                  placeholder="e.g., 25 (for 25th of every month)"
                />
              </div>

              <div>
                <Label>Prorate Logic</Label>
                <Select 
                  value={formData.prorateLogic} 
                  onValueChange={(value) => updateFormData("prorateLogic", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select prorate logic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="calendar">Calendar Days</SelectItem>
                    <SelectItem value="working">Working Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 8: // Users & Roles
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Primary HR Admin</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="adminName">Full Name *</Label>
                  <Input
                    id="adminName"
                    value={formData.primaryAdmin.name}
                    onChange={(e) => updateFormData("primaryAdmin", { ...formData.primaryAdmin, name: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <Label htmlFor="adminEmail">Email *</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={formData.primaryAdmin.email}
                    onChange={(e) => updateFormData("primaryAdmin", { ...formData.primaryAdmin, email: e.target.value })}
                    placeholder="Enter email"
                  />
                </div>
              </div>

              <h3 className="text-lg font-medium mt-6">Additional HR Users (Optional)</h3>
              <div className="space-y-2">
                {formData.additionalUsers.map((user: any, index: number) => (
                  <div key={index} className="grid grid-cols-3 gap-2">
                    <Input
                      placeholder="Full Name"
                      value={user.name}
                      onChange={(e) => updateArray("additionalUsers", index, "name", e.target.value)}
                    />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={user.email}
                      onChange={(e) => updateArray("additionalUsers", index, "email", e.target.value)}
                    />
                    <div className="flex">
                      <Select 
                        value={user.role} 
                        onValueChange={(value) => updateArray("additionalUsers", index, "role", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hr-admin">HR Admin</SelectItem>
                          <SelectItem value="hr-ops">HR Operations</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        variant="ghost"
                        size="sm"
                        type="button"
                        onClick={() => removeFromArray("additionalUsers", index)}
                        className="ml-2"
                      >
                        <Check className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => addToArray("additionalUsers", { name: "", email: "", role: "hr-ops" })}
              >
                Add User
              </Button>
            </div>
          </div>
        );

      case 9: // Document Templates
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label>Offer Letter Template (Optional)</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center mt-1">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-4">
                    Upload your offer letter template (DOCX, PDF)
                  </p>
                  <Button variant="outline">Select File</Button>
                </div>
              </div>

              <div>
                <Label>HR Policies (Optional)</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center mt-1">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-4">
                    Upload your company policies (PDF)
                  </p>
                  <Button variant="outline">Select File</Button>
                </div>
              </div>

              <div>
                <Label htmlFor="welcomeEmail">Welcome Email Template</Label>
                <Textarea
                  id="welcomeEmail"
                  value={formData.welcomeEmail}
                  onChange={(e) => updateFormData("welcomeEmail", e.target.value)}
                  placeholder="Enter welcome email content"
                  className="min-h-[200px]"
                />
              </div>
            </div>
          </div>
        );

      case 10: // Review & Confirm
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Almost there!</h2>
              <p className="text-gray-600 mt-2">Please review your information before confirming</p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Company Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-y-2">
                    <div className="text-sm font-medium">Company Name:</div>
                    <div className="text-sm">{formData.companyName}</div>
                    <div className="text-sm font-medium">Industry:</div>
                    <div className="text-sm">{formData.industryType}</div>
                    <div className="text-sm font-medium">Country:</div>
                    <div className="text-sm">{formData.countryOfOperation}</div>
                  </div>
                  <Badge className="mt-2 bg-blue-100 text-blue-800">Editable</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Organization Structure</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {formData.departments.map((dept, index) => (
                      <Badge key={index} variant="outline">{dept}</Badge>
                    ))}
                  </div>
                  <Badge className="mt-2 bg-blue-100 text-blue-800">Editable</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Payroll Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-y-2">
                    <div className="text-sm font-medium">Frequency:</div>
                    <div className="text-sm">{formData.payrollFrequency}</div>
                    <div className="text-sm font-medium">Components:</div>
                    <div className="text-sm">{formData.salaryComponents.length} configured</div>
                  </div>
                  <Badge className="mt-2 bg-blue-100 text-blue-800">Editable</Badge>
                </CardContent>
              </Card>

              <div className="flex items-center space-x-2 mt-6">
                <Switch
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => updateFormData("acceptTerms", checked)}
                />
                <Label htmlFor="acceptTerms" className="text-sm">
                  I accept the <span className="text-blue-600">Terms of Service</span> and <span className="text-blue-600">Privacy Policy</span>
                </Label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
          <span className="text-sm font-medium">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="flex gap-8">
        {/* Steps Navigation */}
        <div className="hidden lg:block w-64 space-y-1">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            
            return (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`flex items-center w-full p-3 rounded-md transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : isCompleted
                    ? "text-primary/70 hover:bg-gray-100"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                  isCompleted 
                    ? "bg-primary text-white" 
                    : isActive 
                    ? "border-2 border-primary text-primary" 
                    : "border-2 border-gray-300 text-gray-400"
                }`}>
                  {isCompleted ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <span className="text-xs">{step.id}</span>
                  )}
                </div>
                <span>{step.title}</span>
                {isActive && (
                  <Icon className="ml-auto w-4 h-4" />
                )}
              </button>
            );
          })}
        </div>

        {/* Form Content */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>
              {steps.find(step => step.id === currentStep)?.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderStep()}
            
            <div className="flex justify-between mt-8">
              {currentStep === 1 ? (
                <Button
                  variant="outline"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
              )}
              
              {currentStep === totalSteps ? (
                <Button 
                  onClick={handleSubmit}
                  disabled={!formData.acceptTerms}
                >
                  Complete Setup
                  <Check className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyOnboarding;
