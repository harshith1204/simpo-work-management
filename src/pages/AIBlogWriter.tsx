import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Send, 
  Plus, 
  Loader2, 
  Calendar, 
  Save, 
  Upload, 
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Indent,
  Outdent,
  Image,
  Video,
  Target,
  Hash,
  Menu,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SEOPreferencesDropdown from "@/components/blog/SEOPreferencesDropdown";
import BrandVoiceDropdown from "@/components/blog/BrandVoiceDropdown";
import ContentObjectiveDropdown from "@/components/blog/ContentObjectiveDropdown";
import LiveAgentStatus from "@/components/blog/LiveAgentStatus";
import BlogEditor from "@/components/blog/BlogEditor";

interface ChatMessage {
  id: string;
  type: "user" | "ai" | "thinking";
  content: string;
  timestamp: Date;
  isThinking?: boolean;
  researchPhase?: string;
  sources?: string[];
  insights?: {
    thinking: string;
    researching: string[];
    sources: string[];
  };
}

interface BrandVoice {
  voice_style: string;
  target_audience: string[];
  brand_personality: string[];
  content_style_notes: string;
}

interface SEOPreferences {
  target_keywords: string[];
  keyword_placements: any[];
  meta_title_preference: string;
  meta_description_preference: string;
  target_search_intent: "informational" | "commercial" | "navigational" | "transactional";
}

