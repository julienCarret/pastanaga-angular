import { __decorate, __metadata } from "tslib";
import { Component, Input, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ButtonBase } from './button-base';
let nextId = 0;
let ButtonComponent = class ButtonComponent extends ButtonBase {
    constructor(changeDetector) {
        super(changeDetector);
        this.changeDetector = changeDetector;
    }
    ngOnInit() {
        this.id = !this.id ? `button-${nextId++}` : `${this.id}-button`;
    }
    onClick($event) {
        if (!!$event && this.type !== 'submit') {
            $event.preventDefault();
        }
    }
};
ButtonComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
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
export { ButtonComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BndWlsbG90aW5hd2ViL3Bhc3RhbmFnYS1hbmd1bGFyLyIsInNvdXJjZXMiOlsibGliL2J1dHRvbi9idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFRZixJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFnQixTQUFRLFVBQVU7SUFHM0MsWUFBc0IsY0FBaUM7UUFDbkQsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBREosbUJBQWMsR0FBZCxjQUFjLENBQW1CO0lBRXZELENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxTQUFTLENBQUM7SUFDcEUsQ0FBQztJQUVELE9BQU8sQ0FBQyxNQUFNO1FBQ1YsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQ3BDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUMzQjtJQUNMLENBQUM7Q0FDSixDQUFBOztZQWJ5QyxpQkFBaUI7O0FBRjlDO0lBQVIsS0FBSyxFQUFFOzsyQ0FBYTtBQURaLGVBQWU7SUFOM0IsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFdBQVc7UUFDckIsOHFCQUFzQztRQUN0QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtRQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSSxDQUFDLDJDQUEyQztLQUNwRixDQUFDO3FDQUl3QyxpQkFBaUI7R0FIOUMsZUFBZSxDQWdCM0I7U0FoQlksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnV0dG9uQmFzZSB9IGZyb20gJy4vYnV0dG9uLWJhc2UnO1xuXG5sZXQgbmV4dElkID0gMDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwYS1idXR0b24nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9idXR0b24uY29tcG9uZW50Lmh0bWwnLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUgLy8gdG8gYWxsb3cgYnV0dG9uIHN0eWxlIHRvIGFjY2VzcyBpY29uIHN2Z1xufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25Db21wb25lbnQgZXh0ZW5kcyBCdXR0b25CYXNlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBpZD86IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgc3VwZXIoY2hhbmdlRGV0ZWN0b3IpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmlkID0gIXRoaXMuaWQgPyBgYnV0dG9uLSR7bmV4dElkKyt9YCA6IGAke3RoaXMuaWR9LWJ1dHRvbmA7XG4gICAgfVxuXG4gICAgb25DbGljaygkZXZlbnQpIHtcbiAgICAgICAgaWYgKCEhJGV2ZW50ICYmIHRoaXMudHlwZSAhPT0gJ3N1Ym1pdCcpIHtcbiAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19