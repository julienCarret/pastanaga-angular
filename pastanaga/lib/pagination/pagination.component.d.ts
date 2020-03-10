import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
export declare class PaginationComponent implements OnChanges {
    total: number;
    page: number;
    pageSize: number;
    goTo: EventEmitter<number>;
    pages: number[];
    ngOnChanges(changes: SimpleChanges): void;
    back(): void;
    next(): void;
    goToPage(pageNumber: number): void;
    goToFirst(): void;
    goToLast(): void;
    private computePages;
}
