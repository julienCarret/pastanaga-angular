export declare enum CalendarView {
    day = "day",
    month = "month",
    year = "year"
}
export interface IHeaderButtons {
    label: string;
    view: CalendarView;
}
export interface ICalendarDate {
    date: Date;
    label: string;
    isFuture: boolean;
    isActive: boolean;
    inInterval?: boolean;
    isDisabled?: boolean;
    firstOfInterval?: boolean;
    lastOfInterval?: boolean;
}
export declare class CalendarDate implements ICalendarDate {
    date: Date;
    label: string;
    isFuture: boolean;
    isActive: boolean;
    isDisabled: boolean;
    inInterval: boolean;
    firstOfInterval: boolean;
    lastOfInterval: boolean;
    constructor(data: ICalendarDate);
}
export interface ICalendar {
    dateRef: Date;
    dates: CalendarDate[];
    headerButtons: IHeaderButtons[];
}
