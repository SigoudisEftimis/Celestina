"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { UploadFile } from "@/types/uploadfile";
import {
  getFileTypeIcon,
  truncateFileName,
  calculateSizeShift,
  formatFileSize,
  downloadFile,
} from "@/utils/file.utils";
import { IoDownloadOutline } from "react-icons/io5";
import { BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import { Tooltip } from "flowbite-react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { LuFileWarning, LuFileCheck, LuFileX } from "react-icons/lu";
import FileStatusIcon from "./FileStatusIcon";

interface FileCardProps {
  file: UploadFile;
  handleRemoveFile: (id: string) => void;
}

const FileCard: React.FC<FileCardProps> = ({ file, handleRemoveFile }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sizeShift, setSizeShift] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (file.ready) {
      setSizeShift(calculateSizeShift(file));
    } else {
      setSizeShift(null);
    }
  }, [file]);

  return (
    <div className="relative flex flex-col items-center rounded-lg border bg-white p-6 dark:border-black dark:bg-btndark">
      <div className="absolute right-2 top-2" ref={menuRef}>
        <button
          onClick={toggleMenu}
          className="text-gray-600 hover:text-gray-800"
        >
          <BsThreeDotsVertical size={18} />
        </button>

        {isMenuOpen && (
          <div className="absolute left-1 z-10 mt-2 w-40 rounded-lg bg-white shadow-lg dark:bg-btndark">
            <ul className="py-2">
              {file.ready && (
                <li>
                  <button
                    className="flex gap-2 px-4 py-2 text-sm font-normal hover:text-primary"
                    onClick={() => {
                      downloadFile(file);
                      setIsMenuOpen(false);
                    }}
                  >
                    <IoDownloadOutline size={18} />
                    Download
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={() => {
                    handleRemoveFile(file.id);
                    setIsMenuOpen(false);
                  }}
                  className="flex gap-2 px-4 py-2 text-sm font-normal hover:text-red-600"
                >
                  <BsTrash size={18} /> Remove
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="mb-5 flex items-center justify-center rounded-full">
        <Image
          src={getFileTypeIcon(file.format.toLowerCase())}
          alt={`${file.format} icon`}
          width={60}
          height={60}
        />
      </div>

      <p className="text-center text-sm text-black dark:text-white">
        {" "}
        <Tooltip content={file.name}> {truncateFileName(file.name)} </Tooltip>
      </p>
      <p className="mt-2 flex flex-row gap-2 text-xs text-gray-500">
        {!file.ready && !file.isCompressed && !file.compressedContent && (
          <span>{formatFileSize(file.content.size)}</span>
        )}
        {file.ready && file.isCompressed && file.compressedContent && (
          <>
            <span className="ml-2 line-through opacity-30">
              {formatFileSize(file.content.size)}
            </span>{" "}
            →
            <span >
              {formatFileSize(file.compressedContent?.size)}
            </span>
          </>
        )}
      </p>

      <div className="absolute left-1 top-2 px-1">
        <FileStatusIcon file={file} sizeShift={sizeShift} />
      </div>

      {file.ready && file.isCompressed && sizeShift && (
        <div className="mt-2 flex items-center justify-center text-xs text-gray-600">
          {parseFloat(sizeShift) > 0 ? (
            <AiOutlineArrowDown className="mr-1 " />
          ) : (
            <AiOutlineArrowUp className="mr-1  " />
          )}
          <p className="text-center">{sizeShift}</p>
        </div>
      )}

      {file.hasError && (
        <div className="mt-2 flex flex-col items-center">
          <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-500">
            Error
          </span>
          <p className="mt-2 text-xs text-red-500">{file.error}</p>
        </div>
      )}
    </div>
  );
};

export default FileCard;
