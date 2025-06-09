
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Settings, Users, ArrowLeft, Cog } from "lucide-react";
import PayrollSetup from "@/components/payroll/PayrollSetup";
import PayrollConfiguration from "@/components/payroll/PayrollConfiguration";

interface PayrollAppProps {
  onBack: () => void;
  onNavigateToEmployees: () => void;
}

const PayrollApp = ({ onBack, onNavigateToEmployees }: PayrollAppProps) => {
  const [setupComplete, setSetupComplete] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [showConfiguration, setShowConfiguration] = useState(false);

  if (showSetup) {
    return (
      <div className="min-h-screen bg-[#F9F9FB] w-full">
        <PayrollSetup 
          onBack={() => setShowSetup(false)}
          onComplete={() => {
            setSetupComplete(true);
            setShowSetup(false);
          }}
          onAddEmployee={onNavigateToEmployees}
        />
      </div>
    );
  }

  if (showConfiguration) {
    return (
      <div className="min-h-screen bg-[#F9F9FB] w-full">
        <PayrollConfiguration onBack={() => setShowConfiguration(false)} />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="outline" className="mr-4" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Apps
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payroll Management</h1>
            <p className="text-gray-600 mt-2">Complete payroll processing and compliance management</p>
          </div>
        </div>
      </div>

      {!setupComplete ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Complete Payroll Setup
            </h3>
            <p className="text-gray-600 mb-6">
              Set up your payroll configuration to start processing employee salaries
            </p>
            <Button onClick={() => setShowSetup(true)} size="lg">
              <Settings className="w-4 h-4 mr-2" />
              Setup Payroll
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Stats Cards */}
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
                <DollarSign className="w-5 h-5" />
                <span>Payroll Dashboard</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Payroll System Ready</h3>
                <p className="text-gray-600 mb-4">Your payroll system is configured and ready to process payments</p>
                <div className="flex justify-center space-x-3">
                  <Button variant="outline" onClick={onNavigateToEmployees}>
                    <Users className="w-4 h-4 mr-2" />
                    Manage Employees
                  </Button>
                  <Button variant="outline" onClick={() => setShowConfiguration(true)}>
                    <Cog className="w-4 h-4 mr-2" />
                    Configuration
                  </Button>
                  <Button>
                    <DollarSign className="w-4 h-4 mr-2" />
                    Process Payroll
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default PayrollApp;
