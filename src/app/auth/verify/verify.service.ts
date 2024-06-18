import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ParamVerifyEmail } from './verify.model';

@Injectable({
    providedIn: 'root'
})

export class VerifyService {
    apiUrl: string = environment.apiUrl;

    constructor(
        private httpClient: HttpClient,
    ) {

    }

    verifyEmail(params: ParamVerifyEmail): Observable<any> {
        return this.httpClient.post<any>(this.apiUrl + '/customers/verify-email', params);
    }
}