import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-500 p-4 flex justify-between items-center">
      <Link href="/" className="text-xl text-white font-bold">
        Wisata.in
      </Link>
      <nav className="space-x-4">
        <Link href="/tempat-wisata" className="text-white">
          Tempat Wisata
        </Link>
      </nav>
    </header>
  );
};

export default Header;