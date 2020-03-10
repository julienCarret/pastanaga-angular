import { __decorate, __metadata } from "tslib";
import { Component, Input, HostListener } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
var ExpandListComponent = /** @class */ (function () {
    function ExpandListComponent() {
        this._large = false;
    }
    Object.defineProperty(ExpandListComponent.prototype, "large", {
        get: function () { return this._large; },
        set: function (value) { this._large = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    ExpandListComponent.prototype.focusOnNext = function ($event) {
        var parent = this.getParentExpand(($event.srcElement));
        if (!!parent && !!parent.nextElementSibling) {
            this.focusOnButton(parent.nextElementSibling, $event);
        }
    };
    ExpandListComponent.prototype.focusOnPrevious = function ($event) {
        var parent = this.getParentExpand(($event.srcElement));
        if (!!parent && !!parent.previousElementSibling) {
            this.focusOnButton(parent.previousElementSibling, $event);
        }
    };
    ExpandListComponent.prototype.focusOnButton = function (element, event) {
        var button = element.querySelector('button');
        if (!!button) {
            event.preventDefault();
            button.focus();
        }
    };
    ExpandListComponent.prototype.getParentExpand = function (element) {
        if (!element || element.tagName === 'PA-EXPAND') {
            return element;
        }
        else {
            return this.getParentExpand(element.parentElement);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], ExpandListComponent.prototype, "large", null);
    __decorate([
        HostListener('keydown.arrowDown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], ExpandListComponent.prototype, "focusOnNext", null);
    __decorate([
        HostListener('keydown.arrowUp', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], ExpandListComponent.prototype, "focusOnPrevious", null);
    ExpandListComponent = __decorate([
        Component({
            selector: 'pa-expand-list',
            template: "<div class=\"pa-expand-block\">\n    <div class=\"pa-expand\" role=\"tablist\" [class.pa-expand-full]=\"large\">\n        <ng-content></ng-content>\n    </div>\n</div>",
            styles: [":host{display:block}.pa-expand-block{background:#edf1f2;padding:50px}.pa-expand{width:33.75rem;max-width:calc(100% - .75rem);margin:0 auto}.pa-expand.pa-expand-full{width:100%}"]
        })
    ], ExpandListComponent);
    return ExpandListComponent;
}());
export { ExpandListComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGd1aWxsb3RpbmF3ZWIvcGFzdGFuYWdhLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvZXhwYW5kL2V4cGFuZC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBTzlEO0lBQUE7UUFJYyxXQUFNLEdBQUcsS0FBSyxDQUFDO0lBaUM3QixDQUFDO0lBbkNHLHNCQUFJLHNDQUFLO2FBQVQsY0FBdUIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUM1QyxVQUFVLEtBQWMsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O09BRDdCO0lBSzVDLHlDQUFXLEdBQVgsVUFBWSxNQUFxQjtRQUM3QixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFjLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUU7WUFDekMsSUFBSSxDQUFDLGFBQWEsQ0FBYyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDdEU7SUFDTCxDQUFDO0lBR0QsNkNBQWUsR0FBZixVQUFnQixNQUFxQjtRQUNqQyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFjLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLEVBQUU7WUFDN0MsSUFBSSxDQUFDLGFBQWEsQ0FBYyxNQUFNLENBQUMsc0JBQXNCLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDMUU7SUFDTCxDQUFDO0lBRUQsMkNBQWEsR0FBYixVQUFjLE9BQW9CLEVBQUUsS0FBb0I7UUFDcEQsSUFBTSxNQUFNLEdBQWdCLE9BQU8sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFO1lBQ1YsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNsQjtJQUNMLENBQUM7SUFFRCw2Q0FBZSxHQUFmLFVBQWdCLE9BQTJCO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sS0FBSyxXQUFXLEVBQUU7WUFDN0MsT0FBTyxPQUFPLENBQUM7U0FDbEI7YUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDdEQ7SUFDTCxDQUFDO0lBbENEO1FBREMsS0FBSyxFQUFFOzs7b0RBQ29DO0lBSzVDO1FBREMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7O3lDQUMxQixhQUFhOzswREFLaEM7SUFHRDtRQURDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzt5Q0FDcEIsYUFBYTs7OERBS3BDO0lBcEJRLG1CQUFtQjtRQUwvQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLG1MQUF5Qzs7U0FFNUMsQ0FBQztPQUNXLG1CQUFtQixDQXFDL0I7SUFBRCwwQkFBQztDQUFBLEFBckNELElBcUNDO1NBckNZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwYS1leHBhbmQtbGlzdCcsXG4gICAgdGVtcGxhdGVVcmw6ICdleHBhbmQtbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZXhwYW5kLWxpc3QuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBFeHBhbmRMaXN0Q29tcG9uZW50IHtcbiAgICBASW5wdXQoKVxuICAgIGdldCBsYXJnZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2xhcmdlOyB9XG4gICAgc2V0IGxhcmdlKHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX2xhcmdlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICAgIHByb3RlY3RlZCBfbGFyZ2UgPSBmYWxzZTtcblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uYXJyb3dEb3duJywgWyckZXZlbnQnXSlcbiAgICBmb2N1c09uTmV4dCgkZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRQYXJlbnRFeHBhbmQoPEhUTUxFbGVtZW50PigkZXZlbnQuc3JjRWxlbWVudCkpO1xuICAgICAgICBpZiAoISFwYXJlbnQgJiYgISFwYXJlbnQubmV4dEVsZW1lbnRTaWJsaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzT25CdXR0b24oPEhUTUxFbGVtZW50PnBhcmVudC5uZXh0RWxlbWVudFNpYmxpbmcsICRldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLmFycm93VXAnLCBbJyRldmVudCddKVxuICAgIGZvY3VzT25QcmV2aW91cygkZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRQYXJlbnRFeHBhbmQoPEhUTUxFbGVtZW50PigkZXZlbnQuc3JjRWxlbWVudCkpO1xuICAgICAgICBpZiAoISFwYXJlbnQgJiYgISFwYXJlbnQucHJldmlvdXNFbGVtZW50U2libGluZykge1xuICAgICAgICAgICAgdGhpcy5mb2N1c09uQnV0dG9uKDxIVE1MRWxlbWVudD5wYXJlbnQucHJldmlvdXNFbGVtZW50U2libGluZywgJGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvY3VzT25CdXR0b24oZWxlbWVudDogSFRNTEVsZW1lbnQsIGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IDxIVE1MRWxlbWVudD5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpO1xuICAgICAgICBpZiAoISFidXR0b24pIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBidXR0b24uZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFBhcmVudEV4cGFuZChlbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwpOiBIVE1MRWxlbWVudCB8IG51bGwge1xuICAgICAgICBpZiAoIWVsZW1lbnQgfHwgZWxlbWVudC50YWdOYW1lID09PSAnUEEtRVhQQU5EJykge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJlbnRFeHBhbmQoZWxlbWVudC5wYXJlbnRFbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==