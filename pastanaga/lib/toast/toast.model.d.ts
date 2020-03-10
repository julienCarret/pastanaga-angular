import { BehaviorSubject } from 'rxjs';
import { ComponentFactory } from '@angular/core';
import { ToastComponent } from './toast.component';
export declare class ToastModel {
    onClick?: BehaviorSubject<string>;
    key: string;
    message: string;
    translateParams?: any;
    delay?: number;
    buttons: ToastButtonModel[];
    closeable?: boolean;
    icon: string;
    style: string;
    componentFactory?: ComponentFactory<ToastComponent>;
    componentData?: any;
    constructor(data: any);
}
export declare class ToastButtonModel {
    static readonly PRIMARY = "primary";
    static readonly SECONDARY = "secondary";
    static readonly DESTRUCTIVE = "destructive";
    id: string;
    text: string;
    color: string;
    icon: string;
    tooltip: string;
    constructor(data: any);
}
export declare const getToastCloseButton: () => ToastButtonModel;
