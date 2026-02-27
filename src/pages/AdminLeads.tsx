import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2, RefreshCw } from "lucide-react";

interface Lead {
  id: string;
  source: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  message: string | null;
  page_slug: string | null;
  created_at: string;
}

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    setLeads((data as Lead[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, []);

  const deleteLead = async (id: string) => {
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (error) { toast.error("Ошибка удаления"); return; }
    setLeads((prev) => prev.filter((l) => l.id !== id));
    toast.success("Заявка удалена");
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const sourceLabels: Record<string, string> = {
    contact_form: "Контактная форма",
    buy_form: "Купить паи",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Заявки</h1>
        <Button variant="outline" size="sm" onClick={fetchLeads} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-1 ${loading ? "animate-spin" : ""}`} />
          Обновить
        </Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Загрузка...</p>
      ) : leads.length === 0 ? (
        <p className="text-muted-foreground py-12 text-center">Заявок пока нет</p>
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => (
            <div key={lead.id} className="border rounded-lg p-4 bg-card flex flex-col sm:flex-row gap-3 sm:items-start">
              <div className="flex-1 space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs bg-muted px-2 py-0.5 rounded font-medium">
                    {sourceLabels[lead.source] || lead.source}
                  </span>
                  <span className="text-xs text-muted-foreground">{formatDate(lead.created_at)}</span>
                  {lead.page_slug && (
                    <span className="text-xs text-muted-foreground">• {lead.page_slug}</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  {lead.name && <span><strong>Имя:</strong> {lead.name}</span>}
                  {lead.phone && <span><strong>Тел:</strong> {lead.phone}</span>}
                  {lead.email && <span><strong>Email:</strong> {lead.email}</span>}
                </div>
                {lead.message && (
                  <p className="text-sm text-muted-foreground">{lead.message}</p>
                )}
              </div>
              <Button variant="ghost" size="icon" className="shrink-0" onClick={() => deleteLead(lead.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminLeads;
