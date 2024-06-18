import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditWalletTicketComponent } from './modal-edit-wallet-ticket.component';

describe('ModalEditWalletTicketComponent', () => {
  let component: ModalEditWalletTicketComponent;
  let fixture: ComponentFixture<ModalEditWalletTicketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalEditWalletTicketComponent]
    });
    fixture = TestBed.createComponent(ModalEditWalletTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
