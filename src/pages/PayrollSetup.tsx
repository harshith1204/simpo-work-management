
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Check, Building2, Settings, Shield, DollarSign, Users } from "lucide-react";

const PayrollSetup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const navigate = useNavigate();

  const steps = [
    { id: 1, title: "Company Information", icon: Building2 },
    { id: 2, title: "General Settings", icon: Settings },
    { id: 3, title: "PF & ESI Settings", icon: Shield },
    { id: 4, title: "Salary Components", icon: DollarSign },
    { id: 5, title: "Salary Structure", icon: Users }
  ];

  const handleStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
    if (stepId < steps.length) {
      setCurrentStep(stepId + 1);
    }
  };

  const handleFinishSetup = () => {
    navigate("/hrms/payroll");
  };

  const progress = (completedSteps.length / steps.length) * 100;
  const allStepsCompleted = completedSteps.length === steps.length;

  return (
    <div className="min-h-screen bg-[#F9F9FB] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="outline" className="mr-4" onClick={() => navigate("/apps/payroll")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payroll Setup</h1>
            <p className="text-gray-600 mt-2">Configure your payroll system to get started</p>
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Setup Progress</span>
              <span className="text-sm text-gray-600">{completedSteps.length} of {steps.length} completed</span>
            </div>
            <Progress value={progress} className="h-2 mb-4" />
            <div className="flex justify-between">
              {steps.map((step) => {
                const Icon = step.icon;
                const isCompleted = completedSteps.includes(step.id);
                const isCurrent = currentStep === step.id;
                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      isCompleted ? "bg-green-500 text-white" : 
                      isCurrent ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}>
                      {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <span className={`text-xs text-center ${isCurrent ? "font-medium" : ""}`}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Setup Content */}
        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep - 1]?.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-gray-600 mb-6">Configure {steps[currentStep - 1]?.title.toLowerCase()} for your payroll system.</p>
              {!allStepsCompleted ? (
                <Button onClick={() => handleStepComplete(currentStep)}>
                  Continue to Next Step
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    Payroll Setup Complete!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Your payroll system is now configured and ready to use.
                  </p>
                  <Button onClick={handleFinishSetup}>
                    Go to Payroll Management
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PayrollSetup;
