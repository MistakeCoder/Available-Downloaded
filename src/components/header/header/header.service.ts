import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FetchUsersLogin } from './header.model';

@Injectable({
    providedIn: 'root'
})

export class HeaderService {
    apiUrl: string = environment.apiUrl;

    constructor(private httpClient: HttpClient) {

    }

    fetchUsersLogin(): Observable<FetchUsersLogin> {
        return this.httpClient.get<FetchUsersLogin>(this.apiUrl + '/customers/auth');
    }

    logout(params: any) {
        return this.httpClient.post(this.apiUrl + '/customers/logout', params);
    }

    getRewardPointBalance(): Observable<any> {
        return this.httpClient.get<any>(this.apiUrl + '/reward-points/balance');
    }

    getHistoryRewardPoint(params: any, page: number = 1, itemsPerPage: number = 5) {
        const queryParams: any = this.objectToQueryString({ page, itemsPerPage });
        return this.httpClient.post(this.getPathWithQueryParams(this.apiUrl + '/reward-points/auth', queryParams), params, queryParams);
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
}