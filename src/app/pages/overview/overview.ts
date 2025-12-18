import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GithubService } from '../../services/github.service';
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
  // Services
  private readonly statsService = inject(DashboardStatsService);
  private readonly healthService = inject(SystemHealthService);
  private readonly activityService = inject(ActivityService);
  private readonly settingsService = inject(SettingsService);
  private readonly githubService = inject(GithubService);

  // Existing data
  readonly health = this.healthService.health;
  readonly activity = this.activityService.items;
  readonly isMockMode = this.settingsService.isMockMode;

  // 👇 NEW: GitHub repo count
  readonly repoCount = signal<number | null>(null);

  // Stats (we’ll override Active Projects dynamically)
  readonly stats = this.statsService.stats;

  ngOnInit() {
    this.loadRepositories();
  }

  private loadRepositories() {
    const org = this.settingsService.settings().organization;

    this.githubService.getRepositories(org).subscribe({
      next: repos => {
        this.repoCount.set(repos.length);
        this.statsService.setActiveProjects(repos.length);
      },
      error: () => {
        this.repoCount.set(null);
        this.statsService.setActiveProjects(null);
      }
    });
  }

  // UI actions
  cycleStatus() {
    if (!this.isMockMode()) return;
    this.healthService.cycleStatus();
  }

  addEvent() {
    if (!this.isMockMode()) return;
    this.activityService.addMockEvent();
  }
}
