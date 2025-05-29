
import { AtSign, CheckCheck, MessageCircle, FileText, Reply } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";

const Mentions = () => {
  const [isReplyDrawerOpen, setIsReplyDrawerOpen] = useState(false);
  const [selectedMention, setSelectedMention] = useState("");
  const [replyText, setReplyText] = useState("");

  const mentions = [
    {
      id: 1,
      source: "Task #142 - Fix payment error",
      snippet: "You were tagged in task #142 - 'Fix payment error'",
      author: "System",
      timestamp: "2 hours ago",
      isRead: false,
      type: "task"
    },
    {
      id: 2,
      source: "Marketing Plan Q3",
      snippet: "Ritika mentioned you in 'Marketing Plan Q3'",
      author: "Ritika",
      timestamp: "4 hours ago",
      isRead: true,
      type: "comment"
    },
  ];

  const unreadCount = mentions.filter(m => !m.isRead).length;

  const handleReply = (mentionSource: string) => {
    setSelectedMention(mentionSource);
    setIsReplyDrawerOpen(true);
  };

  const handleSendReply = () => {
    console.log("Reply sent:", replyText);
    setIsReplyDrawerOpen(false);
    setReplyText("");
    setSelectedMention("");
  };

  return (
    <div className="space-y-6 font-dm-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mentions</h2>
          <p className="text-gray-600 mt-1">Items where you've been tagged</p>
        </div>
        <Button 
          variant="outline" 
          className="px-6 py-2 rounded-lg font-medium hover:bg-green-50 hover:text-green-600 hover:border-green-300 transition-colors"
        >
          <CheckCheck className="w-4 h-4 mr-2" />
          Mark All as Read
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{unreadCount}</div>
            <div className="text-sm text-gray-600">Unread Mentions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{mentions.length}</div>
            <div className="text-sm text-gray-600">Total Mentions</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-700">Show:</span>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="rounded-full">
            Only Unread
          </Button>
          <Button variant="outline" size="sm" className="rounded-full bg-blue-50 text-blue-600 border-blue-300">
            All Mentions
          </Button>
        </div>
      </div>

      {/* Mentions List */}
      <div className="space-y-3">
        {mentions.map((mention) => (
          <Card 
            key={mention.id} 
            className={`hover:shadow-md transition-all duration-200 border cursor-pointer ${
              !mention.isRead ? 'bg-blue-50 border-blue-200' : 'border-gray-200'
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                  <AtSign className="w-4 h-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-blue-600 hover:underline cursor-pointer">
                      {mention.source}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {!mention.isRead && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                      <span className="text-xs text-gray-500">{mention.timestamp}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                    {mention.snippet}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <MessageCircle className="w-3 h-3" />
                      <span>by {mention.author}</span>
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleReply(mention.source)}
                      className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                    >
                      <Reply className="w-3 h-3 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center pt-4">
        <Button variant="outline" className="px-6">
          Load More Mentions
        </Button>
      </div>

      {/* Reply Drawer */}
      <Drawer open={isReplyDrawerOpen} onOpenChange={setIsReplyDrawerOpen}>
        <DrawerContent className="font-dm-sans">
          <DrawerHeader>
            <DrawerTitle>Reply to Mention</DrawerTitle>
            <p className="text-sm text-gray-600">{selectedMention}</p>
          </DrawerHeader>
          
          <div className="p-4 space-y-4">
            <Textarea
              placeholder="Type your reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="min-h-[100px] font-dm-sans"
            />
          </div>
          
          <DrawerFooter>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setIsReplyDrawerOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSendReply}
                className="flex-1"
              >
                Send
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Mentions;
