import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileRoutingModule } from './my-profile-routing.module';
import { MyProfileComponent } from './my-profile.component';
import { OrderComponent } from './order/order.component';
import { TableModule } from "../../components/table/table.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderReferralComponent } from './order-referral/order-referral.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { QuestionService } from 'src/components/modal/modal-question';
import { RewardPointComponent } from './reward-point/reward-point.component';
import { WalletTicketComponent } from './wallet-ticket/wallet-ticket.component';
import { ModalEditWalletTicketComponent } from './wallet-ticket/modal-edit-wallet-ticket/modal-edit-wallet-ticket.component';
import { DownloadPointComponent } from './download-point/download-point.component';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextareaModule } from 'primeng/inputtextarea';


@NgModule({
  declarations: [
    MyProfileComponent,
    OrderComponent,
    OrderReferralComponent,
    RewardPointComponent,
    WalletTicketComponent,
    ModalEditWalletTicketComponent,
    DownloadPointComponent
  ],
  imports: [
    CommonModule,
    MyProfileRoutingModule,
    TableModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
    ToastModule,
    InputTextModule,
    ButtonModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    InputTextareaModule
  ],
  providers: [MessageService, QuestionService]
})
export class MyProfileModule { }
