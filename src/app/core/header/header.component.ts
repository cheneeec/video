import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    @Output() toggle = new EventEmitter<void>();

   readonly isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));


    constructor(private breakpointObserver: BreakpointObserver,
                private router: Router) {
    }

    ngOnInit() {
    }


    submitSearchForm($event): void {
        this.router.navigate(['/results'], {
            queryParams: {
                q: $event
            }
        })
    }
}
