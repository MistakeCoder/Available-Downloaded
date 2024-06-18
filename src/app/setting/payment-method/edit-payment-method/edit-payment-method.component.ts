import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PaymentMethodService } from '../payment-method.service';
import { QuestionService } from 'src/components/modal/modal-question';


@Component({
  selector: 'app-edit-payment-method',
  templateUrl: './edit-payment-method.component.html',
  styleUrls: ['./edit-payment-method.component.scss'],
  providers: [PaymentMethodService, MessageService, QuestionService]
})
export class EditPaymentMethodComponent {
  form!: FormGroup;
  filteredBanks: any;
  type: string = 'bank';
  action: any;
  istypeBank: boolean = false;
  istypeCard: boolean = false;
  isTypeEdit: boolean = false;
  idAccount: any;
  loading: boolean = false;

  @Output() activeTab = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    public paymentMethodService: PaymentMethodService,
    public messageService: MessageService,
    public questionService: QuestionService
  ) {

    this.initForm();

  }

  ngOnInit() {
    this.queryParams();
  }

  initForm() {
    this.form = this.fb.group({
      selectedType: null,
      selectedBanks: null,
      bank_id: [null, Validators.required],
      beneficiary_account: [null, Validators.required],
      beneficiary: [null, Validators.required],
      type: this.type,
      is_default: null
    });
  }

  queryParams() {
    this.route.queryParams.subscribe(params => {
      this.type = params['type'];
      this.action = params['type'];
      this.form.get('type')?.patchValue(this.type);

      this.idAccount = params['idAccount'];
      if (this.type === 'card') {
        this.istypeCard = true;
      } else if (this.type === 'edit') {
        this.getDetailPaymentMethod();
        this.isTypeEdit = true;
      } else {
        this.istypeBank = true;
      }
    });
  }

  async getDetailPaymentMethod() {
    this.setLoading(true);
    this.paymentMethodService.getDetailPaymentMethod(this.idAccount).subscribe(res => {
      if (res.status) {
        this.form.patchValue(res.data);
        this.form.get('selectedBanks')?.patchValue(res.data?.bank?.name);
        this.form.get('is_default')?.patchValue(parseInt(res.data?.is_default));

        if (res.data?.type === 'card') {
          this.istypeCard = true;
        } else {
          this.istypeBank = true;
        }

        this.setLoading(false);
      }
    });

  }

  /**
   * Xoá tài khoản thanh toán
   * @param action hành động gồm : huỷ và xoá
   */
  removePaymentMethod(action: string = 'cancel') {
    if (action === 'remove') {
      const dialogRef = this.questionService.open(
        'XÓA DỮ LIỆU',
        'Bạn muốn xoá Phương thức thanh toán này?',
        '#FF0000'
      );
      dialogRef.afterClosed().subscribe(async (result: any) => {
        if (result) {
          this.paymentMethodService.removePaymentMethod(this.idAccount).subscribe(res => {
            if (res.status) {
              this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message });
              this.activeTab.emit({ data: false, status: res.status, message: res.message });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: res.message });
            }
          })
        }
      });
    } else {
      this.activeTab.emit({ data: false });
    }
  }

  /**
   * Tìm kiếm ngân hàng
   */
  filterBanks(event: any) {
    const params: any = {
      pagination: true,
      keyword: event.query
    };
    this.paymentMethodService.filterBanks(params, 1, 20).subscribe((res: any) => {
      this.filteredBanks = res.data;
    });
  }

  onBankSelect(event: any) {
    if (event && event.value) {
      const selectedBankValue = event.value;
      this.form.get('bank_id')?.setValue(selectedBankValue.id);
    }
  }

  onTypeCheckbox(event: any) {
    if (event && event.value) {
      const checked = event.value;
      this.type = checked;
      this.form.get('type')?.patchValue(this.type);
    }
  }

  onSubmit() {
    this.setLoading(true);
    this.form.removeControl('selectedType');
    this.form.removeControl('selectedBanks');

    if (this.action === 'edit') {
      this.paymentMethodService.updatePaymentMethod(this.idAccount, this.form.value).subscribe(res => {
        if (res.status) {
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message });
          this.activeTab.emit({ data: false, status: res.status, message: res.message });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: res.message });
        }
      });
      this.setLoading(false);
    } else {
      this.paymentMethodService.addPaymentMethod(this.form.value).subscribe(res => {
        if (res.status) {
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message });
          this.activeTab.emit({ data: false, status: res.status, message: res.message });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: res.message });
        }
      });
      this.setLoading(false);
    }
  }

  backTo() {
    this.activeTab.emit({ data: false });
  }

  /**
   * Set trạng thái loading cho trang
   * @param loadingStatus
   */
  setLoading(loadingStatus: boolean) {
    this.loading = loadingStatus;
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.style.display = loadingStatus ? 'flex' : 'none';
    }
  }

}
