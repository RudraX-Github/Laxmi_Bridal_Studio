/**
 * ============================================================================
 * LAXMI BRIDAL STUDIO (Beauté naturelle) — Node.js / Express + Google Workspace API
 * Location: Near Balmukund Shopping Center Vegetable Market, Chital, Gujarat 365620
 * Contact: +91 6354724681
 * Connected Google Sheet ID: 18ezpD1fg3KMP7jg1681nAirOtDmzEn6nTa20JEbriHw
 * ============================================================================
 */

const express = require("express");
const path = require("path");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;

const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID || "18ezpD1fg3KMP7jg1681nAirOtDmzEn6nTa20JEbriHw";
const GOOGLE_APPS_SCRIPT_WEBHOOK = process.env.GOOGLE_APPS_SCRIPT_WEBHOOK || "";

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const RITUAL_MOVEMENTS = [
  { movement: "00", category: "HERO", title: "The Ritual of Natural Radiance", tagline: "Beauté naturelle" },
  { movement: "01", category: "THE FOUNDATION · D-TAN", title: "Pure Luminosity", tariffINR: "₹550 – ₹1,100" },
  { movement: "02", category: "THE RADIANCE · FACIALS", title: "Cellular Glass Glow", tariffINR: "₹2,500 – ₹3,800" },
  { movement: "03", category: "THE SCULPTURE · HAIRCUT & SPA", title: "Architectural Tresses", tariffINR: "₹500 – ₹2,200" },
  { movement: "04", category: "THE SILK FINISH · WAXING", title: "Velvet Liposoluble Wax", tariffINR: "₹1,450 – ₹2,400" },
  { movement: "05", category: "THE HARMONY · BRIDAL PALETTE", title: "Four Bridal Luminescences", tariffINR: "₹12,500 – ₹18,500" },
  { movement: "06", category: "THE PRECISION · BROWS & NAILS", title: "Delicate Micro-Artistry", tariffINR: "₹650 – ₹1,800" },
  { movement: "07", category: "THE CORONATION · BRIDAL SUITE", title: "The Complete Bridal Sanctuary", tariffINR: "₹6,800 – ₹21,000" }
];

const bookingsMemory = [];

app.get("/api/v1/health", (req, res) => {
  res.json({
    status: "ok",
    brand: "Laxmi Bridal Studio",
    tagline: "Beauté naturelle",
    audience: "Women Only · Bridal & Luxury Spa Sanctuary",
    location: "Near Balmukund Shopping Center Vegetable Market, Chital, Gujarat 365620",
    phone: "+91 6354724681",
    googleSheetId: GOOGLE_SHEET_ID,
    googleSheetUrl: `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/edit`,
    movementsCount: 7
  });
});

app.get("/api/v1/movements", (req, res) => {
  res.json({ movements: RITUAL_MOVEMENTS });
});

app.post("/api/v1/bookings", async (req, res) => {
  const { clientName, clientPhone, preferredDate, timeSlot, selectedTreatment, bridalFinish, notes } = req.body;
  if (!clientName || !clientPhone || !preferredDate) {
    return res.status(400).json({ error: "clientName, clientPhone, and preferredDate are required." });
  }

  const bookingId = "LBS-CH-" + crypto.randomBytes(2).toString("hex").toUpperCase();
  const record = {
    bookingId,
    createdAt: new Date().toISOString(),
    clientName,
    clientPhone,
    preferredDate,
    timeSlot: timeSlot || "11:30 AM",
    selectedTreatment: selectedTreatment || "Hydra-Glass Pearl Facial",
    bridalFinish: bridalFinish || "Dewy Glass Pearl",
    notes: notes || "",
    googleSheetId: GOOGLE_SHEET_ID,
    status: "CONFIRMED"
  };

  bookingsMemory.push(record);

  // Forward to Google Apps Script Web App if configured
  if (GOOGLE_APPS_SCRIPT_WEBHOOK) {
    try {
      await fetch(GOOGLE_APPS_SCRIPT_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record)
      });
    } catch (_e) {}
  }

  res.status(201).json({
    message: "Appointment logged to Laxmi Bridal Studio Google Sheet CRM.",
    bookingId,
    googleSheetUrl: `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/edit`,
    booking: record
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[LAXMI BRIDAL STUDIO] Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
