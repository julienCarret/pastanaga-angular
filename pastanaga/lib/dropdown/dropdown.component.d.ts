import { ElementRef, OnDestroy, OnInit, Renderer2, ChangeDetectorRef } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { PopupService } from '../popup/popup.service';
export declare class DropdownComponent extends PopupComponent implements OnInit, OnDestroy {
    popupService: PopupService;
    renderer: Renderer2;
    element: ElementRef;
    cdr: ChangeDetectorRef;
    role: 'listbox' | 'menu';
    constructor(popupService: PopupService, renderer: Renderer2, element: ElementRef, cdr: ChangeDetectorRef);
}
