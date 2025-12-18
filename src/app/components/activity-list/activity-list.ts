import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityItem } from '../../models/activity.model';

@Component({
  selector: 'app-activity-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity-list.html',
  styleUrl: './activity-list.css'
})
export class ActivityListComponent {
  @Input({ required: true }) items: ActivityItem[] = [];
}
