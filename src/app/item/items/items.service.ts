import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponsePage} from "../../domain/response-page.model";
import {PageRequestUtils, SimplePageRequest} from "../../domain/simple-page.request";
import {Video} from "../../domain/video.model";

@Injectable({
    providedIn: 'root'
})
export class ItemsService {

    constructor(private http: HttpClient) {
    }

    findAll(category: string, page: SimplePageRequest): Observable<ResponsePage<Video>> {
        return this.http.get<ResponsePage<Video>>(`v1/api/video/category/${category}`, {
            params: PageRequestUtils.convertToHttpParams(page)
        });
    }




}
