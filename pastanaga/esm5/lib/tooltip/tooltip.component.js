import { __decorate, __metadata } from "tslib";
import { AfterViewInit, Component, ElementRef, Input, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { markForCheck } from '../common/utils';
var VERTICAL_SEPARATION = 21;
var VERTICAL_SEPARATION_ACTION = 3;
var HORIZONTAL_SEPARATION = -3;
var TooltipComponent = /** @class */ (function () {
    function TooltipComponent(cdr) {
        this.cdr = cdr;
        this.isAction = false;
        this.height = 0;
        this.width = 0;
        this.left = 0;
        this.top = 0;
        this.offset = 0;
    }
    TooltipComponent.prototype.ngAfterViewInit = function () {
        this.show();
    };
    TooltipComponent.prototype.show = function () {
        if (!!this.tooltipText) {
            this.tooltipText.nativeElement.style.left = this.getLeftPosition() + 'px';
            this.tooltipText.nativeElement.style.top = this.getTopPosition() + 'px';
            this.adjustPosition(); // once position set, check if too far horizontally or vertically
            this.tooltipText.nativeElement.setAttribute('aria-expanded', true);
            markForCheck(this.cdr);
        }
    };
    TooltipComponent.prototype.hide = function () {
        if (!!this.tooltipText) {
            this.tooltipText.nativeElement.setAttribute('aria-expanded', false);
            markForCheck(this.cdr);
        }
    };
    TooltipComponent.prototype.getLeftPosition = function () {
        if (this.isAction && !!this.tooltipText) {
            var tooltipWidth = this.tooltipText.nativeElement.offsetWidth;
            return this.left + (this.width / 2) - (tooltipWidth / 2);
        }
        else {
            return this.left + HORIZONTAL_SEPARATION;
        }
    };
    TooltipComponent.prototype.getTopPosition = function () {
        if (this.isAction) {
            return this.top + this.height + VERTICAL_SEPARATION_ACTION + this.offset;
        }
        else {
            return this.top + VERTICAL_SEPARATION + this.offset;
        }
    };
    TooltipComponent.prototype.adjustPosition = function () {
        if (!!this.tooltipText) {
            var rect = this.tooltipText.nativeElement.getBoundingClientRect();
            if (rect.right > window.innerWidth) {
                var left = parseInt(this.tooltipText.nativeElement.style.left.replace('px', ''), 10);
                left = left - (rect.right - window.innerWidth) - HORIZONTAL_SEPARATION;
                this.tooltipText.nativeElement.style.left = left + 'px';
            }
            if (rect.bottom > window.innerHeight) {
                var top_1 = parseInt(this.tooltipText.nativeElement.style.top.replace('px', ''), 10);
                top_1 = top_1 - (rect.bottom - window.innerHeight) - VERTICAL_SEPARATION;
                this.tooltipText.nativeElement.style.top = top_1 + 'px';
            }
        }
    };
    TooltipComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TooltipComponent.prototype, "text", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TooltipComponent.prototype, "id", void 0);
    __decorate([
        ViewChild('tooltipText'),
        __metadata("design:type", ElementRef)
    ], TooltipComponent.prototype, "tooltipText", void 0);
    TooltipComponent = __decorate([
        Component({
            selector: 'pa-tooltip-element',
            template: "<small #tooltipText role=\"tooltip\" [id]=\"id\" *ngIf=\"text\"\n    class=\"pa-tooltip\" [class.pa-tooltip-system]=\"!isAction\" translate>{{ text }}</small>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".pa-tooltip{visibility:hidden;opacity:0;z-index:10070;display:block;position:fixed;font-weight:400;font-size:.75rem;line-height:.75rem;color:#3a3a3a;background:rgba(237,241,242,.975);box-shadow:0 4px 12px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.1);border-radius:1px;padding:.375rem .5625rem;transition:visibility .33s,opacity .33s;-webkit-transition:visibility .33s,opacity .33s;overflow:hidden;white-space:nowrap;pointer-events:none}.pa-tooltip[aria-expanded=true]{opacity:1;visibility:visible;transition:visibility,opacity .33s 2s;-webkit-transition:visibility,opacity .33s 2s}.pa-tooltip-system[aria-expanded=true]{transition:visibility,opacity .33s .5s;-webkit-transition:visibility,opacity .33s .5s}@supports (-webkit-backdrop-filter:blur(3px)){.pa-tooltip,.pa-tooltip-system{background:rgba(237,241,242,.9);-webkit-backdrop-filter:blur(3px)}}.pa-tooltip-system>kbd,.pa-tooltip>kbd{line-height:0;color:#717171;top:0;margin-left:.375rem;margin-right:-.1875rem}"]
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], TooltipComponent);
    return TooltipComponent;
}());
export { TooltipComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ3VpbGxvdGluYXdlYi9wYXN0YW5hZ2EtYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi90b29sdGlwL3Rvb2x0aXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuSSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsSUFBTSxtQkFBbUIsR0FBRyxFQUFFLENBQUM7QUFDL0IsSUFBTSwwQkFBMEIsR0FBRyxDQUFDLENBQUM7QUFDckMsSUFBTSxxQkFBcUIsR0FBRyxDQUFDLENBQUMsQ0FBQztBQVFqQztJQWFJLDBCQUFvQixHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQVQxQyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLFdBQU0sR0FBRyxDQUFDLENBQUM7UUFDWCxVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsU0FBSSxHQUFHLENBQUMsQ0FBQztRQUNULFFBQUcsR0FBRyxDQUFDLENBQUM7UUFDUixXQUFNLEdBQUcsQ0FBQyxDQUFDO0lBSWtDLENBQUM7SUFFOUMsMENBQWUsR0FBZjtRQUNJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsK0JBQUksR0FBSjtRQUNJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQzFFLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxD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QUFlO0lBQ2Q7UUFBUixLQUFLLEVBQUU7O2dEQUFhO0lBU0s7UUFBekIsU0FBUyxDQUFDLGFBQWEsQ0FBQztrQ0FBZSxVQUFVO3lEQUFDO0lBWDFDLGdCQUFnQjtRQU41QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLDRLQUF1QztZQUV2QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7U0FDbEQsQ0FBQzt5Q0FjMkIsaUJBQWlCO09BYmpDLGdCQUFnQixDQW9FNUI7SUFBRCx1QkFBQztDQUFBLEFBcEVELElBb0VDO1NBcEVZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIFZpZXdDaGlsZCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtYXJrRm9yQ2hlY2sgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xuXG5jb25zdCBWRVJUSUNBTF9TRVBBUkFUSU9OID0gMjE7XG5jb25zdCBWRVJUSUNBTF9TRVBBUkFUSU9OX0FDVElPTiA9IDM7XG5jb25zdCBIT1JJWk9OVEFMX1NFUEFSQVRJT04gPSAtMztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwYS10b29sdGlwLWVsZW1lbnQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90b29sdGlwLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90b29sdGlwLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFRvb2x0aXBDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgICBASW5wdXQoKSB0ZXh0Pzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGlkPzogc3RyaW5nO1xuXG4gICAgaXNBY3Rpb24gPSBmYWxzZTtcbiAgICBoZWlnaHQgPSAwO1xuICAgIHdpZHRoID0gMDtcbiAgICBsZWZ0ID0gMDtcbiAgICB0b3AgPSAwO1xuICAgIG9mZnNldCA9IDA7XG5cbiAgICBAVmlld0NoaWxkKCd0b29sdGlwVGV4dCcpIHRvb2x0aXBUZXh0PzogRWxlbWVudFJlZjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgaWYgKCEhdGhpcy50b29sdGlwVGV4dCkge1xuICAgICAgICAgICAgdGhpcy50b29sdGlwVGV4dC5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSB0aGlzLmdldExlZnRQb3NpdGlvbigpICsgJ3B4JztcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcFRleHQubmF0aXZlRWxlbWVudC5zdHlsZS50b3AgPSB0aGlzLmdldFRvcFBvc2l0aW9uKCkgKyAncHgnO1xuICAgICAgICAgICAgdGhpcy5hZGp1c3RQb3NpdGlvbigpOyAvLyBvbmNlIHBvc2l0aW9uIHNldCwgY2hlY2sgaWYgdG9vIGZhciBob3Jpem9udGFsbHkgb3IgdmVydGljYWxseVxuICAgICAgICAgICAgdGhpcy50b29sdGlwVGV4dC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIHRydWUpO1xuICAgICAgICAgICAgbWFya0ZvckNoZWNrKHRoaXMuY2RyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIGlmICghIXRoaXMudG9vbHRpcFRleHQpIHtcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcFRleHQubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICBtYXJrRm9yQ2hlY2sodGhpcy5jZHIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRMZWZ0UG9zaXRpb24oKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHRoaXMuaXNBY3Rpb24gJiYgISF0aGlzLnRvb2x0aXBUZXh0KSB7XG4gICAgICAgICAgICBjb25zdCB0b29sdGlwV2lkdGggPSB0aGlzLnRvb2x0aXBUZXh0Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sZWZ0ICsgKHRoaXMud2lkdGggLyAyKSAtICh0b29sdGlwV2lkdGggLyAyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxlZnQgKyBIT1JJWk9OVEFMX1NFUEFSQVRJT047XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRvcFBvc2l0aW9uKCk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLmlzQWN0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b3AgKyB0aGlzLmhlaWdodCArIFZFUlRJQ0FMX1NFUEFSQVRJT05fQUNUSU9OICsgdGhpcy5vZmZzZXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b3AgKyBWRVJUSUNBTF9TRVBBUkFUSU9OICsgdGhpcy5vZmZzZXQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFkanVzdFBvc2l0aW9uKCkge1xuICAgICAgICBpZiAoISF0aGlzLnRvb2x0aXBUZXh0KSB7XG4gICAgICAgICAgICBjb25zdCByZWN0ID0gdGhpcy50b29sdGlwVGV4dC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgaWYgKHJlY3QucmlnaHQgPiB3aW5kb3cuaW5uZXJXaWR0aCkge1xuICAgICAgICAgICAgICAgIGxldCBsZWZ0OiBudW1iZXIgPSBwYXJzZUludCh0aGlzLnRvb2x0aXBUZXh0Lm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdC5yZXBsYWNlKCdweCcsICcnKSwgMTApO1xuICAgICAgICAgICAgICAgIGxlZnQgPSBsZWZ0IC0gKHJlY3QucmlnaHQgLSB3aW5kb3cuaW5uZXJXaWR0aCkgLSBIT1JJWk9OVEFMX1NFUEFSQVRJT047XG4gICAgICAgICAgICAgICAgdGhpcy50b29sdGlwVGV4dC5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSBsZWZ0ICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZWN0LmJvdHRvbSA+IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgICAgICAgICAgIGxldCB0b3A6IG51bWJlciA9IHBhcnNlSW50KHRoaXMudG9vbHRpcFRleHQubmF0aXZlRWxlbWVudC5zdHlsZS50b3AucmVwbGFjZSgncHgnLCAnJyksIDEwKTtcbiAgICAgICAgICAgICAgICB0b3AgPSB0b3AgLSAocmVjdC5ib3R0b20gLSB3aW5kb3cuaW5uZXJIZWlnaHQpIC0gVkVSVElDQUxfU0VQQVJBVElPTjtcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2x0aXBUZXh0Lm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gdG9wICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==