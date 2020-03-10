import { SidebarService } from './sidebar/sidebar.service';
import { TranslatePipe } from './translate/translate.pipe';
import { PopupService } from './popup/popup.service';
import { CalendarService } from './calendar/calendar.service';
export declare class PastanagaService {
    calendar: CalendarService;
    popup: PopupService;
    sidebar: SidebarService;
    translate: TranslatePipe;
    constructor(calendar: CalendarService, popup: PopupService, sidebar: SidebarService, translate: TranslatePipe);
}
