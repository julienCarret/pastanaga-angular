import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { SidebarService } from './sidebar/sidebar.service';
import { TranslatePipe } from './translate/translate.pipe';
import { PopupService } from './popup/popup.service';
import { CalendarService } from './calendar/calendar.service';
import * as i0 from "@angular/core";
import * as i1 from "./calendar/calendar.service";
import * as i2 from "./popup/popup.service";
import * as i3 from "./sidebar/sidebar.service";
import * as i4 from "./translate/translate.pipe";
let PastanagaService = class PastanagaService {
    constructor(calendar, popup, sidebar, translate) {
        this.calendar = calendar;
        this.popup = popup;
        this.sidebar = sidebar;
        this.translate = translate;
    }
};
PastanagaService.ctorParameters = () => [
    { type: CalendarService },
    { type: PopupService },
    { type: SidebarService },
    { type: TranslatePipe }
];
PastanagaService.ɵprov = i0.ɵɵdefineInjectable({ factory: function PastanagaService_Factory() { return new PastanagaService(i0.ɵɵinject(i1.CalendarService), i0.ɵɵinject(i2.PopupService), i0.ɵɵinject(i3.SidebarService), i0.ɵɵinject(i4.TranslatePipe)); }, token: PastanagaService, providedIn: "root" });
PastanagaService = __decorate([
    Injectable({ providedIn: 'root' }),
    __metadata("design:paramtypes", [CalendarService,
        PopupService,
        SidebarService,
        TranslatePipe])
], PastanagaService);
export { PastanagaService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzdGFuYWdhLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ3VpbGxvdGluYXdlYi9wYXN0YW5hZ2EtYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi9wYXN0YW5hZ2Euc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7Ozs7OztBQUc5RCxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQUV6QixZQUNXLFFBQXlCLEVBQ3pCLEtBQW1CLEVBQ25CLE9BQXVCLEVBQ3ZCLFNBQXdCO1FBSHhCLGFBQVEsR0FBUixRQUFRLENBQWlCO1FBQ3pCLFVBQUssR0FBTCxLQUFLLENBQWM7UUFDbkIsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDdkIsY0FBUyxHQUFULFNBQVMsQ0FBZTtJQUNoQyxDQUFDO0NBQ1AsQ0FBQTs7WUFMd0IsZUFBZTtZQUNsQixZQUFZO1lBQ1YsY0FBYztZQUNaLGFBQWE7OztBQU4xQixnQkFBZ0I7SUFENUIsVUFBVSxDQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxDQUFDO3FDQUlWLGVBQWU7UUFDbEIsWUFBWTtRQUNWLGNBQWM7UUFDWixhQUFhO0dBTjFCLGdCQUFnQixDQVE1QjtTQVJZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNpZGViYXJTZXJ2aWNlIH0gZnJvbSAnLi9zaWRlYmFyL3NpZGViYXIuc2VydmljZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVQaXBlIH0gZnJvbSAnLi90cmFuc2xhdGUvdHJhbnNsYXRlLnBpcGUnO1xuaW1wb3J0IHsgUG9wdXBTZXJ2aWNlIH0gZnJvbSAnLi9wb3B1cC9wb3B1cC5zZXJ2aWNlJztcbmltcG9ydCB7IENhbGVuZGFyU2VydmljZSB9IGZyb20gJy4vY2FsZW5kYXIvY2FsZW5kYXIuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgUGFzdGFuYWdhU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGNhbGVuZGFyOiBDYWxlbmRhclNlcnZpY2UsXG4gICAgICAgIHB1YmxpYyBwb3B1cDogUG9wdXBTZXJ2aWNlLFxuICAgICAgICBwdWJsaWMgc2lkZWJhcjogU2lkZWJhclNlcnZpY2UsXG4gICAgICAgIHB1YmxpYyB0cmFuc2xhdGU6IFRyYW5zbGF0ZVBpcGUsXG4gICAgKSB7fVxufVxuIl19