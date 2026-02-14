import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Plus, Pencil, Copy, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";

interface Page {
  id: string;
  slug: string;
  title: string;
  status: string;
  updated_at: string;
}

const BLOCK_TYPES = [
  "PropertyHero",
  "PropertyStats",
  "PhotoGallery",
  "PropertyDetails",
  "LocationSection",
  "FinancialSection",
  "SimilarProperties",
  "FAQSection",
  "ContactForm",
];

const AdminPages = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPages = async () => {
    const { data, error } = await supabase
      .from("pages")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) {
      toast.error("Ошибка загрузки страниц");
    } else {
      setPages(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const createPage = async () => {
    const slug = `object-${Date.now()}`;
    const { data: page, error } = await supabase
      .from("pages")
      .insert({ title: "Новый объект", slug })
      .select()
      .single();

    if (error || !page) {
      toast.error("Ошибка создания страницы");
      return;
    }

    // Create default blocks
    const blocks = BLOCK_TYPES.map((type, i) => ({
      page_id: page.id,
      block_type: type,
      sort_order: i,
      enabled: true,
      content: {},
    }));

    await supabase.from("page_blocks").insert(blocks);
    navigate(`/admin/pages/${page.id}`);
  };

  const duplicatePage = async (page: Page) => {
    const { data: newPage, error } = await supabase
      .from("pages")
      .insert({ title: `${page.title} (копия)`, slug: `${page.slug}-copy-${Date.now()}`, status: "draft" })
      .select()
      .single();

    if (error || !newPage) {
      toast.error("Ошибка копирования");
      return;
    }

    const { data: blocks } = await supabase
      .from("page_blocks")
      .select("*")
      .eq("page_id", page.id);

    if (blocks && blocks.length > 0) {
      const newBlocks = blocks.map(({ id, page_id, created_at, updated_at, ...rest }) => ({
        ...rest,
        page_id: newPage.id,
      }));
      await supabase.from("page_blocks").insert(newBlocks);
    }

    toast.success("Страница скопирована");
    fetchPages();
  };

  const deletePage = async (id: string) => {
    if (!confirm("Удалить страницу?")) return;
    const { error } = await supabase.from("pages").delete().eq("id", id);
    if (error) {
      toast.error("Ошибка удаления");
    } else {
      toast.success("Страница удалена");
      fetchPages();
    }
  };

  if (loading) return <p className="text-muted-foreground">Загрузка...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Страницы объектов</h1>
        <Button onClick={createPage}>
          <Plus className="h-4 w-4 mr-2" />
          Создать
        </Button>
      </div>

      {pages.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>Нет созданных страниц</p>
          <Button className="mt-4" onClick={createPage}>Создать первую страницу</Button>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Название</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Обновлено</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map((page) => (
              <TableRow key={page.id}>
                <TableCell className="font-medium">{page.title}</TableCell>
                <TableCell className="text-muted-foreground">/{page.slug}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    page.status === "published"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {page.status === "published" ? "Опубликован" : "Черновик"}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {new Date(page.updated_at).toLocaleDateString("ru")}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    {page.status === "published" && (
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/objects/${page.slug}`} target="_blank">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/admin/pages/${page.id}`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => duplicatePage(page)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deletePage(page.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AdminPages;
