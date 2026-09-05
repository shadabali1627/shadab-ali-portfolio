import React from 'react';
import Image from 'next/image';

interface GalleryImage {
  url: string;
  alt?: string;
  caption?: string;
}

interface GalleryData {
  title?: string;
  images?: GalleryImage[];
}

interface ImageGallerySectionProps {
  data?: GalleryData[];
}

export function ImageGallerySection({ data }: ImageGallerySectionProps) {
  if (!data || data.length === 0) return null;

  return (
    <section className="py-24 bg-[#030305] relative border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10">
        {data.map((gallery, idx) => (
          <div key={idx} className="mb-16 last:mb-0">
            {gallery.title && (
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-8">
                {gallery.title}
              </h2>
            )}
            
            {gallery.images && gallery.images.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gallery.images.map((img, imgIdx) => (
                  <div 
                    key={imgIdx} 
                    className="group relative aspect-square overflow-hidden rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl shadow-lg hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-500"
                  >
                    {img.url && (
                      <Image 
                        src={img.url} 
                        alt={img.alt || "Gallery Image"} 
                        fill 
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    )}
                    {img.caption && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 backdrop-blur-[2px]">
                        <span className="text-white text-xs sm:text-sm font-medium tracking-wide bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/15">
                          {img.caption}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
