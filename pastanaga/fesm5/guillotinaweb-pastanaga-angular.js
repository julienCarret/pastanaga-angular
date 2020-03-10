import { __decorate, __metadata, __param, __assign, __extends, __values } from 'tslib';
import { ɵɵdefineInjectable, Injectable, Inject, Pipe, ɵɵinject, EventEmitter, ElementRef, ChangeDetectorRef, Input, Output, ViewChild, Component, ChangeDetectionStrategy, HostBinding, Directive, ViewEncapsulation, Renderer2, PLATFORM_ID, NgModule, ViewContainerRef, ComponentFactoryResolver, HostListener, ViewChildren, QueryList, forwardRef, NgZone, Optional } from '@angular/core';
import { Subject, of, forkJoin, BehaviorSubject } from 'rxjs';
import { addMonths, subMonths, startOfMonth, endOfMonth, isSunday, startOfWeek, isSaturday, endOfWeek, eachDayOfInterval, isFuture, isSameDay, isWithinInterval, isBefore, format, subYears, addYears, startOfYear, endOfYear, eachMonthOfInterval, isSameMonth, eachYearOfInterval, isSameYear, isToday, isYesterday, startOfYesterday, isValid, getMonth } from 'date-fns';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { HttpClientModule } from '@angular/common/http';
import { SvgIconRegistryService, AngularSvgIconModule } from 'angular-svg-icon';
import { TraversalModule } from 'angular-traversal';
import { NG_VALUE_ACCESSOR, FormsModule, NgForm, FormGroupDirective, NG_VALIDATORS } from '@angular/forms';
import { tap, takeUntil, debounceTime, throttleTime } from 'rxjs/operators';
import { Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { trigger, state, style, transition, animate } from '@angular/animations';

var SidebarService = /** @class */ (function () {
    function SidebarService() {
        this.registry = {};
    }
    SidebarService.prototype.register = function (key, sidebar) {
        if (!!this.registry[key]) {
            throw new Error("Sidebar " + key + " already exists. Either unregister it or use an unique key.");
        }
        this.registry[key] = sidebar;
    };
    SidebarService.prototype.unregister = function (key) {
        if (!this.registry[key]) {
            throw new Error("Sidebar " + key + " doesn't exist");
        }
        delete this.registry[key];
    };
    SidebarService.prototype.getSidebar = function (key) {
        return this.registry[key];
    };
    SidebarService.prototype.toggle = function (key, force) {
        var bar = this.getSidebar(key);
        if (!!bar) {
            bar.toggleOpen(force);
        }
    };
    SidebarService.ɵprov = ɵɵdefineInjectable({ factory: function SidebarService_Factory() { return new SidebarService(); }, token: SidebarService, providedIn: "root" });
    SidebarService = __decorate([
        Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [])
    ], SidebarService);
    return SidebarService;
}());

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

var PopupService = /** @class */ (function () {
    function PopupService() {
        this.closeAllPopups = new Subject();
        this.closeAllButId = new Subject();
        this.closeAllSubMenu = new Subject();
    }
    PopupService.ɵprov = ɵɵdefineInjectable({ factory: function PopupService_Factory() { return new PopupService(); }, token: PopupService, providedIn: "root" });
    PopupService = __decorate([
        Injectable({ providedIn: 'root' })
    ], PopupService);
    return PopupService;
}());

var CalendarView;
(function (CalendarView) {
    CalendarView["day"] = "day";
    CalendarView["month"] = "month";
    CalendarView["year"] = "year";
})(CalendarView || (CalendarView = {}));
var CalendarDate = /** @class */ (function () {
    function CalendarDate(data) {
        this.date = data.date;
        this.label = data.label;
        this.isFuture = data.isFuture;
        this.isActive = data.isActive;
        this.isDisabled = data.isDisabled || false;
        this.inInterval = data.inInterval || false;
        this.firstOfInterval = data.firstOfInterval || false;
        this.lastOfInterval = data.lastOfInterval || false;
    }
    return CalendarDate;
}());

var CalendarService = /** @class */ (function () {
    function CalendarService() {
    }
    CalendarService.prototype.getNextMonth = function (date, selectedRange, min) {
        var nextDate = addMonths(date, 1);
        return this.getMonth(nextDate, selectedRange, min);
    };
    CalendarService.prototype.getPreviousMonth = function (date, selectedRange, min) {
        var previousDate = subMonths(date, 1);
        return this.getMonth(previousDate, selectedRange, min);
    };
    CalendarService.prototype.getMonth = function (date, selectedRange, min) {
        var start = startOfMonth(date);
        var end = endOfMonth(date);
        var dateRef = start;
        if (!isSunday(start)) {
            start = startOfWeek(start);
        }
        if (!isSaturday(end)) {
            end = endOfWeek(end);
        }
        return {
            dateRef: dateRef,
            dates: eachDayOfInterval({ start: start, end: end }).map(function (d) { return new CalendarDate({
                date: d,
                label: "" + d.getDate(),
                isFuture: isFuture(d),
                firstOfInterval: !!selectedRange.start && isSameDay(d, selectedRange.start),
                lastOfInterval: !!selectedRange.end && isSameDay(d, selectedRange.end),
                inInterval: !!selectedRange.start && !!selectedRange.end
                    && isWithinInterval(d, { start: selectedRange.start, end: selectedRange.end }),
                isActive: (!!selectedRange.start && isSameDay(d, selectedRange.start))
                    || (!!selectedRange.end && isSameDay(d, selectedRange.end)),
                isDisabled: !!min && isBefore(d, min),
            }); }),
            headerButtons: [
                { label: format(date, 'MMMM'), view: CalendarView.month },
                { label: format(date, 'yyyy'), view: CalendarView.year },
            ],
        };
    };
    CalendarService.prototype.getPreviousMonths = function (date, currentDate, min) {
        var previousDate = subYears(date, 1);
        return this.getMonths(previousDate, currentDate, min);
    };
    CalendarService.prototype.getNextMonths = function (date, currentDate, min) {
        var nextDate = addYears(date, 1);
        return this.getMonths(nextDate, currentDate, min);
    };
    CalendarService.prototype.getMonths = function (date, currentDate, min) {
        var start = startOfYear(date);
        var end = endOfYear(date);
        return {
            dateRef: start,
            dates: eachMonthOfInterval({ start: start, end: end }).map(function (d) { return new CalendarDate({
                date: d,
                label: format(d, 'MMMM'),
                isFuture: isFuture(d),
                isActive: isSameMonth(d, currentDate),
                isDisabled: !!min && !isSameMonth(d, min) && isBefore(d, min),
            }); }),
            headerButtons: [{ label: format(date, 'yyyy'), view: CalendarView.year }],
        };
    };
    CalendarService.prototype.getPreviousYears = function (date, currentDate, min) {
        var previousDate = subYears(date, 20);
        return this.getYears(previousDate, currentDate, min);
    };
    CalendarService.prototype.getNextYears = function (date, currentDate, min) {
        var nextDate = addYears(date, 20);
        return this.getYears(nextDate, currentDate, min);
    };
    CalendarService.prototype.getYears = function (date, currentDate, min) {
        var start = subYears(date, 10);
        var end = addYears(date, 9);
        return {
            dateRef: date,
            dates: eachYearOfInterval({ start: start, end: end }).map(function (d) { return new CalendarDate({
                date: d,
                label: "" + d.getFullYear(),
                isFuture: isFuture(d),
                isActive: isSameYear(d, currentDate),
                isDisabled: !!min && !isSameYear(d, min) && isBefore(d, min),
            }); }),
            headerButtons: [{ label: start.getFullYear() + " - " + end.getFullYear(), view: CalendarView.day }],
        };
    };
    CalendarService.ɵprov = ɵɵdefineInjectable({ factory: function CalendarService_Factory() { return new CalendarService(); }, token: CalendarService, providedIn: "root" });
    CalendarService = __decorate([
        Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [])
    ], CalendarService);
    return CalendarService;
}());

var PastanagaService = /** @class */ (function () {
    function PastanagaService(calendar, popup, sidebar, translate) {
        this.calendar = calendar;
        this.popup = popup;
        this.sidebar = sidebar;
        this.translate = translate;
    }
    PastanagaService.ctorParameters = function () { return [
        { type: CalendarService },
        { type: PopupService },
        { type: SidebarService },
        { type: TranslatePipe }
    ]; };
    PastanagaService.ɵprov = ɵɵdefineInjectable({ factory: function PastanagaService_Factory() { return new PastanagaService(ɵɵinject(CalendarService), ɵɵinject(PopupService), ɵɵinject(SidebarService), ɵɵinject(TranslatePipe)); }, token: PastanagaService, providedIn: "root" });
    PastanagaService = __decorate([
        Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [CalendarService,
            PopupService,
            SidebarService,
            TranslatePipe])
    ], PastanagaService);
    return PastanagaService;
}());

var Avatar = /** @class */ (function () {
    function Avatar(data) {
        this.username = data.username;
        this.id = data.id;
        this.backgroundColor = data.backgroundColor;
        this.image = data.image;
        this.badgeIcon = data.badgeIcon;
    }
    return Avatar;
}());
var COLORS = [
    'blue',
    'teal',
    'jade',
    'green',
    'lime',
    'kaki',
    'yellow',
    'orange',
    'salmon',
    'red',
    'crisom',
    'magenta',
    'violet',
    'indigo',
    'azure',
];

