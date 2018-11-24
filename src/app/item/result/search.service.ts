import { Injectable } from '@angular/core';
import {PageRequestUtils, SimplePageRequest} from "../../domain/simple-page.request";
import {Observable} from "rxjs";
import {ResponsePage} from "../../domain/response-page.model";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http:HttpClient) { }

    search(keyword: string, page?: SimplePageRequest): Observable<ResponsePage<object>> {
        let httpPrams = PageRequestUtils.convertToObject(page);
        httpPrams['q'] = keyword;
        return this.http.get<ResponsePage<object>>(`/v1/api/video/search`, {
            params: new HttpParams({
                fromObject: httpPrams
            })
        })
    }
}
