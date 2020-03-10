import { __decorate, __metadata } from "tslib";
import { AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
var nextId = 0;
var SelectComponent = /** @class */ (function () {
    function SelectComponent(element) {
        this.element = element;
        this.disabled = false;
        this.required = false;
        this.isLabelHidden = false;
        this.isLessen = false;
        this.onSelection = new EventEmitter();
        this.valueChange = new EventEmitter();
        this.helpId = '';
        this.hasNoSelection = false;
        this.isPlaceHolderSelected = false;
        this.hasError = false;
    }
    SelectComponent_1 = SelectComponent;
    SelectComponent.prototype.ngOnInit = function () {
        this.id = !this.id ? "select-" + nextId++ : this.id + "-select";
        this.name = this.name || this.id;
        if (this.help) {
            this.helpId = this.id + "-help";
        }
    };
    SelectComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            if (!!_this.value) {
                _this.element.nativeElement.querySelector('select').value = _this.value;
                _this.isPlaceHolderSelected = _this.value === '__PLACEHOLDER__';
            }
            else if (!!_this.placeholder) {
                _this.element.nativeElement.querySelector('select').value = '__PLACEHOLDER__';
                _this.isPlaceHolderSelected = true;
            }
            else {
                var firstOption = _this.element.nativeElement.querySelector('option:first-child');
                var noOptionSelected = _this.element.nativeElement.querySelectorAll('option:checked').length === 0;
                _this.hasNoSelection = noOptionSelected && !!firstOption && !firstOption.innerText;
            }
        }, 0);
    };
    SelectComponent.prototype.writeValue = function (value) {
        this.value = value;
        if (this.element.nativeElement) {
            this.element.nativeElement.querySelector('select').value = this.value;
        }
        this.valueChange.emit(value);
    };
    SelectComponent.prototype.registerOnTouched = function (handler) {
        this.onTouched = handler;
    };
    SelectComponent.prototype.registerOnChange = function (handler) {
        this.onChange = handler;
    };
    SelectComponent.prototype.change = function (value) {
        this.value = value;
        this.isPlaceHolderSelected = value === '__PLACEHOLDER__';
        this.valueChange.emit(value);
        this.onSelection.emit(value);
        if (this.onChange) {
            this.onChange(value);
        }
        if (this.onTouched) {
            this.onTouched(value);
        }
    };
    SelectComponent.prototype.setDisabledState = function (disabled) {
        this.disabled = disabled;
    };
    SelectComponent.prototype.validate = function (control) {
        if (!this.required || this.value) {
            this.hasError = false;
            return null;
        }
        else {
            this.hasError = true;
            return { required: { valid: false } };
        }
    };
    var SelectComponent_1;
    SelectComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectComponent.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectComponent.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectComponent.prototype, "value", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectComponent.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectComponent.prototype, "help", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectComponent.prototype, "errorHelp", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectComponent.prototype, "errorMessage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectComponent.prototype, "disabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectComponent.prototype, "required", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectComponent.prototype, "isLabelHidden", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectComponent.prototype, "isLessen", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SelectComponent.prototype, "onSelection", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SelectComponent.prototype, "valueChange", void 0);
    SelectComponent = SelectComponent_1 = __decorate([
        Component({
            selector: 'pa-select',
            template: "<div class=\"pa-field pa-field-select\" [class.pa-field-error]=\"hasError || !!errorMessage\">\n    <select class=\"pa-field-control\" [id]=\"id\" [attr.disabled]=\"disabled ? true : null\"\n            [class.pa-field-control-lessen]=\"isLessen\"\n            [required]=\"required\"\n            [attr.aria-describedby]=\"helpId\" [attr.placeholder]=\"placeholder | translate\"\n            (change)=\"change($event.target.value)\">\n        <option *ngIf=\"placeholder\" class=\"pa-hide\" disabled [selected]=\"hasNoSelection\">{{ placeholder | translate }}</option>\n        <ng-content></ng-content>\n    </select>\n    <label class=\"pa-field-label\"\n           [for]=\"id\"><span translate\n                            [class.pa-sr]=\"isLabelHidden\">{{ label }}</span></label>\n    <small *ngIf=\"hasError && errorHelp\" class=\"pa-field-help pa-field-help-error\">{{ errorHelp | translate }}</small>\n    <small *ngIf=\"!!errorMessage\" class=\"pa-field-help pa-field-help-error\">{{ errorMessage | translate }}</small>\n    <small *ngIf=\"help\" class=\"pa-field-help\" [id]=\"helpId\">{{ help | translate }}</small>\n</div>\n",
            providers: [{
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return SelectComponent_1; }),
                    multi: true,
                }, {
                    provide: NG_VALIDATORS,
                    useExisting: forwardRef(function () { return SelectComponent_1; }),
                    multi: true,
                }],
            styles: [".pa-field-select .pa-field-control{background-image:url('data:image/svg+xml; utf8, <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"36\" height=\"36\" viewBox=\"0 0 36 36\"><polygon fill=\"%23949494\" fill-rule=\"evenodd\" points=\"9.293 14.707 10.707 13.293 18 20.586 25.293 13.293 26.707 14.707 18 23.414\"/></svg>');background-position:calc(100% - .375rem) center;background-repeat:no-repeat;background-size:1.5rem 1.5rem}.pa-field-select .pa-field-control.pa-field-control-accent{background-color:rgba(34,128,160,.06);box-shadow:0 200px 0 -200px #00719e;-webkit-transition:.5s;transition:.5s}.pa-field-select .pa-field-control:hover{cursor:pointer;box-shadow:0 2px 0 -1px #00719e}.pa-field-select .pa-field-control:active,.pa-field-select .pa-field-control:focus{box-shadow:0 2px 0 0 #4da4c8;background-color:rgba(34,128,160,.12)}.pa-field-select .pa-field-control.pa-field-control-lessen{padding-right:1.875rem!important}"]
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], SelectComponent);
    return SelectComponent;
}());
export { SelectComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BndWlsbG90aW5hd2ViL3Bhc3RhbmFnYS1hbmd1bGFyLyIsInNvdXJjZXMiOlsibGliL3RleHRmaWVsZC9zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0SCxPQUFPLEVBQXFDLGFBQWEsRUFBRSxpQkFBaUIsRUFBYSxNQUFNLGdCQUFnQixDQUFDO0FBRWhILElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQWdCZjtJQXNCSSx5QkFBb0IsT0FBbUI7UUFBbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQWI5QixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNoQixnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3BELGdCQUFXLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUQsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUdaLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLDBCQUFxQixHQUFHLEtBQUssQ0FBQztRQUM5QixhQUFRLEdBQUcsS0FBSyxDQUFDO0lBR2pCLENBQUM7d0JBdkJRLGVBQWU7SUF5QnhCLGtDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBVSxNQUFNLEVBQUksQ0FBQyxDQUFDLENBQUksSUFBSSxDQUFDLEVBQUUsWUFBUyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUks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LEVBQUUsSUFBSTtpQkFDZCxDQUFDOztTQUNMLENBQUM7eUNBdUIrQixVQUFVO09BdEI5QixlQUFlLENBMkYzQjtJQUFELHNCQUFDO0NBQUEsQUEzRkQsSUEyRkM7U0EzRlksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBGb3JtQ29udHJvbCwgTkdfVkFMSURBVE9SUywgTkdfVkFMVUVfQUNDRVNTT1IsIFZhbGlkYXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxubGV0IG5leHRJZCA9IDA7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncGEtc2VsZWN0JyxcbiAgICB0ZW1wbGF0ZVVybDogJ3NlbGVjdC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ3NlbGVjdC5jb21wb25lbnQuc2NzcyddLFxuICAgIHByb3ZpZGVyczogW3tcbiAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFNlbGVjdENvbXBvbmVudCksXG4gICAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sIHtcbiAgICAgICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU2VsZWN0Q29tcG9uZW50KSxcbiAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgfV0sXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQsIEFmdGVyVmlld0luaXQsIFZhbGlkYXRvciB7XG4gICAgQElucHV0KCkgaWQ/OiBzdHJpbmc7XG4gICAgQElucHV0KCkgbmFtZT86IHN0cmluZztcbiAgICBASW5wdXQoKSBsYWJlbD86IHN0cmluZztcbiAgICBASW5wdXQoKSB2YWx1ZTogYW55O1xuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGhlbHA/OiBzdHJpbmc7XG4gICAgQElucHV0KCkgZXJyb3JIZWxwID86IHN0cmluZztcbiAgICBASW5wdXQoKSBlcnJvck1lc3NhZ2UgPzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG4gICAgQElucHV0KCkgcmVxdWlyZWQgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBpc0xhYmVsSGlkZGVuID0gZmFsc2U7XG4gICAgQElucHV0KCkgaXNMZXNzZW4gPSBmYWxzZTtcbiAgICBAT3V0cHV0KCkgb25TZWxlY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgaGVscElkID0gJyc7XG4gICAgb25DaGFuZ2U/OiBGdW5jdGlvbjtcbiAgICBvblRvdWNoZWQ/OiBGdW5jdGlvbjtcbiAgICBoYXNOb1NlbGVjdGlvbiA9IGZhbHNlO1xuICAgIGlzUGxhY2VIb2xkZXJTZWxlY3RlZCA9IGZhbHNlO1xuICAgIGhhc0Vycm9yID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pZCA9ICF0aGlzLmlkID8gYHNlbGVjdC0ke25leHRJZCsrfWAgOiBgJHt0aGlzLmlkfS1zZWxlY3RgO1xuICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLm5hbWUgfHwgdGhpcy5pZDtcbiAgICAgICAgaWYgKHRoaXMuaGVscCkge1xuICAgICAgICAgICAgdGhpcy5oZWxwSWQgPSBgJHt0aGlzLmlkfS1oZWxwYDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoISF0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3Rvcignc2VsZWN0JykudmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNQbGFjZUhvbGRlclNlbGVjdGVkID0gdGhpcy52YWx1ZSA9PT0gJ19fUExBQ0VIT0xERVJfXyc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCEhdGhpcy5wbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdCcpLnZhbHVlID0gJ19fUExBQ0VIT0xERVJfXyc7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1BsYWNlSG9sZGVyU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaXJzdE9wdGlvbiA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ29wdGlvbjpmaXJzdC1jaGlsZCcpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vT3B0aW9uU2VsZWN0ZWQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdvcHRpb246Y2hlY2tlZCcpLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmhhc05vU2VsZWN0aW9uID0gbm9PcHRpb25TZWxlY3RlZCAmJiAhIWZpcnN0T3B0aW9uICYmICFmaXJzdE9wdGlvbi5pbm5lclRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDApO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3Rvcignc2VsZWN0JykudmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoaGFuZGxlcjogYW55KSB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gKGhhbmRsZXIgYXMgRnVuY3Rpb24pO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoaGFuZGxlcjogYW55KSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSAoaGFuZGxlciBhcyBGdW5jdGlvbik7XG4gICAgfVxuXG4gICAgY2hhbmdlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmlzUGxhY2VIb2xkZXJTZWxlY3RlZCA9IHZhbHVlID09PSAnX19QTEFDRUhPTERFUl9fJztcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICAgICAgdGhpcy5vblNlbGVjdGlvbi5lbWl0KHZhbHVlKTtcbiAgICAgICAgaWYgKHRoaXMub25DaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9uVG91Y2hlZCkge1xuICAgICAgICAgICAgdGhpcy5vblRvdWNoZWQodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShkaXNhYmxlZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgdmFsaWRhdGUoY29udHJvbDogRm9ybUNvbnRyb2wpIHtcbiAgICAgICAgaWYgKCF0aGlzLnJlcXVpcmVkIHx8IHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuaGFzRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oYXNFcnJvciA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4ge3JlcXVpcmVkOiB7dmFsaWQ6IGZhbHNlfX07XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=