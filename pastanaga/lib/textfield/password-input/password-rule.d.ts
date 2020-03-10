export interface IPasswordRule {
    id: string;
    label: string;
    regexp?: RegExp;
    length?: number;
    isValid?: boolean;
}
export declare class PasswordRule {
    id: string;
    label: string;
    regexp?: RegExp;
    length?: number;
    isValid: boolean;
    constructor(data: IPasswordRule);
}
