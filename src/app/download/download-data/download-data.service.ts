import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GetDownloadPoint, ParamDownloadResources } from './download-data.model';

@Injectable({
    providedIn: 'root'
})

export class DownloadDataService {
    apiUrl: string = environment.apiUrl;

    constructor(
        private httpClient: HttpClient
    ) {

    }

    /**
     * Lấy số lượng tải
     * @returns 
     */
    getDownloadPoint(): Observable<GetDownloadPoint> {
        return this.httpClient.get<GetDownloadPoint>(this.apiUrl + '/download-points/balance');
    }


    getDownloadSources(): Observable<any> {
        return this.httpClient.get<any>(this.apiUrl + '/download-sources');
    }

    downloadResources(param: ParamDownloadResources): Observable<any> {
        return this.httpClient.post<any>(this.apiUrl + '/download-resources/download', param);
    }


}