import { EventEmitter, OnInit, ChangeDetectorRef, QueryList, OnChanges, SimpleChanges } from '@angular/core';
import { ControlModel } from '../control.model';
import { ControlValueAccessor } from '@angular/forms';
import { TranslatePipe } from '../../translate/translate.pipe';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { BadgeComponent } from '../../badge/badge.component';
import { Observable } from 'rxjs';
export declare enum CheckboxTreeMode {
    categorized = "categorized",
    nested = "nested",
    fileSystem = "fileSystem"
}
export declare class CheckboxTreeComponent implements ControlValueAccessor, OnInit, OnChanges {
    private translate;
    private cdr;
    id?: string;
    checkboxes?: ControlModel[];
    getChildren?: (control: ControlModel) => Observable<ControlModel[]>;
    doLoadChildren: boolean;
    set disabled(value: any);
    set shouldSort(value: any);
    set badgeVisible(value: any);
    set selectAllVisible(value: any);
    set countVisible(value: any);
    /**
     * Mode defined checkbox tree global behaviour:
     * - categorized (default):
     *   - emitted selection contains only selected leaf
     *   - selecting a parent automatically select its children
     *   - selecting all children automatically select the parent
     * - nested:
     *   - emitted selection contains all selected nodes
     *   - selecting a parent automatically select its children
     *   - selecting all children automatically select the parent
     * - fileSystem: a parent can have some inner content (like a folder can contain sub-folders but also some files)
     *   - emitted selection contains all selected nodes
     *   - selecting a parent does not select its children
     *   - selecting all children does not select the parent
     *   - a button allow to select/unselect all direct children of node
     */
    mode: CheckboxTreeMode;
    _isChildren: boolean;
    selection: EventEmitter<string[]>;
    childrenSelection: EventEmitter<{
        parentId: string;
        isSelected: boolean;
    }>;
    allSelected: EventEmitter<boolean>;
    updatedTree: EventEmitter<ControlModel[]>;
    isLoadingChildren: EventEmitter<boolean>;
    checkboxComponents?: QueryList<CheckboxComponent>;
    badgeComponents?: QueryList<BadgeComponent>;
    _checkboxes: ControlModel[];
    _shouldSort: boolean;
    _badgeVisible: boolean;
    _selectAllVisible: boolean;
    _countVisible: boolean;
    _disabled: boolean;
    onChange: any;
    onTouched: any;
    modes: typeof CheckboxTreeMode;
    isAllSelected: boolean;
    isAsync: boolean;
    totalCount: number;
    totalSelected: number;
    fileSystemButtonVisibility: {
        [checkboxId: string]: boolean;
    };
    _isLoadingChildren: boolean;
    _disableToggleChildren: boolean;
    constructor(translate: TranslatePipe, cdr: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    writeValue(value: any): void;
    registerOnTouched(handler: any): void;
    registerOnChange(handler: any): void;
    toggleSelectAll(): void;
    toggleSelection(isSelected: boolean, checkbox: ControlModel): void;
    toggleChildrenSelection(checkbox: ControlModel): void;
    private getUpdatedChildrenSelection;
    setParentState(childrenTree: ControlModel[], parent: ControlModel): void;
    private getIndeterminateForFileSystem;
    toggleCheckbox(checkbox: ControlModel): void;
    private getSelectedChildrenCount;
    private updateSelectionCount;
    private countThemAll;
    private emitSelectionChanged;
    private getSelectedValues;
    private updateSelectedValues;
    private updateAllSelected;
    private areAllChildrenSelected;
    private loadChildren;
    onMouseOver(checkbox: ControlModel): void;
    onMouseLeave(checkbox: ControlModel): void;
    private computeCheckboxSizes;
}
