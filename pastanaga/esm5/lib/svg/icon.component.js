import { __decorate, __metadata, __param } from "tslib";
import { Component, ElementRef, Input, Renderer2, ViewEncapsulation, ChangeDetectionStrategy, } from '@angular/core';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { isPlatformBrowser } from '@angular/common';
import { Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { SvgLoader } from './svg-loader';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Icon, IconSize } from '../common/utils';
var IconComponent = /** @class */ (function () {
    function IconComponent(element, renderer, service, svgLoader, platformId) {
        this.element = element;
        this.renderer = renderer;
        this.service = service;
        this.svgLoader = svgLoader;
        this.platformId = platformId;
        this._border = false;
        this._hidden = false;
        this._small = false;
        this._medium = false;
        this._large = false;
        this._color = '';
        this._padding = '';
        this.iconPath = '';
        this.iconBackground = '';
    }
    Object.defineProperty(IconComponent.prototype, "icon", {
        set: function (value) {
            if (!!value) {
                this.iconPath = value.name ? this.getIconPathFromName(value.name) : value.path;
                this.iconBackground = value.backgroundColor;
                this._medium = value.size === IconSize.MEDIUM;
                this._small = value.size === IconSize.SMALL;
                this._large = value.size === IconSize.LARGE;
                this._color = value.fillColor;
                this._padding = value.padding;
                this._border = true;
                this.updateSvg();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconComponent.prototype, "path", {
        set: function (value) {
            this.iconPath = value;
            this.updateSvg();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconComponent.prototype, "name", {
        set: function (value) {
            this.iconPath = this.getIconPathFromName(value);
            this.updateSvg();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconComponent.prototype, "hidden", {
        get: function () { return this._hidden; },
        set: function (value) {
            this._hidden = coerceBooleanProperty(value);
            this.updateSvg();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconComponent.prototype, "small", {
        get: function () { return this._small; },
        set: function (value) {
            this._small = coerceBooleanProperty(value);
            this.updateSvg();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconComponent.prototype, "color", {
        get: function () { return this._color; },
        set: function (value) {
            this._color = value;
            this.updateSvg();
        },
        enumerable: true,
        configurable: true
    });
    IconComponent.prototype.updateSvg = function () {
        var _this = this;
        if (!!this.iconPath) {
            if (isPlatformBrowser(this.platformId)) {
                this.service.loadSvg(this.iconPath).subscribe(function (svg) {
                    _this.setSvg(svg.cloneNode(true));
                });
            }
            else {
                this.svgLoader.loadSvgFromSsr(this.iconPath, this.renderer).subscribe(function (svg) {
                    _this.setSvg(svg);
                });
            }
        }
    };
    IconComponent.prototype.setSvg = function (icon) {
        if (typeof this._hidden !== 'undefined') {
            this.renderer.setAttribute(icon, 'aria-hidden', this._hidden.toString());
        }
        var classes = [];
        var styles = [];
        if (this._small) {
            classes.push('pa-small');
        }
        else if (this._medium) {
            classes.push('pa-medium');
        }
        else if (this._large) {
            classes.push('pa-large');
        }
        if (this._border) {
            classes.push('pa-border');
        }
        if (this._color) {
            styles.push("fill: " + this.color + ";");
        }
        if (this.iconBackground) {
            styles.push("background: " + this.iconBackground + ";");
        }
        if (this._padding) {
            styles.push("padding: " + this._padding);
        }
        this.renderer.setAttribute(icon, 'class', classes.join(' '));
        this.renderer.setAttribute(icon, 'style', styles.join(' '));
        var elem = this.element.nativeElement;
        elem.innerHTML = '';
        this.renderer.appendChild(elem, icon);
    };
    IconComponent.prototype.getIconPathFromName = function (name) {
        return "./assets/icons/" + name + ".svg";
    };
    IconComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: SvgIconRegistryService },
        { type: SvgLoader },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Icon),
        __metadata("design:paramtypes", [Icon])
    ], IconComponent.prototype, "icon", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], IconComponent.prototype, "path", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], IconComponent.prototype, "name", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], IconComponent.prototype, "hidden", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], IconComponent.prototype, "small", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], IconComponent.prototype, "color", null);
    IconComponent = __decorate([
        Component({
            selector: 'pa-icon',
            template: "<ng-content></ng-content>",
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            styles: [".pa-small{width:1.125rem;height:1.125rem}.pa-medium{width:1.5rem;height:1.5rem}.pa-large{width:1.875rem;height:1.875rem}.pa-border{border-radius:.1875rem}"]
        }),
        __param(4, Inject(PLATFORM_ID)),
        __metadata("design:paramtypes", [ElementRef,
            Renderer2,
            SvgIconRegistryService,
            SvgLoader,
            Object])
    ], IconComponent);
    return IconComponent;
}());
export { IconComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ3VpbGxvdGluYXdlYi9wYXN0YW5hZ2EtYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi9zdmcvaWNvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsdUJBQXVCLEdBQUcsTUFBTSxlQUFlLENBQUM7QUFDckgsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQVNqRDtJQXNESSx1QkFDWSxPQUFtQixFQUNuQixRQUFtQixFQUNuQixPQUErQixFQUMvQixTQUFvQixFQUNHLFVBQWtCO1FBSnpDLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixZQUFPLEdBQVAsT0FBTyxDQUF3QjtRQUMvQixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ0csZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQWZyRCxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLFdB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QVEsRUFBRSwyQkFBMkI7WUFFckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07WUFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O1NBQ3hDLENBQUM7UUE0RE8sV0FBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7eUNBSkgsVUFBVTtZQUNULFNBQVM7WUFDVixzQkFBc0I7WUFDcEIsU0FBUztZQUNlLE1BQU07T0EzRDVDLGFBQWEsQ0FpSHpCO0lBQUQsb0JBQUM7Q0FBQSxBQWpIRCxJQWlIQztTQWpIWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgUmVuZGVyZXIyLCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdmdJY29uUmVnaXN0cnlTZXJ2aWNlIH0gZnJvbSAnYW5ndWxhci1zdmctaWNvbic7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdmdMb2FkZXIgfSBmcm9tICcuL3N2Zy1sb2FkZXInO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IEljb24sIEljb25TaXplIH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwYS1pY29uJyxcbiAgICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5gLFxuICAgIHN0eWxlVXJsczogWycuL2ljb24uY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEljb25Db21wb25lbnQge1xuICAgIEBJbnB1dCgpIHNldCBpY29uKHZhbHVlOiBJY29uKSB7XG4gICAgICAgIGlmICghIXZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmljb25QYXRoID0gdmFsdWUubmFtZSA/IHRoaXMuZ2V0SWNvblBhdGhGcm9tTmFtZSh2YWx1ZS5uYW1lKSA6IHZhbHVlLnBhdGg7XG4gICAgICAgICAgICB0aGlzLmljb25CYWNrZ3JvdW5kID0gdmFsdWUuYmFja2dyb3VuZENvbG9yO1xuICAgICAgICAgICAgdGhpcy5fbWVkaXVtID0gdmFsdWUuc2l6ZSA9PT0gSWNvblNpemUuTUVESVVNO1xuICAgICAgICAgICAgdGhpcy5fc21hbGwgPSB2YWx1ZS5zaXplID09PSBJY29uU2l6ZS5TTUFMTDtcbiAgICAgICAgICAgIHRoaXMuX2xhcmdlID0gdmFsdWUuc2l6ZSA9PT0gSWNvblNpemUuTEFSR0U7XG4gICAgICAgICAgICB0aGlzLl9jb2xvciA9IHZhbHVlLmZpbGxDb2xvcjtcbiAgICAgICAgICAgIHRoaXMuX3BhZGRpbmcgPSB2YWx1ZS5wYWRkaW5nO1xuICAgICAgICAgICAgdGhpcy5fYm9yZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU3ZnKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQElucHV0KCkgc2V0IHBhdGgodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmljb25QYXRoID0gdmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlU3ZnKCk7XG4gICAgfVxuICAgIEBJbnB1dCgpIHNldCBuYW1lKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5pY29uUGF0aCA9IHRoaXMuZ2V0SWNvblBhdGhGcm9tTmFtZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMudXBkYXRlU3ZnKCk7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBnZXQgaGlkZGVuKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faGlkZGVuOyB9XG4gICAgc2V0IGhpZGRlbih2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9oaWRkZW4gPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgICAgICB0aGlzLnVwZGF0ZVN2ZygpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNtYWxsKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fc21hbGw7IH1cbiAgICBzZXQgc21hbGwodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fc21hbGwgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgICAgICB0aGlzLnVwZGF0ZVN2ZygpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGNvbG9yKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9jb2xvcjsgfVxuICAgIHNldCBjb2xvcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2NvbG9yID0gdmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlU3ZnKCk7XG4gICAgfVxuXG4gICAgX2JvcmRlciA9IGZhbHNlO1xuICAgIF9oaWRkZW4gPSBmYWxzZTtcbiAgICBfc21hbGwgPSBmYWxzZTtcbiAgICBfbWVkaXVtID0gZmFsc2U7XG4gICAgX2xhcmdlID0gZmFsc2U7XG4gICAgX2NvbG9yID0gJyc7XG4gICAgX3BhZGRpbmcgPSAnJztcbiAgICBpY29uUGF0aCA9ICcnO1xuICAgIGljb25CYWNrZ3JvdW5kID0gJyc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIHByaXZhdGUgc2VydmljZTogU3ZnSWNvblJlZ2lzdHJ5U2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBzdmdMb2FkZXI6IFN2Z0xvYWRlcixcbiAgICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcHJvdGVjdGVkIHBsYXRmb3JtSWQ6IE9iamVjdFxuICAgICkge1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlU3ZnKCkge1xuICAgICAgICBpZiAoISF0aGlzLmljb25QYXRoKSB7XG4gICAgICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZS5sb2FkU3ZnKHRoaXMuaWNvblBhdGgpLnN1YnNjcmliZShzdmcgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN2ZyhzdmcuY2xvbmVOb2RlKHRydWUpIGFzIFNWR0VsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN2Z0xvYWRlci5sb2FkU3ZnRnJvbVNzcih0aGlzLmljb25QYXRoLCB0aGlzLnJlbmRlcmVyKS5zdWJzY3JpYmUoc3ZnID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdmcoc3ZnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2V0U3ZnKGljb246IFNWR0VsZW1lbnQpIHtcdFxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX2hpZGRlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGljb24sICdhcmlhLWhpZGRlbicsIHRoaXMuX2hpZGRlbi50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjbGFzc2VzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBjb25zdCBzdHlsZXM6IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgaWYgKHRoaXMuX3NtYWxsKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goJ3BhLXNtYWxsJyk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbWVkaXVtKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goJ3BhLW1lZGl1bScpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2xhcmdlKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goJ3BhLWxhcmdlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2JvcmRlcikge1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCdwYS1ib3JkZXInKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fY29sb3IpIHtcbiAgICAgICAgICAgIHN0eWxlcy5wdXNoKGBmaWxsOiAke3RoaXMuY29sb3J9O2ApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmljb25CYWNrZ3JvdW5kKSB7XG4gICAgICAgICAgICBzdHlsZXMucHVzaChgYmFja2dyb3VuZDogJHt0aGlzLmljb25CYWNrZ3JvdW5kfTtgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fcGFkZGluZykge1xuICAgICAgICAgICAgc3R5bGVzLnB1c2goYHBhZGRpbmc6ICR7dGhpcy5fcGFkZGluZ31gKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShpY29uLCAnY2xhc3MnLCBjbGFzc2VzLmpvaW4oJyAnKSk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGljb24sICdzdHlsZScsIHN0eWxlcy5qb2luKCcgJykpO1xuICAgICAgICBjb25zdCBlbGVtID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGVsZW0uaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZWxlbSwgaWNvbik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRJY29uUGF0aEZyb21OYW1lKG5hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gYC4vYXNzZXRzL2ljb25zLyR7bmFtZX0uc3ZnYDtcbiAgICB9XG59XG4iXX0=