import { Component, Injector, OnInit } from '@angular/core';
import { TablePage } from 'src/libs/tablepage';
import { MyProfileService } from '../my-profile.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-referral',
  templateUrl: './order-referral.component.html',
  styleUrls: ['./order-referral.component.scss'],
  providers: [DatePipe, MyProfileService]
})
export class OrderReferralComponent extends TablePage implements OnInit {

  constructor(
    injector: Injector,
    private myProfileService: MyProfileService,
    private datePipe: DatePipe,
    public override router: Router
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.initColumns();
    this.getItems();
  }


  initColumns() {
    this.columns = [
      {
        title: 'Mã đơn hàng', name: 'code', render: ({ code }: any) => {
          if (code) {
            return `<a style="color: #1519f1">#${code}</a>`;
          } return '---';
        }
      },
      {
        title: 'Ngày mua hàng', name: 'date', render: ({ date }: any) => {
          return this.formattedDate(date);
        }
      },
      {
        title: 'Giá trị đơn hàng', name: 'products', render: ({ products }: any) => {
          return this.formatNumberWithCommas(products[0].pivot?.price) + 'đ';
        }
      },
      {
        title: 'Tình trạng đơn hàng', name: 'order_status', render: ({ order_status }: any) => {
          if (order_status) {
            return this.convertToVietnameseStatus(order_status);
          }
        }
      },
      {
        title: 'Tình trạng thanh toán', name: 'payment_status', render: ({ payment_status }: any) => {
          if (payment_status) {
            return this.convertToVietnameseStatus(payment_status);
          }
        }
      },
      {
        title: 'Mã khách hàng', name: 'customer', render: ({ customer }: any) => {
          if (customer) {
            return "#" + customer.code;
          } return "---";
        }
      },
    ];
  }

  getItems() {
    this.setLoading(true);
    const params: any = { pagination: true, keyword: this.keyword };
    this.myProfileService.getAllOrderReferral(params, this.page.current, this.page.perPage).subscribe((res: any) => {
      this.setData(res);
      this.setLoading(false);
    })
  }

  public search(event: any): void {
    this.page.current = 1;
    this.keyword = event;
    this.keywordText = event;
    this.getItems();
  }

  /**
 * Nhận sự kiến thay đổi page từ table.
 * Số trang hoặc số dòng/trang
 * @param data { pageIndex, pageSize }
 */
  public pageChange(data: any): void {
    if (data.pageIndex !== this.page.current) {
      this.changePage(data.pageIndex);
    }
    if (data.pageSize !== this.page.perPage) {
      this.changePerPage(data.pageSize);
    }
  }

  /**
   * Hàm sử lí việc thay đổi trang
   * @param page
   */
  private changePage(page: number): void {
    this.page.current = page;
    this.getItems();
  }

  /**
   * Hàng sử lý việc thay đổi số dòng/trang
   * @param perPage
   */
  private changePerPage(perPage: number): void {
    this.page.perPage = perPage;
    this.getItems();
  }

  formattedDate(dateString: string): string {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      const formattedTime = this.datePipe.transform(date, 'HH:mm');
      const formattedDate = this.datePipe.transform(date, 'dd/MM/yyyy');
      if (formattedTime && formattedDate) {
        return `${formattedTime} ${formattedDate}`;
      } else {
        return 'Invalid Date';
      }
    } else {
      return 'Invalid Date';
    }
  }

  formatNumberWithCommas(number: number): string {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

  public onColumnClick(event: any): void {
    this.onRowId = event.row;
    this.router.navigate(['/payment'], { queryParams: { idOrder: event.row, type: 'order-referral' }, });
  }
}
