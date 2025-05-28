
import { FolderOpen } from "lucide-react";
import EmptyState from "@/components/EmptyState";

const Projects = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
      <EmptyState
        icon={FolderOpen}
        title="No projects found"
        actionLabel="Create New Project"
        onAction={() => console.log("Create project clicked")}
      />
    </div>
  );
};

export default Projects;
