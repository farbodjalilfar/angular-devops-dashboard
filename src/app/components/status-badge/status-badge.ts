import { Component, Input } from '@angular/core';
import { HealthStatus } from '../../models/system-health.model';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.css'
})
export class StatusBadgeComponent {
  @Input() status!: HealthStatus;
}
