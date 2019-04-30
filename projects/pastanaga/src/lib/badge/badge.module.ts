import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from './badge.component';
import { ButtonModule } from '../button/button.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        TooltipModule,
        TranslateModule,
    ],
    declarations: [BadgeComponent],
    exports: [BadgeComponent],
})
export class BadgeModule {
}
