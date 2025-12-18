import { signal } from '@angular/core';
import { ActivityItem, ActivityType } from '../models/activity-item.model';

export class ActivityService {
  readonly items = signal<ActivityItem[]>([
    {
      id: '1',
      type: 'DEPLOY',
      message: 'Deployed frontend v1.0.4',
      time: 'Just now'
    },
    {
      id: '2',
      type: 'DEPLOY',
      message: 'Deployed backend v2.1.0',
      time: '5m ago'
    },
    {
      id: '3',
      type: 'ALERT',
      message: 'High latency detected',
      time: '12m ago'
    }
  ]);

  addMockEvent() {
    const newEvent: ActivityItem = {
      id: Date.now().toString(),
      type: Math.random() > 0.5 ? 'DEPLOY' : 'ALERT',
      message:
        Math.random() > 0.5
          ? 'Deployed service update'
          : 'Latency spike detected',
      time: 'Just now'
    };

    this.items.update(list => [newEvent, ...list]);
  }
}
