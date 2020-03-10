import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CalendarService } from './calendar.service';
import { Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CalendarView } from './calendar.model';
let CalendarComponent = class CalendarComponent {
    constructor(service) {
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
    set rangeStart(value) {
        this._isRangeStart = coerceBooleanProperty(value);
        if (this._isRangeStart) {
            this.legend = 'calendar.select-start-date-legend';
        }
    }
    set rangeEnd(value) {
        this._isRangeEnd = coerceBooleanProperty(value);
        if (this._isRangeEnd) {
            this.legend = 'calendar.select-end-date-legend';
        }
    }
    set min(value) {
        this._min = value;
        this.calendar = this.service.getMonth(this.calendar.dateRef, this._selection, this._min);
    }
    set selection(value) {
        if (!!value) {
            this._selection = value instanceof Date ? { start: value, end: value } : value;
            const dateRef = value instanceof Date ? value : this.calendar.dateRef;
            this.calendar = this.service.getMonth(dateRef, this._selection, this._min);
        }
    }
    set noFuture(value) { this._noFuture = coerceBooleanProperty(value); }
    ngOnInit() {
        this.calendar = this.service.getMonth(this.calendar.dateRef, this._selection, this._min);
    }
    ngOnDestroy() {
        this.terminator.next();
    }
    goToPrevious() {
        const ref = this._selection && this._selection.start ? this._selection.start : this.refDate;
        if (this.view === CalendarView.year) {
            this.calendar = this.service.getPreviousYears(this.calendar.dateRef, ref, this._min);
        }
        else if (this.view === CalendarView.month) {
            this.calendar = this.service.getPreviousMonths(this.calendar.dateRef, ref, this._min);
        }
        else {
            this.calendar = this.service.getPreviousMonth(this.calendar.dateRef, this._selection, this._min);
        }
    }
    goToNext() {
        const ref = this._selection && this._selection.start ? this._selection.start : this.refDate;
        if (this.view === CalendarView.year) {
            this.calendar = this.service.getNextYears(this.calendar.dateRef, ref, this._min);
        }
        else if (this.view === CalendarView.month) {
            this.calendar = this.service.getNextMonths(this.calendar.dateRef, ref, this._min);
        }
        else {
            this.calendar = this.service.getNextMonth(this.calendar.dateRef, this._selection, this._min);
        }
    }
    changeView(newView) {
        const ref = this._selection && this._selection.start ? this._selection.start : this.refDate;
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
    }
    selectDate(selection) {
        const ref = this._selection && this._selection.start ? this._selection.start : this.refDate;
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
    }
    noEnd() {
        this.select.emit(null);
    }
};
CalendarComponent.ctorParameters = () => [
    { type: CalendarService }
];
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
export { CalendarComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGd1aWxsb3RpbmF3ZWIvcGFzdGFuYWdhLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvY2FsZW5kYXIvY2FsZW5kYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuSCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQWdCLFlBQVksRUFBYSxNQUFNLGtCQUFrQixDQUFDO0FBU3pFLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBZ0QxQixZQUNZLE9BQXdCO1FBQXhCLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBMUNwQyxrQkFBYSxHQUFHLEtBQUssQ0FBQztRQVF0QixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQWVwQixlQUFVLEdBQStCLEVBQUUsQ0FBQztRQUc1QyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRVIsV0FBTSxHQUE4QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBRXZFLGVBQVUsR0FBa0IsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUNoRCxhQUFRLEdBQWM7WUFDbEIsYUFBYSxFQUFFLEVBQUU7WUFDakIsS0FBSyxFQUFFLEVBQUU7WUFDVCxPQUFPLEVBQUUsSUFBSSxJQUFJLEVBQUU7U0FDdEIsQ0FBQztRQUNGLGtCQUFhLEdBQUcsWUFBWSxDQUFDO1FBQzdCLFNBQUksR0FBa0IsWUFBWSxDQUFDLEdBQUcsQ0FBQztRQUN2QyxXQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ1osWUFBTyxHQUFHLElBQUksSUFB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dUIsZUFBZTtHQWpEM0IsaUJBQWlCLENBZ0g3QjtTQWhIWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYWxlbmRhclNlcnZpY2UgfSBmcm9tICcuL2NhbGVuZGFyLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IENhbGVuZGFyRGF0ZSwgQ2FsZW5kYXJWaWV3LCBJQ2FsZW5kYXIgfSBmcm9tICcuL2NhbGVuZGFyLm1vZGVsJztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3BhLWNhbGVuZGFyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY2FsZW5kYXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2NhbGVuZGFyLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIHNldCByYW5nZVN0YXJ0KHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2lzUmFuZ2VTdGFydCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgICAgIGlmICh0aGlzLl9pc1JhbmdlU3RhcnQpIHtcbiAgICAgICAgICAgIHRoaXMubGVnZW5kID0gJ2NhbGVuZGFyLnNlbGVjdC1zdGFydC1kYXRlLWxlZ2VuZCc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2lzUmFuZ2VTdGFydCA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgc2V0IHJhbmdlRW5kKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2lzUmFuZ2VFbmQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgICAgICBpZiAodGhpcy5faXNSYW5nZUVuZCkge1xuICAgICAgICAgICAgdGhpcy5sZWdlbmQgPSAnY2FsZW5kYXIuc2VsZWN0LWVuZC1kYXRlLWxlZ2VuZCc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2lzUmFuZ2VFbmQgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIHNldCBtaW4odmFsdWU6IERhdGUpIHtcbiAgICAgICAgdGhpcy5fbWluID0gdmFsdWU7XG4gICAgICAgIHRoaXMuY2FsZW5kYXIgPSB0aGlzLnNlcnZpY2UuZ2V0TW9udGgodGhpcy5jYWxlbmRhci5kYXRlUmVmLCB0aGlzLl9zZWxlY3Rpb24sIHRoaXMuX21pbik7XG4gICAgfVxuICAgIF9taW4/OiBEYXRlO1xuXG4gICAgQElucHV0KCkgc2V0IHNlbGVjdGlvbih2YWx1ZToge3N0YXJ0PzogRGF0ZSwgZW5kPzogRGF0ZX0gfCBEYXRlKSB7XG4gICAgICAgIGlmICghIXZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSB2YWx1ZSBpbnN0YW5jZW9mIERhdGUgPyB7c3RhcnQ6IHZhbHVlLCBlbmQ6IHZhbHVlfSA6IHZhbHVlO1xuICAgICAgICAgICAgY29uc3QgZGF0ZVJlZiA9IHZhbHVlIGluc3RhbmNlb2YgRGF0ZSA/IHZhbHVlIDogdGhpcy5jYWxlbmRhci5kYXRlUmVmOyBcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIgPSB0aGlzLnNlcnZpY2UuZ2V0TW9udGgoZGF0ZVJlZiwgdGhpcy5fc2VsZWN0aW9uLCB0aGlzLl9taW4pO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9zZWxlY3Rpb246IHtzdGFydD86IERhdGUsIGVuZD86IERhdGV9ID0ge307XG5cbiAgICBASW5wdXQoKSBzZXQgbm9GdXR1cmUodmFsdWUpIHsgdGhpcy5fbm9GdXR1cmUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gICAgX25vRnV0dXJlID0gZmFsc2U7XG5cbiAgICBAT3V0cHV0KCkgc2VsZWN0OiBFdmVudEVtaXR0ZXI8RGF0ZSB8IG51bGw+ID0gbmV3IEV2ZW50RW1pdHRlcjxEYXRlPigpO1xuXG4gICAgdGVybWluYXRvcjogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICAgY2FsZW5kYXI6IElDYWxlbmRhciA9IHtcbiAgICAgICAgaGVhZGVyQnV0dG9uczogW10sXG4gICAgICAgIGRhdGVzOiBbXSxcbiAgICAgICAgZGF0ZVJlZjogbmV3IERhdGUoKSxcbiAgICB9O1xuICAgIGNhbGVuZGFyVmlld3MgPSBDYWxlbmRhclZpZXc7XG4gICAgdmlldzogQ2FsZW5kYXJWaWV3ICA9IENhbGVuZGFyVmlldy5kYXk7XG4gICAgbGVnZW5kID0gJyc7XG4gICAgcmVmRGF0ZSA9IG5ldyBEYXRlKCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzZXJ2aWNlOiBDYWxlbmRhclNlcnZpY2UsXG4gICAgKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2FsZW5kYXIgPSB0aGlzLnNlcnZpY2UuZ2V0TW9udGgodGhpcy5jYWxlbmRhci5kYXRlUmVmLCB0aGlzLl9zZWxlY3Rpb24sIHRoaXMuX21pbik7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGVybWluYXRvci5uZXh0KCk7XG4gICAgfVxuXG4gICAgZ29Ub1ByZXZpb3VzKCkge1xuICAgICAgICBjb25zdCByZWY6IERhdGUgPSB0aGlzLl9zZWxlY3Rpb24gJiYgdGhpcy5fc2VsZWN0aW9uLnN0YXJ0ID8gdGhpcy5fc2VsZWN0aW9uLnN0YXJ0IDogdGhpcy5yZWZEYXRlO1xuICAgICAgICBpZiAodGhpcy52aWV3ID09PSBDYWxlbmRhclZpZXcueWVhcikge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhciA9IHRoaXMuc2VydmljZS5nZXRQcmV2aW91c1llYXJzKHRoaXMuY2FsZW5kYXIuZGF0ZVJlZiwgcmVmLCB0aGlzLl9taW4pO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudmlldyA9PT0gQ2FsZW5kYXJWaWV3Lm1vbnRoKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyID0gdGhpcy5zZXJ2aWNlLmdldFByZXZpb3VzTW9udGhzKHRoaXMuY2FsZW5kYXIuZGF0ZVJlZiwgcmVmLCB0aGlzLl9taW4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhciA9IHRoaXMuc2VydmljZS5nZXRQcmV2aW91c01vbnRoKHRoaXMuY2FsZW5kYXIuZGF0ZVJlZiwgdGhpcy5fc2VsZWN0aW9uLCB0aGlzLl9taW4pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ29Ub05leHQoKSB7XG4gICAgICAgIGNvbnN0IHJlZjogRGF0ZSA9IHRoaXMuX3NlbGVjdGlvbiAmJiB0aGlzLl9zZWxlY3Rpb24uc3RhcnQgPyB0aGlzLl9zZWxlY3Rpb24uc3RhcnQgOiB0aGlzLnJlZkRhdGU7XG4gICAgICAgIGlmICh0aGlzLnZpZXcgPT09IENhbGVuZGFyVmlldy55ZWFyKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyID0gdGhpcy5zZXJ2aWNlLmdldE5leHRZZWFycyh0aGlzLmNhbGVuZGFyLmRhdGVSZWYsIHJlZiwgdGhpcy5fbWluKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnZpZXcgPT09IENhbGVuZGFyVmlldy5tb250aCkge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhciA9IHRoaXMuc2VydmljZS5nZXROZXh0TW9udGhzKHRoaXMuY2FsZW5kYXIuZGF0ZVJlZiwgcmVmLCB0aGlzLl9taW4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhciA9IHRoaXMuc2VydmljZS5nZXROZXh0TW9udGgodGhpcy5jYWxlbmRhci5kYXRlUmVmLCB0aGlzLl9zZWxlY3Rpb24sIHRoaXMuX21pbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGFuZ2VWaWV3KG5ld1ZpZXc6IENhbGVuZGFyVmlldykge1xuICAgICAgICBjb25zdCByZWY6IERhdGUgPSB0aGlzLl9zZWxlY3Rpb24gJiYgdGhpcy5fc2VsZWN0aW9uLnN0YXJ0ID8gdGhpcy5fc2VsZWN0aW9uLnN0YXJ0IDogdGhpcy5yZWZEYXRlO1xuICAgICAgICB0aGlzLnZpZXcgPSBuZXdWaWV3O1xuICAgICAgICBpZiAodGhpcy52aWV3ID09PSBDYWxlbmRhclZpZXcueWVhcikge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhciA9IHRoaXMuc2VydmljZS5nZXRZZWFycyh0aGlzLmNhbGVuZGFyLmRhdGVSZWYsIHJlZiwgdGhpcy5fbWluKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnZpZXcgPT09IENhbGVuZGFyVmlldy5tb250aCkge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhciA9IHRoaXMuc2VydmljZS5nZXRNb250aHModGhpcy5jYWxlbmRhci5kYXRlUmVmLCByZWYsIHRoaXMuX21pbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyID0gdGhpcy5zZXJ2aWNlLmdldE1vbnRoKHRoaXMuY2FsZW5kYXIuZGF0ZVJlZiwgdGhpcy5fc2VsZWN0aW9uLCB0aGlzLl9taW4pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0RGF0ZShzZWxlY3Rpb246IENhbGVuZGFyRGF0ZSkge1xuICAgICAgICBjb25zdCByZWY6IERhdGUgPSB0aGlzLl9zZWxlY3Rpb24gJiYgdGhpcy5fc2VsZWN0aW9uLnN0YXJ0ID8gdGhpcy5fc2VsZWN0aW9uLnN0YXJ0IDogdGhpcy5yZWZEYXRlO1xuICAgICAgICBpZiAodGhpcy52aWV3ID09PSBDYWxlbmRhclZpZXcueWVhcikge1xuICAgICAgICAgICAgdGhpcy52aWV3ID0gQ2FsZW5kYXJWaWV3Lm1vbnRoO1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhciA9IHRoaXMuc2VydmljZS5nZXRNb250aHMoc2VsZWN0aW9uLmRhdGUsIHJlZiwgdGhpcy5fbWluKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnZpZXcgPT09IENhbGVuZGFyVmlldy5tb250aCkge1xuICAgICAgICAgICAgdGhpcy52aWV3ID0gQ2FsZW5kYXJWaWV3LmRheTtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIgPSB0aGlzLnNlcnZpY2UuZ2V0TW9udGgoc2VsZWN0aW9uLmRhdGUsIHRoaXMuX3NlbGVjdGlvbiwgdGhpcy5fbWluKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIgPSB0aGlzLnNlcnZpY2UuZ2V0TW9udGgoc2VsZWN0aW9uLmRhdGUsIHRoaXMuX3NlbGVjdGlvbiwgdGhpcy5fbWluKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0LmVtaXQoc2VsZWN0aW9uLmRhdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbm9FbmQoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0LmVtaXQobnVsbCk7XG4gICAgfVxufVxuIl19