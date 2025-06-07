
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Plus, Edit } from "lucide-react";

const RolePermissions = () => {
  const roles = [
    { name: "HR Manager", users: 3, permissions: ["Full Access"], color: "bg-red-100 text-red-800" },
    { name: "Team Lead", users: 12, permissions: ["Team Management", "Reports"], color: "bg-blue-100 text-blue-800" },
    { name: "Employee", users: 230, permissions: ["Self Service"], color: "bg-green-100 text-green-800" },
    { name: "Finance", users: 5, permissions: ["Payroll", "Reports"], color: "bg-purple-100 text-purple-800" }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Role Permissions</h1>
          <p className="text-gray-600 mt-2">Define user roles and access permissions</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Role
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {roles.map((role, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <Shield className="w-8 h-8 text-blue-500" />
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">{role.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{role.users} users assigned</p>
              <div className="space-y-1">
                {role.permissions.map((permission, idx) => (
                  <Badge key={idx} className={role.color}>
                    {permission}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Permission Matrix</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Role-Based Access Control</h3>
            <p className="text-gray-600 mb-4">Detailed permission matrix will appear here</p>
            <Button variant="outline">
              Configure Permissions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RolePermissions;
