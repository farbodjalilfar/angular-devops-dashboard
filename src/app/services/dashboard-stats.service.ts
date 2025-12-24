import { Injectable, signal, inject } from '@angular/core';
import { DashboardStat } from '../models/dashboard-stats.model';
import {
  GithubService,
  GithubRepo
} from './github.service';
import { SettingsService } from './settings.service';

@Injectable({ providedIn: 'root' })
export class DashboardStatsService {
  private readonly github = inject(GithubService);
  private readonly settings = inject(SettingsService);

  /* =========================
     STATE
  ========================= */

  readonly error = signal<string | null>(null);

  private readonly _stats = signal<DashboardStat[]>([
    { label: 'Active Projects', value: '-', hint: 'GitHub repositories' },
    { label: 'Technologies', value: '-', hint: 'Detected languages' },
    { label: 'System Status', value: 'Idle', hint: 'GitHub connection' },
    { label: 'Last Update', value: '-', hint: 'Latest repository update' }
  ]);

  readonly stats = this._stats.asReadonly();

  /* =========================
     LOAD
  ========================= */

  load() {
    const settings = this.settings.settings();
    const name = settings.githubName?.trim();
    const type = settings.accountType;

    if (!name) return;

    this.error.set(null);

    /* =========================
       ACTIVE PROJECTS (NO LIMIT)
    ========================= */

    if (type === 'org') {
      this.github.getOrganization(name).subscribe({
        next: org =>
          this.updateStat('Active Projects', org.public_repos),
        error: () => this.handleError()
      });
    } else {
      this.github.getUser(name).subscribe({
        next: user =>
          this.updateStat('Active Projects', user.public_repos),
        error: () => this.handleError()
      });
    }

    /* =========================
       REPOS (FIRST 100)
    ========================= */

    const repos$ =
      type === 'org'
        ? this.github.getOrganizationRepos(name)
        : this.github.getUserRepos(name);

    repos$.subscribe({
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
          .sort((a, b) => b.getTime() - a.getTime())[0];

        this.updateStat('Technologies', languages.size);
        this.updateStat('System Status', 'Connected');
        this.updateStat(
          'Last Update',
          latest ? latest.toDateString() : '-'
        );
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
    this.error.set('GitHub account not found');

    this._stats.set([
      { label: 'Active Projects', value: '-', hint: 'GitHub repositories' },
      { label: 'Technologies', value: '-', hint: 'Detected languages' },
      { label: 'System Status', value: 'Error', hint: 'Invalid GitHub account' },
      { label: 'Last Update', value: '-', hint: '—' }
    ]);
  }
}
