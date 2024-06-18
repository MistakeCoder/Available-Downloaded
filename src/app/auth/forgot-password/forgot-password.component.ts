import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordService } from './forgot-password.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [ForgotPasswordService, MessageService]
})
export class ForgotPasswordComponent {
  formForgotPassword!: FormGroup;
  isSuccess: boolean = false;
  countdownTime: number = 10;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    public forgotPasswordService: ForgotPasswordService,
    public router: Router,
    public messageService: MessageService
  ) {
    this.initForm();
  }

  initForm() {
    this.formForgotPassword = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    })
  }

  navigate(redirect: string) {
    this.router.navigate([redirect]);
  }

  onSubmit() {
    this.setLoading(true);
    const params = this.formForgotPassword.value;
    this.forgotPasswordService.resetPassword(params).subscribe((res: any) => {
      if (res.status) {
        this.isSuccess = true;
        this.countdown();
      } else {
        this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: res.message });
      }
      this.setLoading(false);
    })
  }

  countdown(): void {
    let seconds = 10;
    const timer = setInterval(() => {
      if (seconds > 0) {
        seconds--;
      } else {
        clearInterval(timer);
        this.navigate('/login');
      }
      this.updateCurrentTime(seconds);
    }, 1000);
  }

  updateCurrentTime(seconds: number): void {
    this.countdownTime = seconds;
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
