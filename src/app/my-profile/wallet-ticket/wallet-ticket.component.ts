import { DatePipe } from '@angular/common';
import { Component, Injector, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { TablePage } from 'src/libs/tablepage';
import { WalletTicketService } from './wallet-ticket.service';
import { ModalEditWalletTicketComponent } from './modal-edit-wallet-ticket/modal-edit-wallet-ticket.component';

@Component({
  selector: 'app-wallet-ticket',
  templateUrl: './wallet-ticket.component.html',
  styleUrls: ['./wallet-ticket.component.scss'],
  providers: [DatePipe, WalletTicketService]
})
export class WalletTicketComponent extends TablePage implements OnInit {
  pageCurrentIndex: number = 1;
  isTrash: boolean = false;
  isSearch: boolean = false;
  isSearching: boolean = false;
  initFn: any = {};
  actionFn: any = {
    edit: this.actionEdit.bind(this),
    destroy: this.actionRemove.bind(this)
  };

  constructor(
    injector: Injector,
    private walletTicketService: WalletTicketService,
    public datePipe: DatePipe
  ) {
    super(injector);
    this.initFn['initActions'] = this.initActions.bind(this);
  }

  ngOnInit(): void {
    this.initActions();
    this.initColumns();
    this.getItems();
  }

  initColumns() {
    this.columns = [
      {
        title: 'Ngày rút điểm', name: 'date', render: ({ date }: any) => {
          return this.formattedDate(date);
        }
      },
      {
        title: 'Số điểm rút', name: 'amount'
      },

      {
        title: 'Ngân hàng', name: 'bank_name'
      },
      { title: 'Số tài khoản', name: 'beneficiary_account' },
      { title: 'Người thụ hưởng', name: 'beneficiary' },
      {
        title: 'Trạng thái', name: 'status', render: ({ status }: any) => {
          if (status) {
            return this.convertToVietnameseStatus(status);
          }
        }
      },
    ];
  }


  getItems(type: string = 'items') {
    this.setLoading(true);
    this.isSearching = true;
    this.getType = type;
    this.isTrash = false;
    const params: any = { pagination: true, start_date: '', end_date: '' };
    if (type == 'trash') {
      params['trashed'] = true;
      this.isTrash = true;
    }
    this.walletTicketService.getAllWalletTickets(params, this.page.current, this.page.perPage).subscribe(response => {
      this.setData(response);
      this.isSearching = false;
      this.setLoading(false);
    })
  }


  public initActions(): void {
    this.actions = [
      { name: 'edit', title: 'Sửa', icon: 'fas fa-edit', action: 'edit', isOne: true, onTab: [false, 'trash'], isShow: true },
      { name: 'destroy', title: 'Xoá bỏ', icon: 'fas fa-times', action: 'destroy', isOne: false, onTab: [false, 'trash'], isShow: true },
    ];
  }

  public async actionEdit() {
    const dialogRef = this.dialog.open(ModalEditWalletTicketComponent, {
      width: '600px',
      disableClose: true,
      panelClass: 'overflow-none',
      data: {
        action: 'edit',
        id: this.onRowId
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) { this.getItems(); }
    });
  }

  public async actionAdd() {
    const dialogRef = this.dialog.open(ModalEditWalletTicketComponent, {
      width: '600px',
      disableClose: true,
      panelClass: 'overflow-none'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) { this.getItems(); }
    });
  }

  public async actionRemove() {
    const dialogRef = this.questionService.open(
      'XÓA DỮ LIỆU',
      'Bạn có chắc chắn muốn xóa dữ liệu khỏi hệ thống?',
      '#FF0000'
    );
    dialogRef.afterClosed().subscribe(async (result: any) => {
      if (result) {
        const res: any = await lastValueFrom(this.walletTicketService.destroy(this.getSelectIds()));
        if (res.status) {
          this.showSuccess(res.message);
        } else {
          this.showError(res.message);
        }
        this.ids = [];
        await this.getItems(this.getType);
      }
    });
  }

  showSearchInput() {
    this.isSearch = !this.isSearch;
  }

  /**
  * Search call methods
  * @param event
  */
  public search(event: any): void {
    this.page.current = 1;
    this.keyword = event;
    this.keywordText = event;
    this.getItems('items');
  }
  public onColumnClick(event: any): void {
    this.onRowId = event.row;
    this.callMethod(event.column);
  }

  public onActionClick(event: any): void {
    this.callMethod(event.action, event.params ? event.params : undefined);
  }

  public callMethod(methodName: string, data: any = undefined) {
    if (this.actionFn[methodName]) {
      return this.actionFn[methodName]();
    }
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
    this.getItems('items');
  }

  /**
   * Hàng sử lý việc thay đổi số dòng/trang
   * @param perPage
   */
  private changePerPage(perPage: number): void {
    this.page.perPage = perPage;
    this.getItems('items');
  }

  /**
 * Hàm chuyển đổi trạng thái
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

  /**
 * Hàm định dạng ngày giờ
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
}
