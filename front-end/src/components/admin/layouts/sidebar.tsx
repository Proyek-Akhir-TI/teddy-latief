"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Home,
  FileText,
  List,
  Accessibility,
  Minus,
  Plus,
  User,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <aside
      className={`bg-gray-800 text-white w-64 min-h-screen p-4 fixed md:relative transition-transform duration-300 ${
        isOpen ? "transform-none" : "-translate-x-full md:translate-x-0"
      }`}
    >
      <div className="mb-8">
        <span className="font-bold text-2xl">Admin Dashboard</span>
      </div>
      <ul className="flex flex-col h-full">
        <div className="flex-grow">
          <li className="mb-4">
            <Link href="/admin" legacyBehavior>
              <a className="flex items-center p-2 hover:bg-gray-700 rounded">
                <Home className="mr-4" />
                Dashboard
              </a>
            </Link>
          </li>
          <li className="mb-4">
            <div className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
              <Link href="/admin/tempat-wisata" legacyBehavior>
                <a className="flex items-center w-full">
                  <List className="mr-4" />
                  Tempat Wisata
                </a>
              </Link>
              <button
                onClick={toggleDropdown}
                className="ml-auto focus:outline-none"
              >
                {isDropdownOpen ? <Minus /> : <Plus />}
              </button>
            </div>
            <div
              className={`transition-max-height duration-700 ease-in-out overflow-hidden ${
                isDropdownOpen ? "max-h-96" : "max-h-0"
              }`}
            >
              <ul className="pl-12 mt-2">
                <li className="mb-4">
                  <Link href="/admin/aksebilitas" legacyBehavior>
                    <a className="flex items-center p-2 hover:bg-gray-700 rounded">
                      <Accessibility className="mr-4" />
                      Aksebilitas
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="mb-4">
            <Link href="/admin/kriteria" legacyBehavior>
              <a className="flex items-center p-2 hover:bg-gray-700 rounded">
                <FileText className="mr-4" />
                Kriteria
              </a>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/admin/recommendation" legacyBehavior>
              <a className="flex items-center p-2 hover:bg-gray-700 rounded">
                <FileText className="mr-4" />
                Rekomendasi
              </a>
            </Link>
          </li>
        </div>
        <li className="mb-24">
          <Link href="#" legacyBehavior>
            <a className="flex items-center p-2 hover:bg-gray-700 rounded">
              <User className="mr-4" />
              Setting Profile
            </a>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