var BadgeComponent = /** @class */ (function () {
    function BadgeComponent(elementRef, changeDetector) {
        this.elementRef = elementRef;
        this.changeDetector = changeDetector;
        this.id = '';
        this.isAccented = false;
        this.isSmall = false;
        this.isError = false;
        this.canBeRemoved = false;
        this.remove = new EventEmitter();
        this.render = new EventEmitter();
        this.colorClass = '';
        this.text = '';
    }
    Object.defineProperty(BadgeComponent.prototype, "color", {
        set: function (value) {
            if (!!value) {
                this.colorClass = "pa-badge-" + value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BadgeComponent.prototype, "hexaColor", {
        set: function (value) {
            if (!!value) {
                if (!this.colorClass) {
                    this.colorStyle = {
                        'background-color': value
                    };
                    var luminance = this.calcLuminance(value);
                    if (luminance < 0.61) {
                        this.colorStyle['color'] = '#fff';
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BadgeComponent.prototype, "value", {
        set: function (val) {
            this._value = val;
            // accented and small by default when badge of value kind
            if (typeof this.isAccented === 'undefined') {
                this.isAccented = true;
            }
            if (typeof this.isSmall === 'undefined') {
                this.isSmall = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BadgeComponent.prototype, "avatar", {
        set: function (value) {
            if (!!value) {
                this._avatar = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    BadgeComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (!!this.maxWidth && !!this.textContent) {
            var textContent_1 = this.textContent;
            setTimeout(function () {
                if (!!_this.changeDetector && !_this.changeDetector.destroyed) {
                    _this.text = textContent_1.nativeElement.textContent.trim();
                    _this.changeDetector.detectChanges();
                }
            });
        }
        this.render.emit(this.elementRef);
    };
    /**
     * Solution to calc luminance is coming from
     * https://stackoverflow.com/a/1754281/2116063
     * and https://stackoverflow.com/a/12043228/2116063 (for javascript adaptation)
     */
    /* tslint:disable:no-bitwise */
    BadgeComponent.prototype.calcLuminance = function (hexa) {
        var color = hexa.substring(1); // strip #
        var rgb = parseInt(color, 16); // convert rrggbb to decimal
        var r = (rgb >> 16) & 0xff; // extract red
        var g = (rgb >> 8) & 0xff; // extract green
        var b = (rgb >> 0) & 0xff; // extract blue
        return (r * 0.299 + g * 0.587 + b * 0.114) / 256;
    };
    BadgeComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BadgeComponent.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], BadgeComponent.prototype, "color", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], BadgeComponent.prototype, "hexaColor", null);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BadgeComponent.prototype, "isAccented", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BadgeComponent.prototype, "isSmall", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BadgeComponent.prototype, "isError", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BadgeComponent.prototype, "canBeRemoved", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BadgeComponent.prototype, "maxWidth", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], BadgeComponent.prototype, "value", null);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], BadgeComponent.prototype, "of", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], BadgeComponent.prototype, "buttons", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Avatar),
        __metadata("design:paramtypes", [Avatar])
    ], BadgeComponent.prototype, "avatar", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], BadgeComponent.prototype, "remove", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], BadgeComponent.prototype, "render", void 0);
    __decorate([
        ViewChild('textContent'),
        __metadata("design:type", ElementRef)
    ], BadgeComponent.prototype, "textContent", void 0);
    BadgeComponent = __decorate([
        Component({
            selector: 'pa-badge',
            template: "<span class=\"pa-badge {{colorClass}}\"\n      [id]=\"id\"\n      [class.pa-badge-accent]=\"isAccented\"\n      [class.pa-badge-small]=\"isSmall\"\n      [class.pa-badge-error]=\"isError\"\n      [class.pa-badge-avatar]=\"!!_avatar\"\n      [ngStyle]=\"colorStyle\">\n\n    <pa-avatar *ngIf=\"!!_avatar\" [avatar]=\"_avatar\" size=\"small\"></pa-avatar>\n\n    <span *ngIf=\"!_value\"\n          class=\"pa-badge-value\"\n          [ngStyle]=\"colorStyle\"\n          [class.pa-badge-ellipsis]=\"!!maxWidth\"\n          [style.max-width]=\"maxWidth\"\n          [paTooltip]=\"text\" #textContent><ng-content></ng-content></span>\n    <pa-button *ngFor=\"let btn of buttons\"\n                 size=\"small\" [icon]=\"btn.icon\" [color]=\"btn.color\" (click)=\"btn.onClick()\">{{btn.name}}</pa-button>\n    <pa-button *ngIf=\"canBeRemoved\" aria-label=\"Remove\"\n                 size=\"small\" icon=\"clear\" color=\"secondary\" (click)=\"remove.emit($event)\">Remove</pa-button>\n    <ng-container *ngIf=\"!!_value || _value === 0\">{{ _value | number }}<span *ngIf=\"of\"><abbr title=\"of\">/</abbr>{{ of | number }}</span></ng-container>\n</span>\n\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: ["@charset \"UTF-8\";.pa-badge{display:inline-block;font-size:.875rem;line-height:1.125rem;letter-spacing:.03em;padding:.1875rem .375rem;margin-left:-.375rem;margin-right:.75rem;font-weight:300;text-align:center;white-space:nowrap;vertical-align:baseline;overflow:hidden;border-radius:2px;color:#3a3a3a;background-color:#dee7e9}.pa-badge:empty{display:none}.pa-badge ::ng-deep pa-button button{margin:-.75rem -.1875rem}.pa-badge ::ng-deep .pa-button-wrapper{margin-top:-4px}.pa-badge ::ng-deep pa-button:last-child button{margin-right:-.375rem}.pa-badge .pa-avatar-small{margin:-1.03125rem .375rem -.84375rem -.5625rem}.pa-badge .pa-avatar-small img{left:0}.pa-badge>.pa-badge-ellipsis{opacity:.8}.pa-badge.pa-badge-avatar{border-bottom-left-radius:.75rem;border-top-left-radius:.75rem;padding:0 .1875rem 0 0}.pa-badge.pa-badge-avatar pa-avatar{margin-right:.375rem}.pa-badge.pa-badge-avatar .pa-badge-value{bottom:-1px}.pa-badge.pa-badge-avatar pa-button ::ng-deep .pa-button{margin-bottom:-.9375rem}.pa-badge-small{font-size:calc(.875rem * 12/14);line-height:.75rem;padding:.1875rem}.pa-badge-small.pa-badge-accent{padding-right:.375rem;padding-left:.375rem;min-width:1.3125rem}.on-button .pa-badge{position:relative;top:-1px}.pa-badge .pa-badge-ellipsis{max-width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-overflow:\"\u2026\";display:inline-block;vertical-align:middle}.pa-badge-accent{padding-right:.5625rem;padding-left:.5625rem;border-radius:100px}.pa-badge-positive{background-color:#24a506;color:#fff}.pa-badge-destructive{background-color:#e40166;color:#fff}.pa-badge-warning{background-color:#bdb107;color:#fff}.pa-badge-secondary{background-color:#826a6a;color:#fff}.pa-badge-primary{background-color:#2280a0;color:#fff}.pa-badge-error{color:#e40166;background:rgba(228,1,102,.05)}"]
        }),
        __metadata("design:paramtypes", [ElementRef,
            ChangeDetectorRef])
    ], BadgeComponent);
    return BadgeComponent;
}());

var COLORS$1 = ['primary', 'secondary', 'destructive', 'contrast'];
var SIZES = ['tiny', 'small', 'large'];
var ButtonBase = /** @class */ (function () {
    function ButtonBase(changeDetector) {
        this.changeDetector = changeDetector;
        this.ariaLabel = '';
        this.icon = '';
        this.ariaControls = '';
        this.ariaExpanded = false;
        this.hasFocus = new EventEmitter();
        this._iconAndText = false;
        this.checkedType = 'button';
        this.buttonStyle = {
            'pa-button': true,
            'pa-button-primary': true,
            'pa-button-secondary': false,
            'pa-button-destructive': false,
            'pa-button-contrast': false,
            'pa-button-small': false,
            'pa-button-large': false,
            'pa-button-accent': false,
            'pa-button-link': false,
            'active': false,
        };
        this.isDisabled = false;
    }
    Object.defineProperty(ButtonBase.prototype, "color", {
        set: function (value) {
            var _this = this;
            if (!!value) {
                var buttonStyles_1 = __assign({}, this.buttonStyle);
                COLORS$1.forEach(function (color) {
                    var colorClass = _this.getClassFromInput('color', color, COLORS$1);
                    buttonStyles_1[colorClass] = color === value;
                });
                this.buttonStyle = buttonStyles_1;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonBase.prototype, "size", {
        set: function (value) {
            var _this = this;
            if (!!value) {
                var buttonStyles_2 = __assign({}, this.buttonStyle);
                SIZES.forEach(function (size) {
                    var sizeClass = _this.getClassFromInput('size', size, SIZES);
                    buttonStyles_2[sizeClass] = size === value;
                });
                this.buttonStyle = buttonStyles_2;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonBase.prototype, "border", {
        set: function (value) {
            this.buttonStyle['pa-button-accent'] = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonBase.prototype, "disabled", {
        set: function (value) {
            this.isDisabled = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonBase.prototype, "active", {
        set: function (value) {
            this.buttonStyle['active'] = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonBase.prototype, "type", {
        set: function (value) {
            if (!!value && ['button', 'submit', 'reset'].indexOf(value) !== -1) {
                this.checkedType = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonBase.prototype, "iconAndText", {
        get: function () {
            return this._iconAndText;
        },
        set: function (value) {
            this._iconAndText = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    ButtonBase.prototype.ngAfterContentInit = function () {
        var _this = this;
        setTimeout(function () {
            if (!!_this.textElement && !_this.ariaLabel && !!_this.changeDetector && !_this.changeDetector.destroyed) {
                _this.ariaLabel = _this.textElement.nativeElement.textContent.trim();
                _this.changeDetector.detectChanges();
            }
        }, 0);
    };
    ButtonBase.prototype.getClassFromInput = function (property, value, possibleValues) {
        if (possibleValues.indexOf(value) === -1) {
            console.error("Invalid " + property + ": " + value + ". Possible values: " + possibleValues.join(', ') + ".");
            return '';
        }
        return this.getButtonClass(value);
    };
    ButtonBase.prototype.getButtonClass = function (value) {
        return "pa-button-" + value;
    };
    Object.defineProperty(ButtonBase.prototype, "disablePointerEvent", {
        get: function () {
            return this.isDisabled ? 'none' : '';
        },
        enumerable: true,
        configurable: true
    });
    ButtonBase.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], ButtonBase.prototype, "color", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], ButtonBase.prototype, "size", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ButtonBase.prototype, "border", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ButtonBase.prototype, "disabled", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ButtonBase.prototype, "active", null);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ButtonBase.prototype, "ariaLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ButtonBase.prototype, "icon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ButtonBase.prototype, "type", null);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ButtonBase.prototype, "ariaControls", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ButtonBase.prototype, "ariaExpanded", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], ButtonBase.prototype, "iconAndText", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ButtonBase.prototype, "hasFocus", void 0);
    __decorate([
        ViewChild('text'),
        __metadata("design:type", ElementRef)
    ], ButtonBase.prototype, "textElement", void 0);
    __decorate([
        HostBinding('style.pointer-events'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], ButtonBase.prototype, "disablePointerEvent", null);
    ButtonBase = __decorate([
        Directive(),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], ButtonBase);
    return ButtonBase;
}());

var nextId = 0;
var ButtonComponent = /** @class */ (function (_super) {
    __extends(ButtonComponent, _super);
    function ButtonComponent(changeDetector) {
        var _this = _super.call(this, changeDetector) || this;
        _this.changeDetector = changeDetector;
        return _this;
    }
    ButtonComponent.prototype.ngOnInit = function () {
        this.id = !this.id ? "button-" + nextId++ : this.id + "-button";
    };
    ButtonComponent.prototype.onClick = function ($event) {
        if (!!$event && this.type !== 'submit') {
            $event.preventDefault();
        }
    };
    ButtonComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ButtonComponent.prototype, "id", void 0);
    ButtonComponent = __decorate([
        Component({
            selector: 'pa-button',
            template: "<button [ngClass]=\"buttonStyle\"\n        [disabled]=\"isDisabled\"\n        [type]=\"checkedType\"\n        [id]=\"id\"\n        [attr.aria-label]=\"ariaLabel | translate\"\n        [attr.aria-controls]=\"ariaControls\"\n        [attr.aria-expanded]=\"ariaExpanded\"\n        tabindex=\"0\"\n        (click)=\"onClick($event)\">\n    <span class=\"pa-button-wrapper\" tabindex=\"-1\">\n        <pa-icon *ngIf=\"!!icon\" [name]=\"icon\" [hidden]=\"true\"></pa-icon>\n        <span #text class=\"pa-button-label\" [class.pa-sr]=\"!!icon && !_iconAndText\" [class.pa-with-icon]=\"!!icon && _iconAndText\" translate><ng-content></ng-content></span>\n    </span>\n</button>\n\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None // to allow button style to access icon svg
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], ButtonComponent);
    return ButtonComponent;
}(ButtonBase));

var ButtonLinkComponent = /** @class */ (function (_super) {
    __extends(ButtonLinkComponent, _super);
    function ButtonLinkComponent(changeDetector) {
        var _this = _super.call(this, changeDetector) || this;
        _this.changeDetector = changeDetector;
        _this.onClick = new EventEmitter();
        _this.buttonStyle['pa-button-link'] = true;
        return _this;
    }
    Object.defineProperty(ButtonLinkComponent.prototype, "hasButtonDisplay", {
        set: function (value) {
            this.buttonStyle['pa-button-link'] = !coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    ButtonLinkComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ButtonLinkComponent.prototype, "route", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ButtonLinkComponent.prototype, "traverseTo", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ButtonLinkComponent.prototype, "hasButtonDisplay", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ButtonLinkComponent.prototype, "onClick", void 0);
    ButtonLinkComponent = __decorate([
        Component({
            selector: 'pa-button-link',
            template: "<ng-template #label>\n    <span (click)=\"onClick.emit($event)\" class=\"pa-button-wrapper\" tabindex=\"-1\" [class.inline]=\"buttonStyle['pa-button-link']\">\n        <pa-icon *ngIf=\"icon\" [name]=\"icon\" [hidden]=\"true\"></pa-icon>\n        <span #text class=\"pa-button-label\" [class.pa-sr]=\"!!icon && !_iconAndText\" [class.pa-with-icon]=\"!!icon && _iconAndText\" translate><ng-content></ng-content></span>\n    </span>\n</ng-template>\n<a *ngIf=\"!!route && !traverseTo\" href=\"#\"\n   [routerLink]=\"route\"\n   [ngClass]=\"buttonStyle\"\n   [attr.aria-label]=\"ariaLabel\"\n   [attr.aria-controls]=\"ariaControls\"\n   [attr.aria-expanded]=\"ariaExpanded\"\n   tabindex=\"0\">\n    <ng-container *ngTemplateOutlet=\"label\"></ng-container>\n</a>\n<a *ngIf=\"!!traverseTo\" href=\"#\"\n   [traverseTo]=\"traverseTo\"\n   [ngClass]=\"buttonStyle\"\n   [attr.aria-label]=\"ariaLabel\"\n   [attr.aria-controls]=\"ariaControls\"\n   [attr.aria-expanded]=\"ariaExpanded\"\n   tabindex=\"0\">\n    <ng-container *ngTemplateOutlet=\"label\"></ng-container>\n</a>\n<a *ngIf=\"!traverseTo && !route\" href=\"#\"\n   [ngClass]=\"buttonStyle\"\n   [attr.aria-label]=\"ariaLabel\"\n   [attr.aria-controls]=\"ariaControls\"\n   [attr.aria-expanded]=\"ariaExpanded\"\n   tabindex=\"0\">\n    <ng-container *ngTemplateOutlet=\"label\"></ng-container>\n</a>",
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None // to allow button style to access icon svg
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], ButtonLinkComponent);
    return ButtonLinkComponent;
}(ButtonBase));

var SvgLoader = /** @class */ (function () {
    function SvgLoader() {
    }
    SvgLoader.prototype.loadSvgFromSsr = function (iconPath, renderer) {
        console.error('You must provide a SSR implementation');
        return of({});
    };
    SvgLoader = __decorate([
        Injectable()
    ], SvgLoader);
    return SvgLoader;
}());

var IconSize;
(function (IconSize) {
    IconSize["SMALL"] = "SMALL";
    IconSize["MEDIUM"] = "MEDIUM";
    IconSize["LARGE"] = "LARGE";
})(IconSize || (IconSize = {}));
var Icon = /** @class */ (function () {
    function Icon(data) {
        this.name = data.name || '';
        this.path = data.path || '';
        this.backgroundColor = data.backgroundColor || '';
        this.fillColor = data.fillColor || '';
        this.padding = data.padding || '';
        this.size = data.size || IconSize.MEDIUM;
    }
    return Icon;
}());
var PositionStyle = /** @class */ (function () {
    function PositionStyle() {
    }
    return PositionStyle;
}());
var getFixedRootParent = function (element) {
    if (element.tagName === 'BODY') {
        return element;
    }
    // an element with `position: fixed` will be positionned relatively to the viewport
    // unless one of the ancestor has a property `transform`, `filter` or `perspective`
    // and its position is not static
    var style = getComputedStyle(element);
    if (style.position !== 'static' && (style.transform !== 'none' || style.perspective !== 'none' || style.filter !== 'none')) {
        return element;
    }
    else {
        var parent_1 = element.parentElement;
        return parent_1 ? getFixedRootParent(parent_1) : element;
    }
};
var getPositionnedParent = function (element) {
    if (element.tagName === 'BODY') {
        return element;
    }
    var style = getComputedStyle(element);
    if (style.position !== 'static') {
        return element;
    }
    else {
        var parent_2 = element.parentElement;
        return parent_2 ? getPositionnedParent(parent_2) : element;
    }
};
var getRealPosition = function (element) {
    var tmp = element;
    var tagName = tmp.tagName.toLowerCase();
    var top = 0;
    var left = 0;
    while (!!tmp && tagName !== 'body') {
        top += tmp.offsetTop;
        left += tmp.offsetLeft;
        tmp = tmp.offsetParent;
        tagName = tmp.tagName.toLowerCase();
    }
    return { top: top, left: left };
};
var getVirtualScrollParentPosition = function (element) {
    var tmp = element;
    while (!!tmp && tmp.tagName.toLowerCase() !== 'body' && tmp.tagName.toLowerCase() !== 'cdk-virtual-scroll-viewport') {
        tmp = tmp.offsetParent;
    }
    if (!!tmp && tmp.tagName.toLowerCase() === 'cdk-virtual-scroll-viewport') {
        var pos = getRealPosition(tmp);
        return {
            bottom: pos.top + tmp.clientHeight,
            right: pos.left + tmp.clientWidth,
        };
    }
    else {
        return null;
    }
};
var markForCheck = function (cdr) {
    if (!cdr.destroyed) {
        cdr.markForCheck();
    }
};
var detectChanges = function (cdr) {
    if (!cdr.destroyed) {
        cdr.detectChanges();
    }
};

var IconComponent = /** @class */ (function () {
    function IconComponent(element, renderer, service, svgLoader, platformId) {
        this.element = element;
        this.renderer = renderer;
        this.service = service;
        this.svgLoader = svgLoader;
        this.platformId = platformId;
        this._border = false;
        this._hidden = false;
        this._small = false;
        this._medium = false;
        this._large = false;
        this._color = '';
        this._padding = '';
        this.iconPath = '';
        this.iconBackground = '';
    }
    Object.defineProperty(IconComponent.prototype, "icon", {
        set: function (value) {
            if (!!value) {
                this.iconPath = value.name ? this.getIconPathFromName(value.name) : value.path;
                this.iconBackground = value.backgroundColor;
                this._medium = value.size === IconSize.MEDIUM;
                this._small = value.size === IconSize.SMALL;
                this._large = value.size === IconSize.LARGE;
                this._color = value.fillColor;
                this._padding = value.padding;
                this._border = true;
                this.updateSvg();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconComponent.prototype, "path", {
        set: function (value) {
            this.iconPath = value;
            this.updateSvg();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconComponent.prototype, "name", {
        set: function (value) {
            this.iconPath = this.getIconPathFromName(value);
            this.updateSvg();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconComponent.prototype, "hidden", {
        get: function () { return this._hidden; },
        set: function (value) {
            this._hidden = coerceBooleanProperty(value);
            this.updateSvg();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconComponent.prototype, "small", {
        get: function () { return this._small; },
        set: function (value) {
            this._small = coerceBooleanProperty(value);
            this.updateSvg();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconComponent.prototype, "color", {
        get: function () { return this._color; },
        set: function (value) {
            this._color = value;
            this.updateSvg();
        },
        enumerable: true,
        configurable: true
    });
    IconComponent.prototype.updateSvg = function () {
        var _this = this;
        if (!!this.iconPath) {
            if (isPlatformBrowser(this.platformId)) {
                this.service.loadSvg(this.iconPath).subscribe(function (svg) {
                    _this.setSvg(svg.cloneNode(true));
                });
            }
            else {
                this.svgLoader.loadSvgFromSsr(this.iconPath, this.renderer).subscribe(function (svg) {
                    _this.setSvg(svg);
                });
            }
        }
    };
    IconComponent.prototype.setSvg = function (icon) {
        if (typeof this._hidden !== 'undefined') {
            this.renderer.setAttribute(icon, 'aria-hidden', this._hidden.toString());
        }
        var classes = [];
        var styles = [];
        if (this._small) {
            classes.push('pa-small');
        }
        else if (this._medium) {
            classes.push('pa-medium');
        }
        else if (this._large) {
            classes.push('pa-large');
        }
        if (this._border) {
            classes.push('pa-border');
        }
        if (this._color) {
            styles.push("fill: " + this.color + ";");
        }
        if (this.iconBackground) {
            styles.push("background: " + this.iconBackground + ";");
        }
        if (this._padding) {
            styles.push("padding: " + this._padding);
        }
        this.renderer.setAttribute(icon, 'class', classes.join(' '));
        this.renderer.setAttribute(icon, 'style', styles.join(' '));
        var elem = this.element.nativeElement;
        elem.innerHTML = '';
        this.renderer.appendChild(elem, icon);
    };
    IconComponent.prototype.getIconPathFromName = function (name) {
        return "./assets/icons/" + name + ".svg";
    };
    IconComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: SvgIconRegistryService },
        { type: SvgLoader },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Icon),
        __metadata("design:paramtypes", [Icon])
    ], IconComponent.prototype, "icon", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], IconComponent.prototype, "path", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], IconComponent.prototype, "name", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], IconComponent.prototype, "hidden", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], IconComponent.prototype, "small", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], IconComponent.prototype, "color", null);
    IconComponent = __decorate([
        Component({
            selector: 'pa-icon',
            template: "<ng-content></ng-content>",
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            styles: [".pa-small{width:1.125rem;height:1.125rem}.pa-medium{width:1.5rem;height:1.5rem}.pa-large{width:1.875rem;height:1.875rem}.pa-border{border-radius:.1875rem}"]
        }),
        __param(4, Inject(PLATFORM_ID)),
        __metadata("design:paramtypes", [ElementRef,
            Renderer2,
            SvgIconRegistryService,
            SvgLoader,
            Object])
    ], IconComponent);
    return IconComponent;
}());

var SvgModule = /** @class */ (function () {
    function SvgModule() {
    }
    SvgModule = __decorate([
        NgModule({
            imports: [CommonModule, HttpClientModule, AngularSvgIconModule],
            exports: [IconComponent],
            declarations: [IconComponent],
            providers: [SvgLoader],
        })
    ], SvgModule);
    return SvgModule;
}());

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

var TranslateModule = /** @class */ (function () {
    function TranslateModule() {
    }
    TranslateModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [TranslatePipe, TranslateDirective],
            declarations: [TranslatePipe, TranslateDirective],
            providers: [TranslatePipe]
        })
    ], TranslateModule);
    return TranslateModule;
}());

var ButtonModule = /** @class */ (function () {
    function ButtonModule() {
    }
    ButtonModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                TranslateModule,
                SvgModule,
                RouterModule,
                TraversalModule,
            ],
            declarations: [ButtonComponent, ButtonLinkComponent],
            exports: [ButtonComponent, ButtonLinkComponent],
        })
    ], ButtonModule);
    return ButtonModule;
}());

var VERTICAL_SEPARATION = 21;
var VERTICAL_SEPARATION_ACTION = 3;
var HORIZONTAL_SEPARATION = -3;
var TooltipComponent = /** @class */ (function () {
    function TooltipComponent(cdr) {
        this.cdr = cdr;
        this.isAction = false;
        this.height = 0;
        this.width = 0;
        this.left = 0;
        this.top = 0;
        this.offset = 0;
    }
    TooltipComponent.prototype.ngAfterViewInit = function () {
        this.show();
    };
    TooltipComponent.prototype.show = function () {
        if (!!this.tooltipText) {
            this.tooltipText.nativeElement.style.left = this.getLeftPosition() + 'px';
            this.tooltipText.nativeElement.style.top = this.getTopPosition() + 'px';
            this.adjustPosition(); // once position set, check if too far horizontally or vertically
            this.tooltipText.nativeElement.setAttribute('aria-expanded', true);
            markForCheck(this.cdr);
        }
    };
    TooltipComponent.prototype.hide = function () {
        if (!!this.tooltipText) {
            this.tooltipText.nativeElement.setAttribute('aria-expanded', false);
            markForCheck(this.cdr);
        }
    };
    TooltipComponent.prototype.getLeftPosition = function () {
        if (this.isAction && !!this.tooltipText) {
            var tooltipWidth = this.tooltipText.nativeElement.offsetWidth;
            return this.left + (this.width / 2) - (tooltipWidth / 2);
        }
        else {
            return this.left + HORIZONTAL_SEPARATION;
        }
    };
    TooltipComponent.prototype.getTopPosition = function () {
        if (this.isAction) {
            return this.top + this.height + VERTICAL_SEPARATION_ACTION + this.offset;
        }
        else {
            return this.top + VERTICAL_SEPARATION + this.offset;
        }
    };
    TooltipComponent.prototype.adjustPosition = function () {
        if (!!this.tooltipText) {
            var rect = this.tooltipText.nativeElement.getBoundingClientRect();
            if (rect.right > window.innerWidth) {
                var left = parseInt(this.tooltipText.nativeElement.style.left.replace('px', ''), 10);
                left = left - (rect.right - window.innerWidth) - HORIZONTAL_SEPARATION;
                this.tooltipText.nativeElement.style.left = left + 'px';
            }
            if (rect.bottom > window.innerHeight) {
                var top_1 = parseInt(this.tooltipText.nativeElement.style.top.replace('px', ''), 10);
                top_1 = top_1 - (rect.bottom - window.innerHeight) - VERTICAL_SEPARATION;
                this.tooltipText.nativeElement.style.top = top_1 + 'px';
            }
        }
    };
    TooltipComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TooltipComponent.prototype, "text", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TooltipComponent.prototype, "id", void 0);
    __decorate([
        ViewChild('tooltipText'),
        __metadata("design:type", ElementRef)
    ], TooltipComponent.prototype, "tooltipText", void 0);
    TooltipComponent = __decorate([
        Component({
            selector: 'pa-tooltip-element',
            template: "<small #tooltipText role=\"tooltip\" [id]=\"id\" *ngIf=\"text\"\n    class=\"pa-tooltip\" [class.pa-tooltip-system]=\"!isAction\" translate>{{ text }}</small>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".pa-tooltip{visibility:hidden;opacity:0;z-index:10070;display:block;position:fixed;font-weight:400;font-size:.75rem;line-height:.75rem;color:#3a3a3a;background:rgba(237,241,242,.975);box-shadow:0 4px 12px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.1);border-radius:1px;padding:.375rem .5625rem;transition:visibility .33s,opacity .33s;-webkit-transition:visibility .33s,opacity .33s;overflow:hidden;white-space:nowrap;pointer-events:none}.pa-tooltip[aria-expanded=true]{opacity:1;visibility:visible;transition:visibility,opacity .33s 2s;-webkit-transition:visibility,opacity .33s 2s}.pa-tooltip-system[aria-expanded=true]{transition:visibility,opacity .33s .5s;-webkit-transition:visibility,opacity .33s .5s}@supports (-webkit-backdrop-filter:blur(3px)){.pa-tooltip,.pa-tooltip-system{background:rgba(237,241,242,.9);-webkit-backdrop-filter:blur(3px)}}.pa-tooltip-system>kbd,.pa-tooltip>kbd{line-height:0;color:#717171;top:0;margin-left:.375rem;margin-right:-.1875rem}"]
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], TooltipComponent);
    return TooltipComponent;
}());

var SYSTEM = 'system';
var ACTION = 'action';
var nextId$1 = 0;
var TooltipDirective = /** @class */ (function () {
    function TooltipDirective(element, viewContainerRef, resolver, renderer) {
        this.element = element;
        this.viewContainerRef = viewContainerRef;
        this.resolver = resolver;
        this.renderer = renderer;
        this.text = '';
        this.type = ACTION;
        this.offset = 0;
        this.id = '';
        this.isDisplayed = false;
    }
    Object.defineProperty(TooltipDirective.prototype, "paTooltipOffset", {
        get: function () { return this.offset; },
        set: function (value) { this.offset = coerceNumberProperty(value); },
        enumerable: true,
        configurable: true
    });
    TooltipDirective.prototype.focus = function (event) {
        // do not show tooltip if focus has been triggered programmatically
        if (event['sourceCapabilities']) {
            this.startDisplay(event);
        }
    };
    TooltipDirective.prototype.enter = function (event) {
        this.startDisplay(event);
    };
    TooltipDirective.prototype.move = function (event) {
        if (!!this.text && this.isDisplayed && this.type === SYSTEM) {
            var position = this.getFixedPosition(event);
            this.show(position[0], position[1]);
        }
    };
    TooltipDirective.prototype.startDisplay = function (event) {
        if (!!this.text && !this.isDisplayed) {
            var position = this.getFixedPosition(event);
            if (!this.component) {
                this.createTooltip(position[0], position[1]);
            }
            else {
                this.show(position[0], position[1]);
            }
            this.isDisplayed = true;
        }
    };
    TooltipDirective.prototype.show = function (x, y) {
        if (!!this.component) {
            this.component.instance.left = x || 0;
            this.component.instance.top = y || 0;
            this.component.instance.text = this.text;
            this.component.instance.show();
        }
    };
    TooltipDirective.prototype.createTooltip = function (x, y) {
        this.id = "pa-tooltip-" + nextId$1++;
        this.element.nativeElement.setAttribute('aria-describedby', this.id);
        var factory = this.resolver.resolveComponentFactory(TooltipComponent);
        this.component = this.viewContainerRef.createComponent(factory);
        this.component.instance.id = this.id;
        this.component.instance.text = this.text;
        this.component.instance.isAction = this.type === ACTION;
        this.component.instance.left = x || 0;
        this.component.instance.top = y || 0;
        this.component.instance.offset = this.offset || 0;
        this.component.instance.width = this.element.nativeElement.clientWidth;
        this.component.instance.height = this.element.nativeElement.clientHeight;
        this.renderer.appendChild(this.viewContainerRef.element.nativeElement, this.component.location.nativeElement);
    };
    TooltipDirective.prototype.hide = function () {
        if (!!this.component) {
            this.component.instance.hide();
        }
        this.isDisplayed = false;
    };
    TooltipDirective.prototype.getFixedPosition = function (event) {
        var position;
        if (this.type === ACTION) {
            var rect = this.element.nativeElement.getBoundingClientRect();
            position = [rect.left, rect.top];
        }
        else if (event.type === 'focusin') {
            var rect = this.element.nativeElement.getBoundingClientRect();
            position = [rect.right, rect.bottom];
        }
        else {
            position = [event.pageX, event.pageY];
        }
        if (!this.rootParent) {
            this.rootParent = this.getFixedRootParent(this.element.nativeElement);
        }
        var rootRect = this.rootParent.getBoundingClientRect();
        return [position[0] - rootRect.left, position[1] - rootRect.top];
    };
    TooltipDirective.prototype.getFixedRootParent = function (element) {
        if (element.tagName === 'BODY') {
            return element;
        }
        // an element with `position: fixed` will be positioned relatively to the viewport
        // unless one of the ancestor has a property `transform`, `filter` or `perspective`
        var style = getComputedStyle(element);
        if (style.transform !== 'none' || style.perspective !== 'none' || style.filter !== 'none') {
            return element;
        }
        else {
            var parent_1 = element.parentElement;
            return parent_1 ? this.getFixedRootParent(parent_1) : element;
        }
    };
    TooltipDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ViewContainerRef },
        { type: ComponentFactoryResolver },
        { type: Renderer2 }
    ]; };
    __decorate([
        Input('paTooltip'),
        __metadata("design:type", Object)
    ], TooltipDirective.prototype, "text", void 0);
    __decorate([
        Input('paTooltipType'),
        __metadata("design:type", String)
    ], TooltipDirective.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], TooltipDirective.prototype, "paTooltipOffset", null);
    __decorate([
        HostListener('focusin', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], TooltipDirective.prototype, "focus", null);
    __decorate([
        HostListener('mouseenter', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], TooltipDirective.prototype, "enter", null);
    __decorate([
        HostListener('mousemove', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], TooltipDirective.prototype, "move", null);
    __decorate([
        HostListener('focusout'),
        HostListener('mouseleave'),
        HostListener('mousedown'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TooltipDirective.prototype, "hide", null);
    TooltipDirective = __decorate([
        Directive({
            selector: '[paTooltip]'
        }),
        __metadata("design:paramtypes", [ElementRef,
            ViewContainerRef,
            ComponentFactoryResolver,
            Renderer2])
    ], TooltipDirective);
    return TooltipDirective;
}());

var TooltipModule = /** @class */ (function () {
    function TooltipModule() {
    }
    TooltipModule = __decorate([
        NgModule({
            imports: [CommonModule, TranslateModule],
            exports: [TooltipComponent, TooltipDirective],
            declarations: [TooltipComponent, TooltipDirective],
            entryComponents: [TooltipComponent],
        })
    ], TooltipModule);
    return TooltipModule;
}());

var getInitials = function (username) {
    var initials = '—';
    if (!!username.trim()) {
        var usernameWords = username.trim().split(' ').map(function (word) { return getValidLanguageText(word); });
        initials = usernameWords.length >= 2 ?
            getValidLanguageText(usernameWords[0]).charAt(0) + getValidLanguageText(usernameWords[1]).charAt(0) :
            getValidLanguageText(usernameWords[0]).substring(0, 2);
    }
    return initials;
};
var getValidLanguageText = function (text) {
    // tslint:disable-next-line:max-line-length
    var regex = /([\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]+)/g;
    var match = text.match(regex);
    return (match !== null) ? match[0] : '-';
};
var getAvatarColor = function (id) {
    var colorIndex = hash(id) % COLORS.length;
    return COLORS[colorIndex];
};
/**
 * Code coming from https://github.com/darkskyapp/string-hash
 * This hashing function returns a number between 0 and 4294967295 (inclusive).
 */
var hash = function (str) {
    var hash = 5381, i = str.length;
    while (i) {
        // tslint:disable-next-line:no-bitwise
        hash = (hash * 33) ^ str.charCodeAt(--i);
    }
    /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
     * integers. Since we want the results to be always positive, convert the
     * signed int to an unsigned by doing an unsigned bitshift. */
    // tslint:disable-next-line:no-bitwise
    return hash >>> 0;
};

var AvatarComponent = /** @class */ (function () {
    function AvatarComponent(cdr) {
        this.cdr = cdr;
        this._avatar = new Avatar({ username: '' });
        this._isButton = false;
        this.initials = '?';
        this.colorClass = '';
        this.sizeClass = '';
    }
    Object.defineProperty(AvatarComponent.prototype, "avatar", {
        set: function (value) {
            if (!!value) {
                this._avatar = value;
                this.initials = getInitials(value.username);
                var identifier = value.id || value.username;
                if (identifier) {
                    this.colorClass = "pa-avatar-" + getAvatarColor(identifier);
                }
                if (!!value.image) {
                    this.loadImage(value.image);
                }
                if (!this.tooltip) {
                    this.tooltip = value.username;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AvatarComponent.prototype, "size", {
        set: function (value) {
            this.sizeClass = !value || value === 'regular' ? '' : "pa-avatar-" + value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AvatarComponent.prototype, "src", {
        set: function (value) {
            this.base64Image = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AvatarComponent.prototype, "isButton", {
        set: function (value) { this._isButton = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    AvatarComponent.prototype.loadImage = function (obs) {
        var _this = this;
        obs.subscribe(function (blob) {
            if (blob.size > 0) {
                var reader_1 = new FileReader();
                reader_1.addEventListener('load', function () {
                    _this.base64Image = reader_1.result;
                    detectChanges(_this.cdr);
                }, false);
                reader_1.readAsDataURL(blob);
            }
            else {
                _this.base64Image = '';
                detectChanges(_this.cdr);
            }
        });
    };
    AvatarComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Avatar),
        __metadata("design:paramtypes", [Avatar])
    ], AvatarComponent.prototype, "avatar", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], AvatarComponent.prototype, "size", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], AvatarComponent.prototype, "src", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], AvatarComponent.prototype, "isButton", null);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AvatarComponent.prototype, "tooltip", void 0);
    AvatarComponent = __decorate([
        Component({
            selector: 'pa-avatar',
            template: "<span *ngIf=\"!_isButton; else buttonAvatar\" class=\"pa-avatar {{colorClass}} {{sizeClass}}\"\n      [style.background-color]=\"_avatar.backgroundColor\"\n      [paTooltip]=\"tooltip\">\n    <img *ngIf=\"base64Image\"\n         class=\"pa-avatar-img\"\n         [src]=\"base64Image\">\n    <abbr class=\"pa-avatar-abbr\" [class.pa-avatar-color]=\"!!colorClass\">{{initials}}</abbr>\n\n    <span *ngIf=\"_avatar.badgeIcon\" class=\"pa-badge\">\n        <span class=\"pa-badge-icon\">\n            <pa-icon [name]=\"_avatar.badgeIcon\" small></pa-icon>\n        </span>\n    </span>\n</span>\n\n<ng-template #buttonAvatar>\n    <a class=\"pa-button pa-button-avatar\" tabindex=\"0\" [paTooltip]=\"tooltip\">\n        <span class=\"pa-button-wrapper\" tabindex=\"-1\">\n            <span class=\"pa-avatar {{colorClass}} {{sizeClass}}\">\n                <img *ngIf=\"base64Image\"\n                     class=\"pa-avatar-img\"\n                     [src]=\"base64Image\">\n                <abbr class=\"pa-avatar-abbr\" [class.pa-avatar-color]=\"!!colorClass\">{{initials}}</abbr>\n            </span>\n        </span>\n        <span *ngIf=\"_avatar.badgeIcon\" class=\"pa-badge\">\n            <span class=\"pa-badge-icon\">\n                <pa-icon [name]=\"_avatar.badgeIcon\" small></pa-icon>\n            </span>\n        </span>\n    </a>\n</ng-template>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".pa-avatar{width:2.25rem;height:2.25rem;display:inline-block;position:relative;border-radius:50%;background:#dee7e9;vertical-align:middle}.pa-avatar.pa-avatar-small{width:1.5rem;height:1.5rem}.pa-avatar.pa-avatar-small .pa-avatar-abbr{font-size:.875rem;line-height:1.5rem;letter-spacing:-.03em;line-height:calc(1.5rem + 1px)}.pa-avatar.pa-avatar-small .pa-badge{left:.75rem;top:.75rem}.pa-avatar .pa-avatar-img{width:100%;height:100%;-o-object-fit:cover;object-fit:cover;border-radius:50%;overflow:hidden;position:absolute;top:0;left:0;z-index:1}.pa-avatar .pa-avatar-abbr{cursor:default;width:100%;height:100%;position:absolute;top:0;left:0;display:inline-block;font-weight:300;font-size:calc(.875rem * 18/14);line-height:2.25rem;letter-spacing:-.03em;background-size:0 0;text-align:center;text-transform:uppercase;color:#3a3a3a}.pa-avatar .pa-avatar-abbr.pa-avatar-color{color:#fff}.pa-avatar .pa-avatar-img+.pa-avatar-abbr{z-index:2;text-indent:2.25rem;overflow:hidden}.pa-avatar .pa-badge{position:relative;left:1.5rem;top:1.5rem;background:#949494;border-radius:50%;z-index:1}.pa-avatar .pa-badge .pa-badge-icon{font-size:calc(.875rem * 11/14);line-height:.75rem;letter-spacing:.03em;padding:0 calc(.1875rem + 1px)}.pa-avatar .pa-badge .pa-badge-icon ::ng-deep svg{height:.75rem;width:.75rem;fill:#fff}.pa-avatar.pa-avatar-blue{background:#179fbd}.pa-avatar.pa-avatar-teal{background:#17a397}.pa-avatar.pa-avatar-jade{background:#17a07f}.pa-avatar.pa-avatar-green{background:#5fa44d}.pa-avatar.pa-avatar-lime{background:#71903c}.pa-avatar.pa-avatar-kaki{background:#a2842e}.pa-avatar.pa-avatar-yellow{background:#c08817}.pa-avatar.pa-avatar-orange{background:#df6b1f}.pa-avatar.pa-avatar-salmon{background:#f36831}.pa-avatar.pa-avatar-red{background:#ec6248}.pa-avatar.pa-avatar-crisom{background:#ea6375}.pa-avatar.pa-avatar-magenta{background:#da5499}.pa-avatar.pa-avatar-violet{background:#9489ce}.pa-avatar.pa-avatar-indigo{background:#7a92c5}.pa-avatar.pa-avatar-azure{background:#219ace}.pa-button-avatar{text-transform:none}.pa-button-avatar:active,.pa-button-avatar:hover{background:0 0}.pa-button-avatar .pa-avatar{fill:currentColor;stroke:currentColor;stroke-width:.0234375rem;-webkit-transition:background-color .25s;transition:background-color .25s}.pa-button-avatar .pa-avatar:hover{background-color:#cfdadd}.pa-button-avatar .pa-avatar.pa-avatar-small{width:1.5rem;height:1.5rem}.pa-button-avatar .pa-avatar .pa-avatar-abbr{cursor:pointer;color:#826a6a}.pa-button-avatar .pa-avatar .pa-avatar-abbr.pa-avatar-color{color:#fff}.pa-button-avatar .pa-avatar.pa-avatar-blue:hover{background-color:#117990}.pa-button-avatar .pa-avatar.pa-avatar-teal:hover{background-color:#11766e}.pa-button-avatar .pa-avatar.pa-avatar-jade:hover{background-color:#11735c}.pa-button-avatar .pa-avatar.pa-avatar-green:hover{background-color:#4b813d}.pa-button-avatar .pa-avatar.pa-avatar-lime:hover{background-color:#556c2d}.pa-button-avatar .pa-avatar.pa-avatar-kaki:hover{background-color:#7a6423}.pa-button-avatar .pa-avatar.pa-avatar-yellow:hover{background-color:#926812}.pa-button-avatar .pa-avatar.pa-avatar-orange:hover{background-color:#b25619}.pa-button-avatar .pa-avatar.pa-avatar-salmon:hover{background-color:#e44a0d}.pa-button-avatar .pa-avatar.pa-avatar-red:hover{background-color:#e73a1a}.pa-button-avatar .pa-avatar.pa-avatar-crisom:hover{background-color:#e4364d}.pa-button-avatar .pa-avatar.pa-avatar-magenta:hover{background-color:#ce2d80}.pa-button-avatar .pa-avatar.pa-avatar-violet:hover{background-color:#7365bf}.pa-button-avatar .pa-avatar.pa-avatar-indigo:hover{background-color:#5675b6}.pa-button-avatar .pa-avatar.pa-avatar-azure:hover{background-color:#1a79a2}"]
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], AvatarComponent);
    return AvatarComponent;
}());

var AvatarModule = /** @class */ (function () {
    function AvatarModule() {
    }
    AvatarModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                SvgModule,
                TooltipModule,
            ],
            exports: [AvatarComponent],
            declarations: [AvatarComponent],
        })
    ], AvatarModule);
    return AvatarModule;
}());

var BadgeModule = /** @class */ (function () {
    function BadgeModule() {
    }
    BadgeModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                ButtonModule,
                TooltipModule,
                TranslateModule,
                AvatarModule,
            ],
            declarations: [BadgeComponent],
            exports: [BadgeComponent],
        })
    ], BadgeModule);
    return BadgeModule;
}());

var BadgeModel = /** @class */ (function () {
    function BadgeModel() {
        this.name = '';
    }
    return BadgeModel;
}());

var FakeSvgLoader = /** @class */ (function () {
    function FakeSvgLoader() {
    }
    FakeSvgLoader.prototype.getSvg = function (url) {
        return of('<svg></svg>');
    };
    return FakeSvgLoader;
}());
function svgLoaderFactory() {
    return new FakeSvgLoader();
}

var nextId$2 = 0;
var CheckboxComponent = /** @class */ (function () {
    function CheckboxComponent(cdr, element) {
        this.cdr = cdr;
        this.element = element;
        this.type = 'checkbox';
        this.selection = new EventEmitter();
        // the following EventEmitters allow two way data-binding
        this.selectedChange = new EventEmitter();
        this._id = '';
        this._noFocus = false;
        this._indeterminate = false;
        this._disabled = false;
        this._selected = false;
        this._squareCheck = false;
        this._labelHidden = false;
        this._iconName = '';
        this.helpId = '';
        this.extraStyle = {};
        this.hasEllipsis = false;
        this.tooltipText = '';
        this.hasExtraWidth = false;
    }
    Object.defineProperty(CheckboxComponent.prototype, "icon", {
        set: function (value) {
            if (!!value && typeof value === 'string') {
                this._iconName = value;
            }
            else {
                this._icon = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxComponent.prototype, "disabled", {
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxComponent.prototype, "selected", {
        set: function (value) { this._selected = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxComponent.prototype, "indeterminate", {
        set: function (value) { this._indeterminate = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxComponent.prototype, "labelHidden", {
        set: function (value) { this._labelHidden = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxComponent.prototype, "noFocus", {
        set: function (value) { this._noFocus = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxComponent.prototype, "squareCheck", {
        set: function (value) { this._squareCheck = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    CheckboxComponent.prototype.ngOnInit = function () {
        this._id = this.id ? this.id : "field-" + this.type + "-" + nextId$2++;
        this.name = this.name || this._id;
        this.helpId = this._id + "-help";
    };
    CheckboxComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () { return _this.setLabelMaxWidth(); });
    };
    CheckboxComponent.prototype.toggleCheckbox = function () {
        // radio can't be unchecked by clicking on itself
        if (this.type === 'checkbox' || !this._selected) {
            this._selected = !this._selected;
        }
        markForCheck(this.cdr);
        this.selectedChange.emit(this._selected);
        this.selection.emit(this._selected);
    };
    CheckboxComponent.prototype.setLabelMaxWidth = function (extraWidth) {
        if (!!extraWidth) {
            this.hasExtraWidth = true;
        }
        if (this.hasExtraWidth && !extraWidth) {
            // prevent checkbox inner call to overwrite style with extra width coming from parent
            return;
        }
        var parent = this.element.nativeElement.parentElement;
        if (!!parent) {
            var parentWidth = parent.getBoundingClientRect().width;
            var maxWidth = parentWidth - 24;
            if (!!extraWidth) {
                maxWidth = maxWidth - extraWidth;
            }
            this.extraStyle = { 'max-width': maxWidth + "px" };
            this.setEllipsis();
            detectChanges(this.cdr);
        }
    };
    CheckboxComponent.prototype.setEllipsis = function () {
        if (!!this.ellipsisText) {
            if (!this._labelHidden) {
                this.hasEllipsis = this.ellipsisText.nativeElement.offsetWidth < this.ellipsisText.nativeElement.scrollWidth;
            }
            else {
                this.hasEllipsis = false;
            }
            if (this.hasEllipsis) {
                this.tooltipText = this.ellipsisText.nativeElement.innerText;
            }
        }
        detectChanges(this.cdr);
    };
    CheckboxComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CheckboxComponent.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CheckboxComponent.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CheckboxComponent.prototype, "help", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CheckboxComponent.prototype, "icon", null);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CheckboxComponent.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CheckboxComponent.prototype, "subLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], CheckboxComponent.prototype, "labelIcons", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CheckboxComponent.prototype, "disabled", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CheckboxComponent.prototype, "selected", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CheckboxComponent.prototype, "indeterminate", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CheckboxComponent.prototype, "labelHidden", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CheckboxComponent.prototype, "noFocus", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CheckboxComponent.prototype, "squareCheck", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CheckboxComponent.prototype, "selection", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CheckboxComponent.prototype, "selectedChange", void 0);
    __decorate([
        ViewChild('text'),
        __metadata("design:type", ElementRef)
    ], CheckboxComponent.prototype, "textElement", void 0);
    __decorate([
        ViewChild('ellipsisText', { static: true }),
        __metadata("design:type", ElementRef)
    ], CheckboxComponent.prototype, "ellipsisText", void 0);
    CheckboxComponent = __decorate([
        Component({
            selector: 'pa-checkbox',
            template: "<div class=\"pa-field\"\n     [class.pa-field-checkbox]=\"type === 'checkbox'\"\n     [class.pa-field-radio]=\"type === 'radio'\">\n\n    <pa-icon *ngIf=\"!!_icon\" [icon]=\"_icon\" small class=\"pa-icon-block\"></pa-icon>\n    <input class=\"pa-field-control\"\n           [tabindex]=\"_noFocus ? -1 : null\"\n           [class.pa-square-check]=\"_squareCheck\"\n           [type]=\"type\"\n           [id]=\"_id\"\n           [name]=\"name\"\n           [attr.aria-describedby]=\"helpId\"\n           [checked]=\"_selected\"\n           [attr.aria-checked]=\"_selected\"\n           [disabled]=\"_disabled\"\n           [indeterminate]=\"_indeterminate\"\n           (change)=\"toggleCheckbox()\">\n    <label [ngStyle]=\"extraStyle\"\n           class=\"pa-field-label pa-ellipsis\"\n           [class.pa-field-with-help]=\"!!help\"\n           [class.pa-field-with-icon]=\"!!_icon\"\n           [for]=\"_id\"\n           [paTooltip]=\"hasEllipsis ? tooltipText : null\">\n        <span translate class=\"pa-ellipsis-text\"\n              #ellipsisText\n              [class.pa-sr]=\"_labelHidden\">\n            <pa-icon *ngIf=\"!!_iconName\" [name]=\"_iconName\"></pa-icon>\n            <ng-content></ng-content>\n            <small *ngIf=\"subLabel\">{{ subLabel }}</small>\n            <pa-icon *ngFor=\"let icon of labelIcons\"\n                     [name]=\"icon.name\"\n                     [paTooltip]=\"icon.tooltip | translate\"\n                     class=\"pa-label-icon\"></pa-icon>\n        </span>\n    </label>\n\n    <small *ngIf=\"help\" class=\"pa-field-help pa-ellipsis-text\"\n           [class.pa-field-with-icon]=\"!!_icon\"\n           [class.pa-sr]=\"_labelHidden\" [id]=\"helpId\" translate>{{help}}</small>\n</div>\n\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".pa-field{position:relative}.pa-field pa-icon.pa-icon-block{position:absolute;top:-1px;left:1.5rem}.pa-field-control[type=checkbox]+.pa-field-label,.pa-field-control[type=radio]+.pa-field-label{height:1.125rem}.pa-field-control[type=checkbox]+.pa-field-label small,.pa-field-control[type=radio]+.pa-field-label small{color:#535353;margin-left:.375rem}.pa-field-control[type=checkbox]+.pa-field-label pa-icon.pa-label-icon ::ng-deep svg,.pa-field-control[type=radio]+.pa-field-label pa-icon.pa-label-icon ::ng-deep svg{fill:#3a3a3a;height:.75rem!important;width:.75rem!important;margin:0 0 -1px .375rem!important}.pa-field-control[type=checkbox]+.pa-field-label.pa-field-with-icon>span,.pa-field-control[type=radio]+.pa-field-label.pa-field-with-icon>span{margin-left:3rem!important}.pa-field-control[type=checkbox]:disabled+.pa-field-label pa-icon.pa-label-icon ::ng-deep svg,.pa-field-control[type=radio]:disabled+.pa-field-label pa-icon.pa-label-icon ::ng-deep svg{fill:#b8c6c8!important}.pa-field-control[type=checkbox]~.pa-field-help,.pa-field-control[type=radio]~.pa-field-help{margin-left:1.875rem}.pa-field-control[type=checkbox]~.pa-field-help.pa-field-with-icon,.pa-field-control[type=checkbox]~.pa-field-help.pa-icon,.pa-field-control[type=radio]~.pa-field-help.pa-field-with-icon,.pa-field-control[type=radio]~.pa-field-help.pa-icon{margin-left:3rem!important}"]
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef,
            ElementRef])
    ], CheckboxComponent);
    return CheckboxComponent;
}());

var ToggleModel = /** @class */ (function () {
    function ToggleModel() {
        this.label = '';
        this.isSelected = false;
    }
    return ToggleModel;
}());
var ToggleDivider = /** @class */ (function () {
    function ToggleDivider() {
        this.hasDivider = false;
        this.isFirst = true;
        this.isLast = false;
    }
    return ToggleDivider;
}());

var nextId$3 = 0;
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
        this.id = !this.id ? "field-toggle-" + nextId$3++ : this.id + "-field-toggle";
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

var nextId$4 = 0;
var ToggleGroupComponent = /** @class */ (function () {
    function ToggleGroupComponent(cdr) {
        this.cdr = cdr;
        this.toggles = [];
        this.onSelection = new EventEmitter();
        this.isAllSelected = false;
        this.dividers = [];
    }
    ToggleGroupComponent.prototype.ngOnInit = function () {
        this.id = !this.id ? "fieldset-toggle-group-" + nextId$4++ : this.id + "-fieldset-toggle-group";
    };
    ToggleGroupComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.toggles && changes.toggles.currentValue) {
            this.isAllSelected = this.toggles.every(function (toggle) { return toggle.isSelected; });
            this.dividers = this.toggles.map(function (toggle, index) {
                return {
                    hasDivider: true,
                    isFirst: index === 0,
                    isLast: index === _this.toggles.length - 1
                };
            });
            this.onSelection.emit(this.toggles);
        }
    };
    ToggleGroupComponent.prototype.toggleSelectAll = function () {
        var _this = this;
        this.isAllSelected = !this.isAllSelected;
        this.toggles = this.toggles.map(function (toggle) { return (__assign(__assign({}, toggle), { isSelected: _this.isAllSelected })); });
        markForCheck(this.cdr);
        this.onSelection.emit(this.toggles);
    };
    ToggleGroupComponent.prototype.toggleSelection = function (isSelected, toggle) {
        toggle.isSelected = isSelected;
        markForCheck(this.cdr);
        this.onSelection.emit(this.toggles);
    };
    ToggleGroupComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ToggleGroupComponent.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ToggleGroupComponent.prototype, "toggles", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ToggleGroupComponent.prototype, "onSelection", void 0);
    ToggleGroupComponent = __decorate([
        Component({
            selector: 'pa-toggle-group',
            template: "<fieldset class=\"pa-fieldset-group\" [id]=\"id\">\n    <legend #text translate>\n        <ng-content></ng-content>\n    </legend>\n\n    <pa-button size=\"small\" class=\"pa-field-button-right\"\n               [color]=\"isAllSelected ? 'secondary' : 'primary'\"\n               (click)=\"toggleSelectAll()\">\n        {{isAllSelected ? 'common.deselect-all' : 'common.select-all'}}\n    </pa-button>\n\n    <pa-toggle *ngFor=\"let toggle of toggles; let i = index;\"\n               [id]=\"toggle.id\"\n               [imageUrl]=\"toggle.imageUrl\"\n               [help]=\"toggle.help\"\n               [divider]=\"dividers[i]\"\n               [isSelected]=\"toggle.isSelected\"\n               (isSelectedChange)=\"toggleSelection($event, toggle)\">{{toggle.label}}\n    </pa-toggle>\n</fieldset>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [":host{display:block}"]
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], ToggleGroupComponent);
    return ToggleGroupComponent;
}());

var nextId$5 = 0;
var SliderComponent = /** @class */ (function () {
    function SliderComponent() {
        this.min = 0;
        this.max = 100;
        this.step = 1;
        this.isDisabled = false;
        this.valueChange = new EventEmitter();
        this.helpId = '';
        this.rangeValue = 0;
    }
    SliderComponent.prototype.ngOnInit = function () {
        this.id = !this.id ? "field-range-" + nextId$5++ : this.id + "-field-range";
        this.name = this.name || this.id;
        this.helpId = this.id + "-help";
    };
    SliderComponent.prototype.ngOnChanges = function (changes) {
        if (changes.min && typeof changes.min.currentValue !== 'number') {
            this.min = 0;
        }
        if (changes.max && typeof changes.max.currentValue !== 'number') {
            this.max = 100;
        }
        if (changes.step && typeof changes.step.currentValue !== 'number') {
            this.step = 5;
        }
    };
    Object.defineProperty(SliderComponent.prototype, "value", {
        get: function () {
            return this.rangeValue;
        },
        set: function (val) {
            this.rangeValue = val;
            this.valueChange.emit(this.rangeValue);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SliderComponent.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SliderComponent.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SliderComponent.prototype, "min", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SliderComponent.prototype, "max", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SliderComponent.prototype, "step", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SliderComponent.prototype, "help", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SliderComponent.prototype, "isDisabled", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SliderComponent.prototype, "valueChange", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Object])
    ], SliderComponent.prototype, "value", null);
    SliderComponent = __decorate([
        Component({
            selector: 'pa-slider',
            template: "<div class=\"pa-field pa-field-slider\">\n    <input class=\"pa-field-control pa-field-control-range\" type=\"range\"\n           [id]=\"id\" [name]=\"name\" [attr.aria-describedby]=\"helpId\" [(ngModel)]=\"value\"\n           [disabled]=\"isDisabled\" [min]=\"min\" [max]=\"max\" [step]=\"step\">\n    <label class=\"pa-field-label\" [for]=\"id\" translate>\n        <ng-content></ng-content>\n    </label>\n    <output class=\"pa-field-control-output\" [for]=\"id\" aria-hidden=\"true\">{{ value }}</output>\n    <small *ngIf=\"help\" class=\"pa-field-help\" [id]=\"helpId\" translate>{{ help }}</small>\n</div>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".pa-field .pa-field-control-range[type=range]{-webkit-appearance:none;margin:.375rem 0;-webkit-transition:175ms;transition:175ms;float:right;width:7.5rem;height:.375rem;padding:0;background-color:#2280a0;border-radius:12px}.pa-field-label-range{position:relative;font-weight:400;color:#3a3a3a;font-size:inherit;margin-bottom:0;padding:0;-webkit-transform:none!important;transform:none!important;font-size:inherit!important}.pa-field .pa-field-control-range[type=range]~.pa-field-help{margin:0}.pa-field-control.pa-field-control-range[type=range]{-webkit-appearance:none;margin:6px 0;-webkit-transition:175ms;transition:175ms;float:right;width:120px;height:6px}.pa-field-control-output{display:inline-block;float:right;margin-right:12px;color:#767676;font-weight:300}.pa-field input[type=range]:focus{outline:0;box-shadow:none}.pa-field input[type=range]:-moz-focusring,.pa-field input[type=range]::-moz-focus-inner,.pa-field input[type=range]::-moz-focus-outer{outline:0;border:0;box-shadow:none}.pa-field input[type=range]::-webkit-slider-runnable-track{width:100%;height:6px;cursor:pointer;animate:.2s;background:#2280a0;border-radius:12px;box-shadow:0;border:0;-webkit-appearance:none;-webkit-transition:175ms;transition:175ms}.pa-field input[type=range]::-moz-range-track,.pa-field input[type=range]:active::-moz-range-track{width:100%;height:6px;cursor:pointer;animate:.2s;background:#2280a0;border-radius:6px;box-shadow:0;border:0;-webkit-appearance:none;-webkit-transition:175ms;-moz-transition:175ms;transition:175ms}.pa-field input[type=range]:focus::-webkit-slider-runnable-track{background:#4da4c8}.pa-field input[type=range]:focus::-moz-range-track{background:#4da4c8}.pa-field input[type=range]::-webkit-slider-thumb{box-shadow:0;border:1px solid #4da4c8;height:18px;width:18px;border-radius:50%;background:#fff;cursor:pointer;-webkit-appearance:none;margin-top:-6px;-webkit-transition:175ms;transition:175ms;box-shadow:inset 0 0 0 4.5px #fff,inset 0 0 0 10px #2280a0;animate:175ms}.pa-field input[type=range]::-moz-range-thumb{box-shadow:0;border:1px solid #2280a0;height:16px;width:16px;border-radius:50%;background:#fff;cursor:pointer;-webkit-appearance:none;margin-top:-6px;-webkit-transition:175ms;-moz-transition:175ms;transition:175ms;box-shadow:inset 0 0 0 4.5px #fff,inset 0 0 0 10px #2280a0;animate:175ms}.pa-field input[type=range]:hover::-webkit-slider-thumb{-webkit-transform:scale(1.1,1.1);transform:scale(1.1,1.1);-webkit-transition:175ms;transition:175ms}.pa-field input[type=range]:hover::-moz-range-thumb{transform:scale(1.1,1.1);-webkit-transition:175ms;-moz-transition:175ms;transition:175ms}.pa-field input[type=range]:active::-webkit-slider-thumb,.pa-field input[type=range]:focus::-webkit-slider-thumb{border:1px solid #4da4c8;box-shadow:0 0 0 1px #4da4c8,inset 0 0 0 4.5px #f7f6f5,inset 0 0 0 10px #2280a0;-webkit-transition:175ms;transition:175ms}.pa-field input[type=range]:active::-moz-range-thumb,.pa-field input[type=range]:focus::-moz-range-thumb{border:1px solid #4da4c8;box-shadow:0 0 0 1px #4da4c8,inset 0 0 0 4.5px #f7f6f5,inset 0 0 0 10px #2280a0;-webkit-transition:175ms;-moz-transition:175ms;transition:175ms}"]
        })
    ], SliderComponent);
    return SliderComponent;
}());

var nextId$6 = 0;
var DoubleSliderComponent = /** @class */ (function () {
    function DoubleSliderComponent() {
        this.minRange = 0;
        this.maxRange = 100;
        this.step = 5;
        this.values = [this.minRange, this.maxRange];
        this.isDisabled = false;
        this.valuesChange = new EventEmitter();
        this.thumbWidth = 16;
        this.thumbBorderWidth = 1;
        this.trackHeight = 4;
        this.isDraggingLeft = false;
        this.isDraggingRight = false;
        this.width = 0;
        this.range = 0;
        this.rangeK = 0;
        this.thumbRealWidth = 0;
        this.helpId = '';
    }
    DoubleSliderComponent.prototype.ngAfterViewInit = function () {
        if (!!this.container) {
            this.width = this.container.nativeElement.getBoundingClientRect().width;
        }
        this.initSlider();
        if (!!this.thumbLeft) {
            this.thumbLeft.nativeElement.addEventListener('mousedown', this.startDraggingLeft.bind(this), false);
        }
        if (!!this.thumbRight) {
            this.thumbRight.nativeElement.addEventListener('mousedown', this.startDraggingRight.bind(this), false);
        }
    };
    DoubleSliderComponent.prototype.ngOnInit = function () {
        this.id = !this.id ? "field-double-slider-" + nextId$6++ : this.id + "-double-slider";
        this.helpId = this.id + "-help";
    };
    DoubleSliderComponent.prototype.ngOnChanges = function (changes) {
        if (changes.values && changes.values.currentValue) {
            this.initSlider();
        }
        if (changes.minRange && typeof changes.minRange.currentValue !== 'number') {
            this.minRange = 0;
        }
        if (changes.maxRange && typeof changes.maxRange.currentValue !== 'number') {
            this.maxRange = 100;
        }
        if (changes.step && typeof changes.step.currentValue !== 'number') {
            this.step = 5;
        }
    };
    DoubleSliderComponent.prototype.ngOnDestroy = function () {
        if (!!this.thumbLeft) {
            this.thumbLeft.nativeElement.removeEventListener('mousedown', this.startDraggingLeft, false);
        }
        if (!!this.thumbRight) {
            this.thumbRight.nativeElement.removeEventListener('mousedown', this.startDraggingRight, false);
        }
    };
    DoubleSliderComponent.prototype.initSlider = function () {
        this.range = this.maxRange - this.minRange;
        this.rangeK = this.width / this.range;
        this.thumbRealWidth = this.thumbWidth + 2 * this.thumbBorderWidth;
        if (!!this.slider) {
            this.slider.nativeElement.style.height = this.trackHeight + 'px';
            this.slider.nativeElement.style.width = this.width + 'px';
            this.slider.nativeElement.style.paddingLeft = (this.values[0] - this.minRange) * this.rangeK + 'px';
            this.slider.nativeElement.style.paddingRight = this.width - this.values[1] * this.rangeK + 'px';
        }
        if (!!this.track) {
            this.track.nativeElement.style.width = this.values[1] * this.rangeK - this.values[0] * this.rangeK + 'px';
        }
        if (!!this.thumbLeft) {
            this.initThumb(this.thumbLeft, this.values[0]);
        }
        if (!!this.thumbRight) {
            this.initThumb(this.thumbRight, this.values[1]);
        }
    };
    DoubleSliderComponent.prototype.stopDragging = function () {
        this.isDraggingLeft = false;
        this.isDraggingRight = false;
    };
    DoubleSliderComponent.prototype.mouseUp = function () {
        this.stopDragging();
    };
    DoubleSliderComponent.prototype.mouseLeave = function () {
        this.stopDragging();
    };
    DoubleSliderComponent.prototype.moveThumb = function ($event) {
        if (!this.isDisabled && (this.isDraggingLeft || this.isDraggingRight) &&
            this.container && this.thumbLeft && this.slider && this.track && this.thumbRight) {
            var mousePos = this.oMousePos(this.container.nativeElement, $event);
            var leftValue = (this.isDraggingLeft) ? Math.round(mousePos.x / this.rangeK / this.step) * this.step + this.minRange : this.values[0];
            var rightValue = (this.isDraggingRight) ? Math.round(mousePos.x / this.rangeK / this.step) * this.step + this.minRange : this.values[1];
            if (this.isDraggingLeft) {
                if (leftValue < rightValue - (this.thumbRealWidth / 2) && leftValue >= this.minRange) {
                    this.values[0] = leftValue;
                    this.thumbLeft.nativeElement.style.left = (leftValue - this.minRange) * this.rangeK - (this.thumbRealWidth / 2) + 'px';
                    this.slider.nativeElement.style.paddingLeft = (leftValue - this.minRange) * this.rangeK + 'px';
                    this.track.nativeElement.style.width = (rightValue - leftValue) * this.rangeK + 'px';
                }
            }
            else if (this.isDraggingRight) {
                if (rightValue > leftValue + (this.thumbRealWidth / 2) &&
                    rightValue <= this.maxRange) {
                    this.values[1] = rightValue;
                    this.thumbRight.nativeElement.style.left =
                        (rightValue - this.minRange) * this.rangeK - (this.thumbRealWidth / 2) + 'px';
                    this.slider.nativeElement.style.paddingRight = (this.maxRange - rightValue) * this.rangeK + 'px';
                    this.track.nativeElement.style.width = (rightValue - leftValue) * this.rangeK + 'px';
                }
            }
            this.valuesChange.emit(this.values);
        }
    };
    DoubleSliderComponent.prototype.initThumb = function (thumb, thumbValue) {
        thumb.nativeElement.style.width = thumb.nativeElement.style.height = this.thumbWidth + 'px';
        thumb.nativeElement.style.borderWidth = this.thumbBorderWidth + 'px';
        thumb.nativeElement.style.top = -(this.thumbWidth / 2 + this.thumbBorderWidth - this.trackHeight / 2) + 'px';
        thumb.nativeElement.style.left = (thumbValue - this.minRange) * this.rangeK - (this.thumbRealWidth / 2) + 'px';
    };
    DoubleSliderComponent.prototype.startDraggingLeft = function () {
        this.isDraggingLeft = true;
    };
    DoubleSliderComponent.prototype.startDraggingRight = function () {
        this.isDraggingRight = true;
    };
    DoubleSliderComponent.prototype.oMousePos = function (element, evt) {
        var ClientRect = element.getBoundingClientRect();
        return {
            x: Math.round(evt.clientX - ClientRect.left),
            y: Math.round(evt.clientY - ClientRect.top)
        };
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DoubleSliderComponent.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DoubleSliderComponent.prototype, "help", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DoubleSliderComponent.prototype, "minRange", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DoubleSliderComponent.prototype, "maxRange", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DoubleSliderComponent.prototype, "step", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], DoubleSliderComponent.prototype, "values", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DoubleSliderComponent.prototype, "isDisabled", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DoubleSliderComponent.prototype, "valuesChange", void 0);
    __decorate([
        ViewChild('slider', { static: true }),
        __metadata("design:type", ElementRef)
    ], DoubleSliderComponent.prototype, "slider", void 0);
    __decorate([
        ViewChild('container', { static: true }),
        __metadata("design:type", ElementRef)
    ], DoubleSliderComponent.prototype, "container", void 0);
    __decorate([
        ViewChild('track', { static: true }),
        __metadata("design:type", ElementRef)
    ], DoubleSliderComponent.prototype, "track", void 0);
    __decorate([
        ViewChild('thumbLeft', { static: true }),
        __metadata("design:type", ElementRef)
    ], DoubleSliderComponent.prototype, "thumbLeft", void 0);
    __decorate([
        ViewChild('thumbRight', { static: true }),
        __metadata("design:type", ElementRef)
    ], DoubleSliderComponent.prototype, "thumbRight", void 0);
    __decorate([
        ViewChild('outputLeft'),
        __metadata("design:type", ElementRef)
    ], DoubleSliderComponent.prototype, "outputLeft", void 0);
    __decorate([
        ViewChild('outputRight'),
        __metadata("design:type", ElementRef)
    ], DoubleSliderComponent.prototype, "outputRight", void 0);
    __decorate([
        HostListener('mouseup'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DoubleSliderComponent.prototype, "mouseUp", null);
    __decorate([
        HostListener('mouseleave'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DoubleSliderComponent.prototype, "mouseLeave", null);
    __decorate([
        HostListener('mousemove', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DoubleSliderComponent.prototype, "moveThumb", null);
    DoubleSliderComponent = __decorate([
        Component({
            selector: 'pa-double-slider',
            template: "<div class=\"pa-field pa-field-slider\" [class.disabled]=\"isDisabled\">\n    <label class=\"pa-field-label pa-field-label-range\" [for]=\"id\" translate>\n        <ng-content></ng-content>\n    </label>\n\n    <div class=\"pa-slider-wrapper\">\n        <div class=\"pa-slider-output left\">{{values[0]}}</div>\n        <div #container class=\"pa-slider-container\">\n            <div #slider class=\"pa-slider\">\n                <div #track class=\"pa-slider-track\"></div>\n            </div>\n\n            <div #thumbLeft class=\"pa-slider-thumb\"></div>\n            <div #thumbRight class=\"pa-slider-thumb\"></div>\n        </div>\n        <div class=\"pa-slider-output right\">{{values[1]}}</div>\n    </div>\n\n\n    <small *ngIf=\"help\" class=\"pa-field-help\" [id]=\"helpId\" translate>{{ help }}</small>\n</div>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [":host .pa-field-slider.disabled{opacity:.5}:host .pa-field-slider.disabled .pa-slider,:host .pa-field-slider.disabled .pa-slider-thumb{cursor:not-allowed}:host .pa-slider-wrapper{float:right;position:relative}:host .pa-slider-container{display:inline-block;position:relative;margin:.375rem 42px;height:12px;width:7.5rem}:host .pa-slider{pointer-events:none;margin:0;cursor:pointer;padding-left:30%;padding-right:30%;height:6px;border-radius:50px;background-color:#4da4c8;box-sizing:border-box}:host .pa-slider.focusable{border:1px solid #fff}:host .pa-slider-thumb{cursor:pointer;border:1px solid #4da4c8;width:16px;height:16px;background-color:#fff;border-radius:50%;position:absolute}:host .pa-slider-thumb::after{position:absolute;width:8px;height:8px;background:#2280a0;border-radius:50px;content:\"\";top:4px;left:4px}:host .pa-slider-track{pointer-events:none;height:100%;background-color:#00648d}:host .pa-slider-output{position:absolute;color:#767676;font-weight:300;top:0}:host .pa-slider-output.left{left:0}:host .pa-slider-output.right{right:0}:host .pa-field-help{margin:0}"]
        })
    ], DoubleSliderComponent);
    return DoubleSliderComponent;
}());

var ControlModel = /** @class */ (function () {
    function ControlModel(data) {
        this.id = '';
        this.label = '';
        this.isSelected = false;
        this.isDisabled = false;
        this.isFiltered = false;
        this.isIndeterminate = false;
        this.isExpanded = false;
        this.isHidden = false;
        this.isPrivate = false;
        this.id = data.id || '';
        this.label = data.label || '';
        this.subLabel = data.subLabel || '';
        this.labelIcons = data.labelIcons;
        this.value = data.value || '';
        this.help = data.help || '';
        this.icon = data.icon || '';
        this.isSelected = data.isSelected || false;
        this.isDisabled = data.isDisabled || false;
        this.isFiltered = data.isFiltered || false;
        this.isIndeterminate = data.isIndeterminate || false;
        this.isExpanded = data.isExpanded || false;
        this.isHidden = data.isHidden || false;
        this.isPrivate = data.isPrivate || false;
        this.children = data.children;
        if (!!this.children) {
            this.totalChildren = this.children.length;
            this.selectedChildren = this.children.filter(function (child) { return child.isSelected; }).length;
        }
    }
    return ControlModel;
}());
var LabelIcon = /** @class */ (function () {
    function LabelIcon(data) {
        this.name = data.name;
        this.tooltip = data.tooltip;
    }
    return LabelIcon;
}());

var sortCheckboxes = function (checkboxes) {
    return checkboxes.sort(function (a, b) {
        var aLabel = a.label || '';
        var bLabel = b.label || '';
        return aLabel.toLocaleLowerCase().localeCompare(bLabel.toLocaleLowerCase());
    });
};
var getCheckboxValue = function (checkbox) {
    return checkbox.value || checkbox.id;
};

var nextId$7 = 0;
var CheckboxTreeMode;
(function (CheckboxTreeMode) {
    CheckboxTreeMode["categorized"] = "categorized";
    CheckboxTreeMode["nested"] = "nested";
    CheckboxTreeMode["fileSystem"] = "fileSystem";
})(CheckboxTreeMode || (CheckboxTreeMode = {}));
var CheckboxTreeComponent = /** @class */ (function () {
    function CheckboxTreeComponent(translate, cdr) {
        this.translate = translate;
        this.cdr = cdr;
        this.doLoadChildren = true;
        /**
         * Mode defined checkbox tree global behaviour:
         * - categorized (default):
         *   - emitted selection contains only selected leaf
         *   - selecting a parent automatically select its children
         *   - selecting all children automatically select the parent
         * - nested:
         *   - emitted selection contains all selected nodes
         *   - selecting a parent automatically select its children
         *   - selecting all children automatically select the parent
         * - fileSystem: a parent can have some inner content (like a folder can contain sub-folders but also some files)
         *   - emitted selection contains all selected nodes
         *   - selecting a parent does not select its children
         *   - selecting all children does not select the parent
         *   - a button allow to select/unselect all direct children of node
         */
        this.mode = CheckboxTreeMode.categorized;
        // not meant to be used outside
        this._isChildren = false;
        this.selection = new EventEmitter();
        this.childrenSelection = new EventEmitter();
        this.allSelected = new EventEmitter();
        this.updatedTree = new EventEmitter();
        this.isLoadingChildren = new EventEmitter();
        this._checkboxes = [];
        this._shouldSort = true;
        this._badgeVisible = true;
        this._selectAllVisible = true;
        this._countVisible = false;
        this._disabled = false;
        this.modes = CheckboxTreeMode;
        this.isAllSelected = false;
        this.isAsync = false;
        this.totalCount = 0;
        this.totalSelected = 0;
        this.fileSystemButtonVisibility = {};
        this._isLoadingChildren = false;
        this._disableToggleChildren = false;
    }
    CheckboxTreeComponent_1 = CheckboxTreeComponent;
    Object.defineProperty(CheckboxTreeComponent.prototype, "disabled", {
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxTreeComponent.prototype, "shouldSort", {
        set: function (value) { this._shouldSort = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxTreeComponent.prototype, "badgeVisible", {
        set: function (value) { this._badgeVisible = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxTreeComponent.prototype, "selectAllVisible", {
        set: function (value) { this._selectAllVisible = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxTreeComponent.prototype, "countVisible", {
        set: function (value) {
            this._countVisible = coerceBooleanProperty(value);
            this.updateSelectionCount();
        },
        enumerable: true,
        configurable: true
    });
    CheckboxTreeComponent.prototype.ngOnInit = function () {
        this.id = !this.id ? "fieldset-checkbox-tree-" + nextId$7++ : this.id + "-checkbox-tree";
    };
    CheckboxTreeComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.getChildren) {
            this.isAsync = typeof this.getChildren === 'function';
        }
        if (changes.checkboxes && !!changes.checkboxes.currentValue) {
            var translatedCheckboxes = changes.checkboxes.currentValue.map(function (checkbox) { return new ControlModel(__assign(__assign({}, checkbox), { label: _this.translate.transform(checkbox.label || ''), selectedChildren: _this.getSelectedChildrenCount(checkbox) })); });
            this._checkboxes = this._shouldSort ? sortCheckboxes(translatedCheckboxes) : translatedCheckboxes;
            if (this.doLoadChildren) {
                this.loadChildren();
            }
            this.updateSelectionCount();
            this.updateAllSelected();
            this.computeCheckboxSizes();
            this.emitSelectionChanged();
            markForCheck(this.cdr);
        }
        if (changes.doLoadChildren && changes.doLoadChildren.currentValue === true && !changes.doLoadChildren.previousValue) {
            this.loadChildren();
        }
    };
    CheckboxTreeComponent.prototype.writeValue = function (value) {
        if (!!this._checkboxes) {
            this._checkboxes = this._checkboxes.map(function (checkbox) { return new ControlModel(__assign(__assign({}, checkbox), { isSelected: value === checkbox.value })); });
        }
    };
    CheckboxTreeComponent.prototype.registerOnTouched = function (handler) {
        this.onTouched = handler;
    };
    CheckboxTreeComponent.prototype.registerOnChange = function (handler) {
        this.onChange = handler;
    };
    CheckboxTreeComponent.prototype.toggleSelectAll = function () {
        var _this = this;
        this.isAllSelected = !this.isAllSelected;
        this._checkboxes = this._checkboxes.map(function (checkbox) {
            var updatedCheckbox = new ControlModel(__assign(__assign({}, checkbox), { isSelected: checkbox.isDisabled ? checkbox.isSelected : _this.isAllSelected, isIndeterminate: false, children: _this.getUpdatedChildrenSelection(_this.isAllSelected, checkbox) }));
            updatedCheckbox.selectedChildren = _this.getSelectedChildrenCount(updatedCheckbox);
            return updatedCheckbox;
        });
        this.updateSelectionCount();
        this.emitSelectionChanged();
    };
    CheckboxTreeComponent.prototype.toggleSelection = function (isSelected, checkbox) {
        checkbox.isSelected = isSelected;
        // when file system, we automatically select children, but we don't automatically unselect them
        var shouldUpdateChildren = !!checkbox.children && (isSelected || this.mode !== CheckboxTreeMode.fileSystem);
        if (shouldUpdateChildren) {
            checkbox.children = this.getUpdatedChildrenSelection(isSelected, checkbox);
            checkbox.selectedChildren = this.getSelectedChildrenCount(checkbox);
            markForCheck(this.cdr);
        }
        checkbox.isIndeterminate = this.mode !== CheckboxTreeMode.fileSystem ? false : this.getIndeterminateForFileSystem(checkbox);
        this.updateAllSelected();
        this.emitSelectionChanged();
    };
    CheckboxTreeComponent.prototype.toggleChildrenSelection = function (checkbox) {
        var isSelected = (checkbox.selectedChildren || 0) < (checkbox.totalChildren || 0);
        checkbox.children = this.getUpdatedChildrenSelection(isSelected, checkbox);
        checkbox.selectedChildren = this.getSelectedChildrenCount(checkbox);
        checkbox.isIndeterminate = this.getIndeterminateForFileSystem(checkbox);
        markForCheck(this.cdr);
        this.emitSelectionChanged();
        this.childrenSelection.emit({ parentId: checkbox.id, isSelected: isSelected });
    };
    CheckboxTreeComponent.prototype.getUpdatedChildrenSelection = function (isSelected, checkbox) {
        var _this = this;
        if (!!checkbox.children) {
            return checkbox.children.map(function (child) {
                if (!!child.children) {
                    child.children = _this.getUpdatedChildrenSelection(isSelected, child);
                    child.selectedChildren = _this.getSelectedChildrenCount(child);
                }
                return new ControlModel(__assign(__assign({}, child), { isSelected: isSelected, isIndeterminate: false }));
            });
        }
    };
    CheckboxTreeComponent.prototype.setParentState = function (childrenTree, parent) {
        // copy children state without changing object ref to prevent having an infinite loop of children/parent change detection
        if (!!parent.children) {
            parent.children.forEach(function (child, i) {
                if (!!parent.children && childrenTree[i]) {
                    parent.children[i] = new ControlModel(__assign({}, childrenTree[i]));
                }
            });
        }
        if (this.mode === CheckboxTreeMode.fileSystem) {
            parent.isIndeterminate = this.getIndeterminateForFileSystem(parent);
        }
        else {
            if (childrenTree.every(function (child) { return child.isSelected && !child.isIndeterminate; })) {
                parent.isSelected = true;
                parent.isIndeterminate = false;
            }
            else {
                parent.isIndeterminate = childrenTree.some(function (child) { return child.isSelected || child.isIndeterminate; });
                if (parent.isIndeterminate || childrenTree.every(function (child) { return !child.isSelected; })) {
                    parent.isSelected = false;
                }
            }
        }
        parent.selectedChildren = this.getSelectedChildrenCount(parent);
        this.updateAllSelected();
        this.emitSelectionChanged();
        markForCheck(this.cdr);
    };
    CheckboxTreeComponent.prototype.getIndeterminateForFileSystem = function (parent) {
        var children = parent.children || [];
        var allChildrenSelected = children.every(function (child) { return child.isSelected; });
        var allChildrenUnSelected = children.every(function (child) { return !child.isSelected; });
        return children.some(function (child) { return child.isIndeterminate; })
            || (parent.isSelected && !allChildrenSelected && !allChildrenUnSelected)
            || (!parent.isSelected && children.some(function (child) { return child.isSelected; }));
    };
    CheckboxTreeComponent.prototype.toggleCheckbox = function (checkbox) {
        checkbox.isExpanded = !checkbox.isExpanded;
        this.updatedTree.emit(this._checkboxes);
        markForCheck(this.cdr);
    };
    CheckboxTreeComponent.prototype.getSelectedChildrenCount = function (checkbox) {
        return !!checkbox.children ? checkbox.children.filter(function (child) { return child.isSelected; }).length : 0;
    };
    CheckboxTreeComponent.prototype.updateSelectionCount = function () {
        if (this._countVisible && !!this._checkboxes) {
            this.totalCount = 0;
            this.totalSelected = 0;
            this.countThemAll(this._checkboxes);
            markForCheck(this.cdr);
        }
    };
    CheckboxTreeComponent.prototype.countThemAll = function (controls) {
        var _this = this;
        this.totalCount += controls.length;
        this.totalSelected += controls.filter(function (control) { return !!control.isSelected; }).length;
        controls.forEach(function (control) {
            if (control.children) {
                _this.countThemAll(control.children);
            }
        });
    };
    CheckboxTreeComponent.prototype.emitSelectionChanged = function () {
        this.selection.emit(this.getSelectedValues());
        this.allSelected.emit(this.isAllSelected);
        this.updatedTree.emit(this._checkboxes);
    };
    CheckboxTreeComponent.prototype.getSelectedValues = function () {
        var _this = this;
        var selectedValues = [];
        if (!!this._checkboxes) {
            this._checkboxes.forEach(function (checkbox) { return _this.updateSelectedValues(checkbox, selectedValues); });
        }
        return selectedValues;
    };
    CheckboxTreeComponent.prototype.updateSelectedValues = function (checkbox, selectedValues) {
        var _this = this;
        // by default selection contains only leaf (categorized tree)
        // if nested or fileSystem tree, selection contains all selected nodes
        var isCategorized = this.mode === CheckboxTreeMode.categorized;
        if (checkbox.isSelected && (!isCategorized || !checkbox.children || checkbox.children.length === 0)) {
            selectedValues.push(getCheckboxValue(checkbox));
        }
        if (!!checkbox.children) {
            checkbox.children.forEach(function (child) { return _this.updateSelectedValues(child, selectedValues); });
        }
    };
    CheckboxTreeComponent.prototype.updateAllSelected = function () {
        var _this = this;
        if (!this._isChildren && !!this._checkboxes) {
            this.isAllSelected = this._checkboxes.every(function (checkbox) { return _this.areAllChildrenSelected(checkbox); });
        }
        this.updateSelectionCount();
    };
    CheckboxTreeComponent.prototype.areAllChildrenSelected = function (checkbox) {
        var _this = this;
        return !checkbox.children ? checkbox.isSelected : checkbox.isSelected &&
            checkbox.children.every(function (child) { return _this.areAllChildrenSelected(child); });
    };
    CheckboxTreeComponent.prototype.loadChildren = function () {
        var e_1, _a;
        var _this = this;
        if (this.isAsync && !!this.getChildren && !this._isLoadingChildren) {
            this._isLoadingChildren = true;
            this.isLoadingChildren.emit(this._isLoadingChildren);
            var requests = [];
            var _loop_1 = function (checkbox) {
                if (!!checkbox.children) {
                    return "continue";
                }
                requests.push(this_1.getChildren(checkbox).pipe(tap(function (children) {
                    var selectedChildren = 0;
                    checkbox.children = children.map(function (child) {
                        var updatedChild = new ControlModel(__assign(__assign({}, child), { label: _this.translate.transform(child.label || ''), isSelected: checkbox.isSelected }));
                        if (updatedChild.isSelected) {
                            selectedChildren++;
                        }
                        return updatedChild;
                    });
                    checkbox.totalChildren = children.length;
                    checkbox.selectedChildren = selectedChildren;
                    markForCheck(_this.cdr);
                })));
            };
            var this_1 = this;
            try {
                for (var _b = __values(this._checkboxes), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var checkbox = _c.value;
                    _loop_1(checkbox);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (requests.length === 0) {
                this._isLoadingChildren = false;
                this.isLoadingChildren.emit(this._isLoadingChildren);
            }
            else {
                forkJoin(requests).subscribe(function () {
                    markForCheck(_this.cdr);
                    _this.emitSelectionChanged();
                    _this._isLoadingChildren = false;
                    _this.isLoadingChildren.emit(_this._isLoadingChildren);
                });
            }
        }
        this.updateSelectionCount();
    };
    CheckboxTreeComponent.prototype.onMouseOver = function (checkbox) {
        if (this.mode === CheckboxTreeMode.fileSystem) {
            this.fileSystemButtonVisibility[checkbox.id] = true;
        }
    };
    CheckboxTreeComponent.prototype.onMouseLeave = function (checkbox) {
        if (this.mode === CheckboxTreeMode.fileSystem) {
            var children = checkbox.children || [];
            // keep button visible when checkbox is selected while its children are not
            this.fileSystemButtonVisibility[checkbox.id] = checkbox.isSelected && children.every(function (child) { return !child.isSelected; });
        }
    };
    CheckboxTreeComponent.prototype.computeCheckboxSizes = function () {
        var _this = this;
        setTimeout(function () {
            // FIXME checkbox size wrong after selecting all
            if (_this._badgeVisible && !!_this.checkboxComponents) {
                var badges_1 = _this.badgeComponents || [];
                _this.checkboxComponents.forEach(function (checkboxComponent) {
                    var id = checkboxComponent.id;
                    var checkbox = _this._checkboxes.find(function (item) { return item.id === id; });
                    if (!!checkbox && !!checkbox.totalChildren) {
                        var badge = badges_1.find(function (b) { return b.id === id; });
                        if (!!badge) {
                            var badgeWidth = badge.elementRef.nativeElement.getBoundingClientRect().width;
                            var extraWidth = _this.mode === CheckboxTreeMode.fileSystem ? badgeWidth + 124 : badgeWidth;
                            checkboxComponent.setLabelMaxWidth(extraWidth);
                        }
                    }
                });
            }
        }, 100);
    };
    var CheckboxTreeComponent_1;
    CheckboxTreeComponent.ctorParameters = function () { return [
        { type: TranslatePipe },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CheckboxTreeComponent.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], CheckboxTreeComponent.prototype, "checkboxes", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], CheckboxTreeComponent.prototype, "getChildren", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CheckboxTreeComponent.prototype, "doLoadChildren", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CheckboxTreeComponent.prototype, "disabled", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CheckboxTreeComponent.prototype, "shouldSort", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CheckboxTreeComponent.prototype, "badgeVisible", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CheckboxTreeComponent.prototype, "selectAllVisible", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CheckboxTreeComponent.prototype, "countVisible", null);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CheckboxTreeComponent.prototype, "mode", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CheckboxTreeComponent.prototype, "_isChildren", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CheckboxTreeComponent.prototype, "selection", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CheckboxTreeComponent.prototype, "childrenSelection", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CheckboxTreeComponent.prototype, "allSelected", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CheckboxTreeComponent.prototype, "updatedTree", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CheckboxTreeComponent.prototype, "isLoadingChildren", void 0);
    __decorate([
        ViewChildren(CheckboxComponent),
        __metadata("design:type", QueryList)
    ], CheckboxTreeComponent.prototype, "checkboxComponents", void 0);
    __decorate([
        ViewChildren(BadgeComponent),
        __metadata("design:type", QueryList)
    ], CheckboxTreeComponent.prototype, "badgeComponents", void 0);
    CheckboxTreeComponent = CheckboxTreeComponent_1 = __decorate([
        Component({
            selector: 'pa-checkbox-tree',
            template: "<fieldset class=\"pa-fieldset-group\" [id]=\"id\">\n    <legend [class.pa-sr]=\"_isChildren\" [class.pa-select-all]=\"_selectAllVisible\">\n        <ng-content></ng-content>\n        <pa-badge *ngIf=\"_countVisible\" [isSmall]=\"true\" [isAccented]=\"true\"\n                  [value]=\"totalSelected\" [of]=\"totalCount\"></pa-badge>\n    </legend>\n\n    <pa-button *ngIf=\"!_isChildren && _selectAllVisible\"\n               size=\"small\" class=\"pa-field-button-right\"\n               id=\"checkbox-tree-select-all\"\n               [disabled]=\"_disabled\"\n               [color]=\"isAllSelected ? 'secondary' : 'primary'\"\n               (click)=\"toggleSelectAll()\">\n        {{isAllSelected ? 'common.deselect-all' : 'common.select-all'}}\n    </pa-button>\n\n    <div class=\"pa-field-group\" *ngFor=\"let checkbox of _checkboxes\">\n        <div (mouseover)=\"onMouseOver(checkbox)\"\n             (mouseleave)=\"onMouseLeave(checkbox)\">\n            <pa-button *ngIf=\"(!!checkbox.children && checkbox.children.length > 0) || (!checkbox.children && isAsync)\"\n                       id=\"pa-expand-checkbox-{{checkbox.id}}\"\n                       class=\"pa-expand\"\n                       color=\"secondary\" size=\"small\"\n                       [icon]=\"!checkbox.children ? 'initiating' : 'right-key'\"\n                       [disabled]=\"!checkbox.children || _disabled\"\n                       ariaControls=\"pa-expand-checkbox-{{checkbox.id}}\"\n                       [ariaExpanded]=\"checkbox.isExpanded\"\n                       (click)=\"toggleCheckbox(checkbox)\">\n                {{!checkbox.children ? 'Loading' : !checkbox.isExpanded ? 'Expand' : 'Collapse'}}\n            </pa-button>\n            <pa-checkbox [class.pa-checkbox-expanded]=\"checkbox.isExpanded\"\n                         [id]=\"checkbox.id\"\n                         [icon]=\"checkbox.icon\"\n                         [help]=\"checkbox.help\"\n                         [subLabel]=\"checkbox.subLabel\"\n                         [labelIcons]=\"checkbox.labelIcons\"\n                         [selected]=\"checkbox.isSelected\"\n                         [disabled]=\"checkbox.isDisabled || _disabled\"\n                         [indeterminate]=\"checkbox.isIndeterminate\"\n                         [squareCheck]=\"mode === modes.fileSystem\"\n                         (selection)=\"toggleSelection($event, checkbox)\">{{checkbox.label}}\n            </pa-checkbox>\n\n            <pa-button *ngIf=\"mode === modes.fileSystem && !!checkbox.children && checkbox.children.length > 0\"\n                       size=\"tiny\"\n                       class=\"pa-children-selection-button\"\n                       [disabled]=\"_disableToggleChildren || _disabled\"\n                       [hidden]=\"!fileSystemButtonVisibility[checkbox.id]\"\n                       [color]=\"checkbox.selectedChildren < checkbox.totalChildren ? 'primary' : 'secondary'\"\n                       (click)=\"toggleChildrenSelection(checkbox)\">\n                {{checkbox.selectedChildren < checkbox.totalChildren ? 'checkbox-tree.add-children' : 'checkbox-tree.remove-children'}}\n            </pa-button>\n        </div>\n\n        <output *ngIf=\"_badgeVisible && !!checkbox.children && checkbox.children.length > 0\"\n                [for]=\"checkbox.id\">\n            <pa-badge [id]=\"checkbox.id\" [value]=\"checkbox.selectedChildren\" [of]=\"checkbox.totalChildren\" [isAccented]=\"true\" [isSmall]=\"true\"></pa-badge>\n        </output>\n\n        <div class=\"pa-field-sublist\" role=\"tabpanel\"\n             [attr.aria-labelledby]=\"'pa-expand-checkbox-' + checkbox.id\"\n             [attr.aria-hidden]=\"!checkbox.isExpanded\">\n            <pa-checkbox-tree *ngIf=\"checkbox.isExpanded\"\n                              [id]=\"checkbox.id + '-child'\"\n                              [_isChildren]=\"true\"\n                              [doLoadChildren]=\"checkbox.isExpanded\"\n                              [checkboxes]=\"checkbox.children\"\n                              [getChildren]=\"getChildren\"\n                              [shouldSort]=\"_shouldSort\"\n                              [mode]=\"mode\"\n                              [disabled]=\"_disabled\"\n                              (isLoadingChildren)=\"_disableToggleChildren = $event\"\n                              (updatedTree)=\"setParentState($event, checkbox)\"></pa-checkbox-tree>\n        </div>\n    </div>\n</fieldset>\n\n",
            providers: [{
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return CheckboxTreeComponent_1; }),
                    multi: true,
                }],
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [":host{display:block}:host legend pa-badge{display:inline-block;position:relative;top:.375rem;left:.75rem}:host .pa-field-group{position:relative}:host .pa-field-group ::ng-deep pa-button.pa-expand{display:inherit}:host .pa-field-group ::ng-deep pa-button.pa-expand .pa-button{float:left;margin:-.375rem -2.25rem;-webkit-transform:rotate(0);transform:rotate(0)}:host .pa-field-group ::ng-deep pa-button.pa-expand .pa-button[aria-expanded=true]{-webkit-transform:rotate(90deg);transform:rotate(90deg)}:host .pa-field-group pa-checkbox.pa-checkbox-expanded ::ng-deep .pa-field,:host .pa-field-group>::ng-deep .pa-field-sublist:not(:last-child),:host .pa-field-group>::ng-deep pa-checkbox:not(:last-child) .pa-field{margin-bottom:0}:host .pa-field-group pa-checkbox ::ng-deep .pa-field-checkbox{display:inline-block}:host .pa-field-group .pa-children-selection-button{position:relative;margin:0 .375rem;top:-1px}:host .pa-field-group output{position:absolute;right:-.75rem;top:0}:host .pa-field-sublist{margin-left:30px;padding:0;list-style:none;display:block}:host .pa-field-group:not(:last-child) ::ng-deep pa-checkbox .pa-field.pa-field-checkbox{margin-bottom:0}:host .pa-field-sublist[aria-hidden=true]{display:none}:host .pa-select-all{width:calc(100% - 84px)}"]
        }),
        __metadata("design:paramtypes", [TranslatePipe,
            ChangeDetectorRef])
    ], CheckboxTreeComponent);
    return CheckboxTreeComponent;
}());

var nextId$8 = 0;
var CheckboxGroupComponent = /** @class */ (function () {
    function CheckboxGroupComponent(translate, cdr) {
        this.translate = translate;
        this.cdr = cdr;
        this.type = 'checkbox';
        this.selection = new EventEmitter();
        this._checkboxes = [];
        this._shouldSort = true;
        this._selectAllVisible = true;
        this._countVisible = false;
        this._disabled = false;
        this._isAllSelected = false;
        this.totalCount = 0;
        this.totalSelected = 0;
    }
    Object.defineProperty(CheckboxGroupComponent.prototype, "checkboxes", {
        set: function (value) {
            var _this = this;
            var translatedCheckboxes = value.map(function (checkbox) { return new ControlModel(__assign(__assign({}, checkbox), { label: _this.translate.transform(checkbox.label || '') })); });
            this._checkboxes = this._shouldSort ? sortCheckboxes(translatedCheckboxes) : translatedCheckboxes;
            this._isAllSelected = this._checkboxes.every(function (checkbox) { return checkbox.isSelected; });
            this.totalCount = this._checkboxes.length;
            this.updateSelectionCount();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxGroupComponent.prototype, "disabled", {
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxGroupComponent.prototype, "shouldSort", {
        set: function (value) { this._shouldSort = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxGroupComponent.prototype, "selectAllVisible", {
        set: function (value) { this._selectAllVisible = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxGroupComponent.prototype, "countVisible", {
        set: function (value) { this._countVisible = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxGroupComponent.prototype, "noSelectAll", {
        set: function (value) { this._selectAllVisible = !coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    CheckboxGroupComponent.prototype.ngOnInit = function () {
        this.id = !this.id ? "fieldset-checkbox-group-" + nextId$8++ : this.id + "-checkbox-group";
    };
    CheckboxGroupComponent.prototype.toggleSelection = function (value) {
        if (this.type === 'radio') {
            this._checkboxes = (this._checkboxes || []).map(function (ctl) { return new ControlModel(__assign(__assign({}, ctl), { isSelected: ctl.value === value })); });
        }
        this.updateSelectionCount();
        this.emitSelectionChanged();
    };
    CheckboxGroupComponent.prototype.toggleSelectAll = function () {
        var _this = this;
        this._isAllSelected = !this._isAllSelected;
        this._checkboxes = this._checkboxes.map(function (checkbox) { return new ControlModel(__assign(__assign({}, checkbox), { isSelected: checkbox.isDisabled ? checkbox.isSelected : _this._isAllSelected })); });
        this.updateSelectionCount();
        this.emitSelectionChanged();
    };
    CheckboxGroupComponent.prototype.updateSelectionCount = function () {
        this.totalSelected = (this._checkboxes || []).filter(function (control) { return control.isSelected; }).length;
    };
    CheckboxGroupComponent.prototype.emitSelectionChanged = function () {
        var selectedValues = (this._checkboxes || []).filter(function (control) { return control.isSelected; }).map(function (control) { return getCheckboxValue(control); });
        this.selection.emit(selectedValues);
    };
    CheckboxGroupComponent.ctorParameters = function () { return [
        { type: TranslatePipe },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CheckboxGroupComponent.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CheckboxGroupComponent.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], CheckboxGroupComponent.prototype, "checkboxes", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CheckboxGroupComponent.prototype, "disabled", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CheckboxGroupComponent.prototype, "shouldSort", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CheckboxGroupComponent.prototype, "selectAllVisible", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CheckboxGroupComponent.prototype, "countVisible", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CheckboxGroupComponent.prototype, "noSelectAll", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CheckboxGroupComponent.prototype, "selection", void 0);
    CheckboxGroupComponent = __decorate([
        Component({
            selector: 'pa-checkbox-group',
            template: "<fieldset class=\"pa-fieldset-group\" [id]=\"id\">\n    <legend>\n        <ng-content></ng-content>\n        <pa-badge *ngIf=\"_countVisible\" [isSmall]=\"true\" [isAccented]=\"true\"\n                  [value]=\"totalSelected\" [of]=\"totalCount\"></pa-badge>\n    </legend>\n\n    <pa-button *ngIf=\"type === 'checkbox' && _selectAllVisible\"\n               size=\"small\" class=\"pa-field-button-right\"\n               id=\"checkbox-group-select-all\"\n               [disabled]=\"_disabled\"\n               [color]=\"_isAllSelected ? 'secondary' : 'primary'\"\n               (click)=\"toggleSelectAll()\">\n        {{_isAllSelected ? 'common.deselect-all' : 'common.select-all'}}\n    </pa-button>\n\n    <pa-checkbox *ngFor=\"let checkbox of _checkboxes\"\n                 [type]=\"type\"\n                 [id]=\"checkbox.id\"\n                 [icon]=\"checkbox.icon\"\n                 [help]=\"checkbox.help\"\n                 [subLabel]=\"checkbox.subLabel\"\n                 [labelIcons]=\"checkbox.labelIcons\"\n                 [disabled]=\"checkbox.isDisabled || _disabled\"\n                 [(selected)]=\"checkbox.isSelected\"\n                 (selection)=\"toggleSelection(checkbox.value)\">{{checkbox.label}}\n    </pa-checkbox>\n</fieldset>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [":host{position:relative}:host legend pa-badge{display:inline-block;position:relative;top:.375rem;left:.75rem}"]
        }),
        __metadata("design:paramtypes", [TranslatePipe,
            ChangeDetectorRef])
    ], CheckboxGroupComponent);
    return CheckboxGroupComponent;
}());

var ControlsModule = /** @class */ (function () {
    function ControlsModule() {
    }
    ControlsModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                TranslateModule,
                BadgeModule,
                ButtonModule,
                SvgModule,
                TooltipModule,
            ],
            declarations: [
                CheckboxComponent,
                CheckboxGroupComponent,
                CheckboxTreeComponent,
                DoubleSliderComponent,
                SliderComponent,
                ToggleComponent,
                ToggleGroupComponent,
            ],
            exports: [
                CheckboxComponent,
                CheckboxGroupComponent,
                CheckboxTreeComponent,
                DoubleSliderComponent,
                SliderComponent,
                ToggleComponent,
                ToggleGroupComponent,
            ]
        })
    ], ControlsModule);
    return ControlsModule;
}());

var PastanagaProgressComponent = /** @class */ (function () {
    function PastanagaProgressComponent() {
        this.isSecondary = false;
        this.isSmall = false;
        this.isIndeterminate = false;
        this.percentValue = 0;
    }
    PastanagaProgressComponent.prototype.ngOnInit = function () {
        this.setIsIndeterminate();
    };
    PastanagaProgressComponent.prototype.ngOnChanges = function (changes) {
        if (changes.maxValue && changes.maxValue.currentValue === 0) {
            throw new Error('maxValue cannot be 0');
        }
        if (changes.value && typeof changes.value.currentValue !== 'undefined') {
            this.setIsIndeterminate();
            this.calculatePercentValue();
        }
    };
    PastanagaProgressComponent.prototype.setIsIndeterminate = function () {
        this.isIndeterminate = typeof this.value === 'undefined' || this.value === null;
    };
    PastanagaProgressComponent.prototype.calculatePercentValue = function () {
        if (typeof this.value === 'number') {
            var max = this.maxValue || 100;
            this.percentValue = this.value * 100 / max;
            if (this.value > max) {
                console.error("Progress value is greater than the max value: " + this.value + " > " + max + "!");
            }
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], PastanagaProgressComponent.prototype, "value", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PastanagaProgressComponent.prototype, "isSecondary", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PastanagaProgressComponent.prototype, "isSmall", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], PastanagaProgressComponent.prototype, "maxValue", void 0);
    PastanagaProgressComponent = __decorate([
        Component({
            selector: 'pa-progress',
            template: "<progress *ngIf=\"percentValue\"\n          class=\"pa-progress\"\n          [class.pa-progress-secondary]=\"isSecondary\"\n          [class.pa-progress-small]=\"isSmall\"\n          value=\"{{percentValue}}\"\n          min=\"0\"\n          max=\"100\">\n    <span>{{percentValue}}</span>%\n</progress>\n\n<div *ngIf=\"isIndeterminate\"\n     class=\"pa-progress pa-progress-indeterminate\"\n     [class.pa-progress-secondary]=\"isSecondary\"\n     [class.pa-progress-small]=\"isSmall\"\n     role=\"progressbar\"\n     tabindex=\"0\"\n     aria-valuemin=\"0\"\n     aria-valuetext=\"indeterminate\"\n     aria-valuemax=\"100\"></div>\n\n<div *ngIf=\"!isIndeterminate && value === 0\"\n     class=\"pa-progress pa-progress-buffer\"\n     [class.pa-progress-secondary]=\"isSecondary\"\n     [class.pa-progress-small]=\"isSmall\"\n     role=\"progressbar\"\n     aria-valuenow=\"0\"\n     tabindex=\"0\"\n     aria-valuemin=\"0\"\n     aria-valuetext=\"0 percent\"\n     aria-valuemax=\"100\"></div>\n",
            styles: ["@-webkit-keyframes indeterminate-progress{0%{left:-35%;right:100%}100%,60%{left:100%;right:-90%}}@keyframes indeterminate-progress{0%{left:-35%;right:100%}100%,60%{left:100%;right:-90%}}@-webkit-keyframes indeterminate-progress-back{0%{left:-200%;right:100%}100%,60%{left:107%;right:-8%}}@keyframes indeterminate-progress-back{0%{left:-200%;right:100%}100%,60%{left:107%;right:-8%}}@-webkit-keyframes buffer-progress{0%{background-position:0}40%{background-position:-36px}60%{background-position:-72px}100%{background-position:-360px}}@keyframes buffer-progress{0%{background-position:0}40%{background-position:-36px}60%{background-position:-72px}100%{background-position:-360px}}.pa-progress{display:block;position:relative;width:100%;height:.1875rem;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:.1875rem;overflow:hidden;border:0;background:#dee7e9}.pa-progress.pa-progress-indeterminate,.pa-progress:not([value]):not([aria-valuenow]){background-color:#dee7e9;overflow:hidden}.pa-progress.pa-progress-indeterminate::before,.pa-progress:not([value]):not([aria-valuenow])::before{content:\"\";position:absolute;background-color:#2280a0;top:0;left:0;bottom:0;will-change:left,right;-webkit-animation:2.1s cubic-bezier(.65,.815,.735,.395) infinite indeterminate-progress;animation:2.1s cubic-bezier(.65,.815,.735,.395) infinite indeterminate-progress}.pa-progress.pa-progress-indeterminate::after,.pa-progress:not([value]):not([aria-valuenow])::after{content:\"\";position:absolute;background-color:#2280a0;top:0;left:0;bottom:0;will-change:left,right;-webkit-animation:2.1s cubic-bezier(.165,.84,.44,1) infinite indeterminate-progress-back;animation:2.1s cubic-bezier(.165,.84,.44,1) infinite indeterminate-progress-back;-webkit-animation-delay:1.15s;animation-delay:1.15s;z-index:1}.pa-progress.pa-progress-buffer::after,.pa-progress[aria-valuenow=\"0\"]::after{content:\"\";position:absolute;background-image:url('data:image/svg+xml; utf8, <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"3\" viewBox=\"0 0 12 3\"><circle cx=\"1.5\" cy=\"1.5\" r=\"1.5\" fill=\"%232880a4\" fill-rule=\"evenodd\"/></svg>');background-size:contain;background-color:transparent;top:0;left:0;bottom:0;height:100%;width:100%;will-change:background-position;-webkit-animation:30s cubic-bezier(.65,.815,.735,.395) infinite buffer-progress;animation:30s cubic-bezier(.65,.815,.735,.395) infinite buffer-progress}.pa-progress::-webkit-progress-bar{background:#dee7e9;border-radius:3px}.pa-progress::-webkit-progress-value{background:#2280a0;border-radius:0}.pa-progress::-moz-progress-bar{background:#2280a0;border-radius:0}.pa-progress::-ms-fill{border-radius:0;border:0}.pa-progress-secondary.pa-progress-indeterminate::after,.pa-progress-secondary.pa-progress-indeterminate::before,.pa-progress-secondary:not([value]):not([aria-valuenow]).pa-progress-indeterminate::after,.pa-progress-secondary:not([value]):not([aria-valuenow]).pa-progress-indeterminate::before{background-color:#826a6a}.pa-progress-secondary::-webkit-progress-value{background:#826a6a}.pa-progress-secondary::-moz-progress-bar{background:#826a6a}.pa-progress-secondary.pa-progress-buffer::after,.pa-progress-secondary[aria-valuenow=\"0\"]::after{background-image:url('data:image/svg+xml; utf8, <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"3\" viewBox=\"0 0 12 3\"><circle cx=\"1.5\" cy=\"1.5\" r=\"1.5\" fill=\"%237c7261\" fill-rule=\"evenodd\"/></svg>')}.pa-progress-small{height:1px}"]
        })
    ], PastanagaProgressComponent);
    return PastanagaProgressComponent;
}());

var PastanagaSpinnerComponent = /** @class */ (function () {
    function PastanagaSpinnerComponent() {
        this._small = false;
        this.color = 'primary';
    }
    Object.defineProperty(PastanagaSpinnerComponent.prototype, "small", {
        get: function () { return this._small; },
        set: function (value) { this._small = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    PastanagaSpinnerComponent.prototype.ngOnChanges = function (changes) {
        if (changes.backgroundColor && changes.backgroundColor.currentValue) {
            this.backgroundStyle = { 'background-color': changes.backgroundColor.currentValue };
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PastanagaSpinnerComponent.prototype, "backgroundColor", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PastanagaSpinnerComponent.prototype, "loadingMessage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], PastanagaSpinnerComponent.prototype, "small", null);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PastanagaSpinnerComponent.prototype, "color", void 0);
    PastanagaSpinnerComponent = __decorate([
        Component({
            selector: 'pa-spinner',
            template: "<div *ngIf=\"loadingMessage\" class=\"pa-spinner-message\" translate>{{loadingMessage}}</div>\n<div class=\"pa-progress-circle-spinner\" [class.pa-progress-small]=\"_small\" [class.pa-secondary]=\"color === 'secondary'\">\n    <div [ngStyle]=\"backgroundStyle\" class=\"pa-progress-circle-spinner-wrapper\">Loading\u2026</div>\n</div>\n",
            styles: [":host{display:block;position:relative}:host .pa-spinner-message{position:absolute;top:-24px;width:100%;text-align:center}:host-context(.pa-field-button-group) .pa-progress-circle-spinner.pa-progress-small{margin:10px 8px}.pa-progress-circle-spinner{overflow:hidden;border-radius:500px;color:#edf1f2;font-size:11px;text-indent:-99999em;margin:55px auto;position:relative;width:80px;height:80px;box-shadow:inset 0 0 0 3px;-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-mask:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDgwIDgwIj4gIDxwYXRoIGZpbGw9IiM5Nzk3OTciIGQ9Ik00MCw3NyBDNjAuNDM0NTM1Nyw3NyA3Nyw2MC40MzQ1MzU3IDc3LDQwIEM3NywxOS41NjU0NjQzIDYwLjQzNDUzNTcsMyA0MCwzIEMxOS41NjU0NjQzLDMgMywxOS41NjU0NjQzIDMsNDAgQzMsNjAuNDM0NTM1NyAxOS41NjU0NjQzLDc3IDQwLDc3IFogTTQwLDgwIEMxNy45MDg2MSw4MCAwLDYyLjA5MTM5IDAsNDAgQzAsMTcuOTA4NjEgMTcuOTA4NjEsMCA0MCwwIEM2Mi4wOTEzOSwwIDgwLDE3LjkwODYxIDgwLDQwIEM4MCw2Mi4wOTEzOSA2Mi4wOTEzOSw4MCA0MCw4MCBaIi8+PC9zdmc+);mask:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDgwIDgwIj4gIDxwYXRoIGZpbGw9IiM5Nzk3OTciIGQ9Ik00MCw3NyBDNjAuNDM0NTM1Nyw3NyA3Nyw2MC40MzQ1MzU3IDc3LDQwIEM3NywxOS41NjU0NjQzIDYwLjQzNDUzNTcsMyA0MCwzIEMxOS41NjU0NjQzLDMgMywxOS41NjU0NjQzIDMsNDAgQzMsNjAuNDM0NTM1NyAxOS41NjU0NjQzLDc3IDQwLDc3IFogTTQwLDgwIEMxNy45MDg2MSw4MCAwLDYyLjA5MTM5IDAsNDAgQzAsMTcuOTA4NjEgMTcuOTA4NjEsMCA0MCwwIEM2Mi4wOTEzOSwwIDgwLDE3LjkwODYxIDgwLDQwIEM4MCw2Mi4wOTEzOSA2Mi4wOTEzOSw4MCA0MCw4MCBaIi8+PC9zdmc+)}.pa-progress-circle-spinner::after,.pa-progress-circle-spinner::before{position:absolute;content:\"\"}.pa-progress-circle-spinner::before{width:40px;height:80px;background:#2280a0;border-radius:80px 0 0 80px;-webkit-transform-origin:40px 40px;transform-origin:40px 40px;-webkit-animation:2s 1.5s infinite spinner-circle;animation:2s 1.5s infinite spinner-circle}.pa-progress-circle-spinner::after{width:40px;height:80px;background:#2280a0;border-radius:0 80px 80px 0;left:40px;top:0;-webkit-transform-origin:0 40px;transform-origin:0 40px;-webkit-animation:2s infinite spinner-circle;animation:2s infinite spinner-circle}.pa-progress-circle-spinner.pa-secondary::after,.pa-progress-circle-spinner.pa-secondary::before{background:#826a6a}.pa-progress-circle-spinner-wrapper{background:#fff;position:relative;width:74px;height:74px;top:3px;left:3px;border-radius:500px;z-index:2}.pa-progress-circle-spinner.pa-progress-small{margin:0;width:20px;height:20px;-webkit-mask-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj4gIDxwYXRoIGZpbGw9IiM5Nzk3OTciIGQ9Ik0xMCwxNyBDMTMuODY1OTkzMiwxNyAxNywxMy44NjU5OTMyIDE3LDEwIEMxNyw2LjEzNDAwNjc1IDEzLjg2NTk5MzIsMyAxMCwzIEM2LjEzNDAwNjc1LDMgMyw2LjEzNDAwNjc1IDMsMTAgQzMsMTMuODY1OTkzMiA2LjEzNDAwNjc1LDE3IDEwLDE3IFogTTEwLDIwIEM0LjQ3NzE1MjUsMjAgMCwxNS41MjI4NDc1IDAsMTAgQzAsNC40NzcxNTI1IDQuNDc3MTUyNSwwIDEwLDAgQzE1LjUyMjg0NzUsMCAyMCw0LjQ3NzE1MjUgMjAsMTAgQzIwLDE1LjUyMjg0NzUgMTUuNTIyODQ3NSwyMCAxMCwyMCBaIi8+PC9zdmc+)}.pa-progress-circle-spinner.pa-progress-small::before{width:10px;height:20px;border-radius:20px 0 0 20px;-webkit-transform-origin:10px 10px;transform-origin:10px 10px}.pa-progress-circle-spinner.pa-progress-small::after{width:10px;height:20px;border-radius:0 20px 20px 0;top:0;left:10px;-webkit-transform-origin:0 10px;transform-origin:0 10px}.pa-progress-circle-spinner.pa-progress-small .pa-progress-circle-spinner-wrapper{width:14px;height:14px}@-webkit-keyframes spinner-circle{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spinner-circle{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}"]
        })
    ], PastanagaSpinnerComponent);
    return PastanagaSpinnerComponent;
}());

var PastanagaProgressCircleComponent = /** @class */ (function () {
    function PastanagaProgressCircleComponent() {
        this.isLarge = false;
        this.color = 'primary';
        this.percentValue = 0;
    }
    Object.defineProperty(PastanagaProgressCircleComponent.prototype, "percent", {
        set: function (value) {
            this.percentValue = Math.min(Math.ceil(coerceNumberProperty(value)), 100);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PastanagaProgressCircleComponent.prototype, "isLarge", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], PastanagaProgressCircleComponent.prototype, "percent", null);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PastanagaProgressCircleComponent.prototype, "color", void 0);
    PastanagaProgressCircleComponent = __decorate([
        Component({
            selector: 'pa-progress-circle',
            template: "<div class=\"pa-progress pa-progress-circle\" role=\"progressbar\" tabindex=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\"\n     [attr.aria-valuenow]=\"percentValue\"\n     [class.pa-progress-large]=\"isLarge\"><span class=\"pa-progress-circle-left\"><span class=\"pa-progress-circle-bar\" [class.pa-secondary]=\"color === 'secondary'\"></span></span>\n    <span class=\"pa-progress-circle-right\"><span class=\"pa-progress-circle-bar\" [class.pa-secondary]=\"color === 'secondary'\"></span></span>\n</div>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".pa-progress-circle{width:20px;height:20px;line-height:20px;background:0 0;display:inline-block;box-shadow:none;position:relative;margin:2px}.pa-progress-circle.pa-progress-large{width:80px;height:80px;line-height:80px;margin:8px}.pa-progress-circle:after{content:\"\";width:100%;height:100%;border-radius:50%;border:3px solid #dee7e9;position:absolute;top:0;left:0}.pa-progress-circle>span{width:50%;height:100%;overflow:hidden;position:absolute;top:0;z-index:1}.pa-progress-circle .pa-progress-circle-left{left:0}.pa-progress-circle .pa-progress-circle-bar{width:100%;height:100%;background:0 0;position:absolute;top:0;border:3px solid #2280a0}.pa-progress-circle .pa-progress-circle-bar.pa-secondary{border:3px solid #826a6a}.pa-progress-circle .pa-progress-circle-left .pa-progress-circle-bar{left:100%;border-top-right-radius:10px;border-bottom-right-radius:10px;border-left:0;-webkit-transform-origin:center left;transform-origin:center left}.pa-progress-circle .pa-progress-circle-right{right:0}.pa-progress-circle .pa-progress-circle-right .pa-progress-circle-bar{left:-100%;border-top-left-radius:10px;border-bottom-left-radius:10px;border-right:0;-webkit-transform-origin:center right;transform-origin:center right}.pa-progress-circle.pa-progress-large .pa-progress-circle-left .pa-progress-circle-bar{border-top-right-radius:40px;border-bottom-right-radius:40px}.pa-progress-circle.pa-progress-large .pa-progress-circle-right .pa-progress-circle-bar{border-top-left-radius:40px;border-bottom-left-radius:40px}.pa-progress-circle[aria-valuenow=\"1\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(3.6);transform:rotate(3.6deg)}.pa-progress-circle[aria-valuenow=\"1\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"2\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(7.2);transform:rotate(7.2deg)}.pa-progress-circle[aria-valuenow=\"2\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"3\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(10.8);transform:rotate(10.8deg)}.pa-progress-circle[aria-valuenow=\"3\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"4\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(14.4);transform:rotate(14.4deg)}.pa-progress-circle[aria-valuenow=\"4\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"5\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(18);transform:rotate(18deg)}.pa-progress-circle[aria-valuenow=\"5\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"6\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(21.6);transform:rotate(21.6deg)}.pa-progress-circle[aria-valuenow=\"6\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"7\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(25.2);transform:rotate(25.2deg)}.pa-progress-circle[aria-valuenow=\"7\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"8\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(28.8);transform:rotate(28.8deg)}.pa-progress-circle[aria-valuenow=\"8\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"9\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(32.4);transform:rotate(32.4deg)}.pa-progress-circle[aria-valuenow=\"9\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"10\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(36);transform:rotate(36deg)}.pa-progress-circle[aria-valuenow=\"10\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"11\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(39.6);transform:rotate(39.6deg)}.pa-progress-circle[aria-valuenow=\"11\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"12\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(43.2);transform:rotate(43.2deg)}.pa-progress-circle[aria-valuenow=\"12\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"13\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(46.8);transform:rotate(46.8deg)}.pa-progress-circle[aria-valuenow=\"13\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"14\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(50.4);transform:rotate(50.4deg)}.pa-progress-circle[aria-valuenow=\"14\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"15\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(54);transform:rotate(54deg)}.pa-progress-circle[aria-valuenow=\"15\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"16\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(57.6);transform:rotate(57.6deg)}.pa-progress-circle[aria-valuenow=\"16\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"17\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(61.2);transform:rotate(61.2deg)}.pa-progress-circle[aria-valuenow=\"17\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"18\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(64.8);transform:rotate(64.8deg)}.pa-progress-circle[aria-valuenow=\"18\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"19\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(68.4);transform:rotate(68.4deg)}.pa-progress-circle[aria-valuenow=\"19\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"20\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(72);transform:rotate(72deg)}.pa-progress-circle[aria-valuenow=\"20\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"21\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(75.6);transform:rotate(75.6deg)}.pa-progress-circle[aria-valuenow=\"21\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"22\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(79.2);transform:rotate(79.2deg)}.pa-progress-circle[aria-valuenow=\"22\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"23\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(82.8);transform:rotate(82.8deg)}.pa-progress-circle[aria-valuenow=\"23\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"24\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(86.4);transform:rotate(86.4deg)}.pa-progress-circle[aria-valuenow=\"24\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"25\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(90);transform:rotate(90deg)}.pa-progress-circle[aria-valuenow=\"25\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"26\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(93.6);transform:rotate(93.6deg)}.pa-progress-circle[aria-valuenow=\"26\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"27\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(97.2);transform:rotate(97.2deg)}.pa-progress-circle[aria-valuenow=\"27\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"28\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(100.8);transform:rotate(100.8deg)}.pa-progress-circle[aria-valuenow=\"28\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"29\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(104.4);transform:rotate(104.4deg)}.pa-progress-circle[aria-valuenow=\"29\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"30\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(108);transform:rotate(108deg)}.pa-progress-circle[aria-valuenow=\"30\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"31\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(111.6);transform:rotate(111.6deg)}.pa-progress-circle[aria-valuenow=\"31\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"32\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(115.2);transform:rotate(115.2deg)}.pa-progress-circle[aria-valuenow=\"32\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"33\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(118.8);transform:rotate(118.8deg)}.pa-progress-circle[aria-valuenow=\"33\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"34\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(122.4);transform:rotate(122.4deg)}.pa-progress-circle[aria-valuenow=\"34\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"35\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(126);transform:rotate(126deg)}.pa-progress-circle[aria-valuenow=\"35\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"36\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(129.6);transform:rotate(129.6deg)}.pa-progress-circle[aria-valuenow=\"36\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"37\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(133.2);transform:rotate(133.2deg)}.pa-progress-circle[aria-valuenow=\"37\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"38\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(136.8);transform:rotate(136.8deg)}.pa-progress-circle[aria-valuenow=\"38\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"39\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(140.4);transform:rotate(140.4deg)}.pa-progress-circle[aria-valuenow=\"39\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"40\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(144);transform:rotate(144deg)}.pa-progress-circle[aria-valuenow=\"40\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"41\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(147.6);transform:rotate(147.6deg)}.pa-progress-circle[aria-valuenow=\"41\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"42\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(151.2);transform:rotate(151.2deg)}.pa-progress-circle[aria-valuenow=\"42\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"43\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(154.8);transform:rotate(154.8deg)}.pa-progress-circle[aria-valuenow=\"43\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"44\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(158.4);transform:rotate(158.4deg)}.pa-progress-circle[aria-valuenow=\"44\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"45\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(162);transform:rotate(162deg)}.pa-progress-circle[aria-valuenow=\"45\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"46\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(165.6);transform:rotate(165.6deg)}.pa-progress-circle[aria-valuenow=\"46\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"47\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(169.2);transform:rotate(169.2deg)}.pa-progress-circle[aria-valuenow=\"47\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"48\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(172.8);transform:rotate(172.8deg)}.pa-progress-circle[aria-valuenow=\"48\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"49\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(176.4);transform:rotate(176.4deg)}.pa-progress-circle[aria-valuenow=\"49\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"50\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"50\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(0);transform:rotate(0)}.pa-progress-circle[aria-valuenow=\"51\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"51\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(3.6);transform:rotate(3.6deg)}.pa-progress-circle[aria-valuenow=\"52\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"52\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(7.2);transform:rotate(7.2deg)}.pa-progress-circle[aria-valuenow=\"53\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"53\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(10.8);transform:rotate(10.8deg)}.pa-progress-circle[aria-valuenow=\"54\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"54\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(14.4);transform:rotate(14.4deg)}.pa-progress-circle[aria-valuenow=\"55\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"55\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(18);transform:rotate(18deg)}.pa-progress-circle[aria-valuenow=\"56\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"56\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(21.6);transform:rotate(21.6deg)}.pa-progress-circle[aria-valuenow=\"57\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"57\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(25.2);transform:rotate(25.2deg)}.pa-progress-circle[aria-valuenow=\"58\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"58\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(28.8);transform:rotate(28.8deg)}.pa-progress-circle[aria-valuenow=\"59\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"59\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(32.4);transform:rotate(32.4deg)}.pa-progress-circle[aria-valuenow=\"60\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"60\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(36);transform:rotate(36deg)}.pa-progress-circle[aria-valuenow=\"61\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"61\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(39.6);transform:rotate(39.6deg)}.pa-progress-circle[aria-valuenow=\"62\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"62\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(43.2);transform:rotate(43.2deg)}.pa-progress-circle[aria-valuenow=\"63\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"63\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(46.8);transform:rotate(46.8deg)}.pa-progress-circle[aria-valuenow=\"64\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"64\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(50.4);transform:rotate(50.4deg)}.pa-progress-circle[aria-valuenow=\"65\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"65\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(54);transform:rotate(54deg)}.pa-progress-circle[aria-valuenow=\"66\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"66\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(57.6);transform:rotate(57.6deg)}.pa-progress-circle[aria-valuenow=\"67\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"67\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(61.2);transform:rotate(61.2deg)}.pa-progress-circle[aria-valuenow=\"68\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"68\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(64.8);transform:rotate(64.8deg)}.pa-progress-circle[aria-valuenow=\"69\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"69\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(68.4);transform:rotate(68.4deg)}.pa-progress-circle[aria-valuenow=\"70\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"70\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(72);transform:rotate(72deg)}.pa-progress-circle[aria-valuenow=\"71\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"71\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(75.6);transform:rotate(75.6deg)}.pa-progress-circle[aria-valuenow=\"72\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"72\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(79.2);transform:rotate(79.2deg)}.pa-progress-circle[aria-valuenow=\"73\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"73\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(82.8);transform:rotate(82.8deg)}.pa-progress-circle[aria-valuenow=\"74\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"74\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(86.4);transform:rotate(86.4deg)}.pa-progress-circle[aria-valuenow=\"75\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"75\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(90);transform:rotate(90deg)}.pa-progress-circle[aria-valuenow=\"76\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"76\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(93.6);transform:rotate(93.6deg)}.pa-progress-circle[aria-valuenow=\"77\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"77\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(97.2);transform:rotate(97.2deg)}.pa-progress-circle[aria-valuenow=\"78\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"78\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(100.8);transform:rotate(100.8deg)}.pa-progress-circle[aria-valuenow=\"79\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"79\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(104.4);transform:rotate(104.4deg)}.pa-progress-circle[aria-valuenow=\"80\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"80\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(108);transform:rotate(108deg)}.pa-progress-circle[aria-valuenow=\"81\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"81\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(111.6);transform:rotate(111.6deg)}.pa-progress-circle[aria-valuenow=\"82\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"82\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(115.2);transform:rotate(115.2deg)}.pa-progress-circle[aria-valuenow=\"83\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"83\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(118.8);transform:rotate(118.8deg)}.pa-progress-circle[aria-valuenow=\"84\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"84\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(122.4);transform:rotate(122.4deg)}.pa-progress-circle[aria-valuenow=\"85\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"85\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(126);transform:rotate(126deg)}.pa-progress-circle[aria-valuenow=\"86\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"86\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(129.6);transform:rotate(129.6deg)}.pa-progress-circle[aria-valuenow=\"87\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"87\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(133.2);transform:rotate(133.2deg)}.pa-progress-circle[aria-valuenow=\"88\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"88\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(136.8);transform:rotate(136.8deg)}.pa-progress-circle[aria-valuenow=\"89\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"89\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(140.4);transform:rotate(140.4deg)}.pa-progress-circle[aria-valuenow=\"90\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"90\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(144);transform:rotate(144deg)}.pa-progress-circle[aria-valuenow=\"91\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"91\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(147.6);transform:rotate(147.6deg)}.pa-progress-circle[aria-valuenow=\"92\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"92\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(151.2);transform:rotate(151.2deg)}.pa-progress-circle[aria-valuenow=\"93\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"93\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(154.8);transform:rotate(154.8deg)}.pa-progress-circle[aria-valuenow=\"94\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"94\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(158.4);transform:rotate(158.4deg)}.pa-progress-circle[aria-valuenow=\"95\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"95\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(162);transform:rotate(162deg)}.pa-progress-circle[aria-valuenow=\"96\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"96\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(165.6);transform:rotate(165.6deg)}.pa-progress-circle[aria-valuenow=\"97\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"97\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(169.2);transform:rotate(169.2deg)}.pa-progress-circle[aria-valuenow=\"98\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"98\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(172.8);transform:rotate(172.8deg)}.pa-progress-circle[aria-valuenow=\"99\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"99\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(176.4);transform:rotate(176.4deg)}.pa-progress-circle[aria-valuenow=\"100\"] .pa-progress-circle-right .pa-progress-circle-bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-progress-circle[aria-valuenow=\"100\"] .pa-progress-circle-left .pa-progress-circle-bar{-webkit-transform:rotate(180);transform:rotate(180deg)}@-webkit-keyframes loading-1{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(3.6);transform:rotate(3.6deg)}}@keyframes loading-1{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(3.6);transform:rotate(3.6deg)}}@-webkit-keyframes loading-2{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(7.2);transform:rotate(7.2deg)}}@keyframes loading-2{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(7.2);transform:rotate(7.2deg)}}@-webkit-keyframes loading-3{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(10.8);transform:rotate(10.8deg)}}@keyframes loading-3{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(10.8);transform:rotate(10.8deg)}}@-webkit-keyframes loading-4{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(14.4);transform:rotate(14.4deg)}}@keyframes loading-4{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(14.4);transform:rotate(14.4deg)}}@-webkit-keyframes loading-5{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(18);transform:rotate(18deg)}}@keyframes loading-5{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(18);transform:rotate(18deg)}}@-webkit-keyframes loading-6{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(21.6);transform:rotate(21.6deg)}}@keyframes loading-6{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(21.6);transform:rotate(21.6deg)}}@-webkit-keyframes loading-7{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(25.2);transform:rotate(25.2deg)}}@keyframes loading-7{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(25.2);transform:rotate(25.2deg)}}@-webkit-keyframes loading-8{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(28.8);transform:rotate(28.8deg)}}@keyframes loading-8{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(28.8);transform:rotate(28.8deg)}}@-webkit-keyframes loading-9{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(32.4);transform:rotate(32.4deg)}}@keyframes loading-9{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(32.4);transform:rotate(32.4deg)}}@-webkit-keyframes loading-10{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(36);transform:rotate(36deg)}}@keyframes loading-10{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(36);transform:rotate(36deg)}}@-webkit-keyframes loading-11{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(39.6);transform:rotate(39.6deg)}}@keyframes loading-11{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(39.6);transform:rotate(39.6deg)}}@-webkit-keyframes loading-12{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(43.2);transform:rotate(43.2deg)}}@keyframes loading-12{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(43.2);transform:rotate(43.2deg)}}@-webkit-keyframes loading-13{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(46.8);transform:rotate(46.8deg)}}@keyframes loading-13{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(46.8);transform:rotate(46.8deg)}}@-webkit-keyframes loading-14{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(50.4);transform:rotate(50.4deg)}}@keyframes loading-14{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(50.4);transform:rotate(50.4deg)}}@-webkit-keyframes loading-15{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(54);transform:rotate(54deg)}}@keyframes loading-15{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(54);transform:rotate(54deg)}}@-webkit-keyframes loading-16{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(57.6);transform:rotate(57.6deg)}}@keyframes loading-16{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(57.6);transform:rotate(57.6deg)}}@-webkit-keyframes loading-17{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(61.2);transform:rotate(61.2deg)}}@keyframes loading-17{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(61.2);transform:rotate(61.2deg)}}@-webkit-keyframes loading-18{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(64.8);transform:rotate(64.8deg)}}@keyframes loading-18{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(64.8);transform:rotate(64.8deg)}}@-webkit-keyframes loading-19{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(68.4);transform:rotate(68.4deg)}}@keyframes loading-19{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(68.4);transform:rotate(68.4deg)}}@-webkit-keyframes loading-20{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(72);transform:rotate(72deg)}}@keyframes loading-20{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(72);transform:rotate(72deg)}}@-webkit-keyframes loading-21{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(75.6);transform:rotate(75.6deg)}}@keyframes loading-21{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(75.6);transform:rotate(75.6deg)}}@-webkit-keyframes loading-22{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(79.2);transform:rotate(79.2deg)}}@keyframes loading-22{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(79.2);transform:rotate(79.2deg)}}@-webkit-keyframes loading-23{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(82.8);transform:rotate(82.8deg)}}@keyframes loading-23{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(82.8);transform:rotate(82.8deg)}}@-webkit-keyframes loading-24{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(86.4);transform:rotate(86.4deg)}}@keyframes loading-24{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(86.4);transform:rotate(86.4deg)}}@-webkit-keyframes loading-25{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(90);transform:rotate(90deg)}}@keyframes loading-25{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(90);transform:rotate(90deg)}}@-webkit-keyframes loading-26{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(93.6);transform:rotate(93.6deg)}}@keyframes loading-26{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(93.6);transform:rotate(93.6deg)}}@-webkit-keyframes loading-27{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(97.2);transform:rotate(97.2deg)}}@keyframes loading-27{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(97.2);transform:rotate(97.2deg)}}@-webkit-keyframes loading-28{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(100.8);transform:rotate(100.8deg)}}@keyframes loading-28{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(100.8);transform:rotate(100.8deg)}}@-webkit-keyframes loading-29{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(104.4);transform:rotate(104.4deg)}}@keyframes loading-29{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(104.4);transform:rotate(104.4deg)}}@-webkit-keyframes loading-30{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(108);transform:rotate(108deg)}}@keyframes loading-30{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(108);transform:rotate(108deg)}}@-webkit-keyframes loading-31{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(111.6);transform:rotate(111.6deg)}}@keyframes loading-31{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(111.6);transform:rotate(111.6deg)}}@-webkit-keyframes loading-32{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(115.2);transform:rotate(115.2deg)}}@keyframes loading-32{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(115.2);transform:rotate(115.2deg)}}@-webkit-keyframes loading-33{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(118.8);transform:rotate(118.8deg)}}@keyframes loading-33{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(118.8);transform:rotate(118.8deg)}}@-webkit-keyframes loading-34{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(122.4);transform:rotate(122.4deg)}}@keyframes loading-34{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(122.4);transform:rotate(122.4deg)}}@-webkit-keyframes loading-35{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(126);transform:rotate(126deg)}}@keyframes loading-35{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(126);transform:rotate(126deg)}}@-webkit-keyframes loading-36{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(129.6);transform:rotate(129.6deg)}}@keyframes loading-36{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(129.6);transform:rotate(129.6deg)}}@-webkit-keyframes loading-37{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(133.2);transform:rotate(133.2deg)}}@keyframes loading-37{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(133.2);transform:rotate(133.2deg)}}@-webkit-keyframes loading-38{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(136.8);transform:rotate(136.8deg)}}@keyframes loading-38{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(136.8);transform:rotate(136.8deg)}}@-webkit-keyframes loading-39{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(140.4);transform:rotate(140.4deg)}}@keyframes loading-39{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(140.4);transform:rotate(140.4deg)}}@-webkit-keyframes loading-40{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(144);transform:rotate(144deg)}}@keyframes loading-40{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(144);transform:rotate(144deg)}}@-webkit-keyframes loading-41{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(147.6);transform:rotate(147.6deg)}}@keyframes loading-41{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(147.6);transform:rotate(147.6deg)}}@-webkit-keyframes loading-42{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(151.2);transform:rotate(151.2deg)}}@keyframes loading-42{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(151.2);transform:rotate(151.2deg)}}@-webkit-keyframes loading-43{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(154.8);transform:rotate(154.8deg)}}@keyframes loading-43{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(154.8);transform:rotate(154.8deg)}}@-webkit-keyframes loading-44{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(158.4);transform:rotate(158.4deg)}}@keyframes loading-44{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(158.4);transform:rotate(158.4deg)}}@-webkit-keyframes loading-45{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(162);transform:rotate(162deg)}}@keyframes loading-45{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(162);transform:rotate(162deg)}}@-webkit-keyframes loading-46{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(165.6);transform:rotate(165.6deg)}}@keyframes loading-46{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(165.6);transform:rotate(165.6deg)}}@-webkit-keyframes loading-47{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(169.2);transform:rotate(169.2deg)}}@keyframes loading-47{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(169.2);transform:rotate(169.2deg)}}@-webkit-keyframes loading-48{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(172.8);transform:rotate(172.8deg)}}@keyframes loading-48{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(172.8);transform:rotate(172.8deg)}}@-webkit-keyframes loading-49{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(176.4);transform:rotate(176.4deg)}}@keyframes loading-49{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(176.4);transform:rotate(176.4deg)}}@-webkit-keyframes loading-50{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(180);transform:rotate(180deg)}}@keyframes loading-50{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(180);transform:rotate(180deg)}}"]
        })
    ], PastanagaProgressCircleComponent);
    return PastanagaProgressCircleComponent;
}());

var COMPONENT_LIST = [PastanagaProgressComponent, PastanagaSpinnerComponent, PastanagaProgressCircleComponent];
var ProgressModule = /** @class */ (function () {
    function ProgressModule() {
    }
    ProgressModule = __decorate([
        NgModule({
            imports: [CommonModule, TranslateModule],
            exports: COMPONENT_LIST,
            declarations: COMPONENT_LIST,
        })
    ], ProgressModule);
    return ProgressModule;
}());

var keyCodes = {
    enter: 13,
    esc: 27,
    tab: 9,
};
var mouseCodes = {
    left: 0,
};

var nextId$9 = 0;
var TextfieldCommon = /** @class */ (function () {
    function TextfieldCommon() {
        var _this = this;
        this.value = '';
        this.debounceDuration = 500;
        this.valueChange = new EventEmitter();
        this.instantValueChange = new EventEmitter();
        this.keyUp = new EventEmitter();
        this.keyPress = new EventEmitter();
        this.enter = new EventEmitter();
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        this._required = false;
        this._disabled = false;
        this._readOnly = false;
        this._labelHidden = false;
        this._placeholderShown = false;
        this._isLessen = false;
        this._accent = false;
        this.helpId = '';
        this.hasError = false;
        this.errors = {
            required: false,
            pattern: false,
        };
        this.baseId = '';
        this.type = '';
        this.debouncer = new Subject();
        this.terminator = new Subject();
        this.debouncer.pipe(takeUntil(this.terminator), debounceTime(this.debounceDuration)).subscribe(function (value) { return _this.valueChange.emit(value); });
    }
    Object.defineProperty(TextfieldCommon.prototype, "required", {
        get: function () { return this._required; },
        set: function (value) { this._required = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextfieldCommon.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextfieldCommon.prototype, "isReadOnly", {
        get: function () { return this._readOnly; },
        set: function (value) { this._readOnly = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextfieldCommon.prototype, "isLabelHidden", {
        get: function () { return this._labelHidden; },
        set: function (value) { this._labelHidden = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextfieldCommon.prototype, "isPlaceholderShown", {
        get: function () { return this._placeholderShown; },
        set: function (value) { this._placeholderShown = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextfieldCommon.prototype, "isLessen", {
        get: function () { return this._isLessen; },
        set: function (value) { this._isLessen = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextfieldCommon.prototype, "accent", {
        get: function () { return this._accent; },
        set: function (value) { this._accent = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    TextfieldCommon.prototype.ngOnInit = function () {
        this.id = !!this.id ? this.id + "-input" : this.baseId + "-" + nextId$9++;
        this.name = this.name || this.id;
        if (!!this.help) {
            this.helpId = this.id + "-help";
        }
    };
    TextfieldCommon.prototype.ngOnDestroy = function () {
        this.terminator.next();
    };
    TextfieldCommon.prototype.change = function (value) {
        this._validate(value);
        this.writeValue(value);
        if (!!this.onChange) {
            this.onChange(value);
        }
        if (!!this.onTouched) {
            this.onTouched(value);
        }
    };
    TextfieldCommon.prototype.onKeyUp = function ($event) {
        if ($event.keyCode !== keyCodes.tab) {
            var value = $event.target.value;
            this._validate(value);
            this.writeValue(value);
            this.keyUp.emit(value);
            if (!!this.onChange) {
                this.onChange(value);
            }
            if ($event.keyCode === keyCodes.enter) {
                this.enter.emit({ event: $event, value: value });
            }
        }
    };
    TextfieldCommon.prototype.onBlur = function () {
        this._validate(this.value);
        this.validate({});
        this.blur.emit(this.value);
    };
    TextfieldCommon.prototype._validate = function (value) {
        if (this._required) {
            this.errors.required = !value && value !== 0;
        }
        if (!!this.pattern && typeof value === 'string') {
            this.errors.pattern = !!value && !this.pattern.test(value);
        }
        if ((!!value || typeof value === 'number') && this.type === 'number') {
            var numVal = typeof value === 'number' ? value : parseFloat(value);
            if (typeof this.min === 'number') {
                this.errors.min = numVal < this.min;
            }
            if (typeof this.max === 'number') {
                this.errors.max = numVal > this.max;
            }
        }
    };
    TextfieldCommon.prototype.validate = function (control) {
        if (!this.errors.required && !this.errors.pattern && !this.errors.min && !this.errors.max) {
            this.hasError = false;
            return null;
        }
        var errors = {};
        if (this.errors.required) {
            errors.required = { valid: false };
        }
        if (this.errors.pattern) {
            errors.pattern = { valid: false };
        }
        if (this.errors.min) {
            errors.min = { valid: false };
        }
        if (this.errors.max) {
            errors.max = { valid: false };
        }
        this.hasError = true;
        return errors;
    };
    TextfieldCommon.prototype.writeValue = function (value) {
        this.value = value;
        this.instantValueChange.emit(value);
        this.debouncer.next(value);
    };
    TextfieldCommon.prototype.registerOnTouched = function (handler) {
        this.onTouched = handler;
    };
    TextfieldCommon.prototype.registerOnChange = function (handler) {
        this.onChange = handler;
    };
    TextfieldCommon.prototype.setDisabledState = function (disabled) {
        this._disabled = disabled;
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TextfieldCommon.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TextfieldCommon.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextfieldCommon.prototype, "value", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TextfieldCommon.prototype, "errorHelp", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TextfieldCommon.prototype, "errorMessage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TextfieldCommon.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TextfieldCommon.prototype, "help", void 0);
    __decorate([
        Input(),
        __metadata("design:type", RegExp)
    ], TextfieldCommon.prototype, "pattern", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TextfieldCommon.prototype, "min", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TextfieldCommon.prototype, "max", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], TextfieldCommon.prototype, "required", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], TextfieldCommon.prototype, "disabled", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], TextfieldCommon.prototype, "isReadOnly", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], TextfieldCommon.prototype, "isLabelHidden", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], TextfieldCommon.prototype, "isPlaceholderShown", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], TextfieldCommon.prototype, "isLessen", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], TextfieldCommon.prototype, "accent", null);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextfieldCommon.prototype, "debounceDuration", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TextfieldCommon.prototype, "valueChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TextfieldCommon.prototype, "instantValueChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TextfieldCommon.prototype, "keyUp", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TextfieldCommon.prototype, "keyPress", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TextfieldCommon.prototype, "enter", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TextfieldCommon.prototype, "blur", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TextfieldCommon.prototype, "focus", void 0);
    TextfieldCommon = __decorate([
        Directive(),
        __metadata("design:paramtypes", [])
    ], TextfieldCommon);
    return TextfieldCommon;
}());

var HTML_TAG = new RegExp(/.?<.+>/g);
var REPLACE_LT_GT = new RegExp(/[<>]/g);
var InputComponent = /** @class */ (function (_super) {
    __extends(InputComponent, _super);
    function InputComponent(_platform, ngZone, _autofillMonitor, _parentForm, _parentFormGroup, cdr) {
        var _this = _super.call(this) || this;
        _this._platform = _platform;
        _this.ngZone = ngZone;
        _this._autofillMonitor = _autofillMonitor;
        _this._parentForm = _parentForm;
        _this._parentFormGroup = _parentFormGroup;
        _this.cdr = cdr;
        _this.type = 'text';
        _this.errorList = new EventEmitter();
        _this._hasFocus = false;
        _this._acceptHtmlTags = false;
        _this._noAutoComplete = false;
        _this.autofilled = false;
        _this.baseId = 'input';
        _this.valueChange.pipe(takeUntil(_this.terminator)).subscribe(function () { return detectChanges(_this.cdr); });
        return _this;
    }
    InputComponent_1 = InputComponent;
    Object.defineProperty(InputComponent.prototype, "hasFocus", {
        get: function () { return this._hasFocus; },
        set: function (value) { this._hasFocus = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputComponent.prototype, "acceptHtmlTags", {
        get: function () { return this._acceptHtmlTags; },
        set: function (value) { this._acceptHtmlTags = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputComponent.prototype, "noAutoComplete", {
        get: function () { return this._noAutoComplete; },
        set: function (value) { this._noAutoComplete = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    InputComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        if (!!this.help) {
            this.helpId = this.id + "-help";
        }
    };
    InputComponent.prototype.ngAfterViewChecked = function () {
        var _this = this;
        if (this._platform.isBrowser && !!this.input) {
            this._autofillMonitor
                .monitor(this.input.nativeElement)
                .subscribe(function (event) {
                _this.autofilled = event.isAutofilled;
            });
        }
        if (this._platform.IOS && !!this.input) {
            var input_1 = this.input;
            this.ngZone.runOutsideAngular(function () {
                input_1.nativeElement.addEventListener('keyup', function (event) {
                    var el = event.target;
                    if (!el.value &&
                        !el.selectionStart &&
                        !el.selectionEnd) {
                        // Note: Just setting `0, 0` doesn't fix the issue. Setting
                        // `1, 1` fixes it for the first time that you type text and
                        // then hold delete. Toggling to `1, 1` and then back to
                        // `0, 0` seems to completely fix it.
                        el.setSelectionRange(1, 1);
                        el.setSelectionRange(0, 0);
                    }
                });
            });
        }
        if (this._hasFocus && !!this.input) {
            this.input.nativeElement.focus();
        }
    };
    InputComponent.prototype.ngOnDestroy = function () {
        this.terminator.next();
        if (this._platform.isBrowser && !!this.input) {
            this._autofillMonitor.stopMonitoring(this.input.nativeElement);
        }
    };
    InputComponent.prototype._validate = function (value) {
        _super.prototype._validate.call(this, value);
        this.errorList.emit(this.errors);
    };
    InputComponent.prototype.writeValue = function (value) {
        if (!!value && typeof (value) === 'string' && !this._acceptHtmlTags && value.match(HTML_TAG)) {
            value = value.replace(REPLACE_LT_GT, '');
        }
        _super.prototype.writeValue.call(this, value);
    };
    InputComponent.prototype.reset = function () {
        if (!!this.input) {
            this.input.nativeElement.value = '';
            this.value = '';
        }
    };
    var InputComponent_1;
    InputComponent.ctorParameters = function () { return [
        { type: Platform },
        { type: NgZone },
        { type: AutofillMonitor },
        { type: NgForm, decorators: [{ type: Optional }] },
        { type: FormGroupDirective, decorators: [{ type: Optional }] },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], InputComponent.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], InputComponent.prototype, "maxCharacters", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], InputComponent.prototype, "hasFocus", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], InputComponent.prototype, "acceptHtmlTags", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], InputComponent.prototype, "noAutoComplete", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], InputComponent.prototype, "errorList", void 0);
    __decorate([
        ViewChild('dataInput', { static: true }),
        __metadata("design:type", ElementRef)
    ], InputComponent.prototype, "input", void 0);
    InputComponent = InputComponent_1 = __decorate([
        Component({
            selector: 'pa-input',
            template: "<div [class]=\"'pa-field pa-field-'+ type\"\n     [class.pa-field-error]=\"hasError || !!errorMessage\"\n     [class.pa-accent]=\"_accent\">\n    <input #dataInput class=\"pa-field-control\"\n           [class.pa-field-control-filled]=\"!!value || value === 0\"\n           [class.pa-field-control-readonly-lessen]=\"_readOnly && _isLessen\"\n           [class.pa-field-control-lessen]=\"_isLessen && !_readOnly\"\n           [class.pa-field-control-placeholder-shown]=\"_placeholderShown\"\n           [type]=\"type\"\n           [id]=\"id\"\n           [attr.aria-describedby]=\"helpId\"\n           [attr.placeholder]=\"(placeholder || '') | translate\"\n           [value]=\"!!value || value === 0 ? value : ''\"\n           [readonly]=\"_readOnly\"\n           [disabled]=\"_disabled\"\n           [required]=\"_required\"\n           [attr.autocomplete]=\"_noAutoComplete ? 'off' : undefined\"\n           [attr.maxlength] = \"maxCharacters\"\n           (change)=\"change($event.target.value)\"\n           (keyup)=\"onKeyUp($event)\"\n           (blur)=\"onBlur()\"\n           (focus)=\"focus.emit($event)\"\n    >\n    <label class=\"pa-field-label\" [for]=\"id\" [class.pa-sr]=\"isLabelHidden\" translate><ng-content></ng-content></label>\n    <small *ngIf=\"hasError && errorHelp\" class=\"pa-field-help pa-field-help-error\">{{ errorHelp | translate }}</small>\n    <small *ngIf=\"!!errorMessage\" class=\"pa-field-help pa-field-help-error\">{{ errorMessage | translate }}</small>\n    <small *ngIf=\"help\" class=\"pa-field-help\" [id]=\"helpId\" [innerHtml]=\"help | translate\"></small>\n</div>\n",
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return InputComponent_1; }),
                    multi: true,
                },
                {
                    provide: NG_VALIDATORS,
                    useExisting: forwardRef(function () { return InputComponent_1; }),
                    multi: true,
                },
            ],
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [":host-context(.pa-field-button-group){flex-basis:100%}:host-context(.pa-field-button-group) input{padding-right:3rem!important}.pa-field.pa-field-number .pa-field-control{-moz-appearance:textfield}.pa-field.pa-field-number .pa-field-control::-webkit-inner-spin-button,.pa-field.pa-field-number .pa-field-control::-webkit-outer-spin-button{-webkit-appearance:none;width:2em;position:absolute;top:0;right:.375rem;bottom:0}.pa-field.pa-field-number .pa-field-control:active::-webkit-inner-spin-button,.pa-field.pa-field-number .pa-field-control:focus::-webkit-inner-spin-button{background:url('data:image/svg+xml; utf8, <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"10\" height=\"18\" viewBox=\"0 0 10 18\"><g fill=\"none\" fill-rule=\"evenodd\" transform=\"translate(-4 -6)\"><g transform=\"translate(0 12)\"><polygon fill=\"%23535353\" points=\"4.5 7.707 5.207 7 8.854 10.646 12.5 7 13.207 7.707 8.854 12.06\"/></g><g transform=\"rotate(-180 9 9)\"><polygon fill=\"%23636363\" points=\"5 7.707 5.707 7 9.354 10.646 13 7 13.707 7.707 9.354 12.06\"/></g></g></svg>') center center/10px 1.125rem no-repeat}input[type=number]{-moz-appearance:textfield}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;width:2em;position:absolute;top:0;right:.375rem;bottom:0}input[type=number]:active::-webkit-inner-spin-button,input[type=number]:focus::-webkit-inner-spin-button{background:url('data:image/svg+xml; utf8, <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"10\" height=\"18\" viewBox=\"0 0 10 18\"><g fill=\"none\" fill-rule=\"evenodd\" transform=\"translate(-4 -6)\"><g transform=\"translate(0 12)\"><polygon fill=\"%23535353\" points=\"4.5 7.707 5.207 7 8.854 10.646 12.5 7 13.207 7.707 8.854 12.06\"/></g><g transform=\"rotate(-180 9 9)\"><polygon fill=\"%23636363\" points=\"5 7.707 5.707 7 9.354 10.646 13 7 13.707 7.707 9.354 12.06\"/></g></g></svg>') center center/10px 1.125rem no-repeat}"]
        }),
        __param(3, Optional()),
        __param(4, Optional()),
        __metadata("design:paramtypes", [Platform,
            NgZone,
            AutofillMonitor,
            NgForm,
            FormGroupDirective,
            ChangeDetectorRef])
    ], InputComponent);
    return InputComponent;
}(TextfieldCommon));

var nextId$a = 0;
var SelectComponent = /** @class */ (function () {
    function SelectComponent(element) {
        this.element = element;
        this.disabled = false;
        this.required = false;
        this.isLabelHidden = false;
        this.isLessen = false;
        this.onSelection = new EventEmitter();
        this.valueChange = new EventEmitter();
        this.helpId = '';
        this.hasNoSelection = false;
        this.isPlaceHolderSelected = false;
        this.hasError = false;
    }
    SelectComponent_1 = SelectComponent;
    SelectComponent.prototype.ngOnInit = function () {
        this.id = !this.id ? "select-" + nextId$a++ : this.id + "-select";
        this.name = this.name || this.id;
        if (this.help) {
            this.helpId = this.id + "-help";
        }
    };
    SelectComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            if (!!_this.value) {
                _this.element.nativeElement.querySelector('select').value = _this.value;
                _this.isPlaceHolderSelected = _this.value === '__PLACEHOLDER__';
            }
            else if (!!_this.placeholder) {
                _this.element.nativeElement.querySelector('select').value = '__PLACEHOLDER__';
                _this.isPlaceHolderSelected = true;
            }
            else {
                var firstOption = _this.element.nativeElement.querySelector('option:first-child');
                var noOptionSelected = _this.element.nativeElement.querySelectorAll('option:checked').length === 0;
                _this.hasNoSelection = noOptionSelected && !!firstOption && !firstOption.innerText;
            }
        }, 0);
    };
    SelectComponent.prototype.writeValue = function (value) {
        this.value = value;
        if (this.element.nativeElement) {
            this.element.nativeElement.querySelector('select').value = this.value;
        }
        this.valueChange.emit(value);
    };
    SelectComponent.prototype.registerOnTouched = function (handler) {
        this.onTouched = handler;
    };
    SelectComponent.prototype.registerOnChange = function (handler) {
        this.onChange = handler;
    };
    SelectComponent.prototype.change = function (value) {
        this.value = value;
        this.isPlaceHolderSelected = value === '__PLACEHOLDER__';
        this.valueChange.emit(value);
        this.onSelection.emit(value);
        if (this.onChange) {
            this.onChange(value);
        }
        if (this.onTouched) {
            this.onTouched(value);
        }
    };
    SelectComponent.prototype.setDisabledState = function (disabled) {
        this.disabled = disabled;
    };
    SelectComponent.prototype.validate = function (control) {
        if (!this.required || this.value) {
            this.hasError = false;
            return null;
        }
        else {
            this.hasError = true;
            return { required: { valid: false } };
        }
    };
    var SelectComponent_1;
    SelectComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectComponent.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectComponent.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectComponent.prototype, "value", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectComponent.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectComponent.prototype, "help", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectComponent.prototype, "errorHelp", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectComponent.prototype, "errorMessage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectComponent.prototype, "disabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectComponent.prototype, "required", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectComponent.prototype, "isLabelHidden", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectComponent.prototype, "isLessen", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SelectComponent.prototype, "onSelection", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SelectComponent.prototype, "valueChange", void 0);
    SelectComponent = SelectComponent_1 = __decorate([
        Component({
            selector: 'pa-select',
            template: "<div class=\"pa-field pa-field-select\" [class.pa-field-error]=\"hasError || !!errorMessage\">\n    <select class=\"pa-field-control\" [id]=\"id\" [attr.disabled]=\"disabled ? true : null\"\n            [class.pa-field-control-lessen]=\"isLessen\"\n            [required]=\"required\"\n            [attr.aria-describedby]=\"helpId\" [attr.placeholder]=\"placeholder | translate\"\n            (change)=\"change($event.target.value)\">\n        <option *ngIf=\"placeholder\" class=\"pa-hide\" disabled [selected]=\"hasNoSelection\">{{ placeholder | translate }}</option>\n        <ng-content></ng-content>\n    </select>\n    <label class=\"pa-field-label\"\n           [for]=\"id\"><span translate\n                            [class.pa-sr]=\"isLabelHidden\">{{ label }}</span></label>\n    <small *ngIf=\"hasError && errorHelp\" class=\"pa-field-help pa-field-help-error\">{{ errorHelp | translate }}</small>\n    <small *ngIf=\"!!errorMessage\" class=\"pa-field-help pa-field-help-error\">{{ errorMessage | translate }}</small>\n    <small *ngIf=\"help\" class=\"pa-field-help\" [id]=\"helpId\">{{ help | translate }}</small>\n</div>\n",
            providers: [{
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return SelectComponent_1; }),
                    multi: true,
                }, {
                    provide: NG_VALIDATORS,
                    useExisting: forwardRef(function () { return SelectComponent_1; }),
                    multi: true,
                }],
            styles: [".pa-field-select .pa-field-control{background-image:url('data:image/svg+xml; utf8, <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"36\" height=\"36\" viewBox=\"0 0 36 36\"><polygon fill=\"%23949494\" fill-rule=\"evenodd\" points=\"9.293 14.707 10.707 13.293 18 20.586 25.293 13.293 26.707 14.707 18 23.414\"/></svg>');background-position:calc(100% - .375rem) center;background-repeat:no-repeat;background-size:1.5rem 1.5rem}.pa-field-select .pa-field-control.pa-field-control-accent{background-color:rgba(34,128,160,.06);box-shadow:0 200px 0 -200px #00719e;-webkit-transition:.5s;transition:.5s}.pa-field-select .pa-field-control:hover{cursor:pointer;box-shadow:0 2px 0 -1px #00719e}.pa-field-select .pa-field-control:active,.pa-field-select .pa-field-control:focus{box-shadow:0 2px 0 0 #4da4c8;background-color:rgba(34,128,160,.12)}.pa-field-select .pa-field-control.pa-field-control-lessen{padding-right:1.875rem!important}"]
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], SelectComponent);
    return SelectComponent;
}());

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

var PasswordRule = /** @class */ (function () {
    function PasswordRule(data) {
        this.id = data.id;
        this.label = data.label;
        this.regexp = data.regexp;
        this.length = data.length;
        this.isValid = !!data.isValid;
    }
    return PasswordRule;
}());

var rulesRegexp = {
    lowerCase: new RegExp(/[a-z]/),
    upperCase: new RegExp(/[A-Z]/),
    number: new RegExp(/[0-9]/),
    specialCharacter: new RegExp(/[^\da-zA-Z]/),
};
var PasswordInputComponent = /** @class */ (function () {
    function PasswordInputComponent() {
        this.id = '';
        this.placeholder = '';
        this._withRules = false;
        this._required = false;
        this._disabled = false;
        this.valueChange = new EventEmitter();
        this.password = '';
        this.errorMessage = '';
        this.iconName = 'show';
        this.isVisible = false;
        this.type = 'password';
        this.rules = [
            new PasswordRule({ id: 'length', length: 10, label: 'password-input.rule-list.length' }),
            new PasswordRule({ id: 'upper', regexp: rulesRegexp.upperCase, label: 'password-input.rule-list.upper' }),
            new PasswordRule({ id: 'lower', regexp: rulesRegexp.lowerCase, label: 'password-input.rule-list.lower' }),
            new PasswordRule({ id: 'number', regexp: rulesRegexp.number, label: 'password-input.rule-list.number' }),
            new PasswordRule({ id: 'special', regexp: rulesRegexp.specialCharacter, label: 'password-input.rule-list.special' }),
        ];
        this.debounceEmitter = 0;
    }
    Object.defineProperty(PasswordInputComponent.prototype, "value", {
        set: function (value) {
            if (!!value) {
                this.password = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PasswordInputComponent.prototype, "withRules", {
        get: function () { return this._withRules; },
        set: function (value) { this._withRules = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PasswordInputComponent.prototype, "required", {
        get: function () { return this._required; },
        set: function (value) { this._required = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PasswordInputComponent.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    PasswordInputComponent.prototype.togglePasswordVisibility = function () {
        this.isVisible = !this.isVisible;
        this.iconName = this.isVisible ? 'hide' : 'show';
        this.type = this.isVisible ? 'text' : 'password';
    };
    /**
     * rules:
     *  - at least 10 characters
     *  - at least 1 lowercase
     *  - at least 1 uppercase
     *  - at least 1 number
     *  - at least 1 special character
     */
    PasswordInputComponent.prototype.checkPasswordStrength = function ($event) {
        var _this = this;
        if (!$event.target) {
            return;
        }
        if (this.debounceEmitter) {
            clearInterval(this.debounceEmitter);
        }
        var password = $event.target.value;
        var allValid = true;
        this.errorMessage = '';
        if (this._withRules) {
            this.rules.forEach(function (rule) {
                if (typeof rule.length === 'number') {
                    rule.isValid = password.length >= rule.length;
                }
                else if (rule.regexp instanceof RegExp) {
                    rule.isValid = password.match(rule.regexp) !== null;
                }
                if (!rule.isValid) {
                    allValid = false;
                }
            });
        }
        this.debounceEmitter = window.setTimeout(function () {
            if (allValid) {
                _this.password = password;
                _this.valueChange.emit(password);
            }
            else {
                _this.valueChange.emit('');
                _this.errorMessage = 'password-input.invalid-password';
            }
        }, 500);
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PasswordInputComponent.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PasswordInputComponent.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], PasswordInputComponent.prototype, "value", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], PasswordInputComponent.prototype, "withRules", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], PasswordInputComponent.prototype, "required", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], PasswordInputComponent.prototype, "disabled", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], PasswordInputComponent.prototype, "valueChange", void 0);
    PasswordInputComponent = __decorate([
        Component({
            selector: 'pa-password-input',
            template: "<pa-input-icon [iconName]=\"iconName\" [iconTooltip]=\"isVisible ? 'password-input.hide' : 'password-input.show'\" iconColor=\"secondary\" (iconClick)=\"togglePasswordVisibility()\">\n    <pa-input [id]=\"id\" [type]=\"type\" [placeholder]=\"placeholder\" acceptHtmlTags\n              [required]=\"required\"\n              [disabled]=\"disabled\"\n              [value]=\"password\"\n              [errorMessage]=\"errorMessage\"\n              (keyup)=\"checkPasswordStrength($event)\"><ng-content></ng-content></pa-input>\n</pa-input-icon>\n\n<div *ngIf=\"withRules\">\n    <legend translate>password-input.rule-list.legend</legend>\n    <ul>\n        <li *ngFor=\"let rule of rules\" [class.pa-rule-checked]=\"rule.isValid\" translate>\n            <div class=\"pa-rule-disc\"><pa-icon *ngIf=\"rule.isValid\" name=\"check\"></pa-icon></div>\n            {{rule.label}}\n        </li>\n    </ul>\n</div>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: ["legend{margin-bottom:.1875rem}ul{list-style:none}ul li{color:#535353;font-size:calc(.875rem * 12/14)}ul li .pa-rule-disc{display:inline-block;background:#b8c6c8;border-radius:50%;margin-left:-1.5rem;margin-right:2px}ul li.pa-rule-checked{color:#949494}ul li.pa-rule-checked .pa-rule-disc{background:#44da21}ul li.pa-rule-checked pa-icon ::ng-deep svg{fill:#fff;position:absolute}"]
        })
    ], PasswordInputComponent);
    return PasswordInputComponent;
}());

var InputIconComponent = /** @class */ (function () {
    function InputIconComponent() {
        this.iconColor = 'primary';
        this._disabled = false;
        this.iconClick = new EventEmitter();
    }
    Object.defineProperty(InputIconComponent.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    InputIconComponent.prototype.onIconClick = function (event) {
        this.iconClick.emit(event);
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], InputIconComponent.prototype, "iconName", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], InputIconComponent.prototype, "iconTooltip", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], InputIconComponent.prototype, "iconColor", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], InputIconComponent.prototype, "disabled", null);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], InputIconComponent.prototype, "iconClick", void 0);
    InputIconComponent = __decorate([
        Component({
            selector: 'pa-input-icon',
            template: "<div class=\"pa-field-button-group\">\n    <ng-content></ng-content>\n    <div class=\"pa-field\">\n        <pa-button *ngIf=\"iconName !== 'spinner'; else showSpinner\"\n                   size=\"small\"\n                   [icon]=\"iconName\"\n                   [color]=\"iconColor\"\n                   [disabled]=\"_disabled\"\n                   [paTooltip]=\"iconTooltip\" paTooltipType=\"action\"\n                   (click)=\"onIconClick($event)\"></pa-button>\n        <ng-template #showSpinner><pa-spinner small color=\"secondary\"></pa-spinner></ng-template>\n    </div>\n</div>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".pa-field-button-group{display:-webkit-box;display:flex;position:relative}.pa-field-button-group>.pa-field:not(:first-child){position:absolute;right:0;margin-bottom:0;padding:.375rem 0}.pa-field-button-group ::ng-deep pa-input{width:100%}"]
        })
    ], InputIconComponent);
    return InputIconComponent;
}());

var TextFieldModule = /** @class */ (function () {
    function TextFieldModule() {
    }
    TextFieldModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                TranslateModule,
                SvgModule,
                ButtonModule,
                TooltipModule,
                ProgressModule,
            ],
            declarations: [
                InputComponent,
                InputIconComponent,
                SelectComponent,
                TextareaComponent,
                PasswordInputComponent,
            ],
            exports: [
                InputComponent,
                InputIconComponent,
                SelectComponent,
                TextareaComponent,
                PasswordInputComponent,
            ],
        })
    ], TextFieldModule);
    return TextFieldModule;
}());

var ToastModel = /** @class */ (function () {
    function ToastModel(data) {
        // Avoids error when input is null
        data = data ? data : {};
        this.key = data.key;
        this.message = data.message;
        this.delay = typeof data.delay === 'number' ? data.delay : 5000; // dismiss after 5s by default
        this.icon = data.icon;
        this.buttons = data.buttons || [];
        this.closeable = data.closeable;
        this.translateParams = data.translateParams;
        this.style = data.style;
        this.componentFactory = data.componentFactory;
        this.componentData = data.componentData;
        if (this.buttons.length > 0) {
            this.onClick = new BehaviorSubject('');
        }
    }
    return ToastModel;
}());
var ToastButtonModel = /** @class */ (function () {
    function ToastButtonModel(data) {
        // Avoids error when input is null
        data = data ? data : {};
        this.id = data.id || data.text || data.icon;
        this.text = data.text;
        this.color = data.color || ToastButtonModel.PRIMARY;
        this.icon = data.icon;
        this.tooltip = data.tooltip;
    }
    ToastButtonModel.PRIMARY = 'primary';
    ToastButtonModel.SECONDARY = 'secondary';
    ToastButtonModel.DESTRUCTIVE = 'destructive';
    return ToastButtonModel;
}());
var getToastCloseButton = function () {
    return new ToastButtonModel({ icon: 'clear', color: 'secondary', tooltip: 'common.close', text: 'common.close' });
};

var ARIA_KEY = 'pa-aria-';
var DELAY = 5000;
var HAS_LINK = /.*(\[(.+)\|(.+)\]).*/g;
var ToastComponent = /** @class */ (function () {
    function ToastComponent() {
        this.dismiss = new EventEmitter();
        this.ariaLabeledBy = '';
        this.parsedMessage = '';
        this.isSibling = false;
        this.isDismissed = false;
    }
    ToastComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!!this.toast) {
            // If no button was defined, we need to add a delay if it was set to zero.
            var hasDelay = (this.toast.delay && this.toast.delay > 0) || !this.toast.buttons.length;
            this.ariaLabeledBy = ARIA_KEY + this.toast.key;
            if (hasDelay) {
                var delay = this.toast.delay || DELAY;
                setTimeout(function () { return _this.dismiss.emit({ toast: _this.toast }); }, delay);
            }
            // Parse the toast message to check for embedded links
            this.parseMessage(this.toast.message);
        }
        if (!!this.toastContainer) {
            this.toastContainer.nativeElement.focus();
        }
    };
    ToastComponent.prototype.handleDismiss = function (button) {
        this.isDismissed = true;
        this.dismiss.emit({ toast: this.toast, button: button });
    };
    ToastComponent.prototype.parseMessage = function (message) {
        var parsedText = '';
        var match;
        while ((match = HAS_LINK.exec(message)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (match.index === HAS_LINK.lastIndex) {
                HAS_LINK.lastIndex++;
            }
            if (match.length === 4) {
                parsedText = message.replace(match[1], this.getLink(match[2], match[3]));
            }
        }
        if (parsedText) {
            this.parsedMessage = parsedText;
        }
    };
    ToastComponent.prototype.getLink = function (link, url) {
        return '<a class="pa-button pa-button-link" tabindex="0" href="' + url +
            '"> <span class="pa-button-wrapper" tabindex="-1">' + link + ' </span></a>';
    };
    ToastComponent.prototype.dismissWithESC = function ($event) {
        // Only 'closeable' buttons can be dismissed with ESC
        if (!this.toast || !this.toast.closeable) {
            return;
        }
        if ($event.which === keyCodes.esc || $event.keyCode === keyCodes.esc) {
            this.handleDismiss();
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", ToastModel)
    ], ToastComponent.prototype, "toast", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ToastComponent.prototype, "dismiss", void 0);
    __decorate([
        ViewChild('toastContainer', { static: true }),
        __metadata("design:type", ElementRef)
    ], ToastComponent.prototype, "toastContainer", void 0);
    ToastComponent = __decorate([
        Component({
            selector: 'pa-toast',
            template: "<div class=\"pa-toast in\" [class.is-sibling]=\"isSibling\" [class.out]=\"isDismissed\" role=\"status\" aria-live=\"polite\"\n     attr.aria-labelledby=\"{{ariaLabeledBy}}\" #toastContainer tabindex=\"-1\" (keyup)=\"dismissWithESC($event)\">\n\n    <header class=\"pa-toast-header\">\n        <h2 class=\"pa-toast-title\" [id]=\"!parsedMessage ? ariaLabeledBy : null\">\n            <!-- Leading icon -->\n            <pa-icon *ngIf=\"!!toast && !!toast.icon\" [name]=\"toast.icon\" [hidden]=\"true\"></pa-icon>\n\n            <div *ngIf=\"parsedMessage\" [innerHTML]=\"parsedMessage\" [id]=\"parsedMessage ? ariaLabeledBy : null\"></div>\n            <ng-container *ngIf=\"!parsedMessage && !!toast\">\n                {{toast.message | translate:toast.translateParams}}\n            </ng-container>\n        </h2>\n    </header>\n    <footer class=\"pa-toast-footer\" *ngIf=\"!!toast && toast.buttons.length > 0\">\n        <div class=\"pa-toast-footer-wrapper\">\n            <!-- Customized buttons -->\n            <ng-container *ngIf=\"!!toast && toast.buttons.length > 0\">\n                <pa-button *ngFor=\"let button of toast.buttons; let i = index\"\n                           [color]=\"button.color\"\n                           [icon]=\"button.icon\"\n                           [paTooltip]=\"button.tooltip\"\n                           tabindex=\"{{i}}\"\n                           (click)=\"handleDismiss(button.text)\">\n                    <span translate>{{button.text}}</span>\n                </pa-button>\n            </ng-container>\n        </div>\n    </footer>\n</div>\n",
            styles: [".pa-toast{box-shadow:0 8px 36px 0 rgba(0,0,0,.15),0 4px 12px 0 rgba(0,0,0,.1);border-radius:3px;margin:auto;max-width:33.75rem;background:rgba(247,246,245,.975);display:-webkit-box;display:flex;-webkit-box-flex:1;flex:1 1 0%;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-flow:row nowrap;place-content:stretch flex-start;-webkit-box-align:stretch;align-items:stretch;z-index:10060}@supports (-webkit-backdrop-filter:blur(9px)){.pa-toast{background:rgba(247,246,245,.9);-webkit-backdrop-filter:blur(9px)}}.pa-toast-header{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;width:100%;flex-basis:100%}.pa-toast-title{font-size:calc(.875rem * 15/14);line-height:1.3125rem;letter-spacing:0;font-weight:400;margin:0;padding:1.5rem 1.875rem;color:#3a3a3a}.pa-toast-title>svg{width:1.5rem;height:1.5rem;fill:#717171;vertical-align:middle;margin:-.1875rem .375rem -.1875rem -.375rem;line-height:0}.pa-toast a{font-weight:700}.pa-toast-footer{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;width:100%;flex-basis:0}.pa-toast-footer-wrapper{padding:.75rem .375rem;white-space:nowrap}.pa-toast.primary{background:#2280a0}.pa-toast.primary .pa-toast-title{color:#fff}.pa-toast.primary .pa-toast-title ::ng-deep svg{fill:#fff}.pa-toast.pa-expanded{border-bottom-left-radius:unset;border-bottom-right-radius:unset}.pa-toast-panel{background:#fff;box-shadow:0 8px 36px 0 rgba(0,0,0,.15),0 4px 12px 0 rgba(0,0,0,.1);padding:1.125rem}.pa-toast-panel.is-sibling,.pa-toast.is-sibling:not(.pa-expanded){margin-bottom:1.125rem}@-webkit-keyframes toast-in{0%{opacity:0;-webkit-transform:translateY(120%);transform:translateY(120%)}90%{opacity:0;-webkit-transform:translateY(-5%);transform:translateY(-5%)}100%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes toast-in{0%{opacity:0;-webkit-transform:translateY(120%);transform:translateY(120%)}90%{opacity:0;-webkit-transform:translateY(-5%);transform:translateY(-5%)}100%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes toast-in-content{0%,25%{opacity:0;-webkit-transform:translateY(.75rem);transform:translateY(.75rem)}100%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes toast-in-content{0%,25%{opacity:0;-webkit-transform:translateY(.75rem);transform:translateY(.75rem)}100%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes toast-out{from{opacity:1;-webkit-transform:scale(1);transform:scale(1);-webkit-filter:blur(0);filter:blur(0)}to{opacity:0;-webkit-transform:scale(0);transform:scale(0);-webkit-filter:blur(5rem);filter:blur(5rem)}}@keyframes toast-out{from{opacity:1;-webkit-transform:scale(1);transform:scale(1);-webkit-filter:blur(0);filter:blur(0)}to{opacity:0;-webkit-transform:scale(0);transform:scale(0);-webkit-filter:blur(5rem);filter:blur(5rem)}}@-webkit-keyframes toast-out-content{0%{opacity:1;-webkit-transform:translateY(.75rem);transform:translateY(.75rem)}25%{opacity:0;-webkit-transform:translateY(.75rem);transform:translateY(.75rem)}100%{opacity:0;-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes toast-out-content{0%{opacity:1;-webkit-transform:translateY(.75rem);transform:translateY(.75rem)}25%{opacity:0;-webkit-transform:translateY(.75rem);transform:translateY(.75rem)}100%{opacity:0;-webkit-transform:translateY(0);transform:translateY(0)}}.pa-toast.in{-webkit-animation-name:toast-in;animation-name:toast-in;-webkit-animation-duration:.75s;animation-duration:.75s;-webkit-animation-iteration-count:1;animation-iteration-count:1}.pa-toast.in .pa-toast-footer,.pa-toast.in .pa-toast-header{-webkit-animation-name:toast-in-content;animation-name:toast-in-content;-webkit-animation-duration:1.25s;animation-duration:1.25s;-webkit-animation-iteration-count:1;animation-iteration-count:1}.pa-toast.out{-webkit-animation-name:toast-out;animation-name:toast-out;-webkit-animation-duration:.75s;animation-duration:.75s;-webkit-animation-iteration-count:1;animation-iteration-count:1}.pa-toast.out .pa-toast-footer,.pa-toast.out .pa-toast-header{-webkit-animation-name:toast-out-content;animation-name:toast-out-content;-webkit-animation-duration:1.25s;animation-duration:1.25s;-webkit-animation-iteration-count:1;animation-iteration-count:1}:host ::ng-deep .pa-toast-title>pa-icon>svg{width:1.5rem;height:1.5rem;fill:#717171;vertical-align:middle;margin:-.375rem .375rem -.1875rem -.375rem;line-height:0}"]
        }),
        __metadata("design:paramtypes", [])
    ], ToastComponent);
    return ToastComponent;
}());

var ToasterModule = /** @class */ (function () {
    function ToasterModule() {
    }
    ToasterModule = __decorate([
        NgModule({
            imports: [CommonModule, TranslateModule, TooltipModule, ButtonModule, SvgModule],
            exports: [ToastComponent],
            declarations: [ToastComponent],
            entryComponents: [ToastComponent],
        })
    ], ToasterModule);
    return ToasterModule;
}());

/**
 *   -----------------------
 *   How to use Toaster:
 *   -----------------------
 *
 *   // --------------------- //
 *   // Global configuration. //
 *   // --------------------- //
 *
 *   // We need to define the toast holder for our application.
 *   @ViewChild('onnaToastsBlock', { read: ViewContainerRef }) toastsContainer: ViewContainerRef;
 *
 *   // Import the Toaster in the component that will hold our toast messages.
 *   constructor(private toaster: Toaster){}
 *
 *   // And register the toast container in Toaster.
 *   this.toaster.registerContainer(this.toastsContainer);
 *
 *   // Now, every toast will be injected into our 'onnaToastsBlock'.
 *
 *
 *
 *   // ------------------------ //
 *   // Display a toast message. //
 *   // ------------------------ //
 *
 *   // Displaying a message is very simple (it will be auto-dismissible and cannot be closed by the user)
 *   this.toaster.open('Quick toast');
 *
 *   // If we want to make it closeable (it will display a X button to dismiss it and it will be also auto-dismissible)
 *   this.toaster.open('Quick toast with Close button', true);
 *
 *   // We can specify a particular text for the dismiss button (also auto-dismissible)
 *   this.toaster.open('Quick toast with "Dismiss" button', 'Dismiss');
 *
 *   // To force a manual dismiss we need to set a delay of 0
 *   this.toaster.open('Quick toast with "Dismiss" button', 'Dismiss', 0);
 *
 *   // We can also set a custom delay for our toast (either with or without buttons)
 *   this.toaster.open('Quick toast with long delay', 20000);            // 20s. delay || No button
 *   this.toaster.open('Quick toast with long delay', true, 20000);      // 20s. delay || 'X' button
 *   this.toaster.open('Quick toast with long delay', 'Dismiss', 20000); // 20s. delay || 'Dismiss' button
 *
 *
 *   // --------------------- //
 *   // Customize your toast. //
 *   // --------------------- //
 *
 *   // ----------------------------------------------------------------------------------
 *   // We can create custom buttons to dismiss or handle user interactions with our toast
 *
 *   const confirmButton: ToastButtonModel = new ToastButtonModel({text: 'Confirm'}); // Primary color by default.
 *   const dismissButton: ToastButtonModel = new ToastButtonModel({text: 'Dismiss', color: ToastButtonModel.PRIMARY});
 *   const undoButton: ToastButtonModel = new ToastButtonModel({text: 'Undo', color: ToastButtonModel.SECONDARY});
 *   const destroyButton: ToastButtonModel = new ToastButtonModel({text: 'Destroy', color: ToastButtonModel.DESTRUCTIVE});
 *
 *
 *   const t1 = new ToastModel({message: 'Auto-dismissible toast'});
 *   const t2 = new ToastModel({message: 'A toast with a dismiss button', buttons: [dismissButton]}); // Manual dismiss
 *   const t3 = new ToastModel({message: 'With a manual close button but auto-dismissible anyways', closeable: true});
 *   const t4 = new ToastModel({message: 'I\'m auto-dismissible... but it will take me longer', delay: 10000});
 *
 *   const t5 = new ToastModel({message: 'Auto-dismissible with custom buttons',
 *                             buttons: [confirmButton],
 *                             delay: 5000});
 *
 *   const t6 = new ToastModel({ message: 'A toast with two buttons', buttons: [undoButton, destroyButton]});
 *
 *   // -------------------------------------------------------------------------------------------
 *   // You can add links (anchors) to the message if you follow this markup "[link-text|link-url]"
 *
 *   const t7 = new ToastModel({ message: 'A toast with a [Google|https://www.google.es] link'});
 *
 *
 *   // ---------------------------------------------------------------
 *   // To create any of these toast just pass the ToastModel instance to the Toaster.open() function.
 *
 *   this.toaster.open(t1);
 *   this.toaster.open(t2);
 *   this.toaster.open(t3);
 *
 *
 *   // -------------------------------------------------------------------
 *   // You can also handle user interactions with your customized buttons.
 *
 *   t2.onClick.subscribe(button => {
 *      if (button === dismissButton.text) {
 *          // Handle your dismiss button here.
 *      }
 *   });
 *
 *   t6.onClick.subscribe(button => {
 *      if (button === undoButton.text) {
 *          // Handle UNDO operation here.
 *      } else if (button === destroyButton.text) {
 *          // Handle DESTROY operation here.
 *      }
 *   });
 */
var Toaster = /** @class */ (function () {
    function Toaster(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.toastCounter = 0;
        this.toasts = [];
    }
    Toaster.prototype.registerContainer = function (entryPoint) {
        this.entryPoint = entryPoint;
    };
    /**
     * Displays a new toast.
     *
     * @param toast
     *     Can either be an ToastModel object describing the entire toast or just a message to be displayed.
     *
     * @param button | closeable | delay
     *     If a string is provided, a dismiss button will be displayed with that text.
     *     If a boolean is provided the toast will auto-dismiss based on that value.
     *     If a number is provided, the toast will dismiss itself after that amount of milliseconds.
     *
     * @param closeable | delay
     *     If a boolean is provided the toast will auto-dismiss based on that value.
     *     If a number is provided, the toast will dismiss itself after that amount of milliseconds.
     *
     * @param delay
     *     If a number is provided, the toast will dismiss itself after that amount of milliseconds.
     *
     *     An auto-dismissible toast with 5 seconds delay and no buttons will be display otherwise.
     */
    Toaster.prototype.open = function (toast, button, closeable, delay) {
        if (toast instanceof ToastModel) {
            this.createToast(toast);
        }
        else {
            this.openQuickToast(toast, button, closeable, delay);
        }
    };
    Toaster.prototype.openQuickToast = function (message, button, closeable, delay) {
        var buttonText = this.isString(button) ? button : '';
        var closeableValue = this.isBoolean(button) ? button : this.isBoolean(closeable) ? closeable : false;
        var delayValue = this.isNumber(button) ? button : this.isNumber(closeable) ? closeable : this.isNumber(delay) ? delay : 5000;
        var quickToast = new ToastModel({ message: message, delay: delayValue });
        if (buttonText) {
            var quickButton = new ToastButtonModel({ text: buttonText });
            quickToast.buttons = [quickButton];
        }
        else if (closeableValue) {
            // Fixme: Use the tooltip version when fixed
            // const cancelButton = new ToastButtonModel({icon: 'clear', color: 'secondary', tooltip: 'Close'});
            var cancelButton = new ToastButtonModel({ icon: 'clear', color: 'secondary' });
            quickToast.buttons = [cancelButton];
        }
        this.createToast(quickToast);
    };
    Toaster.prototype.isString = function (value) {
        return typeof value === 'string';
    };
    Toaster.prototype.isBoolean = function (value) {
        return typeof value === 'boolean';
    };
    Toaster.prototype.isNumber = function (value) {
        return typeof value === 'number';
    };
    Toaster.prototype.dismiss = function (toast, button) {
        var index = this.getToastIndex(toast.key);
        if (index < 0) {
            // Return if the toast was already dismissed.
            return;
        }
        if (!!this.toasts) {
            var toastComponentRef_1 = this.toasts[index];
            this.toasts.splice(index, 1);
            this.toasts.forEach(function (message, i) { return message.instance.isSibling = i > 0; });
            toastComponentRef_1.instance.isDismissed = true;
            setTimeout(function () { return toastComponentRef_1.destroy(); }, 500);
        }
        if (!!button && toast.onClick) {
            toast.onClick.next(button);
        }
    };
    Toaster.prototype.getToastIndex = function (key) {
        var index = -1;
        if (!!this.toasts) {
            for (var i = 0; i < this.toasts.length; i++) {
                var toast = this.toasts[i];
                if (toast.instance && toast.instance.toast && toast.instance.toast.key === key) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    Toaster.prototype.createToast = function (toast) {
        var _this = this;
        toast.key = 'toast' + this.toastCounter++;
        var componentFactory = toast.componentFactory ? toast.componentFactory :
            this.componentFactoryResolver.resolveComponentFactory(ToastComponent);
        if (!!this.entryPoint && !!this.toasts) {
            var toastComponentRef = this.entryPoint.createComponent(componentFactory, 0);
            toastComponentRef.instance.toast = toast;
            toastComponentRef.instance.isSibling = this.toasts.length > 0;
            toastComponentRef.instance.dismiss.subscribe(function (toastToDismiss) { return _this.dismiss(toastToDismiss.toast, toastToDismiss.button); });
            this.toasts.push(toastComponentRef);
        }
    };
    Toaster.ctorParameters = function () { return [
        { type: ComponentFactoryResolver }
    ]; };
    Toaster.ɵprov = ɵɵdefineInjectable({ factory: function Toaster_Factory() { return new Toaster(ɵɵinject(ComponentFactoryResolver)); }, token: Toaster, providedIn: "root" });
    Toaster = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [ComponentFactoryResolver])
    ], Toaster);
    return Toaster;
}());

var nextId$b = 0;
var EXPANSION_PANEL_ANIMATION_TIMING = '225ms cubic-bezier(0.4,0.0,0.2,1)';
var ExpandComponent = /** @class */ (function () {
    function ExpandComponent() {
        this.toggleTooltip = ['', ''];
        this.openOnInit = false;
        this.open = new EventEmitter();
        this.close = new EventEmitter();
        this.isOpen = false;
        this.id = "pa-expand-" + nextId$b++;
    }
    ExpandComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.openOnInit) {
            setTimeout(function () { return _this.togglePanel(); }, 500);
        }
    };
    ExpandComponent.prototype.togglePanel = function () {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.open.emit();
        }
        else {
            this.close.emit();
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ExpandComponent.prototype, "toggleTooltip", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ExpandComponent.prototype, "openOnInit", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ExpandComponent.prototype, "open", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ExpandComponent.prototype, "close", void 0);
    ExpandComponent = __decorate([
        Component({
            selector: 'pa-expand',
            template: "<button class=\"pa-expand-header\" role=\"tab\" [id]=\"id + '-tab'\" [attr.aria-controls]=\"id + '-panel'\" [attr.aria-expanded]=\"isOpen\"\n    tabindex=\"0\" (click)=\"togglePanel()\">\n    <div class=\"pa-expand-header-wrapper\" tabindex=\"-1\">\n        <div [paTooltip]=\"isOpen ? toggleTooltip[1] : toggleTooltip[0]\">\n            <div class=\"pa-expand-marker\">\n                <pa-icon name=\"down-key\"></pa-icon>\n            </div>\n        </div>\n        <div class=\"pa-expand-title\"><ng-content select=\"expand-title\"></ng-content></div>\n        <div class=\"pa-expand-description\"><ng-content select=\"expand-description\"></ng-content></div>\n    </div>\n</button>\n<div class=\"pa-expand-body\" role=\"tabpanel\" [attr.aria-labelledby]=\"id + '-tab'\" [attr.aria-hidden]=\"!isOpen\"\n    [id]=\"id + '-panel'\" [@bodyExpansion]=\"isOpen ? 'expanded' : 'collapsed'\" style=\"height: 0; visibility: hidden;\">\n    <div class=\"pa-expand-body-wrapper\">\n        <ng-content *ngIf=\"isOpen\"></ng-content>\n    </div>\n</div>\n",
            animations: [
                trigger('bodyExpansion', [
                    state('collapsed', style({ height: '0px', visibility: 'hidden' })),
                    state('expanded', style({ height: '*', visibility: 'visible' })),
                    transition('expanded <=> collapsed', animate(EXPANSION_PANEL_ANIMATION_TIMING)),
                ])
            ],
            styles: [":host{display:block}:host:hover{box-shadow:0 4px 12px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.1);-webkit-transition:.25s;transition:.25s}.pa-expand-header{background:#fff;border-radius:3px;width:100%;text-align:left;border:0;padding:0;position:relative;cursor:pointer;-webkit-transition:.25s;transition:.25s;box-shadow:none}.pa-expand-header:active+.pa-expand-body{box-shadow:0 18px 36px 0 rgba(0,0,0,.15),0 2px 2px 0 rgba(0,0,0,.1);-webkit-transition:.25s;transition:.25s}.pa-expand-header-wrapper{border-radius:3px;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-flow:column;align-content:center;-webkit-box-pack:center;justify-content:center;width:100%;height:4.5rem;padding:.75rem 1.5rem;position:relative}@-webkit-keyframes focus-ring{from{box-shadow:0 0 0 12px rgba(34,151,199,0)}to{box-shadow:0 0 0 3px rgba(34,151,199,.5)}}@keyframes focus-ring{from{box-shadow:0 0 0 12px rgba(34,151,199,0)}to{box-shadow:0 0 0 3px rgba(34,151,199,.5)}}.pa-expand-header:focus>.pa-expand-header-wrapper{outline:0;-webkit-animation-name:focus-ring;animation-name:focus-ring;-webkit-animation-duration:.33s;animation-duration:.33s;box-shadow:0 0 0 3px rgba(34,151,199,.5);z-index:1}.pa-expand-header:not(:-moz-focusring):focus>.pa-expand-header-wrapper{outline:0}.pa-expand-header button::-moz-focus-outer,.pa-expand-header::-moz-focus-inner{border:0}.pa-expand-header-wrapper:focus,.pa-expand-header:focus{outline:0}.pa-expand-header[aria-expanded=true]{border-radius:3px 3px 0 0}.pa-expand-marker{-webkit-transition:.25s;transition:.25s;top:calc(50% - .75rem);position:absolute;-o-object-fit:contain;object-fit:contain;right:1.5rem;height:1.5rem;fill:#2280a0}.pa-expand-marker ::ng-deep svg{width:1.5rem;height:1.5rem}.pa-expand-header[aria-expanded=true] .pa-expand-marker{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.pa-expand-title{font-size:calc(.875rem * 12/14);line-height:1.125rem;font-weight:400;color:#3a3a3a;text-transform:uppercase;margin-right:2.25rem}.pa-expand-description{font-size:.875rem;line-height:1.125rem;letter-spacing:.015em;font-weight:300;color:#767676;margin-right:2.25rem}.pa-expand-body{background:#fff;border-radius:3px;width:100%;text-align:left;border:0;display:-webkit-box;display:flex;position:relative;margin-bottom:.75rem}.pa-expand-body-wrapper{padding:.75rem 1.5rem;width:100%}.pa-expand-body[aria-hidden=true]{height:0;overflow:hidden}.pa-expand-header[aria-expanded=true]+.pa-expand-body{border-radius:0 0 3px 3px;margin-bottom:.75rem}"]
        }),
        __metadata("design:paramtypes", [])
    ], ExpandComponent);
    return ExpandComponent;
}());

var ExpandListComponent = /** @class */ (function () {
    function ExpandListComponent() {
        this._large = false;
    }
    Object.defineProperty(ExpandListComponent.prototype, "large", {
        get: function () { return this._large; },
        set: function (value) { this._large = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    ExpandListComponent.prototype.focusOnNext = function ($event) {
        var parent = this.getParentExpand(($event.srcElement));
        if (!!parent && !!parent.nextElementSibling) {
            this.focusOnButton(parent.nextElementSibling, $event);
        }
    };
    ExpandListComponent.prototype.focusOnPrevious = function ($event) {
        var parent = this.getParentExpand(($event.srcElement));
        if (!!parent && !!parent.previousElementSibling) {
            this.focusOnButton(parent.previousElementSibling, $event);
        }
    };
    ExpandListComponent.prototype.focusOnButton = function (element, event) {
        var button = element.querySelector('button');
        if (!!button) {
            event.preventDefault();
            button.focus();
        }
    };
    ExpandListComponent.prototype.getParentExpand = function (element) {
        if (!element || element.tagName === 'PA-EXPAND') {
            return element;
        }
        else {
            return this.getParentExpand(element.parentElement);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], ExpandListComponent.prototype, "large", null);
    __decorate([
        HostListener('keydown.arrowDown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], ExpandListComponent.prototype, "focusOnNext", null);
    __decorate([
        HostListener('keydown.arrowUp', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], ExpandListComponent.prototype, "focusOnPrevious", null);
    ExpandListComponent = __decorate([
        Component({
            selector: 'pa-expand-list',
            template: "<div class=\"pa-expand-block\">\n    <div class=\"pa-expand\" role=\"tablist\" [class.pa-expand-full]=\"large\">\n        <ng-content></ng-content>\n    </div>\n</div>",
            styles: [":host{display:block}.pa-expand-block{background:#edf1f2;padding:50px}.pa-expand{width:33.75rem;max-width:calc(100% - .75rem);margin:0 auto}.pa-expand.pa-expand-full{width:100%}"]
        })
    ], ExpandListComponent);
    return ExpandListComponent;
}());

var ExpandTitleDirective = /** @class */ (function () {
    function ExpandTitleDirective() {
    }
    ExpandTitleDirective = __decorate([
        Directive({ selector: 'expand-title' })
    ], ExpandTitleDirective);
    return ExpandTitleDirective;
}());
var ExpandDescriptionDirective = /** @class */ (function () {
    function ExpandDescriptionDirective() {
    }
    ExpandDescriptionDirective = __decorate([
        Directive({ selector: 'expand-description' })
    ], ExpandDescriptionDirective);
    return ExpandDescriptionDirective;
}());
var ExpandModule = /** @class */ (function () {
    function ExpandModule() {
    }
    ExpandModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                TooltipModule,
                SvgModule,
            ],
            exports: [
                ExpandComponent,
                ExpandListComponent,
                ExpandTitleDirective,
                ExpandDescriptionDirective,
            ],
            declarations: [
                ExpandComponent,
                ExpandListComponent,
                ExpandTitleDirective,
                ExpandDescriptionDirective,
            ],
            providers: [],
        })
    ], ExpandModule);
    return ExpandModule;
}());

var PaginationComponent = /** @class */ (function () {
    function PaginationComponent() {
        this.total = 0;
        this.page = 0;
        this.pageSize = 20;
        this.goTo = new EventEmitter();
        this.pages = [];
    }
    PaginationComponent.prototype.ngOnChanges = function (changes) {
        if (changes.total && changes.total.currentValue && changes.total.currentValue !== changes.total.previousValue) {
            this.computePages();
        }
    };
    PaginationComponent.prototype.back = function () {
        this.goTo.emit(this.page - 1);
    };
    PaginationComponent.prototype.next = function () {
        this.goTo.emit(this.page + 1);
    };
    PaginationComponent.prototype.goToPage = function (pageNumber) {
        this.goTo.emit(pageNumber);
    };
    PaginationComponent.prototype.goToFirst = function () {
        this.goTo.emit(this.pages[0]);
    };
    PaginationComponent.prototype.goToLast = function () {
        this.goTo.emit(this.pages[this.pages.length - 1]);
    };
    PaginationComponent.prototype.computePages = function () {
        if (!!this.total) {
            var totalPages = Math.ceil(this.total / this.pageSize);
            this.pages = Array.apply(null, { length: totalPages }).map(Number.call, Number).map(function (p) { return p + 1; }); // => [1, 2, ...]
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PaginationComponent.prototype, "total", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PaginationComponent.prototype, "page", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PaginationComponent.prototype, "pageSize", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], PaginationComponent.prototype, "goTo", void 0);
    PaginationComponent = __decorate([
        Component({
            selector: 'pa-pagination',
            template: "<nav role=\"navigation\" *ngIf=\"pages.length > 1\">\n    <ul>\n        <li>\n            <a class=\"pa-pagination-link pa-button pa-button-primary pa-button-small\" tabindex=\"0\" [attr.aria-disabled]=\"page === pages[0]\"\n               (click)=\"goToFirst()\" paTooltip=\"common.previous\" paTooltipType=\"action\"><span class=\"pa-button-wrapper\" tabindex=\"-1\"><span class=\"pa-button-label pa-sr\" translate>pagination.first-page</span>\n                    <pa-icon name=\"tab-backwards\"></pa-icon>\n                </span>\n            </a>\n        </li>\n        <li>\n            <a class=\"pa-pagination-link pa-button pa-button-primary pa-button-small\" tabindex=\"0\" [attr.aria-disabled]=\"page === pages[0]\"\n               (click)=\"back()\" paTooltip=\"common.previous\" paTooltipType=\"action\"><span class=\"pa-button-wrapper\" tabindex=\"-1\"><span class=\"pa-button-label pa-sr\" translate>pagination.first-page</span>\n                    <pa-icon name=\"backspace\"></pa-icon>\n                </span>\n            </a>\n        </li>\n        <li *ngFor=\"let p of pages\">\n            <a class=\"pa-pagination-link pa-button pa-button-primary pa-button-small\" tabindex=\"0\" [attr.aria-current]=\"p === page\"\n               (click)=\"goToPage(p)\"><span class=\"pa-button-wrapper\" tabindex=\"-1\"><span class=\"pa-button-label\">\n                    <span class=\"pa-sr\" translate>{{p === page ? 'pagination.current-page' : 'pagination.go-to-page'}}</span> {{p}}</span></span>\n            </a>\n        </li>\n        <li>\n            <a class=\"pa-pagination-link pa-button pa-button-primary pa-button-small\" tabindex=\"0\" [attr.aria-disabled]=\"page === pages[pages.length - 1]\"\n               (click)=\"next()\" paTooltip=\"common.previous\" paTooltipType=\"action\"><span class=\"pa-button-wrapper\" tabindex=\"-1\"><span class=\"pa-button-label pa-sr\" translate>pagination.last-page</span>\n                    <pa-icon name=\"confirm\"></pa-icon>\n                </span>\n            </a>\n        </li>\n        <li>\n            <a class=\"pa-pagination-link pa-button pa-button-primary pa-button-small\" tabindex=\"0\" [attr.aria-disabled]=\"page === pages[pages.length - 1]\"\n               (click)=\"goToLast()\" paTooltip=\"common.previous\" paTooltipType=\"action\"><span class=\"pa-button-wrapper\" tabindex=\"-1\"><span class=\"pa-button-label pa-sr\" translate>pagination.last-page</span>\n                    <pa-icon name=\"tab\"></pa-icon>\n                </span>\n            </a>\n        </li>\n    </ul>\n</nav>\n",
            styles: [":host{display:block;margin-bottom:1.875rem}:host ul{list-style:none;padding:0;margin:0 -.375rem}:host li{display:inline-block}:host .pa-pagination-link[aria-current=true],:host .pa-pagination-link[aria-current=true]:active,:host .pa-pagination-link[aria-current=true]:hover,:host .pa-pagination-link[aria-disabled=true],:host .pa-pagination-link[aria-disabled=true]:active,:host .pa-pagination-link[aria-disabled=true]:hover{color:#b8c6c8;cursor:default;background:0 0;pointer-events:none}:host .pa-pagination-link[aria-current=true],:host .pa-pagination-link[aria-current=true]:active,:host .pa-pagination-link[aria-current=true]:hover{box-shadow:inset 0 0 0 2px currentColor}:host .pa-pagination-separator{color:#b8c6c8;font-weight:300;font-size:125%;top:-.1875rem;padding:0 .375rem;position:relative}"]
        })
    ], PaginationComponent);
    return PaginationComponent;
}());

var PaginationModule = /** @class */ (function () {
    function PaginationModule() {
    }
    PaginationModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                ButtonModule,
                TooltipModule,
                SvgModule,
            ],
            exports: [
                PaginationComponent,
            ],
            declarations: [
                PaginationComponent,
            ],
            providers: [],
        })
    ], PaginationModule);
    return PaginationModule;
}());

var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(elementRef, sidebarService, renderer, cdr) {
        this.elementRef = elementRef;
        this.sidebarService = sidebarService;
        this.renderer = renderer;
        this.cdr = cdr;
        this.position = 'left';
        this._unfoldOnHover = false;
        this._noBackdrop = false;
        this._foldedWidth = 64;
        this._folded = false;
        this._lockedOpen = false;
        this.openedChanged = new EventEmitter();
        this.foldedChanged = new EventEmitter();
        this.isOpen = false;
        this.animationsEnabled = false;
        this.backdrop = null;
    }
    Object.defineProperty(SidebarComponent.prototype, "unfoldOnHover", {
        get: function () { return this._unfoldOnHover; },
        set: function (value) { this._unfoldOnHover = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SidebarComponent.prototype, "noBackdrop", {
        get: function () { return this._noBackdrop; },
        set: function (value) { this._noBackdrop = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SidebarComponent.prototype, "foldedWidth", {
        get: function () { return this._foldedWidth; },
        set: function (value) { this._foldedWidth = coerceNumberProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SidebarComponent.prototype, "folded", {
        get: function () { return this._folded; },
        set: function (value) {
            this._folded = coerceBooleanProperty(value);
            var width = this._foldedWidth + "px";
            if (this._folded) {
                this.renderer.setStyle(this.elementRef.nativeElement, 'width', width);
                this.renderer.setStyle(this.elementRef.nativeElement, 'min-width', width);
                this.renderer.setStyle(this.elementRef.nativeElement, 'max-width', width);
                this.renderer.addClass(this.elementRef.nativeElement, 'folded');
            }
            else {
                this.renderer.removeStyle(this.elementRef.nativeElement, 'width');
                this.renderer.removeStyle(this.elementRef.nativeElement, 'min-width');
                this.renderer.removeStyle(this.elementRef.nativeElement, 'max-width');
                this.renderer.removeClass(this.elementRef.nativeElement, 'folded');
            }
            this.foldedChanged.emit(this._folded);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SidebarComponent.prototype, "lockedOpen", {
        get: function () { return this._lockedOpen; },
        set: function (value) {
            this._lockedOpen = coerceBooleanProperty(value);
            if (this._lockedOpen) {
                this.open();
            }
        },
        enumerable: true,
        configurable: true
    });
    SidebarComponent.prototype.ngOnInit = function () {
        if (!this.name) {
            throw new Error("'name' input is required");
        }
        this.sidebarService.register(this.name, this);
        this.setupPosition();
    };
    SidebarComponent.prototype.ngOnDestroy = function () {
        if (!!this.name) {
            this.sidebarService.unregister(this.name);
        }
    };
    SidebarComponent.prototype.onMouseEnter = function () {
        if (this._unfoldOnHover) {
            this.toggleFold();
        }
    };
    SidebarComponent.prototype.onMouseLeave = function () {
        if (this._unfoldOnHover) {
            this.toggleFold();
        }
    };
    SidebarComponent.prototype.toggleOpen = function (open) {
        var newState = open === undefined ? !this.isOpen : open;
        if (!newState) {
            this.close();
        }
        else {
            this.open();
        }
    };
    SidebarComponent.prototype.open = function () {
        if (this.isOpen) {
            return;
        }
        this.enableAnimations();
        this.isOpen = true;
        if (!this._noBackdrop) {
            this.showBackdrop();
        }
        this.openedChanged.emit(this.isOpen);
        this.markForCheck();
    };
    SidebarComponent.prototype.close = function () {
        if (!this.isOpen) {
            return;
        }
        this.enableAnimations();
        this.isOpen = false;
        if (!this._noBackdrop) {
            this.hideBackdrop();
        }
        this.openedChanged.emit(this.isOpen);
        this.markForCheck();
    };
    SidebarComponent.prototype.toggleFold = function () {
        this.folded = !this._folded;
        this.enableAnimations();
        this.foldedChanged.emit(this._folded);
        this.markForCheck();
    };
    SidebarComponent.prototype.setupPosition = function () {
        if (this.position === 'left') {
            this.renderer.addClass(this.elementRef.nativeElement, 'left-positioned');
        }
        else {
            this.renderer.addClass(this.elementRef.nativeElement, 'right-positioned');
        }
    };
    SidebarComponent.prototype.enableAnimations = function () {
        if (this.animationsEnabled) {
            return;
        }
        this.animationsEnabled = true;
    };
    SidebarComponent.prototype.showBackdrop = function () {
        var _this = this;
        this.backdrop = this.renderer.createElement('div');
        if (!this.backdrop) {
            throw new Error("backdrop creation failed");
        }
        this.backdrop.classList.add('pa-sidebar-overlay');
        this.renderer.appendChild(this.elementRef.nativeElement.parentElement, this.backdrop);
        this.backdrop.addEventListener('click', function () { return _this.close(); });
    };
    SidebarComponent.prototype.hideBackdrop = function () {
        if (!!this.backdrop && !!this.backdrop.parentNode) {
            this.backdrop.parentNode.removeChild(this.backdrop);
            this.backdrop = null;
        }
    };
    SidebarComponent.prototype.markForCheck = function () {
        var _this = this;
        window.setTimeout(function () {
            if (!_this.cdr.destroyed) {
                _this.cdr.markForCheck();
            }
        }, 0);
    };
    SidebarComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: SidebarService },
        { type: Renderer2 },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SidebarComponent.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SidebarComponent.prototype, "position", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], SidebarComponent.prototype, "unfoldOnHover", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], SidebarComponent.prototype, "noBackdrop", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], SidebarComponent.prototype, "foldedWidth", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], SidebarComponent.prototype, "folded", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], SidebarComponent.prototype, "lockedOpen", null);
    __decorate([
        HostBinding('class.locked-opened'),
        __metadata("design:type", Object)
    ], SidebarComponent.prototype, "_lockedOpen", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SidebarComponent.prototype, "openedChanged", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SidebarComponent.prototype, "foldedChanged", void 0);
    __decorate([
        HostBinding('class.open'),
        __metadata("design:type", Object)
    ], SidebarComponent.prototype, "isOpen", void 0);
    __decorate([
        HostBinding('class.animations-enabled'),
        __metadata("design:type", Object)
    ], SidebarComponent.prototype, "animationsEnabled", void 0);
    __decorate([
        HostListener('mouseenter'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], SidebarComponent.prototype, "onMouseEnter", null);
    __decorate([
        HostListener('mouseleave'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], SidebarComponent.prototype, "onMouseLeave", null);
    SidebarComponent = __decorate([
        Component({
            selector: 'pa-sidebar',
            template: "<ng-content></ng-content>\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: ["pa-sidebar{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-flex:1;flex:1 0 auto;position:absolute;top:0;bottom:0;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch;width:280px;min-width:280px;max-width:280px;z-index:10050;box-shadow:0 2px 8px 0 rgba(0,0,0,.35)}pa-sidebar.left-positioned{left:0}pa-sidebar.left-positioned:not(.open){width:0!important;min-width:0!important;-webkit-transform:translateX(-100%);transform:translateX(-100%)}pa-sidebar.right-positioned{right:0}pa-sidebar.right-positioned:not(.open){width:0!important;min-width:0!important;-webkit-transform:translateX(100%);transform:translateX(100%)}pa-sidebar.open{-webkit-transform:translateX(0);transform:translateX(0)}pa-sidebar.folded{position:absolute!important;top:0;bottom:0}pa-sidebar.locked-opened{z-index:10040}pa-sidebar.animations-enabled{-webkit-transition-property:width,min-width,max-width,-webkit-transform;transition-property:transform,width,min-width,max-width,-webkit-transform;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out}.pa-sidebar-overlay{background-color:rgba(21,21,21,.6);position:absolute;top:0;bottom:0;left:0;right:0;z-index:10040}"]
        }),
        __metadata("design:paramtypes", [ElementRef,
            SidebarService,
            Renderer2,
            ChangeDetectorRef])
    ], SidebarComponent);
    return SidebarComponent;
}());

var SidebarModule = /** @class */ (function () {
    function SidebarModule() {
    }
    SidebarModule = __decorate([
        NgModule({
            imports: [],
            exports: [
                SidebarComponent,
                SidebarComponent
            ],
            declarations: [SidebarComponent],
            providers: [],
        })
    ], SidebarModule);
    return SidebarModule;
}());

var AutoFocusDirective = /** @class */ (function () {
    function AutoFocusDirective(el) {
        this.el = el;
    }
    AutoFocusDirective.prototype.ngAfterViewInit = function () {
        this.el.nativeElement.focus();
    };
    AutoFocusDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    AutoFocusDirective = __decorate([
        Directive({
            selector: '[paAutoFocus]'
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], AutoFocusDirective);
    return AutoFocusDirective;
}());

var AutoFocusModule = /** @class */ (function () {
    function AutoFocusModule() {
    }
    AutoFocusModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [AutoFocusDirective],
            declarations: [AutoFocusDirective],
        })
    ], AutoFocusModule);
    return AutoFocusModule;
}());

var CalendarComponent = /** @class */ (function () {
    function CalendarComponent(service) {
        this.service = service;
        this._isRangeStart = false;
        this._isRangeEnd = false;
        this._selection = {};
        this._noFuture = false;
        this.select = new EventEmitter();
        this.terminator = new Subject();
        this.calendar = {
            headerButtons: [],
            dates: [],
            dateRef: new Date(),
        };
        this.calendarViews = CalendarView;
        this.view = CalendarView.day;
        this.legend = '';
        this.refDate = new Date();
    }
    Object.defineProperty(CalendarComponent.prototype, "rangeStart", {
        set: function (value) {
            this._isRangeStart = coerceBooleanProperty(value);
            if (this._isRangeStart) {
                this.legend = 'calendar.select-start-date-legend';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "rangeEnd", {
        set: function (value) {
            this._isRangeEnd = coerceBooleanProperty(value);
            if (this._isRangeEnd) {
                this.legend = 'calendar.select-end-date-legend';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "min", {
        set: function (value) {
            this._min = value;
            this.calendar = this.service.getMonth(this.calendar.dateRef, this._selection, this._min);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "selection", {
        set: function (value) {
            if (!!value) {
                this._selection = value instanceof Date ? { start: value, end: value } : value;
                var dateRef = value instanceof Date ? value : this.calendar.dateRef;
                this.calendar = this.service.getMonth(dateRef, this._selection, this._min);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "noFuture", {
        set: function (value) { this._noFuture = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    CalendarComponent.prototype.ngOnInit = function () {
        this.calendar = this.service.getMonth(this.calendar.dateRef, this._selection, this._min);
    };
    CalendarComponent.prototype.ngOnDestroy = function () {
        this.terminator.next();
    };
    CalendarComponent.prototype.goToPrevious = function () {
        var ref = this._selection && this._selection.start ? this._selection.start : this.refDate;
        if (this.view === CalendarView.year) {
            this.calendar = this.service.getPreviousYears(this.calendar.dateRef, ref, this._min);
        }
        else if (this.view === CalendarView.month) {
            this.calendar = this.service.getPreviousMonths(this.calendar.dateRef, ref, this._min);
        }
        else {
            this.calendar = this.service.getPreviousMonth(this.calendar.dateRef, this._selection, this._min);
        }
    };
    CalendarComponent.prototype.goToNext = function () {
        var ref = this._selection && this._selection.start ? this._selection.start : this.refDate;
        if (this.view === CalendarView.year) {
            this.calendar = this.service.getNextYears(this.calendar.dateRef, ref, this._min);
        }
        else if (this.view === CalendarView.month) {
            this.calendar = this.service.getNextMonths(this.calendar.dateRef, ref, this._min);
        }
        else {
            this.calendar = this.service.getNextMonth(this.calendar.dateRef, this._selection, this._min);
        }
    };
    CalendarComponent.prototype.changeView = function (newView) {
        var ref = this._selection && this._selection.start ? this._selection.start : this.refDate;
        this.view = newView;
        if (this.view === CalendarView.year) {
            this.calendar = this.service.getYears(this.calendar.dateRef, ref, this._min);
        }
        else if (this.view === CalendarView.month) {
            this.calendar = this.service.getMonths(this.calendar.dateRef, ref, this._min);
        }
        else {
            this.calendar = this.service.getMonth(this.calendar.dateRef, this._selection, this._min);
        }
    };
    CalendarComponent.prototype.selectDate = function (selection) {
        var ref = this._selection && this._selection.start ? this._selection.start : this.refDate;
        if (this.view === CalendarView.year) {
            this.view = CalendarView.month;
            this.calendar = this.service.getMonths(selection.date, ref, this._min);
        }
        else if (this.view === CalendarView.month) {
            this.view = CalendarView.day;
            this.calendar = this.service.getMonth(selection.date, this._selection, this._min);
        }
        else {
            this.calendar = this.service.getMonth(selection.date, this._selection, this._min);
            this.select.emit(selection.date);
        }
    };
    CalendarComponent.prototype.noEnd = function () {
        this.select.emit(null);
    };
    CalendarComponent.ctorParameters = function () { return [
        { type: CalendarService }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CalendarComponent.prototype, "rangeStart", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CalendarComponent.prototype, "rangeEnd", null);
    __decorate([
        Input(),
        __metadata("design:type", Date),
        __metadata("design:paramtypes", [Date])
    ], CalendarComponent.prototype, "min", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CalendarComponent.prototype, "selection", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CalendarComponent.prototype, "noFuture", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CalendarComponent.prototype, "select", void 0);
    CalendarComponent = __decorate([
        Component({
            selector: 'pa-calendar',
            template: "<div>\n    <legend>{{legend | translate}}</legend>\n    <header>\n        <pa-button *ngFor=\"let button of calendar.headerButtons\" size=\"large\"\n                   class=\"pa-calendar-label-button\"\n                   (click)=\"changeView(button.view)\">{{button.label}}</pa-button>\n        <div class=\"pa-calendar-navigation-buttons\">\n            <pa-button icon=\"left-key\" paTooltip=\"calendar.previous\"\n                       (click)=\"goToPrevious()\"></pa-button>\n            <pa-button icon=\"right-key\" paTooltip=\"calendar.next\"\n                       (click)=\"goToNext()\"></pa-button>\n        </div>\n    </header>\n    <div class=\"pa-calendar-container\">\n        <div class=\"pa-calendar-dates pa-week-days\">\n            <ng-container *ngIf=\"view === calendarViews.day\">\n                <div class=\"pa-calendar-date pa-calendar-day\" translate>calendar.sunday</div>\n                <div class=\"pa-calendar-date pa-calendar-day\" translate>calendar.monday</div>\n                <div class=\"pa-calendar-date pa-calendar-day\" translate>calendar.tuesday</div>\n                <div class=\"pa-calendar-date pa-calendar-day\" translate>calendar.wednesday</div>\n                <div class=\"pa-calendar-date pa-calendar-day\" translate>calendar.thursday</div>\n                <div class=\"pa-calendar-date pa-calendar-day\" translate>calendar.friday</div>\n                <div class=\"pa-calendar-date pa-calendar-day\" translate>calendar.saturday</div>\n            </ng-container>\n        </div>\n        <div class=\"pa-calendar-dates\">\n            <pa-button *ngFor=\"let date of calendar.dates\"\n                       class=\"pa-calendar-date pa-calendar-{{view}}\"\n                       [color]=\"date.isActive ? 'primary' : 'secondary'\"\n                       [disabled]=\"(_noFuture && date.isFuture) || date.isDisabled\"\n                       [class.pa-in-interval]=\"date.inInterval\"\n                       [class.pa-first-of-interval]=\"date.firstOfInterval\"\n                       [class.pa-last-of-interval]=\"date.lastOfInterval\"\n                       [active]=\"date.isActive\"\n                       (click)=\"selectDate(date)\">\n                {{date.label}}\n            </pa-button>\n        </div>\n    </div>\n    <footer>\n        <pa-button *ngIf=\"_isRangeEnd\" size=\"small\" color=\"secondary\" (click)=\"noEnd()\">calendar.no-end-button</pa-button>\n    </footer>\n</div>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [":host{display:block;position:relative;width:18.75rem;min-height:22.5rem;padding:1.125rem .9375rem;color:#826a6a}:host legend{background:0 0;color:#717171;height:.75rem;margin-bottom:.75rem;text-transform:none}:host header{margin-bottom:1.125rem;position:relative}:host header pa-button.pa-calendar-label-button:first-of-type{margin-left:-.375rem}:host header pa-button.pa-calendar-label-button ::ng-deep .pa-button{text-transform:uppercase;font-weight:400}:host header pa-button.pa-calendar-label-button ::ng-deep .pa-button-wrapper{padding:.1875rem .375rem;height:1.5rem;line-height:1.125rem;margin-right:.1875rem}:host header .pa-calendar-navigation-buttons{position:absolute;right:-.75rem;top:-.375rem}:host footer{min-height:1.875rem}:host footer pa-button{float:right}:host footer pa-button ::ng-deep .pa-button{text-transform:none}:host footer pa-button ::ng-deep .pa-button .pa-button-label{font-size:calc(.875rem * 12/14)}:host .pa-calendar-container{font-size:calc(.875rem * 12/14)}:host .pa-calendar-container .pa-calendar-dates{display:-webkit-box;display:flex;flex-wrap:wrap;font-weight:400}:host .pa-calendar-container .pa-calendar-dates .pa-calendar-date{text-align:center;height:2.25rem;line-height:2.25rem;margin-right:.1875rem;margin-bottom:.1875rem}:host .pa-calendar-container .pa-calendar-dates .pa-calendar-date.pa-calendar-year{margin:.1875rem .375rem .1875rem 0}:host .pa-calendar-container .pa-calendar-dates .pa-calendar-date.pa-in-interval{background:#edf1f2}:host .pa-calendar-container .pa-calendar-dates .pa-calendar-date.pa-in-interval.pa-first-of-interval{border-bottom-left-radius:50%;border-top-left-radius:50%;width:2.25rem}:host .pa-calendar-container .pa-calendar-dates .pa-calendar-date.pa-in-interval.pa-last-of-interval{border-bottom-right-radius:50%;border-top-right-radius:50%;width:2.25rem}:host .pa-calendar-container .pa-calendar-dates .pa-calendar-date.pa-in-interval:not(.pa-last-of-interval):after{content:\"\";background:#edf1f2;height:2.25rem;width:.1875rem;position:absolute}:host .pa-calendar-container .pa-calendar-dates .pa-calendar-day{width:2.25rem}:host .pa-calendar-container .pa-calendar-dates .pa-calendar-day:nth-child(7n),:host .pa-calendar-container .pa-calendar-dates .pa-calendar-month:nth-child(3n),:host .pa-calendar-container .pa-calendar-dates .pa-calendar-year:nth-child(4n){margin-right:0}:host .pa-calendar-container .pa-calendar-dates pa-button ::ng-deep .pa-button{font-weight:400;height:2.25rem;text-transform:none}:host .pa-calendar-container .pa-calendar-dates pa-button ::ng-deep .pa-button .pa-button-label{font-size:calc(.875rem * 12/14)}:host .pa-calendar-container .pa-calendar-dates pa-button ::ng-deep .pa-button.active{background:#edf1f2;border:1px solid #2280a0}:host .pa-calendar-container .pa-calendar-dates pa-button.pa-calendar-day ::ng-deep .pa-button{width:2.25rem}:host .pa-calendar-container .pa-calendar-dates pa-button.pa-calendar-day ::ng-deep .pa-button .pa-button-wrapper{padding:0;line-height:2.25rem}:host .pa-calendar-container .pa-calendar-dates pa-button.pa-calendar-month ::ng-deep .pa-button{width:5.25rem}:host .pa-calendar-container .pa-calendar-dates pa-button.pa-calendar-month ::ng-deep .pa-button .pa-button-wrapper{padding:.375rem 0}:host .pa-calendar-container .pa-calendar-dates pa-button.pa-calendar-year ::ng-deep .pa-button{width:3.9375rem}:host .pa-calendar-container .pa-calendar-dates.pa-week-days{border-bottom:1px solid #949494;margin-bottom:.75rem;height:calc(1.125rem + 1px)}:host .pa-calendar-container .pa-calendar-dates.pa-week-days .pa-calendar-day{cursor:default;height:auto;line-height:1.125rem}"]
        }),
        __metadata("design:paramtypes", [CalendarService])
    ], CalendarComponent);
    return CalendarComponent;
}());

var nextId$c = 0;
var PopupComponent = /** @class */ (function () {
    function PopupComponent(service, renderer, element, cdr) {
        var _this = this;
        this.service = service;
        this.renderer = renderer;
        this.element = element;
        this.cdr = cdr;
        this.isAlwaysOn = false;
        this.onClose = new EventEmitter();
        this.isDisplayed = false;
        this.handlers = [];
        this.service.closeAllPopups.subscribe(function () { return _this.close(); });
        this.service.closeAllButId.subscribe(function (id) {
            if (id !== _this.id) {
                _this.close();
            }
        });
    }
    PopupComponent.prototype.ngOnInit = function () {
        this.id = !this.id ? "dropdown-" + nextId$c++ : this.id + "-dropdown";
        this.isDisplayed = this.isAlwaysOn;
    };
    PopupComponent.prototype.ngOnDestroy = function () {
        this.unlisten();
    };
    PopupComponent.prototype.show = function (style, hasSubLevel) {
        var _this = this;
        if (hasSubLevel === void 0) { hasSubLevel = false; }
        if (!hasSubLevel) {
            this.service.closeAllButId.next(this.id);
        }
        this.style = style;
        this.isDisplayed = true;
        if (!this.isAlwaysOn) {
            this.handlers.push(this.renderer.listen('document', 'click', function (event) { return _this.onOutsideClick(event); }));
            this.handlers.push(this.renderer.listen('document', 'keyup.esc', function () { return _this.close(); }));
        }
        markForCheck(this.cdr);
        window.setTimeout(function () {
            if (!_this.adjustPosition()) {
                var interval_1 = window.setInterval(function () {
                    if (_this.adjustPosition()) {
                        window.clearInterval(interval_1);
                    }
                }, 200);
            }
        }, 0);
    };
    PopupComponent.prototype.adjustPosition = function () {
        if (!!this.element.nativeElement) {
            var isAdjusted = false;
            var element = this.element.nativeElement.firstElementChild;
            var rect = element.getBoundingClientRect();
            if (rect.height <= 12) {
                // menu is still empty
                return false;
            }
            var _a = getVirtualScrollParentPosition(element) || { bottom: window.innerHeight, right: window.innerWidth }, bottom = _a.bottom, right = _a.right;
            var diffX = rect.left + rect.width - right;
            if (diffX > 0) {
                element.style.left = "calc(" + element.style.left + " - " + diffX + "px)";
                isAdjusted = true;
            }
            else if (rect.left < 0) {
                element.style.left = "0px";
                isAdjusted = true;
            }
            var diffY = rect.top + rect.height - bottom;
            if (diffY > 0) {
                var currentTop = element.style.top || '';
                if (currentTop.endsWith('px') && parseInt(currentTop.slice(0, -2), 10) > rect.height) {
                    // enough space above, we display the dropdown on top
                    element.style.top = "calc(" + currentTop + " - " + rect.height + "px)";
                    isAdjusted = true;
                }
                else if (!!currentTop) {
                    // not enough space, we just align the dropdown bottom with the parent bottom
                    element.style.top = "calc(" + currentTop + " - " + diffY + "px)";
                    isAdjusted = true;
                }
            }
            if (isAdjusted) {
                markForCheck(this.cdr);
            }
            return true;
        }
        else {
            return false;
        }
    };
    PopupComponent.prototype.close = function (byClickingOutside) {
        if (!this.isAlwaysOn && this.isDisplayed) {
            this.isDisplayed = false;
            this.unlisten();
            this.onClose.emit(byClickingOutside);
            markForCheck(this.cdr);
        }
    };
    PopupComponent.prototype.onOutsideClick = function (event) {
        if (!this.element.nativeElement.contains(event.target)
            && (!this.parentElement || !this.parentElement.contains(event.target))) {
            this.service.closeAllSubMenu.next();
            this.close(true);
        }
    };
    PopupComponent.prototype.unlisten = function () {
        this.handlers.forEach(function (fn) { return fn(); });
        this.handlers = [];
    };
    PopupComponent.ctorParameters = function () { return [
        { type: PopupService },
        { type: Renderer2 },
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PopupComponent.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PopupComponent.prototype, "isAlwaysOn", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PopupComponent.prototype, "parentElement", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], PopupComponent.prototype, "onClose", void 0);
    PopupComponent = __decorate([
        Component({
            selector: 'pa-popup',
            template: "<div class=\"pa-popup\" [hidden]=\"!isDisplayed\" [ngStyle]=\"style\">\n    <div class=\"pa-popup-wrapper\">\n        <ng-content></ng-content>\n    </div>\n</div>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".pa-popup{z-index:10030;box-shadow:0 1px 2px 0 rgba(0,0,0,.15);border-radius:.1875rem;min-width:12.375rem;max-width:15rem;max-height:21.75rem;overflow-x:hidden;overflow-y:auto}.pa-popup-wrapper{padding:.375rem 0;background:rgba(255,255,255,.975)}@supports (-webkit-backdrop-filter:blur(9px)){.pa-popup-wrapper{background:rgba(255,255,255,.9);-webkit-backdrop-filter:blur(9px)}}"]
        }),
        __metadata("design:paramtypes", [PopupService,
            Renderer2,
            ElementRef,
            ChangeDetectorRef])
    ], PopupComponent);
    return PopupComponent;
}());

var DatePickerComponent = /** @class */ (function (_super) {
    __extends(DatePickerComponent, _super);
    function DatePickerComponent(popupService, renderer, element, cdr) {
        var _this = _super.call(this, popupService, renderer, element, cdr) || this;
        _this.popupService = popupService;
        _this.renderer = renderer;
        _this.element = element;
        _this.cdr = cdr;
        _this._rangeStart = false;
        _this._rangeEnd = false;
        _this._dontCloseOnSelection = false;
        _this._noFuture = false;
        _this.select = new EventEmitter();
        return _this;
    }
    Object.defineProperty(DatePickerComponent.prototype, "rangeStart", {
        set: function (value) {
            this._rangeStart = coerceBooleanProperty(value);
            this._dontCloseOnSelection = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "rangeEnd", {
        set: function (value) {
            this._rangeEnd = coerceBooleanProperty(value);
            this._dontCloseOnSelection = false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "dontCloseOnSelection", {
        set: function (value) { this._dontCloseOnSelection = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "noFuture", {
        set: function (value) { this._noFuture = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    DatePickerComponent.prototype.onSelection = function (date) {
        if (!this._dontCloseOnSelection) {
            this.close();
        }
        this.select.emit(date);
    };
    DatePickerComponent.prototype.onOutsideClick = function (event) {
        if (!this.isNodeFromCalendar(event.target)) {
            this.close();
        }
    };
    DatePickerComponent.prototype.isNodeFromCalendar = function (node) {
        if (typeof node.className === 'string' && node.className.includes('pa-calendar')) {
            return true;
        }
        else if (!!node.parentElement) {
            return this.isNodeFromCalendar(node.parentElement);
        }
        else {
            return false;
        }
    };
    DatePickerComponent.ctorParameters = function () { return [
        { type: PopupService },
        { type: Renderer2 },
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DatePickerComponent.prototype, "rangeStart", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DatePickerComponent.prototype, "rangeEnd", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DatePickerComponent.prototype, "dontCloseOnSelection", null);
    __decorate([
        Input(),
        __metadata("design:type", Date)
    ], DatePickerComponent.prototype, "min", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DatePickerComponent.prototype, "selection", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DatePickerComponent.prototype, "noFuture", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DatePickerComponent.prototype, "select", void 0);
    DatePickerComponent = __decorate([
        Component({
            selector: 'pa-date-picker',
            template: "<div class=\"pa-popup\" [hidden]=\"!isDisplayed\" [ngStyle]=\"style\">\n    <div class=\"pa-popup-wrapper\">\n        <pa-calendar [selection]=\"selection\"\n                     [noFuture]=\"_noFuture\"\n                     [rangeStart]=\"_rangeStart\"\n                     [rangeEnd]=\"_rangeEnd\"\n                     [min]=\"min\"\n                     (select)=\"onSelection($event)\"></pa-calendar>\n    </div>\n</div>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".pa-popup{z-index:10030;box-shadow:0 1px 2px 0 rgba(0,0,0,.15);border-radius:.1875rem;min-width:12.375rem;max-width:15rem;max-height:21.75rem;overflow-x:hidden;overflow-y:auto}.pa-popup-wrapper{padding:.375rem 0;background:rgba(255,255,255,.975)}@supports (-webkit-backdrop-filter:blur(9px)){.pa-popup-wrapper{background:rgba(255,255,255,.9);-webkit-backdrop-filter:blur(9px)}}", ":host .pa-popup{min-width:18.75rem;max-width:none;max-height:none}"]
        }),
        __metadata("design:paramtypes", [PopupService,
            Renderer2,
            ElementRef,
            ChangeDetectorRef])
    ], DatePickerComponent);
    return DatePickerComponent;
}(PopupComponent));

var PopupDirective = /** @class */ (function () {
    function PopupDirective(element, service) {
        this.element = element;
        this.service = service;
        this._popupOnRight = false;
        this._openedFromPopup = false;
    }
    Object.defineProperty(PopupDirective.prototype, "popupOnRight", {
        set: function (value) { this._popupOnRight = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupDirective.prototype, "openedFromPopup", {
        set: function (value) { this._openedFromPopup = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    PopupDirective.prototype.ngOnInit = function () {
        this.element.nativeElement.setAttribute('aria-haspopup', true);
    };
    PopupDirective.prototype.onClick = function ($event, override, isContextual, useLast) {
        var menu = this.paPopup;
        if (!!menu) {
            if (menu.isDisplayed && !this._openedFromPopup) {
                menu.close();
            }
            else {
                var position = void 0;
                if (!useLast || !this.service.lastPosition) {
                    position = !isContextual && !!this.popupPosition ? this.popupPosition :
                        this.getPosition(override, isContextual && $event);
                    this.service.lastPosition = position;
                }
                else {
                    position = this.service.lastPosition;
                }
                menu.show(position);
            }
        }
        if ($event instanceof MouseEvent) {
            $event.preventDefault();
            $event.stopPropagation();
        }
    };
    /*
    Allow to trigger the dropdown open/close by clicking on another element than the one having the directive
    - event: the MouseEvent on the remote element
    - override: allow to force the CSS position, top, left, right, bottom properties
    - isContextual: true if we want the menu to be displayed at mouse position, false to display it aligned with the button
    - ignoreRemote: true if we want to position the menu only relatively to the button, not the clicked element
    - useLastPosition: true if we want to display the dropdown at the same position as the previous one
      (useful for dropdown menu triggering another dropdown).
      Note: it might not work if the first dropdown
    - useRealComputedPosition: [NOT RECOMMENDED] true if we want to compute the real position by iterating on the clicked element ancestors
      Its main purpose is to fight the margin defined by the Angular Material side menu. Prefer another option.
    */
    PopupDirective.prototype.remoteClick = function (params) {
        if (!params.ignoreRemote && !params.useLastPosition) {
            this.remoteElement = params.event.currentTarget;
        }
        if (!params.useLastPosition && params.useRealComputedPosition && !!params.event.currentTarget) {
            var position = getRealPosition(params.event.currentTarget);
            params.override = { top: position.top + "px", left: position.left + "px" };
        }
        this.onClick(params.event, params.override, params.isContextual, params.useLastPosition);
    };
    PopupDirective.prototype.getPosition = function (override, contextualEvent) {
        var directiveElement = this.element.nativeElement;
        var clickedElement = this.remoteElement || directiveElement;
        var rect = contextualEvent ? {
            top: contextualEvent.y,
            bottom: contextualEvent.y,
            left: contextualEvent.x,
            right: contextualEvent.x,
        } : clickedElement.getBoundingClientRect();
        if (!this.rootParent) {
            this.rootParent = getPositionnedParent(directiveElement.parentElement || directiveElement);
        }
        var rootRect = this.rootParent.getBoundingClientRect();
        var top = rect.top - rootRect.top + this.rootParent.scrollTop;
        var position = {
            position: 'absolute',
            top: top + 'px',
        };
        if (this._popupOnRight || !!contextualEvent) {
            position.left = Math.min(rect.left - rootRect.left, window.innerWidth - 240) + 'px';
        }
        else {
            position.right = Math.min(rootRect.right - rect.right + 3, window.innerWidth - 240) + 'px';
        }
        if (!!override) {
            position = Object.assign(position, override);
        }
        return position;
    };
    PopupDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: PopupService }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", PopupComponent)
    ], PopupDirective.prototype, "paPopup", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], PopupDirective.prototype, "popupOnRight", null);
    __decorate([
        Input(),
        __metadata("design:type", PositionStyle)
    ], PopupDirective.prototype, "popupPosition", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], PopupDirective.prototype, "openedFromPopup", null);
    __decorate([
        HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent, PositionStyle, Boolean, Boolean]),
        __metadata("design:returntype", void 0)
    ], PopupDirective.prototype, "onClick", null);
    PopupDirective = __decorate([
        Directive({
            selector: '[paPopup]',
            exportAs: 'paPopupRef',
        }),
        __metadata("design:paramtypes", [ElementRef,
            PopupService])
    ], PopupDirective);
    return PopupDirective;
}());

var PopupModule = /** @class */ (function () {
    function PopupModule() {
    }
    PopupModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
            ],
            exports: [
                PopupComponent,
                PopupDirective,
            ],
            declarations: [
                PopupComponent,
                PopupDirective,
            ],
        })
    ], PopupModule);
    return PopupModule;
}());

var DateInputComponent = /** @class */ (function (_super) {
    __extends(DateInputComponent, _super);
    function DateInputComponent(cdr) {
        var _this = _super.call(this) || this;
        _this.cdr = cdr;
        _this.datePlaceholder = 'mm/dd/yyyy';
        _this.errorMessage = 'Invalid date (mm/dd/yyyy)';
        _this.id = '';
        _this._noFuture = false;
        _this._accent = false;
        _this._isLessen = false;
        _this.select = new EventEmitter();
        _this.dateInput = '';
        _this.isValidDate = true;
        _this.currentDate = new Date();
        _this.datePickerPosition = { position: 'absolute', left: '0', top: '0' };
        return _this;
    }
    Object.defineProperty(DateInputComponent.prototype, "noFuture", {
        set: function (value) { this._noFuture = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateInputComponent.prototype, "accent", {
        set: function (value) { this._accent = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateInputComponent.prototype, "isLessen", {
        set: function (value) { this._isLessen = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    DateInputComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        if (!!this.selection) {
            this.selectDate(this.selection);
        }
    };
    DateInputComponent.prototype.ngOnChanges = function (changes) {
        if (changes.help) {
            var top_1 = !!changes.help.currentValue ? '-33px' : '0';
            this.datePickerPosition = __assign(__assign({}, this.datePickerPosition), { top: top_1 });
        }
    };
    DateInputComponent.prototype.selectDate = function (date) {
        this.currentDate = date;
        this.isValidDate = true;
        this.dateInput = isToday(date) ? 'Today' : isYesterday(date) ? 'Yesterday' : format(date, 'MM/dd/yyyy');
        markForCheck(this.cdr);
        this.select.emit(this.currentDate);
    };
    DateInputComponent.prototype.checkTypedDate = function (date) {
        this.isValidDate = true;
        if (date !== '') {
            var typedDate = new Date(date);
            if (date.toLowerCase() === 'today') {
                this.currentDate = new Date();
            }
            else if (date.toLowerCase() === 'yesterday') {
                this.currentDate = startOfYesterday();
            }
            else {
                this.isValidDate = date.length >= 8 && isValid(typedDate);
                if (this.isValidDate) {
                    var brokenDate = date.split('/');
                    if (brokenDate[0] === '2' || brokenDate[0] === '02') {
                        // If the date is 29 of february of non leap year or 30-31, month will be 2
                        this.isValidDate = getMonth(typedDate) === 1;
                    }
                }
                if (this.isValidDate) {
                    this.currentDate = typedDate;
                }
            }
            if (this.isValidDate) {
                this.select.emit(this.currentDate);
            }
        }
        else {
            this.select.emit(undefined);
        }
    };
    DateInputComponent.prototype.iconClick = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.datePicker.remoteClick({ ignoreRemote: true });
    };
    DateInputComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DateInputComponent.prototype, "datePlaceholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DateInputComponent.prototype, "errorMessage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DateInputComponent.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Date)
    ], DateInputComponent.prototype, "minDate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Date)
    ], DateInputComponent.prototype, "selection", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DateInputComponent.prototype, "noFuture", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DateInputComponent.prototype, "accent", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DateInputComponent.prototype, "isLessen", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DateInputComponent.prototype, "select", void 0);
    __decorate([
        ViewChild('datePickerPopup'),
        __metadata("design:type", Object)
    ], DateInputComponent.prototype, "datePicker", void 0);
    DateInputComponent = __decorate([
        Component({
            selector: 'pa-date-input',
            template: "<pa-input-icon iconName=\"event\"\n               [class.pa-date-error]=\"!isValidDate && dateInput !== ''\"\n               (iconClick)=\"iconClick($event)\">\n               <pa-input [(ngModel)]=\"dateInput\"\n                         [placeholder]=\"datePlaceholder\"\n                         [debounceDuration]=\"1000\"\n                         (valueChange)=\"checkTypedDate($event)\"\n                         [class.pa-field-label-error]=\"!isValidDate && dateInput !== ''\"\n                         [maxCharacters]=\"10\"\n                         [id]=\"id\"\n                         [errorMessage]=\"!isValidDate && dateInput !== '' ? errorMessage : ''\"\n                         [help]=\"help\"\n                         [accent]=\"_accent\"\n                         [isLessen]=\"_isLessen\">\n                         <ng-content></ng-content>\n               </pa-input>\n</pa-input-icon>\n<span [hidden]=\"true\"\n      #datePickerPopup=\"paPopupRef\"\n      [paPopup]=\"datePicker\"\n      [popupPosition]=\"datePickerPosition\"></span>\n<pa-date-picker #datePicker \n                [selection]=\"currentDate\"\n                (select)=\"selectDate($event)\"\n                [noFuture]=\"_noFuture\"\n                [min]=\"minDate\"></pa-date-picker>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".pa-popup{z-index:10030;box-shadow:0 1px 2px 0 rgba(0,0,0,.15);border-radius:.1875rem;min-width:12.375rem;max-width:15rem;max-height:21.75rem;overflow-x:hidden;overflow-y:auto}.pa-popup-wrapper{padding:.375rem 0;background:rgba(255,255,255,.975)}@supports (-webkit-backdrop-filter:blur(9px)){.pa-popup-wrapper{background:rgba(255,255,255,.9);-webkit-backdrop-filter:blur(9px)}}", ":host .pa-popup{min-width:18.75rem;max-width:none;max-height:none}:host pa-input-icon{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;border-radius:.1875rem}:host pa-input-icon.pa-date-error ::ng-deep pa-button ::ng-deep svg{fill:#cc005b!important}:host pa-input-icon ::ng-deep .pa-field-button-group{width:100%}:host pa-input-icon ::ng-deep .pa-field-button-group>.pa-field{top:.1875rem}:host pa-date-picker{position:relative}"]
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], DateInputComponent);
    return DateInputComponent;
}(TextfieldCommon));

var CalendarModule = /** @class */ (function () {
    function CalendarModule() {
    }
    CalendarModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                ButtonModule,
                PopupModule,
                TooltipModule,
                TranslateModule,
                TextFieldModule,
                FormsModule,
            ],
            exports: [CalendarComponent, DatePickerComponent, DateInputComponent],
            declarations: [CalendarComponent, DatePickerComponent, DateInputComponent],
        })
    ], CalendarModule);
    return CalendarModule;
}());

var DropdownComponent = /** @class */ (function (_super) {
    __extends(DropdownComponent, _super);
    function DropdownComponent(popupService, renderer, element, cdr) {
        var _this = _super.call(this, popupService, renderer, element, cdr) || this;
        _this.popupService = popupService;
        _this.renderer = renderer;
        _this.element = element;
        _this.cdr = cdr;
        _this.role = 'menu';
        return _this;
    }
    DropdownComponent.ctorParameters = function () { return [
        { type: PopupService },
        { type: Renderer2 },
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
    DropdownComponent = __decorate([
        Component({
            selector: 'pa-dropdown',
            template: "<div class=\"pa-popup\" [hidden]=\"!isDisplayed\" [ngStyle]=\"style\">\n    <div class=\"pa-popup-wrapper\">\n        <ul class=\"pa-dropdown-list\" [attr.role]=\"role\">\n            <ng-content></ng-content>\n        </ul>\n    </div>\n</div>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".pa-popup{z-index:10030;box-shadow:0 1px 2px 0 rgba(0,0,0,.15);border-radius:.1875rem;min-width:12.375rem;max-width:15rem;max-height:21.75rem;overflow-x:hidden;overflow-y:auto}.pa-popup-wrapper{padding:.375rem 0;background:rgba(255,255,255,.975)}@supports (-webkit-backdrop-filter:blur(9px)){.pa-popup-wrapper{background:rgba(255,255,255,.9);-webkit-backdrop-filter:blur(9px)}}", ".pa-dropdown-list{list-style:none;padding:0;margin:0}.pa-dropdown-link{display:block;text-decoration:none;text-align:left;cursor:pointer}.pa-dropdown-link[aria-current] .pa-mainmenu-link-wrapper{background:#edf1f2}.pa-dropdown-link:hover{text-decoration:none}.pa-dropdown-link:focus{box-shadow:none;background:#daeef6}.pa-dropdown-link-wrapper{font-weight:400;color:#535353;display:block;-webkit-transition:.25s;transition:.25s}.pa-dropdown-link-wrapper pa-icon ::ng-deep svg{fill:currentColor;-webkit-transition:.25s;transition:.25s}.pa-dropdown-link-wrapper pa-icon ::ng-deep svg:not(.pa-small){width:1.5rem;height:1.5rem}.pa-dropdown-link-wrapper:hover{background:#f7f6f5;color:#3a3a3a;-webkit-transition:.25s;transition:.25s}.pa-dropdown-link-wrapper.submenu-opened{background:#f7f6f5}.pa-dropdown-link-selected .pa-dropdown-link-wrapper,.pa-dropdown-link-selected:hover .pa-dropdown-link-wrapper{background:rgba(34,128,160,.12)}.pa-dropdown-link-primary .pa-dropdown-link-wrapper{color:#2280a0}.pa-dropdown-link-primary:hover .pa-dropdown-link-wrapper{color:#00719e}.pa-dropdown-link-secondary .pa-dropdown-link-wrapper{color:#826a6a}.pa-dropdown-link-secondary:hover .pa-dropdown-link-wrapper{color:#745f5f}.pa-dropdown-link-destructive .pa-dropdown-link-wrapper{color:#e40166}.pa-dropdown-link-destructive:hover .pa-dropdown-link-wrapper{color:#cc005b}.pa-dropdown-link-disabled{cursor:default}.pa-dropdown-link-disabled .pa-dropdown-link-wrapper,.pa-dropdown-link-disabled:hover .pa-dropdown-link-wrapper{color:#b8c6c8}.pa-dropdown-separator{border-top:1px solid #dee7e9;margin:.375rem 0}.pa-dropdown-group{position:relative}.pa-dropdown-group ul{padding:0;margin:0}.pa-dropdown-group-header{background:#f7f6f5;font-size:calc(.875rem * 12/14);line-height:.75rem;margin:0;padding:.375rem .5625rem;color:#717171;position:-webkit-sticky;position:sticky;top:0;z-index:2;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pa-dropdown-flex{margin:auto .5625rem;min-height:2.625rem;display:-webkit-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;flex-wrap:nowrap;-webkit-box-pack:start;justify-content:flex-start;-webkit-box-align:center;align-items:center;align-content:flex-start}.pa-dropdown-flex pa-checkbox{width:100%}.pa-dropdown-flex pa-checkbox ::ng-deep .pa-field{margin:.1875rem}.pa-dropdown-flex pa-checkbox ::ng-deep .pa-field .pa-field-label{margin-bottom:0!important;width:100%}.pa-dropdown-flex pa-checkbox ::ng-deep .pa-field .pa-field-label.pa-field-with-help .pa-ellipsis-text{margin-top:-.375rem}.pa-dropdown-flex pa-checkbox ::ng-deep .pa-field .pa-field-help{margin-bottom:0!important;margin-top:-.375rem!important}.pa-dropdown-flex-item{-webkit-box-flex:0;flex-grow:0;flex-shring:0;line-height:0;margin-left:.375rem}.pa-dropdown-flex-item kbd{top:0;background:0 0;color:#767676}.pa-dropdown-flex-item:first-child:not(.pa-dropdown-flex-item-push){margin-left:0}.pa-dropdown-flex-item-push{-webkit-box-flex:1;flex-grow:1;line-height:.9375rem;font-weight:400;margin-top:1px}.pa-dropdown-flex-item-push small{font-weight:300;color:#767676}.pa-dropdown-compressed .pa-dropdown-flex{min-height:2.25rem}.dropdown-item-type{color:#767676;font-weight:400}"]
        }),
        __metadata("design:paramtypes", [PopupService,
            Renderer2,
            ElementRef,
            ChangeDetectorRef])
    ], DropdownComponent);
    return DropdownComponent;
}(PopupComponent));

var DropdownSeparatorComponent = /** @class */ (function () {
    function DropdownSeparatorComponent() {
    }
    DropdownSeparatorComponent = __decorate([
        Component({
            selector: 'pa-dropdown-separator',
            template: '<li class="pa-dropdown-separator" role="separator"></li>',
            styles: [".pa-dropdown-list{list-style:none;padding:0;margin:0}.pa-dropdown-link{display:block;text-decoration:none;text-align:left;cursor:pointer}.pa-dropdown-link[aria-current] .pa-mainmenu-link-wrapper{background:#edf1f2}.pa-dropdown-link:hover{text-decoration:none}.pa-dropdown-link:focus{box-shadow:none;background:#daeef6}.pa-dropdown-link-wrapper{font-weight:400;color:#535353;display:block;-webkit-transition:.25s;transition:.25s}.pa-dropdown-link-wrapper pa-icon ::ng-deep svg{fill:currentColor;-webkit-transition:.25s;transition:.25s}.pa-dropdown-link-wrapper pa-icon ::ng-deep svg:not(.pa-small){width:1.5rem;height:1.5rem}.pa-dropdown-link-wrapper:hover{background:#f7f6f5;color:#3a3a3a;-webkit-transition:.25s;transition:.25s}.pa-dropdown-link-wrapper.submenu-opened{background:#f7f6f5}.pa-dropdown-link-selected .pa-dropdown-link-wrapper,.pa-dropdown-link-selected:hover .pa-dropdown-link-wrapper{background:rgba(34,128,160,.12)}.pa-dropdown-link-primary .pa-dropdown-link-wrapper{color:#2280a0}.pa-dropdown-link-primary:hover .pa-dropdown-link-wrapper{color:#00719e}.pa-dropdown-link-secondary .pa-dropdown-link-wrapper{color:#826a6a}.pa-dropdown-link-secondary:hover .pa-dropdown-link-wrapper{color:#745f5f}.pa-dropdown-link-destructive .pa-dropdown-link-wrapper{color:#e40166}.pa-dropdown-link-destructive:hover .pa-dropdown-link-wrapper{color:#cc005b}.pa-dropdown-link-disabled{cursor:default}.pa-dropdown-link-disabled .pa-dropdown-link-wrapper,.pa-dropdown-link-disabled:hover .pa-dropdown-link-wrapper{color:#b8c6c8}.pa-dropdown-separator{border-top:1px solid #dee7e9;margin:.375rem 0}.pa-dropdown-group{position:relative}.pa-dropdown-group ul{padding:0;margin:0}.pa-dropdown-group-header{background:#f7f6f5;font-size:calc(.875rem * 12/14);line-height:.75rem;margin:0;padding:.375rem .5625rem;color:#717171;position:-webkit-sticky;position:sticky;top:0;z-index:2;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pa-dropdown-flex{margin:auto .5625rem;min-height:2.625rem;display:-webkit-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;flex-wrap:nowrap;-webkit-box-pack:start;justify-content:flex-start;-webkit-box-align:center;align-items:center;align-content:flex-start}.pa-dropdown-flex pa-checkbox{width:100%}.pa-dropdown-flex pa-checkbox ::ng-deep .pa-field{margin:.1875rem}.pa-dropdown-flex pa-checkbox ::ng-deep .pa-field .pa-field-label{margin-bottom:0!important;width:100%}.pa-dropdown-flex pa-checkbox ::ng-deep .pa-field .pa-field-label.pa-field-with-help .pa-ellipsis-text{margin-top:-.375rem}.pa-dropdown-flex pa-checkbox ::ng-deep .pa-field .pa-field-help{margin-bottom:0!important;margin-top:-.375rem!important}.pa-dropdown-flex-item{-webkit-box-flex:0;flex-grow:0;flex-shring:0;line-height:0;margin-left:.375rem}.pa-dropdown-flex-item kbd{top:0;background:0 0;color:#767676}.pa-dropdown-flex-item:first-child:not(.pa-dropdown-flex-item-push){margin-left:0}.pa-dropdown-flex-item-push{-webkit-box-flex:1;flex-grow:1;line-height:.9375rem;font-weight:400;margin-top:1px}.pa-dropdown-flex-item-push small{font-weight:300;color:#767676}.pa-dropdown-compressed .pa-dropdown-flex{min-height:2.25rem}.dropdown-item-type{color:#767676;font-weight:400}"]
        })
    ], DropdownSeparatorComponent);
    return DropdownSeparatorComponent;
}());

var DropdownSectionComponent = /** @class */ (function () {
    function DropdownSectionComponent() {
    }
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DropdownSectionComponent.prototype, "title", void 0);
    DropdownSectionComponent = __decorate([
        Component({
            selector: 'pa-dropdown-section',
            template: "<li class=\"pa-dropdown-item\" role=\"presentation\">\n    <section class=\"pa-dropdown-group\" role=\"group\">\n        <h2 *ngIf=\"!!title\" class=\"pa-dropdown-group-header\" translate>{{ title }}</h2>\n        <ul role=\"presentation\">\n            <ng-content></ng-content>\n        </ul>\n    </section>\n</li>\n",
            styles: [".pa-dropdown-list{list-style:none;padding:0;margin:0}.pa-dropdown-link{display:block;text-decoration:none;text-align:left;cursor:pointer}.pa-dropdown-link[aria-current] .pa-mainmenu-link-wrapper{background:#edf1f2}.pa-dropdown-link:hover{text-decoration:none}.pa-dropdown-link:focus{box-shadow:none;background:#daeef6}.pa-dropdown-link-wrapper{font-weight:400;color:#535353;display:block;-webkit-transition:.25s;transition:.25s}.pa-dropdown-link-wrapper pa-icon ::ng-deep svg{fill:currentColor;-webkit-transition:.25s;transition:.25s}.pa-dropdown-link-wrapper pa-icon ::ng-deep svg:not(.pa-small){width:1.5rem;height:1.5rem}.pa-dropdown-link-wrapper:hover{background:#f7f6f5;color:#3a3a3a;-webkit-transition:.25s;transition:.25s}.pa-dropdown-link-wrapper.submenu-opened{background:#f7f6f5}.pa-dropdown-link-selected .pa-dropdown-link-wrapper,.pa-dropdown-link-selected:hover .pa-dropdown-link-wrapper{background:rgba(34,128,160,.12)}.pa-dropdown-link-primary .pa-dropdown-link-wrapper{color:#2280a0}.pa-dropdown-link-primary:hover .pa-dropdown-link-wrapper{color:#00719e}.pa-dropdown-link-secondary .pa-dropdown-link-wrapper{color:#826a6a}.pa-dropdown-link-secondary:hover .pa-dropdown-link-wrapper{color:#745f5f}.pa-dropdown-link-destructive .pa-dropdown-link-wrapper{color:#e40166}.pa-dropdown-link-destructive:hover .pa-dropdown-link-wrapper{color:#cc005b}.pa-dropdown-link-disabled{cursor:default}.pa-dropdown-link-disabled .pa-dropdown-link-wrapper,.pa-dropdown-link-disabled:hover .pa-dropdown-link-wrapper{color:#b8c6c8}.pa-dropdown-separator{border-top:1px solid #dee7e9;margin:.375rem 0}.pa-dropdown-group{position:relative}.pa-dropdown-group ul{padding:0;margin:0}.pa-dropdown-group-header{background:#f7f6f5;font-size:calc(.875rem * 12/14);line-height:.75rem;margin:0;padding:.375rem .5625rem;color:#717171;position:-webkit-sticky;position:sticky;top:0;z-index:2;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pa-dropdown-flex{margin:auto .5625rem;min-height:2.625rem;display:-webkit-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;flex-wrap:nowrap;-webkit-box-pack:start;justify-content:flex-start;-webkit-box-align:center;align-items:center;align-content:flex-start}.pa-dropdown-flex pa-checkbox{width:100%}.pa-dropdown-flex pa-checkbox ::ng-deep .pa-field{margin:.1875rem}.pa-dropdown-flex pa-checkbox ::ng-deep .pa-field .pa-field-label{margin-bottom:0!important;width:100%}.pa-dropdown-flex pa-checkbox ::ng-deep .pa-field .pa-field-label.pa-field-with-help .pa-ellipsis-text{margin-top:-.375rem}.pa-dropdown-flex pa-checkbox ::ng-deep .pa-field .pa-field-help{margin-bottom:0!important;margin-top:-.375rem!important}.pa-dropdown-flex-item{-webkit-box-flex:0;flex-grow:0;flex-shring:0;line-height:0;margin-left:.375rem}.pa-dropdown-flex-item kbd{top:0;background:0 0;color:#767676}.pa-dropdown-flex-item:first-child:not(.pa-dropdown-flex-item-push){margin-left:0}.pa-dropdown-flex-item-push{-webkit-box-flex:1;flex-grow:1;line-height:.9375rem;font-weight:400;margin-top:1px}.pa-dropdown-flex-item-push small{font-weight:300;color:#767676}.pa-dropdown-compressed .pa-dropdown-flex{min-height:2.25rem}.dropdown-item-type{color:#767676;font-weight:400}"]
        })
    ], DropdownSectionComponent);
    return DropdownSectionComponent;
}());

var nextId$d = 0;
var DropdownItemComponent = /** @class */ (function () {
    function DropdownItemComponent(service) {
        var _this = this;
        this.service = service;
        this.isSmallIcon = false;
        this.isIconOnRight = false;
        this.checkboxMode = false;
        this.isSelected = false;
        this.mode = 'secondary';
        this.isDisabled = false;
        this.hasSeparator = false;
        this.onClick = new EventEmitter();
        this.onEnter = new EventEmitter();
        this.onSelection = new EventEmitter();
        this.onSubMenuSelection = new EventEmitter();
        this._iconName = '';
        this.subMenuOpen = false;
        this.terminator = new Subject();
        this.service.closeAllSubMenu.pipe(takeUntil(this.terminator)).subscribe(function () { return _this.subMenuOpen = false; });
    }
    Object.defineProperty(DropdownItemComponent.prototype, "icon", {
        set: function (value) {
            if (!!value && typeof value === 'string') {
                this._iconName = value;
            }
            else {
                this._icon = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropdownItemComponent.prototype, "smallIcon", {
        set: function (value) { this.isSmallIcon = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropdownItemComponent.prototype, "iconOnRight", {
        set: function (value) { this.isIconOnRight = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    DropdownItemComponent.prototype.ngOnInit = function () {
        if (!this.id) {
            this.id = "dropdown-item-" + nextId$d++;
        }
    };
    DropdownItemComponent.prototype.ngOnDestroy = function () {
        this.terminator.next();
    };
    DropdownItemComponent.prototype.pressEnter = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.onEnter.emit(event);
    };
    DropdownItemComponent.prototype.pressSpace = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.select(!this.isSelected);
    };
    DropdownItemComponent.prototype.click = function (event) {
        if (!this.checkboxMode) {
            event.preventDefault();
            event.stopPropagation();
            this.service.closeAllPopups.next();
            if (!this.isDisabled) {
                this.onClick.emit(event);
            }
        }
    };
    DropdownItemComponent.prototype.clickSubMenu = function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (!!this.subMenu && !!this.listItem && !!this.subLevelItems) {
            if (this.subMenuOpen) {
                this.subMenuOpen = false;
                this.subMenu.close();
            }
            else {
                var parentPosition = this.listItem.nativeElement.getBoundingClientRect();
                var rootPosition = getFixedRootParent(this.listItem.nativeElement).getBoundingClientRect();
                var right = rootPosition.right - parentPosition.right;
                var size = this.subLevelItems.length > 8 ? 8 : this.subLevelItems.length - 1;
                var subMenuHeight = parentPosition.height * size;
                var hasRightSpace = right > parentPosition.width;
                var hasBottomSpace = rootPosition.bottom - parentPosition.bottom > subMenuHeight;
                this.subMenu.show({
                    position: 'fixed',
                    top: (parentPosition.top - 6) - rootPosition.top - (hasBottomSpace ? 0 : subMenuHeight) + "px",
                    left: (hasRightSpace ? parentPosition.right + 3 : parentPosition.left - parentPosition.width - 3) + "px",
                    right: (hasRightSpace ? right : parentPosition.left) + "px",
                }, true);
                this.subMenuOpen = true;
            }
        }
    };
    DropdownItemComponent.prototype.select = function (event) {
        this.isSelected = event;
        this.onSelection.emit(event);
    };
    DropdownItemComponent.prototype.setActiveStyles = function () {
        this.isSelected = true;
        if (this.listItem) {
            this.listItem.nativeElement.focus();
        }
    };
    DropdownItemComponent.prototype.scrollIntoView = function () {
        if (this.listItem) {
            this.listItem.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    };
    DropdownItemComponent.prototype.setInactiveStyles = function () {
        this.isSelected = false;
    };
    DropdownItemComponent.prototype.selectSubMenu = function (item) {
        this.subMenuOpen = false;
        this.onSubMenuSelection.emit(item);
    };
    DropdownItemComponent.ctorParameters = function () { return [
        { type: PopupService }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DropdownItemComponent.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DropdownItemComponent.prototype, "tooltip", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DropdownItemComponent.prototype, "icon", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DropdownItemComponent.prototype, "smallIcon", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DropdownItemComponent.prototype, "iconOnRight", null);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DropdownItemComponent.prototype, "shortcut", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DropdownItemComponent.prototype, "checkboxMode", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DropdownItemComponent.prototype, "isSelected", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DropdownItemComponent.prototype, "mode", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DropdownItemComponent.prototype, "isDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DropdownItemComponent.prototype, "hasSeparator", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], DropdownItemComponent.prototype, "subLevelItems", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DropdownItemComponent.prototype, "subLabel", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DropdownItemComponent.prototype, "onClick", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DropdownItemComponent.prototype, "onEnter", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DropdownItemComponent.prototype, "onSelection", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DropdownItemComponent.prototype, "onSubMenuSelection", void 0);
    __decorate([
        ViewChild('listItem', { static: true }),
        __metadata("design:type", ElementRef)
    ], DropdownItemComponent.prototype, "listItem", void 0);
    __decorate([
        ViewChild(DropdownComponent, { static: true }),
        __metadata("design:type", DropdownComponent)
    ], DropdownItemComponent.prototype, "subMenu", void 0);
    __decorate([
        HostListener('keydown.enter', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], DropdownItemComponent.prototype, "pressEnter", null);
    __decorate([
        HostListener('keydown.space', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], DropdownItemComponent.prototype, "pressSpace", null);
    DropdownItemComponent = __decorate([
        Component({
            selector: 'pa-dropdown-item',
            template: "<pa-dropdown-separator *ngIf=\"hasSeparator\"></pa-dropdown-separator>\n<li #listItem class=\"pa-dropdown-item\" role=\"menuitem\">\n    <a [class]=\"!!mode && mode !== 'default' ? 'pa-dropdown-link pa-dropdown-link-' + mode : 'pa-dropdown-link'\"\n       [class.pa-dropdown-link-selected]=\"isSelected\"\n       [class.pa-dropdown-link-disabled]=\"isDisabled\"\n       (click)=\"click($event)\" tabindex=\"0\">\n        <span [class.submenu-opened]=\"subMenuOpen\" class=\"pa-dropdown-link-wrapper\" tabindex=\"-1\">\n            <div class=\"pa-dropdown-flex\">\n                <ng-template #labelContent><ng-content></ng-content></ng-template>\n                <ng-container *ngIf=\"!checkboxMode\">\n                    <div class=\"pa-dropdown-flex-item\" *ngIf=\"!!_iconName && !isIconOnRight\" [paTooltip]=\"tooltip\">\n                        <pa-icon *ngIf=\"_iconName && !isIconOnRight\" [small]=\"isSmallIcon\" [name]=\"_iconName\"></pa-icon>\n                    </div>\n                    <div class=\"pa-dropdown-flex-item pa-dropdown-flex-item-push\" translate>\n                        <ng-container *ngTemplateOutlet=\"labelContent\"></ng-container>\n                    </div>\n                    <div class=\"pa-dropdown-flex-item\" *ngIf=\"!!_iconName && isIconOnRight\" [paTooltip]=\"tooltip\">\n                        <pa-icon [small]=\"isSmallIcon\" [name]=\"_iconName\"></pa-icon>\n                    </div>\n                    <div *ngIf=\"subLevelItems\" clas=\"pa-dropdown-flex-item\">\n                        <pa-button color=\"secondary\" icon=\"right-key\"\n                                   (click)=\"clickSubMenu($event)\"></pa-button>\n                    </div>\n                    <div class=\"pa-dropdown-flex-item\" *ngIf=\"shortcut\"><kbd>{{ shortcut }}</kbd></div>\n                </ng-container>\n                <pa-checkbox *ngIf=\"checkboxMode\" noFocus\n                             [icon]=\"_iconName || _icon\"\n                             [help]=\"subLabel\"\n                             [selected]=\"isSelected\"\n                             [disabled]=\"isDisabled\"\n                             (selection)=\"select($event)\">\n                    <ng-container *ngTemplateOutlet=\"labelContent\"></ng-container>\n                </pa-checkbox>\n            </div>\n        </span>\n    </a>\n    <pa-dropdown *ngIf=\"subLevelItems?.length > 0\" [id]=\"id + '-sublevels'\">\n        <pa-dropdown-item *ngFor=\"let item of subLevelItems\"\n                          [id]=\"item.id\"\n                          [icon]=\"item.icon\"\n                          [mode]=\"item.mode\"\n                          [checkboxMode]=\"item.checkboxMode\"\n                          [isSelected]=\"item.isSelected\"\n                          (onSelection)=\"selectSubMenu(item)\">\n            {{item.text | translate}}\n        </pa-dropdown-item>\n    </pa-dropdown>\n</li>\n",
            styles: [".pa-dropdown-list{list-style:none;padding:0;margin:0}.pa-dropdown-link{display:block;text-decoration:none;text-align:left;cursor:pointer}.pa-dropdown-link[aria-current] .pa-mainmenu-link-wrapper{background:#edf1f2}.pa-dropdown-link:hover{text-decoration:none}.pa-dropdown-link:focus{box-shadow:none;background:#daeef6}.pa-dropdown-link-wrapper{font-weight:400;color:#535353;display:block;-webkit-transition:.25s;transition:.25s}.pa-dropdown-link-wrapper pa-icon ::ng-deep svg{fill:currentColor;-webkit-transition:.25s;transition:.25s}.pa-dropdown-link-wrapper pa-icon ::ng-deep svg:not(.pa-small){width:1.5rem;height:1.5rem}.pa-dropdown-link-wrapper:hover{background:#f7f6f5;color:#3a3a3a;-webkit-transition:.25s;transition:.25s}.pa-dropdown-link-wrapper.submenu-opened{background:#f7f6f5}.pa-dropdown-link-selected .pa-dropdown-link-wrapper,.pa-dropdown-link-selected:hover .pa-dropdown-link-wrapper{background:rgba(34,128,160,.12)}.pa-dropdown-link-primary .pa-dropdown-link-wrapper{color:#2280a0}.pa-dropdown-link-primary:hover .pa-dropdown-link-wrapper{color:#00719e}.pa-dropdown-link-secondary .pa-dropdown-link-wrapper{color:#826a6a}.pa-dropdown-link-secondary:hover .pa-dropdown-link-wrapper{color:#745f5f}.pa-dropdown-link-destructive .pa-dropdown-link-wrapper{color:#e40166}.pa-dropdown-link-destructive:hover .pa-dropdown-link-wrapper{color:#cc005b}.pa-dropdown-link-disabled{cursor:default}.pa-dropdown-link-disabled .pa-dropdown-link-wrapper,.pa-dropdown-link-disabled:hover .pa-dropdown-link-wrapper{color:#b8c6c8}.pa-dropdown-separator{border-top:1px solid #dee7e9;margin:.375rem 0}.pa-dropdown-group{position:relative}.pa-dropdown-group ul{padding:0;margin:0}.pa-dropdown-group-header{background:#f7f6f5;font-size:calc(.875rem * 12/14);line-height:.75rem;margin:0;padding:.375rem .5625rem;color:#717171;position:-webkit-sticky;position:sticky;top:0;z-index:2;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pa-dropdown-flex{margin:auto .5625rem;min-height:2.625rem;display:-webkit-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;flex-wrap:nowrap;-webkit-box-pack:start;justify-content:flex-start;-webkit-box-align:center;align-items:center;align-content:flex-start}.pa-dropdown-flex pa-checkbox{width:100%}.pa-dropdown-flex pa-checkbox ::ng-deep .pa-field{margin:.1875rem}.pa-dropdown-flex pa-checkbox ::ng-deep .pa-field .pa-field-label{margin-bottom:0!important;width:100%}.pa-dropdown-flex pa-checkbox ::ng-deep .pa-field .pa-field-label.pa-field-with-help .pa-ellipsis-text{margin-top:-.375rem}.pa-dropdown-flex pa-checkbox ::ng-deep .pa-field .pa-field-help{margin-bottom:0!important;margin-top:-.375rem!important}.pa-dropdown-flex-item{-webkit-box-flex:0;flex-grow:0;flex-shring:0;line-height:0;margin-left:.375rem}.pa-dropdown-flex-item kbd{top:0;background:0 0;color:#767676}.pa-dropdown-flex-item:first-child:not(.pa-dropdown-flex-item-push){margin-left:0}.pa-dropdown-flex-item-push{-webkit-box-flex:1;flex-grow:1;line-height:.9375rem;font-weight:400;margin-top:1px}.pa-dropdown-flex-item-push small{font-weight:300;color:#767676}.pa-dropdown-compressed .pa-dropdown-flex{min-height:2.25rem}.dropdown-item-type{color:#767676;font-weight:400}"]
        }),
        __metadata("design:paramtypes", [PopupService])
    ], DropdownItemComponent);
    return DropdownItemComponent;
}());

var DropdownCheckboxComponent = /** @class */ (function () {
    function DropdownCheckboxComponent(cdr) {
        this.cdr = cdr;
        this.valuesChange = new EventEmitter();
        this.onOpen = new EventEmitter();
        this.onClose = new EventEmitter();
        this._checkboxes = [];
        this._values = [];
        this.isDisabled = false;
        this.labels = {};
    }
    Object.defineProperty(DropdownCheckboxComponent.prototype, "checkboxes", {
        set: function (values) {
            if (!!values) {
                this._checkboxes = values;
                this.getLabels();
                this.setSelection();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropdownCheckboxComponent.prototype, "values", {
        set: function (values) {
            if (!!values) {
                this._values = values;
                this.setSelection();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropdownCheckboxComponent.prototype, "disabled", {
        set: function (value) { this.isDisabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    DropdownCheckboxComponent.prototype.getLabels = function () {
        this.labels = (this._checkboxes || []).reduce(function (all, current) {
            if (!!current.value) {
                all[current.value] = current.label || current.value;
            }
            return all;
        }, {});
    };
    DropdownCheckboxComponent.prototype.setSelection = function () {
        var _this = this;
        this._checkboxes = this._checkboxes.map(function (checkbox) { return new ControlModel(__assign(__assign({}, checkbox), { isSelected: !!checkbox.value && _this._values.includes(checkbox.value) })); });
    };
    DropdownCheckboxComponent.prototype.updateValue = function (checkbox, isSelected) {
        var value = checkbox.value;
        if (!!value) {
            if (isSelected && this._values.indexOf(value) === -1) {
                this._values.push(value);
            }
            if (!isSelected && this._values.indexOf(value) > -1) {
                this._values = this._values.filter(function (v) { return v !== value; });
            }
            this.valuesChange.emit(this._values);
        }
    };
    DropdownCheckboxComponent.prototype._onClose = function () {
        markForCheck(this.cdr);
        this.onClose.emit();
    };
    DropdownCheckboxComponent.prototype.onClickArrow = function ($event) {
        if ($event.keyCode === keyCodes.enter) {
            var element = $event.srcElement;
            if (!!element.parentElement) {
                element.parentElement.click();
            }
        }
    };
    DropdownCheckboxComponent.prototype.openMenu = function (event) {
        if (!!this.menuRef) {
            this.menuRef.remoteClick({ event: event, isContextual: false, ignoreRemote: true });
            this.onOpen.emit();
        }
    };
    DropdownCheckboxComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], DropdownCheckboxComponent.prototype, "checkboxes", null);
    __decorate([
        Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], DropdownCheckboxComponent.prototype, "values", null);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DropdownCheckboxComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DropdownCheckboxComponent.prototype, "disabled", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DropdownCheckboxComponent.prototype, "valuesChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DropdownCheckboxComponent.prototype, "onOpen", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DropdownCheckboxComponent.prototype, "onClose", void 0);
    __decorate([
        ViewChild('menuRef', { read: PopupDirective }),
        __metadata("design:type", PopupDirective)
    ], DropdownCheckboxComponent.prototype, "menuRef", void 0);
    DropdownCheckboxComponent = __decorate([
        Component({
            selector: 'pa-dropdown-checkbox',
            template: "<ng-container *ngIf=\"isDisabled\">\n    <ng-container *ngIf=\"_values.length === 0\">\n        <pa-badge class=\"no-permissions\" [isSmall]=\"true\">-</pa-badge>\n    </ng-container>\n    <ng-container *ngIf=\"_values.length > 0\">\n        <pa-badge *ngFor=\"let value of _values\"\n                  [isSmall]=\"true\">{{ !!labels[value] ? (labels[value] | translate) : value }}</pa-badge>\n    </ng-container>\n</ng-container>\n<ng-container *ngIf=\"!isDisabled\">\n    <div class=\"value-container\" (click)=\"openMenu($event)\">\n        <pa-icon [paPopup]=\"menu\" #menuRef=\"paPopupRef\" name=\"down-key\" tabindex=\"0\"\n                 (keydown)=\"onClickArrow($event)\" (click)=\"onOpen.emit()\"></pa-icon>\n        <div>\n            <ng-container *ngIf=\"_values.length === 0\">\n                <pa-badge class=\"no-permissions\" [isSmall]=\"true\">-</pa-badge>\n            </ng-container>\n            <ng-container *ngIf=\"_values.length > 0\">\n                <pa-badge *ngFor=\"let value of _values\"\n                          [isSmall]=\"true\">{{ !!labels[value] ? (labels[value] | translate) : value }}</pa-badge>\n            </ng-container>\n        </div>\n    </div>\n    <pa-dropdown #menu role=\"listbox\" (onClose)=\"_onClose()\">\n        <pa-dropdown-section [title]=\"label\">\n            <ng-container *ngFor=\"let checkbox of _checkboxes\">\n                <pa-dropdown-item [checkboxMode]=\"true\"\n                                  [isSelected]=\"checkbox.isSelected\"\n                                  [isDisabled]=\"checkbox.isDisabled\"\n                                  (onSelection)=\"updateValue(checkbox, $event)\">{{ checkbox.label }}</pa-dropdown-item>\n            </ng-container>\n        </pa-dropdown-section>\n    </pa-dropdown>\n</ng-container>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".value-container{display:inline-block;width:100%;cursor:pointer}.value-container pa-icon{float:right}.value-container pa-icon ::ng-deep svg{height:1.5rem;width:1.5rem;fill:#767676}.value-container ::ng-deep .pa-badge{margin-top:.1875rem;position:relative}.value-container>div{overflow:hidden;padding-left:.375rem}.no-permissions ::ng-deep .pa-badge-small{background:0 0}"]
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], DropdownCheckboxComponent);
    return DropdownCheckboxComponent;
}());

var DropdownModule = /** @class */ (function () {
    function DropdownModule() {
    }
    DropdownModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                BadgeModule,
                ButtonModule,
                ControlsModule,
                PopupModule,
                SvgModule,
                TooltipModule,
                TranslateModule,
            ],
            exports: [
                DropdownComponent,
                DropdownCheckboxComponent,
                DropdownItemComponent,
                DropdownSectionComponent,
                DropdownSeparatorComponent,
            ],
            declarations: [
                DropdownComponent,
                DropdownCheckboxComponent,
                DropdownItemComponent,
                DropdownSectionComponent,
                DropdownSeparatorComponent,
            ],
        })
    ], DropdownModule);
    return DropdownModule;
}());

/*
 * Public API Surface of pastanaga
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AutoFocusDirective, AutoFocusModule, Avatar, AvatarComponent, AvatarModule, BadgeComponent, BadgeModel, BadgeModule, ButtonComponent, ButtonLinkComponent, ButtonModule, COLORS, CalendarComponent, CalendarDate, CalendarModule, CalendarService, CalendarView, CheckboxComponent, CheckboxGroupComponent, CheckboxTreeComponent, CheckboxTreeMode, ControlModel, ControlsModule, DatePickerComponent, DoubleSliderComponent, DropdownCheckboxComponent, DropdownItemComponent, DropdownModule, DropdownSectionComponent, DropdownSeparatorComponent, ExpandComponent, ExpandDescriptionDirective, ExpandModule, ExpandTitleDirective, FakeSvgLoader, Icon, IconComponent, IconSize, InputComponent, LabelIcon, PaginationComponent, PaginationModule, PastanagaProgressComponent, PastanagaService, PopupComponent, PopupDirective, PopupModule, PopupService, PositionStyle, ProgressModule, SelectComponent, SidebarComponent, SidebarModule, SidebarService, SliderComponent, SvgLoader, SvgModule, TextFieldModule, TextfieldCommon, ToastButtonModel, ToastComponent, ToastModel, Toaster, ToasterModule, ToggleComponent, ToggleDivider, ToggleGroupComponent, ToggleModel, TooltipComponent, TooltipDirective, TooltipModule, TranslateDirective, TranslateModule, TranslatePipe, detectChanges, getFixedRootParent, getPositionnedParent, getRealPosition, getToastCloseButton, getVirtualScrollParentPosition, markForCheck, svgLoaderFactory, ButtonBase as ɵa, PastanagaSpinnerComponent as ɵb, PastanagaProgressCircleComponent as ɵc, InputIconComponent as ɵd, TextareaComponent as ɵe, PasswordInputComponent as ɵf, ExpandListComponent as ɵg, DateInputComponent as ɵh, DropdownComponent as ɵi };
//# sourceMappingURL=guillotinaweb-pastanaga-angular.js.map
