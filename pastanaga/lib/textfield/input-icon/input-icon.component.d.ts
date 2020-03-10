import { EventEmitter } from '@angular/core';
export declare class InputIconComponent {
    iconName?: string;
    iconTooltip?: string;
    iconColor: 'primary' | 'secondary' | 'destructive';
    set disabled(value: boolean);
    get disabled(): boolean;
    _disabled: boolean;
    iconClick: EventEmitter<MouseEvent>;
    onIconClick(event: MouseEvent): void;
}
