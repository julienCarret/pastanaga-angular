import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Avatar } from './avatar.model';
import { getAvatarColor, getInitials } from './avatar.utils';
import { detectChanges } from '../common/utils';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
let AvatarComponent = class AvatarComponent {
    constructor(cdr) {
        this.cdr = cdr;
        this._avatar = new Avatar({ username: '' });
        this._isButton = false;
        this.initials = '?';
        this.colorClass = '';
        this.sizeClass = '';
    }
    set avatar(value) {
        if (!!value) {
            this._avatar = value;
            this.initials = getInitials(value.username);
            const identifier = value.id || value.username;
            if (identifier) {
                this.colorClass = `pa-avatar-${getAvatarColor(identifier)}`;
            }
            if (!!value.image) {
                this.loadImage(value.image);
            }
            if (!this.tooltip) {
                this.tooltip = value.username;
            }
        }
    }
    set size(value) {
        this.sizeClass = !value || value === 'regular' ? '' : `pa-avatar-${value}`;
    }
    set src(value) {
        this.base64Image = value;
    }
    set isButton(value) { this._isButton = coerceBooleanProperty(value); }
    loadImage(obs) {
        obs.subscribe((blob) => {
            if (blob.size > 0) {
                const reader = new FileReader();
                reader.addEventListener('load', () => {
                    this.base64Image = reader.result;
                    detectChanges(this.cdr);
                }, false);
                reader.readAsDataURL(blob);
            }
            else {
                this.base64Image = '';
                detectChanges(this.cdr);
            }
        });
    }
};
AvatarComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
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
export { AvatarComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BndWlsbG90aW5hd2ViL3Bhc3RhbmFnYS1hbmd1bGFyLyIsInNvdXJjZXMiOlsibGliL2F2YXRhci9hdmF0YXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEMsT0FBTyxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDaEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFROUQsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQW9DeEIsWUFDWSxHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQVJsQyxZQUFPLEdBQVcsSUFBSSxNQUFNLENBQUMsRUFBQyxRQUFRLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQztRQUM3QyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGFBQVEsR0FBRyxHQUFHLENBQUM7UUFDZixlQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLGNBQVMsR0FBRyxFQUFFLENBQUM7SUFNZixDQUFDO0lBdENRLElBQUksTUFBTSxDQUFDLEtBQWE7UUFDN0IsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRTVDLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxFQUFFLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUM5QyxJQUFJLFVBQVUsRUFBRTtnQkFDWixJQUFJLENBQUMsVUFBVSxHQUFHLGFBQWEsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7YUFDL0Q7WUFFRCxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO2dCQUNmLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQy9CO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO2FBQ2pDO1NBQ0o7SUFDTCxDQUFDO0lBQ1EsSUFBSSxJQUFJLENBQUMsS0FBMEI7UUFDeEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssSUFBSSxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsS0FBSyxFQUFFLENBQUM7SUFDL0UsQ0FBQztJQUNRLElBQUksR0FBRyxDQUFDLEtBQWE7UUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUNRLElBQUksUUFBUSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQWUvRSxTQUFTLENBQUMsR0FBcUI7UUFDM0IsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQVUsRUFBRSxFQUFFO1lBQ3pCLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUU7Z0JBQ2YsTUFBTSxNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztnQkFDaEMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7b0JBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUksTUFBTSxDQUFDLE1BQWlCLENBQUM7b0JBQzdDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVCLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDVixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzlCO2lCQUFNO2dCQUNILElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO2dCQUN0QixhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzNCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0osQ0FBQTs7WUFuQm9CLGlCQUFpQjs7QUFwQ3pCO0lBQVIsS0FBSyxFQUFFOzhCQUFtQixNQUFNO3FDQUFOLE1BQU07NkNBa0JoQztBQUNRO0lBQVIsS0FBSyxFQUFFOzs7MkNBRVA7QUFDUTtJQUFSLEtBQUssRUFBRTs7OzBDQUVQO0FBQ1E7SUFBUixLQUFLLEVBQUU7OzsrQ0FBdUU7QUFDdEU7SUFBUixLQUFLLEVBQUU7O2dEQUFrQjtBQTNCakIsZUFBZTtJQU4zQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsV0FBVztRQUNyQiw4MUNBQXNDO1FBRXRDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztLQUNsRCxDQUFDO3FDQXNDbUIsaUJBQWlCO0dBckN6QixlQUFlLENBd0QzQjtTQXhEWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBdmF0YXIgfSBmcm9tICcuL2F2YXRhci5tb2RlbCc7XG5pbXBvcnQgeyBnZXRBdmF0YXJDb2xvciwgZ2V0SW5pdGlhbHMgfSBmcm9tICcuL2F2YXRhci51dGlscyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZXRlY3RDaGFuZ2VzIH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncGEtYXZhdGFyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXZhdGFyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9hdmF0YXIuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQXZhdGFyQ29tcG9uZW50IHtcbiAgICBASW5wdXQoKSBzZXQgYXZhdGFyKHZhbHVlOiBBdmF0YXIpIHtcbiAgICAgICAgaWYgKCEhdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2F2YXRhciA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5pbml0aWFscyA9IGdldEluaXRpYWxzKHZhbHVlLnVzZXJuYW1lKTtcblxuICAgICAgICAgICAgY29uc3QgaWRlbnRpZmllciA9IHZhbHVlLmlkIHx8IHZhbHVlLnVzZXJuYW1lO1xuICAgICAgICAgICAgaWYgKGlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbG9yQ2xhc3MgPSBgcGEtYXZhdGFyLSR7Z2V0QXZhdGFyQ29sb3IoaWRlbnRpZmllcil9YDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEhdmFsdWUuaW1hZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRJbWFnZSh2YWx1ZS5pbWFnZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy50b29sdGlwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50b29sdGlwID0gdmFsdWUudXNlcm5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgQElucHV0KCkgc2V0IHNpemUodmFsdWU6ICdzbWFsbCcgfCAncmVndWxhcicpIHtcbiAgICAgICAgdGhpcy5zaXplQ2xhc3MgPSAhdmFsdWUgfHwgdmFsdWUgPT09ICdyZWd1bGFyJyA/ICcnIDogYHBhLWF2YXRhci0ke3ZhbHVlfWA7XG4gICAgfVxuICAgIEBJbnB1dCgpIHNldCBzcmModmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmJhc2U2NEltYWdlID0gdmFsdWU7XG4gICAgfVxuICAgIEBJbnB1dCgpIHNldCBpc0J1dHRvbih2YWx1ZSkgeyB0aGlzLl9pc0J1dHRvbiA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgICBASW5wdXQoKSB0b29sdGlwPzogc3RyaW5nO1xuXG4gICAgX2F2YXRhcjogQXZhdGFyID0gbmV3IEF2YXRhcih7dXNlcm5hbWU6ICcnfSk7XG4gICAgX2lzQnV0dG9uID0gZmFsc2U7XG4gICAgaW5pdGlhbHMgPSAnPyc7XG4gICAgY29sb3JDbGFzcyA9ICcnO1xuICAgIHNpemVDbGFzcyA9ICcnO1xuICAgIGJhc2U2NEltYWdlPzogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICApIHtcbiAgICB9XG5cbiAgICBsb2FkSW1hZ2Uob2JzOiBPYnNlcnZhYmxlPEJsb2I+KSB7XG4gICAgICAgIG9icy5zdWJzY3JpYmUoKGJsb2I6IEJsb2IpID0+IHtcbiAgICAgICAgICAgIGlmIChibG9iLnNpemUgPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgICAgICAgICByZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlNjRJbWFnZSA9IChyZWFkZXIucmVzdWx0IGFzIHN0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgIGRldGVjdENoYW5nZXModGhpcy5jZHIpO1xuICAgICAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChibG9iKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iYXNlNjRJbWFnZSA9ICcnO1xuICAgICAgICAgICAgICAgIGRldGVjdENoYW5nZXModGhpcy5jZHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=