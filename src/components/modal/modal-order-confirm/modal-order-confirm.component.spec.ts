import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOrderConfirmComponent } from './modal-order-confirm.component';

describe('ModalOrderConfirmComponent', () => {
  let component: ModalOrderConfirmComponent;
  let fixture: ComponentFixture<ModalOrderConfirmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalOrderConfirmComponent]
    });
    fixture = TestBed.createComponent(ModalOrderConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
