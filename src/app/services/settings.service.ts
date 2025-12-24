import { Injectable, signal, computed } from '@angular/core';
import { AppSettings } from '../models/settings.model';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly _settings = signal<AppSettings>({
    organization: 'google',
    repositories: '',
    refreshInterval: 60,
    mockMode: false,

    // ✅ ADD THESE
    githubName: 'google',
    accountType: 'org'
  });

  readonly settings = this._settings.asReadonly();
  readonly isMockMode = computed(() => this._settings().mockMode);

  update(settings: AppSettings) {
    this._settings.set(settings);
  }
}
