import { Injectable, signal } from '@angular/core';
import { DashboardStat } from '../models/dashboard-stats.model';

@Injectable({ providedIn: 'root' })
export class DashboardStatsService {
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
      value: 'Today',
      hint: 'Dashboard sync'
    }
  ]);

  readonly stats = this._stats.asReadonly();

  /**
   * 🔹 Update Active Projects stat dynamically (GitHub repos)
   */
  setActiveProjects(count: number | null) {
    this._stats.update(stats =>
      stats.map(stat =>
        stat.label === 'Active Projects'
          ? {
              ...stat,
              value: count === null ? '—' : count.toString()
            }
          : stat
      )
    );
  }
}
