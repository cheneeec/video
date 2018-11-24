import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EMPTY, Observable} from "rxjs";
import {Video} from "../../domain/video.model";

@Injectable({
    providedIn: 'root'
})
export class WatchService {

    constructor(private http: HttpClient) {
    }


    get(id: string): Observable<Video> {
        return this.http.get<Video>(`/v1/api/video/${id}`);

    }

    parsePlayValue(value: string): Observable<string[]> {
        if(!value){
            return EMPTY;
        }
        return this.http.post<string[]>('/v1/api/video/value', null,{
            params:{playValue:value}
        });
        // return of(['../../assets/03.mp4']);

    }
}
