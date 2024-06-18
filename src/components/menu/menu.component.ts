import { Component, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PriceListService } from 'src/app/products/price-list/price-list.service';
import { HeaderService } from '../header/header/header.service';
import { AppStorage } from 'src/libs/storage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  activeMenu: any;
  countProductInPriceList: any;
  isCloseDashboard: boolean = false;
  storage: AppStorage = new AppStorage();
  @Output() isClose = new EventEmitter<any>();
  @Output() isLogout = new EventEmitter<any>();
  constructor(
    private el: ElementRef,
    public router: Router,
    public route: ActivatedRoute,
    public priceListService: PriceListService,//sử dụng file service từ trang bảng giá
    public headerService: HeaderService
  ) {
    this.queryParams();

  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.priceListService.getAllProducts().subscribe((res: any) => {
      if (res.status) {
        const data = res.data;
        this.countProductInPriceList = data.length;
      }
    })
  }

  closeDashboard() {
    this.isCloseDashboard = !this.isCloseDashboard;
    this.isClose.emit(this.isCloseDashboard);
  }

  navigateTo(path: string) {
    this.router.navigate([path], { queryParams: { menu: path } });
  }

  queryParams() {
    this.route.queryParams.subscribe(params => {
      if (params['menu'] && params['menu'].length > 0) {
        this.activeMenu = params['menu'];
      } else {
        this.activeMenu = 'download-data';
      }
    });
  }

  logout() {
    this.isLogout.emit(false);
    this.headerService.logout([]).subscribe((res: any) => {
      if (res.status) {
        this.storage.clear();
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 100);
      }
    })
  }
}
