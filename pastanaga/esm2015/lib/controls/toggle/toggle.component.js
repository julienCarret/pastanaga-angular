import { __decorate, __metadata } from "tslib";
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ToggleDivider } from '../toggle.model';
let nextId = 0;
let ToggleComponent = class ToggleComponent {
    constructor() {
        this.isSelected = false;
        this.isDisabled = false;
        this.yesLabel = 'common.yes';
        this.noLabel = 'common.no';
        this.isSelectedChange = new EventEmitter();
        this.helpId = '';
    }
    ngOnInit() {
        this.id = !this.id ? `field-toggle-${nextId++}` : `${this.id}-field-toggle`;
        this.helpId = `${this.id}-help`;
    }
    toggleSelection() {
        this.isSelected = !this.isSelected;
        this.isSelectedChange.emit(this.isSelected);
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], ToggleComponent.prototype, "id", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], ToggleComponent.prototype, "imageUrl", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], ToggleComponent.prototype, "imageBackground", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], ToggleComponent.prototype, "help", void 0);
__decorate([
    Input(),
    __metadata("design:type", ToggleDivider)
], ToggleComponent.prototype, "divider", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ToggleComponent.prototype, "isSelected", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ToggleComponent.prototype, "isDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ToggleComponent.prototype, "yesLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ToggleComponent.prototype, "noLabel", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], ToggleComponent.prototype, "isSelectedChange", void 0);
__decorate([
    ViewChild('text'),
    __metadata("design:type", ElementRef)
], ToggleComponent.prototype, "textElement", void 0);
ToggleComponent = __decorate([
    Component({
        selector: 'pa-toggle',
        template: "<div class=\"pa-field pa-field-toggle\"\n     [class.pa-field-divider]=\"divider && divider.hasDivider\"\n     [class.first-in-group]=\"divider && divider.isFirst\"\n     [class.last-in-group]=\"divider && divider.isLast\"\n     [class.has-image]=\"!!imageUrl\">\n    <input class=\"pa-field-control\" type=\"checkbox\" [id]=\"id\" [attr.aria-describedby]=\"helpId\"\n           [checked]=\"isSelected\"\n           [attr.aria-checked]=\"isSelected\"\n           [attr.disabled]=\"isDisabled ? true : null\"\n           (change)=\"toggleSelection()\">\n    <span class=\"pa-field-control-thumb\"> </span>\n    <label class=\"pa-field-label\" [for]=\"id\">\n        <img *ngIf=\"imageUrl\" [src]=\"imageUrl\" alt=\"\" role=\"presentation\" [ngStyle]=\"{'background-color': imageBackground}\">\n        <span translate>\n            <ng-content></ng-content>\n        </span>\n    </label>\n    <output class=\"pa-field-output\" [for]=\"id\">\n        <!-- Important to keep the label without any space between the span to not break the animation between yes and no -->\n        <label role=\"presentation\" [for]=\"id\"><span class=\"o-field-output-checked\" *ngIf=\"isSelected\" translate>{{ yesLabel }}</span><span class=\"pa-field-output-unchecked\" *ngIf=\"!isSelected\" translate>{{ noLabel }}</span></label>\n    </output>\n    <small *ngIf=\"!imageUrl && !!help\" class=\"pa-field-help\" [id]=\"helpId\" [innerHtml]=\"help | translate\">{{help}}</small>\n</div>\n",
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [":host{display:block}:host .pa-field-divider{padding:.375rem 0}:host .pa-field-divider:not(.first-in-group).pa-field-toggle{margin-top:1.125rem}:host .pa-field-divider:not(.last-in-group)::after{width:100%;height:1px;background:#b8c6c8;position:absolute;content:\"\";left:0;bottom:-.5625rem}:host .pa-field.pa-field-toggle .pa-field-label{position:relative;font-weight:400;color:#3a3a3a;padding-top:0;margin-bottom:0;cursor:pointer}:host .pa-field.pa-field-toggle .pa-field-control{float:right;position:relative;width:1.875rem;height:1.125rem;opacity:0;margin:0;padding:0;z-index:1;cursor:pointer}:host .pa-field.pa-field-toggle .pa-field-control:hover{padding:0;margin:0}:host .pa-field.pa-field-toggle .pa-field-control:disabled{cursor:default}:host .pa-field.pa-field-toggle .pa-field-control-thumb{width:1.875rem;height:.375rem;background:#2280a0;position:absolute;margin-top:.375rem;right:0;z-index:0;border-radius:.1875rem}:host .pa-field.pa-field-toggle .pa-field-control:not(:checked)+.pa-field-control-thumb::before{border-color:#826a6a}:host .pa-field.pa-field-toggle .pa-field-control:disabled+.pa-field-control-thumb::before{box-shadow:none;border:0;-webkit-transition:.33s;transition:.33s;border-image-slice:18 fill;border-image-width:.5625rem;border-image-repeat:round round;border-image-source:url('data:image/svg+xml; utf8, <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"36\" height=\"36\" viewBox=\"0 0 36 36\"><g fill=\"%23B8C6C8\" fill-rule=\"evenodd\"><circle cx=\"18\" cy=\"1\" r=\"1\"/><circle cx=\"23\" cy=\"1.5\" r=\"1\"/><circle cx=\"28\" cy=\"4\" r=\"1\"/><circle cx=\"35\" cy=\"18\" r=\"1\"/><circle cx=\"34.5\" cy=\"13\" r=\"1\"/><circle cx=\"32\" cy=\"8\" r=\"1\"/><circle cx=\"34.5\" cy=\"23\" r=\"1\"/><circle cx=\"32\" cy=\"28\" r=\"1\"/><circle cx=\"18\" cy=\"35\" r=\"1\"/><circle cx=\"23\" cy=\"34.5\" r=\"1\"/><circle cx=\"28\" cy=\"32\" r=\"1\"/><circle cx=\"13\" cy=\"34.5\" r=\"1\"/><circle cx=\"8\" cy=\"32\" r=\"1\"/><circle cx=\"1\" cy=\"18\" r=\"1\"/><circle cx=\"1.5\" cy=\"23\" r=\"1\"/><circle cx=\"4\" cy=\"28\" r=\"1\"/><circle cx=\"1.5\" cy=\"13\" r=\"1\"/><circle cx=\"4\" cy=\"8\" r=\"1\"/><circle cx=\"13\" cy=\"1.5\" r=\"1\"/><circle cx=\"8\" cy=\"4\" r=\"1\"/></g></svg>');cursor:default}:host .pa-field.pa-field-toggle .pa-field-control:checked+.pa-field-control-thumb::before{right:0}:host .pa-field.pa-field-toggle .pa-field-control:not(:checked)+.pa-field-control-thumb::after{right:.75rem;opacity:0;background-size:.375rem .375rem}:host .pa-field.pa-field-toggle .pa-field-control+.pa-field-control-thumb::after{background-image:url('data:image/svg+xml; utf8, <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"36\" height=\"36\" viewBox=\"0 0 36 36\"><circle cx=\"18\" cy=\"18\" r=\"7\" fill=\"%232280A0\" fill-rule=\"evenodd\"/></svg>');content:\"\";position:absolute;top:-.375rem;width:1.125rem;height:1.125rem;-webkit-transition:175ms ease-in;transition:175ms ease-in;background-position:center center;background-size:1.125rem 1.125rem;background-repeat:no-repeat;right:0}:host .pa-field.pa-field-toggle .pa-field-control:disabled+.pa-field-control-thumb::after{background-image:url('data:image/svg+xml; utf8, <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"36\" height=\"36\" viewBox=\"0 0 36 36\"><circle cx=\"18\" cy=\"18\" r=\"7\" fill=\"%23B8C6C8\" fill-rule=\"evenodd\"/></svg>');cursor:default}:host .pa-field.pa-field-toggle .pa-field-control:not(:checked)+.pa-field-control-thumb{background:#826a6a;cursor:pointer}:host .pa-field.pa-field-toggle .pa-field-control:disabled+.pa-field-control-thumb{background:#b8c6c8;cursor:default}:host .pa-field.pa-field-toggle .pa-field-control-thumb::before{content:\"\";position:absolute;width:1.125rem;height:1.125rem;border:1px solid #2280a0;background:#fff;border-radius:50%;margin-top:-.375rem;right:.75rem;-webkit-transition:175ms;transition:175ms}:host .pa-field.pa-field-toggle .pa-field-control~.pa-field-output{float:right;margin-top:1px;margin-right:.75rem;text-transform:uppercase;color:#767676;position:relative;cursor:pointer}:host .pa-field.pa-field-toggle .pa-field-control:disabled~.pa-field-output{color:#b8c6c8;cursor:default}:host .pa-field.pa-field-toggle .pa-field-control:not(:checked)~.pa-field-output .pa-field-output-checked{opacity:0;position:absolute;right:0;cursor:pointer;-webkit-transition:.25s;transition:.25s}:host .pa-field.pa-field-toggle .pa-field-control:checked~.pa-field-output .pa-field-output-unchecked{opacity:0;position:absolute;right:0;cursor:pointer;-webkit-transition:.25s;transition:.25s}:host .pa-field.pa-field-toggle .pa-field-label>img{background:#b8c6c8;border-radius:.1875rem;width:1.875rem;height:1.875rem;margin-right:.75rem;line-height:0;display:inline}:host .pa-field.pa-field-toggle .pa-field-label>span{margin-left:0}:host .pa-field.pa-field-toggle .pa-field-control:disabled~.pa-field-label{color:#b8c6c8;cursor:default}:host .pa-field.pa-field-toggle .pa-field-control~.pa-field-help{margin:0}:host .pa-field.pa-field-toggle.has-image .pa-field-control-thumb{margin-top:.75rem}:host .pa-field.pa-field-toggle.has-image .pa-field-control~.pa-field-output{margin-top:.375rem}"]
    })
], ToggleComponent);
export { ToggleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BndWlsbG90aW5hd2ViL3Bhc3RhbmFnYS1hbmd1bGFyLyIsInNvdXJjZXMiOlsibGliL2NvbnRyb2xzL3RvZ2dsZS90b2dnbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0gsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWhELElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQVFmLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUFBNUI7UUFNYSxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsYUFBUSxHQUFHLFlBQVksQ0FBQztRQUN4QixZQUFPLEdBQUcsV0FBVyxDQUFDO1FBQ3JCLHFCQUFnQixHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBSXZFLFdBQU0sR0FBRyxFQUFFLENBQUM7SUFXaEIsQ0FBQztJQVRHLFFBQVE7UUFDSixJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsZUFBZSxDQUFDO1FBQzVFLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUM7SUFDcEMsQ0FBQztJQUVELGVBQWU7UUFDWCxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNuQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNoRCxDQUFDO0NBQ0osQ0FBQTtBQXhCWTtJQUFSLEtBQUssRUFBRTs7MkNBQWE7QUFDWjtJQUFSLEtBQUssRUFBRTs7aURBQW1CO0FBQ2xCO0lBQVIsS0FBSyxFQUFFOzt3REFBMEI7QUFDekI7SUFBUixLQUFLLEVBQUU7OzZDQUFlO0FBQ2Q7SUFBUixLQUFLLEVBQUU7OEJBQVcsYUFBYTtnREFBQztBQUN4QjtJQUFSLEtBQUssRUFBRTs7bURBQW9CO0FBQ25CO0lBQVIsS0FBSyxFQUFFOzttREFBb0I7QUFDbkI7SUFBUixLQUFLLEVBQUU7O2lEQUF5QjtBQUN4QjtJQUFSLEtBQUssRUFBRTs7Z0RBQXVCO0FBQ3JCO0lBQVQsTUFBTSxFQUFFOzhCQUFtQixZQUFZO3lEQUErQjtBQUVwRDtJQUFsQixTQUFTLENBQUMsTUFBTSxDQUFDOzhCQUFlLFVBQVU7b0RBQUM7QUFabkMsZUFBZTtJQU4zQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsV0FBVztRQUNyQix5OENBQXNDO1FBRXRDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztLQUNsRCxDQUFDO0dBQ1csZUFBZSxDQXlCM0I7U0F6QlksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRvZ2dsZURpdmlkZXIgfSBmcm9tICcuLi90b2dnbGUubW9kZWwnO1xuXG5sZXQgbmV4dElkID0gMDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwYS10b2dnbGUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90b2dnbGUuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3RvZ2dsZS5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBUb2dnbGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIGlkPzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGltYWdlVXJsPzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGltYWdlQmFja2dyb3VuZD86IHN0cmluZztcbiAgICBASW5wdXQoKSBoZWxwPzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGRpdmlkZXI/OiBUb2dnbGVEaXZpZGVyO1xuICAgIEBJbnB1dCgpIGlzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBpc0Rpc2FibGVkID0gZmFsc2U7XG4gICAgQElucHV0KCkgeWVzTGFiZWwgPSAnY29tbW9uLnllcyc7XG4gICAgQElucHV0KCkgbm9MYWJlbCA9ICdjb21tb24ubm8nO1xuICAgIEBPdXRwdXQoKSBpc1NlbGVjdGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAVmlld0NoaWxkKCd0ZXh0JykgdGV4dEVsZW1lbnQ/OiBFbGVtZW50UmVmO1xuXG4gICAgaGVscElkID0gJyc7XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pZCA9ICF0aGlzLmlkID8gYGZpZWxkLXRvZ2dsZS0ke25leHRJZCsrfWAgOiBgJHt0aGlzLmlkfS1maWVsZC10b2dnbGVgO1xuICAgICAgICB0aGlzLmhlbHBJZCA9IGAke3RoaXMuaWR9LWhlbHBgO1xuICAgIH1cblxuICAgIHRvZ2dsZVNlbGVjdGlvbigpIHtcbiAgICAgICAgdGhpcy5pc1NlbGVjdGVkID0gIXRoaXMuaXNTZWxlY3RlZDtcbiAgICAgICAgdGhpcy5pc1NlbGVjdGVkQ2hhbmdlLmVtaXQodGhpcy5pc1NlbGVjdGVkKTtcbiAgICB9XG59XG4iXX0=