import { UploadFile } from "@/types/uploadfile";
import { useState } from "react";

const BASE_URL = "http://127.0.0.1:8000";

const formatsByType = {
  Image: ["jpg", "jpeg", "png", "gif", "bmp"],
  Video: ["mp4", "avi", "mkv", "mov", "wmv"],
  Audio: ["mp3", "wav", "aac", "flac", "ogg"],
  Document: ["pdf", "docx", "txt", "odt", "rtf", "xls", "ppt", "csv", "xml"],
};

export const useFileConversion = () => {
  const [error, setError] = useState<string | null>(null);

  const convertFile = async (file: UploadFile) => {
    try {
      const formData = new FormData();
      formData.append("file", file.content);
      formData.append("output_format", file.selectedFormat?.toLowerCase());
      formData.append("input_format", file.format);

      const apiEndpoint = getApiEndpoint(file.selectedFormat);
      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Conversion failed");
      }

      return await response.blob();
    } catch (e) {
      setError(e.message);
      throw e;
    }
  };

  const compressFile = async (file: UploadFile, quality: string) => {
    try {
      const formData = new FormData();
      formData.append("file", file.content);
      formData.append("quality", quality);

      const mimeType = file.content.type;
      let apiEndpoint;
      let format;

      console.log(mimeType);

      if (mimeType === "application/pdf") {
        apiEndpoint = `${BASE_URL}/api/v1/modify/compress-pdf`;
      } else if (
        mimeType ===
        "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      ) {
        apiEndpoint = `${BASE_URL}/api/v1/modify/compress-pptx`;
      } else if (
        mimeType ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        apiEndpoint = `${BASE_URL}/api/v1/modify/compress-xlsx`;
      } else if (mimeType.startsWith("image/")) {
        apiEndpoint = `${BASE_URL}/api/v1/modify/compress-image`;

        
        format = mimeType.split("/")[1]; 
        formData.append("format", format); 
      } else {
        throw new Error(
          "Unsupported file type. Only PDF, PPTX, XLSX, and image files are allowed.",
        );
      }

      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Compression failed");
      }

      return await response.blob();
    } catch (e) {
      setError(e.message);
      throw e;
    }
  };

  const getApiEndpoint = (selectedFormat: string): string => {
    const lowerCaseFormat = selectedFormat.toLowerCase();
    if (formatsByType.Image.includes(lowerCaseFormat)) {
      return `${BASE_URL}/api/v1/image/convert`;
    } else if (formatsByType.Video.includes(lowerCaseFormat)) {
      return `${BASE_URL}/api/v1/video/convert`;
    } else if (formatsByType.Audio.includes(lowerCaseFormat)) {
      return `${BASE_URL}/api/v1/audio/convert`;
    } else {
      return `${BASE_URL}/api/v1/document/convert`;
    }
  };

  return { convertFile, compressFile, error };
};
