import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUploader, { MultiImageUploader, GalleryImage } from "./ImageUploader";
import RichTextEditor from "./RichTextEditor";

interface Block {
  id: string;
  block_type: string;
  sort_order: number;
  enabled: boolean;
  content: Record<string, any>;
}

interface BlockEditorFormProps {
  block: Block;
  pageId: string;
  onUpdate: (field: string, value: any) => void;
}

const BlockEditorForm = ({ block, pageId, onUpdate }: BlockEditorFormProps) => {
  const content = block.content || {};

  switch (block.block_type) {
    case "PropertyHero":
      return (
        <div className="space-y-3">
          <Field label="Заголовок" value={content.title} onChange={(v) => onUpdate("title", v)} />
          <Field label="Подзаголовок" value={content.subtitle} onChange={(v) => onUpdate("subtitle", v)} />
          <Field label="Рейтинг" value={content.rating} onChange={(v) => onUpdate("rating", v)} />
          <ImageUploader value={content.image || ""} onChange={(v) => onUpdate("image", v)} pageId={pageId} blockId={block.id} label="Фоновое изображение" />
        </div>
      );
    case "PropertyStats":
      return (
        <div className="space-y-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="grid grid-cols-2 gap-2">
              <Field label={`Показатель ${i + 1}`} value={content[`stat_label_${i}`]} onChange={(v) => onUpdate(`stat_label_${i}`, v)} placeholder="Название" />
              <Field label="Значение" value={content[`stat_value_${i}`]} onChange={(v) => onUpdate(`stat_value_${i}`, v)} placeholder="Значение" />
            </div>
          ))}
        </div>
      );
    case "PhotoGallery": {
      // Normalize: support both old string[] and new GalleryImage[] format
      const imgs: GalleryImage[] = (content.images || []).map((item: any) =>
        typeof item === "string" ? { url: item, caption: "" } : item
      );
      return (
        <MultiImageUploader
          values={imgs}
          onChange={(v) => onUpdate("images", v)}
          pageId={pageId}
          blockId={block.id}
          label="Фотографии галереи"
        />
      );
    }
    case "PropertyDetails":
      return (
        <div className="space-y-3">
          <Field label="Цена за 1 пай" value={content.price} onChange={(v) => onUpdate("price", v)} placeholder="120 364₽" />
          <Field label="Ссылка на презентацию" value={content.presentation_url} onChange={(v) => onUpdate("presentation_url", v)} placeholder="https://..." />
          <RichTextEditor value={content.description_html || ""} onChange={(v) => onUpdate("description_html", v)} label="Описание" />
        </div>
      );
    case "LocationSection":
      return (
        <div className="space-y-3">
          <Field label="Заголовок" value={content.title} onChange={(v) => onUpdate("title", v)} />
          <Field label="Адрес" value={content.address} onChange={(v) => onUpdate("address", v)} />
          <Field label="Координаты (широта, долгота)" value={content.coordinates} onChange={(v) => onUpdate("coordinates", v)} placeholder="56.757702, 60.752964" />
          <RichTextEditor value={content.description_html || ""} onChange={(v) => onUpdate("description_html", v)} label="Описание" />
          <ImageUploader value={content.card1_image || ""} onChange={(v) => onUpdate("card1_image", v)} pageId={pageId} blockId={block.id} label="Изображение карточки 1" />
          <ImageUploader value={content.card2_image || ""} onChange={(v) => onUpdate("card2_image", v)} pageId={pageId} blockId={block.id} label="Изображение карточки 2" />
        </div>
      );
    default:
      return (
        <div className="space-y-3">
          <Field label="Заголовок" value={content.title} onChange={(v) => onUpdate("title", v)} />
          <RichTextEditor value={content.description_html || ""} onChange={(v) => onUpdate("description_html", v)} label="Описание" />
        </div>
      );
  }
};

const Field = ({ label, value, onChange, placeholder }: { label: string; value?: string; onChange: (v: string) => void; placeholder?: string }) => (
  <div className="space-y-1">
    <Label className="text-xs">{label}</Label>
    <Input value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
  </div>
);

export default BlockEditorForm;
