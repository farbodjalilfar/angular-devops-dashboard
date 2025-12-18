import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../../services/settings.service';

@Component({
  standalone: true,
  selector: 'app-settings',
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class SettingsComponent {
  showSaved = signal(false);

  form = {
    organization: 'AcmeTech',
    repositories: 'frontend-app, backend-api',
    refreshInterval: 60,
    mockMode: true
  };

  constructor(private settings: SettingsService) {}

  save() {
    this.settings.update(this.form);

    this.showSaved.set(true);

    setTimeout(() => {
      this.showSaved.set(false);
    }, 2000);
  }
}
