import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnDestroy, OnInit, Output, Renderer2, ViewEncapsulation, ViewRef } from '@angular/core';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { SidebarService } from './sidebar.service';
let SidebarComponent = class SidebarComponent {
    constructor(elementRef, sidebarService, renderer, cdr) {
        this.elementRef = elementRef;
        this.sidebarService = sidebarService;
        this.renderer = renderer;
        this.cdr = cdr;
        this.position = 'left';
        this._unfoldOnHover = false;
        this._noBackdrop = false;
        this._foldedWidth = 64;
        this._folded = false;
        this._lockedOpen = false;
        this.openedChanged = new EventEmitter();
        this.foldedChanged = new EventEmitter();
        this.isOpen = false;
        this.animationsEnabled = false;
        this.backdrop = null;
    }
    set unfoldOnHover(value) { this._unfoldOnHover = coerceBooleanProperty(value); }
    get unfoldOnHover() { return this._unfoldOnHover; }
    set noBackdrop(value) { this._noBackdrop = coerceBooleanProperty(value); }
    get noBackdrop() { return this._noBackdrop; }
    set foldedWidth(value) { this._foldedWidth = coerceNumberProperty(value); }
    get foldedWidth() { return this._foldedWidth; }
    set folded(value) {
        this._folded = coerceBooleanProperty(value);
        const width = `${this._foldedWidth}px`;
        if (this._folded) {
            this.renderer.setStyle(this.elementRef.nativeElement, 'width', width);
            this.renderer.setStyle(this.elementRef.nativeElement, 'min-width', width);
            this.renderer.setStyle(this.elementRef.nativeElement, 'max-width', width);
            this.renderer.addClass(this.elementRef.nativeElement, 'folded');
        }
        else {
            this.renderer.removeStyle(this.elementRef.nativeElement, 'width');
            this.renderer.removeStyle(this.elementRef.nativeElement, 'min-width');
            this.renderer.removeStyle(this.elementRef.nativeElement, 'max-width');
            this.renderer.removeClass(this.elementRef.nativeElement, 'folded');
        }
        this.foldedChanged.emit(this._folded);
    }
    get folded() { return this._folded; }
    set lockedOpen(value) {
        this._lockedOpen = coerceBooleanProperty(value);
        if (this._lockedOpen) {
            this.open();
        }
    }
    get lockedOpen() { return this._lockedOpen; }
    ngOnInit() {
        if (!this.name) {
            throw new Error(`'name' input is required`);
        }
        this.sidebarService.register(this.name, this);
        this.setupPosition();
    }
    ngOnDestroy() {
        if (!!this.name) {
            this.sidebarService.unregister(this.name);
        }
    }
    onMouseEnter() {
        if (this._unfoldOnHover) {
            this.toggleFold();
        }
    }
    onMouseLeave() {
        if (this._unfoldOnHover) {
            this.toggleFold();
        }
    }
    toggleOpen(open) {
        const newState = open === undefined ? !this.isOpen : open;
        if (!newState) {
            this.close();
        }
        else {
            this.open();
        }
    }
    open() {
        if (this.isOpen) {
            return;
        }
        this.enableAnimations();
        this.isOpen = true;
        if (!this._noBackdrop) {
            this.showBackdrop();
        }
        this.openedChanged.emit(this.isOpen);
        this.markForCheck();
    }
    close() {
        if (!this.isOpen) {
            return;
        }
        this.enableAnimations();
        this.isOpen = false;
        if (!this._noBackdrop) {
            this.hideBackdrop();
        }
        this.openedChanged.emit(this.isOpen);
        this.markForCheck();
    }
    toggleFold() {
        this.folded = !this._folded;
        this.enableAnimations();
        this.foldedChanged.emit(this._folded);
        this.markForCheck();
    }
    setupPosition() {
        if (this.position === 'left') {
            this.renderer.addClass(this.elementRef.nativeElement, 'left-positioned');
        }
        else {
            this.renderer.addClass(this.elementRef.nativeElement, 'right-positioned');
        }
    }
    enableAnimations() {
        if (this.animationsEnabled) {
            return;
        }
        this.animationsEnabled = true;
    }
    showBackdrop() {
        this.backdrop = this.renderer.createElement('div');
        if (!this.backdrop) {
            throw new Error(`backdrop creation failed`);
        }
        this.backdrop.classList.add('pa-sidebar-overlay');
        this.renderer.appendChild(this.elementRef.nativeElement.parentElement, this.backdrop);
        this.backdrop.addEventListener('click', () => this.close());
    }
    hideBackdrop() {
        if (!!this.backdrop && !!this.backdrop.parentNode) {
            this.backdrop.parentNode.removeChild(this.backdrop);
            this.backdrop = null;
        }
    }
    markForCheck() {
        window.setTimeout(() => {
            if (!this.cdr.destroyed) {
                this.cdr.markForCheck();
            }
        }, 0);
    }
};
SidebarComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: SidebarService },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
__decorate([
    Input(),
    __metadata("design:type", String)
], SidebarComponent.prototype, "name", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SidebarComponent.prototype, "position", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], SidebarComponent.prototype, "unfoldOnHover", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], SidebarComponent.prototype, "noBackdrop", null);
__decorate([
    Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], SidebarComponent.prototype, "foldedWidth", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], SidebarComponent.prototype, "folded", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], SidebarComponent.prototype, "lockedOpen", null);
