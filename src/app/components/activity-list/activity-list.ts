import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityItem } from '../../models/activity.model';
import { SkeletonComponent } from '../skeleton/skeleton';

@Component({
  selector: 'app-activity-list',
  standalone: true,
  imports: [CommonModule, SkeletonComponent],
  templateUrl: './activity-list.html',
  styleUrl: './activity-list.css'
})
export class ActivityListComponent {
  @Input({ required: true }) items: ActivityItem[] = [];
  @Input() loading = false;
}
