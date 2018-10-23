import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {fromEvent, Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map} from "rxjs/operators";
import {MatIconRegistry} from "@angular/material";
import {ProgressBarValueService} from "./share/progress-bar-value.service";
import {CdkScrollable, ScrollDispatcher} from "@angular/cdk/overlay";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    progressBarValue$: Observable<number>= this.progressBarService.progressBarValue;

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches)
        );


    constructor(private breakpointObserver: BreakpointObserver,
                private matIconRegistry: MatIconRegistry,
                private progressBarService: ProgressBarValueService,

                ) {

        this.matIconRegistry.registerFontClassAlias('fontawesome', 'fa');

    }



    ngOnInit(): void {
        setTimeout(()=>{
            console.log(document.getElementsByTagName('body'));
        },2000);
        console.log(document.getElementsByTagName('body'));
        fromEvent(document.getElementsByTagName('body')[0],'scroll')
            .subscribe(v=>console.log(v))

    }


}
