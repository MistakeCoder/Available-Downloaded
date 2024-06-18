import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ParamResetPassword } from './forgot-password.model';

@Injectable({
    providedIn: 'root'
})

export class ForgotPasswordService {
    apiUrl: string = environment.apiUrl;

    constructor(
        private httpClient: HttpClient
    ) {

    }
    /**
     * Quên mật khẩuá
     * @param params 
     * @returns 
     */
    resetPassword(params: ParamResetPassword): Observable<any> {
        return this.httpClient.post<any>(this.apiUrl + '/customers/reset-password', params);
    }
}