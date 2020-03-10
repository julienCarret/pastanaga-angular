import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
let PaginationComponent = class PaginationComponent {
    constructor() {
        this.total = 0;
        this.page = 0;
        this.pageSize = 20;
        this.goTo = new EventEmitter();
        this.pages = [];
    }
    ngOnChanges(changes) {
        if (changes.total && changes.total.currentValue && changes.total.currentValue !== changes.total.previousValue) {
            this.computePages();
        }
    }
    back() {
        this.goTo.emit(this.page - 1);
    }
    next() {
        this.goTo.emit(this.page + 1);
    }
    goToPage(pageNumber) {
        this.goTo.emit(pageNumber);
    }
    goToFirst() {
        this.goTo.emit(this.pages[0]);
    }
    goToLast() {
        this.goTo.emit(this.pages[this.pages.length - 1]);
    }
    computePages() {
        if (!!this.total) {
            const totalPages = Math.ceil(this.total / this.pageSize);
            this.pages = Array.apply(null, { length: totalPages }).map(Number.call, Number).map(p => p + 1); // => [1, 2, ...]
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], PaginationComponent.prototype, "total", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PaginationComponent.prototype, "page", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PaginationComponent.prototype, "pageSize", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], PaginationComponent.prototype, "goTo", void 0);
PaginationComponent = __decorate([
    Component({
        selector: 'pa-pagination',
        template: "<nav role=\"navigation\" *ngIf=\"pages.length > 1\">\n    <ul>\n        <li>\n            <a class=\"pa-pagination-link pa-button pa-button-primary pa-button-small\" tabindex=\"0\" [attr.aria-disabled]=\"page === pages[0]\"\n               (click)=\"goToFirst()\" paTooltip=\"common.previous\" paTooltipType=\"action\"><span class=\"pa-button-wrapper\" tabindex=\"-1\"><span class=\"pa-button-label pa-sr\" translate>pagination.first-page</span>\n                    <pa-icon name=\"tab-backwards\"></pa-icon>\n                </span>\n            </a>\n        </li>\n        <li>\n            <a class=\"pa-pagination-link pa-button pa-button-primary pa-button-small\" tabindex=\"0\" [attr.aria-disabled]=\"page === pages[0]\"\n               (click)=\"back()\" paTooltip=\"common.previous\" paTooltipType=\"action\"><span class=\"pa-button-wrapper\" tabindex=\"-1\"><span class=\"pa-button-label pa-sr\" translate>pagination.first-page</span>\n                    <pa-icon name=\"backspace\"></pa-icon>\n                </span>\n            </a>\n        </li>\n        <li *ngFor=\"let p of pages\">\n            <a class=\"pa-pagination-link pa-button pa-button-primary pa-button-small\" tabindex=\"0\" [attr.aria-current]=\"p === page\"\n               (click)=\"goToPage(p)\"><span class=\"pa-button-wrapper\" tabindex=\"-1\"><span class=\"pa-button-label\">\n                    <span class=\"pa-sr\" translate>{{p === page ? 'pagination.current-page' : 'pagination.go-to-page'}}</span> {{p}}</span></span>\n            </a>\n        </li>\n        <li>\n            <a class=\"pa-pagination-link pa-button pa-button-primary pa-button-small\" tabindex=\"0\" [attr.aria-disabled]=\"page === pages[pages.length - 1]\"\n               (click)=\"next()\" paTooltip=\"common.previous\" paTooltipType=\"action\"><span class=\"pa-button-wrapper\" tabindex=\"-1\"><span class=\"pa-button-label pa-sr\" translate>pagination.last-page</span>\n                    <pa-icon name=\"confirm\"></pa-icon>\n                </span>\n            </a>\n        </li>\n        <li>\n            <a class=\"pa-pagination-link pa-button pa-button-primary pa-button-small\" tabindex=\"0\" [attr.aria-disabled]=\"page === pages[pages.length - 1]\"\n               (click)=\"goToLast()\" paTooltip=\"common.previous\" paTooltipType=\"action\"><span class=\"pa-button-wrapper\" tabindex=\"-1\"><span class=\"pa-button-label pa-sr\" translate>pagination.last-page</span>\n                    <pa-icon name=\"tab\"></pa-icon>\n                </span>\n            </a>\n        </li>\n    </ul>\n</nav>\n",
        styles: [":host{display:block;margin-bottom:1.875rem}:host ul{list-style:none;padding:0;margin:0 -.375rem}:host li{display:inline-block}:host .pa-pagination-link[aria-current=true],:host .pa-pagination-link[aria-current=true]:active,:host .pa-pagination-link[aria-current=true]:hover,:host .pa-pagination-link[aria-disabled=true],:host .pa-pagination-link[aria-disabled=true]:active,:host .pa-pagination-link[aria-disabled=true]:hover{color:#b8c6c8;cursor:default;background:0 0;pointer-events:none}:host .pa-pagination-link[aria-current=true],:host .pa-pagination-link[aria-current=true]:active,:host .pa-pagination-link[aria-current=true]:hover{box-shadow:inset 0 0 0 2px currentColor}:host .pa-pagination-separator{color:#b8c6c8;font-weight:300;font-size:125%;top:-.1875rem;padding:0 .375rem;position:relative}"]
    })
], PaginationComponent);
export { PaginationComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ3VpbGxvdGluYXdlYi9wYXN0YW5hZ2EtYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi9wYWdpbmF0aW9uL3BhZ2luYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQU9qRyxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQUFoQztRQUNhLFVBQUssR0FBRyxDQUFDLENBQUM7UUFDVixTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ1QsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNiLFNBQUksR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUVsRSxVQUFLLEdBQWEsRUFBRSxDQUFDO0lBa0N6QixDQUFDO0lBaENHLFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixJQUFJLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLEtBQUssT0FBTyxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUU7WUFDM0csSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxJQUFJO1FBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsUUFBUSxDQUFDLFVBQWtCO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxTQUFTO1FBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTyxZQUFZO1FBQ2hCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUI7U0FDbkg7SUFDTCxDQUFDO0NBQ0osQ0FBQTtBQXZDWTtJQUFSLEtBQUssRUFBRTs7a0RBQVc7QUFDVjtJQUFSLEtBQUssRUFBRTs7aURBQVU7QUFDVDtJQUFSLEtBQUssRUFBRTs7cURBQWU7QUFDYjtJQUFULE1BQU0sRUFBRTs4QkFBTyxZQUFZO2lEQUFzQztBQUp6RCxtQkFBbUI7SUFML0IsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGVBQWU7UUFDekIsb2lGQUEwQzs7S0FFN0MsQ0FBQztHQUNXLG1CQUFtQixDQXdDL0I7U0F4Q1ksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3BhLXBhZ2luYXRpb24nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wYWdpbmF0aW9uLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9wYWdpbmF0aW9uLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2luYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAgIEBJbnB1dCgpIHRvdGFsID0gMDtcbiAgICBASW5wdXQoKSBwYWdlID0gMDtcbiAgICBASW5wdXQoKSBwYWdlU2l6ZSA9IDIwO1xuICAgIEBPdXRwdXQoKSBnb1RvOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gICAgcGFnZXM6IG51bWJlcltdID0gW107XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgIGlmIChjaGFuZ2VzLnRvdGFsICYmIGNoYW5nZXMudG90YWwuY3VycmVudFZhbHVlICYmIGNoYW5nZXMudG90YWwuY3VycmVudFZhbHVlICE9PSBjaGFuZ2VzLnRvdGFsLnByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZVBhZ2VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiYWNrKCkge1xuICAgICAgICB0aGlzLmdvVG8uZW1pdCh0aGlzLnBhZ2UgLSAxKTtcbiAgICB9XG5cbiAgICBuZXh0KCkge1xuICAgICAgICB0aGlzLmdvVG8uZW1pdCh0aGlzLnBhZ2UgKyAxKTtcbiAgICB9XG5cbiAgICBnb1RvUGFnZShwYWdlTnVtYmVyOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5nb1RvLmVtaXQocGFnZU51bWJlcik7XG4gICAgfVxuXG4gICAgZ29Ub0ZpcnN0KCkge1xuICAgICAgICB0aGlzLmdvVG8uZW1pdCh0aGlzLnBhZ2VzWzBdKTtcbiAgICB9XG5cbiAgICBnb1RvTGFzdCgpIHtcbiAgICAgICAgdGhpcy5nb1RvLmVtaXQodGhpcy5wYWdlc1t0aGlzLnBhZ2VzLmxlbmd0aCAtIDFdKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbXB1dGVQYWdlcygpIHtcbiAgICAgICAgaWYgKCEhdGhpcy50b3RhbCkge1xuICAgICAgICAgICAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGguY2VpbCh0aGlzLnRvdGFsIC8gdGhpcy5wYWdlU2l6ZSk7XG4gICAgICAgICAgICB0aGlzLnBhZ2VzID0gQXJyYXkuYXBwbHkobnVsbCwge2xlbmd0aDogdG90YWxQYWdlc30pLm1hcChOdW1iZXIuY2FsbCwgTnVtYmVyKS5tYXAocCA9PiBwICsgMSk7IC8vID0+IFsxLCAyLCAuLi5dXG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=