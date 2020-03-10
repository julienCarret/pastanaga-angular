import { __assign, __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { markForCheck } from '../../common/utils';
var nextId = 0;
var ToggleGroupComponent = /** @class */ (function () {
    function ToggleGroupComponent(cdr) {
        this.cdr = cdr;
        this.toggles = [];
        this.onSelection = new EventEmitter();
        this.isAllSelected = false;
        this.dividers = [];
    }
    ToggleGroupComponent.prototype.ngOnInit = function () {
        this.id = !this.id ? "fieldset-toggle-group-" + nextId++ : this.id + "-fieldset-toggle-group";
    };
    ToggleGroupComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.toggles && changes.toggles.currentValue) {
            this.isAllSelected = this.toggles.every(function (toggle) { return toggle.isSelected; });
            this.dividers = this.toggles.map(function (toggle, index) {
                return {
                    hasDivider: true,
                    isFirst: index === 0,
                    isLast: index === _this.toggles.length - 1
                };
            });
            this.onSelection.emit(this.toggles);
        }
    };
    ToggleGroupComponent.prototype.toggleSelectAll = function () {
        var _this = this;
        this.isAllSelected = !this.isAllSelected;
        this.toggles = this.toggles.map(function (toggle) { return (__assign(__assign({}, toggle), { isSelected: _this.isAllSelected })); });
        markForCheck(this.cdr);
        this.onSelection.emit(this.toggles);
    };
    ToggleGroupComponent.prototype.toggleSelection = function (isSelected, toggle) {
        toggle.isSelected = isSelected;
        markForCheck(this.cdr);
        this.onSelection.emit(this.toggles);
    };
    ToggleGroupComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ToggleGroupComponent.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ToggleGroupComponent.prototype, "toggles", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ToggleGroupComponent.prototype, "onSelection", void 0);
    ToggleGroupComponent = __decorate([
        Component({
            selector: 'pa-toggle-group',
            template: "<fieldset class=\"pa-fieldset-group\" [id]=\"id\">\n    <legend #text translate>\n        <ng-content></ng-content>\n    </legend>\n\n    <pa-button size=\"small\" class=\"pa-field-button-right\"\n               [color]=\"isAllSelected ? 'secondary' : 'primary'\"\n               (click)=\"toggleSelectAll()\">\n        {{isAllSelected ? 'common.deselect-all' : 'common.select-all'}}\n    </pa-button>\n\n    <pa-toggle *ngFor=\"let toggle of toggles; let i = index;\"\n               [id]=\"toggle.id\"\n               [imageUrl]=\"toggle.imageUrl\"\n               [help]=\"toggle.help\"\n               [divider]=\"dividers[i]\"\n               [isSelected]=\"toggle.isSelected\"\n               (isSelectedChange)=\"toggleSelection($event, toggle)\">{{toggle.label}}\n    </pa-toggle>\n</fieldset>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [":host{display:block}"]
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], ToggleGroupComponent);
    return ToggleGroupComponent;
}());
export { ToggleGroupComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLWdyb3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BndWlsbG90aW5hd2ViL3Bhc3RhbmFnYS1hbmd1bGFyLyIsInNvdXJjZXMiOlsibGliL2NvbnRyb2xzL3RvZ2dsZS1ncm91cC90b2dnbGUtZ3JvdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdEksT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRWxELElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQVFmO0lBUUksOEJBQW9CLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBTmpDLFlBQU8sR0FBa0IsRUFBRSxDQUFDO1FBQzNCLGdCQUFXLEdBQWdDLElBQUksWUFBWSxFQUFFLENBQUM7UUFFeEUsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsYUFBUSxHQUFvQixFQUFFLENBQUM7SUFFYyxDQUFDO0lBRTlDLHVDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsMkJBQXlCLE1BQU0sRUFBSSxDQUFDLENBQUMsQ0FBSSxJQUFJLENBQUMsRUFBRSwyQkFBd0IsQ0FBQztJQUNsRyxDQUFDO0lBRUQsMENBQVcsR0FBWCxVQUFZLE9BQU87UUFBbkIsaUJBWUM7UUFYRyxJQUFJLE9BQU8sQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUU7WUFDakQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxVQUFVLEVBQWpCLENBQWlCLENBQUMsQ0FBQztZQUNyRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUMsTUFBTSxFQUFFLEtBQUs7Z0JBQzNDLE9BQU87b0JBQ0gsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLE9BQU8sRUFBRSxLQUFLLEtBQUssQ0FBQztvQkFDcEIsTUFBTSxFQUFFLEtBQUssS0FBSyxLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDO2lCQUM1QyxDQUFDO1lBQ04sQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdkM7SUFDTCxDQUFDO0lBRUQsOENBQWUsR0FBZjtRQUFBLGlCQVFDO1FBUEcsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDekMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLHVCQUNuQyxNQUFNLEtBQ1QsVUFBVSxFQUFFLEtBQUksQ0FBQyxhQUFhLElBQ2hDLEVBSHdDLENBR3hDLENBQUMsQ0FBQztRQUNKLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCw4Q0FBZSxHQUFmLFVBQWdCLFVBQW1CLEVBQUUsTUFBbUI7UUFDcEQsTUFBTSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDL0IsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7Z0JBbEN3QixpQkFBaUI7O0lBUGpDO1FBQVIsS0FBSyxFQUFFOztvREFBYTtJQUNaO1FBQVIsS0FBSyxFQUFFOzt5REFBNkI7SUFDM0I7UUFBVCxNQUFNLEVBQUU7a0NBQWMsWUFBWTs2REFBcUM7SUFIL0Qsb0JBQW9CO1FBTmhDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsK3lCQUE0QztZQUU1QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7U0FDbEQsQ0FBQzt5Q0FTMkIsaUJBQWlCO09BUmpDLG9CQUFvQixDQTJDaEM7SUFBRCwyQkFBQztDQUFBLEFBM0NELElBMkNDO1NBM0NZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUb2dnbGVNb2RlbCwgVG9nZ2xlRGl2aWRlciB9IGZyb20gJy4uL3RvZ2dsZS5tb2RlbCc7XG5pbXBvcnQgeyBtYXJrRm9yQ2hlY2sgfSBmcm9tICcuLi8uLi9jb21tb24vdXRpbHMnO1xuXG5sZXQgbmV4dElkID0gMDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwYS10b2dnbGUtZ3JvdXAnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90b2dnbGUtZ3JvdXAuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3RvZ2dsZS1ncm91cC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBUb2dnbGVHcm91cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoKSBpZD86IHN0cmluZztcbiAgICBASW5wdXQoKSB0b2dnbGVzOiBUb2dnbGVNb2RlbFtdID0gW107XG4gICAgQE91dHB1dCgpIG9uU2VsZWN0aW9uOiBFdmVudEVtaXR0ZXI8VG9nZ2xlTW9kZWxbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBpc0FsbFNlbGVjdGVkID0gZmFsc2U7XG4gICAgZGl2aWRlcnM6IFRvZ2dsZURpdmlkZXJbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaWQgPSAhdGhpcy5pZCA/IGBmaWVsZHNldC10b2dnbGUtZ3JvdXAtJHtuZXh0SWQrK31gIDogYCR7dGhpcy5pZH0tZmllbGRzZXQtdG9nZ2xlLWdyb3VwYDtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzLnRvZ2dsZXMgJiYgY2hhbmdlcy50b2dnbGVzLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5pc0FsbFNlbGVjdGVkID0gdGhpcy50b2dnbGVzLmV2ZXJ5KHRvZ2dsZSA9PiB0b2dnbGUuaXNTZWxlY3RlZCk7XG4gICAgICAgICAgICB0aGlzLmRpdmlkZXJzID0gdGhpcy50b2dnbGVzLm1hcCgodG9nZ2xlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGhhc0RpdmlkZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGlzRmlyc3Q6IGluZGV4ID09PSAwLFxuICAgICAgICAgICAgICAgICAgICBpc0xhc3Q6IGluZGV4ID09PSB0aGlzLnRvZ2dsZXMubGVuZ3RoIC0gMVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMub25TZWxlY3Rpb24uZW1pdCh0aGlzLnRvZ2dsZXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlU2VsZWN0QWxsKCkge1xuICAgICAgICB0aGlzLmlzQWxsU2VsZWN0ZWQgPSAhdGhpcy5pc0FsbFNlbGVjdGVkO1xuICAgICAgICB0aGlzLnRvZ2dsZXMgPSB0aGlzLnRvZ2dsZXMubWFwKHRvZ2dsZSA9PiAoe1xuICAgICAgICAgICAgLi4udG9nZ2xlLFxuICAgICAgICAgICAgaXNTZWxlY3RlZDogdGhpcy5pc0FsbFNlbGVjdGVkLFxuICAgICAgICB9KSk7XG4gICAgICAgIG1hcmtGb3JDaGVjayh0aGlzLmNkcik7XG4gICAgICAgIHRoaXMub25TZWxlY3Rpb24uZW1pdCh0aGlzLnRvZ2dsZXMpO1xuICAgIH1cblxuICAgIHRvZ2dsZVNlbGVjdGlvbihpc1NlbGVjdGVkOiBib29sZWFuLCB0b2dnbGU6IFRvZ2dsZU1vZGVsKSB7XG4gICAgICAgIHRvZ2dsZS5pc1NlbGVjdGVkID0gaXNTZWxlY3RlZDtcbiAgICAgICAgbWFya0ZvckNoZWNrKHRoaXMuY2RyKTtcbiAgICAgICAgdGhpcy5vblNlbGVjdGlvbi5lbWl0KHRoaXMudG9nZ2xlcyk7XG4gICAgfVxufVxuIl19