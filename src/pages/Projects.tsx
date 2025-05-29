
import TabLayout from "@/components/TabLayout";
import Overview from "./projects/Overview";
import Files from "./projects/Files";

const Projects = () => {
  const tabs = [
    { id: "overview", name: "Overview", component: Overview },
    { id: "files", name: "Files", component: Files },
  ];

  return <TabLayout tabs={tabs} defaultTab="overview" />;
};

export default Projects;
