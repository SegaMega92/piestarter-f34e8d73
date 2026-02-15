import { useState, useCallback, useEffect } from "react";
import { Grid3X3, X, ChevronLeft, ChevronRight } from "lucide-react";
import imageSlide1 from "@/assets/image-slide1.png";
import imageSlide2 from "@/assets/image-slide2.png";
import imageSlide3 from "@/assets/image-slide3.png";
import imageSlide4 from "@/assets/image-slide4.png";
import imageSlide5 from "@/assets/image-slide5.png";

const defaultImages = [
  { src: imageSlide1, alt: "Фото №1", caption: "Фото №1 — Общий вид объекта" },
  { src: imageSlide2, alt: "Фото №2", caption: "Фото №2 — Вид сбоку" },
  { src: imageSlide3, alt: "Фото №3", caption: "Фото №3 — Территория" },
  { src: imageSlide4, alt: "Фото №4", caption: "Фото №4 — Внутреннее пространство" },
  { src: imageSlide5, alt: "Фото №5", caption: "Фото №5 — Окружение" },
];

interface PhotoGalleryProps {
  content?: Record<string, any>;
}

const PhotoGallery = ({ content }: PhotoGalleryProps) => {
  const dynamicImages = content?.images as string[] | undefined;
  const images = dynamicImages?.length
    ? dynamicImages.map((src, i) => ({ src, alt: `Фото ${i + 1}`, caption: `Фото ${i + 1}` }))
    : defaultImages;

  const [lightbox, setLightbox] = useState<number | null>(null);

  const open = (i: number) => setLightbox(i);
  const close = () => setLightbox(null);
  const prev = useCallback(() => setLightbox((c) => (c !== null ? (c - 1 + images.length) % images.length : null)), [images.length]);
  const next = useCallback(() => setLightbox((c) => (c !== null ? (c + 1) % images.length : null)), [images.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightbox, prev, next]);

  const displayImages = images.slice(0, 5);

  return (
    <>
      <section className="flex flex-col md:flex-row gap-[16px] md:gap-[23px] items-center justify-center">
        {/* Main Image */}
        <div onClick={() => open(0)} className="h-[240px] sm:h-[340px] md:h-[474px] overflow-hidden rounded-[20px] md:rounded-[40px] w-full md:flex-1 md:min-w-0 cursor-pointer group">
          <img src={displayImages[0]?.src} alt="Фото объекта" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        {/* Grid Images */}
        {displayImages.length > 1 && (
          <div className="grid grid-cols-2 gap-[12px] md:gap-[30px] w-full md:flex-1 md:min-w-0">
            {displayImages.slice(1, 5).map((img, i) => (
              <div key={i} onClick={() => open(i + 1)} className="h-[120px] sm:h-[160px] md:h-[222px] overflow-hidden rounded-[16px] md:rounded-[40px] cursor-pointer group relative">
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {i === 3 && images.length > 5 && (
                  <div className="absolute bottom-[10px] md:bottom-[20px] left-1/2 -translate-x-1/2 bg-white flex items-center gap-[8px] md:gap-[10px] px-[16px] md:px-[30px] py-[10px] md:py-[18px] rounded-[20px] md:rounded-[30px] hover:shadow-lg transition-shadow">
                    <Grid3X3 className="w-[18px] h-[18px] md:w-[24px] md:h-[24px] text-cyan-2" />
                    <span className="font-semibold text-[14px] md:text-[18px] text-cyan-2 whitespace-nowrap">Показать все</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col animate-fade-in">
          <div className="flex items-center justify-between px-4 md:px-8 py-4 shrink-0">
            <span className="text-white/70 text-sm md:text-base">Фото {lightbox + 1} из {images.length}</span>
            <button onClick={close} className="text-white/70 hover:text-white transition-colors p-2"><X className="w-6 h-6 md:w-8 md:h-8" /></button>
          </div>
          <div className="flex-1 flex items-center justify-center relative min-h-0 px-4 md:px-16">
            <button onClick={prev} className="absolute left-2 md:left-6 z-10 text-white/60 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 md:p-3 transition-all">
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <div className="flex flex-col items-center gap-3">
              <img key={lightbox} src={images[lightbox].src} alt={images[lightbox].alt} className="max-h-[calc(100%-2rem)] max-w-full object-contain rounded-lg animate-scale-in" />
              {images[lightbox].caption && <span className="text-white/70 text-sm md:text-base">{images[lightbox].caption}</span>}
            </div>
            <button onClick={next} className="absolute right-2 md:right-6 z-10 text-white/60 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 md:p-3 transition-all">
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>
          <div className="flex items-center justify-center gap-2 md:gap-3 py-4 px-4 shrink-0 overflow-x-auto">
            {images.map((img, i) => (
              <button key={i} onClick={() => setLightbox(i)} className={`w-[60px] h-[44px] md:w-[80px] md:h-[60px] rounded-lg overflow-hidden shrink-0 border-2 transition-all ${i === lightbox ? "border-white opacity-100 scale-105" : "border-transparent opacity-50 hover:opacity-80"}`}>
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoGallery;
