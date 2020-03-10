import { __decorate, __metadata } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
let nextId = 0;
const EXPANSION_PANEL_ANIMATION_TIMING = '225ms cubic-bezier(0.4,0.0,0.2,1)';
let ExpandComponent = class ExpandComponent {
    constructor() {
        this.toggleTooltip = ['', ''];
        this.openOnInit = false;
        this.open = new EventEmitter();
        this.close = new EventEmitter();
        this.isOpen = false;
        this.id = `pa-expand-${nextId++}`;
    }
    ngOnInit() {
        if (this.openOnInit) {
            setTimeout(() => this.togglePanel(), 500);
        }
    }
    togglePanel() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.open.emit();
        }
        else {
            this.close.emit();
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Array)
], ExpandComponent.prototype, "toggleTooltip", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ExpandComponent.prototype, "openOnInit", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], ExpandComponent.prototype, "open", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], ExpandComponent.prototype, "close", void 0);
ExpandComponent = __decorate([
    Component({
        selector: 'pa-expand',
        template: "<button class=\"pa-expand-header\" role=\"tab\" [id]=\"id + '-tab'\" [attr.aria-controls]=\"id + '-panel'\" [attr.aria-expanded]=\"isOpen\"\n    tabindex=\"0\" (click)=\"togglePanel()\">\n    <div class=\"pa-expand-header-wrapper\" tabindex=\"-1\">\n        <div [paTooltip]=\"isOpen ? toggleTooltip[1] : toggleTooltip[0]\">\n            <div class=\"pa-expand-marker\">\n                <pa-icon name=\"down-key\"></pa-icon>\n            </div>\n        </div>\n        <div class=\"pa-expand-title\"><ng-content select=\"expand-title\"></ng-content></div>\n        <div class=\"pa-expand-description\"><ng-content select=\"expand-description\"></ng-content></div>\n    </div>\n</button>\n<div class=\"pa-expand-body\" role=\"tabpanel\" [attr.aria-labelledby]=\"id + '-tab'\" [attr.aria-hidden]=\"!isOpen\"\n    [id]=\"id + '-panel'\" [@bodyExpansion]=\"isOpen ? 'expanded' : 'collapsed'\" style=\"height: 0; visibility: hidden;\">\n    <div class=\"pa-expand-body-wrapper\">\n        <ng-content *ngIf=\"isOpen\"></ng-content>\n    </div>\n</div>\n",
        animations: [
            trigger('bodyExpansion', [
                state('collapsed', style({ height: '0px', visibility: 'hidden' })),
                state('expanded', style({ height: '*', visibility: 'visible' })),
                transition('expanded <=> collapsed', animate(EXPANSION_PANEL_ANIMATION_TIMING)),
            ])
        ],
        styles: [":host{display:block}:host:hover{box-shadow:0 4px 12px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.1);-webkit-transition:.25s;transition:.25s}.pa-expand-header{background:#fff;border-radius:3px;width:100%;text-align:left;border:0;padding:0;position:relative;cursor:pointer;-webkit-transition:.25s;transition:.25s;box-shadow:none}.pa-expand-header:active+.pa-expand-body{box-shadow:0 18px 36px 0 rgba(0,0,0,.15),0 2px 2px 0 rgba(0,0,0,.1);-webkit-transition:.25s;transition:.25s}.pa-expand-header-wrapper{border-radius:3px;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-flow:column;align-content:center;-webkit-box-pack:center;justify-content:center;width:100%;height:4.5rem;padding:.75rem 1.5rem;position:relative}@-webkit-keyframes focus-ring{from{box-shadow:0 0 0 12px rgba(34,151,199,0)}to{box-shadow:0 0 0 3px rgba(34,151,199,.5)}}@keyframes focus-ring{from{box-shadow:0 0 0 12px rgba(34,151,199,0)}to{box-shadow:0 0 0 3px rgba(34,151,199,.5)}}.pa-expand-header:focus>.pa-expand-header-wrapper{outline:0;-webkit-animation-name:focus-ring;animation-name:focus-ring;-webkit-animation-duration:.33s;animation-duration:.33s;box-shadow:0 0 0 3px rgba(34,151,199,.5);z-index:1}.pa-expand-header:not(:-moz-focusring):focus>.pa-expand-header-wrapper{outline:0}.pa-expand-header button::-moz-focus-outer,.pa-expand-header::-moz-focus-inner{border:0}.pa-expand-header-wrapper:focus,.pa-expand-header:focus{outline:0}.pa-expand-header[aria-expanded=true]{border-radius:3px 3px 0 0}.pa-expand-marker{-webkit-transition:.25s;transition:.25s;top:calc(50% - .75rem);position:absolute;-o-object-fit:contain;object-fit:contain;right:1.5rem;height:1.5rem;fill:#2280a0}.pa-expand-marker ::ng-deep svg{width:1.5rem;height:1.5rem}.pa-expand-header[aria-expanded=true] .pa-expand-marker{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-expand-title{font-size:calc(.875rem * 12/14);line-height:1.125rem;font-weight:400;color:#3a3a3a;text-transform:uppercase;margin-right:2.25rem}.pa-expand-description{font-size:.875rem;line-height:1.125rem;letter-spacing:.015em;font-weight:300;color:#767676;margin-right:2.25rem}.pa-expand-body{background:#fff;border-radius:3px;width:100%;text-align:left;border:0;display:-webkit-box;display:flex;position:relative;margin-bottom:.75rem}.pa-expand-body-wrapper{padding:.75rem 1.5rem;width:100%}.pa-expand-body[aria-hidden=true]{height:0;overflow:hidden}.pa-expand-header[aria-expanded=true]+.pa-expand-body{border-radius:0 0 3px 3px;margin-bottom:.75rem}"]
    }),
    __metadata("design:paramtypes", [])
], ExpandComponent);
export { ExpandComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BndWlsbG90aW5hd2ViL3Bhc3RhbmFnYS1hbmd1bGFyLyIsInNvdXJjZXMiOlsibGliL2V4cGFuZC9leHBhbmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFakYsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ2YsTUFBTSxnQ0FBZ0MsR0FBRyxtQ0FBbUMsQ0FBQztBQWM3RSxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBVXhCO1FBVFMsa0JBQWEsR0FBYSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNuQyxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBRWxCLFNBQUksR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QyxVQUFLLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFekQsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUlYLElBQUksQ0FBQyxFQUFFLEdBQUcsYUFBYSxNQUFNLEVBQUUsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDN0M7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzNCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDcEI7YUFBTTtZQUNILElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDckI7SUFDTCxDQUFDO0NBQ0osQ0FBQTtBQTNCWTtJQUFSLEtBQUssRUFBRTs7c0RBQW9DO0FBQ25DO0lBQVIsS0FBSyxFQUFFOzttREFBb0I7QUFFbEI7SUFBVCxNQUFNLEVBQUU7OEJBQU8sWUFBWTs2Q0FBNEI7QUFDOUM7SUFBVCxNQUFNLEVBQUU7OEJBQVEsWUFBWTs4Q0FBNEI7QUFMaEQsZUFBZTtJQVozQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsV0FBVztRQUNyQixzaUNBQW9DO1FBRXBDLFVBQVUsRUFBRTtZQUNSLE9BQU8sQ0FBQyxlQUFlLEVBQUU7Z0JBQ3JCLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQztnQkFDaEUsS0FBSyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDO2dCQUM5RCxVQUFVLENBQUMsd0JBQXdCLEVBQUUsT0FBTyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7YUFDbEYsQ0FBQztTQUNMOztLQUNKLENBQUM7O0dBQ1csZUFBZSxDQTRCM0I7U0E1QlksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRyaWdnZXIsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgYW5pbWF0ZSB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5sZXQgbmV4dElkID0gMDtcbmNvbnN0IEVYUEFOU0lPTl9QQU5FTF9BTklNQVRJT05fVElNSU5HID0gJzIyNW1zIGN1YmljLWJlemllcigwLjQsMC4wLDAuMiwxKSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncGEtZXhwYW5kJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2V4cGFuZC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZXhwYW5kLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdib2R5RXhwYW5zaW9uJywgW1xuICAgICAgICAgICAgc3RhdGUoJ2NvbGxhcHNlZCcsIHN0eWxlKHtoZWlnaHQ6ICcwcHgnLCB2aXNpYmlsaXR5OiAnaGlkZGVuJ30pKSxcbiAgICAgICAgICAgIHN0YXRlKCdleHBhbmRlZCcsIHN0eWxlKHtoZWlnaHQ6ICcqJywgdmlzaWJpbGl0eTogJ3Zpc2libGUnfSkpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbignZXhwYW5kZWQgPD0+IGNvbGxhcHNlZCcsIGFuaW1hdGUoRVhQQU5TSU9OX1BBTkVMX0FOSU1BVElPTl9USU1JTkcpKSxcbiAgICAgICAgXSlcbiAgICBdLFxufSlcbmV4cG9ydCBjbGFzcyBFeHBhbmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIHRvZ2dsZVRvb2x0aXA6IHN0cmluZ1tdID0gWycnLCAnJ107XG4gICAgQElucHV0KCkgb3Blbk9uSW5pdCA9IGZhbHNlO1xuXG4gICAgQE91dHB1dCgpIG9wZW46IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgY2xvc2U6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGlzT3BlbiA9IGZhbHNlO1xuICAgIGlkOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5pZCA9IGBwYS1leHBhbmQtJHtuZXh0SWQrK31gO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5vcGVuT25Jbml0KSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudG9nZ2xlUGFuZWwoKSwgNTAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZVBhbmVsKCkge1xuICAgICAgICB0aGlzLmlzT3BlbiA9ICF0aGlzLmlzT3BlbjtcbiAgICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW4uZW1pdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jbG9zZS5lbWl0KCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=