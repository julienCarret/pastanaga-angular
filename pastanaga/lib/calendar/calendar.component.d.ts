import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { CalendarService } from './calendar.service';
import { Subject } from 'rxjs';
import { CalendarDate, CalendarView, ICalendar } from './calendar.model';
export declare class CalendarComponent implements OnInit, OnDestroy {
    private service;
    set rangeStart(value: any);
    _isRangeStart: boolean;
    set rangeEnd(value: any);
    _isRangeEnd: boolean;
    set min(value: Date);
    _min?: Date;
    set selection(value: {
        start?: Date;
        end?: Date;
    } | Date);
    _selection: {
        start?: Date;
        end?: Date;
    };
    set noFuture(value: any);
    _noFuture: boolean;
    select: EventEmitter<Date | null>;
    terminator: Subject<void>;
    calendar: ICalendar;
    calendarViews: typeof CalendarView;
    view: CalendarView;
    legend: string;
    refDate: Date;
    constructor(service: CalendarService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    goToPrevious(): void;
    goToNext(): void;
    changeView(newView: CalendarView): void;
    selectDate(selection: CalendarDate): void;
    noEnd(): void;
}
