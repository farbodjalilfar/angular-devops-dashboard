import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityService } from '../../services/activity.service';
import { ActivityType } from '../../models/activity.model';
import { ActivityListComponent } from '../../components/activity-list/activity-list';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CommonModule, ActivityListComponent],
  templateUrl: './activity.html',
  styleUrl: './activity.css'
})
export class ActivityComponent {
  private readonly activityService = inject(ActivityService);

  // 🔹 filter state
  readonly filter = signal<ActivityType | 'all'>('all');

  // 🔹 all items
  readonly items = this.activityService.items;

  // 🔹 derived filtered list
  readonly filteredItems = computed(() => {
    const f = this.filter();
    if (f === 'all') return this.items();
    return this.items().filter(item => item.type === f);
  });

  setFilter(value: ActivityType | 'all') {
    this.filter.set(value);
  }
}
