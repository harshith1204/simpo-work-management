import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import NotificationsDropdown from "./NotificationsDropdown";
import ProfileDropdown from "./ProfileDropdown";

const Header = () => {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6 font-dm-sans">
      {/* Left side - Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search projects, issues, tasks..."
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      {/* Right side - Notifications and Profile */}
      <div className="flex items-center space-x-4">
        <NotificationsDropdown />
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Header;
