import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CreateNewSessionComponent } from './features/sessions/new/create-new-session.component';
import { SessionsListComponent } from './features/sessions/sessions-list/sessions-list.component';
import { ProfessionsListComponent } from './features/professions/professions-list/professions-list.component';
import { CreateNewProfessionComponent } from './features/professions/create-new-profession/create-new-profession.component';
import { ProfessionDetailsComponent } from './features/professions/profession-details/profession-details.component';
import { SessionDetailsComponent } from './features/sessions/session-details/session-details.component';
import { ActionsListComponent } from './features/actions/actions-list/actions-list.component';
import { SessionDetailsWrapperComponent } from './features/sessions/session-details-wrapper/session-details-wrapper.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Home',
      hideBackButton: true
    }
  },
  {
    path: 'sessions',
    children: [
      {
        path: '',
        component: SessionsListComponent,
        data: {
          title: 'Sessions'
        }
      },
      {
        path: 'new',
        component: CreateNewSessionComponent,
        data: {
          title: 'Create New Session'
        }
      },
      {
        path: ':sessionId',
        component: SessionDetailsWrapperComponent,
        children: [
          {
            path: '',
            component: SessionDetailsComponent,
            data: {
              title: $localize`:@@sessionDetails:Session Details`
            }
          },
          {
            path: 'action',
            component: ActionsListComponent,
            data: {
              title: 'Actions'
            }
          }
        ]
      }
    ]
  },
  {
    path: 'professions',
    children: [
      {
        path: '',
        component: ProfessionsListComponent,
        data: {
          title: 'Professions'
        }
      },
      {
        path: 'new',
        component: CreateNewProfessionComponent,
        data: {
          title: 'Create New Profession'
        }
      },
      {
        path: ':professionId',
        component: ProfessionDetailsComponent,
        data: {
          title: 'Profession Details'
        }
      }
    ]
  }
];
