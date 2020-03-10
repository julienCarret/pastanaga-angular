export interface ControlModelData {
    id: string;
    label: string;
    subLabel?: string;
    labelIcons?: LabelIcon[];
    value?: string;
    help?: string;
    icon?: string;
    isSelected?: boolean;
    isDisabled?: boolean;
    isFiltered?: boolean;
    isIndeterminate?: boolean;
    isExpanded?: boolean;
    isHidden?: boolean;
    isPrivate?: boolean;
    children?: ControlModel[];
}
export declare class ControlModel {
    id: string;
    label: string;
    subLabel?: string;
    labelIcons?: LabelIcon[];
    value?: string;
    help?: string;
    icon?: string;
    isSelected: boolean;
    isDisabled: boolean;
    isFiltered: boolean;
    isIndeterminate: boolean;
    isExpanded: boolean;
    isHidden: boolean;
    isPrivate: boolean;
    children?: ControlModel[];
    totalChildren?: number;
    selectedChildren?: number;
    constructor(data: ControlModelData);
}
export declare class LabelIcon {
    name: string;
    tooltip: string;
    constructor(data: any);
}
