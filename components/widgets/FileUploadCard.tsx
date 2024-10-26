
import React, { useRef } from "react";

interface FileUploadCardProps {
  handleFileUpload: (files: File[]) => void;
}

const FileUploadCard: React.FC<FileUploadCardProps> = ({
  handleFileUpload,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    handleFileUpload(newFiles);
  };

  const handleClickUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      handleFileUpload(newFiles);
    }
  };

  return (
    <div
      className="flex flex-col  items-center justify-center rounded-lg border-2 border-dashed border-gray-300  dark:border-gray-600 cursor-pointer"
      onDrop={handleFileDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={handleClickUpload}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        multiple
        onChange={handleFileChange}
      />
      <div className="mb-3 flex items-center justify-center h-[150px] w-[150px]">
        <span className="text-4xl text-gray-500">+</span>
      </div>
      
    </div>
  );
};

export default FileUploadCard;
