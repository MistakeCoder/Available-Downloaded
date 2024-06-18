import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppStorage } from 'src/libs/storage';
import { PersonalInfoService } from './personal-info.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
  providers: [MessageService, PersonalInfoService]
})
export class PersonalInfoComponent {

  storage: AppStorage = new AppStorage();
  formPersonalInfo!: FormGroup;
  baseUrl: string = '';
  referralCode: any;
  loading: boolean = false;

  constructor(
    public fb: FormBuilder,
    public personalInfoService: PersonalInfoService,
    public messageService: MessageService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.getPersonalInfo();
  }

  /**
   * Khởi tạo form
   */
  initForm() {
    this.formPersonalInfo = this.fb.group({
      code: null,
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, Validators.required],
      referral_link: [null],
    })
  }

  /**
   * Lấy thông tin cá nhân
   */
  async getPersonalInfo() {
    this.personalInfoService.fetchUsersLogin().subscribe(res => {
      if (res.status) {
        const formValue = this.formPersonalInfo.value;
        delete formValue.link_referral;
        this.formPersonalInfo.patchValue(res.data);
        this.referralCode = res.data.code;
        this.getBaseUrl();
        this.storage.setItem('user', JSON.stringify(res.data));
        this.formPersonalInfo.controls['code'].disable();
      }
    })
  }

  /**
   * Cập nhật thông tin cá nhân
   */
  async updatePersonalInfo() {
    this.setLoading(true);
    const formValue = this.formPersonalInfo.value;
    delete formValue.link_referral;
    delete formValue.code;
    this.personalInfoService.updatePersonalInfo(formValue).subscribe(response => {
      if (response.status) {
        this.getPersonalInfo();
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: response.message });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: response.message });
      }
      this.setLoading(false);
    });

  }

  async getBaseUrl() {
    this.personalInfoService.getBaseUrl().subscribe(res => {
      if (res.status) {
        this.baseUrl = res.data?.base_url;
        this.baseUrl += `/#/register?referralId=${this.referralCode}`;
        this.formPersonalInfo.get('referral_link')?.patchValue(this.baseUrl);
      }
    })
  }

  async copyToClipboard() {
    navigator.clipboard.writeText(this.formPersonalInfo.value.referral_link);
    this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Sao chép thành công' });
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
