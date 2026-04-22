CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  image_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name TEXT NOT NULL,
  role_label TEXT,
  rating INTEGER NOT NULL DEFAULT 5,
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  birth_date DATE,
  city TEXT,
  cin TEXT,
  insurance TEXT,
  company TEXT,
  emergency_contact TEXT,
  antecedents TEXT,
  allergies TEXT,
  notes TEXT,
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  service_name TEXT NOT NULL,
  session_date DATE NOT NULL,
  session_time TIME NOT NULL,
  session_end_time TIME NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  status TEXT NOT NULL DEFAULT 'reserved',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reservations_date_time ON reservations (session_date, session_time);

INSERT INTO settings (key, value)
VALUES
  ('office', jsonb_build_object(
    'name', 'Kerviqo Dentaire',
    'tagline', 'Cabinet dentaire moderne et humain',
    'phone', '0679889108',
    'email', 'aymenabidar21@gmail.com',
    'instagram', 'https://www.instagram.com/kerviqo/',
    'workDays', jsonb_build_array(1,2,3,4,5),
    'dayStart', '10:00',
    'dayEnd', '18:00',
    'slotMinutes', 60,
    'slotStep', 30,
    'closedDaysLabel', 'Samedi et dimanche'
  ))
ON CONFLICT (key) DO NOTHING;

INSERT INTO services (name, slug, short_description, description, price, duration_minutes, image_url, featured, sort_order)
VALUES
  ('Esthétique dentaire', 'esthetique-dentaire', 'Sublimez votre sourire avec des soins précis et un rendu naturel.', 'Solutions esthétiques haut de gamme pour améliorer l’harmonie du sourire, la teinte et la confiance du patient.', 900, 60, 'assets/images/service-esthetique.svg', TRUE, 1),
  ('Orthodontie', 'orthodontie', 'Alignement moderne et plan de suivi clair pour enfants et adultes.', 'Traitements orthodontiques pour corriger l’alignement, améliorer le confort et optimiser la santé bucco-dentaire.', 1200, 45, 'assets/images/service-ortho.svg', TRUE, 2),
  ('Implantologie', 'implantologie', 'Remplacement durable des dents manquantes avec accompagnement personnalisé.', 'Implants dentaires conçus pour restaurer la fonction mastiquatoire et l’esthétique avec précision.', 3500, 90, 'assets/images/service-implant.svg', TRUE, 3),
  ('Prothèses dentaires', 'protheses-dentaires', 'Restauration fixe ou amovible pensée pour la fonction et l’esthétique.', 'Prothèses personnalisées pour retrouver confort, mastication et sourire harmonieux.', 2400, 75, 'assets/images/service-protheses.svg', FALSE, 4),
  ('Parodontologie', 'parodontologie', 'Prise en charge complète des gencives et des tissus de soutien.', 'Prévention et traitement des maladies parodontales pour préserver les dents durablement.', 750, 60, 'assets/images/service-parodontologie.svg', FALSE, 5),
  ('Pédodontie', 'pedodontie', 'Soins dentaires adaptés aux enfants dans un cadre rassurant.', 'Approche douce et pédagogique pour la prévention, les soins et le suivi des plus jeunes.', 500, 40, 'assets/images/service-pedodontie.svg', FALSE, 6),
  ('Blanchiment dentaire', 'blanchiment-dentaire', 'Éclaircissement professionnel pour un sourire plus lumineux.', 'Traitement supervisé pour améliorer la teinte des dents sans négliger le confort du patient.', 1500, 60, 'assets/images/service-blanchiment.svg', FALSE, 7),
  ('Chirurgie dentaire', 'chirurgie-dentaire', 'Actes de chirurgie avec protocole clair et suivi structuré.', 'Interventions ciblées réalisées dans un cadre moderne avec information et sécurité.', 1800, 90, 'assets/images/service-chirurgie.svg', FALSE, 8),
  ('Soins dentaires', 'soins-dentaires', 'Consultations, détartrage, prévention et traitements courants.', 'Base de la santé bucco-dentaire avec des soins précis et des conseils adaptés au quotidien.', 400, 45, 'assets/images/service-soins.svg', FALSE, 9),
  ('Invisalign', 'invisalign', 'Alignement discret avec gouttières transparentes et suivi expert.', 'Solution esthétique pour corriger l’alignement avec un confort élevé et une discrétion maximale.', 2200, 60, 'assets/images/service-invisalign.svg', FALSE, 10)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO gallery (title, image_url, alt_text, sort_order)
SELECT * FROM (
  VALUES
    ('Accueil du cabinet', 'assets/images/gallery-1.svg', 'Accueil élégant du cabinet', 1),
    ('Salle de soin', 'assets/images/gallery-2.svg', 'Salle de soin moderne', 2),
    ('Espace consultation', 'assets/images/gallery-3.svg', 'Espace consultation premium', 3),
    ('Smile studio', 'assets/images/gallery-5.svg', 'Studio esthétique dentaire', 4)
) AS seed(title, image_url, alt_text, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM gallery LIMIT 1);

INSERT INTO reviews (patient_name, role_label, rating, comment)
SELECT * FROM (
  VALUES
    ('Sara B.', 'Patiente', 5, 'Cabinet très professionnel, accueil rassurant et réservation simple.'),
    ('Yassine M.', 'Patient', 5, 'Le suivi est sérieux, les horaires sont respectés et le résultat est top.'),
    ('Nadia A.', 'Patiente', 5, 'Design moderne, équipe à l’écoute et explications claires avant chaque séance.')
) AS seed(patient_name, role_label, rating, comment)
WHERE NOT EXISTS (SELECT 1 FROM reviews LIMIT 1);
