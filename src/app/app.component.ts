import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map} from "rxjs/operators";
import {MatIconRegistry} from "@angular/material";
import {ProgressBarValueService} from "./share/progress-bar-value.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    progressBarValue$: Observable<number>;

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches)
        );


    constructor(private breakpointObserver: BreakpointObserver,
                private matIconRegistry: MatIconRegistry,
                private progressBarService: ProgressBarValueService) {

        this.matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
        this.progressBarValue$= this.progressBarService.progressBarSubject;
    }


}
