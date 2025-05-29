
import NotificationsDropdown from "./NotificationsDropdown";
import ProfileDropdown from "./ProfileDropdown";

const Header = () => {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6 font-dm-sans">
      {/* Left side - empty space where search was */}
      <div className="flex-1">
        {/* Search bar removed from here */}
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
