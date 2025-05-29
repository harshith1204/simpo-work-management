
import TabLayout from "@/components/TabLayout";
import Summary from "./Summary";
import AssignedToMe from "./AssignedToMe";
import CreatedByMe from "./CreatedByMe";
import Subscribed from "./Subscribed";
import Activity from "./Activity";

const YourWorkLayout = () => {
  const tabs = [
    { id: "summary", name: "Summary", component: Summary },
    { id: "assigned", name: "Assigned to Me", component: AssignedToMe },
    { id: "created", name: "Created by Me", component: CreatedByMe },
    { id: "subscribed", name: "Subscribed", component: Subscribed },
    { id: "activity", name: "Activity", component: Activity },
  ];

  return <TabLayout tabs={tabs} defaultTab="summary" />;
};

export default YourWorkLayout;
