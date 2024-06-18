import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  },
  {
    path: 'price-list',
    loadChildren: () => import('./products/price-list/price-list.module').then(m => m.PriceListModule)
  },
  {
    path: 'detail-product',
    loadChildren: () => import('./products/detail-product/detail-product.module').then(m => m.DetailsProductsModule)
  },
  {
    path: 'download-data',
    loadChildren: () => import('./download/download-data/download-data.module').then(m => m.DownloadDataModule)
  },
  {
    path: 'verify',
    loadChildren: () => import('./auth/verify/verify.module').then(m => m.VerifyModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./products/payment/payment.module').then(m => m.PaymentModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule)
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./my-profile/my-profile.module').then(m => m.MyProfileModule)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
