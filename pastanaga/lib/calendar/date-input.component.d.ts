import { ChangeDetectorRef, EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PositionStyle } from '../common/utils';
import { TextfieldCommon } from '../textfield/textfield.common';
export declare class DateInputComponent extends TextfieldCommon implements OnInit, OnChanges {
    cdr: ChangeDetectorRef;
    datePlaceholder: string;
    errorMessage: string;
    id: string;
    minDate?: Date;
    selection?: Date;
    set noFuture(value: any);
    _noFuture: boolean;
    set accent(value: any);
    _accent: boolean;
    set isLessen(value: any);
    _isLessen: boolean;
    select: EventEmitter<Date | null>;
    datePicker: any;
    dateInput: string;
    isValidDate: boolean;
    currentDate: Date;
    datePickerPosition: PositionStyle;
    constructor(cdr: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    selectDate(date: Date): void;
    checkTypedDate(date: string): void;
    iconClick($event: MouseEvent): void;
}
