import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
var PopupService = /** @class */ (function () {
    function PopupService() {
        this.closeAllPopups = new Subject();
        this.closeAllButId = new Subject();
        this.closeAllSubMenu = new Subject();
    }
    PopupService.ɵprov = i0.ɵɵdefineInjectable({ factory: function PopupService_Factory() { return new PopupService(); }, token: PopupService, providedIn: "root" });
    PopupService = __decorate([
        Injectable({ providedIn: 'root' })
    ], PopupService);
    return PopupService;
}());
export { PopupService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BndWlsbG90aW5hd2ViL3Bhc3RhbmFnYS1hbmd1bGFyLyIsInNvdXJjZXMiOlsibGliL3BvcHVwL3BvcHVwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFJL0I7SUFBQTtRQUNJLG1CQUFjLEdBQWtCLElBQUksT0FBTyxFQUFRLENBQUM7UUFDcEQsa0JBQWEsR0FBb0IsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUN2RCxvQkFBZSxHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDO0tBRXhEOztJQUxZLFlBQVk7UUFEeEIsVUFBVSxDQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyxDQUFDO09BQ3BCLFlBQVksQ0FLeEI7dUJBVkQ7Q0FVQyxBQUxELElBS0M7U0FMWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUG9zaXRpb25TdHlsZSB9IGZyb20gJy4uL2NvbW1vbi91dGlscyc7XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIFBvcHVwU2VydmljZSB7XG4gICAgY2xvc2VBbGxQb3B1cHM6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICAgIGNsb3NlQWxsQnV0SWQ6IFN1YmplY3Q8c3RyaW5nPiA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgICBjbG9zZUFsbFN1Yk1lbnU6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICAgIGxhc3RQb3NpdGlvbj86IFBvc2l0aW9uU3R5bGU7XG59XG4iXX0=