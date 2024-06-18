// auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppStorage } from './storage';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    storage: AppStorage = new AppStorage();

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.storage.getItem('access_token'); // Hoặc lấy từ một service
        // Thêm token vào headers nếu nó tồn tại
        if (authToken) {
            const authReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${authToken}`)
            });
            return next.handle(authReq);
        }
        return next.handle(req);
    }
}