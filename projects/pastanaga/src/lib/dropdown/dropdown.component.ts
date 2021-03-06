import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    Renderer2,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { PopupService } from '../popup/popup.service';


@Component({
    selector: 'pa-dropdown',
    templateUrl: './dropdown.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent extends PopupComponent implements OnInit, OnDestroy {
    role: 'listbox' | 'menu' = 'menu';

    constructor(
        public popupService: PopupService,
        public renderer: Renderer2,
        public element: ElementRef,
        public cdr: ChangeDetectorRef,
    ) {
        super(popupService, renderer, element, cdr);
    }
}
