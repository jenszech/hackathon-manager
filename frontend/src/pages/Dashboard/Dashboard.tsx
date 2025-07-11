import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
} from '@ionic/react';
import './Dashboard.css';
import { Event, Profile, Project } from '../../types/types';
import ProjectOverviewCard from '../../components/cards/ProjectOverviewCard/ProjectOverviewCard';
import TeamOverviewCard from '../../components/cards/TeamsOverviewCard/TeamOverviewCard';
import MyProjectOverviewCard from '../../components/cards/MyProjectOverviewCard/MyProjectOverviewCard';
import CountdownCard from '../../components/cards/CountdownCard/CountdownCard';
import { isDemo } from '../../utils/dataApiConnector';
import { bookOutline } from 'ionicons/icons';
import MyRoomOverviewCard from '../../components/cards/MyRoomOverviewCard/MyRoomOverviewCard';

interface DashboardPageProps {
  profile: Profile | null;
  event: Event | null;
  projects: Project[];
}

const DashboardPage: React.FC<DashboardPageProps> = ({ profile, event, projects }) => {
  return (
    <IonPage>
      <IonContent>
        {isDemo(profile) && (
          <IonCard style={{ backgroundColor: '#EAF4FC', color: '#003366' }}>
            <IonCardHeader>
              <IonCardTitle>
                <IonIcon icon={bookOutline} style={{ marginRight: '8px' }} />
                Demo Mode
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Bis zur vollständien Aktivierung ihres Accounts können Sie die Demo-Funktion nutzen.
            </IonCardContent>
          </IonCard>
        )}

        <CountdownCard event={event} />

        {/* Projekte und Teilnehmer Boxen */}
        <IonGrid className="hackathon-grid">
          <IonRow>
            <IonCol size="12" sizeMd="6">
              <ProjectOverviewCard projects={projects} />
            </IonCol>
            <IonCol size="12" sizeMd="6">
              <TeamOverviewCard projects={projects} event={event} />
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Aktuelles Projekt und Raumzuweisung */}
        <IonGrid className="hackathon-grid">
          <IonRow>
            <IonCol size="12" sizeMd="6">
              <MyProjectOverviewCard profile={profile} event={event} />
            </IonCol>
            <IonCol size="12" sizeMd="6">
              <MyRoomOverviewCard profile={profile} event={event} projects={projects} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default DashboardPage;
