
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  LayoutDashboard, 
  Crown, 
  HelpCircle, 
  Bell, 
  RefreshCw,
  ChevronDown 
} from "lucide-react";

interface TopNavigationBarProps {
  onAppsClick: () => void;
}

const TopNavigationBar = ({ onAppsClick }: TopNavigationBarProps) => {
  const user = {
    name: "John Doe",
    email: "john.doe@company.com",
    avatar: "/placeholder.svg"
  };

  return (
    <div className="h-14 bg-[#271A29] text-white flex items-center justify-between px-6 border-b border-white/10">
      {/* Left side */}
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">TechCorp</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={onAppsClick}
          className="text-white hover:bg-white/10 flex items-center space-x-2"
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Apps</span>
        </Button>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Trial Banner */}
        <div className="flex items-center space-x-2">
          <Crown className="w-4 h-4 text-yellow-400" />
          <span className="text-sm">You have 30 days left on your free trial</span>
          <Button size="sm" variant="outline" className="text-xs h-6 px-2 border-white/20 text-white hover:bg-white/10">
            Upgrade
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6 bg-white/20" />

        {/* Credits */}
        <div className="text-sm">4920 Credits</div>

        <Separator orientation="vertical" className="h-6 bg-white/20" />

        {/* Action Icons */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2">
            <HelpCircle className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2">
            <Bell className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6 bg-white/20" />

        {/* User Account */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-white hover:bg-white/10 flex items-center space-x-2 p-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-white/20 text-white text-xs">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm">{user.name}</span>
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopNavigationBar;
