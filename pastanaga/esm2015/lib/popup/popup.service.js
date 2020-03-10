import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
let PopupService = class PopupService {
    constructor() {
        this.closeAllPopups = new Subject();
        this.closeAllButId = new Subject();
        this.closeAllSubMenu = new Subject();
    }
};
PopupService.ɵprov = i0.ɵɵdefineInjectable({ factory: function PopupService_Factory() { return new PopupService(); }, token: PopupService, providedIn: "root" });
PopupService = __decorate([
    Injectable({ providedIn: 'root' })
], PopupService);
export { PopupService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BndWlsbG90aW5hd2ViL3Bhc3RhbmFnYS1hbmd1bGFyLyIsInNvdXJjZXMiOlsibGliL3BvcHVwL3BvcHVwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFJL0IsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtJQUF6QjtRQUNJLG1CQUFjLEdBQWtCLElBQUksT0FBTyxFQUFRLENBQUM7UUFDcEQsa0JBQWEsR0FBb0IsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUN2RCxvQkFBZSxHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDO0tBRXhEO0NBQUEsQ0FBQTs7QUFMWSxZQUFZO0lBRHhCLFVBQVUsQ0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMsQ0FBQztHQUNwQixZQUFZLENBS3hCO1NBTFksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFBvc2l0aW9uU3R5bGUgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBQb3B1cFNlcnZpY2Uge1xuICAgIGNsb3NlQWxsUG9wdXBzOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgICBjbG9zZUFsbEJ1dElkOiBTdWJqZWN0PHN0cmluZz4gPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG4gICAgY2xvc2VBbGxTdWJNZW51OiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgICBsYXN0UG9zaXRpb24/OiBQb3NpdGlvblN0eWxlO1xufVxuIl19