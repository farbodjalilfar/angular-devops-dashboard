import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ActivityService } from './activity.service';

describe('ActivityService', () => {
  let service: ActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ActivityService]
    });
    service = TestBed.inject(ActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load events', () => {
    // Basic test to ensure method exists and doesn't crash
    // In a real scenario, we would mock GithubService
    expect(service.loadEvents).toBeDefined();
  });
});
