
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Banknote, Download, Play, Settings } from "lucide-react";

const PayrollManagement = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payroll Management</h1>
          <p className="text-gray-600 mt-2">Manage employee salaries, deductions, and payroll processing</p>
        </div>
        <Button>
          <Play className="w-4 h-4 mr-2" />
          Process Payroll
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">₹45,67,890</div>
            <div className="text-sm text-gray-600">Total Payroll</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">235</div>
            <div className="text-sm text-gray-600">Employees Processed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">₹5,67,890</div>
            <div className="text-sm text-gray-600">Total Deductions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">95%</div>
            <div className="text-sm text-gray-600">Processing Complete</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Banknote className="w-5 h-5" />
            <span>Payroll Processing Center</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Banknote className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Payroll Management System</h3>
            <p className="text-gray-600 mb-4">Comprehensive payroll processing interface will appear here</p>
            <div className="flex justify-center space-x-3">
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Configure Payroll
              </Button>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Download Reports
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollManagement;
