import { __decorate, __metadata } from "tslib";
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ToggleDivider } from '../toggle.model';
var nextId = 0;
var ToggleComponent = /** @class */ (function () {
    function ToggleComponent() {
        this.isSelected = false;
        this.isDisabled = false;
        this.yesLabel = 'common.yes';
        this.noLabel = 'common.no';
        this.isSelectedChange = new EventEmitter();
        this.helpId = '';
    }
    ToggleComponent.prototype.ngOnInit = function () {
        this.id = !this.id ? "field-toggle-" + nextId++ : this.id + "-field-toggle";
        this.helpId = this.id + "-help";
    };
    ToggleComponent.prototype.toggleSelection = function () {
        this.isSelected = !this.isSelected;
        this.isSelectedChange.emit(this.isSelected);
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
    return ToggleComponent;
}());
export { ToggleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BndWlsbG90aW5hd2ViL3Bhc3RhbmFnYS1hbmd1bGFyLyIsInNvdXJjZXMiOlsibGliL2NvbnRyb2xzL3RvZ2dsZS90b2dnbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0gsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWhELElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQVFmO0lBQUE7UUFNYSxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsYUFBUSxHQUFHLFlBQVksQ0FBQztRQUN4QixZQUFPLEdBQUcsV0FBVyxDQUFDO1FBQ3JCLHFCQUFnQixHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBSXZFLFdBQU0sR0FBRyxFQUFFLENBQUM7SUFXaEIsQ0FBQztJQVRHLGtDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsa0JBQWdCLE1BQU0sRUFBSSxDQUFDLENBQUMsQ0FBSSxJQUFJLENBQUMsRUFBRSxrQkFBZSxDQUFDO1FBQzVFLElBQUksQ0FBQyxNQUFNLEdBQU0sSUFBSSxDQUFDLEVBQUUsVUFBTyxDQUFDO0lBQ3BDLENBQUM7SUFFRCx5Q0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDbkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQXZCUTtRQUFSLEtBQUssRUFBRTs7K0NBQWE7SUFDWjtRQUFSLEtBQUssRUFBRTs7cURBQW1CO0lBQ2xCO1FBQVIsS0FBSyxFQUFFOzs0REFBMEI7SUFDekI7UUFBUixLQUFLLEVBQUU7O2lEQUFlO0lBQ2Q7UUFBUixLQUFLLEVBQUU7a0NBQVcsYUFBYTtvREFBQztJQUN4QjtRQUFSLEtBQUssRUFBRTs7dURBQW9CO0lBQ25CO1FBQVIsS0FBSyxFQUFFOzt1REFBb0I7SUFDbkI7UUFBUixLQUFLLEVBQUU7O3FEQUF5QjtJQUN4QjtRQUFSLEtBQUssRUFBRTs7b0RBQXVCO0lBQ3JCO1FBQVQsTUFBTSxFQUFFO2tDQUFtQixZQUFZOzZEQUErQjtJQUVwRDtRQUFsQixTQUFTLENBQUMsTUFBTSxDQUFDO2tDQUFlLFVBQVU7d0RBQUM7SUFabkMsZUFBZTtRQU4zQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsV0FBVztZQUNyQix5OENBQXNDO1lBRXRDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztTQUNsRCxDQUFDO09BQ1csZUFBZSxDQXlCM0I7SUFBRCxzQkFBQztDQUFBLEFBekJELElBeUJDO1NBekJZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUb2dnbGVEaXZpZGVyIH0gZnJvbSAnLi4vdG9nZ2xlLm1vZGVsJztcblxubGV0IG5leHRJZCA9IDA7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncGEtdG9nZ2xlJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdG9nZ2xlLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90b2dnbGUuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgVG9nZ2xlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBpZD86IHN0cmluZztcbiAgICBASW5wdXQoKSBpbWFnZVVybD86IHN0cmluZztcbiAgICBASW5wdXQoKSBpbWFnZUJhY2tncm91bmQ/OiBzdHJpbmc7XG4gICAgQElucHV0KCkgaGVscD86IHN0cmluZztcbiAgICBASW5wdXQoKSBkaXZpZGVyPzogVG9nZ2xlRGl2aWRlcjtcbiAgICBASW5wdXQoKSBpc1NlbGVjdGVkID0gZmFsc2U7XG4gICAgQElucHV0KCkgaXNEaXNhYmxlZCA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHllc0xhYmVsID0gJ2NvbW1vbi55ZXMnO1xuICAgIEBJbnB1dCgpIG5vTGFiZWwgPSAnY29tbW9uLm5vJztcbiAgICBAT3V0cHV0KCkgaXNTZWxlY3RlZENoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZCgndGV4dCcpIHRleHRFbGVtZW50PzogRWxlbWVudFJlZjtcblxuICAgIGhlbHBJZCA9ICcnO1xuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaWQgPSAhdGhpcy5pZCA/IGBmaWVsZC10b2dnbGUtJHtuZXh0SWQrK31gIDogYCR7dGhpcy5pZH0tZmllbGQtdG9nZ2xlYDtcbiAgICAgICAgdGhpcy5oZWxwSWQgPSBgJHt0aGlzLmlkfS1oZWxwYDtcbiAgICB9XG5cbiAgICB0b2dnbGVTZWxlY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuaXNTZWxlY3RlZCA9ICF0aGlzLmlzU2VsZWN0ZWQ7XG4gICAgICAgIHRoaXMuaXNTZWxlY3RlZENoYW5nZS5lbWl0KHRoaXMuaXNTZWxlY3RlZCk7XG4gICAgfVxufVxuIl19