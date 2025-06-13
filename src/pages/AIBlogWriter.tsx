
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
  style: string;
  audience: string;
  personality: string;
}

interface Keywords {
  list: string[];
}

const AIBlogWriter = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [brandVoice, setBrandVoice] = useState<BrandVoice>({ style: "", audience: "", personality: "" });
  const [keywords, setKeywords] = useState<Keywords>({ list: [] });
  const [newKeyword, setNewKeyword] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [expandedInsights, setExpandedInsights] = useState<{[key: string]: boolean}>({});
  const chatEndRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const suggestedBlogs = [
    "10 Tips for Better SEO in 2024",
    "The Future of Remote Work",
    "Sustainable Living Guide",
    "AI and Business Transformation"
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const toggleInsights = (messageId: string) => {
    setExpandedInsights(prev => ({
      ...prev,
      [messageId]: !prev[messageId]
    }));
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

    // Show thinking phase
    const thinkingMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: "thinking",
      content: "Analyzing your request...",
      timestamp: new Date(),
      isThinking: true,
      researchPhase: "Thinking"
    };

    setChatMessages(prev => [...prev, thinkingMessage]);

    // Simulate research phase
    setTimeout(() => {
      setChatMessages(prev => prev.map(msg => 
        msg.id === thinkingMessage.id 
          ? { ...msg, content: "Researching latest trends and best practices...", researchPhase: "Researching" }
          : msg
      ));
    }, 1000);

    // Show sources phase
    setTimeout(() => {
      setChatMessages(prev => prev.map(msg => 
        msg.id === thinkingMessage.id 
          ? { 
              ...msg, 
              content: "Consulting industry reports and analyzing data...", 
              researchPhase: "Sources",
              sources: ["Industry Reports", "SEO Best Practices", "Content Marketing Trends"]
            }
          : msg
      ));
    }, 2000);

    // Generate actual content with insights
    setTimeout(() => {
      setChatMessages(prev => prev.filter(msg => msg.id !== thinkingMessage.id));
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        type: "ai",
        content: generateSampleBlogContent(actualPrompt),
        timestamp: new Date(),
        insights: {
          thinking: "Analyzed user request for blog content and identified key themes",
          researching: ["SEO best practices", "Content structure optimization", "Target audience engagement"],
          sources: ["Industry Reports 2024", "SEO Research Database", "Content Marketing Trends"]
        }
      };
      setChatMessages(prev => [...prev, aiMessage]);
      setIsGenerating(false);
    }, 3500);
  };

  const generateSampleBlogContent = (userPrompt: string): string => {
    const voiceStyle = brandVoice.style ? ` in a ${brandVoice.style.toLowerCase()} tone` : "";
    const keywordText = keywords.list.length > 0 ? `\n\n*Keywords integrated: ${keywords.list.join(', ')}*` : "";
    
    return `# ${userPrompt.includes("SEO") ? "Ultimate Guide to SEO" : "Blog Post Title"}

## Introduction

This is a sample AI-generated blog post introduction that addresses your topic${voiceStyle}. The content is structured to be engaging and informative for your target audience${brandVoice.audience ? ` (${brandVoice.audience})` : ""}.

## Main Content

Here's the main body of your blog post with relevant information:

- Key point 1: Important insight about your topic
- Key point 2: Actionable advice for readers  
- Key point 3: Best practices and recommendations

## Conclusion

This concluding section wraps up the main points and provides a clear call-to-action for your readers.

*Note: This is AI-generated content that can be edited and customized in the editor.*${keywordText}`;
  };

  const handleAddToEditor = (content: string) => {
    const newContent = editorContent ? `${editorContent}\n\n${content}` : content;
    setEditorContent(newContent);
    
    if (editorRef.current) {
      editorRef.current.focus();
      editorRef.current.scrollTop = editorRef.current.scrollHeight;
    }
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

  const addKeyword = () => {
    if (newKeyword.trim() && !keywords.list.includes(newKeyword.trim())) {
      setKeywords(prev => ({ list: [...prev.list, newKeyword.trim()] }));
      setNewKeyword("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(prev => ({ list: prev.list.filter(k => k !== keyword) }));
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
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-4"
              onClick={() => setIsNavCollapsed(!isNavCollapsed)}
            >
              <Menu className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-dm-sans">AI Blog Writer</h1>
              <p className="text-gray-600 mt-1">Create engaging blog content with AI assistance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="flex h-[calc(100vh-120px)]">
        {/* Left Side - AI Chat Experience */}
        <div className="w-1/2 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">AI Assistant</h2>
            <p className="text-gray-600 text-sm">Ask the AI to generate blog content, headlines, or sections</p>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {isFirstTime && chatMessages.length === 0 && (
              <div className="space-y-6">
                <div className="text-center text-gray-500">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="font-medium">Start creating amazing content</p>
                  <p className="text-sm mt-1">Choose a suggested topic or ask the AI anything</p>
                </div>

                {/* Suggested Blogs Grid */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Suggested Blog Topics</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {suggestedBlogs.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="p-3 h-auto text-left text-sm"
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
                {/* AI Insights Section - Above AI Message */}
                {message.type === "ai" && message.insights && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-900">AI Process Insights</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleInsights(message.id)}
                        className="p-0 h-auto text-blue-700 hover:text-blue-900"
                      >
                        {expandedInsights[message.id] ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    
                    {expandedInsights[message.id] && (
                      <div className="space-y-2 text-sm text-blue-800">
                        <div>
                          <strong>Thinking:</strong> {message.insights.thinking}
                        </div>
                        <div>
                          <strong>Research Areas:</strong>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {message.insights.researching.map((item, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <strong>Sources Consulted:</strong>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {message.insights.sources.map((source, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {source}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Message Content */}
                <div className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] ${
                    message.type === "user" 
                      ? "bg-primary text-white" 
                      : message.type === "thinking"
                      ? "bg-blue-50 text-blue-900 border border-blue-200"
                      : "bg-gray-100 text-gray-900"
                  } rounded-lg p-4`}>
                    {message.type === "thinking" ? (
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-sm font-medium">{message.researchPhase}</span>
                        </div>
                        <p className="text-sm">{message.content}</p>
                        {message.sources && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {message.sources.map((source, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {source}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : message.type === "ai" ? (
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

          {/* Pre-Chat Options */}
          {!isGenerating && (
            <div className="p-6 border-t border-gray-100 space-y-4">
              <div className="flex space-x-2">
                {/* Brand Voice Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Target className="w-4 h-4 mr-2" />
                      Brand Voice
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Set Your Brand Voice</DialogTitle>
                      <p className="text-sm text-gray-600">Let AI generate content that sounds exactly like your brand.</p>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="voice-style">Choose Your Voice Style</Label>
                        <Select value={brandVoice.style} onValueChange={(value) => setBrandVoice(prev => ({ ...prev, style: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="formal">Formal</SelectItem>
                            <SelectItem value="casual">Casual</SelectItem>
                            <SelectItem value="informative">Informative</SelectItem>
                            <SelectItem value="witty">Witty</SelectItem>
                            <SelectItem value="empathetic">Empathetic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="audience">Who's Your Audience</Label>
                        <Input
                          id="audience"
                          value={brandVoice.audience}
                          onChange={(e) => setBrandVoice(prev => ({ ...prev, audience: e.target.value }))}
                          placeholder="e.g., Young professionals, Small business owners"
                        />
                      </div>
                      <div>
                        <Label htmlFor="personality">Brand Personality</Label>
                        <Input
                          id="personality"
                          value={brandVoice.personality}
                          onChange={(e) => setBrandVoice(prev => ({ ...prev, personality: e.target.value }))}
                          placeholder="e.g., Innovative, Friendly, Authoritative"
                        />
                      </div>
                      <Button className="w-full">Save & Apply Voice</Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Keywords Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Hash className="w-4 h-4 mr-2" />
                      Keywords
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Set Your Keywords</DialogTitle>
                      <p className="text-sm text-gray-600">Help AI include the right keywords to boost your content's relevance and SEO.</p>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex space-x-2">
                        <Input
                          value={newKeyword}
                          onChange={(e) => setNewKeyword(e.target.value)}
                          placeholder="Enter keyword"
                          onKeyPress={(e) => e.key === "Enter" && addKeyword()}
                        />
                        <Button onClick={addKeyword} size="sm">Add</Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {keywords.list.map((keyword, idx) => (
                          <Badge key={idx} variant="secondary" className="cursor-pointer" onClick={() => removeKeyword(keyword)}>
                            {keyword} ×
                          </Badge>
                        ))}
                      </div>
                      <Button className="w-full">Save Keywords</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Chat Input */}
              <div className="flex space-x-3">
                <Input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask AI to generate blog content..."
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
        <div className="w-1/2 bg-white flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Blog Editor</h2>
                <p className="text-gray-600 text-sm">Edit and format your AI-generated content</p>
              </div>
              <div className="flex space-x-2">
                <Button className="bg-primary hover:bg-primary/90" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Publish
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
                <Button variant="ghost" size="sm">
                  <Save className="w-4 h-4 mr-2" />
                  Draft
                </Button>
              </div>
            </div>
          </div>

          {/* Rich Text Toolbar */}
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm">
                <Bold className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Italic className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Underline className="w-4 h-4" />
              </Button>
              <div className="w-px h-6 bg-gray-300 mx-2" />
              <Button variant="ghost" size="sm">
                <AlignLeft className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <AlignCenter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <AlignRight className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <AlignJustify className="w-4 h-4" />
              </Button>
              <div className="w-px h-6 bg-gray-300 mx-2" />
              <Button variant="ghost" size="sm">
                <List className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <ListOrdered className="w-4 h-4" />
              </Button>
              <div className="w-px h-6 bg-gray-300 mx-2" />
              <Button variant="ghost" size="sm">
                <Image className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Editor Content */}
          <div className="flex-1 p-6">
            <Textarea
              ref={editorRef}
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
              placeholder="Your blog content will appear here when you add it from the AI chat..."
              className="w-full h-full resize-none text-sm border-none shadow-none focus:ring-0"
              style={{ minHeight: "400px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIBlogWriter;
