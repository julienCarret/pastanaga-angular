import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter } from '@angular/core';
export declare class ButtonBase implements AfterContentInit {
    protected changeDetector: ChangeDetectorRef;
    set color(value: 'primary' | 'secondary' | 'destructive' | 'contrast');
    set size(value: 'tiny' | 'small' | 'large' | '');
    set border(value: any);
    set disabled(value: any);
    set active(value: any);
    ariaLabel: string;
    icon: string;
    set type(value: any);
    ariaControls: string;
    ariaExpanded: boolean;
    get iconAndText(): boolean;
    set iconAndText(value: boolean);
    hasFocus: EventEmitter<boolean>;
    textElement?: ElementRef;
    _iconAndText: boolean;
    checkedType: string;
    buttonStyle: {
        'pa-button': boolean;
        'pa-button-primary': boolean;
        'pa-button-secondary': boolean;
        'pa-button-destructive': boolean;
        'pa-button-contrast': boolean;
        'pa-button-small': boolean;
        'pa-button-large': boolean;
        'pa-button-accent': boolean;
        'pa-button-link': boolean;
        'active': boolean;
    };
    isDisabled: boolean;
    constructor(changeDetector: ChangeDetectorRef);
    ngAfterContentInit(): void;
    getClassFromInput(property: string, value: string, possibleValues: string[]): string;
    getButtonClass(value: string): string;
    get disablePointerEvent(): String;
}
