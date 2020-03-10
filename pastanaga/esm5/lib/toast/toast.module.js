import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from '../tooltip/tooltip.module';
import { ButtonModule } from '../button/button.module';
import { ToastComponent } from './toast.component';
import { SvgModule } from '../svg/svg.module';
import { TranslateModule } from '../translate/translate.module';
var ToasterModule = /** @class */ (function () {
    function ToasterModule() {
    }
    ToasterModule = __decorate([
        NgModule({
            imports: [CommonModule, TranslateModule, TooltipModule, ButtonModule, SvgModule],
            exports: [ToastComponent],
            declarations: [ToastComponent],
            entryComponents: [ToastComponent],
        })
    ], ToasterModule);
    return ToasterModule;
}());
export { ToasterModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGd1aWxsb3RpbmF3ZWIvcGFzdGFuYWdhLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvdG9hc3QvdG9hc3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBUWhFO0lBQUE7SUFBNkIsQ0FBQztJQUFqQixhQUFhO1FBTnpCLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUM7WUFDaEYsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO1lBQ3pCLFlBQVksRUFBRSxDQUFDLGNBQWMsQ0FBQztZQUM5QixlQUFlLEVBQUUsQ0FBQyxjQUFjLENBQUM7U0FDcEMsQ0FBQztPQUNXLGFBQWEsQ0FBSTtJQUFELG9CQUFDO0NBQUEsQUFBOUIsSUFBOEI7U0FBakIsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVG9vbHRpcE1vZHVsZSB9IGZyb20gJy4uL3Rvb2x0aXAvdG9vbHRpcC5tb2R1bGUnO1xuaW1wb3J0IHsgQnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vYnV0dG9uL2J1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHsgVG9hc3RDb21wb25lbnQgfSBmcm9tICcuL3RvYXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdmdNb2R1bGUgfSBmcm9tICcuLi9zdmcvc3ZnLm1vZHVsZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICcuLi90cmFuc2xhdGUvdHJhbnNsYXRlLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgVHJhbnNsYXRlTW9kdWxlLCBUb29sdGlwTW9kdWxlLCBCdXR0b25Nb2R1bGUsIFN2Z01vZHVsZV0sXG4gICAgZXhwb3J0czogW1RvYXN0Q29tcG9uZW50XSxcbiAgICBkZWNsYXJhdGlvbnM6IFtUb2FzdENvbXBvbmVudF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbVG9hc3RDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBUb2FzdGVyTW9kdWxlIHsgfVxuXG4iXX0=