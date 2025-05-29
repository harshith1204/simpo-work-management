
import TabLayout from "@/components/TabLayout";
import Productivity from "./analytics/Productivity";
import Burnup from "./analytics/Burnup";
import SprintStats from "./analytics/SprintStats";

const Analytics = () => {
  const tabs = [
    { id: "productivity", name: "Productivity", component: Productivity },
    { id: "burnup", name: "Burnup", component: Burnup },
    { id: "sprint-stats", name: "Sprint Stats", component: SprintStats },
  ];

  return <TabLayout tabs={tabs} defaultTab="productivity" />;
};

export default Analytics;
