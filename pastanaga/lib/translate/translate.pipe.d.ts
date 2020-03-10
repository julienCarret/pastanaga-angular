import { PipeTransform } from '@angular/core';
export declare class TranslatePipe implements PipeTransform {
    private lang;
    private translations;
    lastKey?: string;
    lastParams?: string;
    value: string | undefined;
    constructor(lang: any, translations: any);
    transform(key?: string, args?: any): string;
    private getValue;
}
