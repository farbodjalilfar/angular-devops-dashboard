import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SettingsService } from '../../services/settings.service';
import { DashboardStatsService } from '../../services/dashboard-stats.service';
import { AppSettings } from '../../models/settings.model';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class SettingsComponent {
  private readonly settingsService = inject(SettingsService);
  private readonly statsService = inject(DashboardStatsService);

  // ✅ PLAIN OBJECT (not signal)
  form: AppSettings = {
    organization: this.settingsService.settings().organization,
    repositories: this.settingsService.settings().repositories,
    refreshInterval: this.settingsService.settings().refreshInterval,
    mockMode: this.settingsService.settings().mockMode,
    accountType: this.settingsService.settings().accountType
  };

  showSaved = false;

  setType(type: 'org' | 'user') {
    this.form.accountType = type;
  }

  save() {
    this.settingsService.update(this.form);
    this.statsService.load(); // refresh overview

    this.showSaved = true;
    setTimeout(() => (this.showSaved = false), 2000);
  }
}
