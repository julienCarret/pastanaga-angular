import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { SvgModule } from '../svg/svg.module';
import { TranslateModule } from '../translate/translate.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { DropdownComponent } from './dropdown.component';
import { DropdownSeparatorComponent } from './dropdown-separator.component';
import { DropdownSectionComponent } from './dropdown-section.component';
import { DropdownItemComponent } from './dropdown-item.component';
import { ControlsModule } from '../controls/controls.module';
import { DropdownCheckboxComponent } from './dropdown-checkbox.component';
import { BadgeModule } from '../badge/badge.module';
import { PopupModule } from '../popup/popup.module';
var DropdownModule = /** @class */ (function () {
    function DropdownModule() {
    }
    DropdownModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                BadgeModule,
                ButtonModule,
                ControlsModule,
                PopupModule,
                SvgModule,
                TooltipModule,
                TranslateModule,
            ],
            exports: [
                DropdownComponent,
                DropdownCheckboxComponent,
                DropdownItemComponent,
                DropdownSectionComponent,
                DropdownSeparatorComponent,
            ],
            declarations: [
                DropdownComponent,
                DropdownCheckboxComponent,
                DropdownItemComponent,
                DropdownSectionComponent,
                DropdownSeparatorComponent,
            ],
        })
    ], DropdownModule);
    return DropdownModule;
}());
export { DropdownModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGd1aWxsb3RpbmF3ZWIvcGFzdGFuYWdhLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvZHJvcGRvd24vbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUE0QnBEO0lBQUE7SUFBNkIsQ0FBQztJQUFqQixjQUFjO1FBMUIxQixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsWUFBWTtnQkFDWixXQUFXO2dCQUNYLFlBQVk7Z0JBQ1osY0FBYztnQkFDZCxXQUFXO2dCQUNYLFNBQVM7Z0JBQ1QsYUFBYTtnQkFDYixlQUFlO2FBQ2xCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLGlCQUFpQjtnQkFDakIseUJBQXlCO2dCQUN6QixxQkFBcUI7Z0JBQ3JCLHdCQUF3QjtnQkFDeEIsMEJBQTBCO2FBQzdCO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLGlCQUFpQjtnQkFDakIseUJBQXlCO2dCQUN6QixxQkFBcUI7Z0JBQ3JCLHdCQUF3QjtnQkFDeEIsMEJBQTBCO2FBQzdCO1NBQ0osQ0FBQztPQUNXLGNBQWMsQ0FBRztJQUFELHFCQUFDO0NBQUEsQUFBOUIsSUFBOEI7U0FBakIsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vYnV0dG9uL2J1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHsgU3ZnTW9kdWxlIH0gZnJvbSAnLi4vc3ZnL3N2Zy5tb2R1bGUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnLi4vdHJhbnNsYXRlL3RyYW5zbGF0ZS5tb2R1bGUnO1xuaW1wb3J0IHsgVG9vbHRpcE1vZHVsZSB9IGZyb20gJy4uL3Rvb2x0aXAvdG9vbHRpcC5tb2R1bGUnO1xuaW1wb3J0IHsgRHJvcGRvd25Db21wb25lbnQgfSBmcm9tICcuL2Ryb3Bkb3duLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEcm9wZG93blNlcGFyYXRvckNvbXBvbmVudCB9IGZyb20gJy4vZHJvcGRvd24tc2VwYXJhdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEcm9wZG93blNlY3Rpb25Db21wb25lbnQgfSBmcm9tICcuL2Ryb3Bkb3duLXNlY3Rpb24uY29tcG9uZW50JztcbmltcG9ydCB7IERyb3Bkb3duSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vZHJvcGRvd24taXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29udHJvbHNNb2R1bGUgfSBmcm9tICcuLi9jb250cm9scy9jb250cm9scy5tb2R1bGUnO1xuaW1wb3J0IHsgRHJvcGRvd25DaGVja2JveENvbXBvbmVudCB9IGZyb20gJy4vZHJvcGRvd24tY2hlY2tib3guY29tcG9uZW50JztcbmltcG9ydCB7IEJhZGdlTW9kdWxlIH0gZnJvbSAnLi4vYmFkZ2UvYmFkZ2UubW9kdWxlJztcbmltcG9ydCB7IFBvcHVwTW9kdWxlIH0gZnJvbSAnLi4vcG9wdXAvcG9wdXAubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgQmFkZ2VNb2R1bGUsXG4gICAgICAgIEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgQ29udHJvbHNNb2R1bGUsXG4gICAgICAgIFBvcHVwTW9kdWxlLFxuICAgICAgICBTdmdNb2R1bGUsXG4gICAgICAgIFRvb2x0aXBNb2R1bGUsXG4gICAgICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgRHJvcGRvd25Db21wb25lbnQsXG4gICAgICAgIERyb3Bkb3duQ2hlY2tib3hDb21wb25lbnQsXG4gICAgICAgIERyb3Bkb3duSXRlbUNvbXBvbmVudCxcbiAgICAgICAgRHJvcGRvd25TZWN0aW9uQ29tcG9uZW50LFxuICAgICAgICBEcm9wZG93blNlcGFyYXRvckNvbXBvbmVudCxcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBEcm9wZG93bkNvbXBvbmVudCxcbiAgICAgICAgRHJvcGRvd25DaGVja2JveENvbXBvbmVudCxcbiAgICAgICAgRHJvcGRvd25JdGVtQ29tcG9uZW50LFxuICAgICAgICBEcm9wZG93blNlY3Rpb25Db21wb25lbnQsXG4gICAgICAgIERyb3Bkb3duU2VwYXJhdG9yQ29tcG9uZW50LFxuICAgIF0sXG59KVxuZXhwb3J0IGNsYXNzIERyb3Bkb3duTW9kdWxlIHt9XG4iXX0=