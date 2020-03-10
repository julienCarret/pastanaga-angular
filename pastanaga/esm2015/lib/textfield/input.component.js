var InputComponent_1;
import { __decorate, __metadata, __param } from "tslib";
import { Component, ElementRef, EventEmitter, forwardRef, Input, NgZone, OnInit, Optional, Output, ViewChild, AfterViewChecked, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroupDirective, NgForm, } from '@angular/forms';
import { Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { TextfieldCommon } from './textfield.common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { takeUntil } from 'rxjs/operators';
import { detectChanges } from '../common/utils';
const HTML_TAG = new RegExp(/.?<.+>/g);
const REPLACE_LT_GT = new RegExp(/[<>]/g);
let InputComponent = InputComponent_1 = class InputComponent extends TextfieldCommon {
    constructor(_platform, ngZone, _autofillMonitor, _parentForm, _parentFormGroup, cdr) {
        super();
        this._platform = _platform;
        this.ngZone = ngZone;
        this._autofillMonitor = _autofillMonitor;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.cdr = cdr;
        this.type = 'text';
        this.errorList = new EventEmitter();
        this._hasFocus = false;
        this._acceptHtmlTags = false;
        this._noAutoComplete = false;
        this.autofilled = false;
        this.baseId = 'input';
        this.valueChange.pipe(takeUntil(this.terminator)).subscribe(() => detectChanges(this.cdr));
    }
    get hasFocus() { return this._hasFocus; }
    set hasFocus(value) { this._hasFocus = coerceBooleanProperty(value); }
    get acceptHtmlTags() { return this._acceptHtmlTags; }
    set acceptHtmlTags(value) { this._acceptHtmlTags = coerceBooleanProperty(value); }
    get noAutoComplete() { return this._noAutoComplete; }
    set noAutoComplete(value) { this._noAutoComplete = coerceBooleanProperty(value); }
    ngOnInit() {
        super.ngOnInit();
        if (!!this.help) {
            this.helpId = `${this.id}-help`;
        }
    }
    ngAfterViewChecked() {
        if (this._platform.isBrowser && !!this.input) {
            this._autofillMonitor
                .monitor(this.input.nativeElement)
                .subscribe(event => {
                this.autofilled = event.isAutofilled;
            });
        }
        if (this._platform.IOS && !!this.input) {
            const input = this.input;
            this.ngZone.runOutsideAngular(() => {
                input.nativeElement.addEventListener('keyup', (event) => {
                    const el = event.target;
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
    }
    ngOnDestroy() {
        this.terminator.next();
        if (this._platform.isBrowser && !!this.input) {
            this._autofillMonitor.stopMonitoring(this.input.nativeElement);
        }
    }
    _validate(value) {
        super._validate(value);
        this.errorList.emit(this.errors);
    }
    writeValue(value) {
        if (!!value && typeof (value) === 'string' && !this._acceptHtmlTags && value.match(HTML_TAG)) {
            value = value.replace(REPLACE_LT_GT, '');
        }
        super.writeValue(value);
    }
    reset() {
        if (!!this.input) {
            this.input.nativeElement.value = '';
            this.value = '';
        }
    }
};
InputComponent.ctorParameters = () => [
    { type: Platform },
    { type: NgZone },
    { type: AutofillMonitor },
    { type: NgForm, decorators: [{ type: Optional }] },
    { type: FormGroupDirective, decorators: [{ type: Optional }] },
    { type: ChangeDetectorRef }
];
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
                useExisting: forwardRef(() => InputComponent_1),
                multi: true,
            },
            {
                provide: NG_VALIDATORS,
                useExisting: forwardRef(() => InputComponent_1),
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
export { InputComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGd1aWxsb3RpbmF3ZWIvcGFzdGFuYWdhLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvdGV4dGZpZWxkL2lucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFDTixNQUFNLEVBQ04sUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsaUJBQWlCLEdBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDSCxpQkFBaUIsRUFDakIsYUFBYSxFQUNiLGtCQUFrQixFQUNsQixNQUFNLEdBQ1QsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWhELE1BQU0sUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3ZDLE1BQU0sYUFBYSxHQUFHLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBb0IxQyxJQUFhLGNBQWMsc0JBQTNCLE1BQWEsY0FBZSxTQUFRLGVBQWU7SUF3Qi9DLFlBQ2MsU0FBbUIsRUFDbkIsTUFBYyxFQUNoQixnQkFBaUMsRUFDdEIsV0FBbUIsRUFDbkIsZ0JBQW9DLEVB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QSxRQUFRLEVBQUUsQ0FBQTtxQ0FKVSxRQUFRO1FBQ1gsTUFBTTtRQUNFLGVBQWU7UUFDVCxNQUFNO1FBQ0Qsa0JBQWtCO1FBQzFDLGlCQUFpQjtHQTlCekIsY0FBYyxDQXlHMUI7U0F6R1ksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE9uSW5pdCxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgVmlld0NoaWxkLFxuICAgIEFmdGVyVmlld0NoZWNrZWQsXG4gICAgT25EZXN0cm95LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgTkdfVkFMSURBVE9SUyxcbiAgICBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgTmdGb3JtLFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBBdXRvZmlsbE1vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvdGV4dC1maWVsZCc7XG5pbXBvcnQgeyBUZXh0ZmllbGRDb21tb24gfSBmcm9tICcuL3RleHRmaWVsZC5jb21tb24nO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGRldGVjdENoYW5nZXMgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xuXG5jb25zdCBIVE1MX1RBRyA9IG5ldyBSZWdFeHAoLy4/PC4rPi9nKTtcbmNvbnN0IFJFUExBQ0VfTFRfR1QgPSBuZXcgUmVnRXhwKC9bPD5dL2cpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3BhLWlucHV0JyxcbiAgICB0ZW1wbGF0ZVVybDogJ2lucHV0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnaW5wdXQuY29tcG9uZW50LnNjc3MnXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBJbnB1dENvbXBvbmVudCksXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IElucHV0Q29tcG9uZW50KSxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICB9LFxuICAgIF0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIElucHV0Q29tcG9uZW50IGV4dGVuZHMgVGV4dGZpZWxkQ29tbW9uIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdDaGVja2VkLCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIHR5cGUgPSAndGV4dCc7XG4gICAgQElucHV0KCkgbWF4Q2hhcmFjdGVycz86IG51bWJlcjtcbiAgICBASW5wdXQoKVxuICAgIGdldCBoYXNGb2N1cygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2hhc0ZvY3VzOyB9XG4gICAgc2V0IGhhc0ZvY3VzKHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX2hhc0ZvY3VzID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGFjY2VwdEh0bWxUYWdzKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fYWNjZXB0SHRtbFRhZ3M7IH1cbiAgICBzZXQgYWNjZXB0SHRtbFRhZ3ModmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5fYWNjZXB0SHRtbFRhZ3MgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gICAgQElucHV0KClcbiAgICBnZXQgbm9BdXRvQ29tcGxldGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9ub0F1dG9Db21wbGV0ZTsgfVxuICAgIHNldCBub0F1dG9Db21wbGV0ZSh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl9ub0F1dG9Db21wbGV0ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cblxuICAgIEBPdXRwdXQoKSBlcnJvckxpc3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZCgnZGF0YUlucHV0JywgeyBzdGF0aWM6IHRydWUgfSkgaW5wdXQ/OiBFbGVtZW50UmVmO1xuXG4gICAgX2hhc0ZvY3VzID0gZmFsc2U7XG4gICAgX2FjY2VwdEh0bWxUYWdzID0gZmFsc2U7XG4gICAgX25vQXV0b0NvbXBsZXRlID0gZmFsc2U7XG5cbiAgICBhdXRvZmlsbGVkID0gZmFsc2U7XG4gICAgYmFzZUlkID0gJ2lucHV0JztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgX3BsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICAgICAgcHJvdGVjdGVkIG5nWm9uZTogTmdab25lLFxuICAgICAgICBwcml2YXRlIF9hdXRvZmlsbE1vbml0b3I6IEF1dG9maWxsTW9uaXRvcixcbiAgICAgICAgQE9wdGlvbmFsKCkgcHVibGljIF9wYXJlbnRGb3JtOiBOZ0Zvcm0sXG4gICAgICAgIEBPcHRpb25hbCgpIHB1YmxpYyBfcGFyZW50Rm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICApIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5waXBlKHRha2VVbnRpbCh0aGlzLnRlcm1pbmF0b3IpKS5zdWJzY3JpYmUoKCkgPT4gZGV0ZWN0Q2hhbmdlcyh0aGlzLmNkcikpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgICAgICBpZiAoISF0aGlzLmhlbHApIHtcbiAgICAgICAgICAgIHRoaXMuaGVscElkID0gYCR7dGhpcy5pZH0taGVscGA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9wbGF0Zm9ybS5pc0Jyb3dzZXIgJiYgISF0aGlzLmlucHV0KSB7XG4gICAgICAgICAgICB0aGlzLl9hdXRvZmlsbE1vbml0b3JcbiAgICAgICAgICAgICAgICAubW9uaXRvcih0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b2ZpbGxlZCA9IGV2ZW50LmlzQXV0b2ZpbGxlZDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fcGxhdGZvcm0uSU9TICYmICEhdGhpcy5pbnB1dCkge1xuICAgICAgICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmlucHV0O1xuICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlucHV0Lm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgICAgICAgJ2tleXVwJyxcbiAgICAgICAgICAgICAgICAgICAgKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZWwgPSBldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAhZWwudmFsdWUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAhZWwuc2VsZWN0aW9uU3RhcnQgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAhZWwuc2VsZWN0aW9uRW5kXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOb3RlOiBKdXN0IHNldHRpbmcgYDAsIDBgIGRvZXNuJ3QgZml4IHRoZSBpc3N1ZS4gU2V0dGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGAxLCAxYCBmaXhlcyBpdCBmb3IgdGhlIGZpcnN0IHRpbWUgdGhhdCB5b3UgdHlwZSB0ZXh0IGFuZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZW4gaG9sZCBkZWxldGUuIFRvZ2dsaW5nIHRvIGAxLCAxYCBhbmQgdGhlbiBiYWNrIHRvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYDAsIDBgIHNlZW1zIHRvIGNvbXBsZXRlbHkgZml4IGl0LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLnNldFNlbGVjdGlvblJhbmdlKDEsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLnNldFNlbGVjdGlvblJhbmdlKDAsIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5faGFzRm9jdXMgJiYgISF0aGlzLmlucHV0KSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnRlcm1pbmF0b3IubmV4dCgpO1xuICAgICAgICBpZiAodGhpcy5fcGxhdGZvcm0uaXNCcm93c2VyICYmICEhdGhpcy5pbnB1dCkge1xuICAgICAgICAgIHRoaXMuX2F1dG9maWxsTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3ZhbGlkYXRlKHZhbHVlKSB7XG4gICAgICAgIHN1cGVyLl92YWxpZGF0ZSh2YWx1ZSk7XG5cbiAgICAgICAgdGhpcy5lcnJvckxpc3QuZW1pdCh0aGlzLmVycm9ycyk7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICghIXZhbHVlICYmIHR5cGVvZih2YWx1ZSkgPT09ICdzdHJpbmcnICYmICF0aGlzLl9hY2NlcHRIdG1sVGFncyAmJiB2YWx1ZS5tYXRjaChIVE1MX1RBRykpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShSRVBMQUNFX0xUX0dULCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIud3JpdGVWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIGlmICghIXRoaXMuaW5wdXQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9ICcnO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19