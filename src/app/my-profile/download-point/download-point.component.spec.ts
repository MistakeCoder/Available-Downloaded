import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadPointComponent } from './download-point.component';

describe('DownloadPointComponent', () => {
  let component: DownloadPointComponent;
  let fixture: ComponentFixture<DownloadPointComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DownloadPointComponent]
    });
    fixture = TestBed.createComponent(DownloadPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
