import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { PopupService } from './popup.service';
import { getVirtualScrollParentPosition, markForCheck } from '../common/utils';
var nextId = 0;
var PopupComponent = /** @class */ (function () {
    function PopupComponent(service, renderer, element, cdr) {
        var _this = this;
        this.service = service;
        this.renderer = renderer;
        this.element = element;
        this.cdr = cdr;
        this.isAlwaysOn = false;
        this.onClose = new EventEmitter();
        this.isDisplayed = false;
        this.handlers = [];
        this.service.closeAllPopups.subscribe(function () { return _this.close(); });
        this.service.closeAllButId.subscribe(function (id) {
            if (id !== _this.id) {
                _this.close();
            }
        });
    }
    PopupComponent.prototype.ngOnInit = function () {
        this.id = !this.id ? "dropdown-" + nextId++ : this.id + "-dropdown";
        this.isDisplayed = this.isAlwaysOn;
    };
    PopupComponent.prototype.ngOnDestroy = function () {
        this.unlisten();
    };
    PopupComponent.prototype.show = function (style, hasSubLevel) {
        var _this = this;
        if (hasSubLevel === void 0) { hasSubLevel = false; }
        if (!hasSubLevel) {
            this.service.closeAllButId.next(this.id);
        }
        this.style = style;
        this.isDisplayed = true;
        if (!this.isAlwaysOn) {
            this.handlers.push(this.renderer.listen('document', 'click', function (event) { return _this.onOutsideClick(event); }));
            this.handlers.push(this.renderer.listen('document', 'keyup.esc', function () { return _this.close(); }));
        }
        markForCheck(this.cdr);
        window.setTimeout(function () {
            if (!_this.adjustPosition()) {
                var interval_1 = window.setInterval(function () {
                    if (_this.adjustPosition()) {
                        window.clearInterval(interval_1);
                    }
                }, 200);
            }
        }, 0);
    };
    PopupComponent.prototype.adjustPosition = function () {
        if (!!this.element.nativeElement) {
            var isAdjusted = false;
            var element = this.element.nativeElement.firstElementChild;
            var rect = element.getBoundingClientRect();
            if (rect.height <= 12) {
                // menu is still empty
                return false;
            }
            var _a = getVirtualScrollParentPosition(element) || { bottom: window.innerHeight, right: window.innerWidth }, bottom = _a.bottom, right = _a.right;
            var diffX = rect.left + rect.width - right;
            if (diffX > 0) {
                element.style.left = "calc(" + element.style.left + " - " + diffX + "px)";
                isAdjusted = true;
            }
            else if (rect.left < 0) {
                element.style.left = "0px";
                isAdjusted = true;
            }
            var diffY = rect.top + rect.height - bottom;
            if (diffY > 0) {
                var currentTop = element.style.top || '';
                if (currentTop.endsWith('px') && parseInt(currentTop.slice(0, -2), 10) > rect.height) {
                    // enough space above, we display the dropdown on top
                    element.style.top = "calc(" + currentTop + " - " + rect.height + "px)";
                    isAdjusted = true;
                }
                else if (!!currentTop) {
                    // not enough space, we just align the dropdown bottom with the parent bottom
                    element.style.top = "calc(" + currentTop + " - " + diffY + "px)";
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
    };
    PopupComponent.prototype.close = function (byClickingOutside) {
        if (!this.isAlwaysOn && this.isDisplayed) {
            this.isDisplayed = false;
            this.unlisten();
            this.onClose.emit(byClickingOutside);
            markForCheck(this.cdr);
        }
    };
    PopupComponent.prototype.onOutsideClick = function (event) {
        if (!this.element.nativeElement.contains(event.target)
            && (!this.parentElement || !this.parentElement.contains(event.target))) {
            this.service.closeAllSubMenu.next();
            this.close(true);
        }
    };
    PopupComponent.prototype.unlisten = function () {
        this.handlers.forEach(function (fn) { return fn(); });
        this.handlers = [];
    };
    PopupComponent.ctorParameters = function () { return [
        { type: PopupService },
        { type: Renderer2 },
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
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
    return PopupComponent;
}());
export { PopupComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGd1aWxsb3RpbmF3ZWIvcGFzdGFuYWdhLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvcG9wdXAvcG9wdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBQ0wsU0FBUyxFQUNULE1BQU0sRUFDTixNQUFNLEVBQ04sU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsWUFBWSxFQUFpQixNQUFNLGlCQUFpQixDQUFDO0FBRTlGLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQVFmO0lBWUksd0JBQ1csT0FBcUIsRUFDckIsUUFBbUIsRUFDbkIsT0FBbUIsRUFDbkIsR0FBc0I7UUFKakMsaUJBWUM7UUFYVSxZQUFPLEdBQVAsT0FBTyxDQUFjO1FBQ3JCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQWR4QixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBR2xCLFlBQU8sR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU5RCxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUVwQixhQUFRLEdBQWUsRUFBRSxDQUFDO1FBU3RCLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLEtBQUssRUFBRSxFQUFaLENBQVksQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEVBQUU7WUFDcEMsSUFBSSxFQUFFLEtBQUssS0FBSSxDQUFD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QUFDLE1BQU07O1NBQ2xELENBQUM7eUNBY3NCLFlBQVk7WUFDWCxTQUFTO1lBQ1YsVUFBVTtZQUNkLGlCQUFpQjtPQWhCeEIsY0FBYyxDQXVIMUI7SUFBRCxxQkFBQztDQUFBLEFBdkhELElBdUhDO1NBdkhZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQb3B1cFNlcnZpY2UgfSBmcm9tICcuL3BvcHVwLnNlcnZpY2UnO1xuaW1wb3J0IHsgZ2V0VmlydHVhbFNjcm9sbFBhcmVudFBvc2l0aW9uLCBtYXJrRm9yQ2hlY2ssIFBvc2l0aW9uU3R5bGUgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xuXG5sZXQgbmV4dElkID0gMDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwYS1wb3B1cCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3BvcHVwLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9fcG9wdXAuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBQb3B1cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSBpZD86IHN0cmluZztcbiAgICBASW5wdXQoKSBpc0Fsd2F5c09uID0gZmFsc2U7XG4gICAgQElucHV0KCkgcGFyZW50RWxlbWVudD86IGFueTtcblxuICAgIEBPdXRwdXQoKSBvbkNsb3NlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBpc0Rpc3BsYXllZCA9IGZhbHNlO1xuICAgIHN0eWxlPzogYW55O1xuICAgIGhhbmRsZXJzOiBGdW5jdGlvbltdID0gW107XG5cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgc2VydmljZTogUG9wdXBTZXJ2aWNlLFxuICAgICAgICBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgICAgIHB1YmxpYyBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICkge1xuICAgICAgICB0aGlzLnNlcnZpY2UuY2xvc2VBbGxQb3B1cHMuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2UoKSk7XG4gICAgICAgIHRoaXMuc2VydmljZS5jbG9zZUFsbEJ1dElkLnN1YnNjcmliZSgoaWQpID0+IHtcbiAgICAgICAgICAgIGlmIChpZCAhPT0gdGhpcy5pZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaWQgPSAhdGhpcy5pZCA/IGBkcm9wZG93bi0ke25leHRJZCsrfWAgOiBgJHt0aGlzLmlkfS1kcm9wZG93bmA7XG4gICAgICAgIHRoaXMuaXNEaXNwbGF5ZWQgPSB0aGlzLmlzQWx3YXlzT247XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudW5saXN0ZW4oKTtcbiAgICB9XG5cbiAgICBzaG93KHN0eWxlOiBQb3NpdGlvblN0eWxlLCBoYXNTdWJMZXZlbCA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghaGFzU3ViTGV2ZWwpIHtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5jbG9zZUFsbEJ1dElkLm5leHQodGhpcy5pZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdHlsZSA9IHN0eWxlO1xuICAgICAgICB0aGlzLmlzRGlzcGxheWVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKCF0aGlzLmlzQWx3YXlzT24pIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlcnMucHVzaCh0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAnY2xpY2snLCAoZXZlbnQpID0+IHRoaXMub25PdXRzaWRlQ2xpY2soZXZlbnQpKSk7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZXJzLnB1c2godGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ2tleXVwLmVzYycsICgpID0+IHRoaXMuY2xvc2UoKSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgbWFya0ZvckNoZWNrKHRoaXMuY2RyKTtcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmFkanVzdFBvc2l0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbnRlcnZhbCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFkanVzdFBvc2l0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDApO1xuICAgIH1cblxuICAgIGFkanVzdFBvc2l0aW9uKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoISF0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgbGV0IGlzQWRqdXN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgICBjb25zdCByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGlmIChyZWN0LmhlaWdodCA8PSAxMikge1xuICAgICAgICAgICAgICAgIC8vIG1lbnUgaXMgc3RpbGwgZW1wdHlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB7Ym90dG9tLCByaWdodH0gPSBnZXRWaXJ0dWFsU2Nyb2xsUGFyZW50UG9zaXRpb24oZWxlbWVudCkgfHwge2JvdHRvbTogd2luZG93LmlubmVySGVpZ2h0LCByaWdodDogd2luZG93LmlubmVyV2lkdGh9O1xuICAgICAgICAgICAgY29uc3QgZGlmZlggPSByZWN0LmxlZnQgKyByZWN0LndpZHRoIC0gcmlnaHQ7XG4gICAgICAgICAgICBpZiAoZGlmZlggPiAwKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gYGNhbGMoJHtlbGVtZW50LnN0eWxlLmxlZnR9IC0gJHtkaWZmWH1weClgO1xuICAgICAgICAgICAgICAgIGlzQWRqdXN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZWN0LmxlZnQgPCAwKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gYDBweGA7XG4gICAgICAgICAgICAgICAgaXNBZGp1c3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkaWZmWSA9IHJlY3QudG9wICsgcmVjdC5oZWlnaHQgLSBib3R0b207XG4gICAgICAgICAgICBpZiAoZGlmZlkgPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFRvcCA9IGVsZW1lbnQuc3R5bGUudG9wIHx8ICcnO1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VG9wLmVuZHNXaXRoKCdweCcpICYmIHBhcnNlSW50KGN1cnJlbnRUb3Auc2xpY2UoMCwgLTIpLCAxMCkgPiByZWN0LmhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBlbm91Z2ggc3BhY2UgYWJvdmUsIHdlIGRpc3BsYXkgdGhlIGRyb3Bkb3duIG9uIHRvcFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLnRvcCA9IGBjYWxjKCR7Y3VycmVudFRvcH0gLSAke3JlY3QuaGVpZ2h0fXB4KWA7XG4gICAgICAgICAgICAgICAgICAgIGlzQWRqdXN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoISFjdXJyZW50VG9wKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG5vdCBlbm91Z2ggc3BhY2UsIHdlIGp1c3QgYWxpZ24gdGhlIGRyb3Bkb3duIGJvdHRvbSB3aXRoIHRoZSBwYXJlbnQgYm90dG9tXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gYGNhbGMoJHtjdXJyZW50VG9wfSAtICR7ZGlmZll9cHgpYDtcbiAgICAgICAgICAgICAgICAgICAgaXNBZGp1c3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzQWRqdXN0ZWQpIHtcbiAgICAgICAgICAgICAgICBtYXJrRm9yQ2hlY2sodGhpcy5jZHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbG9zZShieUNsaWNraW5nT3V0c2lkZT86IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzQWx3YXlzT24gJiYgdGhpcy5pc0Rpc3BsYXllZCkge1xuICAgICAgICAgICAgdGhpcy5pc0Rpc3BsYXllZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy51bmxpc3RlbigpO1xuICAgICAgICAgICAgdGhpcy5vbkNsb3NlLmVtaXQoYnlDbGlja2luZ091dHNpZGUpO1xuICAgICAgICAgICAgbWFya0ZvckNoZWNrKHRoaXMuY2RyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uT3V0c2lkZUNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KVxuICAgICAgICAgICAgJiYgKCF0aGlzLnBhcmVudEVsZW1lbnQgfHwgIXRoaXMucGFyZW50RWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSkge1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmNsb3NlQWxsU3ViTWVudS5uZXh0KCk7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5saXN0ZW4oKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlcnMuZm9yRWFjaChmbiA9PiBmbigpKTtcbiAgICAgICAgdGhpcy5oYW5kbGVycyA9IFtdO1xuICAgIH1cbn1cbiJdfQ==