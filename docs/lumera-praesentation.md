# Luméra — Projektübersicht

## Folie 1 — Titel
**Luméra**  
Premium Beauty & Skincare E-Commerce  
Aktueller Projektstand und technische Struktur

## Folie 2 — Produktidee
Luméra verbindet eine ruhige skandinavische Markenästhetik mit einem modernen Beauty-Commerce-Erlebnis. Die Anwendung führt von der Entdeckung über Produktdetails und Warenkorb bis zum Demo-Checkout und zur Bestellstatus-Timeline.

## Folie 3 — Aktueller Funktionsumfang
- Editoriale Startseite mit Hero, Essentials, Bestsellern und Brand Story
- Produktkatalog mit Suche, Kategorien und Sortierung
- Produktdetails mit Galerie, Inhaltsstoffen und echter-review-only Ausrichtung
- Persistenter Warenkorb und EUR-Zusammenfassung
- Demo-Konto, Checkout und Bestellbestätigung
- Rollen-geschützter Admin-Bereich

## Folie 4 — Bestelllebenszyklus im Demo-Modus
1. `order.confirmed`: Kundenbestätigung wird vorgemerkt.
2. `order.received`: Owner-Alert an `RintuChowdory@yahoo.com` wird vorgemerkt.
3. `order.shipped`: Wird erst nach **Mark as shipped** im Admin-Bereich erzeugt.

Es werden keine echten E-Mails versendet; Ereignisse werden als `demo-queued` im Browser gespeichert.

## Folie 5 — Technische Architektur
- React 19 und Vite für die Client-Anwendung
- Express als Serverprozess
- tRPC für typisierte Client-Server-Verträge
- Drizzle ORM und MySQL/TiDB-Konfiguration für Datenzugriff
- Manus OAuth-Struktur für Authentifizierung
- Stripe-Servergrundlage für gehostete Checkout-Sessions
- Vitest für automatisierte Tests

## Folie 6 — Repository-Struktur
| Bereich | Verantwortung |
|---|---|
| `client/src` | Seiten, UI-Komponenten, Theme und tRPC-Client |
| `server` | Router, Datenbank-Helfer, Auth- und Stripe-Grundlagen |
| `shared` | Katalog-, Warenkorb- und Order-Lifecycle-Logik |
| `drizzle` | Schema und Migrationen |
| `docs` | Admin-, Testbestellungs- und Setup-Dokumentation |
| `scripts` | Deterministische Hilfsskripte für die UI-Erstellung |

## Folie 7 — Wichtige Routen
- `/` — Marken-Homepage
- `/catalog` — Produktkatalog
- `/checkout` — Demo-Checkout und Benachrichtigungstimeline
- `/account` — Demo-Konto und gespeicherte Adressstruktur
- `/admin` — rollen-geschützter Admin-Bereich

## Folie 8 — Qualitätssicherung
Der aktuelle Repository-Stand wurde mit `pnpm check`, `pnpm test` und `pnpm build` geprüft. Die Test-Suite umfasst 6 Testdateien und 14 bestandene Tests, darunter Kataloglogik, Warenkorb, Auth-Logout sowie Bestell- und Benachrichtigungs-Lifecycle.

## Folie 9 — Lokale Entwicklung
```bash
git clone https://github.com/rintuchowdory/lumera-ecommerce.git
cd lumera-ecommerce
pnpm install --frozen-lockfile
pnpm dev
```

Die Entwicklungsoberfläche läuft normalerweise unter `http://localhost:3000`. Für die lokale Prüfung sind außerdem `pnpm check`, `pnpm test` und `pnpm build` vorgesehen.

## Folie 10 — Nächste Ausbaustufen
Die nächsten Produktionsschritte sind die vollständige Datenbankpersistenz für Commerce-Entitäten, die Verbindung des Frontend-Redirects mit Stripe Checkout, ein echter E-Mail-Provider für Benachrichtigungen, eine vollständige Admin-Produktverwaltung und erweiterte End-to-End-Tests. Die Demo bleibt bewusst ohne echte E-Mail-Zustellung und ohne Speicherung von Kartendaten.
