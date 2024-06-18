import { Component, EventEmitter, Output } from '@angular/core';
import { PriceListService } from './price-list.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalOrderConfirmComponent } from 'src/components/modal/modal-order-confirm/modal-order-confirm.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent {
  products: any;
  loading: boolean = false;

  constructor(
    public priceListService: PriceListService,
    public dialog: MatDialog,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.setLoading(true);
    this.priceListService.getAllProducts().subscribe(res => {
      if (res.status) {
        this.products = res.data;
        this.setLoading(false);
      }
    })
  }

  clickBuy(id: number, price: string) {
    const modalOrderConfirmDialogRef = this.dialog.open(ModalOrderConfirmComponent, {
      panelClass: 'custom-modal-order-confirm',
      backdropClass: 'cdk-dark-backdrop',
      maxWidth: '100vw',
    });
    const instance = modalOrderConfirmDialogRef.componentInstance;
    instance.valueProduct = {
      id: id,
      price: price
    };
  }

  navigate(id: number) {
    this.router.navigate(['/detail-product'], { queryParams: { menu: 'price-list', id: id } });
  }


  /**
   * Hàm phân cách phần nghìn
   * @param number 
   * @returns 
   */
  formatNumberWithCommas(number: number): string {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

