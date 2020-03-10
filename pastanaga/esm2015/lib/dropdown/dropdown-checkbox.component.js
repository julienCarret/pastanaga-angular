import { __decorate, __metadata } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { keyCodes } from '../keycodes.constant';
import { ControlModel } from '../controls/control.model';
import { PopupDirective } from '../popup/popup.directive';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { markForCheck } from '../common/utils';
let DropdownCheckboxComponent = class DropdownCheckboxComponent {
    constructor(cdr) {
        this.cdr = cdr;
        this.valuesChange = new EventEmitter();
        this.onOpen = new EventEmitter();
        this.onClose = new EventEmitter();
        this._checkboxes = [];
        this._values = [];
        this.isDisabled = false;
        this.labels = {};
    }
    set checkboxes(values) {
        if (!!values) {
            this._checkboxes = values;
            this.getLabels();
            this.setSelection();
        }
    }
    set values(values) {
        if (!!values) {
            this._values = values;
            this.setSelection();
        }
    }
    set disabled(value) { this.isDisabled = coerceBooleanProperty(value); }
    getLabels() {
        this.labels = (this._checkboxes || []).reduce((all, current) => {
            if (!!current.value) {
                all[current.value] = current.label || current.value;
            }
            return all;
        }, {});
    }
    setSelection() {
        this._checkboxes = this._checkboxes.map(checkbox => new ControlModel(Object.assign(Object.assign({}, checkbox), { isSelected: !!checkbox.value && this._values.includes(checkbox.value) })));
    }
    updateValue(checkbox, isSelected) {
        const value = checkbox.value;
        if (!!value) {
            if (isSelected && this._values.indexOf(value) === -1) {
                this._values.push(value);
            }
            if (!isSelected && this._values.indexOf(value) > -1) {
                this._values = this._values.filter(v => v !== value);
            }
            this.valuesChange.emit(this._values);
        }
    }
    _onClose() {
        markForCheck(this.cdr);
        this.onClose.emit();
    }
    onClickArrow($event) {
        if ($event.keyCode === keyCodes.enter) {
            const element = $event.srcElement;
            if (!!element.parentElement) {
                element.parentElement.click();
            }
        }
    }
    openMenu(event) {
        if (!!this.menuRef) {
            this.menuRef.remoteClick({ event, isContextual: false, ignoreRemote: true });
            this.onOpen.emit();
        }
    }
};
DropdownCheckboxComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
__decorate([
    Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], DropdownCheckboxComponent.prototype, "checkboxes", null);
__decorate([
    Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], DropdownCheckboxComponent.prototype, "values", null);
