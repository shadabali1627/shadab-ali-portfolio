// STITCH PROJECT: 4229877773298364915
// MCP SYNC: PENDING — scaffold generated from spec
// Re-run import prompt after MCP connection is restored

import React from 'react';

interface FooterProps {
  settings?: any;
}

export function Footer({ settings }: FooterProps) {
  const title = settings?.title || "Portfolio";
  const socialLinks = settings?.socialLinks || [];

  return (
    <footer className="bg-bg-surface1 border-t border-border-default py-12">
      <div className="max-w-container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-text-primary">{title}</span>
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {socialLinks.map((link: any, idx: number) => (
            <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors capitalize">
              {link.platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
