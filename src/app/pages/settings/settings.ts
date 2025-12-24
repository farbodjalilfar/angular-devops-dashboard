import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class SettingsComponent {
  private readonly settingsService = inject(SettingsService);

  // local editable copy
  form = {
    githubName: this.settingsService.settings().githubName,
    accountType: this.settingsService.settings().accountType,
    mockMode: this.settingsService.settings().mockMode
  };

  // ✅ FIXED: proper signal
  readonly showSaved = signal(false);

  save() {
    this.settingsService.update({
      ...this.settingsService.settings(),
      githubName: this.form.githubName,
      accountType: this.form.accountType,
      mockMode: this.form.mockMode
    });

    // show toast briefly
    this.showSaved.set(true);
    setTimeout(() => this.showSaved.set(false), 2000);
  }
}
