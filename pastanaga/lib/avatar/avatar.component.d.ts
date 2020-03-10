import { ChangeDetectorRef } from '@angular/core';
import { Avatar } from './avatar.model';
import { Observable } from 'rxjs';
export declare class AvatarComponent {
    private cdr;
    set avatar(value: Avatar);
    set size(value: 'small' | 'regular');
    set src(value: string);
    set isButton(value: any);
    tooltip?: string;
    _avatar: Avatar;
    _isButton: boolean;
    initials: string;
    colorClass: string;
    sizeClass: string;
    base64Image?: string;
    constructor(cdr: ChangeDetectorRef);
    loadImage(obs: Observable<Blob>): void;
}
