import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { getPositionnedParent, getRealPosition, PositionStyle } from '../common/utils';
import { PopupComponent } from './popup.component';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { PopupService } from './popup.service';
var PopupDirective = /** @class */ (function () {
    function PopupDirective(element, service) {
        this.element = element;
        this.service = service;
        this._popupOnRight = false;
        this._openedFromPopup = false;
    }
    Object.defineProperty(PopupDirective.prototype, "popupOnRight", {
        set: function (value) { this._popupOnRight = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupDirective.prototype, "openedFromPopup", {
        set: function (value) { this._openedFromPopup = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    PopupDirective.prototype.ngOnInit = function () {
        this.element.nativeElement.setAttribute('aria-haspopup', true);
    };
    PopupDirective.prototype.onClick = function ($event, override, isContextual, useLast) {
        var menu = this.paPopup;
        if (!!menu) {
            if (menu.isDisplayed && !this._openedFromPopup) {
                menu.close();
            }
            else {
                var position = void 0;
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
    };
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
    PopupDirective.prototype.remoteClick = function (params) {
        if (!params.ignoreRemote && !params.useLastPosition) {
            this.remoteElement = params.event.currentTarget;
        }
        if (!params.useLastPosition && params.useRealComputedPosition && !!params.event.currentTarget) {
            var position = getRealPosition(params.event.currentTarget);
            params.override = { top: position.top + "px", left: position.left + "px" };
        }
        this.onClick(params.event, params.override, params.isContextual, params.useLastPosition);
    };
    PopupDirective.prototype.getPosition = function (override, contextualEvent) {
        var directiveElement = this.element.nativeElement;
        var clickedElement = this.remoteElement || directiveElement;
        var rect = contextualEvent ? {
            top: contextualEvent.y,
            bottom: contextualEvent.y,
            left: contextualEvent.x,
            right: contextualEvent.x,
        } : clickedElement.getBoundingClientRect();
        if (!this.rootParent) {
            this.rootParent = getPositionnedParent(directiveElement.parentElement || directiveElement);
        }
        var rootRect = this.rootParent.getBoundingClientRect();
        var top = rect.top - rootRect.top + this.rootParent.scrollTop;
        var position = {
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
    };
    PopupDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: PopupService }
    ]; };
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
    return PopupDirective;
}());
export { PopupDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGd1aWxsb3RpbmF3ZWIvcGFzdGFuYWdhLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvcG9wdXAvcG9wdXAuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFlL0M7SUFXSSx3QkFDWSxPQUFtQixFQUNuQixPQUFxQjtRQURyQixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLFlBQU8sR0FBUCxPQUFPLENBQWM7UUFWakMsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFNdEIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO0lBS3RCLENBQUM7SUFaSyxzQkFBSSx3Q0FBWTthQUFoQixVQUFpQixLQUFLLElBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRzlFLHNCQUFJLDJDQUFlO2FBQW5CLFVBQW9CLEtBQUssSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQVc3RixpQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lB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Q0FBQyxDQUFDOzt5Q0FDbEIsVUFBVSxFQUFhLGFBQWE7O2lEQXFCbkQ7SUExQ1EsY0FBYztRQUoxQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsV0FBVztZQUNyQixRQUFRLEVBQUUsWUFBWTtTQUN6QixDQUFDO3lDQWF1QixVQUFVO1lBQ1YsWUFBWTtPQWJ4QixjQUFjLENBaUcxQjtJQUFELHFCQUFDO0NBQUEsQUFqR0QsSUFpR0M7U0FqR1ksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBnZXRQb3NpdGlvbm5lZFBhcmVudCwgZ2V0UmVhbFBvc2l0aW9uLCBQb3NpdGlvblN0eWxlIH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcbmltcG9ydCB7IFBvcHVwQ29tcG9uZW50IH0gZnJvbSAnLi9wb3B1cC5jb21wb25lbnQnO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IFBvcHVwU2VydmljZSB9IGZyb20gJy4vcG9wdXAuc2VydmljZSc7XG5cbmludGVyZmFjZSBSZW1vdGVDbGlja1BhcmFtcyB7XG4gICAgZXZlbnQ6IE1vdXNlRXZlbnQ7XG4gICAgb3ZlcnJpZGU/OiBQb3NpdGlvblN0eWxlO1xuICAgIGlzQ29udGV4dHVhbD86IGJvb2xlYW47XG4gICAgaWdub3JlUmVtb3RlPzogYm9vbGVhbjtcbiAgICB1c2VMYXN0UG9zaXRpb24/OiBib29sZWFuO1xuICAgIHVzZVJlYWxDb21wdXRlZFBvc2l0aW9uPzogYm9vbGVhbjtcbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcGFQb3B1cF0nLFxuICAgIGV4cG9ydEFzOiAncGFQb3B1cFJlZicsXG59KVxuZXhwb3J0IGNsYXNzIFBvcHVwRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBwYVBvcHVwPzogUG9wdXBDb21wb25lbnQ7XG4gICAgQElucHV0KCkgc2V0IHBvcHVwT25SaWdodCh2YWx1ZSkgeyB0aGlzLl9wb3B1cE9uUmlnaHQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gICAgX3BvcHVwT25SaWdodCA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHBvcHVwUG9zaXRpb24/OiBQb3NpdGlvblN0eWxlO1xuICAgIEBJbnB1dCgpIHNldCBvcGVuZWRGcm9tUG9wdXAodmFsdWUpIHsgdGhpcy5fb3BlbmVkRnJvbVBvcHVwID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICAgIHJvb3RQYXJlbnQ/OiBIVE1MRWxlbWVudDtcbiAgICByZW1vdGVFbGVtZW50PzogSFRNTEVsZW1lbnQ7XG5cbiAgICBfb3BlbmVkRnJvbVBvcHVwID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIHNlcnZpY2U6IFBvcHVwU2VydmljZSxcbiAgICApIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhhc3BvcHVwJywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICAgIG9uQ2xpY2soJGV2ZW50OiBNb3VzZUV2ZW50LCBvdmVycmlkZT86IFBvc2l0aW9uU3R5bGUsIGlzQ29udGV4dHVhbD86IGJvb2xlYW4sIHVzZUxhc3Q/OiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IG1lbnUgPSB0aGlzLnBhUG9wdXA7XG4gICAgICAgIGlmICghIW1lbnUpIHtcbiAgICAgICAgICAgIGlmIChtZW51LmlzRGlzcGxheWVkICYmICF0aGlzLl9vcGVuZWRGcm9tUG9wdXApIHtcbiAgICAgICAgICAgICAgICBtZW51LmNsb3NlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBwb3NpdGlvbjogUG9zaXRpb25TdHlsZTtcbiAgICAgICAgICAgICAgICBpZiAoIXVzZUxhc3QgfHwgIXRoaXMuc2VydmljZS5sYXN0UG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gPSAhaXNDb250ZXh0dWFsICYmICEhdGhpcy5wb3B1cFBvc2l0aW9uID8gdGhpcy5wb3B1cFBvc2l0aW9uIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UG9zaXRpb24ob3ZlcnJpZGUsIGlzQ29udGV4dHVhbCAmJiAkZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2UubGFzdFBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gPSB0aGlzLnNlcnZpY2UubGFzdFBvc2l0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtZW51LnNob3cocG9zaXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICgkZXZlbnQgaW5zdGFuY2VvZiBNb3VzZUV2ZW50KSB7XG4gICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgQWxsb3cgdG8gdHJpZ2dlciB0aGUgZHJvcGRvd24gb3Blbi9jbG9zZSBieSBjbGlja2luZyBvbiBhbm90aGVyIGVsZW1lbnQgdGhhbiB0aGUgb25lIGhhdmluZyB0aGUgZGlyZWN0aXZlXG4gICAgLSBldmVudDogdGhlIE1vdXNlRXZlbnQgb24gdGhlIHJlbW90ZSBlbGVtZW50XG4gICAgLSBvdmVycmlkZTogYWxsb3cgdG8gZm9yY2UgdGhlIENTUyBwb3NpdGlvbiwgdG9wLCBsZWZ0LCByaWdodCwgYm90dG9tIHByb3BlcnRpZXNcbiAgICAtIGlzQ29udGV4dHVhbDogdHJ1ZSBpZiB3ZSB3YW50IHRoZSBtZW51IHRvIGJlIGRpc3BsYXllZCBhdCBtb3VzZSBwb3NpdGlvbiwgZmFsc2UgdG8gZGlzcGxheSBpdCBhbGlnbmVkIHdpdGggdGhlIGJ1dHRvblxuICAgIC0gaWdub3JlUmVtb3RlOiB0cnVlIGlmIHdlIHdhbnQgdG8gcG9zaXRpb24gdGhlIG1lbnUgb25seSByZWxhdGl2ZWx5IHRvIHRoZSBidXR0b24sIG5vdCB0aGUgY2xpY2tlZCBlbGVtZW50XG4gICAgLSB1c2VMYXN0UG9zaXRpb246IHRydWUgaWYgd2Ugd2FudCB0byBkaXNwbGF5IHRoZSBkcm9wZG93biBhdCB0aGUgc2FtZSBwb3NpdGlvbiBhcyB0aGUgcHJldmlvdXMgb25lXG4gICAgICAodXNlZnVsIGZvciBkcm9wZG93biBtZW51IHRyaWdnZXJpbmcgYW5vdGhlciBkcm9wZG93bikuXG4gICAgICBOb3RlOiBpdCBtaWdodCBub3Qgd29yayBpZiB0aGUgZmlyc3QgZHJvcGRvd25cbiAgICAtIHVzZVJlYWxDb21wdXRlZFBvc2l0aW9uOiBbTk9UIFJFQ09NTUVOREVEXSB0cnVlIGlmIHdlIHdhbnQgdG8gY29tcHV0ZSB0aGUgcmVhbCBwb3NpdGlvbiBieSBpdGVyYXRpbmcgb24gdGhlIGNsaWNrZWQgZWxlbWVudCBhbmNlc3RvcnNcbiAgICAgIEl0cyBtYWluIHB1cnBvc2UgaXMgdG8gZmlnaHQgdGhlIG1hcmdpbiBkZWZpbmVkIGJ5IHRoZSBBbmd1bGFyIE1hdGVyaWFsIHNpZGUgbWVudS4gUHJlZmVyIGFub3RoZXIgb3B0aW9uLlxuICAgICovXG4gICAgcmVtb3RlQ2xpY2socGFyYW1zOiBSZW1vdGVDbGlja1BhcmFtcykge1xuICAgICAgICBpZiAoIXBhcmFtcy5pZ25vcmVSZW1vdGUgJiYgIXBhcmFtcy51c2VMYXN0UG9zaXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3RlRWxlbWVudCA9IHBhcmFtcy5ldmVudC5jdXJyZW50VGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIGlmICghcGFyYW1zLnVzZUxhc3RQb3NpdGlvbiAmJiBwYXJhbXMudXNlUmVhbENvbXB1dGVkUG9zaXRpb24gJiYgISFwYXJhbXMuZXZlbnQuY3VycmVudFRhcmdldCkge1xuICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSBnZXRSZWFsUG9zaXRpb24ocGFyYW1zLmV2ZW50LmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQpO1xuICAgICAgICAgICAgcGFyYW1zLm92ZXJyaWRlID0ge3RvcDogYCR7cG9zaXRpb24udG9wfXB4YCwgbGVmdDogYCR7cG9zaXRpb24ubGVmdH1weGB9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25DbGljayhwYXJhbXMuZXZlbnQsIHBhcmFtcy5vdmVycmlkZSwgcGFyYW1zLmlzQ29udGV4dHVhbCwgcGFyYW1zLnVzZUxhc3RQb3NpdGlvbik7XG4gICAgfVxuXG4gICAgZ2V0UG9zaXRpb24ob3ZlcnJpZGU/OiBQb3NpdGlvblN0eWxlLCBjb250ZXh0dWFsRXZlbnQ/OiBNb3VzZUV2ZW50IHwgZmFsc2UpOiBQb3NpdGlvblN0eWxlIHtcbiAgICAgICAgY29uc3QgZGlyZWN0aXZlRWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICAgICAgY29uc3QgY2xpY2tlZEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gdGhpcy5yZW1vdGVFbGVtZW50IHx8IGRpcmVjdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHJlY3QgPSBjb250ZXh0dWFsRXZlbnQgPyB7XG4gICAgICAgICAgICB0b3A6IGNvbnRleHR1YWxFdmVudC55LFxuICAgICAgICAgICAgYm90dG9tOiBjb250ZXh0dWFsRXZlbnQueSxcbiAgICAgICAgICAgIGxlZnQ6IGNvbnRleHR1YWxFdmVudC54LFxuICAgICAgICAgICAgcmlnaHQ6IGNvbnRleHR1YWxFdmVudC54LFxuICAgICAgICB9IDogY2xpY2tlZEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGlmICghdGhpcy5yb290UGFyZW50KSB7XG4gICAgICAgICAgICB0aGlzLnJvb3RQYXJlbnQgPSBnZXRQb3NpdGlvbm5lZFBhcmVudChkaXJlY3RpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQgfHwgZGlyZWN0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgcm9vdFJlY3QgPSB0aGlzLnJvb3RQYXJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IHRvcCA9ICByZWN0LnRvcCAtIHJvb3RSZWN0LnRvcCArIHRoaXMucm9vdFBhcmVudC5zY3JvbGxUb3A7XG5cbiAgICAgICAgbGV0IHBvc2l0aW9uOiBQb3NpdGlvblN0eWxlID0ge1xuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICB0b3A6IHRvcCArICdweCcsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLl9wb3B1cE9uUmlnaHQgfHwgISFjb250ZXh0dWFsRXZlbnQpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uLmxlZnQgPSBNYXRoLm1pbihyZWN0LmxlZnQgLSByb290UmVjdC5sZWZ0LCB3aW5kb3cuaW5uZXJXaWR0aCAtIDI0MCkgKyAncHgnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcG9zaXRpb24ucmlnaHQgPSBNYXRoLm1pbihyb290UmVjdC5yaWdodCAtIHJlY3QucmlnaHQgKyAzLCB3aW5kb3cuaW5uZXJXaWR0aCAtIDI0MCkgKyAncHgnO1xuICAgICAgICB9XG4gICAgICAgIGlmICghIW92ZXJyaWRlKSB7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IE9iamVjdC5hc3NpZ24ocG9zaXRpb24sIG92ZXJyaWRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwb3NpdGlvbjtcbiAgICB9XG59XG4iXX0=