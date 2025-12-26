import { Injectable, signal, inject } from '@angular/core';
import { DashboardStat } from '../models/dashboard-stats.model';
import { GithubService, GithubRepo } from './github.service';
import { SettingsService } from './settings.service';

@Injectable({ providedIn: 'root' })
export class DashboardStatsService {
  private readonly github = inject(GithubService);
  private readonly settingsService = inject(SettingsService);

  readonly error = signal<string | null>(null);

  private readonly _stats = signal<DashboardStat[]>([
    { label: 'Active Projects', value: '-', hint: 'GitHub repositories' },
    { label: 'Technologies', value: '-', hint: 'Detected languages' },
    { label: 'Total Stars', value: '-', hint: 'Across all repositories' },
    { label: 'Last Update', value: '-', hint: 'Latest repository update' }
  ]);

  readonly stats = this._stats.asReadonly();

  load() {
    const settings = this.settingsService.settings();
    const name = settings.githubName?.trim();
    const type = settings.accountType;

    if (!name) return;

    this.error.set(null);

    if (type === 'org') {
      this.loadOrg(name);
    } else {
      this.loadUser(name);
    }
  }

  private loadOrg(org: string) {
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

    const stars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
    const forks = repos.reduce((acc, r) => acc + (r.forks_count || 0), 0);

    this.updateStat('Technologies', languages.size);
    this.updateStat('Total Stars', stars);
    this.updateStat('Last Update', latest.toDateString());


  }

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
      { label: 'Total Stars', value: '-', hint: '—' },
      { label: 'Last Update', value: '-', hint: '—' }
    ]);
  }
}
