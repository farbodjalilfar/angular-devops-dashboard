import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Activity } from './activity';

describe('Activity', () => {
  let component: Activity;
  let fixture: ComponentFixture<Activity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Activity]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Activity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
