import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonText,
  IonCard,
  IonBadge,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonCardContent,
  IonSelect,
  IonSelectOption,
  IonIcon,
} from '@ionic/react';
import './UserList.css';
import { useToast } from '../../components/ToastProvider';
import { Event, Profile, Project, RoleTypes } from '../../types/types';
import { getExistingToken } from '../../utils/authUtils';
import { personCircleOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { fetchProjectList, fetchUserList } from '../../utils/dataFetchUtils';

interface UserListPageProps {
  profile: Profile | null;
  events: Event[];
  isUserListUpdated: boolean;
}

const UserListPage: React.FC<UserListPageProps> = ({ profile, events, isUserListUpdated }) => {
  const history = useHistory(); // Verwende useHistory für die Navigation
  const { showToastError } = useToast();
  const [userlist, setUserlist] = useState<Profile[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<Profile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (profile) {
      const token = getExistingToken();
      if (!token) {
        showToastError('Token nicht gefunden. Bitte anmelden.');
        return;
      }
      fetchUserList(profile, token, setUserlist, showToastError);
      fetchProjectList(token, profile, events, setProjects, showToastError);
    }
  }, [profile]);

  useEffect(() => {
    setFilteredUsers(userlist);
  }, [userlist]);

  // Überwache Änderungen an `userListUpdated`
  useEffect(() => {
    console.log('userListUpdated:', isUserListUpdated);
    if (isUserListUpdated) {
      const token = getExistingToken();
      if (!token) {
        showToastError('Token nicht gefunden. Bitte anmelden.');
        return;
      }
      fetchUserList(profile, token, setUserlist, showToastError);
      setFilteredUsers(userlist);
    }
  }, [isUserListUpdated]); // Wird ausgeführt, wenn `userListUpdated` true ist

  // Filterfunktion für die Suche
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterUsers(term, selectedEvent);
  };

  // Filterfunktion für Events
  const handleEventFilter = (eventId: number | null) => {
    const event = events.find((ev) => ev.id === eventId) || null;
    setSelectedEvent(event);
    filterUsers(searchTerm, event);
  };

  // Kombinierte Filterfunktion
  const filterUsers = (term: string, event: Event | null) => {
    let filtered = userlist;

    // Filter nach Suchbegriff
    if (term) {
      filtered = filtered.filter((user) => user.name.toLowerCase().includes(term.toLowerCase()));
    }

    // Filter nach Event
    if (event) {
      filtered = filtered.filter((user) =>
        projects.some(
          (project) =>
            (project.initiators.some((initiator) => initiator.user_id === user.id) ||
              project.participants.some((p) => p.user_id === user.id)) &&
            project.event_id === event.id,
        ),
      );
    }

    setFilteredUsers(filtered);
  };

  // Gruppierung der Benutzer nach Anfangsbuchstaben
  const groupedUsers = filteredUsers.reduce((acc: Record<string, Profile[]>, user) => {
    const firstLetter = user.name.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(user);
    return acc;
  }, {});

  const handleUserClick = (user: Profile) => {
    history.push({
      pathname: '/profil',
      state: { viewProfileArg: user },
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <IonIcon icon={personCircleOutline} />
            Übersicht aller Teilnehmenden
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeMd="8">
              {/* Suchfeld */}
              <IonInput
                value={searchTerm}
                fill="outline"
                placeholder="Benutzer suchen..."
                onIonInput={(e) => handleSearch(e.detail.value!)}
              />
            </IonCol>
            <IonCol size="12" sizeMd="4">
              {/* Event-Filter */}
              <IonSelect
                interface="popover" /* Popover wird verwendet */
                fill="outline"
                value={selectedEvent?.id || null}
                placeholder="Event auswählen"
                onIonChange={(e) => handleEventFilter(e.detail.value)}
                className="event-select"
              >
                <IonSelectOption value={null}>Alle Events</IonSelectOption>
                {events.map((event) => (
                  <IonSelectOption key={event.id} value={event.id}>
                    {event.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Alphabetische Navigation */}
        <IonGrid className="alphabet-navigation">
          <IonRow>
            {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((letter) => (
              <IonCol key={letter} size="auto">
                <IonButton
                  className="alphabet-navigation-button"
                  size="small"
                  onClick={() => {
                    const element = document.getElementById(`section-${letter}`);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {letter}
                </IonButton>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        {/* Benutzerliste nach Buchstaben */}
        {Object.keys(groupedUsers)
          .sort()
          .map((letter) => (
            <div key={letter} id={`section-${letter}`} className="user-section">
              <IonText className="user-section-title">{letter}</IonText>
              <IonGrid>
                <IonRow>
                  {groupedUsers[letter].map((user) => {
                    const initiatorCount = projects.filter((project) =>
                      project.initiators.some((initiator) => initiator.user_id === user.id),
                    ).length;
                    const participantCount = projects.filter((project) =>
                      project.participants.some((p) => p.user_id === user.id),
                    ).length;

                    const userClassName =
                      user.role_id >= RoleTypes.GUEST
                        ? 'user-section-detail-guest'
                        : user.role_id < RoleTypes.USER
                          ? 'user-section-detail-manager'
                          : 'user-section-detail';

                    return (
                      <IonCol size="12" sizeMd="3" key={user.id}>
                        <IonCard
                          className="user-card"
                          onClick={() => handleUserClick(user)} // Benutzer auswählen und navigieren
                        >
                          <IonCardContent>
                            <IonText className={userClassName}>{user.name}</IonText>
                            <div>
                              <div className="tooltip-container">
                                <IonBadge color="primary">{initiatorCount}</IonBadge>
                                <div className="tooltip">Initiator</div>
                              </div>
                              <div className="tooltip-container">
                                <IonBadge color="quaternary">{participantCount}</IonBadge>
                                <div className="tooltip">Teilnehmer</div>
                              </div>
                            </div>
                          </IonCardContent>
                        </IonCard>
                      </IonCol>
                    );
                  })}
                </IonRow>
              </IonGrid>
            </div>
          ))}

        {/* Legende */}
        <IonGrid className="legend-section">
          <IonRow>
            <IonCol size="12">
              <IonText className="legend-title">Legende</IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" sizeMd="4">
              <IonBadge color="primary" className="legend-badge">
                Initiator
              </IonBadge>
              <br />
              <IonText className="legend-description">
                Nutzer, die Projekte initiiert haben.
              </IonText>
            </IonCol>
            <IonCol size="12" sizeMd="4">
              <IonBadge color="quaternary" className="legend-badge">
                Teilnehmer
              </IonBadge>
              <br />
              <IonText className="legend-description">Nutzer, die an Projekten teilnehmen.</IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" sizeMd="4">
              <IonText className="legend-role manager-role">Manager</IonText>
              <br />
              <IonText className="legend-description">Nutzer mit erweiterten Rechten.</IonText>
            </IonCol>
            <IonCol size="12" sizeMd="4">
              <IonText className="legend-role user-role">Benutzer</IonText>
              <br />
              <IonText className="legend-description">Standard-Nutzer.</IonText>
            </IonCol>
            <IonCol size="12" sizeMd="4">
              <IonText className="legend-role guest-role">Gast</IonText>
              <br />
              <IonText className="legend-description">Nutzer mit eingeschränkten Rechten.</IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default UserListPage;
