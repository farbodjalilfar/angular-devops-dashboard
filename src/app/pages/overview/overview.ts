import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardStatsService } from '../../services/dashboard-stats.service';
import { SystemHealthService } from '../../services/system-health.service';
import { ActivityService } from '../../services/activity.service';
import { SettingsService } from '../../services/settings.service';

import { StatCardComponent } from '../../components/stat-card/stat-card';
import { StatusBadgeComponent } from '../../components/status-badge/status-badge';
import { ActivityListComponent } from '../../components/activity-list/activity-list';

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
export class OverviewComponent implements OnInit {
  private readonly statsService = inject(DashboardStatsService);
  private readonly healthService = inject(SystemHealthService);
  private readonly activityService = inject(ActivityService);
  private readonly settingsService = inject(SettingsService);

  // exposed signals
  readonly stats = this.statsService.stats;
  readonly health = this.healthService.health;
  readonly activity = this.activityService.items;
  readonly isMockMode = this.settingsService.isMockMode;

  ngOnInit(): void {
    // Load GitHub data into overview stats
    const org = this.settingsService.settings().organization;
    this.statsService.loadFromGithub(org);
  }

  cycleStatus(): void {
    if (!this.isMockMode()) return;
    this.healthService.cycleStatus();
  }

  addEvent(): void {
    if (!this.isMockMode()) return;
    this.activityService.addMockEvent();
  }
}
