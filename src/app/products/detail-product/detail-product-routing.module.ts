import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsProductsComponent } from './detail-product.component';

const routes: Routes = [{ path: '', component: DetailsProductsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsProductsRoutingModule { }
