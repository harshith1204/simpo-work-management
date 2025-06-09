import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Check, Upload, User, Briefcase, DollarSign, FileText, Shield, Paperclip, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BulkUpload from "@/components/hrms/BulkUpload";

interface AddEmployeeWizardProps {
  onClose: () => void;
  onComplete: () => void;
}

const AddEmployeeWizard = ({ onClose, onComplete }: AddEmployeeWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Details
    fullName: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    mobile: "",
    bloodGroup: "",
    maritalStatus: "",
    
    // Employment Details
    employeeId: "",
    joiningDate: "",
    employmentType: "",
    department: "",
    designation: "",
    reportingManager: "",
    officeLocation: "",
    jobBand: "",
    
    // Salary Structure
    salaryTemplate: "",
    ctcAmount: "",
    effectiveFrom: "",
    variablePay: false,
    allowances: "",
    
    // Statutory & Compliance
    panNumber: "",
    aadhaar: "",
    uan: "",
    esiNumber: "",
    pfNominee: "",
    bankName: "",
    bankBranch: "",
    ifsc: "",
    accountNumber: "",
    
    // Access & Role
    systemRole: "",
    loginEmail: "",
    sendWelcomeEmail: true,
    
    // Documents
    documents: []
  });

  const { toast } = useToast();

  const steps = [
    { id: 1, title: "Personal Details", icon: User },
    { id: 2, title: "Employment Details", icon: Briefcase },
    { id: 3, title: "Salary Structure", icon: DollarSign },
    { id: 4, title: "Statutory & Compliance", icon: FileText },
    { id: 5, title: "Access & Role Setup", icon: Shield },
    { id: 6, title: "Documents", icon: Paperclip },
    { id: 7, title: "Review & Confirm", icon: Eye }
  ];

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Employee Added Successfully",
      description: `${formData.fullName} has been added to the system.`,
    });
    onComplete();
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => updateFormData("fullName", e.target.value)}
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <Label>Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => updateFormData("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email ID *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <Label htmlFor="mobile">Mobile Number *</Label>
                <Input
                  id="mobile"
                  value={formData.mobile}
                  onChange={(e) => updateFormData("mobile", e.target.value)}
                  placeholder="Enter mobile number"
                />
              </div>
              <div>
                <Label>Blood Group</Label>
                <Select value={formData.bloodGroup} onValueChange={(value) => updateFormData("bloodGroup", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a+">A+</SelectItem>
                    <SelectItem value="a-">A-</SelectItem>
                    <SelectItem value="b+">B+</SelectItem>
                    <SelectItem value="b-">B-</SelectItem>
                    <SelectItem value="ab+">AB+</SelectItem>
                    <SelectItem value="ab-">AB-</SelectItem>
                    <SelectItem value="o+">O+</SelectItem>
                    <SelectItem value="o-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="employeeId">Employee ID *</Label>
                <Input
                  id="employeeId"
                  value={formData.employeeId}
                  onChange={(e) => updateFormData("employeeId", e.target.value)}
                  placeholder="Auto-generated or custom"
                />
              </div>
              <div>
                <Label htmlFor="joiningDate">Joining Date *</Label>
                <Input
                  id="joiningDate"
                  type="date"
                  value={formData.joiningDate}
                  onChange={(e) => updateFormData("joiningDate", e.target.value)}
                />
              </div>
              <div>
                <Label>Employment Type *</Label>
                <Select value={formData.employmentType} onValueChange={(value) => updateFormData("employmentType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="intern">Intern</SelectItem>
                    <SelectItem value="consultant">Consultant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Department *</Label>
                <Select value={formData.department} onValueChange={(value) => updateFormData("department", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="designation">Designation *</Label>
                <Input
                  id="designation"
                  value={formData.designation}
                  onChange={(e) => updateFormData("designation", e.target.value)}
                  placeholder="Enter designation"
                />
              </div>
              <div>
                <Label htmlFor="reportingManager">Reporting Manager</Label>
                <Input
                  id="reportingManager"
                  value={formData.reportingManager}
                  onChange={(e) => updateFormData("reportingManager", e.target.value)}
                  placeholder="Select or enter manager"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Salary Template</Label>
                <Select value={formData.salaryTemplate} onValueChange={(value) => updateFormData("salaryTemplate", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="junior">Junior Level</SelectItem>
                    <SelectItem value="senior">Senior Level</SelectItem>
                    <SelectItem value="manager">Manager Level</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="ctcAmount">CTC Amount *</Label>
                <Input
                  id="ctcAmount"
                  value={formData.ctcAmount}
                  onChange={(e) => updateFormData("ctcAmount", e.target.value)}
                  placeholder="Enter annual CTC"
                />
              </div>
              <div>
                <Label htmlFor="effectiveFrom">Effective From *</Label>
                <Input
                  id="effectiveFrom"
                  type="date"
                  value={formData.effectiveFrom}
                  onChange={(e) => updateFormData("effectiveFrom", e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="variablePay"
                  checked={formData.variablePay}
                  onCheckedChange={(checked) => updateFormData("variablePay", checked)}
                />
                <Label htmlFor="variablePay">Variable Pay Component</Label>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="panNumber">PAN Number *</Label>
                <Input
                  id="panNumber"
                  value={formData.panNumber}
                  onChange={(e) => updateFormData("panNumber", e.target.value)}
                  placeholder="Format: ABCDE1234F"
                />
              </div>
              <div>
                <Label htmlFor="aadhaar">Aadhaar Number</Label>
                <Input
                  id="aadhaar"
                  value={formData.aadhaar}
                  onChange={(e) => updateFormData("aadhaar", e.target.value)}
                  placeholder="12-digit Aadhaar"
                />
              </div>
              <div>
                <Label htmlFor="bankName">Bank Name *</Label>
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
                  placeholder="IFSC code"
                />
              </div>
              <div>
                <Label htmlFor="accountNumber">Account Number *</Label>
                <Input
                  id="accountNumber"
                  value={formData.accountNumber}
                  onChange={(e) => updateFormData("accountNumber", e.target.value)}
                  placeholder="Bank account number"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>System Role *</Label>
                <Select value={formData.systemRole} onValueChange={(value) => updateFormData("systemRole", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hr-admin">HR Admin</SelectItem>
                    <SelectItem value="hr-ops">HR Ops</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="loginEmail">Login Email *</Label>
                <Input
                  id="loginEmail"
                  value={formData.loginEmail || formData.email}
                  onChange={(e) => updateFormData("loginEmail", e.target.value)}
                  placeholder="Email for system access"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="sendWelcomeEmail"
                  checked={formData.sendWelcomeEmail}
                  onCheckedChange={(checked) => updateFormData("sendWelcomeEmail", checked)}
                />
                <Label htmlFor="sendWelcomeEmail">Send Welcome Email</Label>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Documents</h3>
                <p className="text-gray-600 mb-4">
                  Drag and drop files or click to browse. Accepted formats: PDF, JPEG, PNG
                </p>
                <Button variant="outline">Select Files</Button>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Required Documents</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• ID Proof (PAN, Aadhaar, Passport)</li>
                  <li>• Resume/CV</li>
                  <li>• Employment Agreement</li>
                  <li>• Previous Employer Relieving Letter</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="text-md font-medium text-gray-900 mb-2">Personal Details</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div><span className="text-gray-600">Name:</span> <span className="font-medium">{formData.fullName}</span></div>
                  <div><span className="text-gray-600">Gender:</span> <span className="font-medium">{formData.gender}</span></div>
                  <div><span className="text-gray-600">Date of Birth:</span> <span className="font-medium">{formData.dateOfBirth}</span></div>
                  <div><span className="text-gray-600">Email:</span> <span className="font-medium">{formData.email}</span></div>
                  <div><span className="text-gray-600">Mobile:</span> <span className="font-medium">{formData.mobile}</span></div>
                  <div><span className="text-gray-600">Blood Group:</span> <span className="font-medium">{formData.bloodGroup}</span></div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="text-md font-medium text-gray-900 mb-2">Employment Details</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div><span className="text-gray-600">Employee ID:</span> <span className="font-medium">{formData.employeeId}</span></div>
                  <div><span className="text-gray-600">Joining Date:</span> <span className="font-medium">{formData.joiningDate}</span></div>
                  <div><span className="text-gray-600">Department:</span> <span className="font-medium">{formData.department}</span></div>
                  <div><span className="text-gray-600">Designation:</span> <span className="font-medium">{formData.designation}</span></div>
                  <div><span className="text-gray-600">Employment Type:</span> <span className="font-medium">{formData.employmentType}</span></div>
                  <div><span className="text-gray-600">Reporting Manager:</span> <span className="font-medium">{formData.reportingManager}</span></div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="text-md font-medium text-gray-900 mb-2">Salary & Bank Details</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div><span className="text-gray-600">CTC Amount:</span> <span className="font-medium">{formData.ctcAmount}</span></div>
                  <div><span className="text-gray-600">Effective From:</span> <span className="font-medium">{formData.effectiveFrom}</span></div>
                  <div><span className="text-gray-600">Bank Name:</span> <span className="font-medium">{formData.bankName}</span></div>
                  <div><span className="text-gray-600">Account Number:</span> <span className="font-medium">XXXX{formData.accountNumber.slice(-4)}</span></div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="confirmDetails" />
              <Label htmlFor="confirmDetails">I confirm that all details provided are accurate</Label>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (showBulkUpload) {
    return (
      <BulkUpload onBack={() => setShowBulkUpload(false)} />
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="outline" className="mr-4" onClick={onClose}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Directory
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Add New Employee</h2>
            <p className="text-gray-600">Complete employee information and onboarding</p>
          </div>
        </div>
        <Button variant="outline" onClick={() => setShowBulkUpload(true)}>
          <Upload className="w-4 h-4 mr-2" />
          Bulk Upload
        </Button>
      </div>

      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Step {currentStep} of {steps.length}</span>
          <span className="text-sm font-medium">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="flex gap-8">
        {/* Steps Navigation */}
        <div className="hidden md:block w-64 space-y-1">
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
            {renderStepContent()}
            
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep === steps.length ? (
                <Button onClick={handleSubmit}>
                  Save & Activate Employee
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

export default AddEmployeeWizard;
