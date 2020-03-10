import { AfterViewInit, ElementRef, EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, Validator } from '@angular/forms';
export declare class SelectComponent implements ControlValueAccessor, OnInit, AfterViewInit, Validator {
    private element;
    id?: string;
    name?: string;
    label?: string;
    value: any;
    placeholder?: string;
    help?: string;
    errorHelp?: string;
    errorMessage?: string;
    disabled: boolean;
    required: boolean;
    isLabelHidden: boolean;
    isLessen: boolean;
    onSelection: EventEmitter<any>;
    valueChange: EventEmitter<any>;
    helpId: string;
    onChange?: Function;
    onTouched?: Function;
    hasNoSelection: boolean;
    isPlaceHolderSelected: boolean;
    hasError: boolean;
    constructor(element: ElementRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    writeValue(value: any): void;
    registerOnTouched(handler: any): void;
    registerOnChange(handler: any): void;
    change(value: any): void;
    setDisabledState(disabled: boolean): void;
    validate(control: FormControl): {
        required: {
            valid: boolean;
        };
    } | null;
}
