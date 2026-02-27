import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

interface ChartPoint {
  month: string;
  value: number;
}

interface ChartDataEditorProps {
  incomeData: ChartPoint[];
  valueData: ChartPoint[];
  turnoverData: ChartPoint[];
  onIncomeChange: (data: ChartPoint[]) => void;
  onValueChange: (data: ChartPoint[]) => void;
  onTurnoverChange: (data: ChartPoint[]) => void;
}

const TAB_CONFIG = [
  { key: "income", label: "Доход на пай" },
  { key: "value", label: "Стоимость пая" },
  { key: "turnover", label: "Оборот паев" },
] as const;

const ChartDataEditor = ({
  incomeData,
  valueData,
  turnoverData,
  onIncomeChange,
  onValueChange,
  onTurnoverChange,
}: ChartDataEditorProps) => {
  const [activeTab, setActiveTab] = useState("income");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getDataAndSetter = (tab: string) => {
    switch (tab) {
      case "income": return { data: incomeData, setter: onIncomeChange };
      case "value": return { data: valueData, setter: onValueChange };
      case "turnover": return { data: turnoverData, setter: onTurnoverChange };
      default: return { data: incomeData, setter: onIncomeChange };
    }
  };

  const addRow = (tab: string) => {
    const { data, setter } = getDataAndSetter(tab);
    setter([...data, { month: "", value: 0 }]);
  };

  const removeRow = (tab: string, index: number) => {
    const { data, setter } = getDataAndSetter(tab);
    setter(data.filter((_, i) => i !== index));
  };

  const updateRow = (tab: string, index: number, field: "month" | "value", val: string) => {
    const { data, setter } = getDataAndSetter(tab);
    const updated = data.map((row, i) =>
      i === index ? { ...row, [field]: field === "value" ? Number(val) || 0 : val } : row
    );
    setter(updated);
  };

  const handleImportXLS = async (tab: string) => {
    fileInputRef.current?.click();
    // Store which tab triggered the import
    fileInputRef.current?.setAttribute("data-tab", tab);
  };

  const onFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const tab = fileInputRef.current?.getAttribute("data-tab") || activeTab;

    try {
      const XLSX = await import("xlsx");
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Skip header row if first cell looks like a header
      const startIdx = rows.length > 0 && typeof rows[0][0] === "string" && isNaN(Number(rows[0][0])) ? 1 : 0;

      const parsed: ChartPoint[] = rows.slice(startIdx)
        .filter((row) => row[0] != null && row[1] != null)
        .map((row) => ({
          month: String(row[0]).trim(),
          value: Number(row[1]) || 0,
        }));

      if (parsed.length === 0) {
        toast.error("Не удалось извлечь данные из файла");
        return;
      }

      const { setter } = getDataAndSetter(tab);
      setter(parsed);
      toast.success(`Импортировано ${parsed.length} строк`);
    } catch {
      toast.error("Ошибка при чтении файла");
    } finally {
      e.target.value = "";
    }
  };

  const renderTable = (tab: string) => {
    const { data } = getDataAndSetter(tab);
    return (
      <div className="space-y-2">
        <div className="flex gap-2 mb-3">
          <Button type="button" variant="outline" size="sm" onClick={() => addRow(tab)}>
            <Plus className="h-3 w-3 mr-1" /> Добавить строку
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => handleImportXLS(tab)}>
            <Upload className="h-3 w-3 mr-1" /> Импорт из XLS
          </Button>
        </div>

        {data.length === 0 && (
          <p className="text-xs text-muted-foreground py-4 text-center">
            Нет данных. Добавьте строки вручную или импортируйте из XLS.
          </p>
        )}

        {data.length > 0 && (
          <div className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-[1fr_120px_36px] gap-0 bg-muted px-2 py-1.5">
              <span className="text-xs font-medium text-muted-foreground">Месяц</span>
              <span className="text-xs font-medium text-muted-foreground">Значение</span>
              <span />
            </div>
            {data.map((row, i) => (
              <div key={i} className="grid grid-cols-[1fr_120px_36px] gap-1 px-2 py-1 border-t items-center">
                <Input
                  value={row.month}
                  onChange={(e) => updateRow(tab, i, "month", e.target.value)}
                  placeholder="янв. 25"
                  className="h-8 text-xs"
                />
                <Input
                  type="number"
                  value={row.value}
                  onChange={(e) => updateRow(tab, i, "value", e.target.value)}
                  placeholder="0"
                  className="h-8 text-xs"
                />
                <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeRow(tab, i)}>
                  <Trash2 className="h-3 w-3 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-3">
      <Label className="text-xs font-medium">Данные графиков</Label>
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        className="hidden"
        onChange={onFileSelected}
      />
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          {TAB_CONFIG.map((t) => (
            <TabsTrigger key={t.key} value={t.key} className="text-xs">
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {TAB_CONFIG.map((t) => (
          <TabsContent key={t.key} value={t.key}>
            {renderTable(t.key)}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ChartDataEditor;
