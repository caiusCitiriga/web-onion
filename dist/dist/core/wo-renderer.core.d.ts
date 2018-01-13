export declare class WORenderer {
    static append(to: string, element: HTMLElement | string, appendToLastMatch?: boolean): void;
    static addClass(to: string, className: string): void;
    static setVal(to: string, newVal: any): void;
    static getVal(of: string): any;
    static setFocus(to: string): void;
    static listenForKeyPressOnElement(elememt: string, keyCodeToCatch: number, callback: () => void): void;
    static remove(element: string): void;
    static after(what: string, elementToSet: HTMLElement | string): void;
}
