import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FetchUsersLogin, LoginModel, ParamLoginModel } from './login.model';

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    apiUrl: string = environment.apiUrl;

    constructor(private httpClient: HttpClient) {

    }

    login(params: ParamLoginModel): Observable<LoginModel> {
        return this.httpClient.post<LoginModel>(this.apiUrl + '/customers/login', params);
    }

    fetchUsersLogin(): Observable<FetchUsersLogin> {
        return this.httpClient.get<FetchUsersLogin>(this.apiUrl + '/customers/auth');
    }

    getAvailablePromotion(): Observable<any> {
        return this.httpClient.get<any>(this.apiUrl + '/promotions/available');
    }
}