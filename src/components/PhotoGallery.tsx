import { Play, Grid3X3 } from "lucide-react";

const PhotoGallery = () => {
  return (
    <section className="flex gap-[23px] items-center justify-center px-[70px]">
      {/* Main Image */}
      <div className="bg-muted h-[474px] overflow-hidden rounded-[40px] w-[625px] shrink-0 flex items-center justify-center">
        <span className="text-muted-foreground text-sm">Фото объекта</span>
      </div>
      {/* Grid Images */}
      <div className="flex flex-wrap gap-[30px] w-[624px]">
        <div className="bg-muted h-[222px] overflow-hidden rounded-[40px] w-[297px] flex items-center justify-center">
          <span className="text-muted-foreground text-xs">Фото 2</span>
        </div>
        <div className="bg-muted h-[222px] overflow-hidden rounded-[40px] w-[297px] flex items-center justify-center">
          <span className="text-muted-foreground text-xs">Фото 3</span>
        </div>
        <div className="bg-muted h-[222px] overflow-hidden rounded-[40px] w-[297px] relative flex items-center justify-center">
          <span className="text-muted-foreground text-xs">Фото 4</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[96px] h-[96px] rounded-full bg-white/80 flex items-center justify-center cursor-pointer">
              <Play className="w-10 h-10 text-cyan-2 fill-cyan-2" />
            </div>
          </div>
        </div>
        <div className="bg-muted h-[222px] overflow-hidden rounded-[40px] w-[297px] relative flex items-center justify-center">
          <span className="text-muted-foreground text-xs">Фото 5</span>
          <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 bg-white flex items-center gap-[10px] px-[30px] py-[18px] rounded-[30px] cursor-pointer">
            <Grid3X3 className="w-[24px] h-[24px] text-cyan-2" />
            <span className="font-semibold text-[18px] text-cyan-2 whitespace-nowrap">Показать все</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
