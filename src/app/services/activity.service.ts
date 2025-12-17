import { Injectable, signal } from '@angular/core';
import { ActivityItem } from '../models/activity-item.model';

@Injectable({ providedIn: 'root' })
export class ActivityService {
  private readonly _items = signal<ActivityItem[]>([
    {
      id: '1',
      type: 'DEPLOY',
      message: 'Deployed backend v2.1.0',
      time: '5m ago'
    },
    {
      id: '2',
      type: 'ALERT',
      message: 'High latency detected',
      time: '12m ago'
    }
  ]);

  readonly items = this._items.asReadonly();

  addMockEvent() {
    this._items.update(items => [
      {
        id: Date.now().toString(),
        type: 'DEPLOY',
        message: 'Deployed frontend v1.0.4',
        time: 'Just now'
      },
      ...items
    ]);
  }
}
