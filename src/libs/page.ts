import { Injectable, Injector, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/auth/login/login.service';
import { Component } from './component';
@Injectable()
export class Page extends Component implements OnDestroy {

  router: Router;
  route: ActivatedRoute;
  dialog: MatDialog;

  authEvent: any;
  auth: LoginService;
  unauthorized: boolean = false;
  subscriptionTimer: any;

  constructor(
    public inject: Injector
  ) {
    super(inject);
    this.router = inject.get(Router);
    this.route = inject.get(ActivatedRoute);
    this.dialog = inject.get(MatDialog);
    this.auth = inject.get(LoginService);

    // this.authEvent = this.auth.events.subscribe((res) => {
    //   this.onAuthEvents(res);
    // });
  }

  ngOnDestroy() {
    if (this.authEvent) {
      this.authEvent.unsubscribe();
    }
    if (this.subscriptionTimer) {
      this.subscriptionTimer.unsubscribe();
    }
  }

  navigate(path: string, params: any = {}): void {
    this.router.navigate([path], params);
  }

  isLoading(): string {
    return this.loading ? 'is-loading' : '';
  }

  onAuthEvents(payload: any): void {
    switch (payload.type) {
      case 'logout':
        window.location.reload();
        break;
    }
  }
}
