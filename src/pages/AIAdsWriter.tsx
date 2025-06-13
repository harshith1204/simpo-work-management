
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Sparkles, 
  Copy, 
  Download, 
  Share2, 
  RotateCcw,
  Eye,
  Settings
} from "lucide-react";
import AdsPreview from "@/components/ads/AdsPreview";

const AIAdsWriter = () => {
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: "ai" as const,
      content: "Hi! I'm your AI Ads Writer. Tell me about your product/service and I'll help you create compelling advertisements.",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [adsContent, setAdsContent] = useState({
    headline: "",
    description: "",
    cta: "",
    usp: "",
    productService: "",
    adsSource: "Facebook"
  });

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: chatMessages.length + 1,
      type: "user" as const,
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsGenerating(true);

    // Simulate AI response and content generation
    setTimeout(() => {
      const aiResponse = {
        id: chatMessages.length + 2,
        type: "ai" as const,
        content: "I've generated an ad based on your input. You can see the preview on the right and edit any section directly.",
        timestamp: new Date().toLocaleTimeString()
      };

      // Generate sample ad content
      const sampleAdsContent = {
        headline: "Transform Your Business Today!",
        description: "Discover the power of our innovative solution that helps thousands of businesses grow faster and more efficiently than ever before.",
        cta: "Get Started Now",
        usp: "50% faster results, 100% satisfaction guaranteed",
        productService: inputMessage,
        adsSource: "Facebook"
      };

      setChatMessages(prev => [...prev, aiResponse]);
      setAdsContent(sampleAdsContent);
      setIsGenerating(false);
    }, 2000);
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

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 bg-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-dm-sans">AI Ads Writer</h1>
            <p className="text-gray-600 text-sm">Create compelling advertisements with AI assistance</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button className="bg-primary hover:bg-primary/90" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Chat Section */}
        <div className="w-1/2 flex flex-col border-r border-gray-200">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-100 bg-white">
            <h2 className="font-semibold text-gray-900 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
              AI Assistant
            </h2>
            <p className="text-sm text-gray-600">Describe your product/service to get started</p>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-gray-200 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.type === "user" ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
            {isGenerating && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <p className="text-sm">Generating your ad...</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-100 bg-white">
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
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="w-1/2 flex flex-col">
          {/* Preview Header */}
          <div className="p-4 border-b border-gray-100 bg-white">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-gray-900">Ad Preview</h2>
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
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  USP
                </label>
                <Input
                  value={adsContent.usp}
                  onChange={(e) => setAdsContent(prev => ({ ...prev, usp: e.target.value }))}
                  placeholder="Unique selling proposition"
                  className="text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product/Service
                </label>
                <Input
                  value={adsContent.productService}
                  onChange={(e) => setAdsContent(prev => ({ ...prev, productService: e.target.value }))}
                  placeholder="What you're promoting"
                  className="text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ads Source/Posting
                </label>
                <select
                  value={adsContent.adsSource}
                  onChange={(e) => setAdsContent(prev => ({ ...prev, adsSource: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          </div>

          {/* Ad Preview */}
          <div className="flex-1 overflow-auto p-4">
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
