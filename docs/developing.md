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

### Abhängigkeiten installieren
#### Backend einrichten
Alle erforderlichen Abhängigkeiten für das Projekt müssen installiert werden.
```sh
cd ./backend
npm install
```

#### Frontend einrichten

Alle erforderlichen Abhängigkeiten für das Projekt müssen installiert werden.
```sh
cd ./frontend
npm install
```

### Anwendung lokal starten
#### Backend starten ####
Wenn die Konfiguration erfolgt ist und die Pakete alle installiert sind, kann das Backend gestartet werden.
Beim ersten Start wird die Datenbank automatisch erstellt und initialisiert.

```sh
cd ./backend
npm run start-dev 
```
Du kannst je nach Bedarf für die verschiedenen Environments, die folgenden Start Befehler verwenden: `start-dev`, `start-stage`, `start-prod`.  
Der Server (Docker) verwendet allgemein `start`. Dort wird die Environment dann entsprechend der zuvor gesetzten Umgebungsvariable verwendet.

Du kannst überprüfen, ob das Backend läuft, indem du die folgenden Endpunkte aufrufst:

* **Health Check**: http://localhost:3005/api/health
* **API-Dokumentation (Swagger)**: http://localhost:3005/api-docs

URL & Port eventuell entsprechend deines Setups anpassen.

#### Frontend starten
Jetzt kannst du das Frontend starten.

```sh
cd ./frontend
npm run start-dev 
```

### Anwendung als docker container starten
Wenn die Konfiguration erfolgt enstsprechend obiger Doku erfolgt ist, kann das Projekt auch per Docker gestartet werden.
Beim ersten Start wird auch hier die Datenbank automatisch erstellt und initialisiert.

- Starte die Umgebung mit:
   ```bash
   docker compose up --build
   ```
- Stoppe die Umgebung mit:
   ```bash
   docker compose down
   ```

### Anwendung
#### Backend 

Das Backend stellt unter http://url:port die folgenden Endpunkte bereit. Für mehr details siehe die entsprechende Swagger Doku unter `/api-docs/`

| Pfad            | Funktion                       |
| --------------- | ------------------------------ |
| `/api/`         | Haupt-REST-API                 |
| `/api-docs/`    | API-Dokumentation (Swagger)    |
| `/api/health/`  | Gesundheitsprüfung             |
| `/api/metrics/` | Prometheus-kompatible Metriken |

#### Frontend
Öffne die Hackathon-App in deinem Browser 

==> http://localhost:8200

Melde dich mit den Standardanmeldedaten an:

    Benutzer: hackathon@thalia.de
    Passwort: welcome!

# Architektur
## API 
Die REST-API wird automatisch mit Swagger dokumentiert. Nach dem Start ist sie verfügbar unter:
http://localhost:3005/api-docs

## Monitoring 
Für einen einfachen Health-Check kannst du http://localhost:3000/api/health aufrufen.

Für detailliertere Analysen kannst du Prometheus verwenden und die API-Messungen unter http://localhost:3005/metrics abrufen.

## Datenbankstruktur

 <img src="./db_structure.png" alt="db structure" width="600" height= "600"/>

### Create a Diagramm

2. copy the code from ´db_diagram.txt´
3. paste it here: [db](https://dbdiagram.io/d)
4. edit and reorder things
5. take picture (MAC: Cmd + Shift + 4)
6. replace ´db_structure.png´ with the new image and replace the code with new the new code

# Konventionen
siehe [CONTRIBUTING](../CONTRIBUTING.md)

* **API-Dokumentation (Swagger)**: [Swagger-Dokumentation](https://swagger.io/docs/)
* **Prometheus-Metriken**: [Prometheus-Dokumentation](https://prometheus.io/docs/)
