import { Button } from "@/components/ui/button";
import { Images } from "lucide-react";

const placeholders = [
  "bg-muted",
  "bg-muted/80",
  "bg-muted/70",
  "bg-muted/60",
  "bg-muted/50",
];

const PhotoGallery = () => {
  return (
    <section className="container pb-8">
      <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[420px] md:h-[480px]">
        {/* Main large image */}
        <div className={`col-span-2 row-span-2 rounded-xl ${placeholders[0]} flex items-center justify-center overflow-hidden`}>
          <div className="text-muted-foreground text-sm flex flex-col items-center gap-2">
            <Images className="h-10 w-10" />
            <span>Фото объекта</span>
          </div>
        </div>

        {/* 4 smaller images */}
        {placeholders.slice(1).map((bg, i) => (
          <div
            key={i}
            className={`rounded-xl ${bg} flex items-center justify-center relative overflow-hidden`}
          >
            {i === 3 && (
              <Button
                variant="secondary"
                size="sm"
                className="absolute inset-0 w-full h-full rounded-xl bg-foreground/40 text-background hover:bg-foreground/50 font-medium"
              >
                Показать все
              </Button>
            )}
            {i !== 3 && (
              <span className="text-muted-foreground text-xs">Фото {i + 2}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PhotoGallery;
