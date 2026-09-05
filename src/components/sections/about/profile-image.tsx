'use client'

import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'

interface ProfileImageProps {
  image: {
    asset: { _ref: string }
    alt?: string
    hotspot?: { x: number; y: number }
  }
  name: string
  availableForWork?: boolean
}

export function ProfileImage({ image, name, availableForWork = true }: ProfileImageProps) {
  if (!image) return null;
  
  return (
    <div className="relative w-fit mx-auto group">
      {/* Outer ambient glow */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-cyan-500/20 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Subtle border glow ring */}
      <div className="absolute -inset-[1.5px] rounded-[26px] bg-gradient-to-br from-indigo-500/40 via-cyan-500/30 to-purple-500/40 opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Image container inside Bento frame */}
      <div className="relative rounded-[24px] overflow-hidden w-[290px] sm:w-[320px] h-[350px] sm:h-[390px] border border-white/10 bg-[#07070b]/90 backdrop-blur-xl shadow-2xl">
        <Image
          src={urlForImage(image).width(340).height(410).url()}
          alt={image.alt ?? name}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          priority
        />

        {/* Inner vignette & depth gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/80 via-transparent to-black/10 pointer-events-none" />
      </div>

      {/* Floating status badge on image */}
      {availableForWork && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0c0c12]/95 border border-white/15 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)] whitespace-nowrap group-hover:border-emerald-500/40 transition-colors">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="text-[11px] font-mono font-medium text-slate-300 uppercase tracking-wider">
            Available for Work
          </span>
        </div>
      )}
    </div>
  )
}
