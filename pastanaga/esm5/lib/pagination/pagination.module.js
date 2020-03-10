import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from '../tooltip/tooltip.module';
import { ButtonModule } from '../button/button.module';
import { PaginationComponent } from './pagination.component';
import { SvgModule } from '../svg/svg.module';
var PaginationModule = /** @class */ (function () {
    function PaginationModule() {
    }
    PaginationModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                ButtonModule,
                TooltipModule,
                SvgModule,
            ],
            exports: [
                PaginationComponent,
            ],
            declarations: [
                PaginationComponent,
            ],
            providers: [],
        })
    ], PaginationModule);
    return PaginationModule;
}());
export { PaginationModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ3VpbGxvdGluYXdlYi9wYXN0YW5hZ2EtYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi9wYWdpbmF0aW9uL3BhZ2luYXRpb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQWlCOUM7SUFBQTtJQUFnQyxDQUFDO0lBQXBCLGdCQUFnQjtRQWY1QixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsWUFBWTtnQkFDWixZQUFZO2dCQUNaLGFBQWE7Z0JBQ2IsU0FBUzthQUNaO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLG1CQUFtQjthQUN0QjtZQUNELFlBQVksRUFBRTtnQkFDVixtQkFBbUI7YUFDdEI7WUFDRCxTQUFTLEVBQUUsRUFBRTtTQUNoQixDQUFDO09BQ1csZ0JBQWdCLENBQUk7SUFBRCx1QkFBQztDQUFBLEFBQWpDLElBQWlDO1NBQXBCLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBUb29sdGlwTW9kdWxlIH0gZnJvbSAnLi4vdG9vbHRpcC90b29sdGlwLm1vZHVsZSc7XG5pbXBvcnQgeyBCdXR0b25Nb2R1bGUgfSBmcm9tICcuLi9idXR0b24vYnV0dG9uLm1vZHVsZSc7XG5pbXBvcnQgeyBQYWdpbmF0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9wYWdpbmF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdmdNb2R1bGUgfSBmcm9tICcuLi9zdmcvc3ZnLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgVG9vbHRpcE1vZHVsZSxcbiAgICAgICAgU3ZnTW9kdWxlLFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBQYWdpbmF0aW9uQ29tcG9uZW50LFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFBhZ2luYXRpb25Db21wb25lbnQsXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtdLFxufSlcbmV4cG9ydCBjbGFzcyBQYWdpbmF0aW9uTW9kdWxlIHsgfVxuIl19