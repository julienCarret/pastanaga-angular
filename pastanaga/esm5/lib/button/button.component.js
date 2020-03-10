import { __decorate, __extends, __metadata } from "tslib";
import { Component, Input, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ButtonBase } from './button-base';
var nextId = 0;
var ButtonComponent = /** @class */ (function (_super) {
    __extends(ButtonComponent, _super);
    function ButtonComponent(changeDetector) {
        var _this = _super.call(this, changeDetector) || this;
        _this.changeDetector = changeDetector;
        return _this;
    }
    ButtonComponent.prototype.ngOnInit = function () {
        this.id = !this.id ? "button-" + nextId++ : this.id + "-button";
    };
    ButtonComponent.prototype.onClick = function ($event) {
        if (!!$event && this.type !== 'submit') {
            $event.preventDefault();
        }
    };
    ButtonComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ButtonComponent.prototype, "id", void 0);
    ButtonComponent = __decorate([
        Component({
            selector: 'pa-button',
            template: "<button [ngClass]=\"buttonStyle\"\n        [disabled]=\"isDisabled\"\n        [type]=\"checkedType\"\n        [id]=\"id\"\n        [attr.aria-label]=\"ariaLabel | translate\"\n        [attr.aria-controls]=\"ariaControls\"\n        [attr.aria-expanded]=\"ariaExpanded\"\n        tabindex=\"0\"\n        (click)=\"onClick($event)\">\n    <span class=\"pa-button-wrapper\" tabindex=\"-1\">\n        <pa-icon *ngIf=\"!!icon\" [name]=\"icon\" [hidden]=\"true\"></pa-icon>\n        <span #text class=\"pa-button-label\" [class.pa-sr]=\"!!icon && !_iconAndText\" [class.pa-with-icon]=\"!!icon && _iconAndText\" translate><ng-content></ng-content></span>\n    </span>\n</button>\n\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None // to allow button style to access icon svg
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], ButtonComponent);
    return ButtonComponent;
}(ButtonBase));
export { ButtonComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BndWlsbG90aW5hd2ViL3Bhc3RhbmFnYS1hbmd1bGFyLyIsInNvdXJjZXMiOlsibGliL2J1dHRvbi9idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFRZjtJQUFxQyxtQ0FBVTtJQUczQyx5QkFBc0IsY0FBaUM7UUFBdkQsWUFDSSxrQkFBTSxjQUFjLENBQUMsU0FDeEI7UUFGcUIsb0JBQWMsR0FBZCxjQUFjLENBQW1COztJQUV2RCxDQUFDO0lBRUQsa0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFVLE1BQU0sRUFBSSxDQUFDLENBQUMsQ0FBSSxJQUFJLENBQUMsRUFBRSxZQUFTLENBQUM7SUFDcEUsQ0FBQztJQUVELGlDQUFPLEdBQVAsVUFBUSxNQUFNO1FBQ1YsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQ3BDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUMzQjtJQUNMLENBQUM7O2dCQVpxQyxpQkFBaUI7O0lBRjlDO1FBQVIsS0FBSyxFQUFFOzsrQ0FBYTtJQURaLGVBQWU7UUFOM0IsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFdBQVc7WUFDckIsOHFCQUFzQztZQUN0QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtZQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSSxDQUFDLDJDQUEyQztTQUNwRixDQUFDO3lDQUl3QyxpQkFBaUI7T0FIOUMsZUFBZSxDQWdCM0I7SUFBRCxzQkFBQztDQUFBLEFBaEJELENBQXFDLFVBQVUsR0FnQjlDO1NBaEJZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJ1dHRvbkJhc2UgfSBmcm9tICcuL2J1dHRvbi1iYXNlJztcblxubGV0IG5leHRJZCA9IDA7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncGEtYnV0dG9uJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lIC8vIHRvIGFsbG93IGJ1dHRvbiBzdHlsZSB0byBhY2Nlc3MgaWNvbiBzdmdcbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9uQ29tcG9uZW50IGV4dGVuZHMgQnV0dG9uQmFzZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgaWQ/OiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHN1cGVyKGNoYW5nZURldGVjdG9yKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pZCA9ICF0aGlzLmlkID8gYGJ1dHRvbi0ke25leHRJZCsrfWAgOiBgJHt0aGlzLmlkfS1idXR0b25gO1xuICAgIH1cblxuICAgIG9uQ2xpY2soJGV2ZW50KSB7XG4gICAgICAgIGlmICghISRldmVudCAmJiB0aGlzLnR5cGUgIT09ICdzdWJtaXQnKSB7XG4gICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==