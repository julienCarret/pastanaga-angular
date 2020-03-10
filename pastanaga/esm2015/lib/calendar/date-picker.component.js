import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { PopupService } from '../popup/popup.service';
let DatePickerComponent = class DatePickerComponent extends PopupComponent {
    constructor(popupService, renderer, element, cdr) {
        super(popupService, renderer, element, cdr);
        this.popupService = popupService;
        this.renderer = renderer;
        this.element = element;
        this.cdr = cdr;
        this._rangeStart = false;
        this._rangeEnd = false;
        this._dontCloseOnSelection = false;
        this._noFuture = false;
        this.select = new EventEmitter();
    }
    set rangeStart(value) {
        this._rangeStart = coerceBooleanProperty(value);
        this._dontCloseOnSelection = true;
    }
    set rangeEnd(value) {
        this._rangeEnd = coerceBooleanProperty(value);
        this._dontCloseOnSelection = false;
    }
    set dontCloseOnSelection(value) { this._dontCloseOnSelection = coerceBooleanProperty(value); }
    set noFuture(value) { this._noFuture = coerceBooleanProperty(value); }
    onSelection(date) {
        if (!this._dontCloseOnSelection) {
            this.close();
        }
        this.select.emit(date);
    }
    onOutsideClick(event) {
        if (!this.isNodeFromCalendar(event.target)) {
            this.close();
        }
    }
    isNodeFromCalendar(node) {
        if (typeof node.className === 'string' && node.className.includes('pa-calendar')) {
            return true;
        }
        else if (!!node.parentElement) {
            return this.isNodeFromCalendar(node.parentElement);
        }
        else {
            return false;
        }
    }
};
DatePickerComponent.ctorParameters = () => [
    { type: PopupService },
    { type: Renderer2 },
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DatePickerComponent.prototype, "rangeStart", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DatePickerComponent.prototype, "rangeEnd", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DatePickerComponent.prototype, "dontCloseOnSelection", null);
__decorate([
    Input(),
    __metadata("design:type", Date)
], DatePickerComponent.prototype, "min", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DatePickerComponent.prototype, "selection", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DatePickerComponent.prototype, "noFuture", null);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DatePickerComponent.prototype, "select", void 0);
DatePickerComponent = __decorate([
    Component({
        selector: 'pa-date-picker',
        template: "<div class=\"pa-popup\" [hidden]=\"!isDisplayed\" [ngStyle]=\"style\">\n    <div class=\"pa-popup-wrapper\">\n        <pa-calendar [selection]=\"selection\"\n                     [noFuture]=\"_noFuture\"\n                     [rangeStart]=\"_rangeStart\"\n                     [rangeEnd]=\"_rangeEnd\"\n                     [min]=\"min\"\n                     (select)=\"onSelection($event)\"></pa-calendar>\n    </div>\n</div>\n",
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".pa-popup{z-index:10030;box-shadow:0 1px 2px 0 rgba(0,0,0,.15);border-radius:.1875rem;min-width:12.375rem;max-width:15rem;max-height:21.75rem;overflow-x:hidden;overflow-y:auto}.pa-popup-wrapper{padding:.375rem 0;background:rgba(255,255,255,.975)}@supports (-webkit-backdrop-filter:blur(9px)){.pa-popup-wrapper{background:rgba(255,255,255,.9);-webkit-backdrop-filter:blur(9px)}}", ":host .pa-popup{min-width:18.75rem;max-width:none;max-height:none}"]
    }),
    __metadata("design:paramtypes", [PopupService,
        Renderer2,
        ElementRef,
        ChangeDetectorRef])
], DatePickerComponent);
export { DatePickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGd1aWxsb3RpbmF3ZWIvcGFzdGFuYWdhLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvY2FsZW5kYXIvZGF0ZS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUksT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQVF0RCxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFvQixTQUFRLGNBQWM7SUF5Qm5ELFlBQ1csWUFBMEIsRUFDMUIsUUFBbUIsRUFDbkIsT0FBbUIsRUFDbkIsR0FBc0I7UUFFN0IsS0FBSyxDQUFDLFlBQVksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBTHJDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQXZCakMsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFNcEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUdsQiwwQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFNOUIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVSLFdBQU0sR0FBOEIsSUFBSSxZQUFZLEVBQVEsQ0FBQztJQVN2RSxDQUFDO0lBOUJRLElBQUksVUFBVSxDQUFDLEtBQUs7UUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO0lBQ3RDLENBQUM7SUFHUSxJQUFJLFFBQVEsQ0FBQyxLQUFLO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztJQUN2QyxDQUFDO0lBR1EsSUFBSSxvQkFBb0IsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLHFCQUFxQixHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQU05RixJQUFJLFFBQVEsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFjL0UsV0FBVyxDQUFDLElBQWlCO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDN0IsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2hCO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELGNBQWMsQ0FBQyxLQUFLO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3hDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNoQjtJQUNMLENBQUM7SUFFTyxrQkFBa0IsQ0FBQyxJQUFpQjtRQUN4QyxJQUFJLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDOUUsT0FBTyxJQUFJLENBQUM7U0FDZjthQUFNLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDN0IsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3REO2FBQU07WUFDSCxPQUFPLEtBQUssQ0FBQztTQUNoQjtJQUNMLENBQUM7Q0FDSixDQUFBOztZQTlCNEIsWUFBWTtZQUNoQixTQUFTO1lBQ1YsVUFBVTtZQUNkLGlCQUFpQjs7QUEzQnhCO0lBQVIsS0FBSyxFQUFFOzs7cURBR1A7QUFHUTtJQUFSLEtBQUssRUFBRTs7O21EQUdQO0FBR1E7SUFBUixLQUFLLEVBQUU7OzsrREFBK0Y7QUFHOUY7SUFBUixLQUFLLEVBQUU7OEJBQU8sSUFBSTtnREFBQztBQUNYO0lBQVIsS0FBSyxFQUFFOztzREFBK0M7QUFFOUM7SUFBUixLQUFLLEVBQUU7OzttREFBdUU7QUFHckU7SUFBVCxNQUFNLEVBQUU7OEJBQVMsWUFBWTttREFBeUM7QUF2QjlELG1CQUFtQjtJQU4vQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLHliQUEyQztRQUUzQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7S0FDbEQsQ0FBQztxQ0EyQjJCLFlBQVk7UUFDaEIsU0FBUztRQUNWLFVBQVU7UUFDZCxpQkFBaUI7R0E3QnhCLG1CQUFtQixDQXdEL0I7U0F4RFksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQb3B1cENvbXBvbmVudCB9IGZyb20gJy4uL3BvcHVwL3BvcHVwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgUG9wdXBTZXJ2aWNlIH0gZnJvbSAnLi4vcG9wdXAvcG9wdXAuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncGEtZGF0ZS1waWNrZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9kYXRlLXBpY2tlci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4uL3BvcHVwL19wb3B1cC5zY3NzJywgJy4vZGF0ZS1waWNrZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVBpY2tlckNvbXBvbmVudCBleHRlbmRzIFBvcHVwQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIHNldCByYW5nZVN0YXJ0KHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3JhbmdlU3RhcnQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgICAgICB0aGlzLl9kb250Q2xvc2VPblNlbGVjdGlvbiA9IHRydWU7XG4gICAgfVxuICAgIF9yYW5nZVN0YXJ0ID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBzZXQgcmFuZ2VFbmQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fcmFuZ2VFbmQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgICAgICB0aGlzLl9kb250Q2xvc2VPblNlbGVjdGlvbiA9IGZhbHNlO1xuICAgIH1cbiAgICBfcmFuZ2VFbmQgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIHNldCBkb250Q2xvc2VPblNlbGVjdGlvbih2YWx1ZSkgeyB0aGlzLl9kb250Q2xvc2VPblNlbGVjdGlvbiA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgICBfZG9udENsb3NlT25TZWxlY3Rpb24gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIG1pbj86IERhdGU7XG4gICAgQElucHV0KCkgc2VsZWN0aW9uPzoge3N0YXJ0PzogRGF0ZSwgZW5kPzogRGF0ZX0gfCBEYXRlO1xuXG4gICAgQElucHV0KCkgc2V0IG5vRnV0dXJlKHZhbHVlKSB7IHRoaXMuX25vRnV0dXJlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICAgIF9ub0Z1dHVyZSA9IGZhbHNlO1xuXG4gICAgQE91dHB1dCgpIHNlbGVjdDogRXZlbnRFbWl0dGVyPERhdGUgfCBudWxsPiA9IG5ldyBFdmVudEVtaXR0ZXI8RGF0ZT4oKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgcG9wdXBTZXJ2aWNlOiBQb3B1cFNlcnZpY2UsXG4gICAgICAgIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICBwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICAgICAgcHVibGljIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKHBvcHVwU2VydmljZSwgcmVuZGVyZXIsIGVsZW1lbnQsIGNkcik7XG4gICAgfVxuXG4gICAgb25TZWxlY3Rpb24oZGF0ZTogRGF0ZSB8IG51bGwpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9kb250Q2xvc2VPblNlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VsZWN0LmVtaXQoZGF0ZSk7XG4gICAgfVxuXG4gICAgb25PdXRzaWRlQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzTm9kZUZyb21DYWxlbmRhcihldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGlzTm9kZUZyb21DYWxlbmRhcihub2RlOiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodHlwZW9mIG5vZGUuY2xhc3NOYW1lID09PSAnc3RyaW5nJyAmJiBub2RlLmNsYXNzTmFtZS5pbmNsdWRlcygncGEtY2FsZW5kYXInKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoISFub2RlLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzTm9kZUZyb21DYWxlbmRhcihub2RlLnBhcmVudEVsZW1lbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19