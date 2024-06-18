import { Component } from '@angular/core';
import { MyProfileService } from './my-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent {
  activeTab: string = 'order';
  countOrder: number = 0;
  countOrderReferral: number = 0;
  loading: boolean = false;

  constructor(
    private myProfileService: MyProfileService,
    public router: Router
  ) {

  }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.setLoading(true);
    const params: any = { pagination: true, keyword: '' };
    this.myProfileService.getAllOrder(params).subscribe((res: any) => {
      this.countOrder = res.total;

    });
    this.myProfileService.getAllOrderReferral(params).subscribe((res: any) => {
      this.countOrderReferral = res.total;
    });

    this.setLoading(false);
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  navigateTo(path: string, menu: string = '', activeTab: string = '') {
    this.router.navigate([path], { queryParams: { menu: menu, activeTab: activeTab } });
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
