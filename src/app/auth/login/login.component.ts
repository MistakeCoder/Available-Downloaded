import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AppStorage } from 'src/libs/storage';
import { ModalPromotionComponent } from 'src/components/modal/modal-promotion/modal-promotion.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService, MessageService]
})
export class LoginComponent {
  loginForm!: FormGroup;
  localStorage: AppStorage = new AppStorage();
  loading: boolean = false;
  user: any = {};
  loggedIn = false;

  constructor(
    private fb: FormBuilder,
    public loginService: LoginService,
    public messageService: MessageService,  
    public router: Router,
    public dialog: MatDialog,
  ) {
    this.initForm();

  }
  ngOnInit(): void {
    this.checkExistsUser();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    })
  }

  navigate(redirect: string) {
    this.router.navigate([redirect]);
  }

  checkExistsUser() {
    const user = this.localStorage.getItem('user', null);
    if (user) {
      this.user = JSON.parse(user);
      this.loggedIn = true;
      this.router.navigate(['/download-data']);//gán tạm thời

      this.loginService.getAvailablePromotion().subscribe(res => {
        if (res.status) {
          if (res.data.length > 0) {
            setTimeout(() => {
              this.dialog.open(ModalPromotionComponent, {
                width: '600px',
                disableClose: true,
                panelClass: 'overflow-none'
              });
            }, 500);
          }
        }
      });

    }
  }

  onSubmit() {
    this.setLoading(true);
    const valueFormLogin = this.loginForm.value;
    this.loginService.login(valueFormLogin).subscribe(data => {
      if (data.status) {
        this.localStorage.setItem('access_token', data.access_token);

        this.loginService.fetchUsersLogin().subscribe(response => {
          if (response.status) {
            this.localStorage.setItem('user', JSON.stringify(response));
            window.location.reload();
          }
        });

      } else {
        this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: data.message });
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
