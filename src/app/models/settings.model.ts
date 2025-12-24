export interface AppSettings {
  organization: string;
  repositories: string;
  refreshInterval: number;
  mockMode: boolean;

  // ✅ REQUIRED
  accountType: 'org' | 'user';
}
