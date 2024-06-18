// error.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppStorage } from './storage';

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {
    storage: AppStorage = new AppStorage();

    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    const user = this.storage.getItem('user', null);
                    if (!user) {
                        this.router.navigateByUrl('/login');
                    }

                    if (error.status === 401) {
                        this.storage.removeItem('user');
                        this.storage.removeItem('access_token');
                        setTimeout(() => {
                            window.location.reload();
                        }, 500);
                    }
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Error: ${error.error.message}`;
                    } else {
                        // server-side error
                        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                    }
                    return throwError(errorMessage);
                })
            );
    }
}