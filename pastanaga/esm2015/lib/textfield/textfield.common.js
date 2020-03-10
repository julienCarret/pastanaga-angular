import { __decorate, __metadata } from "tslib";
import { EventEmitter, Input, Output, Directive } from '@angular/core';
import { keyCodes } from '../keycodes.constant';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
let nextId = 0;
let TextfieldCommon = class TextfieldCommon {
    constructor() {
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
        this.debouncer.pipe(takeUntil(this.terminator), debounceTime(this.debounceDuration)).subscribe(value => this.valueChange.emit(value));
    }
    get required() { return this._required; }
    set required(value) { this._required = coerceBooleanProperty(value); }
    get disabled() { return this._disabled; }
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    get isReadOnly() { return this._readOnly; }
    set isReadOnly(value) { this._readOnly = coerceBooleanProperty(value); }
    get isLabelHidden() { return this._labelHidden; }
    set isLabelHidden(value) { this._labelHidden = coerceBooleanProperty(value); }
    get isPlaceholderShown() { return this._placeholderShown; }
    set isPlaceholderShown(value) { this._placeholderShown = coerceBooleanProperty(value); }
    get isLessen() { return this._isLessen; }
    set isLessen(value) { this._isLessen = coerceBooleanProperty(value); }
    get accent() { return this._accent; }
    set accent(value) { this._accent = coerceBooleanProperty(value); }
    ngOnInit() {
        this.id = !!this.id ? `${this.id}-input` : `${this.baseId}-${nextId++}`;
        this.name = this.name || this.id;
        if (!!this.help) {
            this.helpId = `${this.id}-help`;
        }
    }
    ngOnDestroy() {
        this.terminator.next();
    }
    change(value) {
        this._validate(value);
        this.writeValue(value);
        if (!!this.onChange) {
            this.onChange(value);
        }
        if (!!this.onTouched) {
            this.onTouched(value);
        }
    }
    onKeyUp($event) {
        if ($event.keyCode !== keyCodes.tab) {
            const value = $event.target.value;
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
    }
    onBlur() {
        this._validate(this.value);
        this.validate({});
        this.blur.emit(this.value);
    }
    _validate(value) {
        if (this._required) {
            this.errors.required = !value && value !== 0;
        }
        if (!!this.pattern && typeof value === 'string') {
            this.errors.pattern = !!value && !this.pattern.test(value);
        }
        if ((!!value || typeof value === 'number') && this.type === 'number') {
            const numVal = typeof value === 'number' ? value : parseFloat(value);
            if (typeof this.min === 'number') {
                this.errors.min = numVal < this.min;
            }
            if (typeof this.max === 'number') {
                this.errors.max = numVal > this.max;
            }
        }
    }
    validate(control) {
        if (!this.errors.required && !this.errors.pattern && !this.errors.min && !this.errors.max) {
            this.hasError = false;
            return null;
        }
        const errors = {};
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
    }
    writeValue(value) {
        this.value = value;
        this.instantValueChange.emit(value);
        this.debouncer.next(value);
    }
    registerOnTouched(handler) {
        this.onTouched = handler;
    }
    registerOnChange(handler) {
        this.onChange = handler;
    }
    setDisabledState(disabled) {
        this._disabled = disabled;
    }
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
export { TextfieldCommon };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGZpZWxkLmNvbW1vbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BndWlsbG90aW5hd2ViL3Bhc3RhbmFnYS1hbmd1bGFyLyIsInNvdXJjZXMiOlsibGliL3RleHRmaWVsZC90ZXh0ZmllbGQuY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDaEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTlELElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQVlmLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUFpRXhCO1FBOURTLFVBQUssR0FBcUIsRUFBRSxDQUFDO1FBNkI3QixxQkFBZ0IsR0FBRyxHQUFHLENBQUM7UUFFdEIsZ0JBQVcsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNwRCx1QkFBa0IsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMzRCxVQUFLLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUMsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pELFVBQUssR0FBd0QsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNoRixTQUFJLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDN0MsVUFBSyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXhELGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGlCQUFZLEdB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cUIsWUFBWTsyREFBMkI7QUFDM0Q7SUFBVCxNQUFNLEVBQUU7OEJBQVEsWUFBWTs4Q0FBMkI7QUFDOUM7SUFBVCxNQUFNLEVBQUU7OEJBQVcsWUFBWTtpREFBMkI7QUFDakQ7SUFBVCxNQUFNLEVBQUU7OEJBQVEsWUFBWTs4Q0FBNkQ7QUFDaEY7SUFBVCxNQUFNLEVBQUU7OEJBQU8sWUFBWTs2Q0FBMkI7QUFDN0M7SUFBVCxNQUFNLEVBQUU7OEJBQVEsWUFBWTs4Q0FBMkI7QUF4Qy9DLGVBQWU7SUFEM0IsU0FBUyxFQUFFOztHQUNDLGVBQWUsQ0E2SzNCO1NBN0tZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgRm9ybUNvbnRyb2wsIFZhbGlkYXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIERpcmVjdGl2ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsga2V5Q29kZXMgfSBmcm9tICcuLi9rZXljb2Rlcy5jb25zdGFudCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5cbmxldCBuZXh0SWQgPSAwO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgSW5wdXRFcnJvcnMge1xuICAgIHJlcXVpcmVkOiBib29sZWFuO1xuICAgIHBhdHRlcm46IGJvb2xlYW47XG4gICAgcGFzc3dvcmRTdHJlbmd0aD86IGJvb2xlYW47XG4gICAgbWluPzogYm9vbGVhbjtcbiAgICBtYXg/OiBib29sZWFuO1xufVxuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBUZXh0ZmllbGRDb21tb24gaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0LCBPbkRlc3Ryb3ksIFZhbGlkYXRvciB7XG4gICAgQElucHV0KCkgaWQ/OiBzdHJpbmc7XG4gICAgQElucHV0KCkgbmFtZT86IHN0cmluZztcbiAgICBASW5wdXQoKSB2YWx1ZT86IHN0cmluZyB8IG51bWJlciA9ICcnO1xuICAgIEBJbnB1dCgpIGVycm9ySGVscD86IHN0cmluZztcbiAgICBASW5wdXQoKSBlcnJvck1lc3NhZ2U/OiBzdHJpbmc7XG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI/OiBzdHJpbmc7XG4gICAgQElucHV0KCkgaGVscD86IHN0cmluZztcbiAgICBASW5wdXQoKSBwYXR0ZXJuPzogUmVnRXhwO1xuICAgIEBJbnB1dCgpIG1pbj86IG51bWJlcjtcbiAgICBASW5wdXQoKSBtYXg/OiBudW1iZXI7XG4gICAgQElucHV0KClcbiAgICBnZXQgcmVxdWlyZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9yZXF1aXJlZDsgfVxuICAgIHNldCByZXF1aXJlZCh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl9yZXF1aXJlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2Rpc2FibGVkOyB9XG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGlzUmVhZE9ubHkoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9yZWFkT25seTsgfVxuICAgIHNldCBpc1JlYWRPbmx5KHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX3JlYWRPbmx5ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGlzTGFiZWxIaWRkZW4oKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9sYWJlbEhpZGRlbjsgfVxuICAgIHNldCBpc0xhYmVsSGlkZGVuKHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX2xhYmVsSGlkZGVuID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGlzUGxhY2Vob2xkZXJTaG93bigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3BsYWNlaG9sZGVyU2hvd247IH1cbiAgICBzZXQgaXNQbGFjZWhvbGRlclNob3duKHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX3BsYWNlaG9sZGVyU2hvd24gPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gICAgQElucHV0KClcbiAgICBnZXQgaXNMZXNzZW4oKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9pc0xlc3NlbjsgfVxuICAgIHNldCBpc0xlc3Nlbih2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl9pc0xlc3NlbiA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgICBASW5wdXQoKVxuICAgIGdldCBhY2NlbnQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9hY2NlbnQ7IH1cbiAgICBzZXQgYWNjZW50KHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX2FjY2VudCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgICBASW5wdXQoKSBkZWJvdW5jZUR1cmF0aW9uID0gNTAwO1xuXG4gICAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgaW5zdGFudFZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkga2V5VXA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBrZXlQcmVzczogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIGVudGVyOiBFdmVudEVtaXR0ZXI8e2V2ZW50OiBLZXlib2FyZEV2ZW50LCB2YWx1ZTogc3RyaW5nfT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBmb2N1czogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBfcmVxdWlyZWQgPSBmYWxzZTtcbiAgICBfZGlzYWJsZWQgPSBmYWxzZTtcbiAgICBfcmVhZE9ubHkgPSBmYWxzZTtcbiAgICBfbGFiZWxIaWRkZW4gPSBmYWxzZTtcbiAgICBfcGxhY2Vob2xkZXJTaG93biA9IGZhbHNlO1xuICAgIF9pc0xlc3NlbiA9IGZhbHNlO1xuICAgIF9hY2NlbnQgPSBmYWxzZTtcblxuICAgIGhlbHBJZCA9ICcnO1xuICAgIG9uQ2hhbmdlPzogRnVuY3Rpb247XG4gICAgb25Ub3VjaGVkPzogRnVuY3Rpb247XG4gICAgaGFzRXJyb3IgPSBmYWxzZTtcbiAgICBlcnJvcnM6IElucHV0RXJyb3JzID0ge1xuICAgICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICAgIHBhdHRlcm46IGZhbHNlLFxuICAgIH07XG5cbiAgICBiYXNlSWQgPSAnJztcbiAgICB0eXBlID0gJyc7XG5cbiAgICBkZWJvdW5jZXI6IFN1YmplY3Q8c3RyaW5nPiA9IG5ldyBTdWJqZWN0KCk7XG4gICAgdGVybWluYXRvcjogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5kZWJvdW5jZXIucGlwZShcbiAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLnRlcm1pbmF0b3IpLFxuICAgICAgICAgICAgZGVib3VuY2VUaW1lKHRoaXMuZGVib3VuY2VEdXJhdGlvbiksXG4gICAgICAgICkuc3Vic2NyaWJlKHZhbHVlID0+IHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSkpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmlkID0gISF0aGlzLmlkID8gYCR7dGhpcy5pZH0taW5wdXRgIDogYCR7dGhpcy5iYXNlSWR9LSR7bmV4dElkKyt9YDtcbiAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5uYW1lIHx8IHRoaXMuaWQ7XG4gICAgICAgIGlmICghIXRoaXMuaGVscCkge1xuICAgICAgICAgICAgdGhpcy5oZWxwSWQgPSBgJHt0aGlzLmlkfS1oZWxwYDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRlcm1pbmF0b3IubmV4dCgpO1xuICAgIH1cblxuICAgIGNoYW5nZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuX3ZhbGlkYXRlKHZhbHVlKTtcbiAgICAgICAgdGhpcy53cml0ZVZhbHVlKHZhbHVlKTtcbiAgICAgICAgaWYgKCEhdGhpcy5vbkNoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEhdGhpcy5vblRvdWNoZWQpIHtcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaGVkKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uS2V5VXAoJGV2ZW50KSB7XG4gICAgICAgIGlmICgkZXZlbnQua2V5Q29kZSAhPT0ga2V5Q29kZXMudGFiKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9ICRldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICB0aGlzLl92YWxpZGF0ZSh2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLndyaXRlVmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5rZXlVcC5lbWl0KHZhbHVlKTtcbiAgICAgICAgICAgIGlmICghIXRoaXMub25DaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgkZXZlbnQua2V5Q29kZSA9PT0ga2V5Q29kZXMuZW50ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVudGVyLmVtaXQoe2V2ZW50OiAkZXZlbnQsIHZhbHVlOiB2YWx1ZX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25CbHVyKCkge1xuICAgICAgICB0aGlzLl92YWxpZGF0ZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgdGhpcy52YWxpZGF0ZSg8Rm9ybUNvbnRyb2w+e30pO1xuICAgICAgICB0aGlzLmJsdXIuZW1pdCh0aGlzLnZhbHVlKTtcbiAgICB9XG5cbiAgICBfdmFsaWRhdGUodmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX3JlcXVpcmVkKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9ycy5yZXF1aXJlZCA9ICF2YWx1ZSAmJiB2YWx1ZSAhPT0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoISF0aGlzLnBhdHRlcm4gJiYgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5lcnJvcnMucGF0dGVybiA9ICEhdmFsdWUgJiYgIXRoaXMucGF0dGVybi50ZXN0KHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKCEhdmFsdWUgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykgJiYgdGhpcy50eXBlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgY29uc3QgbnVtVmFsID0gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyA/IHZhbHVlIDogcGFyc2VGbG9hdCh2YWx1ZSk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMubWluID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JzLm1pbiA9IG51bVZhbCA8IHRoaXMubWluO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm1heCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9ycy5tYXggPSBudW1WYWwgPiB0aGlzLm1heDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhbGlkYXRlKGNvbnRyb2w6IEZvcm1Db250cm9sKSB7XG4gICAgICAgIGlmICghdGhpcy5lcnJvcnMucmVxdWlyZWQgJiYgIXRoaXMuZXJyb3JzLnBhdHRlcm4gJiYgIXRoaXMuZXJyb3JzLm1pbiAmJiAhdGhpcy5lcnJvcnMubWF4KSB7XG4gICAgICAgICAgICB0aGlzLmhhc0Vycm9yID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBlcnJvcnM6IGFueSA9IHt9O1xuICAgICAgICBpZiAodGhpcy5lcnJvcnMucmVxdWlyZWQpIHtcbiAgICAgICAgICAgIGVycm9ycy5yZXF1aXJlZCA9IHt2YWxpZDogZmFsc2V9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmVycm9ycy5wYXR0ZXJuKSB7XG4gICAgICAgICAgICBlcnJvcnMucGF0dGVybiA9IHt2YWxpZDogZmFsc2V9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmVycm9ycy5taW4pIHtcbiAgICAgICAgICAgIGVycm9ycy5taW4gPSB7dmFsaWQ6IGZhbHNlfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5lcnJvcnMubWF4KSB7XG4gICAgICAgICAgICBlcnJvcnMubWF4ID0ge3ZhbGlkOiBmYWxzZX07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oYXNFcnJvciA9IHRydWU7XG4gICAgICAgIHJldHVybiBlcnJvcnM7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5pbnN0YW50VmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgICAgIHRoaXMuZGVib3VuY2VyLm5leHQodmFsdWUpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGhhbmRsZXI6IGFueSkge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IChoYW5kbGVyIGFzIEZ1bmN0aW9uKTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGhhbmRsZXI6IGFueSkge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gKGhhbmRsZXIgYXMgRnVuY3Rpb24pO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUoZGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgICB9XG59XG4iXX0=