import { __decorate, __extends, __metadata } from "tslib";
import { Component, forwardRef, ViewChild, ElementRef, Renderer2, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { TextfieldCommon } from './textfield.common';
import { Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
var TEXTAREA_BASE_HEIGHT = 50;
var TEXTAREA_LINE_LENGTH = 72;
var TextareaComponent = /** @class */ (function (_super) {
    __extends(TextareaComponent, _super);
    function TextareaComponent(renderer) {
        var _this = _super.call(this) || this;
        _this.renderer = renderer;
        _this.baseId = 'textarea';
        _this.keyUpDebouncer = new Subject();
        return _this;
    }
    TextareaComponent_1 = TextareaComponent;
    TextareaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.keyUpDebouncer.pipe(throttleTime(300)).subscribe(function (text) { return _this.updateTextareaSize(text); });
    };
    TextareaComponent.prototype.onKeyUp = function ($event) {
        if (!!$event.target && !!$event.target.value) {
            this.keyUpDebouncer.next($event.target.value);
        }
        _super.prototype.onKeyUp.call(this, $event);
    };
    TextareaComponent.prototype.updateTextareaSize = function (text) {
        if (!!this.textarea) {
            var textarea = this.textarea.nativeElement;
            var linesCount = text.split('\n').reduce(function (count, chunk, index) {
                var newLinesCount = index > 0 ? 1 : 0;
                if (chunk.length >= TEXTAREA_LINE_LENGTH) {
                    newLinesCount++;
                }
                return count + newLinesCount;
            }, 0);
            if (linesCount < 5) {
                this.renderer.setStyle(textarea, 'height', TEXTAREA_BASE_HEIGHT + (linesCount * 16) + "px");
            }
        }
    };
    var TextareaComponent_1;
    TextareaComponent.ctorParameters = function () { return [
        { type: Renderer2 }
    ]; };
    __decorate([
        ViewChild('element', { static: true }),
        __metadata("design:type", ElementRef)
    ], TextareaComponent.prototype, "textarea", void 0);
    TextareaComponent = TextareaComponent_1 = __decorate([
        Component({
            selector: 'pa-textarea',
            template: "<div class=\"pa-field pa-field-textarea\" [class.pa-field-error]=\"hasError || !!errorMessage\">\n    <textarea class=\"pa-field-control\" #element [id]=\"id\" [attr.aria-describedby]=\"helpId\"\n              [attr.placeholder]=\"placeholder | translate\"\n              [class.pa-field-control-placeholder-shown]=\"isPlaceholderShown\"\n              [class.pa-field-control-filled]=\"!!value\"\n              [name]=\"name\"\n              [value]=\"value || ''\"\n              [readonly]=\"isReadOnly\"\n              [disabled]=\"disabled\"\n              [required]=\"required\"\n              (change)=\"change($event.target.value)\"\n              (keyup)=\"onKeyUp($event)\"\n              (blur)=\"onBlur()\"\n              (focus)=\"focus.emit($event)\"></textarea>\n    <label class=\"pa-field-label\" [for]=\"id\" [class.pa-sr]=\"isLabelHidden\" translate><ng-content></ng-content></label>\n    <div class=\"pa-field-control-resizer\"></div>\n    <small *ngIf=\"hasError && errorHelp\" class=\"pa-field-help pa-field-help-error\" translate>{{ errorHelp }}</small>\n    <small *ngIf=\"!!errorMessage\" class=\"pa-field-help pa-field-help-error\">{{ errorMessage | translate }}</small>\n    <small *ngIf=\"help\" class=\"pa-field-help\" [id]=\"helpId\" [innerHTML]=\"help | translate\"></small>\n</div>\n",
            providers: [{
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return TextareaComponent_1; }),
                    multi: true,
                }, {
                    provide: NG_VALIDATORS,
                    useExisting: forwardRef(function () { return TextareaComponent_1; }),
                    multi: true,
                }],
            styles: [".pa-field.pa-field-textarea .pa-field-control-resizer{height:0;width:0;border-top:7px solid #2280a0;border-left:7px solid transparent;border-right:7px solid transparent;-webkit-transform:rotate(-45deg);position:absolute;margin-top:-5px;right:-5.425px;pointer-events:none;z-index:1;-webkit-transition:.33s;transition:.33s}.pa-field.pa-field-textarea .pa-field-control-resizer::before{content:\"\";height:0;width:0;border-top:4px solid #fff;border-left:4px solid transparent;border-right:4px solid transparent;position:absolute;margin-top:-6px;right:-4px;pointer-events:none;z-index:1;-webkit-transition:.33s;transition:.33s}.pa-field.pa-field-textarea .pa-field-control-resizer::after{-webkit-transform:rotate(-45deg);content:\"\";height:6px;width:10px;background:#fff;position:absolute;top:-4px;right:-10px;pointer-events:none;z-index:1}.pa-field.pa-field-textarea .pa-field-control{height:50px;min-height:50px;border-top:24px solid transparent;padding-top:0;resize:vertical}.pa-field.pa-field-textarea .pa-field-control:-moz-read-only{padding-top:0}.pa-field.pa-field-textarea .pa-field-control:read-only{padding-top:0}.pa-field.pa-field-textarea .pa-field-control:active~.pa-field-control-resizer,.pa-field.pa-field-textarea .pa-field-control:focus~.pa-field-control-resizer,.pa-field.pa-field-textarea .pa-field-control:hover~.pa-field-control-resizer{right:-10.425px}.pa-field.pa-field-textarea .pa-field-control:active~.pa-field-control-resizer,.pa-field.pa-field-textarea .pa-field-control:focus~.pa-field-control-resizer{right:-10.425px;border-top:7px solid #4da4c8}.pa-field.pa-field-textarea .pa-field-control:active~.pa-field-control-resizer::before,.pa-field.pa-field-textarea .pa-field-control:focus~.pa-field-control-resizer::before{opacity:0}.pa-field.pa-field-textarea .pa-field-control.pa-field-control-accent~.pa-field-control-resizer{right:-10.425px;border-top:7px solid #c6e4f1;margin-top:-6px}.pa-field.pa-field-textarea .pa-field-control.pa-field-control-accent~.pa-field-control-resizer::before{border-top:4px solid #c6e4f1}.pa-field.pa-field-textarea .pa-field-control.pa-field-control-accent~.pa-field-control-resizer::after{display:none}.pa-field.pa-field-textarea .pa-field-control.pa-field-control-accent:active~.pa-field-control-resizer,.pa-field.pa-field-textarea .pa-field-control.pa-field-control-accent:active~.pa-field-control-resizer::before,.pa-field.pa-field-textarea .pa-field-control.pa-field-control-accent:focus~.pa-field-control-resizer,.pa-field.pa-field-textarea .pa-field-control.pa-field-control-accent:focus~.pa-field-control-resizer::before{border-top-color:#4da4c8}.pa-field.pa-field-textarea.pa-field-error .pa-field-control-resizer{border-top:7px solid #e40166;right:-10.425px}.pa-field.pa-field-textarea.pa-field-error :active~.pa-field-control-resizer,.pa-field.pa-field-textarea.pa-field-error :focus~.pa-field-control-resizer{border-top:7px solid #ec4d94}"]
        }),
        __metadata("design:paramtypes", [Renderer2])
    ], TextareaComponent);
    return TextareaComponent;
}(TextfieldCommon));
export { TextareaComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGd1aWxsb3RpbmF3ZWIvcGFzdGFuYWdhLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvdGV4dGZpZWxkL3RleHRhcmVhLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxhQUFhLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUMsSUFBTSxvQkFBb0IsR0FBRyxFQUFFLENBQUM7QUFDaEMsSUFBTSxvQkFBb0IsR0FBRyxFQUFFLENBQUM7QUFnQmhDO0lBQXVDLHFDQUFlO0lBS2xELDJCQUFvQixRQUFtQjtRQUF2QyxZQUNJLGlCQUFPLFNBQ1Y7UUFGbUIsY0FBUSxHQUFSLFFBQVEsQ0FBVztRQUp2QyxZQUFNLEdBQUcsVUFBVSxDQUFDO1FBQ3BCLG9CQUFjLEdBQW9CLElBQUksT0FBTyxFQUFFLENBQUM7O0lBS2hELENBQUM7MEJBUFEsaUJBQWlCO0lBUzFCLG9DQUFRLEdBQVI7UUFBQSxpQkFJQztRQUhHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUNwQixZQUFZLENBQUMsR0FBRyxDQUFDLENBQ3BCLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUE3QixDQUE2QixDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELG1DQUFPLEdBQVAsVUFBUSxNQUFNO1FBQ1YsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDMUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNqRDtRQUNELGlCQUFNLE9BQU8sWUFBQyxNQUFNLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRU8sOENBQWtCLEdBQTFCLFVBQTJCLElBQVk7UUFDbkMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztZQUM3QyxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSztnQkFDM0QsSUFBSSxhQUFhLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxvQkFBb0IsRUFBRTtvQkFDdEMsYUFBYSxFQUFHLENBQUM7aUJBQ3BCO2dCQUNELE9BQU8sS0FBSyxHQUFHLGFBQWEsQ0FBQztZQUNqQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDTixJQUFJLFVBQVUsR0FBRyxDQUFDLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRyxRQUFRLEVBQUssb0JBQW9CLEdBQUcsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLE9BQUksQ0FBQyxDQUFDO2FBQ2hHO1NBQ0o7SUFDTCxDQUFDOzs7Z0JBL0I2QixTQUFTOztJQUZDO1FBQXZDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7a0NBQVksVUFBVTt1REFBQztJQUhyRCxpQkFBaUI7UUFkN0IsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGFBQWE7WUFDdkIsZ3pDQUFzQztZQUV0QyxTQUFTLEVBQUUsQ0FBQztvQkFDUixPQUFPLEVBQUUsaUJBQWlCO29CQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxtQkFBaUIsRUFBakIsQ0FBaUIsQ0FBQztvQkFDaEQsS0FBSyxFQUFFLElBQUk7aUJBQ2QsRUFBRTtvQkFDQyxPQUFPLEVBQUUsYUFBYTtvQkFDdEIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsbUJBQWlCLEVBQWpCLENBQWlCLENBQUM7b0JBQ2hELEtBQUssRUFBRSxJQUFJO2lCQUNkLENBQUM7O1NBQ0wsQ0FBQzt5Q0FNZ0MsU0FBUztPQUw5QixpQkFBaUIsQ0FxQzdCO0lBQUQsd0JBQUM7Q0FBQSxBQXJDRCxDQUF1QyxlQUFlLEdBcUNyRDtTQXJDWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIGZvcndhcmRSZWYsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgUmVuZGVyZXIyLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgVGV4dGZpZWxkQ29tbW9uIH0gZnJvbSAnLi90ZXh0ZmllbGQuY29tbW9uJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRocm90dGxlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuY29uc3QgVEVYVEFSRUFfQkFTRV9IRUlHSFQgPSA1MDtcbmNvbnN0IFRFWFRBUkVBX0xJTkVfTEVOR1RIID0gNzI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncGEtdGV4dGFyZWEnLFxuICAgIHRlbXBsYXRlVXJsOiAndGV4dGFyZWEuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWyd0ZXh0YXJlYS5jb21wb25lbnQuc2NzcyddLFxuICAgIHByb3ZpZGVyczogW3tcbiAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFRleHRhcmVhQ29tcG9uZW50KSxcbiAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSwge1xuICAgICAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBUZXh0YXJlYUNvbXBvbmVudCksXG4gICAgICAgIG11bHRpOiB0cnVlLFxuICAgIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBUZXh0YXJlYUNvbXBvbmVudCBleHRlbmRzIFRleHRmaWVsZENvbW1vbiBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgYmFzZUlkID0gJ3RleHRhcmVhJztcbiAgICBrZXlVcERlYm91bmNlcjogU3ViamVjdDxzdHJpbmc+ID0gbmV3IFN1YmplY3QoKTtcbiAgICBAVmlld0NoaWxkKCdlbGVtZW50JywgeyBzdGF0aWM6IHRydWUgfSkgdGV4dGFyZWE/OiBFbGVtZW50UmVmO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMua2V5VXBEZWJvdW5jZXIucGlwZShcbiAgICAgICAgICAgIHRocm90dGxlVGltZSgzMDApLFxuICAgICAgICApLnN1YnNjcmliZSgodGV4dCkgPT4gdGhpcy51cGRhdGVUZXh0YXJlYVNpemUodGV4dCkpO1xuICAgIH1cblxuICAgIG9uS2V5VXAoJGV2ZW50KSB7XG4gICAgICAgIGlmICghISRldmVudC50YXJnZXQgJiYgISEkZXZlbnQudGFyZ2V0LnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmtleVVwRGVib3VuY2VyLm5leHQoJGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIub25LZXlVcCgkZXZlbnQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlVGV4dGFyZWFTaXplKHRleHQ6IHN0cmluZykge1xuICAgICAgICBpZiAoISF0aGlzLnRleHRhcmVhKSB7XG4gICAgICAgICAgICBjb25zdCB0ZXh0YXJlYSA9IHRoaXMudGV4dGFyZWEubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICAgIGNvbnN0IGxpbmVzQ291bnQgPSB0ZXh0LnNwbGl0KCdcXG4nKS5yZWR1Y2UoKGNvdW50LCBjaHVuaywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgbmV3TGluZXNDb3VudCA9IGluZGV4ID4gMCA/IDEgOiAwO1xuICAgICAgICAgICAgICAgIGlmIChjaHVuay5sZW5ndGggPj0gVEVYVEFSRUFfTElORV9MRU5HVEgpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3TGluZXNDb3VudCArKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvdW50ICsgbmV3TGluZXNDb3VudDtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgaWYgKGxpbmVzQ291bnQgPCA1KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0ZXh0YXJlYSwgICdoZWlnaHQnLCBgJHtURVhUQVJFQV9CQVNFX0hFSUdIVCArIChsaW5lc0NvdW50ICogMTYpfXB4YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=