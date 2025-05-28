
import { CheckSquare } from "lucide-react";
import EmptyState from "@/components/EmptyState";

const Tasks = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
      <EmptyState
        icon={CheckSquare}
        title="No tasks available"
        description="Tasks you create will appear here."
        actionLabel="Create Task"
        onAction={() => console.log("Create task clicked")}
      />
    </div>
  );
};

export default Tasks;
