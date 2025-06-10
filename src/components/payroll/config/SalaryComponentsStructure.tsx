
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { DollarSign, Plus, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface SalaryComponent {
  id: string;
  name: string;
  type: "earning" | "deduction" | "reimbursement";
  taxable: boolean;
  fixedOrVariable: "fixed" | "variable";
  amountRule: string;
}

interface SalaryTemplate {
  id: string;
  name: string;
  components: string[];
  applicableRoles: string[];
  allowHROverrides: boolean;
}

interface SalaryComponentsStructureProps {
  onComplete: () => void;
}

const SalaryComponentsStructure = ({ onComplete }: SalaryComponentsStructureProps) => {
  const [components, setComponents] = useState<SalaryComponent[]>([
    {
      id: "1",
      name: "Basic Salary",
      type: "earning",
      taxable: true,
      fixedOrVariable: "fixed",
      amountRule: "Fixed amount"
    },
    {
      id: "2",
      name: "HRA",
      type: "earning",
      taxable: true,
      fixedOrVariable: "variable",
      amountRule: "40% of Basic Salary"
    }
  ]);

  const [templates, setTemplates] = useState<SalaryTemplate[]>([
    {
      id: "1",
      name: "Standard Template",
      components: ["1", "2"],
      applicableRoles: ["Developer", "Manager"],
      allowHROverrides: true
    }
  ]);

  const [isAddComponentOpen, setIsAddComponentOpen] = useState(false);
  const [isAddTemplateOpen, setIsAddTemplateOpen] = useState(false);
  
  const [newComponent, setNewComponent] = useState({
    name: "",
    type: "earning" as const,
    taxable: true,
    fixedOrVariable: "fixed" as const,
    amountRule: ""
  });

  const [newTemplate, setNewTemplate] = useState({
    name: "",
    components: [] as string[],
    applicableRoles: [] as string[],
    allowHROverrides: true
  });

  const addComponent = () => {
    const component: SalaryComponent = {
      id: Date.now().toString(),
      ...newComponent
    };
    setComponents([...components, component]);
    setNewComponent({
      name: "",
      type: "earning",
      taxable: true,
      fixedOrVariable: "fixed",
      amountRule: ""
    });
    setIsAddComponentOpen(false);
  };

  const addTemplate = () => {
    const template: SalaryTemplate = {
      id: Date.now().toString(),
      ...newTemplate
    };
    setTemplates([...templates, template]);
    setNewTemplate({
      name: "",
      components: [],
      applicableRoles: [],
      allowHROverrides: true
    });
    setIsAddTemplateOpen(false);
  };

  const removeComponent = (id: string) => {
    setComponents(components.filter(comp => comp.id !== id));
  };

  const removeTemplate = (id: string) => {
    setTemplates(templates.filter(template => template.id !== id));
  };

  const handleSave = () => {
    onComplete();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5" />
          <span>Salary Components & Structure</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="components" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="templates">Structure Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="components" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Salary Components</h3>
              <Dialog open={isAddComponentOpen} onOpenChange={setIsAddComponentOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Component
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Salary Component</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Component Name</Label>
                      <Input
                        value={newComponent.name}
                        onChange={(e) => setNewComponent({...newComponent, name: e.target.value})}
                        placeholder="e.g., Travel Allowance"
                      />
                    </div>
                    <div>
                      <Label>Component Type</Label>
                      <Select onValueChange={(value) => setNewComponent({...newComponent, type: value as any})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="earning">Earning</SelectItem>
                          <SelectItem value="deduction">Deduction</SelectItem>
                          <SelectItem value="reimbursement">Reimbursement</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Amount Rule</Label>
                      <Input
                        value={newComponent.amountRule}
                        onChange={(e) => setNewComponent({...newComponent, amountRule: e.target.value})}
                        placeholder="e.g., Fixed amount, % of basic salary"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Is Taxable?</Label>
                      <Switch
                        checked={newComponent.taxable}
                        onCheckedChange={(checked) => setNewComponent({...newComponent, taxable: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Fixed or Variable</Label>
                      <Select onValueChange={(value) => setNewComponent({...newComponent, fixedOrVariable: value as any})}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fixed">Fixed</SelectItem>
                          <SelectItem value="variable">Variable</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={addComponent} className="w-full">Add Component</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {components.map((component) => (
                <div key={component.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{component.name}</h4>
                    <Button
                      onClick={() => removeComponent(component.id)}
                      size="sm"
                      variant="outline"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>Type: {component.type}</div>
                    <div>Taxable: {component.taxable ? "Yes" : "No"}</div>
                    <div>Nature: {component.fixedOrVariable}</div>
                    <div>Rule: {component.amountRule}</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Salary Structure Templates</h3>
              <Dialog open={isAddTemplateOpen} onOpenChange={setIsAddTemplateOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Template
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Salary Template</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Template Name</Label>
                      <Input
                        value={newTemplate.name}
                        onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                        placeholder="e.g., Executive Structure"
                      />
                    </div>
                    <div>
                      <Label>Components (Select multiple)</Label>
                      <div className="border rounded p-2 max-h-32 overflow-y-auto">
                        {components.map((component) => (
                          <div key={component.id} className="flex items-center space-x-2 py-1">
                            <input
                              type="checkbox"
                              id={`template-${component.id}`}
                              checked={newTemplate.components.includes(component.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setNewTemplate({
                                    ...newTemplate,
                                    components: [...newTemplate.components, component.id]
                                  });
                                } else {
                                  setNewTemplate({
                                    ...newTemplate,
                                    components: newTemplate.components.filter(id => id !== component.id)
                                  });
                                }
                              }}
                            />
                            <Label htmlFor={`template-${component.id}`} className="text-sm">{component.name}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Allow HR Overrides</Label>
                      <Switch
                        checked={newTemplate.allowHROverrides}
                        onCheckedChange={(checked) => setNewTemplate({...newTemplate, allowHROverrides: checked})}
                      />
                    </div>
                    <Button onClick={addTemplate} className="w-full">Add Template</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {templates.map((template) => (
                <div key={template.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{template.name}</h4>
                    <Button
                      onClick={() => removeTemplate(template.id)}
                      size="sm"
                      variant="outline"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>
                      Components: {template.components.map(compId => 
                        components.find(c => c.id === compId)?.name
                      ).filter(Boolean).join(", ")}
                    </div>
                    <div>HR Overrides: {template.allowHROverrides ? "Allowed" : "Not Allowed"}</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-6">
          <Button onClick={handleSave}>Save Configuration</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalaryComponentsStructure;
