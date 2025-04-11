# Wetter-App 🌦️

Eine interaktive React-Anwendung zur Anzeige von aktuellen Wetterdaten, 7-Tage-Vorhersage, animierten Icons, analoger Uhrzeit und Kartendarstellung für jeden beliebigen Ort.

## Features

- 🧭 Standortsuche mit OpenStreetMap / Leaflet
- 📍 Anzeige der aktuellen Wetterdaten (Temperatur, Wind, Feuchtigkeit, Niederschlag)
- 📅 7-Tage-Vorhersage mit SVG-Wettericons
- ⏰ Analoge Echtzeit-Uhr in Ortszeit (per TimeAPI)
- 📍 Ortskarte mit Marker
- 🎨 Benutzerdefiniertes Styling, Schriftart: Bebas Neue

## Technologien

- React
- Vite
- Leaflet.js
- Open-Meteo API
- TimeAPI.io
- React-Clock
- Weather-Icons (basmilius/weather-icons)
- CSS Modules / Custom Props / Fluid Typography

## Herausforderungen

- Zuordnung von Wettercodes zu Icons
- Ermittlung der lokalen Uhrzeit für beliebige Orte
- Dynamisches Styling mit CSS Custom Properties
- Fehlerbehandlung bei fehlerhaften API-Aufrufen

## Nice to have (zukünftig)

- Klickbare Vorhersage-Karten zur Anzeige der Details oben
- Speicherung von Lieblingsorten (LocalStorage)
- Responsives Design für Mobilgeräte

## Setup

```bash
npm install
npm run dev
```

## Lizenz

MIT