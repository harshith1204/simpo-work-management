
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, Settings, Shield, DollarSign, Calendar, Clock, Receipt, FileText, Users, Bell } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PayrollSettings from "./config/PayrollSettings";

interface PayrollConfigurationProps {
  onBack: () => void;
}

const PayrollConfiguration = ({ onBack }: PayrollConfigurationProps) => {
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  const handleSectionComplete = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId]);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center">
        <Button variant="outline" size="icon" className="mr-4" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payroll Settings</h1>
          <p className="text-gray-600 mt-2">Configure all payroll settings and rules</p>
        </div>
      </div>

      {/* Settings Content */}
      <Tabs defaultValue="settings" className="w-full">
        <TabsList className="grid w-full max-w-md h-auto">
          <TabsTrigger 
            value="settings" 
            className="flex items-center space-x-2 px-4 py-2 text-sm"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="mt-6">
          <PayrollSettings onComplete={() => handleSectionComplete("settings")} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PayrollConfiguration;
