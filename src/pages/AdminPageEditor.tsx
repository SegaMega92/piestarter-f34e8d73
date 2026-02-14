import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, Save, GripVertical, Eye } from "lucide-react";

interface PageData {
  id: string;
  slug: string;
  title: string;
  status: string;
}

interface Block {
  id: string;
  block_type: string;
  sort_order: number;
  enabled: boolean;
  content: Record<string, any>;
}

const BLOCK_LABELS: Record<string, string> = {
  PropertyHero: "Главный баннер",
  PropertyStats: "Статистика",
  PhotoGallery: "Фотогалерея",
  PropertyDetails: "Детали объекта",
  LocationSection: "Локация",
  FinancialSection: "Финансы",
  SimilarProperties: "Похожие объекты",
  FAQSection: "FAQ",
  ContactForm: "Контактная форма",
};

const AdminPageEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState<PageData | null>(null);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [activeBlock, setActiveBlock] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;
    loadData();
  }, [id]);

  const loadData = async () => {
    const [{ data: pageData }, { data: blocksData }] = await Promise.all([
      supabase.from("pages").select("*").eq("id", id!).single(),
      supabase.from("page_blocks").select("*").eq("page_id", id!).order("sort_order"),
    ]);
    if (pageData) setPage(pageData as PageData);
    if (blocksData) setBlocks(blocksData as Block[]);
  };

  const savePage = async () => {
    if (!page) return;
    setSaving(true);
    await supabase.from("pages").update({ title: page.title, slug: page.slug, status: page.status }).eq("id", page.id);

    for (const block of blocks) {
      await supabase
        .from("page_blocks")
        .update({ sort_order: block.sort_order, enabled: block.enabled, content: block.content })
        .eq("id", block.id);
    }
    setSaving(false);
    toast.success("Сохранено");
  };

  const toggleBlock = (blockId: string, enabled: boolean) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === blockId ? { ...b, enabled } : b))
    );
  };

  const handleDragStart = (idx: number) => setDraggedIdx(idx);
  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === idx) return;
    const updated = [...blocks];
    const [moved] = updated.splice(draggedIdx, 1);
    updated.splice(idx, 0, moved);
    updated.forEach((b, i) => (b.sort_order = i));
    setBlocks(updated);
    setDraggedIdx(idx);
  };
  const handleDragEnd = () => setDraggedIdx(null);

  const updateBlockContent = (blockId: string, field: string, value: any) => {
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === blockId ? { ...b, content: { ...b.content, [field]: value } } : b
      )
    );
  };

  const activeBlockData = blocks.find((b) => b.id === activeBlock);

  if (!page) return <p className="text-muted-foreground">Загрузка...</p>;

  return (
    <div className="space-y-4">
      {/* Top bar */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate("/admin")}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Назад
        </Button>
        <div className="flex-1 flex items-center gap-3">
          <Input
            value={page.title}
            onChange={(e) => setPage({ ...page, title: e.target.value })}
            className="max-w-xs font-semibold"
          />
          <Input
            value={page.slug}
            onChange={(e) => setPage({ ...page, slug: e.target.value })}
            className="max-w-[200px] text-sm"
            placeholder="slug"
          />
          <div className="flex items-center gap-2">
            <Switch
              checked={page.status === "published"}
              onCheckedChange={(checked) =>
                setPage({ ...page, status: checked ? "published" : "draft" })
              }
            />
            <Label className="text-sm">{page.status === "published" ? "Опубликован" : "Черновик"}</Label>
          </div>
        </div>
        <Button onClick={savePage} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Сохранение..." : "Сохранить"}
        </Button>
        {page.status === "published" && (
          <Button variant="outline" size="sm" asChild>
            <a href={`/objects/${page.slug}`} target="_blank" rel="noopener">
              <Eye className="h-4 w-4 mr-1" /> Просмотр
            </a>
          </Button>
        )}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
        {/* Left: blocks panel */}
        <div className="space-y-3">
          <h2 className="font-semibold text-foreground">Блоки</h2>
          <div className="space-y-1">
            {blocks.map((block, idx) => (
              <div
                key={block.id}
                draggable
                onDragStart={() => handleDragStart(idx)}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDragEnd={handleDragEnd}
                onClick={() => setActiveBlock(block.id === activeBlock ? null : block.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-colors ${
                  activeBlock === block.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-muted/50"
                } ${!block.enabled ? "opacity-50" : ""}`}
              >
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab shrink-0" />
                <span className="flex-1 text-sm font-medium">
                  {BLOCK_LABELS[block.block_type] || block.block_type}
                </span>
                <Switch
                  checked={block.enabled}
                  onCheckedChange={(checked) => {
                    toggleBlock(block.id, checked);
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            ))}
          </div>

          {/* Block editor form */}
          {activeBlockData && (
            <div className="border rounded-lg p-4 space-y-3 mt-4">
              <h3 className="font-semibold text-sm">
                {BLOCK_LABELS[activeBlockData.block_type]}
              </h3>
              <BlockEditorForm
                block={activeBlockData}
                onUpdate={(field, value) => updateBlockContent(activeBlockData.id, field, value)}
              />
            </div>
          )}
        </div>

        {/* Right: preview placeholder */}
        <div className="border rounded-lg bg-muted/30 min-h-[600px] flex items-center justify-center">
          <p className="text-muted-foreground text-sm">
            Предпросмотр будет доступен после сохранения и публикации
          </p>
        </div>
      </div>
    </div>
  );
};

// Simple block editor form
const BlockEditorForm = ({
  block,
  onUpdate,
}: {
  block: Block;
  onUpdate: (field: string, value: any) => void;
}) => {
  const content = block.content || {};

  switch (block.block_type) {
    case "PropertyHero":
      return (
        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs">Заголовок</Label>
            <Input value={content.title || ""} onChange={(e) => onUpdate("title", e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Подзаголовок</Label>
            <Input value={content.subtitle || ""} onChange={(e) => onUpdate("subtitle", e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Рейтинг</Label>
            <Input value={content.rating || ""} onChange={(e) => onUpdate("rating", e.target.value)} />
          </div>
        </div>
      );
    case "PropertyStats":
      return (
        <div className="space-y-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-xs">Показатель {i + 1}</Label>
                <Input
                  value={content[`stat_label_${i}`] || ""}
                  onChange={(e) => onUpdate(`stat_label_${i}`, e.target.value)}
                  placeholder="Название"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Значение</Label>
                <Input
                  value={content[`stat_value_${i}`] || ""}
                  onChange={(e) => onUpdate(`stat_value_${i}`, e.target.value)}
                  placeholder="Значение"
                />
              </div>
            </div>
          ))}
        </div>
      );
    case "PropertyDetails":
      return (
        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs">Цена за 1 пай</Label>
            <Input
              value={content.price || ""}
              onChange={(e) => onUpdate("price", e.target.value)}
              placeholder="120 364₽"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Ссылка на презентацию</Label>
            <Input
              value={content.presentation_url || ""}
              onChange={(e) => onUpdate("presentation_url", e.target.value)}
              placeholder="https://..."
            />
          </div>
        </div>
      );
    case "FAQSection":
      return (
        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs">Заголовок секции</Label>
            <Input value={content.title || ""} onChange={(e) => onUpdate("title", e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Описание</Label>
            <Input value={content.description || ""} onChange={(e) => onUpdate("description", e.target.value)} />
          </div>
          <p className="text-xs text-muted-foreground">Управление вопросами будет добавлено позже</p>
        </div>
      );
    case "ContactForm":
      return (
        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs">Заголовок</Label>
            <Input value={content.title || ""} onChange={(e) => onUpdate("title", e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Телефон</Label>
            <Input value={content.phone || ""} onChange={(e) => onUpdate("phone", e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Email</Label>
            <Input value={content.email || ""} onChange={(e) => onUpdate("email", e.target.value)} />
          </div>
        </div>
      );
    default:
      return (
        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs">Заголовок</Label>
            <Input value={content.title || ""} onChange={(e) => onUpdate("title", e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Описание</Label>
            <Input value={content.description || ""} onChange={(e) => onUpdate("description", e.target.value)} />
          </div>
        </div>
      );
  }
};

export default AdminPageEditor;
