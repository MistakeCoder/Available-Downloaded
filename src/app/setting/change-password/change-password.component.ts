import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ChangePasswordService } from './change-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  formChangePassword!: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    public changePasswordService: ChangePasswordService,
    public messageService: MessageService
  ) {
    this.initForm();
  }

  initForm() {
    this.formChangePassword = this.fb.group({
      current_password: [null, Validators.required],
      password: [null, Validators.required],
      confirm_password: [null, Validators.required],
    })
  }


  onSubmit() {
    this.setLoading(true);
    const valueForm = this.formChangePassword.value;

    this.changePasswordService.changePassword(valueForm).subscribe((res: any) => {
      if (res.status) {
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message });

      } else {
        this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: res.message });
      }
      this.setLoading(false);
    })
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
