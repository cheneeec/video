import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
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

}
