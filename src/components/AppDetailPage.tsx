
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft,
  Download,
  Star,
  Users,
  Shield,
  Zap,
  CheckCircle,
  Play
} from "lucide-react";

interface AppDetailPageProps {
  appId: string;
  onBack: () => void;
  onInstall: (appId: string) => void;
  isInstalled: boolean;
}

// Mock app data - in real app this would come from API
const getAppDetails = (appId: string) => {
  const apps = {
    payroll: {
      name: "Payroll",
      description: "Smart salary management and compliance made simple",
      longDescription: "Effortlessly manage employee salaries, deductions, bonuses, and compliance with ease. From generating payslips to handling statutory filings — the Payroll module helps you run accurate, on-time payroll every month.",
      icon: "💰",
      rating: 4.8,
      reviews: 1250,
      tags: ["Finance", "HR", "Compliance"],
      features: [
        "Automated salary calculations",
        "Tax compliance management", 
        "Employee self-service portal",
        "Statutory reporting",
        "Bonus and incentive management",
        "Multi-currency support"
      ],
      benefits: [
        "Save 80% time on payroll processing",
        "100% compliance guaranteed",
        "Reduce payroll errors by 95%",
        "Employee satisfaction boost"
      ],
      videoUrl: "https://example.com/payroll-demo.mp4"
    },
    employees: {
      name: "Employees",
      description: "Manage your workforce with comprehensive employee profiles",
      longDescription: "Complete employee lifecycle management from onboarding to offboarding. Maintain detailed employee records, track performance, and streamline HR processes.",
      icon: "👥",
      rating: 4.7,
      reviews: 980,
      tags: ["HR", "Management"],
      features: [
        "Employee database management",
        "Document storage",
        "Performance tracking",
        "Organizational charts",
        "Employee self-service",
        "Mobile access"
      ],
      benefits: [
        "Centralized employee data",
        "Improved HR efficiency",
        "Better employee experience",
        "Compliance management"
      ],
      videoUrl: "https://example.com/employees-demo.mp4"
    }
  };
  
  return apps[appId as keyof typeof apps] || apps.payroll;
};

const AppDetailPage = ({ appId, onBack, onInstall, isInstalled }: AppDetailPageProps) => {
  const app = getAppDetails(appId);

  return (
    <div className="flex-1 bg-[#F9F9FB] overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Apps
          </Button>
          
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-6">
              <div className="p-4 bg-[#271A29] rounded-xl text-white text-3xl">
                {app.icon}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{app.name}</h1>
                <p className="text-lg text-gray-600 mb-4">{app.description}</p>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-medium">{app.rating}</span>
                    <span className="text-gray-500">({app.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>10k+ installations</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {app.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-gray-300">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-3">
              {isInstalled ? (
                <Badge className="bg-green-100 text-green-800 px-4 py-2">
                  ✓ Installed
                </Badge>
              ) : (
                <Button 
                  size="lg"
                  onClick={() => onInstall(appId)}
                  className="bg-[#271A29] hover:bg-[#1a0920]"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Install App
                </Button>
              )}
              <Button variant="outline" size="lg">
                <Play className="w-4 h-4 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{app.longDescription}</p>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {app.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {app.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Zap className="w-5 h-5 text-blue-500 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Security & Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">SOC 2 Certified</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">GDPR Compliant</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">256-bit Encryption</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">
                    <strong>Support Hours:</strong><br />
                    24/7 Technical Support
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Documentation:</strong><br />
                    Comprehensive guides available
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Training:</strong><br />
                    Free onboarding included
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDetailPage;
