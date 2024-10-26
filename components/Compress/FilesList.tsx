import React from "react";
import FileCard from "../Widgets/FileCard";
import FileUploadCard from "../Widgets/FileUploadCard";
import { UploadFile } from "@/types/uploadfile";

interface FileListProps {
  files: UploadFile[];
  handleRemoveFile: (id: string) => void;
  handleFileUpload: (newFiles: File[]) => void;
  showUploadButton: boolean;  
}

const FileList: React.FC<FileListProps> = ({ files, handleRemoveFile, handleFileUpload, showUploadButton }) => {
  return (
    <div className="grid grid-cols-2 gap-6 xl:grid-cols-5">
      {files.map((file) => (
        <FileCard key={file.id} file={file} handleRemoveFile={handleRemoveFile} />
      ))}
      {showUploadButton && (
        <FileUploadCard handleFileUpload={handleFileUpload} /> 
      )}
    </div>
  );
};

export default FileList;
