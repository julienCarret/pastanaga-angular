import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastModel } from './toast.model';
import { keyboardKeys } from '../keycodes.constant';

const ARIA_KEY = 'pa-aria-';
const DELAY = 5000;
const HAS_LINK = /.*(\[(.+)\|(.+)\]).*/g;

@Component({
    selector: 'pa-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

    @Input() toast?: ToastModel;
    @Output() dismiss = new EventEmitter();

    @ViewChild('toastContainer', { static: true }) toastContainer?: ElementRef;

    ariaLabeledBy = '';
    parsedMessage = '';
    isSibling = false;
    isDismissed = false;

    constructor() {}

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

    handleDismiss(button?: string) {
        this.isDismissed = true;
        this.dismiss.emit({toast: this.toast, button: button});
    }

    private parseMessage(message: string) {
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

    private getLink(link: string, url: string): string {
        return '<a class="pa-button pa-button-link" tabindex="0" href="' + url +
            '"> <span class="pa-button-wrapper" tabindex="-1">' + link + ' </span></a>';
    }

    dismissWithESC($event) {
        // Only 'closeable' buttons can be dismissed with ESC
        if (!this.toast || !this.toast.closeable) {
            return;
        }

        if ($event.key === keyboardKeys.esc) {
            this.handleDismiss();
        }
    }
}
