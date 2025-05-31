
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Collaborator {
  id: number;
  name: string;
  initials: string;
  avatar?: string;
  activeIssues: number;
  role: string;
}

interface CollaboratorsSectionProps {
  searchTerm: string;
}

const CollaboratorsSection = ({ searchTerm }: CollaboratorsSectionProps) => {
  const collaborators: Collaborator[] = [
    { id: 1, name: "John Doe", initials: "JD", activeIssues: 5, role: "Developer" },
    { id: 2, name: "Sarah Wilson", initials: "SW", activeIssues: 3, role: "Designer" },
    { id: 3, name: "Mike Johnson", initials: "MJ", activeIssues: 7, role: "PM" },
    { id: 4, name: "Emily Chen", initials: "EC", activeIssues: 2, role: "QA" },
    { id: 5, name: "Alex Rodriguez", initials: "AR", activeIssues: 4, role: "Developer" },
  ];

  const filteredCollaborators = collaborators.filter(collaborator =>
    collaborator.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-3">
      {filteredCollaborators.map((collaborator) => (
        <div key={collaborator.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
              <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                {collaborator.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-gray-900">{collaborator.name}</p>
              <p className="text-sm text-gray-600">{collaborator.role}</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-blue-50 text-blue-700">
            {collaborator.activeIssues} active
          </Badge>
        </div>
      ))}
      {filteredCollaborators.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          No collaborators found
        </div>
      )}
    </div>
  );
};

export default CollaboratorsSection;
