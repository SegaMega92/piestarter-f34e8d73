import { useState, useCallback, useEffect } from "react";
import { Grid3X3, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import imageSlide1 from "@/assets/image-slide1.png";
import imageSlide2 from "@/assets/image-slide2.png";
import imageSlide3 from "@/assets/image-slide3.png";
import imageSlide4 from "@/assets/image-slide4.png";
import imageSlide5 from "@/assets/image-slide5.png";

const defaultImages = [
  { src: imageSlide1, alt: "Фото №1" },
  { src: imageSlide2, alt: "Фото №2" },
  { src: imageSlide3, alt: "Фото №3" },
  { src: imageSlide4, alt: "Фото №4" },
  { src: imageSlide5, alt: "Фото №5" },
];

interface PhotoGalleryProps {
  content?: Record<string, any>;
}

const PhotoGallery = ({ content }: PhotoGalleryProps) => {
  const rawImages = content?.images as any[] | undefined;
  const images = rawImages?.length
    ? rawImages.map((item, i) => {
        if (typeof item === "string") return { src: item, alt: `Фото ${i + 1}` };
        return { src: item.url, alt: item.caption || `Фото ${i + 1}` };
      })
    : defaultImages;

  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const openLightbox = (i: number) => setLightboxIdx(i);
  const closeLightbox = () => setLightboxIdx(null);
  const prev = useCallback(() => setLightboxIdx((c) => (c !== null ? (c - 1 + images.length) % images.length : null)), [images.length]);
  const next = useCallback(() => setLightboxIdx((c) => (c !== null ? (c + 1) % images.length : null)), [images.length]);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightboxIdx, prev, next]);

  const count = images.length;
  const preview = images.slice(0, 5);
  const hasMore = count > 5;

  const handleShowAll = () => setSheetOpen(true);

  // Adaptive grid based on image count
  const renderGrid = () => {
    if (count === 0) return null;

    if (count === 1) {
      return (
        <section>
          <div onClick={() => openLightbox(0)} className="h-[240px] sm:h-[340px] md:h-[474px] overflow-hidden rounded-[20px] md:rounded-[40px] w-full cursor-pointer group">
            <img src={images[0].src} alt={images[0].alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
        </section>
      );
    }

    if (count === 2) {
      return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[23px]">
          {images.map((img, i) => (
            <div key={i} onClick={() => openLightbox(i)} className="h-[240px] sm:h-[300px] md:h-[474px] overflow-hidden rounded-[20px] md:rounded-[40px] cursor-pointer group">
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </section>
      );
    }

    if (count === 3) {
      return (
        <section className="flex flex-col md:flex-row gap-[16px] md:gap-[23px]">
          <div onClick={() => openLightbox(0)} className="h-[240px] sm:h-[340px] md:h-[474px] overflow-hidden rounded-[20px] md:rounded-[40px] w-full md:flex-1 md:min-w-0 cursor-pointer group">
            <img src={images[0].src} alt={images[0].alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="flex flex-row md:flex-col gap-[12px] md:gap-[30px] w-full md:flex-1 md:min-w-0">
            {images.slice(1, 3).map((img, i) => (
              <div key={i} onClick={() => openLightbox(i + 1)} className="h-[160px] md:h-[222px] overflow-hidden rounded-[16px] md:rounded-[40px] flex-1 cursor-pointer group">
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </section>
      );
    }

    // 4+ photos: main + 2x2 grid (or partial)
    const sideImages = preview.slice(1);
    return (
      <section className="flex flex-col md:flex-row gap-[16px] md:gap-[23px] items-center justify-center">
        <div onClick={() => openLightbox(0)} className="h-[240px] sm:h-[340px] md:h-[474px] overflow-hidden rounded-[20px] md:rounded-[40px] w-full md:flex-1 md:min-w-0 cursor-pointer group">
          <img src={preview[0].src} alt={preview[0].alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="grid grid-cols-2 gap-[12px] md:gap-[30px] w-full md:flex-1 md:min-w-0">
          {sideImages.map((img, i) => {
            const isLast = i === sideImages.length - 1 && hasMore;
            return (
              <div
                key={i}
                onClick={() => isLast ? handleShowAll() : openLightbox(i + 1)}
                className="h-[120px] sm:h-[160px] md:h-[222px] overflow-hidden rounded-[16px] md:rounded-[40px] cursor-pointer group relative"
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {isLast && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="bg-white flex items-center gap-[8px] md:gap-[10px] px-[16px] md:px-[30px] py-[10px] md:py-[18px] rounded-[20px] md:rounded-[30px] hover:shadow-lg transition-shadow">
                      <Grid3X3 className="w-[18px] h-[18px] md:w-[24px] md:h-[24px] text-cyan-2" />
                      <span className="font-semibold text-[14px] md:text-[18px] text-cyan-2 whitespace-nowrap">+{count - 4} фото</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  return (
    <>
      {renderGrid()}

      {/* Sheet with all photos */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-[600px] overflow-y-auto p-0">
          <div className="p-4 border-b sticky top-0 bg-background z-10">
            <h3 className="font-semibold text-lg">Все фотографии ({count})</h3>
          </div>
          <div className="grid grid-cols-2 gap-2 p-4">
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => { setSheetOpen(false); setTimeout(() => openLightbox(i), 300); }}
                className="aspect-[4/3] overflow-hidden rounded-lg cursor-pointer group"
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Fullscreen Lightbox */}
      {lightboxIdx !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col animate-fade-in">
          <div className="flex items-center justify-between px-4 md:px-8 py-4 shrink-0">
            <span className="text-white/70 text-sm md:text-base">Фото {lightboxIdx + 1} из {count}</span>
            <button onClick={closeLightbox} className="text-white/70 hover:text-white transition-colors p-2">
              <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center relative min-h-0 px-4 md:px-16">
            <button onClick={prev} className="absolute left-2 md:left-6 z-10 text-white/60 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 md:p-3 transition-all">
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <img
              key={lightboxIdx}
              src={images[lightboxIdx].src}
              alt={images[lightboxIdx].alt}
              className="max-h-[calc(100vh-10rem)] max-w-full object-contain rounded-lg animate-scale-in"
            />
            <button onClick={next} className="absolute right-2 md:right-6 z-10 text-white/60 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 md:p-3 transition-all">
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>
          <div className="flex items-center justify-center gap-2 md:gap-3 py-4 px-4 shrink-0 overflow-x-auto">
            {images.map((img, i) => (
              <button key={i} onClick={() => setLightboxIdx(i)} className={`w-[60px] h-[44px] md:w-[80px] md:h-[60px] rounded-lg overflow-hidden shrink-0 border-2 transition-all ${i === lightboxIdx ? "border-white opacity-100 scale-105" : "border-transparent opacity-50 hover:opacity-80"}`}>
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
