import { Subject } from 'rxjs';
import { PositionStyle } from '../common/utils';
export declare class PopupService {
    closeAllPopups: Subject<void>;
    closeAllButId: Subject<string>;
    closeAllSubMenu: Subject<void>;
    lastPosition?: PositionStyle;
}
