import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class DetailProductService {
    apiUrl: string = environment.apiUrl;

    constructor(
        private httpClient: HttpClient
    ) {

    }

    getDetailProduct(id: number): Observable<any> {
        return this.httpClient.get<any>(this.apiUrl + `/products/${id}`);
    }
}