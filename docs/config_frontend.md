# Konfiguration des Frontends

Die Datei `./frontend/volumes/config/.env.example` enthält die Umgebungsvariablen, die für den Betrieb des Frontends erforderlich sind. Diese Datei dient als Vorlage für die Konfigurationsdateien der verschiedenen Umgebungen (`env.dev`, `env.stage`, `env.prod`).

## Beispielkonfiguration (`.env.example`)

```plaintext
CONFIG_NAME='Develop Config'
APP_ID='hackathon-manager-frontend'

# Logging
LOG_LEVEL=debug

# URLs & Ports
VITE_API_URL=http://localhost
VITE_HOST_URL=http://localhost
VITE_HOST_PORT=8200
VITE_API_PORT=3005

# Support
SUPPORT_EMAIL='mail@your-helpdesk.com'

# Secrets
API_SECRET='your-api-secret'
```


## Beschreibung der Variablen

### Allgemeine Konfiguration
- **CONFIG_NAME**: Name der Konfiguration, dient zur Identifikation und besserem Verständniss der einzelnen Configurationen.
- **APP_ID**: Eine eindeutige Kennung für die Frontend-Anwendung, die zur Identifikation in Logs oder Debugging verwendet werden kann.

### Logging
- **LOG_LEVEL**: Log-Level (`debug`, `info`, `warn`, `error`).

### URLs & Ports
- **VITE_API_URL**: Die Basis-URL der API, die vom Backend verwendet wird. Diese URL wird von anderen Diensten oder dem Frontend genutzt, um API-Anfragen zu stellen. Beispiel: http://localhost für lokale Entwicklung oder https://api.example.com für die Produktion.
- **VITE_HOST_PORT**: Der Port, auf dem die Anwendung erreichbar ist. Standardmäßig wird 8200 verwendet, kann aber je nach Umgebung angepasst werden. Beispiel: 80 für HTTP oder 443 für HTTPS.
- **VITE_HOST_URL**: Die URL des Hosts, auf dem die Anwendung läuft. Diese wird verwendet, um die Anwendung extern zugänglich zu machen. Beispiel: http://localhost für lokale Tests oder https://app.example.com für die Produktion.
- **VITE_API_PORT**: er Port, auf dem die API läuft. Dieser wird vom Backend verwendet, um Anfragen zu verarbeiten. Beispiel: 3005 für lokale Entwicklung.

### Support
- **SUPPORT_EMAIL**: Die E-Mail-Adresse des Support-Teams, die in der Anwendung angezeigt wird, um Benutzern Hilfe anzubieten.

### Secrets
- **API_SECRET**: Ein zusätzlicher geheimer Schlüssel, der für API-Zugriffe verwendet wird. Dieser wird zusätzlich zum persöhnlichen User Token genutzt, um sicherzustellen, dass nur autorisierte Dienste oder Benutzer auf bestimmte API-Endpunkte zugreifen können. Dieses muss mit dem API_SECRET aus dem Backend übereinstimmtn. Beispiel: 'MeinGeheimesApiPasswort'


## Verwendung
1. Kopiere die Datei .env.example in das Verzeichnis ./frontend/volumes/config/ und benenne sie entsprechend der Umgebung (env.dev, env.stage, env.prod).
2. Passe die Werte in der Datei an deine spezifischen Anforderungen an.

## Hinweise
- Stelle sicher, dass sensible Informationen wie `JWT_SECRET`, `API_SECRET` und `SMTP_PASSWORD` nicht in öffentlichen Repositories geteilt werden. Alle Dateien in dem config Ordner (mit ausnahme der Example Datei) stehen daher auch auf der gitignore liste.
- Für den produktiven Betrieb sollten sichere und eindeutige Werte verwendet werden.