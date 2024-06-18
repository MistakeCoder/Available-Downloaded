import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ParamChangePassword } from './change-password.model';

@Injectable({
    providedIn: 'root'
})

export class ChangePasswordService {
    apiUrl: string = environment.apiUrl;

    constructor(
        private httpClient: HttpClient
    ) { }

    /**
     * Thay đổi mật khẩu
     * @param params 
     * @returns 
     */
    changePassword(params: ParamChangePassword): Observable<any> {
        return this.httpClient.post<any>(this.apiUrl + '/customers/change-password', params);
    }
}