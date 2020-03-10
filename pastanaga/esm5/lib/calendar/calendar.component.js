import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CalendarService } from './calendar.service';
import { Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CalendarView } from './calendar.model';
var CalendarComponent = /** @class */ (function () {
    function CalendarComponent(service) {
        this.service = service;
        this._isRangeStart = false;
        this._isRangeEnd = false;
        this._selection = {};
        this._noFuture = false;
        this.select = new EventEmitter();
        this.terminator = new Subject();
        this.calendar = {
            headerButtons: [],
            dates: [],
            dateRef: new Date(),
        };
        this.calendarViews = CalendarView;
        this.view = CalendarView.day;
        this.legend = '';
        this.refDate = new Date();
    }
    Object.defineProperty(CalendarComponent.prototype, "rangeStart", {
        set: function (value) {
            this._isRangeStart = coerceBooleanProperty(value);
            if (this._isRangeStart) {
                this.legend = 'calendar.select-start-date-legend';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "rangeEnd", {
        set: function (value) {
            this._isRangeEnd = coerceBooleanProperty(value);
            if (this._isRangeEnd) {
                this.legend = 'calendar.select-end-date-legend';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "min", {
        set: function (value) {
            this._min = value;
            this.calendar = this.service.getMonth(this.calendar.dateRef, this._selection, this._min);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "selection", {
        set: function (value) {
            if (!!value) {
                this._selection = value instanceof Date ? { start: value, end: value } : value;
                var dateRef = value instanceof Date ? value : this.calendar.dateRef;
                this.calendar = this.service.getMonth(dateRef, this._selection, this._min);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "noFuture", {
        set: function (value) { this._noFuture = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    CalendarComponent.prototype.ngOnInit = function () {
        this.calendar = this.service.getMonth(this.calendar.dateRef, this._selection, this._min);
    };
    CalendarComponent.prototype.ngOnDestroy = function () {
        this.terminator.next();
    };
    CalendarComponent.prototype.goToPrevious = function () {
        var ref = this._selection && this._selection.start ? this._selection.start : this.refDate;
        if (this.view === CalendarView.year) {
            this.calendar = this.service.getPreviousYears(this.calendar.dateRef, ref, this._min);
        }
        else if (this.view === CalendarView.month) {
            this.calendar = this.service.getPreviousMonths(this.calendar.dateRef, ref, this._min);
        }
        else {
            this.calendar = this.service.getPreviousMonth(this.calendar.dateRef, this._selection, this._min);
        }
    };
    CalendarComponent.prototype.goToNext = function () {
        var ref = this._selection && this._selection.start ? this._selection.start : this.refDate;
        if (this.view === CalendarView.year) {
            this.calendar = this.service.getNextYears(this.calendar.dateRef, ref, this._min);
        }
        else if (this.view === CalendarView.month) {
            this.calendar = this.service.getNextMonths(this.calendar.dateRef, ref, this._min);
        }
        else {
            this.calendar = this.service.getNextMonth(this.calendar.dateRef, this._selection, this._min);
        }
    };
    CalendarComponent.prototype.changeView = function (newView) {
        var ref = this._selection && this._selection.start ? this._selection.start : this.refDate;
        this.view = newView;
        if (this.view === CalendarView.year) {
            this.calendar = this.service.getYears(this.calendar.dateRef, ref, this._min);
        }
        else if (this.view === CalendarView.month) {
            this.calendar = this.service.getMonths(this.calendar.dateRef, ref, this._min);
        }
        else {
            this.calendar = this.service.getMonth(this.calendar.dateRef, this._selection, this._min);
        }
    };
    CalendarComponent.prototype.selectDate = function (selection) {
        var ref = this._selection && this._selection.start ? this._selection.start : this.refDate;
        if (this.view === CalendarView.year) {
            this.view = CalendarView.month;
            this.calendar = this.service.getMonths(selection.date, ref, this._min);
        }
        else if (this.view === CalendarView.month) {
            this.view = CalendarView.day;
            this.calendar = this.service.getMonth(selection.date, this._selection, this._min);
        }
        else {
            this.calendar = this.service.getMonth(selection.date, this._selection, this._min);
            this.select.emit(selection.date);
        }
    };
    CalendarComponent.prototype.noEnd = function () {
        this.select.emit(null);
    };
    CalendarComponent.ctorParameters = function () { return [
        { type: CalendarService }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CalendarComponent.prototype, "rangeStart", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CalendarComponent.prototype, "rangeEnd", null);
    __decorate([
        Input(),
        __metadata("design:type", Date),
        __metadata("design:paramtypes", [Date])
    ], CalendarComponent.prototype, "min", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CalendarComponent.prototype, "selection", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CalendarComponent.prototype, "noFuture", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CalendarComponent.prototype, "select", void 0);
    CalendarComponent = __decorate([
        Component({
            selector: 'pa-calendar',
            template: "<div>\n    <legend>{{legend | translate}}</legend>\n    <header>\n        <pa-button *ngFor=\"let button of calendar.headerButtons\" size=\"large\"\n                   class=\"pa-calendar-label-button\"\n                   (click)=\"changeView(button.view)\">{{button.label}}</pa-button>\n        <div class=\"pa-calendar-navigation-buttons\">\n            <pa-button icon=\"left-key\" paTooltip=\"calendar.previous\"\n                       (click)=\"goToPrevious()\"></pa-button>\n            <pa-button icon=\"right-key\" paTooltip=\"calendar.next\"\n                       (click)=\"goToNext()\"></pa-button>\n        </div>\n    </header>\n    <div class=\"pa-calendar-container\">\n        <div class=\"pa-calendar-dates pa-week-days\">\n            <ng-container *ngIf=\"view === calendarViews.day\">\n                <div class=\"pa-calendar-date pa-calendar-day\" translate>calendar.sunday</div>\n                <div class=\"pa-calendar-date pa-calendar-day\" translate>calendar.monday</div>\n                <div class=\"pa-calendar-date pa-calendar-day\" translate>calendar.tuesday</div>\n                <div class=\"pa-calendar-date pa-calendar-day\" translate>calendar.wednesday</div>\n                <div class=\"pa-calendar-date pa-calendar-day\" translate>calendar.thursday</div>\n                <div class=\"pa-calendar-date pa-calendar-day\" translate>calendar.friday</div>\n                <div class=\"pa-calendar-date pa-calendar-day\" translate>calendar.saturday</div>\n            </ng-container>\n        </div>\n        <div class=\"pa-calendar-dates\">\n            <pa-button *ngFor=\"let date of calendar.dates\"\n                       class=\"pa-calendar-date pa-calendar-{{view}}\"\n                       [color]=\"date.isActive ? 'primary' : 'secondary'\"\n                       [disabled]=\"(_noFuture && date.isFuture) || date.isDisabled\"\n                       [class.pa-in-interval]=\"date.inInterval\"\n                       [class.pa-first-of-interval]=\"date.firstOfInterval\"\n                       [class.pa-last-of-interval]=\"date.lastOfInterval\"\n                       [active]=\"date.isActive\"\n                       (click)=\"selectDate(date)\">\n                {{date.label}}\n            </pa-button>\n        </div>\n    </div>\n    <footer>\n        <pa-button *ngIf=\"_isRangeEnd\" size=\"small\" color=\"secondary\" (click)=\"noEnd()\">calendar.no-end-button</pa-button>\n    </footer>\n</div>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [":host{display:block;position:relative;width:18.75rem;min-height:22.5rem;padding:1.125rem .9375rem;color:#826a6a}:host legend{background:0 0;color:#717171;height:.75rem;margin-bottom:.75rem;text-transform:none}:host header{margin-bottom:1.125rem;position:relative}:host header pa-button.pa-calendar-label-button:first-of-type{margin-left:-.375rem}:host header pa-button.pa-calendar-label-button ::ng-deep .pa-button{text-transform:uppercase;font-weight:400}:host header pa-button.pa-calendar-label-button ::ng-deep .pa-button-wrapper{padding:.1875rem .375rem;height:1.5rem;line-height:1.125rem;margin-right:.1875rem}:host header .pa-calendar-navigation-buttons{position:absolute;right:-.75rem;top:-.375rem}:host footer{min-height:1.875rem}:host footer pa-button{float:right}:host footer pa-button ::ng-deep .pa-button{text-transform:none}:host footer pa-button ::ng-deep .pa-button .pa-button-label{font-size:calc(.875rem * 12/14)}:host .pa-calendar-container{font-size:calc(.875rem * 12/14)}:host .pa-calendar-container .pa-calendar-dates{display:-webkit-box;display:flex;flex-wrap:wrap;font-weight:400}:host .pa-calendar-container .pa-calendar-dates .pa-calendar-date{text-align:center;height:2.25rem;line-height:2.25rem;margin-right:.1875rem;margin-bottom:.1875rem}:host .pa-calendar-container .pa-calendar-dates .pa-calendar-date.pa-calendar-year{margin:.1875rem .375rem .1875rem 0}:host .pa-calendar-container .pa-calendar-dates .pa-calendar-date.pa-in-interval{background:#edf1f2}:host .pa-calendar-container .pa-calendar-dates .pa-calendar-date.pa-in-interval.pa-first-of-interval{border-bottom-left-radius:50%;border-top-left-radius:50%;width:2.25rem}:host .pa-calendar-container .pa-calendar-dates .pa-calendar-date.pa-in-interval.pa-last-of-interval{border-bottom-right-radius:50%;border-top-right-radius:50%;width:2.25rem}:host .pa-calendar-container .pa-calendar-dates .pa-calendar-date.pa-in-interval:not(.pa-last-of-interval):after{content:\"\";background:#edf1f2;height:2.25rem;width:.1875rem;position:absolute}:host .pa-calendar-container .pa-calendar-dates .pa-calendar-day{width:2.25rem}:host .pa-calendar-container .pa-calendar-dates .pa-calendar-day:nth-child(7n),:host .pa-calendar-container .pa-calendar-dates .pa-calendar-month:nth-child(3n),:host .pa-calendar-container .pa-calendar-dates .pa-calendar-year:nth-child(4n){margin-right:0}:host .pa-calendar-container .pa-calendar-dates pa-button ::ng-deep .pa-button{font-weight:400;height:2.25rem;text-transform:none}:host .pa-calendar-container .pa-calendar-dates pa-button ::ng-deep .pa-button .pa-button-label{font-size:calc(.875rem * 12/14)}:host .pa-calendar-container .pa-calendar-dates pa-button ::ng-deep .pa-button.active{background:#edf1f2;border:1px solid #2280a0}:host .pa-calendar-container .pa-calendar-dates pa-button.pa-calendar-day ::ng-deep .pa-button{width:2.25rem}:host .pa-calendar-container .pa-calendar-dates pa-button.pa-calendar-day ::ng-deep .pa-button .pa-button-wrapper{padding:0;line-height:2.25rem}:host .pa-calendar-container .pa-calendar-dates pa-button.pa-calendar-month ::ng-deep .pa-button{width:5.25rem}:host .pa-calendar-container .pa-calendar-dates pa-button.pa-calendar-month ::ng-deep .pa-button .pa-button-wrapper{padding:.375rem 0}:host .pa-calendar-container .pa-calendar-dates pa-button.pa-calendar-year ::ng-deep .pa-button{width:3.9375rem}:host .pa-calendar-container .pa-calendar-dates.pa-week-days{border-bottom:1px solid #949494;margin-bottom:.75rem;height:calc(1.125rem + 1px)}:host .pa-calendar-container .pa-calendar-dates.pa-week-days .pa-calendar-day{cursor:default;height:auto;line-height:1.125rem}"]
        }),
        __metadata("design:paramtypes", [CalendarService])
    ], CalendarComponent);
    return CalendarComponent;
}());
export { CalendarComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGd1aWxsb3RpbmF3ZWIvcGFzdGFuYWdhLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvY2FsZW5kYXIvY2FsZW5kYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuSCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQWdCLFlBQVksRUFBYSxNQUFNLGtCQUFrQixDQUFDO0FBU3pFO0lBZ0RJLDJCQUNZLE9BQXdCO1FBQXhCLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBMUNwQyxrQkFBYSxHQUFHLEtBQUssQ0FBQztRQVF0QixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQWVwQixlQUFVLEdBQStCLEVBQUUsQ0FBQztRQUc1QyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRVIsV0FBTSxHQUE4QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBRXZFLGVBQVUsR0FBa0IsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUNoRCxhQUFRLEdBQWM7WUFDbEIsYUFBYSxFQUFFLEVBQUU7WUFDakIsS0FBSyxFQUFFLEVBQUU7WUFDVCxPQUFPLEVBQUUsSUFBSSxJQUFJLEVBQUU7U0FDdEIsQ0FBQztRQUNGLGtCQUFhLEdBQUcsWUFBWSxDQUFDO1FBQzdCLFNBQUksR0FBa0IsWUFBWSxDQUFDLEdBQUcsQ0FBQztRQUN2QyxXQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ1osWUFBTyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFLckIsQ0FBQztJQWxEUSxz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QUFRLEVBQUUsYUFBYTtZQUN2QiwwNkVBQXdDO1lBRXhDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztTQUNsRCxDQUFDO3lDQWtEdUIsZUFBZTtPQWpEM0IsaUJBQWlCLENBZ0g3QjtJQUFELHdCQUFDO0NBQUEsQUFoSEQsSUFnSEM7U0FoSFksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJTZXJ2aWNlIH0gZnJvbSAnLi9jYWxlbmRhci5zZXJ2aWNlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBDYWxlbmRhckRhdGUsIENhbGVuZGFyVmlldywgSUNhbGVuZGFyIH0gZnJvbSAnLi9jYWxlbmRhci5tb2RlbCc7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwYS1jYWxlbmRhcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NhbGVuZGFyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9jYWxlbmRhci5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSBzZXQgcmFuZ2VTdGFydCh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9pc1JhbmdlU3RhcnQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgICAgICBpZiAodGhpcy5faXNSYW5nZVN0YXJ0KSB7XG4gICAgICAgICAgICB0aGlzLmxlZ2VuZCA9ICdjYWxlbmRhci5zZWxlY3Qtc3RhcnQtZGF0ZS1sZWdlbmQnO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9pc1JhbmdlU3RhcnQgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIHNldCByYW5nZUVuZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9pc1JhbmdlRW5kID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICAgICAgaWYgKHRoaXMuX2lzUmFuZ2VFbmQpIHtcbiAgICAgICAgICAgIHRoaXMubGVnZW5kID0gJ2NhbGVuZGFyLnNlbGVjdC1lbmQtZGF0ZS1sZWdlbmQnO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9pc1JhbmdlRW5kID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBzZXQgbWluKHZhbHVlOiBEYXRlKSB7XG4gICAgICAgIHRoaXMuX21pbiA9IHZhbHVlO1xuICAgICAgICB0aGlzLmNhbGVuZGFyID0gdGhpcy5zZXJ2aWNlLmdldE1vbnRoKHRoaXMuY2FsZW5kYXIuZGF0ZVJlZiwgdGhpcy5fc2VsZWN0aW9uLCB0aGlzLl9taW4pO1xuICAgIH1cbiAgICBfbWluPzogRGF0ZTtcblxuICAgIEBJbnB1dCgpIHNldCBzZWxlY3Rpb24odmFsdWU6IHtzdGFydD86IERhdGUsIGVuZD86IERhdGV9IHwgRGF0ZSkge1xuICAgICAgICBpZiAoISF2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gdmFsdWUgaW5zdGFuY2VvZiBEYXRlID8ge3N0YXJ0OiB2YWx1ZSwgZW5kOiB2YWx1ZX0gOiB2YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVSZWYgPSB2YWx1ZSBpbnN0YW5jZW9mIERhdGUgPyB2YWx1ZSA6IHRoaXMuY2FsZW5kYXIuZGF0ZVJlZjsgXG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyID0gdGhpcy5zZXJ2aWNlLmdldE1vbnRoKGRhdGVSZWYsIHRoaXMuX3NlbGVjdGlvbiwgdGhpcy5fbWluKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfc2VsZWN0aW9uOiB7c3RhcnQ/OiBEYXRlLCBlbmQ/OiBEYXRlfSA9IHt9O1xuXG4gICAgQElucHV0KCkgc2V0IG5vRnV0dXJlKHZhbHVlKSB7IHRoaXMuX25vRnV0dXJlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICAgIF9ub0Z1dHVyZSA9IGZhbHNlO1xuXG4gICAgQE91dHB1dCgpIHNlbGVjdDogRXZlbnRFbWl0dGVyPERhdGUgfCBudWxsPiA9IG5ldyBFdmVudEVtaXR0ZXI8RGF0ZT4oKTtcblxuICAgIHRlcm1pbmF0b3I6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICAgIGNhbGVuZGFyOiBJQ2FsZW5kYXIgPSB7XG4gICAgICAgIGhlYWRlckJ1dHRvbnM6IFtdLFxuICAgICAgICBkYXRlczogW10sXG4gICAgICAgIGRhdGVSZWY6IG5ldyBEYXRlKCksXG4gICAgfTtcbiAgICBjYWxlbmRhclZpZXdzID0gQ2FsZW5kYXJWaWV3O1xuICAgIHZpZXc6IENhbGVuZGFyVmlldyAgPSBDYWxlbmRhclZpZXcuZGF5O1xuICAgIGxlZ2VuZCA9ICcnO1xuICAgIHJlZkRhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgc2VydmljZTogQ2FsZW5kYXJTZXJ2aWNlLFxuICAgICkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNhbGVuZGFyID0gdGhpcy5zZXJ2aWNlLmdldE1vbnRoKHRoaXMuY2FsZW5kYXIuZGF0ZVJlZiwgdGhpcy5fc2VsZWN0aW9uLCB0aGlzLl9taW4pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRlcm1pbmF0b3IubmV4dCgpO1xuICAgIH1cblxuICAgIGdvVG9QcmV2aW91cygpIHtcbiAgICAgICAgY29uc3QgcmVmOiBEYXRlID0gdGhpcy5fc2VsZWN0aW9uICYmIHRoaXMuX3NlbGVjdGlvbi5zdGFydCA/IHRoaXMuX3NlbGVjdGlvbi5zdGFydCA6IHRoaXMucmVmRGF0ZTtcbiAgICAgICAgaWYgKHRoaXMudmlldyA9PT0gQ2FsZW5kYXJWaWV3LnllYXIpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIgPSB0aGlzLnNlcnZpY2UuZ2V0UHJldmlvdXNZZWFycyh0aGlzLmNhbGVuZGFyLmRhdGVSZWYsIHJlZiwgdGhpcy5fbWluKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnZpZXcgPT09IENhbGVuZGFyVmlldy5tb250aCkge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhciA9IHRoaXMuc2VydmljZS5nZXRQcmV2aW91c01vbnRocyh0aGlzLmNhbGVuZGFyLmRhdGVSZWYsIHJlZiwgdGhpcy5fbWluKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIgPSB0aGlzLnNlcnZpY2UuZ2V0UHJldmlvdXNNb250aCh0aGlzLmNhbGVuZGFyLmRhdGVSZWYsIHRoaXMuX3NlbGVjdGlvbiwgdGhpcy5fbWluKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdvVG9OZXh0KCkge1xuICAgICAgICBjb25zdCByZWY6IERhdGUgPSB0aGlzLl9zZWxlY3Rpb24gJiYgdGhpcy5fc2VsZWN0aW9uLnN0YXJ0ID8gdGhpcy5fc2VsZWN0aW9uLnN0YXJ0IDogdGhpcy5yZWZEYXRlO1xuICAgICAgICBpZiAodGhpcy52aWV3ID09PSBDYWxlbmRhclZpZXcueWVhcikge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhciA9IHRoaXMuc2VydmljZS5nZXROZXh0WWVhcnModGhpcy5jYWxlbmRhci5kYXRlUmVmLCByZWYsIHRoaXMuX21pbik7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy52aWV3ID09PSBDYWxlbmRhclZpZXcubW9udGgpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIgPSB0aGlzLnNlcnZpY2UuZ2V0TmV4dE1vbnRocyh0aGlzLmNhbGVuZGFyLmRhdGVSZWYsIHJlZiwgdGhpcy5fbWluKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIgPSB0aGlzLnNlcnZpY2UuZ2V0TmV4dE1vbnRoKHRoaXMuY2FsZW5kYXIuZGF0ZVJlZiwgdGhpcy5fc2VsZWN0aW9uLCB0aGlzLl9taW4pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hhbmdlVmlldyhuZXdWaWV3OiBDYWxlbmRhclZpZXcpIHtcbiAgICAgICAgY29uc3QgcmVmOiBEYXRlID0gdGhpcy5fc2VsZWN0aW9uICYmIHRoaXMuX3NlbGVjdGlvbi5zdGFydCA/IHRoaXMuX3NlbGVjdGlvbi5zdGFydCA6IHRoaXMucmVmRGF0ZTtcbiAgICAgICAgdGhpcy52aWV3ID0gbmV3VmlldztcbiAgICAgICAgaWYgKHRoaXMudmlldyA9PT0gQ2FsZW5kYXJWaWV3LnllYXIpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIgPSB0aGlzLnNlcnZpY2UuZ2V0WWVhcnModGhpcy5jYWxlbmRhci5kYXRlUmVmLCByZWYsIHRoaXMuX21pbik7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy52aWV3ID09PSBDYWxlbmRhclZpZXcubW9udGgpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIgPSB0aGlzLnNlcnZpY2UuZ2V0TW9udGhzKHRoaXMuY2FsZW5kYXIuZGF0ZVJlZiwgcmVmLCB0aGlzLl9taW4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhciA9IHRoaXMuc2VydmljZS5nZXRNb250aCh0aGlzLmNhbGVuZGFyLmRhdGVSZWYsIHRoaXMuX3NlbGVjdGlvbiwgdGhpcy5fbWluKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdERhdGUoc2VsZWN0aW9uOiBDYWxlbmRhckRhdGUpIHtcbiAgICAgICAgY29uc3QgcmVmOiBEYXRlID0gdGhpcy5fc2VsZWN0aW9uICYmIHRoaXMuX3NlbGVjdGlvbi5zdGFydCA/IHRoaXMuX3NlbGVjdGlvbi5zdGFydCA6IHRoaXMucmVmRGF0ZTtcbiAgICAgICAgaWYgKHRoaXMudmlldyA9PT0gQ2FsZW5kYXJWaWV3LnllYXIpIHtcbiAgICAgICAgICAgIHRoaXMudmlldyA9IENhbGVuZGFyVmlldy5tb250aDtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIgPSB0aGlzLnNlcnZpY2UuZ2V0TW9udGhzKHNlbGVjdGlvbi5kYXRlLCByZWYsIHRoaXMuX21pbik7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy52aWV3ID09PSBDYWxlbmRhclZpZXcubW9udGgpIHtcbiAgICAgICAgICAgIHRoaXMudmlldyA9IENhbGVuZGFyVmlldy5kYXk7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyID0gdGhpcy5zZXJ2aWNlLmdldE1vbnRoKHNlbGVjdGlvbi5kYXRlLCB0aGlzLl9zZWxlY3Rpb24sIHRoaXMuX21pbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyID0gdGhpcy5zZXJ2aWNlLmdldE1vbnRoKHNlbGVjdGlvbi5kYXRlLCB0aGlzLl9zZWxlY3Rpb24sIHRoaXMuX21pbik7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdC5lbWl0KHNlbGVjdGlvbi5kYXRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5vRW5kKCkge1xuICAgICAgICB0aGlzLnNlbGVjdC5lbWl0KG51bGwpO1xuICAgIH1cbn1cbiJdfQ==