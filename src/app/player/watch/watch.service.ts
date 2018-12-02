import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EMPTY, Observable} from "rxjs";
import {Video} from "../../model/video.model";
import {Episode} from "../../model/episode.model";

@Injectable({
    providedIn: 'root'
})
export class WatchService {

    constructor(private http: HttpClient) {
    }


    get(id: string): Observable<Video> {
        return this.http.get<Video>(`/v1/api/video/${id}`);

    }

    parsePlayValue(value: string): Observable<Episode> {
        if(!value){
            return EMPTY;
        }
        return this.http.post<Episode>('/v1/api/video/value', null,{
            params:{playValue:value}
        });
        // return of(['../../assets/03.mp4']);

    }
}
