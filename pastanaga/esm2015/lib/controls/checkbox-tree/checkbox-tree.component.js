var CheckboxTreeComponent_1;
import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ChangeDetectionStrategy, ChangeDetectorRef, ViewChildren, QueryList, OnChanges, SimpleChanges } from '@angular/core';
import { ControlModel } from '../control.model';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslatePipe } from '../../translate/translate.pipe';
import { markForCheck } from '../../common/utils';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { BadgeComponent } from '../../badge/badge.component';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import { getCheckboxValue, sortCheckboxes } from '../checkbox.utils';
let nextId = 0;
export var CheckboxTreeMode;
(function (CheckboxTreeMode) {
    CheckboxTreeMode["categorized"] = "categorized";
    CheckboxTreeMode["nested"] = "nested";
    CheckboxTreeMode["fileSystem"] = "fileSystem";
})(CheckboxTreeMode || (CheckboxTreeMode = {}));
let CheckboxTreeComponent = CheckboxTreeComponent_1 = class CheckboxTreeComponent {
    constructor(translate, cdr) {
        this.translate = translate;
        this.cdr = cdr;
        this.doLoadChildren = true;
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
        this.mode = CheckboxTreeMode.categorized;
        // not meant to be used outside
        this._isChildren = false;
        this.selection = new EventEmitter();
        this.childrenSelection = new EventEmitter();
        this.allSelected = new EventEmitter();
        this.updatedTree = new EventEmitter();
        this.isLoadingChildren = new EventEmitter();
        this._checkboxes = [];
        this._shouldSort = true;
        this._badgeVisible = true;
        this._selectAllVisible = true;
        this._countVisible = false;
        this._disabled = false;
        this.modes = CheckboxTreeMode;
        this.isAllSelected = false;
        this.isAsync = false;
        this.totalCount = 0;
        this.totalSelected = 0;
        this.fileSystemButtonVisibility = {};
        this._isLoadingChildren = false;
        this._disableToggleChildren = false;
    }
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    set shouldSort(value) { this._shouldSort = coerceBooleanProperty(value); }
    set badgeVisible(value) { this._badgeVisible = coerceBooleanProperty(value); }
    set selectAllVisible(value) { this._selectAllVisible = coerceBooleanProperty(value); }
    set countVisible(value) {
        this._countVisible = coerceBooleanProperty(value);
        this.updateSelectionCount();
    }
    ngOnInit() {
        this.id = !this.id ? `fieldset-checkbox-tree-${nextId++}` : `${this.id}-checkbox-tree`;
    }
    ngOnChanges(changes) {
        if (changes.getChildren) {
            this.isAsync = typeof this.getChildren === 'function';
        }
        if (changes.checkboxes && !!changes.checkboxes.currentValue) {
            const translatedCheckboxes = changes.checkboxes.currentValue.map(checkbox => new ControlModel(Object.assign(Object.assign({}, checkbox), { label: this.translate.transform(checkbox.label || ''), selectedChildren: this.getSelectedChildrenCount(checkbox) })));
            this._checkboxes = this._shouldSort ? sortCheckboxes(translatedCheckboxes) : translatedCheckboxes;
            if (this.doLoadChildren) {
                this.loadChildren();
            }
            this.updateSelectionCount();
            this.updateAllSelected();
            this.computeCheckboxSizes();
            this.emitSelectionChanged();
            markForCheck(this.cdr);
        }
        if (changes.doLoadChildren && changes.doLoadChildren.currentValue === true && !changes.doLoadChildren.previousValue) {
            this.loadChildren();
        }
    }
    writeValue(value) {
        if (!!this._checkboxes) {
            this._checkboxes = this._checkboxes.map(checkbox => new ControlModel(Object.assign(Object.assign({}, checkbox), { isSelected: value === checkbox.value })));
        }
    }
    registerOnTouched(handler) {
        this.onTouched = handler;
    }
    registerOnChange(handler) {
        this.onChange = handler;
    }
    toggleSelectAll() {
        this.isAllSelected = !this.isAllSelected;
        this._checkboxes = this._checkboxes.map(checkbox => {
            const updatedCheckbox = new ControlModel(Object.assign(Object.assign({}, checkbox), { isSelected: checkbox.isDisabled ? checkbox.isSelected : this.isAllSelected, isIndeterminate: false, children: this.getUpdatedChildrenSelection(this.isAllSelected, checkbox) }));
            updatedCheckbox.selectedChildren = this.getSelectedChildrenCount(updatedCheckbox);
            return updatedCheckbox;
        });
        this.updateSelectionCount();
        this.emitSelectionChanged();
    }
    toggleSelection(isSelected, checkbox) {
        checkbox.isSelected = isSelected;
        // when file system, we automatically select children, but we don't automatically unselect them
        const shouldUpdateChildren = !!checkbox.children && (isSelected || this.mode !== CheckboxTreeMode.fileSystem);
        if (shouldUpdateChildren) {
            checkbox.children = this.getUpdatedChildrenSelection(isSelected, checkbox);
            checkbox.selectedChildren = this.getSelectedChildrenCount(checkbox);
            markForCheck(this.cdr);
        }
        checkbox.isIndeterminate = this.mode !== CheckboxTreeMode.fileSystem ? false : this.getIndeterminateForFileSystem(checkbox);
        this.updateAllSelected();
        this.emitSelectionChanged();
    }
    toggleChildrenSelection(checkbox) {
        const isSelected = (checkbox.selectedChildren || 0) < (checkbox.totalChildren || 0);
        checkbox.children = this.getUpdatedChildrenSelection(isSelected, checkbox);
        checkbox.selectedChildren = this.getSelectedChildrenCount(checkbox);
        checkbox.isIndeterminate = this.getIndeterminateForFileSystem(checkbox);
        markForCheck(this.cdr);
        this.emitSelectionChanged();
        this.childrenSelection.emit({ parentId: checkbox.id, isSelected });
    }
    getUpdatedChildrenSelection(isSelected, checkbox) {
        if (!!checkbox.children) {
            return checkbox.children.map(child => {
                if (!!child.children) {
                    child.children = this.getUpdatedChildrenSelection(isSelected, child);
                    child.selectedChildren = this.getSelectedChildrenCount(child);
                }
                return new ControlModel(Object.assign(Object.assign({}, child), { isSelected, isIndeterminate: false }));
            });
        }
    }
    setParentState(childrenTree, parent) {
        // copy children state without changing object ref to prevent having an infinite loop of children/parent change detection
        if (!!parent.children) {
            parent.children.forEach((child, i) => {
                if (!!parent.children && childrenTree[i]) {
                    parent.children[i] = new ControlModel(Object.assign({}, childrenTree[i]));
                }
            });
        }
        if (this.mode === CheckboxTreeMode.fileSystem) {
            parent.isIndeterminate = this.getIndeterminateForFileSystem(parent);
        }
        else {
            if (childrenTree.every(child => child.isSelected && !child.isIndeterminate)) {
                parent.isSelected = true;
                parent.isIndeterminate = false;
            }
            else {
                parent.isIndeterminate = childrenTree.some(child => child.isSelected || child.isIndeterminate);
                if (parent.isIndeterminate || childrenTree.every(child => !child.isSelected)) {
                    parent.isSelected = false;
                }
            }
        }
        parent.selectedChildren = this.getSelectedChildrenCount(parent);
        this.updateAllSelected();
        this.emitSelectionChanged();
        markForCheck(this.cdr);
    }
    getIndeterminateForFileSystem(parent) {
        const children = parent.children || [];
        const allChildrenSelected = children.every(child => child.isSelected);
        const allChildrenUnSelected = children.every(child => !child.isSelected);
        return children.some(child => child.isIndeterminate)
            || (parent.isSelected && !allChildrenSelected && !allChildrenUnSelected)
            || (!parent.isSelected && children.some(child => child.isSelected));
    }
    toggleCheckbox(checkbox) {
        checkbox.isExpanded = !checkbox.isExpanded;
        this.updatedTree.emit(this._checkboxes);
        markForCheck(this.cdr);
    }
    getSelectedChildrenCount(checkbox) {
        return !!checkbox.children ? checkbox.children.filter(child => child.isSelected).length : 0;
    }
    updateSelectionCount() {
        if (this._countVisible && !!this._checkboxes) {
            this.totalCount = 0;
            this.totalSelected = 0;
            this.countThemAll(this._checkboxes);
            markForCheck(this.cdr);
        }
    }
    countThemAll(controls) {
        this.totalCount += controls.length;
        this.totalSelected += controls.filter(control => !!control.isSelected).length;
        controls.forEach(control => {
            if (control.children) {
                this.countThemAll(control.children);
            }
        });
    }
    emitSelectionChanged() {
        this.selection.emit(this.getSelectedValues());
        this.allSelected.emit(this.isAllSelected);
        this.updatedTree.emit(this._checkboxes);
    }
    getSelectedValues() {
        const selectedValues = [];
        if (!!this._checkboxes) {
            this._checkboxes.forEach(checkbox => this.updateSelectedValues(checkbox, selectedValues));
        }
        return selectedValues;
    }
    updateSelectedValues(checkbox, selectedValues) {
        // by default selection contains only leaf (categorized tree)
        // if nested or fileSystem tree, selection contains all selected nodes
        const isCategorized = this.mode === CheckboxTreeMode.categorized;
        if (checkbox.isSelected && (!isCategorized || !checkbox.children || checkbox.children.length === 0)) {
            selectedValues.push(getCheckboxValue(checkbox));
        }
        if (!!checkbox.children) {
            checkbox.children.forEach(child => this.updateSelectedValues(child, selectedValues));
        }
    }
    updateAllSelected() {
        if (!this._isChildren && !!this._checkboxes) {
            this.isAllSelected = this._checkboxes.every(checkbox => this.areAllChildrenSelected(checkbox));
        }
        this.updateSelectionCount();
    }
    areAllChildrenSelected(checkbox) {
        return !checkbox.children ? checkbox.isSelected : checkbox.isSelected &&
            checkbox.children.every(child => this.areAllChildrenSelected(child));
    }
    loadChildren() {
        if (this.isAsync && !!this.getChildren && !this._isLoadingChildren) {
            this._isLoadingChildren = true;
            this.isLoadingChildren.emit(this._isLoadingChildren);
            const requests = [];
            for (const checkbox of this._checkboxes) {
                if (!!checkbox.children) {
                    continue;
                }
                requests.push(this.getChildren(checkbox).pipe(tap(children => {
                    let selectedChildren = 0;
                    checkbox.children = children.map(child => {
                        const updatedChild = new ControlModel(Object.assign(Object.assign({}, child), { label: this.translate.transform(child.label || ''), isSelected: checkbox.isSelected }));
                        if (updatedChild.isSelected) {
                            selectedChildren++;
                        }
                        return updatedChild;
                    });
                    checkbox.totalChildren = children.length;
                    checkbox.selectedChildren = selectedChildren;
                    markForCheck(this.cdr);
                })));
            }
            if (requests.length === 0) {
                this._isLoadingChildren = false;
                this.isLoadingChildren.emit(this._isLoadingChildren);
            }
            else {
                forkJoin(requests).subscribe(() => {
                    markForCheck(this.cdr);
                    this.emitSelectionChanged();
                    this._isLoadingChildren = false;
                    this.isLoadingChildren.emit(this._isLoadingChildren);
                });
            }
        }
        this.updateSelectionCount();
    }
    onMouseOver(checkbox) {
        if (this.mode === CheckboxTreeMode.fileSystem) {
            this.fileSystemButtonVisibility[checkbox.id] = true;
        }
    }
    onMouseLeave(checkbox) {
        if (this.mode === CheckboxTreeMode.fileSystem) {
            const children = checkbox.children || [];
            // keep button visible when checkbox is selected while its children are not
            this.fileSystemButtonVisibility[checkbox.id] = checkbox.isSelected && children.every(child => !child.isSelected);
        }
    }
    computeCheckboxSizes() {
        setTimeout(() => {
            // FIXME checkbox size wrong after selecting all
            if (this._badgeVisible && !!this.checkboxComponents) {
                const badges = this.badgeComponents || [];
                this.checkboxComponents.forEach(checkboxComponent => {
                    const id = checkboxComponent.id;
                    const checkbox = this._checkboxes.find(item => item.id === id);
                    if (!!checkbox && !!checkbox.totalChildren) {
                        const badge = badges.find(b => b.id === id);
                        if (!!badge) {
                            const badgeWidth = badge.elementRef.nativeElement.getBoundingClientRect().width;
                            const extraWidth = this.mode === CheckboxTreeMode.fileSystem ? badgeWidth + 124 : badgeWidth;
                            checkboxComponent.setLabelMaxWidth(extraWidth);
                        }
                    }
                });
            }
        }, 100);
    }
};
CheckboxTreeComponent.ctorParameters = () => [
    { type: TranslatePipe },
    { type: ChangeDetectorRef }
];
__decorate([
    Input(),
    __metadata("design:type", String)
], CheckboxTreeComponent.prototype, "id", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], CheckboxTreeComponent.prototype, "checkboxes", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], CheckboxTreeComponent.prototype, "getChildren", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CheckboxTreeComponent.prototype, "doLoadChildren", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], CheckboxTreeComponent.prototype, "disabled", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], CheckboxTreeComponent.prototype, "shouldSort", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], CheckboxTreeComponent.prototype, "badgeVisible", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], CheckboxTreeComponent.prototype, "selectAllVisible", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], CheckboxTreeComponent.prototype, "countVisible", null);
__decorate([
    Input(),
    __metadata("design:type", String)
], CheckboxTreeComponent.prototype, "mode", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CheckboxTreeComponent.prototype, "_isChildren", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], CheckboxTreeComponent.prototype, "selection", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], CheckboxTreeComponent.prototype, "childrenSelection", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], CheckboxTreeComponent.prototype, "allSelected", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], CheckboxTreeComponent.prototype, "updatedTree", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], CheckboxTreeComponent.prototype, "isLoadingChildren", void 0);
__decorate([
    ViewChildren(CheckboxComponent),
    __metadata("design:type", QueryList)
], CheckboxTreeComponent.prototype, "checkboxComponents", void 0);
__decorate([
    ViewChildren(BadgeComponent),
    __metadata("design:type", QueryList)
], CheckboxTreeComponent.prototype, "badgeComponents", void 0);
CheckboxTreeComponent = CheckboxTreeComponent_1 = __decorate([
    Component({
        selector: 'pa-checkbox-tree',
        template: "<fieldset class=\"pa-fieldset-group\" [id]=\"id\">\n    <legend [class.pa-sr]=\"_isChildren\" [class.pa-select-all]=\"_selectAllVisible\">\n        <ng-content></ng-content>\n        <pa-badge *ngIf=\"_countVisible\" [isSmall]=\"true\" [isAccented]=\"true\"\n                  [value]=\"totalSelected\" [of]=\"totalCount\"></pa-badge>\n    </legend>\n\n    <pa-button *ngIf=\"!_isChildren && _selectAllVisible\"\n               size=\"small\" class=\"pa-field-button-right\"\n               id=\"checkbox-tree-select-all\"\n               [disabled]=\"_disabled\"\n               [color]=\"isAllSelected ? 'secondary' : 'primary'\"\n               (click)=\"toggleSelectAll()\">\n        {{isAllSelected ? 'common.deselect-all' : 'common.select-all'}}\n    </pa-button>\n\n    <div class=\"pa-field-group\" *ngFor=\"let checkbox of _checkboxes\">\n        <div (mouseover)=\"onMouseOver(checkbox)\"\n             (mouseleave)=\"onMouseLeave(checkbox)\">\n            <pa-button *ngIf=\"(!!checkbox.children && checkbox.children.length > 0) || (!checkbox.children && isAsync)\"\n                       id=\"pa-expand-checkbox-{{checkbox.id}}\"\n                       class=\"pa-expand\"\n                       color=\"secondary\" size=\"small\"\n                       [icon]=\"!checkbox.children ? 'initiating' : 'right-key'\"\n                       [disabled]=\"!checkbox.children || _disabled\"\n                       ariaControls=\"pa-expand-checkbox-{{checkbox.id}}\"\n                       [ariaExpanded]=\"checkbox.isExpanded\"\n                       (click)=\"toggleCheckbox(checkbox)\">\n                {{!checkbox.children ? 'Loading' : !checkbox.isExpanded ? 'Expand' : 'Collapse'}}\n            </pa-button>\n            <pa-checkbox [class.pa-checkbox-expanded]=\"checkbox.isExpanded\"\n                         [id]=\"checkbox.id\"\n                         [icon]=\"checkbox.icon\"\n                         [help]=\"checkbox.help\"\n                         [subLabel]=\"checkbox.subLabel\"\n                         [labelIcons]=\"checkbox.labelIcons\"\n                         [selected]=\"checkbox.isSelected\"\n                         [disabled]=\"checkbox.isDisabled || _disabled\"\n                         [indeterminate]=\"checkbox.isIndeterminate\"\n                         [squareCheck]=\"mode === modes.fileSystem\"\n                         (selection)=\"toggleSelection($event, checkbox)\">{{checkbox.label}}\n            </pa-checkbox>\n\n            <pa-button *ngIf=\"mode === modes.fileSystem && !!checkbox.children && checkbox.children.length > 0\"\n                       size=\"tiny\"\n                       class=\"pa-children-selection-button\"\n                       [disabled]=\"_disableToggleChildren || _disabled\"\n                       [hidden]=\"!fileSystemButtonVisibility[checkbox.id]\"\n                       [color]=\"checkbox.selectedChildren < checkbox.totalChildren ? 'primary' : 'secondary'\"\n                       (click)=\"toggleChildrenSelection(checkbox)\">\n                {{checkbox.selectedChildren < checkbox.totalChildren ? 'checkbox-tree.add-children' : 'checkbox-tree.remove-children'}}\n            </pa-button>\n        </div>\n\n        <output *ngIf=\"_badgeVisible && !!checkbox.children && checkbox.children.length > 0\"\n                [for]=\"checkbox.id\">\n            <pa-badge [id]=\"checkbox.id\" [value]=\"checkbox.selectedChildren\" [of]=\"checkbox.totalChildren\" [isAccented]=\"true\" [isSmall]=\"true\"></pa-badge>\n        </output>\n\n        <div class=\"pa-field-sublist\" role=\"tabpanel\"\n             [attr.aria-labelledby]=\"'pa-expand-checkbox-' + checkbox.id\"\n             [attr.aria-hidden]=\"!checkbox.isExpanded\">\n            <pa-checkbox-tree *ngIf=\"checkbox.isExpanded\"\n                              [id]=\"checkbox.id + '-child'\"\n                              [_isChildren]=\"true\"\n                              [doLoadChildren]=\"checkbox.isExpanded\"\n                              [checkboxes]=\"checkbox.children\"\n                              [getChildren]=\"getChildren\"\n                              [shouldSort]=\"_shouldSort\"\n                              [mode]=\"mode\"\n                              [disabled]=\"_disabled\"\n                              (isLoadingChildren)=\"_disableToggleChildren = $event\"\n                              (updatedTree)=\"setParentState($event, checkbox)\"></pa-checkbox-tree>\n        </div>\n    </div>\n</fieldset>\n\n",
        providers: [{
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => CheckboxTreeComponent_1),
                multi: true,
            }],
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [":host{display:block}:host legend pa-badge{display:inline-block;position:relative;top:.375rem;left:.75rem}:host .pa-field-group{position:relative}:host .pa-field-group ::ng-deep pa-button.pa-expand{display:inherit}:host .pa-field-group ::ng-deep pa-button.pa-expand .pa-button{float:left;margin:-.375rem -2.25rem;-webkit-transform:rotate(0);transform:rotate(0)}:host .pa-field-group ::ng-deep pa-button.pa-expand .pa-button[aria-expanded=true]{-webkit-transform:rotate(90deg);transform:rotate(90deg)}:host .pa-field-group pa-checkbox.pa-checkbox-expanded ::ng-deep .pa-field,:host .pa-field-group>::ng-deep .pa-field-sublist:not(:last-child),:host .pa-field-group>::ng-deep pa-checkbox:not(:last-child) .pa-field{margin-bottom:0}:host .pa-field-group pa-checkbox ::ng-deep .pa-field-checkbox{display:inline-block}:host .pa-field-group .pa-children-selection-button{position:relative;margin:0 .375rem;top:-1px}:host .pa-field-group output{position:absolute;right:-.75rem;top:0}:host .pa-field-sublist{margin-left:30px;padding:0;list-style:none;display:block}:host .pa-field-group:not(:last-child) ::ng-deep pa-checkbox .pa-field.pa-field-checkbox{margin-bottom:0}:host .pa-field-sublist[aria-hidden=true]{display:none}:host .pa-select-all{width:calc(100% - 84px)}"]
    }),
    __metadata("design:paramtypes", [TranslatePipe,
        ChangeDetectorRef])
], CheckboxTreeComponent);
export { CheckboxTreeComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtdHJlZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ3VpbGxvdGluYXdlYi9wYXN0YW5hZ2EtYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi9jb250cm9scy9jaGVja2JveC10cmVlL2NoZWNrYm94LXRyZWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBQ04sTUFBTSxFQUNOLHVCQUF1QixFQUN2QixpQkFBaUIsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQ3ZFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFFBQVEsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUM1QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRXJFLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQUVmLE1BQU0sQ0FBTixJQUFZLGdCQUlYO0FBSkQsV0FBWSxnQkFBZ0I7SUFDeEIsK0NBQTJCLENBQUE7SUFDM0IscUNB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QkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbnB1dCxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLCBWaWV3Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbE1vZGVsIH0gZnJvbSAnLi4vY29udHJvbC5tb2RlbCc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBUcmFuc2xhdGVQaXBlIH0gZnJvbSAnLi4vLi4vdHJhbnNsYXRlL3RyYW5zbGF0ZS5waXBlJztcbmltcG9ydCB7IG1hcmtGb3JDaGVjayB9IGZyb20gJy4uLy4uL2NvbW1vbi91dGlscyc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgQ2hlY2tib3hDb21wb25lbnQgfSBmcm9tICcuLi9jaGVja2JveC9jaGVja2JveC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQmFkZ2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi9iYWRnZS9iYWRnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgZm9ya0pvaW4sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGdldENoZWNrYm94VmFsdWUsIHNvcnRDaGVja2JveGVzIH0gZnJvbSAnLi4vY2hlY2tib3gudXRpbHMnO1xuXG5sZXQgbmV4dElkID0gMDtcblxuZXhwb3J0IGVudW0gQ2hlY2tib3hUcmVlTW9kZSB7XG4gICAgY2F0ZWdvcml6ZWQgPSAnY2F0ZWdvcml6ZWQnLFxuICAgIG5lc3RlZCA9ICduZXN0ZWQnLFxuICAgIGZpbGVTeXN0ZW0gPSAnZmlsZVN5c3RlbScsXG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncGEtY2hlY2tib3gtdHJlZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NoZWNrYm94LXRyZWUuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2NoZWNrYm94LXRyZWUuY29tcG9uZW50LnNjc3MnXSxcbiAgICBwcm92aWRlcnM6IFt7XG4gICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBDaGVja2JveFRyZWVDb21wb25lbnQpLFxuICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9XSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tib3hUcmVlQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoKSBpZD86IHN0cmluZztcbiAgICBASW5wdXQoKSBjaGVja2JveGVzPzogQ29udHJvbE1vZGVsW107XG4gICAgQElucHV0KCkgZ2V0Q2hpbGRyZW4/OiAoY29udHJvbDogQ29udHJvbE1vZGVsKSA9PiBPYnNlcnZhYmxlPENvbnRyb2xNb2RlbFtdPjtcbiAgICBASW5wdXQoKSBkb0xvYWRDaGlsZHJlbiA9IHRydWU7XG4gICAgQElucHV0KCkgc2V0IGRpc2FibGVkKHZhbHVlKSB7IHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICAgIEBJbnB1dCgpIHNldCBzaG91bGRTb3J0KHZhbHVlKSB7IHRoaXMuX3Nob3VsZFNvcnQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gICAgQElucHV0KCkgc2V0IGJhZGdlVmlzaWJsZSh2YWx1ZSkgeyB0aGlzLl9iYWRnZVZpc2libGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gICAgQElucHV0KCkgc2V0IHNlbGVjdEFsbFZpc2libGUodmFsdWUpIHsgdGhpcy5fc2VsZWN0QWxsVmlzaWJsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgICBASW5wdXQoKSBzZXQgY291bnRWaXNpYmxlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2NvdW50VmlzaWJsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0aW9uQ291bnQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb2RlIGRlZmluZWQgY2hlY2tib3ggdHJlZSBnbG9iYWwgYmVoYXZpb3VyOlxuICAgICAqIC0gY2F0ZWdvcml6ZWQgKGRlZmF1bHQpOlxuICAgICAqICAgLSBlbWl0dGVkIHNlbGVjdGlvbiBjb250YWlucyBvbmx5IHNlbGVjdGVkIGxlYWZcbiAgICAgKiAgIC0gc2VsZWN0aW5nIGEgcGFyZW50IGF1dG9tYXRpY2FsbHkgc2VsZWN0IGl0cyBjaGlsZHJlblxuICAgICAqICAgLSBzZWxlY3RpbmcgYWxsIGNoaWxkcmVuIGF1dG9tYXRpY2FsbHkgc2VsZWN0IHRoZSBwYXJlbnRcbiAgICAgKiAtIG5lc3RlZDpcbiAgICAgKiAgIC0gZW1pdHRlZCBzZWxlY3Rpb24gY29udGFpbnMgYWxsIHNlbGVjdGVkIG5vZGVzXG4gICAgICogICAtIHNlbGVjdGluZyBhIHBhcmVudCBhdXRvbWF0aWNhbGx5IHNlbGVjdCBpdHMgY2hpbGRyZW5cbiAgICAgKiAgIC0gc2VsZWN0aW5nIGFsbCBjaGlsZHJlbiBhdXRvbWF0aWNhbGx5IHNlbGVjdCB0aGUgcGFyZW50XG4gICAgICogLSBmaWxlU3lzdGVtOiBhIHBhcmVudCBjYW4gaGF2ZSBzb21lIGlubmVyIGNvbnRlbnQgKGxpa2UgYSBmb2xkZXIgY2FuIGNvbnRhaW4gc3ViLWZvbGRlcnMgYnV0IGFsc28gc29tZSBmaWxlcylcbiAgICAgKiAgIC0gZW1pdHRlZCBzZWxlY3Rpb24gY29udGFpbnMgYWxsIHNlbGVjdGVkIG5vZGVzXG4gICAgICogICAtIHNlbGVjdGluZyBhIHBhcmVudCBkb2VzIG5vdCBzZWxlY3QgaXRzIGNoaWxkcmVuXG4gICAgICogICAtIHNlbGVjdGluZyBhbGwgY2hpbGRyZW4gZG9lcyBub3Qgc2VsZWN0IHRoZSBwYXJlbnRcbiAgICAgKiAgIC0gYSBidXR0b24gYWxsb3cgdG8gc2VsZWN0L3Vuc2VsZWN0IGFsbCBkaXJlY3QgY2hpbGRyZW4gb2Ygbm9kZVxuICAgICAqL1xuICAgIEBJbnB1dCgpIG1vZGU6IENoZWNrYm94VHJlZU1vZGUgPSBDaGVja2JveFRyZWVNb2RlLmNhdGVnb3JpemVkO1xuXG4gICAgLy8gbm90IG1lYW50IHRvIGJlIHVzZWQgb3V0c2lkZVxuICAgIEBJbnB1dCgpIF9pc0NoaWxkcmVuID0gZmFsc2U7XG5cbiAgICBAT3V0cHV0KCkgc2VsZWN0aW9uOiBFdmVudEVtaXR0ZXI8c3RyaW5nW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBjaGlsZHJlblNlbGVjdGlvbjogRXZlbnRFbWl0dGVyPHtwYXJlbnRJZDogc3RyaW5nLCBpc1NlbGVjdGVkOiBib29sZWFufT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIGFsbFNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHVwZGF0ZWRUcmVlOiBFdmVudEVtaXR0ZXI8Q29udHJvbE1vZGVsW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxDb250cm9sTW9kZWxbXT4oKTtcbiAgICBAT3V0cHV0KCkgaXNMb2FkaW5nQ2hpbGRyZW46IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIEBWaWV3Q2hpbGRyZW4oQ2hlY2tib3hDb21wb25lbnQpIGNoZWNrYm94Q29tcG9uZW50cz86IFF1ZXJ5TGlzdDxDaGVja2JveENvbXBvbmVudD47XG4gICAgQFZpZXdDaGlsZHJlbihCYWRnZUNvbXBvbmVudCkgYmFkZ2VDb21wb25lbnRzPzogUXVlcnlMaXN0PEJhZGdlQ29tcG9uZW50PjtcblxuICAgIF9jaGVja2JveGVzOiBDb250cm9sTW9kZWxbXSA9IFtdO1xuICAgIF9zaG91bGRTb3J0ID0gdHJ1ZTtcbiAgICBfYmFkZ2VWaXNpYmxlID0gdHJ1ZTtcbiAgICBfc2VsZWN0QWxsVmlzaWJsZSA9IHRydWU7XG4gICAgX2NvdW50VmlzaWJsZSA9IGZhbHNlO1xuICAgIF9kaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgb25DaGFuZ2U6IGFueTtcbiAgICBvblRvdWNoZWQ6IGFueTtcblxuICAgIG1vZGVzID0gQ2hlY2tib3hUcmVlTW9kZTtcbiAgICBpc0FsbFNlbGVjdGVkID0gZmFsc2U7XG4gICAgaXNBc3luYyA9IGZhbHNlO1xuICAgIHRvdGFsQ291bnQgPSAwO1xuICAgIHRvdGFsU2VsZWN0ZWQgPSAwO1xuXG4gICAgZmlsZVN5c3RlbUJ1dHRvblZpc2liaWxpdHk6IHtbY2hlY2tib3hJZDogc3RyaW5nXTogYm9vbGVhbn0gPSB7fTtcbiAgICBfaXNMb2FkaW5nQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICBfZGlzYWJsZVRvZ2dsZUNoaWxkcmVuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVBpcGUsXG4gICAgICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZlxuICAgICkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmlkID0gIXRoaXMuaWQgPyBgZmllbGRzZXQtY2hlY2tib3gtdHJlZS0ke25leHRJZCsrfWAgOiBgJHt0aGlzLmlkfS1jaGVja2JveC10cmVlYDtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgIGlmIChjaGFuZ2VzLmdldENoaWxkcmVuKSB7XG4gICAgICAgICAgICB0aGlzLmlzQXN5bmMgPSB0eXBlb2YgdGhpcy5nZXRDaGlsZHJlbiA9PT0gJ2Z1bmN0aW9uJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGFuZ2VzLmNoZWNrYm94ZXMgJiYgISFjaGFuZ2VzLmNoZWNrYm94ZXMuY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCB0cmFuc2xhdGVkQ2hlY2tib3hlcyA9IGNoYW5nZXMuY2hlY2tib3hlcy5jdXJyZW50VmFsdWUubWFwKGNoZWNrYm94ID0+IG5ldyBDb250cm9sTW9kZWwoe1xuICAgICAgICAgICAgICAgIC4uLmNoZWNrYm94LFxuICAgICAgICAgICAgICAgIGxhYmVsOiB0aGlzLnRyYW5zbGF0ZS50cmFuc2Zvcm0oY2hlY2tib3gubGFiZWwgfHwgJycpLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ2hpbGRyZW46IHRoaXMuZ2V0U2VsZWN0ZWRDaGlsZHJlbkNvdW50KGNoZWNrYm94KSxcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrYm94ZXMgPSB0aGlzLl9zaG91bGRTb3J0ID8gc29ydENoZWNrYm94ZXModHJhbnNsYXRlZENoZWNrYm94ZXMpIDogdHJhbnNsYXRlZENoZWNrYm94ZXM7XG4gICAgICAgICAgICBpZiAodGhpcy5kb0xvYWRDaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZENoaWxkcmVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGlvbkNvdW50KCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUFsbFNlbGVjdGVkKCk7XG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVDaGVja2JveFNpemVzKCk7XG4gICAgICAgICAgICB0aGlzLmVtaXRTZWxlY3Rpb25DaGFuZ2VkKCk7XG4gICAgICAgICAgICBtYXJrRm9yQ2hlY2sodGhpcy5jZHIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoYW5nZXMuZG9Mb2FkQ2hpbGRyZW4gJiYgY2hhbmdlcy5kb0xvYWRDaGlsZHJlbi5jdXJyZW50VmFsdWUgPT09IHRydWUgJiYgIWNoYW5nZXMuZG9Mb2FkQ2hpbGRyZW4ucHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5sb2FkQ2hpbGRyZW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICBpZiAoISF0aGlzLl9jaGVja2JveGVzKSB7XG4gICAgICAgICAgICB0aGlzLl9jaGVja2JveGVzID0gdGhpcy5fY2hlY2tib3hlcy5tYXAoY2hlY2tib3ggPT4gbmV3IENvbnRyb2xNb2RlbCh7Li4uY2hlY2tib3gsIGlzU2VsZWN0ZWQ6IHZhbHVlID09PSBjaGVja2JveC52YWx1ZX0pKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGhhbmRsZXI6IGFueSkge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGhhbmRsZXI7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShoYW5kbGVyOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGhhbmRsZXI7XG4gICAgfVxuXG4gICAgdG9nZ2xlU2VsZWN0QWxsKCkge1xuICAgICAgICB0aGlzLmlzQWxsU2VsZWN0ZWQgPSAhdGhpcy5pc0FsbFNlbGVjdGVkO1xuICAgICAgICB0aGlzLl9jaGVja2JveGVzID0gdGhpcy5fY2hlY2tib3hlcy5tYXAoIGNoZWNrYm94ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRDaGVja2JveCA9IG5ldyBDb250cm9sTW9kZWwoe1xuICAgICAgICAgICAgICAgIC4uLmNoZWNrYm94LFxuICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQ6IGNoZWNrYm94LmlzRGlzYWJsZWQgPyBjaGVja2JveC5pc1NlbGVjdGVkIDogdGhpcy5pc0FsbFNlbGVjdGVkLFxuICAgICAgICAgICAgICAgIGlzSW5kZXRlcm1pbmF0ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IHRoaXMuZ2V0VXBkYXRlZENoaWxkcmVuU2VsZWN0aW9uKHRoaXMuaXNBbGxTZWxlY3RlZCwgY2hlY2tib3gpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB1cGRhdGVkQ2hlY2tib3guc2VsZWN0ZWRDaGlsZHJlbiA9IHRoaXMuZ2V0U2VsZWN0ZWRDaGlsZHJlbkNvdW50KHVwZGF0ZWRDaGVja2JveCk7XG4gICAgICAgICAgICByZXR1cm4gdXBkYXRlZENoZWNrYm94O1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3Rpb25Db3VudCgpO1xuICAgICAgICB0aGlzLmVtaXRTZWxlY3Rpb25DaGFuZ2VkKCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlU2VsZWN0aW9uKGlzU2VsZWN0ZWQ6IGJvb2xlYW4sIGNoZWNrYm94OiBDb250cm9sTW9kZWwpIHtcbiAgICAgICAgY2hlY2tib3guaXNTZWxlY3RlZCA9IGlzU2VsZWN0ZWQ7XG4gICAgICAgIC8vIHdoZW4gZmlsZSBzeXN0ZW0sIHdlIGF1dG9tYXRpY2FsbHkgc2VsZWN0IGNoaWxkcmVuLCBidXQgd2UgZG9uJ3QgYXV0b21hdGljYWxseSB1bnNlbGVjdCB0aGVtXG4gICAgICAgIGNvbnN0IHNob3VsZFVwZGF0ZUNoaWxkcmVuID0gISFjaGVja2JveC5jaGlsZHJlbiAmJiAoaXNTZWxlY3RlZCB8fCB0aGlzLm1vZGUgIT09IENoZWNrYm94VHJlZU1vZGUuZmlsZVN5c3RlbSk7XG4gICAgICAgIGlmIChzaG91bGRVcGRhdGVDaGlsZHJlbikge1xuICAgICAgICAgICAgY2hlY2tib3guY2hpbGRyZW4gPSB0aGlzLmdldFVwZGF0ZWRDaGlsZHJlblNlbGVjdGlvbihpc1NlbGVjdGVkLCBjaGVja2JveCk7XG4gICAgICAgICAgICBjaGVja2JveC5zZWxlY3RlZENoaWxkcmVuID0gdGhpcy5nZXRTZWxlY3RlZENoaWxkcmVuQ291bnQoY2hlY2tib3gpO1xuICAgICAgICAgICAgbWFya0ZvckNoZWNrKHRoaXMuY2RyKTtcbiAgICAgICAgfVxuICAgICAgICBjaGVja2JveC5pc0luZGV0ZXJtaW5hdGUgPSB0aGlzLm1vZGUgIT09IENoZWNrYm94VHJlZU1vZGUuZmlsZVN5c3RlbSA/IGZhbHNlIDogdGhpcy5nZXRJbmRldGVybWluYXRlRm9yRmlsZVN5c3RlbShjaGVja2JveCk7XG4gICAgICAgIHRoaXMudXBkYXRlQWxsU2VsZWN0ZWQoKTtcbiAgICAgICAgdGhpcy5lbWl0U2VsZWN0aW9uQ2hhbmdlZCgpO1xuICAgIH1cblxuICAgIHRvZ2dsZUNoaWxkcmVuU2VsZWN0aW9uKGNoZWNrYm94OiBDb250cm9sTW9kZWwpIHtcbiAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IChjaGVja2JveC5zZWxlY3RlZENoaWxkcmVuIHx8IDApIDwgKGNoZWNrYm94LnRvdGFsQ2hpbGRyZW4gfHwgMCk7XG4gICAgICAgIGNoZWNrYm94LmNoaWxkcmVuID0gdGhpcy5nZXRVcGRhdGVkQ2hpbGRyZW5TZWxlY3Rpb24oaXNTZWxlY3RlZCwgY2hlY2tib3gpO1xuICAgICAgICBjaGVja2JveC5zZWxlY3RlZENoaWxkcmVuID0gdGhpcy5nZXRTZWxlY3RlZENoaWxkcmVuQ291bnQoY2hlY2tib3gpO1xuICAgICAgICBjaGVja2JveC5pc0luZGV0ZXJtaW5hdGUgPSB0aGlzLmdldEluZGV0ZXJtaW5hdGVGb3JGaWxlU3lzdGVtKGNoZWNrYm94KTtcbiAgICAgICAgbWFya0ZvckNoZWNrKHRoaXMuY2RyKTtcbiAgICAgICAgdGhpcy5lbWl0U2VsZWN0aW9uQ2hhbmdlZCgpO1xuICAgICAgICB0aGlzLmNoaWxkcmVuU2VsZWN0aW9uLmVtaXQoe3BhcmVudElkOiBjaGVja2JveC5pZCwgaXNTZWxlY3RlZH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0VXBkYXRlZENoaWxkcmVuU2VsZWN0aW9uKGlzU2VsZWN0ZWQ6IGJvb2xlYW4sIGNoZWNrYm94OiBDb250cm9sTW9kZWwpOiBDb250cm9sTW9kZWxbXSB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmICghIWNoZWNrYm94LmNoaWxkcmVuKSB7XG4gICAgICAgICAgICByZXR1cm4gY2hlY2tib3guY2hpbGRyZW4ubWFwKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoISFjaGlsZC5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5jaGlsZHJlbiA9IHRoaXMuZ2V0VXBkYXRlZENoaWxkcmVuU2VsZWN0aW9uKGlzU2VsZWN0ZWQsIGNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuc2VsZWN0ZWRDaGlsZHJlbiA9IHRoaXMuZ2V0U2VsZWN0ZWRDaGlsZHJlbkNvdW50KGNoaWxkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb250cm9sTW9kZWwoey4uLmNoaWxkLCBpc1NlbGVjdGVkLCBpc0luZGV0ZXJtaW5hdGU6IGZhbHNlfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFBhcmVudFN0YXRlKGNoaWxkcmVuVHJlZTogQ29udHJvbE1vZGVsW10sIHBhcmVudDogQ29udHJvbE1vZGVsKSB7XG4gICAgICAgIC8vIGNvcHkgY2hpbGRyZW4gc3RhdGUgd2l0aG91dCBjaGFuZ2luZyBvYmplY3QgcmVmIHRvIHByZXZlbnQgaGF2aW5nIGFuIGluZmluaXRlIGxvb3Agb2YgY2hpbGRyZW4vcGFyZW50IGNoYW5nZSBkZXRlY3Rpb25cbiAgICAgICAgaWYgKCEhcGFyZW50LmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBwYXJlbnQuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoISFwYXJlbnQuY2hpbGRyZW4gJiYgY2hpbGRyZW5UcmVlW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbltpXSA9IG5ldyBDb250cm9sTW9kZWwoey4uLmNoaWxkcmVuVHJlZVtpXX0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm1vZGUgPT09IENoZWNrYm94VHJlZU1vZGUuZmlsZVN5c3RlbSkge1xuICAgICAgICAgICAgcGFyZW50LmlzSW5kZXRlcm1pbmF0ZSA9IHRoaXMuZ2V0SW5kZXRlcm1pbmF0ZUZvckZpbGVTeXN0ZW0ocGFyZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjaGlsZHJlblRyZWUuZXZlcnkoY2hpbGQgPT4gY2hpbGQuaXNTZWxlY3RlZCAmJiAhY2hpbGQuaXNJbmRldGVybWluYXRlKSkge1xuICAgICAgICAgICAgICAgIHBhcmVudC5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBwYXJlbnQuaXNJbmRldGVybWluYXRlID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhcmVudC5pc0luZGV0ZXJtaW5hdGUgPSBjaGlsZHJlblRyZWUuc29tZShjaGlsZCA9PiBjaGlsZC5pc1NlbGVjdGVkIHx8IGNoaWxkLmlzSW5kZXRlcm1pbmF0ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudC5pc0luZGV0ZXJtaW5hdGUgfHwgY2hpbGRyZW5UcmVlLmV2ZXJ5KGNoaWxkID0+ICFjaGlsZC5pc1NlbGVjdGVkKSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnQuaXNTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwYXJlbnQuc2VsZWN0ZWRDaGlsZHJlbiA9IHRoaXMuZ2V0U2VsZWN0ZWRDaGlsZHJlbkNvdW50KHBhcmVudCk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVBbGxTZWxlY3RlZCgpO1xuICAgICAgICB0aGlzLmVtaXRTZWxlY3Rpb25DaGFuZ2VkKCk7XG4gICAgICAgIG1hcmtGb3JDaGVjayh0aGlzLmNkcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRJbmRldGVybWluYXRlRm9yRmlsZVN5c3RlbShwYXJlbnQ6IENvbnRyb2xNb2RlbCkge1xuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IHBhcmVudC5jaGlsZHJlbiB8fCBbXTtcbiAgICAgICAgY29uc3QgYWxsQ2hpbGRyZW5TZWxlY3RlZCA9IGNoaWxkcmVuLmV2ZXJ5KGNoaWxkID0+IGNoaWxkLmlzU2VsZWN0ZWQpO1xuICAgICAgICBjb25zdCBhbGxDaGlsZHJlblVuU2VsZWN0ZWQgPSBjaGlsZHJlbi5ldmVyeShjaGlsZCA9PiAhY2hpbGQuaXNTZWxlY3RlZCk7XG4gICAgICAgIHJldHVybiBjaGlsZHJlbi5zb21lKGNoaWxkID0+IGNoaWxkLmlzSW5kZXRlcm1pbmF0ZSlcbiAgICAgICAgICAgIHx8IChwYXJlbnQuaXNTZWxlY3RlZCAmJiAhYWxsQ2hpbGRyZW5TZWxlY3RlZCAmJiAhYWxsQ2hpbGRyZW5VblNlbGVjdGVkKVxuICAgICAgICAgICAgfHwgKCFwYXJlbnQuaXNTZWxlY3RlZCAmJiBjaGlsZHJlbi5zb21lKGNoaWxkID0+IGNoaWxkLmlzU2VsZWN0ZWQpKTtcbiAgICB9XG5cbiAgICB0b2dnbGVDaGVja2JveChjaGVja2JveDogQ29udHJvbE1vZGVsKSB7XG4gICAgICAgIGNoZWNrYm94LmlzRXhwYW5kZWQgPSAhY2hlY2tib3guaXNFeHBhbmRlZDtcbiAgICAgICAgdGhpcy51cGRhdGVkVHJlZS5lbWl0KHRoaXMuX2NoZWNrYm94ZXMpO1xuICAgICAgICBtYXJrRm9yQ2hlY2sodGhpcy5jZHIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0U2VsZWN0ZWRDaGlsZHJlbkNvdW50KGNoZWNrYm94OiBDb250cm9sTW9kZWwpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gISFjaGVja2JveC5jaGlsZHJlbiA/IGNoZWNrYm94LmNoaWxkcmVuLmZpbHRlcihjaGlsZCA9PiBjaGlsZC5pc1NlbGVjdGVkKS5sZW5ndGggOiAwO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlU2VsZWN0aW9uQ291bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9jb3VudFZpc2libGUgJiYgISF0aGlzLl9jaGVja2JveGVzKSB7XG4gICAgICAgICAgICB0aGlzLnRvdGFsQ291bnQgPSAwO1xuICAgICAgICAgICAgdGhpcy50b3RhbFNlbGVjdGVkID0gMDtcbiAgICAgICAgICAgIHRoaXMuY291bnRUaGVtQWxsKHRoaXMuX2NoZWNrYm94ZXMpO1xuICAgICAgICAgICAgbWFya0ZvckNoZWNrKHRoaXMuY2RyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY291bnRUaGVtQWxsKGNvbnRyb2xzOiBDb250cm9sTW9kZWxbXSkge1xuICAgICAgICB0aGlzLnRvdGFsQ291bnQgKz0gY29udHJvbHMubGVuZ3RoO1xuICAgICAgICB0aGlzLnRvdGFsU2VsZWN0ZWQgKz0gY29udHJvbHMuZmlsdGVyKGNvbnRyb2wgPT4gISFjb250cm9sLmlzU2VsZWN0ZWQpLmxlbmd0aDtcbiAgICAgICAgY29udHJvbHMuZm9yRWFjaChjb250cm9sID0+IHtcbiAgICAgICAgICAgIGlmIChjb250cm9sLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudFRoZW1BbGwoY29udHJvbC5jaGlsZHJlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZW1pdFNlbGVjdGlvbkNoYW5nZWQoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uLmVtaXQodGhpcy5nZXRTZWxlY3RlZFZhbHVlcygpKTtcbiAgICAgICAgdGhpcy5hbGxTZWxlY3RlZC5lbWl0KHRoaXMuaXNBbGxTZWxlY3RlZCk7XG4gICAgICAgIHRoaXMudXBkYXRlZFRyZWUuZW1pdCh0aGlzLl9jaGVja2JveGVzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFNlbGVjdGVkVmFsdWVzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRWYWx1ZXM6IHN0cmluZ1tdID0gW107XG4gICAgICAgIGlmICghIXRoaXMuX2NoZWNrYm94ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrYm94ZXMuZm9yRWFjaChjaGVja2JveCA9PiB0aGlzLnVwZGF0ZVNlbGVjdGVkVmFsdWVzKGNoZWNrYm94LCBzZWxlY3RlZFZhbHVlcykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWxlY3RlZFZhbHVlcztcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVNlbGVjdGVkVmFsdWVzKGNoZWNrYm94OiBDb250cm9sTW9kZWwsIHNlbGVjdGVkVmFsdWVzOiBzdHJpbmdbXSkge1xuICAgICAgICAvLyBieSBkZWZhdWx0IHNlbGVjdGlvbiBjb250YWlucyBvbmx5IGxlYWYgKGNhdGVnb3JpemVkIHRyZWUpXG4gICAgICAgIC8vIGlmIG5lc3RlZCBvciBmaWxlU3lzdGVtIHRyZWUsIHNlbGVjdGlvbiBjb250YWlucyBhbGwgc2VsZWN0ZWQgbm9kZXNcbiAgICAgICAgY29uc3QgaXNDYXRlZ29yaXplZCA9IHRoaXMubW9kZSA9PT0gQ2hlY2tib3hUcmVlTW9kZS5jYXRlZ29yaXplZDtcbiAgICAgICAgaWYgKGNoZWNrYm94LmlzU2VsZWN0ZWQgJiYgKCFpc0NhdGVnb3JpemVkIHx8ICFjaGVja2JveC5jaGlsZHJlbiB8fCBjaGVja2JveC5jaGlsZHJlbi5sZW5ndGggPT09IDApKSB7XG4gICAgICAgICAgICBzZWxlY3RlZFZhbHVlcy5wdXNoKGdldENoZWNrYm94VmFsdWUoY2hlY2tib3gpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoISFjaGVja2JveC5jaGlsZHJlbikge1xuICAgICAgICAgICAgY2hlY2tib3guY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB0aGlzLnVwZGF0ZVNlbGVjdGVkVmFsdWVzKGNoaWxkLCBzZWxlY3RlZFZhbHVlcykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVBbGxTZWxlY3RlZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pc0NoaWxkcmVuICYmICEhdGhpcy5fY2hlY2tib3hlcykge1xuICAgICAgICAgICAgdGhpcy5pc0FsbFNlbGVjdGVkID0gdGhpcy5fY2hlY2tib3hlcy5ldmVyeShjaGVja2JveCA9PiB0aGlzLmFyZUFsbENoaWxkcmVuU2VsZWN0ZWQoY2hlY2tib3gpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGlvbkNvdW50KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhcmVBbGxDaGlsZHJlblNlbGVjdGVkKGNoZWNrYm94OiBDb250cm9sTW9kZWwpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICFjaGVja2JveC5jaGlsZHJlbiA/IGNoZWNrYm94LmlzU2VsZWN0ZWQgOiBjaGVja2JveC5pc1NlbGVjdGVkICYmXG4gICAgICAgICAgICBjaGVja2JveC5jaGlsZHJlbi5ldmVyeShjaGlsZCA9PiB0aGlzLmFyZUFsbENoaWxkcmVuU2VsZWN0ZWQoY2hpbGQpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWRDaGlsZHJlbigpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNBc3luYyAmJiAhIXRoaXMuZ2V0Q2hpbGRyZW4gJiYgIXRoaXMuX2lzTG9hZGluZ0NoaWxkcmVuKSB7XG4gICAgICAgICAgICB0aGlzLl9pc0xvYWRpbmdDaGlsZHJlbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmlzTG9hZGluZ0NoaWxkcmVuLmVtaXQodGhpcy5faXNMb2FkaW5nQ2hpbGRyZW4pO1xuICAgICAgICAgICAgY29uc3QgcmVxdWVzdHM6IE9ic2VydmFibGU8Q29udHJvbE1vZGVsW10+W10gPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgY2hlY2tib3ggb2YgdGhpcy5fY2hlY2tib3hlcykge1xuICAgICAgICAgICAgICAgIGlmICghIWNoZWNrYm94LmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlcXVlc3RzLnB1c2godGhpcy5nZXRDaGlsZHJlbihjaGVja2JveCkucGlwZSh0YXAoY2hpbGRyZW4gPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRDaGlsZHJlbiA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LmNoaWxkcmVuID0gY2hpbGRyZW4ubWFwKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRDaGlsZCA9IG5ldyBDb250cm9sTW9kZWwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmNoaWxkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiB0aGlzLnRyYW5zbGF0ZS50cmFuc2Zvcm0oY2hpbGQubGFiZWwgfHwgJycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQ6IGNoZWNrYm94LmlzU2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1cGRhdGVkQ2hpbGQuaXNTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkQ2hpbGRyZW4rKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1cGRhdGVkQ2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBjaGVja2JveC50b3RhbENoaWxkcmVuID0gY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBjaGVja2JveC5zZWxlY3RlZENoaWxkcmVuID0gc2VsZWN0ZWRDaGlsZHJlbjtcbiAgICAgICAgICAgICAgICAgICAgbWFya0ZvckNoZWNrKHRoaXMuY2RyKTtcbiAgICAgICAgICAgICAgICB9KSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmVxdWVzdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXNMb2FkaW5nQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzTG9hZGluZ0NoaWxkcmVuLmVtaXQodGhpcy5faXNMb2FkaW5nQ2hpbGRyZW4pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3JrSm9pbihyZXF1ZXN0cykuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbWFya0ZvckNoZWNrKHRoaXMuY2RyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0U2VsZWN0aW9uQ2hhbmdlZCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0xvYWRpbmdDaGlsZHJlbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzTG9hZGluZ0NoaWxkcmVuLmVtaXQodGhpcy5faXNMb2FkaW5nQ2hpbGRyZW4pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0aW9uQ291bnQoKTtcbiAgICB9XG5cbiAgICBvbk1vdXNlT3ZlcihjaGVja2JveDogQ29udHJvbE1vZGVsKSB7XG4gICAgICAgIGlmICh0aGlzLm1vZGUgPT09IENoZWNrYm94VHJlZU1vZGUuZmlsZVN5c3RlbSkge1xuICAgICAgICAgICAgdGhpcy5maWxlU3lzdGVtQnV0dG9uVmlzaWJpbGl0eVtjaGVja2JveC5pZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Nb3VzZUxlYXZlKGNoZWNrYm94OiBDb250cm9sTW9kZWwpIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gQ2hlY2tib3hUcmVlTW9kZS5maWxlU3lzdGVtKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbiA9IGNoZWNrYm94LmNoaWxkcmVuIHx8IFtdO1xuICAgICAgICAgICAgLy8ga2VlcCBidXR0b24gdmlzaWJsZSB3aGVuIGNoZWNrYm94IGlzIHNlbGVjdGVkIHdoaWxlIGl0cyBjaGlsZHJlbiBhcmUgbm90XG4gICAgICAgICAgICB0aGlzLmZpbGVTeXN0ZW1CdXR0b25WaXNpYmlsaXR5W2NoZWNrYm94LmlkXSA9IGNoZWNrYm94LmlzU2VsZWN0ZWQgJiYgY2hpbGRyZW4uZXZlcnkoY2hpbGQgPT4gIWNoaWxkLmlzU2VsZWN0ZWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb21wdXRlQ2hlY2tib3hTaXplcygpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBGSVhNRSBjaGVja2JveCBzaXplIHdyb25nIGFmdGVyIHNlbGVjdGluZyBhbGxcbiAgICAgICAgICAgIGlmICh0aGlzLl9iYWRnZVZpc2libGUgJiYgISF0aGlzLmNoZWNrYm94Q29tcG9uZW50cykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJhZGdlcyA9IHRoaXMuYmFkZ2VDb21wb25lbnRzIHx8IFtdIGFzIEJhZGdlQ29tcG9uZW50W107XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja2JveENvbXBvbmVudHMuZm9yRWFjaChjaGVja2JveENvbXBvbmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkID0gY2hlY2tib3hDb21wb25lbnQuaWQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrYm94ID0gdGhpcy5fY2hlY2tib3hlcy5maW5kKGl0ZW0gPT4gaXRlbS5pZCA9PT0gaWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoISFjaGVja2JveCAmJiAhIWNoZWNrYm94LnRvdGFsQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhZGdlID0gYmFkZ2VzLmZpbmQoYiA9PiBiLmlkID09PSBpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISFiYWRnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhZGdlV2lkdGggPSBiYWRnZS5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXh0cmFXaWR0aCA9IHRoaXMubW9kZSA9PT0gQ2hlY2tib3hUcmVlTW9kZS5maWxlU3lzdGVtID8gYmFkZ2VXaWR0aCArIDEyNCA6IGJhZGdlV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hDb21wb25lbnQuc2V0TGFiZWxNYXhXaWR0aChleHRyYVdpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxMDApO1xuICAgIH1cbn1cbiJdfQ==