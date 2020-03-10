import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
var SidebarService = /** @class */ (function () {
    function SidebarService() {
        this.registry = {};
    }
    SidebarService.prototype.register = function (key, sidebar) {
        if (!!this.registry[key]) {
            throw new Error("Sidebar " + key + " already exists. Either unregister it or use an unique key.");
        }
        this.registry[key] = sidebar;
    };
    SidebarService.prototype.unregister = function (key) {
        if (!this.registry[key]) {
            throw new Error("Sidebar " + key + " doesn't exist");
        }
        delete this.registry[key];
    };
    SidebarService.prototype.getSidebar = function (key) {
        return this.registry[key];
    };
    SidebarService.prototype.toggle = function (key, force) {
        var bar = this.getSidebar(key);
        if (!!bar) {
            bar.toggleOpen(force);
        }
    };
    SidebarService.ɵprov = i0.ɵɵdefineInjectable({ factory: function SidebarService_Factory() { return new SidebarService(); }, token: SidebarService, providedIn: "root" });
    SidebarService = __decorate([
        Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [])
    ], SidebarService);
    return SidebarService;
}());
export { SidebarService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGd1aWxsb3RpbmF3ZWIvcGFzdGFuYWdhLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvc2lkZWJhci9zaWRlYmFyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBSTNDO0lBR0k7UUFGUSxhQUFRLEdBQXNDLEVBQUUsQ0FBQztJQUUxQyxDQUFDO0lBRWhCLGlDQUFRLEdBQVIsVUFBUyxHQUFXLEVBQUUsT0FBeUI7UUFDM0MsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLGFBQVcsR0FBRyxnRUFBNkQsQ0FBQyxDQUFDO1NBQ2hHO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUM7SUFDakMsQ0FBQztJQUVELG1DQUFVLEdBQVYsVUFBVyxHQUFXO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsYUFBVyxHQUFHLG1CQUFnQixDQUFDLENBQUM7U0FDbkQ7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELG1DQUFVLEdBQVYsVUFBVyxHQUFXO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsK0JBQU0sR0FBTixVQUFPLEdBQVcsRUFBRSxLQUFlO1FBQy9CLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFO1lBQ1AsR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN6QjtJQUNMLENBQUM7O0lBNUJRLGNBQWM7UUFEMUIsVUFBVSxDQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyxDQUFDOztPQUNwQixjQUFjLENBNkIxQjt5QkFqQ0Q7Q0FpQ0MsQUE3QkQsSUE2QkM7U0E3QlksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNpZGViYXJDb21wb25lbnQgfSBmcm9tICcuL3NpZGViYXIuY29tcG9uZW50JztcblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgU2lkZWJhclNlcnZpY2Uge1xuICAgIHByaXZhdGUgcmVnaXN0cnk6IHtba2V5OiBzdHJpbmddOiBTaWRlYmFyQ29tcG9uZW50fSA9IHt9O1xuXG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgcmVnaXN0ZXIoa2V5OiBzdHJpbmcsIHNpZGViYXI6IFNpZGViYXJDb21wb25lbnQpIHtcbiAgICAgICAgaWYgKCEhdGhpcy5yZWdpc3RyeVtrZXldKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFNpZGViYXIgJHtrZXl9IGFscmVhZHkgZXhpc3RzLiBFaXRoZXIgdW5yZWdpc3RlciBpdCBvciB1c2UgYW4gdW5pcXVlIGtleS5gKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlZ2lzdHJ5W2tleV0gPSBzaWRlYmFyO1xuICAgIH1cblxuICAgIHVucmVnaXN0ZXIoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCF0aGlzLnJlZ2lzdHJ5W2tleV0pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgU2lkZWJhciAke2tleX0gZG9lc24ndCBleGlzdGApO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSB0aGlzLnJlZ2lzdHJ5W2tleV07XG4gICAgfVxuXG4gICAgZ2V0U2lkZWJhcihrZXk6IHN0cmluZyk6IFNpZGViYXJDb21wb25lbnQgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3RyeVtrZXldO1xuICAgIH1cblxuICAgIHRvZ2dsZShrZXk6IHN0cmluZywgZm9yY2U/OiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IGJhciA9IHRoaXMuZ2V0U2lkZWJhcihrZXkpO1xuICAgICAgICBpZiAoISFiYXIpIHtcbiAgICAgICAgICAgIGJhci50b2dnbGVPcGVuKGZvcmNlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==