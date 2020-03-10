import { OnChanges } from '@angular/core';
export declare class PastanagaSpinnerComponent implements OnChanges {
    backgroundColor?: string;
    loadingMessage?: string;
    get small(): boolean;
    set small(value: boolean);
    _small: boolean;
    color: 'primary' | 'secondary';
    backgroundStyle?: {
        [key: string]: string;
    };
    ngOnChanges(changes: any): void;
}
