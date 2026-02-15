import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Save, Plus, Trash2, GripVertical } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSettings {
  title: string;
  description: string;
}

const AdminFAQ = () => {
  const [items, setItems] = useState<FAQItem[]>([]);
  const [settings, setSettings] = useState<FAQSettings>({ title: "", description: "" });
  const [saving, setSaving] = useState(false);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data } = await supabase
      .from("site_settings")
      .select("*")
      .in("key", ["faq_items", "faq_settings"]);

    if (data) {
      const itemsRow = data.find((r) => r.key === "faq_items");
      const settingsRow = data.find((r) => r.key === "faq_settings");
      if (itemsRow) setItems(itemsRow.value as unknown as FAQItem[]);
      if (settingsRow) setSettings(settingsRow.value as unknown as FAQSettings);
    }
  };

  const save = async () => {
    setSaving(true);
    await Promise.all([
      supabase.from("site_settings").update({ value: items as any, updated_at: new Date().toISOString() }).eq("key", "faq_items"),
      supabase.from("site_settings").update({ value: settings as any, updated_at: new Date().toISOString() }).eq("key", "faq_settings"),
    ]);
    setSaving(false);
    toast.success("Сохранено");
  };

  const addItem = () => setItems([...items, { question: "", answer: "" }]);
  const removeItem = (idx: number) => setItems(items.filter((_, i) => i !== idx));
  const updateItem = (idx: number, field: keyof FAQItem, value: string) =>
    setItems(items.map((item, i) => (i === idx ? { ...item, [field]: value } : item)));

  const handleDragStart = (idx: number) => setDraggedIdx(idx);
  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === idx) return;
    const updated = [...items];
    const [moved] = updated.splice(draggedIdx, 1);
    updated.splice(idx, 0, moved);
    setItems(updated);
    setDraggedIdx(idx);
  };
  const handleDragEnd = () => setDraggedIdx(null);

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">FAQ — Вопросы и ответы</h1>
      </div>

      <div className="space-y-3 border rounded-lg p-4">
        <div className="space-y-1">
          <Label className="text-xs">Заголовок секции</Label>
          <Input value={settings.title} onChange={(e) => setSettings({ ...settings, title: e.target.value })} />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Описание</Label>
          <Textarea value={settings.description} onChange={(e) => setSettings({ ...settings, description: e.target.value })} rows={2} />
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            draggable
            onDragStart={() => handleDragStart(idx)}
            onDragOver={(e) => handleDragOver(e, idx)}
            onDragEnd={handleDragEnd}
            className={`border rounded-lg p-4 space-y-2 transition-colors ${draggedIdx === idx ? "border-primary" : "border-border"}`}
          >
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab shrink-0" />
              <span className="text-xs text-muted-foreground font-medium">Вопрос {idx + 1}</span>
              <Button variant="ghost" size="icon" className="ml-auto h-7 w-7" onClick={() => removeItem(idx)}>
                <Trash2 className="h-3.5 w-3.5 text-destructive" />
              </Button>
            </div>
            <Input value={item.question} onChange={(e) => updateItem(idx, "question", e.target.value)} placeholder="Вопрос" />
            <Textarea value={item.answer} onChange={(e) => updateItem(idx, "answer", e.target.value)} placeholder="Ответ" rows={2} />
          </div>
        ))}
      </div>

      <Button variant="outline" onClick={addItem} className="w-full">
        <Plus className="h-4 w-4 mr-2" /> Добавить вопрос
      </Button>

      {/* Sticky save bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="max-w-3xl mx-auto flex items-center justify-end px-4 py-3">
          <Button onClick={save} disabled={saving} size="sm">
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Сохранение..." : "Сохранить"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminFAQ;
