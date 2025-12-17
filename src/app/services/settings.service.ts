import { Injectable, signal } from '@angular/core';
import { AppSettings } from '../models/settings.model';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly _settings = signal<AppSettings>({
    organization: 'AcmeTech',
    repositories: 'frontend-app, backend-api, auth-service',
    refreshInterval: 60,
    mockMode: true
  });

  readonly settings = this._settings.asReadonly();

  update(settings: AppSettings) {
    this._settings.set(settings);
  }
}
