
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Target, X } from "lucide-react";

interface ContentObjectiveDropdownProps {
  objective: string;
  onObjectiveChange: (objective: string) => void;
  contentLength: number;
  onContentLengthChange: (length: number) => void;
  targetKeywords: string[];
  onTargetKeywordsChange: (keywords: string[]) => void;
  keywordDensity: number;
  onKeywordDensityChange: (density: number) => void;
}

const ContentObjectiveDropdown = ({ 
  objective, 
  onObjectiveChange,
  contentLength,
  onContentLengthChange,
  targetKeywords,
  onTargetKeywordsChange,
  keywordDensity,
  onKeywordDensityChange
}: ContentObjectiveDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newKeyword, setNewKeyword] = useState("");

  const objectives = [
    { value: "educate", label: "Educate", description: "Inform and teach your audience" },
    { value: "convert", label: "Convert", description: "Drive sales and conversions" },
    { value: "engage", label: "Engage", description: "Build community and interaction" },
    { value: "entertain", label: "Entertain", description: "Create enjoyable content" },
    { value: "inspire", label: "Inspire", description: "Motivate and encourage action" },
    { value: "build-trust", label: "Build Trust", description: "Establish credibility and authority" }
  ];

  const addKeyword = () => {
    if (newKeyword.trim() && !targetKeywords.includes(newKeyword.trim())) {
      onTargetKeywordsChange([...targetKeywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  const removeKeyword = (keyword: string) => {
    onTargetKeywordsChange(targetKeywords.filter(k => k !== keyword));
  };

  const getContentLengthLabel = (length: number) => {
    if (length <= 500) return "Short (≤500 words)";
    if (length <= 1000) return "Medium (≤1000 words)";
    if (length <= 2000) return "Long (≤2000 words)";
    return "Extended (2000+ words)";
  };

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
      <DropdownMenuContent className="w-96 p-4 bg-white border shadow-lg z-50">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Content Objective & Settings</h3>
            <p className="text-sm text-gray-600">Configure your content goals and parameters</p>
          </div>

          {/* Content Objective */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Primary Objective</Label>
            {objectives.map((obj) => (
              <div 
                key={obj.value}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  objective === obj.value 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => onObjectiveChange(obj.value)}
              >
                <div className="font-medium text-gray-900">{obj.label}</div>
                <div className="text-sm text-gray-600">{obj.description}</div>
              </div>
            ))}
          </div>

          {/* Content Length */}
          <div>
            <Label className="text-sm font-medium">Content Length</Label>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Short</span>
                <span className="font-medium">{getContentLengthLabel(contentLength)}</span>
                <span>Extended</span>
              </div>
              <Slider
                value={[contentLength]}
                onValueChange={(value) => onContentLengthChange(value[0])}
                max={3000}
                min={300}
                step={100}
                className="w-full"
              />
              <div className="text-xs text-gray-500 text-center">
                Target: {contentLength} words
              </div>
            </div>
          </div>

          {/* Target Keywords */}
          <div>
            <Label className="text-sm font-medium">Target Keywords</Label>
            <div className="flex space-x-2 mt-1">
              <Input
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                placeholder="Add keyword"
                className="flex-1 text-sm"
                onKeyPress={(e) => e.key === "Enter" && addKeyword()}
              />
              <Button onClick={addKeyword} size="sm">Add</Button>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {targetKeywords.map((keyword, idx) => (
                <Badge 
                  key={idx} 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-red-100 text-xs" 
                  onClick={() => removeKeyword(keyword)}
                >
                  {keyword}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>

          {/* Keyword Density */}
          <div>
            <Label className="text-sm font-medium">Keyword Density</Label>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>1%</span>
                <span className="font-medium">{keywordDensity}%</span>
                <span>5%</span>
              </div>
              <Slider
                value={[keywordDensity]}
                onValueChange={(value) => onKeywordDensityChange(value[0])}
                max={5}
                min={1}
                step={0.5}
                className="w-full"
              />
              <div className="text-xs text-gray-500 text-center">
                Recommended: 2-3% for optimal SEO
              </div>
            </div>
          </div>

          <Button 
            className="w-full" 
            onClick={() => setIsOpen(false)}
          >
            Apply Settings
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ContentObjectiveDropdown;
