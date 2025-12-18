export type ActivityType = 'deploy' | 'alert';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  message: string;
  time: string;
}
