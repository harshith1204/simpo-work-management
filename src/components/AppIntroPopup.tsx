
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, X } from "lucide-react";

interface AppIntroPopupProps {
  isOpen: boolean;
  onClose: () => void;
  appId: string;
  onSetup: () => void;
}

const getAppIntroData = (appId: string) => {
  const intros = {
    payroll: {
      heading: "Payroll – Smart Salaries, Simplified",
      description: "Effortlessly manage employee salaries, deductions, bonuses, and compliance with ease. From generating payslips to handling statutory filings — the Payroll module helps you run accurate, on-time payroll every month.",
      tagline: "No spreadsheets. No confusion. Just payroll that works.",
      ctaText: "Setup Payroll",
      videoThumbnail: "/placeholder.svg",
      videoUrl: "https://example.com/payroll-intro.mp4"
    },
    employees: {
      heading: "Employee Management Made Simple",
      description: "Streamline your HR processes with comprehensive employee lifecycle management. From onboarding to performance tracking, manage everything in one place.",
      tagline: "Your complete HR solution in one platform.",
      ctaText: "Setup Employee Management",
      videoThumbnail: "/placeholder.svg",
      videoUrl: "https://example.com/employees-intro.mp4"
    }
  };
  
  return intros[appId as keyof typeof intros] || intros.payroll;
};

const AppIntroPopup = ({ isOpen, onClose, appId, onSetup }: AppIntroPopupProps) => {
  const [showVideo, setShowVideo] = useState(false);
  const intro = getAppIntroData(appId);

  const handleSetup = () => {
    onClose();
    onSetup();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Welcome to {appId.charAt(0).toUpperCase() + appId.slice(1)}!
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Video Section */}
          <div className="relative bg-gray-100 rounded-lg overflow-hidden">
            {!showVideo ? (
              <div className="relative aspect-video flex items-center justify-center bg-gradient-to-br from-[#271A29] to-[#1a0920]">
                <img 
                  src={intro.videoThumbnail} 
                  alt="Video thumbnail"
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                <Button
                  onClick={() => setShowVideo(true)}
                  size="lg"
                  className="relative bg-white text-[#271A29] hover:bg-gray-100"
                >
                  <Play className="w-6 h-6 mr-2" />
                  Watch Introduction
                </Button>
              </div>
            ) : (
              <div className="aspect-video bg-black flex items-center justify-center">
                <p className="text-white">Video player would be embedded here</p>
                {/* In real implementation, embed actual video player */}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">
              {intro.heading}
            </h1>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              {intro.description}
            </p>
            
            <div className="bg-[#271A29]/5 border-l-4 border-[#271A29] p-4 rounded-r-lg">
              <p className="text-[#271A29] font-medium italic">
                "{intro.tagline}"
              </p>
            </div>
          </div>

          {/* Benefits badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-green-50 border-green-200 text-green-800">
              ✓ Easy Setup
            </Badge>
            <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-800">
              ⚡ Quick Implementation
            </Badge>
            <Badge variant="outline" className="bg-purple-50 border-purple-200 text-purple-800">
              🎯 Immediate Results
            </Badge>
          </div>

          {/* CTA Section */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div>
              <p className="text-sm text-gray-600">Ready to get started?</p>
              <p className="text-xs text-gray-500">Setup takes less than 5 minutes</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onClose}>
                Maybe Later
              </Button>
              <Button 
                onClick={handleSetup}
                size="lg"
                className="bg-[#271A29] hover:bg-[#1a0920]"
              >
                {intro.ctaText}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppIntroPopup;
