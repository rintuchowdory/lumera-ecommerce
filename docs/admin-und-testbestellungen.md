# Luméra: Admin-Oberfläche und Demo-Testbestellungen

## Zweck

Diese Kurzdokumentation beschreibt die derzeitige Demo-Funktionalität von Luméra. Die Testbestellungen dienen ausschließlich zur Prüfung des Bestellablaufs und versenden weder echte E-Mails noch lösen sie eine reale Zahlung aus.

## Admin-Oberfläche

Die Admin-Oberfläche ist unter `/admin` erreichbar. Der Zugriff ist **rollen-geschützt** und setzt eine authentifizierte Sitzung mit der Rolle `admin` voraus. Nicht angemeldete Nutzer sehen stattdessen eine Zugriffsbeschränkung und können zum Store zurückkehren.

Im Admin-Bereich werden die wichtigsten Kennzahlen und die Produktübersicht angezeigt. Sobald im Demo-Checkout eine Bestellung erstellt wurde, erscheint sie im Bereich **Orders**. Dort werden die Bestellnummer, die Kundenadresse, der Bestellwert und der aktuelle Status angezeigt.

| Status | Bedeutung |
|---|---|
| `confirmed` | Die Bestellung wurde im Demo-Checkout angelegt. Kundenbestätigung und Owner-Alert sind als Demo-Ereignisse vorgemerkt. |
| `shipped` | Die Bestellung wurde im Admin-Bereich über **Mark as shipped** als versendet markiert. Dadurch wird das Versandereignis für den Kunden vorgemerkt. |

Die Demo-Bestellung und ihre Ereignisse werden im Browser gespeichert. Dadurch bleiben sie nach einem erneuten Öffnen der Checkout-Seite innerhalb derselben Browser-Sitzung sichtbar.

## Demo-Testbestellung durchführen

Öffne `/checkout`, fülle die Versanddaten aus und wähle als Land **Germany**. Verwende beispielsweise `demo@example.com` als Kundenadresse. Klicke anschließend auf **Place demo order**.

Nach dem Absenden zeigt Luméra eine Bestellbestätigung mit zwei Demo-Ereignissen:

| Ereignis | Empfänger | Zeitpunkt |
|---|---|---|
| `order.confirmed` | Die angegebene Kundenadresse | Bei der Bestellung |
| `order.received` | `RintuChowdory@yahoo.com` | Bei der Bestellung |

Der Versand wird absichtlich nicht sofort ausgelöst. Öffne anschließend `/admin`, melde dich als Administrator an und klicke bei der Testbestellung auf **Mark as shipped**. Danach wird das dritte Ereignis erzeugt:

| Ereignis | Empfänger | Zeitpunkt |
|---|---|---|
| `order.shipped` | Die angegebene Kundenadresse | Nach der Admin-Aktion |

Wenn du danach `/checkout` erneut öffnest, wird die gespeicherte Bestellbestätigung automatisch wiederhergestellt und die Versandbenachrichtigung in der Timeline angezeigt.

## Wichtige Demo-Einschränkungen

> Die Ereignisse haben den Status `demo-queued`. Dieser Status bedeutet, dass der Ablauf innerhalb der Anwendung simuliert und sichtbar gemacht wird. Es wird kein E-Mail-Provider aufgerufen.

Die Adresse `RintuChowdory@yahoo.com` ist als Empfänger des Demo-Alerts hinterlegt. Für einen produktiven Betrieb müssten ein echter E-Mail-Dienst, eine persistente Datenbank für Bestellungen und Benachrichtigungen sowie die finale Stripe-Webhook-Verarbeitung ergänzt werden. Rohdaten von Zahlungskarten werden in diesem Demo-Ablauf nicht verarbeitet oder gespeichert.

## Relevante Routen

| Route | Zweck |
|---|---|
| `/checkout` | Demo-Bestellung anlegen und Bestell-/Benachrichtigungstimeline anzeigen |
| `/admin` | Geschützte Admin-Ansicht und Demo-Versandaktion |
| `/account` | Demo-Kontoansicht |

