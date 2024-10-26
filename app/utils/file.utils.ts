import JSZip from "jszip";
import { saveAs } from "file-saver";
import { UploadFile } from "../../types/uploadfile";

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

export const convertFiles = async (files: UploadFile[]) => {
  return files.map((file) => ({ ...file, ready: true }));
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
    default:
      return "/images/formats/other.png";
  }
};