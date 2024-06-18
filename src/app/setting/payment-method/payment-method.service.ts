import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ParamAddPaymentMethod } from './payment-method.model';

@Injectable({
    providedIn: 'root'
})

export class PaymentMethodService {

    apiUrl: string = environment.apiUrl;

    constructor(private httpClient: HttpClient) {

    }


    /**
     * Tìm kiếm ngân hàng
     * @param params 
     * @param page 
     * @param itemsPerPage 
     * @returns 
     */
    filterBanks(params: any, page: number = 1, itemsPerPage: number = 20) {
        const queryParams: any = this.objectToQueryString({ page, itemsPerPage });
        return this.httpClient.post(this.getPathWithQueryParams(this.apiUrl + '/banks/search', params), params, queryParams);
    }

    /**
      * Convert Object to Query String
      * @param params
      */
    private objectToQueryString(params: any): string {
        if (!params) { return ''; }
        return Object.keys(params).map(key => key + '=' + params[key]).join('&');
    }

    getPathWithQueryParams(path: string, queryParams: string): string {
        return queryParams ? path + '?' + queryParams : path;
    }

    /**
     * Thêm phương thức thanh toán
     * @param params 
     * @returns 
     */
    addPaymentMethod(params: ParamAddPaymentMethod): Observable<any> {
        return this.httpClient.post<any>(this.apiUrl + '/customer-accounts', params);
    }

    /**
     * Cập nhật phương thức thanh toán
     * @param id 
     * @param params 
     * @returns 
     */
    updatePaymentMethod(id: number, params: ParamAddPaymentMethod): Observable<any> {
        return this.httpClient.put<any>(this.apiUrl + `/customer-accounts/${id}`, params);
    }

    /**
     * Lấy danh sách tài khoản thanh toán
     * @returns 
     */
    getPaymentMethodList(): Observable<any> {
        return this.httpClient.get<any>(this.apiUrl + '/customer-accounts');
    }

    /**
     * Lấy chi tiết tài khoản thanh toán
     * @param id 
     * @returns 
     */
    getDetailPaymentMethod(id: number): Observable<any> {
        return this.httpClient.get<any>(this.apiUrl + `/customer-accounts/${id}`);
    }

    removePaymentMethod(id: number): Observable<any> {
        return this.httpClient.delete<any>(this.apiUrl + `/customer-accounts/${id}`);
    }

}