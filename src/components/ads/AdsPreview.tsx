import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal,
  ThumbsUp,
  Play,
  User,
  Globe,
  Calendar,
  RotateCcw,
  Edit,
  Wand2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdsContent {
  headline: string;
  description: string;
  cta: string;
  adsSource: string;
}

interface AdsPreviewProps {
  content: AdsContent;
  onContentChange: (content: AdsContent) => void;
  isGenerating?: boolean;
}

const AdsPreview = ({ content, onContentChange, isGenerating = false }: AdsPreviewProps) => {
  const [editingField, setEditingField] = useState<string | null>(null);

  const handleEdit = (field: string, value: string) => {
    onContentChange({
      ...content,
      [field]: value
    });
  };

  const handleRegenerate = (field: keyof AdsContent) => {
    const sampleContent = {
      headline: [
        "Transform Your Business Today!",
        "Unlock Your Potential Now",
        "Revolutionary Solution Awaits"
      ],
      description: [
        "Discover innovative solutions that drive results for your business.",
        "Join thousands of satisfied customers who achieved success.",
        "Experience the difference with our cutting-edge technology."
      ],
      cta: [
        "Get Started Now",
        "Learn More Today",
        "Start Your Journey",
        "Try It Free"
      ]
    };
    
    const options = sampleContent[field];
    const randomContent = options[Math.floor(Math.random() * options.length)];
    handleEdit(field, randomContent);
  };

  const renderEditableField = (
    field: keyof AdsContent,
    value: string,
    placeholder: string,
    className: string = "",
    multiline: boolean = false
  ) => {
    const isEditing = editingField === field;
    
    if (isEditing) {
      if (multiline) {
        return (
          <textarea
            value={value}
            onChange={(e) => handleEdit(field, e.target.value)}
            onBlur={() => setEditingField(null)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                setEditingField(null);
              }
            }}
            placeholder={placeholder}
            className={`w-full bg-transparent border-none outline-none resize-none font-sans ${className}`}
            autoFocus
            rows={3}
          />
        );
      }
      
      return (
        <input
          type="text"
          value={value}
          onChange={(e) => handleEdit(field, e.target.value)}
          onBlur={() => setEditingField(null)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setEditingField(null);
            }
          }}
          placeholder={placeholder}
          className={`w-full bg-transparent border-none outline-none font-sans ${className}`}
          autoFocus
        />
      );
    }

    return (
      <div className="group relative">
        <div
          onClick={() => setEditingField(field)}
          className={`cursor-text hover:bg-muted/50 hover:bg-opacity-50 p-1 rounded font-sans ${className} ${
            isGenerating ? 'animate-pulse bg-muted/30' : ''
          }`}
        >
          {value || placeholder}
        </div>
        
        {value && !isGenerating && (
          <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Wand2 className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleRegenerate(field)}>
                  <RotateCcw className="w-3 h-3 mr-2" />
                  Regenerate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setEditingField(field)}>
                  <Edit className="w-3 h-3 mr-2" />
                  Edit manually
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    );
  };

  const renderFacebookAd = () => (
    <Card className="max-w-md mx-auto bg-white shadow-lg border">
      {/* Ad Header */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">YB</span>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-sm text-gray-900">Your Business</div>
            <div className="text-xs text-gray-500 flex items-center">
              Sponsored • <span className="ml-1">🌍</span>
            </div>
          </div>
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Ad Content */}
      <div className="p-3">
        {renderEditableField(
          'headline',
          content.headline,
          'Enter your ad headline...',
          'font-semibold text-gray-900 mb-2 text-sm',
          false
        )}
        
        {renderEditableField(
          'description',
          content.description,
          'Enter your ad description...',
          'text-gray-700 text-sm leading-relaxed',
          true
        )}
      </div>

      {/* Ad Image Placeholder */}
      <div className="bg-gradient-to-r from-primary/80 to-primary h-40 flex items-center justify-center">
        <Play className="w-12 h-12 text-primary-foreground opacity-80" />
      </div>

      {/* Call to Action */}
      <div className="p-3">
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          {renderEditableField(
            'cta',
            content.cta,
            'Enter call to action...',
            'font-medium text-center',
            false
          )}
        </Button>
      </div>

      {/* Engagement Section */}
      <div className="p-3 border-t border-border">
        <div className="flex items-center justify-between text-gray-600">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-sm hover:text-primary">
              <ThumbsUp className="w-4 h-4" />
              <span>Like</span>
            </button>
            <button className="flex items-center space-x-1 text-sm hover:text-primary">
              <MessageCircle className="w-4 h-4" />
              <span>Comment</span>
            </button>
            <button className="flex items-center space-x-1 text-sm hover:text-primary">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </Card>
  );

  const renderGoogleAd = () => (
    <Card className="max-w-md mx-auto bg-white border border-border">
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="text-xs text-green-700 font-medium">Ad</div>
          <div className="text-xs text-muted-foreground">www.yourbusiness.com</div>
        </div>
        
        {renderEditableField(
          'headline',
          content.headline,
          'Enter your ad headline...',
          'text-primary text-lg font-medium hover:underline cursor-pointer mb-1',
          false
        )}
        
        {renderEditableField(
          'description',
          content.description,
          'Enter your ad description...',
          'text-gray-700 text-sm leading-relaxed',
          true
        )}
      </div>
    </Card>
  );

  const renderInstagramAd = () => (
    <Card className="max-w-md mx-auto bg-white shadow-lg border">
      {/* Instagram Header */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs">YB</span>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-sm text-gray-900">yourbusiness</div>
            <div className="text-xs text-muted-foreground">Sponsored</div>
          </div>
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Instagram Image */}
      <div className="bg-gradient-to-br from-pink-400 to-purple-600 h-64 flex items-center justify-center">
        <Play className="w-16 h-16 text-white opacity-80" />
      </div>

      {/* Instagram Actions */}
      <div className="p-3">
        <div className="flex items-center space-x-4 mb-3">
          <Heart className="w-6 h-6 text-gray-800" />
          <MessageCircle className="w-6 h-6 text-gray-800" />
          <Share2 className="w-6 h-6 text-gray-800" />
        </div>

        <div className="space-y-1">
          {renderEditableField(
            'headline',
            content.headline,
            'Enter your ad headline...',
            'font-semibold text-gray-900 text-sm',
            false
          )}
          
          {renderEditableField(
            'description',
            content.description,
            'Enter your ad description...',
            'text-gray-700 text-sm',
            true
          )}
        </div>

        <Button className="w-full mt-3 bg-primary hover:bg-primary/90 text-primary-foreground">
          {renderEditableField(
            'cta',
            content.cta,
            'Enter call to action...',
            'font-medium text-center',
            false
          )}
        </Button>
      </div>
    </Card>
  );

  const renderLinkedInAd = () => (
    <Card className="max-w-md mx-auto bg-white shadow-lg border">
      {/* LinkedIn Header */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">YB</span>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-sm text-gray-900">Your Business</div>
            <div className="text-xs text-gray-500">Promoted</div>
          </div>
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* LinkedIn Content */}
      <div className="p-3">
        {renderEditableField(
          'headline',
          content.headline,
          'Enter your ad headline...',
          'font-semibold text-gray-900 mb-2 text-sm',
          false
        )}
        
        {renderEditableField(
          'description',
          content.description,
          'Enter your ad description...',
          'text-gray-700 text-sm leading-relaxed',
          true
        )}
      </div>

      {/* LinkedIn Image */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-40 flex items-center justify-center">
        <Play className="w-12 h-12 text-white opacity-80" />
      </div>

      {/* LinkedIn CTA */}
      <div className="p-3">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          {renderEditableField(
            'cta',
            content.cta,
            'Enter call to action...',
            'font-medium text-center',
            false
          )}
        </Button>
      </div>
    </Card>
  );

  const renderTwitterAd = () => (
    <Card className="max-w-md mx-auto bg-white shadow-lg border">
      {/* Twitter Header */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">YB</span>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-sm text-gray-900">Your Business</div>
            <div className="text-xs text-gray-500">@yourbusiness • Promoted</div>
          </div>
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Twitter Content */}
      <div className="p-3">
        {renderEditableField(
          'headline',
          content.headline,
          'Enter your ad headline...',
          'font-semibold text-gray-900 mb-2 text-sm',
          false
        )}
        
        {renderEditableField(
          'description',
          content.description,
          'Enter your ad description...',
          'text-gray-700 text-sm leading-relaxed',
          true
        )}
      </div>

      {/* Twitter Media */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-500 h-40 flex items-center justify-center">
        <Play className="w-12 h-12 text-white opacity-80" />
      </div>

      {/* Twitter CTA */}
      <div className="p-3">
        <Button className="w-full bg-black hover:bg-gray-800 text-white">
          {renderEditableField(
            'cta',
            content.cta,
            'Enter call to action...',
            'font-medium text-center',
            false
          )}
        </Button>
      </div>
    </Card>
  );

  const renderYouTubeAd = () => (
    <Card className="max-w-md mx-auto bg-white shadow-lg border">
      {/* YouTube Video Player */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 h-48 flex items-center justify-center relative">
        <Play className="w-16 h-16 text-white opacity-80" />
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          Ad • 0:15
        </div>
      </div>

      {/* YouTube Ad Content */}
      <div className="p-3">
        {renderEditableField(
          'headline',
          content.headline,
          'Enter your ad headline...',
          'font-semibold text-gray-900 mb-2 text-sm',
          false
        )}
        
        {renderEditableField(
          'description',
          content.description,
          'Enter your ad description...',
          'text-gray-700 text-sm leading-relaxed',
          true
        )}

        <Button className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white">
          {renderEditableField(
            'cta',
            content.cta,
            'Enter call to action...',
            'font-medium text-center',
            false
          )}
        </Button>
      </div>
    </Card>
  );

  const renderPreview = () => {
    switch (content.adsSource) {
      case 'Google':
        return renderGoogleAd();
      case 'Instagram':
        return renderInstagramAd();
      case 'LinkedIn':
        return renderLinkedInAd();
      case 'Twitter':
        return renderTwitterAd();
      case 'YouTube':
        return renderYouTubeAd();
      case 'Facebook':
      default:
        return renderFacebookAd();
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <Badge variant="outline" className="mb-4">
          {content.adsSource} Ad Preview
        </Badge>
      </div>
      
      {renderPreview()}
    </div>
  );
};

export default AdsPreview;
