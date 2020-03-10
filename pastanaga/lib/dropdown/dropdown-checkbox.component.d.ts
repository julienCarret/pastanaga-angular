import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ControlModel } from '../controls/control.model';
import { PopupDirective } from '../popup/popup.directive';
export declare class DropdownCheckboxComponent {
    private cdr;
    set checkboxes(values: ControlModel[]);
    set values(values: string[]);
    label?: string;
    set disabled(value: any);
    valuesChange: EventEmitter<string[]>;
    onOpen: EventEmitter<void>;
    onClose: EventEmitter<void>;
    menuRef?: PopupDirective;
    _checkboxes: ControlModel[];
    _values: string[];
    isDisabled: boolean;
    labels: {
        [value: string]: string;
    };
    constructor(cdr: ChangeDetectorRef);
    getLabels(): void;
    setSelection(): void;
    updateValue(checkbox: ControlModel, isSelected: boolean): void;
    _onClose(): void;
    onClickArrow($event: KeyboardEvent): void;
    openMenu(event: MouseEvent): void;
}
