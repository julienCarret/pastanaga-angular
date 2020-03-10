import { AfterViewInit, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit } from '@angular/core';
export declare class DoubleSliderComponent implements AfterViewInit, OnInit, OnChanges, OnDestroy {
    id?: string;
    help?: string;
    minRange: number;
    maxRange: number;
    step: number;
    values: number[];
    isDisabled: boolean;
    valuesChange: EventEmitter<number[]>;
    thumbWidth: number;
    thumbBorderWidth: number;
    trackHeight: number;
    isDraggingLeft: boolean;
    isDraggingRight: boolean;
    width: number;
    range: number;
    rangeK: number;
    thumbRealWidth: number;
    helpId: string;
    slider?: ElementRef;
    container?: ElementRef;
    track?: ElementRef;
    thumbLeft?: ElementRef;
    thumbRight?: ElementRef;
    outputLeft?: ElementRef;
    outputRight?: ElementRef;
    ngAfterViewInit(): void;
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    ngOnDestroy(): void;
    private initSlider;
    stopDragging(): void;
    mouseUp(): void;
    mouseLeave(): void;
    moveThumb($event: any): void;
    private initThumb;
    private startDraggingLeft;
    private startDraggingRight;
    private oMousePos;
}
