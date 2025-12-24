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

  readonly error = signal<string | null>(null);

  private readonly _stats = signal<DashboardStat[]>([
    { label: 'Active Projects', value: '-', hint: 'GitHub repositories' },
    { label: 'Technologies', value: '-', hint: 'Detected languages' },
    { label: 'System Status', value: 'Idle', hint: 'GitHub connection' },
    { label: 'Last Update', value: '-', hint: 'Latest repository update' }
  ]);

  readonly stats = this._stats.asReadonly();

  load() {
    const settings = this.settings.settings();
    const name = settings.organization?.trim();
    const type = settings.accountType; // 'org' | 'user'

    if (!name) return;

    this.error.set(null);

    if (type === 'org') {
      this.loadOrganization(name);
    } else {
      this.loadUser(name);
    }
  }

  /* =========================
     ORG FLOW
  ========================= */

  private loadOrganization(org: string) {
    this.github.getOrganization(org).subscribe({
      next: orgData => {
        this.updateStat('Active Projects', orgData.public_repos);
      },
      error: () => this.handleError()
    });

    this.github.getOrgRepositories(org).subscribe({
      next: repos => this.processRepos(repos),
      error: () => this.handleError()
    });
  }

  /* =========================
     USER FLOW
  ========================= */

  private loadUser(username: string) {
    this.github.getUser(username).subscribe({
      next: user => {
        this.updateStat('Active Projects', user.public_repos);
      },
      error: () => this.handleError()
    });

    this.github.getUserRepositories(username).subscribe({
      next: repos => this.processRepos(repos),
      error: () => this.handleError()
    });
  }

  /* =========================
     SHARED LOGIC
  ========================= */

  private processRepos(repos: GithubRepo[]) {
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
    this.error.set('Account not found');

    this._stats.set([
      { label: 'Active Projects', value: '-', hint: 'GitHub repositories' },
      { label: 'Technologies', value: '-', hint: 'Detected languages' },
      { label: 'System Status', value: 'Error', hint: 'Invalid account' },
      { label: 'Last Update', value: '-', hint: '—' }
    ]);
  }
}