__decorate([
    HostBinding('class.locked-opened'),
    __metadata("design:type", Object)
], SidebarComponent.prototype, "_lockedOpen", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SidebarComponent.prototype, "openedChanged", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SidebarComponent.prototype, "foldedChanged", void 0);
__decorate([
    HostBinding('class.open'),
    __metadata("design:type", Object)
], SidebarComponent.prototype, "isOpen", void 0);
__decorate([
    HostBinding('class.animations-enabled'),
    __metadata("design:type", Object)
], SidebarComponent.prototype, "animationsEnabled", void 0);
__decorate([
    HostListener('mouseenter'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SidebarComponent.prototype, "onMouseEnter", null);
__decorate([
    HostListener('mouseleave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SidebarComponent.prototype, "onMouseLeave", null);
SidebarComponent = __decorate([
    Component({
        selector: 'pa-sidebar',
        template: "<ng-content></ng-content>\n",
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: ["pa-sidebar{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-flex:1;flex:1 0 auto;position:absolute;top:0;bottom:0;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch;width:280px;min-width:280px;max-width:280px;z-index:10050;box-shadow:0 2px 8px 0 rgba(0,0,0,.35)}pa-sidebar.left-positioned{left:0}pa-sidebar.left-positioned:not(.open){width:0!important;min-width:0!important;-webkit-transform:translateX(-100%);transform:translateX(-100%)}pa-sidebar.right-positioned{right:0}pa-sidebar.right-positioned:not(.open){width:0!important;min-width:0!important;-webkit-transform:translateX(100%);transform:translateX(100%)}pa-sidebar.open{-webkit-transform:translateX(0);transform:translateX(0)}pa-sidebar.folded{position:absolute!important;top:0;bottom:0}pa-sidebar.locked-opened{z-index:10040}pa-sidebar.animations-enabled{-webkit-transition-property:width,min-width,max-width,-webkit-transform;transition-property:transform,width,min-width,max-width,-webkit-transform;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out}.pa-sidebar-overlay{background-color:rgba(21,21,21,.6);position:absolute;top:0;bottom:0;left:0;right:0;z-index:10040}"]
    }),
    __metadata("design:paramtypes", [ElementRef,
        SidebarService,
        Renderer2,
        ChangeDetectorRef])
], SidebarComponent);
export { SidebarComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ3VpbGxvdGluYXdlYi9wYXN0YW5hZ2EtYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi9zaWRlYmFyL3NpZGViYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUFFLFlBQVksRUFDeEIsV0FBVyxFQUFFLFlBQVksRUFDekIsS0FBSyxFQUNMLFNBQVMsRUFDVCxNQUFNLEVBQUUsTUFBTSxFQUNkLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsT0FBTyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQVNuRCxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQXlEekIsWUFDWSxVQUFzQixFQUN0QixjQUE4QixFQUM5QixRQUFtQixFQUNuQixHQUFzQjtRQUh0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBM0R6QixhQUFRLEdBQXFCLE1BQU0sQ0FBQztRQUlyQyxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUl2QixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUlwQixpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQW9CbEIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQVV4QixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUVWLGtCQUFhLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7UUFDbkUsa0JBQWEsR0FBMEIsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUc3RSxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBR2Ysc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBRWxCLGFBQVEsR0FBdUIsSUFBSSxDQUFDO0lBT3hDLENBQUM7SUExREksSUFBSSxhQUFhLENBQUMsS0FBYyxJQUFJLElBQUksQ0FBQyxjQUFjLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xHLElBQUksYUFBYSxLQUFLLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFHMUMsSUFBSSxVQUFVLENBQUMsS0FBYyxJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVGLElBQUksVUFBVSxLQUFLLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFHcEMsSUFBSSxXQUFXLENBQUMsS0FBYSxJQUFJLElBQUksQ0FBQyxZQUFZLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVGLElBQUksV0FBVyxLQUFhLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFHOUMsSUFBSSxNQUFNLENBQUMsS0FBYztRQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTVDLE1BQU0sS0FBSyxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDO1FBQ3ZDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN0RSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDMUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ25FO2FBQU07WUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUN0RSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUN0RSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUN0RTtRQUNELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBQ0QsSUFBSSxNQUFNLEtBQWMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUdyQyxJQUFJLFVBQVUsQ0FBQyxLQUFjO1FBQ2xDLElBQUksQ0FBQyxXQUFXLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEQsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNmO0lBQ0wsQ0FBQztJQUNELElBQUksVUFBVSxLQUFjLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFzQnRELFFBQVE7UUFDSixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQztTQUMvQztRQUNELElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFOUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNiLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3QztJQUNMLENBQUM7SUFHRCxZQUFZO1FBQ1IsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNyQjtJQUNMLENBQUM7SUFHRCxZQUFZO1FBQ1IsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNyQjtJQUNMLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBYztRQUNyQixNQUFNLFFBQVEsR0FBRyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUMxRCxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ1gsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2hCO2FBQU07WUFDSCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDZjtJQUNMLENBQUM7SUFFRCxJQUFJO1FBQ0EsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2IsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3ZCO1FBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsS0FBSztRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2QsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3ZCO1FBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsVUFBVTtRQUNOLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzVCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVPLGFBQWE7UUFDakIsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRTtZQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1NBQzVFO2FBQU07WUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1NBQzdFO0lBQ0wsQ0FBQztJQUVPLGdCQUFnQjtRQUNwQixJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUN4QixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO0lBQ2xDLENBQUM7SUFFTyxZQUFZO1FBQ2hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1NBQy9DO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0RixJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRU8sWUFBWTtRQUNoQixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRTtZQUMvQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ3hCO0lBQ0wsQ0FBQztJQUVPLFlBQVk7UUFDaEIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDbkIsSUFBSSxDQUFFLElBQUksQ0FBQyxHQUFlLENBQUMsU0FBUyxFQUFFO2dCQUNsQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQzNCO1FBQ0wsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ1YsQ0FBQztDQUNKLENBQUE7O1lBcEgyQixVQUFVO1lBQ04sY0FBYztZQUNwQixTQUFTO1lBQ2QsaUJBQWlCOztBQTVEekI7SUFBUixLQUFLLEVBQUU7OzhDQUFlO0FBQ2Q7SUFBUixLQUFLLEVBQUU7O2tEQUFxQztBQUVwQztJQUFSLEtBQUssRUFBRTs7O3FEQUEwRjtBQUl6RjtJQUFSLEtBQUssRUFBRTs7O2tEQUFvRjtBQUluRjtJQUFSLEtBQUssRUFBRTs7O21EQUFvRjtBQUluRjtJQUFSLEtBQUssRUFBRTs7OzhDQWdCUDtBQUlRO0lBQVIsS0FBSyxFQUFFOzs7a0RBS1A7QUFHRDtJQURDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQzs7cURBQ2Y7QUFFVjtJQUFULE1BQU0sRUFBRTs4QkFBZ0IsWUFBWTt1REFBd0M7QUFDbkU7SUFBVCxNQUFNLEVBQUU7OEJBQWdCLFlBQVk7dURBQXdDO0FBRzdFO0lBREMsV0FBVyxDQUFDLFlBQVksQ0FBQzs7Z0RBQ1g7QUFHZjtJQURDLFdBQVcsQ0FBQywwQkFBMEIsQ0FBQzs7MkRBQ2Q7QUEyQjFCO0lBREMsWUFBWSxDQUFDLFlBQVksQ0FBQzs7OztvREFLMUI7QUFHRDtJQURDLFlBQVksQ0FBQyxZQUFZLENBQUM7Ozs7b0RBSzFCO0FBM0ZRLGdCQUFnQjtJQVA1QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsWUFBWTtRQUN0Qix1Q0FBcUM7UUFFckMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7UUFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O0tBQ2xELENBQUM7cUNBMkQwQixVQUFVO1FBQ04sY0FBYztRQUNwQixTQUFTO1FBQ2QsaUJBQWlCO0dBN0R6QixnQkFBZ0IsQ0E4SzVCO1NBOUtZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlcixcbiAgICBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsIE91dHB1dCxcbiAgICBSZW5kZXJlcjIsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgVmlld1JlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSwgY29lcmNlTnVtYmVyUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgU2lkZWJhclNlcnZpY2UgfSBmcm9tICcuL3NpZGViYXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncGEtc2lkZWJhcicsXG4gICAgdGVtcGxhdGVVcmw6ICdzaWRlYmFyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9zaWRlYmFyLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgU2lkZWJhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSBuYW1lPzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHBvc2l0aW9uOiAnbGVmdCcgfCAncmlnaHQnID0gJ2xlZnQnO1xuXG4gICAgQElucHV0KCkgc2V0IHVuZm9sZE9uSG92ZXIodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5fdW5mb2xkT25Ib3ZlciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgICBnZXQgdW5mb2xkT25Ib3ZlcigpIHsgcmV0dXJuIHRoaXMuX3VuZm9sZE9uSG92ZXI7IH1cbiAgICBwcml2YXRlIF91bmZvbGRPbkhvdmVyID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBzZXQgbm9CYWNrZHJvcCh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl9ub0JhY2tkcm9wID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICAgIGdldCBub0JhY2tkcm9wKCkgeyByZXR1cm4gdGhpcy5fbm9CYWNrZHJvcDsgfVxuICAgIHByaXZhdGUgX25vQmFja2Ryb3AgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIHNldCBmb2xkZWRXaWR0aCh2YWx1ZTogbnVtYmVyKSB7IHRoaXMuX2ZvbGRlZFdpZHRoID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUpOyB9XG4gICAgZ2V0IGZvbGRlZFdpZHRoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9mb2xkZWRXaWR0aDsgfVxuICAgIHByaXZhdGUgX2ZvbGRlZFdpZHRoID0gNjQ7XG5cbiAgICBASW5wdXQoKSBzZXQgZm9sZGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2ZvbGRlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICAgICAgY29uc3Qgd2lkdGggPSBgJHt0aGlzLl9mb2xkZWRXaWR0aH1weGA7XG4gICAgICAgIGlmICh0aGlzLl9mb2xkZWQpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIHdpZHRoKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdtaW4td2lkdGgnLCB3aWR0aCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbWF4LXdpZHRoJywgd2lkdGgpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2ZvbGRlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3dpZHRoJyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbWluLXdpZHRoJyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbWF4LXdpZHRoJyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZm9sZGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mb2xkZWRDaGFuZ2VkLmVtaXQodGhpcy5fZm9sZGVkKTtcbiAgICB9XG4gICAgZ2V0IGZvbGRlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2ZvbGRlZDsgfVxuICAgIHByaXZhdGUgX2ZvbGRlZCA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgc2V0IGxvY2tlZE9wZW4odmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fbG9ja2VkT3BlbiA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgICAgIGlmICh0aGlzLl9sb2NrZWRPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgbG9ja2VkT3BlbigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2xvY2tlZE9wZW47IH1cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmxvY2tlZC1vcGVuZWQnKVxuICAgIF9sb2NrZWRPcGVuID0gZmFsc2U7XG5cbiAgICBAT3V0cHV0KCkgb3BlbmVkQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICAgIEBPdXRwdXQoKSBmb2xkZWRDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLm9wZW4nKVxuICAgIGlzT3BlbiA9IGZhbHNlO1xuXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hbmltYXRpb25zLWVuYWJsZWQnKVxuICAgIGFuaW1hdGlvbnNFbmFibGVkID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIGJhY2tkcm9wOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBzaWRlYmFyU2VydmljZTogU2lkZWJhclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICkgeyB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLm5hbWUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJ25hbWUnIGlucHV0IGlzIHJlcXVpcmVkYCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zaWRlYmFyU2VydmljZS5yZWdpc3Rlcih0aGlzLm5hbWUsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuc2V0dXBQb3NpdGlvbigpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBpZiAoISF0aGlzLm5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2lkZWJhclNlcnZpY2UudW5yZWdpc3Rlcih0aGlzLm5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpXG4gICAgb25Nb3VzZUVudGVyKCkge1xuICAgICAgICBpZiAodGhpcy5fdW5mb2xkT25Ib3Zlcikge1xuICAgICAgICAgICAgdGhpcy50b2dnbGVGb2xkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgICBvbk1vdXNlTGVhdmUoKSB7XG4gICAgICAgIGlmICh0aGlzLl91bmZvbGRPbkhvdmVyKSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUZvbGQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZU9wZW4ob3Blbj86IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgbmV3U3RhdGUgPSBvcGVuID09PSB1bmRlZmluZWQgPyAhdGhpcy5pc09wZW4gOiBvcGVuO1xuICAgICAgICBpZiAoIW5ld1N0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9wZW4oKSB7XG4gICAgICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW5hYmxlQW5pbWF0aW9ucygpO1xuICAgICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgICAgIGlmICghdGhpcy5fbm9CYWNrZHJvcCkge1xuICAgICAgICAgICAgdGhpcy5zaG93QmFja2Ryb3AoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9wZW5lZENoYW5nZWQuZW1pdCh0aGlzLmlzT3Blbik7XG4gICAgICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc09wZW4pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVuYWJsZUFuaW1hdGlvbnMoKTtcbiAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICAgICAgaWYgKCF0aGlzLl9ub0JhY2tkcm9wKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVCYWNrZHJvcCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3BlbmVkQ2hhbmdlZC5lbWl0KHRoaXMuaXNPcGVuKTtcbiAgICAgICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICB0b2dnbGVGb2xkKCkge1xuICAgICAgICB0aGlzLmZvbGRlZCA9ICF0aGlzLl9mb2xkZWQ7XG4gICAgICAgIHRoaXMuZW5hYmxlQW5pbWF0aW9ucygpO1xuICAgICAgICB0aGlzLmZvbGRlZENoYW5nZWQuZW1pdCh0aGlzLl9mb2xkZWQpO1xuICAgICAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0dXBQb3NpdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24gPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2xlZnQtcG9zaXRpb25lZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3JpZ2h0LXBvc2l0aW9uZWQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZW5hYmxlQW5pbWF0aW9ucygpIHtcbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uc0VuYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFuaW1hdGlvbnNFbmFibGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dCYWNrZHJvcCgpIHtcbiAgICAgICAgdGhpcy5iYWNrZHJvcCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGlmICghdGhpcy5iYWNrZHJvcCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBiYWNrZHJvcCBjcmVhdGlvbiBmYWlsZWRgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJhY2tkcm9wLmNsYXNzTGlzdC5hZGQoJ3BhLXNpZGViYXItb3ZlcmxheScpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQsIHRoaXMuYmFja2Ryb3ApO1xuICAgICAgICB0aGlzLmJhY2tkcm9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5jbG9zZSgpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhpZGVCYWNrZHJvcCgpIHtcbiAgICAgICAgaWYgKCEhdGhpcy5iYWNrZHJvcCAmJiAhIXRoaXMuYmFja2Ryb3AucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgdGhpcy5iYWNrZHJvcC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuYmFja2Ryb3ApO1xuICAgICAgICAgICAgdGhpcy5iYWNrZHJvcCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG1hcmtGb3JDaGVjaygpIHtcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCEodGhpcy5jZHIgYXMgVmlld1JlZikuZGVzdHJveWVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDApO1xuICAgIH1cbn1cbiJdfQ==