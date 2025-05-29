
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Calendar, Users, Target } from "lucide-react";

const Active = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const activeCycles = [
    {
      id: 1,
      name: "June Sprint",
      startDate: "June 1, 2024",
      endDate: "June 30, 2024",
      owner: "Anjali",
      progress: 60,
      totalIssues: 20,
      completedIssues: 12,
      status: "In Progress"
    }
  ];

  const handleCreateCycle = () => {
    console.log("Creating new cycle...");
    setIsCreateModalOpen(false);
  };

  return (
    <div className="space-y-6 font-dm-sans">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Active Cycles</h2>
          <p className="text-gray-600 mt-1">Manage your current development cycles</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#270E2B] hover:bg-[#270E2B]/90">
              <Plus className="w-4 h-4 mr-2" />
              Create New Cycle
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Cycle</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="cycleName">Cycle Name</Label>
                <Input id="cycleName" placeholder="Enter cycle name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" type="date" />
                </div>
              </div>
              <div>
                <Label htmlFor="owner">Owner</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select owner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="anjali">Anjali</SelectItem>
                    <SelectItem value="sarah">Sarah</SelectItem>
                    <SelectItem value="jane">Jane</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter cycle description" />
              </div>
              <div className="flex space-x-2 pt-4">
                <Button onClick={handleCreateCycle} className="bg-[#270E2B] hover:bg-[#270E2B]/90">
                  Create Cycle
                </Button>
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {activeCycles.map((cycle) => (
          <Card key={cycle.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{cycle.name}</CardTitle>
                <Badge className="bg-green-100 text-green-800">{cycle.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Start: {cycle.startDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">End: {cycle.endDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Owner: {cycle.owner}</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm text-gray-600">{cycle.completedIssues}/{cycle.totalIssues} issues completed</span>
                  </div>
                  <Progress value={cycle.progress} className="h-2" />
                  <span className="text-xs text-gray-500 mt-1">{cycle.progress}% complete</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Active;
