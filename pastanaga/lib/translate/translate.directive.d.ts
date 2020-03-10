import { ElementRef, AfterViewChecked } from '@angular/core';
import { TranslatePipe } from './translate.pipe';
export declare class TranslateDirective implements AfterViewChecked {
    private eltRef;
    private translatePipe;
    key: string;
    lastParams?: any;
    currentParams?: any;
    set translate(key: string);
    set translateParams(params: any);
    constructor(eltRef: ElementRef, translatePipe: TranslatePipe);
    ngAfterViewChecked(): void;
    checkNodes(forceUpdate?: boolean): void;
    updateValue(key: string, node: any): void;
    getContent(node: any): string;
    setContent(node: any, content: string): void;
    areEquals(obj1: any, obj2: any): boolean;
}
