import {HttpParams} from "@angular/common/http";

export declare interface SimplePageRequest {
    page?: number;
    size?: number;
}

export abstract class PageRequestUtils {

    static convertToHttpParams(page: SimplePageRequest): HttpParams {
        return new HttpParams({
            fromObject: PageRequestUtils.convertToObject(page)
        })
    }

    static convertToObject(page: SimplePageRequest): { page?: string, size?: string } {
        if (!page) {
            return {};
        }

        let params = {};
        params['page'] = (page.page || 0) + '';
        params['size'] = (page.size || 16) + '';
        return params;
    }
}