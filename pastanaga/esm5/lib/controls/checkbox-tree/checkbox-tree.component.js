import { __assign, __decorate, __metadata, __values } from "tslib";
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
var nextId = 0;
export var CheckboxTreeMode;
(function (CheckboxTreeMode) {
    CheckboxTreeMode["categorized"] = "categorized";
    CheckboxTreeMode["nested"] = "nested";
    CheckboxTreeMode["fileSystem"] = "fileSystem";
})(CheckboxTreeMode || (CheckboxTreeMode = {}));
var CheckboxTreeComponent = /** @class */ (function () {
    function CheckboxTreeComponent(translate, cdr) {
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
    CheckboxTreeComponent_1 = CheckboxTreeComponent;
    Object.defineProperty(CheckboxTreeComponent.prototype, "disabled", {
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxTreeComponent.prototype, "shouldSort", {
        set: function (value) { this._shouldSort = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxTreeComponent.prototype, "badgeVisible", {
        set: function (value) { this._badgeVisible = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxTreeComponent.prototype, "selectAllVisible", {
        set: function (value) { this._selectAllVisible = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxTreeComponent.prototype, "countVisible", {
        set: function (value) {
            this._countVisible = coerceBooleanProperty(value);
            this.updateSelectionCount();
        },
        enumerable: true,
        configurable: true
    });
    CheckboxTreeComponent.prototype.ngOnInit = function () {
        this.id = !this.id ? "fieldset-checkbox-tree-" + nextId++ : this.id + "-checkbox-tree";
    };
    CheckboxTreeComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.getChildren) {
            this.isAsync = typeof this.getChildren === 'function';
        }
        if (changes.checkboxes && !!changes.checkboxes.currentValue) {
            var translatedCheckboxes = changes.checkboxes.currentValue.map(function (checkbox) { return new ControlModel(__assign(__assign({}, checkbox), { label: _this.translate.transform(checkbox.label || ''), selectedChildren: _this.getSelectedChildrenCount(checkbox) })); });
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
    };
    CheckboxTreeComponent.prototype.writeValue = function (value) {
        if (!!this._checkboxes) {
            this._checkboxes = this._checkboxes.map(function (checkbox) { return new ControlModel(__assign(__assign({}, checkbox), { isSelected: value === checkbox.value })); });
        }
    };
    CheckboxTreeComponent.prototype.registerOnTouched = function (handler) {
        this.onTouched = handler;
    };
    CheckboxTreeComponent.prototype.registerOnChange = function (handler) {
        this.onChange = handler;
    };
    CheckboxTreeComponent.prototype.toggleSelectAll = function () {
        var _this = this;
        this.isAllSelected = !this.isAllSelected;
        this._checkboxes = this._checkboxes.map(function (checkbox) {
            var updatedCheckbox = new ControlModel(__assign(__assign({}, checkbox), { isSelected: checkbox.isDisabled ? checkbox.isSelected : _this.isAllSelected, isIndeterminate: false, children: _this.getUpdatedChildrenSelection(_this.isAllSelected, checkbox) }));
            updatedCheckbox.selectedChildren = _this.getSelectedChildrenCount(updatedCheckbox);
            return updatedCheckbox;
        });
        this.updateSelectionCount();
        this.emitSelectionChanged();
    };
    CheckboxTreeComponent.prototype.toggleSelection = function (isSelected, checkbox) {
        checkbox.isSelected = isSelected;
        // when file system, we automatically select children, but we don't automatically unselect them
        var shouldUpdateChildren = !!checkbox.children && (isSelected || this.mode !== CheckboxTreeMode.fileSystem);
        if (shouldUpdateChildren) {
            checkbox.children = this.getUpdatedChildrenSelection(isSelected, checkbox);
            checkbox.selectedChildren = this.getSelectedChildrenCount(checkbox);
            markForCheck(this.cdr);
        }
        checkbox.isIndeterminate = this.mode !== CheckboxTreeMode.fileSystem ? false : this.getIndeterminateForFileSystem(checkbox);
        this.updateAllSelected();
        this.emitSelectionChanged();
    };
    CheckboxTreeComponent.prototype.toggleChildrenSelection = function (checkbox) {
        var isSelected = (checkbox.selectedChildren || 0) < (checkbox.totalChildren || 0);
        checkbox.children = this.getUpdatedChildrenSelection(isSelected, checkbox);
        checkbox.selectedChildren = this.getSelectedChildrenCount(checkbox);
        checkbox.isIndeterminate = this.getIndeterminateForFileSystem(checkbox);
        markForCheck(this.cdr);
        this.emitSelectionChanged();
        this.childrenSelection.emit({ parentId: checkbox.id, isSelected: isSelected });
    };
    CheckboxTreeComponent.prototype.getUpdatedChildrenSelection = function (isSelected, checkbox) {
        var _this = this;
        if (!!checkbox.children) {
            return checkbox.children.map(function (child) {
                if (!!child.children) {
                    child.children = _this.getUpdatedChildrenSelection(isSelected, child);
                    child.selectedChildren = _this.getSelectedChildrenCount(child);
                }
                return new ControlModel(__assign(__assign({}, child), { isSelected: isSelected, isIndeterminate: false }));
            });
        }
    };
    CheckboxTreeComponent.prototype.setParentState = function (childrenTree, parent) {
        // copy children state without changing object ref to prevent having an infinite loop of children/parent change detection
        if (!!parent.children) {
            parent.children.forEach(function (child, i) {
                if (!!parent.children && childrenTree[i]) {
                    parent.children[i] = new ControlModel(__assign({}, childrenTree[i]));
                }
            });
        }
        if (this.mode === CheckboxTreeMode.fileSystem) {
            parent.isIndeterminate = this.getIndeterminateForFileSystem(parent);
        }
        else {
            if (childrenTree.every(function (child) { return child.isSelected && !child.isIndeterminate; })) {
                parent.isSelected = true;
                parent.isIndeterminate = false;
            }
            else {
                parent.isIndeterminate = childrenTree.some(function (child) { return child.isSelected || child.isIndeterminate; });
                if (parent.isIndeterminate || childrenTree.every(function (child) { return !child.isSelected; })) {
                    parent.isSelected = false;
                }
            }
        }
        parent.selectedChildren = this.getSelectedChildrenCount(parent);
        this.updateAllSelected();
        this.emitSelectionChanged();
        markForCheck(this.cdr);
    };
    CheckboxTreeComponent.prototype.getIndeterminateForFileSystem = function (parent) {
        var children = parent.children || [];
        var allChildrenSelected = children.every(function (child) { return child.isSelected; });
        var allChildrenUnSelected = children.every(function (child) { return !child.isSelected; });
        return children.some(function (child) { return child.isIndeterminate; })
            || (parent.isSelected && !allChildrenSelected && !allChildrenUnSelected)
            || (!parent.isSelected && children.some(function (child) { return child.isSelected; }));
    };
    CheckboxTreeComponent.prototype.toggleCheckbox = function (checkbox) {
        checkbox.isExpanded = !checkbox.isExpanded;
        this.updatedTree.emit(this._checkboxes);
        markForCheck(this.cdr);
    };
    CheckboxTreeComponent.prototype.getSelectedChildrenCount = function (checkbox) {
        return !!checkbox.children ? checkbox.children.filter(function (child) { return child.isSelected; }).length : 0;
    };
    CheckboxTreeComponent.prototype.updateSelectionCount = function () {
        if (this._countVisible && !!this._checkboxes) {
            this.totalCount = 0;
            this.totalSelected = 0;
            this.countThemAll(this._checkboxes);
            markForCheck(this.cdr);
        }
    };
    CheckboxTreeComponent.prototype.countThemAll = function (controls) {
        var _this = this;
        this.totalCount += controls.length;
        this.totalSelected += controls.filter(function (control) { return !!control.isSelected; }).length;
        controls.forEach(function (control) {
            if (control.children) {
                _this.countThemAll(control.children);
            }
        });
    };
    CheckboxTreeComponent.prototype.emitSelectionChanged = function () {
        this.selection.emit(this.getSelectedValues());
        this.allSelected.emit(this.isAllSelected);
        this.updatedTree.emit(this._checkboxes);
    };
    CheckboxTreeComponent.prototype.getSelectedValues = function () {
        var _this = this;
        var selectedValues = [];
        if (!!this._checkboxes) {
            this._checkboxes.forEach(function (checkbox) { return _this.updateSelectedValues(checkbox, selectedValues); });
        }
        return selectedValues;
    };
    CheckboxTreeComponent.prototype.updateSelectedValues = function (checkbox, selectedValues) {
        var _this = this;
        // by default selection contains only leaf (categorized tree)
        // if nested or fileSystem tree, selection contains all selected nodes
        var isCategorized = this.mode === CheckboxTreeMode.categorized;
        if (checkbox.isSelected && (!isCategorized || !checkbox.children || checkbox.children.length === 0)) {
            selectedValues.push(getCheckboxValue(checkbox));
        }
        if (!!checkbox.children) {
            checkbox.children.forEach(function (child) { return _this.updateSelectedValues(child, selectedValues); });
        }
    };
    CheckboxTreeComponent.prototype.updateAllSelected = function () {
        var _this = this;
        if (!this._isChildren && !!this._checkboxes) {
            this.isAllSelected = this._checkboxes.every(function (checkbox) { return _this.areAllChildrenSelected(checkbox); });
        }
        this.updateSelectionCount();
    };
    CheckboxTreeComponent.prototype.areAllChildrenSelected = function (checkbox) {
        var _this = this;
        return !checkbox.children ? checkbox.isSelected : checkbox.isSelected &&
            checkbox.children.every(function (child) { return _this.areAllChildrenSelected(child); });
    };
    CheckboxTreeComponent.prototype.loadChildren = function () {
        var e_1, _a;
        var _this = this;
        if (this.isAsync && !!this.getChildren && !this._isLoadingChildren) {
            this._isLoadingChildren = true;
            this.isLoadingChildren.emit(this._isLoadingChildren);
            var requests = [];
            var _loop_1 = function (checkbox) {
                if (!!checkbox.children) {
                    return "continue";
                }
                requests.push(this_1.getChildren(checkbox).pipe(tap(function (children) {
                    var selectedChildren = 0;
                    checkbox.children = children.map(function (child) {
                        var updatedChild = new ControlModel(__assign(__assign({}, child), { label: _this.translate.transform(child.label || ''), isSelected: checkbox.isSelected }));
                        if (updatedChild.isSelected) {
                            selectedChildren++;
                        }
                        return updatedChild;
                    });
                    checkbox.totalChildren = children.length;
                    checkbox.selectedChildren = selectedChildren;
                    markForCheck(_this.cdr);
                })));
            };
            var this_1 = this;
            try {
                for (var _b = __values(this._checkboxes), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var checkbox = _c.value;
                    _loop_1(checkbox);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (requests.length === 0) {
                this._isLoadingChildren = false;
                this.isLoadingChildren.emit(this._isLoadingChildren);
            }
            else {
                forkJoin(requests).subscribe(function () {
                    markForCheck(_this.cdr);
                    _this.emitSelectionChanged();
                    _this._isLoadingChildren = false;
                    _this.isLoadingChildren.emit(_this._isLoadingChildren);
                });
            }
        }
        this.updateSelectionCount();
    };
    CheckboxTreeComponent.prototype.onMouseOver = function (checkbox) {
        if (this.mode === CheckboxTreeMode.fileSystem) {
            this.fileSystemButtonVisibility[checkbox.id] = true;
        }
    };
    CheckboxTreeComponent.prototype.onMouseLeave = function (checkbox) {
        if (this.mode === CheckboxTreeMode.fileSystem) {
            var children = checkbox.children || [];
            // keep button visible when checkbox is selected while its children are not
            this.fileSystemButtonVisibility[checkbox.id] = checkbox.isSelected && children.every(function (child) { return !child.isSelected; });
        }
    };
    CheckboxTreeComponent.prototype.computeCheckboxSizes = function () {
        var _this = this;
        setTimeout(function () {
            // FIXME checkbox size wrong after selecting all
            if (_this._badgeVisible && !!_this.checkboxComponents) {
                var badges_1 = _this.badgeComponents || [];
                _this.checkboxComponents.forEach(function (checkboxComponent) {
                    var id = checkboxComponent.id;
                    var checkbox = _this._checkboxes.find(function (item) { return item.id === id; });
                    if (!!checkbox && !!checkbox.totalChildren) {
                        var badge = badges_1.find(function (b) { return b.id === id; });
                        if (!!badge) {
                            var badgeWidth = badge.elementRef.nativeElement.getBoundingClientRect().width;
                            var extraWidth = _this.mode === CheckboxTreeMode.fileSystem ? badgeWidth + 124 : badgeWidth;
                            checkboxComponent.setLabelMaxWidth(extraWidth);
                        }
                    }
                });
            }
        }, 100);
    };
    var CheckboxTreeComponent_1;
    CheckboxTreeComponent.ctorParameters = function () { return [
        { type: TranslatePipe },
        { type: ChangeDetectorRef }
    ]; };
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
                    useExisting: forwardRef(function () { return CheckboxTreeComponent_1; }),
                    multi: true,
                }],
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [":host{display:block}:host legend pa-badge{display:inline-block;position:relative;top:.375rem;left:.75rem}:host .pa-field-group{position:relative}:host .pa-field-group ::ng-deep pa-button.pa-expand{display:inherit}:host .pa-field-group ::ng-deep pa-button.pa-expand .pa-button{float:left;margin:-.375rem -2.25rem;-webkit-transform:rotate(0);transform:rotate(0)}:host .pa-field-group ::ng-deep pa-button.pa-expand .pa-button[aria-expanded=true]{-webkit-transform:rotate(90deg);transform:rotate(90deg)}:host .pa-field-group pa-checkbox.pa-checkbox-expanded ::ng-deep .pa-field,:host .pa-field-group>::ng-deep .pa-field-sublist:not(:last-child),:host .pa-field-group>::ng-deep pa-checkbox:not(:last-child) .pa-field{margin-bottom:0}:host .pa-field-group pa-checkbox ::ng-deep .pa-field-checkbox{display:inline-block}:host .pa-field-group .pa-children-selection-button{position:relative;margin:0 .375rem;top:-1px}:host .pa-field-group output{position:absolute;right:-.75rem;top:0}:host .pa-field-sublist{margin-left:30px;padding:0;list-style:none;display:block}:host .pa-field-group:not(:last-child) ::ng-deep pa-checkbox .pa-field.pa-field-checkbox{margin-bottom:0}:host .pa-field-sublist[aria-hidden=true]{display:none}:host .pa-select-all{width:calc(100% - 84px)}"]
        }),
        __metadata("design:paramtypes", [TranslatePipe,
            ChangeDetectorRef])
    ], CheckboxTreeComponent);
    return CheckboxTreeComponent;
}());
export { CheckboxTreeComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtdHJlZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ3VpbGxvdGluYXdlYi9wYXN0YW5hZ2EtYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi9jb250cm9scy9jaGVja2JveC10cmVlL2NoZWNrYm94LXRyZWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFDTixNQUFNLEVBQ04sdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFDdkUsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2hELE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDL0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsUUFBUSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFckUsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBRWYsTUFBTSxDQUFOLElBQVksZ0JBSVg7QUFKRCxXQUFZLGdCQUFnQjtJQUN4QiwrQ0FBMkIsQ0FBQTtJQUMzQixxQ0FB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K0Q7SUFDOUY7UUFBVCxNQUFNLEVBQUU7a0NBQWMsWUFBWTs4REFBK0I7SUFDeEQ7UUFBVCxNQUFNLEVBQUU7a0NBQWMsWUFBWTs4REFBc0Q7SUFDL0U7UUFBVCxNQUFNLEVBQUU7a0NBQW9CLFlBQVk7b0VBQXdDO0lBRWhEO1FBQWhDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQztrQ0FBc0IsU0FBUztxRUFBb0I7SUFDckQ7UUFBN0IsWUFBWSxDQUFDLGNBQWMsQ0FBQztrQ0FBbUIsU0FBUztrRUFBaUI7SUExQ2pFLHFCQUFxQjtRQVhqQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLG02SUFBNkM7WUFFN0MsU0FBUyxFQUFFLENBQUM7b0JBQ1IsT0FBTyxFQUFFLGlCQUFpQjtvQkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsdUJBQXFCLEVBQXJCLENBQXFCLENBQUM7b0JBQ3BELEtBQUssRUFBRSxJQUFJO2lCQUNkLENBQUM7WUFDRixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7U0FDbEQsQ0FBQzt5Q0FrRXlCLGFBQWE7WUFDbkIsaUJBQWlCO09BbEV6QixxQkFBcUIsQ0E4VmpDO0lBQUQsNEJBQUM7Q0FBQSxBQTlWRCxJQThWQztTQTlWWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbnB1dCxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLCBWaWV3Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbE1vZGVsIH0gZnJvbSAnLi4vY29udHJvbC5tb2RlbCc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBUcmFuc2xhdGVQaXBlIH0gZnJvbSAnLi4vLi4vdHJhbnNsYXRlL3RyYW5zbGF0ZS5waXBlJztcbmltcG9ydCB7IG1hcmtGb3JDaGVjayB9IGZyb20gJy4uLy4uL2NvbW1vbi91dGlscyc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgQ2hlY2tib3hDb21wb25lbnQgfSBmcm9tICcuLi9jaGVja2JveC9jaGVja2JveC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQmFkZ2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi9iYWRnZS9iYWRnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgZm9ya0pvaW4sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGdldENoZWNrYm94VmFsdWUsIHNvcnRDaGVja2JveGVzIH0gZnJvbSAnLi4vY2hlY2tib3gudXRpbHMnO1xuXG5sZXQgbmV4dElkID0gMDtcblxuZXhwb3J0IGVudW0gQ2hlY2tib3hUcmVlTW9kZSB7XG4gICAgY2F0ZWdvcml6ZWQgPSAnY2F0ZWdvcml6ZWQnLFxuICAgIG5lc3RlZCA9ICduZXN0ZWQnLFxuICAgIGZpbGVTeXN0ZW0gPSAnZmlsZVN5c3RlbScsXG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncGEtY2hlY2tib3gtdHJlZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NoZWNrYm94LXRyZWUuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2NoZWNrYm94LXRyZWUuY29tcG9uZW50LnNjc3MnXSxcbiAgICBwcm92aWRlcnM6IFt7XG4gICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBDaGVja2JveFRyZWVDb21wb25lbnQpLFxuICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9XSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tib3hUcmVlQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoKSBpZD86IHN0cmluZztcbiAgICBASW5wdXQoKSBjaGVja2JveGVzPzogQ29udHJvbE1vZGVsW107XG4gICAgQElucHV0KCkgZ2V0Q2hpbGRyZW4/OiAoY29udHJvbDogQ29udHJvbE1vZGVsKSA9PiBPYnNlcnZhYmxlPENvbnRyb2xNb2RlbFtdPjtcbiAgICBASW5wdXQoKSBkb0xvYWRDaGlsZHJlbiA9IHRydWU7XG4gICAgQElucHV0KCkgc2V0IGRpc2FibGVkKHZhbHVlKSB7IHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICAgIEBJbnB1dCgpIHNldCBzaG91bGRTb3J0KHZhbHVlKSB7IHRoaXMuX3Nob3VsZFNvcnQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gICAgQElucHV0KCkgc2V0IGJhZGdlVmlzaWJsZSh2YWx1ZSkgeyB0aGlzLl9iYWRnZVZpc2libGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gICAgQElucHV0KCkgc2V0IHNlbGVjdEFsbFZpc2libGUodmFsdWUpIHsgdGhpcy5fc2VsZWN0QWxsVmlzaWJsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgICBASW5wdXQoKSBzZXQgY291bnRWaXNpYmxlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2NvdW50VmlzaWJsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0aW9uQ291bnQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb2RlIGRlZmluZWQgY2hlY2tib3ggdHJlZSBnbG9iYWwgYmVoYXZpb3VyOlxuICAgICAqIC0gY2F0ZWdvcml6ZWQgKGRlZmF1bHQpOlxuICAgICAqICAgLSBlbWl0dGVkIHNlbGVjdGlvbiBjb250YWlucyBvbmx5IHNlbGVjdGVkIGxlYWZcbiAgICAgKiAgIC0gc2VsZWN0aW5nIGEgcGFyZW50IGF1dG9tYXRpY2FsbHkgc2VsZWN0IGl0cyBjaGlsZHJlblxuICAgICAqICAgLSBzZWxlY3RpbmcgYWxsIGNoaWxkcmVuIGF1dG9tYXRpY2FsbHkgc2VsZWN0IHRoZSBwYXJlbnRcbiAgICAgKiAtIG5lc3RlZDpcbiAgICAgKiAgIC0gZW1pdHRlZCBzZWxlY3Rpb24gY29udGFpbnMgYWxsIHNlbGVjdGVkIG5vZGVzXG4gICAgICogICAtIHNlbGVjdGluZyBhIHBhcmVudCBhdXRvbWF0aWNhbGx5IHNlbGVjdCBpdHMgY2hpbGRyZW5cbiAgICAgKiAgIC0gc2VsZWN0aW5nIGFsbCBjaGlsZHJlbiBhdXRvbWF0aWNhbGx5IHNlbGVjdCB0aGUgcGFyZW50XG4gICAgICogLSBmaWxlU3lzdGVtOiBhIHBhcmVudCBjYW4gaGF2ZSBzb21lIGlubmVyIGNvbnRlbnQgKGxpa2UgYSBmb2xkZXIgY2FuIGNvbnRhaW4gc3ViLWZvbGRlcnMgYnV0IGFsc28gc29tZSBmaWxlcylcbiAgICAgKiAgIC0gZW1pdHRlZCBzZWxlY3Rpb24gY29udGFpbnMgYWxsIHNlbGVjdGVkIG5vZGVzXG4gICAgICogICAtIHNlbGVjdGluZyBhIHBhcmVudCBkb2VzIG5vdCBzZWxlY3QgaXRzIGNoaWxkcmVuXG4gICAgICogICAtIHNlbGVjdGluZyBhbGwgY2hpbGRyZW4gZG9lcyBub3Qgc2VsZWN0IHRoZSBwYXJlbnRcbiAgICAgKiAgIC0gYSBidXR0b24gYWxsb3cgdG8gc2VsZWN0L3Vuc2VsZWN0IGFsbCBkaXJlY3QgY2hpbGRyZW4gb2Ygbm9kZVxuICAgICAqL1xuICAgIEBJbnB1dCgpIG1vZGU6IENoZWNrYm94VHJlZU1vZGUgPSBDaGVja2JveFRyZWVNb2RlLmNhdGVnb3JpemVkO1xuXG4gICAgLy8gbm90IG1lYW50IHRvIGJlIHVzZWQgb3V0c2lkZVxuICAgIEBJbnB1dCgpIF9pc0NoaWxkcmVuID0gZmFsc2U7XG5cbiAgICBAT3V0cHV0KCkgc2VsZWN0aW9uOiBFdmVudEVtaXR0ZXI8c3RyaW5nW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBjaGlsZHJlblNlbGVjdGlvbjogRXZlbnRFbWl0dGVyPHtwYXJlbnRJZDogc3RyaW5nLCBpc1NlbGVjdGVkOiBib29sZWFufT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIGFsbFNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHVwZGF0ZWRUcmVlOiBFdmVudEVtaXR0ZXI8Q29udHJvbE1vZGVsW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxDb250cm9sTW9kZWxbXT4oKTtcbiAgICBAT3V0cHV0KCkgaXNMb2FkaW5nQ2hpbGRyZW46IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIEBWaWV3Q2hpbGRyZW4oQ2hlY2tib3hDb21wb25lbnQpIGNoZWNrYm94Q29tcG9uZW50cz86IFF1ZXJ5TGlzdDxDaGVja2JveENvbXBvbmVudD47XG4gICAgQFZpZXdDaGlsZHJlbihCYWRnZUNvbXBvbmVudCkgYmFkZ2VDb21wb25lbnRzPzogUXVlcnlMaXN0PEJhZGdlQ29tcG9uZW50PjtcblxuICAgIF9jaGVja2JveGVzOiBDb250cm9sTW9kZWxbXSA9IFtdO1xuICAgIF9zaG91bGRTb3J0ID0gdHJ1ZTtcbiAgICBfYmFkZ2VWaXNpYmxlID0gdHJ1ZTtcbiAgICBfc2VsZWN0QWxsVmlzaWJsZSA9IHRydWU7XG4gICAgX2NvdW50VmlzaWJsZSA9IGZhbHNlO1xuICAgIF9kaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgb25DaGFuZ2U6IGFueTtcbiAgICBvblRvdWNoZWQ6IGFueTtcblxuICAgIG1vZGVzID0gQ2hlY2tib3hUcmVlTW9kZTtcbiAgICBpc0FsbFNlbGVjdGVkID0gZmFsc2U7XG4gICAgaXNBc3luYyA9IGZhbHNlO1xuICAgIHRvdGFsQ291bnQgPSAwO1xuICAgIHRvdGFsU2VsZWN0ZWQgPSAwO1xuXG4gICAgZmlsZVN5c3RlbUJ1dHRvblZpc2liaWxpdHk6IHtbY2hlY2tib3hJZDogc3RyaW5nXTogYm9vbGVhbn0gPSB7fTtcbiAgICBfaXNMb2FkaW5nQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICBfZGlzYWJsZVRvZ2dsZUNoaWxkcmVuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVBpcGUsXG4gICAgICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZlxuICAgICkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmlkID0gIXRoaXMuaWQgPyBgZmllbGRzZXQtY2hlY2tib3gtdHJlZS0ke25leHRJZCsrfWAgOiBgJHt0aGlzLmlkfS1jaGVja2JveC10cmVlYDtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgIGlmIChjaGFuZ2VzLmdldENoaWxkcmVuKSB7XG4gICAgICAgICAgICB0aGlzLmlzQXN5bmMgPSB0eXBlb2YgdGhpcy5nZXRDaGlsZHJlbiA9PT0gJ2Z1bmN0aW9uJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGFuZ2VzLmNoZWNrYm94ZXMgJiYgISFjaGFuZ2VzLmNoZWNrYm94ZXMuY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCB0cmFuc2xhdGVkQ2hlY2tib3hlcyA9IGNoYW5nZXMuY2hlY2tib3hlcy5jdXJyZW50VmFsdWUubWFwKGNoZWNrYm94ID0+IG5ldyBDb250cm9sTW9kZWwoe1xuICAgICAgICAgICAgICAgIC4uLmNoZWNrYm94LFxuICAgICAgICAgICAgICAgIGxhYmVsOiB0aGlzLnRyYW5zbGF0ZS50cmFuc2Zvcm0oY2hlY2tib3gubGFiZWwgfHwgJycpLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ2hpbGRyZW46IHRoaXMuZ2V0U2VsZWN0ZWRDaGlsZHJlbkNvdW50KGNoZWNrYm94KSxcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrYm94ZXMgPSB0aGlzLl9zaG91bGRTb3J0ID8gc29ydENoZWNrYm94ZXModHJhbnNsYXRlZENoZWNrYm94ZXMpIDogdHJhbnNsYXRlZENoZWNrYm94ZXM7XG4gICAgICAgICAgICBpZiAodGhpcy5kb0xvYWRDaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZENoaWxkcmVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGlvbkNvdW50KCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUFsbFNlbGVjdGVkKCk7XG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVDaGVja2JveFNpemVzKCk7XG4gICAgICAgICAgICB0aGlzLmVtaXRTZWxlY3Rpb25DaGFuZ2VkKCk7XG4gICAgICAgICAgICBtYXJrRm9yQ2hlY2sodGhpcy5jZHIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoYW5nZXMuZG9Mb2FkQ2hpbGRyZW4gJiYgY2hhbmdlcy5kb0xvYWRDaGlsZHJlbi5jdXJyZW50VmFsdWUgPT09IHRydWUgJiYgIWNoYW5nZXMuZG9Mb2FkQ2hpbGRyZW4ucHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5sb2FkQ2hpbGRyZW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICBpZiAoISF0aGlzLl9jaGVja2JveGVzKSB7XG4gICAgICAgICAgICB0aGlzLl9jaGVja2JveGVzID0gdGhpcy5fY2hlY2tib3hlcy5tYXAoY2hlY2tib3ggPT4gbmV3IENvbnRyb2xNb2RlbCh7Li4uY2hlY2tib3gsIGlzU2VsZWN0ZWQ6IHZhbHVlID09PSBjaGVja2JveC52YWx1ZX0pKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGhhbmRsZXI6IGFueSkge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGhhbmRsZXI7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShoYW5kbGVyOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGhhbmRsZXI7XG4gICAgfVxuXG4gICAgdG9nZ2xlU2VsZWN0QWxsKCkge1xuICAgICAgICB0aGlzLmlzQWxsU2VsZWN0ZWQgPSAhdGhpcy5pc0FsbFNlbGVjdGVkO1xuICAgICAgICB0aGlzLl9jaGVja2JveGVzID0gdGhpcy5fY2hlY2tib3hlcy5tYXAoIGNoZWNrYm94ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRDaGVja2JveCA9IG5ldyBDb250cm9sTW9kZWwoe1xuICAgICAgICAgICAgICAgIC4uLmNoZWNrYm94LFxuICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQ6IGNoZWNrYm94LmlzRGlzYWJsZWQgPyBjaGVja2JveC5pc1NlbGVjdGVkIDogdGhpcy5pc0FsbFNlbGVjdGVkLFxuICAgICAgICAgICAgICAgIGlzSW5kZXRlcm1pbmF0ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IHRoaXMuZ2V0VXBkYXRlZENoaWxkcmVuU2VsZWN0aW9uKHRoaXMuaXNBbGxTZWxlY3RlZCwgY2hlY2tib3gpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB1cGRhdGVkQ2hlY2tib3guc2VsZWN0ZWRDaGlsZHJlbiA9IHRoaXMuZ2V0U2VsZWN0ZWRDaGlsZHJlbkNvdW50KHVwZGF0ZWRDaGVja2JveCk7XG4gICAgICAgICAgICByZXR1cm4gdXBkYXRlZENoZWNrYm94O1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3Rpb25Db3VudCgpO1xuICAgICAgICB0aGlzLmVtaXRTZWxlY3Rpb25DaGFuZ2VkKCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlU2VsZWN0aW9uKGlzU2VsZWN0ZWQ6IGJvb2xlYW4sIGNoZWNrYm94OiBDb250cm9sTW9kZWwpIHtcbiAgICAgICAgY2hlY2tib3guaXNTZWxlY3RlZCA9IGlzU2VsZWN0ZWQ7XG4gICAgICAgIC8vIHdoZW4gZmlsZSBzeXN0ZW0sIHdlIGF1dG9tYXRpY2FsbHkgc2VsZWN0IGNoaWxkcmVuLCBidXQgd2UgZG9uJ3QgYXV0b21hdGljYWxseSB1bnNlbGVjdCB0aGVtXG4gICAgICAgIGNvbnN0IHNob3VsZFVwZGF0ZUNoaWxkcmVuID0gISFjaGVja2JveC5jaGlsZHJlbiAmJiAoaXNTZWxlY3RlZCB8fCB0aGlzLm1vZGUgIT09IENoZWNrYm94VHJlZU1vZGUuZmlsZVN5c3RlbSk7XG4gICAgICAgIGlmIChzaG91bGRVcGRhdGVDaGlsZHJlbikge1xuICAgICAgICAgICAgY2hlY2tib3guY2hpbGRyZW4gPSB0aGlzLmdldFVwZGF0ZWRDaGlsZHJlblNlbGVjdGlvbihpc1NlbGVjdGVkLCBjaGVja2JveCk7XG4gICAgICAgICAgICBjaGVja2JveC5zZWxlY3RlZENoaWxkcmVuID0gdGhpcy5nZXRTZWxlY3RlZENoaWxkcmVuQ291bnQoY2hlY2tib3gpO1xuICAgICAgICAgICAgbWFya0ZvckNoZWNrKHRoaXMuY2RyKTtcbiAgICAgICAgfVxuICAgICAgICBjaGVja2JveC5pc0luZGV0ZXJtaW5hdGUgPSB0aGlzLm1vZGUgIT09IENoZWNrYm94VHJlZU1vZGUuZmlsZVN5c3RlbSA/IGZhbHNlIDogdGhpcy5nZXRJbmRldGVybWluYXRlRm9yRmlsZVN5c3RlbShjaGVja2JveCk7XG4gICAgICAgIHRoaXMudXBkYXRlQWxsU2VsZWN0ZWQoKTtcbiAgICAgICAgdGhpcy5lbWl0U2VsZWN0aW9uQ2hhbmdlZCgpO1xuICAgIH1cblxuICAgIHRvZ2dsZUNoaWxkcmVuU2VsZWN0aW9uKGNoZWNrYm94OiBDb250cm9sTW9kZWwpIHtcbiAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IChjaGVja2JveC5zZWxlY3RlZENoaWxkcmVuIHx8IDApIDwgKGNoZWNrYm94LnRvdGFsQ2hpbGRyZW4gfHwgMCk7XG4gICAgICAgIGNoZWNrYm94LmNoaWxkcmVuID0gdGhpcy5nZXRVcGRhdGVkQ2hpbGRyZW5TZWxlY3Rpb24oaXNTZWxlY3RlZCwgY2hlY2tib3gpO1xuICAgICAgICBjaGVja2JveC5zZWxlY3RlZENoaWxkcmVuID0gdGhpcy5nZXRTZWxlY3RlZENoaWxkcmVuQ291bnQoY2hlY2tib3gpO1xuICAgICAgICBjaGVja2JveC5pc0luZGV0ZXJtaW5hdGUgPSB0aGlzLmdldEluZGV0ZXJtaW5hdGVGb3JGaWxlU3lzdGVtKGNoZWNrYm94KTtcbiAgICAgICAgbWFya0ZvckNoZWNrKHRoaXMuY2RyKTtcbiAgICAgICAgdGhpcy5lbWl0U2VsZWN0aW9uQ2hhbmdlZCgpO1xuICAgICAgICB0aGlzLmNoaWxkcmVuU2VsZWN0aW9uLmVtaXQoe3BhcmVudElkOiBjaGVja2JveC5pZCwgaXNTZWxlY3RlZH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0VXBkYXRlZENoaWxkcmVuU2VsZWN0aW9uKGlzU2VsZWN0ZWQ6IGJvb2xlYW4sIGNoZWNrYm94OiBDb250cm9sTW9kZWwpOiBDb250cm9sTW9kZWxbXSB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmICghIWNoZWNrYm94LmNoaWxkcmVuKSB7XG4gICAgICAgICAgICByZXR1cm4gY2hlY2tib3guY2hpbGRyZW4ubWFwKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoISFjaGlsZC5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5jaGlsZHJlbiA9IHRoaXMuZ2V0VXBkYXRlZENoaWxkcmVuU2VsZWN0aW9uKGlzU2VsZWN0ZWQsIGNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuc2VsZWN0ZWRDaGlsZHJlbiA9IHRoaXMuZ2V0U2VsZWN0ZWRDaGlsZHJlbkNvdW50KGNoaWxkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb250cm9sTW9kZWwoey4uLmNoaWxkLCBpc1NlbGVjdGVkLCBpc0luZGV0ZXJtaW5hdGU6IGZhbHNlfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFBhcmVudFN0YXRlKGNoaWxkcmVuVHJlZTogQ29udHJvbE1vZGVsW10sIHBhcmVudDogQ29udHJvbE1vZGVsKSB7XG4gICAgICAgIC8vIGNvcHkgY2hpbGRyZW4gc3RhdGUgd2l0aG91dCBjaGFuZ2luZyBvYmplY3QgcmVmIHRvIHByZXZlbnQgaGF2aW5nIGFuIGluZmluaXRlIGxvb3Agb2YgY2hpbGRyZW4vcGFyZW50IGNoYW5nZSBkZXRlY3Rpb25cbiAgICAgICAgaWYgKCEhcGFyZW50LmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBwYXJlbnQuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoISFwYXJlbnQuY2hpbGRyZW4gJiYgY2hpbGRyZW5UcmVlW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbltpXSA9IG5ldyBDb250cm9sTW9kZWwoey4uLmNoaWxkcmVuVHJlZVtpXX0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm1vZGUgPT09IENoZWNrYm94VHJlZU1vZGUuZmlsZVN5c3RlbSkge1xuICAgICAgICAgICAgcGFyZW50LmlzSW5kZXRlcm1pbmF0ZSA9IHRoaXMuZ2V0SW5kZXRlcm1pbmF0ZUZvckZpbGVTeXN0ZW0ocGFyZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjaGlsZHJlblRyZWUuZXZlcnkoY2hpbGQgPT4gY2hpbGQuaXNTZWxlY3RlZCAmJiAhY2hpbGQuaXNJbmRldGVybWluYXRlKSkge1xuICAgICAgICAgICAgICAgIHBhcmVudC5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBwYXJlbnQuaXNJbmRldGVybWluYXRlID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhcmVudC5pc0luZGV0ZXJtaW5hdGUgPSBjaGlsZHJlblRyZWUuc29tZShjaGlsZCA9PiBjaGlsZC5pc1NlbGVjdGVkIHx8IGNoaWxkLmlzSW5kZXRlcm1pbmF0ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudC5pc0luZGV0ZXJtaW5hdGUgfHwgY2hpbGRyZW5UcmVlLmV2ZXJ5KGNoaWxkID0+ICFjaGlsZC5pc1NlbGVjdGVkKSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnQuaXNTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwYXJlbnQuc2VsZWN0ZWRDaGlsZHJlbiA9IHRoaXMuZ2V0U2VsZWN0ZWRDaGlsZHJlbkNvdW50KHBhcmVudCk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVBbGxTZWxlY3RlZCgpO1xuICAgICAgICB0aGlzLmVtaXRTZWxlY3Rpb25DaGFuZ2VkKCk7XG4gICAgICAgIG1hcmtGb3JDaGVjayh0aGlzLmNkcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRJbmRldGVybWluYXRlRm9yRmlsZVN5c3RlbShwYXJlbnQ6IENvbnRyb2xNb2RlbCkge1xuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IHBhcmVudC5jaGlsZHJlbiB8fCBbXTtcbiAgICAgICAgY29uc3QgYWxsQ2hpbGRyZW5TZWxlY3RlZCA9IGNoaWxkcmVuLmV2ZXJ5KGNoaWxkID0+IGNoaWxkLmlzU2VsZWN0ZWQpO1xuICAgICAgICBjb25zdCBhbGxDaGlsZHJlblVuU2VsZWN0ZWQgPSBjaGlsZHJlbi5ldmVyeShjaGlsZCA9PiAhY2hpbGQuaXNTZWxlY3RlZCk7XG4gICAgICAgIHJldHVybiBjaGlsZHJlbi5zb21lKGNoaWxkID0+IGNoaWxkLmlzSW5kZXRlcm1pbmF0ZSlcbiAgICAgICAgICAgIHx8IChwYXJlbnQuaXNTZWxlY3RlZCAmJiAhYWxsQ2hpbGRyZW5TZWxlY3RlZCAmJiAhYWxsQ2hpbGRyZW5VblNlbGVjdGVkKVxuICAgICAgICAgICAgfHwgKCFwYXJlbnQuaXNTZWxlY3RlZCAmJiBjaGlsZHJlbi5zb21lKGNoaWxkID0+IGNoaWxkLmlzU2VsZWN0ZWQpKTtcbiAgICB9XG5cbiAgICB0b2dnbGVDaGVja2JveChjaGVja2JveDogQ29udHJvbE1vZGVsKSB7XG4gICAgICAgIGNoZWNrYm94LmlzRXhwYW5kZWQgPSAhY2hlY2tib3guaXNFeHBhbmRlZDtcbiAgICAgICAgdGhpcy51cGRhdGVkVHJlZS5lbWl0KHRoaXMuX2NoZWNrYm94ZXMpO1xuICAgICAgICBtYXJrRm9yQ2hlY2sodGhpcy5jZHIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0U2VsZWN0ZWRDaGlsZHJlbkNvdW50KGNoZWNrYm94OiBDb250cm9sTW9kZWwpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gISFjaGVja2JveC5jaGlsZHJlbiA/IGNoZWNrYm94LmNoaWxkcmVuLmZpbHRlcihjaGlsZCA9PiBjaGlsZC5pc1NlbGVjdGVkKS5sZW5ndGggOiAwO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlU2VsZWN0aW9uQ291bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9jb3VudFZpc2libGUgJiYgISF0aGlzLl9jaGVja2JveGVzKSB7XG4gICAgICAgICAgICB0aGlzLnRvdGFsQ291bnQgPSAwO1xuICAgICAgICAgICAgdGhpcy50b3RhbFNlbGVjdGVkID0gMDtcbiAgICAgICAgICAgIHRoaXMuY291bnRUaGVtQWxsKHRoaXMuX2NoZWNrYm94ZXMpO1xuICAgICAgICAgICAgbWFya0ZvckNoZWNrKHRoaXMuY2RyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY291bnRUaGVtQWxsKGNvbnRyb2xzOiBDb250cm9sTW9kZWxbXSkge1xuICAgICAgICB0aGlzLnRvdGFsQ291bnQgKz0gY29udHJvbHMubGVuZ3RoO1xuICAgICAgICB0aGlzLnRvdGFsU2VsZWN0ZWQgKz0gY29udHJvbHMuZmlsdGVyKGNvbnRyb2wgPT4gISFjb250cm9sLmlzU2VsZWN0ZWQpLmxlbmd0aDtcbiAgICAgICAgY29udHJvbHMuZm9yRWFjaChjb250cm9sID0+IHtcbiAgICAgICAgICAgIGlmIChjb250cm9sLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudFRoZW1BbGwoY29udHJvbC5jaGlsZHJlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZW1pdFNlbGVjdGlvbkNoYW5nZWQoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uLmVtaXQodGhpcy5nZXRTZWxlY3RlZFZhbHVlcygpKTtcbiAgICAgICAgdGhpcy5hbGxTZWxlY3RlZC5lbWl0KHRoaXMuaXNBbGxTZWxlY3RlZCk7XG4gICAgICAgIHRoaXMudXBkYXRlZFRyZWUuZW1pdCh0aGlzLl9jaGVja2JveGVzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFNlbGVjdGVkVmFsdWVzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRWYWx1ZXM6IHN0cmluZ1tdID0gW107XG4gICAgICAgIGlmICghIXRoaXMuX2NoZWNrYm94ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrYm94ZXMuZm9yRWFjaChjaGVja2JveCA9PiB0aGlzLnVwZGF0ZVNlbGVjdGVkVmFsdWVzKGNoZWNrYm94LCBzZWxlY3RlZFZhbHVlcykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWxlY3RlZFZhbHVlcztcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVNlbGVjdGVkVmFsdWVzKGNoZWNrYm94OiBDb250cm9sTW9kZWwsIHNlbGVjdGVkVmFsdWVzOiBzdHJpbmdbXSkge1xuICAgICAgICAvLyBieSBkZWZhdWx0IHNlbGVjdGlvbiBjb250YWlucyBvbmx5IGxlYWYgKGNhdGVnb3JpemVkIHRyZWUpXG4gICAgICAgIC8vIGlmIG5lc3RlZCBvciBmaWxlU3lzdGVtIHRyZWUsIHNlbGVjdGlvbiBjb250YWlucyBhbGwgc2VsZWN0ZWQgbm9kZXNcbiAgICAgICAgY29uc3QgaXNDYXRlZ29yaXplZCA9IHRoaXMubW9kZSA9PT0gQ2hlY2tib3hUcmVlTW9kZS5jYXRlZ29yaXplZDtcbiAgICAgICAgaWYgKGNoZWNrYm94LmlzU2VsZWN0ZWQgJiYgKCFpc0NhdGVnb3JpemVkIHx8ICFjaGVja2JveC5jaGlsZHJlbiB8fCBjaGVja2JveC5jaGlsZHJlbi5sZW5ndGggPT09IDApKSB7XG4gICAgICAgICAgICBzZWxlY3RlZFZhbHVlcy5wdXNoKGdldENoZWNrYm94VmFsdWUoY2hlY2tib3gpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoISFjaGVja2JveC5jaGlsZHJlbikge1xuICAgICAgICAgICAgY2hlY2tib3guY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB0aGlzLnVwZGF0ZVNlbGVjdGVkVmFsdWVzKGNoaWxkLCBzZWxlY3RlZFZhbHVlcykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVBbGxTZWxlY3RlZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pc0NoaWxkcmVuICYmICEhdGhpcy5fY2hlY2tib3hlcykge1xuICAgICAgICAgICAgdGhpcy5pc0FsbFNlbGVjdGVkID0gdGhpcy5fY2hlY2tib3hlcy5ldmVyeShjaGVja2JveCA9PiB0aGlzLmFyZUFsbENoaWxkcmVuU2VsZWN0ZWQoY2hlY2tib3gpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGlvbkNvdW50KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhcmVBbGxDaGlsZHJlblNlbGVjdGVkKGNoZWNrYm94OiBDb250cm9sTW9kZWwpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICFjaGVja2JveC5jaGlsZHJlbiA/IGNoZWNrYm94LmlzU2VsZWN0ZWQgOiBjaGVja2JveC5pc1NlbGVjdGVkICYmXG4gICAgICAgICAgICBjaGVja2JveC5jaGlsZHJlbi5ldmVyeShjaGlsZCA9PiB0aGlzLmFyZUFsbENoaWxkcmVuU2VsZWN0ZWQoY2hpbGQpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWRDaGlsZHJlbigpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNBc3luYyAmJiAhIXRoaXMuZ2V0Q2hpbGRyZW4gJiYgIXRoaXMuX2lzTG9hZGluZ0NoaWxkcmVuKSB7XG4gICAgICAgICAgICB0aGlzLl9pc0xvYWRpbmdDaGlsZHJlbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmlzTG9hZGluZ0NoaWxkcmVuLmVtaXQodGhpcy5faXNMb2FkaW5nQ2hpbGRyZW4pO1xuICAgICAgICAgICAgY29uc3QgcmVxdWVzdHM6IE9ic2VydmFibGU8Q29udHJvbE1vZGVsW10+W10gPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgY2hlY2tib3ggb2YgdGhpcy5fY2hlY2tib3hlcykge1xuICAgICAgICAgICAgICAgIGlmICghIWNoZWNrYm94LmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlcXVlc3RzLnB1c2godGhpcy5nZXRDaGlsZHJlbihjaGVja2JveCkucGlwZSh0YXAoY2hpbGRyZW4gPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRDaGlsZHJlbiA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LmNoaWxkcmVuID0gY2hpbGRyZW4ubWFwKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRDaGlsZCA9IG5ldyBDb250cm9sTW9kZWwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmNoaWxkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiB0aGlzLnRyYW5zbGF0ZS50cmFuc2Zvcm0oY2hpbGQubGFiZWwgfHwgJycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQ6IGNoZWNrYm94LmlzU2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1cGRhdGVkQ2hpbGQuaXNTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkQ2hpbGRyZW4rKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1cGRhdGVkQ2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBjaGVja2JveC50b3RhbENoaWxkcmVuID0gY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBjaGVja2JveC5zZWxlY3RlZENoaWxkcmVuID0gc2VsZWN0ZWRDaGlsZHJlbjtcbiAgICAgICAgICAgICAgICAgICAgbWFya0ZvckNoZWNrKHRoaXMuY2RyKTtcbiAgICAgICAgICAgICAgICB9KSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmVxdWVzdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXNMb2FkaW5nQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzTG9hZGluZ0NoaWxkcmVuLmVtaXQodGhpcy5faXNMb2FkaW5nQ2hpbGRyZW4pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3JrSm9pbihyZXF1ZXN0cykuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbWFya0ZvckNoZWNrKHRoaXMuY2RyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0U2VsZWN0aW9uQ2hhbmdlZCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0xvYWRpbmdDaGlsZHJlbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzTG9hZGluZ0NoaWxkcmVuLmVtaXQodGhpcy5faXNMb2FkaW5nQ2hpbGRyZW4pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0aW9uQ291bnQoKTtcbiAgICB9XG5cbiAgICBvbk1vdXNlT3ZlcihjaGVja2JveDogQ29udHJvbE1vZGVsKSB7XG4gICAgICAgIGlmICh0aGlzLm1vZGUgPT09IENoZWNrYm94VHJlZU1vZGUuZmlsZVN5c3RlbSkge1xuICAgICAgICAgICAgdGhpcy5maWxlU3lzdGVtQnV0dG9uVmlzaWJpbGl0eVtjaGVja2JveC5pZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Nb3VzZUxlYXZlKGNoZWNrYm94OiBDb250cm9sTW9kZWwpIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gQ2hlY2tib3hUcmVlTW9kZS5maWxlU3lzdGVtKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbiA9IGNoZWNrYm94LmNoaWxkcmVuIHx8IFtdO1xuICAgICAgICAgICAgLy8ga2VlcCBidXR0b24gdmlzaWJsZSB3aGVuIGNoZWNrYm94IGlzIHNlbGVjdGVkIHdoaWxlIGl0cyBjaGlsZHJlbiBhcmUgbm90XG4gICAgICAgICAgICB0aGlzLmZpbGVTeXN0ZW1CdXR0b25WaXNpYmlsaXR5W2NoZWNrYm94LmlkXSA9IGNoZWNrYm94LmlzU2VsZWN0ZWQgJiYgY2hpbGRyZW4uZXZlcnkoY2hpbGQgPT4gIWNoaWxkLmlzU2VsZWN0ZWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb21wdXRlQ2hlY2tib3hTaXplcygpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBGSVhNRSBjaGVja2JveCBzaXplIHdyb25nIGFmdGVyIHNlbGVjdGluZyBhbGxcbiAgICAgICAgICAgIGlmICh0aGlzLl9iYWRnZVZpc2libGUgJiYgISF0aGlzLmNoZWNrYm94Q29tcG9uZW50cykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJhZGdlcyA9IHRoaXMuYmFkZ2VDb21wb25lbnRzIHx8IFtdIGFzIEJhZGdlQ29tcG9uZW50W107XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja2JveENvbXBvbmVudHMuZm9yRWFjaChjaGVja2JveENvbXBvbmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkID0gY2hlY2tib3hDb21wb25lbnQuaWQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrYm94ID0gdGhpcy5fY2hlY2tib3hlcy5maW5kKGl0ZW0gPT4gaXRlbS5pZCA9PT0gaWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoISFjaGVja2JveCAmJiAhIWNoZWNrYm94LnRvdGFsQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhZGdlID0gYmFkZ2VzLmZpbmQoYiA9PiBiLmlkID09PSBpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISFiYWRnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhZGdlV2lkdGggPSBiYWRnZS5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXh0cmFXaWR0aCA9IHRoaXMubW9kZSA9PT0gQ2hlY2tib3hUcmVlTW9kZS5maWxlU3lzdGVtID8gYmFkZ2VXaWR0aCArIDEyNCA6IGJhZGdlV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hDb21wb25lbnQuc2V0TGFiZWxNYXhXaWR0aChleHRyYVdpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxMDApO1xuICAgIH1cbn1cbiJdfQ==