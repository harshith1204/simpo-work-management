
import { Repeat } from "lucide-react";
import EmptyState from "@/components/EmptyState";

const Sprints = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
      <EmptyState
        icon={Repeat}
        title="No active sprints"
        actionLabel="Create Sprint"
        onAction={() => console.log("Create sprint clicked")}
      />
    </div>
  );
};

export default Sprints;
