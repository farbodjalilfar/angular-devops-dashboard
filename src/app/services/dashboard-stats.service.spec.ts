import { TestBed } from '@angular/core/testing';

import { DashboardStats } from './dashboard-stats';

describe('DashboardStats', () => {
  let service: DashboardStats;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardStats);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
