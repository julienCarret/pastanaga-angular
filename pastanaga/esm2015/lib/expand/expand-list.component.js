import { __decorate, __metadata } from "tslib";
import { Component, Input, HostListener } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
let ExpandListComponent = class ExpandListComponent {
    constructor() {
        this._large = false;
    }
    get large() { return this._large; }
    set large(value) { this._large = coerceBooleanProperty(value); }
    focusOnNext($event) {
        const parent = this.getParentExpand(($event.srcElement));
        if (!!parent && !!parent.nextElementSibling) {
            this.focusOnButton(parent.nextElementSibling, $event);
        }
    }
    focusOnPrevious($event) {
        const parent = this.getParentExpand(($event.srcElement));
        if (!!parent && !!parent.previousElementSibling) {
            this.focusOnButton(parent.previousElementSibling, $event);
        }
    }
    focusOnButton(element, event) {
        const button = element.querySelector('button');
        if (!!button) {
            event.preventDefault();
            button.focus();
        }
    }
    getParentExpand(element) {
        if (!element || element.tagName === 'PA-EXPAND') {
            return element;
        }
        else {
            return this.getParentExpand(element.parentElement);
        }
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
export { ExpandListComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGd1aWxsb3RpbmF3ZWIvcGFzdGFuYWdhLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvZXhwYW5kL2V4cGFuZC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBTzlELElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW1CO0lBQWhDO1FBSWMsV0FBTSxHQUFHLEtBQUssQ0FBQztJQWlDN0IsQ0FBQztJQW5DRyxJQUFJLEtBQUssS0FBYyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzVDLElBQUksS0FBSyxDQUFDLEtBQWMsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUl6RSxXQUFXLENBQUMsTUFBcUI7UUFDN0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBYyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFO1lBQ3pDLElBQUksQ0FBQyxhQUFhLENBQWMsTUFBTSxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3RFO0lBQ0wsQ0FBQztJQUdELGVBQWUsQ0FBQyxNQUFxQjtRQUNqQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFjLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLEVBQUU7WUFDN0MsSUFBSSxDQUFDLGFBQWEsQ0FBYyxNQUFNLENBQUMsc0JBQXNCLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDMUU7SUFDTCxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQW9CLEVBQUUsS0FBb0I7UUFDcEQsTUFBTSxNQUFNLEdBQWdCLE9BQU8sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFO1lBQ1YsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNsQjtJQUNMLENBQUM7SUFFRCxlQUFlLENBQUMsT0FBMkI7UUFDdkMsSUFBSSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxLQUFLLFdBQVcsRUFBRTtZQUM3QyxPQUFPLE9BQU8sQ0FBQztTQUNsQjthQUFNO1lBQ0gsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUN0RDtJQUNMLENBQUM7Q0FDSixDQUFBO0FBbkNHO0lBREMsS0FBSyxFQUFFOzs7Z0RBQ29DO0FBSzVDO0lBREMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7O3FDQUMxQixhQUFhOztzREFLaEM7QUFHRDtJQURDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztxQ0FDcEIsYUFBYTs7MERBS3BDO0FBcEJRLG1CQUFtQjtJQUwvQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLG1MQUF5Qzs7S0FFNUMsQ0FBQztHQUNXLG1CQUFtQixDQXFDL0I7U0FyQ1ksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3BhLWV4cGFuZC1saXN0JyxcbiAgICB0ZW1wbGF0ZVVybDogJ2V4cGFuZC1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9leHBhbmQtbGlzdC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEV4cGFuZExpc3RDb21wb25lbnQge1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGxhcmdlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fbGFyZ2U7IH1cbiAgICBzZXQgbGFyZ2UodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5fbGFyZ2UgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gICAgcHJvdGVjdGVkIF9sYXJnZSA9IGZhbHNlO1xuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5hcnJvd0Rvd24nLCBbJyRldmVudCddKVxuICAgIGZvY3VzT25OZXh0KCRldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmdldFBhcmVudEV4cGFuZCg8SFRNTEVsZW1lbnQ+KCRldmVudC5zcmNFbGVtZW50KSk7XG4gICAgICAgIGlmICghIXBhcmVudCAmJiAhIXBhcmVudC5uZXh0RWxlbWVudFNpYmxpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNPbkJ1dHRvbig8SFRNTEVsZW1lbnQ+cGFyZW50Lm5leHRFbGVtZW50U2libGluZywgJGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uYXJyb3dVcCcsIFsnJGV2ZW50J10pXG4gICAgZm9jdXNPblByZXZpb3VzKCRldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmdldFBhcmVudEV4cGFuZCg8SFRNTEVsZW1lbnQ+KCRldmVudC5zcmNFbGVtZW50KSk7XG4gICAgICAgIGlmICghIXBhcmVudCAmJiAhIXBhcmVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzT25CdXR0b24oPEhUTUxFbGVtZW50PnBhcmVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLCAkZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9jdXNPbkJ1dHRvbihlbGVtZW50OiBIVE1MRWxlbWVudCwgZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgY29uc3QgYnV0dG9uID0gPEhUTUxFbGVtZW50PmVsZW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uJyk7XG4gICAgICAgIGlmICghIWJ1dHRvbikge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJ1dHRvbi5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UGFyZW50RXhwYW5kKGVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XG4gICAgICAgIGlmICghZWxlbWVudCB8fCBlbGVtZW50LnRhZ05hbWUgPT09ICdQQS1FWFBBTkQnKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFBhcmVudEV4cGFuZChlbGVtZW50LnBhcmVudEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19