
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Plus, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Role {
  id: string;
  name: string;
  permissions: {
    view: boolean;
    edit: boolean;
    approve: boolean;
    finalize: boolean;
    payslipView: boolean;
  };
  assignedUsers: string[];
}

interface RolePermissionsProps {
  onComplete: () => void;
}

const RolePermissions = ({ onComplete }: RolePermissionsProps) => {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "1",
      name: "HR Admin",
      permissions: {
        view: true,
        edit: true,
        approve: true,
        finalize: true,
        payslipView: true
      },
      assignedUsers: ["john@company.com", "jane@company.com"]
    },
    {
      id: "2",
      name: "Finance Manager",
      permissions: {
        view: true,
        edit: false,
        approve: true,
        finalize: true,
        payslipView: true
      },
      assignedUsers: ["finance@company.com"]
    },
    {
      id: "3",
      name: "Employee",
      permissions: {
        view: false,
        edit: false,
        approve: false,
        finalize: false,
        payslipView: true
      },
      assignedUsers: []
    }
  ]);

  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [newRole, setNewRole] = useState({
    name: "",
    permissions: {
      view: false,
      edit: false,
      approve: false,
      finalize: false,
      payslipView: false
    },
    assignedUsers: [] as string[]
  });

  const [selectedUsers, setSelectedUsers] = useState<string>("");

  const availableUsers = [
    "john@company.com",
    "jane@company.com",
    "finance@company.com",
    "hr@company.com",
    "admin@company.com"
  ];

  const permissions = [
    { key: "view", label: "View Payroll Data" },
    { key: "edit", label: "Edit Payroll Data" },
    { key: "approve", label: "Approve Payroll" },
    { key: "finalize", label: "Finalize Payroll" },
    { key: "payslipView", label: "View Payslips" }
  ];

  const addRole = () => {
    const role: Role = {
      id: Date.now().toString(),
      ...newRole
    };
    setRoles([...roles, role]);
    setNewRole({
      name: "",
      permissions: {
        view: false,
        edit: false,
        approve: false,
        finalize: false,
        payslipView: false
      },
      assignedUsers: []
    });
    setIsAddRoleOpen(false);
  };

  const removeRole = (id: string) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  const updateRolePermission = (id: string, permission: keyof Role["permissions"], value: boolean) => {
    setRoles(roles.map(role => 
      role.id === id 
        ? { ...role, permissions: { ...role.permissions, [permission]: value } }
        : role
    ));
  };

  const addUserToRole = (roleId: string, userEmail: string) => {
    setRoles(roles.map(role => 
      role.id === roleId 
        ? { ...role, assignedUsers: [...role.assignedUsers, userEmail] }
        : role
    ));
  };

  const removeUserFromRole = (roleId: string, userEmail: string) => {
    setRoles(roles.map(role => 
      role.id === roleId 
        ? { ...role, assignedUsers: role.assignedUsers.filter(user => user !== userEmail) }
        : role
    ));
  };

  const handleSave = () => {
    onComplete();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Roles & Access Management</span>
          </div>
          <Dialog open={isAddRoleOpen} onOpenChange={setIsAddRoleOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Role
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Role</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Role Name</Label>
                  <Input
                    value={newRole.name}
                    onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                    placeholder="e.g., Custom Role"
                  />
                </div>
                <div>
                  <Label className="mb-3 block">Permissions</Label>
                  <div className="space-y-2">
                    {permissions.map((permission) => (
                      <div key={permission.key} className="flex items-center space-x-2">
                        <Checkbox
                          id={permission.key}
                          checked={newRole.permissions[permission.key as keyof typeof newRole.permissions]}
                          onCheckedChange={(checked) => 
                            setNewRole({
                              ...newRole,
                              permissions: {
                                ...newRole.permissions,
                                [permission.key]: checked
                              }
                            })
                          }
                        />
                        <Label htmlFor={permission.key} className="text-sm">{permission.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <Button onClick={addRole} className="w-full">Add Role</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {roles.map((role) => (
            <div key={role.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{role.name}</h3>
                <Button
                  onClick={() => removeRole(role.id)}
                  size="sm"
                  variant="outline"
                  disabled={role.name === "Employee"} // Prevent deleting default employee role
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Permissions Matrix */}
              <div>
                <Label className="mb-2 block">Permissions</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {permissions.map((permission) => (
                    <div key={permission.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${role.id}-${permission.key}`}
                        checked={role.permissions[permission.key as keyof typeof role.permissions]}
                        onCheckedChange={(checked) => 
                          updateRolePermission(role.id, permission.key as keyof Role["permissions"], checked as boolean)
                        }
                      />
                      <Label htmlFor={`${role.id}-${permission.key}`} className="text-sm">{permission.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assigned Users */}
              <div>
                <Label className="mb-2 block">Assigned Users</Label>
                <div className="flex gap-2 mb-2">
                  <Select onValueChange={setSelectedUsers}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select user to assign" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableUsers
                        .filter(user => !role.assignedUsers.includes(user))
                        .map((user) => (
                          <SelectItem key={user} value={user}>{user}</SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={() => {
                      if (selectedUsers) {
                        addUserToRole(role.id, selectedUsers);
                        setSelectedUsers("");
                      }
                    }}
                    size="sm"
                  >
                    Add
                  </Button>
                </div>
                <div className="space-y-1">
                  {role.assignedUsers.map((user) => (
                    <div key={user} className="flex items-center justify-between bg-gray-50 px-2 py-1 rounded text-sm">
                      <span>{user}</span>
                      <Button
                        onClick={() => removeUserFromRole(role.id, user)}
                        size="sm"
                        variant="ghost"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-6">
          <Button onClick={handleSave}>Save Role Permissions</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RolePermissions;
