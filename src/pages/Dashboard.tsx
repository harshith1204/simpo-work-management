
import { LayoutDashboard } from "lucide-react";
import EmptyState from "@/components/EmptyState";

const Dashboard = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
      <EmptyState
        icon={LayoutDashboard}
        title="Welcome to Simpo Dashboard"
        description="Insights, progress, and performance will appear here."
        actionLabel="Start Exploring"
        onAction={() => console.log("Start exploring clicked")}
      />
    </div>
  );
};

export default Dashboard;
