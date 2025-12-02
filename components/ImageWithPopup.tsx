"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageWithPopupProps {
    src: string;
    alt: string;
    className: string 
}

export default function ImageWithPopup({ src, alt, className }: ImageWithPopupProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Thumbnail */}
      <div className="cursor-pointer" onClick={() => setOpen(true)}>
        <Image
          src={src}
          alt={alt}
          className={className}
          fill
        />
      </div>

      {/* Fullscreen Modal */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-white/80 flex items-center justify-center z-[9999] p-4 cursor-pointer"
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
          />
        </div>
      )}
    </>
  );
}
