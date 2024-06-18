import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GetAllPaymentMethod, GetDetailOrders, GetPaymentAccount, ParamConfirmPayment } from './payment.model';

@Injectable({
    providedIn: 'root'
})

export class PaymentService {
    apiUrl: string = environment.apiUrl;

    constructor(
        private httpClient: HttpClient
    ) {

    }

    /**
     * Lấy chi tiết đơn hàng
     * @param id 
     * @returns 
     */
    getDetailOrders(id: number): Observable<GetDetailOrders> {
        return this.httpClient.get<GetDetailOrders>(this.apiUrl + `/orders/${id}`);
    }

    /**
    * Lấy chi tiết đơn hàng giới thiệu
    * @param id 
    * @returns 
    */
    getDetailOrdersReferral(id: number): Observable<GetDetailOrders> {
        return this.httpClient.get<GetDetailOrders>(this.apiUrl + `/orders/${id}/referral`);
    }

    /**
     * Lấy danh sách phương thức thanh toán
     * @returns 
     */
    getAllPaymentMethod(): Observable<GetAllPaymentMethod> {
        return this.httpClient.get<GetAllPaymentMethod>(this.apiUrl + '/payment-methods/get-all');
    }

    /**
     * Lấy danh sách tài khoản thanh toán dựa theo id phương thức thanh toán
     * @param id 
     * @returns 
     */
    getPaymentAccount(id: number): Observable<GetPaymentAccount> {
        return this.httpClient.get<GetPaymentAccount>(this.apiUrl + `/bank-accounts/${id}/payment-method`);
    }

    /**
     * Xác nhận thanh toán
     * @param params 
     * @returns 
     */
    confirmPayment(params: ParamConfirmPayment): Observable<any> {
        return this.httpClient.post<any>(this.apiUrl + '/orders/payment', params);
    }

}