const AIBlogWriter = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  
  // New advanced settings state
  const [seoPreferences, setSeoPreferences] = useState<SEOPreferences>({
    target_keywords: [],
    keyword_placements: [],
    meta_title_preference: "",
    meta_description_preference: "",
    target_search_intent: "informational"
  });
  
  const [brandVoice, setBrandVoice] = useState<BrandVoice>({
    voice_style: "",
    target_audience: [],
    brand_personality: [],
    content_style_notes: ""
  });
  
  const [contentObjective, setContentObjective] = useState("educate");
  const [contentLength, setContentLength] = useState(1000);
  const [targetKeywords, setTargetKeywords] = useState<string[]>([]);
  const [keywordDensity, setKeywordDensity] = useState(2.5);
  const [currentAgentAction, setCurrentAgentAction] = useState<any>(null);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [expandedInsights, setExpandedInsights] = useState<{[key: string]: boolean}>({});
  const [isRegenerating, setIsRegenerating] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  const suggestedBlogs = [
    "AI in Digital Telecommunications: Complete Guide",
    "B2B Service Automation with AI",
    "Future of Business Communications",
    "Digital Transformation Strategies"
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const simulateAgentActions = async (userPrompt: string) => {
    const actions = [
      {
        phase: "thinking" as const,
        status: "Analyzing your request for AI in digital telecommunications...",
        progress: 25
      },
      {
        phase: "researching" as const,
        status: "Researching latest trends in AI telecommunications technology...",
        details: ["5G Integration", "Edge Computing", "IoT Applications", "Network Automation"],
        progress: 50
      },
      {
        phase: "analyzing" as const,
        status: "Analyzing market data and industry reports...",
        details: ["Market Research", "Competitor Analysis", "Technology Trends"],
        progress: 75
      },
      {
        phase: "sources" as const,
        status: "Consulting industry sources and expert insights...",
        details: ["IEEE Papers", "Industry Reports", "Expert Interviews", "Case Studies"],
        progress: 100
      }
    ];

    for (let i = 0; i < actions.length; i++) {
      setCurrentAgentAction(actions[i]);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    setCurrentAgentAction(null);
  };

  const handleSendPrompt = async (promptText?: string) => {
    const actualPrompt = promptText || prompt;
    if (!actualPrompt.trim() || isGenerating) return;

    setIsFirstTime(false);
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: actualPrompt,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setPrompt("");
    setIsGenerating(true);

    // Start agent simulation
    await simulateAgentActions(actualPrompt);

    // Generate actual content with insights
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        type: "ai",
        content: generateAdvancedBlogContent(actualPrompt),
        timestamp: new Date(),
        insights: {
          thinking: "Analyzed telecommunications industry trends and AI integration patterns",
          researching: ["5G Networks", "Edge Computing", "Network Automation", "IoT Integration", "Security Protocols"],
          sources: ["IEEE Telecommunications Standards", "Industry Market Reports 2024", "Expert Analysis", "Case Studies"]
        }
      };
      setChatMessages(prev => [...prev, aiMessage]);
      setIsGenerating(false);
    }, 1000);
  };

  const generateAdvancedBlogContent = (userPrompt: string): string => {
    const keywordText = targetKeywords.length > 0 ? 
      `\n\n*Target Keywords: ${targetKeywords.join(', ')}*` : "";
    
    const voiceText = brandVoice.voice_style ? 
      `\n*Voice: ${brandVoice.voice_style} tone for ${brandVoice.target_audience.join(', ')}*` : "";
    
    const lengthText = `\n*Target Length: ${contentLength} words*`;
    const densityText = `\n*Keyword Density: ${keywordDensity}%*`;
    
    return `# AI in Digital Telecommunications: Transforming Business Communications

## Executive Summary

Artificial Intelligence is revolutionizing digital telecommunications, creating unprecedented opportunities for businesses to enhance their communication infrastructure, improve operational efficiency, and deliver superior customer experiences.

## The Current Landscape

### 5G Integration and AI
- **Network Optimization**: AI algorithms optimize 5G network performance in real-time
- **Predictive Maintenance**: Machine learning predicts network failures before they occur
- **Resource Allocation**: Intelligent bandwidth distribution based on usage patterns

### Edge Computing Revolution
AI-powered edge computing brings processing closer to data sources, reducing latency and improving response times for critical business applications.

## Key Benefits for Businesses

### 1. Enhanced Network Performance
- Real-time traffic optimization
- Automated fault detection and resolution
- Dynamic resource scaling

### 2. Cost Reduction
- Predictive maintenance reduces downtime
- Automated operations lower operational costs
- Efficient resource utilization

### 3. Improved Customer Experience
- Faster response times
- Reduced service interruptions
- Personalized service delivery

## Implementation Strategies

### Phase 1: Assessment and Planning
1. **Current Infrastructure Audit**
2. **AI Readiness Evaluation**
3. **ROI Analysis and Business Case Development**

### Phase 2: Pilot Implementation
1. **Start with Non-Critical Systems**
2. **Implement Monitoring and Analytics**
3. **Gather Performance Metrics**

### Phase 3: Full Deployment
1. **Scale Successful Pilot Programs**
2. **Integrate with Existing Systems**
3. **Continuous Optimization**

## Future Outlook

The convergence of AI and telecommunications will continue to accelerate, with emerging technologies like:
- **Quantum Communications**
- **Advanced IoT Integration**
- **Autonomous Network Management**
- **Enhanced Security Protocols**

## Conclusion

AI in digital telecommunications represents a critical competitive advantage for modern businesses. Organizations that embrace these technologies early will be better positioned to meet evolving customer demands and operational challenges.

*This content has been optimized for ${contentObjective} objectives with ${brandVoice.voice_style || 'professional'} voice targeting ${brandVoice.target_audience.join(', ') || 'business professionals'}.*${keywordText}${voiceText}${lengthText}${densityText}`;
  };

  const handleAddToEditor = (content: string) => {
    const newContent = editorContent ? `${editorContent}\n\n${content}` : content;
    setEditorContent(newContent);
  };

  const handleRegenerateSection = async (sectionText: string, customPrompt?: string) => {
    // The BlogEditor now handles regeneration internally
    console.log("Regeneration handled by BlogEditor component");
  };

  const handleSuggestedBlog = (suggestion: string) => {
    handleSendPrompt(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendPrompt();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="outline" size="icon" className="mr-4" onClick={() => navigate('/ai-writer')}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-dm-sans">AI Blog Writer</h1>
              <p className="text-gray-600 mt-1">Create professional blog content with advanced AI assistance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Canvas View Only */}
      <div className="flex h-[calc(100vh-120px)]">
        {/* Left Side - AI Chat */}
        <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
          {/* Chat Header */}
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">AI Assistant</h2>
            <p className="text-gray-600 text-sm">Professional content generation with advanced settings</p>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Live Agent Status */}
            {(isGenerating || currentAgentAction) && (
              <LiveAgentStatus
                isActive={isGenerating}
                currentAction={currentAgentAction}
                messageId="current"
              />
            )}

            {isFirstTime && chatMessages.length === 0 && (
              <div className="space-y-6">
                <div className="text-center text-gray-500">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="font-medium">Start creating professional content</p>
                  <p className="text-sm mt-1">Configure your settings and ask the AI anything</p>
                </div>

                {/* Suggested Blogs Grid */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Suggested Topics</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {suggestedBlogs.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="p-3 h-auto text-left text-sm justify-start"
                        onClick={() => handleSuggestedBlog(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {chatMessages.map((message) => (
              <div key={message.id} className="space-y-2">
                {/* AI Insights Section */}
                {message.type === "ai" && message.insights && (
                  <LiveAgentStatus
                    isActive={false}
                    insights={message.insights}
                    messageId={message.id}
                  />
                )}

                {/* Message Content */}
                <div className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] ${
                    message.type === "user" 
                      ? "bg-primary text-white" 
                      : "bg-gray-100 text-gray-900"
                  } rounded-lg p-4`}>
                    {message.type === "ai" ? (
                      <div>
                        <pre className="whitespace-pre-wrap font-sans text-sm">{message.content}</pre>
                        <Button
                          onClick={() => handleAddToEditor(message.content)}
                          variant="outline"
                          size="sm"
                          className="mt-3 bg-white text-gray-900 hover:bg-gray-50"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add to Editor
                        </Button>
                      </div>
                    ) : (
                      <p className="text-sm">{message.content}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Enhanced Settings and Chat Input */}
          {!isGenerating && (
            <div className="p-6 border-t border-gray-100 space-y-4">
              {/* Advanced Settings Row */}
              <div className="flex flex-wrap gap-2">
                <SEOPreferencesDropdown 
                  preferences={seoPreferences}
                  onPreferencesChange={setSeoPreferences}
                />
                <BrandVoiceDropdown 
                  brandVoice={brandVoice}
                  onBrandVoiceChange={setBrandVoice}
                />
                <ContentObjectiveDropdown 
                  objective={contentObjective}
                  onObjectiveChange={setContentObjective}
                  contentLength={contentLength}
                  onContentLengthChange={setContentLength}
                  targetKeywords={targetKeywords}
                  onTargetKeywordsChange={setTargetKeywords}
                  keywordDensity={keywordDensity}
                  onKeywordDensityChange={setKeywordDensity}
                />
              </div>

              {/* Chat Input */}
              <div className="flex space-x-3">
                <Input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Describe the blog content you want to create..."
                  className="flex-1"
                  disabled={isGenerating}
                />
                <Button 
                  onClick={() => handleSendPrompt()} 
                  disabled={!prompt.trim() || isGenerating}
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Blog Editor */}
        <div className="w-2/3 bg-white flex flex-col">
          <BlogEditor
            content={editorContent}
            onContentChange={setEditorContent}
            onRegenerateSection={handleRegenerateSection}
          />
        </div>
      </div>
    </div>
  );
};

export default AIBlogWriter;
