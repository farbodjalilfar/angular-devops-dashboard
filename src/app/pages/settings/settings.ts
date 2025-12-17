import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class SettingsComponent {
  private readonly service = inject(SettingsService);

  settings = { ...this.service.settings() };

  save() {
    this.service.update(this.settings);
    alert('Settings saved');
  }
}
