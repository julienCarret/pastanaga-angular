import { __decorate, __extends, __metadata, __param } from "tslib";
import { Component, ElementRef, EventEmitter, forwardRef, Input, NgZone, OnInit, Optional, Output, ViewChild, AfterViewChecked, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroupDirective, NgForm, } from '@angular/forms';
import { Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { TextfieldCommon } from './textfield.common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { takeUntil } from 'rxjs/operators';
import { detectChanges } from '../common/utils';
var HTML_TAG = new RegExp(/.?<.+>/g);
var REPLACE_LT_GT = new RegExp(/[<>]/g);
var InputComponent = /** @class */ (function (_super) {
    __extends(InputComponent, _super);
    function InputComponent(_platform, ngZone, _autofillMonitor, _parentForm, _parentFormGroup, cdr) {
        var _this = _super.call(this) || this;
        _this._platform = _platform;
        _this.ngZone = ngZone;
        _this._autofillMonitor = _autofillMonitor;
        _this._parentForm = _parentForm;
        _this._parentFormGroup = _parentFormGroup;
        _this.cdr = cdr;
        _this.type = 'text';
        _this.errorList = new EventEmitter();
        _this._hasFocus = false;
        _this._acceptHtmlTags = false;
        _this._noAutoComplete = false;
        _this.autofilled = false;
        _this.baseId = 'input';
        _this.valueChange.pipe(takeUntil(_this.terminator)).subscribe(function () { return detectChanges(_this.cdr); });
        return _this;
    }
    InputComponent_1 = InputComponent;
    Object.defineProperty(InputComponent.prototype, "hasFocus", {
        get: function () { return this._hasFocus; },
        set: function (value) { this._hasFocus = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputComponent.prototype, "acceptHtmlTags", {
        get: function () { return this._acceptHtmlTags; },
        set: function (value) { this._acceptHtmlTags = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputComponent.prototype, "noAutoComplete", {
        get: function () { return this._noAutoComplete; },
        set: function (value) { this._noAutoComplete = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    InputComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        if (!!this.help) {
            this.helpId = this.id + "-help";
        }
    };
    InputComponent.prototype.ngAfterViewChecked = function () {
        var _this = this;
        if (this._platform.isBrowser && !!this.input) {
            this._autofillMonitor
                .monitor(this.input.nativeElement)
                .subscribe(function (event) {
                _this.autofilled = event.isAutofilled;
            });
        }
        if (this._platform.IOS && !!this.input) {
            var input_1 = this.input;
            this.ngZone.runOutsideAngular(function () {
                input_1.nativeElement.addEventListener('keyup', function (event) {
                    var el = event.target;
                    if (!el.value &&
                        !el.selectionStart &&
                        !el.selectionEnd) {
                        // Note: Just setting `0, 0` doesn't fix the issue. Setting
                        // `1, 1` fixes it for the first time that you type text and
                        // then hold delete. Toggling to `1, 1` and then back to
                        // `0, 0` seems to completely fix it.
                        el.setSelectionRange(1, 1);
                        el.setSelectionRange(0, 0);
                    }
                });
            });
        }
        if (this._hasFocus && !!this.input) {
            this.input.nativeElement.focus();
        }
    };
    InputComponent.prototype.ngOnDestroy = function () {
        this.terminator.next();
        if (this._platform.isBrowser && !!this.input) {
            this._autofillMonitor.stopMonitoring(this.input.nativeElement);
        }
    };
    InputComponent.prototype._validate = function (value) {
        _super.prototype._validate.call(this, value);
        this.errorList.emit(this.errors);
    };
    InputComponent.prototype.writeValue = function (value) {
        if (!!value && typeof (value) === 'string' && !this._acceptHtmlTags && value.match(HTML_TAG)) {
            value = value.replace(REPLACE_LT_GT, '');
        }
        _super.prototype.writeValue.call(this, value);
    };
    InputComponent.prototype.reset = function () {
        if (!!this.input) {
            this.input.nativeElement.value = '';
            this.value = '';
        }
    };
    var InputComponent_1;
    InputComponent.ctorParameters = function () { return [
        { type: Platform },
        { type: NgZone },
        { type: AutofillMonitor },
        { type: NgForm, decorators: [{ type: Optional }] },
        { type: FormGroupDirective, decorators: [{ type: Optional }] },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], InputComponent.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], InputComponent.prototype, "maxCharacters", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], InputComponent.prototype, "hasFocus", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], InputComponent.prototype, "acceptHtmlTags", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], InputComponent.prototype, "noAutoComplete", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], InputComponent.prototype, "errorList", void 0);
    __decorate([
        ViewChild('dataInput', { static: true }),
        __metadata("design:type", ElementRef)
    ], InputComponent.prototype, "input", void 0);
    InputComponent = InputComponent_1 = __decorate([
        Component({
            selector: 'pa-input',
            template: "<div [class]=\"'pa-field pa-field-'+ type\"\n     [class.pa-field-error]=\"hasError || !!errorMessage\"\n     [class.pa-accent]=\"_accent\">\n    <input #dataInput class=\"pa-field-control\"\n           [class.pa-field-control-filled]=\"!!value || value === 0\"\n           [class.pa-field-control-readonly-lessen]=\"_readOnly && _isLessen\"\n           [class.pa-field-control-lessen]=\"_isLessen && !_readOnly\"\n           [class.pa-field-control-placeholder-shown]=\"_placeholderShown\"\n           [type]=\"type\"\n           [id]=\"id\"\n           [attr.aria-describedby]=\"helpId\"\n           [attr.placeholder]=\"(placeholder || '') | translate\"\n           [value]=\"!!value || value === 0 ? value : ''\"\n           [readonly]=\"_readOnly\"\n           [disabled]=\"_disabled\"\n           [required]=\"_required\"\n           [attr.autocomplete]=\"_noAutoComplete ? 'off' : undefined\"\n           [attr.maxlength] = \"maxCharacters\"\n           (change)=\"change($event.target.value)\"\n           (keyup)=\"onKeyUp($event)\"\n           (blur)=\"onBlur()\"\n           (focus)=\"focus.emit($event)\"\n    >\n    <label class=\"pa-field-label\" [for]=\"id\" [class.pa-sr]=\"isLabelHidden\" translate><ng-content></ng-content></label>\n    <small *ngIf=\"hasError && errorHelp\" class=\"pa-field-help pa-field-help-error\">{{ errorHelp | translate }}</small>\n    <small *ngIf=\"!!errorMessage\" class=\"pa-field-help pa-field-help-error\">{{ errorMessage | translate }}</small>\n    <small *ngIf=\"help\" class=\"pa-field-help\" [id]=\"helpId\" [innerHtml]=\"help | translate\"></small>\n</div>\n",
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return InputComponent_1; }),
                    multi: true,
                },
                {
                    provide: NG_VALIDATORS,
                    useExisting: forwardRef(function () { return InputComponent_1; }),
                    multi: true,
                },
            ],
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [":host-context(.pa-field-button-group){flex-basis:100%}:host-context(.pa-field-button-group) input{padding-right:3rem!important}.pa-field.pa-field-number .pa-field-control{-moz-appearance:textfield}.pa-field.pa-field-number .pa-field-control::-webkit-inner-spin-button,.pa-field.pa-field-number .pa-field-control::-webkit-outer-spin-button{-webkit-appearance:none;width:2em;position:absolute;top:0;right:.375rem;bottom:0}.pa-field.pa-field-number .pa-field-control:active::-webkit-inner-spin-button,.pa-field.pa-field-number .pa-field-control:focus::-webkit-inner-spin-button{background:url('data:image/svg+xml; utf8, <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"10\" height=\"18\" viewBox=\"0 0 10 18\"><g fill=\"none\" fill-rule=\"evenodd\" transform=\"translate(-4 -6)\"><g transform=\"translate(0 12)\"><polygon fill=\"%23535353\" points=\"4.5 7.707 5.207 7 8.854 10.646 12.5 7 13.207 7.707 8.854 12.06\"/></g><g transform=\"rotate(-180 9 9)\"><polygon fill=\"%23636363\" points=\"5 7.707 5.707 7 9.354 10.646 13 7 13.707 7.707 9.354 12.06\"/></g></g></svg>') center center/10px 1.125rem no-repeat}input[type=number]{-moz-appearance:textfield}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;width:2em;position:absolute;top:0;right:.375rem;bottom:0}input[type=number]:active::-webkit-inner-spin-button,input[type=number]:focus::-webkit-inner-spin-button{background:url('data:image/svg+xml; utf8, <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"10\" height=\"18\" viewBox=\"0 0 10 18\"><g fill=\"none\" fill-rule=\"evenodd\" transform=\"translate(-4 -6)\"><g transform=\"translate(0 12)\"><polygon fill=\"%23535353\" points=\"4.5 7.707 5.207 7 8.854 10.646 12.5 7 13.207 7.707 8.854 12.06\"/></g><g transform=\"rotate(-180 9 9)\"><polygon fill=\"%23636363\" points=\"5 7.707 5.707 7 9.354 10.646 13 7 13.707 7.707 9.354 12.06\"/></g></g></svg>') center center/10px 1.125rem no-repeat}"]
        }),
        __param(3, Optional()),
        __param(4, Optional()),
        __metadata("design:paramtypes", [Platform,
            NgZone,
            AutofillMonitor,
            NgForm,
            FormGroupDirective,
            ChangeDetectorRef])
    ], InputComponent);
    return InputComponent;
}(TextfieldCommon));
export { InputComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGd1aWxsb3RpbmF3ZWIvcGFzdGFuYWdhLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvdGV4dGZpZWxkL2lucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUNOLE1BQU0sRUFDTixRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsU0FBUyxFQUNULHVCQUF1QixFQUN2QixpQkFBaUIsR0FDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNILGlCQUFpQixFQUNqQixhQUFhLEVBQ2Isa0JBQWtCLEVBQ2xCLE1BQU0sR0FDVCxNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFaEQsSUFBTSxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDdkMsSUFBTSxhQUFhLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFvQjFDO0lBQW9DLGtDQUFlO0lBd0IvQyx3QkFDYyxTQUFtQixFQUNuQixNQUFjLEVBQ2hCLGdCQUFpQyxFQUN0QixXQUFtQixFQUNuQixnQkFBb0MsRUFDL0MsR0FBc0I7UUFObEMsWUFRSSxpQkFB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QUM7UUE2Qk8sV0FBQSxRQUFRLEVBQUUsQ0FBQTtRQUNWLFdBQUEsUUFBUSxFQUFFLENBQUE7eUNBSlUsUUFBUTtZQUNYLE1BQU07WUFDRSxlQUFlO1lBQ1QsTUFBTTtZQUNELGtCQUFrQjtZQUMxQyxpQkFBaUI7T0E5QnpCLGNBQWMsQ0F5RzFCO0lBQUQscUJBQUM7Q0FBQSxBQXpHRCxDQUFvQyxlQUFlLEdBeUdsRDtTQXpHWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbnB1dCxcbiAgICBOZ1pvbmUsXG4gICAgT25Jbml0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBWaWV3Q2hpbGQsXG4gICAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICBOR19WQUxJREFUT1JTLFxuICAgIEZvcm1Hcm91cERpcmVjdGl2ZSxcbiAgICBOZ0Zvcm0sXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IEF1dG9maWxsTW9uaXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXh0LWZpZWxkJztcbmltcG9ydCB7IFRleHRmaWVsZENvbW1vbiB9IGZyb20gJy4vdGV4dGZpZWxkLmNvbW1vbic7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgZGV0ZWN0Q2hhbmdlcyB9IGZyb20gJy4uL2NvbW1vbi91dGlscyc7XG5cbmNvbnN0IEhUTUxfVEFHID0gbmV3IFJlZ0V4cCgvLj88Lis+L2cpO1xuY29uc3QgUkVQTEFDRV9MVF9HVCA9IG5ldyBSZWdFeHAoL1s8Pl0vZyk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncGEtaW5wdXQnLFxuICAgIHRlbXBsYXRlVXJsOiAnaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydpbnB1dC5jb21wb25lbnQuc2NzcyddLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IElucHV0Q29tcG9uZW50KSxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gSW5wdXRDb21wb25lbnQpLFxuICAgICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgIH0sXG4gICAgXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgSW5wdXRDb21wb25lbnQgZXh0ZW5kcyBUZXh0ZmllbGRDb21tb24gaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgdHlwZSA9ICd0ZXh0JztcbiAgICBASW5wdXQoKSBtYXhDaGFyYWN0ZXJzPzogbnVtYmVyO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGhhc0ZvY3VzKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faGFzRm9jdXM7IH1cbiAgICBzZXQgaGFzRm9jdXModmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5faGFzRm9jdXMgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gICAgQElucHV0KClcbiAgICBnZXQgYWNjZXB0SHRtbFRhZ3MoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9hY2NlcHRIdG1sVGFnczsgfVxuICAgIHNldCBhY2NlcHRIdG1sVGFncyh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl9hY2NlcHRIdG1sVGFncyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgICBASW5wdXQoKVxuICAgIGdldCBub0F1dG9Db21wbGV0ZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX25vQXV0b0NvbXBsZXRlOyB9XG4gICAgc2V0IG5vQXV0b0NvbXBsZXRlKHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX25vQXV0b0NvbXBsZXRlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuXG4gICAgQE91dHB1dCgpIGVycm9yTGlzdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAVmlld0NoaWxkKCdkYXRhSW5wdXQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBpbnB1dD86IEVsZW1lbnRSZWY7XG5cbiAgICBfaGFzRm9jdXMgPSBmYWxzZTtcbiAgICBfYWNjZXB0SHRtbFRhZ3MgPSBmYWxzZTtcbiAgICBfbm9BdXRvQ29tcGxldGUgPSBmYWxzZTtcblxuICAgIGF1dG9maWxsZWQgPSBmYWxzZTtcbiAgICBiYXNlSWQgPSAnaW5wdXQnO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBfcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgICAgICBwcm90ZWN0ZWQgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIHByaXZhdGUgX2F1dG9maWxsTW9uaXRvcjogQXV0b2ZpbGxNb25pdG9yLFxuICAgICAgICBAT3B0aW9uYWwoKSBwdWJsaWMgX3BhcmVudEZvcm06IE5nRm9ybSxcbiAgICAgICAgQE9wdGlvbmFsKCkgcHVibGljIF9wYXJlbnRGb3JtR3JvdXA6IEZvcm1Hcm91cERpcmVjdGl2ZSxcbiAgICAgICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMudGVybWluYXRvcikpLnN1YnNjcmliZSgoKSA9PiBkZXRlY3RDaGFuZ2VzKHRoaXMuY2RyKSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgICAgIGlmICghIXRoaXMuaGVscCkge1xuICAgICAgICAgICAgdGhpcy5oZWxwSWQgPSBgJHt0aGlzLmlkfS1oZWxwYDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3BsYXRmb3JtLmlzQnJvd3NlciAmJiAhIXRoaXMuaW5wdXQpIHtcbiAgICAgICAgICAgIHRoaXMuX2F1dG9maWxsTW9uaXRvclxuICAgICAgICAgICAgICAgIC5tb25pdG9yKHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudClcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvZmlsbGVkID0gZXZlbnQuaXNBdXRvZmlsbGVkO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9wbGF0Zm9ybS5JT1MgJiYgISF0aGlzLmlucHV0KSB7XG4gICAgICAgICAgICBjb25zdCBpbnB1dCA9IHRoaXMuaW5wdXQ7XG4gICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgaW5wdXQubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgICAgICAgICAna2V5dXAnLFxuICAgICAgICAgICAgICAgICAgICAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICFlbC52YWx1ZSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICFlbC5zZWxlY3Rpb25TdGFydCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICFlbC5zZWxlY3Rpb25FbmRcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vdGU6IEp1c3Qgc2V0dGluZyBgMCwgMGAgZG9lc24ndCBmaXggdGhlIGlzc3VlLiBTZXR0aW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYDEsIDFgIGZpeGVzIGl0IGZvciB0aGUgZmlyc3QgdGltZSB0aGF0IHlvdSB0eXBlIHRleHQgYW5kXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlbiBob2xkIGRlbGV0ZS4gVG9nZ2xpbmcgdG8gYDEsIDFgIGFuZCB0aGVuIGJhY2sgdG9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBgMCwgMGAgc2VlbXMgdG8gY29tcGxldGVseSBmaXggaXQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2UoMSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9oYXNGb2N1cyAmJiAhIXRoaXMuaW5wdXQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudGVybWluYXRvci5uZXh0KCk7XG4gICAgICAgIGlmICh0aGlzLl9wbGF0Zm9ybS5pc0Jyb3dzZXIgJiYgISF0aGlzLmlucHV0KSB7XG4gICAgICAgICAgdGhpcy5fYXV0b2ZpbGxNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfdmFsaWRhdGUodmFsdWUpIHtcbiAgICAgICAgc3VwZXIuX3ZhbGlkYXRlKHZhbHVlKTtcblxuICAgICAgICB0aGlzLmVycm9yTGlzdC5lbWl0KHRoaXMuZXJyb3JzKTtcbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKCEhdmFsdWUgJiYgdHlwZW9mKHZhbHVlKSA9PT0gJ3N0cmluZycgJiYgIXRoaXMuX2FjY2VwdEh0bWxUYWdzICYmIHZhbHVlLm1hdGNoKEhUTUxfVEFHKSkge1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKFJFUExBQ0VfTFRfR1QsICcnKTtcbiAgICAgICAgfVxuICAgICAgICBzdXBlci53cml0ZVZhbHVlKHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgaWYgKCEhdGhpcy5pbnB1dCkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=