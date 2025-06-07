
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, Plus, Search, Filter, Eye, Edit, ArrowUpDown, Download, Upload, TreePine, UserPlus } from "lucide-react";
import AddEmployeeWizard from "@/components/hrms/AddEmployeeWizard";
import EmployeeProfile from "@/components/hrms/EmployeeProfile";
import OrgChart from "@/components/hrms/OrgChart";
import BulkUpload from "@/components/hrms/BulkUpload";

const EmployeeMaster = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeView, setActiveView] = useState("directory"); // directory, orgChart, bulkUpload
  const [showAddWizard, setShowAddWizard] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const employees = [
    {
      id: "EMP001",
      name: "Priya Sharma",
      email: "priya.sharma@techcorp.com",
      department: "Engineering",
      position: "Senior Developer",
      status: "Active",
      joiningDate: "2023-01-15",
      avatar: "PS",
      manager: "Suresh Reddy"
    },
    {
      id: "EMP002",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@techcorp.com",
      department: "Sales",
      position: "Sales Manager",
      status: "Active",
      joiningDate: "2022-08-20",
      avatar: "RK",
      manager: null
    },
    {
      id: "EMP003",
      name: "Anita Desai",
      email: "anita.desai@techcorp.com",
      department: "Marketing",
      position: "Marketing Executive",
      status: "On Leave",
      joiningDate: "2023-03-10",
      avatar: "AD",
      manager: "Rajesh Kumar"
    },
    {
      id: "EMP004",
      name: "Suresh Reddy",
      email: "suresh.reddy@techcorp.com",
      department: "Engineering",
      position: "Team Lead",
      status: "Active",
      joiningDate: "2021-11-05",
      avatar: "SR",
      manager: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "On Leave": return "bg-orange-100 text-orange-800";
      case "Inactive": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleEmployeeClick = (employee: any) => {
    setSelectedEmployee(employee);
  };

  const handleAddEmployee = () => {
    setShowAddWizard(true);
  };

  if (selectedEmployee) {
    return (
      <EmployeeProfile 
        employee={selectedEmployee} 
        onBack={() => setSelectedEmployee(null)} 
      />
    );
  }

  if (showAddWizard) {
    return (
      <AddEmployeeWizard 
        onClose={() => setShowAddWizard(false)}
        onComplete={() => {
          setShowAddWizard(false);
          // Refresh employee list
        }}
      />
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employee Master & Org Chart</h1>
          <p className="text-gray-600 mt-2">Manage your workforce and organizational structure</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => setActiveView("bulkUpload")}>
            <Upload className="w-4 h-4 mr-2" />
            Bulk Upload
          </Button>
          <Button onClick={handleAddEmployee}>
            <UserPlus className="w-4 h-4 mr-2" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <Button
          variant={activeView === "directory" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveView("directory")}
        >
          <Users className="w-4 h-4 mr-2" />
          Directory
        </Button>
        <Button
          variant={activeView === "orgChart" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveView("orgChart")}
        >
          <TreePine className="w-4 h-4 mr-2" />
          Org Chart
        </Button>
      </div>

      {activeView === "directory" && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">248</div>
                <div className="text-sm text-gray-600">Total Employees</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">235</div>
                <div className="text-sm text-gray-600">Active</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">8</div>
                <div className="text-sm text-gray-600">On Leave</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">5</div>
                <div className="text-sm text-gray-600">Inactive</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search employees..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Employee Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Employee Directory</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Button variant="ghost" size="sm" className="p-0 h-auto font-medium">
                        Employee
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                      </Button>
                    </TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Manager</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joining Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                            {employee.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{employee.name}</p>
                            <p className="text-sm text-gray-600">{employee.email}</p>
                            <p className="text-xs text-gray-500">{employee.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-600">{employee.department}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-600">{employee.position}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-600">{employee.manager || "N/A"}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(employee.status)}>
                          {employee.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        <span>{employee.joiningDate}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEmployeeClick(employee)}>
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}

      {activeView === "orgChart" && (
        <OrgChart employees={employees} />
      )}

      {activeView === "bulkUpload" && (
        <BulkUpload onBack={() => setActiveView("directory")} />
      )}
    </div>
  );
};

export default EmployeeMaster;
