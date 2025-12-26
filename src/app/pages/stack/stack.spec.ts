import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { StackComponent } from './stack';

describe('StackComponent', () => {
  let component: StackComponent;
  let fixture: ComponentFixture<StackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackComponent, HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StackComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
