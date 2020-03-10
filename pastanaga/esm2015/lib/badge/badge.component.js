import { __decorate, __metadata } from "tslib";
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, ChangeDetectorRef, ViewRef } from '@angular/core';
import { Avatar } from '../avatar/avatar.model';
let BadgeComponent = class BadgeComponent {
    constructor(elementRef, changeDetector) {
        this.elementRef = elementRef;
        this.changeDetector = changeDetector;
        this.id = '';
        this.isAccented = false;
        this.isSmall = false;
        this.isError = false;
        this.canBeRemoved = false;
        this.remove = new EventEmitter();
        this.render = new EventEmitter();
        this.colorClass = '';
        this.text = '';
    }
    set color(value) {
        if (!!value) {
            this.colorClass = `pa-badge-${value}`;
        }
    }
    set hexaColor(value) {
        if (!!value) {
            if (!this.colorClass) {
                this.colorStyle = {
                    'background-color': value
                };
                const luminance = this.calcLuminance(value);
                if (luminance < 0.61) {
                    this.colorStyle['color'] = '#fff';
                }
            }
        }
    }
    set value(val) {
        this._value = val;
        // accented and small by default when badge of value kind
        if (typeof this.isAccented === 'undefined') {
            this.isAccented = true;
        }
        if (typeof this.isSmall === 'undefined') {
            this.isSmall = true;
        }
    }
    set avatar(value) {
        if (!!value) {
            this._avatar = value;
        }
    }
    ngAfterViewInit() {
        if (!!this.maxWidth && !!this.textContent) {
            const textContent = this.textContent;
            setTimeout(() => {
                if (!!this.changeDetector && !this.changeDetector.destroyed) {
                    this.text = textContent.nativeElement.textContent.trim();
                    this.changeDetector.detectChanges();
                }
            });
        }
        this.render.emit(this.elementRef);
    }
    /**
     * Solution to calc luminance is coming from
     * https://stackoverflow.com/a/1754281/2116063
     * and https://stackoverflow.com/a/12043228/2116063 (for javascript adaptation)
     */
    /* tslint:disable:no-bitwise */
    calcLuminance(hexa) {
        const color = hexa.substring(1); // strip #
        const rgb = parseInt(color, 16); // convert rrggbb to decimal
        const r = (rgb >> 16) & 0xff; // extract red
        const g = (rgb >> 8) & 0xff; // extract green
        const b = (rgb >> 0) & 0xff; // extract blue
        return (r * 0.299 + g * 0.587 + b * 0.114) / 256;
    }
};
BadgeComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], BadgeComponent.prototype, "id", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], BadgeComponent.prototype, "color", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], BadgeComponent.prototype, "hexaColor", null);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BadgeComponent.prototype, "isAccented", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BadgeComponent.prototype, "isSmall", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BadgeComponent.prototype, "isError", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BadgeComponent.prototype, "canBeRemoved", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], BadgeComponent.prototype, "maxWidth", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], BadgeComponent.prototype, "value", null);
__decorate([
    Input(),
    __metadata("design:type", Number)
], BadgeComponent.prototype, "of", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], BadgeComponent.prototype, "buttons", void 0);
__decorate([
    Input(),
    __metadata("design:type", Avatar),
    __metadata("design:paramtypes", [Avatar])
], BadgeComponent.prototype, "avatar", null);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], BadgeComponent.prototype, "remove", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], BadgeComponent.prototype, "render", void 0);
__decorate([
    ViewChild('textContent'),
    __metadata("design:type", ElementRef)
], BadgeComponent.prototype, "textContent", void 0);
BadgeComponent = __decorate([
    Component({
        selector: 'pa-badge',
        template: "<span class=\"pa-badge {{colorClass}}\"\n      [id]=\"id\"\n      [class.pa-badge-accent]=\"isAccented\"\n      [class.pa-badge-small]=\"isSmall\"\n      [class.pa-badge-error]=\"isError\"\n      [class.pa-badge-avatar]=\"!!_avatar\"\n      [ngStyle]=\"colorStyle\">\n\n    <pa-avatar *ngIf=\"!!_avatar\" [avatar]=\"_avatar\" size=\"small\"></pa-avatar>\n\n    <span *ngIf=\"!_value\"\n          class=\"pa-badge-value\"\n          [ngStyle]=\"colorStyle\"\n          [class.pa-badge-ellipsis]=\"!!maxWidth\"\n          [style.max-width]=\"maxWidth\"\n          [paTooltip]=\"text\" #textContent><ng-content></ng-content></span>\n    <pa-button *ngFor=\"let btn of buttons\"\n                 size=\"small\" [icon]=\"btn.icon\" [color]=\"btn.color\" (click)=\"btn.onClick()\">{{btn.name}}</pa-button>\n    <pa-button *ngIf=\"canBeRemoved\" aria-label=\"Remove\"\n                 size=\"small\" icon=\"clear\" color=\"secondary\" (click)=\"remove.emit($event)\">Remove</pa-button>\n    <ng-container *ngIf=\"!!_value || _value === 0\">{{ _value | number }}<span *ngIf=\"of\"><abbr title=\"of\">/</abbr>{{ of | number }}</span></ng-container>\n</span>\n\n",
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: ["@charset \"UTF-8\";.pa-badge{display:inline-block;font-size:.875rem;line-height:1.125rem;letter-spacing:.03em;padding:.1875rem .375rem;margin-left:-.375rem;margin-right:.75rem;font-weight:300;text-align:center;white-space:nowrap;vertical-align:baseline;overflow:hidden;border-radius:2px;color:#3a3a3a;background-color:#dee7e9}.pa-badge:empty{display:none}.pa-badge ::ng-deep pa-button button{margin:-.75rem -.1875rem}.pa-badge ::ng-deep .pa-button-wrapper{margin-top:-4px}.pa-badge ::ng-deep pa-button:last-child button{margin-right:-.375rem}.pa-badge .pa-avatar-small{margin:-1.03125rem .375rem -.84375rem -.5625rem}.pa-badge .pa-avatar-small img{left:0}.pa-badge>.pa-badge-ellipsis{opacity:.8}.pa-badge.pa-badge-avatar{border-bottom-left-radius:.75rem;border-top-left-radius:.75rem;padding:0 .1875rem 0 0}.pa-badge.pa-badge-avatar pa-avatar{margin-right:.375rem}.pa-badge.pa-badge-avatar .pa-badge-value{bottom:-1px}.pa-badge.pa-badge-avatar pa-button ::ng-deep .pa-button{margin-bottom:-.9375rem}.pa-badge-small{font-size:calc(.875rem * 12/14);line-height:.75rem;padding:.1875rem}.pa-badge-small.pa-badge-accent{padding-right:.375rem;padding-left:.375rem;min-width:1.3125rem}.on-button .pa-badge{position:relative;top:-1px}.pa-badge .pa-badge-ellipsis{max-width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-overflow:\"\u2026\";display:inline-block;vertical-align:middle}.pa-badge-accent{padding-right:.5625rem;padding-left:.5625rem;border-radius:100px}.pa-badge-positive{background-color:#24a506;color:#fff}.pa-badge-destructive{background-color:#e40166;color:#fff}.pa-badge-warning{background-color:#bdb107;color:#fff}.pa-badge-secondary{background-color:#826a6a;color:#fff}.pa-badge-primary{background-color:#2280a0;color:#fff}.pa-badge-error{color:#e40166;background:rgba(228,1,102,.05)}"]
    }),
    __metadata("design:paramtypes", [ElementRef,
        ChangeDetectorRef])
], BadgeComponent);
export { BadgeComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFkZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGd1aWxsb3RpbmF3ZWIvcGFzdGFuYWdhLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvYmFkZ2UvYmFkZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsYUFBYSxFQUNiLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsT0FBTyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQVFoRCxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBc0R2QixZQUNXLFVBQXNCLEVBQ3JCLGNBQWlDO1FBRGxDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDckIsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBdkRwQyxPQUFFLEdBQUcsRUFBRSxDQUFDO1FBbUJSLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBcUJwQixXQUFNLEdBQTZCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdEQsV0FBTSxHQUE2QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWhFLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFFaEIsU0FBSSxHQUFHLEVBQUUsQ0FBQztJQVFQLENBQUM7SUF2REssSUFBSSxLQUFLLENBQUMsS0FBSztRQUNwQixJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsVUFBVSxHQUFHLFlBQVksS0FBSyxFQUFFLENBQUM7U0FDekM7SUFDTCxDQUFDO0lBQ1EsSUFBSSxTQUFTLENBQUMsS0FBSztRQUN4QixJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUU7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QUFzQjtBQUNyQjtJQUFSLEtBQUssRUFBRTs7Z0RBQW1CO0FBQ2xCO0lBQVIsS0FBSyxFQUFFOzs7MkNBU1A7QUFDUTtJQUFSLEtBQUssRUFBRTs7MENBQWE7QUFDWjtJQUFSLEtBQUssRUFBRTs7K0NBQXdCO0FBQ3ZCO0lBQVIsS0FBSyxFQUFFOzhCQUFtQixNQUFNO3FDQUFOLE1BQU07NENBSWhDO0FBR1M7SUFBVCxNQUFNLEVBQUU7OEJBQVMsWUFBWTs4Q0FBa0M7QUFDdEQ7SUFBVCxNQUFNLEVBQUU7OEJBQVMsWUFBWTs4Q0FBa0M7QUFPdEM7SUFBekIsU0FBUyxDQUFDLGFBQWEsQ0FBQzs4QkFBZSxVQUFVO21EQUFDO0FBcEQxQyxjQUFjO0lBTjFCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLDhvQ0FBcUM7UUFFckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O0tBQ2xELENBQUM7cUNBd0R5QixVQUFVO1FBQ0wsaUJBQWlCO0dBeERwQyxjQUFjLENBNEYxQjtTQTVGWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBPdXRwdXQsXG4gICAgVmlld0NoaWxkLFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIFZpZXdSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYWRnZU1vZGVsIH0gZnJvbSAnLi9iYWRnZS5tb2RlbCc7XG5pbXBvcnQgeyBBdmF0YXIgfSBmcm9tICcuLi9hdmF0YXIvYXZhdGFyLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwYS1iYWRnZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2JhZGdlLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9iYWRnZS5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBCYWRnZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICAgIEBJbnB1dCgpIGlkID0gJyc7XG4gICAgQElucHV0KCkgc2V0IGNvbG9yKHZhbHVlKSB7XG4gICAgICAgIGlmICghIXZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbG9yQ2xhc3MgPSBgcGEtYmFkZ2UtJHt2YWx1ZX1gO1xuICAgICAgICB9XG4gICAgfVxuICAgIEBJbnB1dCgpIHNldCBoZXhhQ29sb3IodmFsdWUpIHtcbiAgICAgICAgaWYgKCEhdmFsdWUpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5jb2xvckNsYXNzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvclN0eWxlID0ge1xuICAgICAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IHZhbHVlXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBjb25zdCBsdW1pbmFuY2UgPSB0aGlzLmNhbGNMdW1pbmFuY2UodmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmIChsdW1pbmFuY2UgPCAwLjYxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sb3JTdHlsZVsnY29sb3InXSA9ICcjZmZmJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgQElucHV0KCkgaXNBY2NlbnRlZCA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGlzU21hbGwgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBpc0Vycm9yID0gZmFsc2U7XG4gICAgQElucHV0KCkgY2FuQmVSZW1vdmVkID0gZmFsc2U7XG4gICAgQElucHV0KCkgbWF4V2lkdGg/OiBzdHJpbmc7XG4gICAgQElucHV0KCkgc2V0IHZhbHVlKHZhbCkge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbDtcbiAgICAgICAgLy8gYWNjZW50ZWQgYW5kIHNtYWxsIGJ5IGRlZmF1bHQgd2hlbiBiYWRnZSBvZiB2YWx1ZSBraW5kXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5pc0FjY2VudGVkID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpcy5pc0FjY2VudGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuaXNTbWFsbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXMuaXNTbWFsbCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQElucHV0KCkgb2Y/OiBudW1iZXI7XG4gICAgQElucHV0KCkgYnV0dG9ucz86IEJhZGdlTW9kZWxbXTtcbiAgICBASW5wdXQoKSBzZXQgYXZhdGFyKHZhbHVlOiBBdmF0YXIpIHtcbiAgICAgICAgaWYgKCEhdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2F2YXRhciA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9hdmF0YXI/OiBBdmF0YXI7XG5cbiAgICBAT3V0cHV0KCkgcmVtb3ZlOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHJlbmRlcjogRXZlbnRFbWl0dGVyPEVsZW1lbnRSZWY+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgY29sb3JDbGFzcyA9ICcnO1xuICAgIGNvbG9yU3R5bGU/OiB7fTtcbiAgICB0ZXh0ID0gJyc7XG4gICAgX3ZhbHVlPzogbnVtYmVyO1xuXG4gICAgQFZpZXdDaGlsZCgndGV4dENvbnRlbnQnKSB0ZXh0Q29udGVudD86IEVsZW1lbnRSZWY7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICkge31cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKCEhdGhpcy5tYXhXaWR0aCAmJiAhIXRoaXMudGV4dENvbnRlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHRleHRDb250ZW50ID0gdGhpcy50ZXh0Q29udGVudDtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghIXRoaXMuY2hhbmdlRGV0ZWN0b3IgJiYgISh0aGlzLmNoYW5nZURldGVjdG9yIGFzIFZpZXdSZWYpLmRlc3Ryb3llZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHQgPSB0ZXh0Q29udGVudC5uYXRpdmVFbGVtZW50LnRleHRDb250ZW50LnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW5kZXIuZW1pdCh0aGlzLmVsZW1lbnRSZWYpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU29sdXRpb24gdG8gY2FsYyBsdW1pbmFuY2UgaXMgY29taW5nIGZyb21cbiAgICAgKiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTc1NDI4MS8yMTE2MDYzXG4gICAgICogYW5kIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xMjA0MzIyOC8yMTE2MDYzIChmb3IgamF2YXNjcmlwdCBhZGFwdGF0aW9uKVxuICAgICAqL1xuXG4gICAgLyogdHNsaW50OmRpc2FibGU6bm8tYml0d2lzZSAqL1xuICAgIHByaXZhdGUgY2FsY0x1bWluYW5jZShoZXhhOiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBjb2xvciA9IGhleGEuc3Vic3RyaW5nKDEpOyAgICAgIC8vIHN0cmlwICNcbiAgICAgICAgY29uc3QgcmdiID0gcGFyc2VJbnQoY29sb3IsIDE2KTsgICAvLyBjb252ZXJ0IHJyZ2diYiB0byBkZWNpbWFsXG4gICAgICAgIGNvbnN0IHIgPSAocmdiID4+IDE2KSAmIDB4ZmY7ICAvLyBleHRyYWN0IHJlZFxuICAgICAgICBjb25zdCBnID0gKHJnYiA+PiA4KSAmIDB4ZmY7ICAvLyBleHRyYWN0IGdyZWVuXG4gICAgICAgIGNvbnN0IGIgPSAocmdiID4+IDApICYgMHhmZjsgIC8vIGV4dHJhY3QgYmx1ZVxuXG4gICAgICAgIHJldHVybiAociAqIDAuMjk5ICsgZyAqIDAuNTg3ICsgYiAqIDAuMTE0KSAvIDI1NjtcbiAgICB9XG5cbiAgICAvKiB0c2xpbnQ6ZW5hYmxlOm5vLWJpdHdpc2UgKi9cblxufVxuIl19