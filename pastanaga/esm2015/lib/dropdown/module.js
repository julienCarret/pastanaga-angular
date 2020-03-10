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
let DropdownModule = class DropdownModule {
};
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
export { DropdownModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGd1aWxsb3RpbmF3ZWIvcGFzdGFuYWdhLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvZHJvcGRvd24vbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUE0QnBELElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7Q0FBRyxDQUFBO0FBQWpCLGNBQWM7SUExQjFCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRTtZQUNMLFlBQVk7WUFDWixXQUFXO1lBQ1gsWUFBWTtZQUNaLGNBQWM7WUFDZCxXQUFXO1lBQ1gsU0FBUztZQUNULGFBQWE7WUFDYixlQUFlO1NBQ2xCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsaUJBQWlCO1lBQ2pCLHlCQUF5QjtZQUN6QixxQkFBcUI7WUFDckIsd0JBQXdCO1lBQ3hCLDBCQUEwQjtTQUM3QjtRQUNELFlBQVksRUFBRTtZQUNWLGlCQUFpQjtZQUNqQix5QkFBeUI7WUFDekIscUJBQXFCO1lBQ3JCLHdCQUF3QjtZQUN4QiwwQkFBMEI7U0FDN0I7S0FDSixDQUFDO0dBQ1csY0FBYyxDQUFHO1NBQWpCLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEJ1dHRvbk1vZHVsZSB9IGZyb20gJy4uL2J1dHRvbi9idXR0b24ubW9kdWxlJztcbmltcG9ydCB7IFN2Z01vZHVsZSB9IGZyb20gJy4uL3N2Zy9zdmcubW9kdWxlJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJy4uL3RyYW5zbGF0ZS90cmFuc2xhdGUubW9kdWxlJztcbmltcG9ydCB7IFRvb2x0aXBNb2R1bGUgfSBmcm9tICcuLi90b29sdGlwL3Rvb2x0aXAubW9kdWxlJztcbmltcG9ydCB7IERyb3Bkb3duQ29tcG9uZW50IH0gZnJvbSAnLi9kcm9wZG93bi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRHJvcGRvd25TZXBhcmF0b3JDb21wb25lbnQgfSBmcm9tICcuL2Ryb3Bkb3duLXNlcGFyYXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRHJvcGRvd25TZWN0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9kcm9wZG93bi1zZWN0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEcm9wZG93bkl0ZW1Db21wb25lbnQgfSBmcm9tICcuL2Ryb3Bkb3duLWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IENvbnRyb2xzTW9kdWxlIH0gZnJvbSAnLi4vY29udHJvbHMvY29udHJvbHMubW9kdWxlJztcbmltcG9ydCB7IERyb3Bkb3duQ2hlY2tib3hDb21wb25lbnQgfSBmcm9tICcuL2Ryb3Bkb3duLWNoZWNrYm94LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCYWRnZU1vZHVsZSB9IGZyb20gJy4uL2JhZGdlL2JhZGdlLm1vZHVsZSc7XG5pbXBvcnQgeyBQb3B1cE1vZHVsZSB9IGZyb20gJy4uL3BvcHVwL3BvcHVwLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEJhZGdlTW9kdWxlLFxuICAgICAgICBCdXR0b25Nb2R1bGUsXG4gICAgICAgIENvbnRyb2xzTW9kdWxlLFxuICAgICAgICBQb3B1cE1vZHVsZSxcbiAgICAgICAgU3ZnTW9kdWxlLFxuICAgICAgICBUb29sdGlwTW9kdWxlLFxuICAgICAgICBUcmFuc2xhdGVNb2R1bGUsXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIERyb3Bkb3duQ29tcG9uZW50LFxuICAgICAgICBEcm9wZG93bkNoZWNrYm94Q29tcG9uZW50LFxuICAgICAgICBEcm9wZG93bkl0ZW1Db21wb25lbnQsXG4gICAgICAgIERyb3Bkb3duU2VjdGlvbkNvbXBvbmVudCxcbiAgICAgICAgRHJvcGRvd25TZXBhcmF0b3JDb21wb25lbnQsXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgRHJvcGRvd25Db21wb25lbnQsXG4gICAgICAgIERyb3Bkb3duQ2hlY2tib3hDb21wb25lbnQsXG4gICAgICAgIERyb3Bkb3duSXRlbUNvbXBvbmVudCxcbiAgICAgICAgRHJvcGRvd25TZWN0aW9uQ29tcG9uZW50LFxuICAgICAgICBEcm9wZG93blNlcGFyYXRvckNvbXBvbmVudCxcbiAgICBdLFxufSlcbmV4cG9ydCBjbGFzcyBEcm9wZG93bk1vZHVsZSB7fVxuIl19