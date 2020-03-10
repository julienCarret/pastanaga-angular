import { __decorate, __metadata } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
var nextId = 0;
var SliderComponent = /** @class */ (function () {
    function SliderComponent() {
        this.min = 0;
        this.max = 100;
        this.step = 1;
        this.isDisabled = false;
        this.valueChange = new EventEmitter();
        this.helpId = '';
        this.rangeValue = 0;
    }
    SliderComponent.prototype.ngOnInit = function () {
        this.id = !this.id ? "field-range-" + nextId++ : this.id + "-field-range";
        this.name = this.name || this.id;
        this.helpId = this.id + "-help";
    };
    SliderComponent.prototype.ngOnChanges = function (changes) {
        if (changes.min && typeof changes.min.currentValue !== 'number') {
            this.min = 0;
        }
        if (changes.max && typeof changes.max.currentValue !== 'number') {
            this.max = 100;
        }
        if (changes.step && typeof changes.step.currentValue !== 'number') {
            this.step = 5;
        }
    };
    Object.defineProperty(SliderComponent.prototype, "value", {
        get: function () {
            return this.rangeValue;
        },
        set: function (val) {
            this.rangeValue = val;
            this.valueChange.emit(this.rangeValue);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SliderComponent.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SliderComponent.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SliderComponent.prototype, "min", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SliderComponent.prototype, "max", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SliderComponent.prototype, "step", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SliderComponent.prototype, "help", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SliderComponent.prototype, "isDisabled", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SliderComponent.prototype, "valueChange", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Object])
    ], SliderComponent.prototype, "value", null);
    SliderComponent = __decorate([
        Component({
            selector: 'pa-slider',
            template: "<div class=\"pa-field pa-field-slider\">\n    <input class=\"pa-field-control pa-field-control-range\" type=\"range\"\n           [id]=\"id\" [name]=\"name\" [attr.aria-describedby]=\"helpId\" [(ngModel)]=\"value\"\n           [disabled]=\"isDisabled\" [min]=\"min\" [max]=\"max\" [step]=\"step\">\n    <label class=\"pa-field-label\" [for]=\"id\" translate>\n        <ng-content></ng-content>\n    </label>\n    <output class=\"pa-field-control-output\" [for]=\"id\" aria-hidden=\"true\">{{ value }}</output>\n    <small *ngIf=\"help\" class=\"pa-field-help\" [id]=\"helpId\" translate>{{ help }}</small>\n</div>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".pa-field .pa-field-control-range[type=range]{-webkit-appearance:none;margin:.375rem 0;-webkit-transition:175ms;transition:175ms;float:right;width:7.5rem;height:.375rem;padding:0;background-color:#2280a0;border-radius:12px}.pa-field-label-range{position:relative;font-weight:400;color:#3a3a3a;font-size:inherit;margin-bottom:0;padding:0;-webkit-transform:none!important;transform:none!important;font-size:inherit!important}.pa-field .pa-field-control-range[type=range]~.pa-field-help{margin:0}.pa-field-control.pa-field-control-range[type=range]{-webkit-appearance:none;margin:6px 0;-webkit-transition:175ms;transition:175ms;float:right;width:120px;height:6px}.pa-field-control-output{display:inline-block;float:right;margin-right:12px;color:#767676;font-weight:300}.pa-field input[type=range]:focus{outline:0;box-shadow:none}.pa-field input[type=range]:-moz-focusring,.pa-field input[type=range]::-moz-focus-inner,.pa-field input[type=range]::-moz-focus-outer{outline:0;border:0;box-shadow:none}.pa-field input[type=range]::-webkit-slider-runnable-track{width:100%;height:6px;cursor:pointer;animate:.2s;background:#2280a0;border-radius:12px;box-shadow:0;border:0;-webkit-appearance:none;-webkit-transition:175ms;transition:175ms}.pa-field input[type=range]::-moz-range-track,.pa-field input[type=range]:active::-moz-range-track{width:100%;height:6px;cursor:pointer;animate:.2s;background:#2280a0;border-radius:6px;box-shadow:0;border:0;-webkit-appearance:none;-webkit-transition:175ms;-moz-transition:175ms;transition:175ms}.pa-field input[type=range]:focus::-webkit-slider-runnable-track{background:#4da4c8}.pa-field input[type=range]:focus::-moz-range-track{background:#4da4c8}.pa-field input[type=range]::-webkit-slider-thumb{box-shadow:0;border:1px solid #4da4c8;height:18px;width:18px;border-radius:50%;background:#fff;cursor:pointer;-webkit-appearance:none;margin-top:-6px;-webkit-transition:175ms;transition:175ms;box-shadow:inset 0 0 0 4.5px #fff,inset 0 0 0 10px #2280a0;animate:175ms}.pa-field input[type=range]::-moz-range-thumb{box-shadow:0;border:1px solid #2280a0;height:16px;width:16px;border-radius:50%;background:#fff;cursor:pointer;-webkit-appearance:none;margin-top:-6px;-webkit-transition:175ms;-moz-transition:175ms;transition:175ms;box-shadow:inset 0 0 0 4.5px #fff,inset 0 0 0 10px #2280a0;animate:175ms}.pa-field input[type=range]:hover::-webkit-slider-thumb{-webkit-transform:scale(1.1,1.1);transform:scale(1.1,1.1);-webkit-transition:175ms;transition:175ms}.pa-field input[type=range]:hover::-moz-range-thumb{transform:scale(1.1,1.1);-webkit-transition:175ms;-moz-transition:175ms;transition:175ms}.pa-field input[type=range]:active::-webkit-slider-thumb,.pa-field input[type=range]:focus::-webkit-slider-thumb{border:1px solid #4da4c8;box-shadow:0 0 0 1px #4da4c8,inset 0 0 0 4.5px #f7f6f5,inset 0 0 0 10px #2280a0;-webkit-transition:175ms;transition:175ms}.pa-field input[type=range]:active::-moz-range-thumb,.pa-field input[type=range]:focus::-moz-range-thumb{border:1px solid #4da4c8;box-shadow:0 0 0 1px #4da4c8,inset 0 0 0 4.5px #f7f6f5,inset 0 0 0 10px #2280a0;-webkit-transition:175ms;-moz-transition:175ms;transition:175ms}"]
        })
    ], SliderComponent);
    return SliderComponent;
}());
export { SliderComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BndWlsbG90aW5hd2ViL3Bhc3RhbmFnYS1hbmd1bGFyLyIsInNvdXJjZXMiOlsibGliL2NvbnRyb2xzL3NsaWRlci9zbGlkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQVUsWUFBWSxFQUE0Qix1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVoSSxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFRZjtJQUFBO1FBR2EsUUFBRyxHQUFHLENBQUMsQ0FBQztRQUNSLFFBQUcsR0FBRyxHQUFHLENBQUM7UUFDVixTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBRVQsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNsQixnQkFBVyxHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pFLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixlQUFVLEdBQUcsQ0FBQyxDQUFDO0lBK0JuQixDQUFDO0lBN0JHLGtDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsaUJBQWUsTUFBTSxFQUFJLENBQUMsQ0FBQyxDQUFJLElBQUksQ0FBQyxFQUFFLGlCQUFjLENBQUM7UUFDMUUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLE1BQU0sR0FBTSxJQUFJLENBQUMsRUFBRSxVQUFPLENBQUM7SUFDcEMsQ0FBQztJQUVELHFDQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUM5QixJQUFJLE9BQU8sQ0FBQyxHQUFHLElBQUksT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksS0FBSyxRQUFRLEVBQUU7WUFDN0QsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7U0FDaEI7UUFFRCxJQUFJLE9BQU8sQ0FBQyxHQUFHLElBQUksT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksS0FBSyxRQUFRLEVBQUU7WUFDN0QsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7U0FDbEI7UUFFRCxJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksS0FBSyxRQUFRLEVBQUU7WUFDL0QsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7U0FDakI7SUFDTCxDQUFDO0lBR0Qsc0JBQUksa0NBQUs7YUFBVDtZQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMzQixDQUFDO2FBRUQsVUFBVSxHQUFHO1lBQ1QsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7WUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNDLENBQUM7OztPQUxBO0lBbENRO1FBQVIsS0FBSyxFQUFFOzsrQ0FBYTtJQUNaO1FBQVIsS0FBSyxFQUFFOztpREFBZTtJQUNkO1FBQVIsS0FBSyxFQUFFOztnREFBUztJQUNSO1FBQVIsS0FBSyxFQUFFOztnREFBVztJQUNWO1FBQVIsS0FBSyxFQUFFOztpREFBVTtJQUNUO1FBQVIsS0FBSyxFQUFFOztpREFBZTtJQUNkO1FBQVIsS0FBSyxFQUFFOzt1REFBb0I7SUFDbEI7UUFBVCxNQUFNLEVBQUU7a0NBQWMsWUFBWTt3REFBOEI7SUF5QmpFO1FBREMsS0FBSyxFQUFFOzs7Z0RBR1A7SUFuQ1EsZUFBZTtRQU4zQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsV0FBVztZQUNyQixtbkJBQXNDO1lBRXRDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztTQUNsRCxDQUFDO09BQ1csZUFBZSxDQXlDM0I7SUFBRCxzQkFBQztDQUFBLEFBekNELElBeUNDO1NBekNZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgT25Jbml0LCBFdmVudEVtaXR0ZXIsIFNpbXBsZUNoYW5nZXMsIE9uQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5sZXQgbmV4dElkID0gMDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwYS1zbGlkZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9zbGlkZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3NsaWRlci5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBTbGlkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gICAgQElucHV0KCkgaWQ/OiBzdHJpbmc7XG4gICAgQElucHV0KCkgbmFtZT86IHN0cmluZztcbiAgICBASW5wdXQoKSBtaW4gPSAwO1xuICAgIEBJbnB1dCgpIG1heCA9IDEwMDtcbiAgICBASW5wdXQoKSBzdGVwID0gMTtcbiAgICBASW5wdXQoKSBoZWxwPzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGlzRGlzYWJsZWQgPSBmYWxzZTtcbiAgICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIGhlbHBJZCA9ICcnO1xuICAgIHJhbmdlVmFsdWUgPSAwO1xuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaWQgPSAhdGhpcy5pZCA/IGBmaWVsZC1yYW5nZS0ke25leHRJZCsrfWAgOiBgJHt0aGlzLmlkfS1maWVsZC1yYW5nZWA7XG4gICAgICAgIHRoaXMubmFtZSA9IHRoaXMubmFtZSB8fCB0aGlzLmlkO1xuICAgICAgICB0aGlzLmhlbHBJZCA9IGAke3RoaXMuaWR9LWhlbHBgO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKGNoYW5nZXMubWluICYmIHR5cGVvZiBjaGFuZ2VzLm1pbi5jdXJyZW50VmFsdWUgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLm1pbiA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hhbmdlcy5tYXggJiYgdHlwZW9mIGNoYW5nZXMubWF4LmN1cnJlbnRWYWx1ZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMubWF4ID0gMTAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoYW5nZXMuc3RlcCAmJiB0eXBlb2YgY2hhbmdlcy5zdGVwLmN1cnJlbnRWYWx1ZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMuc3RlcCA9IDU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCB2YWx1ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5yYW5nZVZhbHVlO1xuICAgIH1cblxuICAgIHNldCB2YWx1ZSh2YWwpIHtcbiAgICAgICAgdGhpcy5yYW5nZVZhbHVlID0gdmFsO1xuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy5yYW5nZVZhbHVlKTtcbiAgICB9XG59XG4iXX0=