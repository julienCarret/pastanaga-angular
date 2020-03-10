import { __decorate, __metadata } from "tslib";
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, ChangeDetectionStrategy } from '@angular/core';
let nextId = 0;
let DoubleSliderComponent = class DoubleSliderComponent {
    constructor() {
        this.minRange = 0;
        this.maxRange = 100;
        this.step = 5;
        this.values = [this.minRange, this.maxRange];
        this.isDisabled = false;
        this.valuesChange = new EventEmitter();
        this.thumbWidth = 16;
        this.thumbBorderWidth = 1;
        this.trackHeight = 4;
        this.isDraggingLeft = false;
        this.isDraggingRight = false;
        this.width = 0;
        this.range = 0;
        this.rangeK = 0;
        this.thumbRealWidth = 0;
        this.helpId = '';
    }
    ngAfterViewInit() {
        if (!!this.container) {
            this.width = this.container.nativeElement.getBoundingClientRect().width;
        }
        this.initSlider();
        if (!!this.thumbLeft) {
            this.thumbLeft.nativeElement.addEventListener('mousedown', this.startDraggingLeft.bind(this), false);
        }
        if (!!this.thumbRight) {
            this.thumbRight.nativeElement.addEventListener('mousedown', this.startDraggingRight.bind(this), false);
        }
    }
    ngOnInit() {
        this.id = !this.id ? `field-double-slider-${nextId++}` : `${this.id}-double-slider`;
        this.helpId = `${this.id}-help`;
    }
    ngOnChanges(changes) {
        if (changes.values && changes.values.currentValue) {
            this.initSlider();
        }
        if (changes.minRange && typeof changes.minRange.currentValue !== 'number') {
            this.minRange = 0;
        }
        if (changes.maxRange && typeof changes.maxRange.currentValue !== 'number') {
            this.maxRange = 100;
        }
        if (changes.step && typeof changes.step.currentValue !== 'number') {
            this.step = 5;
        }
    }
    ngOnDestroy() {
        if (!!this.thumbLeft) {
            this.thumbLeft.nativeElement.removeEventListener('mousedown', this.startDraggingLeft, false);
        }
        if (!!this.thumbRight) {
            this.thumbRight.nativeElement.removeEventListener('mousedown', this.startDraggingRight, false);
        }
    }
    initSlider() {
        this.range = this.maxRange - this.minRange;
        this.rangeK = this.width / this.range;
        this.thumbRealWidth = this.thumbWidth + 2 * this.thumbBorderWidth;
        if (!!this.slider) {
            this.slider.nativeElement.style.height = this.trackHeight + 'px';
            this.slider.nativeElement.style.width = this.width + 'px';
            this.slider.nativeElement.style.paddingLeft = (this.values[0] - this.minRange) * this.rangeK + 'px';
            this.slider.nativeElement.style.paddingRight = this.width - this.values[1] * this.rangeK + 'px';
        }
        if (!!this.track) {
            this.track.nativeElement.style.width = this.values[1] * this.rangeK - this.values[0] * this.rangeK + 'px';
        }
        if (!!this.thumbLeft) {
            this.initThumb(this.thumbLeft, this.values[0]);
        }
        if (!!this.thumbRight) {
            this.initThumb(this.thumbRight, this.values[1]);
        }
    }
    stopDragging() {
        this.isDraggingLeft = false;
        this.isDraggingRight = false;
    }
    mouseUp() {
        this.stopDragging();
    }
    mouseLeave() {
        this.stopDragging();
    }
    moveThumb($event) {
        if (!this.isDisabled && (this.isDraggingLeft || this.isDraggingRight) &&
            this.container && this.thumbLeft && this.slider && this.track && this.thumbRight) {
            const mousePos = this.oMousePos(this.container.nativeElement, $event);
            const leftValue = (this.isDraggingLeft) ? Math.round(mousePos.x / this.rangeK / this.step) * this.step + this.minRange : this.values[0];
            const rightValue = (this.isDraggingRight) ? Math.round(mousePos.x / this.rangeK / this.step) * this.step + this.minRange : this.values[1];
            if (this.isDraggingLeft) {
                if (leftValue < rightValue - (this.thumbRealWidth / 2) && leftValue >= this.minRange) {
                    this.values[0] = leftValue;
                    this.thumbLeft.nativeElement.style.left = (leftValue - this.minRange) * this.rangeK - (this.thumbRealWidth / 2) + 'px';
                    this.slider.nativeElement.style.paddingLeft = (leftValue - this.minRange) * this.rangeK + 'px';
                    this.track.nativeElement.style.width = (rightValue - leftValue) * this.rangeK + 'px';
                }
            }
            else if (this.isDraggingRight) {
                if (rightValue > leftValue + (this.thumbRealWidth / 2) &&
                    rightValue <= this.maxRange) {
                    this.values[1] = rightValue;
                    this.thumbRight.nativeElement.style.left =
                        (rightValue - this.minRange) * this.rangeK - (this.thumbRealWidth / 2) + 'px';
                    this.slider.nativeElement.style.paddingRight = (this.maxRange - rightValue) * this.rangeK + 'px';
                    this.track.nativeElement.style.width = (rightValue - leftValue) * this.rangeK + 'px';
                }
            }
            this.valuesChange.emit(this.values);
        }
    }
    initThumb(thumb, thumbValue) {
        thumb.nativeElement.style.width = thumb.nativeElement.style.height = this.thumbWidth + 'px';
        thumb.nativeElement.style.borderWidth = this.thumbBorderWidth + 'px';
        thumb.nativeElement.style.top = -(this.thumbWidth / 2 + this.thumbBorderWidth - this.trackHeight / 2) + 'px';
        thumb.nativeElement.style.left = (thumbValue - this.minRange) * this.rangeK - (this.thumbRealWidth / 2) + 'px';
    }
    startDraggingLeft() {
        this.isDraggingLeft = true;
    }
    startDraggingRight() {
        this.isDraggingRight = true;
    }
    oMousePos(element, evt) {
        const ClientRect = element.getBoundingClientRect();
        return {
            x: Math.round(evt.clientX - ClientRect.left),
            y: Math.round(evt.clientY - ClientRect.top)
        };
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], DoubleSliderComponent.prototype, "id", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DoubleSliderComponent.prototype, "help", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DoubleSliderComponent.prototype, "minRange", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DoubleSliderComponent.prototype, "maxRange", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DoubleSliderComponent.prototype, "step", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], DoubleSliderComponent.prototype, "values", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DoubleSliderComponent.prototype, "isDisabled", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DoubleSliderComponent.prototype, "valuesChange", void 0);
__decorate([
    ViewChild('slider', { static: true }),
    __metadata("design:type", ElementRef)
], DoubleSliderComponent.prototype, "slider", void 0);
__decorate([
    ViewChild('container', { static: true }),
    __metadata("design:type", ElementRef)
], DoubleSliderComponent.prototype, "container", void 0);
__decorate([
    ViewChild('track', { static: true }),
    __metadata("design:type", ElementRef)
], DoubleSliderComponent.prototype, "track", void 0);
__decorate([
    ViewChild('thumbLeft', { static: true }),
    __metadata("design:type", ElementRef)
], DoubleSliderComponent.prototype, "thumbLeft", void 0);
__decorate([
    ViewChild('thumbRight', { static: true }),
    __metadata("design:type", ElementRef)
], DoubleSliderComponent.prototype, "thumbRight", void 0);
__decorate([
    ViewChild('outputLeft'),
    __metadata("design:type", ElementRef)
], DoubleSliderComponent.prototype, "outputLeft", void 0);
__decorate([
    ViewChild('outputRight'),
    __metadata("design:type", ElementRef)
], DoubleSliderComponent.prototype, "outputRight", void 0);
__decorate([
    HostListener('mouseup'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DoubleSliderComponent.prototype, "mouseUp", null);
__decorate([
    HostListener('mouseleave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DoubleSliderComponent.prototype, "mouseLeave", null);
__decorate([
    HostListener('mousemove', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DoubleSliderComponent.prototype, "moveThumb", null);
DoubleSliderComponent = __decorate([
    Component({
        selector: 'pa-double-slider',
        template: "<div class=\"pa-field pa-field-slider\" [class.disabled]=\"isDisabled\">\n    <label class=\"pa-field-label pa-field-label-range\" [for]=\"id\" translate>\n        <ng-content></ng-content>\n    </label>\n\n    <div class=\"pa-slider-wrapper\">\n        <div class=\"pa-slider-output left\">{{values[0]}}</div>\n        <div #container class=\"pa-slider-container\">\n            <div #slider class=\"pa-slider\">\n                <div #track class=\"pa-slider-track\"></div>\n            </div>\n\n            <div #thumbLeft class=\"pa-slider-thumb\"></div>\n            <div #thumbRight class=\"pa-slider-thumb\"></div>\n        </div>\n        <div class=\"pa-slider-output right\">{{values[1]}}</div>\n    </div>\n\n\n    <small *ngIf=\"help\" class=\"pa-field-help\" [id]=\"helpId\" translate>{{ help }}</small>\n</div>\n",
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [":host .pa-field-slider.disabled{opacity:.5}:host .pa-field-slider.disabled .pa-slider,:host .pa-field-slider.disabled .pa-slider-thumb{cursor:not-allowed}:host .pa-slider-wrapper{float:right;position:relative}:host .pa-slider-container{display:inline-block;position:relative;margin:.375rem 42px;height:12px;width:7.5rem}:host .pa-slider{pointer-events:none;margin:0;cursor:pointer;padding-left:30%;padding-right:30%;height:6px;border-radius:50px;background-color:#4da4c8;box-sizing:border-box}:host .pa-slider.focusable{border:1px solid #fff}:host .pa-slider-thumb{cursor:pointer;border:1px solid #4da4c8;width:16px;height:16px;background-color:#fff;border-radius:50%;position:absolute}:host .pa-slider-thumb::after{position:absolute;width:8px;height:8px;background:#2280a0;border-radius:50px;content:\"\";top:4px;left:4px}:host .pa-slider-track{pointer-events:none;height:100%;background-color:#00648d}:host .pa-slider-output{position:absolute;color:#767676;font-weight:300;top:0}:host .pa-slider-output.left{left:0}:host .pa-slider-output.right{right:0}:host .pa-field-help{margin:0}"]
    })
], DoubleSliderComponent);
export { DoubleSliderComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG91YmxlLXNsaWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ3VpbGxvdGluYXdlYi9wYXN0YW5hZ2EtYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi9jb250cm9scy9kb3VibGUtc2xpZGVyL2RvdWJsZS1zbGlkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBRUgsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osWUFBWSxFQUNaLEtBQUssRUFJTCxNQUFNLEVBQ04sU0FBUyxFQUNULHVCQUF1QixFQUMxQixNQUFNLGVBQWUsQ0FBQztBQUV2QixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFRZixJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtJQUFsQztRQUdhLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFDYixhQUFRLEdBQUcsR0FBRyxDQUFDO1FBQ2YsU0FBSSxHQUFHLENBQUMsQ0FBQztRQUNULFdBQU0sR0FBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbEIsaUJBQVksR0FBMkIsSUFBSSxZQUFZLEVBQVksQ0FBQztRQUU5RSxlQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLHFCQUFnQixHQUFHLENBQUMsQ0FBQztRQUNyQixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUVoQixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUV4QixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLFdBQU0sR0FBRyxDQUFDLENBQUM7UUFDWCxtQkFBYyxHQUFHLENBQUMsQ0FBQztRQUNuQixXQUFNLEdBQUcsRUFBRSxDQUFDO0lBdUpoQixDQUFDO0lBN0lHLGVBQWU7UUFDWCxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMs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QUM7WUFDakUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUMxRCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDcEcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDbkc7UUFDRCxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUM3RztRQUVELElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsRDtRQUNELElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNuRDtJQUNMLENBQUM7SUFFRCxZQUFZO1FBQ1IsSUFB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QUFJLEVBQUUsQ0FBQzs4QkFBUyxVQUFVO29EQUFDO0FBQ2Y7SUFBekMsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQzs4QkFBYSxVQUFVO3dEQUFDO0FBQ3RCO0lBQTFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7OEJBQWMsVUFBVTt5REFBQztBQUMxQztJQUF4QixTQUFTLENBQUMsWUFBWSxDQUFDOzhCQUFjLFVBQVU7eURBQUM7QUFDdkI7SUFBekIsU0FBUyxDQUFDLGFBQWEsQ0FBQzs4QkFBZSxVQUFVOzBEQUFDO0FBOEVuRDtJQURDLFlBQVksQ0FBQyxTQUFTLENBQUM7Ozs7b0RBR3ZCO0FBR0Q7SUFEQyxZQUFZLENBQUMsWUFBWSxDQUFDOzs7O3VEQUcxQjtBQUdEO0lBREMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7O3NEQWdDckM7QUFwSlEscUJBQXFCO0lBTmpDLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsdTBCQUE2QztRQUU3QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7S0FDbEQsQ0FBQztHQUNXLHFCQUFxQixDQTRLakM7U0E1S1kscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBIb3N0TGlzdGVuZXIsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFZpZXdDaGlsZCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxubGV0IG5leHRJZCA9IDA7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncGEtZG91YmxlLXNsaWRlcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2RvdWJsZS1zbGlkZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2RvdWJsZS1zbGlkZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgRG91YmxlU2xpZGVyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgaWQ/OiBzdHJpbmc7XG4gICAgQElucHV0KCkgaGVscD86IHN0cmluZztcbiAgICBASW5wdXQoKSBtaW5SYW5nZSA9IDA7XG4gICAgQElucHV0KCkgbWF4UmFuZ2UgPSAxMDA7XG4gICAgQElucHV0KCkgc3RlcCA9IDU7XG4gICAgQElucHV0KCkgdmFsdWVzOiBudW1iZXJbXSA9IFt0aGlzLm1pblJhbmdlLCB0aGlzLm1heFJhbmdlXTtcbiAgICBASW5wdXQoKSBpc0Rpc2FibGVkID0gZmFsc2U7XG4gICAgQE91dHB1dCgpIHZhbHVlc0NoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcltdPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyW10+KCk7XG5cbiAgICB0aHVtYldpZHRoID0gMTY7XG4gICAgdGh1bWJCb3JkZXJXaWR0aCA9IDE7XG4gICAgdHJhY2tIZWlnaHQgPSA0O1xuXG4gICAgaXNEcmFnZ2luZ0xlZnQgPSBmYWxzZTtcbiAgICBpc0RyYWdnaW5nUmlnaHQgPSBmYWxzZTtcblxuICAgIHdpZHRoID0gMDtcbiAgICByYW5nZSA9IDA7XG4gICAgcmFuZ2VLID0gMDtcbiAgICB0aHVtYlJlYWxXaWR0aCA9IDA7XG4gICAgaGVscElkID0gJyc7XG5cbiAgICBAVmlld0NoaWxkKCdzbGlkZXInLCB7IHN0YXRpYzogdHJ1ZSB9KSBzbGlkZXI/OiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicsIHsgc3RhdGljOiB0cnVlIH0pIGNvbnRhaW5lcj86IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgndHJhY2snLCB7IHN0YXRpYzogdHJ1ZSB9KSB0cmFjaz86IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgndGh1bWJMZWZ0JywgeyBzdGF0aWM6IHRydWUgfSkgdGh1bWJMZWZ0PzogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCd0aHVtYlJpZ2h0JywgeyBzdGF0aWM6IHRydWUgfSkgdGh1bWJSaWdodD86IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnb3V0cHV0TGVmdCcpIG91dHB1dExlZnQ/OiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ291dHB1dFJpZ2h0Jykgb3V0cHV0UmlnaHQ/OiBFbGVtZW50UmVmO1xuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAoISF0aGlzLmNvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuY29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluaXRTbGlkZXIoKTtcblxuICAgICAgICBpZiAoISF0aGlzLnRodW1iTGVmdCkge1xuICAgICAgICAgICAgdGhpcy50aHVtYkxlZnQubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLnN0YXJ0RHJhZ2dpbmdMZWZ0LmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoISF0aGlzLnRodW1iUmlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMudGh1bWJSaWdodC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuc3RhcnREcmFnZ2luZ1JpZ2h0LmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmlkID0gIXRoaXMuaWQgPyBgZmllbGQtZG91YmxlLXNsaWRlci0ke25leHRJZCsrfWAgOiBgJHt0aGlzLmlkfS1kb3VibGUtc2xpZGVyYDtcbiAgICAgICAgdGhpcy5oZWxwSWQgPSBgJHt0aGlzLmlkfS1oZWxwYDtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzLnZhbHVlcyAmJiBjaGFuZ2VzLnZhbHVlcy5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdFNsaWRlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoYW5nZXMubWluUmFuZ2UgJiYgdHlwZW9mIGNoYW5nZXMubWluUmFuZ2UuY3VycmVudFZhbHVlICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhpcy5taW5SYW5nZSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hhbmdlcy5tYXhSYW5nZSAmJiB0eXBlb2YgY2hhbmdlcy5tYXhSYW5nZS5jdXJyZW50VmFsdWUgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLm1heFJhbmdlID0gMTAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoYW5nZXMuc3RlcCAmJiB0eXBlb2YgY2hhbmdlcy5zdGVwLmN1cnJlbnRWYWx1ZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMuc3RlcCA9IDU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKCEhdGhpcy50aHVtYkxlZnQpIHtcbiAgICAgICAgICAgIHRoaXMudGh1bWJMZWZ0Lm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5zdGFydERyYWdnaW5nTGVmdCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghIXRoaXMudGh1bWJSaWdodCkge1xuICAgICAgICAgICAgdGhpcy50aHVtYlJpZ2h0Lm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5zdGFydERyYWdnaW5nUmlnaHQsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFNsaWRlcigpIHtcbiAgICAgICAgdGhpcy5yYW5nZSA9IHRoaXMubWF4UmFuZ2UgLSB0aGlzLm1pblJhbmdlO1xuICAgICAgICB0aGlzLnJhbmdlSyA9IHRoaXMud2lkdGggLyB0aGlzLnJhbmdlO1xuICAgICAgICB0aGlzLnRodW1iUmVhbFdpZHRoID0gdGhpcy50aHVtYldpZHRoICsgMiAqIHRoaXMudGh1bWJCb3JkZXJXaWR0aDtcblxuICAgICAgICBpZiAoISF0aGlzLnNsaWRlcikge1xuICAgICAgICAgICAgdGhpcy5zbGlkZXIubmF0aXZlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSB0aGlzLnRyYWNrSGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUud2lkdGggPSB0aGlzLndpZHRoICsgJ3B4JztcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUucGFkZGluZ0xlZnQgPSAodGhpcy52YWx1ZXNbMF0gLSB0aGlzLm1pblJhbmdlKSAqIHRoaXMucmFuZ2VLICsgJ3B4JztcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gdGhpcy53aWR0aCAtIHRoaXMudmFsdWVzWzFdICogdGhpcy5yYW5nZUsgKyAncHgnO1xuICAgICAgICB9XG4gICAgICAgIGlmICghIXRoaXMudHJhY2spIHtcbiAgICAgICAgICAgIHRoaXMudHJhY2submF0aXZlRWxlbWVudC5zdHlsZS53aWR0aCA9IHRoaXMudmFsdWVzWzFdICogdGhpcy5yYW5nZUsgLSB0aGlzLnZhbHVlc1swXSAqIHRoaXMucmFuZ2VLICsgJ3B4JztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghIXRoaXMudGh1bWJMZWZ0KSB7XG4gICAgICAgICAgICB0aGlzLmluaXRUaHVtYih0aGlzLnRodW1iTGVmdCwgdGhpcy52YWx1ZXNbMF0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghIXRoaXMudGh1bWJSaWdodCkge1xuICAgICAgICAgICAgdGhpcy5pbml0VGh1bWIodGhpcy50aHVtYlJpZ2h0LCB0aGlzLnZhbHVlc1sxXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdG9wRHJhZ2dpbmcoKSB7XG4gICAgICAgIHRoaXMuaXNEcmFnZ2luZ0xlZnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0RyYWdnaW5nUmlnaHQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZXVwJylcbiAgICBtb3VzZVVwKCkge1xuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxuICAgIG1vdXNlTGVhdmUoKSB7XG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2Vtb3ZlJywgWyckZXZlbnQnXSlcbiAgICBtb3ZlVGh1bWIoJGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5pc0Rpc2FibGVkICYmICh0aGlzLmlzRHJhZ2dpbmdMZWZ0IHx8IHRoaXMuaXNEcmFnZ2luZ1JpZ2h0KSAmJlxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIgJiYgdGhpcy50aHVtYkxlZnQgJiYgdGhpcy5zbGlkZXIgJiYgdGhpcy50cmFjayAmJiB0aGlzLnRodW1iUmlnaHQpIHtcbiAgICAgICAgICAgIGNvbnN0IG1vdXNlUG9zID0gdGhpcy5vTW91c2VQb3ModGhpcy5jb250YWluZXIubmF0aXZlRWxlbWVudCwgJGV2ZW50KTtcbiAgICAgICAgICAgIGNvbnN0IGxlZnRWYWx1ZSA9XG4gICAgICAgICAgICAgICAgKHRoaXMuaXNEcmFnZ2luZ0xlZnQpID8gTWF0aC5yb3VuZChtb3VzZVBvcy54IC8gdGhpcy5yYW5nZUsgLyB0aGlzLnN0ZXApICogdGhpcy5zdGVwICsgdGhpcy5taW5SYW5nZSA6IHRoaXMudmFsdWVzWzBdO1xuICAgICAgICAgICAgY29uc3QgcmlnaHRWYWx1ZSA9XG4gICAgICAgICAgICAgICAgKHRoaXMuaXNEcmFnZ2luZ1JpZ2h0KSA/IE1hdGgucm91bmQobW91c2VQb3MueCAvIHRoaXMucmFuZ2VLIC8gdGhpcy5zdGVwKSAqIHRoaXMuc3RlcCArIHRoaXMubWluUmFuZ2UgOiB0aGlzLnZhbHVlc1sxXTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNEcmFnZ2luZ0xlZnQpIHtcblxuICAgICAgICAgICAgICAgIGlmIChsZWZ0VmFsdWUgPCByaWdodFZhbHVlIC0gKHRoaXMudGh1bWJSZWFsV2lkdGggLyAyKSAmJiBsZWZ0VmFsdWUgPj0gdGhpcy5taW5SYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlc1swXSA9IGxlZnRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aHVtYkxlZnQubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gKGxlZnRWYWx1ZSAtIHRoaXMubWluUmFuZ2UpICogdGhpcy5yYW5nZUsgLSAodGhpcy50aHVtYlJlYWxXaWR0aCAvIDIpICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zbGlkZXIubmF0aXZlRWxlbWVudC5zdHlsZS5wYWRkaW5nTGVmdCA9IChsZWZ0VmFsdWUgLSB0aGlzLm1pblJhbmdlKSAqIHRoaXMucmFuZ2VLICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFjay5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoID0gKHJpZ2h0VmFsdWUgLSBsZWZ0VmFsdWUpICogdGhpcy5yYW5nZUsgKyAncHgnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0RyYWdnaW5nUmlnaHQpIHtcblxuICAgICAgICAgICAgICAgIGlmIChyaWdodFZhbHVlID4gbGVmdFZhbHVlICsgKHRoaXMudGh1bWJSZWFsV2lkdGggLyAyKSAmJlxuICAgICAgICAgICAgICAgICAgICByaWdodFZhbHVlIDw9IHRoaXMubWF4UmFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZXNbMV0gPSByaWdodFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRodW1iUmlnaHQubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID1cbiAgICAgICAgICAgICAgICAgICAgICAgIChyaWdodFZhbHVlIC0gdGhpcy5taW5SYW5nZSkgKiB0aGlzLnJhbmdlSyAtICh0aGlzLnRodW1iUmVhbFdpZHRoIC8gMikgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNsaWRlci5uYXRpdmVFbGVtZW50LnN0eWxlLnBhZGRpbmdSaWdodCA9ICh0aGlzLm1heFJhbmdlIC0gcmlnaHRWYWx1ZSkgKiB0aGlzLnJhbmdlSyArICdweCc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJhY2submF0aXZlRWxlbWVudC5zdHlsZS53aWR0aCA9IChyaWdodFZhbHVlIC0gbGVmdFZhbHVlKSAqIHRoaXMucmFuZ2VLICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudmFsdWVzQ2hhbmdlLmVtaXQodGhpcy52YWx1ZXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0VGh1bWIodGh1bWI6IEVsZW1lbnRSZWYsIHRodW1iVmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aHVtYi5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoID0gdGh1bWIubmF0aXZlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSB0aGlzLnRodW1iV2lkdGggKyAncHgnO1xuICAgICAgICB0aHVtYi5uYXRpdmVFbGVtZW50LnN0eWxlLmJvcmRlcldpZHRoID0gdGhpcy50aHVtYkJvcmRlcldpZHRoICsgJ3B4JztcbiAgICAgICAgdGh1bWIubmF0aXZlRWxlbWVudC5zdHlsZS50b3AgPSAtKHRoaXMudGh1bWJXaWR0aCAvIDIgKyB0aGlzLnRodW1iQm9yZGVyV2lkdGggLSB0aGlzLnRyYWNrSGVpZ2h0IC8gMikgKyAncHgnO1xuICAgICAgICB0aHVtYi5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSAodGh1bWJWYWx1ZSAtIHRoaXMubWluUmFuZ2UpICogdGhpcy5yYW5nZUsgLSAodGhpcy50aHVtYlJlYWxXaWR0aCAvIDIpICsgJ3B4JztcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXJ0RHJhZ2dpbmdMZWZ0KCkge1xuICAgICAgICB0aGlzLmlzRHJhZ2dpbmdMZWZ0ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXJ0RHJhZ2dpbmdSaWdodCgpIHtcbiAgICAgICAgdGhpcy5pc0RyYWdnaW5nUmlnaHQgPSB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgb01vdXNlUG9zKGVsZW1lbnQsIGV2dCkge1xuICAgICAgICBjb25zdCBDbGllbnRSZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IE1hdGgucm91bmQoZXZ0LmNsaWVudFggLSBDbGllbnRSZWN0LmxlZnQpLFxuICAgICAgICAgICAgeTogTWF0aC5yb3VuZChldnQuY2xpZW50WSAtIENsaWVudFJlY3QudG9wKVxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdfQ==