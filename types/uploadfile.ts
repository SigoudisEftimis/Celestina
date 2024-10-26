export type UploadFile = {
  id: string;
  name: string;
  format: string;
  size: string;
  selectedFormat: string ;
  converting: boolean;
  ready: boolean;
  content: File;
  convertedContent?: Blob;
  convertedSize?: string;
  convertedName?: string;
  url?: string;
  hasError?: boolean;
  error?: string;
  compressedSize?: string;
  isCompressed?: boolean;
  compressedName?: string;
  compressedContent?: Blob;
}
