import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EMPTY, Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PlayerService {

    constructor(private http: HttpClient) {
    }

    parsePlayValue(value: string): Observable<string[]> {
        if(!value){
            return EMPTY;
        }
        // return this.http.post<string[]>('/v1/api/value', null, {
        //     params: {playValue: value}
        // })
       return of(['../../assets/02.mp4']);
    }
}
