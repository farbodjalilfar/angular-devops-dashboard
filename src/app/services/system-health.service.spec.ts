import { TestBed } from '@angular/core/testing';

import { SystemHealth } from './system-health';

describe('SystemHealth', () => {
  let service: SystemHealth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemHealth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
