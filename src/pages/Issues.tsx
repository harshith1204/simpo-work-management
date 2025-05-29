
import TabLayout from "@/components/TabLayout";
import OpenIssues from "./issues/OpenIssues";
import ClosedIssues from "./issues/ClosedIssues";

const Issues = () => {
  const tabs = [
    { id: "open", name: "Open Issues", component: OpenIssues },
    { id: "closed", name: "Closed Issues", component: ClosedIssues },
  ];

  return <TabLayout tabs={tabs} defaultTab="open" />;
};

export default Issues;
