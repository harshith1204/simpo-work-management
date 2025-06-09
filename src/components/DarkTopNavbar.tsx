
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  LayoutDashboard, 
  HelpCircle, 
  Bell, 
  Download, 
  Crown,
  ChevronRight
} from "lucide-react";

interface DarkTopNavbarProps {
  companyName: string;
  userName: string;
  userAvatar?: string;
  credits: number;
  trialDaysLeft: number;
  onAppsClick: () => void;
  onUpgradeClick: () => void;
  onCollapseClick: () => void;
}

const DarkTopNavbar = ({
  companyName,
  userName,
  userAvatar,
  credits,
  trialDaysLeft,
  onAppsClick,
  onUpgradeClick,
  onCollapseClick
}: DarkTopNavbarProps) => {
  return (
    <div className="h-14 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 shadow-lg">
      {/* Left side - Company Name + Apps */}
      <div className="flex items-center space-x-4">
        <h1 className="text-white font-semibold text-lg">{companyName}</h1>
        <Button 
          variant="ghost" 
          onClick={onAppsClick}
          className="text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg px-3 py-2"
        >
          <LayoutDashboard className="w-4 h-4 mr-2" />
          Apps
        </Button>
        <div className="flex items-center text-gray-400 text-sm">
          <span>Applications</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCollapseClick}
            className="ml-2 p-1 h-auto text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Right side - User info, actions, and trial banner */}
      <div className="flex items-center space-x-4">
        {/* User Account */}
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback className="bg-gray-700 text-white text-sm">
              {userName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <span className="text-white font-medium">{userName}</span>
        </div>

        <Separator orientation="vertical" className="h-6 bg-gray-700" />

        {/* Action Icons */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-800 p-2">
            <HelpCircle className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-800 p-2">
            <Bell className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-800 p-2">
            <Download className="w-4 h-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6 bg-gray-700" />

        {/* Credits */}
        <Badge variant="secondary" className="bg-gray-800 text-gray-200 border-gray-700">
          {credits} Credits
        </Badge>

        <Separator orientation="vertical" className="h-6 bg-gray-700" />

        {/* Trial Banner */}
        <div className="flex items-center space-x-3 bg-gradient-to-r from-yellow-600 to-orange-600 px-4 py-2 rounded-lg">
          <Crown className="w-4 h-4 text-yellow-200" />
          <span className="text-white text-sm font-medium">
            You have {trialDaysLeft} days left on your free trial
          </span>
          <Button 
            size="sm" 
            onClick={onUpgradeClick}
            className="bg-white text-gray-900 hover:bg-gray-100 rounded-md px-3 py-1 text-xs font-semibold"
          >
            Upgrade
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DarkTopNavbar;
