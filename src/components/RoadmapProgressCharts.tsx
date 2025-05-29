
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DonutChart from "@/components/DonutChart";
import BarChart from "@/components/BarChart";

interface Milestone {
  id: number;
  name: string;
  status: string;
  progress: number;
  assignees: Array<{ id: number; name: string; avatar: string }>;
  tags: string[];
}

interface RoadmapProgressChartsProps {
  milestones: Milestone[];
}

const RoadmapProgressCharts = ({ milestones }: RoadmapProgressChartsProps) => {
  // Milestone status breakdown
  const statusData = [
    {
      name: "Completed",
      value: milestones.filter(m => m.status === "Completed").length,
      color: "#10B981"
    },
    {
      name: "In Progress",
      value: milestones.filter(m => m.status === "In Progress").length,
      color: "#3B82F6"
    },
    {
      name: "Upcoming",
      value: milestones.filter(m => m.status === "Upcoming").length,
      color: "#6B7280"
    }
  ];

  // Milestones by assignee
  const assigneeData = milestones.reduce((acc: any[], milestone) => {
    milestone.assignees.forEach(assignee => {
      const existing = acc.find(item => item.name === assignee.name);
      if (existing) {
        existing.value += 1;
      } else {
        acc.push({
          name: assignee.name,
          value: 1
        });
      }
    });
    return acc;
  }, []);

  // Progress by milestone
  const progressData = milestones.map(milestone => ({
    name: milestone.name.length > 15 
      ? milestone.name.substring(0, 15) + "..." 
      : milestone.name,
    value: milestone.progress
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Milestone Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <DonutChart
            data={statusData}
            title="Status Breakdown"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Milestones by Assignee</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart
            data={assigneeData}
            title="Assignment Distribution"
            color="#8B5CF6"
          />
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Progress by Milestone</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart
            data={progressData}
            title="Completion Progress (%)"
            color="#059669"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default RoadmapProgressCharts;
