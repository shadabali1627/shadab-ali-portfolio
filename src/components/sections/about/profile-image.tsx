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
    <div className="relative w-fit mx-auto">
      {/* Outer glow ring */}
      <div className="absolute -inset-1 rounded-2xl
                      bg-gradient-to-br from-[#6366f1] to-[#a855f7]
                      opacity-60 blur-sm" />

      {/* Animated border ring */}
      <div className="absolute -inset-[2px] rounded-2xl
                      bg-gradient-to-br from-[#6366f1] via-[#06b6d4] to-[#a855f7]
                      animate-spin-slow opacity-80" />

      {/* Image container */}
      <div className="relative rounded-2xl overflow-hidden
                      w-[320px] h-[380px] border border-white/10 bg-[#050508]">
        <Image
          src={urlForImage(image).width(320).height(380).url()}
          alt={image.alt ?? name}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className="object-cover"
          priority
        />

        {/* Subtle overlay gradient at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t
                        from-[#050508]/40 to-transparent" />
      </div>

      {/* Floating status badge on image */}
      {availableForWork && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2
                        flex items-center gap-2 px-4 py-2 rounded-full
                        bg-[#0f0f13] border border-white/10
                        backdrop-blur-sm whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-green-400
                           animate-pulse-dot" />
          <span className="text-xs font-mono text-[#94a3b8]
                           uppercase tracking-wider">
            Available for Work
          </span>
        </div>
      )}
    </div>
  )
}
