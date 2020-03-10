import { OnChanges, OnInit } from '@angular/core';
export declare class PastanagaProgressComponent implements OnInit, OnChanges {
    value?: number;
    isSecondary: boolean;
    isSmall: boolean;
    maxValue?: number;
    isIndeterminate: boolean;
    percentValue: number;
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    private setIsIndeterminate;
    private calculatePercentValue;
}
