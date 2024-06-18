import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentMethodRoutingModule } from './payment-method-routing.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PaymentMethodRoutingModule,
    MatDialogModule
  ],
})
export class PaymentMethodModule { }
