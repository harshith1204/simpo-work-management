
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TreePine, Download, ZoomIn, ZoomOut, Users, Edit } from "lucide-react";

interface OrgChartProps {
  employees: any[];
}

const OrgChart = ({ employees }: OrgChartProps) => {
  const [zoomLevel, setZoomLevel] = useState(100);

  const handleZoomIn = () => {
    if (zoomLevel < 150) {
      setZoomLevel(zoomLevel + 10);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 70) {
      setZoomLevel(zoomLevel - 10);
    }
  };

  // Group employees by their reporting structure
  const managerMap = new Map();
  const orgStructure = [];

  // First, create a map of managers to their direct reports
  employees.forEach(emp => {
    if (!emp.manager) {
      // This is a top-level employee (no manager)
      orgStructure.push({
        ...emp,
        children: []
      });
    } else {
      // This employee reports to someone
      if (!managerMap.has(emp.manager)) {
        managerMap.set(emp.manager, []);
      }
      managerMap.get(emp.manager).push(emp);
    }
  });

  // Function to recursively build the org chart
  const buildOrgChart = (node: any) => {
    const directReports = managerMap.get(node.name) || [];
    return {
      ...node,
      children: directReports.map((report: any) => buildOrgChart(report))
    };
  };

  // Build the complete org chart
  const completeOrgChart = orgStructure.map(node => buildOrgChart(node));

  // Render a tree node and its children
  const renderOrgNode = (node: any, level = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    
    return (
      <div key={node.id} className="flex flex-col items-center">
        <div className={`relative ${level > 0 ? 'mt-8' : 'mt-0'}`}>
          {level > 0 && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-8 w-px bg-gray-300 -translate-y-full"></div>
          )}
          
          <div className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow w-64">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">
                {node.avatar}
              </div>
              <div>
                <p className="font-medium text-gray-900">{node.name}</p>
                <p className="text-sm text-gray-600">{node.position}</p>
              </div>
            </div>
            <div className="text-xs text-gray-600 flex justify-between items-center mt-2">
              <Badge className={getStatusBadgeColor(node.status)}>
                {node.status}
              </Badge>
              <span>{node.department}</span>
            </div>
          </div>
        </div>
        
        {hasChildren && (
          <div className="relative mt-8 pt-8 flex justify-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-8 w-px bg-gray-300"></div>
            <div className="flex gap-12">
              {node.children.map((child: any) => renderOrgNode(child, level + 1))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "On Leave": return "bg-orange-100 text-orange-800";
      case "Inactive": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <TreePine className="w-5 h-5" />
            <span>Organization Chart</span>
          </CardTitle>
          <div className="flex space-x-2">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-md p-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={handleZoomOut}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm">{zoomLevel}%</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={handleZoomIn}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit Structure
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <div 
            className="flex justify-center min-w-[800px] pb-12 pt-6" 
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          >
            {completeOrgChart.map((node: any) => renderOrgNode(node))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Unassigned Employees</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-8">
            <p className="text-gray-600">Drag and drop employees here to add them to the org chart</p>
            <Button className="mt-4">
              Add Employees to Chart
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrgChart;
