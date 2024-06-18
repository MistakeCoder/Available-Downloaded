import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalPage } from 'src/libs/modalpage';
import { WalletTicketService } from '../wallet-ticket.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-modal-edit-wallet-ticket',
  templateUrl: './modal-edit-wallet-ticket.component.html',
  styleUrls: ['./modal-edit-wallet-ticket.component.scss']
})
export class ModalEditWalletTicketComponent extends ModalPage implements OnInit {
  title = 'Thêm phiếu rút điểm';
  action = 'add';
  id: number = 0;
  form!: FormGroup;
  nodesCustomerAccount: any;
  groups: any[] = [];
  filteredBanks: any;
  filteredCustomers: any;
  filteredCustomerAccount: any;
  filteredPaymentMethod: any;
  filteredBankAccount: any;
  isChangeStatus: boolean = false;
  isActionFinish: boolean = false;
  isDisabled: any = true;

  constructor(
    public override inject: Injector,
    private walletTicketService: WalletTicketService,
    private fb: FormBuilder,
  ) {
    super(inject);
    this.initForm();
    if (this.data && this.data.action === 'edit') {
      this.action = 'edit';
      this.id = this.data.id;
      this.title = 'Sửa phiếu rút điểm';
      this.getDetailWalletTickets();
    }
  }

  ngOnInit() {
    this.getAllCustomerAccount();
  }

  initForm() {
    this.form = this.fb.group({
      selected_customer_account: null,
      amount: [null, Validators.required],
      type: 'withdraw',
      customer_account_id: [null, Validators.required],
      bank_name: [null, Validators.required],
      beneficiary_account: [null, Validators.required],
      beneficiary: [null, Validators.required],
      note: null,
    });
  }

  /**
   * Lấy chi tiết tài khoản thanh toán
   */
  async getDetailWalletTickets() {
    this.loading = true;
    const res: any = await lastValueFrom(this.walletTicketService.getDetailWalletTickets(this.data.id));

    this.form.patchValue(res.data);

    this.walletTicketService.getCustomerAccount().subscribe((response: any) => {
      if (response.status) {
        const valueRes = response.data;
        valueRes.find((e: any) => {
          if (e.id === res.data.customer_account_id) {
            this.form.get('selected_customer_account')?.patchValue(e.beneficiary);
          }
        });
      }
    });

    this.loading = false;
  }

  getAllCustomerAccount() {
    this.walletTicketService.getCustomerAccount().subscribe(res => {
      if (res.status) {
        this.filteredCustomerAccount = res.data;
      }
    });

  }

  /**
   * Tìm kiếm ngân hàng
   */
  filterBanks(event: any) {
    const params: any = {
      pagination: true,
      keyword: event.query
    };
    this.walletTicketService.filterBanks(params, 1, 20).subscribe((res: any) => {
      this.filteredBanks = res.data;
    });
  }

  /**
   * Sự kiện khi chọn ngân hàng
   * @param event 
   */
  onBankSelect(event: any) {
    if (event && event.value) {
      const selectedBankValue = event.value;
      this.form.get('bank_name')?.setValue(selectedBankValue.name);
    }
  }


  /**
   * Tìm kiếm tài khoản khách hàng
   * @param event 
   */
  filterCustomerAccount(event: any) {
    this.walletTicketService.getCustomerAccount().subscribe(res => {
      if (res.status) {
        this.filteredCustomerAccount = res.data;
      }
    });
  }

  /**
   * Sự kiện chọn tài khoản khách hàng
   * @param event 
   */
  onCustomerAccountSelect(event: any) {
    const valueCustomerAccountSelected = event.value;

    this.form.get('customer_account_id')?.patchValue(valueCustomerAccountSelected.id);
    this.form.get('beneficiary')?.patchValue(valueCustomerAccountSelected.beneficiary);
    this.form.get('beneficiary_account')?.patchValue(valueCustomerAccountSelected.beneficiary_account);
    this.form.get('bank_name')?.patchValue(valueCustomerAccountSelected.bank?.name);
  }

  /**
   * Khi nhấn lưu
   */
  async submit() {
    this.loading = true;

    const paramsUpdateCreate: any = {
      amount: this.form.value.amount,
      type: 'withdraw',
      customer_account_id: this.form.value.customer_account_id,
      bank_name: this.form.value.bank_name,
      beneficiary_account: this.form.value.beneficiary_account,
      beneficiary: this.form.value.beneficiary,
      note: this.form.value.note,
    }

    if (this.action === 'add') { //thêm
      this.walletTicketService.create(paramsUpdateCreate).subscribe(res => {
        if (res.status) {
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message });
          this.close(true);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: res.message });
          this.loading = false;
          this.close(true);
        }
      })
      this.loading = false;
    }
    else {// cập nhật
      const res: any = await lastValueFrom(this.walletTicketService.update(this.id, paramsUpdateCreate));
      if (res.status) {
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message });
        this.close(true);
      } else {
        this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: res.message });
        this.close(true);
        this.loading = false;
      }
      this.loading = false;
    }
  }
}
