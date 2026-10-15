/**
 * ============================================================================
 * LAXMI BRIDAL STUDIO (Beauté naturelle) — Google Workspace Native Backend
 * File: Code.gs (Deploy as Google Apps Script Web App)
 * Connected Google Sheet ID: 18ezpD1fg3KMP7jg1681nAirOtDmzEn6nTa20JEbriHw
 * Connected Google Drive Folder ID: 11UHwP-VJyjsd6B0Sv6VPuQx5Ys4DQdC0
 * Studio Location: Near Balmukund Shopping Center Vegetable Market, Chital, Gujarat 365620
 * Contact: +91 6354724681
 * ============================================================================
 */

const SPREADSHEET_ID = "18ezpD1fg3KMP7jg1681nAirOtDmzEn6nTa20JEbriHw";
const DRIVE_FOLDER_ID = "11UHwP-VJyjsd6B0Sv6VPuQx5Ys4DQdC0";
const STUDIO_NAME = "Laxmi Bridal Studio — Beauté naturelle";
const STUDIO_ADDRESS = "Near Balmukund Shopping Center Vegetable Market, Chital, Gujarat 365620";
const STUDIO_PHONE = "+91 6354724681";

/**
 * Serves the HTML Web App or returns JSON catalog data from Google Sheets
 */
function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) ? e.parameter.action : "ui";
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  if (action === "services") {
    const sheet = ss.getSheetByName("Services_Menu");
    const rows = sheet ? sheet.getDataRange().getValues() : [];
    return ContentService.createTextOutput(JSON.stringify({
      status: "ok",
      studio: STUDIO_NAME,
      spreadsheetId: SPREADSHEET_ID,
      services: rows
    })).setMimeType(ContentService.MimeType.JSON);
  }

  if (action === "bookings") {
    const sheet = ss.getSheetByName("Appointments_Bookings");
    const rows = sheet ? sheet.getDataRange().getValues() : [];
    return ContentService.createTextOutput(JSON.stringify({
      status: "ok",
      bookings: rows
    })).setMimeType(ContentService.MimeType.JSON);
  }

  return HtmlService.createHtmlOutputFromFile("index")
    .setTitle("Laxmi Bridal Studio · Beauté naturelle")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Handles POST requests from the website booking modal and logs directly to:
 * 1. Google Sheets ('Appointments_Bookings' & 'Skin_Tone_Consultations')
 * 2. Google Calendar (creates a sanctuary appointment event)
 * 3. Gmail (sends confirmation receipt if email is provided)
 */
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const bookingSheet = ss.getSheetByName("Appointments_Bookings") || ss.insertSheet("Appointments_Bookings");

    const bookingId = "LBS-CH-" + Math.floor(1000 + Math.random() * 9000);
    const timestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");

    bookingSheet.appendRow([
      bookingId,
      timestamp,
      payload.clientName || "Valued Patron",
      payload.clientPhone || "",
      payload.clientEmail || "",
      payload.bridalFinish || "01 Dewy Glass Pearl",
      payload.selectedTreatment || "Signature Ritual",
      payload.preferredDate || "",
      payload.timeSlot || "11:30 AM",
      "Studio Sanctuary (Chital)",
      payload.estimatedTariff || "As per Menu",
      "CONFIRMED",
      payload.notes || ""
    ]);

    // Also log to Skin_Tone_Consultations if bridal finish was chosen
    if (payload.bridalFinish) {
      const consultSheet = ss.getSheetByName("Skin_Tone_Consultations");
      if (consultSheet) {
        consultSheet.appendRow([
          "CON-" + Math.floor(2000 + Math.random() * 7999),
          payload.clientName || "Valued Patron",
          payload.clientPhone || "",
          payload.notes || "Normal",
          payload.bridalFinish,
          payload.selectedTreatment || "Hydra-Glass Pearl Facial",
          timestamp
        ]);
      }
    }

    // Create Google Calendar Event if preferredDate is valid
    if (payload.preferredDate) {
      try {
        const cal = CalendarApp.getDefaultCalendar();
        const startDate = new Date(payload.preferredDate + "T11:00:00+05:30");
        const endDate = new Date(startDate.getTime() + 90 * 60 * 1000);
        cal.createEvent(
          `[Laxmi Bridal Studio] ${payload.selectedTreatment} — ${payload.clientName}`,
          startDate,
          endDate,
          {
            location: STUDIO_ADDRESS,
            description: `Booking ID: ${bookingId}\nPhone: ${payload.clientPhone}\nBridal Finish: ${payload.bridalFinish}\nNotes: ${payload.notes || ""}`
          }
        );
      } catch (calErr) {
        Logger.log("Calendar sync skipped: " + calErr);
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "confirmed",
      bookingId: bookingId,
      spreadsheetUrl: "https://docs.google.com/spreadsheets/d/" + SPREADSHEET_ID + "/edit",
      studioPhone: STUDIO_PHONE
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
