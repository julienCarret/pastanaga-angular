import { __decorate, __metadata } from "tslib";
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { detectChanges, markForCheck } from '../../common/utils';
var nextId = 0;
var CheckboxComponent = /** @class */ (function () {
    function CheckboxComponent(cdr, element) {
        this.cdr = cdr;
        this.element = element;
        this.type = 'checkbox';
        this.selection = new EventEmitter();
        // the following EventEmitters allow two way data-binding
        this.selectedChange = new EventEmitter();
        this._id = '';
        this._noFocus = false;
        this._indeterminate = false;
        this._disabled = false;
        this._selected = false;
        this._squareCheck = false;
        this._labelHidden = false;
        this._iconName = '';
        this.helpId = '';
        this.extraStyle = {};
        this.hasEllipsis = false;
        this.tooltipText = '';
        this.hasExtraWidth = false;
    }
    Object.defineProperty(CheckboxComponent.prototype, "icon", {
        set: function (value) {
            if (!!value && typeof value === 'string') {
                this._iconName = value;
            }
            else {
                this._icon = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxComponent.prototype, "disabled", {
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxComponent.prototype, "selected", {
        set: function (value) { this._selected = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxComponent.prototype, "indeterminate", {
        set: function (value) { this._indeterminate = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxComponent.prototype, "labelHidden", {
        set: function (value) { this._labelHidden = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxComponent.prototype, "noFocus", {
        set: function (value) { this._noFocus = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxComponent.prototype, "squareCheck", {
        set: function (value) { this._squareCheck = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    CheckboxComponent.prototype.ngOnInit = function () {
        this._id = this.id ? this.id : "field-" + this.type + "-" + nextId++;
        this.name = this.name || this._id;
        this.helpId = this._id + "-help";
    };
    CheckboxComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () { return _this.setLabelMaxWidth(); });
    };
    CheckboxComponent.prototype.toggleCheckbox = function () {
        // radio can't be unchecked by clicking on itself
        if (this.type === 'checkbox' || !this._selected) {
            this._selected = !this._selected;
        }
        markForCheck(this.cdr);
        this.selectedChange.emit(this._selected);
        this.selection.emit(this._selected);
    };
    CheckboxComponent.prototype.setLabelMaxWidth = function (extraWidth) {
        if (!!extraWidth) {
            this.hasExtraWidth = true;
        }
        if (this.hasExtraWidth && !extraWidth) {
            // prevent checkbox inner call to overwrite style with extra width coming from parent
            return;
        }
        var parent = this.element.nativeElement.parentElement;
        if (!!parent) {
            var parentWidth = parent.getBoundingClientRect().width;
            var maxWidth = parentWidth - 24;
            if (!!extraWidth) {
                maxWidth = maxWidth - extraWidth;
            }
            this.extraStyle = { 'max-width': maxWidth + "px" };
            this.setEllipsis();
            detectChanges(this.cdr);
        }
    };
    CheckboxComponent.prototype.setEllipsis = function () {
        if (!!this.ellipsisText) {
            if (!this._labelHidden) {
                this.hasEllipsis = this.ellipsisText.nativeElement.offsetWidth < this.ellipsisText.nativeElement.scrollWidth;
            }
            else {
                this.hasEllipsis = false;
            }
            if (this.hasEllipsis) {
                this.tooltipText = this.ellipsisText.nativeElement.innerText;
            }
        }
        detectChanges(this.cdr);
    };
    CheckboxComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CheckboxComponent.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CheckboxComponent.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CheckboxComponent.prototype, "help", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CheckboxComponent.prototype, "icon", null);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CheckboxComponent.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CheckboxComponent.prototype, "subLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], CheckboxComponent.prototype, "labelIcons", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CheckboxComponent.prototype, "disabled", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CheckboxComponent.prototype, "selected", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CheckboxComponent.prototype, "indeterminate", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CheckboxComponent.prototype, "labelHidden", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CheckboxComponent.prototype, "noFocus", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CheckboxComponent.prototype, "squareCheck", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CheckboxComponent.prototype, "selection", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CheckboxComponent.prototype, "selectedChange", void 0);
    __decorate([
        ViewChild('text'),
        __metadata("design:type", ElementRef)
    ], CheckboxComponent.prototype, "textElement", void 0);
    __decorate([
        ViewChild('ellipsisText', { static: true }),
        __metadata("design:type", ElementRef)
    ], CheckboxComponent.prototype, "ellipsisText", void 0);
    CheckboxComponent = __decorate([
        Component({
            selector: 'pa-checkbox',
            template: "<div class=\"pa-field\"\n     [class.pa-field-checkbox]=\"type === 'checkbox'\"\n     [class.pa-field-radio]=\"type === 'radio'\">\n\n    <pa-icon *ngIf=\"!!_icon\" [icon]=\"_icon\" small class=\"pa-icon-block\"></pa-icon>\n    <input class=\"pa-field-control\"\n           [tabindex]=\"_noFocus ? -1 : null\"\n           [class.pa-square-check]=\"_squareCheck\"\n           [type]=\"type\"\n           [id]=\"_id\"\n           [name]=\"name\"\n           [attr.aria-describedby]=\"helpId\"\n           [checked]=\"_selected\"\n           [attr.aria-checked]=\"_selected\"\n           [disabled]=\"_disabled\"\n           [indeterminate]=\"_indeterminate\"\n           (change)=\"toggleCheckbox()\">\n    <label [ngStyle]=\"extraStyle\"\n           class=\"pa-field-label pa-ellipsis\"\n           [class.pa-field-with-help]=\"!!help\"\n           [class.pa-field-with-icon]=\"!!_icon\"\n           [for]=\"_id\"\n           [paTooltip]=\"hasEllipsis ? tooltipText : null\">\n        <span translate class=\"pa-ellipsis-text\"\n              #ellipsisText\n              [class.pa-sr]=\"_labelHidden\">\n            <pa-icon *ngIf=\"!!_iconName\" [name]=\"_iconName\"></pa-icon>\n            <ng-content></ng-content>\n            <small *ngIf=\"subLabel\">{{ subLabel }}</small>\n            <pa-icon *ngFor=\"let icon of labelIcons\"\n                     [name]=\"icon.name\"\n                     [paTooltip]=\"icon.tooltip | translate\"\n                     class=\"pa-label-icon\"></pa-icon>\n        </span>\n    </label>\n\n    <small *ngIf=\"help\" class=\"pa-field-help pa-ellipsis-text\"\n           [class.pa-field-with-icon]=\"!!_icon\"\n           [class.pa-sr]=\"_labelHidden\" [id]=\"helpId\" translate>{{help}}</small>\n</div>\n\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".pa-field{position:relative}.pa-field pa-icon.pa-icon-block{position:absolute;top:-1px;left:1.5rem}.pa-field-control[type=checkbox]+.pa-field-label,.pa-field-control[type=radio]+.pa-field-label{height:1.125rem}.pa-field-control[type=checkbox]+.pa-field-label small,.pa-field-control[type=radio]+.pa-field-label small{color:#535353;margin-left:.375rem}.pa-field-control[type=checkbox]+.pa-field-label pa-icon.pa-label-icon ::ng-deep svg,.pa-field-control[type=radio]+.pa-field-label pa-icon.pa-label-icon ::ng-deep svg{fill:#3a3a3a;height:.75rem!important;width:.75rem!important;margin:0 0 -1px .375rem!important}.pa-field-control[type=checkbox]+.pa-field-label.pa-field-with-icon>span,.pa-field-control[type=radio]+.pa-field-label.pa-field-with-icon>span{margin-left:3rem!important}.pa-field-control[type=checkbox]:disabled+.pa-field-label pa-icon.pa-label-icon ::ng-deep svg,.pa-field-control[type=radio]:disabled+.pa-field-label pa-icon.pa-label-icon ::ng-deep svg{fill:#b8c6c8!important}.pa-field-control[type=checkbox]~.pa-field-help,.pa-field-control[type=radio]~.pa-field-help{margin-left:1.875rem}.pa-field-control[type=checkbox]~.pa-field-help.pa-field-with-icon,.pa-field-control[type=checkbox]~.pa-field-help.pa-icon,.pa-field-control[type=radio]~.pa-field-help.pa-field-with-icon,.pa-field-control[type=radio]~.pa-field-help.pa-icon{margin-left:3rem!important}"]
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef,
            ElementRef])
    ], CheckboxComponent);
    return CheckboxComponent;
}());
export { CheckboxComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGd1aWxsb3RpbmF3ZWIvcGFzdGFuYWdhLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvY29udHJvbHMvY2hlY2tib3gvY2hlY2tib3guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsYUFBYSxFQUNiLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBQ04sTUFBTSxFQUNOLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsaUJBQWlCLEdBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxhQUFhLEVBQVEsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHdkUsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBUWY7SUE0Q0ksMkJBQ1ksR0FBc0IsRUFDdkIsT0FBbUI7UUFEbEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDdkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQTVDckIsU0FBSSxHQUF5QixVQUFVLENBQUM7UUFtQnZDLGNBQVMsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNoRSx5REFBeUQ7UUFDL0MsbUJBQWMsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUtyRSxRQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ1QsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUdmLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixlQUFVLEdBQThC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O0lBQ3hDO1FBQVIsS0FBSyxFQUFFOzttREFBZTtJQUNkO1FBQVIsS0FBSyxFQUFFOzs7aURBTVA7SUFDUTtRQUFSLEtBQUssRUFBRTs7bURBQWU7SUFDZDtRQUFSLEtBQUssRUFBRTs7dURBQW1CO0lBQ2xCO1FBQVIsS0FBSyxFQUFFOzt5REFBMEI7SUFDekI7UUFBUixLQUFLLEVBQUU7OztxREFBdUU7SUFDdEU7UUFBUixLQUFLLEVBQUU7OztxREFBdUU7SUFDdEU7UUFBUixLQUFLLEVBQUU7OzswREFBaUY7SUFDaEY7UUFBUixLQUFLLEVBQUU7Ozt3REFBNkU7SUFDNUU7UUFBUixLQUFLLEVBQUU7OztvREFBcUU7SUFDcEU7UUFBUixLQUFLLEVBQUU7Ozt3REFBNkU7SUFFM0U7UUFBVCxNQUFNLEVBQUU7a0NBQVksWUFBWTt3REFBK0I7SUFFdEQ7UUFBVCxNQUFNLEVBQUU7a0NBQWlCLFlBQVk7NkRBQStCO0lBRWxEO1FBQWxCLFNBQVMsQ0FBQyxNQUFNLENBQUM7a0NBQWUsVUFBVTswREFBQztJQUNDO1FBQTVDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7a0NBQWdCLFVBQVU7MkRBQUM7SUExQjlELGlCQUFpQjtRQU43QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsYUFBYTtZQUN2QixndURBQXdDO1lBRXhDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztTQUNoRCxDQUFDO3lDQThDbUIsaUJBQWlCO1lBQ2QsVUFBVTtPQTlDckIsaUJBQWlCLENBdUc3QjtJQUFELHdCQUFDO0NBQUEsQUF2R0QsSUF1R0M7U0F2R1ksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFZpZXdDaGlsZCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgZGV0ZWN0Q2hhbmdlcywgSWNvbiwgbWFya0ZvckNoZWNrIH0gZnJvbSAnLi4vLi4vY29tbW9uL3V0aWxzJztcbmltcG9ydCB7IExhYmVsSWNvbiB9IGZyb20gJy4uL2NvbnRyb2wubW9kZWwnO1xuXG5sZXQgbmV4dElkID0gMDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncGEtY2hlY2tib3gnLFxuICB0ZW1wbGF0ZVVybDogJy4vY2hlY2tib3guY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jaGVja2JveC5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tib3hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuICAgIEBJbnB1dCgpIGlkPzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHR5cGU6ICdjaGVja2JveCcgfCAncmFkaW8nID0gJ2NoZWNrYm94JztcbiAgICBASW5wdXQoKSBoZWxwPzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHNldCBpY29uKHZhbHVlOiBzdHJpbmcgfCBJY29uKSB7XG4gICAgICAgIGlmICghIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuX2ljb25OYW1lID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9pY29uID0gdmFsdWUgYXMgSWNvbjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBASW5wdXQoKSBuYW1lPzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHN1YkxhYmVsPzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGxhYmVsSWNvbnM/OiBMYWJlbEljb25bXTtcbiAgICBASW5wdXQoKSBzZXQgZGlzYWJsZWQodmFsdWUpIHsgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gICAgQElucHV0KCkgc2V0IHNlbGVjdGVkKHZhbHVlKSB7IHRoaXMuX3NlbGVjdGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICAgIEBJbnB1dCgpIHNldCBpbmRldGVybWluYXRlKHZhbHVlKSB7IHRoaXMuX2luZGV0ZXJtaW5hdGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gICAgQElucHV0KCkgc2V0IGxhYmVsSGlkZGVuKHZhbHVlKSB7IHRoaXMuX2xhYmVsSGlkZGVuID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICAgIEBJbnB1dCgpIHNldCBub0ZvY3VzKHZhbHVlKSB7IHRoaXMuX25vRm9jdXMgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gICAgQElucHV0KCkgc2V0IHNxdWFyZUNoZWNrKHZhbHVlKSB7IHRoaXMuX3NxdWFyZUNoZWNrID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuXG4gICAgQE91dHB1dCgpIHNlbGVjdGlvbjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIC8vIHRoZSBmb2xsb3dpbmcgRXZlbnRFbWl0dGVycyBhbGxvdyB0d28gd2F5IGRhdGEtYmluZGluZ1xuICAgIEBPdXRwdXQoKSBzZWxlY3RlZENoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZCgndGV4dCcpIHRleHRFbGVtZW50PzogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCdlbGxpcHNpc1RleHQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBlbGxpcHNpc1RleHQ/OiBFbGVtZW50UmVmO1xuXG4gICAgX2lkID0gJyc7XG4gICAgX25vRm9jdXMgPSBmYWxzZTtcbiAgICBfaW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xuICAgIF9kaXNhYmxlZCA9IGZhbHNlO1xuICAgIF9zZWxlY3RlZCA9IGZhbHNlO1xuICAgIF9zcXVhcmVDaGVjayA9IGZhbHNlO1xuICAgIF9sYWJlbEhpZGRlbiA9IGZhbHNlO1xuICAgIF9pY29uTmFtZSA9ICcnO1xuICAgIF9pY29uPzogSWNvbjtcblxuICAgIGhlbHBJZCA9ICcnO1xuICAgIGV4dHJhU3R5bGU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcbiAgICBoYXNFbGxpcHNpcyA9IGZhbHNlO1xuICAgIHRvb2x0aXBUZXh0ID0gJyc7XG4gICAgaGFzRXh0cmFXaWR0aCA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuX2lkID0gdGhpcy5pZCA/IHRoaXMuaWQgOiBgZmllbGQtJHt0aGlzLnR5cGV9LSR7bmV4dElkKyt9YDtcbiAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5uYW1lIHx8IHRoaXMuX2lkO1xuICAgICAgICB0aGlzLmhlbHBJZCA9IGAke3RoaXMuX2lkfS1oZWxwYDtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zZXRMYWJlbE1heFdpZHRoKCkpO1xuICAgIH1cblxuICAgIHRvZ2dsZUNoZWNrYm94KCkge1xuICAgICAgICAvLyByYWRpbyBjYW4ndCBiZSB1bmNoZWNrZWQgYnkgY2xpY2tpbmcgb24gaXRzZWxmXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdjaGVja2JveCcgfHwgIXRoaXMuX3NlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZCA9ICF0aGlzLl9zZWxlY3RlZDtcbiAgICAgICAgfVxuICAgICAgICBtYXJrRm9yQ2hlY2sodGhpcy5jZHIpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQodGhpcy5fc2VsZWN0ZWQpO1xuICAgICAgICB0aGlzLnNlbGVjdGlvbi5lbWl0KHRoaXMuX3NlbGVjdGVkKTtcbiAgICB9XG5cbiAgICBzZXRMYWJlbE1heFdpZHRoKGV4dHJhV2lkdGg/OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKCEhZXh0cmFXaWR0aCkge1xuICAgICAgICAgICAgdGhpcy5oYXNFeHRyYVdpZHRoID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5oYXNFeHRyYVdpZHRoICYmICFleHRyYVdpZHRoKSB7XG4gICAgICAgICAgICAvLyBwcmV2ZW50IGNoZWNrYm94IGlubmVyIGNhbGwgdG8gb3ZlcndyaXRlIHN0eWxlIHdpdGggZXh0cmEgd2lkdGggY29taW5nIGZyb20gcGFyZW50XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgaWYgKCEhcGFyZW50KSB7XG4gICAgICAgICAgICBjb25zdCBwYXJlbnRXaWR0aCA9IHBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgICAgICAgIGxldCBtYXhXaWR0aCA9IHBhcmVudFdpZHRoIC0gMjQ7XG4gICAgICAgICAgICBpZiAoISFleHRyYVdpZHRoKSB7XG4gICAgICAgICAgICAgICAgbWF4V2lkdGggPSBtYXhXaWR0aCAtIGV4dHJhV2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmV4dHJhU3R5bGUgPSB7J21heC13aWR0aCc6IGAke21heFdpZHRofXB4YH07XG4gICAgICAgICAgICB0aGlzLnNldEVsbGlwc2lzKCk7XG4gICAgICAgICAgICBkZXRlY3RDaGFuZ2VzKHRoaXMuY2RyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEVsbGlwc2lzKCkge1xuICAgICAgICBpZiAoISF0aGlzLmVsbGlwc2lzVGV4dCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9sYWJlbEhpZGRlbikge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFzRWxsaXBzaXMgPSB0aGlzLmVsbGlwc2lzVGV4dC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIDwgdGhpcy5lbGxpcHNpc1RleHQubmF0aXZlRWxlbWVudC5zY3JvbGxXaWR0aDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYXNFbGxpcHNpcyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzRWxsaXBzaXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2x0aXBUZXh0ID0gdGhpcy5lbGxpcHNpc1RleHQubmF0aXZlRWxlbWVudC5pbm5lclRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZGV0ZWN0Q2hhbmdlcyh0aGlzLmNkcik7XG4gICAgfVxufVxuIl19