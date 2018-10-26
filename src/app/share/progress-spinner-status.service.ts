import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProgressSpinnerStatusService implements OnDestroy {

    private _progressSpinnerStatusSubject: Subject<boolean> = new BehaviorSubject<boolean>(false);
    private _progressSpinnerStatus$: Observable<boolean> = this._progressSpinnerStatusSubject.asObservable();

    constructor() {
    }

    loading(): void {
        this._progressSpinnerStatusSubject.next(true);
    }


    loadCompleted(): void {

        this._progressSpinnerStatusSubject.next(false);
    }

    get progressSpinnerStatus() {
        return this._progressSpinnerStatus$;
    }

    ngOnDestroy(): void {
        this._progressSpinnerStatusSubject.unsubscribe();
    }

}
