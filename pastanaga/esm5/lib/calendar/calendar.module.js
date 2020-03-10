import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { TranslateModule } from '../translate/translate.module';
import { CalendarComponent } from './calendar.component';
import { DatePickerComponent } from './date-picker.component';
import { PopupModule } from '../popup/popup.module';
import { DateInputComponent } from './date-input.component';
import { TextFieldModule } from '../textfield/textfield.module';
import { FormsModule } from '@angular/forms';
var CalendarModule = /** @class */ (function () {
    function CalendarModule() {
    }
    CalendarModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                ButtonModule,
                PopupModule,
                TooltipModule,
                TranslateModule,
                TextFieldModule,
                FormsModule,
            ],
            exports: [CalendarComponent, DatePickerComponent, DateInputComponent],
            declarations: [CalendarComponent, DatePickerComponent, DateInputComponent],
        })
    ], CalendarModule);
    return CalendarModule;
}());
export { CalendarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGd1aWxsb3RpbmF3ZWIvcGFzdGFuYWdhLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvY2FsZW5kYXIvY2FsZW5kYXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQWdCN0M7SUFBQTtJQUNBLENBQUM7SUFEWSxjQUFjO1FBYjFCLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCxZQUFZO2dCQUNaLFlBQVk7Z0JBQ1osV0FBVztnQkFDWCxhQUFhO2dCQUNiLGVBQWU7Z0JBQ2YsZUFBZTtnQkFDZixXQUFXO2FBQ2Q7WUFDRCxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxtQkFBbUIsRUFBRSxrQkFBa0IsQ0FBQztZQUNyRSxZQUFZLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxtQkFBbUIsRUFBRSxrQkFBa0IsQ0FBQztTQUM3RSxDQUFDO09BQ1csY0FBYyxDQUMxQjtJQUFELHFCQUFDO0NBQUEsQUFERCxJQUNDO1NBRFksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vYnV0dG9uL2J1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHsgVG9vbHRpcE1vZHVsZSB9IGZyb20gJy4uL3Rvb2x0aXAvdG9vbHRpcC5tb2R1bGUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnLi4vdHJhbnNsYXRlL3RyYW5zbGF0ZS5tb2R1bGUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRlUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRlLXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUG9wdXBNb2R1bGUgfSBmcm9tICcuLi9wb3B1cC9wb3B1cC5tb2R1bGUnO1xuaW1wb3J0IHsgRGF0ZUlucHV0Q29tcG9uZW50IH0gZnJvbSAnLi9kYXRlLWlucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUZXh0RmllbGRNb2R1bGUgfSBmcm9tICcuLi90ZXh0ZmllbGQvdGV4dGZpZWxkLm1vZHVsZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBCdXR0b25Nb2R1bGUsXG4gICAgICAgIFBvcHVwTW9kdWxlLFxuICAgICAgICBUb29sdGlwTW9kdWxlLFxuICAgICAgICBUcmFuc2xhdGVNb2R1bGUsXG4gICAgICAgIFRleHRGaWVsZE1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgXSxcbiAgICBleHBvcnRzOiBbQ2FsZW5kYXJDb21wb25lbnQsIERhdGVQaWNrZXJDb21wb25lbnQsIERhdGVJbnB1dENvbXBvbmVudF0sXG4gICAgZGVjbGFyYXRpb25zOiBbQ2FsZW5kYXJDb21wb25lbnQsIERhdGVQaWNrZXJDb21wb25lbnQsIERhdGVJbnB1dENvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyTW9kdWxlIHtcbn1cbiJdfQ==