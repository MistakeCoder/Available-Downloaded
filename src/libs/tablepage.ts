import { Injectable, Injector } from '@angular/core';
import { QuestionService } from 'src/components/modal/modal-question';
import { AppPage } from 'src/libs/apppage';
import { PageInterface, ColumnInterface, ActionInterface } from 'src/libs/interfaces';

@Injectable()
export class TablePage extends AppPage {

  questionService: QuestionService;
  rows: any[] = [];
  columns: ColumnInterface[] = [];
  fields: any[] = [];
  ids: number[] = [];

  page: PageInterface = {
    perPage: +(this.storage.getItem('perPage', 20)),
    total: 0,
    from: 0,
    to: 0,
    last: 0,
    current: 1
  };

  actions: ActionInterface[] = [];

  /**
   * Get type - lấy dử liệu items, pending, trash được khai báo trong getFn, searchFn.
   * Mặc định là items
   */
  getType = 'items';

  /**
   * Đang ở chết đọ get hay search.
   * Mặc định là get
   */
  getAction = 'getFn';
  keyword: any = '';
  keywordText = '';
  searchFieldSelected = 'all';
  showSearchBar = false;
  searchFields: any[] = [
    { name: 'all', title: 'Tất cả' }
  ];

  /**
   * id của dòng được chọn trên table
   */
  onRowId: any = 0;
  isShowAction = false;

  constructor(
    injector: Injector,

  ) {
    super(injector);
    this.questionService = injector.get(QuestionService);
  }

  public setColumns(fields: any[]): void {
    this.fields = fields.filter(e => e.show === 1);
    this.parseColumns();
  }

  public parseColumns(): void {
    const tempColumns = [...this.columns];
    this.columns.length = 0;
    this.columns = this.fields.map(field => {
      const column = tempColumns.find(col => col.name === field.name);
      const newColumn: ColumnInterface = {
        ...column,
        title: field.title,
        name: field.name
      };
      if (field.width) {
        newColumn.width = field.width + 'px';
      }
      if (field.min_width) {
        newColumn.minWidth = field.minWidth + 'px';
      }
      return newColumn;
    });
  }

  /**
   * Hàm sử lý việc khởi tạo action và column
   */
  public perform(): void {
    this.actions = this.actions.filter(action => {
      return this.can(action.action || action.name, action.module || this.moduleName) && (typeof action.isShow === 'undefined' || action.isShow);
    });
  }

  /**
   * Reset mọi dữ liệu search về vị trí ban đầu
   */
  public clearSearch(): void {
    this.page.current = 1;
    this.keyword = null;
  }

  public showClearbtn(): boolean {
    return this.keyword && this.keyword.length ? true : false;
  }

  /**
   * Xử lý hành động chọn dòng
   * @param event any[]
   */
  public onRowChecked(event: any[]): void {
    this.ids = event;
    if (this.ids.length === 1) {
      this.onRowId = this.ids[0];
    } else {
      this.onRowId = null;
    }
    if (this.ids.length) {
      this.isShowAction = true;
    } else {
      this.isShowAction = false;
    }
  }

  /**
   * Active class cho tab hiện hành
   * @param tabName
   */
  public isTabActive(tabName: string): string {
    if (this.getType === tabName) { return 'is-active'; }
    return '';
  }

  /**
   * Trả về giá trị cho biết tab truyền tới có đang ở "current" hay không
   * @param tabName
   */
  public isTab(tabName: string | string[]): boolean {
    if (Array.isArray(tabName)) {
      return tabName.find(e => e === this.getType) ? true : false;
    }
    return this.getType === tabName;
  }

  public setPage(page: number): void {
    this.page.current = page;
  }

  public setPerPage(perPage: number): void {
    this.page.perPage = perPage;
  }

  /**
   * Parse data nhận về đúng chuẩn :D
   * @param resData
   */
  public setData(resData: any): void {
    setTimeout(() => {
      if (Array.isArray(resData.data)) {
        this.rows = resData.data;
      }
      this.page.total = resData.total ?? 0;
      this.page.from = resData.from ?? 1;
      this.page.to = resData.to ?? 1;
      this.page.last = resData.last_page ?? 1;
      this.ids = [];
      this.isShowAction = false;
      // this.setLoading(false);
    });
  }

  /**
   * Lấy chi tiết của 1 row trong table
   * @param rowId
   */
  getRow(rowId: number | number[]): any | any[] {
    if (Array.isArray(rowId)) {
      return this.rows.filter(row => rowId.includes(row.id));
    }
    return this.rows.find(row => row.id === rowId);
  }

  /**
   * Trả về boolean tình trạng dữ liệu rỗng
   */
  isDataEmpty(): boolean {
    return (!this.loading && !this.rows.length);
  }

  /**
   * Trả về mảng id của các dòng được chọn
   */
  getSelectIds(): any[] {
    if (this.onRowId) {
      return [this.onRowId];
    }
    return this.ids;
  }

  /**
   * Trả về mảng dữ liệu cột cần cần lấy từ danh sách dòng đã chọn
   * @param columnName - Tên của cột cần lấy dữ liệu
   */
  getColumnValues(columnName: string): any[] {
    const rows: any[] = this.getRow(this.getSelectIds());
    return rows.map(e => e[columnName] ? e[columnName] : null);
  }

  /**
   * Thao tác click nút tìm kiếm
   */
  buttonSearch() {
    this.showSearchBar = !this.showSearchBar;
  }

  /**
   * Đóng (ẩn) thanh tìm kiếm
   */
  closeSearchBar() {
    if (this.showSearchBar) {
      this.showSearchBar = false;
    }
  }
}
