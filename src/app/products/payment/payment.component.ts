import { Component, Injector, OnInit } from '@angular/core';
import { PaymentService } from './payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AppStorage } from 'src/libs/storage';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  providers: [PaymentService, DatePipe, MessageService]
})
export class PaymentComponent {
  form!: FormGroup;
  idOrder: number = 0;
  dataOrder: any;
  totalTemp: number = 0;
  totalPrimary: number = 0;
  totalText: string = '';
  status: string = '';
  nodePaymentMethod: any;
  nodePaymentAccount: any;
  isShowPaymentAccount: boolean = false;
  paymentInfo: any;
  isShowPaymentInfo: boolean = false;
  isShowPayment: boolean = true;
  book_keeping: any;
  storage: AppStorage = new AppStorage();
  isShowSubmitConfirmPayment: boolean = false;
  type: string = 'order';
  loading: boolean = false;

  constructor(
    public paymentService: PaymentService,
    public router: Router,
    public route: ActivatedRoute,
    public datePipe: DatePipe,
    public fb: FormBuilder,
    public messageService: MessageService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.getDetailOrder();
    this.getAllPaymentMethod();
  }

  initForm() {
    this.form = this.fb.group({
      selectedPaymentMethod: null,
      selectedPaymentAccount: null,
      payment_method_id: null,
      bank_account_id: null,
      amount: this.totalPrimary,
      order_id: this.idOrder
    })
  }

  /**
   * Kiểm tra loại đơn hàng
   */
  async getDetailOrder() {
    this.route.queryParams.subscribe(params => {
      this.idOrder = (params['idOrder']) ? params['idOrder'] : null;
      this.type = params['type'];

      this.form.get('order_id')?.setValue(this.idOrder);

      if (this.type === 'order-referral') {
        this.getDetailOrderReferral();
      } else {
        this.getDetailOrderNormal();
      }
    });
  }

  /**
   * Lấy chi tiết đơn hàng giới thiệu
   */
  getDetailOrderReferral() {
    this.setLoading(true);
    this.paymentService.getDetailOrdersReferral(this.idOrder).subscribe(response => {
      if (response.status) {
        this.dataOrder = response.data;
        this.isShowPayment = false; //tắt chọn tài khoản ngân hàng nếu là đơn hàng giới thiệu

        //Tính tổng số tiền thanh toán cho đơn hàng
        this.dataOrder.products.map((item: any) => {
          this.totalTemp = item?.pivot?.quantity * item?.pivot?.price;
          this.totalPrimary = this.totalTemp;
        });

        //Kiểm tra đơn hàng đã thanh toán hay chưa thanh toán
        if (this.dataOrder.book_keeping.length > 0) {
          this.isShowPaymentInfo = true;
          this.book_keeping = this.dataOrder.book_keeping[0]?.bank_account;
        }

        this.form.get('amount')?.setValue(this.totalPrimary);
      }
      this.setLoading(false);
    });
  }

  /**
   * Lấy chi tiết đơn hàng bình thường
   */
  getDetailOrderNormal() {
    this.setLoading(true);
    this.paymentService.getDetailOrders(this.idOrder).subscribe(response => {
      if (response.status) {
        this.dataOrder = response.data;

        //Tính tổng số tiền thanh toán cho đơn hàng
        this.dataOrder.products.map((item: any) => {
          this.totalTemp = item?.pivot?.quantity * item?.pivot?.price;
          this.totalPrimary = this.totalTemp;
        });

        //Kiểm tra đơn hàng đã thanh toán hay chưa thanh toán
        if (this.dataOrder.book_keeping.length > 0) {
          this.isShowPayment = false;
          this.isShowPaymentInfo = true;
          this.book_keeping = this.dataOrder.book_keeping[0]?.bank_account;
        } else {
          this.isShowPayment = true;
        }

        this.form.get('amount')?.setValue(this.totalPrimary);
      }
      this.setLoading(false);
    });
  }

  /**
   * Chuyển đổi số thành chữ
   * @param number 
   * @returns 
   */
  convertToVietnameseCurrency(number: number): string {
    if (isNaN(number)) return '';

    const units = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
    const numWords = ['', 'nghìn', 'triệu', 'tỷ'];

    function convertLessThanOneThousand(num: number): string {
      let word = '';
      const hundred = Math.floor(num / 100);
      const remainder = num % 100;
      if (hundred > 0) {
        word += units[hundred] + ' trăm ';
      }
      if (remainder > 0) {
        if (remainder < 10) {
          word += units[remainder];
        } else if (remainder < 20) {
          word += 'mười ' + units[remainder % 10];
        } else {
          const tens = Math.floor(remainder / 10);
          const ones = remainder % 10;
          word += units[tens] + ' mươi ' + units[ones];
        }
      }
      return word;
    }

    let words = '';
    let numAbs = Math.abs(number);

    for (let i = 0; i < numWords.length; i++) {
      const chunk = numAbs % 1000;
      if (chunk !== 0) {
        words = convertLessThanOneThousand(chunk) + ' ' + numWords[i] + ' ' + words;
      }
      numAbs = Math.floor(numAbs / 1000);
    }

    if (words === '') {
      words = 'không';
    }

    if (number < 0) {
      words = 'âm ' + words;
    }

    return words.trim() + ' đồng';
  }

