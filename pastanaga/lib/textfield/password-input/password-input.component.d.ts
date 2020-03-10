import { EventEmitter } from '@angular/core';
import { PasswordRule } from './password-rule';
export declare class PasswordInputComponent {
    id: string;
    placeholder: string;
    set value(value: string);
    get withRules(): boolean;
    set withRules(value: boolean);
    protected _withRules: boolean;
    get required(): boolean;
    set required(value: boolean);
    protected _required: boolean;
    get disabled(): boolean;
    set disabled(value: boolean);
    protected _disabled: boolean;
    valueChange: EventEmitter<string>;
    password: string;
    errorMessage: string;
    iconName: string;
    isVisible: boolean;
    type: string;
    rules: PasswordRule[];
    debounceEmitter: number;
    togglePasswordVisibility(): void;
    /**
     * rules:
     *  - at least 10 characters
     *  - at least 1 lowercase
     *  - at least 1 uppercase
     *  - at least 1 number
     *  - at least 1 special character
     */
    checkPasswordStrength($event: KeyboardEvent): void;
}
