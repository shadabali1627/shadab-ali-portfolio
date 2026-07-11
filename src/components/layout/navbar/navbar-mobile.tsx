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
        className="p-2 -mr-2 text-text-secondary hover:text-white transition-colors"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Fullscreen Overlay using Portal to escape header's containing block */}
      {mounted && createPortal(
        <div 
          className={`fixed inset-0 top-[64px] z-40 bg-[#050508]/98 backdrop-blur-xl transition-all duration-300 ease-in-out ${
            isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
          }`}
        >
          <div className="flex flex-col h-full p-6 pb-24 overflow-y-auto">
            <nav className="flex flex-col gap-6 mt-8">
              <a href="#about" onClick={closeMenu} className="text-2xl font-semibold text-text-primary hover:text-accent-indigo transition-colors">About</a>
              <a href="#projects" onClick={closeMenu} className="text-2xl font-semibold text-text-primary hover:text-accent-indigo transition-colors">Projects</a>
              <a href="#experience" onClick={closeMenu} className="text-2xl font-semibold text-text-primary hover:text-accent-indigo transition-colors">Experience</a>
              
              <div className="h-px w-full bg-border-default my-4"></div>
              
              <a href="#contact" onClick={closeMenu} className="flex justify-center items-center py-4 rounded-full font-semibold text-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all">
                Contact Me
              </a>

              {resumeData?.resumeFileUrl && (
                <a href={resumeData.resumeFileUrl} download onClick={closeMenu} className="flex justify-center items-center gap-2 py-4 rounded-full border border-border-default bg-bg-surface1 font-medium text-text-primary hover:text-accent-indigo transition-all">
                  <FileDown className="w-5 h-5" />
                  <span>Download Resume</span>
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
