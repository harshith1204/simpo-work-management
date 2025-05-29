
import TabLayout from "@/components/TabLayout";
import Overview from "./projects/Overview";
import Boards from "./projects/Boards";
import Gantt from "./projects/Gantt";
import Files from "./projects/Files";

const Projects = () => {
  const tabs = [
    { id: "overview", name: "Overview", component: Overview },
    { id: "boards", name: "Boards", component: Boards },
    { id: "gantt", name: "Gantt", component: Gantt },
    { id: "files", name: "Files", component: Files },
  ];

  return <TabLayout tabs={tabs} defaultTab="overview" />;
};

export default Projects;
