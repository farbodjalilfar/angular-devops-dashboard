import { Injectable, signal } from '@angular/core';
import { SystemHealth } from '../models/system-health.model';

@Injectable({ providedIn: 'root' })
export class SystemHealthService {
  private readonly _health = signal<SystemHealth>({
    status: 'ONLINE',
    latencyMs: 120,
    errorRatePct: 0.3,
    lastChecked: 'Just now'
  });

  readonly health = this._health.asReadonly();

  cycleStatus() {
    const next =
      this._health().status === 'ONLINE'
        ? 'DEGRADED'
        : this._health().status === 'DEGRADED'
        ? 'OFFLINE'
        : 'ONLINE';

    this._health.update(h => ({
      ...h,
      status: next,
      lastChecked: 'Just now'
    }));
  }
}
