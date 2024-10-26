import React from "react";
import { Button, Popover } from "flowbite-react";
import { FaAngleDown } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";
import FileFormatSelector from "./FileFormatSelect";
import { AiOutlineLoading } from "react-icons/ai";
import Image from "next/image";
import { UploadFile } from "@/types/uploadfile";
import { getFileTypeIcon } from "@/utils/file.utils";
import { MdDeleteOutline } from "react-icons/md";

interface FileListProps {
  files: UploadFile[];
  onRemoveFile: (id: string) => void;
  onConvertFiles: () => void;
  onCancelFiles: () => void;
  onDownloadAsZip: () => void;
  onDownloadFile: (file: UploadFile) => void;
  setSelectedFormat: (file: UploadFile, format: string) => void;
}

const FileList: React.FC<FileListProps> = ({
  files,
  onRemoveFile,
  onConvertFiles,
  onDownloadAsZip,
  onDownloadFile,
  onCancelFiles,
  setSelectedFormat,
}) => {
  const isConvertDisabled = files.some((file) => !file.selectedFormat);
  const allFilesReady = files.every((file) => file.ready);
  const allFileConverted = files.some((file) => file.converting);

  const renderFileName = (file: UploadFile) => {
    const fullName = !file.ready
      ? `${file.name}.${file.format}`
      : `${file.name}.${file.selectedFormat.toLowerCase()}`;
    return (
      <div className=" font-normal text-black dark:text-white" title={fullName}>
        {fullName.length > 30 ? `${fullName.slice(0, 30)}...` : fullName}
      </div>
    );
  };

  const renderFileSize = (file: UploadFile) => (
    <div className="text-xs text-neutral-500">
      {!file.ready ? file.size : file.convertedSize}
    </div>
  );

  const handleDownload = () => {
    if (files.length === 1) {
      onDownloadFile(files[0]);
    } else {
      onDownloadAsZip();
    }
  };

  return (
    <div className="mt-4 space-y-4">
      {files.map((file) => (
        <div
          key={file.id}
          className="relative flex w-full items-center justify-between rounded-lg border border-solid  p-4 dark:border-gray-900 dark:bg-btndark"
        >
          <div className="flex min-w-[300px]  items-center gap-2">
            <Image
              src={getFileTypeIcon(file.format)}
              alt={`${file.format} icon`}
              width={30}
              height={30}
            />
            {!file.ready && (
              <div className="text-sm">
                {renderFileName(file)}
                {renderFileSize(file)}
              </div>
            )}
            <svg
              className="h-6 w-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 12H5m14 0-4 4m4-4-4-4"
              />
            </svg>

            <Image
              src={getFileTypeIcon(file.selectedFormat.toLowerCase())}
              alt={`${file.format} icon`}
              width={30}
              height={30}
            />
            {file.ready && (
              <div className="text-sm">
                {renderFileName(file)}
                {renderFileSize(file)}
              </div>
            )}
          </div>
          {file.ready && (
            <label className="px-5  text-xs text-green-600">Ready</label>
          )}
          {!file.ready && file.converting && (
            <label className="px-5  text-xs text-blue-600">Converting...</label>
          )}
          {file.hasError && (
            <div className="flex gap-2">
              <label className="text-xs m-auto block text-red-600">
                Something went wrong
              </label>
              <Button color="transparent" onClick={() => onRemoveFile(file.id)}>
                <MdDeleteOutline className="h-6 w-6 text-red-600" />
              </Button>
            </div>
          )}
          {!file.ready && !file.converting && !file.hasError && (
            <div className="flex ">
              <Popover
                content={
                  <FileFormatSelector
                    uploadedFormat={file.format}
                    onSelectedFormatChange={(format) =>
                      setSelectedFormat(file, format)
                    }
                  />
                }
              >
                <div className="flex gap-2">
                  <label className="m-auto block">to: </label>
                  <Button color="transparent" className="m-auto block">
                    <span className="flex gap-3">
                      {file.selectedFormat || ""}
                      <FaAngleDown />
                    </span>
                  </Button>
                </div>
              </Popover>

              <Button color="transparent" onClick={() => onRemoveFile(file.id)}>
                <IoIosClose className="h-6 w-6" />
              </Button>
            </div>
          )}
        </div>
      ))}

      <div className="flex w-full justify-end gap-2">
        <Button color="transparent" onClick={onCancelFiles}>
          Cancel
        </Button>
        {!allFilesReady ? (
          <Button
            disabled={isConvertDisabled}
            isProcessing={allFileConverted}
            processingSpinner={
              <AiOutlineLoading className="h-6 w-6 animate-spin" />
            }
            onClick={onConvertFiles}
          >
            Convert
          </Button>
        ) : (
          <Button size="md" color="success" onClick={handleDownload}>
            <IoMdDownload className="mr-2 h-5 w-5" />
            {files.length === 1 ? "Download" : `Download (${files.length})`}
          </Button>
        )}
      </div>
    </div>
  );
};

export default FileList;
