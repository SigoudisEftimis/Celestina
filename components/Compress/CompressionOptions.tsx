import React from "react";
import { Button } from "flowbite-react";
import { AiOutlineLoading } from "react-icons/ai";
import { Checkbox, Label } from "flowbite-react";
import { UploadFile } from "@/types/uploadfile";
import { areAllFilesCompressed } from "@/utils/file.utils";
import CompressionLevels from "./CompressionLevels";
import { GrPowerReset } from "react-icons/gr";
const CompressionOptions: React.FC<{
  quality: string;
  setQuality: (quality: string) => void;
  excludeCompressed: boolean;
  setExcludeCompressed: (value: boolean) => void;
  allFileConverted: boolean;
  handleCompressFiles: () => void;
  handleResetFiles: () => void;
  files: UploadFile[];
}> = ({
  quality,
  setQuality,
  excludeCompressed,
  setExcludeCompressed,
  allFileConverted,
  handleCompressFiles,
  handleResetFiles ,
  files,
}) => {
  return (
    <div className="fixed right-0 md:right-4 top-22  h-full w-full sm:w-auto sm:border-l bg-alabaster p-5  sm:dark:border-black dark:bg-btndark">
      <h3 className="mb-4 text-sm">Compression Configuration</h3>
      <div className="flex h-5/6 flex-col justify-between">
        <div>
          <CompressionLevels quality={quality} setQuality={setQuality} />

          <div className="flex items-center rounded-md p-4">
            <Checkbox
              id="exclude-compressed"
              checked={excludeCompressed}
              onChange={() => setExcludeCompressed(!excludeCompressed)}
            />
            <Label
              htmlFor="exclude-compressed"
              className="ml-3 text-sm font-medium text-black dark:text-white"
            >
              Exclude already compressed files
            </Label>
          </div>
        </div>
        <div className="space-y-2 pb-5">
          <Button color="transparent" className="m-auto block border-none" size="xs"  onClick={handleResetFiles}>
            <GrPowerReset className="mr-2 h-4 w-4" /> Reset
          </Button>
          <Button
            className="mb-3 w-full"
            isProcessing={allFileConverted}
            disabled={excludeCompressed && areAllFilesCompressed(files)}
            processingSpinner={
              <AiOutlineLoading className="h-6 w-6 animate-spin" />
            }
            onClick={handleCompressFiles}
          >
            Compress
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompressionOptions;
