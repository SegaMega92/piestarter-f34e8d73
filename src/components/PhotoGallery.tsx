import { Grid3X3 } from "lucide-react";
import imageSlide1 from "@/assets/image-slide1.png";
import imageSlide2 from "@/assets/image-slide2.png";
import imageSlide3 from "@/assets/image-slide3.png";
import imageSlide4 from "@/assets/image-slide4.png";
import imageSlide5 from "@/assets/image-slide5.png";
import playBtn from "@/assets/play-btn.svg";

const PhotoGallery = () => {
  return (
    <section className="flex gap-[23px] items-center justify-center">
      {/* Main Image */}
      <div className="h-[474px] overflow-hidden rounded-[40px] flex-1 min-w-0 cursor-pointer group">
        <img src={imageSlide1} alt="Фото объекта" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      {/* Grid Images */}
      <div className="flex flex-wrap gap-[30px] flex-1 min-w-0">
        <div className="h-[222px] overflow-hidden rounded-[40px] w-[calc(50%-15px)] cursor-pointer group">
          <img src={imageSlide2} alt="Фото 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="h-[222px] overflow-hidden rounded-[40px] w-[calc(50%-15px)] cursor-pointer group">
          <img src={imageSlide3} alt="Фото 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="h-[222px] overflow-hidden rounded-[40px] w-[calc(50%-15px)] relative cursor-pointer group">
          <img src={imageSlide4} alt="Фото 4" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[96px] h-[96px] rounded-full bg-white/80 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300">
              <img src={playBtn} alt="Play" className="w-10 h-10" />
            </div>
          </div>
        </div>
        <div className="h-[222px] overflow-hidden rounded-[40px] w-[calc(50%-15px)] relative cursor-pointer group">
          <img src={imageSlide5} alt="Фото 5" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 bg-white flex items-center gap-[10px] px-[30px] py-[18px] rounded-[30px] hover:shadow-lg transition-shadow">
            <Grid3X3 className="w-[24px] h-[24px] text-cyan-2" />
            <span className="font-semibold text-[18px] text-cyan-2 whitespace-nowrap">Показать все</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
