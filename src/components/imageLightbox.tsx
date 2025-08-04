'use client';

import { useState } from 'react';

type ImageLightboxProps = {
  images: { src: string; alt: string; title: string }[];
};

export default function ImageLightbox({ images }: ImageLightboxProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2">
        {images.map(({ src, alt, title }, i) => (
          <div
            key={i}
            className="bg-indigo-50 p-4 rounded-lg shadow-md cursor-pointer"
            onClick={() => setSelectedImage(src)}
          >
            <img src={src} alt={alt} className="w-full h-auto rounded mb-2" />
            <h2 className="text-lg font-semibold text-[#5a3e2b]">{title}</h2>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(251, 235, 212, .75)' }} // #fbebd4 with 60% opacity
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-3xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-black text-3xl font-bold hover:text-red-300"
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Enlarged comic"
              className="rounded max-h-[80vh] w-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
