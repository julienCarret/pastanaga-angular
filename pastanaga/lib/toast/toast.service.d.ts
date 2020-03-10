import { ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ToastModel } from './toast.model';
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
export declare class Toaster {
    private componentFactoryResolver;
    private entryPoint?;
    private toasts?;
    private toastCounter;
    constructor(componentFactoryResolver: ComponentFactoryResolver);
    registerContainer(entryPoint: ViewContainerRef): void;
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
    open(toast: ToastModel | string, button?: string | boolean | number, closeable?: boolean | number, delay?: number): void;
    private openQuickToast;
    private isString;
    private isBoolean;
    private isNumber;
    dismiss(toast: ToastModel, button?: string): void;
    private getToastIndex;
    private createToast;
}
