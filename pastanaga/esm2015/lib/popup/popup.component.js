import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { PopupService } from './popup.service';
import { getVirtualScrollParentPosition, markForCheck } from '../common/utils';
let nextId = 0;
let PopupComponent = class PopupComponent {
    constructor(service, renderer, element, cdr) {
        this.service = service;
        this.renderer = renderer;
        this.element = element;
        this.cdr = cdr;
        this.isAlwaysOn = false;
        this.onClose = new EventEmitter();
        this.isDisplayed = false;
        this.handlers = [];
        this.service.closeAllPopups.subscribe(() => this.close());
        this.service.closeAllButId.subscribe((id) => {
            if (id !== this.id) {
                this.close();
            }
        });
    }
    ngOnInit() {
        this.id = !this.id ? `dropdown-${nextId++}` : `${this.id}-dropdown`;
        this.isDisplayed = this.isAlwaysOn;
    }
    ngOnDestroy() {
        this.unlisten();
    }
    show(style, hasSubLevel = false) {
        if (!hasSubLevel) {
            this.service.closeAllButId.next(this.id);
        }
        this.style = style;
        this.isDisplayed = true;
        if (!this.isAlwaysOn) {
            this.handlers.push(this.renderer.listen('document', 'click', (event) => this.onOutsideClick(event)));
            this.handlers.push(this.renderer.listen('document', 'keyup.esc', () => this.close()));
        }
        markForCheck(this.cdr);
        window.setTimeout(() => {
            if (!this.adjustPosition()) {
                const interval = window.setInterval(() => {
                    if (this.adjustPosition()) {
                        window.clearInterval(interval);
                    }
                }, 200);
            }
        }, 0);
    }
    adjustPosition() {
        if (!!this.element.nativeElement) {
            let isAdjusted = false;
            const element = this.element.nativeElement.firstElementChild;
            const rect = element.getBoundingClientRect();
            if (rect.height <= 12) {
                // menu is still empty
                return false;
            }
            const { bottom, right } = getVirtualScrollParentPosition(element) || { bottom: window.innerHeight, right: window.innerWidth };
            const diffX = rect.left + rect.width - right;
            if (diffX > 0) {
                element.style.left = `calc(${element.style.left} - ${diffX}px)`;
                isAdjusted = true;
            }
            else if (rect.left < 0) {
                element.style.left = `0px`;
                isAdjusted = true;
            }
            const diffY = rect.top + rect.height - bottom;
            if (diffY > 0) {
                const currentTop = element.style.top || '';
                if (currentTop.endsWith('px') && parseInt(currentTop.slice(0, -2), 10) > rect.height) {
                    // enough space above, we display the dropdown on top
                    element.style.top = `calc(${currentTop} - ${rect.height}px)`;
                    isAdjusted = true;
                }
                else if (!!currentTop) {
                    // not enough space, we just align the dropdown bottom with the parent bottom
                    element.style.top = `calc(${currentTop} - ${diffY}px)`;
                    isAdjusted = true;
                }
            }
            if (isAdjusted) {
                markForCheck(this.cdr);
            }
            return true;
        }
        else {
            return false;
        }
    }
    close(byClickingOutside) {
        if (!this.isAlwaysOn && this.isDisplayed) {
            this.isDisplayed = false;
            this.unlisten();
            this.onClose.emit(byClickingOutside);
            markForCheck(this.cdr);
        }
    }
    onOutsideClick(event) {
        if (!this.element.nativeElement.contains(event.target)
            && (!this.parentElement || !this.parentElement.contains(event.target))) {
            this.service.closeAllSubMenu.next();
            this.close(true);
        }
    }
    unlisten() {
        this.handlers.forEach(fn => fn());
        this.handlers = [];
    }
};
PopupComponent.ctorParameters = () => [
    { type: PopupService },
    { type: Renderer2 },
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
__decorate([
    Input(),
    __metadata("design:type", String)
], PopupComponent.prototype, "id", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PopupComponent.prototype, "isAlwaysOn", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PopupComponent.prototype, "parentElement", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], PopupComponent.prototype, "onClose", void 0);
PopupComponent = __decorate([
    Component({
        selector: 'pa-popup',
        template: "<div class=\"pa-popup\" [hidden]=\"!isDisplayed\" [ngStyle]=\"style\">\n    <div class=\"pa-popup-wrapper\">\n        <ng-content></ng-content>\n    </div>\n</div>\n",
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".pa-popup{z-index:10030;box-shadow:0 1px 2px 0 rgba(0,0,0,.15);border-radius:.1875rem;min-width:12.375rem;max-width:15rem;max-height:21.75rem;overflow-x:hidden;overflow-y:auto}.pa-popup-wrapper{padding:.375rem 0;background:rgba(255,255,255,.975)}@supports (-webkit-backdrop-filter:blur(9px)){.pa-popup-wrapper{background:rgba(255,255,255,.9);-webkit-backdrop-filter:blur(9px)}}"]
    }),
    __metadata("design:paramtypes", [PopupService,
        Renderer2,
        ElementRef,
        ChangeDetectorRef])
], PopupComponent);
export { PopupComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGd1aWxsb3RpbmF3ZWIvcGFzdGFuYWdhLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvcG9wdXAvcG9wdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBQ0wsU0FBUyxFQUNULE1BQU0sRUFDTixNQUFNLEVBQ04sU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsWUFBWSxFQUFpQixNQUFNLGlCQUFpQixDQUFDO0FBRTlGLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQVFmLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFZdkIsWUFDVyxPQUFxQixFQUNyQixRQUFtQixFQUNuQixPQUFtQixFQUNuQixHQUFzQjtRQUh0QixZQUFPLEdBQVAsT0FBTyxDQUFjO1FBQ3JCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQWR4QixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBR2xCLFlBQU8sR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU5RCxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUVwQixhQUFRLEdBQWUsRUFBRSxDQUFDO1FBU3RCLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTtZQUN4QyxJQUFJ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Q1AsUUFBUSxFQUFFLFVBQVU7UUFDcEIsaUxBQXFDO1FBRXJDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztLQUNsRCxDQUFDO3FDQWNzQixZQUFZO1FBQ1gsU0FBUztRQUNWLFVBQVU7UUFDZCxpQkFBaUI7R0FoQnhCLGNBQWMsQ0F1SDFCO1NBdkhZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQb3B1cFNlcnZpY2UgfSBmcm9tICcuL3BvcHVwLnNlcnZpY2UnO1xuaW1wb3J0IHsgZ2V0VmlydHVhbFNjcm9sbFBhcmVudFBvc2l0aW9uLCBtYXJrRm9yQ2hlY2ssIFBvc2l0aW9uU3R5bGUgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xuXG5sZXQgbmV4dElkID0gMDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwYS1wb3B1cCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3BvcHVwLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9fcG9wdXAuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBQb3B1cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSBpZD86IHN0cmluZztcbiAgICBASW5wdXQoKSBpc0Fsd2F5c09uID0gZmFsc2U7XG4gICAgQElucHV0KCkgcGFyZW50RWxlbWVudD86IGFueTtcblxuICAgIEBPdXRwdXQoKSBvbkNsb3NlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBpc0Rpc3BsYXllZCA9IGZhbHNlO1xuICAgIHN0eWxlPzogYW55O1xuICAgIGhhbmRsZXJzOiBGdW5jdGlvbltdID0gW107XG5cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgc2VydmljZTogUG9wdXBTZXJ2aWNlLFxuICAgICAgICBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgICAgIHB1YmxpYyBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICkge1xuICAgICAgICB0aGlzLnNlcnZpY2UuY2xvc2VBbGxQb3B1cHMuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2UoKSk7XG4gICAgICAgIHRoaXMuc2VydmljZS5jbG9zZUFsbEJ1dElkLnN1YnNjcmliZSgoaWQpID0+IHtcbiAgICAgICAgICAgIGlmIChpZCAhPT0gdGhpcy5pZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaWQgPSAhdGhpcy5pZCA/IGBkcm9wZG93bi0ke25leHRJZCsrfWAgOiBgJHt0aGlzLmlkfS1kcm9wZG93bmA7XG4gICAgICAgIHRoaXMuaXNEaXNwbGF5ZWQgPSB0aGlzLmlzQWx3YXlzT247XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudW5saXN0ZW4oKTtcbiAgICB9XG5cbiAgICBzaG93KHN0eWxlOiBQb3NpdGlvblN0eWxlLCBoYXNTdWJMZXZlbCA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghaGFzU3ViTGV2ZWwpIHtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5jbG9zZUFsbEJ1dElkLm5leHQodGhpcy5pZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdHlsZSA9IHN0eWxlO1xuICAgICAgICB0aGlzLmlzRGlzcGxheWVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKCF0aGlzLmlzQWx3YXlzT24pIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlcnMucHVzaCh0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAnY2xpY2snLCAoZXZlbnQpID0+IHRoaXMub25PdXRzaWRlQ2xpY2soZXZlbnQpKSk7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZXJzLnB1c2godGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ2tleXVwLmVzYycsICgpID0+IHRoaXMuY2xvc2UoKSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgbWFya0ZvckNoZWNrKHRoaXMuY2RyKTtcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmFkanVzdFBvc2l0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbnRlcnZhbCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFkanVzdFBvc2l0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDApO1xuICAgIH1cblxuICAgIGFkanVzdFBvc2l0aW9uKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoISF0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgbGV0IGlzQWRqdXN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgICBjb25zdCByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGlmIChyZWN0LmhlaWdodCA8PSAxMikge1xuICAgICAgICAgICAgICAgIC8vIG1lbnUgaXMgc3RpbGwgZW1wdHlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB7Ym90dG9tLCByaWdodH0gPSBnZXRWaXJ0dWFsU2Nyb2xsUGFyZW50UG9zaXRpb24oZWxlbWVudCkgfHwge2JvdHRvbTogd2luZG93LmlubmVySGVpZ2h0LCByaWdodDogd2luZG93LmlubmVyV2lkdGh9O1xuICAgICAgICAgICAgY29uc3QgZGlmZlggPSByZWN0LmxlZnQgKyByZWN0LndpZHRoIC0gcmlnaHQ7XG4gICAgICAgICAgICBpZiAoZGlmZlggPiAwKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gYGNhbGMoJHtlbGVtZW50LnN0eWxlLmxlZnR9IC0gJHtkaWZmWH1weClgO1xuICAgICAgICAgICAgICAgIGlzQWRqdXN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZWN0LmxlZnQgPCAwKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gYDBweGA7XG4gICAgICAgICAgICAgICAgaXNBZGp1c3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkaWZmWSA9IHJlY3QudG9wICsgcmVjdC5oZWlnaHQgLSBib3R0b207XG4gICAgICAgICAgICBpZiAoZGlmZlkgPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFRvcCA9IGVsZW1lbnQuc3R5bGUudG9wIHx8ICcnO1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VG9wLmVuZHNXaXRoKCdweCcpICYmIHBhcnNlSW50KGN1cnJlbnRUb3Auc2xpY2UoMCwgLTIpLCAxMCkgPiByZWN0LmhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBlbm91Z2ggc3BhY2UgYWJvdmUsIHdlIGRpc3BsYXkgdGhlIGRyb3Bkb3duIG9uIHRvcFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLnRvcCA9IGBjYWxjKCR7Y3VycmVudFRvcH0gLSAke3JlY3QuaGVpZ2h0fXB4KWA7XG4gICAgICAgICAgICAgICAgICAgIGlzQWRqdXN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoISFjdXJyZW50VG9wKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG5vdCBlbm91Z2ggc3BhY2UsIHdlIGp1c3QgYWxpZ24gdGhlIGRyb3Bkb3duIGJvdHRvbSB3aXRoIHRoZSBwYXJlbnQgYm90dG9tXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gYGNhbGMoJHtjdXJyZW50VG9wfSAtICR7ZGlmZll9cHgpYDtcbiAgICAgICAgICAgICAgICAgICAgaXNBZGp1c3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzQWRqdXN0ZWQpIHtcbiAgICAgICAgICAgICAgICBtYXJrRm9yQ2hlY2sodGhpcy5jZHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbG9zZShieUNsaWNraW5nT3V0c2lkZT86IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzQWx3YXlzT24gJiYgdGhpcy5pc0Rpc3BsYXllZCkge1xuICAgICAgICAgICAgdGhpcy5pc0Rpc3BsYXllZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy51bmxpc3RlbigpO1xuICAgICAgICAgICAgdGhpcy5vbkNsb3NlLmVtaXQoYnlDbGlja2luZ091dHNpZGUpO1xuICAgICAgICAgICAgbWFya0ZvckNoZWNrKHRoaXMuY2RyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uT3V0c2lkZUNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KVxuICAgICAgICAgICAgJiYgKCF0aGlzLnBhcmVudEVsZW1lbnQgfHwgIXRoaXMucGFyZW50RWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSkge1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmNsb3NlQWxsU3ViTWVudS5uZXh0KCk7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5saXN0ZW4oKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlcnMuZm9yRWFjaChmbiA9PiBmbigpKTtcbiAgICAgICAgdGhpcy5oYW5kbGVycyA9IFtdO1xuICAgIH1cbn1cbiJdfQ==