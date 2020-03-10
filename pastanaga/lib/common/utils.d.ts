import { ChangeDetectorRef } from '@angular/core';
export declare enum IconSize {
    SMALL = "SMALL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE"
}
export interface IconData {
    name?: string;
    path?: string;
    backgroundColor?: string;
    size?: IconSize;
    fillColor?: string;
    padding?: string;
}
export declare class Icon {
    name: string;
    path: string;
    backgroundColor: string;
    size: IconSize;
    fillColor: string;
    padding: string;
    constructor(data: IconData);
}
export declare class PositionStyle {
    position?: string;
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
}
export declare const getFixedRootParent: (element: HTMLElement) => HTMLElement;
export declare const getPositionnedParent: (element: HTMLElement) => HTMLElement;
export declare const getRealPosition: (element: HTMLElement) => {
    top: number;
    left: number;
};
export declare const getVirtualScrollParentPosition: (element: HTMLElement) => {
    bottom: number;
    right: number;
} | null;
export declare const markForCheck: (cdr: ChangeDetectorRef) => void;
export declare const detectChanges: (cdr: ChangeDetectorRef) => void;
