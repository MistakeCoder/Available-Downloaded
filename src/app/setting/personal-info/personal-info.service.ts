import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FetchUsersLogin, ParamUpdatePersonalInfo } from './personal-info.model';

@Injectable({
    providedIn: 'root'
})

export class PersonalInfoService {
    apiUrl: string = environment.apiUrl;

    constructor(private httpClient: HttpClient) {

    }

    updatePersonalInfo(params: ParamUpdatePersonalInfo): Observable<any> {
        return this.httpClient.put<any>(this.apiUrl + '/customers/auth', params);
    }

    getBaseUrl(): Observable<any> {
        return this.httpClient.get<any>(this.apiUrl + '/base-url');
    }

    fetchUsersLogin(): Observable<FetchUsersLogin> {
        return this.httpClient.get<FetchUsersLogin>(this.apiUrl + '/customers/auth');
    }
}