// To connect a Google Sheet:
//   1. Open your Google Sheet → File → Share → Publish to web
//   2. Choose "Comma-separated values (.csv)" and click Publish
//   3. Copy the URL and paste it below
//
// Column order must be: date, time, title, description, location, type
// Date format: YYYY-MM-DD   (e.g. 2026-08-12)
// Type options: Public Meeting, Workshop, Open House, Forum, Roundtable
//
// When EVENTS_CSV_URL is empty the app uses public/events.csv as a fallback.

export const EVENTS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRpTnytsybUIoLOQnvzkweVLrNptqv_U9zL-yk1WA19Gw3k4d3NQfCp0llZ9evH0bE1ytgeaXlOUVq8/pub?output=csv"
