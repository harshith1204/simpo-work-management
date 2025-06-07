
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Clock, FileText } from "lucide-react";

const ComplianceCenter = () => {
  const complianceItems = [
    { item: "PF Returns", status: "Filed", dueDate: "15 Nov 2024", statusColor: "text-green-600" },
    { item: "ESI Returns", status: "Pending", dueDate: "21 Nov 2024", statusColor: "text-orange-600" },
    { item: "TDS Returns", status: "Due", dueDate: "30 Nov 2024", statusColor: "text-red-600" },
    { item: "PT Returns", status: "Filed", dueDate: "15 Nov 2024", statusColor: "text-green-600" }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Compliance Center</h1>
        <p className="text-gray-600 mt-2">Monitor and manage statutory compliance requirements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">8</div>
            <div className="text-sm text-gray-600">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">3</div>
            <div className="text-sm text-gray-600">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">2</div>
            <div className="text-sm text-gray-600">Overdue</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <span>Compliance Dashboard</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complianceItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{item.item}</p>
                    <p className="text-sm text-gray-600">Due: {item.dueDate}</p>
                  </div>
                </div>
                <Badge className={`${item.statusColor} bg-opacity-10`}>
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceCenter;
