import { Injectable, Injector } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Page } from './page';

@Injectable()
export class AppPage extends Page {

  moduleName = '';
  ngOption: any = { standalone: true };
  messageService: MessageService;

  CALENDER_CONFIG_VI = {
    firstDayOfWeek: 1,
    dayNames: ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy', 'Chủ nhật'],
    dayNamesShort: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    dayNamesMin: ['2', '3', '4', '5', '6', '7', 'CN'],
    monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10',
      'Tháng 11', 'Tháng 12'],
    monthNamesShort: ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'],
    today: 'Hôm nay',
    clear: 'Xoá',
  };

  constructor(
    inject: Injector
  ) {
    super(inject);
    this.messageService = inject.get(MessageService);
  }

  /**
   * Kiểm tra quyền truy cập của người dùng
   * @param actionName Hành động của người dùng - action có thể là 1 hoặc nhiều. vd: 'index store update'
   * @param moduleName Tên của module tác động - action có thể là 1 hoặc nhiều. vd: 'users customers'
   */
  can(actionName: string, moduleName: string = this.moduleName): boolean {
    // if (!this.auth.scopes || !this.auth.scopes.length) { return false; }
    // if (this.auth.scopes.length === 1 && this.auth.scopes[0] === '*') {
    //   return true;
    // }
    const actions: string[] = actionName.split(' ');
    const modules: string[] = moduleName.split(' ');
    let can = false;
    modules.forEach((md: any) => {
      actions.forEach((action: string | any) => {
        // if (this.isInScopes(md + '-' + action)) {
        //   can = true;
        // }
        can = true;
      });
    });
    return can;
  }

  /**
   * Kiểm tra xem người dùng có được quyền truy cập hay không.
   * Nếu không có chuyển hướng đến trang no-permission
   */
  // isView(action: string = '', moduleName: string = this.moduleName): void {
  //   if (!this.can(action || 'index')) {
  //     this.navigate('/error', { queryParams: { error: 401, type: 'no-permission' } });
  //   }
  // }

  /**
   * Kiểm tra xem người dùng truy cạp có phải thuộc nhớm Admin hay không
   * @return boolean
   */
  // isAdmin(): boolean {
  //   return (this.auth.user && this.auth.user.group_id === 1);
  // }

  // isInScopes(scope: string): boolean {
  //   return this.auth.scopes.includes(scope);
  // }

  /**
   * Scroll đến vị trí id chỉ định
   * @param el: tên id chỉ định
   */
  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }

  /**
   * Hiển thị thông báo thành công
   */
  showSuccess(message: string, life: number = 2500) {
    this.messageService.clear();
    this.messageService.add({ severity: 'success', summary: 'Thành công', detail: message, life: life });
  }

  /**
   * Hiển thị lỗi
   */
  showError(message: string, life: number = 5000) {
    this.messageService.clear();
    this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: message, life: life });
  }

  /**
   * Hiển thị thông báo
   */
  showWarn(message: string, life: number = 5000) {
    this.messageService.clear();
    this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: message, life: life });
  }
}
