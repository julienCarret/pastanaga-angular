import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlModel } from '../control.model';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { TranslatePipe } from '../../translate/translate.pipe';
import { getCheckboxValue, sortCheckboxes } from '../checkbox.utils';
let nextId = 0;
let CheckboxGroupComponent = class CheckboxGroupComponent {
    constructor(translate, cdr) {
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
    set checkboxes(value) {
        const translatedCheckboxes = value.map(checkbox => new ControlModel(Object.assign(Object.assign({}, checkbox), { label: this.translate.transform(checkbox.label || '') })));
        this._checkboxes = this._shouldSort ? sortCheckboxes(translatedCheckboxes) : translatedCheckboxes;
        this._isAllSelected = this._checkboxes.every(checkbox => checkbox.isSelected);
        this.totalCount = this._checkboxes.length;
        this.updateSelectionCount();
    }
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    set shouldSort(value) { this._shouldSort = coerceBooleanProperty(value); }
    set selectAllVisible(value) { this._selectAllVisible = coerceBooleanProperty(value); }
    set countVisible(value) { this._countVisible = coerceBooleanProperty(value); }
    set noSelectAll(value) { this._selectAllVisible = !coerceBooleanProperty(value); }
    ngOnInit() {
        this.id = !this.id ? `fieldset-checkbox-group-${nextId++}` : `${this.id}-checkbox-group`;
    }
    toggleSelection(value) {
        if (this.type === 'radio') {
            this._checkboxes = (this._checkboxes || []).map(ctl => new ControlModel(Object.assign(Object.assign({}, ctl), { isSelected: ctl.value === value })));
        }
        this.updateSelectionCount();
        this.emitSelectionChanged();
    }
    toggleSelectAll() {
        this._isAllSelected = !this._isAllSelected;
        this._checkboxes = this._checkboxes.map(checkbox => new ControlModel(Object.assign(Object.assign({}, checkbox), { isSelected: checkbox.isDisabled ? checkbox.isSelected : this._isAllSelected })));
        this.updateSelectionCount();
        this.emitSelectionChanged();
    }
    updateSelectionCount() {
        this.totalSelected = (this._checkboxes || []).filter(control => control.isSelected).length;
    }
    emitSelectionChanged() {
        const selectedValues = (this._checkboxes || []).filter(control => control.isSelected).map(control => getCheckboxValue(control));
        this.selection.emit(selectedValues);
    }
};
CheckboxGroupComponent.ctorParameters = () => [
    { type: TranslatePipe },
    { type: ChangeDetectorRef }
];
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
export { CheckboxGroupComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtZ3JvdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGd1aWxsb3RpbmF3ZWIvcGFzdGFuYWdhLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvY29udHJvbHMvY2hlY2tib3gtZ3JvdXAvY2hlY2tib3gtZ3JvdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVyRSxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFRZixJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUFzQjtJQStCL0IsWUFDWSxTQUF3QixFQUN4QixHQUFzQjtRQUR0QixjQUFTLEdBQVQsU0FBUyxDQUFlO1FBQ3hCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBL0J6QixTQUFJLEdBQXlCLFVBQVUsQ0FBQztRQWlCdkMsY0FBUyxHQUEyQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWpFLGdCQUFXLEdBQW1CLEVBQUUsQ0FBQztRQUNqQyxnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQixzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVsQixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QixlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ2Ysa0JB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OlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sTW9kZWwgfSBmcm9tICcuLi9jb250cm9sLm1vZGVsJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBUcmFuc2xhdGVQaXBlIH0gZnJvbSAnLi4vLi4vdHJhbnNsYXRlL3RyYW5zbGF0ZS5waXBlJztcbmltcG9ydCB7IGdldENoZWNrYm94VmFsdWUsIHNvcnRDaGVja2JveGVzIH0gZnJvbSAnLi4vY2hlY2tib3gudXRpbHMnO1xuXG5sZXQgbmV4dElkID0gMDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwYS1jaGVja2JveC1ncm91cCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NoZWNrYm94LWdyb3VwLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9jaGVja2JveC1ncm91cC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDaGVja2JveEdyb3VwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBpZD86IHN0cmluZztcbiAgICBASW5wdXQoKSB0eXBlOiAnY2hlY2tib3gnIHwgJ3JhZGlvJyA9ICdjaGVja2JveCc7XG4gICAgQElucHV0KCkgc2V0IGNoZWNrYm94ZXModmFsdWU6IENvbnRyb2xNb2RlbFtdKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zbGF0ZWRDaGVja2JveGVzID0gdmFsdWUubWFwKGNoZWNrYm94ID0+IG5ldyBDb250cm9sTW9kZWwoe1xuICAgICAgICAgICAgLi4uY2hlY2tib3gsXG4gICAgICAgICAgICBsYWJlbDogdGhpcy50cmFuc2xhdGUudHJhbnNmb3JtKGNoZWNrYm94LmxhYmVsIHx8ICcnKSxcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLl9jaGVja2JveGVzID0gdGhpcy5fc2hvdWxkU29ydCA/IHNvcnRDaGVja2JveGVzKHRyYW5zbGF0ZWRDaGVja2JveGVzKSA6IHRyYW5zbGF0ZWRDaGVja2JveGVzO1xuICAgICAgICB0aGlzLl9pc0FsbFNlbGVjdGVkID0gdGhpcy5fY2hlY2tib3hlcy5ldmVyeShjaGVja2JveCA9PiBjaGVja2JveC5pc1NlbGVjdGVkKTtcbiAgICAgICAgdGhpcy50b3RhbENvdW50ID0gdGhpcy5fY2hlY2tib3hlcy5sZW5ndGg7XG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0aW9uQ291bnQoKTtcbiAgICB9XG4gICAgQElucHV0KCkgc2V0IGRpc2FibGVkKHZhbHVlKSB7IHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICAgIEBJbnB1dCgpIHNldCBzaG91bGRTb3J0KHZhbHVlKSB7IHRoaXMuX3Nob3VsZFNvcnQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gICAgQElucHV0KCkgc2V0IHNlbGVjdEFsbFZpc2libGUodmFsdWUpIHsgdGhpcy5fc2VsZWN0QWxsVmlzaWJsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgICBASW5wdXQoKSBzZXQgY291bnRWaXNpYmxlKHZhbHVlKSB7IHRoaXMuX2NvdW50VmlzaWJsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgICBASW5wdXQoKSBzZXQgbm9TZWxlY3RBbGwodmFsdWUpIHsgdGhpcy5fc2VsZWN0QWxsVmlzaWJsZSA9ICFjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG5cbiAgICBAT3V0cHV0KCkgc2VsZWN0aW9uOiBFdmVudEVtaXR0ZXI8c3RyaW5nW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgX2NoZWNrYm94ZXM6IENvbnRyb2xNb2RlbFtdID0gW107XG4gICAgX3Nob3VsZFNvcnQgPSB0cnVlO1xuICAgIF9zZWxlY3RBbGxWaXNpYmxlID0gdHJ1ZTtcbiAgICBfY291bnRWaXNpYmxlID0gZmFsc2U7XG4gICAgX2Rpc2FibGVkID0gZmFsc2U7XG5cbiAgICBfaXNBbGxTZWxlY3RlZCA9IGZhbHNlO1xuICAgIHRvdGFsQ291bnQgPSAwO1xuICAgIHRvdGFsU2VsZWN0ZWQgPSAwO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVQaXBlLFxuICAgICAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgICApIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pZCA9ICF0aGlzLmlkID8gYGZpZWxkc2V0LWNoZWNrYm94LWdyb3VwLSR7bmV4dElkKyt9YCA6IGAke3RoaXMuaWR9LWNoZWNrYm94LWdyb3VwYDtcbiAgICB9XG5cbiAgICB0b2dnbGVTZWxlY3Rpb24odmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy50eXBlID09PSAncmFkaW8nKSB7XG4gICAgICAgICAgICB0aGlzLl9jaGVja2JveGVzID0gKHRoaXMuX2NoZWNrYm94ZXMgfHwgW10pLm1hcChjdGwgPT4gbmV3IENvbnRyb2xNb2RlbCh7XG4gICAgICAgICAgICAgICAgLi4uY3RsLFxuICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQ6IGN0bC52YWx1ZSA9PT0gdmFsdWUsXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3Rpb25Db3VudCgpO1xuICAgICAgICB0aGlzLmVtaXRTZWxlY3Rpb25DaGFuZ2VkKCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlU2VsZWN0QWxsKCkge1xuICAgICAgICB0aGlzLl9pc0FsbFNlbGVjdGVkID0gIXRoaXMuX2lzQWxsU2VsZWN0ZWQ7XG4gICAgICAgIHRoaXMuX2NoZWNrYm94ZXMgPSB0aGlzLl9jaGVja2JveGVzLm1hcChjaGVja2JveCA9PiBuZXcgQ29udHJvbE1vZGVsKHtcbiAgICAgICAgICAgIC4uLmNoZWNrYm94LFxuICAgICAgICAgICAgaXNTZWxlY3RlZDogY2hlY2tib3guaXNEaXNhYmxlZCA/IGNoZWNrYm94LmlzU2VsZWN0ZWQgOiB0aGlzLl9pc0FsbFNlbGVjdGVkLFxuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0aW9uQ291bnQoKTtcbiAgICAgICAgdGhpcy5lbWl0U2VsZWN0aW9uQ2hhbmdlZCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlU2VsZWN0aW9uQ291bnQoKSB7XG4gICAgICAgIHRoaXMudG90YWxTZWxlY3RlZCA9ICh0aGlzLl9jaGVja2JveGVzIHx8IFtdKS5maWx0ZXIoY29udHJvbCA9PiBjb250cm9sLmlzU2VsZWN0ZWQpLmxlbmd0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGVtaXRTZWxlY3Rpb25DaGFuZ2VkKCkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZFZhbHVlcyA9ICh0aGlzLl9jaGVja2JveGVzIHx8IFtdKS5maWx0ZXIoY29udHJvbCA9PiBjb250cm9sLmlzU2VsZWN0ZWQpLm1hcChjb250cm9sID0+IGdldENoZWNrYm94VmFsdWUoY29udHJvbCkpO1xuICAgICAgICB0aGlzLnNlbGVjdGlvbi5lbWl0KHNlbGVjdGVkVmFsdWVzKTtcbiAgICB9XG59XG4iXX0=