import { ElementRef, OnInit } from '@angular/core';
import { PositionStyle } from '../common/utils';
import { PopupComponent } from './popup.component';
import { PopupService } from './popup.service';
interface RemoteClickParams {
    event: MouseEvent;
    override?: PositionStyle;
    isContextual?: boolean;
    ignoreRemote?: boolean;
    useLastPosition?: boolean;
    useRealComputedPosition?: boolean;
}
export declare class PopupDirective implements OnInit {
    private element;
    private service;
    paPopup?: PopupComponent;
    set popupOnRight(value: any);
    _popupOnRight: boolean;
    popupPosition?: PositionStyle;
    set openedFromPopup(value: any);
    rootParent?: HTMLElement;
    remoteElement?: HTMLElement;
    _openedFromPopup: boolean;
    constructor(element: ElementRef, service: PopupService);
    ngOnInit(): void;
    onClick($event: MouseEvent, override?: PositionStyle, isContextual?: boolean, useLast?: boolean): void;
    remoteClick(params: RemoteClickParams): void;
    getPosition(override?: PositionStyle, contextualEvent?: MouseEvent | false): PositionStyle;
}
export {};
