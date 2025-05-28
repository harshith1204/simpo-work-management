
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Wilson",
      role: "Project Manager",
      team: "Product",
      status: "Available",
      email: "sarah@company.com",
      avatar: "👩‍💼"
    },
    {
      id: 2,
      name: "Mike Johnson",
      role: "UI Designer",
      team: "Design",
      status: "Busy",
      email: "mike@company.com",
      avatar: "👨‍🎨"
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "Frontend Developer",
      team: "Engineering",
      status: "Available",
      email: "emily@company.com",
      avatar: "👩‍💻"
    },
    {
      id: 4,
      name: "Alex Chen",
      role: "UX Researcher",
      team: "Design",
      status: "On Leave",
      email: "alex@company.com",
      avatar: "👨‍🔬"
    },
    {
      id: 5,
      name: "David Rodriguez",
      role: "Backend Developer",
      team: "Engineering",
      status: "Available",
      email: "david@company.com",
      avatar: "👨‍💻"
    },
    {
      id: 6,
      name: "Lisa Zhang",
      role: "Product Designer",
      team: "Design",
      status: "Busy",
      email: "lisa@company.com",
      avatar: "👩‍🎨"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available": return "bg-green-100 text-green-800";
      case "Busy": return "bg-yellow-100 text-yellow-800";
      case "On Leave": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button className="swiss-button">Invite New Member</Button>
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="All Teams" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teams</SelectItem>
              <SelectItem value="product">Product</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="designer">Designer</SelectItem>
              <SelectItem value="developer">Developer</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="busy">Busy</SelectItem>
              <SelectItem value="leave">On Leave</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id} className="swiss-card hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{member.avatar}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-gray-600 text-sm">{member.role}</p>
                  <p className="text-gray-500 text-xs">{member.email}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {member.team}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                      {member.status}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Team;
