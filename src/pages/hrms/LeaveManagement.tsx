
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Plus, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

const LeaveManagement = () => {
  const leaveRequests = [
    {
      id: "LR001",
      employee: "Priya Sharma",
      type: "Annual Leave",
      startDate: "2024-12-15",
      endDate: "2024-12-20",
      days: 5,
      status: "Pending",
      reason: "Family vacation"
    },
    {
      id: "LR002",
      employee: "Rajesh Kumar",
      type: "Sick Leave",
      startDate: "2024-12-10",
      endDate: "2024-12-12",
      days: 3,
      status: "Approved",
      reason: "Medical consultation"
    },
    {
      id: "LR003",
      employee: "Anita Desai",
      type: "Maternity Leave",
      startDate: "2024-11-01",
      endDate: "2025-01-30",
      days: 90,
      status: "Approved",
      reason: "Maternity leave"
    }
  ];

  const leaveBalances = [
    { employee: "Priya Sharma", annual: 15, sick: 8, casual: 10, maternity: 180 },
    { employee: "Rajesh Kumar", annual: 12, sick: 5, casual: 8, maternity: 0 },
    { employee: "Anita Desai", annual: 20, sick: 10, casual: 12, maternity: 90 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-800";
      case "Pending": return "bg-orange-100 text-orange-800";
      case "Rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved": return <CheckCircle className="w-4 h-4" />;
      case "Pending": return <Clock className="w-4 h-4" />;
      case "Rejected": return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leave Management</h1>
          <p className="text-gray-600 mt-2">Manage employee leave requests and policies</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Leave Policy
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">12</div>
            <div className="text-sm text-gray-600">Pending Requests</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">45</div>
            <div className="text-sm text-gray-600">Approved This Month</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">18</div>
            <div className="text-sm text-gray-600">On Leave Today</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">3</div>
            <div className="text-sm text-gray-600">Rejected</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="requests" className="space-y-6">
        <TabsList>
          <TabsTrigger value="requests">Leave Requests</TabsTrigger>
          <TabsTrigger value="balances">Leave Balances</TabsTrigger>
          <TabsTrigger value="calendar">Leave Calendar</TabsTrigger>
          <TabsTrigger value="policies">Leave Policies</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Leave Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaveRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-medium text-gray-900">{request.employee}</h3>
                          <Badge className={getStatusColor(request.status)}>
                            {getStatusIcon(request.status)}
                            <span className="ml-1">{request.status}</span>
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{request.type} • {request.days} days</p>
                        <p className="text-sm text-gray-500">{request.startDate} to {request.endDate}</p>
                        <p className="text-sm text-gray-700 mt-2">{request.reason}</p>
                      </div>
                      {request.status === "Pending" && (
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                          <Button size="sm">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="balances" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Employee Leave Balances</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaveBalances.map((balance, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">{balance.employee}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{balance.annual}</p>
                        <p className="text-sm text-gray-600">Annual Leave</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{balance.sick}</p>
                        <p className="text-sm text-gray-600">Sick Leave</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">{balance.casual}</p>
                        <p className="text-sm text-gray-600">Casual Leave</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">{balance.maternity}</p>
                        <p className="text-sm text-gray-600">Maternity Leave</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Leave Calendar</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Leave Calendar View</h3>
                <p className="text-gray-600 mb-4">Interactive calendar showing all employee leaves will appear here</p>
                <Button variant="outline">
                  Configure Calendar View
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Leave Policies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Annual Leave Policy", description: "21 days per year, accrued monthly", status: "Active" },
                  { name: "Sick Leave Policy", description: "12 days per year, immediate access", status: "Active" },
                  { name: "Maternity Leave Policy", description: "180 days with full pay", status: "Active" },
                  { name: "Paternity Leave Policy", description: "15 days with full pay", status: "Active" }
                ].map((policy, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{policy.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{policy.description}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className="bg-green-100 text-green-800">{policy.status}</Badge>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeaveManagement;
