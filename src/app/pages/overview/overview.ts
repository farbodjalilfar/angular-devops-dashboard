import { Component, inject } from '@angular/core';
import { StatCardComponent } from '../../components/stat-card/stat-card';
import { StatusBadgeComponent } from '../../components/status-badge/status-badge';
import { ActivityListComponent } from '../../components/activity-list/activity-list';

import { DashboardStatsService } from '../../services/dashboard-stats.service';
import { SystemHealthService } from '../../services/system-health.service';
import { ActivityService } from '../../services/activity.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [StatCardComponent, StatusBadgeComponent, ActivityListComponent],
  templateUrl: './overview.html',
  styleUrl: './overview.css'
})
export class OverviewComponent {
  private readonly statsService = inject(DashboardStatsService);
  private readonly healthService = inject(SystemHealthService);
  private readonly activityService = inject(ActivityService);
  private readonly settingsService = inject(SettingsService);

  readonly stats = this.statsService.stats;
  readonly health = this.healthService.health;
  readonly activity = this.activityService.items;

  // 👇 NEW
  readonly isMockMode = this.settingsService.isMockMode;

  cycleStatus() {
    if (!this.isMockMode()) return;
    this.healthService.cycleStatus();
  }

  addEvent() {
    if (!this.isMockMode()) return;
    this.activityService.addMockEvent();
  }
}
