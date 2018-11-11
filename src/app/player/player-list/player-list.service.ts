import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Episode} from "../../domain/episode.model";
import {PageRequestUtils, SimplePageRequest} from "../../domain/SimplePageRequest";

@Injectable({
    providedIn: 'root'
})
export class PlayerListService {

    constructor(private http: HttpClient) {
    }


    findEpisodes(url: string, page?: SimplePageRequest): Observable<Episode[]> {
        const httpParams = PageRequestUtils.convertToObject(page);
        httpParams['url'] = url;
        return this.http.get<Episode[]>('/v1/api/episode/query', {
            params: new HttpParams({fromObject: httpParams})
        });
    }


}
