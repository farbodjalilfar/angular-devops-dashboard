import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardStatsService } from '../../services/dashboard-stats.service';
import { SystemHealthService } from '../../services/system-health.service';
import { SettingsService } from '../../services/settings.service';
import { StatCardComponent } from '../../components/stat-card/stat-card';
import { StatusBadgeComponent } from '../../components/status-badge/status-badge';
import { ActivityListComponent } from '../../components/activity-list/activity-list';

interface ActivityEvent {
  timestamp: string;
  message: string;
}

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    CommonModule,
    StatCardComponent,
    StatusBadgeComponent,
    ActivityListComponent
  ],
  templateUrl: './overview.html',
  styleUrl: './overview.css'
})
export class OverviewComponent {
  private statsService = inject(DashboardStatsService);
  private healthService = inject(SystemHealthService);
  private settingsService = inject(SettingsService);

  stats = this.statsService.stats;
  health = this.healthService.health;
  isMockMode = this.settingsService.isMockMode;

  private _activity = signal<ActivityEvent[]>([
    { timestamp: '2 min ago', message: 'System health check completed' },
    { timestamp: '15 min ago', message: 'Dashboard data refreshed' },
    { timestamp: '1 hour ago', message: 'All services online' }
  ]);

  activity = this._activity.asReadonly();

  cycleStatus() {
    this.healthService.cycleStatus();
  }

  addEvent() {
    this._activity.update(events => [
      { timestamp: 'Just now', message: 'New event triggered' },
      ...events
    ]);
  }
}
