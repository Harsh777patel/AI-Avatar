"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Video } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  React.useEffect(() => {
    setIsLogged(!!localStorage.getItem('token'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const navLinks = [
    { name: 'Script Studio', href: '/script-studio' },
    { name: 'AI Assistant', href: '/virtual-assistant' },
    { name: 'Dashboard', href: '/dashboard' },
  ];

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 backdrop-blur-md bg-white/70 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-[#00c8f5] text-white p-2 rounded-xl">
                <Video size={24} />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-gray-900">
                AI Avatar
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex space-x-8">
              {isLogged && navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 hover:text-[#00c8f5] font-semibold transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center space-x-4 ml-4">
              {!isLogged ? (
                <>
                  <Link
                    href="/login"
                    className="text-gray-700 font-semibold hover:text-gray-900 transition-colors"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-[#00c8f5] hover:bg-[#00b5dd] text-white px-5 py-2.5 rounded-full font-bold transition-all shadow-md hover:shadow-lg"
                  >
                    Sign up free
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-full font-bold transition-all shadow-md hover:shadow-lg"
                >
                  Log out
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-[#00c8f5] hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <Link
                href="/login"
                className="w-full text-center py-3 border border-gray-300 rounded-full text-gray-700 font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="w-full text-center py-3 bg-[#00c8f5] text-white rounded-full font-bold"
                onClick={() => setIsOpen(false)}
              >
                Sign up free
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
