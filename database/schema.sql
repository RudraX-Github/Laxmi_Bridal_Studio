-- ============================================================================
-- LAXMI BRIDAL STUDIO (Beauté naturelle) — Relational Database Schema (SQL)
-- Sanctuary Location: Near Balmukund Shopping Center Vegetable Market,
--                     Chital, Gujarat 365620 | Contact: +91 6354724681
-- Target Audience: Bridal & Luxury Spa Clients — Women Only
-- ============================================================================

CREATE TABLE IF NOT EXISTS clients (
    id VARCHAR(36) PRIMARY KEY,
    full_name VARCHAR(160) NOT NULL,
    phone_whatsapp VARCHAR(40) NOT NULL,
    email VARCHAR(180),
    city VARCHAR(100) DEFAULT 'Chital, Gujarat',
    skin_type VARCHAR(64) DEFAULT 'Normal',
    preferred_bridal_finish VARCHAR(80) DEFAULT 'Dewy Glass Pearl',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ritual_movements (
    movement_no CHAR(2) PRIMARY KEY,
    slug VARCHAR(64) UNIQUE NOT NULL,
    category_label VARCHAR(120) NOT NULL,
    title VARCHAR(160) NOT NULL,
    scroll_cue_start NUMERIC(4,3) NOT NULL,
    scroll_cue_end NUMERIC(4,3) NOT NULL,
    tariff_range_inr VARCHAR(80) NOT NULL,
    canvas_effect_description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS services_menu (
    service_code VARCHAR(32) PRIMARY KEY,
    movement_no CHAR(2) REFERENCES ritual_movements(movement_no),
    category VARCHAR(80) NOT NULL,
    service_name VARCHAR(180) NOT NULL,
    duration_mins INTEGER NOT NULL,
    tariff_inr INTEGER NOT NULL,
    key_products_used VARCHAR(220) NOT NULL,
    description TEXT NOT NULL,
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS bridal_packages (
    package_code VARCHAR(32) PRIMARY KEY,
    package_name VARCHAR(180) NOT NULL,
    ideal_for VARCHAR(120) NOT NULL,
    included_rituals TEXT NOT NULL,
    total_sessions INTEGER NOT NULL,
    package_tariff_inr INTEGER NOT NULL,
    complimentary_benefit VARCHAR(220) NOT NULL
);

CREATE TABLE IF NOT EXISTS appointments_bookings (
    booking_id VARCHAR(32) PRIMARY KEY,
    client_name VARCHAR(160) NOT NULL,
    phone_whatsapp VARCHAR(40) NOT NULL,
    email VARCHAR(180),
    selected_treatment VARCHAR(200) NOT NULL,
    bridal_finish VARCHAR(80) DEFAULT 'Dewy Glass Pearl',
    preferred_date DATE NOT NULL,
    time_slot VARCHAR(64) NOT NULL,
    service_mode VARCHAR(80) DEFAULT 'Studio Sanctuary (Chital)',
    estimated_tariff_inr INTEGER,
    booking_status VARCHAR(32) DEFAULT 'CONFIRMED',
    notes TEXT,
    google_sheet_synced BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed All 7 Scrollytelling Movements (00 to 07)
INSERT INTO ritual_movements (movement_no, slug, category_label, title, scroll_cue_start, scroll_cue_end, tariff_range_inr, canvas_effect_description) VALUES
('00', 'hero', 'LAXMI BRIDAL STUDIO · BEAUTÉ NATURELLE', 'The Ritual of Natural Radiance', 0.000, 0.060, 'Consultation', '3D Pearl & Champagne-Gold Lotus & Facial Meridian Particle Cloud'),
('01', 'dtan', 'THE FOUNDATION · D-TAN', 'Pure Luminosity', 0.095, 0.195, '₹550 – ₹1,100', 'Sculpted 3D facial contour with enzymatic pearl oxygenation light scan'),
('02', 'facials', 'THE RADIANCE · FACIALS', 'Cellular Glass Glow', 0.220, 0.335, '₹2,500 – ₹3,800', '36-point lymphatic meridian acupressure nodes & concentric Hydra-Glass rings'),
('03', 'haircut', 'THE SCULPTURE · HAIRCUT & SPA', 'Architectural Tresses', 0.360, 0.475, '₹500 – ₹2,200', '18 flowing 3D keratin silk-strand harmonic ribbons'),
('04', 'waxing', 'THE SILK FINISH · WAXING', 'Velvet Liposoluble Wax', 0.500, 0.610, '₹1,450 – ₹2,400', 'Concentric white-chocolate & pearl laminar silk wave ripples'),
('05', 'palette', 'THE HARMONY · BRIDAL PALETTE', 'Four Bridal Luminescences', 0.635, 0.745, '₹12,500 – ₹18,500', 'Interactive 4-sphere bridal skin finish switcher (Dewy Glass, Velvet Rose, Royal Gold, Champagne)'),
('06', 'precision', 'THE PRECISION · BROWS & NAILS', 'Delicate Micro-Artistry', 0.770, 0.875, '₹650 – ₹1,800', 'Golden-ratio brow arch & animated mink lash fan geometry'),
('07', 'coronation', 'THE CORONATION · BRIDAL SUITE', 'The Complete Bridal Sanctuary', 0.900, 0.995, '₹6,800 – ₹21,000', '16-petal sacred lotus bridal mandala rotating in pearl & gold');

-- Seed Core Beauty & Bridal Services
INSERT INTO services_menu (service_code, movement_no, category, service_name, duration_mins, tariff_inr, key_products_used, description) VALUES
('LBS-DT-01', '01', 'D-Tan & Skin Prep', 'O3+ / Raaga Botanical Enzyme Face & Neck D-Tan', 35, 550, 'O3+ Kojic & Milk Peptide Pack', 'Lifts sun tan and restores natural pearl luminosity'),
('LBS-DT-02', '01', 'D-Tan & Skin Prep', 'Full Arms & Back Bridal Detan Polishing', 50, 1100, 'Raaga Professional + Rose Quartz Mist', 'Enzymatic detan and body polishing for even skin tone'),
('LBS-FC-01', '02', 'Signature Facials', 'Hydra-Glass Pearl Luminescence Facial', 75, 2500, 'Hyaluronic Bio-Serum & Ultrasonic Scrubber', 'Deep pore oxygenation and mirror-glass hydration'),
('LBS-FC-02', '02', 'Signature Facials', '24K Gold Leaf Bridal Glow Facial', 90, 3800, '24K Gold Foil & Saffron Elixir', 'Lymphatic sculpting and cellular radiance infusion'),
('LBS-HC-01', '03', 'Haircut & Styling', 'Precision Butterfly & Feather Layer Haircut', 45, 500, 'L''Oreal Professionnel & Thermal Silk Mist', 'Custom face-framing architectural haircut and blowout'),
('LBS-HC-02', '03', 'Haircut & Styling', 'Moroccan Argan Keratin & Hair Botox Spa', 90, 2200, 'Pure Argan Oil & Silk Protein Mask', 'Deep cortex repair for frizz-free luminous tresses'),
('LBS-WX-01', '04', 'Luxury Waxing', 'Italian Rica White Chocolate Full Arms + Legs + Underarms', 60, 1450, 'Rica Liposoluble Wax & Chamomile Oil', 'Zero-redness liposoluble epilation with satin finish'),
('LBS-WX-02', '04', 'Luxury Waxing', 'Full Body Bridal Silk Rica Waxing', 110, 2400, 'Rica Aloe Vera & Pearl Liposoluble Wax', 'Complete body silk waxing with soothing botanical serum'),
('LBS-BR-01', '05', 'Bridal & Tone Palette', 'Signature HD Bridal Makeup & Hair Styling', 180, 12500, 'MAC / Huda Beauty / NARS / Kryolan HD', '24-hour waterproof HD bridal look with draping and hair art'),
('LBS-BR-02', '05', 'Bridal & Tone Palette', 'Couture Silicon Airbrush Bridal Makeup', 210, 18500, 'Temptu Pro Airbrush & Charlotte Tilbury', 'Weightless glass-skin bridal airbrush artistry'),
('LBS-FN-01', '06', 'Nails Lashes & Brows', 'Organic Eyebrow Threading + Lash Lift & Tint', 40, 650, 'Antibacterial Organic Cotton Thread & Keratin Tint', 'Golden-ratio brow shaping and natural lash curl enhancement'),
('LBS-FN-02', '06', 'Nails Lashes & Brows', 'Bridal Gel Nail Extensions & Pearl Chrome Art', 75, 1800, 'UV Builder Gel & Pearl Chrome Pigments', 'Custom bridal nail extensions for mehndi and ring ceremony'),
('LBS-CR-01', '07', 'Bridal Suite', 'Noir & Pearl Airbrush Grand Bridal Suite', 360, 21000, 'Complete Pre-Bridal + Wedding Day Airbrush Suite', 'All-inclusive 4-session pre-bridal and wedding day transformation');
