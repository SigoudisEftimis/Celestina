import React, { useState, useMemo, useEffect } from 'react';

// Define the props interface
interface FileFormatSelectorProps {
  uploadedFormat: string | null;
  onSelectedFormatChange: (format: string) => void;
  
}

// Define format categories
const formatsByType: Record<string, string[]> = {
  Image: ['JPG', 'JPEG', 'PNG', 'GIF', 'BMP'],
  Document: ['PDF', 'DOCX', 'HTML', 'EPUB'],
  EBook: ['EPUB', 'MOBI', 'AZW', 'PDF', 'FB2'],
  Font: ['TTF', 'OTF', 'WOFF', 'WOFF2'],
  Vector: ['SVG', 'AI', 'EPS', 'PDF'],
  CAD: ['DWG', 'DXF', 'IGES', 'STEP', 'STL'],
  Audio: ['MP3', 'WAV', 'AAC', 'FLAC', 'OGG'],
  Video: ['MP4', 'AVI', 'MOV', 'WEBM', 'MPEG'],
};

// Define types (categories)
const types = [
  { label: "Image", icon: "i-heroicons-photograph" },
  { label: "Document", icon: "i-heroicons-document-text" },
  { label: "EBook", icon: "i-heroicons-book-open" },
  { label: "Font", icon: "i-heroicons-font" },
  { label: "Vector", icon: "i-heroicons-chart-bar" },
  { label: "CAD", icon: "i-heroicons-cube" },
  { label: "Audio", icon: "i-heroicons-music-note" },
  { label: "Video", icon: "i-heroicons-video-camera" },
];

// Conversion map for related types
const conversionMap: Record<string, string[]> = {
  Image: ["Image", "Document", "EBook", "CAD"],
  Video: ["Video", "Audio", "Document"],
  Audio: ["Audio", "Document"],
  Document: ["Document", "EBook"],
  EBook: ["EBook", "Document"],
  Font: ["Font"],
  Vector: ["Vector", "Document"],
  CAD: ["CAD", "Document"],
};

// Main component
const FileFormatSelector: React.FC<FileFormatSelectorProps> = ({ uploadedFormat, onSelectedFormatChange}) => {
  const [activeTab, setActiveTab] = useState<{ label: string; index: number }>({ label: types[0].label, index: 0 }); // Set first tab as default
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);

  const getFormatType = (format: string): string | null => {
    return Object.keys(formatsByType).find((type) =>
      formatsByType[type].includes(format.toUpperCase())
    ) || null;
  };

  // Filter formats based on active tab and search query
  const filteredFormats = useMemo(() => {
    if (!activeTab) return [];
    const selectedTypeLabel = activeTab.label;
    const formatsForType = formatsByType[selectedTypeLabel] || [];
    return formatsForType.filter(format =>
      format.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeTab, searchQuery]);

  // Filter types based on the uploaded format
  const filteredTypes = useMemo(() => {
    if (!uploadedFormat) return types;
    const formatType = getFormatType(uploadedFormat);
    if (!formatType) return types;

    const relatedTypes = conversionMap[formatType] || [];
    return types.filter(type => relatedTypes.includes(type.label));
  }, [uploadedFormat]);

  // Handle uploaded format change
  useEffect(() => {
    if (uploadedFormat) {
      setSelectedFormat(null);
     
    }
  }, [uploadedFormat]);

  // Handle format selection
  const handleFormatSelect = (format: string) => {
    setSelectedFormat(format);
    onSelectedFormatChange(format);
  };

  return (
    <div className=" text-neutral-900 dark:bg-btndark text-sm">
      <div className="popover-panel">
        <div className="flex min-h-[200px]">
          <div className="flex flex-col w-[175px]">
            {filteredTypes.map((type, index) => (
              <div
                key={type.label}
                className={`px-3 py-2 cursor-pointer text-left flex gap-2 
                ${activeTab?.index === index ? 'font-bold text-gray-800 bg-gray-200' : 'text-gray-500 hover:bg-gray-100'}`}
                onClick={() => setActiveTab({ label: type.label, index })}
                onMouseOver={() => setActiveTab({ label: type.label, index })}
              >
                <span className="w-[60px]"> {type.label} </span>
                {activeTab?.index === index && <i className="icon-arrow-right" />}
              </div>
            ))}
          </div>

          <div className="w-full h-[280px] overflow-y-auto p-3">
            {activeTab && (
              <>
                <div className="mb-3">
                  <input
                    type="search"
                    placeholder="Search"
                    className="block w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {filteredFormats.map((format) => (
                    <div
                      key={format}
                      className={`px-3 py-2 cursor-pointer text-left border rounded-md flex items-center justify-center text-sm
                      ${selectedFormat === format ? 'font-bold text-black bg-gray-200' : 'text-gray-500 hover:bg-gray-100'}`}
                      onClick={() => handleFormatSelect(format)}
                    >
                      <span className="w-[60px]"> {format} </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileFormatSelector;
