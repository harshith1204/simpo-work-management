
import { MapPin } from "lucide-react";
import EmptyState from "@/components/EmptyState";

const Roadmap = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
      <EmptyState
        icon={MapPin}
        title="Roadmap is empty"
        actionLabel="Add Milestones"
        onAction={() => console.log("Add milestones clicked")}
      />
    </div>
  );
};

export default Roadmap;
