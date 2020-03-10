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
let Toaster = class Toaster {
    constructor(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.toastCounter = 0;
        this.toasts = [];
    }
    registerContainer(entryPoint) {
        this.entryPoint = entryPoint;
    }
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
    open(toast, button, closeable, delay) {
        if (toast instanceof ToastModel) {
            this.createToast(toast);
        }
        else {
            this.openQuickToast(toast, button, closeable, delay);
        }
    }
    openQuickToast(message, button, closeable, delay) {
        const buttonText = this.isString(button) ? button : '';
        const closeableValue = this.isBoolean(button) ? button : this.isBoolean(closeable) ? closeable : false;
        const delayValue = this.isNumber(button) ? button : this.isNumber(closeable) ? closeable : this.isNumber(delay) ? delay : 5000;
        const quickToast = new ToastModel({ message: message, delay: delayValue });
        if (buttonText) {
            const quickButton = new ToastButtonModel({ text: buttonText });
            quickToast.buttons = [quickButton];
        }
        else if (closeableValue) {
            // Fixme: Use the tooltip version when fixed
            // const cancelButton = new ToastButtonModel({icon: 'clear', color: 'secondary', tooltip: 'Close'});
            const cancelButton = new ToastButtonModel({ icon: 'clear', color: 'secondary' });
            quickToast.buttons = [cancelButton];
        }
        this.createToast(quickToast);
    }
    isString(value) {
        return typeof value === 'string';
    }
    isBoolean(value) {
        return typeof value === 'boolean';
    }
    isNumber(value) {
        return typeof value === 'number';
    }
    dismiss(toast, button) {
        const index = this.getToastIndex(toast.key);
        if (index < 0) {
            // Return if the toast was already dismissed.
            return;
        }
        if (!!this.toasts) {
            const toastComponentRef = this.toasts[index];
            this.toasts.splice(index, 1);
            this.toasts.forEach((message, i) => message.instance.isSibling = i > 0);
            toastComponentRef.instance.isDismissed = true;
            setTimeout(() => toastComponentRef.destroy(), 500);
        }
        if (!!button && toast.onClick) {
            toast.onClick.next(button);
        }
    }
    getToastIndex(key) {
        let index = -1;
        if (!!this.toasts) {
            for (let i = 0; i < this.toasts.length; i++) {
                const toast = this.toasts[i];
                if (toast.instance && toast.instance.toast && toast.instance.toast.key === key) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }
    createToast(toast) {
        toast.key = 'toast' + this.toastCounter++;
        const componentFactory = toast.componentFactory ? toast.componentFactory :
            this.componentFactoryResolver.resolveComponentFactory(ToastComponent);
        if (!!this.entryPoint && !!this.toasts) {
            const toastComponentRef = this.entryPoint.createComponent(componentFactory, 0);
            toastComponentRef.instance.toast = toast;
            toastComponentRef.instance.isSibling = this.toasts.length > 0;
            toastComponentRef.instance.dismiss.subscribe(toastToDismiss => this.dismiss(toastToDismiss.toast, toastToDismiss.button));
            this.toasts.push(toastComponentRef);
        }
    }
};
Toaster.ctorParameters = () => [
    { type: ComponentFactoryResolver }
];
Toaster.ɵprov = i0.ɵɵdefineInjectable({ factory: function Toaster_Factory() { return new Toaster(i0.ɵɵinject(i0.ComponentFactoryResolver)); }, token: Toaster, providedIn: "root" });
Toaster = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [ComponentFactoryResolver])
], Toaster);
export { Toaster };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BndWlsbG90aW5hd2ViL3Bhc3RhbmFnYS1hbmd1bGFyLyIsInNvdXJjZXMiOlsibGliL3RvYXN0L3RvYXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyx3QkFBd0IsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JILE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsVUFBVSxFQUFFLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUUzRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrR0c7QUFJSCxJQUFhLE9BQU8sR0FBcEIsTUFBYSxPQUFPO0lBT2hCLFlBQW9CLHdCQUFrRDtRQUFsRCw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBRjlELGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBR3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxVQUE0QjtRQUMxQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FtQkc7SUFDSCxJQUFJLENBQUMsS0FBMEIsRUFBRSxNQUFrQyxFQUFFLFNBQTRCLEVBQUUsS0FBYztRQUU3RyxJQUFJLEtBQUssWUFBWSxVQUFVLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMzQjthQUFNO1lBQ0gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxLQUFL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ZUFBZSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzVGLGlCQUFpQixDQUFDLFFBQVMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQzFDLGlCQUFpQixDQUFDLFFBQVMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQy9ELGlCQUFpQixDQUFDLFFBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUMxRCxjQUFjLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxjQUFjLENBQUMsTUFBTSxDQUFDLENBQzlFLENBQUM7WUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQ3ZDO0lBQ0wsQ0FBQztDQUNKLENBQUE7O1lBeEhpRCx3QkFBd0I7OztBQVA3RCxPQUFPO0lBSG5CLFVBQVUsQ0FBQztRQUNSLFVBQVUsRUFBRSxNQUFNO0tBQ3JCLENBQUM7cUNBUWdELHdCQUF3QjtHQVA3RCxPQUFPLENBK0huQjtTQS9IWSxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgSW5qZWN0YWJsZSwgVmlld0NvbnRhaW5lclJlZiwgQ29tcG9uZW50RmFjdG9yeX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1RvYXN0Q29tcG9uZW50fSBmcm9tICcuL3RvYXN0LmNvbXBvbmVudCc7XG5pbXBvcnQge1RvYXN0TW9kZWwsIFRvYXN0QnV0dG9uTW9kZWx9IGZyb20gJy4vdG9hc3QubW9kZWwnO1xuXG4vKipcbiAqICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICAgSG93IHRvIHVzZSBUb2FzdGVyOlxuICogICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICpcbiAqICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG4gKiAgIC8vIEdsb2JhbCBjb25maWd1cmF0aW9uLiAvL1xuICogICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cbiAqXG4gKiAgIC8vIFdlIG5lZWQgdG8gZGVmaW5lIHRoZSB0b2FzdCBob2xkZXIgZm9yIG91ciBhcHBsaWNhdGlvbi5cbiAqICAgQFZpZXdDaGlsZCgnb25uYVRvYXN0c0Jsb2NrJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pIHRvYXN0c0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcbiAqXG4gKiAgIC8vIEltcG9ydCB0aGUgVG9hc3RlciBpbiB0aGUgY29tcG9uZW50IHRoYXQgd2lsbCBob2xkIG91ciB0b2FzdCBtZXNzYWdlcy5cbiAqICAgY29uc3RydWN0b3IocHJpdmF0ZSB0b2FzdGVyOiBUb2FzdGVyKXt9XG4gKlxuICogICAvLyBBbmQgcmVnaXN0ZXIgdGhlIHRvYXN0IGNvbnRhaW5lciBpbiBUb2FzdGVyLlxuICogICB0aGlzLnRvYXN0ZXIucmVnaXN0ZXJDb250YWluZXIodGhpcy50b2FzdHNDb250YWluZXIpO1xuICpcbiAqICAgLy8gTm93LCBldmVyeSB0b2FzdCB3aWxsIGJlIGluamVjdGVkIGludG8gb3VyICdvbm5hVG9hc3RzQmxvY2snLlxuICpcbiAqXG4gKlxuICogICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cbiAqICAgLy8gRGlzcGxheSBhIHRvYXN0IG1lc3NhZ2UuIC8vXG4gKiAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuICpcbiAqICAgLy8gRGlzcGxheWluZyBhIG1lc3NhZ2UgaXMgdmVyeSBzaW1wbGUgKGl0IHdpbGwgYmUgYXV0by1kaXNtaXNzaWJsZSBhbmQgY2Fubm90IGJlIGNsb3NlZCBieSB0aGUgdXNlcilcbiAqICAgdGhpcy50b2FzdGVyLm9wZW4oJ1F1aWNrIHRvYXN0Jyk7XG4gKlxuICogICAvLyBJZiB3ZSB3YW50IHRvIG1ha2UgaXQgY2xvc2VhYmxlIChpdCB3aWxsIGRpc3BsYXkgYSBYIGJ1dHRvbiB0byBkaXNtaXNzIGl0IGFuZCBpdCB3aWxsIGJlIGFsc28gYXV0by1kaXNtaXNzaWJsZSlcbiAqICAgdGhpcy50b2FzdGVyLm9wZW4oJ1F1aWNrIHRvYXN0IHdpdGggQ2xvc2UgYnV0dG9uJywgdHJ1ZSk7XG4gKlxuICogICAvLyBXZSBjYW4gc3BlY2lmeSBhIHBhcnRpY3VsYXIgdGV4dCBmb3IgdGhlIGRpc21pc3MgYnV0dG9uIChhbHNvIGF1dG8tZGlzbWlzc2libGUpXG4gKiAgIHRoaXMudG9hc3Rlci5vcGVuKCdRdWljayB0b2FzdCB3aXRoIFwiRGlzbWlzc1wiIGJ1dHRvbicsICdEaXNtaXNzJyk7XG4gKlxuICogICAvLyBUbyBmb3JjZSBhIG1hbnVhbCBkaXNtaXNzIHdlIG5lZWQgdG8gc2V0IGEgZGVsYXkgb2YgMFxuICogICB0aGlzLnRvYXN0ZXIub3BlbignUXVpY2sgdG9hc3Qgd2l0aCBcIkRpc21pc3NcIiBidXR0b24nLCAnRGlzbWlzcycsIDApO1xuICpcbiAqICAgLy8gV2UgY2FuIGFsc28gc2V0IGEgY3VzdG9tIGRlbGF5IGZvciBvdXIgdG9hc3QgKGVpdGhlciB3aXRoIG9yIHdpdGhvdXQgYnV0dG9ucylcbiAqICAgdGhpcy50b2FzdGVyLm9wZW4oJ1F1aWNrIHRvYXN0IHdpdGggbG9uZyBkZWxheScsIDIwMDAwKTsgICAgICAgICAgICAvLyAyMHMuIGRlbGF5IHx8IE5vIGJ1dHRvblxuICogICB0aGlzLnRvYXN0ZXIub3BlbignUXVpY2sgdG9hc3Qgd2l0aCBsb25nIGRlbGF5JywgdHJ1ZSwgMjAwMDApOyAgICAgIC8vIDIwcy4gZGVsYXkgfHwgJ1gnIGJ1dHRvblxuICogICB0aGlzLnRvYXN0ZXIub3BlbignUXVpY2sgdG9hc3Qgd2l0aCBsb25nIGRlbGF5JywgJ0Rpc21pc3MnLCAyMDAwMCk7IC8vIDIwcy4gZGVsYXkgfHwgJ0Rpc21pc3MnIGJ1dHRvblxuICpcbiAqXG4gKiAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuICogICAvLyBDdXN0b21pemUgeW91ciB0b2FzdC4gLy9cbiAqICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG4gKlxuICogICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgIC8vIFdlIGNhbiBjcmVhdGUgY3VzdG9tIGJ1dHRvbnMgdG8gZGlzbWlzcyBvciBoYW5kbGUgdXNlciBpbnRlcmFjdGlvbnMgd2l0aCBvdXIgdG9hc3RcbiAqXG4gKiAgIGNvbnN0IGNvbmZpcm1CdXR0b246IFRvYXN0QnV0dG9uTW9kZWwgPSBuZXcgVG9hc3RCdXR0b25Nb2RlbCh7dGV4dDogJ0NvbmZpcm0nfSk7IC8vIFByaW1hcnkgY29sb3IgYnkgZGVmYXVsdC5cbiAqICAgY29uc3QgZGlzbWlzc0J1dHRvbjogVG9hc3RCdXR0b25Nb2RlbCA9IG5ldyBUb2FzdEJ1dHRvbk1vZGVsKHt0ZXh0OiAnRGlzbWlzcycsIGNvbG9yOiBUb2FzdEJ1dHRvbk1vZGVsLlBSSU1BUll9KTtcbiAqICAgY29uc3QgdW5kb0J1dHRvbjogVG9hc3RCdXR0b25Nb2RlbCA9IG5ldyBUb2FzdEJ1dHRvbk1vZGVsKHt0ZXh0OiAnVW5kbycsIGNvbG9yOiBUb2FzdEJ1dHRvbk1vZGVsLlNFQ09OREFSWX0pO1xuICogICBjb25zdCBkZXN0cm95QnV0dG9uOiBUb2FzdEJ1dHRvbk1vZGVsID0gbmV3IFRvYXN0QnV0dG9uTW9kZWwoe3RleHQ6ICdEZXN0cm95JywgY29sb3I6IFRvYXN0QnV0dG9uTW9kZWwuREVTVFJVQ1RJVkV9KTtcbiAqXG4gKlxuICogICBjb25zdCB0MSA9IG5ldyBUb2FzdE1vZGVsKHttZXNzYWdlOiAnQXV0by1kaXNtaXNzaWJsZSB0b2FzdCd9KTtcbiAqICAgY29uc3QgdDIgPSBuZXcgVG9hc3RNb2RlbCh7bWVzc2FnZTogJ0EgdG9hc3Qgd2l0aCBhIGRpc21pc3MgYnV0dG9uJywgYnV0dG9uczogW2Rpc21pc3NCdXR0b25dfSk7IC8vIE1hbnVhbCBkaXNtaXNzXG4gKiAgIGNvbnN0IHQzID0gbmV3IFRvYXN0TW9kZWwoe21lc3NhZ2U6ICdXaXRoIGEgbWFudWFsIGNsb3NlIGJ1dHRvbiBidXQgYXV0by1kaXNtaXNzaWJsZSBhbnl3YXlzJywgY2xvc2VhYmxlOiB0cnVlfSk7XG4gKiAgIGNvbnN0IHQ0ID0gbmV3IFRvYXN0TW9kZWwoe21lc3NhZ2U6ICdJXFwnbSBhdXRvLWRpc21pc3NpYmxlLi4uIGJ1dCBpdCB3aWxsIHRha2UgbWUgbG9uZ2VyJywgZGVsYXk6IDEwMDAwfSk7XG4gKlxuICogICBjb25zdCB0NSA9IG5ldyBUb2FzdE1vZGVsKHttZXNzYWdlOiAnQXV0by1kaXNtaXNzaWJsZSB3aXRoIGN1c3RvbSBidXR0b25zJyxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXR0b25zOiBbY29uZmlybUJ1dHRvbl0sXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsYXk6IDUwMDB9KTtcbiAqXG4gKiAgIGNvbnN0IHQ2ID0gbmV3IFRvYXN0TW9kZWwoeyBtZXNzYWdlOiAnQSB0b2FzdCB3aXRoIHR3byBidXR0b25zJywgYnV0dG9uczogW3VuZG9CdXR0b24sIGRlc3Ryb3lCdXR0b25dfSk7XG4gKlxuICogICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgIC8vIFlvdSBjYW4gYWRkIGxpbmtzIChhbmNob3JzKSB0byB0aGUgbWVzc2FnZSBpZiB5b3UgZm9sbG93IHRoaXMgbWFya3VwIFwiW2xpbmstdGV4dHxsaW5rLXVybF1cIlxuICpcbiAqICAgY29uc3QgdDcgPSBuZXcgVG9hc3RNb2RlbCh7IG1lc3NhZ2U6ICdBIHRvYXN0IHdpdGggYSBbR29vZ2xlfGh0dHBzOi8vd3d3Lmdvb2dsZS5lc10gbGluayd9KTtcbiAqXG4gKlxuICogICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICAgLy8gVG8gY3JlYXRlIGFueSBvZiB0aGVzZSB0b2FzdCBqdXN0IHBhc3MgdGhlIFRvYXN0TW9kZWwgaW5zdGFuY2UgdG8gdGhlIFRvYXN0ZXIub3BlbigpIGZ1bmN0aW9uLlxuICpcbiAqICAgdGhpcy50b2FzdGVyLm9wZW4odDEpO1xuICogICB0aGlzLnRvYXN0ZXIub3Blbih0Mik7XG4gKiAgIHRoaXMudG9hc3Rlci5vcGVuKHQzKTtcbiAqXG4gKlxuICogICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgIC8vIFlvdSBjYW4gYWxzbyBoYW5kbGUgdXNlciBpbnRlcmFjdGlvbnMgd2l0aCB5b3VyIGN1c3RvbWl6ZWQgYnV0dG9ucy5cbiAqXG4gKiAgIHQyLm9uQ2xpY2suc3Vic2NyaWJlKGJ1dHRvbiA9PiB7XG4gKiAgICAgIGlmIChidXR0b24gPT09IGRpc21pc3NCdXR0b24udGV4dCkge1xuICogICAgICAgICAgLy8gSGFuZGxlIHlvdXIgZGlzbWlzcyBidXR0b24gaGVyZS5cbiAqICAgICAgfVxuICogICB9KTtcbiAqXG4gKiAgIHQ2Lm9uQ2xpY2suc3Vic2NyaWJlKGJ1dHRvbiA9PiB7XG4gKiAgICAgIGlmIChidXR0b24gPT09IHVuZG9CdXR0b24udGV4dCkge1xuICogICAgICAgICAgLy8gSGFuZGxlIFVORE8gb3BlcmF0aW9uIGhlcmUuXG4gKiAgICAgIH0gZWxzZSBpZiAoYnV0dG9uID09PSBkZXN0cm95QnV0dG9uLnRleHQpIHtcbiAqICAgICAgICAgIC8vIEhhbmRsZSBERVNUUk9ZIG9wZXJhdGlvbiBoZXJlLlxuICogICAgICB9XG4gKiAgIH0pO1xuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFRvYXN0ZXIge1xuXG4gICAgcHJpdmF0ZSBlbnRyeVBvaW50PzogVmlld0NvbnRhaW5lclJlZjtcbiAgICBwcml2YXRlIHRvYXN0cz86IENvbXBvbmVudFJlZjxUb2FzdENvbXBvbmVudD5bXTtcblxuICAgIHByaXZhdGUgdG9hc3RDb3VudGVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHtcbiAgICAgICAgdGhpcy50b2FzdHMgPSBbXTtcbiAgICB9XG5cbiAgICByZWdpc3RlckNvbnRhaW5lcihlbnRyeVBvaW50OiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIHRoaXMuZW50cnlQb2ludCA9IGVudHJ5UG9pbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGlzcGxheXMgYSBuZXcgdG9hc3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdG9hc3RcbiAgICAgKiAgICAgQ2FuIGVpdGhlciBiZSBhbiBUb2FzdE1vZGVsIG9iamVjdCBkZXNjcmliaW5nIHRoZSBlbnRpcmUgdG9hc3Qgb3IganVzdCBhIG1lc3NhZ2UgdG8gYmUgZGlzcGxheWVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIGJ1dHRvbiB8IGNsb3NlYWJsZSB8IGRlbGF5XG4gICAgICogICAgIElmIGEgc3RyaW5nIGlzIHByb3ZpZGVkLCBhIGRpc21pc3MgYnV0dG9uIHdpbGwgYmUgZGlzcGxheWVkIHdpdGggdGhhdCB0ZXh0LlxuICAgICAqICAgICBJZiBhIGJvb2xlYW4gaXMgcHJvdmlkZWQgdGhlIHRvYXN0IHdpbGwgYXV0by1kaXNtaXNzIGJhc2VkIG9uIHRoYXQgdmFsdWUuXG4gICAgICogICAgIElmIGEgbnVtYmVyIGlzIHByb3ZpZGVkLCB0aGUgdG9hc3Qgd2lsbCBkaXNtaXNzIGl0c2VsZiBhZnRlciB0aGF0IGFtb3VudCBvZiBtaWxsaXNlY29uZHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2xvc2VhYmxlIHwgZGVsYXlcbiAgICAgKiAgICAgSWYgYSBib29sZWFuIGlzIHByb3ZpZGVkIHRoZSB0b2FzdCB3aWxsIGF1dG8tZGlzbWlzcyBiYXNlZCBvbiB0aGF0IHZhbHVlLlxuICAgICAqICAgICBJZiBhIG51bWJlciBpcyBwcm92aWRlZCwgdGhlIHRvYXN0IHdpbGwgZGlzbWlzcyBpdHNlbGYgYWZ0ZXIgdGhhdCBhbW91bnQgb2YgbWlsbGlzZWNvbmRzLlxuICAgICAqXG4gICAgICogQHBhcmFtIGRlbGF5XG4gICAgICogICAgIElmIGEgbnVtYmVyIGlzIHByb3ZpZGVkLCB0aGUgdG9hc3Qgd2lsbCBkaXNtaXNzIGl0c2VsZiBhZnRlciB0aGF0IGFtb3VudCBvZiBtaWxsaXNlY29uZHMuXG4gICAgICpcbiAgICAgKiAgICAgQW4gYXV0by1kaXNtaXNzaWJsZSB0b2FzdCB3aXRoIDUgc2Vjb25kcyBkZWxheSBhbmQgbm8gYnV0dG9ucyB3aWxsIGJlIGRpc3BsYXkgb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIG9wZW4odG9hc3Q6IFRvYXN0TW9kZWwgfCBzdHJpbmcsIGJ1dHRvbj86IHN0cmluZyB8IGJvb2xlYW4gfCBudW1iZXIsIGNsb3NlYWJsZT86IGJvb2xlYW4gfCBudW1iZXIsIGRlbGF5PzogbnVtYmVyKSB7XG5cbiAgICAgICAgaWYgKHRvYXN0IGluc3RhbmNlb2YgVG9hc3RNb2RlbCkge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVUb2FzdCh0b2FzdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5RdWlja1RvYXN0KHRvYXN0LCBidXR0b24sIGNsb3NlYWJsZSwgZGVsYXkpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIG9wZW5RdWlja1RvYXN0KG1lc3NhZ2U6IHN0cmluZywgYnV0dG9uPzogc3RyaW5nIHwgYm9vbGVhbiB8IG51bWJlciwgY2xvc2VhYmxlPzogYm9vbGVhbiB8IG51bWJlciwgZGVsYXk/OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgYnV0dG9uVGV4dCA9IHRoaXMuaXNTdHJpbmcoYnV0dG9uKSA/IGJ1dHRvbiA6ICcnO1xuICAgICAgICBjb25zdCBjbG9zZWFibGVWYWx1ZSA9IHRoaXMuaXNCb29sZWFuKGJ1dHRvbikgPyBidXR0b24gOiB0aGlzLmlzQm9vbGVhbihjbG9zZWFibGUpID8gY2xvc2VhYmxlIDogZmFsc2U7XG4gICAgICAgIGNvbnN0IGRlbGF5VmFsdWUgPSB0aGlzLmlzTnVtYmVyKGJ1dHRvbikgPyBidXR0b24gOiB0aGlzLmlzTnVtYmVyKGNsb3NlYWJsZSkgPyBjbG9zZWFibGUgOiB0aGlzLmlzTnVtYmVyKGRlbGF5KSA/IGRlbGF5IDogNTAwMDtcblxuICAgICAgICBjb25zdCBxdWlja1RvYXN0ID0gbmV3IFRvYXN0TW9kZWwoe21lc3NhZ2U6IG1lc3NhZ2UsIGRlbGF5OiBkZWxheVZhbHVlfSk7XG4gICAgICAgIGlmIChidXR0b25UZXh0KSB7XG4gICAgICAgICAgICBjb25zdCBxdWlja0J1dHRvbiA9IG5ldyBUb2FzdEJ1dHRvbk1vZGVsKHt0ZXh0OiBidXR0b25UZXh0fSk7XG4gICAgICAgICAgICBxdWlja1RvYXN0LmJ1dHRvbnMgPSBbcXVpY2tCdXR0b25dO1xuICAgICAgICB9IGVsc2UgaWYgKGNsb3NlYWJsZVZhbHVlKSB7XG4gICAgICAgICAgICAvLyBGaXhtZTogVXNlIHRoZSB0b29sdGlwIHZlcnNpb24gd2hlbiBmaXhlZFxuICAgICAgICAgICAgLy8gY29uc3QgY2FuY2VsQnV0dG9uID0gbmV3IFRvYXN0QnV0dG9uTW9kZWwoe2ljb246ICdjbGVhcicsIGNvbG9yOiAnc2Vjb25kYXJ5JywgdG9vbHRpcDogJ0Nsb3NlJ30pO1xuICAgICAgICAgICAgY29uc3QgY2FuY2VsQnV0dG9uID0gbmV3IFRvYXN0QnV0dG9uTW9kZWwoe2ljb246ICdjbGVhcicsIGNvbG9yOiAnc2Vjb25kYXJ5J30pO1xuICAgICAgICAgICAgcXVpY2tUb2FzdC5idXR0b25zID0gW2NhbmNlbEJ1dHRvbl07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNyZWF0ZVRvYXN0KHF1aWNrVG9hc3QpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNTdHJpbmcodmFsdWU6IGFueSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzQm9vbGVhbih2YWx1ZTogYW55KSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJztcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzTnVtYmVyKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcic7XG4gICAgfVxuXG4gICAgZGlzbWlzcyh0b2FzdDogVG9hc3RNb2RlbCwgYnV0dG9uPzogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRUb2FzdEluZGV4KHRvYXN0LmtleSk7XG4gICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICAgIC8vIFJldHVybiBpZiB0aGUgdG9hc3Qgd2FzIGFscmVhZHkgZGlzbWlzc2VkLlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCEhdGhpcy50b2FzdHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHRvYXN0Q29tcG9uZW50UmVmID0gdGhpcy50b2FzdHNbaW5kZXhdO1xuXG4gICAgICAgICAgICB0aGlzLnRvYXN0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgdGhpcy50b2FzdHMuZm9yRWFjaCgobWVzc2FnZSwgaSkgPT4gbWVzc2FnZS5pbnN0YW5jZS5pc1NpYmxpbmcgPSBpID4gMCk7XG4gICAgICAgICAgICB0b2FzdENvbXBvbmVudFJlZi5pbnN0YW5jZS5pc0Rpc21pc3NlZCA9IHRydWU7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRvYXN0Q29tcG9uZW50UmVmLmRlc3Ryb3koKSwgNTAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghIWJ1dHRvbiAmJiB0b2FzdC5vbkNsaWNrKSB7XG4gICAgICAgICAgICB0b2FzdC5vbkNsaWNrLm5leHQoYnV0dG9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0VG9hc3RJbmRleChrZXk6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIGxldCBpbmRleCA9IC0xO1xuICAgICAgICBpZiAoISF0aGlzLnRvYXN0cykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRvYXN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvYXN0ID0gdGhpcy50b2FzdHNbaV07XG4gICAgICAgICAgICAgICAgaWYgKHRvYXN0Lmluc3RhbmNlICYmIHRvYXN0Lmluc3RhbmNlLnRvYXN0ICYmIHRvYXN0Lmluc3RhbmNlLnRvYXN0LmtleSA9PT0ga2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlVG9hc3QodG9hc3Q6IFRvYXN0TW9kZWwpIHtcbiAgICAgICAgdG9hc3Qua2V5ID0gJ3RvYXN0JyArIHRoaXMudG9hc3RDb3VudGVyKys7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudEZhY3Rvcnk6IENvbXBvbmVudEZhY3Rvcnk8VG9hc3RDb21wb25lbnQ+ID0gdG9hc3QuY29tcG9uZW50RmFjdG9yeSA/IHRvYXN0LmNvbXBvbmVudEZhY3RvcnkgOlxuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShUb2FzdENvbXBvbmVudCk7XG4gICAgICAgIGlmICghIXRoaXMuZW50cnlQb2ludCAmJiAhIXRoaXMudG9hc3RzKSB7XG4gICAgICAgICAgICBjb25zdCB0b2FzdENvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPFRvYXN0Q29tcG9uZW50PiA9IHRoaXMuZW50cnlQb2ludC5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSwgMCk7XG4gICAgICAgICAgICAoPFRvYXN0Q29tcG9uZW50PnRvYXN0Q29tcG9uZW50UmVmLmluc3RhbmNlKS50b2FzdCA9IHRvYXN0O1xuICAgICAgICAgICAgKDxUb2FzdENvbXBvbmVudD50b2FzdENvbXBvbmVudFJlZi5pbnN0YW5jZSkuaXNTaWJsaW5nID0gdGhpcy50b2FzdHMubGVuZ3RoID4gMDtcbiAgICAgICAgICAgICg8VG9hc3RDb21wb25lbnQ+dG9hc3RDb21wb25lbnRSZWYuaW5zdGFuY2UpLmRpc21pc3Muc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIHRvYXN0VG9EaXNtaXNzID0+IHRoaXMuZGlzbWlzcyh0b2FzdFRvRGlzbWlzcy50b2FzdCwgdG9hc3RUb0Rpc21pc3MuYnV0dG9uKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgdGhpcy50b2FzdHMucHVzaCh0b2FzdENvbXBvbmVudFJlZik7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=