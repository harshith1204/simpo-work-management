
import TabLayout from "@/components/TabLayout";
import Q1Plan from "./roadmap/Q1Plan";
import Q2Plan from "./roadmap/Q2Plan";
import Goals from "./roadmap/Goals";
import Timeline from "./roadmap/Timeline";

const Roadmap = () => {
  const tabs = [
    { id: "q1-plan", name: "Q1 Plan", component: Q1Plan },
    { id: "q2-plan", name: "Q2 Plan", component: Q2Plan },
    { id: "goals", name: "Goals", component: Goals },
    { id: "timeline", name: "Timeline", component: Timeline },
  ];

  return <TabLayout tabs={tabs} defaultTab="q1-plan" />;
};

export default Roadmap;
