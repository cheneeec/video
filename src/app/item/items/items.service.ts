import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponsePage} from "../../domain/response-page.model";
import {PageRequestUtils, SimplePageRequest} from "../../domain/SimplePageRequest";

@Injectable({
    providedIn: 'root'
})
export class ItemsService {

    constructor(private http: HttpClient) {
    }

    findAll(category:string,page: SimplePageRequest): Observable<ResponsePage<object>> {
        return this.http.get<ResponsePage<object>>(`v1/api/video/category/${category}`, {
            params: PageRequestUtils.convertToHttpParams(page)
        });
    }


}
