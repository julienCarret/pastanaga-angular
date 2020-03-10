import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { getPositionnedParent, getRealPosition, PositionStyle } from '../common/utils';
import { PopupComponent } from './popup.component';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { PopupService } from './popup.service';
let PopupDirective = class PopupDirective {
    constructor(element, service) {
        this.element = element;
        this.service = service;
        this._popupOnRight = false;
        this._openedFromPopup = false;
    }
    set popupOnRight(value) { this._popupOnRight = coerceBooleanProperty(value); }
    set openedFromPopup(value) { this._openedFromPopup = coerceBooleanProperty(value); }
    ngOnInit() {
        this.element.nativeElement.setAttribute('aria-haspopup', true);
    }
    onClick($event, override, isContextual, useLast) {
        const menu = this.paPopup;
        if (!!menu) {
            if (menu.isDisplayed && !this._openedFromPopup) {
                menu.close();
            }
            else {
                let position;
                if (!useLast || !this.service.lastPosition) {
                    position = !isContextual && !!this.popupPosition ? this.popupPosition :
                        this.getPosition(override, isContextual && $event);
                    this.service.lastPosition = position;
                }
                else {
                    position = this.service.lastPosition;
                }
                menu.show(position);
            }
        }
        if ($event instanceof MouseEvent) {
            $event.preventDefault();
            $event.stopPropagation();
        }
    }
    /*
    Allow to trigger the dropdown open/close by clicking on another element than the one having the directive
    - event: the MouseEvent on the remote element
    - override: allow to force the CSS position, top, left, right, bottom properties
    - isContextual: true if we want the menu to be displayed at mouse position, false to display it aligned with the button
    - ignoreRemote: true if we want to position the menu only relatively to the button, not the clicked element
    - useLastPosition: true if we want to display the dropdown at the same position as the previous one
      (useful for dropdown menu triggering another dropdown).
      Note: it might not work if the first dropdown
    - useRealComputedPosition: [NOT RECOMMENDED] true if we want to compute the real position by iterating on the clicked element ancestors
      Its main purpose is to fight the margin defined by the Angular Material side menu. Prefer another option.
    */
    remoteClick(params) {
        if (!params.ignoreRemote && !params.useLastPosition) {
            this.remoteElement = params.event.currentTarget;
        }
        if (!params.useLastPosition && params.useRealComputedPosition && !!params.event.currentTarget) {
            const position = getRealPosition(params.event.currentTarget);
            params.override = { top: `${position.top}px`, left: `${position.left}px` };
        }
        this.onClick(params.event, params.override, params.isContextual, params.useLastPosition);
    }
    getPosition(override, contextualEvent) {
        const directiveElement = this.element.nativeElement;
        const clickedElement = this.remoteElement || directiveElement;
        const rect = contextualEvent ? {
            top: contextualEvent.y,
            bottom: contextualEvent.y,
            left: contextualEvent.x,
            right: contextualEvent.x,
        } : clickedElement.getBoundingClientRect();
        if (!this.rootParent) {
            this.rootParent = getPositionnedParent(directiveElement.parentElement || directiveElement);
        }
        const rootRect = this.rootParent.getBoundingClientRect();
        const top = rect.top - rootRect.top + this.rootParent.scrollTop;
        let position = {
            position: 'absolute',
            top: top + 'px',
        };
        if (this._popupOnRight || !!contextualEvent) {
            position.left = Math.min(rect.left - rootRect.left, window.innerWidth - 240) + 'px';
        }
        else {
            position.right = Math.min(rootRect.right - rect.right + 3, window.innerWidth - 240) + 'px';
        }
        if (!!override) {
            position = Object.assign(position, override);
        }
        return position;
    }
};
PopupDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: PopupService }
];
__decorate([
    Input(),
    __metadata("design:type", PopupComponent)
], PopupDirective.prototype, "paPopup", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], PopupDirective.prototype, "popupOnRight", null);
__decorate([
    Input(),
    __metadata("design:type", PositionStyle)
], PopupDirective.prototype, "popupPosition", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], PopupDirective.prototype, "openedFromPopup", null);
__decorate([
    HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent, PositionStyle, Boolean, Boolean]),
    __metadata("design:returntype", void 0)
], PopupDirective.prototype, "onClick", null);
PopupDirective = __decorate([
    Directive({
        selector: '[paPopup]',
        exportAs: 'paPopupRef',
    }),
    __metadata("design:paramtypes", [ElementRef,
        PopupService])
], PopupDirective);
export { PopupDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGd1aWxsb3RpbmF3ZWIvcGFzdGFuYWdhLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvcG9wdXAvcG9wdXAuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFlL0MsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQVd2QixZQUNZLE9BQW1CLEVBQ25CLE9BQXFCO1FBRHJCLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIsWUFBTyxHQUFQLE9BQU8sQ0FBYztRQVZqQyxrQkFBYSxHQUFHLEtBQUssQ0FBQztRQU10QixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7SUFLdEIsQ0FBQztJQVpLLElBQUksWUFBWSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUc5RSxJQUFJLGVBQWUsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLGdCQUFnQixHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQVc3RixRQUFRO1FBQ0osSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBR0QsT0FBTyxDQUFD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QixVQUFVLEVBQWEsYUFBYTs7NkNBcUJuRDtBQTFDUSxjQUFjO0lBSjFCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFFBQVEsRUFBRSxZQUFZO0tBQ3pCLENBQUM7cUNBYXVCLFVBQVU7UUFDVixZQUFZO0dBYnhCLGNBQWMsQ0FpRzFCO1NBakdZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZ2V0UG9zaXRpb25uZWRQYXJlbnQsIGdldFJlYWxQb3NpdGlvbiwgUG9zaXRpb25TdHlsZSB9IGZyb20gJy4uL2NvbW1vbi91dGlscyc7XG5pbXBvcnQgeyBQb3B1cENvbXBvbmVudCB9IGZyb20gJy4vcG9wdXAuY29tcG9uZW50JztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBQb3B1cFNlcnZpY2UgfSBmcm9tICcuL3BvcHVwLnNlcnZpY2UnO1xuXG5pbnRlcmZhY2UgUmVtb3RlQ2xpY2tQYXJhbXMge1xuICAgIGV2ZW50OiBNb3VzZUV2ZW50O1xuICAgIG92ZXJyaWRlPzogUG9zaXRpb25TdHlsZTtcbiAgICBpc0NvbnRleHR1YWw/OiBib29sZWFuO1xuICAgIGlnbm9yZVJlbW90ZT86IGJvb2xlYW47XG4gICAgdXNlTGFzdFBvc2l0aW9uPzogYm9vbGVhbjtcbiAgICB1c2VSZWFsQ29tcHV0ZWRQb3NpdGlvbj86IGJvb2xlYW47XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BhUG9wdXBdJyxcbiAgICBleHBvcnRBczogJ3BhUG9wdXBSZWYnLFxufSlcbmV4cG9ydCBjbGFzcyBQb3B1cERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgcGFQb3B1cD86IFBvcHVwQ29tcG9uZW50O1xuICAgIEBJbnB1dCgpIHNldCBwb3B1cE9uUmlnaHQodmFsdWUpIHsgdGhpcy5fcG9wdXBPblJpZ2h0ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICAgIF9wb3B1cE9uUmlnaHQgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBwb3B1cFBvc2l0aW9uPzogUG9zaXRpb25TdHlsZTtcbiAgICBASW5wdXQoKSBzZXQgb3BlbmVkRnJvbVBvcHVwKHZhbHVlKSB7IHRoaXMuX29wZW5lZEZyb21Qb3B1cCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgICByb290UGFyZW50PzogSFRNTEVsZW1lbnQ7XG4gICAgcmVtb3RlRWxlbWVudD86IEhUTUxFbGVtZW50O1xuXG4gICAgX29wZW5lZEZyb21Qb3B1cCA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBzZXJ2aWNlOiBQb3B1cFNlcnZpY2UsXG4gICAgKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oYXNwb3B1cCcsIHRydWUpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgICBvbkNsaWNrKCRldmVudDogTW91c2VFdmVudCwgb3ZlcnJpZGU/OiBQb3NpdGlvblN0eWxlLCBpc0NvbnRleHR1YWw/OiBib29sZWFuLCB1c2VMYXN0PzogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBtZW51ID0gdGhpcy5wYVBvcHVwO1xuICAgICAgICBpZiAoISFtZW51KSB7XG4gICAgICAgICAgICBpZiAobWVudS5pc0Rpc3BsYXllZCAmJiAhdGhpcy5fb3BlbmVkRnJvbVBvcHVwKSB7XG4gICAgICAgICAgICAgICAgbWVudS5jbG9zZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgcG9zaXRpb246IFBvc2l0aW9uU3R5bGU7XG4gICAgICAgICAgICAgICAgaWYgKCF1c2VMYXN0IHx8ICF0aGlzLnNlcnZpY2UubGFzdFBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gIWlzQ29udGV4dHVhbCAmJiAhIXRoaXMucG9wdXBQb3NpdGlvbiA/IHRoaXMucG9wdXBQb3NpdGlvbiA6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFBvc2l0aW9uKG92ZXJyaWRlLCBpc0NvbnRleHR1YWwgJiYgJGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmxhc3RQb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gdGhpcy5zZXJ2aWNlLmxhc3RQb3NpdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbWVudS5zaG93KHBvc2l0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoJGV2ZW50IGluc3RhbmNlb2YgTW91c2VFdmVudCkge1xuICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKlxuICAgIEFsbG93IHRvIHRyaWdnZXIgdGhlIGRyb3Bkb3duIG9wZW4vY2xvc2UgYnkgY2xpY2tpbmcgb24gYW5vdGhlciBlbGVtZW50IHRoYW4gdGhlIG9uZSBoYXZpbmcgdGhlIGRpcmVjdGl2ZVxuICAgIC0gZXZlbnQ6IHRoZSBNb3VzZUV2ZW50IG9uIHRoZSByZW1vdGUgZWxlbWVudFxuICAgIC0gb3ZlcnJpZGU6IGFsbG93IHRvIGZvcmNlIHRoZSBDU1MgcG9zaXRpb24sIHRvcCwgbGVmdCwgcmlnaHQsIGJvdHRvbSBwcm9wZXJ0aWVzXG4gICAgLSBpc0NvbnRleHR1YWw6IHRydWUgaWYgd2Ugd2FudCB0aGUgbWVudSB0byBiZSBkaXNwbGF5ZWQgYXQgbW91c2UgcG9zaXRpb24sIGZhbHNlIHRvIGRpc3BsYXkgaXQgYWxpZ25lZCB3aXRoIHRoZSBidXR0b25cbiAgICAtIGlnbm9yZVJlbW90ZTogdHJ1ZSBpZiB3ZSB3YW50IHRvIHBvc2l0aW9uIHRoZSBtZW51IG9ubHkgcmVsYXRpdmVseSB0byB0aGUgYnV0dG9uLCBub3QgdGhlIGNsaWNrZWQgZWxlbWVudFxuICAgIC0gdXNlTGFzdFBvc2l0aW9uOiB0cnVlIGlmIHdlIHdhbnQgdG8gZGlzcGxheSB0aGUgZHJvcGRvd24gYXQgdGhlIHNhbWUgcG9zaXRpb24gYXMgdGhlIHByZXZpb3VzIG9uZVxuICAgICAgKHVzZWZ1bCBmb3IgZHJvcGRvd24gbWVudSB0cmlnZ2VyaW5nIGFub3RoZXIgZHJvcGRvd24pLlxuICAgICAgTm90ZTogaXQgbWlnaHQgbm90IHdvcmsgaWYgdGhlIGZpcnN0IGRyb3Bkb3duXG4gICAgLSB1c2VSZWFsQ29tcHV0ZWRQb3NpdGlvbjogW05PVCBSRUNPTU1FTkRFRF0gdHJ1ZSBpZiB3ZSB3YW50IHRvIGNvbXB1dGUgdGhlIHJlYWwgcG9zaXRpb24gYnkgaXRlcmF0aW5nIG9uIHRoZSBjbGlja2VkIGVsZW1lbnQgYW5jZXN0b3JzXG4gICAgICBJdHMgbWFpbiBwdXJwb3NlIGlzIHRvIGZpZ2h0IHRoZSBtYXJnaW4gZGVmaW5lZCBieSB0aGUgQW5ndWxhciBNYXRlcmlhbCBzaWRlIG1lbnUuIFByZWZlciBhbm90aGVyIG9wdGlvbi5cbiAgICAqL1xuICAgIHJlbW90ZUNsaWNrKHBhcmFtczogUmVtb3RlQ2xpY2tQYXJhbXMpIHtcbiAgICAgICAgaWYgKCFwYXJhbXMuaWdub3JlUmVtb3RlICYmICFwYXJhbXMudXNlTGFzdFBvc2l0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW90ZUVsZW1lbnQgPSBwYXJhbXMuZXZlbnQuY3VycmVudFRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXBhcmFtcy51c2VMYXN0UG9zaXRpb24gJiYgcGFyYW1zLnVzZVJlYWxDb21wdXRlZFBvc2l0aW9uICYmICEhcGFyYW1zLmV2ZW50LmN1cnJlbnRUYXJnZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uID0gZ2V0UmVhbFBvc2l0aW9uKHBhcmFtcy5ldmVudC5jdXJyZW50VGFyZ2V0IGFzIEhUTUxFbGVtZW50KTtcbiAgICAgICAgICAgIHBhcmFtcy5vdmVycmlkZSA9IHt0b3A6IGAke3Bvc2l0aW9uLnRvcH1weGAsIGxlZnQ6IGAke3Bvc2l0aW9uLmxlZnR9cHhgfTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uQ2xpY2socGFyYW1zLmV2ZW50LCBwYXJhbXMub3ZlcnJpZGUsIHBhcmFtcy5pc0NvbnRleHR1YWwsIHBhcmFtcy51c2VMYXN0UG9zaXRpb24pO1xuICAgIH1cblxuICAgIGdldFBvc2l0aW9uKG92ZXJyaWRlPzogUG9zaXRpb25TdHlsZSwgY29udGV4dHVhbEV2ZW50PzogTW91c2VFdmVudCB8IGZhbHNlKTogUG9zaXRpb25TdHlsZSB7XG4gICAgICAgIGNvbnN0IGRpcmVjdGl2ZUVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGNsaWNrZWRFbGVtZW50OiBIVE1MRWxlbWVudCA9IHRoaXMucmVtb3RlRWxlbWVudCB8fCBkaXJlY3RpdmVFbGVtZW50O1xuICAgICAgICBjb25zdCByZWN0ID0gY29udGV4dHVhbEV2ZW50ID8ge1xuICAgICAgICAgICAgdG9wOiBjb250ZXh0dWFsRXZlbnQueSxcbiAgICAgICAgICAgIGJvdHRvbTogY29udGV4dHVhbEV2ZW50LnksXG4gICAgICAgICAgICBsZWZ0OiBjb250ZXh0dWFsRXZlbnQueCxcbiAgICAgICAgICAgIHJpZ2h0OiBjb250ZXh0dWFsRXZlbnQueCxcbiAgICAgICAgfSA6IGNsaWNrZWRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBpZiAoIXRoaXMucm9vdFBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5yb290UGFyZW50ID0gZ2V0UG9zaXRpb25uZWRQYXJlbnQoZGlyZWN0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50IHx8IGRpcmVjdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJvb3RSZWN0ID0gdGhpcy5yb290UGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBjb25zdCB0b3AgPSAgcmVjdC50b3AgLSByb290UmVjdC50b3AgKyB0aGlzLnJvb3RQYXJlbnQuc2Nyb2xsVG9wO1xuXG4gICAgICAgIGxldCBwb3NpdGlvbjogUG9zaXRpb25TdHlsZSA9IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgdG9wOiB0b3AgKyAncHgnLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5fcG9wdXBPblJpZ2h0IHx8ICEhY29udGV4dHVhbEV2ZW50KSB7XG4gICAgICAgICAgICBwb3NpdGlvbi5sZWZ0ID0gTWF0aC5taW4ocmVjdC5sZWZ0IC0gcm9vdFJlY3QubGVmdCwgd2luZG93LmlubmVyV2lkdGggLSAyNDApICsgJ3B4JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBvc2l0aW9uLnJpZ2h0ID0gTWF0aC5taW4ocm9vdFJlY3QucmlnaHQgLSByZWN0LnJpZ2h0ICsgMywgd2luZG93LmlubmVyV2lkdGggLSAyNDApICsgJ3B4JztcbiAgICAgICAgfVxuICAgICAgICBpZiAoISFvdmVycmlkZSkge1xuICAgICAgICAgICAgcG9zaXRpb24gPSBPYmplY3QuYXNzaWduKHBvc2l0aW9uLCBvdmVycmlkZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcG9zaXRpb247XG4gICAgfVxufVxuIl19