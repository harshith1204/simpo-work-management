
import TabLayout from "@/components/TabLayout";
import Active from "./Active";
import Completed from "./Completed";
import Upcoming from "./Upcoming";

const CyclesLayout = () => {
  const tabs = [
    { id: "active", name: "Active", component: Active },
    { id: "completed", name: "Completed", component: Completed },
    { id: "upcoming", name: "Upcoming", component: Upcoming },
  ];

  return <TabLayout tabs={tabs} defaultTab="active" />;
};

export default CyclesLayout;
