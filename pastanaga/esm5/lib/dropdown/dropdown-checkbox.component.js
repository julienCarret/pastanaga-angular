import { __assign, __decorate, __metadata } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { keyCodes } from '../keycodes.constant';
import { ControlModel } from '../controls/control.model';
import { PopupDirective } from '../popup/popup.directive';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { markForCheck } from '../common/utils';
var DropdownCheckboxComponent = /** @class */ (function () {
    function DropdownCheckboxComponent(cdr) {
        this.cdr = cdr;
        this.valuesChange = new EventEmitter();
        this.onOpen = new EventEmitter();
        this.onClose = new EventEmitter();
        this._checkboxes = [];
        this._values = [];
        this.isDisabled = false;
        this.labels = {};
    }
    Object.defineProperty(DropdownCheckboxComponent.prototype, "checkboxes", {
        set: function (values) {
            if (!!values) {
                this._checkboxes = values;
                this.getLabels();
                this.setSelection();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropdownCheckboxComponent.prototype, "values", {
        set: function (values) {
            if (!!values) {
                this._values = values;
                this.setSelection();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropdownCheckboxComponent.prototype, "disabled", {
        set: function (value) { this.isDisabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    DropdownCheckboxComponent.prototype.getLabels = function () {
        this.labels = (this._checkboxes || []).reduce(function (all, current) {
            if (!!current.value) {
                all[current.value] = current.label || current.value;
            }
            return all;
        }, {});
    };
    DropdownCheckboxComponent.prototype.setSelection = function () {
        var _this = this;
        this._checkboxes = this._checkboxes.map(function (checkbox) { return new ControlModel(__assign(__assign({}, checkbox), { isSelected: !!checkbox.value && _this._values.includes(checkbox.value) })); });
    };
    DropdownCheckboxComponent.prototype.updateValue = function (checkbox, isSelected) {
        var value = checkbox.value;
        if (!!value) {
            if (isSelected && this._values.indexOf(value) === -1) {
                this._values.push(value);
            }
            if (!isSelected && this._values.indexOf(value) > -1) {
                this._values = this._values.filter(function (v) { return v !== value; });
            }
            this.valuesChange.emit(this._values);
        }
    };
    DropdownCheckboxComponent.prototype._onClose = function () {
        markForCheck(this.cdr);
        this.onClose.emit();
    };
    DropdownCheckboxComponent.prototype.onClickArrow = function ($event) {
        if ($event.keyCode === keyCodes.enter) {
            var element = $event.srcElement;
            if (!!element.parentElement) {
                element.parentElement.click();
            }
        }
    };
    DropdownCheckboxComponent.prototype.openMenu = function (event) {
        if (!!this.menuRef) {
            this.menuRef.remoteClick({ event: event, isContextual: false, ignoreRemote: true });
            this.onOpen.emit();
        }
    };
    DropdownCheckboxComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
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
    return DropdownCheckboxComponent;
}());
export { DropdownCheckboxComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGd1aWxsb3RpbmF3ZWIvcGFzdGFuYWdhLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvZHJvcGRvd24vZHJvcGRvd24tY2hlY2tib3guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5SCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFTL0M7SUE0QkksbUNBQW9CLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBWGhDLGlCQUFZLEdBQTJCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDMUQsV0FBTSxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hELFlBQU8sR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUkzRCxnQkFBVyxHQUFtQixFQUFFLENBQUM7UUFDakMsWUFBTyxHQUFhLEVBQUUsQ0FBQztRQUN2QixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLFdBQU0sR0FBOEIsRUFBRSxDQUFDO0lBRU0sQ0FBQztJQTNCckMsc0JBQUksaURBQVU7YUFBZCxVQUFlLE1BQXNCO1lBQzFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRTtnQkFDVixJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztnQkFDMUIs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LElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBQyxLQUFLLE9BQUEsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1lBQzNFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDdEI7SUFDTCxDQUFDOztnQkFsRHdCLGlCQUFpQjs7SUEzQmpDO1FBQVIsS0FBSyxFQUFFOzs7K0RBTVA7SUFDUTtRQUFSLEtBQUssRUFBRTs7OzJEQUtQO0lBQ1E7UUFBUixLQUFLLEVBQUU7OzREQUFnQjtJQUNmO1FBQVIsS0FBSyxFQUFFOzs7NkRBQXdFO0lBRXRFO1FBQVQsTUFBTSxFQUFFO2tDQUFlLFlBQVk7bUVBQWdDO0lBQzFEO1FBQVQsTUFBTSxFQUFFO2tDQUFTLFlBQVk7NkRBQTRCO0lBQ2hEO1FBQVQsTUFBTSxFQUFFO2tDQUFVLFlBQVk7OERBQTRCO0lBRVg7UUFBL0MsU0FBUyxDQUFDLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsQ0FBQztrQ0FBVyxjQUFjOzhEQUFDO0lBckJoRSx5QkFBeUI7UUFQckMsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyx3eERBQStDO1lBRS9DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztTQUNsRCxDQUFDO3lDQThCMkIsaUJBQWlCO09BNUJqQyx5QkFBeUIsQ0ErRXJDO0lBQUQsZ0NBQUM7Q0FBQSxBQS9FRCxJQStFQztTQS9FWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGtleUNvZGVzIH0gZnJvbSAnLi4va2V5Y29kZXMuY29uc3RhbnQnO1xuaW1wb3J0IHsgQ29udHJvbE1vZGVsIH0gZnJvbSAnLi4vY29udHJvbHMvY29udHJvbC5tb2RlbCc7XG5pbXBvcnQgeyBQb3B1cERpcmVjdGl2ZSB9IGZyb20gJy4uL3BvcHVwL3BvcHVwLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgbWFya0ZvckNoZWNrIH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwYS1kcm9wZG93bi1jaGVja2JveCcsXG4gICAgdGVtcGxhdGVVcmw6ICdkcm9wZG93bi1jaGVja2JveC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZHJvcGRvd24tY2hlY2tib3guY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5cbmV4cG9ydCBjbGFzcyBEcm9wZG93bkNoZWNrYm94Q29tcG9uZW50IHtcbiAgICBASW5wdXQoKSBzZXQgY2hlY2tib3hlcyh2YWx1ZXM6IENvbnRyb2xNb2RlbFtdKSB7XG4gICAgICAgIGlmICghIXZhbHVlcykge1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tib3hlcyA9IHZhbHVlcztcbiAgICAgICAgICAgIHRoaXMuZ2V0TGFiZWxzKCk7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIEBJbnB1dCgpIHNldCB2YWx1ZXModmFsdWVzOiBzdHJpbmdbXSkge1xuICAgICAgICBpZiAoISF2YWx1ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlcztcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQElucHV0KCkgbGFiZWw/OiBzdHJpbmc7XG4gICAgQElucHV0KCkgc2V0IGRpc2FibGVkKHZhbHVlKSB7IHRoaXMuaXNEaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cblxuICAgIEBPdXRwdXQoKSB2YWx1ZXNDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmdbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIG9uT3BlbjogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBvbkNsb3NlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAVmlld0NoaWxkKCdtZW51UmVmJywgeyByZWFkOiBQb3B1cERpcmVjdGl2ZSB9KSBtZW51UmVmPzogUG9wdXBEaXJlY3RpdmU7XG5cbiAgICBfY2hlY2tib3hlczogQ29udHJvbE1vZGVsW10gPSBbXTtcbiAgICBfdmFsdWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGlzRGlzYWJsZWQgPSBmYWxzZTtcbiAgICBsYWJlbHM6IHtbdmFsdWU6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIGdldExhYmVscygpIHtcbiAgICAgICAgdGhpcy5sYWJlbHMgPSAodGhpcy5fY2hlY2tib3hlcyB8fCBbXSkucmVkdWNlKChhbGwsIGN1cnJlbnQpID0+IHtcbiAgICAgICAgICAgIGlmICghIWN1cnJlbnQudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBhbGxbY3VycmVudC52YWx1ZV0gPSBjdXJyZW50LmxhYmVsIHx8IGN1cnJlbnQudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYWxsO1xuICAgICAgICB9LCB7fSk7XG4gICAgfVxuXG4gICAgc2V0U2VsZWN0aW9uKCkge1xuICAgICAgICB0aGlzLl9jaGVja2JveGVzID0gdGhpcy5fY2hlY2tib3hlcy5tYXAoY2hlY2tib3ggPT4gbmV3IENvbnRyb2xNb2RlbCh7XG4gICAgICAgICAgICAuLi5jaGVja2JveCxcbiAgICAgICAgICAgIGlzU2VsZWN0ZWQ6ICEhY2hlY2tib3gudmFsdWUgJiYgdGhpcy5fdmFsdWVzLmluY2x1ZGVzKGNoZWNrYm94LnZhbHVlKSxcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIHVwZGF0ZVZhbHVlKGNoZWNrYm94OiBDb250cm9sTW9kZWwsIGlzU2VsZWN0ZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBjaGVja2JveC52YWx1ZTtcbiAgICAgICAgaWYgKCEhdmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChpc1NlbGVjdGVkICYmIHRoaXMuX3ZhbHVlcy5pbmRleE9mKHZhbHVlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWlzU2VsZWN0ZWQgJiYgdGhpcy5fdmFsdWVzLmluZGV4T2YodmFsdWUpID4gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSB0aGlzLl92YWx1ZXMuZmlsdGVyKHYgPT4gdiAhPT0gdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy52YWx1ZXNDaGFuZ2UuZW1pdCh0aGlzLl92YWx1ZXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX29uQ2xvc2UoKSB7XG4gICAgICAgIG1hcmtGb3JDaGVjayh0aGlzLmNkcik7XG4gICAgICAgIHRoaXMub25DbG9zZS5lbWl0KCk7XG4gICAgfVxuXG4gICAgb25DbGlja0Fycm93KCRldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoJGV2ZW50LmtleUNvZGUgPT09IGtleUNvZGVzLmVudGVyKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gJGV2ZW50LnNyY0VsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAoISFlbGVtZW50LnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnBhcmVudEVsZW1lbnQuY2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9wZW5NZW51KGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICghIXRoaXMubWVudVJlZikge1xuICAgICAgICAgICAgdGhpcy5tZW51UmVmLnJlbW90ZUNsaWNrKHtldmVudCwgaXNDb250ZXh0dWFsOiBmYWxzZSwgaWdub3JlUmVtb3RlOiB0cnVlfSk7XG4gICAgICAgICAgICB0aGlzLm9uT3Blbi5lbWl0KCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=