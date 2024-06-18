import { Component } from '@angular/core';
import { DetailProductService } from './detail-product.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalOrderConfirmComponent } from 'src/components/modal/modal-order-confirm/modal-order-confirm.component';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
  providers: [DetailProductService]
})
export class DetailsProductsComponent {
  product: any;
  id: number = 0;
  loading: boolean = false;

  constructor(
    public detailProductService: DetailProductService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getDetailProduct();
  }

  async getDetailProduct() {
    this.route.queryParams.subscribe(param => {
      this.id = param['id'] ? param['id'] : '0';
    });
    this.setLoading(true);

    this.detailProductService.getDetailProduct(this.id).subscribe(res => {
      if (res.status) {
        this.product = res.data;
      }
      this.setLoading(false);
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


  /**
   * Hàm phân cách phần nghìn
   * @param number 
   * @returns 
   */
  formatNumberWithCommas(number: any): string {
    if (number == null) {
      return '';
    }
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
