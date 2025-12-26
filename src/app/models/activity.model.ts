export type ActivityType = 'DEPLOY' | 'ALERT' | 'INFO';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  message: string;
  time: string;
}
