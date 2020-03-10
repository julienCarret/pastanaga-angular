import { __decorate, __metadata } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
let InputIconComponent = class InputIconComponent {
    constructor() {
        this.iconColor = 'primary';
        this._disabled = false;
        this.iconClick = new EventEmitter();
    }
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    get disabled() { return this._disabled; }
    onIconClick(event) {
        this.iconClick.emit(event);
    }
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
export { InputIconComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtaWNvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ3VpbGxvdGluYXdlYi9wYXN0YW5hZ2EtYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi90ZXh0ZmllbGQvaW5wdXQtaWNvbi9pbnB1dC1pY29uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQVE5RCxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtJQUEvQjtRQUdhLGNBQVMsR0FBNEMsU0FBUyxDQUFDO1FBSXhFLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFFUixjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQWMsQ0FBQztJQUt6RCxDQUFDO0lBVEcsSUFBSSxRQUFRLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLElBQUksUUFBUSxLQUFLLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFLekMsV0FBVyxDQUFDLEtBQWlCO1FBQ3pCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7Q0FDSixDQUFBO0FBYlk7SUFBUixLQUFLLEVBQUU7O29EQUFtQjtBQUNsQjtJQUFSLEtBQUssRUFBRTs7dURBQXNCO0FBQ3JCO0lBQVIsS0FBSyxFQUFFOztxREFBZ0U7QUFFeEU7SUFEQyxLQUFLLEVBQUU7OztrREFDOEQ7QUFJNUQ7SUFBVCxNQUFNLEVBQUU7O3FEQUE0QztBQVQ1QyxrQkFBa0I7SUFOOUIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGVBQWU7UUFDekIsNGxCQUEwQztRQUUxQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7S0FDbEQsQ0FBQztHQUNXLGtCQUFrQixDQWM5QjtTQWRZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwYS1pbnB1dC1pY29uJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vaW5wdXQtaWNvbi5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vaW5wdXQtaWNvbi5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBJbnB1dEljb25Db21wb25lbnQge1xuICAgIEBJbnB1dCgpIGljb25OYW1lPzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGljb25Ub29sdGlwPzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGljb25Db2xvcjogJ3ByaW1hcnknIHwgJ3NlY29uZGFyeScgfCAnZGVzdHJ1Y3RpdmUnID0gJ3ByaW1hcnknO1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlKSB7IHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICAgIGdldCBkaXNhYmxlZCgpIHsgcmV0dXJuIHRoaXMuX2Rpc2FibGVkOyB9XG4gICAgX2Rpc2FibGVkID0gZmFsc2U7XG5cbiAgICBAT3V0cHV0KCkgaWNvbkNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gICAgb25JY29uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5pY29uQ2xpY2suZW1pdChldmVudCk7XG4gICAgfVxufVxuIl19