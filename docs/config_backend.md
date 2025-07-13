# Konfiguration des Backends

Die Datei `./backend/volumes/config/env.example` enthält die Umgebungsvariablen, die für den Betrieb des Backends erforderlich sind. Diese Datei dient als Vorlage für die Konfigurationsdateien der verschiedenen Umgebungen (`env.dev`, `env.stage`, `env.prod`).

## Beispielkonfiguration (`env.example`)

```plaintext
# Allgemeine Konfiguration
CONFIG_NAME='Example Config'

# Logging
LOG_LEVEL=debug
LOG_DIR=./logs

# URLs & Ports
API_URL=http://localhost
API_PORT=3005
HOST_URL=http://localhost
HOST_PORT=8200

# Datenbank
DB_PATH=./volumes/database/hackathon.dev.db

# Secrets
JWT_SECRET=<your-secret-key>
API_SECRET=<your-api-secret>

# Sicherheit & Domains
ALLOWED_DOMAINS=your-domain.com,department-domain.com
ACTIVATION_URL=http://localhost:8200/account-activation

# SMTP-Konfiguration
SMTP_HOST=<SMTP_HOST>
SMTP_PORT=<SMTP_PORT>
SMTP_USER=<SMTP_USER>
SMTP_PASSWORD=<SMTP_PASSWORD>
SMTP_SECURE=true
SMTP_FROM=<SENDER_EMAIL>
SMTP_UNAUTHORIZED=false
```

## Beschreibung der Variablen

### Allgemeine Konfiguration
- **CONFIG_NAME**: Name der Konfiguration, dient zur Identifikation und besserem Verständniss der einzelnen Configurationen.

### Logging
- **LOG_LEVEL**: Log-Level (`debug`, `info`, `warn`, `error`).
- **LOG_DIR**: Verzeichnis, in dem die Log-Dateien gespeichert werden.

### URLs & Ports
- **API_URL**: Die Basis-URL der API, die vom Backend verwendet wird. Diese URL wird von anderen Diensten oder dem Frontend genutzt, um API-Anfragen zu stellen. Beispiel: http://localhost für lokale Entwicklung oder https://api.example.com für die Produktion.
- **HOST_PORT**: Der Port, auf dem die Anwendung erreichbar ist. Standardmäßig wird 8200 verwendet, kann aber je nach Umgebung angepasst werden. Beispiel: 80 für HTTP oder 443 für HTTPS.
- **HOST_URL**: Die URL des Hosts, auf dem die Anwendung läuft. Diese wird verwendet, um die Anwendung extern zugänglich zu machen. Beispiel: http://localhost für lokale Tests oder https://app.example.com für die Produktion.
- **API_PORT**: er Port, auf dem die API läuft. Dieser wird vom Backend verwendet, um Anfragen zu verarbeiten. Beispiel: 3005 für lokale Entwicklung.

### Datenbank
- **DB_PATH**: Der Pfad zur Datenbankdatei, die vom Backend verwendet wird. Diese Datei enthält alle Daten, die von der Anwendung gespeichert werden, wie Projekte, Teams und Benutzerinformationen. Beispiel: ./volumes/database/hackathon.dev.db für lokale Entwicklung.

### Secrets
- **JWT_SECRET**: Ein geheimer Schlüssel, der für die Erstellung und Validierung von JSON Web Tokens (JWT) verwendet wird. JWTs werden für die Authentifizierung und Autorisierung von Benutzern genutzt. Dieser Schlüssel sollte sicher und einzigartig sein. Beispiel: 'MeinSuperGeheimesPasswort'
- **API_SECRET**: Ein zusätzlicher geheimer Schlüssel, der für API-Zugriffe verwendet wird. Dieser wird zusätzlich zum persöhnlichen User Token genutzt, um sicherzustellen, dass nur autorisierte Dienste oder Benutzer auf bestimmte API-Endpunkte zugreifen können. Beispiel: 'MeinGeheimesApiPasswort'

### Sicherheit & Domains
- **ALLOWED_DOMAINS**: Eine Liste von Domains, die Zugriff auf die Anwendung haben dürfen. Benutzer mit einer Mail Adresse dieser Domain, die sich neu bei der Anwendung registrieren, werden nach erfolgreicher EMail aktivierung automatisch freigeschaltet. Alle anderen erhalten einen Gast Status und müssen erst von einem Organisator freigeschaltet werden. Beispiel: your-domain.com,department-domain.com..
- **ACTIVATION_URL**: Die URL, die für die Aktivierung von Benutzerkonten verwendet wird. Diese wird in E-Mails zur Kontoaktivierung eingebettet, damit Benutzer ihre Konten bestätigen können. Beispiel: http://localhost:8200/account-activation für lokale Tests oder https://app.example.com/account-activation für die Produktion.

### SMTP-Konfiguration
- **SMTP_HOST**: Hostname des SMTP-Servers.
- **SMTP_PORT**: Port des SMTP-Servers.
- **SMTP_USER**: Benutzername für den SMTP-Server.
- **SMTP_PASSWORD**: Passwort für den SMTP-Server.
- **SMTP_SECURE**: Gibt an, ob eine sichere Verbindung verwendet wird (`true` oder `false`).
- **SMTP_FROM**: Absenderadresse für E-Mails.
- **SMTP_UNAUTHORIZED**: Gibt an, ob unautorisierte SMTP-Verbindungen erlaubt sind (`true` oder `false`).

## Verwendung
1. Kopiere die Datei `env.example` in das Verzeichnis `./backend/volumes/config/` und benenne sie entsprechend der Umgebung (`env.dev`, `env.stage`, `env.prod`).
2. Passe die Werte in der Datei an deine spezifischen Anforderungen an.

## Hinweise
- Stelle sicher, dass sensible Informationen wie `JWT_SECRET`, `API_SECRET` und `SMTP_PASSWORD` nicht in öffentlichen Repositories geteilt werden. Alle Dateien in dem config Ordner (mit ausnahme der Example Datei) stehen daher auch auf der gitignore liste.
- Für den produktiven Betrieb sollten sichere und eindeutige Werte verwendet werden.