
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

interface RolePermissionsProps {
  onComplete: () => void;
}

const RolePermissions = ({ onComplete }: RolePermissionsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="w-5 h-5" />
          <span>Role-Based Access & Permissions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">Restrict and assign configuration & payroll actions to roles.</p>
        <Button onClick={onComplete}>Save Role Permissions</Button>
      </CardContent>
    </Card>
  );
};

export default RolePermissions;
