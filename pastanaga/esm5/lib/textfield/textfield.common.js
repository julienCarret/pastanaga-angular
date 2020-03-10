import { __decorate, __metadata } from "tslib";
import { EventEmitter, Input, Output, Directive } from '@angular/core';
import { keyCodes } from '../keycodes.constant';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
var nextId = 0;
var TextfieldCommon = /** @class */ (function () {
    function TextfieldCommon() {
        var _this = this;
        this.value = '';
        this.debounceDuration = 500;
        this.valueChange = new EventEmitter();
        this.instantValueChange = new EventEmitter();
        this.keyUp = new EventEmitter();
        this.keyPress = new EventEmitter();
        this.enter = new EventEmitter();
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        this._required = false;
        this._disabled = false;
        this._readOnly = false;
        this._labelHidden = false;
        this._placeholderShown = false;
        this._isLessen = false;
        this._accent = false;
        this.helpId = '';
        this.hasError = false;
        this.errors = {
            required: false,
            pattern: false,
        };
        this.baseId = '';
        this.type = '';
        this.debouncer = new Subject();
        this.terminator = new Subject();
        this.debouncer.pipe(takeUntil(this.terminator), debounceTime(this.debounceDuration)).subscribe(function (value) { return _this.valueChange.emit(value); });
    }
    Object.defineProperty(TextfieldCommon.prototype, "required", {
        get: function () { return this._required; },
        set: function (value) { this._required = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextfieldCommon.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextfieldCommon.prototype, "isReadOnly", {
        get: function () { return this._readOnly; },
        set: function (value) { this._readOnly = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextfieldCommon.prototype, "isLabelHidden", {
        get: function () { return this._labelHidden; },
        set: function (value) { this._labelHidden = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextfieldCommon.prototype, "isPlaceholderShown", {
        get: function () { return this._placeholderShown; },
        set: function (value) { this._placeholderShown = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextfieldCommon.prototype, "isLessen", {
        get: function () { return this._isLessen; },
        set: function (value) { this._isLessen = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextfieldCommon.prototype, "accent", {
        get: function () { return this._accent; },
        set: function (value) { this._accent = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    TextfieldCommon.prototype.ngOnInit = function () {
        this.id = !!this.id ? this.id + "-input" : this.baseId + "-" + nextId++;
        this.name = this.name || this.id;
        if (!!this.help) {
            this.helpId = this.id + "-help";
        }
    };
    TextfieldCommon.prototype.ngOnDestroy = function () {
        this.terminator.next();
    };
    TextfieldCommon.prototype.change = function (value) {
        this._validate(value);
        this.writeValue(value);
        if (!!this.onChange) {
            this.onChange(value);
        }
        if (!!this.onTouched) {
            this.onTouched(value);
        }
    };
    TextfieldCommon.prototype.onKeyUp = function ($event) {
        if ($event.keyCode !== keyCodes.tab) {
            var value = $event.target.value;
            this._validate(value);
            this.writeValue(value);
            this.keyUp.emit(value);
            if (!!this.onChange) {
                this.onChange(value);
            }
            if ($event.keyCode === keyCodes.enter) {
                this.enter.emit({ event: $event, value: value });
            }
        }
    };
    TextfieldCommon.prototype.onBlur = function () {
        this._validate(this.value);
        this.validate({});
        this.blur.emit(this.value);
    };
    TextfieldCommon.prototype._validate = function (value) {
        if (this._required) {
            this.errors.required = !value && value !== 0;
        }
        if (!!this.pattern && typeof value === 'string') {
            this.errors.pattern = !!value && !this.pattern.test(value);
        }
        if ((!!value || typeof value === 'number') && this.type === 'number') {
            var numVal = typeof value === 'number' ? value : parseFloat(value);
            if (typeof this.min === 'number') {
                this.errors.min = numVal < this.min;
            }
            if (typeof this.max === 'number') {
                this.errors.max = numVal > this.max;
            }
        }
    };
    TextfieldCommon.prototype.validate = function (control) {
        if (!this.errors.required && !this.errors.pattern && !this.errors.min && !this.errors.max) {
            this.hasError = false;
            return null;
        }
        var errors = {};
        if (this.errors.required) {
            errors.required = { valid: false };
        }
        if (this.errors.pattern) {
            errors.pattern = { valid: false };
        }
        if (this.errors.min) {
            errors.min = { valid: false };
        }
        if (this.errors.max) {
            errors.max = { valid: false };
        }
        this.hasError = true;
        return errors;
    };
    TextfieldCommon.prototype.writeValue = function (value) {
        this.value = value;
        this.instantValueChange.emit(value);
        this.debouncer.next(value);
    };
    TextfieldCommon.prototype.registerOnTouched = function (handler) {
        this.onTouched = handler;
    };
    TextfieldCommon.prototype.registerOnChange = function (handler) {
        this.onChange = handler;
    };
    TextfieldCommon.prototype.setDisabledState = function (disabled) {
        this._disabled = disabled;
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TextfieldCommon.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TextfieldCommon.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextfieldCommon.prototype, "value", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TextfieldCommon.prototype, "errorHelp", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TextfieldCommon.prototype, "errorMessage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TextfieldCommon.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TextfieldCommon.prototype, "help", void 0);
    __decorate([
        Input(),
        __metadata("design:type", RegExp)
    ], TextfieldCommon.prototype, "pattern", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TextfieldCommon.prototype, "min", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TextfieldCommon.prototype, "max", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], TextfieldCommon.prototype, "required", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], TextfieldCommon.prototype, "disabled", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], TextfieldCommon.prototype, "isReadOnly", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], TextfieldCommon.prototype, "isLabelHidden", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], TextfieldCommon.prototype, "isPlaceholderShown", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], TextfieldCommon.prototype, "isLessen", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], TextfieldCommon.prototype, "accent", null);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextfieldCommon.prototype, "debounceDuration", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TextfieldCommon.prototype, "valueChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TextfieldCommon.prototype, "instantValueChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TextfieldCommon.prototype, "keyUp", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TextfieldCommon.prototype, "keyPress", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TextfieldCommon.prototype, "enter", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TextfieldCommon.prototype, "blur", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TextfieldCommon.prototype, "focus", void 0);
    TextfieldCommon = __decorate([
        Directive(),
        __metadata("design:paramtypes", [])
    ], TextfieldCommon);
    return TextfieldCommon;
}());
export { TextfieldCommon };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGZpZWxkLmNvbW1vbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BndWlsbG90aW5hd2ViL3Bhc3RhbmFnYS1hbmd1bGFyLyIsInNvdXJjZXMiOlsibGliL3RleHRmaWVsZC90ZXh0ZmllbGQuY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDaEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTlELElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQVlmO0lBaUVJO1FBQUEsaUJBS0M7UUFuRVEsVUFBSyxHQUFxQixFQUFFLENBQUM7UUE2QjdCLHFCQUFnQixHQUFHLEdBQUcsQ0FBQztRQUV0QixnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3BELHVCQUFrQixHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzNELFVBQUssR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QyxhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDakQsVUFBSyxHQUF3RCxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hGLFNBQUksR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM3QyxVQUFLLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFeEQsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFD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LEVBQUU7OzZEQUF3QjtJQUV0QjtRQUFULE1BQU0sRUFBRTtrQ0FBYyxZQUFZO3dEQUEyQjtJQUNwRDtRQUFULE1BQU0sRUFBRTtrQ0FBcUIsWUFBWTsrREFBMkI7SUFDM0Q7UUFBVCxNQUFNLEVBQUU7a0NBQVEsWUFBWTtrREFBMkI7SUFDOUM7UUFBVCxNQUFNLEVBQUU7a0NBQVcsWUFBWTtxREFBMkI7SUFDakQ7UUFBVCxNQUFNLEVBQUU7a0NBQVEsWUFBWTtrREFBNkQ7SUFDaEY7UUFBVCxNQUFNLEVBQUU7a0NBQU8sWUFBWTtpREFBMkI7SUFDN0M7UUFBVCxNQUFNLEVBQUU7a0NBQVEsWUFBWTtrREFBMkI7SUF4Qy9DLGVBQWU7UUFEM0IsU0FBUyxFQUFFOztPQUNDLGVBQWUsQ0E2SzNCO0lBQUQsc0JBQUM7Q0FBQSxBQTdLRCxJQTZLQztTQTdLWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEZvcm1Db250cm9sLCBWYWxpZGF0b3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBEaXJlY3RpdmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGtleUNvZGVzIH0gZnJvbSAnLi4va2V5Y29kZXMuY29uc3RhbnQnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuXG5sZXQgbmV4dElkID0gMDtcblxuXG5leHBvcnQgaW50ZXJmYWNlIElucHV0RXJyb3JzIHtcbiAgICByZXF1aXJlZDogYm9vbGVhbjtcbiAgICBwYXR0ZXJuOiBib29sZWFuO1xuICAgIHBhc3N3b3JkU3RyZW5ndGg/OiBib29sZWFuO1xuICAgIG1pbj86IGJvb2xlYW47XG4gICAgbWF4PzogYm9vbGVhbjtcbn1cblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgVGV4dGZpZWxkQ29tbW9uIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCwgT25EZXN0cm95LCBWYWxpZGF0b3Ige1xuICAgIEBJbnB1dCgpIGlkPzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIG5hbWU/OiBzdHJpbmc7XG4gICAgQElucHV0KCkgdmFsdWU/OiBzdHJpbmcgfCBudW1iZXIgPSAnJztcbiAgICBASW5wdXQoKSBlcnJvckhlbHA/OiBzdHJpbmc7XG4gICAgQElucHV0KCkgZXJyb3JNZXNzYWdlPzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGhlbHA/OiBzdHJpbmc7XG4gICAgQElucHV0KCkgcGF0dGVybj86IFJlZ0V4cDtcbiAgICBASW5wdXQoKSBtaW4/OiBudW1iZXI7XG4gICAgQElucHV0KCkgbWF4PzogbnVtYmVyO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fcmVxdWlyZWQ7IH1cbiAgICBzZXQgcmVxdWlyZWQodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5fcmVxdWlyZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9kaXNhYmxlZDsgfVxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgICBASW5wdXQoKVxuICAgIGdldCBpc1JlYWRPbmx5KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fcmVhZE9ubHk7IH1cbiAgICBzZXQgaXNSZWFkT25seSh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl9yZWFkT25seSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgICBASW5wdXQoKVxuICAgIGdldCBpc0xhYmVsSGlkZGVuKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fbGFiZWxIaWRkZW47IH1cbiAgICBzZXQgaXNMYWJlbEhpZGRlbih2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl9sYWJlbEhpZGRlbiA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgICBASW5wdXQoKVxuICAgIGdldCBpc1BsYWNlaG9sZGVyU2hvd24oKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9wbGFjZWhvbGRlclNob3duOyB9XG4gICAgc2V0IGlzUGxhY2Vob2xkZXJTaG93bih2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl9wbGFjZWhvbGRlclNob3duID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGlzTGVzc2VuKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faXNMZXNzZW47IH1cbiAgICBzZXQgaXNMZXNzZW4odmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5faXNMZXNzZW4gPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gICAgQElucHV0KClcbiAgICBnZXQgYWNjZW50KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fYWNjZW50OyB9XG4gICAgc2V0IGFjY2VudCh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl9hY2NlbnQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gICAgQElucHV0KCkgZGVib3VuY2VEdXJhdGlvbiA9IDUwMDtcblxuICAgIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIGluc3RhbnRWYWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIGtleVVwOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkga2V5UHJlc3M6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBlbnRlcjogRXZlbnRFbWl0dGVyPHtldmVudDogS2V5Ym9hcmRFdmVudCwgdmFsdWU6IHN0cmluZ30+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBibHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgZm9jdXM6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgX3JlcXVpcmVkID0gZmFsc2U7XG4gICAgX2Rpc2FibGVkID0gZmFsc2U7XG4gICAgX3JlYWRPbmx5ID0gZmFsc2U7XG4gICAgX2xhYmVsSGlkZGVuID0gZmFsc2U7XG4gICAgX3BsYWNlaG9sZGVyU2hvd24gPSBmYWxzZTtcbiAgICBfaXNMZXNzZW4gPSBmYWxzZTtcbiAgICBfYWNjZW50ID0gZmFsc2U7XG5cbiAgICBoZWxwSWQgPSAnJztcbiAgICBvbkNoYW5nZT86IEZ1bmN0aW9uO1xuICAgIG9uVG91Y2hlZD86IEZ1bmN0aW9uO1xuICAgIGhhc0Vycm9yID0gZmFsc2U7XG4gICAgZXJyb3JzOiBJbnB1dEVycm9ycyA9IHtcbiAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICBwYXR0ZXJuOiBmYWxzZSxcbiAgICB9O1xuXG4gICAgYmFzZUlkID0gJyc7XG4gICAgdHlwZSA9ICcnO1xuXG4gICAgZGVib3VuY2VyOiBTdWJqZWN0PHN0cmluZz4gPSBuZXcgU3ViamVjdCgpO1xuICAgIHRlcm1pbmF0b3I6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdCgpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZGVib3VuY2VyLnBpcGUoXG4gICAgICAgICAgICB0YWtlVW50aWwodGhpcy50ZXJtaW5hdG9yKSxcbiAgICAgICAgICAgIGRlYm91bmNlVGltZSh0aGlzLmRlYm91bmNlRHVyYXRpb24pLFxuICAgICAgICApLnN1YnNjcmliZSh2YWx1ZSA9PiB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodmFsdWUpKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pZCA9ICEhdGhpcy5pZCA/IGAke3RoaXMuaWR9LWlucHV0YCA6IGAke3RoaXMuYmFzZUlkfS0ke25leHRJZCsrfWA7XG4gICAgICAgIHRoaXMubmFtZSA9IHRoaXMubmFtZSB8fCB0aGlzLmlkO1xuICAgICAgICBpZiAoISF0aGlzLmhlbHApIHtcbiAgICAgICAgICAgIHRoaXMuaGVscElkID0gYCR7dGhpcy5pZH0taGVscGA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50ZXJtaW5hdG9yLm5leHQoKTtcbiAgICB9XG5cbiAgICBjaGFuZ2UodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLl92YWxpZGF0ZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMud3JpdGVWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIGlmICghIXRoaXMub25DaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghIXRoaXMub25Ub3VjaGVkKSB7XG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hlZCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbktleVVwKCRldmVudCkge1xuICAgICAgICBpZiAoJGV2ZW50LmtleUNvZGUgIT09IGtleUNvZGVzLnRhYikge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSAkZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fdmFsaWRhdGUodmFsdWUpO1xuICAgICAgICAgICAgdGhpcy53cml0ZVZhbHVlKHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMua2V5VXAuZW1pdCh2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoISF0aGlzLm9uQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoJGV2ZW50LmtleUNvZGUgPT09IGtleUNvZGVzLmVudGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbnRlci5lbWl0KHtldmVudDogJGV2ZW50LCB2YWx1ZTogdmFsdWV9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQmx1cigpIHtcbiAgICAgICAgdGhpcy5fdmFsaWRhdGUodGhpcy52YWx1ZSk7XG4gICAgICAgIHRoaXMudmFsaWRhdGUoPEZvcm1Db250cm9sPnt9KTtcbiAgICAgICAgdGhpcy5ibHVyLmVtaXQodGhpcy52YWx1ZSk7XG4gICAgfVxuXG4gICAgX3ZhbGlkYXRlKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLl9yZXF1aXJlZCkge1xuICAgICAgICAgICAgdGhpcy5lcnJvcnMucmVxdWlyZWQgPSAhdmFsdWUgJiYgdmFsdWUgIT09IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEhdGhpcy5wYXR0ZXJuICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JzLnBhdHRlcm4gPSAhIXZhbHVlICYmICF0aGlzLnBhdHRlcm4udGVzdCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCghIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpICYmIHRoaXMudHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGNvbnN0IG51bVZhbCA9IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgPyB2YWx1ZSA6IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm1pbiA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9ycy5taW4gPSBudW1WYWwgPCB0aGlzLm1pbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5tYXggPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvcnMubWF4ID0gbnVtVmFsID4gdGhpcy5tYXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YWxpZGF0ZShjb250cm9sOiBGb3JtQ29udHJvbCkge1xuICAgICAgICBpZiAoIXRoaXMuZXJyb3JzLnJlcXVpcmVkICYmICF0aGlzLmVycm9ycy5wYXR0ZXJuICYmICF0aGlzLmVycm9ycy5taW4gJiYgIXRoaXMuZXJyb3JzLm1heCkge1xuICAgICAgICAgICAgdGhpcy5oYXNFcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZXJyb3JzOiBhbnkgPSB7fTtcbiAgICAgICAgaWYgKHRoaXMuZXJyb3JzLnJlcXVpcmVkKSB7XG4gICAgICAgICAgICBlcnJvcnMucmVxdWlyZWQgPSB7dmFsaWQ6IGZhbHNlfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5lcnJvcnMucGF0dGVybikge1xuICAgICAgICAgICAgZXJyb3JzLnBhdHRlcm4gPSB7dmFsaWQ6IGZhbHNlfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5lcnJvcnMubWluKSB7XG4gICAgICAgICAgICBlcnJvcnMubWluID0ge3ZhbGlkOiBmYWxzZX07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZXJyb3JzLm1heCkge1xuICAgICAgICAgICAgZXJyb3JzLm1heCA9IHt2YWxpZDogZmFsc2V9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGFzRXJyb3IgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZXJyb3JzO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuaW5zdGFudFZhbHVlQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgICAgICB0aGlzLmRlYm91bmNlci5uZXh0KHZhbHVlKTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChoYW5kbGVyOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSAoaGFuZGxlciBhcyBGdW5jdGlvbik7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShoYW5kbGVyOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IChoYW5kbGVyIGFzIEZ1bmN0aW9uKTtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKGRpc2FibGVkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gZGlzYWJsZWQ7XG4gICAgfVxufVxuIl19