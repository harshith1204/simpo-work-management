
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PenTool, Megaphone, Share2, Clock, FileText, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AIWriter = () => {
  const navigate = useNavigate();

  // Sample recent writings data
  const recentWritings = [
    {
      id: 1,
      title: "10 Tips for Better SEO",
      type: "Blog",
      date: "2024-06-12",
      status: "Published"
    },
    {
      id: 2,
      title: "Summer Sale Campaign",
      type: "Ad",
      date: "2024-06-11",
      status: "Draft"
    },
    {
      id: 3,
      title: "Product Launch Announcement",
      type: "Social Post",
      date: "2024-06-10",
      status: "Scheduled"
    },
    {
      id: 4,
      title: "How to Boost Productivity",
      type: "Blog",
      date: "2024-06-09",
      status: "Published"
    },
    {
      id: 5,
      title: "Black Friday Special",
      type: "Ad",
      date: "2024-06-08",
      status: "Draft"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Published":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "Scheduled":
        return <Clock className="w-4 h-4 text-blue-600" />;
      case "Draft":
        return <FileText className="w-4 h-4 text-gray-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "text-green-600 bg-green-50";
      case "Scheduled":
        return "text-blue-600 bg-blue-50";
      case "Draft":
        return "text-gray-600 bg-gray-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-dm-sans">AI Writer</h1>
          <p className="text-gray-600 mt-2">Create compelling content with AI-powered writing tools</p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* AI Blog Writer Card */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigate('/ai-writer/blog')}>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <PenTool className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-xl font-semibold text-gray-900">AI Blog Writer</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">Generate engaging blog posts with AI assistance</p>
              <Button className="w-full" variant="default">
                Start Writing
              </Button>
            </CardContent>
          </Card>

          {/* AI Ads Writer Card */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                <Megaphone className="w-8 h-8 text-orange-600" />
              </div>
              <CardTitle className="text-xl font-semibold text-gray-900">AI Ads Writer</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">Create compelling advertisements and marketing copy</p>
              <Button className="w-full" variant="outline">
                Create Ads
              </Button>
            </CardContent>
          </Card>

          {/* AI Social Post Card */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <Share2 className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl font-semibold text-gray-900">AI Social Post</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">Generate engaging social media content</p>
              <Button className="w-full" variant="outline">
                Create Posts
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Writings Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Recent Writings</CardTitle>
            <p className="text-gray-600">Your latest AI-generated content</p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title/Topic</TableHead>
                  <TableHead>Content Type</TableHead>
                  <TableHead>Date Modified</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentWritings.map((writing) => (
                  <TableRow key={writing.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{writing.title}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {writing.type}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-600">{writing.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(writing.status)}
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(writing.status)}`}>
                          {writing.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIWriter;
