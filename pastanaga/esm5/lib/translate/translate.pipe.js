import { __decorate, __metadata, __param } from "tslib";
import { Pipe, Inject } from '@angular/core';
var TranslatePipe = /** @class */ (function () {
    function TranslatePipe(lang, translations) {
        this.lang = lang;
        this.translations = translations;
        this.value = '';
    }
    TranslatePipe.prototype.transform = function (key, args) {
        if (!key) {
            return '';
        }
        // if we ask another time for the same key, return the last value
        if (key === this.lastKey && args === this.lastParams) {
            return this.value;
        }
        var keys = !!key ? key.split('.') : [];
        this.value = this.lang === 'en_US' ? this.getValue(keys, 'en_US', this.translations) :
            (this.getValue(keys, this.lang, this.translations) || this.getValue(keys, 'en_US', this.translations));
        if (!!this.value && !!args) {
            this.lastParams = args;
            var value_1 = this.value;
            Object.keys(args).forEach(function (param) {
                value_1 = value_1.replace(new RegExp("{{" + param + "}}", 'g'), args[param]);
            });
            this.value = value_1;
        }
        return (!!this.value || this.value === '') ? this.value : key;
    };
    TranslatePipe.prototype.getValue = function (keys, lang, translations) {
        var translateKeys = translations[lang] || {};
        var value = !!translateKeys['default'] ? translateKeys['default'] : translateKeys;
        keys.forEach(function (k) {
            if (!!value) {
                value = value[k];
            }
        });
        return !value || typeof value === 'string' ? value : keys.join('.');
    };
    TranslatePipe.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: ['LANG',] }] },
        { type: undefined, decorators: [{ type: Inject, args: ['TRANSLATIONS',] }] }
    ]; };
    TranslatePipe = __decorate([
        Pipe({
            name: 'translate',
            pure: true,
        }),
        __param(0, Inject('LANG')),
        __param(1, Inject('TRANSLATIONS')),
        __metadata("design:paramtypes", [Object, Object])
    ], TranslatePipe);
    return TranslatePipe;
}());
export { TranslatePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ3VpbGxvdGluYXdlYi9wYXN0YW5hZ2EtYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi90cmFuc2xhdGUvdHJhbnNsYXRlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUs1RDtJQUtJLHVCQUM0QixJQUFTLEVBQ0QsWUFBaUI7UUFEekIsU0FBSSxHQUFKLElBQUksQ0FBSztRQUNELGlCQUFZLEdBQVosWUFBWSxDQUFLO1FBSnJELFVBQUssR0FBdUIsRUFBRSxDQUFDO0lBSzVCLENBQUM7SUFFSixpQ0FBUyxHQUFULFVBQVUsR0FBWSxFQUFFLElBQVU7UUFDOUIsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNOLE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFDRCxpRUFBaUU7UUFDakUsSUFBSSxHQUFHLEtBQUssSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNsRCxPQUFPLElBQUksQ0FBQyxLQUFlLENBQUM7U0FDL0I7UUFDRCxJQUFNLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2xGLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQzNHLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRTtZQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLE9BQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztnQkFDM0IsT0FBSyxHQUFHLE9BQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBSyxLQUFLLE9BQUksRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN4RSxDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBSyxDQUFDO1NBQ3RCO1FBRUQsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUNsRSxDQUFDO0lBRU8sZ0NBQVEsR0FBaEIsVUFBaUIsSUFBYyxFQUFFLElBQVksRUFBRSxZQUFpQjtRQUM1RCxJQUFNLGFBQWEsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQy9DLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO1FBQ2xGLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO1lBQ1YsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFO2dCQUNULEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDcEI7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEUsQ0FBQzs7Z0RBcENJLE1BQU0sU0FBQyxNQUFNO2dEQUNiLE1BQU0sU0FBQyxjQUFjOztJQVBqQixhQUFhO1FBSnpCLElBQUksQ0FBQztZQUNKLElBQUksRUFBRSxXQUFXO1lBQ2pCLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQztRQU9PLFdBQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ2QsV0FBQSxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUE7O09BUGxCLGFBQWEsQ0E0Q3pCO0lBQUQsb0JBQUM7Q0FBQSxBQTVDRCxJQTRDQztTQTVDWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5AUGlwZSh7XG4gIG5hbWU6ICd0cmFuc2xhdGUnLFxuICBwdXJlOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBUcmFuc2xhdGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgbGFzdEtleT86IHN0cmluZztcbiAgICBsYXN0UGFyYW1zPzogc3RyaW5nO1xuICAgIHZhbHVlOiBzdHJpbmcgfCB1bmRlZmluZWQgPSAnJztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KCdMQU5HJykgcHJpdmF0ZSBsYW5nOiBhbnksXG4gICAgICAgIEBJbmplY3QoJ1RSQU5TTEFUSU9OUycpIHByaXZhdGUgdHJhbnNsYXRpb25zOiBhbnksXG4gICAgKSB7fVxuXG4gICAgdHJhbnNmb3JtKGtleT86IHN0cmluZywgYXJncz86IGFueSk6IHN0cmluZyB7XG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgd2UgYXNrIGFub3RoZXIgdGltZSBmb3IgdGhlIHNhbWUga2V5LCByZXR1cm4gdGhlIGxhc3QgdmFsdWVcbiAgICAgICAgaWYgKGtleSA9PT0gdGhpcy5sYXN0S2V5ICYmIGFyZ3MgPT09IHRoaXMubGFzdFBhcmFtcykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUgYXMgc3RyaW5nO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGtleXMgPSAhIWtleSA/IGtleS5zcGxpdCgnLicpIDogW107XG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmxhbmcgPT09ICdlbl9VUycgPyB0aGlzLmdldFZhbHVlKGtleXMsICdlbl9VUycsIHRoaXMudHJhbnNsYXRpb25zKSA6XG4gICAgICAgICAgICAodGhpcy5nZXRWYWx1ZShrZXlzLCB0aGlzLmxhbmcsIHRoaXMudHJhbnNsYXRpb25zKSB8fCB0aGlzLmdldFZhbHVlKGtleXMsICdlbl9VUycsIHRoaXMudHJhbnNsYXRpb25zKSk7XG4gICAgICAgIGlmICghIXRoaXMudmFsdWUgJiYgISFhcmdzKSB7XG4gICAgICAgICAgICB0aGlzLmxhc3RQYXJhbXMgPSBhcmdzO1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGFyZ3MpLmZvckVhY2gocGFyYW0gPT4ge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShuZXcgUmVnRXhwKGB7eyR7cGFyYW19fX1gLCAnZycpLCBhcmdzW3BhcmFtXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoISF0aGlzLnZhbHVlIHx8IHRoaXMudmFsdWUgPT09ICcnKSA/IHRoaXMudmFsdWUgOiBrZXk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRWYWx1ZShrZXlzOiBzdHJpbmdbXSwgbGFuZzogc3RyaW5nLCB0cmFuc2xhdGlvbnM6IGFueSk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGNvbnN0IHRyYW5zbGF0ZUtleXMgPSB0cmFuc2xhdGlvbnNbbGFuZ10gfHwge307XG4gICAgICAgIGxldCB2YWx1ZSA9ICEhdHJhbnNsYXRlS2V5c1snZGVmYXVsdCddID8gdHJhbnNsYXRlS2V5c1snZGVmYXVsdCddIDogdHJhbnNsYXRlS2V5cztcbiAgICAgICAga2V5cy5mb3JFYWNoKGsgPT4ge1xuICAgICAgICAgICAgaWYgKCEhdmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlW2tdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuICF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gdmFsdWUgOiBrZXlzLmpvaW4oJy4nKTtcbiAgICB9XG5cbn1cbiJdfQ==