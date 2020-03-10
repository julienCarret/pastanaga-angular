import { __decorate, __metadata } from "tslib";
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ToastModel } from './toast.model';
import { keyCodes } from '../keycodes.constant';
var ARIA_KEY = 'pa-aria-';
var DELAY = 5000;
var HAS_LINK = /.*(\[(.+)\|(.+)\]).*/g;
var ToastComponent = /** @class */ (function () {
    function ToastComponent() {
        this.dismiss = new EventEmitter();
        this.ariaLabeledBy = '';
        this.parsedMessage = '';
        this.isSibling = false;
        this.isDismissed = false;
    }
    ToastComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!!this.toast) {
            // If no button was defined, we need to add a delay if it was set to zero.
            var hasDelay = (this.toast.delay && this.toast.delay > 0) || !this.toast.buttons.length;
            this.ariaLabeledBy = ARIA_KEY + this.toast.key;
            if (hasDelay) {
                var delay = this.toast.delay || DELAY;
                setTimeout(function () { return _this.dismiss.emit({ toast: _this.toast }); }, delay);
            }
            // Parse the toast message to check for embedded links
            this.parseMessage(this.toast.message);
        }
        if (!!this.toastContainer) {
            this.toastContainer.nativeElement.focus();
        }
    };
    ToastComponent.prototype.handleDismiss = function (button) {
        this.isDismissed = true;
        this.dismiss.emit({ toast: this.toast, button: button });
    };
    ToastComponent.prototype.parseMessage = function (message) {
        var parsedText = '';
        var match;
        while ((match = HAS_LINK.exec(message)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (match.index === HAS_LINK.lastIndex) {
                HAS_LINK.lastIndex++;
            }
            if (match.length === 4) {
                parsedText = message.replace(match[1], this.getLink(match[2], match[3]));
            }
        }
        if (parsedText) {
            this.parsedMessage = parsedText;
        }
    };
    ToastComponent.prototype.getLink = function (link, url) {
        return '<a class="pa-button pa-button-link" tabindex="0" href="' + url +
            '"> <span class="pa-button-wrapper" tabindex="-1">' + link + ' </span></a>';
    };
    ToastComponent.prototype.dismissWithESC = function ($event) {
        // Only 'closeable' buttons can be dismissed with ESC
        if (!this.toast || !this.toast.closeable) {
            return;
        }
        if ($event.which === keyCodes.esc || $event.keyCode === keyCodes.esc) {
            this.handleDismiss();
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", ToastModel)
    ], ToastComponent.prototype, "toast", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ToastComponent.prototype, "dismiss", void 0);
    __decorate([
        ViewChild('toastContainer', { static: true }),
        __metadata("design:type", ElementRef)
    ], ToastComponent.prototype, "toastContainer", void 0);
    ToastComponent = __decorate([
        Component({
            selector: 'pa-toast',
            template: "<div class=\"pa-toast in\" [class.is-sibling]=\"isSibling\" [class.out]=\"isDismissed\" role=\"status\" aria-live=\"polite\"\n     attr.aria-labelledby=\"{{ariaLabeledBy}}\" #toastContainer tabindex=\"-1\" (keyup)=\"dismissWithESC($event)\">\n\n    <header class=\"pa-toast-header\">\n        <h2 class=\"pa-toast-title\" [id]=\"!parsedMessage ? ariaLabeledBy : null\">\n            <!-- Leading icon -->\n            <pa-icon *ngIf=\"!!toast && !!toast.icon\" [name]=\"toast.icon\" [hidden]=\"true\"></pa-icon>\n\n            <div *ngIf=\"parsedMessage\" [innerHTML]=\"parsedMessage\" [id]=\"parsedMessage ? ariaLabeledBy : null\"></div>\n            <ng-container *ngIf=\"!parsedMessage && !!toast\">\n                {{toast.message | translate:toast.translateParams}}\n            </ng-container>\n        </h2>\n    </header>\n    <footer class=\"pa-toast-footer\" *ngIf=\"!!toast && toast.buttons.length > 0\">\n        <div class=\"pa-toast-footer-wrapper\">\n            <!-- Customized buttons -->\n            <ng-container *ngIf=\"!!toast && toast.buttons.length > 0\">\n                <pa-button *ngFor=\"let button of toast.buttons; let i = index\"\n                           [color]=\"button.color\"\n                           [icon]=\"button.icon\"\n                           [paTooltip]=\"button.tooltip\"\n                           tabindex=\"{{i}}\"\n                           (click)=\"handleDismiss(button.text)\">\n                    <span translate>{{button.text}}</span>\n                </pa-button>\n            </ng-container>\n        </div>\n    </footer>\n</div>\n",
            styles: [".pa-toast{box-shadow:0 8px 36px 0 rgba(0,0,0,.15),0 4px 12px 0 rgba(0,0,0,.1);border-radius:3px;margin:auto;max-width:33.75rem;background:rgba(247,246,245,.975);display:-webkit-box;display:flex;-webkit-box-flex:1;flex:1 1 0%;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-flow:row nowrap;place-content:stretch flex-start;-webkit-box-align:stretch;align-items:stretch;z-index:10060}@supports (-webkit-backdrop-filter:blur(9px)){.pa-toast{background:rgba(247,246,245,.9);-webkit-backdrop-filter:blur(9px)}}.pa-toast-header{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;width:100%;flex-basis:100%}.pa-toast-title{font-size:calc(.875rem * 15/14);line-height:1.3125rem;letter-spacing:0;font-weight:400;margin:0;padding:1.5rem 1.875rem;color:#3a3a3a}.pa-toast-title>svg{width:1.5rem;height:1.5rem;fill:#717171;vertical-align:middle;margin:-.1875rem .375rem -.1875rem -.375rem;line-height:0}.pa-toast a{font-weight:700}.pa-toast-footer{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;width:100%;flex-basis:0}.pa-toast-footer-wrapper{padding:.75rem .375rem;white-space:nowrap}.pa-toast.primary{background:#2280a0}.pa-toast.primary .pa-toast-title{color:#fff}.pa-toast.primary .pa-toast-title ::ng-deep svg{fill:#fff}.pa-toast.pa-expanded{border-bottom-left-radius:unset;border-bottom-right-radius:unset}.pa-toast-panel{background:#fff;box-shadow:0 8px 36px 0 rgba(0,0,0,.15),0 4px 12px 0 rgba(0,0,0,.1);padding:1.125rem}.pa-toast-panel.is-sibling,.pa-toast.is-sibling:not(.pa-expanded){margin-bottom:1.125rem}@-webkit-keyframes toast-in{0%{opacity:0;-webkit-transform:translateY(120%);transform:translateY(120%)}90%{opacity:0;-webkit-transform:translateY(-5%);transform:translateY(-5%)}100%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes toast-in{0%{opacity:0;-webkit-transform:translateY(120%);transform:translateY(120%)}90%{opacity:0;-webkit-transform:translateY(-5%);transform:translateY(-5%)}100%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes toast-in-content{0%,25%{opacity:0;-webkit-transform:translateY(.75rem);transform:translateY(.75rem)}100%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes toast-in-content{0%,25%{opacity:0;-webkit-transform:translateY(.75rem);transform:translateY(.75rem)}100%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes toast-out{from{opacity:1;-webkit-transform:scale(1);transform:scale(1);-webkit-filter:blur(0);filter:blur(0)}to{opacity:0;-webkit-transform:scale(0);transform:scale(0);-webkit-filter:blur(5rem);filter:blur(5rem)}}@keyframes toast-out{from{opacity:1;-webkit-transform:scale(1);transform:scale(1);-webkit-filter:blur(0);filter:blur(0)}to{opacity:0;-webkit-transform:scale(0);transform:scale(0);-webkit-filter:blur(5rem);filter:blur(5rem)}}@-webkit-keyframes toast-out-content{0%{opacity:1;-webkit-transform:translateY(.75rem);transform:translateY(.75rem)}25%{opacity:0;-webkit-transform:translateY(.75rem);transform:translateY(.75rem)}100%{opacity:0;-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes toast-out-content{0%{opacity:1;-webkit-transform:translateY(.75rem);transform:translateY(.75rem)}25%{opacity:0;-webkit-transform:translateY(.75rem);transform:translateY(.75rem)}100%{opacity:0;-webkit-transform:translateY(0);transform:translateY(0)}}.pa-toast.in{-webkit-animation-name:toast-in;animation-name:toast-in;-webkit-animation-duration:.75s;animation-duration:.75s;-webkit-animation-iteration-count:1;animation-iteration-count:1}.pa-toast.in .pa-toast-footer,.pa-toast.in .pa-toast-header{-webkit-animation-name:toast-in-content;animation-name:toast-in-content;-webkit-animation-duration:1.25s;animation-duration:1.25s;-webkit-animation-iteration-count:1;animation-iteration-count:1}.pa-toast.out{-webkit-animation-name:toast-out;animation-name:toast-out;-webkit-animation-duration:.75s;animation-duration:.75s;-webkit-animation-iteration-count:1;animation-iteration-count:1}.pa-toast.out .pa-toast-footer,.pa-toast.out .pa-toast-header{-webkit-animation-name:toast-out-content;animation-name:toast-out-content;-webkit-animation-duration:1.25s;animation-duration:1.25s;-webkit-animation-iteration-count:1;animation-iteration-count:1}:host ::ng-deep .pa-toast-title>pa-icon>svg{width:1.5rem;height:1.5rem;fill:#717171;vertical-align:middle;margin:-.375rem .375rem -.1875rem -.375rem;line-height:0}"]
        }),
        __metadata("design:paramtypes", [])
    ], ToastComponent);
    return ToastComponent;
}());
export { ToastComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGd1aWxsb3RpbmF3ZWIvcGFzdGFuYWdhLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvdG9hc3QvdG9hc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFaEQsSUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDO0FBQzVCLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQztBQUNuQixJQUFNLFFBQVEsR0FBRyx1QkFBdUIsQ0FBQztBQU96QztJQVlJO1FBVFUsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFJdkMsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFDbkIsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFDbkIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixnQkFBVyxHQUFHLEtBQUssQ0FBQztJQUVMLENBQUM7SUFFaEIsaUNBQVEsR0FBUjtRQUFBLGlCQWlCQztRQWhCRyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsMEVBQTBFO1lBQzFFLElBQU0sUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDMUYsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFFL0MsSUFBSSxR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aXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUb2FzdE1vZGVsIH0gZnJvbSAnLi90b2FzdC5tb2RlbCc7XG5pbXBvcnQgeyBrZXlDb2RlcyB9IGZyb20gJy4uL2tleWNvZGVzLmNvbnN0YW50JztcblxuY29uc3QgQVJJQV9LRVkgPSAncGEtYXJpYS0nO1xuY29uc3QgREVMQVkgPSA1MDAwO1xuY29uc3QgSEFTX0xJTksgPSAvLiooXFxbKC4rKVxcfCguKylcXF0pLiovZztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwYS10b2FzdCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RvYXN0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90b2FzdC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRvYXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpIHRvYXN0PzogVG9hc3RNb2RlbDtcbiAgICBAT3V0cHV0KCkgZGlzbWlzcyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBWaWV3Q2hpbGQoJ3RvYXN0Q29udGFpbmVyJywgeyBzdGF0aWM6IHRydWUgfSkgdG9hc3RDb250YWluZXI/OiBFbGVtZW50UmVmO1xuXG4gICAgYXJpYUxhYmVsZWRCeSA9ICcnO1xuICAgIHBhcnNlZE1lc3NhZ2UgPSAnJztcbiAgICBpc1NpYmxpbmcgPSBmYWxzZTtcbiAgICBpc0Rpc21pc3NlZCA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICghIXRoaXMudG9hc3QpIHtcbiAgICAgICAgICAgIC8vIElmIG5vIGJ1dHRvbiB3YXMgZGVmaW5lZCwgd2UgbmVlZCB0byBhZGQgYSBkZWxheSBpZiBpdCB3YXMgc2V0IHRvIHplcm8uXG4gICAgICAgICAgICBjb25zdCBoYXNEZWxheSA9ICh0aGlzLnRvYXN0LmRlbGF5ICYmIHRoaXMudG9hc3QuZGVsYXkgPiAwKSB8fCAhdGhpcy50b2FzdC5idXR0b25zLmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMuYXJpYUxhYmVsZWRCeSA9IEFSSUFfS0VZICsgdGhpcy50b2FzdC5rZXk7XG5cbiAgICAgICAgICAgIGlmIChoYXNEZWxheSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRlbGF5ID0gdGhpcy50b2FzdC5kZWxheSB8fCBERUxBWTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZGlzbWlzcy5lbWl0KHsgdG9hc3Q6IHRoaXMudG9hc3QgfSksIGRlbGF5KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUGFyc2UgdGhlIHRvYXN0IG1lc3NhZ2UgdG8gY2hlY2sgZm9yIGVtYmVkZGVkIGxpbmtzXG4gICAgICAgICAgICB0aGlzLnBhcnNlTWVzc2FnZSh0aGlzLnRvYXN0Lm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghIXRoaXMudG9hc3RDb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMudG9hc3RDb250YWluZXIubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRGlzbWlzcyhidXR0b24/OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5pc0Rpc21pc3NlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuZGlzbWlzcy5lbWl0KHt0b2FzdDogdGhpcy50b2FzdCwgYnV0dG9uOiBidXR0b259KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBhcnNlTWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IHBhcnNlZFRleHQgPSAnJztcbiAgICAgICAgbGV0IG1hdGNoO1xuXG4gICAgICAgIHdoaWxlICgobWF0Y2ggPSBIQVNfTElOSy5leGVjKG1lc3NhZ2UpKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gVGhpcyBpcyBuZWNlc3NhcnkgdG8gYXZvaWQgaW5maW5pdGUgbG9vcHMgd2l0aCB6ZXJvLXdpZHRoIG1hdGNoZXNcbiAgICAgICAgICAgIGlmIChtYXRjaC5pbmRleCA9PT0gSEFTX0xJTksubGFzdEluZGV4KSB7XG4gICAgICAgICAgICAgICAgSEFTX0xJTksubGFzdEluZGV4Kys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtYXRjaC5sZW5ndGggPT09IDQpIHtcbiAgICAgICAgICAgICAgICBwYXJzZWRUZXh0ID0gbWVzc2FnZS5yZXBsYWNlKG1hdGNoWzFdLCB0aGlzLmdldExpbmsobWF0Y2hbMl0sIG1hdGNoWzNdKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyc2VkVGV4dCkge1xuICAgICAgICAgICAgdGhpcy5wYXJzZWRNZXNzYWdlID0gcGFyc2VkVGV4dDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TGluayhsaW5rOiBzdHJpbmcsIHVybDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICc8YSBjbGFzcz1cInBhLWJ1dHRvbiBwYS1idXR0b24tbGlua1wiIHRhYmluZGV4PVwiMFwiIGhyZWY9XCInICsgdXJsICtcbiAgICAgICAgICAgICdcIj4gPHNwYW4gY2xhc3M9XCJwYS1idXR0b24td3JhcHBlclwiIHRhYmluZGV4PVwiLTFcIj4nICsgbGluayArICcgPC9zcGFuPjwvYT4nO1xuICAgIH1cblxuICAgIGRpc21pc3NXaXRoRVNDKCRldmVudCkge1xuICAgICAgICAvLyBPbmx5ICdjbG9zZWFibGUnIGJ1dHRvbnMgY2FuIGJlIGRpc21pc3NlZCB3aXRoIEVTQ1xuICAgICAgICBpZiAoIXRoaXMudG9hc3QgfHwgIXRoaXMudG9hc3QuY2xvc2VhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJGV2ZW50LndoaWNoID09PSBrZXlDb2Rlcy5lc2MgfHwgJGV2ZW50LmtleUNvZGUgPT09IGtleUNvZGVzLmVzYykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVEaXNtaXNzKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=