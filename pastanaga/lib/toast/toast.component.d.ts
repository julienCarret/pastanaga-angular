import { ElementRef, EventEmitter, OnInit } from '@angular/core';
import { ToastModel } from './toast.model';
export declare class ToastComponent implements OnInit {
    toast?: ToastModel;
    dismiss: EventEmitter<any>;
    toastContainer?: ElementRef;
    ariaLabeledBy: string;
    parsedMessage: string;
    isSibling: boolean;
    isDismissed: boolean;
    constructor();
    ngOnInit(): void;
    handleDismiss(button?: string): void;
    private parseMessage;
    private getLink;
    dismissWithESC($event: any): void;
}
