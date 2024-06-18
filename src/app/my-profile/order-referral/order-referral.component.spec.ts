import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderReferralComponent } from './order-referral.component';

describe('OrderReferralComponent', () => {
  let component: OrderReferralComponent;
  let fixture: ComponentFixture<OrderReferralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderReferralComponent]
    });
    fixture = TestBed.createComponent(OrderReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
