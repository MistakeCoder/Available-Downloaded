import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalPromotionComponent } from 'src/components/modal/modal-promotion/modal-promotion.component';

@NgModule({
  declarations: [
    LoginComponent,
    ModalPromotionComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    MatDialogModule
  ]
})
export class LoginModule { }
