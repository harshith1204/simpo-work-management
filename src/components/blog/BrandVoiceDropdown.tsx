
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Users } from "lucide-react";

interface BrandVoice {
  voice_style: string;
  target_audience: string[];
  brand_personality: string[];
  content_style_notes: string;
}

interface BrandVoiceDropdownProps {
  brandVoice: BrandVoice;
  onBrandVoiceChange: (brandVoice: BrandVoice) => void;
}

const BrandVoiceDropdown = ({ brandVoice, onBrandVoiceChange }: BrandVoiceDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newAudience, setNewAudience] = useState("");
  const [newPersonality, setNewPersonality] = useState("");

  const addAudience = () => {
    if (newAudience.trim() && !brandVoice.target_audience.includes(newAudience.trim())) {
      onBrandVoiceChange({
        ...brandVoice,
        target_audience: [...brandVoice.target_audience, newAudience.trim()]
      });
      setNewAudience("");
    }
  };

  const removeAudience = (audience: string) => {
    onBrandVoiceChange({
      ...brandVoice,
      target_audience: brandVoice.target_audience.filter(a => a !== audience)
    });
  };

  const addPersonality = () => {
    if (newPersonality.trim() && !brandVoice.brand_personality.includes(newPersonality.trim())) {
      onBrandVoiceChange({
        ...brandVoice,
        brand_personality: [...brandVoice.brand_personality, newPersonality.trim()]
      });
      setNewPersonality("");
    }
  };

  const removePersonality = (personality: string) => {
    onBrandVoiceChange({
      ...brandVoice,
      brand_personality: brandVoice.brand_personality.filter(p => p !== personality)
    });
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-white border-gray-200 hover:bg-gray-50"
        >
          <Users className="w-4 h-4 mr-2" />
          Brand Voice
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96 p-4 bg-white border shadow-lg">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Brand Voice Settings</h3>
            <p className="text-sm text-gray-600">Define your brand's communication style</p>
          </div>

          {/* Voice Style */}
          <div>
            <Label className="text-sm font-medium">Voice Style</Label>
            <Select 
              value={brandVoice.voice_style} 
              onValueChange={(value) => onBrandVoiceChange({...brandVoice, voice_style: value})}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select voice style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="conversational">Conversational</SelectItem>
                <SelectItem value="authoritative">Authoritative</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Target Audience */}
          <div>
            <Label className="text-sm font-medium">Target Audience</Label>
            <div className="flex space-x-2 mt-1">
              <Input
                value={newAudience}
                onChange={(e) => setNewAudience(e.target.value)}
                placeholder="e.g., CTOs, Marketing Directors"
                className="flex-1"
                onKeyPress={(e) => e.key === "Enter" && addAudience()}
              />
              <Button onClick={addAudience} size="sm">Add</Button>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {brandVoice.target_audience.map((audience, idx) => (
                <Badge 
                  key={idx} 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-red-100" 
                  onClick={() => removeAudience(audience)}
                >
                  {audience} ×
                </Badge>
              ))}
            </div>
          </div>

          {/* Brand Personality */}
          <div>
            <Label className="text-sm font-medium">Brand Personality</Label>
            <div className="flex space-x-2 mt-1">
              <Input
                value={newPersonality}
                onChange={(e) => setNewPersonality(e.target.value)}
                placeholder="e.g., innovative, trustworthy"
                className="flex-1"
                onKeyPress={(e) => e.key === "Enter" && addPersonality()}
              />
              <Button onClick={addPersonality} size="sm">Add</Button>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {brandVoice.brand_personality.map((personality, idx) => (
                <Badge 
                  key={idx} 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-red-100" 
                  onClick={() => removePersonality(personality)}
                >
                  {personality} ×
                </Badge>
              ))}
            </div>
          </div>

          {/* Content Style Notes */}
          <div>
            <Label className="text-sm font-medium">Content Style Notes</Label>
            <Input
              value={brandVoice.content_style_notes}
              onChange={(e) => onBrandVoiceChange({...brandVoice, content_style_notes: e.target.value})}
              placeholder="Additional style guidelines"
              className="mt-1"
            />
          </div>

          <Button 
            className="w-full" 
            onClick={() => setIsOpen(false)}
          >
            Apply Brand Voice
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BrandVoiceDropdown;
