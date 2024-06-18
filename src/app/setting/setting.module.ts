import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { EditPaymentMethodComponent } from './payment-method/edit-payment-method/edit-payment-method.component';
import { MatDialogModule } from '@angular/material/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FieldsetModule } from 'primeng/fieldset';
import { MatRadioModule } from '@angular/material/radio';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { TableModule } from 'src/components/table/table.module';
import { QuestionService } from 'src/components/modal/modal-question';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    SettingComponent,
    PersonalInfoComponent,
    PaymentMethodComponent,
    EditPaymentMethodComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    MatDialogModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    FormsModule,
    InputTextareaModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    AutoCompleteModule,
    DropdownModule,
    MatCheckboxModule,
    FieldsetModule,
    MatRadioModule,
    TableModule,
    MatSnackBarModule,
    DatePipe
  ],
  providers: [MessageService, QuestionService]
})
export class SettingModule { }
