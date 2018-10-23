import {Injectable} from '@angular/core';
import {interval, Observable, Subject, timer} from "rxjs";
import {delayWhen, filter, map, switchMap, take, takeUntil, timeInterval} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ProgressBarValueService {

    private _progressBarValueSubject: Subject<number> = new Subject<number>();
    private _progressBarValue$: Observable<number> = this._progressBarValueSubject.asObservable();

    constructor() {}


    loading(): void {
        interval(100).pipe(
            take(10),
            map(v => 10 * v),
            takeUntil(this._progressBarValue$.pipe(
                filter(v => v == null)
            ))
        ).subscribe(v => this._progressBarValueSubject.next(v))
    }

    loadCompleted(): void {
        this._progressBarValueSubject.next(100);
        this._progressBarValueSubject.next(null);
    }

    get progressBarValue() {
        return this._progressBarValue$;
    }
}
