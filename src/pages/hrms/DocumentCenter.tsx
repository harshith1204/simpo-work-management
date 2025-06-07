
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Download, Eye } from "lucide-react";

const DocumentCenter = () => {
  const documents = [
    { name: "Employee Handbook 2024.pdf", type: "Policy", size: "2.1 MB", uploaded: "Nov 15, 2024" },
    { name: "Salary Certificates Nov 2024.zip", type: "Payroll", size: "15.3 MB", uploaded: "Nov 10, 2024" },
    { name: "Leave Policy Update.pdf", type: "Policy", size: "1.8 MB", uploaded: "Nov 5, 2024" },
    { name: "Employee Contracts Q4.zip", type: "Legal", size: "25.7 MB", uploaded: "Oct 30, 2024" }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Document Center</h1>
          <p className="text-gray-600 mt-2">Centralized repository for all HR documents and files</p>
        </div>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Upload Documents
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">156</div>
            <div className="text-sm text-gray-600">Total Documents</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">89</div>
            <div className="text-sm text-gray-600">Employee Files</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">34</div>
            <div className="text-sm text-gray-600">Policies</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">33</div>
            <div className="text-sm text-gray-600">Legal Documents</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Recent Documents</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-900">{doc.name}</p>
                    <p className="text-sm text-gray-600">{doc.type} • {doc.size} • {doc.uploaded}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentCenter;
