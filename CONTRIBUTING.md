# Beitragshinweise

Vielen Dank, dass du zum Hackathon Manager beitragen möchtest!  
Bitte folge diesen Schritten:
- Forke das Repository
- Erstelle einen neuen Branch (`feature/<dein-feature>` oder `bugfix/<dein-bugfix>`)
- Stelle sicher, dass alle Tests erfolgreich sind (`npm test`)
- Stelle sicher, dass alles korrekt formatiert ist (`npm format`)
- Stelle sicher, dass das Frontend Project gebaut werden kann (`npm build`)
- Reiche einen Pull Request ein

Detailierte Anleitungen zur Einrichtung der Entwicklungsumgebung, dem Start der Anwendung oder bzgl. der Konfiguration findest du in der [Entwickler Doku](./docs/developing.md)


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
npm format
npm build
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
