
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
  Play
} from "lucide-react";

interface AdsContent {
  headline: string;
  description: string;
  cta: string;
  usp: string;
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
      <div
        onClick={() => setEditingField(field)}
        className={`cursor-text hover:bg-muted/50 hover:bg-opacity-50 p-1 rounded font-sans ${className} ${
          isGenerating ? 'animate-pulse bg-muted/30' : ''
        }`}
      >
        {value || placeholder}
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

        {content.usp && (
          <div className="mt-2">
            <Badge variant="secondary" className="text-xs">
              {content.usp}
            </Badge>
          </div>
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

        {content.usp && (
          <div className="mt-2 text-xs text-muted-foreground">
            ✓ {content.usp}
          </div>
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

  const renderPreview = () => {
    switch (content.adsSource) {
      case 'Google':
        return renderGoogleAd();
      case 'Instagram':
        return renderInstagramAd();
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

      {!content.headline && !content.description && (
        <div className="text-center text-muted-foreground py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="font-medium">No ad content yet</p>
          <p className="text-sm mt-1">Start chatting with AI to generate your first ad</p>
        </div>
      )}
    </div>
  );
};

export default AdsPreview;
