import { AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
export declare class TooltipComponent implements AfterViewInit {
    private cdr;
    text?: string;
    id?: string;
    isAction: boolean;
    height: number;
    width: number;
    left: number;
    top: number;
    offset: number;
    tooltipText?: ElementRef;
    constructor(cdr: ChangeDetectorRef);
    ngAfterViewInit(): void;
    show(): void;
    hide(): void;
    private getLeftPosition;
    private getTopPosition;
    private adjustPosition;
}
