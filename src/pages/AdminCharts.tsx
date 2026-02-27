import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import ChartDataEditor from "@/components/admin/ChartDataEditor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PageOption {
  id: string;
  title: string;
  slug: string;
}

interface ChartPoint {
  month: string;
  value: number;
}

interface FinancialContent {
  income_data?: ChartPoint[];
  value_data?: ChartPoint[];
  turnover_data?: ChartPoint[];
  buy_url?: string;
  contact_url?: string;
}

const AdminCharts = () => {
  const [pages, setPages] = useState<PageOption[]>([]);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [blockId, setBlockId] = useState<string | null>(null);
  const [content, setContent] = useState<FinancialContent>({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch all pages
  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("pages")
        .select("id, title, slug")
        .order("created_at", { ascending: false });
      setPages((data as PageOption[]) || []);
      if (data?.length) setSelectedPageId(data[0].id);
      setLoading(false);
    };
    load();
  }, []);

  // Fetch FinancialSection block for selected page
  useEffect(() => {
    if (!selectedPageId) return;
    const load = async () => {
      const { data } = await supabase
        .from("page_blocks")
        .select("id, content")
        .eq("page_id", selectedPageId)
        .eq("block_type", "FinancialSection")
        .maybeSingle();
      if (data) {
        setBlockId(data.id);
        setContent((data.content as unknown as FinancialContent) || {});
      } else {
        setBlockId(null);
        setContent({});
      }
    };
    load();
  }, [selectedPageId]);

  const updateField = (field: string, value: any) => {
    setContent((prev) => ({ ...prev, [field]: value }));
  };

  const save = async () => {
    if (!blockId) {
      toast.error("Блок «Финансы» не найден для этого объекта. Добавьте его в редакторе страницы.");
      return;
    }
    setSaving(true);
    const { error } = await supabase
      .from("page_blocks")
      .update({ content: content as any })
      .eq("id", blockId);
    if (error) toast.error("Ошибка сохранения");
    else toast.success("Графики сохранены");
    setSaving(false);
  };

  if (loading) return <p className="text-muted-foreground">Загрузка...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Графики</h1>
        <Button onClick={save} disabled={saving || !blockId}>
          <Save className="h-4 w-4 mr-1" />
          {saving ? "Сохранение..." : "Сохранить"}
        </Button>
      </div>

      {/* Page selector as tabs */}
      {pages.length === 0 ? (
        <p className="text-muted-foreground">Нет объектов</p>
      ) : (
        <>
          <div className="flex flex-wrap gap-2">
            {pages.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPageId(p.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                  selectedPageId === p.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:text-foreground"
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>

          {!blockId && selectedPageId && (
            <div className="border border-destructive/30 bg-destructive/5 rounded-lg p-4">
              <p className="text-sm text-destructive">
                У этого объекта нет блока «Финансы». Добавьте его через редактор страницы.
              </p>
            </div>
          )}

          {blockId && (
            <div className="space-y-4">
              <ChartDataEditor
                incomeData={content.income_data || []}
                valueData={content.value_data || []}
                turnoverData={content.turnover_data || []}
                onIncomeChange={(v) => updateField("income_data", v)}
                onValueChange={(v) => updateField("value_data", v)}
                onTurnoverChange={(v) => updateField("turnover_data", v)}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs">Ссылка «Купить паи»</Label>
                  <Input
                    value={content.buy_url || ""}
                    onChange={(e) => updateField("buy_url", e.target.value)}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Ссылка «Связаться с менеджером»</Label>
                  <Input
                    value={content.contact_url || ""}
                    onChange={(e) => updateField("contact_url", e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminCharts;
