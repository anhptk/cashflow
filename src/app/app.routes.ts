import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CreateNewSessionComponent } from './features/sessions/new/create-new-session.component';
import { SessionsListComponent } from './features/sessions/sessions-list/sessions-list.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'sessions',
    children: [
      {
        path: '',
        component: SessionsListComponent
      },
      {
        path: 'new',
        component: CreateNewSessionComponent
      }
    ]
  }
];
