import { Routes } from '@angular/router';
import { OverviewComponent } from './pages/overview/overview';
import { StackComponent } from './pages/stack/stack';
import { ActivityComponent } from './pages/activity/activity';
import { SettingsComponent } from './pages/settings/settings';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent },
  { path: 'stack', component: StackComponent },
  { path: 'activity', component: ActivityComponent },
  { path: 'settings', component: SettingsComponent }
];
