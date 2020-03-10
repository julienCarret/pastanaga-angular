import { __decorate, __metadata } from "tslib";
import { ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef, ComponentFactory } from '@angular/core';
import { ToastComponent } from './toast.component';
import { ToastModel, ToastButtonModel } from './toast.model';
import * as i0 from "@angular/core";
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
    Toaster.ɵprov = i0.ɵɵdefineInjectable({ factory: function Toaster_Factory() { return new Toaster(i0.ɵɵinject(i0.ComponentFactoryResolver)); }, token: Toaster, providedIn: "root" });
    Toaster = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [ComponentFactoryResolver])
    ], Toaster);
    return Toaster;
}());
export { Toaster };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BndWlsbG90aW5hd2ViL3Bhc3RhbmFnYS1hbmd1bGFyLyIsInNvdXJjZXMiOlsibGliL3RvYXN0L3RvYXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyx3QkFBd0IsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JILE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsVUFBVSxFQUFFLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUUzRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrR0c7QUFJSDtJQU9JLGlCQUFvQix3QkFBa0Q7UUFBbEQsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUY5RCxpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUdyQixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsbUNBQWlCLEdBQWpCLFVBQWtCLFVBQTRCO1FBQzFDLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW1CRztJQUNILHNCQUFJLEdBQUosVUFBSyxLQUEwQixFQUFFLE1BQWtDLEVBQUUsU0FBNEIsRUFBRSxLQUFjO1FBRTdHLElBQUksS0FBSyxZQUFZLFVBQVUsRUFBRTtZQUM3QixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNCO2FBQU07WUFDSCxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NB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QyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3BDLElBQU0saUJBQWlCLEdBQWlDLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzVGLGlCQUFpQixDQUFDLFFBQVMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQzFDLGlCQUFpQixDQUFDLFFBQVMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQy9ELGlCQUFpQixDQUFDLFFBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUMxRCxVQUFBLGNBQWMsSUFBSSxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQXpELENBQXlELENBQzlFLENBQUM7WUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQ3ZDO0lBQ0wsQ0FBQzs7Z0JBdkg2Qyx3QkFBd0I7OztJQVA3RCxPQUFPO1FBSG5CLFVBQVUsQ0FBQztZQUNSLFVBQVUsRUFBRSxNQUFNO1NBQ3JCLENBQUM7eUNBUWdELHdCQUF3QjtPQVA3RCxPQUFPLENBK0huQjtrQkF6T0Q7Q0F5T0MsQUEvSEQsSUErSEM7U0EvSFksT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsIEluamVjdGFibGUsIFZpZXdDb250YWluZXJSZWYsIENvbXBvbmVudEZhY3Rvcnl9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtUb2FzdENvbXBvbmVudH0gZnJvbSAnLi90b2FzdC5jb21wb25lbnQnO1xuaW1wb3J0IHtUb2FzdE1vZGVsLCBUb2FzdEJ1dHRvbk1vZGVsfSBmcm9tICcuL3RvYXN0Lm1vZGVsJztcblxuLyoqXG4gKiAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgIEhvdyB0byB1c2UgVG9hc3RlcjpcbiAqICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqXG4gKiAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuICogICAvLyBHbG9iYWwgY29uZmlndXJhdGlvbi4gLy9cbiAqICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG4gKlxuICogICAvLyBXZSBuZWVkIHRvIGRlZmluZSB0aGUgdG9hc3QgaG9sZGVyIGZvciBvdXIgYXBwbGljYXRpb24uXG4gKiAgIEBWaWV3Q2hpbGQoJ29ubmFUb2FzdHNCbG9jaycsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KSB0b2FzdHNDb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG4gKlxuICogICAvLyBJbXBvcnQgdGhlIFRvYXN0ZXIgaW4gdGhlIGNvbXBvbmVudCB0aGF0IHdpbGwgaG9sZCBvdXIgdG9hc3QgbWVzc2FnZXMuXG4gKiAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdG9hc3RlcjogVG9hc3Rlcil7fVxuICpcbiAqICAgLy8gQW5kIHJlZ2lzdGVyIHRoZSB0b2FzdCBjb250YWluZXIgaW4gVG9hc3Rlci5cbiAqICAgdGhpcy50b2FzdGVyLnJlZ2lzdGVyQ29udGFpbmVyKHRoaXMudG9hc3RzQ29udGFpbmVyKTtcbiAqXG4gKiAgIC8vIE5vdywgZXZlcnkgdG9hc3Qgd2lsbCBiZSBpbmplY3RlZCBpbnRvIG91ciAnb25uYVRvYXN0c0Jsb2NrJy5cbiAqXG4gKlxuICpcbiAqICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG4gKiAgIC8vIERpc3BsYXkgYSB0b2FzdCBtZXNzYWdlLiAvL1xuICogICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cbiAqXG4gKiAgIC8vIERpc3BsYXlpbmcgYSBtZXNzYWdlIGlzIHZlcnkgc2ltcGxlIChpdCB3aWxsIGJlIGF1dG8tZGlzbWlzc2libGUgYW5kIGNhbm5vdCBiZSBjbG9zZWQgYnkgdGhlIHVzZXIpXG4gKiAgIHRoaXMudG9hc3Rlci5vcGVuKCdRdWljayB0b2FzdCcpO1xuICpcbiAqICAgLy8gSWYgd2Ugd2FudCB0byBtYWtlIGl0IGNsb3NlYWJsZSAoaXQgd2lsbCBkaXNwbGF5IGEgWCBidXR0b24gdG8gZGlzbWlzcyBpdCBhbmQgaXQgd2lsbCBiZSBhbHNvIGF1dG8tZGlzbWlzc2libGUpXG4gKiAgIHRoaXMudG9hc3Rlci5vcGVuKCdRdWljayB0b2FzdCB3aXRoIENsb3NlIGJ1dHRvbicsIHRydWUpO1xuICpcbiAqICAgLy8gV2UgY2FuIHNwZWNpZnkgYSBwYXJ0aWN1bGFyIHRleHQgZm9yIHRoZSBkaXNtaXNzIGJ1dHRvbiAoYWxzbyBhdXRvLWRpc21pc3NpYmxlKVxuICogICB0aGlzLnRvYXN0ZXIub3BlbignUXVpY2sgdG9hc3Qgd2l0aCBcIkRpc21pc3NcIiBidXR0b24nLCAnRGlzbWlzcycpO1xuICpcbiAqICAgLy8gVG8gZm9yY2UgYSBtYW51YWwgZGlzbWlzcyB3ZSBuZWVkIHRvIHNldCBhIGRlbGF5IG9mIDBcbiAqICAgdGhpcy50b2FzdGVyLm9wZW4oJ1F1aWNrIHRvYXN0IHdpdGggXCJEaXNtaXNzXCIgYnV0dG9uJywgJ0Rpc21pc3MnLCAwKTtcbiAqXG4gKiAgIC8vIFdlIGNhbiBhbHNvIHNldCBhIGN1c3RvbSBkZWxheSBmb3Igb3VyIHRvYXN0IChlaXRoZXIgd2l0aCBvciB3aXRob3V0IGJ1dHRvbnMpXG4gKiAgIHRoaXMudG9hc3Rlci5vcGVuKCdRdWljayB0b2FzdCB3aXRoIGxvbmcgZGVsYXknLCAyMDAwMCk7ICAgICAgICAgICAgLy8gMjBzLiBkZWxheSB8fCBObyBidXR0b25cbiAqICAgdGhpcy50b2FzdGVyLm9wZW4oJ1F1aWNrIHRvYXN0IHdpdGggbG9uZyBkZWxheScsIHRydWUsIDIwMDAwKTsgICAgICAvLyAyMHMuIGRlbGF5IHx8ICdYJyBidXR0b25cbiAqICAgdGhpcy50b2FzdGVyLm9wZW4oJ1F1aWNrIHRvYXN0IHdpdGggbG9uZyBkZWxheScsICdEaXNtaXNzJywgMjAwMDApOyAvLyAyMHMuIGRlbGF5IHx8ICdEaXNtaXNzJyBidXR0b25cbiAqXG4gKlxuICogICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cbiAqICAgLy8gQ3VzdG9taXplIHlvdXIgdG9hc3QuIC8vXG4gKiAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuICpcbiAqICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogICAvLyBXZSBjYW4gY3JlYXRlIGN1c3RvbSBidXR0b25zIHRvIGRpc21pc3Mgb3IgaGFuZGxlIHVzZXIgaW50ZXJhY3Rpb25zIHdpdGggb3VyIHRvYXN0XG4gKlxuICogICBjb25zdCBjb25maXJtQnV0dG9uOiBUb2FzdEJ1dHRvbk1vZGVsID0gbmV3IFRvYXN0QnV0dG9uTW9kZWwoe3RleHQ6ICdDb25maXJtJ30pOyAvLyBQcmltYXJ5IGNvbG9yIGJ5IGRlZmF1bHQuXG4gKiAgIGNvbnN0IGRpc21pc3NCdXR0b246IFRvYXN0QnV0dG9uTW9kZWwgPSBuZXcgVG9hc3RCdXR0b25Nb2RlbCh7dGV4dDogJ0Rpc21pc3MnLCBjb2xvcjogVG9hc3RCdXR0b25Nb2RlbC5QUklNQVJZfSk7XG4gKiAgIGNvbnN0IHVuZG9CdXR0b246IFRvYXN0QnV0dG9uTW9kZWwgPSBuZXcgVG9hc3RCdXR0b25Nb2RlbCh7dGV4dDogJ1VuZG8nLCBjb2xvcjogVG9hc3RCdXR0b25Nb2RlbC5TRUNPTkRBUll9KTtcbiAqICAgY29uc3QgZGVzdHJveUJ1dHRvbjogVG9hc3RCdXR0b25Nb2RlbCA9IG5ldyBUb2FzdEJ1dHRvbk1vZGVsKHt0ZXh0OiAnRGVzdHJveScsIGNvbG9yOiBUb2FzdEJ1dHRvbk1vZGVsLkRFU1RSVUNUSVZFfSk7XG4gKlxuICpcbiAqICAgY29uc3QgdDEgPSBuZXcgVG9hc3RNb2RlbCh7bWVzc2FnZTogJ0F1dG8tZGlzbWlzc2libGUgdG9hc3QnfSk7XG4gKiAgIGNvbnN0IHQyID0gbmV3IFRvYXN0TW9kZWwoe21lc3NhZ2U6ICdBIHRvYXN0IHdpdGggYSBkaXNtaXNzIGJ1dHRvbicsIGJ1dHRvbnM6IFtkaXNtaXNzQnV0dG9uXX0pOyAvLyBNYW51YWwgZGlzbWlzc1xuICogICBjb25zdCB0MyA9IG5ldyBUb2FzdE1vZGVsKHttZXNzYWdlOiAnV2l0aCBhIG1hbnVhbCBjbG9zZSBidXR0b24gYnV0IGF1dG8tZGlzbWlzc2libGUgYW55d2F5cycsIGNsb3NlYWJsZTogdHJ1ZX0pO1xuICogICBjb25zdCB0NCA9IG5ldyBUb2FzdE1vZGVsKHttZXNzYWdlOiAnSVxcJ20gYXV0by1kaXNtaXNzaWJsZS4uLiBidXQgaXQgd2lsbCB0YWtlIG1lIGxvbmdlcicsIGRlbGF5OiAxMDAwMH0pO1xuICpcbiAqICAgY29uc3QgdDUgPSBuZXcgVG9hc3RNb2RlbCh7bWVzc2FnZTogJ0F1dG8tZGlzbWlzc2libGUgd2l0aCBjdXN0b20gYnV0dG9ucycsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uczogW2NvbmZpcm1CdXR0b25dLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGF5OiA1MDAwfSk7XG4gKlxuICogICBjb25zdCB0NiA9IG5ldyBUb2FzdE1vZGVsKHsgbWVzc2FnZTogJ0EgdG9hc3Qgd2l0aCB0d28gYnV0dG9ucycsIGJ1dHRvbnM6IFt1bmRvQnV0dG9uLCBkZXN0cm95QnV0dG9uXX0pO1xuICpcbiAqICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogICAvLyBZb3UgY2FuIGFkZCBsaW5rcyAoYW5jaG9ycykgdG8gdGhlIG1lc3NhZ2UgaWYgeW91IGZvbGxvdyB0aGlzIG1hcmt1cCBcIltsaW5rLXRleHR8bGluay11cmxdXCJcbiAqXG4gKiAgIGNvbnN0IHQ3ID0gbmV3IFRvYXN0TW9kZWwoeyBtZXNzYWdlOiAnQSB0b2FzdCB3aXRoIGEgW0dvb2dsZXxodHRwczovL3d3dy5nb29nbGUuZXNdIGxpbmsnfSk7XG4gKlxuICpcbiAqICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgIC8vIFRvIGNyZWF0ZSBhbnkgb2YgdGhlc2UgdG9hc3QganVzdCBwYXNzIHRoZSBUb2FzdE1vZGVsIGluc3RhbmNlIHRvIHRoZSBUb2FzdGVyLm9wZW4oKSBmdW5jdGlvbi5cbiAqXG4gKiAgIHRoaXMudG9hc3Rlci5vcGVuKHQxKTtcbiAqICAgdGhpcy50b2FzdGVyLm9wZW4odDIpO1xuICogICB0aGlzLnRvYXN0ZXIub3Blbih0Myk7XG4gKlxuICpcbiAqICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogICAvLyBZb3UgY2FuIGFsc28gaGFuZGxlIHVzZXIgaW50ZXJhY3Rpb25zIHdpdGggeW91ciBjdXN0b21pemVkIGJ1dHRvbnMuXG4gKlxuICogICB0Mi5vbkNsaWNrLnN1YnNjcmliZShidXR0b24gPT4ge1xuICogICAgICBpZiAoYnV0dG9uID09PSBkaXNtaXNzQnV0dG9uLnRleHQpIHtcbiAqICAgICAgICAgIC8vIEhhbmRsZSB5b3VyIGRpc21pc3MgYnV0dG9uIGhlcmUuXG4gKiAgICAgIH1cbiAqICAgfSk7XG4gKlxuICogICB0Ni5vbkNsaWNrLnN1YnNjcmliZShidXR0b24gPT4ge1xuICogICAgICBpZiAoYnV0dG9uID09PSB1bmRvQnV0dG9uLnRleHQpIHtcbiAqICAgICAgICAgIC8vIEhhbmRsZSBVTkRPIG9wZXJhdGlvbiBoZXJlLlxuICogICAgICB9IGVsc2UgaWYgKGJ1dHRvbiA9PT0gZGVzdHJveUJ1dHRvbi50ZXh0KSB7XG4gKiAgICAgICAgICAvLyBIYW5kbGUgREVTVFJPWSBvcGVyYXRpb24gaGVyZS5cbiAqICAgICAgfVxuICogICB9KTtcbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBUb2FzdGVyIHtcblxuICAgIHByaXZhdGUgZW50cnlQb2ludD86IFZpZXdDb250YWluZXJSZWY7XG4gICAgcHJpdmF0ZSB0b2FzdHM/OiBDb21wb25lbnRSZWY8VG9hc3RDb21wb25lbnQ+W107XG5cbiAgICBwcml2YXRlIHRvYXN0Q291bnRlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7XG4gICAgICAgIHRoaXMudG9hc3RzID0gW107XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJDb250YWluZXIoZW50cnlQb2ludDogVmlld0NvbnRhaW5lclJlZikge1xuICAgICAgICB0aGlzLmVudHJ5UG9pbnQgPSBlbnRyeVBvaW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERpc3BsYXlzIGEgbmV3IHRvYXN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHRvYXN0XG4gICAgICogICAgIENhbiBlaXRoZXIgYmUgYW4gVG9hc3RNb2RlbCBvYmplY3QgZGVzY3JpYmluZyB0aGUgZW50aXJlIHRvYXN0IG9yIGp1c3QgYSBtZXNzYWdlIHRvIGJlIGRpc3BsYXllZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBidXR0b24gfCBjbG9zZWFibGUgfCBkZWxheVxuICAgICAqICAgICBJZiBhIHN0cmluZyBpcyBwcm92aWRlZCwgYSBkaXNtaXNzIGJ1dHRvbiB3aWxsIGJlIGRpc3BsYXllZCB3aXRoIHRoYXQgdGV4dC5cbiAgICAgKiAgICAgSWYgYSBib29sZWFuIGlzIHByb3ZpZGVkIHRoZSB0b2FzdCB3aWxsIGF1dG8tZGlzbWlzcyBiYXNlZCBvbiB0aGF0IHZhbHVlLlxuICAgICAqICAgICBJZiBhIG51bWJlciBpcyBwcm92aWRlZCwgdGhlIHRvYXN0IHdpbGwgZGlzbWlzcyBpdHNlbGYgYWZ0ZXIgdGhhdCBhbW91bnQgb2YgbWlsbGlzZWNvbmRzLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNsb3NlYWJsZSB8IGRlbGF5XG4gICAgICogICAgIElmIGEgYm9vbGVhbiBpcyBwcm92aWRlZCB0aGUgdG9hc3Qgd2lsbCBhdXRvLWRpc21pc3MgYmFzZWQgb24gdGhhdCB2YWx1ZS5cbiAgICAgKiAgICAgSWYgYSBudW1iZXIgaXMgcHJvdmlkZWQsIHRoZSB0b2FzdCB3aWxsIGRpc21pc3MgaXRzZWxmIGFmdGVyIHRoYXQgYW1vdW50IG9mIG1pbGxpc2Vjb25kcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBkZWxheVxuICAgICAqICAgICBJZiBhIG51bWJlciBpcyBwcm92aWRlZCwgdGhlIHRvYXN0IHdpbGwgZGlzbWlzcyBpdHNlbGYgYWZ0ZXIgdGhhdCBhbW91bnQgb2YgbWlsbGlzZWNvbmRzLlxuICAgICAqXG4gICAgICogICAgIEFuIGF1dG8tZGlzbWlzc2libGUgdG9hc3Qgd2l0aCA1IHNlY29uZHMgZGVsYXkgYW5kIG5vIGJ1dHRvbnMgd2lsbCBiZSBkaXNwbGF5IG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBvcGVuKHRvYXN0OiBUb2FzdE1vZGVsIHwgc3RyaW5nLCBidXR0b24/OiBzdHJpbmcgfCBib29sZWFuIHwgbnVtYmVyLCBjbG9zZWFibGU/OiBib29sZWFuIHwgbnVtYmVyLCBkZWxheT86IG51bWJlcikge1xuXG4gICAgICAgIGlmICh0b2FzdCBpbnN0YW5jZW9mIFRvYXN0TW9kZWwpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVG9hc3QodG9hc3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vcGVuUXVpY2tUb2FzdCh0b2FzdCwgYnV0dG9uLCBjbG9zZWFibGUsIGRlbGF5KTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvcGVuUXVpY2tUb2FzdChtZXNzYWdlOiBzdHJpbmcsIGJ1dHRvbj86IHN0cmluZyB8IGJvb2xlYW4gfCBudW1iZXIsIGNsb3NlYWJsZT86IGJvb2xlYW4gfCBudW1iZXIsIGRlbGF5PzogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGJ1dHRvblRleHQgPSB0aGlzLmlzU3RyaW5nKGJ1dHRvbikgPyBidXR0b24gOiAnJztcbiAgICAgICAgY29uc3QgY2xvc2VhYmxlVmFsdWUgPSB0aGlzLmlzQm9vbGVhbihidXR0b24pID8gYnV0dG9uIDogdGhpcy5pc0Jvb2xlYW4oY2xvc2VhYmxlKSA/IGNsb3NlYWJsZSA6IGZhbHNlO1xuICAgICAgICBjb25zdCBkZWxheVZhbHVlID0gdGhpcy5pc051bWJlcihidXR0b24pID8gYnV0dG9uIDogdGhpcy5pc051bWJlcihjbG9zZWFibGUpID8gY2xvc2VhYmxlIDogdGhpcy5pc051bWJlcihkZWxheSkgPyBkZWxheSA6IDUwMDA7XG5cbiAgICAgICAgY29uc3QgcXVpY2tUb2FzdCA9IG5ldyBUb2FzdE1vZGVsKHttZXNzYWdlOiBtZXNzYWdlLCBkZWxheTogZGVsYXlWYWx1ZX0pO1xuICAgICAgICBpZiAoYnV0dG9uVGV4dCkge1xuICAgICAgICAgICAgY29uc3QgcXVpY2tCdXR0b24gPSBuZXcgVG9hc3RCdXR0b25Nb2RlbCh7dGV4dDogYnV0dG9uVGV4dH0pO1xuICAgICAgICAgICAgcXVpY2tUb2FzdC5idXR0b25zID0gW3F1aWNrQnV0dG9uXTtcbiAgICAgICAgfSBlbHNlIGlmIChjbG9zZWFibGVWYWx1ZSkge1xuICAgICAgICAgICAgLy8gRml4bWU6IFVzZSB0aGUgdG9vbHRpcCB2ZXJzaW9uIHdoZW4gZml4ZWRcbiAgICAgICAgICAgIC8vIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IG5ldyBUb2FzdEJ1dHRvbk1vZGVsKHtpY29uOiAnY2xlYXInLCBjb2xvcjogJ3NlY29uZGFyeScsIHRvb2x0aXA6ICdDbG9zZSd9KTtcbiAgICAgICAgICAgIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IG5ldyBUb2FzdEJ1dHRvbk1vZGVsKHtpY29uOiAnY2xlYXInLCBjb2xvcjogJ3NlY29uZGFyeSd9KTtcbiAgICAgICAgICAgIHF1aWNrVG9hc3QuYnV0dG9ucyA9IFtjYW5jZWxCdXR0b25dO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jcmVhdGVUb2FzdChxdWlja1RvYXN0KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzU3RyaW5nKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZyc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0Jvb2xlYW4odmFsdWU6IGFueSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbic7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc051bWJlcih2YWx1ZTogYW55KSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInO1xuICAgIH1cblxuICAgIGRpc21pc3ModG9hc3Q6IFRvYXN0TW9kZWwsIGJ1dHRvbj86IHN0cmluZykge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0VG9hc3RJbmRleCh0b2FzdC5rZXkpO1xuICAgICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgICAgICAvLyBSZXR1cm4gaWYgdGhlIHRvYXN0IHdhcyBhbHJlYWR5IGRpc21pc3NlZC5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghIXRoaXMudG9hc3RzKSB7XG4gICAgICAgICAgICBjb25zdCB0b2FzdENvbXBvbmVudFJlZiA9IHRoaXMudG9hc3RzW2luZGV4XTtcblxuICAgICAgICAgICAgdGhpcy50b2FzdHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHRoaXMudG9hc3RzLmZvckVhY2goKG1lc3NhZ2UsIGkpID0+IG1lc3NhZ2UuaW5zdGFuY2UuaXNTaWJsaW5nID0gaSA+IDApO1xuICAgICAgICAgICAgdG9hc3RDb21wb25lbnRSZWYuaW5zdGFuY2UuaXNEaXNtaXNzZWQgPSB0cnVlO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0b2FzdENvbXBvbmVudFJlZi5kZXN0cm95KCksIDUwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoISFidXR0b24gJiYgdG9hc3Qub25DbGljaykge1xuICAgICAgICAgICAgdG9hc3Qub25DbGljay5uZXh0KGJ1dHRvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRvYXN0SW5kZXgoa2V5OiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICBsZXQgaW5kZXggPSAtMTtcbiAgICAgICAgaWYgKCEhdGhpcy50b2FzdHMpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50b2FzdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0b2FzdCA9IHRoaXMudG9hc3RzW2ldO1xuICAgICAgICAgICAgICAgIGlmICh0b2FzdC5pbnN0YW5jZSAmJiB0b2FzdC5pbnN0YW5jZS50b2FzdCAmJiB0b2FzdC5pbnN0YW5jZS50b2FzdC5rZXkgPT09IGtleSkge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVRvYXN0KHRvYXN0OiBUb2FzdE1vZGVsKSB7XG4gICAgICAgIHRvYXN0LmtleSA9ICd0b2FzdCcgKyB0aGlzLnRvYXN0Q291bnRlcisrO1xuICAgICAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5PFRvYXN0Q29tcG9uZW50PiA9IHRvYXN0LmNvbXBvbmVudEZhY3RvcnkgPyB0b2FzdC5jb21wb25lbnRGYWN0b3J5IDpcbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoVG9hc3RDb21wb25lbnQpO1xuICAgICAgICBpZiAoISF0aGlzLmVudHJ5UG9pbnQgJiYgISF0aGlzLnRvYXN0cykge1xuICAgICAgICAgICAgY29uc3QgdG9hc3RDb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxUb2FzdENvbXBvbmVudD4gPSB0aGlzLmVudHJ5UG9pbnQuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnksIDApO1xuICAgICAgICAgICAgKDxUb2FzdENvbXBvbmVudD50b2FzdENvbXBvbmVudFJlZi5pbnN0YW5jZSkudG9hc3QgPSB0b2FzdDtcbiAgICAgICAgICAgICg8VG9hc3RDb21wb25lbnQ+dG9hc3RDb21wb25lbnRSZWYuaW5zdGFuY2UpLmlzU2libGluZyA9IHRoaXMudG9hc3RzLmxlbmd0aCA+IDA7XG4gICAgICAgICAgICAoPFRvYXN0Q29tcG9uZW50PnRvYXN0Q29tcG9uZW50UmVmLmluc3RhbmNlKS5kaXNtaXNzLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICB0b2FzdFRvRGlzbWlzcyA9PiB0aGlzLmRpc21pc3ModG9hc3RUb0Rpc21pc3MudG9hc3QsIHRvYXN0VG9EaXNtaXNzLmJ1dHRvbilcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHRoaXMudG9hc3RzLnB1c2godG9hc3RDb21wb25lbnRSZWYpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19