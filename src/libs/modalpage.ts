import { Injectable, Injector } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppPage } from "src/libs/apppage";

@Injectable()
export abstract class ModalPage extends AppPage {

  data: any;
  dialogRef: MatDialogRef<ModalPage>;

  constructor(
    public injector: Injector,
  ) {
    super(injector);
    this.data = this.injector.get(MAT_DIALOG_DATA);
    this.dialogRef = this.injector.get(MatDialogRef, ModalPage);
  }

  close(status: any = null) {
    this.dialogRef.close(status);
  }

}
