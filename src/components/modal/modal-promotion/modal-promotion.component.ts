import { Component } from '@angular/core';
import { ModalPromotionService } from './modal-promotion.service';
import { DatePipe } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-promotion',
  templateUrl: './modal-promotion.component.html',
  styleUrls: ['./modal-promotion.component.scss'],
  providers: [DatePipe, ModalPromotionService]
})
export class ModalPromotionComponent {
  availablePromotion: any;
  start_date: any;
  end_date: any;
  money: any;
  percent: any;
  isShowPromotion: boolean = true;
  loading: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<ModalPromotionComponent>,
    public modalPromotionService: ModalPromotionService,
    public datePipe: DatePipe
  ) {

  }

  ngOnInit(): void {
    this.getAvailablePromotion();
  }

  getAvailablePromotion() {
    this.setLoading(true);
    this.modalPromotionService.getAvailablePromotion().subscribe((res: any) => {
      if (res.status) {
        this.availablePromotion = res.data;
        this.availablePromotion.map((item: any) => {
          if (item.is_expire) {
            this.start_date = this.formattedDate(item.start_date);
            this.end_date = this.formattedDate(item.end_date);
          }
          if (item.percent <= 0 && item.money <= 0) {
            this.isShowPromotion = false;
          }
        });
      }
      this.setLoading(false);
    })
  }

  close() {
    this.dialogRef.close(true);
  }

  /**
 * Hàm định dạng ngày giờ
 * @param dateString 
 * @returns 
 */
  formattedDate(dateString: string): string {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      const formattedDate = this.datePipe.transform(date, 'dd/MM/yyyy');
      if (formattedDate) {
        return `${formattedDate}`;
      } else {
        return 'Invalid Date';
      }
    } else {
      return 'Invalid Date';
    }
  }

  /**
  * Phân cách phần nghìn của số
  * @param number 
  * @returns 
  */
  formatNumberWithCommas(number: number): string {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  /**
   * Hiển thị khuyến mãi 
   * @param percent 
   * @param money 
   * @returns 
   */
  displayPromotionString(percent: number, money: number) {
    if (percent > 0 && money < 0) {
      return `Giảm ${percent}%`;
    } else if (percent < 0 && money > 0) {
      return `Giảm ${this.formatNumberWithCommas(money)}đ`;
    }
    return `Giảm ${percent}% tối đa ${this.formatNumberWithCommas(money)}đ`;
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
