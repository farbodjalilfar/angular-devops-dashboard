import { Component, inject, signal } from '@angular/core';
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
  private readonly dashboardStatsService = inject(DashboardStatsService);

  // ✅ FULL settings copy
  form: AppSettings = { ...this.settingsService.settings() };

  showSaved = signal(false);

  save() {
    this.settingsService.update(this.form);

    // 🔥 force reload
    this.dashboardStatsService.load();

    this.showSaved.set(true);
    setTimeout(() => this.showSaved.set(false), 2000);
  }
}
