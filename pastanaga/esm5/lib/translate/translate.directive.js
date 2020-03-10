import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, Input, AfterViewChecked } from '@angular/core';
import { TranslatePipe } from './translate.pipe';
var TranslateDirective = /** @class */ (function () {
    function TranslateDirective(eltRef, translatePipe) {
        this.eltRef = eltRef;
        this.translatePipe = translatePipe;
        this.key = '';
    }
    Object.defineProperty(TranslateDirective.prototype, "translate", {
        set: function (key) {
            if (key) {
                this.key = key;
                this.checkNodes();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TranslateDirective.prototype, "translateParams", {
        set: function (params) {
            if (!this.areEquals(this.currentParams, params)) {
                this.currentParams = params;
                this.checkNodes(true);
            }
        },
        enumerable: true,
        configurable: true
    });
    TranslateDirective.prototype.ngAfterViewChecked = function () {
        this.checkNodes();
    };
    TranslateDirective.prototype.checkNodes = function (forceUpdate) {
        if (forceUpdate === void 0) { forceUpdate = false; }
        var nodes = this.eltRef.nativeElement.childNodes;
        // if the element is empty
        if (!nodes.length) {
            // we add the key as content
            this.setContent(this.eltRef.nativeElement, this.key);
            nodes = this.eltRef.nativeElement.childNodes;
        }
        for (var i = 0; i < nodes.length; ++i) {
            var node = nodes[i];
            if (node.nodeType === 3) { // node type 3 is a text node
                var key = '';
                if (this.key) {
                    key = this.key;
                    if (forceUpdate) {
                        node.lastKey = null;
                    }
                }
                else {
                    var content = this.getContent(node);
                    var trimmedContent = content.trim();
                    if (trimmedContent.length) {
                        if (content !== node.currentValue) {
                            key = trimmedContent;
                            node.originalContent = this.getContent(node);
                        }
                        else if (node.originalContent && forceUpdate) {
                            node.lastKey = null;
                            key = node.originalContent.trim();
                        }
                    }
                }
                this.updateValue(key, node);
            }
        }
    };
    TranslateDirective.prototype.updateValue = function (key, node) {
        if (key) {
            if (node.lastKey === key && !!this.lastParams && this.areEquals(this.lastParams, this.currentParams)) {
                return;
            }
            this.lastParams = this.currentParams;
            var translate = this.translatePipe.transform(key, this.currentParams);
            if (translate !== key) {
                node.lastKey = key;
            }
            if (!node.originalContent) {
                node.originalContent = this.getContent(node);
            }
            node.currentValue = !!translate ? translate : (node.originalContent || key);
            // we replace in the original content to preserve spaces that we might have trimmed
            this.setContent(node, this.key ? node.currentValue : node.originalContent.replace(key, node.currentValue));
        }
    };
    TranslateDirective.prototype.getContent = function (node) {
        return !!node.textContent ? node.textContent : node.data;
    };
    TranslateDirective.prototype.setContent = function (node, content) {
        if (!!node.textContent) {
            node.textContent = content;
        }
        else {
            node.data = content;
        }
    };
    TranslateDirective.prototype.areEquals = function (obj1, obj2) {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    };
    TranslateDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: TranslatePipe }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], TranslateDirective.prototype, "translate", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], TranslateDirective.prototype, "translateParams", null);
    TranslateDirective = __decorate([
        Directive({
            selector: '[translate]'
        }),
        __metadata("design:paramtypes", [ElementRef,
            TranslatePipe])
    ], TranslateDirective);
    return TranslateDirective;
}());
export { TranslateDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BndWlsbG90aW5hd2ViL3Bhc3RhbmFnYS1hbmd1bGFyLyIsInNvdXJjZXMiOlsibGliL3RyYW5zbGF0ZS90cmFuc2xhdGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBS2pEO0lBZ0JJLDRCQUNZLE1BQWtCLEVBQ2xCLGFBQTRCO1FBRDVCLFdBQU0sR0FBTixNQUFNLENBQVk7UUFDbEIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFqQnhDLFFBQUcsR0FBRyxFQUFFLENBQUM7SUFtQlQsQ0FBQztJQWhCUSxzQkFBSSx5Q0FBUzthQUFiLFVBQWMsR0FBVztZQUM5QixJQUFJLEdBQUcsRUFBRTtnQkFDTCxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztnQkFDZixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDckI7UUFDTCxDQUFDOzs7T0FBQTtJQUNRLHNCQUFJLCtDQUFlO2FBQW5CLFVBQW9CLE1BQVc7WUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsRUFBRTtnQkFDN0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDekI7UUFDTCxDQUFDOzs7T0FBQTtJQU9ELCtDQUFrQixHQUFsQjtRQUNJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsdUNBQVUsR0FBVixVQUFXLFdBQW1CO1FBQW5CLDRCQUFBLEVBQUEsbUJBQW1CO1FBQzFCLElBQUksS0FBSyxHQUFhLElB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LElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztTQUM5RztJQUNMLENBQUM7SUFFRCx1Q0FBVSxHQUFWLFVBQVcsSUFBUztRQUNoQixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQzdELENBQUM7SUFFRCx1Q0FBVSxHQUFWLFVBQVcsSUFBUyxFQUFFLE9BQWU7UUFDakMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQztTQUM5QjthQUFNO1lBQ0gsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBRUQsc0NBQVMsR0FBVCxVQUFVLElBQVMsRUFBRSxJQUFTO1FBQzFCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pELENBQUM7O2dCQS9FbUIsVUFBVTtnQkFDSCxhQUFhOztJQWQvQjtRQUFSLEtBQUssRUFBRTs7O3VEQUtQO0lBQ1E7UUFBUixLQUFLLEVBQUU7Ozs2REFLUDtJQWZRLGtCQUFrQjtRQUg5QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsYUFBYTtTQUMxQixDQUFDO3lDQWtCc0IsVUFBVTtZQUNILGFBQWE7T0FsQi9CLGtCQUFrQixDQWlHOUI7SUFBRCx5QkFBQztDQUFBLEFBakdELElBaUdDO1NBakdZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIEFmdGVyVmlld0NoZWNrZWQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZVBpcGUgfSBmcm9tICcuL3RyYW5zbGF0ZS5waXBlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdHJhbnNsYXRlXSdcbn0pXG5leHBvcnQgY2xhc3MgVHJhbnNsYXRlRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZCB7XG4gICAga2V5ID0gJyc7XG4gICAgbGFzdFBhcmFtcz86IGFueTtcbiAgICBjdXJyZW50UGFyYW1zPzogYW55O1xuICAgIEBJbnB1dCgpIHNldCB0cmFuc2xhdGUoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgICAgICB0aGlzLmNoZWNrTm9kZXMoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBASW5wdXQoKSBzZXQgdHJhbnNsYXRlUGFyYW1zKHBhcmFtczogYW55KSB7XG4gICAgICAgIGlmICghdGhpcy5hcmVFcXVhbHModGhpcy5jdXJyZW50UGFyYW1zLCBwYXJhbXMpKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYXJhbXMgPSBwYXJhbXM7XG4gICAgICAgICAgICB0aGlzLmNoZWNrTm9kZXModHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3RydWN0b3IgKFxuICAgICAgICBwcml2YXRlIGVsdFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSB0cmFuc2xhdGVQaXBlOiBUcmFuc2xhdGVQaXBlXG4gICAgKSB7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgICAgICB0aGlzLmNoZWNrTm9kZXMoKTtcbiAgICB9XG5cbiAgICBjaGVja05vZGVzKGZvcmNlVXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IG5vZGVzOiBOb2RlTGlzdCA9IHRoaXMuZWx0UmVmLm5hdGl2ZUVsZW1lbnQuY2hpbGROb2RlcztcbiAgICAgICAgLy8gaWYgdGhlIGVsZW1lbnQgaXMgZW1wdHlcbiAgICAgICAgaWYgKCFub2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIHdlIGFkZCB0aGUga2V5IGFzIGNvbnRlbnRcbiAgICAgICAgICAgIHRoaXMuc2V0Q29udGVudCh0aGlzLmVsdFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLmtleSk7XG4gICAgICAgICAgICBub2RlcyA9IHRoaXMuZWx0UmVmLm5hdGl2ZUVsZW1lbnQuY2hpbGROb2RlcztcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlOiBhbnkgPSBub2Rlc1tpXTtcbiAgICAgICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSAzKSB7IC8vIG5vZGUgdHlwZSAzIGlzIGEgdGV4dCBub2RlXG4gICAgICAgICAgICAgICAgbGV0IGtleSA9ICcnO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmtleSkge1xuICAgICAgICAgICAgICAgICAgICBrZXkgPSB0aGlzLmtleTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvcmNlVXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmxhc3RLZXkgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuZ2V0Q29udGVudChub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdHJpbW1lZENvbnRlbnQgPSBjb250ZW50LnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyaW1tZWRDb250ZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQgIT09IG5vZGUuY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5ID0gdHJpbW1lZENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5vcmlnaW5hbENvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUub3JpZ2luYWxDb250ZW50ICYmIGZvcmNlVXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5sYXN0S2V5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXkgPSBub2RlLm9yaWdpbmFsQ29udGVudC50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShrZXksIG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlVmFsdWUoa2V5OiBzdHJpbmcsIG5vZGU6IGFueSkge1xuICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICBpZiAobm9kZS5sYXN0S2V5ID09PSBrZXkgJiYgISF0aGlzLmxhc3RQYXJhbXMgJiYgdGhpcy5hcmVFcXVhbHModGhpcy5sYXN0UGFyYW1zLCB0aGlzLmN1cnJlbnRQYXJhbXMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmxhc3RQYXJhbXMgPSB0aGlzLmN1cnJlbnRQYXJhbXM7XG5cbiAgICAgICAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMudHJhbnNsYXRlUGlwZS50cmFuc2Zvcm0oa2V5LCB0aGlzLmN1cnJlbnRQYXJhbXMpO1xuICAgICAgICAgICAgaWYgKHRyYW5zbGF0ZSAhPT0ga2V5KSB7XG4gICAgICAgICAgICAgICAgbm9kZS5sYXN0S2V5ID0ga2V5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFub2RlLm9yaWdpbmFsQ29udGVudCkge1xuICAgICAgICAgICAgICAgIG5vZGUub3JpZ2luYWxDb250ZW50ID0gdGhpcy5nZXRDb250ZW50KG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZS5jdXJyZW50VmFsdWUgPSAhIXRyYW5zbGF0ZSA/IHRyYW5zbGF0ZSA6IChub2RlLm9yaWdpbmFsQ29udGVudCB8fCBrZXkpO1xuICAgICAgICAgICAgLy8gd2UgcmVwbGFjZSBpbiB0aGUgb3JpZ2luYWwgY29udGVudCB0byBwcmVzZXJ2ZSBzcGFjZXMgdGhhdCB3ZSBtaWdodCBoYXZlIHRyaW1tZWRcbiAgICAgICAgICAgIHRoaXMuc2V0Q29udGVudChub2RlLCB0aGlzLmtleSA/IG5vZGUuY3VycmVudFZhbHVlIDogbm9kZS5vcmlnaW5hbENvbnRlbnQucmVwbGFjZShrZXksIG5vZGUuY3VycmVudFZhbHVlKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRDb250ZW50KG5vZGU6IGFueSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAhIW5vZGUudGV4dENvbnRlbnQgPyBub2RlLnRleHRDb250ZW50IDogbm9kZS5kYXRhO1xuICAgIH1cblxuICAgIHNldENvbnRlbnQobm9kZTogYW55LCBjb250ZW50OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKCEhbm9kZS50ZXh0Q29udGVudCkge1xuICAgICAgICAgICAgbm9kZS50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub2RlLmRhdGEgPSBjb250ZW50O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXJlRXF1YWxzKG9iajE6IGFueSwgb2JqMjogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmoxKSA9PT0gSlNPTi5zdHJpbmdpZnkob2JqMik7XG4gICAgfVxufVxuIl19