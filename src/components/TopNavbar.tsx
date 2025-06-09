
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Building2, Grid3X3, ChevronDown, Download, Plus } from "lucide-react";

interface TopNavbarProps {
  onInstallPayroll: () => void;
  isPayrollInstalled: boolean;
}

const TopNavbar = ({ onInstallPayroll, isPayrollInstalled }: TopNavbarProps) => {
  const [showAppStore, setShowAppStore] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState("TechCorp Solutions");

  const businesses = [
    "TechCorp Solutions",
    "Digital Innovations Pvt Ltd",
    "StartUp Ventures"
  ];

  const availableApps = [
    {
      id: "payroll",
      name: "Payroll Management",
      description: "Complete payroll processing and compliance management",
      icon: "💰",
      installed: isPayrollInstalled
    },
    {
      id: "recruitment",
      name: "Recruitment Suite",
      description: "End-to-end hiring and candidate management",
      icon: "👥",
      installed: false
    },
    {
      id: "performance",
      name: "Performance Management",
      description: "Employee reviews, goals, and performance tracking",
      icon: "⭐",
      installed: false
    }
  ];

  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Left side - Business Selection */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-2">
            <Building2 className="w-5 h-5" />
            <span className="font-medium">{selectedBusiness}</span>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64">
          {businesses.map((business) => (
            <DropdownMenuItem
              key={business}
              onClick={() => setSelectedBusiness(business)}
              className={selectedBusiness === business ? "bg-blue-50" : ""}
            >
              <Building2 className="w-4 h-4 mr-2" />
              {business}
              {selectedBusiness === business && (
                <Badge variant="secondary" className="ml-auto">Current</Badge>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Right side - App Store */}
      <Dialog open={showAppStore} onOpenChange={setShowAppStore}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm">
            <Grid3X3 className="w-5 h-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>App Store</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {availableApps.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{app.icon}</div>
                  <div>
                    <h3 className="font-medium">{app.name}</h3>
                    <p className="text-sm text-gray-600">{app.description}</p>
                  </div>
                </div>
                <div>
                  {app.installed ? (
                    <Badge variant="secondary">Installed</Badge>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => {
                        if (app.id === "payroll") {
                          onInstallPayroll();
                          setShowAppStore(false);
                        }
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Install
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TopNavbar;
