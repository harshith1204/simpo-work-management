
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Hash, Target } from "lucide-react";

interface KeywordPlacement {
  keyword: string;
  target_sections: string[];
  density_percentage: number;
  placement_priority: "high" | "medium" | "low";
}

interface SEOPreferences {
  target_keywords: string[];
  keyword_placements: KeywordPlacement[];
  meta_title_preference: string;
  meta_description_preference: string;
  target_search_intent: "informational" | "commercial" | "navigational" | "transactional";
}

interface SEOPreferencesDropdownProps {
  preferences: SEOPreferences;
  onPreferencesChange: (preferences: SEOPreferences) => void;
}

const SEOPreferencesDropdown = ({ preferences, onPreferencesChange }: SEOPreferencesDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newKeyword, setNewKeyword] = useState("");

  const addKeyword = () => {
    if (newKeyword.trim() && !preferences.target_keywords.includes(newKeyword.trim())) {
      onPreferencesChange({
        ...preferences,
        target_keywords: [...preferences.target_keywords, newKeyword.trim()]
      });
      setNewKeyword("");
    }
  };

  const removeKeyword = (keyword: string) => {
    onPreferencesChange({
      ...preferences,
      target_keywords: preferences.target_keywords.filter(k => k !== keyword),
      keyword_placements: preferences.keyword_placements.filter(kp => kp.keyword !== keyword)
    });
  };

  const addKeywordPlacement = (keyword: string) => {
    const existingPlacement = preferences.keyword_placements.find(kp => kp.keyword === keyword);
    if (!existingPlacement) {
      onPreferencesChange({
        ...preferences,
        keyword_placements: [...preferences.keyword_placements, {
          keyword,
          target_sections: ["Introduction"],
          density_percentage: 2.0,
          placement_priority: "high"
        }]
      });
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-white border-gray-200 hover:bg-gray-50"
        >
          <Hash className="w-4 h-4 mr-2" />
          SEO Settings
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96 p-4 bg-white border shadow-lg">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">SEO Preferences</h3>
            <p className="text-sm text-gray-600">Optimize your content for search engines</p>
          </div>

          {/* Keywords Section */}
          <div>
            <Label className="text-sm font-medium">Target Keywords</Label>
            <div className="flex space-x-2 mt-1">
              <Input
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                placeholder="Add keyword"
                className="flex-1"
                onKeyPress={(e) => e.key === "Enter" && addKeyword()}
              />
              <Button onClick={addKeyword} size="sm">Add</Button>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {preferences.target_keywords.map((keyword, idx) => (
                <Badge 
                  key={idx} 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-red-100" 
                  onClick={() => removeKeyword(keyword)}
                >
                  {keyword} ×
                </Badge>
              ))}
            </div>
          </div>

          {/* Meta Title */}
          <div>
            <Label className="text-sm font-medium">Meta Title Preference</Label>
            <Input
              value={preferences.meta_title_preference}
              onChange={(e) => onPreferencesChange({...preferences, meta_title_preference: e.target.value})}
              placeholder="Preferred meta title"
              className="mt-1"
            />
          </div>

          {/* Meta Description */}
          <div>
            <Label className="text-sm font-medium">Meta Description</Label>
            <Input
              value={preferences.meta_description_preference}
              onChange={(e) => onPreferencesChange({...preferences, meta_description_preference: e.target.value})}
              placeholder="Preferred meta description"
              className="mt-1"
            />
          </div>

          {/* Search Intent */}
          <div>
            <Label className="text-sm font-medium">Target Search Intent</Label>
            <Select 
              value={preferences.target_search_intent} 
              onValueChange={(value: any) => onPreferencesChange({...preferences, target_search_intent: value})}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="informational">Informational</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="navigational">Navigational</SelectItem>
                <SelectItem value="transactional">Transactional</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            className="w-full" 
            onClick={() => setIsOpen(false)}
          >
            Apply SEO Settings
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SEOPreferencesDropdown;
