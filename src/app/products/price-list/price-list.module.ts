import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PriceListRoutingModule } from './price-list-routing.module';
import { PriceListComponent } from './price-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalOrderConfirmComponent } from 'src/components/modal/modal-order-confirm/modal-order-confirm.component';



@NgModule({
  declarations: [
    PriceListComponent,
    ModalOrderConfirmComponent
  ],
  imports: [
    CommonModule,
    PriceListRoutingModule,
    MatDialogModule
  ]
})
export class PriceListModule { }
