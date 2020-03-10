import { __decorate, __extends, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { PopupService } from '../popup/popup.service';
var DatePickerComponent = /** @class */ (function (_super) {
    __extends(DatePickerComponent, _super);
    function DatePickerComponent(popupService, renderer, element, cdr) {
        var _this = _super.call(this, popupService, renderer, element, cdr) || this;
        _this.popupService = popupService;
        _this.renderer = renderer;
        _this.element = element;
        _this.cdr = cdr;
        _this._rangeStart = false;
        _this._rangeEnd = false;
        _this._dontCloseOnSelection = false;
        _this._noFuture = false;
        _this.select = new EventEmitter();
        return _this;
    }
    Object.defineProperty(DatePickerComponent.prototype, "rangeStart", {
        set: function (value) {
            this._rangeStart = coerceBooleanProperty(value);
            this._dontCloseOnSelection = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "rangeEnd", {
        set: function (value) {
            this._rangeEnd = coerceBooleanProperty(value);
            this._dontCloseOnSelection = false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "dontCloseOnSelection", {
        set: function (value) { this._dontCloseOnSelection = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "noFuture", {
        set: function (value) { this._noFuture = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    DatePickerComponent.prototype.onSelection = function (date) {
        if (!this._dontCloseOnSelection) {
            this.close();
        }
        this.select.emit(date);
    };
    DatePickerComponent.prototype.onOutsideClick = function (event) {
        if (!this.isNodeFromCalendar(event.target)) {
            this.close();
        }
    };
    DatePickerComponent.prototype.isNodeFromCalendar = function (node) {
        if (typeof node.className === 'string' && node.className.includes('pa-calendar')) {
            return true;
        }
        else if (!!node.parentElement) {
            return this.isNodeFromCalendar(node.parentElement);
        }
        else {
            return false;
        }
    };
    DatePickerComponent.ctorParameters = function () { return [
        { type: PopupService },
        { type: Renderer2 },
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DatePickerComponent.prototype, "rangeStart", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DatePickerComponent.prototype, "rangeEnd", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DatePickerComponent.prototype, "dontCloseOnSelection", null);
    __decorate([
        Input(),
        __metadata("design:type", Date)
    ], DatePickerComponent.prototype, "min", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DatePickerComponent.prototype, "selection", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DatePickerComponent.prototype, "noFuture", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DatePickerComponent.prototype, "select", void 0);
    DatePickerComponent = __decorate([
        Component({
            selector: 'pa-date-picker',
            template: "<div class=\"pa-popup\" [hidden]=\"!isDisplayed\" [ngStyle]=\"style\">\n    <div class=\"pa-popup-wrapper\">\n        <pa-calendar [selection]=\"selection\"\n                     [noFuture]=\"_noFuture\"\n                     [rangeStart]=\"_rangeStart\"\n                     [rangeEnd]=\"_rangeEnd\"\n                     [min]=\"min\"\n                     (select)=\"onSelection($event)\"></pa-calendar>\n    </div>\n</div>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".pa-popup{z-index:10030;box-shadow:0 1px 2px 0 rgba(0,0,0,.15);border-radius:.1875rem;min-width:12.375rem;max-width:15rem;max-height:21.75rem;overflow-x:hidden;overflow-y:auto}.pa-popup-wrapper{padding:.375rem 0;background:rgba(255,255,255,.975)}@supports (-webkit-backdrop-filter:blur(9px)){.pa-popup-wrapper{background:rgba(255,255,255,.9);-webkit-backdrop-filter:blur(9px)}}", ":host .pa-popup{min-width:18.75rem;max-width:none;max-height:none}"]
        }),
        __metadata("design:paramtypes", [PopupService,
            Renderer2,
            ElementRef,
            ChangeDetectorRef])
    ], DatePickerComponent);
    return DatePickerComponent;
}(PopupComponent));
export { DatePickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGd1aWxsb3RpbmF3ZWIvcGFzdGFuYWdhLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvY2FsZW5kYXIvZGF0ZS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUksT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQVF0RDtJQUF5Qyx1Q0FBYztJQXlCbkQsNkJBQ1csWUFBMEIsRUFDMUIsUUFBbUIsRUFDbkIsT0FBbUIsRUFDbkIsR0FBc0I7UUFKakMsWUFNSSxrQkFBTSxZQUFZLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsU0FDOUM7UUFOVSxrQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixjQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLGFBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIsU0FBRyxHQUFILEdBQUcsQ0FBbUI7UUF2QmpDLGlCQUFXLEdBQUcsS0FBSyxDQUFDO1FBTXBCLGVBQVMsR0FBRyxLQUFLLENBQUM7UUFHbEIsMkJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBTTlCLGVBQVMsR0FBRyxLQUFLLENBQUM7UUFFUixZQUFNLEdBQThCLElBQUksWUFBWSxFQUFRLENBQUM7O0lBU3ZFLENBQUM7SUE5QlEsc0JBQUksMkNBQVU7YUFBZCxVQUFlLEtBQUs7WUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO1FBQ3RDLENBQUM7OztPQUFBO0lBR1Esc0JBQUkseUNBQVE7YUFBWixVQUFhLEtBQUs7WUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBQ3ZDLENBQUM7OztPQUFBO0lBR1Esc0JBQUkscURBQW9CO2FBQXhCLFVBQXlCLEtBQUssSUFBSSxJQUFJLENBQUMscUJBQXFCLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQU05RixzQkFBSSx5Q0FBUTthQUFaLFVBQWEsS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQWMvRSx5Q0FBVyxHQUFYLFVBQVksSUFBaUI7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUM3QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDaEI7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsNENBQWMsR0FBZCxVQUFlLEtBQUs7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDeEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2hCO0lBQ0wsQ0FBQztJQUVPLGdEQUFrQixHQUExQixVQUEyQixJQUFpQjtRQUN4QyxJQUFJLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDOUUsT0FBTyxJQUFJLENBQUM7U0FDZjthQUFNLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDN0IsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3REO2FBQU07WUFDSCxPQUFPLEtBQUssQ0FBQztTQUNoQjtJQUNMLENBQUM7O2dCQTdCd0IsWUFBWTtnQkFDaEIsU0FBUztnQkFDVixVQUFVO2dCQUNkLGlCQUFpQjs7SUEzQnhCO1FBQVIsS0FBSyxFQUFFOzs7eURBR1A7SUFHUTtRQUFSLEtBQUssRUFBRTs7O3VEQUdQO0lBR1E7UUFBUixLQUFLLEVBQUU7OzttRUFBK0Y7SUFHOUY7UUFBUixLQUFLLEVBQUU7a0NBQU8sSUFBSTtvREFBQztJQUNYO1FBQVIsS0FBSyxFQUFFOzswREFBK0M7SUFFOUM7UUFBUixLQUFLLEVBQUU7Ozt1REFBdUU7SUFHckU7UUFBVCxNQUFNLEVBQUU7a0NBQVMsWUFBWTt1REFBeUM7SUF2QjlELG1CQUFtQjtRQU4vQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLHliQUEyQztZQUUzQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7U0FDbEQsQ0FBQzt5Q0EyQjJCLFlBQVk7WUFDaEIsU0FBUztZQUNWLFVBQVU7WUFDZCxpQkFBaUI7T0E3QnhCLG1CQUFtQixDQXdEL0I7SUFBRCwwQkFBQztDQUFBLEFBeERELENBQXlDLGNBQWMsR0F3RHREO1NBeERZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUG9wdXBDb21wb25lbnQgfSBmcm9tICcuLi9wb3B1cC9wb3B1cC5jb21wb25lbnQnO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IFBvcHVwU2VydmljZSB9IGZyb20gJy4uL3BvcHVwL3BvcHVwLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3BhLWRhdGUtcGlja2VyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZGF0ZS1waWNrZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuLi9wb3B1cC9fcG9wdXAuc2NzcycsICcuL2RhdGUtcGlja2VyLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIERhdGVQaWNrZXJDb21wb25lbnQgZXh0ZW5kcyBQb3B1cENvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSBzZXQgcmFuZ2VTdGFydCh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9yYW5nZVN0YXJ0ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICAgICAgdGhpcy5fZG9udENsb3NlT25TZWxlY3Rpb24gPSB0cnVlO1xuICAgIH1cbiAgICBfcmFuZ2VTdGFydCA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgc2V0IHJhbmdlRW5kKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3JhbmdlRW5kID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICAgICAgdGhpcy5fZG9udENsb3NlT25TZWxlY3Rpb24gPSBmYWxzZTtcbiAgICB9XG4gICAgX3JhbmdlRW5kID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBzZXQgZG9udENsb3NlT25TZWxlY3Rpb24odmFsdWUpIHsgdGhpcy5fZG9udENsb3NlT25TZWxlY3Rpb24gPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gICAgX2RvbnRDbG9zZU9uU2VsZWN0aW9uID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBtaW4/OiBEYXRlO1xuICAgIEBJbnB1dCgpIHNlbGVjdGlvbj86IHtzdGFydD86IERhdGUsIGVuZD86IERhdGV9IHwgRGF0ZTtcblxuICAgIEBJbnB1dCgpIHNldCBub0Z1dHVyZSh2YWx1ZSkgeyB0aGlzLl9ub0Z1dHVyZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgICBfbm9GdXR1cmUgPSBmYWxzZTtcblxuICAgIEBPdXRwdXQoKSBzZWxlY3Q6IEV2ZW50RW1pdHRlcjxEYXRlIHwgbnVsbD4gPSBuZXcgRXZlbnRFbWl0dGVyPERhdGU+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHBvcHVwU2VydmljZTogUG9wdXBTZXJ2aWNlLFxuICAgICAgICBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgICAgIHB1YmxpYyBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICkge1xuICAgICAgICBzdXBlcihwb3B1cFNlcnZpY2UsIHJlbmRlcmVyLCBlbGVtZW50LCBjZHIpO1xuICAgIH1cblxuICAgIG9uU2VsZWN0aW9uKGRhdGU6IERhdGUgfCBudWxsKSB7XG4gICAgICAgIGlmICghdGhpcy5fZG9udENsb3NlT25TZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlbGVjdC5lbWl0KGRhdGUpO1xuICAgIH1cblxuICAgIG9uT3V0c2lkZUNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5pc05vZGVGcm9tQ2FsZW5kYXIoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc05vZGVGcm9tQ2FsZW5kYXIobm9kZTogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHR5cGVvZiBub2RlLmNsYXNzTmFtZSA9PT0gJ3N0cmluZycgJiYgbm9kZS5jbGFzc05hbWUuaW5jbHVkZXMoJ3BhLWNhbGVuZGFyJykpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKCEhbm9kZS5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc05vZGVGcm9tQ2FsZW5kYXIobm9kZS5wYXJlbnRFbGVtZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==