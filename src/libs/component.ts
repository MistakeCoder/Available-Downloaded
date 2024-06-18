import { Injectable, Injector, ChangeDetectorRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import 'lodash';
//import * as moment from 'moment';
import { AppStorage } from 'src/libs/storage';
//import { CookieService } from 'src/libs/services/cookie.service';

declare var _: any;
@Injectable()
export class Component {

  apiUrl: string = environment.apiUrl;
  coreUrl: string = environment.coreUrl;

  ref: ChangeDetectorRef;
  snackBar: MatSnackBar;
  //moment: any = moment;
  storage: AppStorage = new AppStorage();
  //cookie: CookieService = new CookieService();

  loading = false;
  loadingRequest = false;

  _: any = _;

  constructor(
    inject: Injector
  ) {
    this.ref = inject.get(ChangeDetectorRef);
    this.snackBar = inject.get(MatSnackBar);
  }

  isEmpty(value: boolean): boolean {
    return this._.isEmpty(value);
  }

  toast(message: string, action: any = null as any, option: any = { duration: 1000 }): void {
    this.snackBar.open(message, action, option);
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

  /**
   * Set trạng thái loading cho trang khi chạy 1 request nào đó!
   * @param loadingStatus
   */
  setLoadingRequest(loadingStatus: boolean) {
    this.loadingRequest = loadingStatus;
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.style.display = loadingStatus ? 'flex' : 'none';
    }
  }
}
