import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletTicketComponent } from './wallet-ticket.component';

describe('WalletTicketComponent', () => {
  let component: WalletTicketComponent;
  let fixture: ComponentFixture<WalletTicketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WalletTicketComponent]
    });
    fixture = TestBed.createComponent(WalletTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
