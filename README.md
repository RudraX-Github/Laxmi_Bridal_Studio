# Laxmi Bridal Studio (*Beauté naturelle*) — Full-Stack Scrollytelling & Google Workspace Architecture

**Brand Name:** Laxmi Bridal Studio  
**Tagline:** *Beauté naturelle*  
**Target Audience:** Bridal & Luxury Spa Clients — Exclusively Women Only  
**Sanctuary Location:** Near Balmukund Shopping Center Vegetable Market, Chital, Gujarat 365620  
**Concierge Phone / WhatsApp:** +91 6354724681  
**Live Google Sheets CRM Database:** [Laxmi Bridal Studio — Bookings, Services & Client CRM Database](https://docs.google.com/spreadsheets/d/18ezpD1fg3KMP7jg1681nAirOtDmzEn6nTa20JEbriHw/edit?usp=sharing)  
**Target Google Drive Repository:** [Laxmi_Bridal_Studio — Google Drive Folder](https://drive.google.com/drive/folders/11UHwP-VJyjsd6B0Sv6VPuQx5Ys4DQdC0?usp=sharing)

## 1. Executive Summary & Creative Direction

Designed in the **Noir Onyx & Pearl Luminescence** aesthetic (`#0e0e11` Soft Charcoal Black, `#f4eee6` Iridescent Pearl Ivory, and `#c9a96e` Couture Champagne Gold), **Laxmi Bridal Studio** pairs an `880vh` pinned 60fps procedural 3D/Canvas beauty engine with a serverless **Google Workspace Backend** (Google Sheets, Google Apps Script, Google Calendar, and Google Drive).

## 2. All Seven Scrollytelling Movements (`00 / 07` to `07 / 07`)

| Movement Stage | Scroll Cue Range | Ritual Category & Title | Real-Time 60fps 3D/Canvas Effect | Tariff Range (INR) |
| :--- | :--- | :--- | :--- | :--- |
| **00 / 07 — Hero** | `0.000 – 0.060` | *The Ritual of Natural Radiance* | 3D Pearl & Champagne-Gold Lotus & Facial Meridian Particle Cloud | — |
| **01 / 07 — Foundation** | `0.095 – 0.195` | **D-Tan & Skin Prep:** *Pure Luminosity* | Sculpted 3D facial contour with enzymatic pearl oxygenation light scan | ₹550 – ₹1,100 |
| **02 / 07 — Radiance** | `0.220 – 0.335` | **Signature Facials:** *Cellular Glass Glow* | 36-point lymphatic meridian acupressure nodes & concentric Hydra-Glass rings | ₹2,500 – ₹3,800 |
| **03 / 07 — Sculpture** | `0.360 – 0.475` | **Haircut & Spa:** *Architectural Tresses* | 18 flowing 3D keratin silk-strand harmonic ribbons | ₹500 – ₹2,200 |
| **04 / 07 — Smoothness** | `0.500 – 0.610` | **Luxury Waxing:** *Velvet Liposoluble Wax* | Concentric white-chocolate & pearl laminar silk wave ripples | ₹1,450 – ₹2,400 |
| **05 / 07 — Harmony** | `0.635 – 0.745` | **Bridal Palette:** *Four Bridal Luminescences* | Interactive 4-sphere bridal skin finish switcher (*Dewy Glass*, *Velvet Rose*, *Royal Gold*, *Champagne*) | ₹12,500 – ₹18,500 |
| **06 / 07 — Precision** | `0.770 – 0.875` | **Brows, Lashes & Nails:** *Delicate Micro-Artistry* | Golden-ratio brow arch & animated mink lash fan geometry | ₹650 – ₹1,800 |
| **07 / 07 — Coronation** | `0.900 – 0.995` | **Bridal Suite:** *The Complete Bridal Sanctuary* | 16-petal sacred lotus bridal mandala rotating in pearl & gold | ₹6,800 – ₹21,000 |

## 3. Google Workspace Backend Architecture

1. **Google Sheets Database ([Laxmi Bridal Studio — Bookings, Services & Client CRM Database](https://docs.google.com/spreadsheets/d/18ezpD1fg3KMP7jg1681nAirOtDmzEn6nTa20JEbriHw/edit?usp=sharing)):**
   * `Appointments_Bookings`: Stores live client bookings (`Booking_ID`, `Created_At`, `Client_Name`, `Phone_WhatsApp`, `Email`, `Service_Category`, `Selected_Treatment`, `Preferred_Date`, `Time_Slot`, `Service_Mode`, `Estimated_Tariff_INR`, `Booking_Status`, `Notes`).
   * `Services_Menu`: Stores all 12 treatments across Movements 01–07.
   * `Bridal_Packages`: Stores the 4 pre-bridal and wedding-day suites.
   * `Skin_Tone_Consultations`: Logs client undertone and bridal finish selections from Movement 05.
2. **Google Apps Script Web App (`Code.gs`):**
   * Pre-bound to `SPREADSHEET_ID = "18ezpD1fg3KMP7jg1681nAirOtDmzEn6nTa20JEbriHw"` and `DRIVE_FOLDER_ID = "11UHwP-VJyjsd6B0Sv6VPuQx5Ys4DQdC0"`.
   * Exposes `doGet(e)` (serves JSON catalog or HTML UI) and `doPost(e)` (appends rows to Google Sheets, creates a Google Calendar event at Chital sanctuary, and returns a WhatsApp confirmation link for `+91 6354724681`).
3. **Node.js / Express Server (`server.js`):**
   * Provides `/api/v1/health`, `/api/v1/movements`, and `/api/v1/bookings` with webhook forwarding to Google Sheets.
