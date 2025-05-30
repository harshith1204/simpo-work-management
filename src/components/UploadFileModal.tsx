
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import FileDropZone from "@/components/upload/FileDropZone";
import FilePreview from "@/components/upload/FilePreview";

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
            <FileDropZone onAddFiles={handleAddDummyFiles} />
          )}

          {/* Selected Files */}
          {files.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">Selected Files</h3>
              {files.map((file) => (
                <FilePreview
                  key={file.id}
                  file={file}
                  onRemove={handleRemoveFile}
                  onDescriptionChange={handleFileDescriptionChange}
                  onTaskChange={handleFileTaskChange}
                  onVersionChange={handleFileVersionChange}
                />
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
