import { ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { PopupService } from './popup.service';
import { PositionStyle } from '../common/utils';
export declare class PopupComponent implements OnInit, OnDestroy {
    service: PopupService;
    renderer: Renderer2;
    element: ElementRef;
    cdr: ChangeDetectorRef;
    id?: string;
    isAlwaysOn: boolean;
    parentElement?: any;
    onClose: EventEmitter<boolean>;
    isDisplayed: boolean;
    style?: any;
    handlers: Function[];
    constructor(service: PopupService, renderer: Renderer2, element: ElementRef, cdr: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    show(style: PositionStyle, hasSubLevel?: boolean): void;
    adjustPosition(): boolean;
    close(byClickingOutside?: boolean): void;
    onOutsideClick(event: any): void;
    unlisten(): void;
}
