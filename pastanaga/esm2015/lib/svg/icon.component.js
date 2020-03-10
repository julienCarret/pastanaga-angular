import { __decorate, __metadata, __param } from "tslib";
import { Component, ElementRef, Input, Renderer2, ViewEncapsulation, ChangeDetectionStrategy, } from '@angular/core';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { isPlatformBrowser } from '@angular/common';
import { Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { SvgLoader } from './svg-loader';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Icon, IconSize } from '../common/utils';
let IconComponent = class IconComponent {
    constructor(element, renderer, service, svgLoader, platformId) {
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
    set icon(value) {
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
    }
    set path(value) {
        this.iconPath = value;
        this.updateSvg();
    }
    set name(value) {
        this.iconPath = this.getIconPathFromName(value);
        this.updateSvg();
    }
    get hidden() { return this._hidden; }
    set hidden(value) {
        this._hidden = coerceBooleanProperty(value);
        this.updateSvg();
    }
    get small() { return this._small; }
    set small(value) {
        this._small = coerceBooleanProperty(value);
        this.updateSvg();
    }
    get color() { return this._color; }
    set color(value) {
        this._color = value;
        this.updateSvg();
    }
    updateSvg() {
        if (!!this.iconPath) {
            if (isPlatformBrowser(this.platformId)) {
                this.service.loadSvg(this.iconPath).subscribe(svg => {
                    this.setSvg(svg.cloneNode(true));
                });
            }
            else {
                this.svgLoader.loadSvgFromSsr(this.iconPath, this.renderer).subscribe(svg => {
                    this.setSvg(svg);
                });
            }
        }
    }
    setSvg(icon) {
        if (typeof this._hidden !== 'undefined') {
            this.renderer.setAttribute(icon, 'aria-hidden', this._hidden.toString());
        }
        const classes = [];
        const styles = [];
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
            styles.push(`fill: ${this.color};`);
        }
        if (this.iconBackground) {
            styles.push(`background: ${this.iconBackground};`);
        }
        if (this._padding) {
            styles.push(`padding: ${this._padding}`);
        }
        this.renderer.setAttribute(icon, 'class', classes.join(' '));
        this.renderer.setAttribute(icon, 'style', styles.join(' '));
        const elem = this.element.nativeElement;
        elem.innerHTML = '';
        this.renderer.appendChild(elem, icon);
    }
    getIconPathFromName(name) {
        return `./assets/icons/${name}.svg`;
    }
};
IconComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: SvgIconRegistryService },
    { type: SvgLoader },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
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
        template: `<ng-content></ng-content>`,
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
export { IconComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ3VpbGxvdGluYXdlYi9wYXN0YW5hZ2EtYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi9zdmcvaWNvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsdUJBQXVCLEdBQUcsTUFBTSxlQUFlLENBQUM7QUFDckgsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQVNqRCxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBc0R0QixZQUNZLE9BQW1CLEVBQ25CLFFBQW1CLEVBQ25CLE9BQStCLEVBQy9CLFNBQW9CLEVBQ0csVUFBa0I7UUFKekMsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLFlBQU8sR0FBUCxPQUFPLENBQXdCO1FBQy9CLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDRyxlQUFVLEdBQVYsVUFBVSxDQUFRO1FBZnJELFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixX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LEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7S0FDeEMsQ0FBQztJQTRETyxXQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtxQ0FKSCxVQUFVO1FBQ1QsU0FBUztRQUNWLHNCQUFzQjtRQUNwQixTQUFTO1FBQ2UsTUFBTTtHQTNENUMsYUFBYSxDQWlIekI7U0FqSFksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIFJlbmRlcmVyMiwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ZnSWNvblJlZ2lzdHJ5U2VydmljZSB9IGZyb20gJ2FuZ3VsYXItc3ZnLWljb24nO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ZnTG9hZGVyIH0gZnJvbSAnLi9zdmctbG9hZGVyJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBJY29uLCBJY29uU2l6ZSB9IGZyb20gJy4uL2NvbW1vbi91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncGEtaWNvbicsXG4gICAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YCxcbiAgICBzdHlsZVVybHM6IFsnLi9pY29uLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBJY29uQ29tcG9uZW50IHtcbiAgICBASW5wdXQoKSBzZXQgaWNvbih2YWx1ZTogSWNvbikge1xuICAgICAgICBpZiAoISF2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5pY29uUGF0aCA9IHZhbHVlLm5hbWUgPyB0aGlzLmdldEljb25QYXRoRnJvbU5hbWUodmFsdWUubmFtZSkgOiB2YWx1ZS5wYXRoO1xuICAgICAgICAgICAgdGhpcy5pY29uQmFja2dyb3VuZCA9IHZhbHVlLmJhY2tncm91bmRDb2xvcjtcbiAgICAgICAgICAgIHRoaXMuX21lZGl1bSA9IHZhbHVlLnNpemUgPT09IEljb25TaXplLk1FRElVTTtcbiAgICAgICAgICAgIHRoaXMuX3NtYWxsID0gdmFsdWUuc2l6ZSA9PT0gSWNvblNpemUuU01BTEw7XG4gICAgICAgICAgICB0aGlzLl9sYXJnZSA9IHZhbHVlLnNpemUgPT09IEljb25TaXplLkxBUkdFO1xuICAgICAgICAgICAgdGhpcy5fY29sb3IgPSB2YWx1ZS5maWxsQ29sb3I7XG4gICAgICAgICAgICB0aGlzLl9wYWRkaW5nID0gdmFsdWUucGFkZGluZztcbiAgICAgICAgICAgIHRoaXMuX2JvcmRlciA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVN2ZygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIEBJbnB1dCgpIHNldCBwYXRoKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5pY29uUGF0aCA9IHZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZVN2ZygpO1xuICAgIH1cbiAgICBASW5wdXQoKSBzZXQgbmFtZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuaWNvblBhdGggPSB0aGlzLmdldEljb25QYXRoRnJvbU5hbWUodmFsdWUpO1xuICAgICAgICB0aGlzLnVwZGF0ZVN2ZygpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGhpZGRlbigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2hpZGRlbjsgfVxuICAgIHNldCBoaWRkZW4odmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5faGlkZGVuID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICAgICAgdGhpcy51cGRhdGVTdmcoKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBzbWFsbCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3NtYWxsOyB9XG4gICAgc2V0IHNtYWxsKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3NtYWxsID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICAgICAgdGhpcy51cGRhdGVTdmcoKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBjb2xvcigpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fY29sb3I7IH1cbiAgICBzZXQgY29sb3IodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9jb2xvciA9IHZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZVN2ZygpO1xuICAgIH1cblxuICAgIF9ib3JkZXIgPSBmYWxzZTtcbiAgICBfaGlkZGVuID0gZmFsc2U7XG4gICAgX3NtYWxsID0gZmFsc2U7XG4gICAgX21lZGl1bSA9IGZhbHNlO1xuICAgIF9sYXJnZSA9IGZhbHNlO1xuICAgIF9jb2xvciA9ICcnO1xuICAgIF9wYWRkaW5nID0gJyc7XG4gICAgaWNvblBhdGggPSAnJztcbiAgICBpY29uQmFja2dyb3VuZCA9ICcnO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICBwcml2YXRlIHNlcnZpY2U6IFN2Z0ljb25SZWdpc3RyeVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgc3ZnTG9hZGVyOiBTdmdMb2FkZXIsXG4gICAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByb3RlY3RlZCBwbGF0Zm9ybUlkOiBPYmplY3RcbiAgICApIHtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVN2ZygpIHtcbiAgICAgICAgaWYgKCEhdGhpcy5pY29uUGF0aCkge1xuICAgICAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2UubG9hZFN2Zyh0aGlzLmljb25QYXRoKS5zdWJzY3JpYmUoc3ZnID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdmcoc3ZnLmNsb25lTm9kZSh0cnVlKSBhcyBTVkdFbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdmdMb2FkZXIubG9hZFN2Z0Zyb21Tc3IodGhpcy5pY29uUGF0aCwgdGhpcy5yZW5kZXJlcikuc3Vic2NyaWJlKHN2ZyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3ZnKHN2Zyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFN2ZyhpY29uOiBTVkdFbGVtZW50KSB7XHRcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9oaWRkZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShpY29uLCAnYXJpYS1oaWRkZW4nLCB0aGlzLl9oaWRkZW4udG9TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2xhc3Nlczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgY29uc3Qgc3R5bGVzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICAgIGlmICh0aGlzLl9zbWFsbCkge1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCdwYS1zbWFsbCcpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX21lZGl1bSkge1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCdwYS1tZWRpdW0nKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9sYXJnZSkge1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCdwYS1sYXJnZScpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9ib3JkZXIpIHtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaCgncGEtYm9yZGVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2NvbG9yKSB7XG4gICAgICAgICAgICBzdHlsZXMucHVzaChgZmlsbDogJHt0aGlzLmNvbG9yfTtgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pY29uQmFja2dyb3VuZCkge1xuICAgICAgICAgICAgc3R5bGVzLnB1c2goYGJhY2tncm91bmQ6ICR7dGhpcy5pY29uQmFja2dyb3VuZH07YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3BhZGRpbmcpIHtcbiAgICAgICAgICAgIHN0eWxlcy5wdXNoKGBwYWRkaW5nOiAke3RoaXMuX3BhZGRpbmd9YCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoaWNvbiwgJ2NsYXNzJywgY2xhc3Nlcy5qb2luKCcgJykpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShpY29uLCAnc3R5bGUnLCBzdHlsZXMuam9pbignICcpKTtcbiAgICAgICAgY29uc3QgZWxlbSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBlbGVtLmlubmVySFRNTCA9ICcnO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGVsZW0sIGljb24pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SWNvblBhdGhGcm9tTmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGAuL2Fzc2V0cy9pY29ucy8ke25hbWV9LnN2Z2A7XG4gICAgfVxufVxuIl19