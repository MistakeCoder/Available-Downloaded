import { DatePipe } from '@angular/common';
import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TablePage } from 'src/libs/tablepage';
import { DownloadPointService } from './download-point.service';

@Component({
  selector: 'app-download-point',
  templateUrl: './download-point.component.html',
  styleUrls: ['./download-point.component.scss'],
  providers: [DatePipe, DownloadPointService]
})
export class DownloadPointComponent extends TablePage implements OnInit {


  constructor(
    injector: Injector,
    private downloadPointService: DownloadPointService,
    private datePipe: DatePipe,
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
        title: 'Thời gian phát sinh', name: 'date', render: ({ date }: any) => {
          if (date) {
            return this.formattedDate(date);
          } return "---";
        }
      },
      {
        title: 'Số điểm', name: 'point', render: ({ point, type }: any) => {
          if (point) {
            if (type === 'deposit') {
              return `<a style="color: #18864b">+${point}</a>`;
            } else {
              return `<a style="color: #c83232">-${point}</a>`;
            }
          } return '---';
        }
      },
      {
        title: 'Tham chiếu', name: 'reference_group', render: ({ reference_group }: any) => {
          if (reference_group && reference_group === 'orders') {
            return 'Đơn hàng';
          } return '---';
        }
      },
      {
        title: 'Mã tham chiếu', name: 'reference', render: ({ reference }: any) => {
          if (reference) {
            return `#${reference.code}`;
          } return '---';
        }
      },
      {
        title: 'Tình trạng', name: 'status', render: ({ status }: any) => {
          if (status) {
            return this.convertToVietnameseStatus(status);
          } return "---";
        }
      },
    ];
  }

  getItems() {
    this.setLoading(true);
    const params: any = { start_date: null, end_date: null };
    this.downloadPointService.getDownloadPoint(params, this.page.current, this.page.perPage).subscribe((res: any) => {
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
   * Hàm sử lý việc thay đổi số dòng/trang
   * @param perPage
   */
  private changePerPage(perPage: number): void {
    this.page.perPage = perPage;
    this.getItems();
  }

  /**
   * Hàm định dạng ngày giờ theo dạng HH:mm dd/MM/yyyy
   * @param dateString 
   * @returns 
   */
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

  /**
   * Hàm phân cách phần nghìn của số 
   * @param number 
   * @returns 
   */
  formatNumberWithCommas(number: number): string {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  /**
   * Hàm chuyển đổi trạng thái sang tiếng việt
   * @param status 
   * @returns 
   */
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
