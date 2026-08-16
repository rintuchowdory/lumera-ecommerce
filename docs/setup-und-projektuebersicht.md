# Luméra lokal aufsetzen und Entwicklungsserver starten

## Voraussetzungen

Luméra benötigt Node.js, pnpm und Git. Das Projekt verwendet React, Vite, Express, tRPC, Drizzle ORM und Vitest. Die empfohlene Node-Version entspricht der im Projekt beziehungsweise in der lokalen Entwicklungsumgebung verwendeten aktuellen LTS-Version.

## Repository klonen

```bash
git clone https://github.com/rintuchowdory/lumera-ecommerce.git
cd lumera-ecommerce
```

## Abhängigkeiten installieren

```bash
pnpm install --frozen-lockfile
```

Die Option `--frozen-lockfile` stellt sicher, dass exakt die im `pnpm-lock.yaml` festgehaltenen Versionen installiert werden.

## Umgebungsvariablen

Für die vollständige Server-, Authentifizierungs-, Datenbank- und Stripe-Integration werden die in der Zielumgebung bereitgestellten Variablen benötigt. Dazu gehören unter anderem `DATABASE_URL`, `JWT_SECRET`, Manus-OAuth-Variablen und Stripe-Konfigurationen. Keine geheimen Werte in Git committen. Für eine reine UI-Ansicht kann die Anwendung ohne eigene lokale Produktionsschlüssel gestartet werden; einzelne Backend-Funktionen bleiben dann erwartungsgemäß eingeschränkt.

## Entwicklungsserver starten

```bash
pnpm dev
```

Danach ist die Anwendung normalerweise unter `http://localhost:3000` erreichbar. Die genaue Portbelegung wird vom Serverprozess beziehungsweise der lokalen Entwicklungsumgebung bestimmt. Den Server mit `Ctrl+C` beenden.

## Nützliche Prüf- und Build-Befehle

| Befehl | Zweck |
|---|---|
| `pnpm check` | TypeScript-Prüfung ohne Ausgabe von Build-Dateien |
| `pnpm test` | Ausführung der Vitest-Test-Suite |
| `pnpm build` | Produktions-Build von Frontend und Server |
| `pnpm start` | Start des erzeugten Produktions-Bundles |
| `pnpm format` | Formatierung mit Prettier |
| `pnpm db:push` | Drizzle-Migrationsworkflow; nur mit korrekt konfigurierter Datenbank ausführen |

## Wichtige Routen

Die öffentliche Oberfläche beginnt unter `/`. Der Produktkatalog ist unter `/catalog` erreichbar, der Demo-Checkout unter `/checkout`, die Demo-Kontoansicht unter `/account` und der rollen-geschützte Admin-Bereich unter `/admin`.

> Die Demo-Bestellungen und Benachrichtigungen werden lokal im Browser simuliert. Es werden keine echten E-Mails versendet und im Demo-Ablauf keine realen Kartendaten verarbeitet.

## Aktueller Projektstand

Die Luméra-Oberfläche enthält die Premium-Startseite, Katalogsuche und Filter, Produktdetails, persistenten Warenkorb, Demo-Konto, EUR-Checkout, rollen-geschützten Admin-Bereich und einen expliziten Demo-Bestelllebenszyklus. Der Server enthält außerdem die Grundlage für Stripe Checkout und die typisierten tRPC-/Drizzle-Strukturen. Die Produktionsprüfung im separaten Repository wurde mit TypeScript-Check, 14 Vitest-Tests und dem Produktions-Build erfolgreich durchgeführt.
