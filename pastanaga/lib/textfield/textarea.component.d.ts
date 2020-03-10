import { ElementRef, Renderer2, OnInit } from '@angular/core';
import { TextfieldCommon } from './textfield.common';
import { Subject } from 'rxjs';
export declare class TextareaComponent extends TextfieldCommon implements OnInit {
    private renderer;
    baseId: string;
    keyUpDebouncer: Subject<string>;
    textarea?: ElementRef;
    constructor(renderer: Renderer2);
    ngOnInit(): void;
    onKeyUp($event: any): void;
    private updateTextareaSize;
}
