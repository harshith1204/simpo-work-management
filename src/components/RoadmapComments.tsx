
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Reply, Heart, MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: Date;
  type: "general" | "milestone";
  milestoneId?: number;
  milestoneName?: string;
  likes: number;
  replies?: Comment[];
}

interface RoadmapCommentsProps {
  roadmapId: number;
}

const RoadmapComments = ({ roadmapId }: RoadmapCommentsProps) => {
  const { toast } = useToast();
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Sarah Wilson",
      avatar: "SW",
      content: "Great progress on the Q3 roadmap! The email campaign milestone was completed ahead of schedule. Let's keep this momentum going for the mobile app redesign.",
      timestamp: new Date("2024-07-16T10:30:00"),
      type: "general",
      likes: 3,
      replies: [
        {
          id: 2,
          author: "Alice Johnson",
          avatar: "AJ",
          content: "Thanks Sarah! The email automation is already showing great results. Open rates increased by 23%.",
          timestamp: new Date("2024-07-16T11:15:00"),
          type: "general",
          likes: 1
        }
      ]
    },
    {
      id: 3,
      author: "Carol Davis",
      avatar: "CD",
      content: "I'm concerned about the timeline for the mobile app redesign. We might need an extra week for proper user testing. Thoughts?",
      timestamp: new Date("2024-07-17T14:20:00"),
      type: "milestone",
      milestoneId: 2,
      milestoneName: "Mobile App Redesign",
      likes: 2
    },
    {
      id: 4,
      author: "Eve Brown",
      avatar: "EB",
      content: "API v3.0 development is on track. We've completed the authentication layer and are moving on to the data endpoints.",
      timestamp: new Date("2024-07-18T09:45:00"),
      type: "milestone",
      milestoneId: 3,
      milestoneName: "API v3.0 Release",
      likes: 4
    }
  ]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: "Current User",
      avatar: "CU",
      content: newComment,
      timestamp: new Date(),
      type: "general",
      likes: 0
    };

    setComments([comment, ...comments]);
    setNewComment("");
    
    toast({
      title: "Comment added",
      description: "Your comment has been posted to the roadmap.",
    });
  };

  const handleAddReply = (parentId: number) => {
    if (!replyContent.trim()) return;

    const reply: Comment = {
      id: Date.now(),
      author: "Current User",
      avatar: "CU",
      content: replyContent,
      timestamp: new Date(),
      type: "general",
      likes: 0
    };

    setComments(prev => prev.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply]
        };
      }
      return comment;
    }));

    setReplyContent("");
    setReplyingTo(null);
    
    toast({
      title: "Reply added",
      description: "Your reply has been posted.",
    });
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Add Comment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5" />
            <span>Comments & Discussion</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Add a comment to the roadmap..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
          />
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Use @username to mention team members
            </div>
            <Button onClick={handleAddComment}>
              Post Comment
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id} className="relative">
            <CardContent className="p-6">
              <div className="flex space-x-4">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>{comment.avatar}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-semibold">{comment.author}</span>
                    <span className="text-sm text-gray-600">
                      {formatTimeAgo(comment.timestamp)}
                    </span>
                    {comment.type === "milestone" && comment.milestoneName && (
                      <Badge variant="outline" className="text-xs">
                        {comment.milestoneName}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-gray-900 mb-3">{comment.content}</p>
                  
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
                      <Heart className="w-4 h-4 mr-1" />
                      {comment.likes}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-600"
                      onClick={() => setReplyingTo(comment.id)}
                    >
                      <Reply className="w-4 h-4 mr-1" />
                      Reply
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Reply Form */}
                  {replyingTo === comment.id && (
                    <div className="mt-4 space-y-3">
                      <Textarea
                        placeholder={`Reply to ${comment.author}...`}
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        rows={2}
                      />
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={() => handleAddReply(comment.id)}>
                          Post Reply
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => setReplyingTo(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 space-y-4 border-l-2 border-gray-100 pl-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs">{reply.avatar}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-sm">{reply.author}</span>
                              <span className="text-xs text-gray-600">
                                {formatTimeAgo(reply.timestamp)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-900">{reply.content}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Button variant="ghost" size="sm" className="text-xs text-gray-600 hover:text-red-600 h-6 px-2">
                                <Heart className="w-3 h-3 mr-1" />
                                {reply.likes}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoadmapComments;
