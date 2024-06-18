import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ParamRegister } from './register.model';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class RegisterService {
    apiUrl: string = environment.apiUrl;

    constructor(private httpClient: HttpClient) {

    }

    register(params: ParamRegister): Observable<any> {
        return this.httpClient.post<any>(this.apiUrl + '/customers/register', params);
    }
}