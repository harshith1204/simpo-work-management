
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="w-full">
        <div className="flex">
          {/* Left Sidebar */}
          <div className="w-64 mr-8">
            <TabsList className="flex flex-col h-auto w-full">
              <TabsTrigger value="general" className="w-full justify-start">General</TabsTrigger>
              <TabsTrigger value="permissions" className="w-full justify-start">Team Permissions</TabsTrigger>
              <TabsTrigger value="integrations" className="w-full justify-start">Integrations</TabsTrigger>
              <TabsTrigger value="billing" className="w-full justify-start">Billing</TabsTrigger>
            </TabsList>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <TabsContent value="general" className="space-y-6">
              <Card className="swiss-card">
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" placeholder="Enter company name" defaultValue="Simpo.ai" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="workspace-url">Workspace URL</Label>
                    <Input id="workspace-url" placeholder="Enter workspace URL" defaultValue="simpo-ai.workspace.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input id="timezone" placeholder="Select timezone" defaultValue="UTC-8 (Pacific Time)" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="notifications" />
                    <Label htmlFor="notifications">Enable email notifications</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="analytics" defaultChecked />
                    <Label htmlFor="analytics">Allow analytics tracking</Label>
                  </div>
                </CardContent>
              </Card>

              <div className="flex space-x-4">
                <Button className="swiss-button">Save Changes</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </TabsContent>

            <TabsContent value="permissions" className="space-y-6">
              <Card className="swiss-card">
                <CardHeader>
                  <CardTitle>Team Permissions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Project Creation</h4>
                        <p className="text-sm text-gray-600">Allow team members to create new projects</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">User Invitations</h4>
                        <p className="text-sm text-gray-600">Allow team members to invite new users</p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Delete Projects</h4>
                        <p className="text-sm text-gray-600">Allow team members to delete projects</p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Export Data</h4>
                        <p className="text-sm text-gray-600">Allow team members to export project data</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex space-x-4">
                <Button className="swiss-button">Save Changes</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </TabsContent>

            <TabsContent value="integrations" className="space-y-6">
              <Card className="swiss-card">
                <CardHeader>
                  <CardTitle>Integrations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: "Slack", description: "Get notifications in Slack", connected: true },
                      { name: "GitHub", description: "Sync with GitHub repositories", connected: false },
                      { name: "Figma", description: "Import designs from Figma", connected: true },
                      { name: "Jira", description: "Sync with Jira tickets", connected: false }
                    ].map((integration, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium">{integration.name}</h4>
                          <p className="text-sm text-gray-600">{integration.description}</p>
                        </div>
                        <Button 
                          variant={integration.connected ? "outline" : "default"}
                          size="sm"
                        >
                          {integration.connected ? "Disconnect" : "Connect"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="space-y-6">
              <Card className="swiss-card">
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-800">Pro Plan</h4>
                      <p className="text-sm text-green-600">$29/month • Next billing date: April 1, 2024</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="billing-email">Billing Email</Label>
                      <Input id="billing-email" placeholder="Enter billing email" defaultValue="billing@simpo.ai" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="payment-method">Payment Method</Label>
                      <div className="p-3 border border-gray-200 rounded-lg">
                        <p className="text-sm">•••• •••• •••• 4242</p>
                        <p className="text-xs text-gray-500">Expires 12/2026</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex space-x-4">
                <Button className="swiss-button">Update Payment Method</Button>
                <Button variant="outline">Download Invoice</Button>
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Settings;
