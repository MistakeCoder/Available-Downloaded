import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild, SimpleChanges } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges {

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  @Input() loading = true;
  @Input() config: any = {};
  @Input() rows: any[] = [];
  @Input() columns: any[] = [];
  @Input() actions: any[] = [];
  @Input() rowsSelect: any[] = [];
  @Input() onTab = '';
  @Input() currentPage: number = 0;

  @Output('columnClick') columnClick = new EventEmitter<any>();
  @Output('rowChecked') rowChecked = new EventEmitter<any[]>();
  // tslint:disable-next-line:no-output-on-prefix
  @Output('onAction') onAction = new EventEmitter<any>();

  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = [];

  dataSource = new MatTableDataSource();

  miniColumns: string[] = ['id'];
  limitNumber = 80;

  constructor() {
  }

  ngOnInit() {
    this.setDisplayedColumns();
    this.setSelectionModel();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['columns'] && Array.isArray(changes['columns']['currentValue'])) {
      this.setDisplayedColumns();
    }
    if (changes['rows'] && Array.isArray(changes['rows']['currentValue'])) {
      this.selection.clear();
      this.emitEventChecked();
      this.dataSource.data = changes['rows']['currentValue'];
    }
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  setDisplayedColumns(): void {
    this.displayedColumns = [];
    if (this.actions[0]) {
      this.displayedColumns = ['select'];
    }
    if (this.currentPage) {
      this.displayedColumns.push('stt');
    }
    this.columns.forEach(col => {
      if (typeof col.isShow === 'undefined' || col.isShow) {
        this.displayedColumns.push(col.name);
      }
    });
    // if (this.getTableActions().length) {
    //     this.displayedColumns.push('table_action');
    // }
  }

  onColumnClick(row: any, column: any) {
    this.columnClick.emit({ row, column });
  }

  // tslint:disable-next-line:no-unnecessary-initializer
  onActionClick(actionName: string, params: any = undefined) {
    const data: any = { action: actionName, params };
    this.onAction.emit(data);
  }

  setSelectionModel() {
    const initialSelection: any = [];
    const allowMultiSelect: boolean = true;
    this.selection = new SelectionModel<any>(allowMultiSelect, initialSelection);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected >= numRows;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
    this.emitEventChecked();
  }

  actionChecked(row: any) {
    this.selection.toggle(row);
    this.emitEventChecked();
  }

  emitEventChecked() {
    const ids: any[] = [];
    this.selection.selected.map(e => ids.push(e.id));
    this.rowChecked.emit(ids);
  }

  isRender(column: any): boolean {
    return (typeof column.render === 'function');
  }

  /**
   * Trả về boolean cho biết action có được hiện lên hay không
   * @param action
   * @param on
   */
  isShowAction(action: any, on: string = 'bar'): boolean {
    let isShow = true;
    //Nếu có truyền biến isShow qua thì lấy giá trị đó
    if (typeof action.isShow !== "undefined") {
      isShow = action.isShow;
    }
    if (!isShow) {
      return false
    }

    let is = true;
    // Nếu không có quyền
    if (typeof action.permission !== 'undefined' && !action.permission) {
      return false;
    }

    if (on === 'bar') {
      // If item select length
      if (action.isOne) {
        is = this.selection.selected.length === 1;
      } else {
        is = this.selection.selected.length > 0;
      }
    }

    /**
     * Kiểm tra hiển thị bằng callback function
     */
    if (typeof action.isShowFn === 'function') {
      const checkShow = this.rows
        .filter(e => this.rowsSelect.includes(e.id))
        .every(row => {
          return action.isShowFn(row);
        });
      if (!checkShow) {
        return false;
      }
    }

    /**
     * Kiểm tra xem action sẽ được xuất hiện ở tab nào
     * Chú ý: Vòng kiểm tra này phải luôn luôn nằm cuối
     */
    if (action.onTab && Array.isArray(action.onTab) && action.onTab.length >= 2) {
      if (action.onTab[0]) {
        return action.onTab.indexOf(this.onTab) !== -1 && is;
      }
      return action.onTab.indexOf(this.onTab) === -1 && is;
    }
    return is;
  }

  isChecker(row: any): boolean {
    const item: any = this.selection.selected.find(e => e.id === row.id);
    return item ? true : false;
  }

  makeColumnStyle(column: any): any {
    return {
      'text-align': column.align || undefined,
      'background-color': column.backgroundColor || undefined,
      'font-size': column.fontSize || undefined,
      'font-weight': column.fontWeight || undefined,
      'font-style': column.fontStyle || undefined,
      'width': column.width || undefined,
      'min-width': column.minWidth || undefined,
      'cursor': column.action ? 'pointer' : 'auto'
    };
  }

  limitText(column: any, str: string): string {
    if (column.limit && str) {
      const limit: number = Number.isInteger(column.limit) ? column.limit : this.limitNumber;
      if (str.length > limit) {
        str = str.substring(0, limit) + ' ...';
      } else {
        str = str.substring(0, limit);
      }
    }
    return str;
  }

  getTableActions(): any[] {
    return this.actions.filter(action => action.onRow);
  }

  getSTT(index: number) {
    if (this.currentPage) {
      return (index + 1) + ((this.currentPage - 1) * this.rows.length);
    }
    return null;
  }
}
