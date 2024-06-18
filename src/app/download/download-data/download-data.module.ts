import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DownloadDataRoutingModule } from './download-data-routing.module';
import { DownloadDataComponent } from './download-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    DownloadDataComponent
  ],
  imports: [
    CommonModule,
    DownloadDataRoutingModule,
    FormsModule,
    RadioButtonModule,
    ReactiveFormsModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class DownloadDataModule { }
