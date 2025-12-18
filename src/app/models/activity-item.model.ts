export type ActivityType = 'DEPLOY' | 'ALERT';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  message: string;
  time: string;
}
