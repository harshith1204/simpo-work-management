
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Check, Building2, Settings, Shield, DollarSign, Users, Upload } from "lucide-react";
import PayrollCompanyInfo from "./PayrollCompanyInfo";
import PayrollGeneralSettings from "./PayrollGeneralSettings";
import PayrollStatutorySettings from "./PayrollStatutorySettings";
import PayrollSalaryComponents from "./PayrollSalaryComponents";
import PayrollSalaryStructure from "./PayrollSalaryStructure";

interface PayrollSetupProps {
  onBack: () => void;
  onComplete: () => void;
  onAddEmployee: () => void;
}

const PayrollSetup = ({ onBack, onComplete, onAddEmployee }: PayrollSetupProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    { id: 1, title: "Company Information", icon: Building2, component: PayrollCompanyInfo },
    { id: 2, title: "General Settings", icon: Settings, component: PayrollGeneralSettings },
    { id: 3, title: "PF & ESI Settings", icon: Shield, component: PayrollStatutorySettings },
    { id: 4, title: "Salary Components", icon: DollarSign, component: PayrollSalaryComponents },
    { id: 5, title: "Salary Structure", icon: Users, component: PayrollSalaryStructure }
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
    onComplete();
  };

  const progress = (completedSteps.length / steps.length) * 100;
  const CurrentComponent = steps[currentStep - 1]?.component;

  const allStepsCompleted = completedSteps.length === steps.length;

  return (
    <div className="min-h-screen bg-[#F9F9FB] w-full">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="outline" className="mr-4" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Payroll Setup</h1>
              <p className="text-gray-600 mt-2">Configure your payroll system to get started</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <Card>
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

        {/* Step Navigation */}
        <div className="flex space-x-2 mb-6">
          {steps.map((step) => {
            const isCompleted = completedSteps.includes(step.id);
            const isCurrent = currentStep === step.id;
            return (
              <Button
                key={step.id}
                variant={isCurrent ? "default" : isCompleted ? "secondary" : "outline"}
                size="sm"
                onClick={() => setCurrentStep(step.id)}
                className="flex items-center"
              >
                {isCompleted && <Check className="w-4 h-4 mr-1" />}
                {step.title}
              </Button>
            );
          })}
        </div>

        {/* Current Step Content */}
        {CurrentComponent && (
          <CurrentComponent 
            onNext={() => handleStepComplete(currentStep)}
            onPrevious={() => setCurrentStep(Math.max(1, currentStep - 1))}
            isFirst={currentStep === 1}
            isLast={currentStep === steps.length}
          />
        )}

        {/* Completion Screen */}
        {allStepsCompleted && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Payroll Setup Complete!
              </h3>
              <p className="text-gray-600 mb-6">
                Your payroll system is now configured and ready to use.
              </p>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" onClick={onAddEmployee}>
                  <Users className="w-4 h-4 mr-2" />
                  Add Employees
                </Button>
                <Button onClick={handleFinishSetup}>
                  <Upload className="w-4 h-4 mr-2" />
                  Run First Payroll
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PayrollSetup;
