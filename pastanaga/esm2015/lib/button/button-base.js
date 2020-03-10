import { __decorate, __metadata } from "tslib";
import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, HostBinding, Input, Output, ViewChild, ViewRef, Directive } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
const COLORS = ['primary', 'secondary', 'destructive', 'contrast'];
const SIZES = ['tiny', 'small', 'large'];
let ButtonBase = class ButtonBase {
    constructor(changeDetector) {
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
    set color(value) {
        if (!!value) {
            const buttonStyles = Object.assign({}, this.buttonStyle);
            COLORS.forEach(color => {
                const colorClass = this.getClassFromInput('color', color, COLORS);
                buttonStyles[colorClass] = color === value;
            });
            this.buttonStyle = buttonStyles;
        }
    }
    set size(value) {
        if (!!value) {
            const buttonStyles = Object.assign({}, this.buttonStyle);
            SIZES.forEach(size => {
                const sizeClass = this.getClassFromInput('size', size, SIZES);
                buttonStyles[sizeClass] = size === value;
            });
            this.buttonStyle = buttonStyles;
        }
    }
    set border(value) {
        this.buttonStyle['pa-button-accent'] = coerceBooleanProperty(value);
    }
    set disabled(value) {
        this.isDisabled = coerceBooleanProperty(value);
    }
    set active(value) {
        this.buttonStyle['active'] = coerceBooleanProperty(value);
    }
    set type(value) {
        if (!!value && ['button', 'submit', 'reset'].indexOf(value) !== -1) {
            this.checkedType = value;
        }
    }
    get iconAndText() {
        return this._iconAndText;
    }
    set iconAndText(value) {
        this._iconAndText = coerceBooleanProperty(value);
    }
    ngAfterContentInit() {
        setTimeout(() => {
            if (!!this.textElement && !this.ariaLabel && !!this.changeDetector && !this.changeDetector.destroyed) {
                this.ariaLabel = this.textElement.nativeElement.textContent.trim();
                this.changeDetector.detectChanges();
            }
        }, 0);
    }
    getClassFromInput(property, value, possibleValues) {
        if (possibleValues.indexOf(value) === -1) {
            console.error(`Invalid ${property}: ${value}. Possible values: ${possibleValues.join(', ')}.`);
            return '';
        }
        return this.getButtonClass(value);
    }
    getButtonClass(value) {
        return `pa-button-${value}`;
    }
    get disablePointerEvent() {
        return this.isDisabled ? 'none' : '';
    }
};
ButtonBase.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
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
export { ButtonBase };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWJhc2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ3VpbGxvdGluYXdlYi9wYXN0YW5hZ2EtYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi9idXR0b24vYnV0dG9uLWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pKLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTlELE1BQU0sTUFBTSxHQUFHLENBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDbkUsTUFBTSxLQUFLLEdBQUcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBR3pDLElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVU7SUFzRW5CLFlBQXNCLGNBQWlDO1FBQWpDLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQXRDOUMsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLFNBQUksR0FBRyxFQUFFLENBQUM7UUFNVixpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUNsQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQVNwQixhQUFRLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUM7UUFJL0QsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsZ0JBQVcsR0FBRyxRQUFRLENBQUM7UUFFdkIsZ0JBQVcsR0FBRztZQUNWLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLG1CQUFtQixFQUFFLElBQUk7WUFDekIscUJBQXFCLEVBQUUsS0FBSztZQUM1Qix1QkFBdUIsRUFBRSxLQUFLO1lBQzlCLG9CQUFvQixFQUFFLEtBQUs7WUFDM0IsaUJBQWlCLEVBQUUsS0FBSztZQUN4Qixp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OEJBQ0YsTUFBTTs7cURBRXZDO0FBbEdRLFVBQVU7SUFEdEIsU0FBUyxFQUFFO3FDQXVFOEIsaUJBQWlCO0dBdEU5QyxVQUFVLENBbUd0QjtTQW5HWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZCwgVmlld1JlZiwgRGlyZWN0aXZlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuXG5jb25zdCBDT0xPUlMgPSBbJ3ByaW1hcnknLCAnc2Vjb25kYXJ5JywgJ2Rlc3RydWN0aXZlJywgJ2NvbnRyYXN0J107XG5jb25zdCBTSVpFUyA9IFsndGlueScsICdzbWFsbCcsICdsYXJnZSddO1xuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBCdXR0b25CYXNlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gICAgQElucHV0KCkgc2V0IGNvbG9yKHZhbHVlOiAncHJpbWFyeScgfCAnc2Vjb25kYXJ5JyB8ICdkZXN0cnVjdGl2ZScgfCAnY29udHJhc3QnKSB7XG4gICAgICAgIGlmICghIXZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBidXR0b25TdHlsZXMgPSB7Li4udGhpcy5idXR0b25TdHlsZX07XG4gICAgICAgICAgICBDT0xPUlMuZm9yRWFjaChjb2xvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sb3JDbGFzcyA9IHRoaXMuZ2V0Q2xhc3NGcm9tSW5wdXQoJ2NvbG9yJywgY29sb3IsIENPTE9SUyk7XG4gICAgICAgICAgICAgICAgYnV0dG9uU3R5bGVzW2NvbG9yQ2xhc3NdID0gY29sb3IgPT09IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvblN0eWxlID0gYnV0dG9uU3R5bGVzO1xuICAgICAgICB9XG4gICAgfVxuICAgIEBJbnB1dCgpIHNldCBzaXplKHZhbHVlOiAndGlueScgfCAnc21hbGwnIHwgJ2xhcmdlJyB8ICcnKSB7XG4gICAgICAgIGlmICghIXZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBidXR0b25TdHlsZXMgPSB7Li4udGhpcy5idXR0b25TdHlsZX07XG4gICAgICAgICAgICBTSVpFUy5mb3JFYWNoKHNpemUgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNpemVDbGFzcyA9IHRoaXMuZ2V0Q2xhc3NGcm9tSW5wdXQoJ3NpemUnLCBzaXplLCBTSVpFUyk7XG4gICAgICAgICAgICAgICAgYnV0dG9uU3R5bGVzW3NpemVDbGFzc10gPSBzaXplID09PSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5idXR0b25TdHlsZSA9IGJ1dHRvblN0eWxlcztcbiAgICAgICAgfVxuICAgIH1cbiAgICBASW5wdXQoKSBzZXQgYm9yZGVyKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuYnV0dG9uU3R5bGVbJ3BhLWJ1dHRvbi1hY2NlbnQnXSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgQElucHV0KCkgc2V0IGRpc2FibGVkKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuaXNEaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgQElucHV0KCkgc2V0IGFjdGl2ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLmJ1dHRvblN0eWxlWydhY3RpdmUnXSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuICAgIEBJbnB1dCgpIGFyaWFMYWJlbCA9ICcnO1xuICAgIEBJbnB1dCgpIGljb24gPSAnJztcbiAgICBASW5wdXQoKSBzZXQgdHlwZSh2YWx1ZSkge1xuICAgICAgICBpZiAoISF2YWx1ZSAmJiBbJ2J1dHRvbicsICdzdWJtaXQnLCAncmVzZXQnXS5pbmRleE9mKHZhbHVlKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tlZFR5cGUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBASW5wdXQoKSBhcmlhQ29udHJvbHMgPSAnJztcbiAgICBASW5wdXQoKSBhcmlhRXhwYW5kZWQgPSBmYWxzZTtcbiAgICBASW5wdXQoKVxuICAgIGdldCBpY29uQW5kVGV4dCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ljb25BbmRUZXh0O1xuICAgIH1cbiAgICBzZXQgaWNvbkFuZFRleHQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5faWNvbkFuZFRleHQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIEBPdXRwdXQoKSBoYXNGb2N1czogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZCgndGV4dCcpIHRleHRFbGVtZW50PzogRWxlbWVudFJlZjtcblxuICAgIF9pY29uQW5kVGV4dCA9IGZhbHNlO1xuICAgIGNoZWNrZWRUeXBlID0gJ2J1dHRvbic7XG5cbiAgICBidXR0b25TdHlsZSA9IHtcbiAgICAgICAgJ3BhLWJ1dHRvbic6IHRydWUsXG4gICAgICAgICdwYS1idXR0b24tcHJpbWFyeSc6IHRydWUsXG4gICAgICAgICdwYS1idXR0b24tc2Vjb25kYXJ5JzogZmFsc2UsXG4gICAgICAgICdwYS1idXR0b24tZGVzdHJ1Y3RpdmUnOiBmYWxzZSxcbiAgICAgICAgJ3BhLWJ1dHRvbi1jb250cmFzdCc6IGZhbHNlLFxuICAgICAgICAncGEtYnV0dG9uLXNtYWxsJzogZmFsc2UsXG4gICAgICAgICdwYS1idXR0b24tbGFyZ2UnOiBmYWxzZSxcbiAgICAgICAgJ3BhLWJ1dHRvbi1hY2NlbnQnOiBmYWxzZSxcbiAgICAgICAgJ3BhLWJ1dHRvbi1saW5rJzogZmFsc2UsXG4gICAgICAgICdhY3RpdmUnOiBmYWxzZSxcbiAgICB9O1xuICAgIGlzRGlzYWJsZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCEhdGhpcy50ZXh0RWxlbWVudCAmJiAhdGhpcy5hcmlhTGFiZWwgJiYgISF0aGlzLmNoYW5nZURldGVjdG9yICYmICEodGhpcy5jaGFuZ2VEZXRlY3RvciBhcyBWaWV3UmVmKS5kZXN0cm95ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFyaWFMYWJlbCA9IHRoaXMudGV4dEVsZW1lbnQubmF0aXZlRWxlbWVudC50ZXh0Q29udGVudC50cmltKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDApO1xuICAgIH1cblxuICAgIGdldENsYXNzRnJvbUlucHV0KHByb3BlcnR5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIHBvc3NpYmxlVmFsdWVzOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gICAgICAgIGlmIChwb3NzaWJsZVZhbHVlcy5pbmRleE9mKHZhbHVlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEludmFsaWQgJHtwcm9wZXJ0eX06ICR7dmFsdWV9LiBQb3NzaWJsZSB2YWx1ZXM6ICR7cG9zc2libGVWYWx1ZXMuam9pbignLCAnKX0uYCk7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5nZXRCdXR0b25DbGFzcyh2YWx1ZSk7XG4gICAgfVxuXG4gICAgZ2V0QnV0dG9uQ2xhc3ModmFsdWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gYHBhLWJ1dHRvbi0ke3ZhbHVlfWA7XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKCdzdHlsZS5wb2ludGVyLWV2ZW50cycpXG4gICAgcHVibGljIGdldCBkaXNhYmxlUG9pbnRlckV2ZW50KCk6IFN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzRGlzYWJsZWQgPyAnbm9uZScgOiAnJztcbiAgICB9XG59XG4iXX0=