import { ICalendar } from './calendar.model';
export declare class CalendarService {
    constructor();
    getNextMonth(date: Date, selectedRange: {
        start?: Date;
        end?: Date;
    }, min?: Date): ICalendar;
    getPreviousMonth(date: Date, selectedRange: {
        start?: Date;
        end?: Date;
    }, min?: Date): ICalendar;
    getMonth(date: Date, selectedRange: {
        start?: Date;
        end?: Date;
    }, min?: Date): ICalendar;
    getPreviousMonths(date: Date, currentDate: Date, min?: Date): ICalendar;
    getNextMonths(date: Date, currentDate: Date, min?: Date): ICalendar;
    getMonths(date: Date, currentDate: Date, min?: Date): ICalendar;
    getPreviousYears(date: Date, currentDate: Date, min?: Date): ICalendar;
    getNextYears(date: Date, currentDate: Date, min?: Date): ICalendar;
    getYears(date: Date, currentDate: Date, min?: Date): ICalendar;
}
