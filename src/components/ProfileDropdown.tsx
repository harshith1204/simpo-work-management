
import { useState } from "react";
import { User, Settings, LogOut, HelpCircle, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const ProfileDropdown = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const user = {
    name: "John Doe",
    email: "john.doe@company.com",
    role: "Product Manager",
    avatar: "/placeholder.svg"
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-2">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-[#270E2B] text-white">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-gray-600">{user.role}</p>
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white" align="end">
        <div className="p-3 border-b">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-[#270E2B] text-white">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
          </div>
        </div>

        <DropdownMenuItem className="cursor-pointer">
          <User className="w-4 h-4 mr-3" />
          View Profile
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer">
          <Settings className="w-4 h-4 mr-3" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer" onClick={toggleDarkMode}>
          {isDarkMode ? (
            <Sun className="w-4 h-4 mr-3" />
          ) : (
            <Moon className="w-4 h-4 mr-3" />
          )}
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer">
          <HelpCircle className="w-4 h-4 mr-3" />
          Help & Support
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer text-red-600">
          <LogOut className="w-4 h-4 mr-3" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
