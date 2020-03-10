import { ElementRef, EventEmitter, OnInit } from '@angular/core';
import { ToggleDivider } from '../toggle.model';
export declare class ToggleComponent implements OnInit {
    id?: string;
    imageUrl?: string;
    imageBackground?: string;
    help?: string;
    divider?: ToggleDivider;
    isSelected: boolean;
    isDisabled: boolean;
    yesLabel: string;
    noLabel: string;
    isSelectedChange: EventEmitter<boolean>;
    textElement?: ElementRef;
    helpId: string;
    ngOnInit(): void;
    toggleSelection(): void;
}
