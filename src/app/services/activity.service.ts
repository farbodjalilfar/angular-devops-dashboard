import { Injectable, signal, computed } from '@angular/core';

export type ActivityType = 'deploy' | 'alert';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  message: string;
  time: string;
}

@Injectable({ providedIn: 'root' })
export class ActivityService {
  // raw items
  private readonly _items = signal<ActivityItem[]>([
    {
      id: '1',
      type: 'deploy',
      message: 'Deployed frontend v1.0.4',
      time: 'Just now'
    },
    {
      id: '2',
      type: 'deploy',
      message: 'Deployed backend v2.1.0',
      time: '5m ago'
    },
    {
      id: '3',
      type: 'alert',
      message: 'High latency detected',
      time: '12m ago'
    }
  ]);

  // filter state
  private readonly _filter = signal<'all' | ActivityType>('all');

  // exposed filter
  readonly filter = this._filter.asReadonly();

  // filtered items (this is what UI consumes)
  readonly items = computed(() => {
    const filter = this._filter();
    const items = this._items();

    if (filter === 'all') return items;
    return items.filter(i => i.type === filter);
  });

  // change filter
  setFilter(value: 'all' | ActivityType) {
    this._filter.set(value);
  }

  // optional mock event (used in Overview)
  addMockEvent() {
    const next: ActivityItem = {
      id: crypto.randomUUID(),
      type: Math.random() > 0.5 ? 'deploy' : 'alert',
      message:
        Math.random() > 0.5
          ? 'New deployment completed'
          : 'API latency spike detected',
      time: 'Just now'
    };

    this._items.update(items => [next, ...items]);
  }
}
