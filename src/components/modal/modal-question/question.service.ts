import { Injectable } from '@angular/core';
import { ModalQuestionComponent } from './question.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({ providedIn: 'root' })
export class QuestionService {

  constructor(
    private dialog: MatDialog
  ) {
  }

  open(title: string, message: string, color: string, isInput: boolean = false): any {
    return this.dialog.open(ModalQuestionComponent, {
      data: { title, message, color, isInput },
      width: '492px'
    });
  }
}
