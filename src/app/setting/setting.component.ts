import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent {
  activeTab: string = 'personal-info';
  title: string = 'Trang thông tin cá nhân';

  constructor(
    public route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {
      const activeTab = param['activeTab'];
      if (activeTab) {
        this.setActiveTab(activeTab)
      }
    })
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    if (tab === 'payment-method') {
      this.title = 'Trang phương thức thanh toán';
    } else if (tab === 'change-password') {
      this.title = 'Trang đổi mật khẩu';
    } else if (tab === 'reward-point') {
      this.title = 'Trang tích điểm';
    } else if (tab === 'wallet-ticket') {
      this.title = 'Trang rút điểm';
    } else {
      this.title = 'Trang thông tin cá nhân';
    }
  }

}
