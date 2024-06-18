import { Component, Injector } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-modal-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class ModalQuestionComponent {

  title!: string;
  message!: string;
  color!: string;
  originAddress: string = '';
  hashId: string = '';
  amount: number = 0;
  isNumber: boolean = false;

  data: any;
  dialogRef!: MatDialogRef<ModalQuestionComponent>;

  constructor(
    public injector: Injector,
  ) {
    this.data = this.injector.get(MAT_DIALOG_DATA);
    this.dialogRef = this.injector.get(MatDialogRef, ModalQuestionComponent);

    if (this.data && this.data.title) {
      this.title = this.data.title;
    }
    if (this.data && this.data.message) {
      this.message = this.data.message;
    }
    if (this.data && this.data.color) {
      this.color = this.data.color;
    }
    if (this.data && this.data.isNumber) {
      this.isNumber = this.data.isNumber;
    }
    if (this.data && this.data.hashId) {
      this.hashId = this.data.hashId;
    }
  }

  close(status: any = null) {
    this.dialogRef.close(status);
  }

  submit() {
    if (this.data.isInput) {
      const params: any = { address: this.originAddress, amount: this.amount };
      if (this.hashId) {
        params['hash_id'] = this.hashId;
      }
      this.close(params);
    } else {
      this.close(true);
    }
  }
}
