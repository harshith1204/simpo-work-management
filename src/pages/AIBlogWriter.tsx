
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, Plus, Loader2, Calendar, Save, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChatMessage {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

const AIBlogWriter = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendPrompt = async () => {
    if (!prompt.trim() || isGenerating) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: prompt,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setPrompt("");
    setIsGenerating(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: generateSampleBlogContent(prompt),
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiMessage]);
      setIsGenerating(false);
    }, 2000);
  };

  const generateSampleBlogContent = (userPrompt: string): string => {
    // Sample AI-generated content based on prompt
    return `# ${userPrompt.includes("SEO") ? "Ultimate Guide to SEO" : "Blog Post Title"}

## Introduction

This is a sample AI-generated blog post introduction that addresses your topic. The content is structured to be engaging and informative.

## Main Content

Here's the main body of your blog post with relevant information:

- Key point 1: Important insight about your topic
- Key point 2: Actionable advice for readers
- Key point 3: Best practices and recommendations

## Conclusion

This concluding section wraps up the main points and provides a clear call-to-action for your readers.

*Note: This is AI-generated content that can be edited and customized in the editor.*`;
  };

  const handleAddToEditor = (content: string) => {
    const newContent = editorContent ? `${editorContent}\n\n${content}` : content;
    setEditorContent(newContent);
    
    // Focus the editor
    if (editorRef.current) {
      editorRef.current.focus();
      editorRef.current.scrollTop = editorRef.current.scrollHeight;
    }
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
        <div className="flex items-center">
          <Button variant="outline" size="icon" className="mr-4" onClick={() => navigate('/ai-writer')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-dm-sans">AI Blog Writer</h1>
            <p className="text-gray-600 mt-1">Create engaging blog content with AI assistance</p>
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
            {chatMessages.length === 0 && (
              <div className="text-center text-gray-500 mt-20">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-gray-400" />
                </div>
                <p>Start by asking the AI to generate blog content</p>
                <p className="text-sm mt-1">Try: "Write a blog post about sustainable living"</p>
              </div>
            )}

            {chatMessages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] ${message.type === "user" ? "bg-primary text-white" : "bg-gray-100 text-gray-900"} rounded-lg p-4`}>
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
            ))}

            {isGenerating && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-4 max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin text-gray-600" />
                    <span className="text-sm text-gray-600">AI is generating content...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-6 border-t border-gray-100">
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
                onClick={handleSendPrompt} 
                disabled={!prompt.trim() || isGenerating}
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side - Blog Editor */}
        <div className="w-1/2 bg-white flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Blog Editor</h2>
            <p className="text-gray-600 text-sm">Edit and format your AI-generated content</p>
          </div>

          {/* Editor Content */}
          <div className="flex-1 p-6">
            <Textarea
              ref={editorRef}
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
              placeholder="Your blog content will appear here when you add it from the AI chat..."
              className="w-full h-full resize-none text-sm"
              style={{ minHeight: "400px" }}
            />
          </div>

          {/* Action Buttons */}
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex space-x-3">
              <Button className="flex-1" size="lg">
                <Upload className="w-4 h-4 mr-2" />
                Publish
              </Button>
              <Button variant="outline" className="flex-1" size="lg">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule
              </Button>
              <Button variant="ghost" className="flex-1" size="lg">
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIBlogWriter;
