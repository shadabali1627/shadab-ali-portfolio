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
    <section className="py-24 bg-[#050508] relative">
      <div className="max-w-[1200px] mx-auto px-6">
        {data.map((gallery, idx) => (
          <div key={idx} className="mb-16 last:mb-0">
            {gallery.title && (
              <h2 className="text-2xl font-black tracking-tight text-white mb-8">
                {gallery.title}
              </h2>
            )}
            
            {gallery.images && gallery.images.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gallery.images.map((img, imgIdx) => (
                  <div key={imgIdx} className="group relative aspect-square overflow-hidden rounded-2xl bg-[#0f0f13] border border-white/5">
                    {img.url && (
                      <Image 
                        src={img.url} 
                        alt={img.alt || "Gallery Image"} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    {img.caption && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <p className="text-white text-sm font-medium">{img.caption}</p>
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
