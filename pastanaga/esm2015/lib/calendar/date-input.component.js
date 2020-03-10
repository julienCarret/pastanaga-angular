import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { markForCheck } from '../common/utils';
import { TextfieldCommon } from '../textfield/textfield.common';
import { format, isValid, isToday, isYesterday, getMonth, startOfYesterday } from 'date-fns';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
let DateInputComponent = class DateInputComponent extends TextfieldCommon {
    constructor(cdr) {
        super();
        this.cdr = cdr;
        this.datePlaceholder = 'mm/dd/yyyy';
        this.errorMessage = 'Invalid date (mm/dd/yyyy)';
        this.id = '';
        this._noFuture = false;
        this._accent = false;
        this._isLessen = false;
        this.select = new EventEmitter();
        this.dateInput = '';
        this.isValidDate = true;
        this.currentDate = new Date();
        this.datePickerPosition = { position: 'absolute', left: '0', top: '0' };
    }
    set noFuture(value) { this._noFuture = coerceBooleanProperty(value); }
    set accent(value) { this._accent = coerceBooleanProperty(value); }
    set isLessen(value) { this._isLessen = coerceBooleanProperty(value); }
    ngOnInit() {
        super.ngOnInit();
        if (!!this.selection) {
            this.selectDate(this.selection);
        }
    }
    ngOnChanges(changes) {
        if (changes.help) {
            const top = !!changes.help.currentValue ? '-33px' : '0';
            this.datePickerPosition = Object.assign(Object.assign({}, this.datePickerPosition), { top });
        }
    }
    selectDate(date) {
        this.currentDate = date;
        this.isValidDate = true;
        this.dateInput = isToday(date) ? 'Today' : isYesterday(date) ? 'Yesterday' : format(date, 'MM/dd/yyyy');
        markForCheck(this.cdr);
        this.select.emit(this.currentDate);
    }
    checkTypedDate(date) {
        this.isValidDate = true;
        if (date !== '') {
            const typedDate = new Date(date);
            if (date.toLowerCase() === 'today') {
                this.currentDate = new Date();
            }
            else if (date.toLowerCase() === 'yesterday') {
                this.currentDate = startOfYesterday();
            }
            else {
                this.isValidDate = date.length >= 8 && isValid(typedDate);
                if (this.isValidDate) {
                    const brokenDate = date.split('/');
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
    }
    iconClick($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.datePicker.remoteClick({ ignoreRemote: true });
    }
};
DateInputComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
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
export { DateInputComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ3VpbGxvdGluYXdlYi9wYXN0YW5hZ2EtYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi9jYWxlbmRhci9kYXRlLWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsU0FBUyxFQUNULE1BQU0sRUFDTixNQUFNLEVBQUUsYUFBYSxFQUNyQixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBaUIsTUFBTSxpQkFBaUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDaEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDN0YsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFROUQsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBbUIsU0FBUSxlQUFlO0lBdUJuRCxZQUNXLEdBQXNCO1FBRTdCLEtBQUssRUFBRSxDQUFDO1FBRkQsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUF2QnhCLG9CQUFlLEdBQUcsWUFBWSxDQUFDO1FBQy9CLGlCQUFZLEdBQUcsMkJBQTJCLENBQUM7UUFDM0MsT0FBRSxHQUFHLEVBQUUsQ0FBQztRQUtqQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWxCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFFaEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVSLFdBQU0sR0FBOEIsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUl2RSxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2YsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFD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Q0FBQyxNQUFNOztLQUNsRCxDQUFDO3FDQXlCa0IsaUJBQWlCO0dBeEJ4QixrQkFBa0IsQ0FxRjlCO1NBckZZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyxcbiAgICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtYXJrRm9yQ2hlY2ssIFBvc2l0aW9uU3R5bGUgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xuaW1wb3J0IHsgVGV4dGZpZWxkQ29tbW9uIH0gZnJvbSAnLi4vdGV4dGZpZWxkL3RleHRmaWVsZC5jb21tb24nO1xuaW1wb3J0IHsgZm9ybWF0LCBpc1ZhbGlkLCBpc1RvZGF5LCBpc1llc3RlcmRheSwgZ2V0TW9udGgsIHN0YXJ0T2ZZZXN0ZXJkYXkgfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3BhLWRhdGUtaW5wdXQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9kYXRlLWlucHV0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi4vcG9wdXAvX3BvcHVwLnNjc3MnLCAnLi9kYXRlLWlucHV0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIERhdGVJbnB1dENvbXBvbmVudCBleHRlbmRzIFRleHRmaWVsZENvbW1vbiBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoKSBkYXRlUGxhY2Vob2xkZXIgPSAnbW0vZGQveXl5eSc7XG4gICAgQElucHV0KCkgZXJyb3JNZXNzYWdlID0gJ0ludmFsaWQgZGF0ZSAobW0vZGQveXl5eSknO1xuICAgIEBJbnB1dCgpIGlkID0gJyc7XG4gICAgQElucHV0KCkgbWluRGF0ZT86IERhdGU7XG4gICAgQElucHV0KCkgc2VsZWN0aW9uPzogRGF0ZTtcblxuICAgIEBJbnB1dCgpIHNldCBub0Z1dHVyZSh2YWx1ZSkgeyB0aGlzLl9ub0Z1dHVyZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgICBfbm9GdXR1cmUgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBzZXQgYWNjZW50KHZhbHVlKSB7IHRoaXMuX2FjY2VudCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgICBfYWNjZW50ID0gZmFsc2U7XG4gICAgQElucHV0KCkgc2V0IGlzTGVzc2VuKHZhbHVlKSB7IHRoaXMuX2lzTGVzc2VuID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICAgIF9pc0xlc3NlbiA9IGZhbHNlO1xuXG4gICAgQE91dHB1dCgpIHNlbGVjdDogRXZlbnRFbWl0dGVyPERhdGUgfCBudWxsPiA9IG5ldyBFdmVudEVtaXR0ZXI8RGF0ZT4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2RhdGVQaWNrZXJQb3B1cCcpIGRhdGVQaWNrZXI7XG5cbiAgICBkYXRlSW5wdXQgPSAnJztcbiAgICBpc1ZhbGlkRGF0ZSA9IHRydWU7XG4gICAgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGRhdGVQaWNrZXJQb3NpdGlvbjogUG9zaXRpb25TdHlsZSA9IHtwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogJzAnLCB0b3A6ICcwJ307XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgICAgIGlmICghIXRoaXMuc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdERhdGUodGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgICAgICBpZiAoY2hhbmdlcy5oZWxwKSB7XG4gICAgICAgICAgICBjb25zdCB0b3AgPSAhIWNoYW5nZXMuaGVscC5jdXJyZW50VmFsdWUgPyAnLTMzcHgnIDogJzAnO1xuICAgICAgICAgICAgdGhpcy5kYXRlUGlja2VyUG9zaXRpb24gPSB7Li4udGhpcy5kYXRlUGlja2VyUG9zaXRpb24sIHRvcH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3REYXRlKGRhdGU6IERhdGUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50RGF0ZSA9IGRhdGU7XG4gICAgICAgIHRoaXMuaXNWYWxpZERhdGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmRhdGVJbnB1dCA9IGlzVG9kYXkoZGF0ZSkgPyAnVG9kYXknIDogaXNZZXN0ZXJkYXkoZGF0ZSkgPyAnWWVzdGVyZGF5JyA6IGZvcm1hdChkYXRlLCAnTU0vZGQveXl5eScpO1xuICAgICAgICBtYXJrRm9yQ2hlY2sodGhpcy5jZHIpO1xuICAgICAgICB0aGlzLnNlbGVjdC5lbWl0KHRoaXMuY3VycmVudERhdGUpO1xuICAgIH1cblxuICAgIGNoZWNrVHlwZWREYXRlKGRhdGU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmlzVmFsaWREYXRlID0gdHJ1ZTtcbiAgICAgICAgaWYgKGRhdGUgIT09ICcnKSB7XG4gICAgICAgICAgICBjb25zdCB0eXBlZERhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgICAgIGlmIChkYXRlLnRvTG93ZXJDYXNlKCkgPT09ICd0b2RheScpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0ZS50b0xvd2VyQ2FzZSgpID09PSAneWVzdGVyZGF5Jykge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudERhdGUgPSBzdGFydE9mWWVzdGVyZGF5KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNWYWxpZERhdGUgPSBkYXRlLmxlbmd0aCA+PSA4ICYmIGlzVmFsaWQodHlwZWREYXRlKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkRGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBicm9rZW5EYXRlID0gZGF0ZS5zcGxpdCgnLycpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYnJva2VuRGF0ZVswXSA9PT0gJzInIHx8IGJyb2tlbkRhdGVbMF0gPT09ICcwMicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBkYXRlIGlzIDI5IG9mIGZlYnJ1YXJ5IG9mIG5vbiBsZWFwIHllYXIgb3IgMzAtMzEsIG1vbnRoIHdpbGwgYmUgMlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1ZhbGlkRGF0ZSA9IGdldE1vbnRoKHR5cGVkRGF0ZSkgPT09IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZERhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RGF0ZSA9IHR5cGVkRGF0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkRGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0LmVtaXQodGhpcy5jdXJyZW50RGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdC5lbWl0KHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpY29uQ2xpY2soJGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMuZGF0ZVBpY2tlci5yZW1vdGVDbGljayh7aWdub3JlUmVtb3RlOiB0cnVlfSk7XG4gICAgfVxufVxuIl19