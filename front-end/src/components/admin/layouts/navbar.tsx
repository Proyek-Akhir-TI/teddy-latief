'use client';
import React, { useState } from 'react';
import { Menu, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('isLoggedIn');
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Menu className="mr-4 cursor-pointer md:hidden" onClick={toggleSidebar} />
      </div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search"
          className="border rounded p-2 mr-4"
        />
        <div className="relative">
          <img
            src="/path/to/profile-pic.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          />
          <span className="absolute bottom-0 right-0 bg-green-500 h-3 w-3 rounded-full"></span>
          
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                <LogOut className="inline-block mr-2" size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;