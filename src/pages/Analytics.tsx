
import TabLayout from "@/components/TabLayout";
import Productivity from "./analytics/Productivity";
import Burnup from "./analytics/Burnup";
import SprintStats from "./analytics/SprintStats";
import Overview from "./analytics/Overview";
import TeamInsights from "./analytics/TeamInsights";

const Analytics = () => {
  const tabs = [
    { id: "overview", name: "Overview", component: Overview },
    { id: "team-insights", name: "Team Insights", component: TeamInsights },
    { id: "productivity", name: "Productivity", component: Productivity },
    { id: "burnup", name: "Burnup", component: Burnup },
    { id: "sprint-stats", name: "Sprint Stats", component: SprintStats },
  ];

  return <TabLayout tabs={tabs} defaultTab="overview" />;
};

export default Analytics;
