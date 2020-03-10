import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
let PastanagaSpinnerComponent = class PastanagaSpinnerComponent {
    constructor() {
        this._small = false;
        this.color = 'primary';
    }
    get small() { return this._small; }
    set small(value) { this._small = coerceBooleanProperty(value); }
    ngOnChanges(changes) {
        if (changes.backgroundColor && changes.backgroundColor.currentValue) {
            this.backgroundStyle = { 'background-color': changes.backgroundColor.currentValue };
        }
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
export { PastanagaSpinnerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ3VpbGxvdGluYXdlYi9wYXN0YW5hZ2EtYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi9wcm9ncmVzcy9zcGlubmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFPOUQsSUFBYSx5QkFBeUIsR0FBdEMsTUFBYSx5QkFBeUI7SUFBdEM7UUFNSSxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRU4sVUFBSyxHQUEwQixTQUFTLENBQUM7SUFTdEQsQ0FBQztJQWJHLElBQUksS0FBSyxLQUFjLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDNUMsSUFBSSxLQUFLLENBQUMsS0FBYyxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBT3pFLFdBQVcsQ0FBQyxPQUFPO1FBQ2YsSUFBSSxPQUFPLENBQUMsZUFBZSxJQUFJLE9BQU8sQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFO1lBQ2pFLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBQyxrQkFBa0IsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBQyxDQUFDO1NBQ3JGO0lBQ0wsQ0FBQztDQUNKLENBQUE7QUFoQlk7SUFBUixLQUFLLEVBQUU7O2tFQUEwQjtBQUN6QjtJQUFSLEtBQUssRUFBRTs7aUVBQXlCO0FBRWpDO0lBREMsS0FBSyxFQUFFOzs7c0RBQ29DO0FBSW5DO0lBQVIsS0FBSyxFQUFFOzt3REFBMEM7QUFSekMseUJBQXlCO0lBTHJDLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxZQUFZO1FBQ3RCLDRWQUF1Qzs7S0FFMUMsQ0FBQztHQUNXLHlCQUF5QixDQWlCckM7U0FqQlkseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3BhLXNwaW5uZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9zcGlubmVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9zcGlubmVyLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFBhc3RhbmFnYVNwaW5uZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAgIEBJbnB1dCgpIGJhY2tncm91bmRDb2xvcj86IHN0cmluZztcbiAgICBASW5wdXQoKSBsb2FkaW5nTWVzc2FnZT86IHN0cmluZztcbiAgICBASW5wdXQoKVxuICAgIGdldCBzbWFsbCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3NtYWxsOyB9XG4gICAgc2V0IHNtYWxsKHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX3NtYWxsID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICAgIF9zbWFsbCA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgY29sb3I6ICdwcmltYXJ5J3wnc2Vjb25kYXJ5JyA9ICdwcmltYXJ5JztcblxuICAgIGJhY2tncm91bmRTdHlsZT86IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzLmJhY2tncm91bmRDb2xvciAmJiBjaGFuZ2VzLmJhY2tncm91bmRDb2xvci5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuYmFja2dyb3VuZFN0eWxlID0geydiYWNrZ3JvdW5kLWNvbG9yJzogY2hhbmdlcy5iYWNrZ3JvdW5kQ29sb3IuY3VycmVudFZhbHVlfTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==