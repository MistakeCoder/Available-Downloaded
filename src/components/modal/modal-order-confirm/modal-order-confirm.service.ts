import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ParamsOrderConfirm } from './modal-order-confirm.model';

@Injectable({
    providedIn: 'root'
})

export class ModalOrderConfirmService {
    apiUrl: string = environment.apiUrl;

    constructor(
        private httpClient: HttpClient
    ) { }

    orderConfirm(params: ParamsOrderConfirm): Observable<any> {
        return this.httpClient.post<any>(this.apiUrl + '/orders', params);
    }

    getDetailProduct(id: number): Observable<any> {
        return this.httpClient.get<any>(this.apiUrl + `/orders/${id}`);
    }
}