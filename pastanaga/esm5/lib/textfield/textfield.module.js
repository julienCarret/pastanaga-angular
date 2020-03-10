import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { SelectComponent } from './select.component';
import { TextareaComponent } from './textarea.component';
import { TranslateModule } from '../translate/translate.module';
import { SvgModule } from '../svg/svg.module';
import { PasswordInputComponent } from './password-input/password-input.component';
import { InputIconComponent } from './input-icon/input-icon.component';
import { ButtonModule } from '../button/button.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { ProgressModule } from '../progress/progress.module';
var TextFieldModule = /** @class */ (function () {
    function TextFieldModule() {
    }
    TextFieldModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                TranslateModule,
                SvgModule,
                ButtonModule,
                TooltipModule,
                ProgressModule,
            ],
            declarations: [
                InputComponent,
                InputIconComponent,
                SelectComponent,
                TextareaComponent,
                PasswordInputComponent,
            ],
            exports: [
                InputComponent,
                InputIconComponent,
                SelectComponent,
                TextareaComponent,
                PasswordInputComponent,
            ],
        })
    ], TextFieldModule);
    return TextFieldModule;
}());
export { TextFieldModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGZpZWxkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BndWlsbG90aW5hd2ViL3Bhc3RhbmFnYS1hbmd1bGFyLyIsInNvdXJjZXMiOlsibGliL3RleHRmaWVsZC90ZXh0ZmllbGQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDbkYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUEwQjdEO0lBQUE7SUFDQSxDQUFDO0lBRFksZUFBZTtRQXhCM0IsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLFlBQVk7Z0JBQ1osZUFBZTtnQkFDZixTQUFTO2dCQUNULFlBQVk7Z0JBQ1osYUFBYTtnQkFDYixjQUFjO2FBQ2pCO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLGNBQWM7Z0JBQ2Qsa0JBQWtCO2dCQUNsQixlQUFlO2dCQUNmLGlCQUFpQjtnQkFDakIsc0JBQXNCO2FBQ3pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLGNBQWM7Z0JBQ2Qsa0JBQWtCO2dCQUNsQixlQUFlO2dCQUNmLGlCQUFpQjtnQkFDakIsc0JBQXNCO2FBQ3pCO1NBQ0osQ0FBQztPQUNXLGVBQWUsQ0FDM0I7SUFBRCxzQkFBQztDQUFBLEFBREQsSUFDQztTQURZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IElucHV0Q29tcG9uZW50IH0gZnJvbSAnLi9pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9zZWxlY3QuY29tcG9uZW50JztcbmltcG9ydCB7IFRleHRhcmVhQ29tcG9uZW50IH0gZnJvbSAnLi90ZXh0YXJlYS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnLi4vdHJhbnNsYXRlL3RyYW5zbGF0ZS5tb2R1bGUnO1xuaW1wb3J0IHsgU3ZnTW9kdWxlIH0gZnJvbSAnLi4vc3ZnL3N2Zy5tb2R1bGUnO1xuaW1wb3J0IHsgUGFzc3dvcmRJbnB1dENvbXBvbmVudCB9IGZyb20gJy4vcGFzc3dvcmQtaW5wdXQvcGFzc3dvcmQtaW5wdXQuY29tcG9uZW50JztcbmltcG9ydCB7IElucHV0SWNvbkNvbXBvbmVudCB9IGZyb20gJy4vaW5wdXQtaWNvbi9pbnB1dC1pY29uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCdXR0b25Nb2R1bGUgfSBmcm9tICcuLi9idXR0b24vYnV0dG9uLm1vZHVsZSc7XG5pbXBvcnQgeyBUb29sdGlwTW9kdWxlIH0gZnJvbSAnLi4vdG9vbHRpcC90b29sdGlwLm1vZHVsZSc7XG5pbXBvcnQgeyBQcm9ncmVzc01vZHVsZSB9IGZyb20gJy4uL3Byb2dyZXNzL3Byb2dyZXNzLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgICAgICAgU3ZnTW9kdWxlLFxuICAgICAgICBCdXR0b25Nb2R1bGUsXG4gICAgICAgIFRvb2x0aXBNb2R1bGUsXG4gICAgICAgIFByb2dyZXNzTW9kdWxlLFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIElucHV0Q29tcG9uZW50LFxuICAgICAgICBJbnB1dEljb25Db21wb25lbnQsXG4gICAgICAgIFNlbGVjdENvbXBvbmVudCxcbiAgICAgICAgVGV4dGFyZWFDb21wb25lbnQsXG4gICAgICAgIFBhc3N3b3JkSW5wdXRDb21wb25lbnQsXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIElucHV0Q29tcG9uZW50LFxuICAgICAgICBJbnB1dEljb25Db21wb25lbnQsXG4gICAgICAgIFNlbGVjdENvbXBvbmVudCxcbiAgICAgICAgVGV4dGFyZWFDb21wb25lbnQsXG4gICAgICAgIFBhc3N3b3JkSW5wdXRDb21wb25lbnQsXG4gICAgXSxcbn0pXG5leHBvcnQgY2xhc3MgVGV4dEZpZWxkTW9kdWxlIHtcbn1cbiJdfQ==