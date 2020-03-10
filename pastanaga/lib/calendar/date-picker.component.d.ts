import { ChangeDetectorRef, ElementRef, EventEmitter, Renderer2 } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { PopupService } from '../popup/popup.service';
export declare class DatePickerComponent extends PopupComponent {
    popupService: PopupService;
    renderer: Renderer2;
    element: ElementRef;
    cdr: ChangeDetectorRef;
    set rangeStart(value: any);
    _rangeStart: boolean;
    set rangeEnd(value: any);
    _rangeEnd: boolean;
    set dontCloseOnSelection(value: any);
    _dontCloseOnSelection: boolean;
    min?: Date;
    selection?: {
        start?: Date;
        end?: Date;
    } | Date;
    set noFuture(value: any);
    _noFuture: boolean;
    select: EventEmitter<Date | null>;
    constructor(popupService: PopupService, renderer: Renderer2, element: ElementRef, cdr: ChangeDetectorRef);
    onSelection(date: Date | null): void;
    onOutsideClick(event: any): void;
    private isNodeFromCalendar;
}
