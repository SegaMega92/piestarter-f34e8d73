
-- Role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checks
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS for user_roles: only admins can read
CREATE POLICY "Admins can read user_roles"
ON public.user_roles FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Pages table
CREATE TABLE public.pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- Public can read published pages
CREATE POLICY "Anyone can read published pages"
ON public.pages FOR SELECT
USING (status = 'published');

-- Admins can do everything with pages
CREATE POLICY "Admins can manage pages"
ON public.pages FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Page blocks table
CREATE TABLE public.page_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE NOT NULL,
  block_type TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  enabled BOOLEAN NOT NULL DEFAULT true,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.page_blocks ENABLE ROW LEVEL SECURITY;

-- Public can read blocks of published pages
CREATE POLICY "Anyone can read blocks of published pages"
ON public.page_blocks FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.pages WHERE id = page_blocks.page_id AND status = 'published'
));

-- Admins can manage all blocks
CREATE POLICY "Admins can manage page_blocks"
ON public.page_blocks FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Updated_at triggers
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_pages_updated_at
BEFORE UPDATE ON public.pages
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_page_blocks_updated_at
BEFORE UPDATE ON public.page_blocks
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('page-images', 'page-images', true);

-- Anyone can view images
CREATE POLICY "Public can view page images"
ON storage.objects FOR SELECT
USING (bucket_id = 'page-images');

-- Admins can upload images
CREATE POLICY "Admins can upload page images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'page-images' AND public.has_role(auth.uid(), 'admin'));

-- Admins can update images
CREATE POLICY "Admins can update page images"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'page-images' AND public.has_role(auth.uid(), 'admin'));

-- Admins can delete images
CREATE POLICY "Admins can delete page images"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'page-images' AND public.has_role(auth.uid(), 'admin'));
