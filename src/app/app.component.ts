import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, tap} from "rxjs/operators";
import {MatIconRegistry} from "@angular/material";
import {ProgressBarValueService} from "./share/progress-bar-value.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    progressBarValue$: Observable<number> = this.progressBarService.progressBarValue;
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));
    sidenavOverMode$: Observable<boolean> = this.activatedRoute.data.pipe(map(data => data['sidenavOverMode']));
    sidenavClose$: Observable<boolean> = this.activatedRoute.data.pipe(map(data => data['sidenavClose']));

    constructor(private breakpointObserver: BreakpointObserver,
                private matIconRegistry: MatIconRegistry,
                private progressBarService: ProgressBarValueService,
                private activatedRoute: ActivatedRoute) {
        this.matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
    }


    ngOnInit(): void {

    }


}
