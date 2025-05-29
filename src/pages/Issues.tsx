
import TabLayout from "@/components/TabLayout";
import OpenIssues from "./issues/OpenIssues";
import ClosedIssues from "./issues/ClosedIssues";
import BugReports from "./issues/BugReports";
import Priorities from "./issues/Priorities";

const Issues = () => {
  const tabs = [
    { id: "open", name: "Open Issues", component: OpenIssues },
    { id: "closed", name: "Closed Issues", component: ClosedIssues },
    { id: "bug-reports", name: "Bug Reports", component: BugReports },
    { id: "priorities", name: "Priorities", component: Priorities },
  ];

  return <TabLayout tabs={tabs} defaultTab="open" />;
};

export default Issues;
