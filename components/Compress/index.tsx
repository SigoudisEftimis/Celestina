"use client";
import React, { useState, useRef } from "react";
import { Alert, Button } from "flowbite-react";
import { UploadFile } from "@/types/uploadfile";
import { useFileConversion } from "@/hooks/file-conversion";
import DropZone from "../Widgets/DropZone";
import FileList from "./FilesList";
import {
  addFiles,
  removeFile,
  areAllFilesCompressed,
} from "@/utils/file.utils";
import CompressionOptions from "./CompressionOptions";
import DashboardSplitLayout from "../Layouts/DashboardSplitLayout";
import toast, { Toaster } from "react-hot-toast";
import { useToastError } from "@/hooks/toasts/useToastError";

const MAX_FILES = 1;

const Compress: React.FC = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [quality, setQuality] = useState<string>("low");
  const [excludeCompressed, setExcludeCompressed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { compressFile } = useFileConversion();
  const { showErrorToast } = useToastError();
  const notifyError = () =>
    showErrorToast(
      `You can only upload a maximum of ${MAX_FILES} files at a time.`,
    );
  const allFileConverted = files.some((file) => file.converting);

  const handleFileUpload = (newFiles: File[]) => {
    if (files.length + newFiles.length > MAX_FILES) {
      notifyError();
      return;
    }
    setFiles(addFiles(newFiles, files));
  };

  const handleRemoveFile = (id: string) => {
    setFiles(removeFile(files, id));
  };

  const resetFiles = () => {
    setFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCompressFiles = async () => {
    const filesToCompress = excludeCompressed
      ? files.filter((file) => !file.isCompressed)
      : files;

    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        filesToCompress.includes(file)
          ? { ...file, converting: true, hasError: false, error: "" }
          : file,
      ),
    );

    const updatedFiles = await Promise.all(
      filesToCompress.map(async (file) => {
        try {
          file.hasError = false;
          file.error = "";
          const blob = await compressFile(file, quality);
          const url = URL.createObjectURL(blob);
          const compressedSize = `${(blob.size / 1024).toFixed(2)} KB`;

          return {
            ...file,
            url,
            compressedSize,
            compressedContent: blob,
            compressedName: `${file.name}.${file.selectedFormat.toLowerCase()}`,
            isCompressed: true,
            ready: true,
            converting: false,
            hasError: false,
          };
        } catch (e) {
          return {
            ...file,
            converting: false,
            ready: false,
            hasError: true,
            error: e.message || "An error occurred",
          };
        }
      }),
    );

    setFiles((prevFiles) =>
      prevFiles.map(
        (file) =>
          updatedFiles.find((updatedFile) => updatedFile.id === file.id) ||
          file,
      ),
    );
  };

  return (
    <div className="relative w-full">
      {files.length === 0 && (
        <DropZone
          handleFileUpload={handleFileUpload}
          fileInputRef={fileInputRef}
          subtitle="Add PDF, image, Excel, and PowerPoint files"
          isDragging={false}
          setIsDragging={() => true}
          accept=".pdf,image/*,.xls,.xlsx,.ppt,.pptx"
        />
      )}

      {files.length !== 0 && (
        <DashboardSplitLayout
          main={
            <FileList
              files={files}
              handleRemoveFile={handleRemoveFile}
              handleFileUpload={handleFileUpload}
              showUploadButton={true}
            />
          }
          bar={
            <CompressionOptions
              quality={quality}
              setQuality={setQuality}
              excludeCompressed={excludeCompressed}
              setExcludeCompressed={setExcludeCompressed}
              allFileConverted={allFileConverted}
              handleCompressFiles={handleCompressFiles}
              handleResetFiles={resetFiles}
              files={files}
            />
          }
        />
      )}
    </div>
  );
};

export default Compress;
