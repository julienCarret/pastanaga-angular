import { __decorate, __metadata } from "tslib";
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, ChangeDetectionStrategy } from '@angular/core';
var nextId = 0;
var DoubleSliderComponent = /** @class */ (function () {
    function DoubleSliderComponent() {
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
    DoubleSliderComponent.prototype.ngAfterViewInit = function () {
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
    };
    DoubleSliderComponent.prototype.ngOnInit = function () {
        this.id = !this.id ? "field-double-slider-" + nextId++ : this.id + "-double-slider";
        this.helpId = this.id + "-help";
    };
    DoubleSliderComponent.prototype.ngOnChanges = function (changes) {
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
    };
    DoubleSliderComponent.prototype.ngOnDestroy = function () {
        if (!!this.thumbLeft) {
            this.thumbLeft.nativeElement.removeEventListener('mousedown', this.startDraggingLeft, false);
        }
        if (!!this.thumbRight) {
            this.thumbRight.nativeElement.removeEventListener('mousedown', this.startDraggingRight, false);
        }
    };
    DoubleSliderComponent.prototype.initSlider = function () {
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
    };
    DoubleSliderComponent.prototype.stopDragging = function () {
        this.isDraggingLeft = false;
        this.isDraggingRight = false;
    };
    DoubleSliderComponent.prototype.mouseUp = function () {
        this.stopDragging();
    };
    DoubleSliderComponent.prototype.mouseLeave = function () {
        this.stopDragging();
    };
    DoubleSliderComponent.prototype.moveThumb = function ($event) {
        if (!this.isDisabled && (this.isDraggingLeft || this.isDraggingRight) &&
            this.container && this.thumbLeft && this.slider && this.track && this.thumbRight) {
            var mousePos = this.oMousePos(this.container.nativeElement, $event);
            var leftValue = (this.isDraggingLeft) ? Math.round(mousePos.x / this.rangeK / this.step) * this.step + this.minRange : this.values[0];
            var rightValue = (this.isDraggingRight) ? Math.round(mousePos.x / this.rangeK / this.step) * this.step + this.minRange : this.values[1];
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
    };
    DoubleSliderComponent.prototype.initThumb = function (thumb, thumbValue) {
        thumb.nativeElement.style.width = thumb.nativeElement.style.height = this.thumbWidth + 'px';
        thumb.nativeElement.style.borderWidth = this.thumbBorderWidth + 'px';
        thumb.nativeElement.style.top = -(this.thumbWidth / 2 + this.thumbBorderWidth - this.trackHeight / 2) + 'px';
        thumb.nativeElement.style.left = (thumbValue - this.minRange) * this.rangeK - (this.thumbRealWidth / 2) + 'px';
    };
    DoubleSliderComponent.prototype.startDraggingLeft = function () {
        this.isDraggingLeft = true;
    };
    DoubleSliderComponent.prototype.startDraggingRight = function () {
        this.isDraggingRight = true;
    };
    DoubleSliderComponent.prototype.oMousePos = function (element, evt) {
        var ClientRect = element.getBoundingClientRect();
        return {
            x: Math.round(evt.clientX - ClientRect.left),
            y: Math.round(evt.clientY - ClientRect.top)
        };
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
    return DoubleSliderComponent;
}());
export { DoubleSliderComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG91YmxlLXNsaWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ3VpbGxvdGluYXdlYi9wYXN0YW5hZ2EtYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi9jb250cm9scy9kb3VibGUtc2xpZGVyL2RvdWJsZS1zbGlkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBRUgsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osWUFBWSxFQUNaLEtBQUssRUFJTCxNQUFNLEVBQ04sU0FBUyxFQUNULHVCQUF1QixFQUMxQixNQUFNLGVBQWUsQ0FBQztBQUV2QixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFRZjtJQUFBO1FBR2EsYUFBUSxHQUFHLENBQUMsQ0FBQztRQUNiLGFBQVEsR0FBRyxHQUFHLENBQUM7UUFDZixTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ1QsV0FBTSxHQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEQsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNsQixpQkFBWSxHQUEyQixJQUFJLFlBQVksRUFBWSxDQUFDO1FBRTlFLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIscUJBQWdCLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBRWhCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBRXhCLFVBQUssR0FBRyxDQUFDLENBQUM7UUFDVixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsV0FBTSxHQUFHLENBQUMsQ0FBQztRQUNYLG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLFdBQU0sR0FBRyxFQUFFLENBQUM7SUF1SmhCLENBQUM7SUE3SUcsK0NBQWUsR0FBZjtRQUNJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxDQUFD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QUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7a0NBQVMsVUFBVTt3REFBQztJQUNmO1FBQXpDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7a0NBQWEsVUFBVTs0REFBQztJQUN0QjtRQUExQyxTQUFTLENBQUMsWUFBWSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO2tDQUFjLFVBQVU7NkRBQUM7SUFDMUM7UUFBeEIsU0FBUyxDQUFDLFlBQVksQ0FBQztrQ0FBYyxVQUFVOzZEQUFDO0lBQ3ZCO1FBQXpCLFNBQVMsQ0FBQyxhQUFhLENBQUM7a0NBQWUsVUFBVTs4REFBQztJQThFbkQ7UUFEQyxZQUFZLENBQUMsU0FBUyxDQUFDOzs7O3dEQUd2QjtJQUdEO1FBREMsWUFBWSxDQUFDLFlBQVksQ0FBQzs7OzsyREFHMUI7SUFHRDtRQURDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7OzswREFnQ3JDO0lBcEpRLHFCQUFxQjtRQU5qQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLHUwQkFBNkM7WUFFN0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O1NBQ2xELENBQUM7T0FDVyxxQkFBcUIsQ0E0S2pDO0lBQUQsNEJBQUM7Q0FBQSxBQTVLRCxJQTRLQztTQTVLWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEhvc3RMaXN0ZW5lcixcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgVmlld0NoaWxkLFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5sZXQgbmV4dElkID0gMDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwYS1kb3VibGUtc2xpZGVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZG91YmxlLXNsaWRlci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZG91YmxlLXNsaWRlci5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBEb3VibGVTbGlkZXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSBpZD86IHN0cmluZztcbiAgICBASW5wdXQoKSBoZWxwPzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIG1pblJhbmdlID0gMDtcbiAgICBASW5wdXQoKSBtYXhSYW5nZSA9IDEwMDtcbiAgICBASW5wdXQoKSBzdGVwID0gNTtcbiAgICBASW5wdXQoKSB2YWx1ZXM6IG51bWJlcltdID0gW3RoaXMubWluUmFuZ2UsIHRoaXMubWF4UmFuZ2VdO1xuICAgIEBJbnB1dCgpIGlzRGlzYWJsZWQgPSBmYWxzZTtcbiAgICBAT3V0cHV0KCkgdmFsdWVzQ2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXJbXT4oKTtcblxuICAgIHRodW1iV2lkdGggPSAxNjtcbiAgICB0aHVtYkJvcmRlcldpZHRoID0gMTtcbiAgICB0cmFja0hlaWdodCA9IDQ7XG5cbiAgICBpc0RyYWdnaW5nTGVmdCA9IGZhbHNlO1xuICAgIGlzRHJhZ2dpbmdSaWdodCA9IGZhbHNlO1xuXG4gICAgd2lkdGggPSAwO1xuICAgIHJhbmdlID0gMDtcbiAgICByYW5nZUsgPSAwO1xuICAgIHRodW1iUmVhbFdpZHRoID0gMDtcbiAgICBoZWxwSWQgPSAnJztcblxuICAgIEBWaWV3Q2hpbGQoJ3NsaWRlcicsIHsgc3RhdGljOiB0cnVlIH0pIHNsaWRlcj86IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnY29udGFpbmVyJywgeyBzdGF0aWM6IHRydWUgfSkgY29udGFpbmVyPzogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCd0cmFjaycsIHsgc3RhdGljOiB0cnVlIH0pIHRyYWNrPzogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCd0aHVtYkxlZnQnLCB7IHN0YXRpYzogdHJ1ZSB9KSB0aHVtYkxlZnQ/OiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ3RodW1iUmlnaHQnLCB7IHN0YXRpYzogdHJ1ZSB9KSB0aHVtYlJpZ2h0PzogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCdvdXRwdXRMZWZ0Jykgb3V0cHV0TGVmdD86IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnb3V0cHV0UmlnaHQnKSBvdXRwdXRSaWdodD86IEVsZW1lbnRSZWY7XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICghIXRoaXMuY29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5jb250YWluZXIubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5pdFNsaWRlcigpO1xuXG4gICAgICAgIGlmICghIXRoaXMudGh1bWJMZWZ0KSB7XG4gICAgICAgICAgICB0aGlzLnRodW1iTGVmdC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuc3RhcnREcmFnZ2luZ0xlZnQuYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghIXRoaXMudGh1bWJSaWdodCkge1xuICAgICAgICAgICAgdGhpcy50aHVtYlJpZ2h0Lm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5zdGFydERyYWdnaW5nUmlnaHQuYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaWQgPSAhdGhpcy5pZCA/IGBmaWVsZC1kb3VibGUtc2xpZGVyLSR7bmV4dElkKyt9YCA6IGAke3RoaXMuaWR9LWRvdWJsZS1zbGlkZXJgO1xuICAgICAgICB0aGlzLmhlbHBJZCA9IGAke3RoaXMuaWR9LWhlbHBgO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXMudmFsdWVzICYmIGNoYW5nZXMudmFsdWVzLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5pbml0U2xpZGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hhbmdlcy5taW5SYW5nZSAmJiB0eXBlb2YgY2hhbmdlcy5taW5SYW5nZS5jdXJyZW50VmFsdWUgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLm1pblJhbmdlID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGFuZ2VzLm1heFJhbmdlICYmIHR5cGVvZiBjaGFuZ2VzLm1heFJhbmdlLmN1cnJlbnRWYWx1ZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMubWF4UmFuZ2UgPSAxMDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hhbmdlcy5zdGVwICYmIHR5cGVvZiBjaGFuZ2VzLnN0ZXAuY3VycmVudFZhbHVlICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhpcy5zdGVwID0gNTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAoISF0aGlzLnRodW1iTGVmdCkge1xuICAgICAgICAgICAgdGhpcy50aHVtYkxlZnQubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLnN0YXJ0RHJhZ2dpbmdMZWZ0LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEhdGhpcy50aHVtYlJpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnRodW1iUmlnaHQubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLnN0YXJ0RHJhZ2dpbmdSaWdodCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0U2xpZGVyKCkge1xuICAgICAgICB0aGlzLnJhbmdlID0gdGhpcy5tYXhSYW5nZSAtIHRoaXMubWluUmFuZ2U7XG4gICAgICAgIHRoaXMucmFuZ2VLID0gdGhpcy53aWR0aCAvIHRoaXMucmFuZ2U7XG4gICAgICAgIHRoaXMudGh1bWJSZWFsV2lkdGggPSB0aGlzLnRodW1iV2lkdGggKyAyICogdGhpcy50aHVtYkJvcmRlcldpZHRoO1xuXG4gICAgICAgIGlmICghIXRoaXMuc2xpZGVyKSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlci5uYXRpdmVFbGVtZW50LnN0eWxlLmhlaWdodCA9IHRoaXMudHJhY2tIZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgdGhpcy5zbGlkZXIubmF0aXZlRWxlbWVudC5zdHlsZS53aWR0aCA9IHRoaXMud2lkdGggKyAncHgnO1xuICAgICAgICAgICAgdGhpcy5zbGlkZXIubmF0aXZlRWxlbWVudC5zdHlsZS5wYWRkaW5nTGVmdCA9ICh0aGlzLnZhbHVlc1swXSAtIHRoaXMubWluUmFuZ2UpICogdGhpcy5yYW5nZUsgKyAncHgnO1xuICAgICAgICAgICAgdGhpcy5zbGlkZXIubmF0aXZlRWxlbWVudC5zdHlsZS5wYWRkaW5nUmlnaHQgPSB0aGlzLndpZHRoIC0gdGhpcy52YWx1ZXNbMV0gKiB0aGlzLnJhbmdlSyArICdweCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEhdGhpcy50cmFjaykge1xuICAgICAgICAgICAgdGhpcy50cmFjay5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoID0gdGhpcy52YWx1ZXNbMV0gKiB0aGlzLnJhbmdlSyAtIHRoaXMudmFsdWVzWzBdICogdGhpcy5yYW5nZUsgKyAncHgnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCEhdGhpcy50aHVtYkxlZnQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdFRodW1iKHRoaXMudGh1bWJMZWZ0LCB0aGlzLnZhbHVlc1swXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEhdGhpcy50aHVtYlJpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLmluaXRUaHVtYih0aGlzLnRodW1iUmlnaHQsIHRoaXMudmFsdWVzWzFdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0b3BEcmFnZ2luZygpIHtcbiAgICAgICAgdGhpcy5pc0RyYWdnaW5nTGVmdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzRHJhZ2dpbmdSaWdodCA9IGZhbHNlO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNldXAnKVxuICAgIG1vdXNlVXAoKSB7XG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXG4gICAgbW91c2VMZWF2ZSgpIHtcbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZW1vdmUnLCBbJyRldmVudCddKVxuICAgIG1vdmVUaHVtYigkZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRGlzYWJsZWQgJiYgKHRoaXMuaXNEcmFnZ2luZ0xlZnQgfHwgdGhpcy5pc0RyYWdnaW5nUmlnaHQpICYmXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lciAmJiB0aGlzLnRodW1iTGVmdCAmJiB0aGlzLnNsaWRlciAmJiB0aGlzLnRyYWNrICYmIHRoaXMudGh1bWJSaWdodCkge1xuICAgICAgICAgICAgY29uc3QgbW91c2VQb3MgPSB0aGlzLm9Nb3VzZVBvcyh0aGlzLmNvbnRhaW5lci5uYXRpdmVFbGVtZW50LCAkZXZlbnQpO1xuICAgICAgICAgICAgY29uc3QgbGVmdFZhbHVlID1cbiAgICAgICAgICAgICAgICAodGhpcy5pc0RyYWdnaW5nTGVmdCkgPyBNYXRoLnJvdW5kKG1vdXNlUG9zLnggLyB0aGlzLnJhbmdlSyAvIHRoaXMuc3RlcCkgKiB0aGlzLnN0ZXAgKyB0aGlzLm1pblJhbmdlIDogdGhpcy52YWx1ZXNbMF07XG4gICAgICAgICAgICBjb25zdCByaWdodFZhbHVlID1cbiAgICAgICAgICAgICAgICAodGhpcy5pc0RyYWdnaW5nUmlnaHQpID8gTWF0aC5yb3VuZChtb3VzZVBvcy54IC8gdGhpcy5yYW5nZUsgLyB0aGlzLnN0ZXApICogdGhpcy5zdGVwICsgdGhpcy5taW5SYW5nZSA6IHRoaXMudmFsdWVzWzFdO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pc0RyYWdnaW5nTGVmdCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGxlZnRWYWx1ZSA8IHJpZ2h0VmFsdWUgLSAodGhpcy50aHVtYlJlYWxXaWR0aCAvIDIpICYmIGxlZnRWYWx1ZSA+PSB0aGlzLm1pblJhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWVzWzBdID0gbGVmdFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRodW1iTGVmdC5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSAobGVmdFZhbHVlIC0gdGhpcy5taW5SYW5nZSkgKiB0aGlzLnJhbmdlSyAtICh0aGlzLnRodW1iUmVhbFdpZHRoIC8gMikgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNsaWRlci5uYXRpdmVFbGVtZW50LnN0eWxlLnBhZGRpbmdMZWZ0ID0gKGxlZnRWYWx1ZSAtIHRoaXMubWluUmFuZ2UpICogdGhpcy5yYW5nZUsgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYWNrLm5hdGl2ZUVsZW1lbnQuc3R5bGUud2lkdGggPSAocmlnaHRWYWx1ZSAtIGxlZnRWYWx1ZSkgKiB0aGlzLnJhbmdlSyArICdweCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzRHJhZ2dpbmdSaWdodCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHJpZ2h0VmFsdWUgPiBsZWZ0VmFsdWUgKyAodGhpcy50aHVtYlJlYWxXaWR0aCAvIDIpICYmXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0VmFsdWUgPD0gdGhpcy5tYXhSYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlc1sxXSA9IHJpZ2h0VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGh1bWJSaWdodC5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgKHJpZ2h0VmFsdWUgLSB0aGlzLm1pblJhbmdlKSAqIHRoaXMucmFuZ2VLIC0gKHRoaXMudGh1bWJSZWFsV2lkdGggLyAyKSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gKHRoaXMubWF4UmFuZ2UgLSByaWdodFZhbHVlKSAqIHRoaXMucmFuZ2VLICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFjay5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoID0gKHJpZ2h0VmFsdWUgLSBsZWZ0VmFsdWUpICogdGhpcy5yYW5nZUsgKyAncHgnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy52YWx1ZXNDaGFuZ2UuZW1pdCh0aGlzLnZhbHVlcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRUaHVtYih0aHVtYjogRWxlbWVudFJlZiwgdGh1bWJWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRodW1iLm5hdGl2ZUVsZW1lbnQuc3R5bGUud2lkdGggPSB0aHVtYi5uYXRpdmVFbGVtZW50LnN0eWxlLmhlaWdodCA9IHRoaXMudGh1bWJXaWR0aCArICdweCc7XG4gICAgICAgIHRodW1iLm5hdGl2ZUVsZW1lbnQuc3R5bGUuYm9yZGVyV2lkdGggPSB0aGlzLnRodW1iQm9yZGVyV2lkdGggKyAncHgnO1xuICAgICAgICB0aHVtYi5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcCA9IC0odGhpcy50aHVtYldpZHRoIC8gMiArIHRoaXMudGh1bWJCb3JkZXJXaWR0aCAtIHRoaXMudHJhY2tIZWlnaHQgLyAyKSArICdweCc7XG4gICAgICAgIHRodW1iLm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9ICh0aHVtYlZhbHVlIC0gdGhpcy5taW5SYW5nZSkgKiB0aGlzLnJhbmdlSyAtICh0aGlzLnRodW1iUmVhbFdpZHRoIC8gMikgKyAncHgnO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhcnREcmFnZ2luZ0xlZnQoKSB7XG4gICAgICAgIHRoaXMuaXNEcmFnZ2luZ0xlZnQgPSB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhcnREcmFnZ2luZ1JpZ2h0KCkge1xuICAgICAgICB0aGlzLmlzRHJhZ2dpbmdSaWdodCA9IHRydWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvTW91c2VQb3MoZWxlbWVudCwgZXZ0KSB7XG4gICAgICAgIGNvbnN0IENsaWVudFJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogTWF0aC5yb3VuZChldnQuY2xpZW50WCAtIENsaWVudFJlY3QubGVmdCksXG4gICAgICAgICAgICB5OiBNYXRoLnJvdW5kKGV2dC5jbGllbnRZIC0gQ2xpZW50UmVjdC50b3ApXG4gICAgICAgIH07XG4gICAgfVxufVxuIl19