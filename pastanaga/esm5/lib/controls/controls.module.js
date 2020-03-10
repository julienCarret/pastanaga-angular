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
var ControlsModule = /** @class */ (function () {
    function ControlsModule() {
    }
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
    return ControlsModule;
}());
export { ControlsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGd1aWxsb3RpbmF3ZWIvcGFzdGFuYWdhLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvY29udHJvbHMvY29udHJvbHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDaEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDaEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBK0JuRjtJQUFBO0lBQ0EsQ0FBQztJQURZLGNBQWM7UUE3QjFCLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCxZQUFZO2dCQUNaLFdBQVc7Z0JBQ1gsZUFBZTtnQkFDZixXQUFXO2dCQUNYLFlBQVk7Z0JBQ1osU0FBUztnQkFDVCxhQUFhO2FBQ2hCO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLGlCQUFpQjtnQkFDakIsc0JBQXNCO2dCQUN0QixxQkFBcUI7Z0JBQ3JCLHFCQUFxQjtnQkFDckIsZUFBZTtnQkFDZixlQUFlO2dCQUNmLG9CQUFvQjthQUN2QjtZQUNELE9BQU8sRUFBRTtnQkFDTCxpQkFBaUI7Z0JBQ2pCLHNCQUFzQjtnQkFDdEIscUJBQXFCO2dCQUNyQixxQkFBcUI7Z0JBQ3JCLGVBQWU7Z0JBQ2YsZUFBZTtnQkFDZixvQkFBb0I7YUFDdkI7U0FDSixDQUFDO09BQ1csY0FBYyxDQUMxQjtJQUFELHFCQUFDO0NBQUEsQUFERCxJQUNDO1NBRFksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDaGVja2JveENvbXBvbmVudCB9IGZyb20gJy4vY2hlY2tib3gvY2hlY2tib3guY29tcG9uZW50JztcbmltcG9ydCB7IFN2Z01vZHVsZSB9IGZyb20gJy4uL3N2Zy9zdmcubW9kdWxlJztcbmltcG9ydCB7IEJhZGdlTW9kdWxlIH0gZnJvbSAnLi4vYmFkZ2UvYmFkZ2UubW9kdWxlJztcbmltcG9ydCB7IEJ1dHRvbk1vZHVsZSB9IGZyb20gJy4uL2J1dHRvbi9idXR0b24ubW9kdWxlJztcbmltcG9ydCB7IFRvb2x0aXBNb2R1bGUgfSBmcm9tICcuLi90b29sdGlwL3Rvb2x0aXAubW9kdWxlJztcbmltcG9ydCB7IFRvZ2dsZUNvbXBvbmVudCB9IGZyb20gJy4vdG9nZ2xlL3RvZ2dsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVG9nZ2xlR3JvdXBDb21wb25lbnQgfSBmcm9tICcuL3RvZ2dsZS1ncm91cC90b2dnbGUtZ3JvdXAuY29tcG9uZW50JztcbmltcG9ydCB7IFNsaWRlckNvbXBvbmVudCB9IGZyb20gJy4vc2xpZGVyL3NsaWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRG91YmxlU2xpZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9kb3VibGUtc2xpZGVyL2RvdWJsZS1zbGlkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IENoZWNrYm94VHJlZUNvbXBvbmVudCB9IGZyb20gJy4vY2hlY2tib3gtdHJlZS9jaGVja2JveC10cmVlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICcuLi90cmFuc2xhdGUvdHJhbnNsYXRlLm1vZHVsZSc7XG5pbXBvcnQgeyBDaGVja2JveEdyb3VwQ29tcG9uZW50IH0gZnJvbSAnLi9jaGVja2JveC1ncm91cC9jaGVja2JveC1ncm91cC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgVHJhbnNsYXRlTW9kdWxlLFxuICAgICAgICBCYWRnZU1vZHVsZSxcbiAgICAgICAgQnV0dG9uTW9kdWxlLFxuICAgICAgICBTdmdNb2R1bGUsXG4gICAgICAgIFRvb2x0aXBNb2R1bGUsXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQ2hlY2tib3hDb21wb25lbnQsXG4gICAgICAgIENoZWNrYm94R3JvdXBDb21wb25lbnQsXG4gICAgICAgIENoZWNrYm94VHJlZUNvbXBvbmVudCxcbiAgICAgICAgRG91YmxlU2xpZGVyQ29tcG9uZW50LFxuICAgICAgICBTbGlkZXJDb21wb25lbnQsXG4gICAgICAgIFRvZ2dsZUNvbXBvbmVudCxcbiAgICAgICAgVG9nZ2xlR3JvdXBDb21wb25lbnQsXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIENoZWNrYm94Q29tcG9uZW50LFxuICAgICAgICBDaGVja2JveEdyb3VwQ29tcG9uZW50LFxuICAgICAgICBDaGVja2JveFRyZWVDb21wb25lbnQsXG4gICAgICAgIERvdWJsZVNsaWRlckNvbXBvbmVudCxcbiAgICAgICAgU2xpZGVyQ29tcG9uZW50LFxuICAgICAgICBUb2dnbGVDb21wb25lbnQsXG4gICAgICAgIFRvZ2dsZUdyb3VwQ29tcG9uZW50LFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQ29udHJvbHNNb2R1bGUge1xufVxuIl19