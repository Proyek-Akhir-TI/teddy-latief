import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-400 text-black py-4">
      <div className="container mx-auto text-center">
        <p className="mb-2">© 2024 Wisata.in. All rights reserved.</p>
        <p className="mb-2">Follow us on:</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:text-gray-200">Facebook</a>
          <a href="#" className="hover:text-gray-200">Twitter</a>
          <a href="#" className="hover:text-gray-200">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
