import JSZip from "jszip";
import { saveAs } from "file-saver";
import { UploadFile } from "@/types/uploadfile";

export const addFiles = (newFiles: File[], existingFiles: UploadFile[]): UploadFile[] => {
  const newUploadFiles: UploadFile[] = newFiles.map((newFile) => ({
    id: newFile.name,
    name: newFile.name.split(".").slice(0, -1).join("."),
    format: newFile.name.split(".").pop() || "",
    size: (newFile.size / 1024).toFixed(2) + " KB",
    selectedFormat: '',
    converting: false,
    ready: false,
    content: newFile,
  }));

  return existingFiles.concat(newUploadFiles);
};

export const removeFile = (files: UploadFile[], id: string) => {
  return files.filter((file) => file.id !== id);
};

export const downloadFilesAsZip = (files: UploadFile[]) => {
  const zip = new JSZip();
  files.forEach((file) => {
    zip.file(file.name + "." + file.selectedFormat, file.content);
  });

  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(content, "files.zip");
  });
};

export const downloadFile = (file: UploadFile) => {
  if (file.url) {
    const link = document.createElement('a');
    link.href = file.url; 
    link.download = file.convertedName || file.name; 
    document.body.appendChild(link); 
    link.click(); 
    document.body.removeChild(link); 
  } else {
    console.error("No URL available for downloading");
  }
};

export const getFileTypeIcon = (format: string) => {
  switch (format) {
    case "pdf":
      return "/images/formats/pdf.png";
    case "jpg":
      return "/images/formats/jpg.png";
    case "png":
      return "/images/formats/png.png";
    case "mp3":
      return "/images/formats/audio-icon.png";
    case "pptx":
      return "/images/formats/pptx.png";
    case "xlsx":
        return "/images/formats/xlsx.png";
    default:
      return "/images/formats/other.png";
  }
};

export const truncateFileName = (name: string, maxLength: number = 15) => {
  if (name.length <= maxLength) {
    return name;
  }


  return name.substring(0, maxLength) + "...";
};

export const calculateSizeShift = (file: UploadFile): string | null => {
  if (!file.size || !file.compressedSize) {
    return null;
  }

  const originalSize = parseFloat(file.size.replace('KB', '').trim());
  const compressedSize = parseFloat(file.compressedSize.replace('KB', '').trim());

  if (isNaN(originalSize) || isNaN(compressedSize)) {
    return null;
  }

  const sizeShift = ((originalSize - compressedSize) / originalSize) * 100;

  return `${sizeShift.toFixed(2)}%`;
};


export const areAllFilesCompressed = (files: UploadFile[]): boolean => {
  return files.every((file) => file.isCompressed);
};

export const formatFileSize = (fileSizeBytes: number): string  => {
  if (fileSizeBytes < 1024 * 1024) {  // Less than 1 MB
      const sizeKB = fileSizeBytes / 1024;
      return `${sizeKB.toFixed(2)} KB`;
  } else if (fileSizeBytes < 1024 * 1024 * 1024) {  // Less than 1 GB
      const sizeMB = fileSizeBytes / (1024 * 1024);
      return `${sizeMB.toFixed(2)} MB`;
  } else {  // 1 GB or more
      const sizeGB = fileSizeBytes / (1024 * 1024 * 1024);
      return `${sizeGB.toFixed(2)} GB`;
  }
}
