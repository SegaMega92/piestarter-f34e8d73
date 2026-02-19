import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, Save, GripVertical, Eye, ChevronDown, Check, AlertCircle } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import BlockEditorForm from "@/components/admin/BlockEditorForm";

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
  LocationSection: "Локация (карта)",
  LocationAdvantages: "Локация (карточки преимуществ)",
  FinancialSection: "Финансы",
  SimilarProperties: "Похожие объекты",
};

const AdminPageEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState<PageData | null>(null);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const initialLoadDone = useRef(false);

  // Warn on page close if unsaved
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (dirty) { e.preventDefault(); }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

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
    initialLoadDone.current = true;
    setDirty(false);
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
    setDirty(false);
    setLastSaved(new Date());
    toast.success("Сохранено");
  };

  // Mark dirty on any page/block change after initial load
  useEffect(() => {
    if (initialLoadDone.current) setDirty(true);
  }, [page, blocks]);

  const toggleBlock = (blockId: string, enabled: boolean) => {
    setBlocks((prev) => prev.map((b) => (b.id === blockId ? { ...b, enabled } : b)));
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

  if (!page) return <p className="text-muted-foreground">Загрузка...</p>;

  return (
    <div className="space-y-4 max-w-4xl mx-auto pb-20">
      {/* Top bar */}
      <div className="flex items-center gap-4 flex-wrap">
        <Button variant="ghost" size="sm" onClick={() => navigate("/admin")}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Назад
        </Button>
        <div className="flex-1 flex items-center gap-3 flex-wrap">
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
        {page.status === "published" && (
          <Button variant="outline" size="sm" asChild>
            <a href={`/objects/${page.slug}`} target="_blank" rel="noopener">
              <Eye className="h-4 w-4 mr-1" /> Просмотр
            </a>
          </Button>
        )}
      </div>

      {/* Sticky save bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="max-w-4xl mx-auto flex items-center gap-3 px-4 py-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground flex-1">
            {dirty ? (
              <>
                <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                <span className="text-amber-600">Есть несохранённые изменения</span>
              </>
            ) : (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                <span>Все изменения сохранены</span>
              </>
            )}
            {lastSaved && (
              <span className="ml-auto mr-3">Последнее сохранение: {lastSaved.toLocaleTimeString("ru-RU")}</span>
            )}
          </div>
          <Button onClick={savePage} disabled={saving} size="sm">
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Сохранение..." : "Сохранить"}
          </Button>
        </div>
      </div>

      {/* Blocks accordion */}
      <div className="space-y-2">
        {blocks.map((block, idx) => (
          <div
            key={block.id}
            draggable
            onDragStart={() => handleDragStart(idx)}
            onDragOver={(e) => handleDragOver(e, idx)}
            onDragEnd={handleDragEnd}
            className={`border rounded-lg transition-colors ${!block.enabled ? "opacity-50" : ""} ${
              draggedIdx === idx ? "border-primary" : "border-border"
            }`}
          >
            <Collapsible defaultOpen>
              <div className="flex items-center gap-2 px-4 py-3">
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab shrink-0" />
                <CollapsibleTrigger className="flex-1 flex items-center gap-2 text-left">
                  <span className="font-medium text-sm">{BLOCK_LABELS[block.block_type] || block.block_type}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform [[data-state=open]>&]:rotate-180" />
                </CollapsibleTrigger>
                <Switch
                  checked={block.enabled}
                  onCheckedChange={(checked) => toggleBlock(block.id, checked)}
                />
              </div>
              <CollapsibleContent>
                <div className="px-4 pb-4 pt-1">
                  <BlockEditorForm
                    block={block}
                    pageId={page.id}
                    onUpdate={(field, value) => updateBlockContent(block.id, field, value)}
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPageEditor;
