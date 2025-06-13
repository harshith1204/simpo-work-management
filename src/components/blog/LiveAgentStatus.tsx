
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Brain, Search, BookOpen, Loader2 } from "lucide-react";

interface AgentAction {
  phase: "thinking" | "researching" | "analyzing" | "sources";
  status: string;
  details?: string[];
  progress?: number;
}

interface AgentInsights {
  thinking: string;
  researching: string[];
  sources: string[];
}

interface LiveAgentStatusProps {
  isActive: boolean;
  currentAction?: AgentAction;
  insights?: AgentInsights;
  messageId: string;
}

const LiveAgentStatus = ({ isActive, currentAction, insights, messageId }: LiveAgentStatusProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (isActive && currentAction) {
      // Simulate live streaming text effect
      const fullText = currentAction.status;
      let currentIndex = 0;
      
      const interval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setDisplayText(fullText.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 30);

      return () => clearInterval(interval);
    }
  }, [isActive, currentAction]);

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case "thinking": return <Brain className="w-4 h-4" />;
      case "researching": return <Search className="w-4 h-4" />;
      case "analyzing": return <Loader2 className="w-4 h-4 animate-spin" />;
      case "sources": return <BookOpen className="w-4 h-4" />;
      default: return <Loader2 className="w-4 h-4 animate-spin" />;
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "thinking": return "bg-blue-50 border-blue-200 text-blue-900";
      case "researching": return "bg-green-50 border-green-200 text-green-900";
      case "analyzing": return "bg-purple-50 border-purple-200 text-purple-900";
      case "sources": return "bg-orange-50 border-orange-200 text-orange-900";
      default: return "bg-gray-50 border-gray-200 text-gray-900";
    }
  };

  if (!isActive && !insights) return null;

  return (
    <div className={`rounded-lg border p-3 mb-3 ${
      isActive ? getPhaseColor(currentAction?.phase || "thinking") : "bg-blue-50 border-blue-200"
    }`}>
      {/* Live Status Display */}
      {isActive && currentAction && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            {getPhaseIcon(currentAction.phase)}
            <span className="text-sm font-medium capitalize">
              {currentAction.phase}
            </span>
            {currentAction.progress && (
              <div className="flex-1 bg-white bg-opacity-50 rounded-full h-1.5">
                <div 
                  className="bg-current h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${currentAction.progress}%` }}
                />
              </div>
            )}
          </div>
          
          <div className="text-sm">
            {displayText}
            <span className="animate-pulse">|</span>
          </div>

          {currentAction.details && (
            <div className="flex flex-wrap gap-1 mt-2">
              {currentAction.details.map((detail, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {detail}
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Completed Insights */}
      {!isActive && insights && (
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">AI Process Insights</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-0 h-auto text-blue-700 hover:text-blue-900"
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          </div>
          
          {isExpanded && (
            <div className="space-y-3 mt-3 text-sm text-blue-800">
              <div>
                <strong>Thinking:</strong> {insights.thinking}
              </div>
              <div>
                <strong>Research Areas:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {insights.researching.map((item, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <strong>Sources Consulted:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {insights.sources.map((source, idx) => (
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
    </div>
  );
};

export default LiveAgentStatus;
