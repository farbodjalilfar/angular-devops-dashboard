export interface AppSettings {
  organization: string;
  repositories: string;
  refreshInterval: number;
  mockMode: boolean;

  // ✅ REQUIRED (you already introduced these earlier)
  githubName: string;
  accountType: 'org' | 'user';
}
