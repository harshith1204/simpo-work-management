
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

interface AttachedFile {
  id: number;
  name: string;
  size: string;
  type: string;
  uploadedBy: string;
  uploadedOn: string;
}

interface AttachedFilesProps {
  files: AttachedFile[];
}

const AttachedFiles = ({ files }: AttachedFilesProps) => {
  return (
    <div className="space-y-3">
      {files.map((file) => (
        <Card key={file.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">{file.name}</h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                    <span>{file.size}</span>
                    <span>Uploaded by {file.uploadedBy}</span>
                    <span>{file.uploadedOn}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AttachedFiles;
