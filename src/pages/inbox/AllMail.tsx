
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Mail, User } from "lucide-react";
import { useState } from "react";

const AllMail = () => {
  const [replyText, setReplyText] = useState("");

  const mails = [
    {
      id: 1,
      subject: "Weekly Sync-up",
      from: "Sarah",
      snippet: "Let's go over the sprint progress and discuss any blockers we might have...",
      tag: "Meeting",
      date: "Today",
      time: "2:30 PM"
    },
    {
      id: 2,
      subject: "New Bug Reported",
      from: "QA Team",
      snippet: "Found issue in login flow that affects mobile users. Priority: High...",
      tag: "Bug",
      date: "Yesterday",
      time: "4:15 PM"
    }
  ];

  const handleSendReply = () => {
    console.log("Sending reply:", replyText);
    setReplyText("");
  };

  return (
    <div className="space-y-6 font-dm-sans">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">All Mail</h2>
        <p className="text-gray-600 mt-1">Manage your inbox and communications</p>
      </div>

      <div className="space-y-4">
        {mails.map((mail) => (
          <Card key={mail.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">{mail.subject}</h3>
                      <Badge variant={mail.tag === "Bug" ? "destructive" : "secondary"}>
                        {mail.tag}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">From: {mail.from}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{mail.date}</p>
                  <p className="text-xs text-gray-400">{mail.time}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{mail.snippet}</p>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm">
                      Reply
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Reply to: {mail.subject}</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Your Reply</label>
                        <Textarea
                          placeholder="Type your reply here..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="mt-2"
                          rows={6}
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={handleSendReply} className="bg-[#270E2B] hover:bg-[#270E2B]/90">
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

export default AllMail;
