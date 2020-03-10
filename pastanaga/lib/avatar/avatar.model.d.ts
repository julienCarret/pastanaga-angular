import { Observable } from 'rxjs';
interface IAvatar {
    username: string;
    id?: string;
    backgroundColor?: string;
    image?: Observable<Blob>;
    badgeIcon?: string;
}
export declare class Avatar implements IAvatar {
    username: string;
    id?: string;
    backgroundColor?: string;
    image?: Observable<Blob>;
    badgeIcon?: string;
    constructor(data: IAvatar);
}
export declare const COLORS: string[];
export {};
