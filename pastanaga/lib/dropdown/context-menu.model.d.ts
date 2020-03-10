export declare class ContextMenuItem {
    id?: string;
    trackingID?: string;
    icon?: string;
    text: string;
    multi: boolean;
    isDisabled: boolean;
    isHidden: boolean;
    hasSeparator: boolean;
    subLevelItems?: ContextMenuItem[];
    checkboxMode: boolean;
    isSelected: boolean;
    mode: 'default' | 'primary' | 'secondary' | 'destructive';
    constructor(data: any);
}
