import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ButtonBase } from './button-base';
export declare class ButtonLinkComponent extends ButtonBase {
    protected changeDetector: ChangeDetectorRef;
    route?: string;
    traverseTo?: string;
    set hasButtonDisplay(value: any);
    onClick: EventEmitter<MouseEvent>;
    constructor(changeDetector: ChangeDetectorRef);
}
