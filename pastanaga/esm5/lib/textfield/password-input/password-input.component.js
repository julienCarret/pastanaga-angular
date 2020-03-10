import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { PasswordRule } from './password-rule';
var rulesRegexp = {
    lowerCase: new RegExp(/[a-z]/),
    upperCase: new RegExp(/[A-Z]/),
    number: new RegExp(/[0-9]/),
    specialCharacter: new RegExp(/[^\da-zA-Z]/),
};
var PasswordInputComponent = /** @class */ (function () {
    function PasswordInputComponent() {
        this.id = '';
        this.placeholder = '';
        this._withRules = false;
        this._required = false;
        this._disabled = false;
        this.valueChange = new EventEmitter();
        this.password = '';
        this.errorMessage = '';
        this.iconName = 'show';
        this.isVisible = false;
        this.type = 'password';
        this.rules = [
            new PasswordRule({ id: 'length', length: 10, label: 'password-input.rule-list.length' }),
            new PasswordRule({ id: 'upper', regexp: rulesRegexp.upperCase, label: 'password-input.rule-list.upper' }),
            new PasswordRule({ id: 'lower', regexp: rulesRegexp.lowerCase, label: 'password-input.rule-list.lower' }),
            new PasswordRule({ id: 'number', regexp: rulesRegexp.number, label: 'password-input.rule-list.number' }),
            new PasswordRule({ id: 'special', regexp: rulesRegexp.specialCharacter, label: 'password-input.rule-list.special' }),
        ];
        this.debounceEmitter = 0;
    }
    Object.defineProperty(PasswordInputComponent.prototype, "value", {
        set: function (value) {
            if (!!value) {
                this.password = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PasswordInputComponent.prototype, "withRules", {
        get: function () { return this._withRules; },
        set: function (value) { this._withRules = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PasswordInputComponent.prototype, "required", {
        get: function () { return this._required; },
        set: function (value) { this._required = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PasswordInputComponent.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    PasswordInputComponent.prototype.togglePasswordVisibility = function () {
        this.isVisible = !this.isVisible;
        this.iconName = this.isVisible ? 'hide' : 'show';
        this.type = this.isVisible ? 'text' : 'password';
    };
    /**
     * rules:
     *  - at least 10 characters
     *  - at least 1 lowercase
     *  - at least 1 uppercase
     *  - at least 1 number
     *  - at least 1 special character
     */
    PasswordInputComponent.prototype.checkPasswordStrength = function ($event) {
        var _this = this;
        if (!$event.target) {
            return;
        }
        if (this.debounceEmitter) {
            clearInterval(this.debounceEmitter);
        }
        var password = $event.target.value;
        var allValid = true;
        this.errorMessage = '';
        if (this._withRules) {
            this.rules.forEach(function (rule) {
                if (typeof rule.length === 'number') {
                    rule.isValid = password.length >= rule.length;
                }
                else if (rule.regexp instanceof RegExp) {
                    rule.isValid = password.match(rule.regexp) !== null;
                }
                if (!rule.isValid) {
                    allValid = false;
                }
            });
        }
        this.debounceEmitter = window.setTimeout(function () {
            if (allValid) {
                _this.password = password;
                _this.valueChange.emit(password);
            }
            else {
                _this.valueChange.emit('');
                _this.errorMessage = 'password-input.invalid-password';
            }
        }, 500);
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PasswordInputComponent.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PasswordInputComponent.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], PasswordInputComponent.prototype, "value", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], PasswordInputComponent.prototype, "withRules", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], PasswordInputComponent.prototype, "required", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], PasswordInputComponent.prototype, "disabled", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], PasswordInputComponent.prototype, "valueChange", void 0);
    PasswordInputComponent = __decorate([
        Component({
            selector: 'pa-password-input',
            template: "<pa-input-icon [iconName]=\"iconName\" [iconTooltip]=\"isVisible ? 'password-input.hide' : 'password-input.show'\" iconColor=\"secondary\" (iconClick)=\"togglePasswordVisibility()\">\n    <pa-input [id]=\"id\" [type]=\"type\" [placeholder]=\"placeholder\" acceptHtmlTags\n              [required]=\"required\"\n              [disabled]=\"disabled\"\n              [value]=\"password\"\n              [errorMessage]=\"errorMessage\"\n              (keyup)=\"checkPasswordStrength($event)\"><ng-content></ng-content></pa-input>\n</pa-input-icon>\n\n<div *ngIf=\"withRules\">\n    <legend translate>password-input.rule-list.legend</legend>\n    <ul>\n        <li *ngFor=\"let rule of rules\" [class.pa-rule-checked]=\"rule.isValid\" translate>\n            <div class=\"pa-rule-disc\"><pa-icon *ngIf=\"rule.isValid\" name=\"check\"></pa-icon></div>\n            {{rule.label}}\n        </li>\n    </ul>\n</div>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: ["legend{margin-bottom:.1875rem}ul{list-style:none}ul li{color:#535353;font-size:calc(.875rem * 12/14)}ul li .pa-rule-disc{display:inline-block;background:#b8c6c8;border-radius:50%;margin-left:-1.5rem;margin-right:2px}ul li.pa-rule-checked{color:#949494}ul li.pa-rule-checked .pa-rule-disc{background:#44da21}ul li.pa-rule-checked pa-icon ::ng-deep svg{fill:#fff;position:absolute}"]
        })
    ], PasswordInputComponent);
    return PasswordInputComponent;
}());
export { PasswordInputComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQtaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGd1aWxsb3RpbmF3ZWIvcGFzdGFuYWdhLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvdGV4dGZpZWxkL3Bhc3N3b3JkLWlucHV0L3Bhc3N3b3JkLWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDMUgsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLElBQU0sV0FBVyxHQUFHO0lBQ2hCLFNBQVMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDOUIsU0FBUyxFQUFFLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUM5QixNQUFNLEVBQUUsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQzNCLGdCQUFnQixFQUFFLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQztDQUM5QyxDQUFDO0FBUUY7SUFBQTtRQUNhLE9BQUUsR0FBRyxFQUFFLENBQUM7UUFDUixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQVVoQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBS25CLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFLbEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVsQixnQkFBVyxHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWpFLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCxpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUNsQixhQUFRLEdBQUcsTUFBTSxDQUFDO1FBQ2xCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsU0FBSSxHQUFHLFVBQVUsQ0FBQztRQUNsQixVQUFLLEdBQW1CO1lBQ3BCLElBQUksWUFBWSxDQUFDLEVBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxpQ0FBaUMsRUFBQyxDQUFDO1lBQ3RGLElBQUksWUFBWSxDQUFDLEVBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsZ0NBQWdDLEVBQUMsQ0FBQztZQUN2RyxJQUFJLFlBQVksQ0FBQyxFQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLGdDQUFnQyxFQUFDLENBQUM7WUFDdkcsSUFBSSxZQUFZLENBQUMsRUFBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxpQ0FBaUMsRUFBQyxDQUFDO1lBQ3RHLElBQUksWUFBWSxDQUFDLEVBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLGdCQUFnQixFQUFFLEtBQUssRUFBRSxrQ0FBa0MsRUFBQyxDQUFDO1NBQ3JILENBQUM7UUFDRixvQkFBZSxHQUFHLENBQUMsQ0FBQztJQWlEeEIsQ0FBQztJQXBGWSxzQkFBSSx5Q0FBSzthQUFULFVBQVUsS0FBYTtZQUM1QixJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7YUFDekI7UUFDTCxDQUFDOzs7T0FBQTtJQUdELHNCQUFJLDZDQUFTO2FBQWIsY0FBMkIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzthQUNwRCxVQUFjLEtBQWMsSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O09BRDdCO0lBS3BELHNCQUFJLDRDQUFRO2FBQVosY0FBMEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUNsRCxVQUFhLEtBQWMsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O09BRDdCO0lBS2xELHNCQUFJLDRDQUFRO2FBQVosY0FBMEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUNsRCxVQUFhLEtBQWMsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O09BRDdCO0lBb0JsRCx5REFBd0IsR0FBeEI7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ2pELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7SUFDckQsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxzREFBcUIsR0FBckIsVUFBc0IsTUFBcUI7UUFBM0MsaUJBZ0NDO1FBL0JHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE9BQU87U0FDVjtRQUNELElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN0QixhQUFhLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQ3ZDO1FBQ0QsSUFBTSxRQUFRLEdBQXVCLE1BQU0sQ0FBQyxNQUFPLENBQUMsS0FBSyxDQUFDO1FBQzFELElBQUksUUFBUSxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO2dCQUNuQixJQUFJLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQUU7b0JBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDO2lCQUNqRDtxQkFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLFlBQVksTUFBTSxFQUFFO29CQUN0QyxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksQ0FBQztpQkFDdkQ7Z0JBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ2YsUUFBUSxHQUFHLEtBQUssQ0FBQztpQkFDcEI7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNOO1FBRUQsSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1lBQ3JDLElBQUksUUFBUSxFQUFFO2dCQUNWLEtBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO2dCQUN6QixLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNuQztpQkFBTTtnQkFDSCxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDMUIsS0FBSSxDQUFDLFlBQVksR0FBRyxpQ0FBaUMsQ0FBQzthQUN6RDtRQUNMLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNaLENBQUM7SUFyRlE7UUFBUixLQUFLLEVBQUU7O3NEQUFTO0lBQ1I7UUFBUixLQUFLLEVBQUU7OytEQUFrQjtJQUNqQjtRQUFSLEtBQUssRUFBRTs7O3VEQUlQO0lBR0Q7UUFEQyxLQUFLLEVBQUU7OzsyREFDNEM7SUFLcEQ7UUFEQyxLQUFLLEVBQUU7OzswREFDMEM7SUFLbEQ7UUFEQyxLQUFLLEVBQUU7OzswREFDMEM7SUFJeEM7UUFBVCxNQUFNLEVBQUU7a0NBQWMsWUFBWTsrREFBOEI7SUF4QnhELHNCQUFzQjtRQU5sQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLHk1QkFBOEM7WUFFOUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O1NBQ2xELENBQUM7T0FDVyxzQkFBc0IsQ0F1RmxDO0lBQUQsNkJBQUM7Q0FBQSxBQXZGRCxJQXVGQztTQXZGWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IFBhc3N3b3JkUnVsZSB9IGZyb20gJy4vcGFzc3dvcmQtcnVsZSc7XG5cbmNvbnN0IHJ1bGVzUmVnZXhwID0ge1xuICAgIGxvd2VyQ2FzZTogbmV3IFJlZ0V4cCgvW2Etel0vKSxcbiAgICB1cHBlckNhc2U6IG5ldyBSZWdFeHAoL1tBLVpdLyksXG4gICAgbnVtYmVyOiBuZXcgUmVnRXhwKC9bMC05XS8pLFxuICAgIHNwZWNpYWxDaGFyYWN0ZXI6IG5ldyBSZWdFeHAoL1teXFxkYS16QS1aXS8pLFxufTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwYS1wYXNzd29yZC1pbnB1dCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3Bhc3N3b3JkLWlucHV0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9wYXNzd29yZC1pbnB1dC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBQYXNzd29yZElucHV0Q29tcG9uZW50IHtcbiAgICBASW5wdXQoKSBpZCA9ICcnO1xuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJyc7XG4gICAgQElucHV0KCkgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCEhdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMucGFzc3dvcmQgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHdpdGhSdWxlcygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3dpdGhSdWxlczsgfVxuICAgIHNldCB3aXRoUnVsZXModmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5fd2l0aFJ1bGVzID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICAgIHByb3RlY3RlZCBfd2l0aFJ1bGVzID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCByZXF1aXJlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3JlcXVpcmVkOyB9XG4gICAgc2V0IHJlcXVpcmVkKHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX3JlcXVpcmVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICAgIHByb3RlY3RlZCBfcmVxdWlyZWQgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7IH1cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gICAgcHJvdGVjdGVkIF9kaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHBhc3N3b3JkID0gJyc7XG4gICAgZXJyb3JNZXNzYWdlID0gJyc7XG4gICAgaWNvbk5hbWUgPSAnc2hvdyc7XG4gICAgaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgdHlwZSA9ICdwYXNzd29yZCc7XG4gICAgcnVsZXM6IFBhc3N3b3JkUnVsZVtdID0gW1xuICAgICAgICBuZXcgUGFzc3dvcmRSdWxlKHtpZDogJ2xlbmd0aCcsIGxlbmd0aDogMTAsIGxhYmVsOiAncGFzc3dvcmQtaW5wdXQucnVsZS1saXN0Lmxlbmd0aCd9KSxcbiAgICAgICAgbmV3IFBhc3N3b3JkUnVsZSh7aWQ6ICd1cHBlcicsIHJlZ2V4cDogcnVsZXNSZWdleHAudXBwZXJDYXNlLCBsYWJlbDogJ3Bhc3N3b3JkLWlucHV0LnJ1bGUtbGlzdC51cHBlcid9KSxcbiAgICAgICAgbmV3IFBhc3N3b3JkUnVsZSh7aWQ6ICdsb3dlcicsIHJlZ2V4cDogcnVsZXNSZWdleHAubG93ZXJDYXNlLCBsYWJlbDogJ3Bhc3N3b3JkLWlucHV0LnJ1bGUtbGlzdC5sb3dlcid9KSxcbiAgICAgICAgbmV3IFBhc3N3b3JkUnVsZSh7aWQ6ICdudW1iZXInLCByZWdleHA6IHJ1bGVzUmVnZXhwLm51bWJlciwgbGFiZWw6ICdwYXNzd29yZC1pbnB1dC5ydWxlLWxpc3QubnVtYmVyJ30pLFxuICAgICAgICBuZXcgUGFzc3dvcmRSdWxlKHtpZDogJ3NwZWNpYWwnLCByZWdleHA6IHJ1bGVzUmVnZXhwLnNwZWNpYWxDaGFyYWN0ZXIsIGxhYmVsOiAncGFzc3dvcmQtaW5wdXQucnVsZS1saXN0LnNwZWNpYWwnfSksXG4gICAgXTtcbiAgICBkZWJvdW5jZUVtaXR0ZXIgPSAwO1xuXG4gICAgdG9nZ2xlUGFzc3dvcmRWaXNpYmlsaXR5KCkge1xuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9ICF0aGlzLmlzVmlzaWJsZTtcbiAgICAgICAgdGhpcy5pY29uTmFtZSA9IHRoaXMuaXNWaXNpYmxlID8gJ2hpZGUnIDogJ3Nob3cnO1xuICAgICAgICB0aGlzLnR5cGUgPSB0aGlzLmlzVmlzaWJsZSA/ICd0ZXh0JyA6ICdwYXNzd29yZCc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcnVsZXM6XG4gICAgICogIC0gYXQgbGVhc3QgMTAgY2hhcmFjdGVyc1xuICAgICAqICAtIGF0IGxlYXN0IDEgbG93ZXJjYXNlXG4gICAgICogIC0gYXQgbGVhc3QgMSB1cHBlcmNhc2VcbiAgICAgKiAgLSBhdCBsZWFzdCAxIG51bWJlclxuICAgICAqICAtIGF0IGxlYXN0IDEgc3BlY2lhbCBjaGFyYWN0ZXJcbiAgICAgKi9cbiAgICBjaGVja1Bhc3N3b3JkU3RyZW5ndGgoJGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICghJGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmRlYm91bmNlRW1pdHRlcikge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmRlYm91bmNlRW1pdHRlcik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGFzc3dvcmQgPSAgKDxIVE1MSW5wdXRFbGVtZW50PiRldmVudC50YXJnZXQpLnZhbHVlO1xuICAgICAgICBsZXQgYWxsVmFsaWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9ICcnO1xuICAgICAgICBpZiAodGhpcy5fd2l0aFJ1bGVzKSB7XG4gICAgICAgICAgICB0aGlzLnJ1bGVzLmZvckVhY2gocnVsZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBydWxlLmxlbmd0aCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgcnVsZS5pc1ZhbGlkID0gcGFzc3dvcmQubGVuZ3RoID49IHJ1bGUubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocnVsZS5yZWdleHAgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgICAgICAgICAgICAgcnVsZS5pc1ZhbGlkID0gcGFzc3dvcmQubWF0Y2gocnVsZS5yZWdleHApICE9PSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXJ1bGUuaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgICBhbGxWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kZWJvdW5jZUVtaXR0ZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoYWxsVmFsaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHBhc3N3b3JkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KCcnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9ICdwYXNzd29yZC1pbnB1dC5pbnZhbGlkLXBhc3N3b3JkJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgNTAwKTtcbiAgICB9XG59XG4iXX0=