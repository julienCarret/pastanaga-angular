var SelectComponent_1;
import { __decorate, __metadata } from "tslib";
import { AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
let nextId = 0;
let SelectComponent = SelectComponent_1 = class SelectComponent {
    constructor(element) {
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
    ngOnInit() {
        this.id = !this.id ? `select-${nextId++}` : `${this.id}-select`;
        this.name = this.name || this.id;
        if (this.help) {
            this.helpId = `${this.id}-help`;
        }
    }
    ngAfterViewInit() {
        setTimeout(() => {
            if (!!this.value) {
                this.element.nativeElement.querySelector('select').value = this.value;
                this.isPlaceHolderSelected = this.value === '__PLACEHOLDER__';
            }
            else if (!!this.placeholder) {
                this.element.nativeElement.querySelector('select').value = '__PLACEHOLDER__';
                this.isPlaceHolderSelected = true;
            }
            else {
                const firstOption = this.element.nativeElement.querySelector('option:first-child');
                const noOptionSelected = this.element.nativeElement.querySelectorAll('option:checked').length === 0;
                this.hasNoSelection = noOptionSelected && !!firstOption && !firstOption.innerText;
            }
        }, 0);
    }
    writeValue(value) {
        this.value = value;
        if (this.element.nativeElement) {
            this.element.nativeElement.querySelector('select').value = this.value;
        }
        this.valueChange.emit(value);
    }
    registerOnTouched(handler) {
        this.onTouched = handler;
    }
    registerOnChange(handler) {
        this.onChange = handler;
    }
    change(value) {
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
    }
    setDisabledState(disabled) {
        this.disabled = disabled;
    }
    validate(control) {
        if (!this.required || this.value) {
            this.hasError = false;
            return null;
        }
        else {
            this.hasError = true;
            return { required: { valid: false } };
        }
    }
};
SelectComponent.ctorParameters = () => [
    { type: ElementRef }
];
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
                useExisting: forwardRef(() => SelectComponent_1),
                multi: true,
            }, {
                provide: NG_VALIDATORS,
                useExisting: forwardRef(() => SelectComponent_1),
                multi: true,
            }],
        styles: [".pa-field-select .pa-field-control{background-image:url('data:image/svg+xml; utf8, <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"36\" height=\"36\" viewBox=\"0 0 36 36\"><polygon fill=\"%23949494\" fill-rule=\"evenodd\" points=\"9.293 14.707 10.707 13.293 18 20.586 25.293 13.293 26.707 14.707 18 23.414\"/></svg>');background-position:calc(100% - .375rem) center;background-repeat:no-repeat;background-size:1.5rem 1.5rem}.pa-field-select .pa-field-control.pa-field-control-accent{background-color:rgba(34,128,160,.06);box-shadow:0 200px 0 -200px #00719e;-webkit-transition:.5s;transition:.5s}.pa-field-select .pa-field-control:hover{cursor:pointer;box-shadow:0 2px 0 -1px #00719e}.pa-field-select .pa-field-control:active,.pa-field-select .pa-field-control:focus{box-shadow:0 2px 0 0 #4da4c8;background-color:rgba(34,128,160,.12)}.pa-field-select .pa-field-control.pa-field-control-lessen{padding-right:1.875rem!important}"]
    }),
    __metadata("design:paramtypes", [ElementRef])
], SelectComponent);
export { SelectComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BndWlsbG90aW5hd2ViL3Bhc3RhbmFnYS1hbmd1bGFyLyIsInNvdXJjZXMiOlsibGliL3RleHRmaWVsZC9zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEgsT0FBTyxFQUFxQyxhQUFhLEVBQUUsaUJBQWlCLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoSCxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFnQmYsSUFBYSxlQUFlLHVCQUE1QixNQUFhLGVBQWU7SUFzQnhCLFlBQW9CLE9BQW1CO1FBQW5CLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFiOUIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDaEIsZ0JBQVcsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNwRCxnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlELFdBQU0sR0FBRyxFQUFFLENBQUM7UUFHWixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QiwwQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFDOUIsYUFBUSxHQUFHLEtBQUssQ0FBQztJQUdqQixDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsU0FBUyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxJQUFJLEdB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LENBQUM7cUNBdUIrQixVQUFVO0dBdEI5QixlQUFlLENBMkYzQjtTQTNGWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEZvcm1Db250cm9sLCBOR19WQUxJREFUT1JTLCBOR19WQUxVRV9BQ0NFU1NPUiwgVmFsaWRhdG9yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5sZXQgbmV4dElkID0gMDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwYS1zZWxlY3QnLFxuICAgIHRlbXBsYXRlVXJsOiAnc2VsZWN0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnc2VsZWN0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgcHJvdmlkZXJzOiBbe1xuICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU2VsZWN0Q29tcG9uZW50KSxcbiAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSwge1xuICAgICAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBTZWxlY3RDb21wb25lbnQpLFxuICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9XSxcbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgVmFsaWRhdG9yIHtcbiAgICBASW5wdXQoKSBpZD86IHN0cmluZztcbiAgICBASW5wdXQoKSBuYW1lPzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGxhYmVsPzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHZhbHVlOiBhbnk7XG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI/OiBzdHJpbmc7XG4gICAgQElucHV0KCkgaGVscD86IHN0cmluZztcbiAgICBASW5wdXQoKSBlcnJvckhlbHAgPzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGVycm9yTWVzc2FnZSA/OiBzdHJpbmc7XG4gICAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcbiAgICBASW5wdXQoKSByZXF1aXJlZCA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGlzTGFiZWxIaWRkZW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBpc0xlc3NlbiA9IGZhbHNlO1xuICAgIEBPdXRwdXQoKSBvblNlbGVjdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBoZWxwSWQgPSAnJztcbiAgICBvbkNoYW5nZT86IEZ1bmN0aW9uO1xuICAgIG9uVG91Y2hlZD86IEZ1bmN0aW9uO1xuICAgIGhhc05vU2VsZWN0aW9uID0gZmFsc2U7XG4gICAgaXNQbGFjZUhvbGRlclNlbGVjdGVkID0gZmFsc2U7XG4gICAgaGFzRXJyb3IgPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmlkID0gIXRoaXMuaWQgPyBgc2VsZWN0LSR7bmV4dElkKyt9YCA6IGAke3RoaXMuaWR9LXNlbGVjdGA7XG4gICAgICAgIHRoaXMubmFtZSA9IHRoaXMubmFtZSB8fCB0aGlzLmlkO1xuICAgICAgICBpZiAodGhpcy5oZWxwKSB7XG4gICAgICAgICAgICB0aGlzLmhlbHBJZCA9IGAke3RoaXMuaWR9LWhlbHBgO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICghIXRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdzZWxlY3QnKS52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1BsYWNlSG9sZGVyU2VsZWN0ZWQgPSB0aGlzLnZhbHVlID09PSAnX19QTEFDRUhPTERFUl9fJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoISF0aGlzLnBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3Rvcignc2VsZWN0JykudmFsdWUgPSAnX19QTEFDRUhPTERFUl9fJztcbiAgICAgICAgICAgICAgICB0aGlzLmlzUGxhY2VIb2xkZXJTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0T3B0aW9uID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3Rvcignb3B0aW9uOmZpcnN0LWNoaWxkJyk7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm9PcHRpb25TZWxlY3RlZCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ29wdGlvbjpjaGVja2VkJykubGVuZ3RoID09PSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuaGFzTm9TZWxlY3Rpb24gPSBub09wdGlvblNlbGVjdGVkICYmICEhZmlyc3RPcHRpb24gJiYgIWZpcnN0T3B0aW9uLmlubmVyVGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMCk7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdzZWxlY3QnKS52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChoYW5kbGVyOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSAoaGFuZGxlciBhcyBGdW5jdGlvbik7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShoYW5kbGVyOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IChoYW5kbGVyIGFzIEZ1bmN0aW9uKTtcbiAgICB9XG5cbiAgICBjaGFuZ2UodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuaXNQbGFjZUhvbGRlclNlbGVjdGVkID0gdmFsdWUgPT09ICdfX1BMQUNFSE9MREVSX18nO1xuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgICAgICB0aGlzLm9uU2VsZWN0aW9uLmVtaXQodmFsdWUpO1xuICAgICAgICBpZiAodGhpcy5vbkNoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub25Ub3VjaGVkKSB7XG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hlZCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKGRpc2FibGVkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZShjb250cm9sOiBGb3JtQ29udHJvbCkge1xuICAgICAgICBpZiAoIXRoaXMucmVxdWlyZWQgfHwgdGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5oYXNFcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhhc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB7cmVxdWlyZWQ6IHt2YWxpZDogZmFsc2V9fTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==