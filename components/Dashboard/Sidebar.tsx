"use client";

import React, { useState } from "react";
import Link from "next/link";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`transition-transform duration-300 bg-gray-800 text-white ${
        isOpen ? "w-64" : "w-16"
      } h-full`}
    >
      <div className="flex items-center justify-between p-4 ">
        <span className="text-xl font-semibold">Dashboard</span>
        <button
          className="block lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "<<" : ">>"}
        </button>
      </div>

      <ul className="p-4">
        <li >
          <Link href="/dashboard">Home</Link>
        </li>
        <li
          
        >
          <Link href="/dashboard/analytics">Analytics</Link>
        </li>
        <li
          
        >
          <Link href="/dashboard/settings">Settings</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
