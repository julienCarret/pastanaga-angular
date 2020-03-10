import { __decorate, __metadata } from "tslib";
import { ComponentRef, ComponentFactoryResolver, Directive, HostListener, Input, ViewContainerRef, ElementRef, Renderer2, } from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { coerceNumberProperty } from '@angular/cdk/coercion';
var SYSTEM = 'system';
var ACTION = 'action';
var nextId = 0;
var TooltipDirective = /** @class */ (function () {
    function TooltipDirective(element, viewContainerRef, resolver, renderer) {
        this.element = element;
        this.viewContainerRef = viewContainerRef;
        this.resolver = resolver;
        this.renderer = renderer;
        this.text = '';
        this.type = ACTION;
        this.offset = 0;
        this.id = '';
        this.isDisplayed = false;
    }
    Object.defineProperty(TooltipDirective.prototype, "paTooltipOffset", {
        get: function () { return this.offset; },
        set: function (value) { this.offset = coerceNumberProperty(value); },
        enumerable: true,
        configurable: true
    });
    TooltipDirective.prototype.focus = function (event) {
        // do not show tooltip if focus has been triggered programmatically
        if (event['sourceCapabilities']) {
            this.startDisplay(event);
        }
    };
    TooltipDirective.prototype.enter = function (event) {
        this.startDisplay(event);
    };
    TooltipDirective.prototype.move = function (event) {
        if (!!this.text && this.isDisplayed && this.type === SYSTEM) {
            var position = this.getFixedPosition(event);
            this.show(position[0], position[1]);
        }
    };
    TooltipDirective.prototype.startDisplay = function (event) {
        if (!!this.text && !this.isDisplayed) {
            var position = this.getFixedPosition(event);
            if (!this.component) {
                this.createTooltip(position[0], position[1]);
            }
            else {
                this.show(position[0], position[1]);
            }
            this.isDisplayed = true;
        }
    };
    TooltipDirective.prototype.show = function (x, y) {
        if (!!this.component) {
            this.component.instance.left = x || 0;
            this.component.instance.top = y || 0;
            this.component.instance.text = this.text;
            this.component.instance.show();
        }
    };
    TooltipDirective.prototype.createTooltip = function (x, y) {
        this.id = "pa-tooltip-" + nextId++;
        this.element.nativeElement.setAttribute('aria-describedby', this.id);
        var factory = this.resolver.resolveComponentFactory(TooltipComponent);
        this.component = this.viewContainerRef.createComponent(factory);
        this.component.instance.id = this.id;
        this.component.instance.text = this.text;
        this.component.instance.isAction = this.type === ACTION;
        this.component.instance.left = x || 0;
        this.component.instance.top = y || 0;
        this.component.instance.offset = this.offset || 0;
        this.component.instance.width = this.element.nativeElement.clientWidth;
        this.component.instance.height = this.element.nativeElement.clientHeight;
        this.renderer.appendChild(this.viewContainerRef.element.nativeElement, this.component.location.nativeElement);
    };
    TooltipDirective.prototype.hide = function () {
        if (!!this.component) {
            this.component.instance.hide();
        }
        this.isDisplayed = false;
    };
    TooltipDirective.prototype.getFixedPosition = function (event) {
        var position;
        if (this.type === ACTION) {
            var rect = this.element.nativeElement.getBoundingClientRect();
            position = [rect.left, rect.top];
        }
        else if (event.type === 'focusin') {
            var rect = this.element.nativeElement.getBoundingClientRect();
            position = [rect.right, rect.bottom];
        }
        else {
            position = [event.pageX, event.pageY];
        }
        if (!this.rootParent) {
            this.rootParent = this.getFixedRootParent(this.element.nativeElement);
        }
        var rootRect = this.rootParent.getBoundingClientRect();
        return [position[0] - rootRect.left, position[1] - rootRect.top];
    };
    TooltipDirective.prototype.getFixedRootParent = function (element) {
        if (element.tagName === 'BODY') {
            return element;
        }
        // an element with `position: fixed` will be positioned relatively to the viewport
        // unless one of the ancestor has a property `transform`, `filter` or `perspective`
        var style = getComputedStyle(element);
        if (style.transform !== 'none' || style.perspective !== 'none' || style.filter !== 'none') {
            return element;
        }
        else {
            var parent_1 = element.parentElement;
            return parent_1 ? this.getFixedRootParent(parent_1) : element;
        }
    };
    TooltipDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ViewContainerRef },
        { type: ComponentFactoryResolver },
        { type: Renderer2 }
    ]; };
    __decorate([
        Input('paTooltip'),
        __metadata("design:type", Object)
    ], TooltipDirective.prototype, "text", void 0);
    __decorate([
        Input('paTooltipType'),
        __metadata("design:type", String)
    ], TooltipDirective.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], TooltipDirective.prototype, "paTooltipOffset", null);
    __decorate([
        HostListener('focusin', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], TooltipDirective.prototype, "focus", null);
    __decorate([
        HostListener('mouseenter', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], TooltipDirective.prototype, "enter", null);
    __decorate([
        HostListener('mousemove', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], TooltipDirective.prototype, "move", null);
    __decorate([
        HostListener('focusout'),
        HostListener('mouseleave'),
        HostListener('mousedown'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TooltipDirective.prototype, "hide", null);
    TooltipDirective = __decorate([
        Directive({
            selector: '[paTooltip]'
        }),
        __metadata("design:paramtypes", [ElementRef,
            ViewContainerRef,
            ComponentFactoryResolver,
            Renderer2])
    ], TooltipDirective);
    return TooltipDirective;
}());
export { TooltipDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ3VpbGxvdGluYXdlYi9wYXN0YW5hZ2EtYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi90b29sdGlwL3Rvb2x0aXAuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsWUFBWSxFQUNaLHdCQUF3QixFQUN4QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFDTCxnQkFBZ0IsRUFDaEIsVUFBVSxFQUNWLFNBQVMsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUU3RCxJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUM7QUFDeEIsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDO0FBRXhCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQUtmO0lBY0ksMEJBQ1ksT0FBbUIsRUFDbkIsZ0JBQWtDLEVBQ2xDLFFBQWtDLEVBQ2xDLFFBQW1CO1FBSG5CLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxhQUFRLEdBQVIsUUFBUSxDQUEwQjtRQUNsQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBakJYLFNBQUksR0FBRyxFQUFFLENBQUM7UUFDTixTQUFJLEdBQXdCLE1BQU0sQ0FBQztRQUlqRCxXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRXJCLE9BQUUsR0FBRyxFQUFFLENBQUM7UUFDUixnQkFBVyxHQUFHLEtBQUssQ0FBQztJQVVqQixDQUFDO0lBZkosc0JBQUksNkNBQWU7YUFBbkIsY0FBZ0MsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUNyRCxVQUFvQixLQUFhLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxLQUFL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QWEsQ0FBQztZQUNyQyxPQUFPLFFBQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7U0FDN0Q7SUFDTCxDQUFDOztnQkEvR29CLFVBQVU7Z0JBQ0QsZ0JBQWdCO2dCQUN4Qix3QkFBd0I7Z0JBQ3hCLFNBQVM7O0lBakJYO1FBQW5CLEtBQUssQ0FBQyxXQUFXLENBQUM7O2tEQUFXO0lBQ047UUFBdkIsS0FBSyxDQUFDLGVBQWUsQ0FBQzs7a0RBQW9DO0lBRTNEO1FBREMsS0FBSyxFQUFFOzs7MkRBQzZDO0lBa0JyRDtRQURDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7eUNBQ3ZCLFVBQVU7O2lEQUt0QjtJQUdEO1FBREMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzt5Q0FDMUIsVUFBVTs7aURBRXRCO0lBR0Q7UUFEQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7O3lDQUMxQixVQUFVOztnREFLckI7SUFnREQ7UUFIQyxZQUFZLENBQUMsVUFBVSxDQUFDO1FBQ3hCLFlBQVksQ0FBQyxZQUFZLENBQUM7UUFDMUIsWUFBWSxDQUFDLFdBQVcsQ0FBQzs7OztnREFNekI7SUE3RlEsZ0JBQWdCO1FBSDVCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxhQUFhO1NBQzFCLENBQUM7eUNBZ0J1QixVQUFVO1lBQ0QsZ0JBQWdCO1lBQ3hCLHdCQUF3QjtZQUN4QixTQUFTO09BbEJ0QixnQkFBZ0IsQ0ErSDVCO0lBQUQsdUJBQUM7Q0FBQSxBQS9IRCxJQStIQztTQS9IWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudFJlZixcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgRGlyZWN0aXZlLFxuICAgIEhvc3RMaXN0ZW5lcixcbiAgICBJbnB1dCxcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgUmVuZGVyZXIyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRvb2x0aXBDb21wb25lbnQgfSBmcm9tICcuL3Rvb2x0aXAuY29tcG9uZW50JztcbmltcG9ydCB7IGNvZXJjZU51bWJlclByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcblxuY29uc3QgU1lTVEVNID0gJ3N5c3RlbSc7XG5jb25zdCBBQ1RJT04gPSAnYWN0aW9uJztcblxubGV0IG5leHRJZCA9IDA7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BhVG9vbHRpcF0nXG59KVxuZXhwb3J0IGNsYXNzIFRvb2x0aXBEaXJlY3RpdmUge1xuICAgIEBJbnB1dCgncGFUb29sdGlwJykgdGV4dCA9ICcnO1xuICAgIEBJbnB1dCgncGFUb29sdGlwVHlwZScpIHR5cGU6ICdzeXN0ZW0nIHwgJ2FjdGlvbicgPSBBQ1RJT047XG4gICAgQElucHV0KClcbiAgICBnZXQgcGFUb29sdGlwT2Zmc2V0KCk6IG51bWJlciB7IHJldHVybiB0aGlzLm9mZnNldDsgfVxuICAgIHNldCBwYVRvb2x0aXBPZmZzZXQodmFsdWU6IG51bWJlcikgeyB0aGlzLm9mZnNldCA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTsgfVxuICAgIHByb3RlY3RlZCBvZmZzZXQgPSAwO1xuXG4gICAgaWQgPSAnJztcbiAgICBpc0Rpc3BsYXllZCA9IGZhbHNlO1xuICAgIHJvb3RQYXJlbnQ/OiBIVE1MRWxlbWVudDtcblxuICAgIHByaXZhdGUgY29tcG9uZW50PzogQ29tcG9uZW50UmVmPFRvb2x0aXBDb21wb25lbnQ+O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICApIHt9XG5cbiAgICBASG9zdExpc3RlbmVyKCdmb2N1c2luJywgWyckZXZlbnQnXSlcbiAgICBmb2N1cyhldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICAvLyBkbyBub3Qgc2hvdyB0b29sdGlwIGlmIGZvY3VzIGhhcyBiZWVuIHRyaWdnZXJlZCBwcm9ncmFtbWF0aWNhbGx5XG4gICAgICAgIGlmIChldmVudFsnc291cmNlQ2FwYWJpbGl0aWVzJ10pIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnREaXNwbGF5KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBbJyRldmVudCddKVxuICAgIGVudGVyKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIHRoaXMuc3RhcnREaXNwbGF5KGV2ZW50KTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZW1vdmUnLCBbJyRldmVudCddKVxuICAgIG1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKCEhdGhpcy50ZXh0ICYmIHRoaXMuaXNEaXNwbGF5ZWQgJiYgdGhpcy50eXBlID09PSBTWVNURU0pIHtcbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5nZXRGaXhlZFBvc2l0aW9uKGV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMuc2hvdyhwb3NpdGlvblswXSwgcG9zaXRpb25bMV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhcnREaXNwbGF5KGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICghIXRoaXMudGV4dCAmJiAhdGhpcy5pc0Rpc3BsYXllZCkge1xuICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLmdldEZpeGVkUG9zaXRpb24oZXZlbnQpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlVG9vbHRpcChwb3NpdGlvblswXSwgcG9zaXRpb25bMV0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3cocG9zaXRpb25bMF0sIHBvc2l0aW9uWzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaXNEaXNwbGF5ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvdyh4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgICAgICBpZiAoISF0aGlzLmNvbXBvbmVudCkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2UubGVmdCA9IHggfHwgMDtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLnRvcCA9IHkgfHwgMDtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLnRleHQgPSB0aGlzLnRleHQ7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5pbnN0YW5jZS5zaG93KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVUb29sdGlwKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuaWQgPSBgcGEtdG9vbHRpcC0ke25leHRJZCsrfWA7XG4gICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1kZXNjcmliZWRieScsIHRoaXMuaWQpO1xuICAgICAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcbiAgICAgICAgICAgIFRvb2x0aXBDb21wb25lbnQsXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2UuaWQgPSB0aGlzLmlkO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5pbnN0YW5jZS50ZXh0ID0gdGhpcy50ZXh0O1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5pbnN0YW5jZS5pc0FjdGlvbiA9IHRoaXMudHlwZSA9PT0gQUNUSU9OO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5pbnN0YW5jZS5sZWZ0ID0geCB8fCAwO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5pbnN0YW5jZS50b3AgPSB5IHx8IDA7XG4gICAgICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLm9mZnNldCA9IHRoaXMub2Zmc2V0IHx8IDA7XG4gICAgICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLndpZHRoID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLmhlaWdodCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodDtcblxuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgdGhpcy52aWV3Q29udGFpbmVyUmVmLmVsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignZm9jdXNvdXQnKVxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicpXG4gICAgaGlkZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCEhdGhpcy5jb21wb25lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzRGlzcGxheWVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0Rml4ZWRQb3NpdGlvbihldmVudDogTW91c2VFdmVudCk6IFtudW1iZXIsIG51bWJlcl0ge1xuICAgICAgICBsZXQgcG9zaXRpb246IFtudW1iZXIsIG51bWJlcl07XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09IEFDVElPTikge1xuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgcG9zaXRpb24gPSBbcmVjdC5sZWZ0LCByZWN0LnRvcF07XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQudHlwZSA9PT0gJ2ZvY3VzaW4nKSB7XG4gICAgICAgICAgICBjb25zdCByZWN0ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IFtyZWN0LnJpZ2h0LCByZWN0LmJvdHRvbV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IFtldmVudC5wYWdlWCwgZXZlbnQucGFnZVldO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5yb290UGFyZW50KSB7XG4gICAgICAgICAgICB0aGlzLnJvb3RQYXJlbnQgPSB0aGlzLmdldEZpeGVkUm9vdFBhcmVudCh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgcm9vdFJlY3QgPSB0aGlzLnJvb3RQYXJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHJldHVybiBbcG9zaXRpb25bMF0gLSByb290UmVjdC5sZWZ0LCBwb3NpdGlvblsxXSAtIHJvb3RSZWN0LnRvcF07XG4gICAgfVxuXG4gICAgZ2V0Rml4ZWRSb290UGFyZW50KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoZWxlbWVudC50YWdOYW1lID09PSAnQk9EWScpIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIC8vIGFuIGVsZW1lbnQgd2l0aCBgcG9zaXRpb246IGZpeGVkYCB3aWxsIGJlIHBvc2l0aW9uZWQgcmVsYXRpdmVseSB0byB0aGUgdmlld3BvcnRcbiAgICAgICAgLy8gdW5sZXNzIG9uZSBvZiB0aGUgYW5jZXN0b3IgaGFzIGEgcHJvcGVydHkgYHRyYW5zZm9ybWAsIGBmaWx0ZXJgIG9yIGBwZXJzcGVjdGl2ZWBcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuICAgICAgICBpZiAoc3R5bGUudHJhbnNmb3JtICE9PSAnbm9uZScgfHwgc3R5bGUucGVyc3BlY3RpdmUgIT09ICdub25lJyB8fCBzdHlsZS5maWx0ZXIgIT09ICdub25lJykge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBwYXJlbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50ID8gdGhpcy5nZXRGaXhlZFJvb3RQYXJlbnQocGFyZW50KSA6IGVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=