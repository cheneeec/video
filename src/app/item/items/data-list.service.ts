import {Observable} from "rxjs";
import {ResponsePage} from "../../model/response-page.model";
import {Video} from "../../model/video.model";
import {PageRequestUtils, SimplePageRequest} from "../../model/simple-page.request";
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

export abstract class DataListService {
    abstract findAll( queryParams: { [key: string]: string }, page: SimplePageRequest): Observable<ResponsePage<Video>>
}

@Injectable()
export class ItemListService implements DataListService {

    constructor(private http: HttpClient, private category: string) {
    }


    findAll(queryParams: { [p: string]: string }, page: SimplePageRequest): Observable<ResponsePage<Video>> {
        return this.http.get<ResponsePage<Video>>(`v1/api/video/category/${this.category}`, {
            params: PageRequestUtils.convertToHttpParams(page)
        });
    }

}


@Injectable()
export class ItemSearchService implements DataListService {

    constructor(private http: HttpClient) {

    }

    findAll(queryParams: { [p: string]: string }, page: SimplePageRequest): Observable<ResponsePage<Video>> {

        let HttpRequestParams = PageRequestUtils.convertToObject(page);
        HttpRequestParams['q'] = queryParams['q'];
        return this.http.get<ResponsePage<Video>>(`/v1/api/video/search`, {
            params: new HttpParams({
                fromObject: HttpRequestParams
            })
        })
    }
}

export let dataListServiceFactory = (http: HttpClient, activatedRoute: ActivatedRoute) => {
    const routeData = activatedRoute.routeConfig.data;
    if (routeData) {
        return new ItemListService(http, routeData['category']);
    } else
        return new ItemSearchService(http);

};