
import { Plug, Settings, Check, X, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const Integrations = () => {
  const integrations = [
    {
      id: 1,
      name: "Slack",
      description: "Get notifications and updates directly in your Slack channels",
      icon: "💬",
      connected: true,
      category: "Communication",
    },
    {
      id: 2,
      name: "GitHub",
      description: "Connect your repositories and sync issues with code commits",
      icon: "🐙",
      connected: true,
      category: "Development",
    },
    {
      id: 3,
      name: "Figma",
      description: "Link design files and collaborate on design projects",
      icon: "🎨",
      connected: false,
      category: "Design",
    },
    {
      id: 4,
      name: "Google Drive",
      description: "Store and access project documents in Google Drive",
      icon: "📁",
      connected: false,
      category: "Storage",
    },
    {
      id: 5,
      name: "Zoom",
      description: "Schedule and join meetings directly from your projects",
      icon: "🎥",
      connected: true,
      category: "Communication",
    },
    {
      id: 6,
      name: "Jira",
      description: "Sync tasks and issues with your existing Jira workflows",
      icon: "🔄",
      connected: false,
      category: "Project Management",
    },
  ];

  const handleToggle = (integrationId: number, currentStatus: boolean) => {
    console.log(`${currentStatus ? "Disconnecting" : "Connecting"} integration ${integrationId}`);
  };

  const handleConfigure = (integrationId: number) => {
    console.log(`Configuring integration ${integrationId}`);
  };

  const categories = [...new Set(integrations.map(int => int.category))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Integrations</h2>
          <p className="text-gray-600 mt-1">Connect Simpo with your favorite tools and services</p>
        </div>
        <Button variant="outline" className="px-6 py-2 rounded-xl font-medium">
          <ExternalLink className="w-4 h-4 mr-2" />
          Browse All
        </Button>
      </div>

      {/* Categories */}
      {categories.map((category) => {
        const categoryIntegrations = integrations.filter(int => int.category === category);
        
        return (
          <div key={category} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryIntegrations.map((integration) => (
                <Card key={integration.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{integration.icon}</div>
                        <div>
                          <CardTitle className="text-lg font-semibold text-gray-900">
                            {integration.name}
                          </CardTitle>
                          <Badge 
                            variant={integration.connected ? "default" : "secondary"}
                            className={integration.connected ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                          >
                            {integration.connected ? "Connected" : "Not Connected"}
                          </Badge>
                        </div>
                      </div>
                      <Switch
                        checked={integration.connected}
                        onCheckedChange={(checked) => handleToggle(integration.id, integration.connected)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600 text-sm">{integration.description}</p>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        {integration.connected ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <X className="w-4 h-4 text-gray-400" />
                        )}
                        <span className="text-sm text-gray-600">
                          {integration.connected ? "Active" : "Inactive"}
                        </span>
                      </div>
                      
                      <Button
                        size="sm"
                        variant={integration.connected ? "outline" : "default"}
                        onClick={() => handleConfigure(integration.id)}
                        className="px-4 py-1 text-sm"
                      >
                        {integration.connected ? (
                          <>
                            <Settings className="w-3 h-3 mr-1" />
                            Configure
                          </>
                        ) : (
                          "Connect"
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Integrations;
