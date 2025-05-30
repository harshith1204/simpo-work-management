
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X, FileText, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadFileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  description: string;
  task: string;
  version: string;
}

const UploadFileModal = ({ isOpen, onClose }: UploadFileModalProps) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const { toast } = useToast();

  const handleAddDummyFiles = () => {
    const dummyFiles: UploadedFile[] = [
      {
        id: "1",
        name: "Product Brief.pdf",
        size: "1.2 MB",
        type: "pdf",
        description: "",
        task: "",
        version: ""
      },
      {
        id: "2",
        name: "Wireframe.png",
        size: "940 KB",
        type: "image",
        description: "",
        task: "",
        version: ""
      }
    ];
    setFiles(dummyFiles);
  };

  const handleRemoveFile = (fileId: string) => {
    setFiles(files.filter(file => file.id !== fileId));
  };

  const handleFileDescriptionChange = (fileId: string, description: string) => {
    setFiles(files.map(file => 
      file.id === fileId ? { ...file, description } : file
    ));
  };

  const handleFileTaskChange = (fileId: string, task: string) => {
    setFiles(files.map(file => 
      file.id === fileId ? { ...file, task } : file
    ));
  };

  const handleFileVersionChange = (fileId: string, version: string) => {
    setFiles(files.map(file => 
      file.id === fileId ? { ...file, version } : file
    ));
  };

  const handleUpload = () => {
    toast({
      title: "File uploaded successfully!",
      description: `${files.length} file(s) have been uploaded to the project.`,
    });
    setFiles([]);
    onClose();
  };

  const handleClose = () => {
    setFiles([]);
    onClose();
  };

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
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <p className="text-sm text-gray-600">
            Attach relevant files to this project for easy access and collaboration.
          </p>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Drag & Drop Area */}
          {files.length === 0 && (
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
              onClick={handleAddDummyFiles}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">
                Drag files here or click to browse
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Supported file types: PDF, DOCX, XLSX, PNG, JPG
              </p>
              <p className="text-sm text-gray-500">
                Max file size: 50MB
              </p>
            </div>
          )}

          {/* Selected Files */}
          {files.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">Selected Files</h3>
              {files.map((file) => (
                <div key={file.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
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
                      onClick={() => handleRemoveFile(file.id)}
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
                        onChange={(e) => handleFileDescriptionChange(file.id, e.target.value)}
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
                        <Select onValueChange={(value) => handleFileTaskChange(file.id, value)}>
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
                        <Select onValueChange={(value) => handleFileVersionChange(file.id, value)}>
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
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleUpload} 
              disabled={files.length === 0}
            >
              Upload {files.length > 0 && `(${files.length})`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadFileModal;
