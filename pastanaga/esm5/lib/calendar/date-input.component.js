import { __assign, __decorate, __extends, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { markForCheck } from '../common/utils';
import { TextfieldCommon } from '../textfield/textfield.common';
import { format, isValid, isToday, isYesterday, getMonth, startOfYesterday } from 'date-fns';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
var DateInputComponent = /** @class */ (function (_super) {
    __extends(DateInputComponent, _super);
    function DateInputComponent(cdr) {
        var _this = _super.call(this) || this;
        _this.cdr = cdr;
        _this.datePlaceholder = 'mm/dd/yyyy';
        _this.errorMessage = 'Invalid date (mm/dd/yyyy)';
        _this.id = '';
        _this._noFuture = false;
        _this._accent = false;
        _this._isLessen = false;
        _this.select = new EventEmitter();
        _this.dateInput = '';
        _this.isValidDate = true;
        _this.currentDate = new Date();
        _this.datePickerPosition = { position: 'absolute', left: '0', top: '0' };
        return _this;
    }
    Object.defineProperty(DateInputComponent.prototype, "noFuture", {
        set: function (value) { this._noFuture = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateInputComponent.prototype, "accent", {
        set: function (value) { this._accent = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateInputComponent.prototype, "isLessen", {
        set: function (value) { this._isLessen = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    DateInputComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        if (!!this.selection) {
            this.selectDate(this.selection);
        }
    };
    DateInputComponent.prototype.ngOnChanges = function (changes) {
        if (changes.help) {
            var top_1 = !!changes.help.currentValue ? '-33px' : '0';
            this.datePickerPosition = __assign(__assign({}, this.datePickerPosition), { top: top_1 });
        }
    };
    DateInputComponent.prototype.selectDate = function (date) {
        this.currentDate = date;
        this.isValidDate = true;
        this.dateInput = isToday(date) ? 'Today' : isYesterday(date) ? 'Yesterday' : format(date, 'MM/dd/yyyy');
        markForCheck(this.cdr);
        this.select.emit(this.currentDate);
    };
    DateInputComponent.prototype.checkTypedDate = function (date) {
        this.isValidDate = true;
        if (date !== '') {
            var typedDate = new Date(date);
            if (date.toLowerCase() === 'today') {
                this.currentDate = new Date();
            }
            else if (date.toLowerCase() === 'yesterday') {
                this.currentDate = startOfYesterday();
            }
            else {
                this.isValidDate = date.length >= 8 && isValid(typedDate);
                if (this.isValidDate) {
                    var brokenDate = date.split('/');
                    if (brokenDate[0] === '2' || brokenDate[0] === '02') {
                        // If the date is 29 of february of non leap year or 30-31, month will be 2
                        this.isValidDate = getMonth(typedDate) === 1;
                    }
                }
                if (this.isValidDate) {
                    this.currentDate = typedDate;
                }
            }
            if (this.isValidDate) {
                this.select.emit(this.currentDate);
            }
        }
        else {
            this.select.emit(undefined);
        }
    };
    DateInputComponent.prototype.iconClick = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.datePicker.remoteClick({ ignoreRemote: true });
    };
    DateInputComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DateInputComponent.prototype, "datePlaceholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DateInputComponent.prototype, "errorMessage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DateInputComponent.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Date)
    ], DateInputComponent.prototype, "minDate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Date)
    ], DateInputComponent.prototype, "selection", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DateInputComponent.prototype, "noFuture", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DateInputComponent.prototype, "accent", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DateInputComponent.prototype, "isLessen", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DateInputComponent.prototype, "select", void 0);
    __decorate([
        ViewChild('datePickerPopup'),
        __metadata("design:type", Object)
    ], DateInputComponent.prototype, "datePicker", void 0);
    DateInputComponent = __decorate([
        Component({
            selector: 'pa-date-input',
            template: "<pa-input-icon iconName=\"event\"\n               [class.pa-date-error]=\"!isValidDate && dateInput !== ''\"\n               (iconClick)=\"iconClick($event)\">\n               <pa-input [(ngModel)]=\"dateInput\"\n                         [placeholder]=\"datePlaceholder\"\n                         [debounceDuration]=\"1000\"\n                         (valueChange)=\"checkTypedDate($event)\"\n                         [class.pa-field-label-error]=\"!isValidDate && dateInput !== ''\"\n                         [maxCharacters]=\"10\"\n                         [id]=\"id\"\n                         [errorMessage]=\"!isValidDate && dateInput !== '' ? errorMessage : ''\"\n                         [help]=\"help\"\n                         [accent]=\"_accent\"\n                         [isLessen]=\"_isLessen\">\n                         <ng-content></ng-content>\n               </pa-input>\n</pa-input-icon>\n<span [hidden]=\"true\"\n      #datePickerPopup=\"paPopupRef\"\n      [paPopup]=\"datePicker\"\n      [popupPosition]=\"datePickerPosition\"></span>\n<pa-date-picker #datePicker \n                [selection]=\"currentDate\"\n                (select)=\"selectDate($event)\"\n                [noFuture]=\"_noFuture\"\n                [min]=\"minDate\"></pa-date-picker>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".pa-popup{z-index:10030;box-shadow:0 1px 2px 0 rgba(0,0,0,.15);border-radius:.1875rem;min-width:12.375rem;max-width:15rem;max-height:21.75rem;overflow-x:hidden;overflow-y:auto}.pa-popup-wrapper{padding:.375rem 0;background:rgba(255,255,255,.975)}@supports (-webkit-backdrop-filter:blur(9px)){.pa-popup-wrapper{background:rgba(255,255,255,.9);-webkit-backdrop-filter:blur(9px)}}", ":host .pa-popup{min-width:18.75rem;max-width:none;max-height:none}:host pa-input-icon{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;border-radius:.1875rem}:host pa-input-icon.pa-date-error ::ng-deep pa-button ::ng-deep svg{fill:#cc005b!important}:host pa-input-icon ::ng-deep .pa-field-button-group{width:100%}:host pa-input-icon ::ng-deep .pa-field-button-group>.pa-field{top:.1875rem}:host pa-date-picker{position:relative}"]
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], DateInputComponent);
    return DateInputComponent;
}(TextfieldCommon));
export { DateInputComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ3VpbGxvdGluYXdlYi9wYXN0YW5hZ2EtYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi9jYWxlbmRhci9kYXRlLWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsU0FBUyxFQUNULE1BQU0sRUFDTixNQUFNLEVBQUUsYUFBYSxFQUNyQixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBaUIsTUFBTSxpQkFBaUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDaEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDN0YsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFROUQ7SUFBd0Msc0NBQWU7SUF1Qm5ELDRCQUNXLEdBQXNCO1FBRGpDLFlBR0ksaUJBQU8sU0FDVjtRQUhVLFNBQUcsR0FBSCxHQUFHLENBQW1CO1FBdkJ4QixxQkFBZSxHQUFHLFlBQVksQ0FBQztRQUMvQixrQkFBWSxHQUFHLDJCQUEyQixDQUFDO1FBQzNDLFFBQUUsR0FBRyxFQUFFLENBQUM7UUFLakIsZUFBUyxHQUFHLEtBQUssQ0FBQztRQUVsQixhQUFPLEdBQUcsS0FBSyxDQUFDO1FBRWhCLGVBQVMsR0FBRyxLQUFLLENBQUM7UUFFUixZQUFNLEdBQThCLElBQUksWUFBWSxFQUFRLENBQUM7UUFJdkUsZUFBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLGlCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLGlCQUFXLEdBQUcsSUFBSSxJQUFJLEVB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O1lBQ3pCLDJ3Q0FBMEM7WUFFMUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O1NBQ2xELENBQUM7eUNBeUJrQixpQkFBaUI7T0F4QnhCLGtCQUFrQixDQXFGOUI7SUFBRCx5QkFBQztDQUFBLEFBckZELENBQXdDLGVBQWUsR0FxRnREO1NBckZZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyxcbiAgICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtYXJrRm9yQ2hlY2ssIFBvc2l0aW9uU3R5bGUgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xuaW1wb3J0IHsgVGV4dGZpZWxkQ29tbW9uIH0gZnJvbSAnLi4vdGV4dGZpZWxkL3RleHRmaWVsZC5jb21tb24nO1xuaW1wb3J0IHsgZm9ybWF0LCBpc1ZhbGlkLCBpc1RvZGF5LCBpc1llc3RlcmRheSwgZ2V0TW9udGgsIHN0YXJ0T2ZZZXN0ZXJkYXkgfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3BhLWRhdGUtaW5wdXQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9kYXRlLWlucHV0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi4vcG9wdXAvX3BvcHVwLnNjc3MnLCAnLi9kYXRlLWlucHV0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIERhdGVJbnB1dENvbXBvbmVudCBleHRlbmRzIFRleHRmaWVsZENvbW1vbiBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoKSBkYXRlUGxhY2Vob2xkZXIgPSAnbW0vZGQveXl5eSc7XG4gICAgQElucHV0KCkgZXJyb3JNZXNzYWdlID0gJ0ludmFsaWQgZGF0ZSAobW0vZGQveXl5eSknO1xuICAgIEBJbnB1dCgpIGlkID0gJyc7XG4gICAgQElucHV0KCkgbWluRGF0ZT86IERhdGU7XG4gICAgQElucHV0KCkgc2VsZWN0aW9uPzogRGF0ZTtcblxuICAgIEBJbnB1dCgpIHNldCBub0Z1dHVyZSh2YWx1ZSkgeyB0aGlzLl9ub0Z1dHVyZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgICBfbm9GdXR1cmUgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBzZXQgYWNjZW50KHZhbHVlKSB7IHRoaXMuX2FjY2VudCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgICBfYWNjZW50ID0gZmFsc2U7XG4gICAgQElucHV0KCkgc2V0IGlzTGVzc2VuKHZhbHVlKSB7IHRoaXMuX2lzTGVzc2VuID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICAgIF9pc0xlc3NlbiA9IGZhbHNlO1xuXG4gICAgQE91dHB1dCgpIHNlbGVjdDogRXZlbnRFbWl0dGVyPERhdGUgfCBudWxsPiA9IG5ldyBFdmVudEVtaXR0ZXI8RGF0ZT4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2RhdGVQaWNrZXJQb3B1cCcpIGRhdGVQaWNrZXI7XG5cbiAgICBkYXRlSW5wdXQgPSAnJztcbiAgICBpc1ZhbGlkRGF0ZSA9IHRydWU7XG4gICAgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGRhdGVQaWNrZXJQb3NpdGlvbjogUG9zaXRpb25TdHlsZSA9IHtwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogJzAnLCB0b3A6ICcwJ307XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgICAgIGlmICghIXRoaXMuc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdERhdGUodGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgICAgICBpZiAoY2hhbmdlcy5oZWxwKSB7XG4gICAgICAgICAgICBjb25zdCB0b3AgPSAhIWNoYW5nZXMuaGVscC5jdXJyZW50VmFsdWUgPyAnLTMzcHgnIDogJzAnO1xuICAgICAgICAgICAgdGhpcy5kYXRlUGlja2VyUG9zaXRpb24gPSB7Li4udGhpcy5kYXRlUGlja2VyUG9zaXRpb24sIHRvcH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3REYXRlKGRhdGU6IERhdGUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50RGF0ZSA9IGRhdGU7XG4gICAgICAgIHRoaXMuaXNWYWxpZERhdGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmRhdGVJbnB1dCA9IGlzVG9kYXkoZGF0ZSkgPyAnVG9kYXknIDogaXNZZXN0ZXJkYXkoZGF0ZSkgPyAnWWVzdGVyZGF5JyA6IGZvcm1hdChkYXRlLCAnTU0vZGQveXl5eScpO1xuICAgICAgICBtYXJrRm9yQ2hlY2sodGhpcy5jZHIpO1xuICAgICAgICB0aGlzLnNlbGVjdC5lbWl0KHRoaXMuY3VycmVudERhdGUpO1xuICAgIH1cblxuICAgIGNoZWNrVHlwZWREYXRlKGRhdGU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmlzVmFsaWREYXRlID0gdHJ1ZTtcbiAgICAgICAgaWYgKGRhdGUgIT09ICcnKSB7XG4gICAgICAgICAgICBjb25zdCB0eXBlZERhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgICAgIGlmIChkYXRlLnRvTG93ZXJDYXNlKCkgPT09ICd0b2RheScpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0ZS50b0xvd2VyQ2FzZSgpID09PSAneWVzdGVyZGF5Jykge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudERhdGUgPSBzdGFydE9mWWVzdGVyZGF5KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNWYWxpZERhdGUgPSBkYXRlLmxlbmd0aCA+PSA4ICYmIGlzVmFsaWQodHlwZWREYXRlKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkRGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBicm9rZW5EYXRlID0gZGF0ZS5zcGxpdCgnLycpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYnJva2VuRGF0ZVswXSA9PT0gJzInIHx8IGJyb2tlbkRhdGVbMF0gPT09ICcwMicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBkYXRlIGlzIDI5IG9mIGZlYnJ1YXJ5IG9mIG5vbiBsZWFwIHllYXIgb3IgMzAtMzEsIG1vbnRoIHdpbGwgYmUgMlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1ZhbGlkRGF0ZSA9IGdldE1vbnRoKHR5cGVkRGF0ZSkgPT09IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZERhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RGF0ZSA9IHR5cGVkRGF0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkRGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0LmVtaXQodGhpcy5jdXJyZW50RGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdC5lbWl0KHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpY29uQ2xpY2soJGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMuZGF0ZVBpY2tlci5yZW1vdGVDbGljayh7aWdub3JlUmVtb3RlOiB0cnVlfSk7XG4gICAgfVxufVxuIl19