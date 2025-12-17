import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.css'
})
export class ProfileCardComponent {
  name = signal('Farbod Jalilfar');
  role = signal('Software Developer');
  bio = signal('Computer Science student building modern web applications.');
  isAvailable = signal(true);

  toggleAvailability() {
    this.isAvailable.update(value => !value);
  }
}
