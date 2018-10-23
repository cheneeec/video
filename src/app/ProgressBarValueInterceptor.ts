import {HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {ProgressBarValueService} from "./share/progress-bar-value.service";

@Injectable()
export class ProgressBarValueInterceptor implements HttpInterceptor {

    private progressBarValueRequest = PROGRESS_BAR_REQUEST_VALUE;

    constructor(private progressBarValueService: ProgressBarValueService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //判断URL
        let showProgressBar = this.judgeRequestMethod(request) &&
            this.judgeRequestUrl(request) &&
            this.judgeRequestParams(request);


        if (!showProgressBar) {
            return next.handle(request);
        }

        this.progressBarValueService.loading();
        return next.handle(request).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    this.progressBarValueService.loadCompleted();
                }
            })
        );
    }

    private judgeRequestMethod(request: HttpRequest<any>) {
        return this.progressBarValueRequest.method.includes(request.method);
    }

    private judgeRequestUrl(request: HttpRequest<any>) {
        return (this.progressBarValueRequest.urlsPattern
            .map(urlPattern => new RegExp(urlPattern))
            .filter(p => p.test(request.url))
            .length > 0);
    }

    private judgeRequestParams(request: HttpRequest<any>) {
        let params = false;
        for (let paramsKey in this.progressBarValueRequest.params) {
            if (request.params.has(paramsKey)) {
                params = request.params.get(paramsKey) == this.progressBarValueRequest.params[paramsKey];
            }
        }
        return params;
    }
}

export const PROGRESS_BAR_REQUEST_VALUE: progressBarRequest = {
    method: ['GET'],
    urlsPattern: ['v1/api/video/*'],
    params: {
        page: 0
    }
};

declare type progressBarRequest = {
    method: string[],
    urlsPattern: string[],
    params: object
}