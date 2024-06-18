import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterService, MessageService]
})
export class RegisterComponent {
  formRegister!: FormGroup;
  checkRegister: boolean = true;
  isDisabled: boolean = false;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    public registerService: RegisterService,
    private router: Router,
    public messageService: MessageService,
    public route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.initForm();
    this.route.queryParams.subscribe(param => {
      const referralCode = param['referralId'];

      if (referralCode) {
        this.formRegister.get('referral_code')?.setValue(referralCode);
        this.formRegister.get('referral_code')?.disable();
      }

    });
  }

  initForm() {
    this.formRegister = this.fb.group({
      name: [null, Validators.required],
      phone: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirm_password: [null, Validators.required],
      referral_code: [null],
      checkbox: [null, Validators.required],
    })
  }

  onCheckboxChange() {
    this.checkRegister = this.formRegister.value.checkbox;
  }

  navigate(redirect: string) {
    this.router.navigate([redirect]);
  }

  onSubmit() {
    this.setLoading(true);
    const valueForm = this.formRegister.value;
    const params = {
      name: valueForm.name,
      phone: valueForm.phone,
      email: valueForm.email,
      password: valueForm.password,
      confirm_password: valueForm.confirm_password,
      referral_code: this.formRegister.get('referral_code')?.value,
    }

    localStorage.setItem('tempEmail', params.email);

    if (this.formRegister.valid) {
      this.registerService.register(params).subscribe((res: any) => {
        if (res.status) {
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message });
          this.router.navigate(['/verify']);
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: res.message });
        }
        this.setLoading(false);
      })
    }
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
