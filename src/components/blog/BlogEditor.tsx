
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  RotateCcw, 
  Edit3, 
  Minimize2, 
  Save, 
  Upload, 
  Calendar,
  X,
  Loader2
} from "lucide-react";

interface BlogEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  onRegenerateSection: (sectionText: string, prompt?: string) => void;
  isRegenerating?: boolean;
}

interface SelectionMenu {
  show: boolean;
  x: number;
  y: number;
  selectedText: string;
  selectionStart: number;
  selectionEnd: number;
}

const BlogEditor = ({ 
  content, 
  onContentChange, 
  onRegenerateSection,
  isRegenerating = false 
}: BlogEditorProps) => {
  const [selectionMenu, setSelectionMenu] = useState<SelectionMenu>({
    show: false,
    x: 0,
    y: 0,
    selectedText: "",
    selectionStart: 0,
    selectionEnd: 0
  });
  const [customPrompt, setCustomPrompt] = useState("");
  const [showPromptInput, setShowPromptInput] = useState(false);
  const [regeneratingText, setRegeneratingText] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim() && editorRef.current?.contains(selection.anchorNode)) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const editorRect = editorRef.current.getBoundingClientRect();
        
        setSelectionMenu({
          show: true,
          x: rect.left - editorRect.left,
          y: rect.top - editorRect.top - 60,
          selectedText: selection.toString(),
          selectionStart: range.startOffset,
          selectionEnd: range.endOffset
        });
      } else {
        setSelectionMenu(prev => ({ ...prev, show: false }));
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  const generateRealTimeContent = (originalText: string, instruction: string) => {
    // Simulate real-time content generation with realistic variations
    const variations = {
      default: [
        `Enhanced version: ${originalText}`,
        `Improved content: ${originalText.replace(/\./g, ' with better clarity.')}`,
        `Refined text: ${originalText} This provides better engagement and readability.`
      ],
      shorter: [
        originalText.split(' ').slice(0, Math.ceil(originalText.split(' ').length * 0.6)).join(' ') + '.',
        originalText.split('.')[0] + '.',
        originalText.length > 50 ? originalText.substring(0, 50) + '...' : originalText
      ],
      custom: [
        `${instruction}: ${originalText}`,
        `Based on "${instruction}" - ${originalText}`,
        `${originalText} (Modified according to: ${instruction})`
      ]
    };

    if (instruction.toLowerCase().includes('short')) {
      return variations.shorter[Math.floor(Math.random() * variations.shorter.length)];
    } else if (instruction !== 'Regenerate this section') {
      return variations.custom[Math.floor(Math.random() * variations.custom.length)];
    } else {
      return variations.default[Math.floor(Math.random() * variations.default.length)];
    }
  };

  const handleRegenerate = async () => {
    setRegeneratingText(selectionMenu.selectedText);
    setSelectionMenu(prev => ({ ...prev, show: false }));
    
    // Simulate real-time regeneration
    setTimeout(() => {
      const newText = generateRealTimeContent(selectionMenu.selectedText, 'Regenerate this section');
      const newContent = content.replace(selectionMenu.selectedText, newText);
      onContentChange(newContent);
      setRegeneratingText("");
    }, 1500);
  };

  const handleRegenerateWithPrompt = async () => {
    if (customPrompt.trim()) {
      setRegeneratingText(selectionMenu.selectedText);
      setCustomPrompt("");
      setShowPromptInput(false);
      setSelectionMenu(prev => ({ ...prev, show: false }));
      
      // Simulate real-time regeneration with custom prompt
      setTimeout(() => {
        const newText = generateRealTimeContent(selectionMenu.selectedText, customPrompt);
        const newContent = content.replace(selectionMenu.selectedText, newText);
        onContentChange(newContent);
        setRegeneratingText("");
      }, 2000);
    }
  };

  const handleMakeShort = async () => {
    setRegeneratingText(selectionMenu.selectedText);
    setSelectionMenu(prev => ({ ...prev, show: false }));
    
    // Simulate real-time shortening
    setTimeout(() => {
      const newText = generateRealTimeContent(selectionMenu.selectedText, 'Make this shorter and more concise');
      const newContent = content.replace(selectionMenu.selectedText, newText);
      onContentChange(newContent);
      setRegeneratingText("");
    }, 1200);
  };

  const handlePromptInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handlePromptInputKeyPress = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      handleRegenerateWithPrompt();
    }
    if (e.key === "Escape") {
      setShowPromptInput(false);
      setCustomPrompt("");
    }
  };

  const handleContentEdit = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.textContent || "";
    onContentChange(newContent);
  };

  const renderContent = () => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      const isRegenerating = regeneratingText && line.includes(regeneratingText);
      
      if (line.startsWith('# ')) {
        return (
          <h1 
            key={index} 
            className={`text-3xl font-bold text-gray-900 mb-4 hover:bg-blue-50 p-2 rounded cursor-text ${isRegenerating ? 'bg-blue-100 animate-pulse' : ''}`}
            contentEditable
            suppressContentEditableWarning
            onBlur={handleContentEdit}
          >
            {line.replace('# ', '')}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        return (
          <h2 
            key={index} 
            className={`text-2xl font-semibold text-gray-900 mb-3 hover:bg-blue-50 p-2 rounded cursor-text ${isRegenerating ? 'bg-blue-100 animate-pulse' : ''}`}
            contentEditable
            suppressContentEditableWarning
            onBlur={handleContentEdit}
          >
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        return (
          <h3 
            key={index} 
            className={`text-xl font-medium text-gray-900 mb-2 hover:bg-blue-50 p-2 rounded cursor-text ${isRegenerating ? 'bg-blue-100 animate-pulse' : ''}`}
            contentEditable
            suppressContentEditableWarning
            onBlur={handleContentEdit}
          >
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('- ')) {
        return (
          <li 
            key={index} 
            className={`text-gray-700 mb-1 hover:bg-blue-50 p-1 rounded cursor-text ${isRegenerating ? 'bg-blue-100 animate-pulse' : ''}`}
            contentEditable
            suppressContentEditableWarning
            onBlur={handleContentEdit}
          >
            {line.replace('- ', '')}
          </li>
        );
      } else if (line.trim()) {
        return (
          <p 
            key={index} 
            className={`text-gray-700 mb-4 leading-relaxed hover:bg-blue-50 p-2 rounded cursor-text ${isRegenerating ? 'bg-blue-100 animate-pulse' : ''}`}
            contentEditable
            suppressContentEditableWarning
            onBlur={handleContentEdit}
          >
            {line}
          </p>
        );
      }
      return <br key={index} />;
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 bg-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Blog Editor</h2>
            <p className="text-gray-600 text-sm">Select text to edit or regenerate sections</p>
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

      {/* Editor Content */}
      <div className="flex-1 relative overflow-auto">
        <div 
          ref={editorRef}
          className="max-w-4xl mx-auto p-8 min-h-full"
          style={{ userSelect: 'text' }}
        >
          {content ? renderContent() : (
            <div className="text-center text-gray-400 py-20">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Edit3 className="w-8 h-8 text-gray-400" />
              </div>
              <p className="font-medium">No content yet</p>
              <p className="text-sm mt-1">Generate content from the AI chat to start editing</p>
            </div>
          )}
        </div>

        {/* Selection Menu */}
        {selectionMenu.show && !regeneratingText && (
          <Card 
            className="absolute z-50 p-2 bg-white shadow-lg border"
            style={{ 
              left: selectionMenu.x, 
              top: selectionMenu.y,
              transform: 'translateX(-50%)'
            }}
          >
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRegenerate}
                className="text-xs h-8"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Regenerate
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPromptInput(!showPromptInput)}
                className="text-xs h-8"
              >
                <Edit3 className="w-3 h-3 mr-1" />
                Custom
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMakeShort}
                className="text-xs h-8"
              >
                <Minimize2 className="w-3 h-3 mr-1" />
                Shorter
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectionMenu(prev => ({ ...prev, show: false }))}
                className="text-xs h-8 p-1"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
            
            {showPromptInput && (
              <div className="mt-2 border-t pt-2" onClick={handlePromptInputClick}>
                <div className="flex space-x-1">
                  <Input
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="Enter custom instruction..."
                    className="text-xs h-8"
                    onClick={handlePromptInputClick}
                    onKeyDown={handlePromptInputKeyPress}
                    autoFocus
                  />
                  <Button
                    onClick={handleRegenerateWithPrompt}
                    size="sm"
                    disabled={!customPrompt.trim()}
                    className="h-8 px-2 text-xs"
                  >
                    Apply
                  </Button>
                </div>
              </div>
            )}
          </Card>
        )}

        {/* Regenerating Overlay */}
        {regeneratingText && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-40">
            <div className="bg-white p-4 rounded-lg shadow-lg border flex items-center space-x-3">
              <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Regenerating content...</p>
                <p className="text-sm text-gray-600">AI is improving your selected text</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogEditor;
