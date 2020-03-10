import { ComponentFactoryResolver, ViewContainerRef, ElementRef, Renderer2 } from '@angular/core';
export declare class TooltipDirective {
    private element;
    private viewContainerRef;
    private resolver;
    private renderer;
    text: string;
    type: 'system' | 'action';
    get paTooltipOffset(): number;
    set paTooltipOffset(value: number);
    protected offset: number;
    id: string;
    isDisplayed: boolean;
    rootParent?: HTMLElement;
    private component?;
    constructor(element: ElementRef, viewContainerRef: ViewContainerRef, resolver: ComponentFactoryResolver, renderer: Renderer2);
    focus(event: MouseEvent): void;
    enter(event: MouseEvent): void;
    move(event: MouseEvent): void;
    startDisplay(event: MouseEvent): void;
    show(x: number, y: number): void;
    createTooltip(x: number, y: number): void;
    hide(): void;
    getFixedPosition(event: MouseEvent): [number, number];
    getFixedRootParent(element: HTMLElement): HTMLElement;
}
