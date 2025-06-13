
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
  ChevronUp
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
  const [toneOfVoice, setToneOfVoice] = useState("");
  const [keywords, setKeywords] = useState("");
  const [campaignGoal, setCampaignGoal] = useState("");
  const [adsContent, setAdsContent] = useState({
    headline: "",
    description: "",
    cta: "",
    adsSource: "Facebook"
  });
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

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
      content: "Analyzing your request and gathering insights...",
      timestamp: new Date().toLocaleTimeString(),
      status: "thinking"
    };
    setChatMessages(prev => [...prev, thinkingMessage]);

    // Simulate research phase
    setTimeout(() => {
      setChatMessages(prev => prev.map(msg => 
        msg.id === thinkingMessage.id 
          ? { ...msg, content: "Researching best practices for your industry...", status: "researching" }
          : msg
      ));
    }, 1000);

    // Simulate generation phase
    setTimeout(() => {
      setChatMessages(prev => prev.map(msg => 
        msg.id === thinkingMessage.id 
          ? { ...msg, content: "Generating compelling ad copy...", status: "generating" }
          : msg
      ));
    }, 2000);

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
        adsSource: "Facebook"
      };

      setChatMessages(prev => [...prev.filter(msg => msg.id !== thinkingMessage.id), aiResponse]);
      setAdsContent(sampleAdsContent);
      setIsGenerating(false);
    }, 3500);
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

            {/* Sample Ads */}
            {chatMessages.length === 1 && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Or try one of these examples:</p>
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
            )}
          </div>

          {/* Ad Preferences Card */}
          <div className="p-4 border-t border-border bg-muted/30">
            <Collapsible open={isPreferencesOpen} onOpenChange={setIsPreferencesOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-2">
                  <div className="flex items-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span className="text-sm font-medium">Ad Preferences</span>
                  </div>
                  {isPreferencesOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-3 pt-3">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label htmlFor="tone" className="text-xs font-medium text-muted-foreground">
                      Tone of Voice
                    </Label>
                    <Input
                      id="tone"
                      value={toneOfVoice}
                      onChange={(e) => setToneOfVoice(e.target.value)}
                      placeholder="Professional, Casual..."
                      className="text-xs h-8"
                    />
                  </div>
                  <div>
                    <Label htmlFor="keywords" className="text-xs font-medium text-muted-foreground">
                      Keywords
                    </Label>
                    <Input
                      id="keywords"
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      placeholder="Key terms..."
                      className="text-xs h-8"
                    />
                  </div>
                  <div>
                    <Label htmlFor="goal" className="text-xs font-medium text-muted-foreground">
                      Campaign Goal
                    </Label>
                    <Input
                      id="goal"
                      value={campaignGoal}
                      onChange={(e) => setCampaignGoal(e.target.value)}
                      placeholder="Brand awareness..."
                      className="text-xs h-8"
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

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
              <select
                value={adsContent.adsSource}
                onChange={(e) => setAdsContent(prev => ({ ...prev, adsSource: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
                <option value="Google">Google Ads</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Twitter">Twitter</option>
                <option value="YouTube">YouTube</option>
              </select>
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
