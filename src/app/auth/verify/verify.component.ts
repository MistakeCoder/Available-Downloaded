import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifyService } from './verify.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
  providers: [VerifyService, MessageService],
})
export class VerifyComponent {
  verifyPhonenumberForm!: FormGroup;
  tempEmail: any;
  isVerifySuccess: boolean = false;
  countdownTime: number = 10;
  loading: boolean = false;

  constructor(
    public verifyService: VerifyService,
    private fb: FormBuilder,
    public router: Router,
    public messageService: MessageService
  ) {
    this.initForm();
  }
  ngOnInit(): void {
    this.tempEmail = localStorage.getItem('tempEmail');
  }

  /**
   * Khởi tạo form
   */
  initForm() {
    this.verifyPhonenumberForm = this.fb.group({
      code1: [null, Validators.required],
      code2: [null, Validators.required],
      code3: [null, Validators.required],
      code4: [null, Validators.required],
      code5: [null, Validators.required],
      code6: [null, Validators.required],
      verify_code: null,
      email: localStorage.getItem('tempEmail'),
    })
  }

  /**
   * Tự động di chuyển con nháy
   * @param currentIndex 
   */
  moveFocus(currentIndex: number): void {
    const nextIndex: number = currentIndex + 1;
    const nextInput: HTMLElement | null = document.getElementById(`code${nextIndex}`);
    if (nextInput && nextInput instanceof HTMLInputElement) {
      if (nextIndex <= 6) {
        nextInput.focus();
      }
    }
  }

  /**
   * Khi xoá các kí tự, tự động lùi focus
   * @param event 
   * @param currentIndex 
   */
  handleBackspace(event: any, currentIndex: number) {
    if (event.key === "Backspace" && event.target.value === '') {
      const prevIndex = currentIndex - 1;
      const prevInput = document.getElementById(`code${prevIndex}`);
      if (prevInput && prevInput instanceof HTMLInputElement) {
        prevInput.focus();
      }
    }
  }

  /**
   * Xử lý code
   */
  async progressCode() {
    const valueForm = this.verifyPhonenumberForm.value;
    valueForm.email = localStorage.getItem('tempEmail');
    valueForm.verify_code = valueForm.code1 + valueForm.code2 + valueForm.code3 + valueForm.code4 +
      valueForm.code5 + valueForm.code6;
  }

  /**
   * Khi nhấn Verify
   */
  async onSubmit() {
    this.setLoading(true);
    const valueForm = this.verifyPhonenumberForm.value;
    this.progressCode();
    delete valueForm.code1;
    delete valueForm.code2;
    delete valueForm.code3;
    delete valueForm.code4;
    delete valueForm.code5;
    delete valueForm.code6;

    this.verifyService.verifyEmail(valueForm).subscribe((res: any) => {
      if (res.status) {
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message });
        this.isVerifySuccess = true;
        this.countdown();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: res.message });
      }
      this.setLoading(false);
    })
  }

  navigate(redirect: string) {
    this.router.navigate([redirect]);
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
