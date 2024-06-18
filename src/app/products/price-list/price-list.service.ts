import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GetAllProducts } from './price-list.model';

@Injectable({
    providedIn: 'root'
})

export class PriceListService {
    apiUrl: string = environment.apiUrl;

    constructor(private httpClient: HttpClient) {

    }

    getAllProducts(): Observable<GetAllProducts> {
        return this.httpClient.get<GetAllProducts>(this.apiUrl + '/products');
    }
}