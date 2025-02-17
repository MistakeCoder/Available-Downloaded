import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloadDataComponent } from './download-data.component';

const routes: Routes = [{ path: '', component: DownloadDataComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadDataRoutingModule { }
