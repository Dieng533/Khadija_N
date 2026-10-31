-- ====================================================================
-- SCHEMA SUPABASE COMPLET & MIS À JOUR POUR LE SITE KHADIJA_ND
-- ====================================================================
-- Copiez et collez ce script dans l'éditeur SQL de Supabase (SQL Editor)
-- puis cliquez sur "Run".
-- ====================================================================

-- 1. Table des contenus en vedette (Vidéos / Reels / UGC / Vlogs)
CREATE TABLE IF NOT EXISTS public.contents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    caption TEXT NOT NULL DEFAULT '@khadija_nd',
    category TEXT NOT NULL DEFAULT 'reels',
    video_url TEXT NOT NULL DEFAULT '',
    order_index INTEGER DEFAULT 0
);
ALTER TABLE public.contents ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'reels';
ALTER TABLE public.contents ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0;

-- 2. Table de la galerie (Univers / Photos HD)
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    caption TEXT DEFAULT 'Univers Khadija_Nd',
    category TEXT NOT NULL DEFAULT 'mode',
    image_url TEXT NOT NULL DEFAULT '',
    order_index INTEGER DEFAULT 0
);
ALTER TABLE public.gallery ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'mode';
ALTER TABLE public.gallery ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0;

-- 3. Table des collaborations de marque
CREATE TABLE IF NOT EXISTS public.collabs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    logo_url TEXT DEFAULT '',
    order_index INTEGER DEFAULT 0
);
ALTER TABLE public.collabs ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0;

-- 4. Table des messages de contact / demandes de partenariat
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    brand TEXT DEFAULT '',
    message TEXT NOT NULL,
    project_type TEXT DEFAULT 'Placement / Reel',
    status TEXT DEFAULT 'nouveau'
);
ALTER TABLE public.contact_messages ADD COLUMN IF NOT EXISTS project_type TEXT DEFAULT 'Placement / Reel';
ALTER TABLE public.contact_messages ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'nouveau';

-- 5. Table des réglages dynamiques du site (KPIs, abonnés, disponibilité)
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ====================================================================
-- ACTIVATION DE LA SÉCURITÉ AU NIVEAU DES LIGNES (RLS)
-- ====================================================================

ALTER TABLE public.contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collabs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Politiques de lecture publique
DROP POLICY IF EXISTS "Lecture publique des contenus" ON public.contents;
CREATE POLICY "Lecture publique des contenus" ON public.contents FOR SELECT USING (true);

DROP POLICY IF EXISTS "Lecture publique de la galerie" ON public.gallery;
CREATE POLICY "Lecture publique de la galerie" ON public.gallery FOR SELECT USING (true);

DROP POLICY IF EXISTS "Lecture publique des collabs" ON public.collabs;
CREATE POLICY "Lecture publique des collabs" ON public.collabs FOR SELECT USING (true);

DROP POLICY IF EXISTS "Lecture publique des messages" ON public.contact_messages;
CREATE POLICY "Lecture publique des messages" ON public.contact_messages FOR SELECT USING (true);

DROP POLICY IF EXISTS "Lecture publique des reglages" ON public.site_settings;
CREATE POLICY "Lecture publique des reglages" ON public.site_settings FOR SELECT USING (true);

-- Politiques de gestion (écriture/modification/suppression)
DROP POLICY IF EXISTS "Gestion publique des contenus" ON public.contents;
CREATE POLICY "Gestion publique des contenus" ON public.contents FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Gestion publique de la galerie" ON public.gallery;
CREATE POLICY "Gestion publique de la galerie" ON public.gallery FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Gestion publique des collabs" ON public.collabs;
CREATE POLICY "Gestion publique des collabs" ON public.collabs FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Gestion publique des messages" ON public.contact_messages;
CREATE POLICY "Gestion publique des messages" ON public.contact_messages FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Gestion publique des reglages" ON public.site_settings;
CREATE POLICY "Gestion publique des reglages" ON public.site_settings FOR ALL USING (true) WITH CHECK (true);

