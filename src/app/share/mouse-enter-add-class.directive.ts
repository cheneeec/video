import {Directive, ElementRef, HostListener, Input} from '@angular/core';


@Directive({
    selector: '[appMouseEnterAddClass]'
})
export class MouseEnterAddClass {

    classNames: string[];


    @Input('appMouseEnterAddClass')
    set _classNames(classNames: string) {
        console.log(classNames);
        this.classNames = classNames.replace('[', '')
            .replace(']', '')
            .replace(/'/g, '')
            .split(',');


    }

    constructor(private elementRef: ElementRef) {

    }

    /**
     * 当鼠标进入时
     */
    @HostListener("mouseenter") onMouseEnter() {
        console.log(this.classNames);
        console.log(typeof this.classNames);
        this.classNames
            .forEach(className => this.elementRef.nativeElement.classList.add(className));

    }


    @HostListener("mouseleave") onMouseLeave() {
        this.classNames
            .forEach(className => this.elementRef.nativeElement.classList.remove(className));
    }
}
