import { Component, signal, computed } from '@angular/core';
import { ActivityService } from '../../services/activity.service';
import { ActivityListComponent } from '../../components/activity-list/activity-list';
import { ActivityType } from '../../models/activity-item.model';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [ActivityListComponent],
  templateUrl: './activity.html',
  styleUrl: './activity.css'
})
export class ActivityComponent {
  private readonly activityService = new ActivityService();

  // filter can be "all" OR a valid ActivityType
  readonly filter = signal<'all' | ActivityType>('all');

  // all activity items
  readonly activity = this.activityService.items;

  // derived filtered list
  readonly filteredActivity = computed(() => {
    const f = this.filter();
    if (f === 'all') return this.activity();
    return this.activity().filter(item => item.type === f);
  });

  setFilter(type: 'all' | ActivityType) {
    this.filter.set(type);
  }
}
