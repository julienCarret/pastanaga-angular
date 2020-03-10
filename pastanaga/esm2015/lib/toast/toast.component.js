import { __decorate, __metadata } from "tslib";
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ToastModel } from './toast.model';
import { keyCodes } from '../keycodes.constant';
const ARIA_KEY = 'pa-aria-';
const DELAY = 5000;
const HAS_LINK = /.*(\[(.+)\|(.+)\]).*/g;
let ToastComponent = class ToastComponent {
    constructor() {
        this.dismiss = new EventEmitter();
        this.ariaLabeledBy = '';
        this.parsedMessage = '';
        this.isSibling = false;
        this.isDismissed = false;
    }
    ngOnInit() {
        if (!!this.toast) {
            // If no button was defined, we need to add a delay if it was set to zero.
            const hasDelay = (this.toast.delay && this.toast.delay > 0) || !this.toast.buttons.length;
            this.ariaLabeledBy = ARIA_KEY + this.toast.key;
            if (hasDelay) {
                const delay = this.toast.delay || DELAY;
                setTimeout(() => this.dismiss.emit({ toast: this.toast }), delay);
            }
            // Parse the toast message to check for embedded links
            this.parseMessage(this.toast.message);
        }
        if (!!this.toastContainer) {
            this.toastContainer.nativeElement.focus();
        }
    }
    handleDismiss(button) {
        this.isDismissed = true;
        this.dismiss.emit({ toast: this.toast, button: button });
    }
    parseMessage(message) {
        let parsedText = '';
        let match;
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
    }
    getLink(link, url) {
        return '<a class="pa-button pa-button-link" tabindex="0" href="' + url +
            '"> <span class="pa-button-wrapper" tabindex="-1">' + link + ' </span></a>';
    }
    dismissWithESC($event) {
        // Only 'closeable' buttons can be dismissed with ESC
        if (!this.toast || !this.toast.closeable) {
            return;
        }
        if ($event.which === keyCodes.esc || $event.keyCode === keyCodes.esc) {
            this.handleDismiss();
        }
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
export { ToastComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGd1aWxsb3RpbmF3ZWIvcGFzdGFuYWdhLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvdG9hc3QvdG9hc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFaEQsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDO0FBQzVCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQztBQUNuQixNQUFNLFFBQVEsR0FBRyx1QkFBdUIsQ0FBQztBQU96QyxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBWXZCO1FBVFUsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFJdkMsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFDbkIsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFDbkIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixnQkFBVyxHQUFHLEtBQUssQ0FBQztJQUVMLENBQUM7SUFFaEIsUUFBUTtRQUNKLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCwwRUFBMEU7WUFDMUUsTUFBTSxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUMxRixJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUUvQyxJQUFJLFFBQVEsRUFBRTtnQkFDVixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUM7Z0JBQ3hDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUNyRTtZQUVELHNEQUFzRDtZQUN0RCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDekM7UUFDRCxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQzdDO0lBQ0wsQ0FBQztJQUVELGFBQWEsQ0FBQyxNQUFlO1FBQ3pCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVPLFlBQVksQ0FBQyxPQUFlO1FBQ2hDLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLEtBQUssQ0FBQztRQUVWLE9BQU8sQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRTtZQUM5QyxvRUFBb0U7WUFDcEUsSUFBSSxLQUFLLENBQUMsS0FBSyxLQUFLLFFBQVEsQ0FBQyxTQUFTLEVBQUU7Z0JBQ3BDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUN4QjtZQUVELElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3BCLFVBQVUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzVFO1NBQ0o7UUFFRCxJQUFJLFVBQVUsRUFBRTtZQUNaLElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDO1NBQ25DO0lBQ0wsQ0FBQztJQUVPLE9BQU8sQ0FBQyxJQUFZLEVBQUUsR0FBVztRQUNyQyxPQUFPLHlEQUF5RCxHQUFHLEdBQUc7WUFDbEUsbURBQW1ELEdBQUcsSUFBSSxHQUFHLGNBQWMsQ0FBQztJQUNwRixDQUFDO0lBRUQsY0FBYyxDQUFDLE1BQU07UUFDakIscURBQXFEO1FBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7WUFDdEMsT0FBTztTQUNWO1FBRUQsSUFBSSxNQUFNLENBQUMsS0FBSyxLQUFLLFFBQVEsQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDLE9BQU8sS0FBSyxRQUFRLENBQUMsR0FBRyxFQUFFO1lBQ2xFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjtJQUNMLENBQUM7Q0FDSixDQUFBO0FBdkVZO0lBQVIsS0FBSyxFQUFFOzhCQUFTLFVBQVU7NkNBQUM7QUFDbEI7SUFBVCxNQUFNLEVBQUU7OytDQUE4QjtBQUVRO0lBQTlDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQzs4QkFBa0IsVUFBVTtzREFBQztBQUxsRSxjQUFjO0lBTDFCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLDRrREFBcUM7O0tBRXhDLENBQUM7O0dBQ1csY0FBYyxDQXlFMUI7U0F6RVksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVG9hc3RNb2RlbCB9IGZyb20gJy4vdG9hc3QubW9kZWwnO1xuaW1wb3J0IHsga2V5Q29kZXMgfSBmcm9tICcuLi9rZXljb2Rlcy5jb25zdGFudCc7XG5cbmNvbnN0IEFSSUFfS0VZID0gJ3BhLWFyaWEtJztcbmNvbnN0IERFTEFZID0gNTAwMDtcbmNvbnN0IEhBU19MSU5LID0gLy4qKFxcWyguKylcXHwoLispXFxdKS4qL2c7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncGEtdG9hc3QnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90b2FzdC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdG9hc3QuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUb2FzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoKSB0b2FzdD86IFRvYXN0TW9kZWw7XG4gICAgQE91dHB1dCgpIGRpc21pc3MgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAVmlld0NoaWxkKCd0b2FzdENvbnRhaW5lcicsIHsgc3RhdGljOiB0cnVlIH0pIHRvYXN0Q29udGFpbmVyPzogRWxlbWVudFJlZjtcblxuICAgIGFyaWFMYWJlbGVkQnkgPSAnJztcbiAgICBwYXJzZWRNZXNzYWdlID0gJyc7XG4gICAgaXNTaWJsaW5nID0gZmFsc2U7XG4gICAgaXNEaXNtaXNzZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKCkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAoISF0aGlzLnRvYXN0KSB7XG4gICAgICAgICAgICAvLyBJZiBubyBidXR0b24gd2FzIGRlZmluZWQsIHdlIG5lZWQgdG8gYWRkIGEgZGVsYXkgaWYgaXQgd2FzIHNldCB0byB6ZXJvLlxuICAgICAgICAgICAgY29uc3QgaGFzRGVsYXkgPSAodGhpcy50b2FzdC5kZWxheSAmJiB0aGlzLnRvYXN0LmRlbGF5ID4gMCkgfHwgIXRoaXMudG9hc3QuYnV0dG9ucy5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLmFyaWFMYWJlbGVkQnkgPSBBUklBX0tFWSArIHRoaXMudG9hc3Qua2V5O1xuXG4gICAgICAgICAgICBpZiAoaGFzRGVsYXkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkZWxheSA9IHRoaXMudG9hc3QuZGVsYXkgfHwgREVMQVk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmRpc21pc3MuZW1pdCh7IHRvYXN0OiB0aGlzLnRvYXN0IH0pLCBkZWxheSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFBhcnNlIHRoZSB0b2FzdCBtZXNzYWdlIHRvIGNoZWNrIGZvciBlbWJlZGRlZCBsaW5rc1xuICAgICAgICAgICAgdGhpcy5wYXJzZU1lc3NhZ2UodGhpcy50b2FzdC5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoISF0aGlzLnRvYXN0Q29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnRvYXN0Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZURpc21pc3MoYnV0dG9uPzogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuaXNEaXNtaXNzZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmRpc21pc3MuZW1pdCh7dG9hc3Q6IHRoaXMudG9hc3QsIGJ1dHRvbjogYnV0dG9ufSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwYXJzZU1lc3NhZ2UobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICAgIGxldCBwYXJzZWRUZXh0ID0gJyc7XG4gICAgICAgIGxldCBtYXRjaDtcblxuICAgICAgICB3aGlsZSAoKG1hdGNoID0gSEFTX0xJTksuZXhlYyhtZXNzYWdlKSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgbmVjZXNzYXJ5IHRvIGF2b2lkIGluZmluaXRlIGxvb3BzIHdpdGggemVyby13aWR0aCBtYXRjaGVzXG4gICAgICAgICAgICBpZiAobWF0Y2guaW5kZXggPT09IEhBU19MSU5LLmxhc3RJbmRleCkge1xuICAgICAgICAgICAgICAgIEhBU19MSU5LLmxhc3RJbmRleCsrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobWF0Y2gubGVuZ3RoID09PSA0KSB7XG4gICAgICAgICAgICAgICAgcGFyc2VkVGV4dCA9IG1lc3NhZ2UucmVwbGFjZShtYXRjaFsxXSwgdGhpcy5nZXRMaW5rKG1hdGNoWzJdLCBtYXRjaFszXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcnNlZFRleHQpIHtcbiAgICAgICAgICAgIHRoaXMucGFyc2VkTWVzc2FnZSA9IHBhcnNlZFRleHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldExpbmsobGluazogc3RyaW5nLCB1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnPGEgY2xhc3M9XCJwYS1idXR0b24gcGEtYnV0dG9uLWxpbmtcIiB0YWJpbmRleD1cIjBcIiBocmVmPVwiJyArIHVybCArXG4gICAgICAgICAgICAnXCI+IDxzcGFuIGNsYXNzPVwicGEtYnV0dG9uLXdyYXBwZXJcIiB0YWJpbmRleD1cIi0xXCI+JyArIGxpbmsgKyAnIDwvc3Bhbj48L2E+JztcbiAgICB9XG5cbiAgICBkaXNtaXNzV2l0aEVTQygkZXZlbnQpIHtcbiAgICAgICAgLy8gT25seSAnY2xvc2VhYmxlJyBidXR0b25zIGNhbiBiZSBkaXNtaXNzZWQgd2l0aCBFU0NcbiAgICAgICAgaWYgKCF0aGlzLnRvYXN0IHx8ICF0aGlzLnRvYXN0LmNsb3NlYWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRldmVudC53aGljaCA9PT0ga2V5Q29kZXMuZXNjIHx8ICRldmVudC5rZXlDb2RlID09PSBrZXlDb2Rlcy5lc2MpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlRGlzbWlzcygpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19