import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'playTime'
})
export class PlayTimePipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (!value) {
            return value;
        }
        let result = '';
        const split = args || ':';
        //小时
        const hour = Math.floor(value / 3600);
        //剩余
        value = value - (hour * 3600);
        //分钟
        const minute = Math.floor(value / 60);
        //剩余 秒
        const seconds = value - minute * 60;
        if (hour) {
            if (hour < 10) {
                result += '0';
            }
            result += hour + split;
        }
        if (minute) {
            if (minute < 10) {
                result += '0';
            }
            result += minute + split;
        }
        if (seconds) {
            if (seconds < 10) {
                result += '0';
            }
            result += seconds;
        } else
            result += '00';

        return result;
    }

}
