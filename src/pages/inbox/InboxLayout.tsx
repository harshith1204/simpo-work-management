
import TabLayout from "@/components/TabLayout";
import AllMail from "./AllMail";
import Mentions from "./Mentions";

const InboxLayout = () => {
  const tabs = [
    { id: "all-mail", name: "All Mail", component: AllMail },
    { id: "mentions", name: "Mentions", component: Mentions },
  ];

  return <TabLayout tabs={tabs} defaultTab="all-mail" />;
};

export default InboxLayout;
