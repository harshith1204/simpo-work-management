
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface LinkedItem {
  id: number;
  title: string;
  status: string;
  assignee: string;
  avatar: string;
  dueDate: string;
}

interface LinkedItemsProps {
  items: LinkedItem[];
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => React.ReactNode;
}

const LinkedItems = ({ items, getStatusColor, getStatusIcon }: LinkedItemsProps) => {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <Card key={item.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStatusIcon(item.status)}
                <div>
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>Due: {item.dueDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Avatar className="w-4 h-4">
                        <AvatarFallback className="text-xs">{item.avatar}</AvatarFallback>
                      </Avatar>
                      <span>{item.assignee}</span>
                    </div>
                  </div>
                </div>
              </div>
              <Badge className={getStatusColor(item.status)}>
                {item.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LinkedItems;
