
import { Users } from "lucide-react";
import EmptyState from "@/components/EmptyState";

const Team = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
      <EmptyState
        icon={Users}
        title="No members added"
        actionLabel="Invite Member"
        onAction={() => console.log("Invite member clicked")}
      />
    </div>
  );
};

export default Team;
