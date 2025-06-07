
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, FileSpreadsheet, Download, Upload, AlertTriangle, Check, X } from "lucide-react";

interface BulkUploadProps {
  onBack: () => void;
}

const BulkUpload = ({ onBack }: BulkUploadProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [validationComplete, setValidationComplete] = useState(false);
  
  const mockValidationResults = [
    { row: 1, status: "valid", data: { name: "Amit Kumar", id: "EMP005", department: "Marketing", email: "amit@example.com" } },
    { row: 2, status: "valid", data: { name: "Sneha Patel", id: "EMP006", department: "Sales", email: "sneha@example.com" } },
    { row: 3, status: "error", message: "Missing required field: Department", data: { name: "Vikram Singh", id: "EMP007", email: "vikram@example.com" } },
    { row: 4, status: "warning", message: "Duplicate email found", data: { name: "Rohit Sharma", id: "EMP008", department: "Finance", email: "rohit@example.com" } },
    { row: 5, status: "valid", data: { name: "Deepa Nair", id: "EMP009", department: "Engineering", email: "deepa@example.com" } },
    { row: 6, status: "valid", data: { name: "Kiran Rao", id: "EMP010", department: "HR", email: "kiran@example.com" } },
  ];
  
  const handleFileUpload = () => {
    setFileUploaded(true);
    setTimeout(() => {
      setCurrentStep(2);
      setTimeout(() => {
        setValidationComplete(true);
      }, 2000);
    }, 2000);
  };

  const handleImport = () => {
    setCurrentStep(3);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "valid": return <Check className="w-4 h-4 text-green-600" />;
      case "error": return <X className="w-4 h-4 text-red-600" />;
      case "warning": return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "valid": return "bg-green-100 text-green-800";
      case "error": return "bg-red-100 text-red-800";
      case "warning": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="outline" className="mr-4" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Directory
        </Button>
        <h2 className="text-2xl font-bold text-gray-900">Bulk Upload Employees</h2>
      </div>

      <div className="flex gap-8 items-center justify-center mb-6">
        <div className={`flex items-center ${currentStep >= 1 ? "text-primary" : "text-gray-400"}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
            currentStep >= 1 ? "bg-primary text-white" : "bg-gray-100"
          }`}>
            <FileSpreadsheet className="w-4 h-4" />
          </div>
          <span className="font-medium">Upload File</span>
        </div>
        <div className="w-16 h-px bg-gray-200"></div>
        <div className={`flex items-center ${currentStep >= 2 ? "text-primary" : "text-gray-400"}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
            currentStep >= 2 ? "bg-primary text-white" : "bg-gray-100"
          }`}>
            {currentStep > 2 ? 
              <Check className="w-4 h-4" /> : 
              <span className="text-xs">2</span>
            }
          </div>
          <span className="font-medium">Validate Data</span>
        </div>
        <div className="w-16 h-px bg-gray-200"></div>
        <div className={`flex items-center ${currentStep >= 3 ? "text-primary" : "text-gray-400"}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
            currentStep >= 3 ? "bg-primary text-white" : "bg-gray-100"
          }`}>
            {currentStep > 3 ? 
              <Check className="w-4 h-4" /> : 
              <span className="text-xs">3</span>
            }
          </div>
          <span className="font-medium">Import</span>
        </div>
      </div>

      {currentStep === 1 && (
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <FileSpreadsheet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Employee Data</h3>
              <p className="text-gray-600 mb-6">Upload your employee data using our template format</p>
              
              <div className="flex justify-center mb-6">
                <Button variant="outline" className="mr-4">
                  <Download className="w-4 h-4 mr-2" />
                  Download Template
                </Button>
                <Button>
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              </div>
              
              <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                fileUploaded ? "bg-green-50 border-green-200" : "border-gray-200 hover:border-gray-300"
              }`}>
                {fileUploaded ? (
                  <div>
                    <div className="flex items-center justify-center mb-3">
                      <FileSpreadsheet className="w-8 h-8 text-green-600 mr-2" />
                      <span className="font-medium">employees_data.xlsx</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">File uploaded successfully</p>
                    <Progress value={100} className="h-2 mb-4" />
                    <Button size="sm" variant="outline" className="mr-2">
                      <X className="w-4 h-4 mr-1" />
                      Remove
                    </Button>
                    <Button size="sm" onClick={handleFileUpload}>
                      <Check className="w-4 h-4 mr-1" />
                      Continue
                    </Button>
                  </div>
                ) : (
                  <div onClick={handleFileUpload} className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Drag and drop your Excel file here or click to browse
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Supports .xlsx, .xls and .csv formats
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Validate Employee Data</CardTitle>
          </CardHeader>
          <CardContent>
            {!validationComplete ? (
              <div className="text-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-600">Validating your data...</p>
                <Progress value={60} className="h-2 mt-4" />
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Total records found: <span className="font-medium">6</span></p>
                  </div>
                  <div className="flex space-x-2">
                    <Badge className="bg-green-100 text-green-800">4 Valid</Badge>
                    <Badge className="bg-red-100 text-red-800">1 Error</Badge>
                    <Badge className="bg-orange-100 text-orange-800">1 Warning</Badge>
                  </div>
                </div>

                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Row</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee ID</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issue</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockValidationResults.map((result, index) => (
                        <tr key={index} className={`hover:bg-gray-50 ${
                          result.status === "error" ? "bg-red-50" : 
                          result.status === "warning" ? "bg-orange-50" : ""
                        }`}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{result.row}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              {getStatusIcon(result.status)}
                              <Badge className={`ml-1 ${getStatusColor(result.status)}`}>
                                {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                              </Badge>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{result.data.name}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{result.data.id}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{result.data.department || "-"}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{result.data.email}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600">{result.message || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button onClick={handleImport} disabled={mockValidationResults.some(r => r.status === "error")}>
                    <Check className="w-4 h-4 mr-2" />
                    Import Valid Records
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {currentStep === 3 && (
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Import Successful!
            </h3>
            <p className="text-gray-600 mb-6">
              4 employees have been successfully added to your organization
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={onBack}>
                Return to Directory
              </Button>
              <Button>
                View Imported Employees
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BulkUpload;
