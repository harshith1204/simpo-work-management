
import TabLayout from "@/components/TabLayout";
import MyTasks from "./tasks/MyTasks";
import TeamTasks from "./tasks/TeamTasks";
import TaskCalendar from "./tasks/TaskCalendar";

const Tasks = () => {
  const tabs = [
    { id: "my-tasks", name: "My Tasks", component: MyTasks },
    { id: "team-tasks", name: "Team Tasks", component: TeamTasks },
    { id: "calendar", name: "Calendar", component: TaskCalendar },
  ];

  return <TabLayout tabs={tabs} defaultTab="my-tasks" />;
};

export default Tasks;
