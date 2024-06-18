import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsProductsRoutingModule } from './detail-product-routing.module';
import { DetailsProductsComponent } from './detail-product.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    DetailsProductsComponent
  ],
  imports: [
    CommonModule,
    DetailsProductsRoutingModule,
    MatDialogModule
  ]
})
export class DetailsProductsModule { }
