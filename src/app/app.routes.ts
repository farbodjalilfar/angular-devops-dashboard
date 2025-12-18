import { Routes } from '@angular/router';
import { OverviewComponent } from './pages/overview/overview';
import { StackComponent } from './pages/stack/stack';
import { ActivityComponent } from './pages/activity/activity';
import { SettingsComponent } from './pages/settings/settings';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },

  {
    path: 'overview',
    component: OverviewComponent,
    data: { title: 'Overview' }
  },
  {
    path: 'stack',
    component: StackComponent,
    data: { title: 'Tech Stack' }
  },
  {
    path: 'activity',
    component: ActivityComponent,
    data: { title: 'Activity' }
  },
  {
    path: 'settings',
    component: SettingsComponent,
    data: { title: 'Settings' }
  }
];
