import { __decorate, __metadata } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
var InputIconComponent = /** @class */ (function () {
    function InputIconComponent() {
        this.iconColor = 'primary';
        this._disabled = false;
        this.iconClick = new EventEmitter();
    }
    Object.defineProperty(InputIconComponent.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    InputIconComponent.prototype.onIconClick = function (event) {
        this.iconClick.emit(event);
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], InputIconComponent.prototype, "iconName", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], InputIconComponent.prototype, "iconTooltip", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], InputIconComponent.prototype, "iconColor", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], InputIconComponent.prototype, "disabled", null);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], InputIconComponent.prototype, "iconClick", void 0);
    InputIconComponent = __decorate([
        Component({
            selector: 'pa-input-icon',
            template: "<div class=\"pa-field-button-group\">\n    <ng-content></ng-content>\n    <div class=\"pa-field\">\n        <pa-button *ngIf=\"iconName !== 'spinner'; else showSpinner\"\n                   size=\"small\"\n                   [icon]=\"iconName\"\n                   [color]=\"iconColor\"\n                   [disabled]=\"_disabled\"\n                   [paTooltip]=\"iconTooltip\" paTooltipType=\"action\"\n                   (click)=\"onIconClick($event)\"></pa-button>\n        <ng-template #showSpinner><pa-spinner small color=\"secondary\"></pa-spinner></ng-template>\n    </div>\n</div>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".pa-field-button-group{display:-webkit-box;display:flex;position:relative}.pa-field-button-group>.pa-field:not(:first-child){position:absolute;right:0;margin-bottom:0;padding:.375rem 0}.pa-field-button-group ::ng-deep pa-input{width:100%}"]
        })
    ], InputIconComponent);
    return InputIconComponent;
}());
export { InputIconComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtaWNvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ3VpbGxvdGluYXdlYi9wYXN0YW5hZ2EtYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi90ZXh0ZmllbGQvaW5wdXQtaWNvbi9pbnB1dC1pY29uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQVE5RDtJQUFBO1FBR2EsY0FBUyxHQUE0QyxTQUFTLENBQUM7UUFJeEUsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVSLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO0lBS3pELENBQUM7SUFURyxzQkFBSSx3Q0FBUTthQUNaLGNBQWlCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7YUFEekMsVUFBYSxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBTXRFLHdDQUFXLEdBQVgsVUFBWSxLQUFpQjtRQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBWlE7UUFBUixLQUFLLEVBQUU7O3dEQUFtQjtJQUNsQjtRQUFSLEtBQUssRUFBRTs7MkRBQXNCO0lBQ3JCO1FBQVIsS0FBSyxFQUFFOzt5REFBZ0U7SUFFeEU7UUFEQyxLQUFLLEVBQUU7OztzREFDOEQ7SUFJNUQ7UUFBVCxNQUFNLEVBQUU7O3lEQUE0QztJQVQ1QyxrQkFBa0I7UUFOOUIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGVBQWU7WUFDekIsNGxCQUEwQztZQUUxQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7U0FDbEQsQ0FBQztPQUNXLGtCQUFrQixDQWM5QjtJQUFELHlCQUFDO0NBQUEsQUFkRCxJQWNDO1NBZFksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3BhLWlucHV0LWljb24nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9pbnB1dC1pY29uLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9pbnB1dC1pY29uLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIElucHV0SWNvbkNvbXBvbmVudCB7XG4gICAgQElucHV0KCkgaWNvbk5hbWU/OiBzdHJpbmc7XG4gICAgQElucHV0KCkgaWNvblRvb2x0aXA/OiBzdHJpbmc7XG4gICAgQElucHV0KCkgaWNvbkNvbG9yOiAncHJpbWFyeScgfCAnc2Vjb25kYXJ5JyB8ICdkZXN0cnVjdGl2ZScgPSAncHJpbWFyeSc7XG4gICAgQElucHV0KClcbiAgICBzZXQgZGlzYWJsZWQodmFsdWUpIHsgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gICAgZ2V0IGRpc2FibGVkKCkgeyByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7IH1cbiAgICBfZGlzYWJsZWQgPSBmYWxzZTtcblxuICAgIEBPdXRwdXQoKSBpY29uQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgICBvbkljb25DbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICB0aGlzLmljb25DbGljay5lbWl0KGV2ZW50KTtcbiAgICB9XG59XG4iXX0=