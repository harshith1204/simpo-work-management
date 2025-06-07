
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit2, Trash2, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AddMemberModal from "@/components/AddMemberModal";
import CompanyOnboarding from "@/components/hrms/CompanyOnboarding";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [showCompanyOnboarding, setShowCompanyOnboarding] = useState(false);
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "Alex Johnson", email: "alex@company.com", role: "Admin", status: true },
    { id: 2, name: "Sarah Chen", email: "sarah@company.com", role: "Editor", status: true },
    { id: 3, name: "Mike Rodriguez", email: "mike@company.com", role: "Viewer", status: false },
    { id: 4, name: "Emily Davis", email: "emily@company.com", role: "Editor", status: true },
  ]);

  const { toast } = useToast();

  const tabs = [
    { id: "general", label: "General" },
    { id: "team", label: "Team Management" },
    { id: "permissions", label: "Permissions" },
    { id: "notifications", label: "Notifications" },
    { id: "company", label: "Company Setup" },
  ];

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    });
  };

  const handleAddMember = (memberData: any) => {
    const newMember = {
      id: Date.now(),
      name: memberData.name,
      email: memberData.email,
      role: memberData.role,
      status: true
    };
    setTeamMembers([...teamMembers, newMember]);
    toast({
      title: "Member added",
      description: `${memberData.name} has been added to the team.`,
    });
  };

  const toggleMemberStatus = (id: number) => {
    setTeamMembers(members => 
      members.map(member => 
        member.id === id ? { ...member, status: !member.status } : member
      )
    );
  };

  const handleCompanyOnboardingComplete = () => {
    setShowCompanyOnboarding(false);
    toast({
      title: "Company setup completed",
      description: "Your company has been successfully configured.",
    });
  };

  const renderGeneralSettings = () => (
    <Card>
      <CardContent className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="orgName">Organization Name</Label>
            <Input id="orgName" defaultValue="Simpo Inc." />
          </div>
          
          <div className="space-y-3">
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
          
          <div className="space-y-3">
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
          
          <div className="space-y-3">
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
        
        <Button onClick={handleSaveSettings} className="mt-6">
          Save Settings
        </Button>
      </CardContent>
    </Card>
  );

  const renderTeamManagement = () => (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Team Management</h3>
          <Button onClick={() => setIsAddMemberOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>
        
        <div className="space-y-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex-1">
                <div className="flex items-center space-x-4">
                  <div>
                    <h4 className="font-medium text-gray-900">{member.name}</h4>
                    <p className="text-sm text-gray-600">{member.email}</p>
                  </div>
                  <Badge variant="outline">{member.role}</Badge>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Label htmlFor={`status-${member.id}`} className="text-sm">
                    {member.status ? "Active" : "Inactive"}
                  </Label>
                  <Switch
                    id={`status-${member.id}`}
                    checked={member.status}
                    onCheckedChange={() => toggleMemberStatus(member.id)}
                  />
                </div>
                <Button variant="ghost" size="sm">
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderPermissions = () => (
    <Card>
      <CardContent className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Permissions</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Role</th>
                <th className="text-center py-3 px-4">Can View Projects</th>
                <th className="text-center py-3 px-4">Can Edit Tasks</th>
                <th className="text-center py-3 px-4">Can Manage Settings</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-4 px-4 font-medium">Admin</td>
                <td className="py-4 px-4 text-center">
                  <Switch defaultChecked />
                </td>
                <td className="py-4 px-4 text-center">
                  <Switch defaultChecked />
                </td>
                <td className="py-4 px-4 text-center">
                  <Switch defaultChecked />
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4 font-medium">Editor</td>
                <td className="py-4 px-4 text-center">
                  <Switch defaultChecked />
                </td>
                <td className="py-4 px-4 text-center">
                  <Switch defaultChecked />
                </td>
                <td className="py-4 px-4 text-center">
                  <Switch />
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-medium">Viewer</td>
                <td className="py-4 px-4 text-center">
                  <Switch defaultChecked />
                </td>
                <td className="py-4 px-4 text-center">
                  <Switch />
                </td>
                <td className="py-4 px-4 text-center">
                  <Switch />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  const renderNotifications = () => (
    <Card>
      <CardContent className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Email Notifications</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="task-assigned">New Task Assigned</Label>
                  <p className="text-sm text-gray-600">Get notified when a task is assigned to you</p>
                </div>
                <Switch id="task-assigned" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="task-completed">Task Completed</Label>
                  <p className="text-sm text-gray-600">Get notified when someone completes a task</p>
                </div>
                <Switch id="task-completed" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="issue-updated">Issue Updated</Label>
                  <p className="text-sm text-gray-600">Get notified when an issue is updated</p>
                </div>
                <Switch id="issue-updated" />
              </div>
            </div>
          </div>
        </div>
        
        <Button onClick={handleSaveSettings}>
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  );

  const renderCompanySetup = () => (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="text-center py-8">
          <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">Company Onboarding</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Set up your company profile, organization structure, compliance details, and HR policies
          </p>
          <Button onClick={() => setShowCompanyOnboarding(true)}>
            <Building className="w-4 h-4 mr-2" />
            Start Company Setup
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (showCompanyOnboarding) {
    return (
      <CompanyOnboarding 
        onComplete={handleCompanyOnboardingComplete}
        onCancel={() => setShowCompanyOnboarding(false)}
      />
    );
  }

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
                ? "bg-[#270E2B] text-white font-semibold"
                : "text-black hover:text-[#270E2B] hover:bg-gray-50"
            }`}
          >
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
        {activeTab === "company" && renderCompanySetup()}
      </div>

      <AddMemberModal 
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
        onSubmit={handleAddMember}
      />
    </div>
  );
};

export default Settings;
