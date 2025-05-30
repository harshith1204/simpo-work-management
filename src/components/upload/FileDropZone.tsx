
import { Upload } from "lucide-react";

interface FileDropZoneProps {
  onAddFiles: () => void;
}

const FileDropZone = ({ onAddFiles }: FileDropZoneProps) => {
  return (
    <div 
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
      onClick={onAddFiles}
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
  );
};

export default FileDropZone;
