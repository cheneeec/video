import {Injectable, OnDestroy} from '@angular/core';
import { Observable, Subject, timer} from "rxjs";
import {filter, map, scan, take, takeUntil, takeWhile} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ProgressBarValueService implements OnDestroy {

    private _progressBarValueSubject: Subject<number> = new Subject<number>();
    private _progressBarValue$: Observable<number> = this._progressBarValueSubject.asObservable();

    constructor() {
    }


    loading(): void {
        timer(0, 120)
            .pipe(
                scan((p, c) => c + 5),
                takeWhile(v => v < 98),
                takeUntil(this._progressBarValue$.pipe(
                    filter(v => v == null)
                ))
            ).subscribe(v => this._progressBarValueSubject.next(v));

    }

    loadCompleted(): void {
        this._progressBarValueSubject.next(100);
        this._progressBarValueSubject.next(null);
    }

    get progressBarValue() {
        return this._progressBarValue$;
    }

    ngOnDestroy(): void {
        this._progressBarValueSubject.unsubscribe();
    }
}
