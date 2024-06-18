import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardPointComponent } from './reward-point.component';

describe('RewardPointComponent', () => {
  let component: RewardPointComponent;
  let fixture: ComponentFixture<RewardPointComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RewardPointComponent]
    });
    fixture = TestBed.createComponent(RewardPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
