import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalOrderConfirmService } from './modal-order-confirm.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-order-confirm',
  templateUrl: './modal-order-confirm.component.html',
  styleUrls: ['./modal-order-confirm.component.scss']
})
export class ModalOrderConfirmComponent {
  valueProduct: any;
  loading: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<ModalOrderConfirmComponent>,
    public modalOrderConfirmService: ModalOrderConfirmService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  close(data: any) {
    this.dialogRef.close(data);
  }

  async confirm() {
    this.setLoading(true);
    const params = {
      products: [
        {
          product_id: this.valueProduct.id,
          quantity: 1,
          price: this.valueProduct.price
        }
      ]
    };

    this.modalOrderConfirmService.orderConfirm(params).subscribe((res: any) => {
      if (res.status) {
        this.close(true);
        this.setLoading(false);
        this.router.navigate(['/payment'], { queryParams: { idOrder: res.data?.id }, });
      }
    })
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
