import {HttpParams} from "@angular/common/http";

export declare interface SimplePageRequest {
    page?: number;
    size?: number;
}

export abstract class PageRequestUtils {

    static convertHttpParams(page: SimplePageRequest): HttpParams {
        let params = {};
        params['page'] = (page.page || 0) + '';
        params['size'] = (page.size || 16) + '';
        return new HttpParams({
            fromObject: params
        })
    }
}