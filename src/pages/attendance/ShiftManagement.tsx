
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Clock, 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Calendar, 
  Settings,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";

const ShiftManagement = () => {
  const shifts = [
    {
      id: 1,
      name: "General Shift",
      startTime: "09:00 AM",
      endTime: "06:00 PM",
      breakDuration: "1 hour",
      gracePeriod: "15 mins",
      totalHours: "8 hours",
      employeesAssigned: 45,
      status: "Active",
      workDays: "Mon-Fri"
    },
    {
      id: 2,
      name: "Early Shift",
      startTime: "08:00 AM",
      endTime: "05:00 PM",
      breakDuration: "1 hour",
      gracePeriod: "10 mins",
      totalHours: "8 hours",
      employeesAssigned: 12,
      status: "Active",
      workDays: "Mon-Fri"
    },
    {
      id: 3,
      name: "US Shift",
      startTime: "07:00 PM",
      endTime: "04:00 AM",
      breakDuration: "1 hour",
      gracePeriod: "15 mins",
      totalHours: "8 hours",
      employeesAssigned: 8,
      status: "Active",
      workDays: "Mon-Fri"
    },
    {
      id: 4,
      name: "Weekend Shift",
      startTime: "10:00 AM",
      endTime: "07:00 PM",
      breakDuration: "1 hour",
      gracePeriod: "20 mins",
      totalHours: "8 hours",
      employeesAssigned: 6,
      status: "Inactive",
      workDays: "Sat-Sun"
    },
    {
      id: 5,
      name: "Flexible Shift",
      startTime: "Flexible",
      endTime: "Flexible",
      breakDuration: "1 hour",
      gracePeriod: "30 mins",
      totalHours: "8 hours",
      employeesAssigned: 15,
      status: "Active",
      workDays: "Mon-Fri"
    },
  ];

  const rotationRules = [
    {
      id: 1,
      name: "Engineering Weekly Rotation",
      type: "Department",
      shifts: ["General Shift", "US Shift"],
      employees: 24,
      frequency: "Weekly",
      status: "Active"
    },
    {
      id: 2,
      name: "Support Team Rotation",
      type: "Role-based",
      shifts: ["Early Shift", "General Shift", "US Shift"],
      employees: 12,
      frequency: "Daily",
      status: "Active"
    },
  ];

  const upcomingChanges = [
    {
      employee: "Priya Sharma",
      currentShift: "General Shift",
      newShift: "US Shift",
      effectiveDate: "Dec 23, 2024",
      reason: "Rotation Schedule"
    },
    {
      employee: "Vikram Singh",
      currentShift: "US Shift",
      newShift: "General Shift",
      effectiveDate: "Dec 23, 2024",
      reason: "Rotation Schedule"
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shift Management</h1>
          <p className="text-gray-600 mt-1">Create and manage work shifts, assign employees, and set rotation rules</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Shift Calendar
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Shift
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Shifts</p>
                <p className="text-3xl font-bold text-gray-900">5</p>
              </div>
              <div className="p-3 rounded-full bg-blue-50">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Active Shifts</p>
                <p className="text-3xl font-bold text-green-600">4</p>
              </div>
              <div className="p-3 rounded-full bg-green-50">
                <Play className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Employees Assigned</p>
                <p className="text-3xl font-bold text-gray-900">86</p>
              </div>
              <div className="p-3 rounded-full bg-purple-50">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Rotation Rules</p>
                <p className="text-3xl font-bold text-orange-600">2</p>
              </div>
              <div className="p-3 rounded-full bg-orange-50">
                <RotateCcw className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shifts Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>All Shifts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shift Name</TableHead>
                <TableHead>Timing</TableHead>
                <TableHead>Break Duration</TableHead>
                <TableHead>Grace Period</TableHead>
                <TableHead>Work Days</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shifts.map((shift) => (
                <TableRow key={shift.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="font-medium text-gray-900">{shift.name}</div>
                    <div className="text-sm text-gray-500">{shift.totalHours} working hours</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-gray-900">{shift.startTime} - {shift.endTime}</div>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600">{shift.breakDuration}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600">{shift.gracePeriod}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{shift.workDays}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{shift.employeesAssigned}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        shift.status === "Active" 
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {shift.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Users className="w-4 h-4" />
                      </Button>
                      {shift.status === "Active" ? (
                        <Button variant="ghost" size="sm" className="text-orange-600">
                          <Pause className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button variant="ghost" size="sm" className="text-green-600">
                          <Play className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rotation Rules */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Rotation Rules</span>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Rule
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rotationRules.map((rule, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{rule.name}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="outline"
                        className={
                          rule.status === "Active" 
                            ? "border-green-200 text-green-700 bg-green-50"
                            : "border-gray-200 text-gray-700 bg-gray-50"
                        }
                      >
                        {rule.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Type:</span>
                      <span className="ml-2 font-medium">{rule.type}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Frequency:</span>
                      <span className="ml-2 font-medium">{rule.frequency}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Employees:</span>
                      <span className="ml-2 font-medium">{rule.employees}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Shifts:</span>
                      <span className="ml-2 font-medium">{rule.shifts.length}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Changes */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Upcoming Shift Changes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingChanges.map((change, index) => (
                <div key={index} className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{change.employee}</h4>
                    <span className="text-sm text-blue-600 font-medium">{change.effectiveDate}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Badge variant="outline" className="text-xs">{change.currentShift}</Badge>
                    <span>→</span>
                    <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 bg-blue-50">{change.newShift}</Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{change.reason}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShiftManagement;
