import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output, ViewChild, ElementRef, HostListener } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DropdownComponent } from './dropdown.component';
import { PopupService } from '../popup/popup.service';
import { getFixedRootParent } from '../common/utils';
let nextId = 0;
let DropdownItemComponent = class DropdownItemComponent {
    constructor(service) {
        this.service = service;
        this.isSmallIcon = false;
        this.isIconOnRight = false;
        this.checkboxMode = false;
        this.isSelected = false;
        this.mode = 'secondary';
        this.isDisabled = false;
        this.hasSeparator = false;
        this.onClick = new EventEmitter();
        this.onEnter = new EventEmitter();
        this.onSelection = new EventEmitter();
        this.onSubMenuSelection = new EventEmitter();
        this._iconName = '';
        this.subMenuOpen = false;
        this.terminator = new Subject();
        this.service.closeAllSubMenu.pipe(takeUntil(this.terminator)).subscribe(() => this.subMenuOpen = false);
    }
    set icon(value) {
        if (!!value && typeof value === 'string') {
            this._iconName = value;
        }
        else {
            this._icon = value;
        }
    }
    set smallIcon(value) { this.isSmallIcon = coerceBooleanProperty(value); }
    set iconOnRight(value) { this.isIconOnRight = coerceBooleanProperty(value); }
    ngOnInit() {
        if (!this.id) {
            this.id = `dropdown-item-${nextId++}`;
        }
    }
    ngOnDestroy() {
        this.terminator.next();
    }
    pressEnter(event) {
        event.preventDefault();
        event.stopPropagation();
        this.onEnter.emit(event);
    }
    pressSpace(event) {
        event.preventDefault();
        event.stopPropagation();
        this.select(!this.isSelected);
    }
    click(event) {
        if (!this.checkboxMode) {
            event.preventDefault();
            event.stopPropagation();
            this.service.closeAllPopups.next();
            if (!this.isDisabled) {
                this.onClick.emit(event);
            }
        }
    }
    clickSubMenu(event) {
        event.preventDefault();
        event.stopPropagation();
        if (!!this.subMenu && !!this.listItem && !!this.subLevelItems) {
            if (this.subMenuOpen) {
                this.subMenuOpen = false;
                this.subMenu.close();
            }
            else {
                const parentPosition = this.listItem.nativeElement.getBoundingClientRect();
                const rootPosition = getFixedRootParent(this.listItem.nativeElement).getBoundingClientRect();
                const right = rootPosition.right - parentPosition.right;
                const size = this.subLevelItems.length > 8 ? 8 : this.subLevelItems.length - 1;
                const subMenuHeight = parentPosition.height * size;
                const hasRightSpace = right > parentPosition.width;
                const hasBottomSpace = rootPosition.bottom - parentPosition.bottom > subMenuHeight;
                this.subMenu.show({
                    position: 'fixed',
                    top: `${(parentPosition.top - 6) - rootPosition.top - (hasBottomSpace ? 0 : subMenuHeight)}px`,
                    left: `${hasRightSpace ? parentPosition.right + 3 : parentPosition.left - parentPosition.width - 3}px`,
                    right: `${hasRightSpace ? right : parentPosition.left}px`,
                }, true);
                this.subMenuOpen = true;
            }
        }
    }
    select(event) {
        this.isSelected = event;
        this.onSelection.emit(event);
    }
    setActiveStyles() {
        this.isSelected = true;
        if (this.listItem) {
            this.listItem.nativeElement.focus();
        }
    }
    scrollIntoView() {
        if (this.listItem) {
            this.listItem.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }
    setInactiveStyles() {
        this.isSelected = false;
    }
    selectSubMenu(item) {
        this.subMenuOpen = false;
        this.onSubMenuSelection.emit(item);
    }
};
DropdownItemComponent.ctorParameters = () => [
    { type: PopupService }
];
__decorate([
    Input(),
    __metadata("design:type", String)
], DropdownItemComponent.prototype, "id", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DropdownItemComponent.prototype, "tooltip", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DropdownItemComponent.prototype, "icon", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DropdownItemComponent.prototype, "smallIcon", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DropdownItemComponent.prototype, "iconOnRight", null);
__decorate([
    Input(),
    __metadata("design:type", String)
], DropdownItemComponent.prototype, "shortcut", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DropdownItemComponent.prototype, "checkboxMode", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DropdownItemComponent.prototype, "isSelected", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DropdownItemComponent.prototype, "mode", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DropdownItemComponent.prototype, "isDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DropdownItemComponent.prototype, "hasSeparator", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], DropdownItemComponent.prototype, "subLevelItems", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DropdownItemComponent.prototype, "subLabel", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DropdownItemComponent.prototype, "onClick", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DropdownItemComponent.prototype, "onEnter", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DropdownItemComponent.prototype, "onSelection", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DropdownItemComponent.prototype, "onSubMenuSelection", void 0);
__decorate([
    ViewChild('listItem', { static: true }),
    __metadata("design:type", ElementRef)
], DropdownItemComponent.prototype, "listItem", void 0);
__decorate([
    ViewChild(DropdownComponent, { static: true }),
    __metadata("design:type", DropdownComponent)
], DropdownItemComponent.prototype, "subMenu", void 0);
__decorate([
    HostListener('keydown.enter', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], DropdownItemComponent.prototype, "pressEnter", null);
__decorate([
    HostListener('keydown.space', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], DropdownItemComponent.prototype, "pressSpace", null);
DropdownItemComponent = __decorate([
    Component({
        selector: 'pa-dropdown-item',
        template: "<pa-dropdown-separator *ngIf=\"hasSeparator\"></pa-dropdown-separator>\n<li #listItem class=\"pa-dropdown-item\" role=\"menuitem\">\n    <a [class]=\"!!mode && mode !== 'default' ? 'pa-dropdown-link pa-dropdown-link-' + mode : 'pa-dropdown-link'\"\n       [class.pa-dropdown-link-selected]=\"isSelected\"\n       [class.pa-dropdown-link-disabled]=\"isDisabled\"\n       (click)=\"click($event)\" tabindex=\"0\">\n        <span [class.submenu-opened]=\"subMenuOpen\" class=\"pa-dropdown-link-wrapper\" tabindex=\"-1\">\n            <div class=\"pa-dropdown-flex\">\n                <ng-template #labelContent><ng-content></ng-content></ng-template>\n                <ng-container *ngIf=\"!checkboxMode\">\n                    <div class=\"pa-dropdown-flex-item\" *ngIf=\"!!_iconName && !isIconOnRight\" [paTooltip]=\"tooltip\">\n                        <pa-icon *ngIf=\"_iconName && !isIconOnRight\" [small]=\"isSmallIcon\" [name]=\"_iconName\"></pa-icon>\n                    </div>\n                    <div class=\"pa-dropdown-flex-item pa-dropdown-flex-item-push\" translate>\n                        <ng-container *ngTemplateOutlet=\"labelContent\"></ng-container>\n                    </div>\n                    <div class=\"pa-dropdown-flex-item\" *ngIf=\"!!_iconName && isIconOnRight\" [paTooltip]=\"tooltip\">\n                        <pa-icon [small]=\"isSmallIcon\" [name]=\"_iconName\"></pa-icon>\n                    </div>\n                    <div *ngIf=\"subLevelItems\" clas=\"pa-dropdown-flex-item\">\n                        <pa-button color=\"secondary\" icon=\"right-key\"\n                                   (click)=\"clickSubMenu($event)\"></pa-button>\n                    </div>\n                    <div class=\"pa-dropdown-flex-item\" *ngIf=\"shortcut\"><kbd>{{ shortcut }}</kbd></div>\n                </ng-container>\n                <pa-checkbox *ngIf=\"checkboxMode\" noFocus\n                             [icon]=\"_iconName || _icon\"\n                             [help]=\"subLabel\"\n                             [selected]=\"isSelected\"\n                             [disabled]=\"isDisabled\"\n                             (selection)=\"select($event)\">\n                    <ng-container *ngTemplateOutlet=\"labelContent\"></ng-container>\n                </pa-checkbox>\n            </div>\n        </span>\n    </a>\n    <pa-dropdown *ngIf=\"subLevelItems?.length > 0\" [id]=\"id + '-sublevels'\">\n        <pa-dropdown-item *ngFor=\"let item of subLevelItems\"\n                          [id]=\"item.id\"\n                          [icon]=\"item.icon\"\n                          [mode]=\"item.mode\"\n                          [checkboxMode]=\"item.checkboxMode\"\n                          [isSelected]=\"item.isSelected\"\n                          (onSelection)=\"selectSubMenu(item)\">\n            {{item.text | translate}}\n        </pa-dropdown-item>\n    </pa-dropdown>\n</li>\n",
        styles: [".pa-dropdown-list{list-style:none;padding:0;margin:0}.pa-dropdown-link{display:block;text-decoration:none;text-align:left;cursor:pointer}.pa-dropdown-link[aria-current] .pa-mainmenu-link-wrapper{background:#edf1f2}.pa-dropdown-link:hover{text-decoration:none}.pa-dropdown-link:focus{box-shadow:none;background:#daeef6}.pa-dropdown-link-wrapper{font-weight:400;color:#535353;display:block;-webkit-transition:.25s;transition:.25s}.pa-dropdown-link-wrapper pa-icon ::ng-deep svg{fill:currentColor;-webkit-transition:.25s;transition:.25s}.pa-dropdown-link-wrapper pa-icon ::ng-deep svg:not(.pa-small){width:1.5rem;height:1.5rem}.pa-dropdown-link-wrapper:hover{background:#f7f6f5;color:#3a3a3a;-webkit-transition:.25s;transition:.25s}.pa-dropdown-link-wrapper.submenu-opened{background:#f7f6f5}.pa-dropdown-link-selected .pa-dropdown-link-wrapper,.pa-dropdown-link-selected:hover .pa-dropdown-link-wrapper{background:rgba(34,128,160,.12)}.pa-dropdown-link-primary .pa-dropdown-link-wrapper{color:#2280a0}.pa-dropdown-link-primary:hover .pa-dropdown-link-wrapper{color:#00719e}.pa-dropdown-link-secondary .pa-dropdown-link-wrapper{color:#826a6a}.pa-dropdown-link-secondary:hover .pa-dropdown-link-wrapper{color:#745f5f}.pa-dropdown-link-destructive .pa-dropdown-link-wrapper{color:#e40166}.pa-dropdown-link-destructive:hover .pa-dropdown-link-wrapper{color:#cc005b}.pa-dropdown-link-disabled{cursor:default}.pa-dropdown-link-disabled .pa-dropdown-link-wrapper,.pa-dropdown-link-disabled:hover .pa-dropdown-link-wrapper{color:#b8c6c8}.pa-dropdown-separator{border-top:1px solid #dee7e9;margin:.375rem 0}.pa-dropdown-group{position:relative}.pa-dropdown-group ul{padding:0;margin:0}.pa-dropdown-group-header{background:#f7f6f5;font-size:calc(.875rem * 12/14);line-height:.75rem;margin:0;padding:.375rem .5625rem;color:#717171;position:-webkit-sticky;position:sticky;top:0;z-index:2;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pa-dropdown-flex{margin:auto .5625rem;min-height:2.625rem;display:-webkit-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;flex-wrap:nowrap;-webkit-box-pack:start;justify-content:flex-start;-webkit-box-align:center;align-items:center;align-content:flex-start}.pa-dropdown-flex pa-checkbox{width:100%}.pa-dropdown-flex pa-checkbox ::ng-deep .pa-field{margin:.1875rem}.pa-dropdown-flex pa-checkbox ::ng-deep .pa-field .pa-field-label{margin-bottom:0!important;width:100%}.pa-dropdown-flex pa-checkbox ::ng-deep .pa-field .pa-field-label.pa-field-with-help .pa-ellipsis-text{margin-top:-.375rem}.pa-dropdown-flex pa-checkbox ::ng-deep .pa-field .pa-field-help{margin-bottom:0!important;margin-top:-.375rem!important}.pa-dropdown-flex-item{-webkit-box-flex:0;flex-grow:0;flex-shring:0;line-height:0;margin-left:.375rem}.pa-dropdown-flex-item kbd{top:0;background:0 0;color:#767676}.pa-dropdown-flex-item:first-child:not(.pa-dropdown-flex-item-push){margin-left:0}.pa-dropdown-flex-item-push{-webkit-box-flex:1;flex-grow:1;line-height:.9375rem;font-weight:400;margin-top:1px}.pa-dropdown-flex-item-push small{font-weight:300;color:#767676}.pa-dropdown-compressed .pa-dropdown-flex{min-height:2.25rem}.dropdown-item-type{color:#767676;font-weight:400}"]
    }),
    __metadata("design:paramtypes", [PopupService])
], DropdownItemComponent);
export { DropdownItemComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24taXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ3VpbGxvdGluYXdlYi9wYXN0YW5hZ2EtYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi9kcm9wZG93bi9kcm9wZG93bi1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFxQixZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFOUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxrQkFBa0IsRUFBUSxNQUFNLGlCQUFpQixDQUFDO0FBRTNELElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQU9mLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBc0M5QixZQUNZLE9BQXFCO1FBQXJCLFlBQU8sR0FBUCxPQUFPLENBQWM7UUEzQmpDLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBRXBCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBRWIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixTQUFJLEdBQXdELFdBQVcsQ0FBQztRQUN4RSxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBSXBCLFlBQU8sR0FBNkIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN2RCxZQUFPLEdBQWdDLElBQUks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QUFSLEtBQUssRUFBRTs7eURBQW9CO0FBQ25CO0lBQVIsS0FBSyxFQUFFOzttREFBeUU7QUFDeEU7SUFBUixLQUFLLEVBQUU7O3lEQUFvQjtBQUNuQjtJQUFSLEtBQUssRUFBRTs7MkRBQXNCO0FBQ3JCO0lBQVIsS0FBSyxFQUFFOzs0REFBbUM7QUFDbEM7SUFBUixLQUFLLEVBQUU7O3VEQUFtQjtBQUVqQjtJQUFULE1BQU0sRUFBRTs4QkFBVSxZQUFZO3NEQUFrQztBQUN2RDtJQUFULE1BQU0sRUFBRTs4QkFBVSxZQUFZO3NEQUFxQztBQUMxRDtJQUFULE1BQU0sRUFBRTs4QkFBYyxZQUFZOzBEQUErQjtBQUN4RDtJQUFULE1BQU0sRUFBRTs4QkFBcUIsWUFBWTtpRUFBdUM7QUFFeEM7SUFBeEMsU0FBUyxDQUFDLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQzs4QkFBWSxVQUFVO3VEQUFDO0FBQ2hCO0lBQTlDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQzs4QkFBVyxpQkFBaUI7c0RBQUM7QUF5QjNFO0lBREMsWUFBWSxDQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztxQ0FDeEIsYUFBYTs7dURBSTlCO0FBR0Q7SUFEQyxZQUFZLENBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7O3FDQUN4QixhQUFhOzt1REFJOUI7QUFsRVEscUJBQXFCO0lBTGpDLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsNDNGQUE2Qzs7S0FFaEQsQ0FBQztxQ0F3Q3VCLFlBQVk7R0F2Q3hCLHFCQUFxQixDQWlJakM7U0FqSVkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgT25EZXN0cm95LCBPbkluaXQsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSGlnaGxpZ2h0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBDb250ZXh0TWVudUl0ZW0gfSBmcm9tICcuL2NvbnRleHQtbWVudS5tb2RlbCc7XG5pbXBvcnQgeyBEcm9wZG93bkNvbXBvbmVudCB9IGZyb20gJy4vZHJvcGRvd24uY29tcG9uZW50JztcbmltcG9ydCB7IFBvcHVwU2VydmljZSB9IGZyb20gJy4uL3BvcHVwL3BvcHVwLnNlcnZpY2UnO1xuaW1wb3J0IHsgZ2V0Rml4ZWRSb290UGFyZW50LCBJY29uIH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcblxubGV0IG5leHRJZCA9IDA7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncGEtZHJvcGRvd24taXRlbScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2Ryb3Bkb3duLWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL19kcm9wZG93bnMuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBEcm9wZG93bkl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBIaWdobGlnaHRhYmxlLCBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgZGlzYWJsZWQ/OiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIEBJbnB1dCgpIGlkPzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHRvb2x0aXA/OiBzdHJpbmc7XG4gICAgQElucHV0KCkgc2V0IGljb24odmFsdWU6IHN0cmluZyB8IEljb24pIHtcbiAgICAgICAgaWYgKCEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5faWNvbk5hbWUgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2ljb24gPSB2YWx1ZSBhcyBJY29uO1xuICAgICAgICB9XG4gICAgfVxuICAgIEBJbnB1dCgpIHNldCBzbWFsbEljb24odmFsdWUpIHsgdGhpcy5pc1NtYWxsSWNvbiA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgICBpc1NtYWxsSWNvbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHNldCBpY29uT25SaWdodCh2YWx1ZSkgeyB0aGlzLmlzSWNvbk9uUmlnaHQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gICAgaXNJY29uT25SaWdodCA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHNob3J0Y3V0Pzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGNoZWNrYm94TW9kZSA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGlzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBtb2RlOiAnZGVmYXVsdCcgfCAncHJpbWFyeScgfCAnc2Vjb25kYXJ5JyB8ICdkZXN0cnVjdGl2ZScgPSAnc2Vjb25kYXJ5JztcbiAgICBASW5wdXQoKSBpc0Rpc2FibGVkID0gZmFsc2U7XG4gICAgQElucHV0KCkgaGFzU2VwYXJhdG9yID0gZmFsc2U7XG4gICAgQElucHV0KCkgc3ViTGV2ZWxJdGVtcz86IENvbnRleHRNZW51SXRlbVtdO1xuICAgIEBJbnB1dCgpIHN1YkxhYmVsPzogc3RyaW5nO1xuXG4gICAgQE91dHB1dCgpIG9uQ2xpY2s6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgb25FbnRlcjogRXZlbnRFbWl0dGVyPEtleWJvYXJkRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBvblNlbGVjdGlvbjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBvblN1Yk1lbnVTZWxlY3Rpb246IEV2ZW50RW1pdHRlcjxDb250ZXh0TWVudUl0ZW0+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZCgnbGlzdEl0ZW0nLCB7IHN0YXRpYzogdHJ1ZSB9KSBsaXN0SXRlbT86IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZChEcm9wZG93bkNvbXBvbmVudCwgeyBzdGF0aWM6IHRydWV9KSBzdWJNZW51PzogRHJvcGRvd25Db21wb25lbnQ7XG5cbiAgICBfaWNvbk5hbWUgPSAnJztcbiAgICBfaWNvbj86IEljb247XG5cbiAgICBzdWJNZW51T3BlbiA9IGZhbHNlO1xuICAgIHRlcm1pbmF0b3IgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgc2VydmljZTogUG9wdXBTZXJ2aWNlLFxuICAgICkge1xuICAgICAgICB0aGlzLnNlcnZpY2UuY2xvc2VBbGxTdWJNZW51LnBpcGUodGFrZVVudGlsKHRoaXMudGVybWluYXRvcikpLnN1YnNjcmliZSgoKSA9PiB0aGlzLnN1Yk1lbnVPcGVuID0gZmFsc2UpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuaWQpIHtcbiAgICAgICAgICAgIHRoaXMuaWQgPSBgZHJvcGRvd24taXRlbS0ke25leHRJZCsrfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy50ZXJtaW5hdG9yLm5leHQoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLmVudGVyJywgWyckZXZlbnQnXSlcbiAgICBwcmVzc0VudGVyKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLm9uRW50ZXIuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5zcGFjZScsIFsnJGV2ZW50J10pXG4gICAgcHJlc3NTcGFjZShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdGhpcy5zZWxlY3QoIXRoaXMuaXNTZWxlY3RlZCk7XG4gICAgfVxuXG4gICAgY2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrYm94TW9kZSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2UuY2xvc2VBbGxQb3B1cHMubmV4dCgpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25DbGljay5lbWl0KGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsaWNrU3ViTWVudShldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYgKCEhdGhpcy5zdWJNZW51ICYmICEhdGhpcy5saXN0SXRlbSAmJiAhIXRoaXMuc3ViTGV2ZWxJdGVtcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3ViTWVudU9wZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1Yk1lbnVPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJNZW51LmNsb3NlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudFBvc2l0aW9uID0gdGhpcy5saXN0SXRlbS5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvb3RQb3NpdGlvbiA9IGdldEZpeGVkUm9vdFBhcmVudCh0aGlzLmxpc3RJdGVtLm5hdGl2ZUVsZW1lbnQpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJpZ2h0ID0gcm9vdFBvc2l0aW9uLnJpZ2h0IC0gcGFyZW50UG9zaXRpb24ucmlnaHQ7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2l6ZSA9IHRoaXMuc3ViTGV2ZWxJdGVtcy5sZW5ndGggPiA4ID8gOCA6IHRoaXMuc3ViTGV2ZWxJdGVtcy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1Yk1lbnVIZWlnaHQgPSBwYXJlbnRQb3NpdGlvbi5oZWlnaHQgKiBzaXplO1xuICAgICAgICAgICAgICAgIGNvbnN0IGhhc1JpZ2h0U3BhY2UgPSByaWdodCA+IHBhcmVudFBvc2l0aW9uLndpZHRoO1xuICAgICAgICAgICAgICAgIGNvbnN0IGhhc0JvdHRvbVNwYWNlID0gcm9vdFBvc2l0aW9uLmJvdHRvbSAtIHBhcmVudFBvc2l0aW9uLmJvdHRvbSA+IHN1Yk1lbnVIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJNZW51LnNob3coe1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBgJHsocGFyZW50UG9zaXRpb24udG9wIC0gNikgLSByb290UG9zaXRpb24udG9wIC0gKGhhc0JvdHRvbVNwYWNlID8gMCA6IHN1Yk1lbnVIZWlnaHQpfXB4YCxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogYCR7aGFzUmlnaHRTcGFjZSA/IHBhcmVudFBvc2l0aW9uLnJpZ2h0ICsgMyA6IHBhcmVudFBvc2l0aW9uLmxlZnQgLSBwYXJlbnRQb3NpdGlvbi53aWR0aCAtIDN9cHhgLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogYCR7aGFzUmlnaHRTcGFjZSA/IHJpZ2h0IDogcGFyZW50UG9zaXRpb24ubGVmdH1weGAsXG4gICAgICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJNZW51T3BlbiA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3QoZXZlbnQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5pc1NlbGVjdGVkID0gZXZlbnQ7XG4gICAgICAgIHRoaXMub25TZWxlY3Rpb24uZW1pdChldmVudCk7XG4gICAgfVxuICAgIHNldEFjdGl2ZVN0eWxlcygpIHtcbiAgICAgICAgdGhpcy5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMubGlzdEl0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMubGlzdEl0ZW0ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNjcm9sbEludG9WaWV3KCkge1xuICAgICAgICBpZiAodGhpcy5saXN0SXRlbSkge1xuICAgICAgICAgICAgdGhpcy5saXN0SXRlbS5uYXRpdmVFbGVtZW50LnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ2VuZCcgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0SW5hY3RpdmVTdHlsZXMoKSB7XG4gICAgICAgIHRoaXMuaXNTZWxlY3RlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBzZWxlY3RTdWJNZW51KGl0ZW06IENvbnRleHRNZW51SXRlbSkge1xuICAgICAgICB0aGlzLnN1Yk1lbnVPcGVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMub25TdWJNZW51U2VsZWN0aW9uLmVtaXQoaXRlbSk7XG4gICAgfVxufVxuIl19