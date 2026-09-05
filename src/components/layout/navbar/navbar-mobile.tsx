"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, FileDown } from 'lucide-react';

interface NavbarMobileProps {
  resumeData?: any;
}

export function NavbarMobile({ resumeData }: NavbarMobileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden flex items-center">
      <button 
        onClick={toggleMenu}
        className="p-1.5 -mr-1 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Fullscreen Overlay using Portal to escape header's containing block */}
      {mounted && createPortal(
        <div 
          className={`fixed inset-0 top-0 z-40 bg-[#030305]/95 backdrop-blur-2xl transition-all duration-300 ease-in-out ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="flex flex-col h-full p-6 pt-24 pb-12 overflow-y-auto max-w-md mx-auto">
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Navigation</span>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available</span>
              </div>
            </div>

            <nav className="flex flex-col gap-4 mt-6">
              <a href="#about" onClick={closeMenu} className="px-4 py-3 rounded-2xl text-lg font-semibold text-white/90 hover:text-white hover:bg-white/[0.04] transition-colors">
                About
              </a>
              <a href="#skills" onClick={closeMenu} className="px-4 py-3 rounded-2xl text-lg font-semibold text-white/90 hover:text-white hover:bg-white/[0.04] transition-colors">
                Skills & Tech
              </a>
              <a href="#projects" onClick={closeMenu} className="px-4 py-3 rounded-2xl text-lg font-semibold text-white/90 hover:text-white hover:bg-white/[0.04] transition-colors">
                Projects
              </a>
              <a href="#experience" onClick={closeMenu} className="px-4 py-3 rounded-2xl text-lg font-semibold text-white/90 hover:text-white hover:bg-white/[0.04] transition-colors">
                Experience
              </a>
              <a href="#resume" onClick={closeMenu} className="px-4 py-3 rounded-2xl text-lg font-semibold text-white/90 hover:text-white hover:bg-white/[0.04] transition-colors">
                Resume & Credentials
              </a>
              
              <div className="h-px w-full bg-white/10 my-2"></div>
              
              <a 
                href="#contact" 
                onClick={closeMenu} 
                className="flex justify-center items-center py-3.5 rounded-full font-semibold text-sm bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all"
              >
                Get In Touch
              </a>

              {resumeData?.resumeFileUrl && (
                <a 
                  href={resumeData.resumeFileUrl} 
                  download 
                  onClick={closeMenu} 
                  className="flex justify-center items-center gap-2 py-3.5 rounded-full border border-white/10 bg-white/[0.03] font-mono text-xs text-white hover:bg-white/[0.06] transition-all"
                >
                  <FileDown className="w-4 h-4 text-indigo-400" />
                  <span>Download Resume PDF</span>
                </a>
              )}
            </nav>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
