import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output, ViewChild, ElementRef, HostListener } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DropdownComponent } from './dropdown.component';
import { PopupService } from '../popup/popup.service';
import { getFixedRootParent } from '../common/utils';
var nextId = 0;
var DropdownItemComponent = /** @class */ (function () {
    function DropdownItemComponent(service) {
        var _this = this;
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
        this.service.closeAllSubMenu.pipe(takeUntil(this.terminator)).subscribe(function () { return _this.subMenuOpen = false; });
    }
    Object.defineProperty(DropdownItemComponent.prototype, "icon", {
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
    Object.defineProperty(DropdownItemComponent.prototype, "smallIcon", {
        set: function (value) { this.isSmallIcon = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropdownItemComponent.prototype, "iconOnRight", {
        set: function (value) { this.isIconOnRight = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    DropdownItemComponent.prototype.ngOnInit = function () {
        if (!this.id) {
            this.id = "dropdown-item-" + nextId++;
        }
    };
    DropdownItemComponent.prototype.ngOnDestroy = function () {
        this.terminator.next();
    };
    DropdownItemComponent.prototype.pressEnter = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.onEnter.emit(event);
    };
    DropdownItemComponent.prototype.pressSpace = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.select(!this.isSelected);
    };
    DropdownItemComponent.prototype.click = function (event) {
        if (!this.checkboxMode) {
            event.preventDefault();
            event.stopPropagation();
            this.service.closeAllPopups.next();
            if (!this.isDisabled) {
                this.onClick.emit(event);
            }
        }
    };
    DropdownItemComponent.prototype.clickSubMenu = function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (!!this.subMenu && !!this.listItem && !!this.subLevelItems) {
            if (this.subMenuOpen) {
                this.subMenuOpen = false;
                this.subMenu.close();
            }
            else {
                var parentPosition = this.listItem.nativeElement.getBoundingClientRect();
                var rootPosition = getFixedRootParent(this.listItem.nativeElement).getBoundingClientRect();
                var right = rootPosition.right - parentPosition.right;
                var size = this.subLevelItems.length > 8 ? 8 : this.subLevelItems.length - 1;
                var subMenuHeight = parentPosition.height * size;
                var hasRightSpace = right > parentPosition.width;
                var hasBottomSpace = rootPosition.bottom - parentPosition.bottom > subMenuHeight;
                this.subMenu.show({
                    position: 'fixed',
                    top: (parentPosition.top - 6) - rootPosition.top - (hasBottomSpace ? 0 : subMenuHeight) + "px",
                    left: (hasRightSpace ? parentPosition.right + 3 : parentPosition.left - parentPosition.width - 3) + "px",
                    right: (hasRightSpace ? right : parentPosition.left) + "px",
                }, true);
                this.subMenuOpen = true;
            }
        }
    };
    DropdownItemComponent.prototype.select = function (event) {
        this.isSelected = event;
        this.onSelection.emit(event);
    };
    DropdownItemComponent.prototype.setActiveStyles = function () {
        this.isSelected = true;
        if (this.listItem) {
            this.listItem.nativeElement.focus();
        }
    };
    DropdownItemComponent.prototype.scrollIntoView = function () {
        if (this.listItem) {
            this.listItem.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    };
    DropdownItemComponent.prototype.setInactiveStyles = function () {
        this.isSelected = false;
    };
    DropdownItemComponent.prototype.selectSubMenu = function (item) {
        this.subMenuOpen = false;
        this.onSubMenuSelection.emit(item);
    };
    DropdownItemComponent.ctorParameters = function () { return [
        { type: PopupService }
    ]; };
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
    return DropdownItemComponent;
}());
export { DropdownItemComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24taXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ3VpbGxvdGluYXdlYi9wYXN0YW5hZ2EtYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi9kcm9wZG93bi9kcm9wZG93bi1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFxQixZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFOUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxrQkFBa0IsRUFBUSxNQUFNLGlCQUFpQixDQUFDO0FBRTNELElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQU9mO0lBc0NJLCtCQUNZLE9BQXFCO1FBRGpDLGlCQUlDO1FBSFcsWUFBTyxHQUFQLE9BQU8sQ0FBYztRQTNCakMsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFFcEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFFYixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLFNBQUksR0FBd0QsV0FBVyxDQUFDO1FBQ3hFLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFJcEIsWUFBTyxHQUE2QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3ZELFlBQU8sR0FBZ0MsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMx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dCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIE9uRGVzdHJveSwgT25Jbml0LCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhpZ2hsaWdodGFibGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgQ29udGV4dE1lbnVJdGVtIH0gZnJvbSAnLi9jb250ZXh0LW1lbnUubW9kZWwnO1xuaW1wb3J0IHsgRHJvcGRvd25Db21wb25lbnQgfSBmcm9tICcuL2Ryb3Bkb3duLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQb3B1cFNlcnZpY2UgfSBmcm9tICcuLi9wb3B1cC9wb3B1cC5zZXJ2aWNlJztcbmltcG9ydCB7IGdldEZpeGVkUm9vdFBhcmVudCwgSWNvbiB9IGZyb20gJy4uL2NvbW1vbi91dGlscyc7XG5cbmxldCBuZXh0SWQgPSAwO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3BhLWRyb3Bkb3duLWl0ZW0nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9kcm9wZG93bi1pdGVtLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9fZHJvcGRvd25zLnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgRHJvcGRvd25JdGVtQ29tcG9uZW50IGltcGxlbWVudHMgSGlnaGxpZ2h0YWJsZSwgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIGRpc2FibGVkPzogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICBASW5wdXQoKSBpZD86IHN0cmluZztcbiAgICBASW5wdXQoKSB0b29sdGlwPzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHNldCBpY29uKHZhbHVlOiBzdHJpbmcgfCBJY29uKSB7XG4gICAgICAgIGlmICghIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuX2ljb25OYW1lID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9pY29uID0gdmFsdWUgYXMgSWNvbjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBASW5wdXQoKSBzZXQgc21hbGxJY29uKHZhbHVlKSB7IHRoaXMuaXNTbWFsbEljb24gPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gICAgaXNTbWFsbEljb24gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBzZXQgaWNvbk9uUmlnaHQodmFsdWUpIHsgdGhpcy5pc0ljb25PblJpZ2h0ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICAgIGlzSWNvbk9uUmlnaHQgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBzaG9ydGN1dD86IHN0cmluZztcbiAgICBASW5wdXQoKSBjaGVja2JveE1vZGUgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBpc1NlbGVjdGVkID0gZmFsc2U7XG4gICAgQElucHV0KCkgbW9kZTogJ2RlZmF1bHQnIHwgJ3ByaW1hcnknIHwgJ3NlY29uZGFyeScgfCAnZGVzdHJ1Y3RpdmUnID0gJ3NlY29uZGFyeSc7XG4gICAgQElucHV0KCkgaXNEaXNhYmxlZCA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGhhc1NlcGFyYXRvciA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHN1YkxldmVsSXRlbXM/OiBDb250ZXh0TWVudUl0ZW1bXTtcbiAgICBASW5wdXQoKSBzdWJMYWJlbD86IHN0cmluZztcblxuICAgIEBPdXRwdXQoKSBvbkNsaWNrOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIG9uRW50ZXI6IEV2ZW50RW1pdHRlcjxLZXlib2FyZEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgb25TZWxlY3Rpb246IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgb25TdWJNZW51U2VsZWN0aW9uOiBFdmVudEVtaXR0ZXI8Q29udGV4dE1lbnVJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2xpc3RJdGVtJywgeyBzdGF0aWM6IHRydWUgfSkgbGlzdEl0ZW0/OiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoRHJvcGRvd25Db21wb25lbnQsIHsgc3RhdGljOiB0cnVlfSkgc3ViTWVudT86IERyb3Bkb3duQ29tcG9uZW50O1xuXG4gICAgX2ljb25OYW1lID0gJyc7XG4gICAgX2ljb24/OiBJY29uO1xuXG4gICAgc3ViTWVudU9wZW4gPSBmYWxzZTtcbiAgICB0ZXJtaW5hdG9yID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHNlcnZpY2U6IFBvcHVwU2VydmljZSxcbiAgICApIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLmNsb3NlQWxsU3ViTWVudS5waXBlKHRha2VVbnRpbCh0aGlzLnRlcm1pbmF0b3IpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zdWJNZW51T3BlbiA9IGZhbHNlKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmlkKSB7XG4gICAgICAgICAgICB0aGlzLmlkID0gYGRyb3Bkb3duLWl0ZW0tJHtuZXh0SWQrK31gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudGVybWluYXRvci5uZXh0KCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5lbnRlcicsIFsnJGV2ZW50J10pXG4gICAgcHJlc3NFbnRlcihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdGhpcy5vbkVudGVyLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uc3BhY2UnLCBbJyRldmVudCddKVxuICAgIHByZXNzU3BhY2UoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0KCF0aGlzLmlzU2VsZWN0ZWQpO1xuICAgIH1cblxuICAgIGNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5jaGVja2JveE1vZGUpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmNsb3NlQWxsUG9wdXBzLm5leHQoKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzRGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2xpY2suZW1pdChldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGlja1N1Yk1lbnUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGlmICghIXRoaXMuc3ViTWVudSAmJiAhIXRoaXMubGlzdEl0ZW0gJiYgISF0aGlzLnN1YkxldmVsSXRlbXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN1Yk1lbnVPcGVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJNZW51T3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3ViTWVudS5jbG9zZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnRQb3NpdGlvbiA9IHRoaXMubGlzdEl0ZW0ubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgICBjb25zdCByb290UG9zaXRpb24gPSBnZXRGaXhlZFJvb3RQYXJlbnQodGhpcy5saXN0SXRlbS5uYXRpdmVFbGVtZW50KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgICBjb25zdCByaWdodCA9IHJvb3RQb3NpdGlvbi5yaWdodCAtIHBhcmVudFBvc2l0aW9uLnJpZ2h0O1xuICAgICAgICAgICAgICAgIGNvbnN0IHNpemUgPSB0aGlzLnN1YkxldmVsSXRlbXMubGVuZ3RoID4gOCA/IDggOiB0aGlzLnN1YkxldmVsSXRlbXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJNZW51SGVpZ2h0ID0gcGFyZW50UG9zaXRpb24uaGVpZ2h0ICogc2l6ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBoYXNSaWdodFNwYWNlID0gcmlnaHQgPiBwYXJlbnRQb3NpdGlvbi53aWR0aDtcbiAgICAgICAgICAgICAgICBjb25zdCBoYXNCb3R0b21TcGFjZSA9IHJvb3RQb3NpdGlvbi5ib3R0b20gLSBwYXJlbnRQb3NpdGlvbi5ib3R0b20gPiBzdWJNZW51SGVpZ2h0O1xuICAgICAgICAgICAgICAgIHRoaXMuc3ViTWVudS5zaG93KHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogYCR7KHBhcmVudFBvc2l0aW9uLnRvcCAtIDYpIC0gcm9vdFBvc2l0aW9uLnRvcCAtIChoYXNCb3R0b21TcGFjZSA/IDAgOiBzdWJNZW51SGVpZ2h0KX1weGAsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IGAke2hhc1JpZ2h0U3BhY2UgPyBwYXJlbnRQb3NpdGlvbi5yaWdodCArIDMgOiBwYXJlbnRQb3NpdGlvbi5sZWZ0IC0gcGFyZW50UG9zaXRpb24ud2lkdGggLSAzfXB4YCxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IGAke2hhc1JpZ2h0U3BhY2UgPyByaWdodCA6IHBhcmVudFBvc2l0aW9uLmxlZnR9cHhgLFxuICAgICAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3ViTWVudU9wZW4gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0KGV2ZW50OiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuaXNTZWxlY3RlZCA9IGV2ZW50O1xuICAgICAgICB0aGlzLm9uU2VsZWN0aW9uLmVtaXQoZXZlbnQpO1xuICAgIH1cbiAgICBzZXRBY3RpdmVTdHlsZXMoKSB7XG4gICAgICAgIHRoaXMuaXNTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLmxpc3RJdGVtKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RJdGVtLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzY3JvbGxJbnRvVmlldygpIHtcbiAgICAgICAgaWYgKHRoaXMubGlzdEl0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMubGlzdEl0ZW0ubmF0aXZlRWxlbWVudC5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiAnc21vb3RoJywgYmxvY2s6ICdlbmQnIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldEluYWN0aXZlU3R5bGVzKCkge1xuICAgICAgICB0aGlzLmlzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgc2VsZWN0U3ViTWVudShpdGVtOiBDb250ZXh0TWVudUl0ZW0pIHtcbiAgICAgICAgdGhpcy5zdWJNZW51T3BlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9uU3ViTWVudVNlbGVjdGlvbi5lbWl0KGl0ZW0pO1xuICAgIH1cbn1cbiJdfQ==