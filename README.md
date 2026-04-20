# Isha's Space Party – Wunschliste 🚀

## Deployment auf Netlify (Schritt für Schritt)

### 1. Netlify-Konto erstellen
Gehe zu https://netlify.com und melde dich kostenlos an.

### 2. Neues Projekt anlegen
- Klicke auf **"Add new site" → "Deploy manually"**
- Ziehe den gesamten **Ordner `isha-wishlist`** in das Uploadfeld
- Netlify deployt die Seite und gibt dir eine URL wie `https://abc123.netlify.app`

### 3. Seite umbenennen (empfohlen)
- Gehe zu **Site settings → General → Site name**
- Ändere den Namen zu z.B. `isha-party-2026`
- Deine permanente URL: `https://isha-party-2026.netlify.app`

### 4. Admin-Passwort setzen ← WICHTIG
Das Passwort wird NICHT im Code gespeichert, sondern sicher in Netlify:
- Gehe zu **Site settings → Environment variables**
- Klicke **"Add a variable"**
- Key:   `ADMIN_PASSWORD`
- Value: `DeinGeheimsPasswort123`  ← wähle etwas Eigenes!
- Klicke **Save**
- Dann: **Deploys → Trigger deploy → Deploy site** (damit die Variable aktiv wird)

### 5. Fertig! 🎉
- Teile die URL mit anderen Eltern – sie sehen die Wunschliste
- Du loggst dich mit dem 🔒-Button (unten rechts) und deinem Passwort ein
- Wenn du ein Geschenk als vergeben markierst, sehen das ALLE sofort

## Seite aktualisieren
Falls du die Geschenkliste im Code ändern möchtest:
- Bearbeite `index.html` (die Standardliste in `netlify/functions/get-gifts.mjs`)
- Gehe zu **Deploys → Deploy manually** und lade den Ordner erneut hoch
- Die URL bleibt gleich!

## Projektstruktur
```
isha-wishlist/
├── index.html                          ← Die Webseite
├── netlify.toml                        ← Netlify-Konfiguration
└── netlify/
    └── functions/
        ├── get-gifts.mjs               ← Liest die Geschenkliste
        └── update-gifts.mjs            ← Speichert Änderungen (passwortgeschützt)
```

## Wie es funktioniert
- Die Geschenkliste wird in **Netlify Blobs** gespeichert (kostenlos inklusive)
- Wenn du ein Geschenk als vergeben markierst → wird in der Cloud gespeichert
- Alle Eltern sehen denselben Stand beim Laden der Seite
- Das Passwort verlässt nie deinen Browser (wird nur zur Prüfung ans Backend gesendet)