__decorate([
    Input(),
    __metadata("design:type", String)
], DropdownCheckboxComponent.prototype, "label", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DropdownCheckboxComponent.prototype, "disabled", null);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DropdownCheckboxComponent.prototype, "valuesChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DropdownCheckboxComponent.prototype, "onOpen", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DropdownCheckboxComponent.prototype, "onClose", void 0);
__decorate([
    ViewChild('menuRef', { read: PopupDirective }),
    __metadata("design:type", PopupDirective)
], DropdownCheckboxComponent.prototype, "menuRef", void 0);
DropdownCheckboxComponent = __decorate([
    Component({
        selector: 'pa-dropdown-checkbox',
        template: "<ng-container *ngIf=\"isDisabled\">\n    <ng-container *ngIf=\"_values.length === 0\">\n        <pa-badge class=\"no-permissions\" [isSmall]=\"true\">-</pa-badge>\n    </ng-container>\n    <ng-container *ngIf=\"_values.length > 0\">\n        <pa-badge *ngFor=\"let value of _values\"\n                  [isSmall]=\"true\">{{ !!labels[value] ? (labels[value] | translate) : value }}</pa-badge>\n    </ng-container>\n</ng-container>\n<ng-container *ngIf=\"!isDisabled\">\n    <div class=\"value-container\" (click)=\"openMenu($event)\">\n        <pa-icon [paPopup]=\"menu\" #menuRef=\"paPopupRef\" name=\"down-key\" tabindex=\"0\"\n                 (keydown)=\"onClickArrow($event)\" (click)=\"onOpen.emit()\"></pa-icon>\n        <div>\n            <ng-container *ngIf=\"_values.length === 0\">\n                <pa-badge class=\"no-permissions\" [isSmall]=\"true\">-</pa-badge>\n            </ng-container>\n            <ng-container *ngIf=\"_values.length > 0\">\n                <pa-badge *ngFor=\"let value of _values\"\n                          [isSmall]=\"true\">{{ !!labels[value] ? (labels[value] | translate) : value }}</pa-badge>\n            </ng-container>\n        </div>\n    </div>\n    <pa-dropdown #menu role=\"listbox\" (onClose)=\"_onClose()\">\n        <pa-dropdown-section [title]=\"label\">\n            <ng-container *ngFor=\"let checkbox of _checkboxes\">\n                <pa-dropdown-item [checkboxMode]=\"true\"\n                                  [isSelected]=\"checkbox.isSelected\"\n                                  [isDisabled]=\"checkbox.isDisabled\"\n                                  (onSelection)=\"updateValue(checkbox, $event)\">{{ checkbox.label }}</pa-dropdown-item>\n            </ng-container>\n        </pa-dropdown-section>\n    </pa-dropdown>\n</ng-container>\n",
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".value-container{display:inline-block;width:100%;cursor:pointer}.value-container pa-icon{float:right}.value-container pa-icon ::ng-deep svg{height:1.5rem;width:1.5rem;fill:#767676}.value-container ::ng-deep .pa-badge{margin-top:.1875rem;position:relative}.value-container>div{overflow:hidden;padding-left:.375rem}.no-permissions ::ng-deep .pa-badge-small{background:0 0}"]
    }),
    __metadata("design:paramtypes", [ChangeDetectorRef])
], DropdownCheckboxComponent);
export { DropdownCheckboxComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGd1aWxsb3RpbmF3ZWIvcGFzdGFuYWdhLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvZHJvcGRvd24vZHJvcGRvd24tY2hlY2tib3guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5SCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFTL0MsSUFBYSx5QkFBeUIsR0FBdEMsTUFBYSx5QkFBeUI7SUE0QmxDLFlBQW9CLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBWGhDLGlCQUFZLEdBQTJCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDMUQsV0FBTSxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hELFlBQU8sR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUkzRCxnQkFBVyxHQUFtQixFQUFFLENBQUM7UUFDakMsWUFBTyxHQUFhLEVBQUUsQ0FBQztRQUN2QixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLFdBQU0sR0FBOEIsRUFBRSxDQUFDO0lBRU0sQ0FBQztJQTNCckMsSUFBSSxVQUFVLENBQUMsTUFBc0I7UUFDMUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFO1lBQ1YsSUFBSSxDQUFDLFdBQVcs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LEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1lBQzNFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDdEI7SUFDTCxDQUFDO0NBQ0osQ0FBQTs7WUFuRDRCLGlCQUFpQjs7QUEzQmpDO0lBQVIsS0FBSyxFQUFFOzs7MkRBTVA7QUFDUTtJQUFSLEtBQUssRUFBRTs7O3VEQUtQO0FBQ1E7SUFBUixLQUFLLEVBQUU7O3dEQUFnQjtBQUNmO0lBQVIsS0FBSyxFQUFFOzs7eURBQXdFO0FBRXRFO0lBQVQsTUFBTSxFQUFFOzhCQUFlLFlBQVk7K0RBQWdDO0FBQzFEO0lBQVQsTUFBTSxFQUFFOzhCQUFTLFlBQVk7eURBQTRCO0FBQ2hEO0lBQVQsTUFBTSxFQUFFOzhCQUFVLFlBQVk7MERBQTRCO0FBRVg7SUFBL0MsU0FBUyxDQUFDLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsQ0FBQzs4QkFBVyxjQUFjOzBEQUFDO0FBckJoRSx5QkFBeUI7SUFQckMsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLHNCQUFzQjtRQUNoQyx3eERBQStDO1FBRS9DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztLQUNsRCxDQUFDO3FDQThCMkIsaUJBQWlCO0dBNUJqQyx5QkFBeUIsQ0ErRXJDO1NBL0VZLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsga2V5Q29kZXMgfSBmcm9tICcuLi9rZXljb2Rlcy5jb25zdGFudCc7XG5pbXBvcnQgeyBDb250cm9sTW9kZWwgfSBmcm9tICcuLi9jb250cm9scy9jb250cm9sLm1vZGVsJztcbmltcG9ydCB7IFBvcHVwRGlyZWN0aXZlIH0gZnJvbSAnLi4vcG9wdXAvcG9wdXAuZGlyZWN0aXZlJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBtYXJrRm9yQ2hlY2sgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3BhLWRyb3Bkb3duLWNoZWNrYm94JyxcbiAgICB0ZW1wbGF0ZVVybDogJ2Ryb3Bkb3duLWNoZWNrYm94LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9kcm9wZG93bi1jaGVja2JveC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcblxuZXhwb3J0IGNsYXNzIERyb3Bkb3duQ2hlY2tib3hDb21wb25lbnQge1xuICAgIEBJbnB1dCgpIHNldCBjaGVja2JveGVzKHZhbHVlczogQ29udHJvbE1vZGVsW10pIHtcbiAgICAgICAgaWYgKCEhdmFsdWVzKSB7XG4gICAgICAgICAgICB0aGlzLl9jaGVja2JveGVzID0gdmFsdWVzO1xuICAgICAgICAgICAgdGhpcy5nZXRMYWJlbHMoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQElucHV0KCkgc2V0IHZhbHVlcyh2YWx1ZXM6IHN0cmluZ1tdKSB7XG4gICAgICAgIGlmICghIXZhbHVlcykge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gdmFsdWVzO1xuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBASW5wdXQoKSBsYWJlbD86IHN0cmluZztcbiAgICBASW5wdXQoKSBzZXQgZGlzYWJsZWQodmFsdWUpIHsgdGhpcy5pc0Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuXG4gICAgQE91dHB1dCgpIHZhbHVlc0NoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZ1tdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgb25PcGVuOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIG9uQ2xvc2U6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBWaWV3Q2hpbGQoJ21lbnVSZWYnLCB7IHJlYWQ6IFBvcHVwRGlyZWN0aXZlIH0pIG1lbnVSZWY/OiBQb3B1cERpcmVjdGl2ZTtcblxuICAgIF9jaGVja2JveGVzOiBDb250cm9sTW9kZWxbXSA9IFtdO1xuICAgIF92YWx1ZXM6IHN0cmluZ1tdID0gW107XG4gICAgaXNEaXNhYmxlZCA9IGZhbHNlO1xuICAgIGxhYmVsczoge1t2YWx1ZTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gICAgZ2V0TGFiZWxzKCkge1xuICAgICAgICB0aGlzLmxhYmVscyA9ICh0aGlzLl9jaGVja2JveGVzIHx8IFtdKS5yZWR1Y2UoKGFsbCwgY3VycmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKCEhY3VycmVudC52YWx1ZSkge1xuICAgICAgICAgICAgICAgIGFsbFtjdXJyZW50LnZhbHVlXSA9IGN1cnJlbnQubGFiZWwgfHwgY3VycmVudC52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhbGw7XG4gICAgICAgIH0sIHt9KTtcbiAgICB9XG5cbiAgICBzZXRTZWxlY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuX2NoZWNrYm94ZXMgPSB0aGlzLl9jaGVja2JveGVzLm1hcChjaGVja2JveCA9PiBuZXcgQ29udHJvbE1vZGVsKHtcbiAgICAgICAgICAgIC4uLmNoZWNrYm94LFxuICAgICAgICAgICAgaXNTZWxlY3RlZDogISFjaGVja2JveC52YWx1ZSAmJiB0aGlzLl92YWx1ZXMuaW5jbHVkZXMoY2hlY2tib3gudmFsdWUpLFxuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgdXBkYXRlVmFsdWUoY2hlY2tib3g6IENvbnRyb2xNb2RlbCwgaXNTZWxlY3RlZDogYm9vbGVhbikge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGNoZWNrYm94LnZhbHVlO1xuICAgICAgICBpZiAoISF2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKGlzU2VsZWN0ZWQgJiYgdGhpcy5fdmFsdWVzLmluZGV4T2YodmFsdWUpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXNTZWxlY3RlZCAmJiB0aGlzLl92YWx1ZXMuaW5kZXhPZih2YWx1ZSkgPiAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IHRoaXMuX3ZhbHVlcy5maWx0ZXIodiA9PiB2ICE9PSB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnZhbHVlc0NoYW5nZS5lbWl0KHRoaXMuX3ZhbHVlcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfb25DbG9zZSgpIHtcbiAgICAgICAgbWFya0ZvckNoZWNrKHRoaXMuY2RyKTtcbiAgICAgICAgdGhpcy5vbkNsb3NlLmVtaXQoKTtcbiAgICB9XG5cbiAgICBvbkNsaWNrQXJyb3coJGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICgkZXZlbnQua2V5Q29kZSA9PT0ga2V5Q29kZXMuZW50ZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSAkZXZlbnQuc3JjRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAgIGlmICghIWVsZW1lbnQucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQucGFyZW50RWxlbWVudC5jbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb3Blbk1lbnUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKCEhdGhpcy5tZW51UmVmKSB7XG4gICAgICAgICAgICB0aGlzLm1lbnVSZWYucmVtb3RlQ2xpY2soe2V2ZW50LCBpc0NvbnRleHR1YWw6IGZhbHNlLCBpZ25vcmVSZW1vdGU6IHRydWV9KTtcbiAgICAgICAgICAgIHRoaXMub25PcGVuLmVtaXQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==