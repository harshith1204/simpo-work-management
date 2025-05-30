
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, FileText, Image } from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  description: string;
  task: string;
  version: string;
}

interface FilePreviewProps {
  file: UploadedFile;
  onRemove: (fileId: string) => void;
  onDescriptionChange: (fileId: string, description: string) => void;
  onTaskChange: (fileId: string, task: string) => void;
  onVersionChange: (fileId: string, version: string) => void;
}

const FilePreview = ({ 
  file, 
  onRemove, 
  onDescriptionChange, 
  onTaskChange, 
  onVersionChange 
}: FilePreviewProps) => {
  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-8 h-8 text-red-600" />;
      case "image":
        return <Image className="w-8 h-8 text-green-600" />;
      default:
        return <FileText className="w-8 h-8 text-blue-600" />;
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {getFileIcon(file.type)}
          <div>
            <p className="font-medium text-gray-900">{file.name}</p>
            <p className="text-sm text-gray-500">{file.size}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(file.id)}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-3">
        <div>
          <Label htmlFor={`description-${file.id}`} className="text-sm">
            Description (optional)
          </Label>
          <Textarea
            id={`description-${file.id}`}
            value={file.description}
            onChange={(e) => onDescriptionChange(file.id, e.target.value)}
            placeholder="Add a description for this file..."
            rows={2}
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor={`task-${file.id}`} className="text-sm">
              Associate with Task
            </Label>
            <Select onValueChange={(value) => onTaskChange(file.id, value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select task" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="website-redesign">Website Redesign</SelectItem>
                <SelectItem value="mobile-app">Mobile App Development</SelectItem>
                <SelectItem value="api-integration">API Integration</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor={`version-${file.id}`} className="text-sm">
              Version Label
            </Label>
            <Select onValueChange={(value) => onVersionChange(file.id, value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select version" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="v1">v1</SelectItem>
                <SelectItem value="v2">v2</SelectItem>
                <SelectItem value="final">Final</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
