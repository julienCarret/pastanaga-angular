import { OnInit, EventEmitter } from '@angular/core';
export declare class ExpandComponent implements OnInit {
    toggleTooltip: string[];
    openOnInit: boolean;
    open: EventEmitter<void>;
    close: EventEmitter<void>;
    isOpen: boolean;
    id: string;
    constructor();
    ngOnInit(): void;
    togglePanel(): void;
}
