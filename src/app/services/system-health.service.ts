import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SystemHealth } from '../models/system-health.model';
import { SettingsService } from './settings.service';

@Injectable({ providedIn: 'root' })
export class SystemHealthService {
  private readonly http = inject(HttpClient);
  private readonly settingsService = inject(SettingsService);

  private readonly _health = signal<SystemHealth>({
    status: 'ONLINE',
    latencyMs: 120,
    errorRatePct: 0.3,
    lastChecked: 'Just now'
  });

  readonly health = this._health.asReadonly();

  load() {
    // Only fetch if NOT in mock mode
    if (this.settingsService.isMockMode()) return;

    this.http.get<SystemHealth>('http://localhost:8080/api/health').subscribe({
      next: data => this._health.set(data),
      error: () => console.error('Failed to connect to backend. Is it running?')
    });
  }

  cycleStatus() {
    if (!this.settingsService.isMockMode()) return;

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
