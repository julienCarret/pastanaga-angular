import { AfterViewInit, ElementRef, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { BadgeModel } from './badge.model';
import { Avatar } from '../avatar/avatar.model';
export declare class BadgeComponent implements AfterViewInit {
    elementRef: ElementRef;
    private changeDetector;
    id: string;
    set color(value: any);
    set hexaColor(value: any);
    isAccented: boolean;
    isSmall: boolean;
    isError: boolean;
    canBeRemoved: boolean;
    maxWidth?: string;
    set value(val: any);
    of?: number;
    buttons?: BadgeModel[];
    set avatar(value: Avatar);
    _avatar?: Avatar;
    remove: EventEmitter<MouseEvent>;
    render: EventEmitter<ElementRef>;
    colorClass: string;
    colorStyle?: {};
    text: string;
    _value?: number;
    textContent?: ElementRef;
    constructor(elementRef: ElementRef, changeDetector: ChangeDetectorRef);
    ngAfterViewInit(): void;
    /**
     * Solution to calc luminance is coming from
     * https://stackoverflow.com/a/1754281/2116063
     * and https://stackoverflow.com/a/12043228/2116063 (for javascript adaptation)
     */
    private calcLuminance;
}
