import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Upload, X, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  pageId: string;
  blockId: string;
  label?: string;
}

const ImageUploader = ({ value, onChange, pageId, blockId, label }: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${pageId}/${blockId}/${Date.now()}.${ext}`;

    const { error } = await supabase.storage.from("page-images").upload(path, file, { upsert: true });
    if (error) {
      toast.error("Ошибка загрузки: " + error.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("page-images").getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
    toast.success("Файл загружен");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) upload(file);
  };

  return (
    <div className="space-y-2">
      {label && <span className="text-xs font-medium text-muted-foreground">{label}</span>}
      {value ? (
        <div className="relative group rounded-lg overflow-hidden border">
          <img src={value} alt="" className="w-full h-32 object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : null}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className="w-full"
      >
        {uploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
        {uploading ? "Загрузка..." : value ? "Заменить" : "Загрузить фото"}
      </Button>
    </div>
  );
};

export default ImageUploader;

interface MultiImageUploaderProps {
  values: string[];
  onChange: (urls: string[]) => void;
  pageId: string;
  blockId: string;
  label?: string;
}

export const MultiImageUploader = ({ values, onChange, pageId, blockId, label }: MultiImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (files: FileList) => {
    setUploading(true);
    const newUrls: string[] = [];
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `${pageId}/${blockId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("page-images").upload(path, file, { upsert: true });
      if (error) {
        toast.error("Ошибка: " + error.message);
        continue;
      }
      const { data } = supabase.storage.from("page-images").getPublicUrl(path);
      newUrls.push(data.publicUrl);
    }
    onChange([...values, ...newUrls]);
    setUploading(false);
    if (newUrls.length) toast.success(`Загружено: ${newUrls.length}`);
  };

  const remove = (idx: number) => onChange(values.filter((_, i) => i !== idx));

  return (
    <div className="space-y-2">
      {label && <span className="text-xs font-medium text-muted-foreground">{label}</span>}
      {values.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {values.map((url, i) => (
            <div key={i} className="relative group rounded-lg overflow-hidden border">
              <img src={url} alt="" className="w-full h-20 object-cover" />
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => e.target.files && upload(e.target.files)} />
      <Button type="button" variant="outline" size="sm" disabled={uploading} onClick={() => inputRef.current?.click()} className="w-full">
        {uploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
        {uploading ? "Загрузка..." : "Добавить фото"}
      </Button>
    </div>
  );
};
