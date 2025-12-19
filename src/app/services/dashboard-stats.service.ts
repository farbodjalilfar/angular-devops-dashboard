import { Injectable, signal, inject } from '@angular/core';
import { DashboardStat } from '../models/dashboard-stats.model';
import { GithubService, GithubRepo } from './github.service';
import { SettingsService } from './settings.service';

@Injectable({ providedIn: 'root' })
export class DashboardStatsService {
  private readonly github = inject(GithubService);
  private readonly settings = inject(SettingsService);

  // Error message for UI
  readonly error = signal<string | null>(null);

  private readonly _stats = signal<DashboardStat[]>([
    { label: 'Active Projects', value: '-', hint: 'GitHub repositories' },
    { label: 'Technologies', value: '-', hint: 'Detected languages' },
    { label: 'System Status', value: 'Idle', hint: 'GitHub connection' },
    { label: 'Last Update', value: '-', hint: 'Latest repository update' }
  ]);

  readonly stats = this._stats.asReadonly();

  load() {
    const org = this.settings.settings().organization?.trim();
    if (!org) return;

    this.error.set(null);

    /* =========================
       1️⃣ TOTAL REPOS (NO LIMIT)
    ========================= */
    this.github.getOrganization(org).subscribe({
      next: orgData => {
        this.updateStat('Active Projects', orgData.public_repos);
      },
      error: () => this.handleError()
    });

    /* =========================
       2️⃣ REPOS (FIRST 100)
    ========================= */
    this.github.getRepositories(org).subscribe({
      next: (repos: GithubRepo[]) => {
        if (!repos.length) {
          this.handleError();
          return;
        }

        const languages = new Set(
          repos.map(r => r.language).filter(Boolean)
        );

        const latest = repos
          .map(r => new Date(r.updated_at))
          .sort((a: Date, b: Date) => b.getTime() - a.getTime())[0];

        this.updateStat('Technologies', languages.size);
        this.updateStat('System Status', 'Connected');
        this.updateStat('Last Update', latest.toDateString());
      },
      error: () => this.handleError()
    });
  }

  /* =========================
     HELPERS
  ========================= */

  private updateStat(label: string, value: string | number) {
    this._stats.update(stats =>
      stats.map(s =>
        s.label === label ? { ...s, value } : s
      )
    );
  }

  private handleError() {
    this.error.set('Organization not found');

    this._stats.set([
      { label: 'Active Projects', value: '-', hint: 'GitHub repositories' },
      { label: 'Technologies', value: '-', hint: 'Detected languages' },
      { label: 'System Status', value: 'Error', hint: 'Invalid organization' },
      { label: 'Last Update', value: '-', hint: '—' }
    ]);
  }
}
