import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

interface ResponsiveSplitLayoutProps {
  main: React.ReactNode;
  bar: React.ReactNode;
}

const DashboardSplitLayout: React.FC<ResponsiveSplitLayoutProps> = ({
  main,
  bar
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Main Content */}
      <main >
        {main}
      </main>

      {/* Desktop Sidebar */}
      <aside className="hidden sm:block sm:w-1/4 h-full">
        <div className="h-full p-4 overflow-y-auto">
          {bar}
        </div>
      </aside>

      {/* Mobile/Tablet Bottom Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-black shadow-sm">
        {/* Collapsed State - Always Visible Bar */}
        <div 
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center justify-between p-4 cursor-pointer ${isExpanded ? 'hidden' : ''}`}
        >
          <div className="h-1 w-12 bg-gray-100 rounded-full" />
          <BsThreeDotsVertical className="h-5 w-5" />
        </div>

        {/* Expanded State */}
        <div 
          className={`absolute bottom-0 left-0 right-0 
            bg-white dark:bg-black
            transform transition-transform duration-300 ease-in-out
            ${isExpanded ? 'translate-y-0' : 'translate-y-full'}
            z-50
          `}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4">
            <div className="h-1 w-12 bg-gray-100 rounded-full" />
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <IoClose className="h-6 w-6" />
            </button>
          </div>

          {/* Expanded Content */}
          <div className="h-[70vh] overflow-y-scroll p-4">
            {bar}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSplitLayout;
