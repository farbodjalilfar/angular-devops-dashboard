import { Component, Input } from '@angular/core';
import { ActivityItem } from '../../models/activity-item.model';

@Component({
  selector: 'app-activity-list',
  standalone: true,
  templateUrl: './activity-list.html',
  styleUrl: './activity-list.css'
})
export class ActivityListComponent {
  @Input() items: ActivityItem[] = [];
}
