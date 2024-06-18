import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentMethodService } from './payment-method.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent {
  activeTab: boolean = false;
  paymentMethodList: any;
  idAccount: number = 0;
  loading: boolean = false;

  constructor(
    private router: Router,
    public paymentMethodService: PaymentMethodService,
    public messageService: MessageService
  ) {

  }

  ngOnInit(): void {
    this.getPaymentMethodList();
  }

  /**
   * Mở form thêm tài khoản
   * @param type 
   */
  setActiveTab(type: string = '', id: any = null): void {
    this.activeTab = true;
    this.idAccount = id;
    this.router.navigate([], { queryParams: { type: type, idAccount: id, menu: 'setting' } })
  }

  /**
   * Lấy danh sách tài khoản thanh toán
   */
  getPaymentMethodList() {
    this.setLoading(true);
    this.paymentMethodService.getPaymentMethodList().subscribe(res => {
      if (res.status) {
        res.data.map((item: any) => {
          item.is_default = parseInt(item.is_default);
        })
        this.paymentMethodList = res.data;
        this.setLoading(false);
      }
    });
  };

  transform(value: string): string {
    const visibleDigits = 4;
    const maskedSection = value.slice(0, -visibleDigits).replace(/\d/g, '*');
    const visibleSection = value.slice(-visibleDigits);
    return maskedSection + visibleSection;
  }

  recieveData(object: any) {
    this.activeTab = object.data;
    if (object.status) {
      this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: object.message });
    }
    this.getPaymentMethodList();
  }


  /**
   * Set trạng thái loading cho trang
   * @param loadingStatus
   */
  setLoading(loadingStatus: boolean) {
    this.loading = loadingStatus;
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.style.display = loadingStatus ? 'flex' : 'none';
    }
  }
}
