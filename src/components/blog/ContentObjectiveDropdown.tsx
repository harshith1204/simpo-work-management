
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Target } from "lucide-react";

interface ContentObjectiveDropdownProps {
  objective: string;
  onObjectiveChange: (objective: string) => void;
}

const ContentObjectiveDropdown = ({ objective, onObjectiveChange }: ContentObjectiveDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const objectives = [
    { value: "educate", label: "Educate", description: "Inform and teach your audience" },
    { value: "convert", label: "Convert", description: "Drive sales and conversions" },
    { value: "engage", label: "Engage", description: "Build community and interaction" },
    { value: "entertain", label: "Entertain", description: "Create enjoyable content" },
    { value: "inspire", label: "Inspire", description: "Motivate and encourage action" },
    { value: "build-trust", label: "Build Trust", description: "Establish credibility and authority" }
  ];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-white border-gray-200 hover:bg-gray-50"
        >
          <Target className="w-4 h-4 mr-2" />
          Content Goal: {objectives.find(obj => obj.value === objective)?.label || "Select"}
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-4 bg-white border shadow-lg">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Content Objective</h3>
            <p className="text-sm text-gray-600">What's the primary goal of this content?</p>
          </div>

          <div className="space-y-2">
            {objectives.map((obj) => (
              <div 
                key={obj.value}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  objective === obj.value 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => {
                  onObjectiveChange(obj.value);
                  setIsOpen(false);
                }}
              >
                <div className="font-medium text-gray-900">{obj.label}</div>
                <div className="text-sm text-gray-600">{obj.description}</div>
              </div>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ContentObjectiveDropdown;
