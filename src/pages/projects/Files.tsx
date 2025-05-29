
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Upload, Folder, Image, File } from "lucide-react";

const Files = () => {
  const files = [
    {
      id: 1,
      name: "Project_Requirements.pdf",
      type: "pdf",
      size: "2.4 MB",
      lastModified: "2024-01-15",
      modifiedBy: "Alex Johnson",
      icon: FileText
    },
    {
      id: 2,
      name: "Design_Mockups",
      type: "folder",
      size: "15 files",
      lastModified: "2024-01-20",
      modifiedBy: "Sarah Chen",
      icon: Folder
    },
    {
      id: 3,
      name: "Logo_Final.png",
      type: "image",
      size: "1.2 MB",
      lastModified: "2024-01-18",
      modifiedBy: "Mike Rodriguez",
      icon: Image
    },
    {
      id: 4,
      name: "Technical_Specifications.docx",
      type: "document",
      size: "856 KB",
      lastModified: "2024-01-22",
      modifiedBy: "Emily Davis",
      icon: FileText
    },
    {
      id: 5,
      name: "Database_Schema.sql",
      type: "code",
      size: "124 KB",
      lastModified: "2024-01-25",
      modifiedBy: "David Kim",
      icon: File
    }
  ];

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case "pdf": return "text-red-600 bg-red-100";
      case "image": return "text-green-600 bg-green-100";
      case "document": return "text-blue-600 bg-blue-100";
      case "folder": return "text-yellow-600 bg-yellow-100";
      case "code": return "text-purple-600 bg-purple-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="p-6 space-y-6 font-dm-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Project Files</h2>
          <p className="text-gray-600 mt-1">Manage documents, assets, and project files</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Upload className="w-4 h-4 mr-2" />
          Upload Files
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">24</div>
            <div className="text-sm text-gray-600">Total Files</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">156 MB</div>
            <div className="text-sm text-gray-600">Storage Used</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">8</div>
            <div className="text-sm text-gray-600">Shared Files</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">3</div>
            <div className="text-sm text-gray-600">Recent Updates</div>
          </CardContent>
        </Card>
      </div>

      {/* Files List */}
      <Card>
        <CardContent className="p-0">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b font-medium text-sm text-gray-700">
            <div className="col-span-1"></div>
            <div className="col-span-4">Name</div>
            <div className="col-span-2">Size</div>
            <div className="col-span-2">Last Modified</div>
            <div className="col-span-2">Modified By</div>
            <div className="col-span-1">Actions</div>
          </div>

          {/* File Rows */}
          {files.map((file) => {
            const IconComponent = file.icon;
            return (
              <div key={file.id} className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50 transition-colors items-center">
                <div className="col-span-1">
                  <div className={`p-2 rounded-lg ${getFileTypeColor(file.type)}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="font-medium text-gray-900">{file.name}</div>
                  <div className="text-sm text-gray-600 capitalize">{file.type}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-sm text-gray-600">{file.size}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-sm text-gray-600">{file.lastModified}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-sm text-gray-600">{file.modifiedBy}</div>
                </div>
                <div className="col-span-1">
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default Files;
