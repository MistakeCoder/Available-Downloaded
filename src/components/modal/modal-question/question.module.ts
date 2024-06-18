import { NgModule } from '@angular/core';
import { ModalQuestionComponent } from './question.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MatButtonModule } from '@angular/material/button';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ModalQuestionComponent,
  ],
  bootstrap: [
    ModalQuestionComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    InputTextModule,
    InputNumberModule,
    MatButtonModule,
    ToastModule,
    FormsModule
  ],
  exports: [
    ModalQuestionComponent,
    MatDialogModule
  ]
})
export class ModalQuestionModule {
}
