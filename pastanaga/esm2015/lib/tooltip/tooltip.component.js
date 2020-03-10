import { __decorate, __metadata } from "tslib";
import { AfterViewInit, Component, ElementRef, Input, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { markForCheck } from '../common/utils';
const VERTICAL_SEPARATION = 21;
const VERTICAL_SEPARATION_ACTION = 3;
const HORIZONTAL_SEPARATION = -3;
let TooltipComponent = class TooltipComponent {
    constructor(cdr) {
        this.cdr = cdr;
        this.isAction = false;
        this.height = 0;
        this.width = 0;
        this.left = 0;
        this.top = 0;
        this.offset = 0;
    }
    ngAfterViewInit() {
        this.show();
    }
    show() {
        if (!!this.tooltipText) {
            this.tooltipText.nativeElement.style.left = this.getLeftPosition() + 'px';
            this.tooltipText.nativeElement.style.top = this.getTopPosition() + 'px';
            this.adjustPosition(); // once position set, check if too far horizontally or vertically
            this.tooltipText.nativeElement.setAttribute('aria-expanded', true);
            markForCheck(this.cdr);
        }
    }
    hide() {
        if (!!this.tooltipText) {
            this.tooltipText.nativeElement.setAttribute('aria-expanded', false);
            markForCheck(this.cdr);
        }
    }
    getLeftPosition() {
        if (this.isAction && !!this.tooltipText) {
            const tooltipWidth = this.tooltipText.nativeElement.offsetWidth;
            return this.left + (this.width / 2) - (tooltipWidth / 2);
        }
        else {
            return this.left + HORIZONTAL_SEPARATION;
        }
    }
    getTopPosition() {
        if (this.isAction) {
            return this.top + this.height + VERTICAL_SEPARATION_ACTION + this.offset;
        }
        else {
            return this.top + VERTICAL_SEPARATION + this.offset;
        }
    }
    adjustPosition() {
        if (!!this.tooltipText) {
            const rect = this.tooltipText.nativeElement.getBoundingClientRect();
            if (rect.right > window.innerWidth) {
                let left = parseInt(this.tooltipText.nativeElement.style.left.replace('px', ''), 10);
                left = left - (rect.right - window.innerWidth) - HORIZONTAL_SEPARATION;
                this.tooltipText.nativeElement.style.left = left + 'px';
            }
            if (rect.bottom > window.innerHeight) {
                let top = parseInt(this.tooltipText.nativeElement.style.top.replace('px', ''), 10);
                top = top - (rect.bottom - window.innerHeight) - VERTICAL_SEPARATION;
                this.tooltipText.nativeElement.style.top = top + 'px';
            }
        }
    }
};
TooltipComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
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
export { TooltipComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ3VpbGxvdGluYXdlYi9wYXN0YW5hZ2EtYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi90b29sdGlwL3Rvb2x0aXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuSSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsTUFBTSxtQkFBbUIsR0FBRyxFQUFFLENBQUM7QUFDL0IsTUFBTSwwQkFBMEIsR0FBRyxDQUFDLENBQUM7QUFDckMsTUFBTSxxQkFBcUIsR0FBRyxDQUFDLENBQUMsQ0FBQztBQVFqQyxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQWF6QixZQUFvQixHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQVQxQyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLFdBQU0sR0FBRyxDQUFDLENBQUM7UUFDWCxVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsU0FBSSxHQUFHLENBQUMsQ0FBQztRQUNULFFBQUcsR0FBRyxDQUFDLENBQUM7UUFDUixXQUFNLEdBQUcsQ0FBQyxDQUFDO0lBSWtDLENBQUM7SUFFOUMsZUFBZTtRQUNYLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsSUFBSTtRQUNBLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQzFFLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FB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OzhDQUFlO0FBQ2Q7SUFBUixLQUFLLEVBQUU7OzRDQUFhO0FBU0s7SUFBekIsU0FBUyxDQUFDLGFBQWEsQ0FBQzs4QkFBZSxVQUFVO3FEQUFDO0FBWDFDLGdCQUFnQjtJQU41QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsb0JBQW9CO1FBQzlCLDRLQUF1QztRQUV2QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7S0FDbEQsQ0FBQztxQ0FjMkIsaUJBQWlCO0dBYmpDLGdCQUFnQixDQW9FNUI7U0FwRVksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgVmlld0NoaWxkLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1hcmtGb3JDaGVjayB9IGZyb20gJy4uL2NvbW1vbi91dGlscyc7XG5cbmNvbnN0IFZFUlRJQ0FMX1NFUEFSQVRJT04gPSAyMTtcbmNvbnN0IFZFUlRJQ0FMX1NFUEFSQVRJT05fQUNUSU9OID0gMztcbmNvbnN0IEhPUklaT05UQUxfU0VQQVJBVElPTiA9IC0zO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3BhLXRvb2x0aXAtZWxlbWVudCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3Rvb2x0aXAuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3Rvb2x0aXAuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgVG9vbHRpcENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICAgIEBJbnB1dCgpIHRleHQ/OiBzdHJpbmc7XG4gICAgQElucHV0KCkgaWQ/OiBzdHJpbmc7XG5cbiAgICBpc0FjdGlvbiA9IGZhbHNlO1xuICAgIGhlaWdodCA9IDA7XG4gICAgd2lkdGggPSAwO1xuICAgIGxlZnQgPSAwO1xuICAgIHRvcCA9IDA7XG4gICAgb2Zmc2V0ID0gMDtcblxuICAgIEBWaWV3Q2hpbGQoJ3Rvb2x0aXBUZXh0JykgdG9vbHRpcFRleHQ/OiBFbGVtZW50UmVmO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLnNob3coKTtcbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICBpZiAoISF0aGlzLnRvb2x0aXBUZXh0KSB7XG4gICAgICAgICAgICB0aGlzLnRvb2x0aXBUZXh0Lm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9IHRoaXMuZ2V0TGVmdFBvc2l0aW9uKCkgKyAncHgnO1xuICAgICAgICAgICAgdGhpcy50b29sdGlwVGV4dC5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcCA9IHRoaXMuZ2V0VG9wUG9zaXRpb24oKSArICdweCc7XG4gICAgICAgICAgICB0aGlzLmFkanVzdFBvc2l0aW9uKCk7IC8vIG9uY2UgcG9zaXRpb24gc2V0LCBjaGVjayBpZiB0b28gZmFyIGhvcml6b250YWxseSBvciB2ZXJ0aWNhbGx5XG4gICAgICAgICAgICB0aGlzLnRvb2x0aXBUZXh0Lm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICBtYXJrRm9yQ2hlY2sodGhpcy5jZHIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgaWYgKCEhdGhpcy50b29sdGlwVGV4dCkge1xuICAgICAgICAgICAgdGhpcy50b29sdGlwVGV4dC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgIG1hcmtGb3JDaGVjayh0aGlzLmNkcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldExlZnRQb3NpdGlvbigpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy5pc0FjdGlvbiAmJiAhIXRoaXMudG9vbHRpcFRleHQpIHtcbiAgICAgICAgICAgIGNvbnN0IHRvb2x0aXBXaWR0aCA9IHRoaXMudG9vbHRpcFRleHQubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxlZnQgKyAodGhpcy53aWR0aCAvIDIpIC0gKHRvb2x0aXBXaWR0aCAvIDIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGVmdCArIEhPUklaT05UQUxfU0VQQVJBVElPTjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0VG9wUG9zaXRpb24oKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHRoaXMuaXNBY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvcCArIHRoaXMuaGVpZ2h0ICsgVkVSVElDQUxfU0VQQVJBVElPTl9BQ1RJT04gKyB0aGlzLm9mZnNldDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvcCArIFZFUlRJQ0FMX1NFUEFSQVRJT04gKyB0aGlzLm9mZnNldDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYWRqdXN0UG9zaXRpb24oKSB7XG4gICAgICAgIGlmICghIXRoaXMudG9vbHRpcFRleHQpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLnRvb2x0aXBUZXh0Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBpZiAocmVjdC5yaWdodCA+IHdpbmRvdy5pbm5lcldpZHRoKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxlZnQ6IG51bWJlciA9IHBhcnNlSW50KHRoaXMudG9vbHRpcFRleHQubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0LnJlcGxhY2UoJ3B4JywgJycpLCAxMCk7XG4gICAgICAgICAgICAgICAgbGVmdCA9IGxlZnQgLSAocmVjdC5yaWdodCAtIHdpbmRvdy5pbm5lcldpZHRoKSAtIEhPUklaT05UQUxfU0VQQVJBVElPTjtcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2x0aXBUZXh0Lm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9IGxlZnQgKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlY3QuYm90dG9tID4gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgbGV0IHRvcDogbnVtYmVyID0gcGFyc2VJbnQodGhpcy50b29sdGlwVGV4dC5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcC5yZXBsYWNlKCdweCcsICcnKSwgMTApO1xuICAgICAgICAgICAgICAgIHRvcCA9IHRvcCAtIChyZWN0LmJvdHRvbSAtIHdpbmRvdy5pbm5lckhlaWdodCkgLSBWRVJUSUNBTF9TRVBBUkFUSU9OO1xuICAgICAgICAgICAgICAgIHRoaXMudG9vbHRpcFRleHQubmF0aXZlRWxlbWVudC5zdHlsZS50b3AgPSB0b3AgKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19