  /**
    * Hàm chuyển đổi trạng thái sang tiếng việt
    * @param status 
    * @returns 
    */
  convertToVietnameseStatus(status: string, action: string): any {

    let data = {
      text: '',
      color: '',
    }

    if (action === 'order') {
      if (status === 'pending') {
        data = {
          text: 'Chờ xử lý',
          color: 'color: #1519f1'
        }
        return data;
      }
      else if (status === 'done') {
        data = {
          text: 'Hoàn thành',
          color: 'color: #18864b'
        }
        return data;
      }
      else {
        data = {
          text: 'Huỷ',
          color: 'color: #c83232'
        }
        return data;
      }
    } else {
      if (status === 'pending') {
        data = {
          text: 'Chờ thanh toán',
          color: 'color: #1519f1'
        }
        return data;
      }
      else if (status === 'done') {
        data = {
          text: 'Đã thanh toán',
          color: 'color: #18864b'
        }
        return data;
      }
      else {
        data = {
          text: 'Huỷ',
          color: 'color: #c83232'
        }
        return data;
      }
    }

  }

  /**
   * Định dạng ngày giờ theo HH:mm dd/MM/yyyy
   * @param dateString 
   * @returns 
   */
  formattedDate(dateString: string): string {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      const formattedTime = this.datePipe.transform(date, 'HH:mm');
      const formattedDate = this.datePipe.transform(date, 'dd/MM/yyyy');
      if (formattedTime && formattedDate) {
        return `${formattedTime} ${formattedDate}`;
      } else {
        return 'Invalid Date';
      }
    } else {
      return 'Invalid Date';
    }
  }


  /**
   * Phân cách phần nghìn của số
   * @param number 
   * @returns 
   */
  formatNumberWithCommas(number: number): string {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  /**
   * Gán dữ liệu vào form khi chọn phương thức thanh toán
   * @param event 
   */
  onPaymentMethodSelect(event: any) {
    if (event && event.value) {
      const selectedPaymentMethod = event.value;
      this.getPaymentAccount(selectedPaymentMethod.id);
      this.form.get('payment_method_id')?.setValue(selectedPaymentMethod.id);
      this.isShowPaymentAccount = true;
    }
  }

  /**
   * Chọn tài khoản thanh toán
   * @param event 
   */
  onPaymentAccountSelect(event: any) {
    if (event && event.value) {
      const selectedPaymentAccount = event.value;
      this.form.get('selectedPaymentAccount')?.patchValue(selectedPaymentAccount);
      this.paymentInfo = this.form.get('selectedPaymentAccount')?.value;
      this.form.get('bank_account_id')?.setValue(this.paymentInfo.id);
      this.isShowPaymentInfo = true;

    }
  }

  /**
   * Lấy danh sách phương thức thanh toán
   */
  async getAllPaymentMethod() {
    this.paymentService.getAllPaymentMethod().subscribe(res => {
      if (res.data) {
        const response: any = res.data;
        this.nodePaymentMethod = response.map((node: any) => ({
          id: node.id,
          name: node.name,
        }));
      }
    });
  }

  /**
   * Lấy tài khoản thanh toán dự trên id phương thức thanh toán
   * @param idPaymentMethod 
   */
  async getPaymentAccount(idPaymentMethod: number) {
    this.paymentService.getPaymentAccount(idPaymentMethod).subscribe(res => {
      if (res.status) {
        const response: any = res.data;
        this.nodePaymentAccount = response.map((node: any) => ({
          id: node.id,
          bank: node.bank?.name,
          beneficiary: node.beneficiary,
          beneficiary_account: node.beneficiary_account,
          name: `${node.beneficiary_account} - ${node.bank?.name}`,
        }));

        if (this.nodePaymentAccount.length > 0) {
          this.form.get('selectedPaymentAccount')?.patchValue(this.nodePaymentAccount[0]);
          this.paymentInfo = this.form.get('selectedPaymentAccount')?.value;
          this.form.get('bank_account_id')?.setValue(this.paymentInfo.id);
          this.isShowPaymentInfo = true;
        } else {
          this.isShowPaymentInfo = false;
        }
      }
    });
  }

  /**
   * Nhấn xác nhận thanh toán
   */
  onSubmit() {
    this.setLoading(true);
    const valueForm = this.form.value;
    this.form.removeControl('selectedPaymentAccount');
    this.form.removeControl('selectedPaymentMethod');

    this.paymentService.confirmPayment(valueForm).subscribe(res => {
      if (res.status) {
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message });
        this.isShowSubmitConfirmPayment = true;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: res.message });
      }
      this.setLoading(false);
    })
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
