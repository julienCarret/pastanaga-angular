import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from './tooltip.directive';
import { TooltipComponent } from './tooltip.component';
import { TranslateModule } from '../translate/translate.module';
var TooltipModule = /** @class */ (function () {
    function TooltipModule() {
    }
    TooltipModule = __decorate([
        NgModule({
            imports: [CommonModule, TranslateModule],
            exports: [TooltipComponent, TooltipDirective],
            declarations: [TooltipComponent, TooltipDirective],
            entryComponents: [TooltipComponent],
        })
    ], TooltipModule);
    return TooltipModule;
}());
export { TooltipModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ3VpbGxvdGluYXdlYi9wYXN0YW5hZ2EtYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi90b29sdGlwL3Rvb2x0aXAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFRaEU7SUFBQTtJQUE2QixDQUFDO0lBQWpCLGFBQWE7UUFOekIsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQztZQUN4QyxPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQztZQUM3QyxZQUFZLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQztZQUNsRCxlQUFlLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztTQUN0QyxDQUFDO09BQ1csYUFBYSxDQUFJO0lBQUQsb0JBQUM7Q0FBQSxBQUE5QixJQUE4QjtTQUFqQixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IFRvb2x0aXBEaXJlY3RpdmUgfSBmcm9tICcuL3Rvb2x0aXAuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRvb2x0aXBDb21wb25lbnQgfSBmcm9tICcuL3Rvb2x0aXAuY29tcG9uZW50JztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJy4uL3RyYW5zbGF0ZS90cmFuc2xhdGUubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBUcmFuc2xhdGVNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtUb29sdGlwQ29tcG9uZW50LCBUb29sdGlwRGlyZWN0aXZlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtUb29sdGlwQ29tcG9uZW50LCBUb29sdGlwRGlyZWN0aXZlXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtUb29sdGlwQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgVG9vbHRpcE1vZHVsZSB7IH1cbiJdfQ==