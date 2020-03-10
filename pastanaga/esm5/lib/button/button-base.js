import { __assign, __decorate, __metadata } from "tslib";
import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, HostBinding, Input, Output, ViewChild, ViewRef, Directive } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
var COLORS = ['primary', 'secondary', 'destructive', 'contrast'];
var SIZES = ['tiny', 'small', 'large'];
var ButtonBase = /** @class */ (function () {
    function ButtonBase(changeDetector) {
        this.changeDetector = changeDetector;
        this.ariaLabel = '';
        this.icon = '';
        this.ariaControls = '';
        this.ariaExpanded = false;
        this.hasFocus = new EventEmitter();
        this._iconAndText = false;
        this.checkedType = 'button';
        this.buttonStyle = {
            'pa-button': true,
            'pa-button-primary': true,
            'pa-button-secondary': false,
            'pa-button-destructive': false,
            'pa-button-contrast': false,
            'pa-button-small': false,
            'pa-button-large': false,
            'pa-button-accent': false,
            'pa-button-link': false,
            'active': false,
        };
        this.isDisabled = false;
    }
    Object.defineProperty(ButtonBase.prototype, "color", {
        set: function (value) {
            var _this = this;
            if (!!value) {
                var buttonStyles_1 = __assign({}, this.buttonStyle);
                COLORS.forEach(function (color) {
                    var colorClass = _this.getClassFromInput('color', color, COLORS);
                    buttonStyles_1[colorClass] = color === value;
                });
                this.buttonStyle = buttonStyles_1;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonBase.prototype, "size", {
        set: function (value) {
            var _this = this;
            if (!!value) {
                var buttonStyles_2 = __assign({}, this.buttonStyle);
                SIZES.forEach(function (size) {
                    var sizeClass = _this.getClassFromInput('size', size, SIZES);
                    buttonStyles_2[sizeClass] = size === value;
                });
                this.buttonStyle = buttonStyles_2;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonBase.prototype, "border", {
        set: function (value) {
            this.buttonStyle['pa-button-accent'] = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonBase.prototype, "disabled", {
        set: function (value) {
            this.isDisabled = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonBase.prototype, "active", {
        set: function (value) {
            this.buttonStyle['active'] = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonBase.prototype, "type", {
        set: function (value) {
            if (!!value && ['button', 'submit', 'reset'].indexOf(value) !== -1) {
                this.checkedType = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonBase.prototype, "iconAndText", {
        get: function () {
            return this._iconAndText;
        },
        set: function (value) {
            this._iconAndText = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    ButtonBase.prototype.ngAfterContentInit = function () {
        var _this = this;
        setTimeout(function () {
            if (!!_this.textElement && !_this.ariaLabel && !!_this.changeDetector && !_this.changeDetector.destroyed) {
                _this.ariaLabel = _this.textElement.nativeElement.textContent.trim();
                _this.changeDetector.detectChanges();
            }
        }, 0);
    };
    ButtonBase.prototype.getClassFromInput = function (property, value, possibleValues) {
        if (possibleValues.indexOf(value) === -1) {
            console.error("Invalid " + property + ": " + value + ". Possible values: " + possibleValues.join(', ') + ".");
            return '';
        }
        return this.getButtonClass(value);
    };
    ButtonBase.prototype.getButtonClass = function (value) {
        return "pa-button-" + value;
    };
    Object.defineProperty(ButtonBase.prototype, "disablePointerEvent", {
        get: function () {
            return this.isDisabled ? 'none' : '';
        },
        enumerable: true,
        configurable: true
    });
    ButtonBase.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], ButtonBase.prototype, "color", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], ButtonBase.prototype, "size", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ButtonBase.prototype, "border", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ButtonBase.prototype, "disabled", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ButtonBase.prototype, "active", null);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ButtonBase.prototype, "ariaLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ButtonBase.prototype, "icon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ButtonBase.prototype, "type", null);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ButtonBase.prototype, "ariaControls", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ButtonBase.prototype, "ariaExpanded", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], ButtonBase.prototype, "iconAndText", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ButtonBase.prototype, "hasFocus", void 0);
    __decorate([
        ViewChild('text'),
        __metadata("design:type", ElementRef)
    ], ButtonBase.prototype, "textElement", void 0);
    __decorate([
        HostBinding('style.pointer-events'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], ButtonBase.prototype, "disablePointerEvent", null);
    ButtonBase = __decorate([
        Directive(),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], ButtonBase);
    return ButtonBase;
}());
export { ButtonBase };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWJhc2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ3VpbGxvdGluYXdlYi9wYXN0YW5hZ2EtYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi9idXR0b24vYnV0dG9uLWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pKLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTlELElBQU0sTUFBTSxHQUFHLENBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDbkUsSUFBTSxLQUFLLEdBQUcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBR3pDO0lBc0VJLG9CQUFzQixjQUFpQztRQUFqQyxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUF0QzlDLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZixTQUFJLEdBQUcsRUFBRSxDQUFDO1FBTVYsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFDbEIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFTcEIsYUFBUSxHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBSS9ELGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGdCQUFXLEdBQUcsUUFBUSxDQUFDO1FBRXZCLGdCQUFXLEdBQUc7WUFDVixXQUFXLEVBQUUsSUFBSTtZQUNqQixtQkFBbUIsRUFBRSxJQUFJO1lBQ3pCLHFCQUFxQixFQUFFLEtBQUs7WUFDNUIsdUJBQXVCLEVBQUUsS0FBSztZQUM5QixvQkFBb0IsRUFBRSxLQUFLO1lBQzNCLGlCQUFpQixFQUFFLEtBQUs7WUFDeEIsaUJBQWlCLEVBQUUsS0FBSztZQUN4QixrQkFB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O2tDQUFXLFlBQVk7Z0RBQStCO0lBRTVDO1FBQWxCLFNBQVMsQ0FBQyxNQUFNLENBQUM7a0NBQWUsVUFBVTttREFBQztJQTZDNUM7UUFEQyxXQUFXLENBQUMsc0JBQXNCLENBQUM7a0NBQ0YsTUFBTTs7eURBRXZDO0lBbEdRLFVBQVU7UUFEdEIsU0FBUyxFQUFFO3lDQXVFOEIsaUJBQWlCO09BdEU5QyxVQUFVLENBbUd0QjtJQUFELGlCQUFDO0NBQUEsQUFuR0QsSUFtR0M7U0FuR1ksVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENoYW5nZURldGVjdG9yUmVmLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQsIFZpZXdSZWYsIERpcmVjdGl2ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcblxuY29uc3QgQ09MT1JTID0gWydwcmltYXJ5JywgJ3NlY29uZGFyeScsICdkZXN0cnVjdGl2ZScsICdjb250cmFzdCddO1xuY29uc3QgU0laRVMgPSBbJ3RpbnknLCAnc21hbGwnLCAnbGFyZ2UnXTtcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgQnV0dG9uQmFzZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAgIEBJbnB1dCgpIHNldCBjb2xvcih2YWx1ZTogJ3ByaW1hcnknIHwgJ3NlY29uZGFyeScgfCAnZGVzdHJ1Y3RpdmUnIHwgJ2NvbnRyYXN0Jykge1xuICAgICAgICBpZiAoISF2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uU3R5bGVzID0gey4uLnRoaXMuYnV0dG9uU3R5bGV9O1xuICAgICAgICAgICAgQ09MT1JTLmZvckVhY2goY29sb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yQ2xhc3MgPSB0aGlzLmdldENsYXNzRnJvbUlucHV0KCdjb2xvcicsIGNvbG9yLCBDT0xPUlMpO1xuICAgICAgICAgICAgICAgIGJ1dHRvblN0eWxlc1tjb2xvckNsYXNzXSA9IGNvbG9yID09PSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5idXR0b25TdHlsZSA9IGJ1dHRvblN0eWxlcztcbiAgICAgICAgfVxuICAgIH1cbiAgICBASW5wdXQoKSBzZXQgc2l6ZSh2YWx1ZTogJ3RpbnknIHwgJ3NtYWxsJyB8ICdsYXJnZScgfCAnJykge1xuICAgICAgICBpZiAoISF2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uU3R5bGVzID0gey4uLnRoaXMuYnV0dG9uU3R5bGV9O1xuICAgICAgICAgICAgU0laRVMuZm9yRWFjaChzaXplID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzaXplQ2xhc3MgPSB0aGlzLmdldENsYXNzRnJvbUlucHV0KCdzaXplJywgc2l6ZSwgU0laRVMpO1xuICAgICAgICAgICAgICAgIGJ1dHRvblN0eWxlc1tzaXplQ2xhc3NdID0gc2l6ZSA9PT0gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uU3R5bGUgPSBidXR0b25TdHlsZXM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQElucHV0KCkgc2V0IGJvcmRlcih2YWx1ZSkge1xuICAgICAgICB0aGlzLmJ1dHRvblN0eWxlWydwYS1idXR0b24tYWNjZW50J10gPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIHNldCBkaXNhYmxlZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLmlzRGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIHNldCBhY3RpdmUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5idXR0b25TdHlsZVsnYWN0aXZlJ10gPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cbiAgICBASW5wdXQoKSBhcmlhTGFiZWwgPSAnJztcbiAgICBASW5wdXQoKSBpY29uID0gJyc7XG4gICAgQElucHV0KCkgc2V0IHR5cGUodmFsdWUpIHtcbiAgICAgICAgaWYgKCEhdmFsdWUgJiYgWydidXR0b24nLCAnc3VibWl0JywgJ3Jlc2V0J10uaW5kZXhPZih2YWx1ZSkgIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrZWRUeXBlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQElucHV0KCkgYXJpYUNvbnRyb2xzID0gJyc7XG4gICAgQElucHV0KCkgYXJpYUV4cGFuZGVkID0gZmFsc2U7XG4gICAgQElucHV0KClcbiAgICBnZXQgaWNvbkFuZFRleHQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pY29uQW5kVGV4dDtcbiAgICB9XG4gICAgc2V0IGljb25BbmRUZXh0KHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2ljb25BbmRUZXh0ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBAT3V0cHV0KCkgaGFzRm9jdXM6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBWaWV3Q2hpbGQoJ3RleHQnKSB0ZXh0RWxlbWVudD86IEVsZW1lbnRSZWY7XG5cbiAgICBfaWNvbkFuZFRleHQgPSBmYWxzZTtcbiAgICBjaGVja2VkVHlwZSA9ICdidXR0b24nO1xuXG4gICAgYnV0dG9uU3R5bGUgPSB7XG4gICAgICAgICdwYS1idXR0b24nOiB0cnVlLFxuICAgICAgICAncGEtYnV0dG9uLXByaW1hcnknOiB0cnVlLFxuICAgICAgICAncGEtYnV0dG9uLXNlY29uZGFyeSc6IGZhbHNlLFxuICAgICAgICAncGEtYnV0dG9uLWRlc3RydWN0aXZlJzogZmFsc2UsXG4gICAgICAgICdwYS1idXR0b24tY29udHJhc3QnOiBmYWxzZSxcbiAgICAgICAgJ3BhLWJ1dHRvbi1zbWFsbCc6IGZhbHNlLFxuICAgICAgICAncGEtYnV0dG9uLWxhcmdlJzogZmFsc2UsXG4gICAgICAgICdwYS1idXR0b24tYWNjZW50JzogZmFsc2UsXG4gICAgICAgICdwYS1idXR0b24tbGluayc6IGZhbHNlLFxuICAgICAgICAnYWN0aXZlJzogZmFsc2UsXG4gICAgfTtcbiAgICBpc0Rpc2FibGVkID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICghIXRoaXMudGV4dEVsZW1lbnQgJiYgIXRoaXMuYXJpYUxhYmVsICYmICEhdGhpcy5jaGFuZ2VEZXRlY3RvciAmJiAhKHRoaXMuY2hhbmdlRGV0ZWN0b3IgYXMgVmlld1JlZikuZGVzdHJveWVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcmlhTGFiZWwgPSB0aGlzLnRleHRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGV4dENvbnRlbnQudHJpbSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAwKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc0Zyb21JbnB1dChwcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBwb3NzaWJsZVZhbHVlczogc3RyaW5nW10pOiBzdHJpbmcge1xuICAgICAgICBpZiAocG9zc2libGVWYWx1ZXMuaW5kZXhPZih2YWx1ZSkgPT09IC0xKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBJbnZhbGlkICR7cHJvcGVydHl9OiAke3ZhbHVlfS4gUG9zc2libGUgdmFsdWVzOiAke3Bvc3NpYmxlVmFsdWVzLmpvaW4oJywgJyl9LmApO1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QnV0dG9uQ2xhc3ModmFsdWUpO1xuICAgIH1cblxuICAgIGdldEJ1dHRvbkNsYXNzKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGBwYS1idXR0b24tJHt2YWx1ZX1gO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZygnc3R5bGUucG9pbnRlci1ldmVudHMnKVxuICAgIHB1YmxpYyBnZXQgZGlzYWJsZVBvaW50ZXJFdmVudCgpOiBTdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0Rpc2FibGVkID8gJ25vbmUnIDogJyc7XG4gICAgfVxufVxuIl19