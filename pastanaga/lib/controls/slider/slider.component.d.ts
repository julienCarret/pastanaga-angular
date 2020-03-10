import { OnInit, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
export declare class SliderComponent implements OnInit, OnChanges {
    id?: string;
    name?: string;
    min: number;
    max: number;
    step: number;
    help?: string;
    isDisabled: boolean;
    valueChange: EventEmitter<number>;
    helpId: string;
    rangeValue: number;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    get value(): number;
    set value(val: number);
}
