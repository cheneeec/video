import {HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {ProgressBarValueService} from "./share/progress-bar-value.service";

@Injectable()
export class ProgressVisibleInterceptor implements HttpInterceptor {


    constructor(private progressBarValueService: ProgressBarValueService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //判断进度导航条
        const showProgressBar =
            ProgressVisibleInterceptor.judgeRequestMethod(PROGRESS_BAR_RULE, request) &&
            ProgressVisibleInterceptor.judgeRequestUrl(PROGRESS_BAR_RULE, request) &&
            ProgressVisibleInterceptor.judgeRequestParams(PROGRESS_BAR_RULE, request);

        //判断进度Spinner
        const showProgressSpinner =
            ProgressVisibleInterceptor.judgeRequestMethod(PROGRESS_SPINNER_RULE, request) &&
            ProgressVisibleInterceptor.judgeRequestUrl(PROGRESS_SPINNER_RULE, request) &&
            ProgressVisibleInterceptor.judgeRequestParams(PROGRESS_SPINNER_RULE, request);


        if (!(showProgressBar || showProgressSpinner)) {
            return next.handle(request);
        } else {
            if (showProgressBar) {
                this.progressBarValueService.loading();
            }


            return next.handle(request).pipe(
                tap(event => {
                    if (event instanceof HttpResponse) {
                        if (showProgressBar) {
                            this.progressBarValueService.loadCompleted();
                        }

                    }
                })
            );
        }


    }


    private static judgeRequestMethod(rule: progressJudgeRule, request: HttpRequest<any>): boolean {
        return rule.method.includes(request.method);
    }

    private static judgeRequestUrl(rule: progressJudgeRule, request: HttpRequest<any>): boolean {
        return rule.urlsPattern
            .map(urlPattern => new RegExp(urlPattern))
            .filter(p => p.test(request.url))
            .length > 0;
    }

    private static judgeRequestParams(rule: progressJudgeRule, request: HttpRequest<any>): boolean {
        let params = false;
        for (let paramsKey in rule.params) {
            if (request.params.has(paramsKey)) {
                params = new RegExp(rule.params[paramsKey]).test(request.params.get(paramsKey));
            }
        }
        return params;
    }


}

/**
 * 请求进度导航栏
 */
export const PROGRESS_BAR_RULE: progressJudgeRule = {
    method: ['GET'],
    urlsPattern: ['v1/api/video/*'],
    params: {
        page: '0'  //等于0
    }
};

export const PROGRESS_SPINNER_RULE: progressJudgeRule = {
    method: ['GET'],
    urlsPattern: ['v1/api/video/*'],
    params: {
        page: '^[1-9]\\d*(\\.\\d+)?$' //非0
    }
};

declare type progressJudgeRule = {
    method: string[],
    urlsPattern: string[],
    params: object
}