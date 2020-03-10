export declare const getInitials: (username: string) => string;
export declare const getValidLanguageText: (text: string) => string;
export declare const getAvatarColor: (id: string) => string;
/**
 * Code coming from https://github.com/darkskyapp/string-hash
 * This hashing function returns a number between 0 and 4294967295 (inclusive).
 */
export declare const hash: (str: string) => number;
