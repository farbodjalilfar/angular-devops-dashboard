import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardStatsService } from '../../services/dashboard-stats.service';
import { SystemHealthService } from '../../services/system-health.service';
import { ActivityService } from '../../services/activity.service';
import { SettingsService } from '../../services/settings.service';
import { GithubService } from '../../services/github.service';

import { StatCardComponent } from '../../components/stat-card/stat-card';
import { StatusBadgeComponent } from '../../components/status-badge/status-badge';
import { ActivityListComponent } from '../../components/activity-list/activity-list';
import { PullRequestsComponent } from '../../components/pull-requests/pull-requests';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    CommonModule,
    StatCardComponent,
    StatusBadgeComponent,
    ActivityListComponent,
    PullRequestsComponent
  ],
  templateUrl: './overview.html',
  styleUrl: './overview.css'
})
export class OverviewComponent implements OnInit {
  private readonly statsService = inject(DashboardStatsService);
  private readonly healthService = inject(SystemHealthService);
  private readonly activityService = inject(ActivityService);
  private readonly settingsService = inject(SettingsService);
  private readonly githubService = inject(GithubService);

  readonly stats = this.statsService.stats;
  readonly error = this.statsService.error;

  readonly health = this.healthService.health;
  readonly activity = this.activityService.items;
  readonly activityLoading = this.activityService.loading;
  readonly isMockMode = this.settingsService.isMockMode;

  /* =========================
     AVATAR
  ========================= */

  readonly avatarUrl = signal<string | null>(null);
  readonly githubLabel = signal<string>('');
  readonly githubType = signal<'org' | 'user'>('org');

  ngOnInit() {
    this.statsService.load();

    const settings = this.settingsService.settings();
    const name = settings.githubName;
    const type = settings.accountType;

    this.githubLabel.set(name);
    this.githubType.set(type);

    // Call loadEvents for both org and user
    this.activityService.loadEvents(name);

    if (type === 'org') {
      this.githubService.getOrganization(name).subscribe({
        next: org => this.avatarUrl.set(org.avatar_url),
        error: () => this.avatarUrl.set(null)
      });
    } else {
      this.githubService.getUser(name).subscribe({
        next: user => this.avatarUrl.set(user.avatar_url),
        error: () => this.avatarUrl.set(null)
      });
    }
  }

  cycleStatus() {
    if (!this.isMockMode()) return;
    this.healthService.cycleStatus();
  }

  addEvent() {
    if (!this.isMockMode()) return;
    this.activityService.addMockEvent();
  }
}
