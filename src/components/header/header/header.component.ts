import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/libs/storage';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [HeaderService]
})
export class HeaderComponent {
  user: any;
  @Output() isClose = new EventEmitter<any>();
  @Output() isLogout = new EventEmitter<any>();
  @Input() isCloseMenu!: boolean;
  isCloseDashboard: boolean = false;
  storage: AppStorage = new AppStorage();
  rewardPointBalance: any;
  historyRewardPoint: any;

  constructor(
    private el: ElementRef,
    public router: Router,
    public headerService: HeaderService
  ) { }

  ngOnInit(): void {
    this.fetchUserLogin();
    this.getRewardPointBalance();
    this.getHistoryRewardPoint();
  }

  navigateTo(path: string, menu: string = '', activeTab: string = '') {
    this.router.navigate([path], { queryParams: { menu: menu, activeTab: activeTab } });
  }

  fetchUserLogin() {
    this.headerService.fetchUsersLogin().subscribe(res => {
      if (res.status) {
        this.user = res.data;
      }
    });
  }

  logout() {
    this.isLogout.emit(false);
    this.headerService.logout([]).subscribe((res: any) => {
      if (res.status) {
        this.storage.clear();
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 100);
      }
    })
  }

  getRewardPointBalance() {
    this.headerService.getRewardPointBalance().subscribe(res => {
      if (res.status) {
        this.rewardPointBalance = res.data;
      }
    })
  }

  getHistoryRewardPoint() {
    const params: any = { pagination: true };
    this.headerService.getHistoryRewardPoint(params, 1, 5).subscribe((res: any) => {
      if (res.status) {
        this.historyRewardPoint = res.data;
      }
    })
  }

  convertToVietnameseStatus(status: string): any {
    if (status === 'pending') {
      return '<a style="color: #1519f1">Chờ xử lý</a>';
    }
    else if (status === 'done') {
      return '<a style="color: #18864b">Hoàn thành</a>';
    }
    else {
      return '<a style="color: #c83232">Huỷ</a>';
    }
  }
}
