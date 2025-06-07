
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Edit, Download, User, Briefcase, FileText, Calendar, PieChart, FileCheck, MessageSquare, History, Trash2, FileBarChart2 } from "lucide-react";

interface EmployeeProfileProps {
  employee: any;
  onBack: () => void;
}

const EmployeeProfile = ({ employee, onBack }: EmployeeProfileProps) => {
  const [activeTab, setActiveTab] = useState("profile");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "On Leave": return "bg-orange-100 text-orange-800";
      case "Inactive": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" className="mr-4" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Directory
        </Button>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Profile
          </Button>
          <Button>
            <Edit className="w-4 h-4 mr-2" />
            Edit Employee
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Employee Summary */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-24 h-24 bg-blue-500 text-white rounded-full flex items-center justify-center text-3xl font-medium mb-4">
                {employee.avatar}
              </div>
              <h2 className="text-xl font-bold">{employee.name}</h2>
              <p className="text-gray-600">{employee.position}</p>
              <Badge className={`mt-2 ${getStatusColor(employee.status)}`}>
                {employee.status}
              </Badge>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Employee ID</p>
                <p className="font-medium">{employee.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Department</p>
                <p className="font-medium">{employee.department}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{employee.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Reporting Manager</p>
                <p className="font-medium">{employee.manager || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Joined On</p>
                <p className="font-medium">{employee.joiningDate}</p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t space-y-3">
              <Button variant="outline" className="w-full">
                <User className="w-4 h-4 mr-2" />
                View Login Activity
              </Button>
              <Button variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
                <Trash2 className="w-4 h-4 mr-2" />
                Initiate Separation
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Tabbed Content */}
        <div className="md:col-span-2 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="profile" className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="employment" className="flex items-center">
                <Briefcase className="w-4 h-4 mr-2" />
                Employment
              </TabsTrigger>
              <TabsTrigger value="leaves" className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Leaves
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Documents
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Full Name</p>
                      <p className="font-medium">{employee.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Gender</p>
                      <p className="font-medium">Male</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Date of Birth</p>
                      <p className="font-medium">12 May 1990</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Blood Group</p>
                      <p className="font-medium">O+</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Email Address</p>
                      <p className="font-medium">{employee.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Contact Number</p>
                      <p className="font-medium">+91 9876543210</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Emergency Contact</p>
                      <p className="font-medium">Rahul Kumar (Brother) - +91 9876543211</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Address</p>
                      <p className="font-medium">123, Park Street, Koramangala, Bengaluru, 560034</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Notes & Remarks</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    placeholder="Add notes about this employee..." 
                    className="min-h-[100px] mb-4"
                  />
                  <Button>Save Notes</Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="employment" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Employment Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Employee ID</p>
                      <p className="font-medium">{employee.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Joining Date</p>
                      <p className="font-medium">{employee.joiningDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Employment Type</p>
                      <p className="font-medium">Full-time</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Department</p>
                      <p className="font-medium">{employee.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Designation</p>
                      <p className="font-medium">{employee.position}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Reporting Manager</p>
                      <p className="font-medium">{employee.manager || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Job Location</p>
                      <p className="font-medium">Bengaluru</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Work Schedule</p>
                      <p className="font-medium">Monday - Friday, 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Salary Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Current CTC</p>
                      <p className="font-medium">₹15,00,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Effective From</p>
                      <p className="font-medium">01 Apr 2023</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Salary Structure</p>
                      <p className="font-medium">Senior Developer Template</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Bank Account</p>
                      <p className="font-medium">ICICI Bank - XXX9878</p>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4">
                    <FileBarChart2 className="w-4 h-4 mr-2" />
                    View Salary History
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="leaves" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">12</div>
                    <div className="text-sm text-gray-600">Annual Leave Balance</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">5</div>
                    <div className="text-sm text-gray-600">Sick Leave Balance</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">8</div>
                    <div className="text-sm text-gray-600">Leave Taken YTD</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Leave History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 border rounded-md">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800">Annual</Badge>
                          <p className="font-medium">3 Days</p>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">15 Mar 2023 - 17 Mar 2023</p>
                        <p className="text-sm text-gray-700 mt-1">Family vacation</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Approved</Badge>
                    </div>
                    <div className="flex items-center p-3 border rounded-md">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-blue-100 text-blue-800">Sick</Badge>
                          <p className="font-medium">1 Day</p>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">28 Feb 2023</p>
                        <p className="text-sm text-gray-700 mt-1">Not feeling well</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Approved</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Employee Documents</CardTitle>
                  <Button size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Upload Document
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 border rounded-md">
                      <FileCheck className="w-5 h-5 text-blue-500 mr-3" />
                      <div className="flex-1">
                        <p className="font-medium">PAN Card</p>
                        <p className="text-xs text-gray-600">Uploaded on 12 Jan 2023</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Download</Button>
                      </div>
                    </div>
                    <div className="flex items-center p-3 border rounded-md">
                      <FileCheck className="w-5 h-5 text-blue-500 mr-3" />
                      <div className="flex-1">
                        <p className="font-medium">Aadhaar Card</p>
                        <p className="text-xs text-gray-600">Uploaded on 12 Jan 2023</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Download</Button>
                      </div>
                    </div>
                    <div className="flex items-center p-3 border rounded-md">
                      <FileCheck className="w-5 h-5 text-blue-500 mr-3" />
                      <div className="flex-1">
                        <p className="font-medium">Resume</p>
                        <p className="text-xs text-gray-600">Uploaded on 10 Jan 2023</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Download</Button>
                      </div>
                    </div>
                    <div className="flex items-center p-3 border rounded-md">
                      <FileCheck className="w-5 h-5 text-blue-500 mr-3" />
                      <div className="flex-1">
                        <p className="font-medium">Employment Agreement</p>
                        <p className="text-xs text-gray-600">Uploaded on 15 Jan 2023</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Download</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
