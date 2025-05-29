
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { AtSign, Eye } from "lucide-react";
import { useState } from "react";

const Mentions = () => {
  const [commentText, setCommentText] = useState("");

  const mentions = [
    {
      id: 1,
      title: "You were mentioned in task #142: Fix mobile responsiveness",
      from: "Dev Team",
      time: "2 hours ago",
      context: "We need your input on the responsive design approach"
    },
    {
      id: 2,
      title: "Marketing Plan Q3 needs your input",
      from: "Jane Doe",
      time: "1 day ago",
      context: "Please review the marketing strategy document"
    }
  ];

  const handleSendComment = () => {
    console.log("Sending comment:", commentText);
    setCommentText("");
  };

  return (
    <div className="space-y-6 font-dm-sans">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Mentions</h2>
        <p className="text-gray-600 mt-1">See where you've been mentioned</p>
      </div>

      <div className="space-y-4">
        {mentions.map((mention) => (
          <Card key={mention.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                    <AtSign className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{mention.title}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="secondary">Mention</Badge>
                      <span className="text-sm text-gray-500">by {mention.from}</span>
                      <span className="text-sm text-gray-400">• {mention.time}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{mention.context}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm">
                      Comment
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Reply to Mention</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Your Comment</label>
                        <Textarea
                          placeholder="Type your comment here..."
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          className="mt-2"
                          rows={6}
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={handleSendComment} className="bg-[#270E2B] hover:bg-[#270E2B]/90">
                          Send
                        </Button>
                        <Button variant="outline">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Mentions;
