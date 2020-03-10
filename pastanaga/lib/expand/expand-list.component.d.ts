export declare class ExpandListComponent {
    get large(): boolean;
    set large(value: boolean);
    protected _large: boolean;
    focusOnNext($event: KeyboardEvent): void;
    focusOnPrevious($event: KeyboardEvent): void;
    focusOnButton(element: HTMLElement, event: KeyboardEvent): void;
    getParentExpand(element: HTMLElement | null): HTMLElement | null;
}
