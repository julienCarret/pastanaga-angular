import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnDestroy, OnInit, Output, Renderer2, ViewEncapsulation, ViewRef } from '@angular/core';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { SidebarService } from './sidebar.service';
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(elementRef, sidebarService, renderer, cdr) {
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
    Object.defineProperty(SidebarComponent.prototype, "unfoldOnHover", {
        get: function () { return this._unfoldOnHover; },
        set: function (value) { this._unfoldOnHover = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SidebarComponent.prototype, "noBackdrop", {
        get: function () { return this._noBackdrop; },
        set: function (value) { this._noBackdrop = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SidebarComponent.prototype, "foldedWidth", {
        get: function () { return this._foldedWidth; },
        set: function (value) { this._foldedWidth = coerceNumberProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SidebarComponent.prototype, "folded", {
        get: function () { return this._folded; },
        set: function (value) {
            this._folded = coerceBooleanProperty(value);
            var width = this._foldedWidth + "px";
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SidebarComponent.prototype, "lockedOpen", {
        get: function () { return this._lockedOpen; },
        set: function (value) {
            this._lockedOpen = coerceBooleanProperty(value);
            if (this._lockedOpen) {
                this.open();
            }
        },
        enumerable: true,
        configurable: true
    });
    SidebarComponent.prototype.ngOnInit = function () {
        if (!this.name) {
            throw new Error("'name' input is required");
        }
        this.sidebarService.register(this.name, this);
        this.setupPosition();
    };
    SidebarComponent.prototype.ngOnDestroy = function () {
        if (!!this.name) {
            this.sidebarService.unregister(this.name);
        }
    };
    SidebarComponent.prototype.onMouseEnter = function () {
        if (this._unfoldOnHover) {
            this.toggleFold();
        }
    };
    SidebarComponent.prototype.onMouseLeave = function () {
        if (this._unfoldOnHover) {
            this.toggleFold();
        }
    };
    SidebarComponent.prototype.toggleOpen = function (open) {
        var newState = open === undefined ? !this.isOpen : open;
        if (!newState) {
            this.close();
        }
        else {
            this.open();
        }
    };
    SidebarComponent.prototype.open = function () {
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
    };
    SidebarComponent.prototype.close = function () {
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
    };
    SidebarComponent.prototype.toggleFold = function () {
        this.folded = !this._folded;
        this.enableAnimations();
        this.foldedChanged.emit(this._folded);
        this.markForCheck();
    };
    SidebarComponent.prototype.setupPosition = function () {
        if (this.position === 'left') {
            this.renderer.addClass(this.elementRef.nativeElement, 'left-positioned');
        }
        else {
            this.renderer.addClass(this.elementRef.nativeElement, 'right-positioned');
        }
    };
    SidebarComponent.prototype.enableAnimations = function () {
        if (this.animationsEnabled) {
            return;
        }
        this.animationsEnabled = true;
    };
    SidebarComponent.prototype.showBackdrop = function () {
        var _this = this;
        this.backdrop = this.renderer.createElement('div');
        if (!this.backdrop) {
            throw new Error("backdrop creation failed");
        }
        this.backdrop.classList.add('pa-sidebar-overlay');
        this.renderer.appendChild(this.elementRef.nativeElement.parentElement, this.backdrop);
        this.backdrop.addEventListener('click', function () { return _this.close(); });
    };
    SidebarComponent.prototype.hideBackdrop = function () {
        if (!!this.backdrop && !!this.backdrop.parentNode) {
            this.backdrop.parentNode.removeChild(this.backdrop);
            this.backdrop = null;
        }
    };
    SidebarComponent.prototype.markForCheck = function () {
        var _this = this;
        window.setTimeout(function () {
            if (!_this.cdr.destroyed) {
                _this.cdr.markForCheck();
            }
        }, 0);
    };
    SidebarComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: SidebarService },
        { type: Renderer2 },
        { type: ChangeDetectorRef }
    ]; };
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
    return SidebarComponent;
}());
export { SidebarComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ3VpbGxvdGluYXdlYi9wYXN0YW5hZ2EtYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi9zaWRlYmFyL3NpZGViYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUFFLFlBQVksRUFDeEIsV0FBVyxFQUFFLFlBQVksRUFDekIsS0FBSyxFQUNMLFNBQVMsRUFDVCxNQUFNLEVBQUUsTUFBTSxFQUNkLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsT0FBTyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQVNuRDtJQXlESSwwQkFDWSxVQUFzQixFQUN0QixjQUE4QixFQUM5QixRQUFtQixFQUNuQixHQUFzQjtRQUh0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBM0R6QixhQUFRLEdBQXFCLE1BQU0sQ0FBQztRQUlyQyxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUl2QixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUlwQixpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQW9CbEIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQVV4QixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUVWLGtCQUFhLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7UUFDbkUsa0JBQWEsR0FBMEIsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUc3RSxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBR2Ysc0JBQWlCLEdBQUcsS0FB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O0lBQ1YsQ0FBQzs7Z0JBbkh1QixVQUFVO2dCQUNOLGNBQWM7Z0JBQ3BCLFNBQVM7Z0JBQ2QsaUJBQWlCOztJQTVEekI7UUFBUixLQUFLLEVBQUU7O2tEQUFlO0lBQ2Q7UUFBUixLQUFLLEVBQUU7O3NEQUFxQztJQUVwQztRQUFSLEtBQUssRUFBRTs7O3lEQUEwRjtJQUl6RjtRQUFSLEtBQUssRUFBRTs7O3NEQUFvRjtJQUluRjtRQUFSLEtBQUssRUFBRTs7O3VEQUFvRjtJQUluRjtRQUFSLEtBQUssRUFBRTs7O2tEQWdCUDtJQUlRO1FBQVIsS0FBSyxFQUFFOzs7c0RBS1A7SUFHRDtRQURDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQzs7eURBQ2Y7SUFFVjtRQUFULE1BQU0sRUFBRTtrQ0FBZ0IsWUFBWTsyREFBd0M7SUFDbkU7UUFBVCxNQUFNLEVBQUU7a0NBQWdCLFlBQVk7MkRBQXdDO0lBRzdFO1FBREMsV0FBVyxDQUFDLFlBQVksQ0FBQzs7b0RBQ1g7SUFHZjtRQURDLFdBQVcsQ0FBQywwQkFBMEIsQ0FBQzs7K0RBQ2Q7SUEyQjFCO1FBREMsWUFBWSxDQUFDLFlBQVksQ0FBQzs7Ozt3REFLMUI7SUFHRDtRQURDLFlBQVksQ0FBQyxZQUFZLENBQUM7Ozs7d0RBSzFCO0lBM0ZRLGdCQUFnQjtRQVA1QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0Qix1Q0FBcUM7WUFFckMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O1NBQ2xELENBQUM7eUNBMkQwQixVQUFVO1lBQ04sY0FBYztZQUNwQixTQUFTO1lBQ2QsaUJBQWlCO09BN0R6QixnQkFBZ0IsQ0E4SzVCO0lBQUQsdUJBQUM7Q0FBQSxBQTlLRCxJQThLQztTQTlLWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsXG4gICAgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lcixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LCBPdXRwdXQsXG4gICAgUmVuZGVyZXIyLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIFZpZXdSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHksIGNvZXJjZU51bWJlclByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IFNpZGViYXJTZXJ2aWNlIH0gZnJvbSAnLi9zaWRlYmFyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3BhLXNpZGViYXInLFxuICAgIHRlbXBsYXRlVXJsOiAnc2lkZWJhci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vc2lkZWJhci5jb21wb25lbnQuc2NzcyddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFNpZGViYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgbmFtZT86IHN0cmluZztcbiAgICBASW5wdXQoKSBwb3NpdGlvbjogJ2xlZnQnIHwgJ3JpZ2h0JyA9ICdsZWZ0JztcblxuICAgIEBJbnB1dCgpIHNldCB1bmZvbGRPbkhvdmVyKHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX3VuZm9sZE9uSG92ZXIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gICAgZ2V0IHVuZm9sZE9uSG92ZXIoKSB7IHJldHVybiB0aGlzLl91bmZvbGRPbkhvdmVyOyB9XG4gICAgcHJpdmF0ZSBfdW5mb2xkT25Ib3ZlciA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgc2V0IG5vQmFja2Ryb3AodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5fbm9CYWNrZHJvcCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgICBnZXQgbm9CYWNrZHJvcCgpIHsgcmV0dXJuIHRoaXMuX25vQmFja2Ryb3A7IH1cbiAgICBwcml2YXRlIF9ub0JhY2tkcm9wID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBzZXQgZm9sZGVkV2lkdGgodmFsdWU6IG51bWJlcikgeyB0aGlzLl9mb2xkZWRXaWR0aCA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTsgfVxuICAgIGdldCBmb2xkZWRXaWR0aCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fZm9sZGVkV2lkdGg7IH1cbiAgICBwcml2YXRlIF9mb2xkZWRXaWR0aCA9IDY0O1xuXG4gICAgQElucHV0KCkgc2V0IGZvbGRlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9mb2xkZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgICAgIGNvbnN0IHdpZHRoID0gYCR7dGhpcy5fZm9sZGVkV2lkdGh9cHhgO1xuICAgICAgICBpZiAodGhpcy5fZm9sZGVkKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCB3aWR0aCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbWluLXdpZHRoJywgd2lkdGgpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ21heC13aWR0aCcsIHdpZHRoKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdmb2xkZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ21pbi13aWR0aCcpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ21heC13aWR0aCcpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2ZvbGRlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZm9sZGVkQ2hhbmdlZC5lbWl0KHRoaXMuX2ZvbGRlZCk7XG4gICAgfVxuICAgIGdldCBmb2xkZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9mb2xkZWQ7IH1cbiAgICBwcml2YXRlIF9mb2xkZWQgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIHNldCBsb2NrZWRPcGVuKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2xvY2tlZE9wZW4gPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgICAgICBpZiAodGhpcy5fbG9ja2VkT3Blbikge1xuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IGxvY2tlZE9wZW4oKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9sb2NrZWRPcGVuOyB9XG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5sb2NrZWQtb3BlbmVkJylcbiAgICBfbG9ja2VkT3BlbiA9IGZhbHNlO1xuXG4gICAgQE91dHB1dCgpIG9wZW5lZENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgICBAT3V0cHV0KCkgZm9sZGVkQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5vcGVuJylcbiAgICBpc09wZW4gPSBmYWxzZTtcblxuICAgIEBIb3N0QmluZGluZygnY2xhc3MuYW5pbWF0aW9ucy1lbmFibGVkJylcbiAgICBhbmltYXRpb25zRW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBiYWNrZHJvcDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgc2lkZWJhclNlcnZpY2U6IFNpZGViYXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICApIHsgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5uYW1lKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCduYW1lJyBpbnB1dCBpcyByZXF1aXJlZGApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2lkZWJhclNlcnZpY2UucmVnaXN0ZXIodGhpcy5uYW1lLCB0aGlzKTtcblxuICAgICAgICB0aGlzLnNldHVwUG9zaXRpb24oKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCEhdGhpcy5uYW1lKSB7XG4gICAgICAgICAgICB0aGlzLnNpZGViYXJTZXJ2aWNlLnVucmVnaXN0ZXIodGhpcy5uYW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKVxuICAgIG9uTW91c2VFbnRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuX3VuZm9sZE9uSG92ZXIpIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlRm9sZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXG4gICAgb25Nb3VzZUxlYXZlKCkge1xuICAgICAgICBpZiAodGhpcy5fdW5mb2xkT25Ib3Zlcikge1xuICAgICAgICAgICAgdGhpcy50b2dnbGVGb2xkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGVPcGVuKG9wZW4/OiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IG5ld1N0YXRlID0gb3BlbiA9PT0gdW5kZWZpbmVkID8gIXRoaXMuaXNPcGVuIDogb3BlbjtcbiAgICAgICAgaWYgKCFuZXdTdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvcGVuKCkge1xuICAgICAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVuYWJsZUFuaW1hdGlvbnMoKTtcbiAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgICBpZiAoIXRoaXMuX25vQmFja2Ryb3ApIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0JhY2tkcm9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcGVuZWRDaGFuZ2VkLmVtaXQodGhpcy5pc09wZW4pO1xuICAgICAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGNsb3NlKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNPcGVuKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbmFibGVBbmltYXRpb25zKCk7XG4gICAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgICAgIGlmICghdGhpcy5fbm9CYWNrZHJvcCkge1xuICAgICAgICAgICAgdGhpcy5oaWRlQmFja2Ryb3AoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9wZW5lZENoYW5nZWQuZW1pdCh0aGlzLmlzT3Blbik7XG4gICAgICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlRm9sZCgpIHtcbiAgICAgICAgdGhpcy5mb2xkZWQgPSAhdGhpcy5fZm9sZGVkO1xuICAgICAgICB0aGlzLmVuYWJsZUFuaW1hdGlvbnMoKTtcbiAgICAgICAgdGhpcy5mb2xkZWRDaGFuZ2VkLmVtaXQodGhpcy5fZm9sZGVkKTtcbiAgICAgICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldHVwUG9zaXRpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdsZWZ0LXBvc2l0aW9uZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdyaWdodC1wb3NpdGlvbmVkJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGVuYWJsZUFuaW1hdGlvbnMoKSB7XG4gICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbnNFbmFibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hbmltYXRpb25zRW5hYmxlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93QmFja2Ryb3AoKSB7XG4gICAgICAgIHRoaXMuYmFja2Ryb3AgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBpZiAoIXRoaXMuYmFja2Ryb3ApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgYmFja2Ryb3AgY3JlYXRpb24gZmFpbGVkYCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5iYWNrZHJvcC5jbGFzc0xpc3QuYWRkKCdwYS1zaWRlYmFyLW92ZXJsYXknKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LCB0aGlzLmJhY2tkcm9wKTtcbiAgICAgICAgdGhpcy5iYWNrZHJvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuY2xvc2UoKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoaWRlQmFja2Ryb3AoKSB7XG4gICAgICAgIGlmICghIXRoaXMuYmFja2Ryb3AgJiYgISF0aGlzLmJhY2tkcm9wLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuYmFja2Ryb3AucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmJhY2tkcm9wKTtcbiAgICAgICAgICAgIHRoaXMuYmFja2Ryb3AgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYXJrRm9yQ2hlY2soKSB7XG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICghKHRoaXMuY2RyIGFzIFZpZXdSZWYpLmRlc3Ryb3llZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAwKTtcbiAgICB9XG59XG4iXX0=