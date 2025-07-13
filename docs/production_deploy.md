# 🧩 Hackathon Manager Deployment mit Docker & Traefik

[![Frontend Image](https://img.shields.io/badge/docker-ghcr.io/jenszech/hackathon--frontend-blue)](https://github.com/users/jenszech/packages/container/package/hackathon-frontend)
[![Backend Image](https://img.shields.io/badge/docker-ghcr.io/jenszech/hackathon--backend-blue)](https://github.com/users/jenszech/packages/container/package/hackathon-backend)
[![Build Images](https://github.com/jenszech/hackathon-manager/actions/workflows/build.yaml/badge.svg)](https://github.com/jenszech/hackathon-manager/actions/workflows/build.yaml)

Diese Konfiguration deployt die Webanwendung „Hackathon Manager“ bestehend aus einem **Node.js Backend** und einem **NGINX-Frontend**. Die Bereitstellung erfolgt mit Docker Compose, die Routenverwaltung übernimmt **Traefik** mit HTTPS (TLS).

---

## 📦 Architekturübersicht

```text
            +----------------------------+
            |     Traefik Reverse Proxy  |
            +----------------------------+
               |                |
   https://domain/api        https://domain/
     (Backend/API)             (Frontend)
       |                          |
+----------------+      +------------------------+
|  hackathon-api |      |  hackathon-frontend    |
|  Node.js (3005)|      |  NGINX (80) + SPA App  |
+----------------+      +------------------------+
```

---

## 🚀 Start in 3 Schritten

```bash
# 1. (Optional) Externes Netzwerk für Traefik anlegen
docker network create web

# 2. Images laden
docker-compose pull

# 3. Container starten
docker-compose up -d
```

---

## 🧠 Service-Erklärung

### ⚙️ `hackathon-api`

Das Node.js-Backend verarbeitet API-Requests und stellt Monitoring-/Dokumentationsendpunkte bereit.

**Wichtige Konfigurationen:**

- **Port:** `3005`
- **Befehl:** `npm install && npm run start`
- **Bind-Mount:** `./backend → /usr/src/app`
- **Routing mit Traefik (via Labels):**
  - `/api` → Haupt-API
  - `/api/health` → Health-Check
  - `/metrics` → Prometheus-Endpunkt
  - `/api-docs` → Swagger/OpenAPI-Dokumentation

```yaml
command: /bin/sh -c "npm install && npm run start"
```

**Traefik-Zielport:**  
```yaml
traefik.http.services.hackathonapi-service.loadbalancer.server.port=3005
```

---

### 🌐 `hackathon-frontend`

Das gebaute Frontend (SPA) wird über einen NGINX-Container ausgeliefert.

**Wichtige Konfigurationen:**

- **Bind-Mounts:**
  - `./frontend/dist → /usr/share/nginx/html`
  - `./frontend/nginx/default.conf → /etc/nginx/conf.d/default.conf`
  - `./frontend/nginx/nginx.conf → /etc/nginx/nginx.conf`

- **Traefik-Router:**
  - `/` → Hauptseite
  - TLS aktiviert inkl. Domain-Spezifikation

```yaml
traefik.http.services.hackathon.loadbalancer.server.port=80
```

---

## 🔐 Traefik-Routing im Detail

### 💡 Voraussetzungen:

- Traefik läuft **außerhalb** dieses Stacks (z. B. als globaler Reverse Proxy)
- Externes Netzwerk `web` verbindet Traefik und diese Services
- TLS aktiv (z. B. über Let's Encrypt per Traefik)

### 🗺️ Routenübersicht

| Pfad               | Beschreibung             | Zielservice              |
|--------------------|--------------------------|--------------------------|
| `/api`             | Haupt-API                | `hackathon-api`          |
| `/api/health`      | Health-Check             | `hackathon-api`          |
| `/metrics`         | Monitoring-Daten         | `hackathon-api`          |
| `/api-docs`        | Swagger/OpenAPI-Doku     | `hackathon-api`          |
| `/`                | Haupt-UI (SPA via NGINX) | `hackathon-frontend`     |

---

## 🗃️ Verzeichnisstruktur

```text
.
├── backend/                      # Node.js Backend Code
├── frontend/
│   ├── dist/                     # Build-Ausgabe des SPA (für NGINX)
│   └── nginx/
│       ├── default.conf          # App-Routing, Proxy zu /api
│       └── nginx.conf            # Grundkonfiguration
├── docker-compose.yaml          # Haupt-Setup für Deployment
```

---

## 🔌 Netzwerke

```yaml
networks:
  web:        # Externes Netzwerk, z. B. mit Traefik verbunden
    external: true

  internal:   # Lokales Bridge-Netz zwischen API und Frontend
    driver: bridge
```

- `web`: Traefik verbindet sich über dieses Netzwerk mit den Containern
- `internal`: stellt Verbindung zwischen `hackathon-api` und `hackathon-frontend` her (z. B. Proxy-Zugriffe via NGINX)

---


## ⚙️ Weiterführende Links

- [Traefik Docs](https://doc.traefik.io/traefik/)
- [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry)
- [Hackathon-Manager Repository](https://github.com/jenszech/hackathon-manager)

---

