import { OnInit, ChangeDetectorRef } from '@angular/core';
import { ButtonBase } from './button-base';
export declare class ButtonComponent extends ButtonBase implements OnInit {
    protected changeDetector: ChangeDetectorRef;
    id?: string;
    constructor(changeDetector: ChangeDetectorRef);
    ngOnInit(): void;
    onClick($event: any): void;
}
