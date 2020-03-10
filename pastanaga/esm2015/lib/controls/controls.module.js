import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SvgModule } from '../svg/svg.module';
import { BadgeModule } from '../badge/badge.module';
import { ButtonModule } from '../button/button.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { ToggleComponent } from './toggle/toggle.component';
import { ToggleGroupComponent } from './toggle-group/toggle-group.component';
import { SliderComponent } from './slider/slider.component';
import { DoubleSliderComponent } from './double-slider/double-slider.component';
import { CheckboxTreeComponent } from './checkbox-tree/checkbox-tree.component';
import { TranslateModule } from '../translate/translate.module';
import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';
let ControlsModule = class ControlsModule {
};
ControlsModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            TranslateModule,
            BadgeModule,
            ButtonModule,
            SvgModule,
            TooltipModule,
        ],
        declarations: [
            CheckboxComponent,
            CheckboxGroupComponent,
            CheckboxTreeComponent,
            DoubleSliderComponent,
            SliderComponent,
            ToggleComponent,
            ToggleGroupComponent,
        ],
        exports: [
            CheckboxComponent,
            CheckboxGroupComponent,
            CheckboxTreeComponent,
            DoubleSliderComponent,
            SliderComponent,
            ToggleComponent,
            ToggleGroupComponent,
        ]
    })
], ControlsModule);
export { ControlsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGd1aWxsb3RpbmF3ZWIvcGFzdGFuYWdhLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvY29udHJvbHMvY29udHJvbHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDaEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDaEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBK0JuRixJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0NBQzFCLENBQUE7QUFEWSxjQUFjO0lBN0IxQixRQUFRLENBQUM7UUFDTixPQUFPLEVBQUU7WUFDTCxZQUFZO1lBQ1osV0FBVztZQUNYLGVBQWU7WUFDZixXQUFXO1lBQ1gsWUFBWTtZQUNaLFNBQVM7WUFDVCxhQUFhO1NBQ2hCO1FBQ0QsWUFBWSxFQUFFO1lBQ1YsaUJBQWlCO1lBQ2pCLHNCQUFzQjtZQUN0QixxQkFBcUI7WUFDckIscUJBQXFCO1lBQ3JCLGVBQWU7WUFDZixlQUFlO1lBQ2Ysb0JBQW9CO1NBQ3ZCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsaUJBQWlCO1lBQ2pCLHNCQUFzQjtZQUN0QixxQkFBcUI7WUFDckIscUJBQXFCO1lBQ3JCLGVBQWU7WUFDZixlQUFlO1lBQ2Ysb0JBQW9CO1NBQ3ZCO0tBQ0osQ0FBQztHQUNXLGNBQWMsQ0FDMUI7U0FEWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENoZWNrYm94Q29tcG9uZW50IH0gZnJvbSAnLi9jaGVja2JveC9jaGVja2JveC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3ZnTW9kdWxlIH0gZnJvbSAnLi4vc3ZnL3N2Zy5tb2R1bGUnO1xuaW1wb3J0IHsgQmFkZ2VNb2R1bGUgfSBmcm9tICcuLi9iYWRnZS9iYWRnZS5tb2R1bGUnO1xuaW1wb3J0IHsgQnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vYnV0dG9uL2J1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHsgVG9vbHRpcE1vZHVsZSB9IGZyb20gJy4uL3Rvb2x0aXAvdG9vbHRpcC5tb2R1bGUnO1xuaW1wb3J0IHsgVG9nZ2xlQ29tcG9uZW50IH0gZnJvbSAnLi90b2dnbGUvdG9nZ2xlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUb2dnbGVHcm91cENvbXBvbmVudCB9IGZyb20gJy4vdG9nZ2xlLWdyb3VwL3RvZ2dsZS1ncm91cC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2xpZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9zbGlkZXIvc2xpZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEb3VibGVTbGlkZXJDb21wb25lbnQgfSBmcm9tICcuL2RvdWJsZS1zbGlkZXIvZG91YmxlLXNsaWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2hlY2tib3hUcmVlQ29tcG9uZW50IH0gZnJvbSAnLi9jaGVja2JveC10cmVlL2NoZWNrYm94LXRyZWUuY29tcG9uZW50JztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJy4uL3RyYW5zbGF0ZS90cmFuc2xhdGUubW9kdWxlJztcbmltcG9ydCB7IENoZWNrYm94R3JvdXBDb21wb25lbnQgfSBmcm9tICcuL2NoZWNrYm94LWdyb3VwL2NoZWNrYm94LWdyb3VwLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBUcmFuc2xhdGVNb2R1bGUsXG4gICAgICAgIEJhZGdlTW9kdWxlLFxuICAgICAgICBCdXR0b25Nb2R1bGUsXG4gICAgICAgIFN2Z01vZHVsZSxcbiAgICAgICAgVG9vbHRpcE1vZHVsZSxcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBDaGVja2JveENvbXBvbmVudCxcbiAgICAgICAgQ2hlY2tib3hHcm91cENvbXBvbmVudCxcbiAgICAgICAgQ2hlY2tib3hUcmVlQ29tcG9uZW50LFxuICAgICAgICBEb3VibGVTbGlkZXJDb21wb25lbnQsXG4gICAgICAgIFNsaWRlckNvbXBvbmVudCxcbiAgICAgICAgVG9nZ2xlQ29tcG9uZW50LFxuICAgICAgICBUb2dnbGVHcm91cENvbXBvbmVudCxcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgQ2hlY2tib3hDb21wb25lbnQsXG4gICAgICAgIENoZWNrYm94R3JvdXBDb21wb25lbnQsXG4gICAgICAgIENoZWNrYm94VHJlZUNvbXBvbmVudCxcbiAgICAgICAgRG91YmxlU2xpZGVyQ29tcG9uZW50LFxuICAgICAgICBTbGlkZXJDb21wb25lbnQsXG4gICAgICAgIFRvZ2dsZUNvbXBvbmVudCxcbiAgICAgICAgVG9nZ2xlR3JvdXBDb21wb25lbnQsXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBDb250cm9sc01vZHVsZSB7XG59XG4iXX0=