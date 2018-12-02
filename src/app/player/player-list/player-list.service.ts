import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Episode} from "../../model/episode.model";
import {PageRequestUtils, SimplePageRequest} from "../../model/simple-page.request";

@Injectable({
    providedIn: 'root'
})
export class PlayerListService {

    constructor(private http: HttpClient) {
    }


    findEpisodes(url: string, otherProperties?: { [key: string]: string }, page?: SimplePageRequest): Observable<Episode[]> {
        //获取分页参数
        const httpParams = PageRequestUtils.convertToObject(page);
        //获取url
        httpParams['url'] = url;
        //获取其他属性
        otherProperties = otherProperties || {};
        for (let key in otherProperties) {
            if (otherProperties[key]) {
                httpParams[key] = otherProperties[key];
            }
        }

        return this.http.get<Episode[]>('/v1/api/episode/query', {
            params: new HttpParams({fromObject: httpParams})
        });
    }


}
