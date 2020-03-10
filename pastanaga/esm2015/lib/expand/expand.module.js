import { __decorate } from "tslib";
import { NgModule, Directive } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpandComponent } from './expand.component';
import { ExpandListComponent } from './expand-list.component';
import { TooltipModule } from '../tooltip/tooltip.module';
import { SvgModule } from '../svg/svg.module';
let ExpandTitleDirective = class ExpandTitleDirective {
};
ExpandTitleDirective = __decorate([
    Directive({ selector: 'expand-title' })
], ExpandTitleDirective);
export { ExpandTitleDirective };
let ExpandDescriptionDirective = class ExpandDescriptionDirective {
};
ExpandDescriptionDirective = __decorate([
    Directive({ selector: 'expand-description' })
], ExpandDescriptionDirective);
export { ExpandDescriptionDirective };
let ExpandModule = class ExpandModule {
};
ExpandModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            TooltipModule,
            SvgModule,
        ],
        exports: [
            ExpandComponent,
            ExpandListComponent,
            ExpandTitleDirective,
            ExpandDescriptionDirective,
        ],
        declarations: [
            ExpandComponent,
            ExpandListComponent,
            ExpandTitleDirective,
            ExpandDescriptionDirective,
        ],
        providers: [],
    })
], ExpandModule);
export { ExpandModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BndWlsbG90aW5hd2ViL3Bhc3RhbmFnYS1hbmd1bGFyLyIsInNvdXJjZXMiOlsibGliL2V4cGFuZC9leHBhbmQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFHOUMsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7Q0FBRyxDQUFBO0FBQXZCLG9CQUFvQjtJQURoQyxTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLENBQUM7R0FDM0Isb0JBQW9CLENBQUc7U0FBdkIsb0JBQW9CO0FBR2pDLElBQWEsMEJBQTBCLEdBQXZDLE1BQWEsMEJBQTBCO0NBQUcsQ0FBQTtBQUE3QiwwQkFBMEI7SUFEdEMsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFLENBQUM7R0FDakMsMEJBQTBCLENBQUc7U0FBN0IsMEJBQTBCO0FBc0J2QyxJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFZO0NBQUksQ0FBQTtBQUFoQixZQUFZO0lBcEJ4QixRQUFRLENBQUM7UUFDTixPQUFPLEVBQUU7WUFDTCxZQUFZO1lBQ1osYUFBYTtZQUNiLFNBQVM7U0FDWjtRQUNELE9BQU8sRUFBRTtZQUNMLGVBQWU7WUFDZixtQkFBbUI7WUFDbkIsb0JBQW9CO1lBQ3BCLDBCQUEwQjtTQUM3QjtRQUNELFlBQVksRUFBRTtZQUNWLGVBQWU7WUFDZixtQkFBbUI7WUFDbkIsb0JBQW9CO1lBQ3BCLDBCQUEwQjtTQUM3QjtRQUNELFNBQVMsRUFBRSxFQUFFO0tBQ2hCLENBQUM7R0FDVyxZQUFZLENBQUk7U0FBaEIsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBEaXJlY3RpdmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IEV4cGFuZENvbXBvbmVudCB9IGZyb20gJy4vZXhwYW5kLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFeHBhbmRMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9leHBhbmQtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVG9vbHRpcE1vZHVsZSB9IGZyb20gJy4uL3Rvb2x0aXAvdG9vbHRpcC5tb2R1bGUnO1xuaW1wb3J0IHsgU3ZnTW9kdWxlIH0gZnJvbSAnLi4vc3ZnL3N2Zy5tb2R1bGUnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdleHBhbmQtdGl0bGUnIH0pXG5leHBvcnQgY2xhc3MgRXhwYW5kVGl0bGVEaXJlY3RpdmUge31cblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnZXhwYW5kLWRlc2NyaXB0aW9uJyB9KVxuZXhwb3J0IGNsYXNzIEV4cGFuZERlc2NyaXB0aW9uRGlyZWN0aXZlIHt9XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIFRvb2x0aXBNb2R1bGUsXG4gICAgICAgIFN2Z01vZHVsZSxcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgRXhwYW5kQ29tcG9uZW50LFxuICAgICAgICBFeHBhbmRMaXN0Q29tcG9uZW50LFxuICAgICAgICBFeHBhbmRUaXRsZURpcmVjdGl2ZSxcbiAgICAgICAgRXhwYW5kRGVzY3JpcHRpb25EaXJlY3RpdmUsXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgRXhwYW5kQ29tcG9uZW50LFxuICAgICAgICBFeHBhbmRMaXN0Q29tcG9uZW50LFxuICAgICAgICBFeHBhbmRUaXRsZURpcmVjdGl2ZSxcbiAgICAgICAgRXhwYW5kRGVzY3JpcHRpb25EaXJlY3RpdmUsXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtdLFxufSlcbmV4cG9ydCBjbGFzcyBFeHBhbmRNb2R1bGUgeyB9XG4iXX0=