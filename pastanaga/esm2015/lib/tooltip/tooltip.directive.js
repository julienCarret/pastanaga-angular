import { __decorate, __metadata } from "tslib";
import { ComponentRef, ComponentFactoryResolver, Directive, HostListener, Input, ViewContainerRef, ElementRef, Renderer2, } from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { coerceNumberProperty } from '@angular/cdk/coercion';
const SYSTEM = 'system';
const ACTION = 'action';
let nextId = 0;
let TooltipDirective = class TooltipDirective {
    constructor(element, viewContainerRef, resolver, renderer) {
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
    get paTooltipOffset() { return this.offset; }
    set paTooltipOffset(value) { this.offset = coerceNumberProperty(value); }
    focus(event) {
        // do not show tooltip if focus has been triggered programmatically
        if (event['sourceCapabilities']) {
            this.startDisplay(event);
        }
    }
    enter(event) {
        this.startDisplay(event);
    }
    move(event) {
        if (!!this.text && this.isDisplayed && this.type === SYSTEM) {
            const position = this.getFixedPosition(event);
            this.show(position[0], position[1]);
        }
    }
    startDisplay(event) {
        if (!!this.text && !this.isDisplayed) {
            const position = this.getFixedPosition(event);
            if (!this.component) {
                this.createTooltip(position[0], position[1]);
            }
            else {
                this.show(position[0], position[1]);
            }
            this.isDisplayed = true;
        }
    }
    show(x, y) {
        if (!!this.component) {
            this.component.instance.left = x || 0;
            this.component.instance.top = y || 0;
            this.component.instance.text = this.text;
            this.component.instance.show();
        }
    }
    createTooltip(x, y) {
        this.id = `pa-tooltip-${nextId++}`;
        this.element.nativeElement.setAttribute('aria-describedby', this.id);
        const factory = this.resolver.resolveComponentFactory(TooltipComponent);
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
    }
    hide() {
        if (!!this.component) {
            this.component.instance.hide();
        }
        this.isDisplayed = false;
    }
    getFixedPosition(event) {
        let position;
        if (this.type === ACTION) {
            const rect = this.element.nativeElement.getBoundingClientRect();
            position = [rect.left, rect.top];
        }
        else if (event.type === 'focusin') {
            const rect = this.element.nativeElement.getBoundingClientRect();
            position = [rect.right, rect.bottom];
        }
        else {
            position = [event.pageX, event.pageY];
        }
        if (!this.rootParent) {
            this.rootParent = this.getFixedRootParent(this.element.nativeElement);
        }
        const rootRect = this.rootParent.getBoundingClientRect();
        return [position[0] - rootRect.left, position[1] - rootRect.top];
    }
    getFixedRootParent(element) {
        if (element.tagName === 'BODY') {
            return element;
        }
        // an element with `position: fixed` will be positioned relatively to the viewport
        // unless one of the ancestor has a property `transform`, `filter` or `perspective`
        const style = getComputedStyle(element);
        if (style.transform !== 'none' || style.perspective !== 'none' || style.filter !== 'none') {
            return element;
        }
        else {
            const parent = element.parentElement;
            return parent ? this.getFixedRootParent(parent) : element;
        }
    }
};
TooltipDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: ViewContainerRef },
    { type: ComponentFactoryResolver },
    { type: Renderer2 }
];
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
export { TooltipDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ3VpbGxvdGluYXdlYi9wYXN0YW5hZ2EtYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi90b29sdGlwL3Rvb2x0aXAuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsWUFBWSxFQUNaLHdCQUF3QixFQUN4QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFDTCxnQkFBZ0IsRUFDaEIsVUFBVSxFQUNWLFNBQVMsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUU3RCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUM7QUFDeEIsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDO0FBRXhCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQUtmLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBY3pCLFlBQ1ksT0FBbUIsRUFDbkIsZ0JBQWtDLEVBQ2xDLFFBQWtDLEVBQ2xDLFFBQW1CO1FBSG5CLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxhQUFRLEdBQVIsUUFBUSxDQUEwQjtRQUNsQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBakJYLFNBQUksR0FBRyxFQUFFLENBQUM7UUFDTixTQUFJLEdBQXdCLE1BQU0sQ0FBQztRQUlqRCxXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRXJCLE9BQUUsR0FBRyxFQUFFLENBQUM7UUFDUixnQkFBVyxHQUFHLEtBQUssQ0FBQztJQVVqQixDQUFDO0lBZkosSUFBSSxlQUFlLEtBQWEsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNyRCxJQUFJLGVBQWUsQ0FBQyxLQUFhLElBQUksSUFBSSxD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QUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7U0FDN0Q7SUFDTCxDQUFDO0NBQ0osQ0FBQTs7WUFoSHdCLFVBQVU7WUFDRCxnQkFBZ0I7WUFDeEIsd0JBQXdCO1lBQ3hCLFNBQVM7O0FBakJYO0lBQW5CLEtBQUssQ0FBQyxXQUFXLENBQUM7OzhDQUFXO0FBQ047SUFBdkIsS0FBSyxDQUFDLGVBQWUsQ0FBQzs7OENBQW9DO0FBRTNEO0lBREMsS0FBSyxFQUFFOzs7dURBQzZDO0FBa0JyRDtJQURDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7cUNBQ3ZCLFVBQVU7OzZDQUt0QjtBQUdEO0lBREMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztxQ0FDMUIsVUFBVTs7NkNBRXRCO0FBR0Q7SUFEQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7O3FDQUMxQixVQUFVOzs0Q0FLckI7QUFnREQ7SUFIQyxZQUFZLENBQUMsVUFBVSxDQUFDO0lBQ3hCLFlBQVksQ0FBQyxZQUFZLENBQUM7SUFDMUIsWUFBWSxDQUFDLFdBQVcsQ0FBQzs7Ozs0Q0FNekI7QUE3RlEsZ0JBQWdCO0lBSDVCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxhQUFhO0tBQzFCLENBQUM7cUNBZ0J1QixVQUFVO1FBQ0QsZ0JBQWdCO1FBQ3hCLHdCQUF3QjtRQUN4QixTQUFTO0dBbEJ0QixnQkFBZ0IsQ0ErSDVCO1NBL0hZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50UmVmLFxuICAgIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBEaXJlY3RpdmUsXG4gICAgSG9zdExpc3RlbmVyLFxuICAgIElucHV0LFxuICAgIFZpZXdDb250YWluZXJSZWYsXG4gICAgRWxlbWVudFJlZixcbiAgICBSZW5kZXJlcjIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVG9vbHRpcENvbXBvbmVudCB9IGZyb20gJy4vdG9vbHRpcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgY29lcmNlTnVtYmVyUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuXG5jb25zdCBTWVNURU0gPSAnc3lzdGVtJztcbmNvbnN0IEFDVElPTiA9ICdhY3Rpb24nO1xuXG5sZXQgbmV4dElkID0gMDtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcGFUb29sdGlwXSdcbn0pXG5leHBvcnQgY2xhc3MgVG9vbHRpcERpcmVjdGl2ZSB7XG4gICAgQElucHV0KCdwYVRvb2x0aXAnKSB0ZXh0ID0gJyc7XG4gICAgQElucHV0KCdwYVRvb2x0aXBUeXBlJykgdHlwZTogJ3N5c3RlbScgfCAnYWN0aW9uJyA9IEFDVElPTjtcbiAgICBASW5wdXQoKVxuICAgIGdldCBwYVRvb2x0aXBPZmZzZXQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMub2Zmc2V0OyB9XG4gICAgc2V0IHBhVG9vbHRpcE9mZnNldCh2YWx1ZTogbnVtYmVyKSB7IHRoaXMub2Zmc2V0ID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUpOyB9XG4gICAgcHJvdGVjdGVkIG9mZnNldCA9IDA7XG5cbiAgICBpZCA9ICcnO1xuICAgIGlzRGlzcGxheWVkID0gZmFsc2U7XG4gICAgcm9vdFBhcmVudD86IEhUTUxFbGVtZW50O1xuXG4gICAgcHJpdmF0ZSBjb21wb25lbnQ/OiBDb21wb25lbnRSZWY8VG9vbHRpcENvbXBvbmVudD47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICkge31cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzaW4nLCBbJyRldmVudCddKVxuICAgIGZvY3VzKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIC8vIGRvIG5vdCBzaG93IHRvb2x0aXAgaWYgZm9jdXMgaGFzIGJlZW4gdHJpZ2dlcmVkIHByb2dyYW1tYXRpY2FsbHlcbiAgICAgICAgaWYgKGV2ZW50Wydzb3VyY2VDYXBhYmlsaXRpZXMnXSkge1xuICAgICAgICAgICAgdGhpcy5zdGFydERpc3BsYXkoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicsIFsnJGV2ZW50J10pXG4gICAgZW50ZXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5zdGFydERpc3BsYXkoZXZlbnQpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlbW92ZScsIFsnJGV2ZW50J10pXG4gICAgbW92ZShldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAoISF0aGlzLnRleHQgJiYgdGhpcy5pc0Rpc3BsYXllZCAmJiB0aGlzLnR5cGUgPT09IFNZU1RFTSkge1xuICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLmdldEZpeGVkUG9zaXRpb24oZXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5zaG93KHBvc2l0aW9uWzBdLCBwb3NpdGlvblsxXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydERpc3BsYXkoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKCEhdGhpcy50ZXh0ICYmICF0aGlzLmlzRGlzcGxheWVkKSB7XG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuZ2V0Rml4ZWRQb3NpdGlvbihldmVudCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuY29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVUb29sdGlwKHBvc2l0aW9uWzBdLCBwb3NpdGlvblsxXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvdyhwb3NpdGlvblswXSwgcG9zaXRpb25bMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pc0Rpc3BsYXllZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93KHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgIGlmICghIXRoaXMuY29tcG9uZW50KSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5pbnN0YW5jZS5sZWZ0ID0geCB8fCAwO1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2UudG9wID0geSB8fCAwO1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2UudGV4dCA9IHRoaXMudGV4dDtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLnNob3coKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZVRvb2x0aXAoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5pZCA9IGBwYS10b29sdGlwLSR7bmV4dElkKyt9YDtcbiAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWRlc2NyaWJlZGJ5JywgdGhpcy5pZCk7XG4gICAgICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxuICAgICAgICAgICAgVG9vbHRpcENvbXBvbmVudCxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnkpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5pbnN0YW5jZS5pZCA9IHRoaXMuaWQ7XG4gICAgICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLnRleHQgPSB0aGlzLnRleHQ7XG4gICAgICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLmlzQWN0aW9uID0gdGhpcy50eXBlID09PSBBQ1RJT047XG4gICAgICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLmxlZnQgPSB4IHx8IDA7XG4gICAgICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLnRvcCA9IHkgfHwgMDtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2Uub2Zmc2V0ID0gdGhpcy5vZmZzZXQgfHwgMDtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2Uud2lkdGggPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2UuaGVpZ2h0ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICB0aGlzLnZpZXdDb250YWluZXJSZWYuZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQubG9jYXRpb24ubmF0aXZlRWxlbWVudCxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdmb2N1c291dCcpXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJylcbiAgICBoaWRlKCk6IHZvaWQge1xuICAgICAgICBpZiAoISF0aGlzLmNvbXBvbmVudCkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2UuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNEaXNwbGF5ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXRGaXhlZFBvc2l0aW9uKGV2ZW50OiBNb3VzZUV2ZW50KTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgICAgIGxldCBwb3NpdGlvbjogW251bWJlciwgbnVtYmVyXTtcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gQUNUSU9OKSB7XG4gICAgICAgICAgICBjb25zdCByZWN0ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IFtyZWN0LmxlZnQsIHJlY3QudG9wXTtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC50eXBlID09PSAnZm9jdXNpbicpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gW3JlY3QucmlnaHQsIHJlY3QuYm90dG9tXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gW2V2ZW50LnBhZ2VYLCBldmVudC5wYWdlWV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnJvb3RQYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMucm9vdFBhcmVudCA9IHRoaXMuZ2V0Rml4ZWRSb290UGFyZW50KHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByb290UmVjdCA9IHRoaXMucm9vdFBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgcmV0dXJuIFtwb3NpdGlvblswXSAtIHJvb3RSZWN0LmxlZnQsIHBvc2l0aW9uWzFdIC0gcm9vdFJlY3QudG9wXTtcbiAgICB9XG5cbiAgICBnZXRGaXhlZFJvb3RQYXJlbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmIChlbGVtZW50LnRhZ05hbWUgPT09ICdCT0RZJykge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gYW4gZWxlbWVudCB3aXRoIGBwb3NpdGlvbjogZml4ZWRgIHdpbGwgYmUgcG9zaXRpb25lZCByZWxhdGl2ZWx5IHRvIHRoZSB2aWV3cG9ydFxuICAgICAgICAvLyB1bmxlc3Mgb25lIG9mIHRoZSBhbmNlc3RvciBoYXMgYSBwcm9wZXJ0eSBgdHJhbnNmb3JtYCwgYGZpbHRlcmAgb3IgYHBlcnNwZWN0aXZlYFxuICAgICAgICBjb25zdCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG4gICAgICAgIGlmIChzdHlsZS50cmFuc2Zvcm0gIT09ICdub25lJyB8fCBzdHlsZS5wZXJzcGVjdGl2ZSAhPT0gJ25vbmUnIHx8IHN0eWxlLmZpbHRlciAhPT0gJ25vbmUnKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQgPyB0aGlzLmdldEZpeGVkUm9vdFBhcmVudChwYXJlbnQpIDogZWxlbWVudDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==