-- ====================================================================
-- BUCKET DE STOCKAGE "media" POUR LES VIDÉOS ET PHOTOS
-- ====================================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Acces public aux medias" ON storage.objects;
CREATE POLICY "Acces public aux medias" ON storage.objects FOR SELECT USING (bucket_id = 'media');

DROP POLICY IF EXISTS "Upload public de medias" ON storage.objects;
CREATE POLICY "Upload public de medias" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media');

DROP POLICY IF EXISTS "Suppression publique de medias" ON storage.objects;
CREATE POLICY "Suppression publique de medias" ON storage.objects FOR DELETE USING (bucket_id = 'media');

-- ====================================================================
-- DONNÉES DE BASE INITIALES (SI TABLES VIDES)
-- ====================================================================

INSERT INTO public.collabs (name, logo_url, order_index)
SELECT name, logo_url, order_index FROM (
    VALUES 
        ('Dior Beauty', '', 1),
        ('L''Oréal Paris', '', 2),
        ('Zara Fashion', '', 3),
        ('Sephora', '', 4),
        ('Fenty Beauty', '', 5)
) AS v(name, logo_url, order_index)
WHERE NOT EXISTS (SELECT 1 FROM public.collabs);

INSERT INTO public.site_settings (key, value)
VALUES 
    ('igFollowers', '"68K+"'::jsonb),
    ('tiktokFollowers', '"105K+"'::jsonb),
    ('igNumber', '68'::jsonb),
    ('tiktokNumber', '105'::jsonb),
    ('engagementRate', '"100%"'::jsonb),
    ('campaignsCount', '"12+"'::jsonb),
    ('availability', '"Ouverte aux collaborations 2026"'::jsonb),
    ('contactEmail', '"contact@khadija-nd.com"'::jsonb),
    ('simulator_config', '{"reachPerReel": 75000, "reachPerStory": 20000, "reachPerUgc": 40000, "adsMultiplier": 1.5, "baseReachMin": 15000, "maxReels": 4, "maxStories": 6, "maxUgc": 3, "engagementText": "98% - 100%", "delayText": "5 à 7 Jours"}'::jsonb),
    ('collaboration_packs', '[{"id":"p1","title":"Pack Éclat","tagline":"Idéal pour un lancement produit ou une visibilité ciblée et percutante.","popular":false,"popularBadge":"","reels":1,"stories":2,"ugc":0,"ads":false,"features":["1 Reel Scénarisé (Instagram + TikTok)","2 Stories avec lien swipe-up / sticker","Rapport d''audience et de métriques","Livraison sous 5 à 7 jours ouvrés"],"buttonText":"Sélectionner Pack Éclat ✦","order_index":1},{"id":"p2","title":"Pack Signature","tagline":"La formule complète pour un storytelling puissant et une conversion maximale.","popular":true,"popularBadge":"★ Le Plus Demandé","reels":2,"stories":4,"ugc":1,"ads":true,"features":["2 Reels Haute Définition / 4K","4 Stories d''engagement et backstage","1 Format UGC supplémentaire pour vos Ads","Cession de droits publicitaires 30 jours"],"buttonText":"Sélectionner Pack Signature ✦","order_index":2},{"id":"p3","title":"Pack Ambassadrice","tagline":"Partenariat exclusif trimestriel ou annuel avec présence égérie.","popular":false,"popularBadge":"","reels":4,"stories":6,"ugc":3,"ads":true,"features":["Shooting photo & vidéo dédié en studio","4 Reels / Mois + Stories hebdomadaires","Présence physique aux événements de marque","Exclusivité sectorielle garantie"],"buttonText":"Sélectionner Pack Ambassadrice ✦","order_index":3}]'::jsonb)
ON CONFLICT (key) DO NOTHING;
