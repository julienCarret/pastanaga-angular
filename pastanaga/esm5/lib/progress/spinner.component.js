import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
var PastanagaSpinnerComponent = /** @class */ (function () {
    function PastanagaSpinnerComponent() {
        this._small = false;
        this.color = 'primary';
    }
    Object.defineProperty(PastanagaSpinnerComponent.prototype, "small", {
        get: function () { return this._small; },
        set: function (value) { this._small = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    PastanagaSpinnerComponent.prototype.ngOnChanges = function (changes) {
        if (changes.backgroundColor && changes.backgroundColor.currentValue) {
            this.backgroundStyle = { 'background-color': changes.backgroundColor.currentValue };
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PastanagaSpinnerComponent.prototype, "backgroundColor", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PastanagaSpinnerComponent.prototype, "loadingMessage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], PastanagaSpinnerComponent.prototype, "small", null);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PastanagaSpinnerComponent.prototype, "color", void 0);
    PastanagaSpinnerComponent = __decorate([
        Component({
            selector: 'pa-spinner',
            template: "<div *ngIf=\"loadingMessage\" class=\"pa-spinner-message\" translate>{{loadingMessage}}</div>\n<div class=\"pa-progress-circle-spinner\" [class.pa-progress-small]=\"_small\" [class.pa-secondary]=\"color === 'secondary'\">\n    <div [ngStyle]=\"backgroundStyle\" class=\"pa-progress-circle-spinner-wrapper\">Loading\u2026</div>\n</div>\n",
            styles: [":host{display:block;position:relative}:host .pa-spinner-message{position:absolute;top:-24px;width:100%;text-align:center}:host-context(.pa-field-button-group) .pa-progress-circle-spinner.pa-progress-small{margin:10px 8px}.pa-progress-circle-spinner{overflow:hidden;border-radius:500px;color:#edf1f2;font-size:11px;text-indent:-99999em;margin:55px auto;position:relative;width:80px;height:80px;box-shadow:inset 0 0 0 3px;-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-mask:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDgwIDgwIj4gIDxwYXRoIGZpbGw9IiM5Nzk3OTciIGQ9Ik00MCw3NyBDNjAuNDM0NTM1Nyw3NyA3Nyw2MC40MzQ1MzU3IDc3LDQwIEM3NywxOS41NjU0NjQzIDYwLjQzNDUzNTcsMyA0MCwzIEMxOS41NjU0NjQzLDMgMywxOS41NjU0NjQzIDMsNDAgQzMsNjAuNDM0NTM1NyAxOS41NjU0NjQzLDc3IDQwLDc3IFogTTQwLDgwIEMxNy45MDg2MSw4MCAwLDYyLjA5MTM5IDAsNDAgQzAsMTcuOTA4NjEgMTcuOTA4NjEsMCA0MCwwIEM2Mi4wOTEzOSwwIDgwLDE3LjkwODYxIDgwLDQwIEM4MCw2Mi4wOTEzOSA2Mi4wOTEzOSw4MCA0MCw4MCBaIi8+PC9zdmc+);mask:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDgwIDgwIj4gIDxwYXRoIGZpbGw9IiM5Nzk3OTciIGQ9Ik00MCw3NyBDNjAuNDM0NTM1Nyw3NyA3Nyw2MC40MzQ1MzU3IDc3LDQwIEM3NywxOS41NjU0NjQzIDYwLjQzNDUzNTcsMyA0MCwzIEMxOS41NjU0NjQzLDMgMywxOS41NjU0NjQzIDMsNDAgQzMsNjAuNDM0NTM1NyAxOS41NjU0NjQzLDc3IDQwLDc3IFogTTQwLDgwIEMxNy45MDg2MSw4MCAwLDYyLjA5MTM5IDAsNDAgQzAsMTcuOTA4NjEgMTcuOTA4NjEsMCA0MCwwIEM2Mi4wOTEzOSwwIDgwLDE3LjkwODYxIDgwLDQwIEM4MCw2Mi4wOTEzOSA2Mi4wOTEzOSw4MCA0MCw4MCBaIi8+PC9zdmc+)}.pa-progress-circle-spinner::after,.pa-progress-circle-spinner::before{position:absolute;content:\"\"}.pa-progress-circle-spinner::before{width:40px;height:80px;background:#2280a0;border-radius:80px 0 0 80px;-webkit-transform-origin:40px 40px;transform-origin:40px 40px;-webkit-animation:2s 1.5s infinite spinner-circle;animation:2s 1.5s infinite spinner-circle}.pa-progress-circle-spinner::after{width:40px;height:80px;background:#2280a0;border-radius:0 80px 80px 0;left:40px;top:0;-webkit-transform-origin:0 40px;transform-origin:0 40px;-webkit-animation:2s infinite spinner-circle;animation:2s infinite spinner-circle}.pa-progress-circle-spinner.pa-secondary::after,.pa-progress-circle-spinner.pa-secondary::before{background:#826a6a}.pa-progress-circle-spinner-wrapper{background:#fff;position:relative;width:74px;height:74px;top:3px;left:3px;border-radius:500px;z-index:2}.pa-progress-circle-spinner.pa-progress-small{margin:0;width:20px;height:20px;-webkit-mask-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj4gIDxwYXRoIGZpbGw9IiM5Nzk3OTciIGQ9Ik0xMCwxNyBDMTMuODY1OTkzMiwxNyAxNywxMy44NjU5OTMyIDE3LDEwIEMxNyw2LjEzNDAwNjc1IDEzLjg2NTk5MzIsMyAxMCwzIEM2LjEzNDAwNjc1LDMgMyw2LjEzNDAwNjc1IDMsMTAgQzMsMTMuODY1OTkzMiA2LjEzNDAwNjc1LDE3IDEwLDE3IFogTTEwLDIwIEM0LjQ3NzE1MjUsMjAgMCwxNS41MjI4NDc1IDAsMTAgQzAsNC40NzcxNTI1IDQuNDc3MTUyNSwwIDEwLDAgQzE1LjUyMjg0NzUsMCAyMCw0LjQ3NzE1MjUgMjAsMTAgQzIwLDE1LjUyMjg0NzUgMTUuNTIyODQ3NSwyMCAxMCwyMCBaIi8+PC9zdmc+)}.pa-progress-circle-spinner.pa-progress-small::before{width:10px;height:20px;border-radius:20px 0 0 20px;-webkit-transform-origin:10px 10px;transform-origin:10px 10px}.pa-progress-circle-spinner.pa-progress-small::after{width:10px;height:20px;border-radius:0 20px 20px 0;top:0;left:10px;-webkit-transform-origin:0 10px;transform-origin:0 10px}.pa-progress-circle-spinner.pa-progress-small .pa-progress-circle-spinner-wrapper{width:14px;height:14px}@-webkit-keyframes spinner-circle{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spinner-circle{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}"]
        })
    ], PastanagaSpinnerComponent);
    return PastanagaSpinnerComponent;
}());
export { PastanagaSpinnerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ3VpbGxvdGluYXdlYi9wYXN0YW5hZ2EtYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi9wcm9ncmVzcy9zcGlubmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFPOUQ7SUFBQTtRQU1JLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFFTixVQUFLLEdBQTBCLFNBQVMsQ0FBQztJQVN0RCxDQUFDO0lBYkcsc0JBQUksNENBQUs7YUFBVCxjQUF1QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2FBQzVDLFVBQVUsS0FBYyxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FEN0I7SUFRNUMsK0NBQVcsR0FBWCxVQUFZLE9BQU87UUFDZixJQUFJLE9BQU8sQ0FBQyxlQUFlLElBQUksT0FBTyxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUU7WUFDakUsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFDLGtCQUFrQixFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFDLENBQUM7U0FDckY7SUFDTCxDQUFDO0lBZlE7UUFBUixLQUFLLEVBQUU7O3NFQUEwQjtJQUN6QjtRQUFSLEtBQUssRUFBRTs7cUVBQXlCO0lBRWpDO1FBREMsS0FBSyxFQUFFOzs7MERBQ29DO0lBSW5DO1FBQVIsS0FBSyxFQUFFOzs0REFBMEM7SUFSekMseUJBQXlCO1FBTHJDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLDRWQUF1Qzs7U0FFMUMsQ0FBQztPQUNXLHlCQUF5QixDQWlCckM7SUFBRCxnQ0FBQztDQUFBLEFBakJELElBaUJDO1NBakJZLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwYS1zcGlubmVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc3Bpbm5lci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vc3Bpbm5lci5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBQYXN0YW5hZ2FTcGlubmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoKSBiYWNrZ3JvdW5kQ29sb3I/OiBzdHJpbmc7XG4gICAgQElucHV0KCkgbG9hZGluZ01lc3NhZ2U/OiBzdHJpbmc7XG4gICAgQElucHV0KClcbiAgICBnZXQgc21hbGwoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9zbWFsbDsgfVxuICAgIHNldCBzbWFsbCh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl9zbWFsbCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgICBfc21hbGwgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIGNvbG9yOiAncHJpbWFyeSd8J3NlY29uZGFyeScgPSAncHJpbWFyeSc7XG5cbiAgICBiYWNrZ3JvdW5kU3R5bGU/OiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9O1xuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlcykge1xuICAgICAgICBpZiAoY2hhbmdlcy5iYWNrZ3JvdW5kQ29sb3IgJiYgY2hhbmdlcy5iYWNrZ3JvdW5kQ29sb3IuY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmJhY2tncm91bmRTdHlsZSA9IHsnYmFja2dyb3VuZC1jb2xvcic6IGNoYW5nZXMuYmFja2dyb3VuZENvbG9yLmN1cnJlbnRWYWx1ZX07XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=