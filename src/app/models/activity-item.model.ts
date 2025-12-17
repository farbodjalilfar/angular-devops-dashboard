export type ActivityType = 'DEPLOY' | 'ALERT' | 'INCIDENT' | 'CONFIG';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  message: string;
  time: string;
}
