import { __decorate, __metadata } from "tslib";
import { Directive, AfterViewInit, ElementRef } from '@angular/core';
var AutoFocusDirective = /** @class */ (function () {
    function AutoFocusDirective(el) {
        this.el = el;
    }
    AutoFocusDirective.prototype.ngAfterViewInit = function () {
        this.el.nativeElement.focus();
    };
    AutoFocusDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    AutoFocusDirective = __decorate([
        Directive({
            selector: '[paAutoFocus]'
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], AutoFocusDirective);
    return AutoFocusDirective;
}());
export { AutoFocusDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by1mb2N1cy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ3VpbGxvdGluYXdlYi9wYXN0YW5hZ2EtYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi9hdXRvLWZvY3VzL2F1dG8tZm9jdXMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLckU7SUFFSSw0QkFBb0IsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7SUFDbEMsQ0FBQztJQUVELDRDQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNsQyxDQUFDOztnQkFMdUIsVUFBVTs7SUFGekIsa0JBQWtCO1FBSDlCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1NBQzVCLENBQUM7eUNBRzBCLFVBQVU7T0FGekIsa0JBQWtCLENBUzlCO0lBQUQseUJBQUM7Q0FBQSxBQVRELElBU0M7U0FUWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEFmdGVyVmlld0luaXQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcGFBdXRvRm9jdXNdJ1xufSlcbmV4cG9ydCBjbGFzcyBBdXRvRm9jdXNEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxufVxuIl19