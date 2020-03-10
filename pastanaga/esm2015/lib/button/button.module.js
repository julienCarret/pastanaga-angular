import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './button.component';
import { ButtonLinkComponent } from './button-link.component';
import { SvgModule } from '../svg/svg.module';
import { TraversalModule } from 'angular-traversal';
import { TranslateModule } from '../translate/translate.module';
let ButtonModule = class ButtonModule {
};
ButtonModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            TranslateModule,
            SvgModule,
            RouterModule,
            TraversalModule,
        ],
        declarations: [ButtonComponent, ButtonLinkComponent],
        exports: [ButtonComponent, ButtonLinkComponent],
    })
], ButtonModule);
export { ButtonModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BndWlsbG90aW5hd2ViL3Bhc3RhbmFnYS1hbmd1bGFyLyIsInNvdXJjZXMiOlsibGliL2J1dHRvbi9idXR0b24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBYWhFLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7Q0FDeEIsQ0FBQTtBQURZLFlBQVk7SUFYeEIsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFO1lBQ0wsWUFBWTtZQUNaLGVBQWU7WUFDZixTQUFTO1lBQ1QsWUFBWTtZQUNaLGVBQWU7U0FDbEI7UUFDRCxZQUFZLEVBQUUsQ0FBQyxlQUFlLEVBQUUsbUJBQW1CLENBQUM7UUFDcEQsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLG1CQUFtQixDQUFDO0tBQ2xELENBQUM7R0FDVyxZQUFZLENBQ3hCO1NBRFksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IEJ1dHRvbkxpbmtDb21wb25lbnQgfSBmcm9tICcuL2J1dHRvbi1saW5rLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdmdNb2R1bGUgfSBmcm9tICcuLi9zdmcvc3ZnLm1vZHVsZSc7XG5pbXBvcnQgeyBUcmF2ZXJzYWxNb2R1bGUgfSBmcm9tICdhbmd1bGFyLXRyYXZlcnNhbCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICcuLi90cmFuc2xhdGUvdHJhbnNsYXRlLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgICAgICAgU3ZnTW9kdWxlLFxuICAgICAgICBSb3V0ZXJNb2R1bGUsXG4gICAgICAgIFRyYXZlcnNhbE1vZHVsZSxcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW0J1dHRvbkNvbXBvbmVudCwgQnV0dG9uTGlua0NvbXBvbmVudF0sXG4gICAgZXhwb3J0czogW0J1dHRvbkNvbXBvbmVudCwgQnV0dG9uTGlua0NvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbk1vZHVsZSB7XG59XG4iXX0=