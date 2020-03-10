import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { markForCheck } from '../../common/utils';
let nextId = 0;
let ToggleGroupComponent = class ToggleGroupComponent {
    constructor(cdr) {
        this.cdr = cdr;
        this.toggles = [];
        this.onSelection = new EventEmitter();
        this.isAllSelected = false;
        this.dividers = [];
    }
    ngOnInit() {
        this.id = !this.id ? `fieldset-toggle-group-${nextId++}` : `${this.id}-fieldset-toggle-group`;
    }
    ngOnChanges(changes) {
        if (changes.toggles && changes.toggles.currentValue) {
            this.isAllSelected = this.toggles.every(toggle => toggle.isSelected);
            this.dividers = this.toggles.map((toggle, index) => {
                return {
                    hasDivider: true,
                    isFirst: index === 0,
                    isLast: index === this.toggles.length - 1
                };
            });
            this.onSelection.emit(this.toggles);
        }
    }
    toggleSelectAll() {
        this.isAllSelected = !this.isAllSelected;
        this.toggles = this.toggles.map(toggle => (Object.assign(Object.assign({}, toggle), { isSelected: this.isAllSelected })));
        markForCheck(this.cdr);
        this.onSelection.emit(this.toggles);
    }
    toggleSelection(isSelected, toggle) {
        toggle.isSelected = isSelected;
        markForCheck(this.cdr);
        this.onSelection.emit(this.toggles);
    }
};
ToggleGroupComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
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
export { ToggleGroupComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLWdyb3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BndWlsbG90aW5hd2ViL3Bhc3RhbmFnYS1hbmd1bGFyLyIsInNvdXJjZXMiOlsibGliL2NvbnRyb2xzL3RvZ2dsZS1ncm91cC90b2dnbGUtZ3JvdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdEksT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRWxELElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQVFmLElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQW9CO0lBUTdCLFlBQW9CLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBTmpDLFlBQU8sR0FBa0IsRUFBRSxDQUFDO1FBQzNCLGdCQUFXLEdBQWdDLElBQUksWUFBWSxFQUFFLENBQUM7UUFFeEUsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsYUFBUSxHQUFvQixFQUFFLENBQUM7SUFFYyxDQUFDO0lBRTlDLFFBQVE7UUFDSixJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMseUJBQXlCLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsd0JBQXdCLENBQUM7SUFDbEcsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFPO1FBQ2YsSUFBSSxPQUFPLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFO1lBQ2pELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDckUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDL0MsT0FBTztvQkFDSCxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsT0FBTyxFQUFFLEtBQUssS0FBSyxDQUFDO29CQUNwQixNQUFNLEVBQUUsS0FBSyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUM7aUJBQzVDLENBQUM7WUFDTixDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN2QztJQUNMLENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDekMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGlDQUNuQyxNQUFNLEtBQ1QsVUFBVSxFQUFFLElBQUksQ0FBQyxhQUFhLElBQ2hDLENBQUMsQ0FBQztRQUNKLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxlQUFlLENBQUMsVUFBbUIsRUFBRSxNQUFtQjtRQUNwRCxNQUFNLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUMvQixZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN4QyxDQUFDO0NBQ0osQ0FBQTs7WUFuQzRCLGlCQUFpQjs7QUFQakM7SUFBUixLQUFLLEVBQUU7O2dEQUFhO0FBQ1o7SUFBUixLQUFLLEVBQUU7O3FEQUE2QjtBQUMzQjtJQUFULE1BQU0sRUFBRTs4QkFBYyxZQUFZO3lEQUFxQztBQUgvRCxvQkFBb0I7SUFOaEMsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQiwreUJBQTRDO1FBRTVDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztLQUNsRCxDQUFDO3FDQVMyQixpQkFBaUI7R0FSakMsb0JBQW9CLENBMkNoQztTQTNDWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVG9nZ2xlTW9kZWwsIFRvZ2dsZURpdmlkZXIgfSBmcm9tICcuLi90b2dnbGUubW9kZWwnO1xuaW1wb3J0IHsgbWFya0ZvckNoZWNrIH0gZnJvbSAnLi4vLi4vY29tbW9uL3V0aWxzJztcblxubGV0IG5leHRJZCA9IDA7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncGEtdG9nZ2xlLWdyb3VwJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdG9nZ2xlLWdyb3VwLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90b2dnbGUtZ3JvdXAuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgVG9nZ2xlR3JvdXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gICAgQElucHV0KCkgaWQ/OiBzdHJpbmc7XG4gICAgQElucHV0KCkgdG9nZ2xlczogVG9nZ2xlTW9kZWxbXSA9IFtdO1xuICAgIEBPdXRwdXQoKSBvblNlbGVjdGlvbjogRXZlbnRFbWl0dGVyPFRvZ2dsZU1vZGVsW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgaXNBbGxTZWxlY3RlZCA9IGZhbHNlO1xuICAgIGRpdmlkZXJzOiBUb2dnbGVEaXZpZGVyW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmlkID0gIXRoaXMuaWQgPyBgZmllbGRzZXQtdG9nZ2xlLWdyb3VwLSR7bmV4dElkKyt9YCA6IGAke3RoaXMuaWR9LWZpZWxkc2V0LXRvZ2dsZS1ncm91cGA7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlcykge1xuICAgICAgICBpZiAoY2hhbmdlcy50b2dnbGVzICYmIGNoYW5nZXMudG9nZ2xlcy5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuaXNBbGxTZWxlY3RlZCA9IHRoaXMudG9nZ2xlcy5ldmVyeSh0b2dnbGUgPT4gdG9nZ2xlLmlzU2VsZWN0ZWQpO1xuICAgICAgICAgICAgdGhpcy5kaXZpZGVycyA9IHRoaXMudG9nZ2xlcy5tYXAoKHRvZ2dsZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBoYXNEaXZpZGVyOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBpc0ZpcnN0OiBpbmRleCA9PT0gMCxcbiAgICAgICAgICAgICAgICAgICAgaXNMYXN0OiBpbmRleCA9PT0gdGhpcy50b2dnbGVzLmxlbmd0aCAtIDFcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLm9uU2VsZWN0aW9uLmVtaXQodGhpcy50b2dnbGVzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZVNlbGVjdEFsbCgpIHtcbiAgICAgICAgdGhpcy5pc0FsbFNlbGVjdGVkID0gIXRoaXMuaXNBbGxTZWxlY3RlZDtcbiAgICAgICAgdGhpcy50b2dnbGVzID0gdGhpcy50b2dnbGVzLm1hcCh0b2dnbGUgPT4gKHtcbiAgICAgICAgICAgIC4uLnRvZ2dsZSxcbiAgICAgICAgICAgIGlzU2VsZWN0ZWQ6IHRoaXMuaXNBbGxTZWxlY3RlZCxcbiAgICAgICAgfSkpO1xuICAgICAgICBtYXJrRm9yQ2hlY2sodGhpcy5jZHIpO1xuICAgICAgICB0aGlzLm9uU2VsZWN0aW9uLmVtaXQodGhpcy50b2dnbGVzKTtcbiAgICB9XG5cbiAgICB0b2dnbGVTZWxlY3Rpb24oaXNTZWxlY3RlZDogYm9vbGVhbiwgdG9nZ2xlOiBUb2dnbGVNb2RlbCkge1xuICAgICAgICB0b2dnbGUuaXNTZWxlY3RlZCA9IGlzU2VsZWN0ZWQ7XG4gICAgICAgIG1hcmtGb3JDaGVjayh0aGlzLmNkcik7XG4gICAgICAgIHRoaXMub25TZWxlY3Rpb24uZW1pdCh0aGlzLnRvZ2dsZXMpO1xuICAgIH1cbn1cbiJdfQ==