import { EventEmitter, OnChanges, OnInit, ChangeDetectorRef } from '@angular/core';
import { ToggleModel, ToggleDivider } from '../toggle.model';
export declare class ToggleGroupComponent implements OnInit, OnChanges {
    private cdr;
    id?: string;
    toggles: ToggleModel[];
    onSelection: EventEmitter<ToggleModel[]>;
    isAllSelected: boolean;
    dividers: ToggleDivider[];
    constructor(cdr: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    toggleSelectAll(): void;
    toggleSelection(isSelected: boolean, toggle: ToggleModel): void;
}
