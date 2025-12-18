import { Injectable, inject, signal } from '@angular/core';
import { GithubService, GithubRepo } from './github.service';
import { DashboardStat } from '../models/dashboard-stats.model';

@Injectable({ providedIn: 'root' })
export class DashboardStatsService {
  private readonly github = inject(GithubService);

  private readonly _stats = signal<DashboardStat[]>([
    {
      label: 'Active Projects',
      value: '—',
      hint: 'GitHub repositories'
    },
    {
      label: 'Technologies',
      value: 18,
      hint: 'Frontend & backend'
    },
    {
      label: 'System Status',
      value: 'Online',
      hint: 'All services operational'
    },
    {
      label: 'Last Update',
      value: '—',
      hint: 'Dashboard sync'
    }
  ]);

  readonly stats = this._stats.asReadonly();

  loadFromGithub(org: string) {
    this.github.getRepositories(org).subscribe({
      next: (repos) => this.updateStatsFromRepos(repos),
      error: () => this.setErrorState()
    });
  }

  private updateStatsFromRepos(repos: GithubRepo[]) {
    const latestUpdate =
      repos
        .map(r => new Date(r.updated_at))
        .sort((a, b) => b.getTime() - a.getTime())[0];

    this._stats.set([
      {
        label: 'Active Projects',
        value: repos.length,
        hint: 'GitHub repositories'
      },
      {
        label: 'Technologies',
        value: 18,
        hint: 'Frontend & backend'
      },
      {
        label: 'System Status',
        value: 'Online',
        hint: 'All services operational'
      },
      {
        label: 'Last Update',
        value: latestUpdate
          ? latestUpdate.toLocaleDateString()
          : '—',
        hint: 'Latest GitHub activity'
      }
    ]);
  }

  private setErrorState() {
    this._stats.set([
      {
        label: 'Active Projects',
        value: 'Error',
        hint: 'GitHub unavailable'
      },
      {
        label: 'Technologies',
        value: 18,
        hint: 'Frontend & backend'
      },
      {
        label: 'System Status',
        value: 'Offline',
        hint: 'API error'
      },
      {
        label: 'Last Update',
        value: '—',
        hint: 'No data'
      }
    ]);
  }
}
