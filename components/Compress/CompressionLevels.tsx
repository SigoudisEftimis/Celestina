import React from "react";

const CompressionLevels: React.FC<{
  quality: string;
  setQuality: (quality: string) => void;
}> = ({ quality, setQuality }) => {
  const levels = [
    { id: "low", label: "Low", description: "Low quality, smallest size" },
    { id: "medium", label: "Medium", description: "Medium quality" },
    { id: "high", label: "High", description: "High quality for printing" },
    {
      id: "maximum",
      label: "Maximum",
      description: "Maximum quality, ideal for publishing",
    },
  ];

  return (
    <div className="w-full space-y-4 cursor-pointer ">
      
      {levels.map((level) => (
        <div
          key={level.id}
          onClick={() => setQuality(level.id)}
          className={`flex items-center rounded-md p-4   cursor-pointer bg-white dark:bg-black  ${
            quality === level.id ? "border border-teal-400" : "border dark:border-slate-800"
          }`}
        >
          <label
            htmlFor={level.id}
            className="ml-2 text-sm font-medium text-black dark:text-white"
          >
            {level.label}
            <span className="block text-xs text-gray-400">
              {level.description}
            </span>
          </label>
        </div>
      ))}
      <div />
    </div>
  );
};

export default CompressionLevels;
