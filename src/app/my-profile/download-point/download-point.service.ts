import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class DownloadPointService {
    apiUrl: string = environment.apiUrl;

    constructor(
        private httpClient: HttpClient
    ) {

    }

    /**
     * Lấy thông tin lượt tải
     * @param params 
     * @param page 
     * @param itemsPerPage 
     * @returns 
     */
    getDownloadPoint(params: any, page: number = 1, itemsPerPage: number = 20) {
        const queryParams: any = this.objectToQueryString({ page, itemsPerPage });
        return this.httpClient.post(this.getPathWithQueryParams(this.apiUrl + '/download-points/auth', queryParams), params, queryParams);
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