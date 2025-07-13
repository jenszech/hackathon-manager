# Entwicklung

Für den Betrieb des Hackathon Managers reicht unser zweites Projekt [Hackathon-Stack](https://github.com/jenszech/hackathon-stack).  
Mehr Informationen zur Konfiguration und zum Betrieb findest du dort.

Wenn du selbst Hand anlegen und mitentwickeln möchtest, bist du hier richtig!  
Dieses Repository enthält den Quellcode für die Entwicklung des Hackathon Managers.  

Im Folgenden findest du eine kurze Anleitung, wie du das Projekt auscheckst, einrichtest, konfigurierst und startest.

## Inhaltsverzeichnis

- [Projekt einrichten](#projekt-einrichten)
- [Repository klonen](#repository-klonen)
- [Backend starten](#backend-starten)
- [Frontend starten](#frontend-starten)
- [Architektur](#architektur)
  - [API](#api)
  - [Monitoring](#monitoring)
  - [Datenbankstruktur](#datenbankstruktur)
- [Testen und Bereitstellen mit Docker](#testen-und-bereitstellen-mit-docker)
- [Konventionen](#konventionen)
  - [PreCommit-Aufgaben](#precommit-aufgaben)
  - [GIT-Branches](#git-branches)
  - [Commit-Konventionen](#commit-konventionen)
- [Verwendete Tools & Bibliotheken](#verwendete-tools--bibliotheken)


# Projekt einrichten
Um das Projekt lokal auszuführen, folge diesen Schritten:

1. **Repository klonen**  
   - Klone das Projekt aus dem Repository.
2. **Backend einrichten**  
   - Konfiguriere das Backend  
   - Installiere die Abhängigkeiten  
   - Starte das Backend  
3. **Frontend einrichten**  
   - Konfiguriere das Frontend  
   - Installiere die Abhängigkeiten  
   - Starte das Frontend  
   - Greife auf die Anwendung zu  
4. **Zusätzliche Informationen**  
   - Führe einen Health-Check durch  
   - Sieh dir die API-Dokumentation an  

Beachte die [Branching-Konventionen](#branching-conventions) & [Commit-Konventionen](#commit-conventions) ! 

## Repository klonen
Wenn du HTTP zum Klonen verwenden möchtest, musst du zuerst ein Zugriffstoken erstellen.
Link zum Erstellen eines Zugriffstokens -> https://gitlab-ext.drsbln.de/-/user_settings/personal_access_tokens

Wenn du ein persönliches "Access Token" in deinem GitLab-Benutzerprofil erstellt hast, kannst du es wie folgt verwenden:
```sh
git clone https://<Dein_Login_Name>:<dein_gitlab-token>@gitlab-ext.drsbln.de/hackathon/hackathon-manager.git
```

## Einrichten der Entwicklungsumgebung
### Konfiguration erstellen
Für die Entwicklungsumgebung muss eine Konfigurationsdatei erstellt werden. Die Konfiguration wird basierend auf der Umgebungsvariable `NODE_ENV` verwendet. Die möglichen Werte für `NODE_ENV` sind:

- `dev`, `development`: Für lokale Entwicklung.
- `stage`, `staging`: Für Testumgebungen.
- `prod`, `production`: Für den produktiven Betrieb.

Falls nötig, kannst du die Werte in der Konfigurationsdatei anpassen, um deine spezifischen Anforderungen zu erfüllen.

#### Verzeichnisstruktur
Die erforderliche Verzeichnisstruktur für die Entwicklungsumgebung sieht wie folgt aus:

```
.
├── backend
│   └── volumes
│       ├── config
│       │   ├── .env.example
│       │   ├── .env.dev
│       │   ├── .env.prod
│       │   └── .env.stage
│       ├── data
│       │   ├── Projects.example.js
│       │   ├── Teams.example.js
│       │   └── User.example.js
│       └── database
│           ├── hackathon.dev.db
│           ├── hackathon.prod.db
│           └── hackathon.stg.db
└── frontend
    └── volumes
        ├── config
        │   ├── .env.example
        │   ├── .env.dev
        │   ├── .env.prod
        │   └── .env.stage
        └── nginx
            └── default.conf
```
#### Backend konfigurieren

Lege die für deine Umgebung benötigten Konfigurationsdateien an. Dieser kannst du anhand der Beispiel Datei initial anlegen und dann entsprechend anpassen

```sh
cp ./backend/volumes/config/.env.example ./backend/volumes/config/.env.dev
```
Passe nun die Datei `.env.dev` entsprechend deinen Bedürfnissen an.
Eine Dokumentation der möglichen Configurations Parameter findest du [hier](./config_backend.md)

#### Frontend konfigurieren

Lege die für deine Umgebung benötigten Konfigurationsdateien an. Dieser kannst du anhand der Beispiel Datei initial anlegen und dann entsprechend anpassen

```sh
cp ./frontend/volumes/config/.env.example ./frontend/volumes/config/.env.dev
```
Passe nun die Datei `.env.dev` entsprechend deinen Bedürfnissen an.
Eine Dokumentation der möglichen Configurations Parameter findest du [hier](./config_frontend.md)

#### Abhängigkeiten installieren ####

Alle erforderlichen Abhängigkeiten für das Projekt müssen installiert werden.
```sh
npm install
```

#### Backend starten ####
Jetzt kannst du das Backend starten.

Beim ersten Start wird die Datenbank automatisch erstellt und initialisiert.

```sh
npm run start-dev 
```

#### Überprüfen, ob das Backend läuft ####

Du kannst überprüfen, ob das Backend läuft, indem du die folgenden Endpunkte aufrufst:

* **Health Check**: http://localhost:3000/api/health
* **API-Dokumentation (Swagger)**: http://localhost:3000/api-docs

### Frontend starten ####
Zuerst muss eine Konfigurationsdatei für die Entwicklungsumgebung erstellt werden.

```sh
cd frontend
cp env.example env.dev
```
Falls nötig, kannst du die Werte in der Konfigurationsdatei anpassen, um deine spezifischen Anforderungen zu erfüllen.

#### Abhängigkeiten installieren ####

Alle erforderlichen Abhängigkeiten für das Projekt müssen installiert werden.
```sh
npm install
```

### Frontend starten ###
Jetzt kannst du das Frontend starten.

```sh
npm run start-dev 
```

#### Auf die Anwendung zugreifen #### 

Öffne die Hackathon-App in deinem Browser 

==> http://localhost:5175

Melde dich mit den Standardanmeldedaten an:

    Benutzer: hackathon@thalia.de
    Passwort: welcome!

# Architektur
## API 
Die REST-API wird automatisch mit Swagger dokumentiert. Nach dem Start ist sie verfügbar unter:
http://localhost:3000/api-docs

## Monitoring 
Für einen einfachen Health-Check kannst du http://localhost:3000/api/health aufrufen.

Für detailliertere Analysen kannst du Prometheus verwenden und die API-Messungen unter http://localhost:3000/metrics abrufen.

## Datenbankstruktur

 <img src="./db_structure.png" alt="db structure" width="600" height= "600"/>

### Create a Diagramm

2. copy the code from ´db_diagram.txt´
3. paste it here: [db](https://dbdiagram.io/d)
4. edit and reorder things
5. take picture (MAC: Cmd + Shift + 4)
6. replace ´db_structure.png´ with the new image and replace the code with new the new code

## Testen und Bereitstellen mit Docker
Bitte lösche diesen Ordner nicht!
Für die Verwendung von Docker gibt es einen Ordner mit einem Entwurf für die Konfiguration von Docker, Docker-Compose und Traefik mit LetsEncrypt. Dieser Ordner ist notwendig, um eine lokale Umgebung mit LetsEncrypt und einem Reverse Proxy wie Traefik vorzubereiten.

Der Ordner wird auch verwendet, um einen Produktionsserver und die Umgebung mit der entsprechenden DNS- und LetsEncrypt-Zertifikatskonfiguration einzurichten.

# Konventionen

## PreCommit-Aufgaben

### Backend
```sh
npm test
npm format
```

### Frontend
```sh
npm test
npm test.e2e
npm eslint
npm format
```

## GIT-Branches
### Haupt-Branches:

- **`main`**: Dieser Branch sollte nur **produktionsfertigen Code** enthalten. Er sollte nur **sauberen, vollständigen, stabilen und gut getesteten** Code enthalten. Änderungen sollten nur über saubere Pull Requests (PRs) vom `develop`-Branch kommen. Die Änderungen sollten erst nach gründlicher Prüfung und Tests durch andere gemergt werden.
- **`develop`**: Der Integrations-Branch, in dem neue Features und Bugfixes vor dem Merge in den `main`-Branch committet werden. Sobald die Änderungen committet sind, beginnt der **Staging**-Prozess mit Tests und Integration. Der Code muss nicht vollständig sein, sollte aber funktionieren!

### Kurzlebige Branches:

- **`feature/`**: Branches für Features mit spezifischen Kategorien! Sie sollten entsprechend dem Feature benannt werden, z. B. `feature/add-profil-page`. Mehrere Entwickler und Personen sollten am selben Feature arbeiten können.
- **`bugfix/`**: Branches für Bugfixes, z. B. `bugfix/fix-login-error`.
- **`experimental/`**: Branches für experimentelle Features oder zum Ausprobieren neuer Technologien, die nicht stabil sind, unvollständige Anforderungen haben oder bei denen unklar ist, ob sie verwendet werden sollen, z. B. `experimental/try-new-dark-theme`.

### Commit-Konventionen

Um die Organisation zu verbessern, empfehlen wir die Verwendung der folgenden Präfixe:

- **`feat:`** für neue Features (z. B. `feat: Add user authentication module`)
- **`fix:`** für Bugfixes (z. B. `fix: Resolve login error`)
- **`chore:`** für kleinere Änderungen (z. B. `chore: Update README with new setup instructions`)

## Verwendete Tools & Bibliotheken

* **API-Dokumentation (Swagger)**: [Swagger-Dokumentation](https://swagger.io/docs/)
* **Prometheus-Metriken**: [Prometheus-Dokumentation](https://prometheus.io/docs/)
