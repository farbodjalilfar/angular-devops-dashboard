export type HealthStatus = 'ONLINE' | 'DEGRADED' | 'OFFLINE';

export interface SystemHealth {
  status: HealthStatus;
  latencyMs: number;
  errorRatePct: number;
  lastChecked: string;
}
