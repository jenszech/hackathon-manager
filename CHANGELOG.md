# 📦 Changelog

## Version 0.2.6
**Release Date:** 2025-06-06

### ✨ Neue Features
- **TeilnehmerListe**  
  - Alphabetische Sektion zur schnellen Navigation.
  - Namenssuche für gezielte Filterung.
  - Event-Filter zur Anzeige von Teilnehmern basierend auf Events.
- **About Seite**  
  - Neue Seite mit Informationen über die Anwendung und das Team.
- **Backend: Rollen- und Berechtigungsprüfung**  
  - Implementierung von Rollen- und Berechtigungsprüfungen für alle relevanten Endpunkte.
- **Berücksichtigung der Privatsphäre-Einstellungen**  
  - Alle Resultsets im Backend berücksichtigen jetzt die Privatsphäre-Einstellungen der Benutzer.
- **Backend UnitTests**  
  - Erweiterung der Testabdeckung für alle neuen Backend-Funktionen.

### 🐞 Bug fixes & Verbesserungen
- **Design Fix im Header**  
  - Elemente im Header sind jetzt vertikal zentriert.
  - Bei kleinen Auflösungen bricht die Event-Auswahl in die nächste Zeile um.
- **Fehlerbehebung bei Teilnehmer-Logik**  
  - Verbesserte Handhabung von leeren Teilnehmer-Arrays.
- **Stabilitätsverbesserungen**  
  - Kleinere Fehler wurden behoben, um die allgemeine Stabilität und Performance der Anwendung zu verbessern.

## Version 0.2.5
**Release Date:** 2025-06-04

### ✨ Neue Features
**🏠 Dashboard**
- **Dynamische Teilnehmeranzahl im Dashboard**  
  Die Teilnehmeranzahl im Dashboard wird jetzt als Summe der Initiatoren und Teilnehmer aller Projekte des aktuellen Events angezeigt.
- **Aktuelles Projekt anzeigen**  
  Der Bereich "Dein aktuelles Projekt" zeigt das Projekt des aktuellen Events an, an dem der Benutzer Teilnehmer ist. Falls kein Projekt ausgewählt ist, wird ein Hinweis angezeigt.

**🗂️ Projekt Liste**
- **Begrenzte Beschreibung in der Projektliste**  
  Projektbeschreibungen in der Projektliste werden jetzt auf drei Zeilen begrenzt, um die Übersichtlichkeit zu verbessern. Längere Texte werden automatisch abgeschnitten und mit "..." dargestellt.


**📝 Projekt Detailseite**
- **Teilnehmer-Übersicht in der Projekt-Detailansicht**  
  Teilnehmer und Initiatoren werden jetzt in der Projekt-Detailansicht übersichtlich mit Icons dargestellt. 
- **Badge für Teilnehmer**  
  Wenn der Nutzer Initiator oder Teilnehmer des Projektes ist, wird ihm das durch ein Banner in der rechten Ecke angezeigt.
- **Anpassung des JoinProject-Buttons an den Projekt-Workflow**  
  - Alle Buttons (z. B. "Projekt abgeschlossen", "Projekt abgebrochen", "Projekt beitreten") wurden mit passenden Icons versehen, um die Benutzerfreundlichkeit zu erhöhen.
  - Der Benutzer kann einem Projekt beitreten oder seine Teilname zurückziehen
  - Das Beitreten ist nur möglich, wenn nicht bereits ein anderes Projekt als Teilnehmer oder Initiator unterstützt wird.
- **Responsive Design**  
  Die Teilnehmerliste in der Projekt-Detailansicht passt sich jetzt dynamisch an die Bildschirmgröße an und wird bei kleineren Auflösungen unterhalb der Projektdetails angezeigt.

**👥 Team Liste**
- **Anbindung ans Backend**  
  Es werden nun die echten Teamdaten angezeigt, einschließlich aller Initiatoren und Teilnehmer
- **Verbesserte Darstellung der TeamCards**  
  Die TeamCards wurden optimiert, um die Übersichtlichkeit und Benutzerfreundlichkeit zu verbessern.

**🛠️ Backend**
- **Neue Schnittstellen** 
  - Neue Schnittstellen für das Bearbeiten von Initiatoren und Teilnehmern.
  - Erweiterung des Benutzerprofils um eine Liste aller beigetretenen Projekte.
  - Die Projektliste enthält jetzt eine vollständige Übersicht aller Initiatoren und Teilnehmer.
- **Swagger-Dokumentation aktualisiert**  
  Die API-Dokumentation wurde erweitert, um die neuen Schnittstellen und Änderungen abzubilden.

### 🐞 Bug fixes & Verbesserungen
- **Stabilitätsverbesserungen**  
  Kleinere Fehler wurden behoben, um die allgemeine Stabilität und Performance der Anwendung zu verbessern.
- **Fehler bei leerem participants-Array behoben**  
  Die Logik für die Überprüfung von Teilnehmern wurde angepasst, um sicherzustellen, dass leere Arrays korrekt behandelt werden.

## Version 0.2.4
**Release Date:** 2025-05-27

### ✨ Neue Features
- 🔄 **Wechsel zwischen Innovation Day 2024 & 2025**  
  Im Header kann nun dynamisch zwischen den beiden Jahren gewechselt werden – inklusive kontextbezogener Anzeige der zugehörigen Projekte.

- ➕ **Projekt-Erstellung direkt aus der Projektliste**  
  Benutzer können neue Projekte direkt über die Projektübersicht anlegen – einfache UX für schnelles Setup.

- 🔍 **Projekt-Detailansicht**  
  Durch Klick auf ein Projekt in der Übersicht öffnet sich eine eigene Detailseite mit allen Infos zum Projekt.

- ✏️ **Projekt bearbeiten**  
  Eigene Projekte können nun direkt über die Detailansicht editiert werden (z. B. Beschreibung, Team, Tags).

- 🧪 **Demo-Daten für 2025**  
  Es wurden die ersten sechs Projekte für den Innovation Day 2025 vorab eingespielt.

### 🐞 Bug fixes & Verbesserungen
- **Stabilitätsverbesserungen**  
  Kleinere Fehler wurden behoben, um die allgemeine Stabilität und Performance der Anwendung zu verbessern.