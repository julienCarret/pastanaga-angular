import { __decorate, __extends, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ButtonBase } from './button-base';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
var ButtonLinkComponent = /** @class */ (function (_super) {
    __extends(ButtonLinkComponent, _super);
    function ButtonLinkComponent(changeDetector) {
        var _this = _super.call(this, changeDetector) || this;
        _this.changeDetector = changeDetector;
        _this.onClick = new EventEmitter();
        _this.buttonStyle['pa-button-link'] = true;
        return _this;
    }
    Object.defineProperty(ButtonLinkComponent.prototype, "hasButtonDisplay", {
        set: function (value) {
            this.buttonStyle['pa-button-link'] = !coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    ButtonLinkComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ButtonLinkComponent.prototype, "route", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ButtonLinkComponent.prototype, "traverseTo", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ButtonLinkComponent.prototype, "hasButtonDisplay", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ButtonLinkComponent.prototype, "onClick", void 0);
    ButtonLinkComponent = __decorate([
        Component({
            selector: 'pa-button-link',
            template: "<ng-template #label>\n    <span (click)=\"onClick.emit($event)\" class=\"pa-button-wrapper\" tabindex=\"-1\" [class.inline]=\"buttonStyle['pa-button-link']\">\n        <pa-icon *ngIf=\"icon\" [name]=\"icon\" [hidden]=\"true\"></pa-icon>\n        <span #text class=\"pa-button-label\" [class.pa-sr]=\"!!icon && !_iconAndText\" [class.pa-with-icon]=\"!!icon && _iconAndText\" translate><ng-content></ng-content></span>\n    </span>\n</ng-template>\n<a *ngIf=\"!!route && !traverseTo\" href=\"#\"\n   [routerLink]=\"route\"\n   [ngClass]=\"buttonStyle\"\n   [attr.aria-label]=\"ariaLabel\"\n   [attr.aria-controls]=\"ariaControls\"\n   [attr.aria-expanded]=\"ariaExpanded\"\n   tabindex=\"0\">\n    <ng-container *ngTemplateOutlet=\"label\"></ng-container>\n</a>\n<a *ngIf=\"!!traverseTo\" href=\"#\"\n   [traverseTo]=\"traverseTo\"\n   [ngClass]=\"buttonStyle\"\n   [attr.aria-label]=\"ariaLabel\"\n   [attr.aria-controls]=\"ariaControls\"\n   [attr.aria-expanded]=\"ariaExpanded\"\n   tabindex=\"0\">\n    <ng-container *ngTemplateOutlet=\"label\"></ng-container>\n</a>\n<a *ngIf=\"!traverseTo && !route\" href=\"#\"\n   [ngClass]=\"buttonStyle\"\n   [attr.aria-label]=\"ariaLabel\"\n   [attr.aria-controls]=\"ariaControls\"\n   [attr.aria-expanded]=\"ariaExpanded\"\n   tabindex=\"0\">\n    <ng-container *ngTemplateOutlet=\"label\"></ng-container>\n</a>",
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None // to allow button style to access icon svg
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], ButtonLinkComponent);
    return ButtonLinkComponent;
}(ButtonBase));
export { ButtonLinkComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWxpbmsuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGd1aWxsb3RpbmF3ZWIvcGFzdGFuYWdhLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvYnV0dG9uL2J1dHRvbi1saW5rLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0SSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBUTlEO0lBQXlDLHVDQUFVO0lBUS9DLDZCQUFzQixjQUFpQztRQUF2RCxZQUNJLGtCQUFNLGNBQWMsQ0FBQyxTQUV4QjtRQUhxQixvQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFGN0MsYUFBTyxHQUE2QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBSTdELEtBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxJQUFJLENBQUM7O0lBQzlDLENBQUM7SUFSUSxzQkFBSSxpREFBZ0I7YUFBcEIsVUFBcUIsS0FBSztZQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2RSxDQUFDOzs7T0FBQTs7Z0JBR3FDLGlCQUFpQjs7SUFQOUM7UUFBUixLQUFLLEVBQUU7O3NEQUFnQjtJQUNmO1FBQVIsS0FBSyxFQUFFOzsyREFBcUI7SUFDcEI7UUFBUixLQUFLLEVBQUU7OzsrREFFUDtJQUNTO1FBQVQsTUFBTSxFQUFFO2tDQUFVLFlBQVk7d0RBQWtDO0lBTnhELG1CQUFtQjtRQU4vQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLHMxQ0FBMkM7WUFDM0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07WUFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUksQ0FBQywyQ0FBMkM7U0FDcEYsQ0FBQzt5Q0FTd0MsaUJBQWlCO09BUjlDLG1CQUFtQixDQVkvQjtJQUFELDBCQUFDO0NBQUEsQUFaRCxDQUF5QyxVQUFVLEdBWWxEO1NBWlksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJ1dHRvbkJhc2UgfSBmcm9tICcuL2J1dHRvbi1iYXNlJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncGEtYnV0dG9uLWxpbmsnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9idXR0b24tbGluay5jb21wb25lbnQuaHRtbCcsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSAvLyB0byBhbGxvdyBidXR0b24gc3R5bGUgdG8gYWNjZXNzIGljb24gc3ZnXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbkxpbmtDb21wb25lbnQgZXh0ZW5kcyBCdXR0b25CYXNlIHtcbiAgICBASW5wdXQoKSByb3V0ZT86IHN0cmluZztcbiAgICBASW5wdXQoKSB0cmF2ZXJzZVRvPzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHNldCBoYXNCdXR0b25EaXNwbGF5KHZhbHVlKSB7XG4gICAgICAgIHRoaXMuYnV0dG9uU3R5bGVbJ3BhLWJ1dHRvbi1saW5rJ10gPSAhY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG4gICAgQE91dHB1dCgpIG9uQ2xpY2s6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgc3VwZXIoY2hhbmdlRGV0ZWN0b3IpO1xuICAgICAgICB0aGlzLmJ1dHRvblN0eWxlWydwYS1idXR0b24tbGluayddID0gdHJ1ZTtcbiAgICB9XG59XG4iXX0=