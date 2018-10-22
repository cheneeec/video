import {Injectable} from '@angular/core';
import {Subject, timer} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProgressBarValueService {

    private progressBarSubject$ = new Subject<number>();

    private timers: any[] = [];

    private _loading: boolean;

    constructor() {
    }

    next(value?: number): void {
        this.progressBarSubject$.next(value);
    }

    loading(): void {
       /* let count = 1;
        let add = false;
        const timer = setInterval(() => {
            if (!this._loading) {
                this.clearTimer(timer);
            }
            this._loading = true;
            //添加timer
            if (!add) {
                this.timers.push(timer);
                add = true;
            }
            if (count < 10) {
                this.next(10 * count);
                count++;
            } else {
                this.clearTimer(timer);
            }

        }, 200);*/
    }

    private clearTimer(timer) {
        //删除
        window.clearInterval(timer);
        this.timers.slice(this.timers.indexOf(timer), 1);
    }

    loadCompleted(): void {
        this._loading = false;
        this.timers.forEach(v => this.clearTimer(v));
        this.next(100);

    }

    get progressBarSubject() {
        return this.progressBarSubject$;
    }
}
