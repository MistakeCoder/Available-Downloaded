import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPromotionComponent } from './modal-promotion.component';

describe('ModalPromotionComponent', () => {
  let component: ModalPromotionComponent;
  let fixture: ComponentFixture<ModalPromotionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalPromotionComponent]
    });
    fixture = TestBed.createComponent(ModalPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
