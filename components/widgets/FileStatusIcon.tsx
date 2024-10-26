import { Tooltip } from "flowbite-react";
import { LuFileCheck, LuFileWarning, LuFileX , LuFile} from "react-icons/lu";

const FileStatusIcon = ({ file, sizeShift }) => {
  let icon ;
  let colorClass = "";
  let tooltipContent = "";

  if (file.error) {
    icon = <LuFileX size={18} />;
    colorClass = "text-red-500";
    tooltipContent = "An error occurred with this file. Please check and try again.";
  } else if (file.converting) {
    icon = (
      <svg
        className="h-5 w-5 animate-spin text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        ></path>
      </svg>
    );
    colorClass = "text-gray-500";
  } else if (file.ready && parseFloat(sizeShift) < 0) {
    icon = <LuFileWarning size={18} />;
    colorClass = "text-orange-500";
    tooltipContent = "Compression shift is negative, meaning the file has become larger. This file isn’t suitable for compression, so downloading isn’t recommended.";
  } else if (file.ready) {
    icon = <LuFileCheck size={18} />;
    colorClass = "text-green-500";
    tooltipContent = "File compression completed successfully.";

  } else {
    icon = <LuFile size={18} />;
    colorClass = "text-gray-500";
    tooltipContent = "The file has not been compressed.";

  }

  return (
    <Tooltip content={tooltipContent} placement="top">
      <span className={`text-sm font-semibold ${colorClass}`}>
        {icon}
      </span>
    </Tooltip>
  );
};

export default FileStatusIcon;
