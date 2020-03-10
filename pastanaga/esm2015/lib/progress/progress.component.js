import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
let PastanagaProgressComponent = class PastanagaProgressComponent {
    constructor() {
        this.isSecondary = false;
        this.isSmall = false;
        this.isIndeterminate = false;
        this.percentValue = 0;
    }
    ngOnInit() {
        this.setIsIndeterminate();
    }
    ngOnChanges(changes) {
        if (changes.maxValue && changes.maxValue.currentValue === 0) {
            throw new Error('maxValue cannot be 0');
        }
        if (changes.value && typeof changes.value.currentValue !== 'undefined') {
            this.setIsIndeterminate();
            this.calculatePercentValue();
        }
    }
    setIsIndeterminate() {
        this.isIndeterminate = typeof this.value === 'undefined' || this.value === null;
    }
    calculatePercentValue() {
        if (typeof this.value === 'number') {
            const max = this.maxValue || 100;
            this.percentValue = this.value * 100 / max;
            if (this.value > max) {
                console.error(`Progress value is greater than the max value: ${this.value} > ${max}!`);
            }
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Number)
], PastanagaProgressComponent.prototype, "value", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PastanagaProgressComponent.prototype, "isSecondary", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PastanagaProgressComponent.prototype, "isSmall", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], PastanagaProgressComponent.prototype, "maxValue", void 0);
PastanagaProgressComponent = __decorate([
    Component({
        selector: 'pa-progress',
        template: "<progress *ngIf=\"percentValue\"\n          class=\"pa-progress\"\n          [class.pa-progress-secondary]=\"isSecondary\"\n          [class.pa-progress-small]=\"isSmall\"\n          value=\"{{percentValue}}\"\n          min=\"0\"\n          max=\"100\">\n    <span>{{percentValue}}</span>%\n</progress>\n\n<div *ngIf=\"isIndeterminate\"\n     class=\"pa-progress pa-progress-indeterminate\"\n     [class.pa-progress-secondary]=\"isSecondary\"\n     [class.pa-progress-small]=\"isSmall\"\n     role=\"progressbar\"\n     tabindex=\"0\"\n     aria-valuemin=\"0\"\n     aria-valuetext=\"indeterminate\"\n     aria-valuemax=\"100\"></div>\n\n<div *ngIf=\"!isIndeterminate && value === 0\"\n     class=\"pa-progress pa-progress-buffer\"\n     [class.pa-progress-secondary]=\"isSecondary\"\n     [class.pa-progress-small]=\"isSmall\"\n     role=\"progressbar\"\n     aria-valuenow=\"0\"\n     tabindex=\"0\"\n     aria-valuemin=\"0\"\n     aria-valuetext=\"0 percent\"\n     aria-valuemax=\"100\"></div>\n",
        styles: ["@-webkit-keyframes indeterminate-progress{0%{left:-35%;right:100%}100%,60%{left:100%;right:-90%}}@keyframes indeterminate-progress{0%{left:-35%;right:100%}100%,60%{left:100%;right:-90%}}@-webkit-keyframes indeterminate-progress-back{0%{left:-200%;right:100%}100%,60%{left:107%;right:-8%}}@keyframes indeterminate-progress-back{0%{left:-200%;right:100%}100%,60%{left:107%;right:-8%}}@-webkit-keyframes buffer-progress{0%{background-position:0}40%{background-position:-36px}60%{background-position:-72px}100%{background-position:-360px}}@keyframes buffer-progress{0%{background-position:0}40%{background-position:-36px}60%{background-position:-72px}100%{background-position:-360px}}.pa-progress{display:block;position:relative;width:100%;height:.1875rem;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:.1875rem;overflow:hidden;border:0;background:#dee7e9}.pa-progress.pa-progress-indeterminate,.pa-progress:not([value]):not([aria-valuenow]){background-color:#dee7e9;overflow:hidden}.pa-progress.pa-progress-indeterminate::before,.pa-progress:not([value]):not([aria-valuenow])::before{content:\"\";position:absolute;background-color:#2280a0;top:0;left:0;bottom:0;will-change:left,right;-webkit-animation:2.1s cubic-bezier(.65,.815,.735,.395) infinite indeterminate-progress;animation:2.1s cubic-bezier(.65,.815,.735,.395) infinite indeterminate-progress}.pa-progress.pa-progress-indeterminate::after,.pa-progress:not([value]):not([aria-valuenow])::after{content:\"\";position:absolute;background-color:#2280a0;top:0;left:0;bottom:0;will-change:left,right;-webkit-animation:2.1s cubic-bezier(.165,.84,.44,1) infinite indeterminate-progress-back;animation:2.1s cubic-bezier(.165,.84,.44,1) infinite indeterminate-progress-back;-webkit-animation-delay:1.15s;animation-delay:1.15s;z-index:1}.pa-progress.pa-progress-buffer::after,.pa-progress[aria-valuenow=\"0\"]::after{content:\"\";position:absolute;background-image:url('data:image/svg+xml; utf8, <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"3\" viewBox=\"0 0 12 3\"><circle cx=\"1.5\" cy=\"1.5\" r=\"1.5\" fill=\"%232880a4\" fill-rule=\"evenodd\"/></svg>');background-size:contain;background-color:transparent;top:0;left:0;bottom:0;height:100%;width:100%;will-change:background-position;-webkit-animation:30s cubic-bezier(.65,.815,.735,.395) infinite buffer-progress;animation:30s cubic-bezier(.65,.815,.735,.395) infinite buffer-progress}.pa-progress::-webkit-progress-bar{background:#dee7e9;border-radius:3px}.pa-progress::-webkit-progress-value{background:#2280a0;border-radius:0}.pa-progress::-moz-progress-bar{background:#2280a0;border-radius:0}.pa-progress::-ms-fill{border-radius:0;border:0}.pa-progress-secondary.pa-progress-indeterminate::after,.pa-progress-secondary.pa-progress-indeterminate::before,.pa-progress-secondary:not([value]):not([aria-valuenow]).pa-progress-indeterminate::after,.pa-progress-secondary:not([value]):not([aria-valuenow]).pa-progress-indeterminate::before{background-color:#826a6a}.pa-progress-secondary::-webkit-progress-value{background:#826a6a}.pa-progress-secondary::-moz-progress-bar{background:#826a6a}.pa-progress-secondary.pa-progress-buffer::after,.pa-progress-secondary[aria-valuenow=\"0\"]::after{background-image:url('data:image/svg+xml; utf8, <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"3\" viewBox=\"0 0 12 3\"><circle cx=\"1.5\" cy=\"1.5\" r=\"1.5\" fill=\"%237c7261\" fill-rule=\"evenodd\"/></svg>')}.pa-progress-small{height:1px}"]
    })
], PastanagaProgressComponent);
export { PastanagaProgressComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGd1aWxsb3RpbmF3ZWIvcGFzdGFuYWdhLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvcHJvZ3Jlc3MvcHJvZ3Jlc3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFPcEUsSUFBYSwwQkFBMEIsR0FBdkMsTUFBYSwwQkFBMEI7SUFBdkM7UUFFYSxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBR3pCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO0lBK0JyQixDQUFDO0lBN0JHLFFBQVE7UUFDSixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQU87UUFDZixJQUFJLE9BQU8sQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEtBQUssQ0FBQyxFQUFFO1lBQ3pELE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztTQUMzQztRQUVELElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxLQUFLLFdBQVcsRUFBRTtZQUNwRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUMxQixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztTQUNoQztJQUNMLENBQUM7SUFFTyxrQkFBa0I7UUFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssV0FBVyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDO0lBQ3BGLENBQUM7SUFFTyxxQkFBcUI7UUFDekIsSUFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQ2hDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksR0FBRyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBRTNDLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLEVBQUU7Z0JBQ2xCLE9BQU8sQ0FBQyxLQUFLLENBQUMsaURBQWlELElBQUksQ0FBQyxLQUFLLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQzthQUMxRjtTQUNKO0lBQ0wsQ0FBQztDQUNKLENBQUE7QUFyQ1k7SUFBUixLQUFLLEVBQUU7O3lEQUFnQjtBQUNmO0lBQVIsS0FBSyxFQUFFOzsrREFBcUI7QUFDcEI7SUFBUixLQUFLLEVBQUU7OzJEQUFpQjtBQUNoQjtJQUFSLEtBQUssRUFBRTs7NERBQW1CO0FBSmxCLDBCQUEwQjtJQUx0QyxTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsYUFBYTtRQUN2QixvL0JBQXdDOztLQUUzQyxDQUFDO0dBQ1csMEJBQTBCLENBc0N0QztTQXRDWSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3BhLXByb2dyZXNzJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcHJvZ3Jlc3MuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3Byb2dyZXNzLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFBhc3RhbmFnYVByb2dyZXNzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICAgIEBJbnB1dCgpIHZhbHVlPzogbnVtYmVyO1xuICAgIEBJbnB1dCgpIGlzU2Vjb25kYXJ5ID0gZmFsc2U7XG4gICAgQElucHV0KCkgaXNTbWFsbCA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIG1heFZhbHVlPzogbnVtYmVyO1xuXG4gICAgaXNJbmRldGVybWluYXRlID0gZmFsc2U7XG4gICAgcGVyY2VudFZhbHVlID0gMDtcblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnNldElzSW5kZXRlcm1pbmF0ZSgpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXMubWF4VmFsdWUgJiYgY2hhbmdlcy5tYXhWYWx1ZS5jdXJyZW50VmFsdWUgPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbWF4VmFsdWUgY2Fubm90IGJlIDAnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGFuZ2VzLnZhbHVlICYmIHR5cGVvZiBjaGFuZ2VzLnZhbHVlLmN1cnJlbnRWYWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SXNJbmRldGVybWluYXRlKCk7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZVBlcmNlbnRWYWx1ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRJc0luZGV0ZXJtaW5hdGUoKSB7XG4gICAgICAgIHRoaXMuaXNJbmRldGVybWluYXRlID0gdHlwZW9mIHRoaXMudmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IHRoaXMudmFsdWUgPT09IG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVQZXJjZW50VmFsdWUoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy52YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGNvbnN0IG1heCA9IHRoaXMubWF4VmFsdWUgfHwgMTAwO1xuICAgICAgICAgICAgdGhpcy5wZXJjZW50VmFsdWUgPSB0aGlzLnZhbHVlICogMTAwIC8gbWF4O1xuXG4gICAgICAgICAgICBpZiAodGhpcy52YWx1ZSA+IG1heCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFByb2dyZXNzIHZhbHVlIGlzIGdyZWF0ZXIgdGhhbiB0aGUgbWF4IHZhbHVlOiAke3RoaXMudmFsdWV9ID4gJHttYXh9IWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19