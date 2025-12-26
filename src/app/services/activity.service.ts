import { Injectable, signal, inject } from '@angular/core';
import { ActivityItem, ActivityType } from '../models/activity.model';
import { GithubRepo, GithubService, GithubEvent } from './github.service';

@Injectable({ providedIn: 'root' })
export class ActivityService {
  private readonly github = inject(GithubService);

  private readonly _items = signal<ActivityItem[]>([
    {
      id: crypto.randomUUID(),
      type: 'DEPLOY',
      message: 'Deployed frontend v1.0.4',
      time: 'Just now'
    },
    {
      id: crypto.randomUUID(),
      type: 'DEPLOY',
      message: 'Deployed backend v2.1.0',
      time: '5m ago'
    },
    {
      id: crypto.randomUUID(),
      type: 'ALERT',
      message: 'High latency detected',
      time: '12m ago'
    }
  ]);

  readonly items = this._items.asReadonly();
  readonly loading = signal(false);

  /* =========================
     MOCK MODE
  ========================= */

  addMockEvent() {
    const events: Omit<ActivityItem, 'id'>[] = [
      { type: 'DEPLOY', message: 'Deployed hotfix patch', time: 'Just now' },
      { type: 'INFO', message: 'Health check completed', time: 'Just now' },
      { type: 'ALERT', message: 'Spike in error rate detected', time: 'Just now' }
    ];

    const e = events[Math.floor(Math.random() * events.length)];

    this._items.update(items => [
      { id: crypto.randomUUID(), ...e },
      ...items
    ].slice(0, 8));
  }

  /* =========================
     LIVE MODE (GitHub)
  ========================= */

  setFromGithubRepos(repos: GithubRepo[]) {
    const sorted = [...repos].sort(
      (a, b) =>
        new Date(b.updated_at).getTime() -
        new Date(a.updated_at).getTime()
    );

    const items: ActivityItem[] = sorted.slice(0, 6).map(repo => ({
      id: crypto.randomUUID(),
      type: 'DEPLOY',
      message: `Updated repo: ${repo.name}`,
      time: this.relativeTime(new Date(repo.updated_at))
    }));

    items.unshift({
      id: crypto.randomUUID(),
      type: 'INFO',
      message: 'Synced activity from GitHub',
      time: 'Just now'
    });

    this._items.set(items);
  }

  loadEvents(username: string) {
    this.loading.set(true);
    this.github.getEvents(username).subscribe({
      next: events => {
        const items: ActivityItem[] = events.slice(0, 6).map(event => ({
          id: event.id,
          type: this.mapEventType(event.type),
          message: this.mapEventMessage(event),
          time: this.relativeTime(new Date(event.created_at))
        }));
        this._items.set(items);
        this.loading.set(false);
      },
      error: () => {
        // Fallback or error handling
        console.error('Failed to load GitHub events');
        this.loading.set(false);
      }
    });
  }

  private mapEventType(type: string): ActivityType {
    if (type === 'PushEvent') return 'DEPLOY';
    if (type === 'PullRequestEvent' || type === 'IssuesEvent') return 'INFO';
    return 'INFO';
  }

  private mapEventMessage(event: GithubEvent): string {
    switch (event.type) {
      case 'PushEvent':
        return `Pushed to ${event.repo.name}`;
      case 'CreateEvent':
        return `Created ${event.payload?.ref_type || 'resource'} in ${event.repo.name}`;
      case 'PullRequestEvent':
        return `${event.payload?.action} PR in ${event.repo.name}`;
      case 'IssuesEvent':
        return `${event.payload?.action} issue in ${event.repo.name}`;
      case 'WatchEvent':
        return `Starred ${event.repo.name}`;
      default:
        return `Activity in ${event.repo.name}`;
    }
  }

  private relativeTime(date: Date): string {
    const mins = Math.floor((Date.now() - date.getTime()) / 60000);
    if (mins <= 0) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
    return `${Math.floor(mins / 1440)}d ago`;
  }
}
