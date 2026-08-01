import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Rss, Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111111] text-gray-400 py-16 px-8 md:px-16 border-t border-gray-800 mt-auto">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-gray-800">
          {/* Col 1: Brand & Editorial Quote */}
          <div className="md:col-span-5 space-y-4">
            <div className="font-bold text-white tracking-tight uppercase text-xl flex items-center gap-2">
              <span>VIDHU P VINOD</span>
              <span className="text-blue-500 font-editorial italic font-normal text-sm lowercase">/ perspectives</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md font-light">
              An online collection of essays, personal world views, mental models, and reflections on technology, human agency, and modern life.
            </p>
            <p className="text-gray-500 font-editorial italic text-xs pt-2">
              "Simple rules lead to complex behavior. High contrast leads to visual clarity."
            </p>
          </div>

          {/* Col 2: Navigation Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-white text-xs font-bold tracking-widest uppercase mb-4">Navigation</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Featured Essays</Link>
              </li>
              <li>
                <Link to="/topics" className="hover:text-white transition-colors">Topic Directories</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About & Personal Manifesto</Link>
              </li>
              <li>
                <a
                  href="https://vidhuvinod.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors inline-flex items-center gap-1 text-white font-medium"
                >
                  Main Portfolio Website <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Topics / Categories */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-white text-xs font-bold tracking-widest uppercase mb-4">Core Themes</p>
            <div className="flex flex-wrap gap-2">
              {['Technology', 'Philosophy', 'World Views', 'Mindset', 'Craftsmanship', 'Systems'].map((tag) => (
                <Link
                  key={tag}
                  to={`/topics#${tag.toLowerCase()}`}
                  className="text-xs bg-gray-900 border border-gray-800 text-gray-300 hover:text-white hover:border-gray-600 px-3 py-1.5 rounded transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div className="text-gray-500">
            © {new Date().getFullYear()} Vidhu P Vinod. All rights reserved. Designed with High-Fidelity Editorial Minimalism.
          </div>
          <div className="flex items-center gap-6 text-gray-400">
            <a
              href="https://vidhuvinod.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              Portfolio ↗
            </a>
            <a
              href="https://github.com/VidhuVi"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/vidhu-p-vinod/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
