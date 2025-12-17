import { Injectable, signal } from '@angular/core';
import { DashboardStat } from '../models/dashboard-stats.model';

@Injectable({ providedIn: 'root' })
export class DashboardStatsService {
  private readonly _stats = signal<DashboardStat[]>([
    {
      label: 'Active Projects',
      value: 6,
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
}
