import { __assign, __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlModel } from '../control.model';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { TranslatePipe } from '../../translate/translate.pipe';
import { getCheckboxValue, sortCheckboxes } from '../checkbox.utils';
var nextId = 0;
var CheckboxGroupComponent = /** @class */ (function () {
    function CheckboxGroupComponent(translate, cdr) {
        this.translate = translate;
        this.cdr = cdr;
        this.type = 'checkbox';
        this.selection = new EventEmitter();
        this._checkboxes = [];
        this._shouldSort = true;
        this._selectAllVisible = true;
        this._countVisible = false;
        this._disabled = false;
        this._isAllSelected = false;
        this.totalCount = 0;
        this.totalSelected = 0;
    }
    Object.defineProperty(CheckboxGroupComponent.prototype, "checkboxes", {
        set: function (value) {
            var _this = this;
            var translatedCheckboxes = value.map(function (checkbox) { return new ControlModel(__assign(__assign({}, checkbox), { label: _this.translate.transform(checkbox.label || '') })); });
            this._checkboxes = this._shouldSort ? sortCheckboxes(translatedCheckboxes) : translatedCheckboxes;
            this._isAllSelected = this._checkboxes.every(function (checkbox) { return checkbox.isSelected; });
            this.totalCount = this._checkboxes.length;
            this.updateSelectionCount();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxGroupComponent.prototype, "disabled", {
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxGroupComponent.prototype, "shouldSort", {
        set: function (value) { this._shouldSort = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxGroupComponent.prototype, "selectAllVisible", {
        set: function (value) { this._selectAllVisible = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxGroupComponent.prototype, "countVisible", {
        set: function (value) { this._countVisible = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxGroupComponent.prototype, "noSelectAll", {
        set: function (value) { this._selectAllVisible = !coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    CheckboxGroupComponent.prototype.ngOnInit = function () {
        this.id = !this.id ? "fieldset-checkbox-group-" + nextId++ : this.id + "-checkbox-group";
    };
    CheckboxGroupComponent.prototype.toggleSelection = function (value) {
        if (this.type === 'radio') {
            this._checkboxes = (this._checkboxes || []).map(function (ctl) { return new ControlModel(__assign(__assign({}, ctl), { isSelected: ctl.value === value })); });
        }
        this.updateSelectionCount();
        this.emitSelectionChanged();
    };
    CheckboxGroupComponent.prototype.toggleSelectAll = function () {
        var _this = this;
        this._isAllSelected = !this._isAllSelected;
        this._checkboxes = this._checkboxes.map(function (checkbox) { return new ControlModel(__assign(__assign({}, checkbox), { isSelected: checkbox.isDisabled ? checkbox.isSelected : _this._isAllSelected })); });
        this.updateSelectionCount();
        this.emitSelectionChanged();
    };
    CheckboxGroupComponent.prototype.updateSelectionCount = function () {
        this.totalSelected = (this._checkboxes || []).filter(function (control) { return control.isSelected; }).length;
    };
    CheckboxGroupComponent.prototype.emitSelectionChanged = function () {
        var selectedValues = (this._checkboxes || []).filter(function (control) { return control.isSelected; }).map(function (control) { return getCheckboxValue(control); });
        this.selection.emit(selectedValues);
    };
    CheckboxGroupComponent.ctorParameters = function () { return [
        { type: TranslatePipe },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CheckboxGroupComponent.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CheckboxGroupComponent.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], CheckboxGroupComponent.prototype, "checkboxes", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CheckboxGroupComponent.prototype, "disabled", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CheckboxGroupComponent.prototype, "shouldSort", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CheckboxGroupComponent.prototype, "selectAllVisible", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CheckboxGroupComponent.prototype, "countVisible", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CheckboxGroupComponent.prototype, "noSelectAll", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CheckboxGroupComponent.prototype, "selection", void 0);
    CheckboxGroupComponent = __decorate([
        Component({
            selector: 'pa-checkbox-group',
            template: "<fieldset class=\"pa-fieldset-group\" [id]=\"id\">\n    <legend>\n        <ng-content></ng-content>\n        <pa-badge *ngIf=\"_countVisible\" [isSmall]=\"true\" [isAccented]=\"true\"\n                  [value]=\"totalSelected\" [of]=\"totalCount\"></pa-badge>\n    </legend>\n\n    <pa-button *ngIf=\"type === 'checkbox' && _selectAllVisible\"\n               size=\"small\" class=\"pa-field-button-right\"\n               id=\"checkbox-group-select-all\"\n               [disabled]=\"_disabled\"\n               [color]=\"_isAllSelected ? 'secondary' : 'primary'\"\n               (click)=\"toggleSelectAll()\">\n        {{_isAllSelected ? 'common.deselect-all' : 'common.select-all'}}\n    </pa-button>\n\n    <pa-checkbox *ngFor=\"let checkbox of _checkboxes\"\n                 [type]=\"type\"\n                 [id]=\"checkbox.id\"\n                 [icon]=\"checkbox.icon\"\n                 [help]=\"checkbox.help\"\n                 [subLabel]=\"checkbox.subLabel\"\n                 [labelIcons]=\"checkbox.labelIcons\"\n                 [disabled]=\"checkbox.isDisabled || _disabled\"\n                 [(selected)]=\"checkbox.isSelected\"\n                 (selection)=\"toggleSelection(checkbox.value)\">{{checkbox.label}}\n    </pa-checkbox>\n</fieldset>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [":host{position:relative}:host legend pa-badge{display:inline-block;position:relative;top:.375rem;left:.75rem}"]
        }),
        __metadata("design:paramtypes", [TranslatePipe,
            ChangeDetectorRef])
    ], CheckboxGroupComponent);
    return CheckboxGroupComponent;
}());
export { CheckboxGroupComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtZ3JvdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGd1aWxsb3RpbmF3ZWIvcGFzdGFuYWdhLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvY29udHJvbHMvY2hlY2tib3gtZ3JvdXAvY2hlY2tib3gtZ3JvdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVyRSxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFRZjtJQStCSSxnQ0FDWSxTQUF3QixFQUN4QixHQUFzQjtRQUR0QixjQUFTLEdBQVQsU0FBUyxDQUFlO1FBQ3hCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBL0J6QixTQUFJLEdBQXlCLFVBQVUsQ0FBQztRQWlCdkMsY0FBUyxHQUEyQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWpFLGdCQUFXLEdBQW1CLEVBQUUsQ0FBQztRQUNqQyxnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQixzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVsQixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QixlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ2Ysa0JBQWEsR0FBRyxDQUFDLENBQUM7SUFNbEIsQ0FBQztJ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O1FBTmxDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0Isa3dDQUE4QztZQUU5QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7U0FDbEQsQ0FBQzt5Q0FpQ3lCLGFBQWE7WUFDbkIsaUJBQWlCO09BakN6QixzQkFBc0IsQ0FzRWxDO0lBQUQsNkJBQUM7Q0FBQSxBQXRFRCxJQXNFQztTQXRFWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xNb2RlbCB9IGZyb20gJy4uL2NvbnRyb2wubW9kZWwnO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IFRyYW5zbGF0ZVBpcGUgfSBmcm9tICcuLi8uLi90cmFuc2xhdGUvdHJhbnNsYXRlLnBpcGUnO1xuaW1wb3J0IHsgZ2V0Q2hlY2tib3hWYWx1ZSwgc29ydENoZWNrYm94ZXMgfSBmcm9tICcuLi9jaGVja2JveC51dGlscyc7XG5cbmxldCBuZXh0SWQgPSAwO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3BhLWNoZWNrYm94LWdyb3VwJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY2hlY2tib3gtZ3JvdXAuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2NoZWNrYm94LWdyb3VwLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrYm94R3JvdXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIGlkPzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHR5cGU6ICdjaGVja2JveCcgfCAncmFkaW8nID0gJ2NoZWNrYm94JztcbiAgICBASW5wdXQoKSBzZXQgY2hlY2tib3hlcyh2YWx1ZTogQ29udHJvbE1vZGVsW10pIHtcbiAgICAgICAgY29uc3QgdHJhbnNsYXRlZENoZWNrYm94ZXMgPSB2YWx1ZS5tYXAoY2hlY2tib3ggPT4gbmV3IENvbnRyb2xNb2RlbCh7XG4gICAgICAgICAgICAuLi5jaGVja2JveCxcbiAgICAgICAgICAgIGxhYmVsOiB0aGlzLnRyYW5zbGF0ZS50cmFuc2Zvcm0oY2hlY2tib3gubGFiZWwgfHwgJycpLFxuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMuX2NoZWNrYm94ZXMgPSB0aGlzLl9zaG91bGRTb3J0ID8gc29ydENoZWNrYm94ZXModHJhbnNsYXRlZENoZWNrYm94ZXMpIDogdHJhbnNsYXRlZENoZWNrYm94ZXM7XG4gICAgICAgIHRoaXMuX2lzQWxsU2VsZWN0ZWQgPSB0aGlzLl9jaGVja2JveGVzLmV2ZXJ5KGNoZWNrYm94ID0+IGNoZWNrYm94LmlzU2VsZWN0ZWQpO1xuICAgICAgICB0aGlzLnRvdGFsQ291bnQgPSB0aGlzLl9jaGVja2JveGVzLmxlbmd0aDtcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3Rpb25Db3VudCgpO1xuICAgIH1cbiAgICBASW5wdXQoKSBzZXQgZGlzYWJsZWQodmFsdWUpIHsgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gICAgQElucHV0KCkgc2V0IHNob3VsZFNvcnQodmFsdWUpIHsgdGhpcy5fc2hvdWxkU29ydCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgICBASW5wdXQoKSBzZXQgc2VsZWN0QWxsVmlzaWJsZSh2YWx1ZSkgeyB0aGlzLl9zZWxlY3RBbGxWaXNpYmxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICAgIEBJbnB1dCgpIHNldCBjb3VudFZpc2libGUodmFsdWUpIHsgdGhpcy5fY291bnRWaXNpYmxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICAgIEBJbnB1dCgpIHNldCBub1NlbGVjdEFsbCh2YWx1ZSkgeyB0aGlzLl9zZWxlY3RBbGxWaXNpYmxlID0gIWNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cblxuICAgIEBPdXRwdXQoKSBzZWxlY3Rpb246IEV2ZW50RW1pdHRlcjxzdHJpbmdbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBfY2hlY2tib3hlczogQ29udHJvbE1vZGVsW10gPSBbXTtcbiAgICBfc2hvdWxkU29ydCA9IHRydWU7XG4gICAgX3NlbGVjdEFsbFZpc2libGUgPSB0cnVlO1xuICAgIF9jb3VudFZpc2libGUgPSBmYWxzZTtcbiAgICBfZGlzYWJsZWQgPSBmYWxzZTtcblxuICAgIF9pc0FsbFNlbGVjdGVkID0gZmFsc2U7XG4gICAgdG90YWxDb3VudCA9IDA7XG4gICAgdG90YWxTZWxlY3RlZCA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVBpcGUsXG4gICAgICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZlxuICAgICkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmlkID0gIXRoaXMuaWQgPyBgZmllbGRzZXQtY2hlY2tib3gtZ3JvdXAtJHtuZXh0SWQrK31gIDogYCR7dGhpcy5pZH0tY2hlY2tib3gtZ3JvdXBgO1xuICAgIH1cblxuICAgIHRvZ2dsZVNlbGVjdGlvbih2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdyYWRpbycpIHtcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrYm94ZXMgPSAodGhpcy5fY2hlY2tib3hlcyB8fCBbXSkubWFwKGN0bCA9PiBuZXcgQ29udHJvbE1vZGVsKHtcbiAgICAgICAgICAgICAgICAuLi5jdGwsXG4gICAgICAgICAgICAgICAgaXNTZWxlY3RlZDogY3RsLnZhbHVlID09PSB2YWx1ZSxcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGlvbkNvdW50KCk7XG4gICAgICAgIHRoaXMuZW1pdFNlbGVjdGlvbkNoYW5nZWQoKTtcbiAgICB9XG5cbiAgICB0b2dnbGVTZWxlY3RBbGwoKSB7XG4gICAgICAgIHRoaXMuX2lzQWxsU2VsZWN0ZWQgPSAhdGhpcy5faXNBbGxTZWxlY3RlZDtcbiAgICAgICAgdGhpcy5fY2hlY2tib3hlcyA9IHRoaXMuX2NoZWNrYm94ZXMubWFwKGNoZWNrYm94ID0+IG5ldyBDb250cm9sTW9kZWwoe1xuICAgICAgICAgICAgLi4uY2hlY2tib3gsXG4gICAgICAgICAgICBpc1NlbGVjdGVkOiBjaGVja2JveC5pc0Rpc2FibGVkID8gY2hlY2tib3guaXNTZWxlY3RlZCA6IHRoaXMuX2lzQWxsU2VsZWN0ZWQsXG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3Rpb25Db3VudCgpO1xuICAgICAgICB0aGlzLmVtaXRTZWxlY3Rpb25DaGFuZ2VkKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVTZWxlY3Rpb25Db3VudCgpIHtcbiAgICAgICAgdGhpcy50b3RhbFNlbGVjdGVkID0gKHRoaXMuX2NoZWNrYm94ZXMgfHwgW10pLmZpbHRlcihjb250cm9sID0+IGNvbnRyb2wuaXNTZWxlY3RlZCkubGVuZ3RoO1xuICAgIH1cblxuICAgIHByaXZhdGUgZW1pdFNlbGVjdGlvbkNoYW5nZWQoKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkVmFsdWVzID0gKHRoaXMuX2NoZWNrYm94ZXMgfHwgW10pLmZpbHRlcihjb250cm9sID0+IGNvbnRyb2wuaXNTZWxlY3RlZCkubWFwKGNvbnRyb2wgPT4gZ2V0Q2hlY2tib3hWYWx1ZShjb250cm9sKSk7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uLmVtaXQoc2VsZWN0ZWRWYWx1ZXMpO1xuICAgIH1cbn1cbiJdfQ==