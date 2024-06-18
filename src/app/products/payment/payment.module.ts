import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import { FieldsetModule } from 'primeng/fieldset';
import { MatRadioModule } from '@angular/material/radio';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    PaymentComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    MatTableModule,
    FieldsetModule,
    MatRadioModule,
    DropdownModule,
    ReactiveFormsModule,
    ToastModule
  ]
})
export class PaymentModule { }
