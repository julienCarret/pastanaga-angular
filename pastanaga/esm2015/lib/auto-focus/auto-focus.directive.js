import { __decorate, __metadata } from "tslib";
import { Directive, AfterViewInit, ElementRef } from '@angular/core';
let AutoFocusDirective = class AutoFocusDirective {
    constructor(el) {
        this.el = el;
    }
    ngAfterViewInit() {
        this.el.nativeElement.focus();
    }
};
AutoFocusDirective.ctorParameters = () => [
    { type: ElementRef }
];
AutoFocusDirective = __decorate([
    Directive({
        selector: '[paAutoFocus]'
    }),
    __metadata("design:paramtypes", [ElementRef])
], AutoFocusDirective);
export { AutoFocusDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by1mb2N1cy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ3VpbGxvdGluYXdlYi9wYXN0YW5hZ2EtYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi9hdXRvLWZvY3VzL2F1dG8tZm9jdXMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLckUsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7SUFFM0IsWUFBb0IsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7SUFDbEMsQ0FBQztJQUVELGVBQWU7UUFDWCxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0NBRUosQ0FBQTs7WUFQMkIsVUFBVTs7QUFGekIsa0JBQWtCO0lBSDlCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxlQUFlO0tBQzVCLENBQUM7cUNBRzBCLFVBQVU7R0FGekIsa0JBQWtCLENBUzlCO1NBVFksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBBZnRlclZpZXdJbml0LCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BhQXV0b0ZvY3VzXSdcbn0pXG5leHBvcnQgY2xhc3MgQXV0b0ZvY3VzRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbn1cbiJdfQ==