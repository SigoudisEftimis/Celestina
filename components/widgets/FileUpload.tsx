"use client"
import React, { useState, useRef } from "react";
import { Alert } from "flowbite-react";
import DropZone from "./DropZone";
import FileList from "./FileList";
import { UploadFile } from "@/types/uploadfile";
import {
  addFiles,
  removeFile,
  downloadFilesAsZip,
  downloadFile,
} from "@/utils/file.utils";
import { useFileConversion } from "@/hooks/file-conversion";

const MAX_FILES = 3;

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [errorMaxFiles, setErrorMaxFiles] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { convertFile, error } = useFileConversion();

  const handleFileUpload = (newFiles: File[]) => {
    if (files.length + newFiles.length > MAX_FILES) {
      setErrorMaxFiles(true);
      return;
    } else {
      setErrorMaxFiles(false);
    }

    const updatedFiles = addFiles(newFiles, files);
    setFiles(updatedFiles);
  };

  const handleRemoveFile = (id: string) => {
    setFiles((prevFiles) => removeFile(prevFiles, id));
  };

  const handleConvertFiles = async () => {
    await Promise.all(
      files.map(async (file) => {
        if (!file.selectedFormat) return;

        try {
          file.converting = true;
          file.hasError = false;
          file.error='';

          const blob = await convertFile(file);
          const url = URL.createObjectURL(blob);
          const convertedSize = `${(blob.size / 1024).toFixed(2)} KB`;

          setFiles((prevFiles) =>
            prevFiles.map((f) =>
              f.id === file.id
                ? {
                    ...f,
                    url,
                    convertedSize,
                    convertedName: `${
                      f.name
                    }.${file.selectedFormat.toLowerCase()}`,
                    convertedContent: blob,
                    ready: true,
                    converting: false,
                    hasError: false,
                    error: "",
                  }
                : f,
            ),
          );
        } catch (e) {
          setFiles((prevFiles) =>
            prevFiles.map((f) =>
              f.id === file.id
                ? {
                    ...f,
                    converting: false,
                    ready: false,
                    hasError: true,
                    error: e.message,
                  }
                : f,
            ),
          );
         
        }
      }),
    );
  };

  const cancelAllFiles = () => {
    setFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const setSelectedFormat = (file: UploadFile, format: string) => {
    setFiles((prevFiles) =>
      prevFiles.map((f) =>
        f.id === file.id ? { ...f, selectedFormat: format } : f,
      ),
    );
  };

  return (
    <div className="w-full">
      <DropZone
        handleFileUpload={handleFileUpload}
        isDragging={isDragging}
        setIsDragging={setIsDragging}
        fileInputRef={fileInputRef}
        subtitle="Upload and convert up to 3 files (max size 50MB each)"
      />

      {files.length > 0 && (
        <FileList
          files={files}
          onRemoveFile={handleRemoveFile}
          onConvertFiles={handleConvertFiles}
          setSelectedFormat={setSelectedFormat}
          onCancelFiles={cancelAllFiles}
          onDownloadAsZip={() => downloadFilesAsZip(files)}
          onDownloadFile={downloadFile}
        />
      )}

      {errorMaxFiles && (
        <Alert color="failure" className="mt-4">
          <span>
            You can only upload a maximum of {MAX_FILES} files at a time.
          </span>
        </Alert>
      )}
    </div>
  );
};

export default FileUpload;
