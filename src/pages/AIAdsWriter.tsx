
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { 
  Send, 
  Sparkles, 
  Copy, 
  Download, 
  Share2, 
  RotateCcw,
  Loader2,
  Settings,
  ChevronDown,
  MessageSquare,
  Target,
  Hash
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AdsPreview from "@/components/ads/AdsPreview";

interface ChatMessage {
  id: number;
  type: "ai" | "user" | "thinking";
  content: string;
  timestamp: string;
  status?: "researching" | "thinking" | "generating";
}

const AIAdsWriter = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: "ai",
      content: "Hi! I'm your AI Ads Writer. Tell me about your product/service, target audience, and unique selling propositions (USPs) to create compelling advertisements that convert. I can help you create ads for Facebook, Instagram, Google, LinkedIn, Twitter, and YouTube.",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Tone of Voice settings
  const [voiceStyle, setVoiceStyle] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [brandPersonality, setBrandPersonality] = useState("");
  const [isVoiceDialogOpen, setIsVoiceDialogOpen] = useState(false);
  
  // Keywords settings
  const [primaryKeywords, setPrimaryKeywords] = useState("");
  const [secondaryKeywords, setSecondaryKeywords] = useState("");
  const [keywordDensity, setKeywordDensity] = useState("");
  const [isKeywordsDialogOpen, setIsKeywordsDialogOpen] = useState(false);
  
  // Campaign Goal settings
  const [goalType, setGoalType] = useState("");
  const [targetMetrics, setTargetMetrics] = useState("");
  const [callToAction, setCallToAction] = useState("");
  const [isCampaignDialogOpen, setIsCampaignDialogOpen] = useState(false);
  
  const [adsContent, setAdsContent] = useState({
    headline: "",
    description: "",
    cta: "",
    adsSource: "Facebook"
  });

  const sampleAds = [
    "Create a compelling Facebook ad for my fitness app targeting busy professionals",
    "Generate Instagram ads for my handmade jewelry business",
    "Write Google Ads copy for my local restaurant delivery service",
    "Create LinkedIn ads for my B2B software solution"
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: chatMessages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsGenerating(true);

    // Add thinking message
    const thinkingMessage: ChatMessage = {
      id: chatMessages.length + 2,
      type: "thinking",
      content: "Analyzing your request and understanding your requirements...",
      timestamp: new Date().toLocaleTimeString(),
      status: "thinking"
    };
    setChatMessages(prev => [...prev, thinkingMessage]);

    // Simulate research phase
    setTimeout(() => {
      setChatMessages(prev => prev.map(msg => 
        msg.id === thinkingMessage.id 
          ? { ...msg, content: "Researching industry best practices and competitor analysis...", status: "researching" }
          : msg
      ));
    }, 1000);

    // Simulate generation phase
    setTimeout(() => {
      setChatMessages(prev => prev.map(msg => 
        msg.id === thinkingMessage.id 
          ? { ...msg, content: "Generating compelling ad copy tailored to your audience...", status: "generating" }
          : msg
      ));
    }, 2500);

    // Complete generation
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: chatMessages.length + 3,
        type: "ai",
        content: "I've generated an ad based on your input. You can see the preview on the right and edit any section directly. Click on any text to modify it, or use the regenerate button for new variations.",
        timestamp: new Date().toLocaleTimeString()
      };

      // Generate sample ad content
      const sampleAdsContent = {
        headline: "Transform Your Business Today!",
        description: "Discover the power of our innovative solution that helps thousands of businesses grow faster and more efficiently than ever before.",
        cta: "Get Started Now",
        adsSource: adsContent.adsSource
      };

      setChatMessages(prev => [...prev.filter(msg => msg.id !== thinkingMessage.id), aiResponse]);
      setAdsContent(sampleAdsContent);
      setIsGenerating(false);
    }, 4000);
  };

  const handleSampleAdClick = (sample: string) => {
    setInputMessage(sample);
  };

  const handleRegenerateAd = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setAdsContent(prev => ({
        ...prev,
        headline: "Unlock Your Potential with Our Revolutionary Solution!",
        description: "Join thousands of satisfied customers who have transformed their business with our cutting-edge technology and expert support.",
        cta: "Start Your Journey"
      }));
      setIsGenerating(false);
    }, 1500);
  };

  const renderThinkingMessage = (message: ChatMessage) => (
    <div className="flex justify-start">
      <div className="bg-card border border-border text-foreground max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
          <p className="text-sm">{message.content}</p>
        </div>
        <p className="text-xs mt-1 text-muted-foreground">{message.timestamp}</p>
      </div>
    </div>
  );

  const handleVoiceSave = () => {
    setIsVoiceDialogOpen(false);
  };

  const handleKeywordsSave = () => {
    setIsKeywordsDialogOpen(false);
  };

  const handleCampaignSave = () => {
    setIsCampaignDialogOpen(false);
  };

  return (
    <div className="h-screen bg-background flex flex-col font-sans">
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Section */}
        <div className="w-1/2 flex flex-col border-r border-border">
          {/* Chat Header */}
          <div className="p-4 border-b border-border bg-card">
            <h2 className="font-semibold text-foreground flex items-center font-dm-sans">
              <Sparkles className="w-5 h-5 mr-2 text-primary" />
              AI Assistant
            </h2>
            <p className="text-sm text-muted-foreground">Describe your product/service to get started</p>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {chatMessages.map((message) => (
              <div key={message.id}>
                {message.type === "thinking" ? (
                  renderThinkingMessage(message)
                ) : (
                  <div className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-card border border-border text-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.type === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Preference Settings */}
          <div className="p-4 border-t border-border bg-muted/30">
            <div className="grid grid-cols-3 gap-2">
              {/* Tone of Voice Dialog */}
              <Dialog open={isVoiceDialogOpen} onOpenChange={setIsVoiceDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center space-x-1">
                    <MessageSquare className="w-3 h-3" />
                    <span className="text-xs">Tone of Voice</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Tone of Voice Settings</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="voiceStyle" className="text-sm font-medium">
                        Voice Style
                      </Label>
                      <Input
                        id="voiceStyle"
                        value={voiceStyle}
                        onChange={(e) => setVoiceStyle(e.target.value)}
                        placeholder="Professional, Casual, Friendly..."
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="targetAudience" className="text-sm font-medium">
                        Target Audience
                      </Label>
                      <Input
                        id="targetAudience"
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                        placeholder="Business professionals, Students..."
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="brandPersonality" className="text-sm font-medium">
                        Brand Personality
                      </Label>
                      <Input
                        id="brandPersonality"
                        value={brandPersonality}
                        onChange={(e) => setBrandPersonality(e.target.value)}
                        placeholder="Innovative, Trustworthy, Bold..."
                        className="mt-1"
                      />
                    </div>
                    <Button onClick={handleVoiceSave} className="w-full">
                      Save Settings
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Keywords Dialog */}
              <Dialog open={isKeywordsDialogOpen} onOpenChange={setIsKeywordsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center space-x-1">
                    <Hash className="w-3 h-3" />
                    <span className="text-xs">Keywords</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Keywords Settings</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="primaryKeywords" className="text-sm font-medium">
                        Primary Keywords
                      </Label>
                      <Input
                        id="primaryKeywords"
                        value={primaryKeywords}
                        onChange={(e) => setPrimaryKeywords(e.target.value)}
                        placeholder="Main keywords for your ad..."
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="secondaryKeywords" className="text-sm font-medium">
                        Secondary Keywords
                      </Label>
                      <Input
                        id="secondaryKeywords"
                        value={secondaryKeywords}
                        onChange={(e) => setSecondaryKeywords(e.target.value)}
                        placeholder="Supporting keywords..."
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="keywordDensity" className="text-sm font-medium">
                        Keyword Focus
                      </Label>
                      <Input
                        id="keywordDensity"
                        value={keywordDensity}
                        onChange={(e) => setKeywordDensity(e.target.value)}
                        placeholder="High, Medium, Low..."
                        className="mt-1"
                      />
                    </div>
                    <Button onClick={handleKeywordsSave} className="w-full">
                      Save Settings
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Campaign Goal Dialog */}
              <Dialog open={isCampaignDialogOpen} onOpenChange={setIsCampaignDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center space-x-1">
                    <Target className="w-3 h-3" />
                    <span className="text-xs">Campaign Goal</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Campaign Goal Settings</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="goalType" className="text-sm font-medium">
                        Goal Type
                      </Label>
                      <Input
                        id="goalType"
                        value={goalType}
                        onChange={(e) => setGoalType(e.target.value)}
                        placeholder="Brand Awareness, Lead Generation..."
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="targetMetrics" className="text-sm font-medium">
                        Target Metrics
                      </Label>
                      <Input
                        id="targetMetrics"
                        value={targetMetrics}
                        onChange={(e) => setTargetMetrics(e.target.value)}
                        placeholder="Click-through rate, Conversions..."
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="callToAction" className="text-sm font-medium">
                        Call to Action Style
                      </Label>
                      <Input
                        id="callToAction"
                        value={callToAction}
                        onChange={(e) => setCallToAction(e.target.value)}
                        placeholder="Urgent, Informative, Persuasive..."
                        className="mt-1"
                      />
                    </div>
                    <Button onClick={handleCampaignSave} className="w-full">
                      Save Settings
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Sample Ads */}
          {chatMessages.length === 1 && (
            <div className="p-4 border-t border-border bg-background">
              <p className="text-sm text-muted-foreground mb-3">Or try one of these examples:</p>
              <div className="space-y-2">
                {sampleAds.map((sample, index) => (
                  <button
                    key={index}
                    onClick={() => handleSampleAdClick(sample)}
                    className="w-full text-left p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors text-sm"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Input */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Describe your product, target audience, or specific requirements..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isGenerating}
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="w-1/2 flex flex-col">
          {/* Preview Header */}
          <div className="p-4 border-b border-border bg-card">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-foreground font-dm-sans">Ad Preview</h2>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRegenerateAd}
                  disabled={isGenerating}
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Regenerate
                </Button>
                <Button variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>
          </div>

          {/* Content Form */}
          <div className="p-4 border-b border-border bg-muted/30">
            <div>
              <Label className="text-sm font-medium text-muted-foreground mb-1">
                Ads Source/Posting
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {adsContent.adsSource}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  <DropdownMenuItem onClick={() => setAdsContent(prev => ({ ...prev, adsSource: "Facebook" }))}>
                    Facebook
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setAdsContent(prev => ({ ...prev, adsSource: "Instagram" }))}>
                    Instagram
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setAdsContent(prev => ({ ...prev, adsSource: "Google" }))}>
                    Google Ads
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setAdsContent(prev => ({ ...prev, adsSource: "LinkedIn" }))}>
                    LinkedIn
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setAdsContent(prev => ({ ...prev, adsSource: "Twitter" }))}>
                    Twitter
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setAdsContent(prev => ({ ...prev, adsSource: "YouTube" }))}>
                    YouTube
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Ad Preview */}
          <div className="flex-1 overflow-auto p-4 bg-background">
            <AdsPreview
              content={adsContent}
              onContentChange={setAdsContent}
              isGenerating={isGenerating}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAdsWriter;
