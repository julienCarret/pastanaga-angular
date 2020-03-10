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
let TextFieldModule = class TextFieldModule {
};
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
export { TextFieldModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGZpZWxkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BndWlsbG90aW5hd2ViL3Bhc3RhbmFnYS1hbmd1bGFyLyIsInNvdXJjZXMiOlsibGliL3RleHRmaWVsZC90ZXh0ZmllbGQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDbkYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUEwQjdELElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7Q0FDM0IsQ0FBQTtBQURZLGVBQWU7SUF4QjNCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRTtZQUNMLFlBQVk7WUFDWixlQUFlO1lBQ2YsU0FBUztZQUNULFlBQVk7WUFDWixhQUFhO1lBQ2IsY0FBYztTQUNqQjtRQUNELFlBQVksRUFBRTtZQUNWLGNBQWM7WUFDZCxrQkFBa0I7WUFDbEIsZUFBZTtZQUNmLGlCQUFpQjtZQUNqQixzQkFBc0I7U0FDekI7UUFDRCxPQUFPLEVBQUU7WUFDTCxjQUFjO1lBQ2Qsa0JBQWtCO1lBQ2xCLGVBQWU7WUFDZixpQkFBaUI7WUFDakIsc0JBQXNCO1NBQ3pCO0tBQ0osQ0FBQztHQUNXLGVBQWUsQ0FDM0I7U0FEWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbnB1dENvbXBvbmVudCB9IGZyb20gJy4vaW5wdXQuY29tcG9uZW50JztcbmltcG9ydCB7IFNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUZXh0YXJlYUNvbXBvbmVudCB9IGZyb20gJy4vdGV4dGFyZWEuY29tcG9uZW50JztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJy4uL3RyYW5zbGF0ZS90cmFuc2xhdGUubW9kdWxlJztcbmltcG9ydCB7IFN2Z01vZHVsZSB9IGZyb20gJy4uL3N2Zy9zdmcubW9kdWxlJztcbmltcG9ydCB7IFBhc3N3b3JkSW5wdXRDb21wb25lbnQgfSBmcm9tICcuL3Bhc3N3b3JkLWlucHV0L3Bhc3N3b3JkLWlucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJbnB1dEljb25Db21wb25lbnQgfSBmcm9tICcuL2lucHV0LWljb24vaW5wdXQtaWNvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgQnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vYnV0dG9uL2J1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHsgVG9vbHRpcE1vZHVsZSB9IGZyb20gJy4uL3Rvb2x0aXAvdG9vbHRpcC5tb2R1bGUnO1xuaW1wb3J0IHsgUHJvZ3Jlc3NNb2R1bGUgfSBmcm9tICcuLi9wcm9ncmVzcy9wcm9ncmVzcy5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBUcmFuc2xhdGVNb2R1bGUsXG4gICAgICAgIFN2Z01vZHVsZSxcbiAgICAgICAgQnV0dG9uTW9kdWxlLFxuICAgICAgICBUb29sdGlwTW9kdWxlLFxuICAgICAgICBQcm9ncmVzc01vZHVsZSxcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBJbnB1dENvbXBvbmVudCxcbiAgICAgICAgSW5wdXRJY29uQ29tcG9uZW50LFxuICAgICAgICBTZWxlY3RDb21wb25lbnQsXG4gICAgICAgIFRleHRhcmVhQ29tcG9uZW50LFxuICAgICAgICBQYXNzd29yZElucHV0Q29tcG9uZW50LFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBJbnB1dENvbXBvbmVudCxcbiAgICAgICAgSW5wdXRJY29uQ29tcG9uZW50LFxuICAgICAgICBTZWxlY3RDb21wb25lbnQsXG4gICAgICAgIFRleHRhcmVhQ29tcG9uZW50LFxuICAgICAgICBQYXNzd29yZElucHV0Q29tcG9uZW50LFxuICAgIF0sXG59KVxuZXhwb3J0IGNsYXNzIFRleHRGaWVsZE1vZHVsZSB7XG59XG4iXX0=