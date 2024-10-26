import React from "react";
import Image from "next/image";

interface DropZoneProps {
  handleFileUpload: (newFiles: File[]) => void;
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  accept?: string;
  subtitle?: string;
}

const DropZone: React.FC<DropZoneProps> = ({
  handleFileUpload,
  isDragging,
  setIsDragging,
  fileInputRef,
  accept,
  subtitle
}) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (accept) {
      const acceptedTypes = accept.split(",").map(type => type.trim());
      const filteredFiles = droppedFiles.filter(file => 
        acceptedTypes.some(type => file.type.match(type) || file.name.endsWith(type))
      );
      handleFileUpload(filteredFiles);
    } else {
      handleFileUpload(droppedFiles);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`flex h-[300px] w-full items-center justify-center rounded-2xl border-2 border-dashed ${
        isDragging ? "border-blue-500" : "border-gray-400"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        multiple
        hidden
        ref={fileInputRef}
        accept={accept}
        onChange={(e) => handleFileUpload(Array.from(e.target.files || []))}
      />
      <div className="cursor-pointer text-center" onClick={triggerFileUpload}>
        <Image className="m-auto block" src="/images/hero/upload.png" width={100} height={100} alt="Upload Icon" />
        <p className="text-lg text-black dark:text-white">Drag & Drop your file here or click to upload</p>
        <span className="mt-1 block text-sm font-normal text-neutral-400 dark:text-gray-400">
           {subtitle}
        </span>
      </div>
    </div>
  );
};

export default DropZone;
