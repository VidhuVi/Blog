import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Search, BookOpen, Compass, User, Menu, X } from 'lucide-react';

interface HeaderNavProps {
  onSearchClick?: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ onSearchClick }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-[#fafafa]/90 backdrop-blur-md border-b border-gray-100/80 transition-all">
      <nav className="flex justify-between items-center py-5 px-6 md:px-16 max-w-[1600px] mx-auto w-full">
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-[#111111] text-white flex items-center justify-center font-black text-xs tracking-tighter group-hover:bg-blue-600 transition-colors">
            VV
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight uppercase text-gray-900 group-hover:text-blue-600 transition-colors">
              VIDHU P VINOD
            </span>
            <span className="text-[10px] font-medium tracking-widest text-gray-400 uppercase -mt-1 font-editorial italic">
              Perspectives & Essays
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
          <Link
            to="/"
            className={`transition-colors py-1 flex items-center gap-1.5 ${isActive('/') ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : 'hover:text-gray-900'
              }`}
          >
            <BookOpen className="w-4 h-4" />
            Essays
          </Link>
          <Link
            to="/topics"
            className={`transition-colors py-1 flex items-center gap-1.5 ${isActive('/topics') ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : 'hover:text-gray-900'
              }`}
          >
            <Compass className="w-4 h-4" />
            Topics
          </Link>
          <Link
            to="/about"
            className={`transition-colors py-1 flex items-center gap-1.5 ${isActive('/about') ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : 'hover:text-gray-900'
              }`}
          >
            <User className="w-4 h-4" />
            About & Manifesto
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {onSearchClick && (
            <button
              onClick={onSearchClick}
              className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
              title="Search essays"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          <a
            href="https://vidhuvinod.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-300 text-gray-900 px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded hover:border-blue-600 hover:text-blue-600 transition-colors flex items-center gap-1.5"
          >
            Portfolio
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-3">
          {onSearchClick && (
            <button onClick={onSearchClick} className="p-2 text-gray-600">
              <Search className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-900 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block text-base font-medium ${isActive('/') ? 'text-blue-600 font-bold' : 'text-gray-700'}`}
          >
            Essays
          </Link>
          <Link
            to="/topics"
            onClick={() => setMobileMenuOpen(false)}
            className={`block text-base font-medium ${isActive('/topics') ? 'text-blue-600 font-bold' : 'text-gray-700'}`}
          >
            Topics & Categories
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className={`block text-base font-medium ${isActive('/about') ? 'text-blue-600 font-bold' : 'text-gray-700'}`}
          >
            About & Manifesto
          </Link>
          <hr className="border-gray-100" />
          <a
            href="https://vidhuvinod.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#111111] text-white py-3 text-center text-sm font-semibold rounded flex items-center justify-center gap-2"
          >
            Visit Portfolio ↗
          </a>
        </div>
      )}
    </header>
  );
};
