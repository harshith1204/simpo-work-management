
import { Card, CardContent } from "@/components/ui/card";

interface CycleSummaryStatsProps {
  activeCycles: Array<{
    progress: number;
    totalIssues: number;
  }>;
}

const CycleSummaryStats = ({ activeCycles }: CycleSummaryStatsProps) => {
  const averageProgress = Math.round(
    activeCycles.reduce((acc, cycle) => acc + cycle.progress, 0) / activeCycles.length
  );
  
  const totalIssues = activeCycles.reduce((acc, cycle) => acc + cycle.totalIssues, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{activeCycles.length}</div>
          <div className="text-sm text-gray-600">Active Cycles</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{averageProgress}%</div>
          <div className="text-sm text-gray-600">Average Progress</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{totalIssues}</div>
          <div className="text-sm text-gray-600">Total Issues</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CycleSummaryStats;
