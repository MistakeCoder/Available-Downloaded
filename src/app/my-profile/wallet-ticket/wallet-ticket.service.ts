import { Injectable, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppStorage } from 'src/libs/storage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatePaymentAccounts, ParamChangeStatusWalletTickets, ParamCreate } from './wallet-ticket.model';


@Injectable({
    providedIn: 'root'
})

export class WalletTicketService {
    apiUrl: string = '';
    httpOptions: any = {};
    headers: any = {};
    storage: AppStorage = new AppStorage();

    constructor(
        public injector: Injector,
        private httpClient: HttpClient
    ) {
        this.apiUrl = environment.apiUrl;
    }

    /**
     * Lấy tất cả user
     * @param params 
     * @returns 
     */
    getAllWalletTickets(params: any, page: number = 1, itemsPerPage: number = 10) {
        const queryParams: any = this.objectToQueryString({ page, itemsPerPage });
        return this.httpClient.post(this.getPathWithQueryParams(this.apiUrl + '/wallet-tickets/search', queryParams), params, queryParams);
    }

    filterCustomer(params: any, page: number = 1, itemsPerPage: number = 10) {
        const queryParams: any = this.objectToQueryString({ page, itemsPerPage });
        return this.httpClient.post(this.getPathWithQueryParams(this.apiUrl + '/customers/search', queryParams), params, queryParams);
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
     * Lấy danh sách phương thức thanh toán
     * @param params 
     * @param page 
     * @param itemsPerPage 
     * @returns 
     */
    getAllPaymentMethod(params: null, page: number = 1, itemsPerPage: number = 10) {
        const queryParams: any = this.objectToQueryString({ page, itemsPerPage });
        return this.httpClient.post(this.getPathWithQueryParams(this.apiUrl + '/payment-methods/search', queryParams), params, queryParams);
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
     * Lấy chi tiết phiếu rút điểm
     * @param id 
     * @returns 
     */
    getDetailWalletTickets(id: number): Observable<any> {
        return this.httpClient.get<any>(this.apiUrl + `/wallet-tickets/${id}`);
    }

    /**
     * Cập nhật dữ liệu
     * @param id 
     * @param params 
     * @returns 
     */
    update(id: number, params: null) {
        return this.httpClient.put(this.apiUrl + `/wallet-tickets/${id}`, params);
    }

    /**
     * Tạo dữ liệu
     * @param params 
     * @returns 
     */
    create(params: ParamCreate): Observable<CreatePaymentAccounts> {
        return this.httpClient.post<CreatePaymentAccounts>(this.apiUrl + '/wallet-tickets', params);
    }

    /**
     * Đưa vào thùng rác
     * @param ids 
     * @returns 
     */
    trash(ids: Array<any>) {
        return this.httpClient.put(this.apiUrl + `/wallet-tickets/${ids.join()}/trash/`, {}, this.httpOptions)
    }

    /**
     * Khôi phục dữ liệu từ thùng rác
     * @param ids 
     * @returns 
     */
    restore(ids: Array<any>) {
        return this.httpClient.put(this.apiUrl + `/wallet-tickets/${ids.join()}/restore/`, {}, this.httpOptions);

    }

    /**
     * Xoá vĩnh viễn
     * @param ids 
     * @returns 
     */
    destroy(ids: Array<any>) {
        return this.httpClient.delete(this.apiUrl + '/wallet-tickets/' + ids.join())
    }

    /**
     * Lấy tài khoản khách hàng
     * @param id 
     * @returns 
     */
    getCustomerAccount(): Observable<any> {
        return this.httpClient.get<any>(this.apiUrl + `/customer-accounts/`);
    }

}