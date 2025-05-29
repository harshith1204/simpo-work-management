
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, User, Mail, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [newMemberData, setNewMemberData] = useState({ name: "", email: "", role: "" });
  const { toast } = useToast();

  const tabs = [
    { id: "general", label: "General Settings", icon: "⚙️" },
    { id: "team", label: "Team Management", icon: "👥" },
    { id: "permissions", label: "Permissions", icon: "🔒" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
  ];

  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "Alex Johnson", email: "alex@company.com", role: "Admin", status: true },
    { id: 2, name: "Sarah Chen", email: "sarah@company.com", role: "Editor", status: true },
    { id: 3, name: "Mike Rodriguez", email: "mike@company.com", role: "Viewer", status: false },
    { id: 4, name: "Emily Davis", email: "emily@company.com", role: "Editor", status: true },
  ]);

  const [permissions, setPermissions] = useState({
    Admin: { viewProjects: true, editTasks: true, manageSettings: true },
    Editor: { viewProjects: true, editTasks: true, manageSettings: false },
    Viewer: { viewProjects: true, editTasks: false, manageSettings: false },
  });

  const [notifications, setNotifications] = useState({
    newTaskAssigned: true,
    taskCompleted: false,
    issueUpdated: true,
  });

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };

  const handleAddMember = () => {
    if (!newMemberData.name || !newMemberData.email || !newMemberData.role) return;
    
    const newMember = {
      id: teamMembers.length + 1,
      ...newMemberData,
      status: true
    };
    
    setTeamMembers([...teamMembers, newMember]);
    setIsAddMemberModalOpen(false);
    setNewMemberData({ name: "", email: "", role: "" });
    
    toast({
      title: "Team member added",
      description: `${newMemberData.name} has been added to the team.`,
    });
  };

  const toggleMemberStatus = (id: number) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === id ? { ...member, status: !member.status } : member
    ));
  };

  const updatePermission = (role: string, permission: string, value: boolean) => {
    setPermissions(prev => ({
      ...prev,
      [role]: { ...prev[role], [permission]: value }
    }));
  };

  const renderGeneralSettings = () => (
    <Card>
      <CardContent className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="orgName">Organization Name</Label>
            <Input id="orgName" placeholder="Your Organization" />
          </div>
          
          <div className="space-y-2">
            <Label>Timezone</Label>
            <Select defaultValue="utc">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utc">UTC</SelectItem>
                <SelectItem value="est">Eastern Time</SelectItem>
                <SelectItem value="pst">Pacific Time</SelectItem>
                <SelectItem value="cet">Central European Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Language</Label>
            <Select defaultValue="en">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Currency Format</Label>
            <Select defaultValue="usd">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD ($)</SelectItem>
                <SelectItem value="eur">EUR (€)</SelectItem>
                <SelectItem value="gbp">GBP (£)</SelectItem>
                <SelectItem value="jpy">JPY (¥)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button onClick={handleSaveSettings} className="mt-4">
          Save Settings
        </Button>
      </CardContent>
    </Card>
  );

  const renderTeamManagement = () => (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
          <Button onClick={() => setIsAddMemberModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>
                  <Badge variant="outline">{member.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={member.status ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                    {member.status ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={member.status}
                    onCheckedChange={() => toggleMemberStatus(member.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderPermissions = () => (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Role Permissions</h3>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>Can View Projects</TableHead>
              <TableHead>Can Edit Tasks</TableHead>
              <TableHead>Can Manage Settings</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(permissions).map(([role, perms]) => (
              <TableRow key={role}>
                <TableCell className="font-medium">{role}</TableCell>
                <TableCell>
                  <Switch
                    checked={perms.viewProjects}
                    onCheckedChange={(checked) => updatePermission(role, 'viewProjects', checked)}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={perms.editTasks}
                    onCheckedChange={(checked) => updatePermission(role, 'editTasks', checked)}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={perms.manageSettings}
                    onCheckedChange={(checked) => updatePermission(role, 'manageSettings', checked)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderNotifications = () => (
    <Card>
      <CardContent className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Email Notification Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">New Task Assigned</h4>
              <p className="text-sm text-gray-600">Get notified when a new task is assigned to you</p>
            </div>
            <Switch
              checked={notifications.newTaskAssigned}
              onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, newTaskAssigned: checked }))}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Task Completed</h4>
              <p className="text-sm text-gray-600">Get notified when tasks are marked as complete</p>
            </div>
            <Switch
              checked={notifications.taskCompleted}
              onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, taskCompleted: checked }))}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Issue Updated</h4>
              <p className="text-sm text-gray-600">Get notified when issues you're watching are updated</p>
            </div>
            <Switch
              checked={notifications.issueUpdated}
              onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, issueUpdated: checked }))}
            />
          </div>
        </div>
        
        <Button onClick={handleSaveSettings} className="mt-6">
          Save Notification Settings
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex gap-8 font-dm-sans">
      {/* Left Sidebar Navigation */}
      <div className="w-64 space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-[#3D5AFE]/10 text-[#3D5AFE] font-semibold"
                : "text-black hover:text-[#3D5AFE] hover:bg-gray-50"
            }`}
          >
            <span className="mr-3">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1">
        {activeTab === "general" && renderGeneralSettings()}
        {activeTab === "team" && renderTeamManagement()}
        {activeTab === "permissions" && renderPermissions()}
        {activeTab === "notifications" && renderNotifications()}
      </div>

      {/* Add Member Modal */}
      <Dialog open={isAddMemberModalOpen} onOpenChange={setIsAddMemberModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Add Team Member
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="memberName">Name *</Label>
              <Input
                id="memberName"
                value={newMemberData.name}
                onChange={(e) => setNewMemberData({ ...newMemberData, name: e.target.value })}
                placeholder="Enter member name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="memberEmail">Email *</Label>
              <Input
                id="memberEmail"
                type="email"
                value={newMemberData.email}
                onChange={(e) => setNewMemberData({ ...newMemberData, email: e.target.value })}
                placeholder="Enter email address"
              />
            </div>

            <div className="space-y-2">
              <Label>Role *</Label>
              <Select value={newMemberData.role} onValueChange={(value) => setNewMemberData({ ...newMemberData, role: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Editor">Editor</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="flex space-x-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsAddMemberModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddMember}>
              Send Invite
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;
