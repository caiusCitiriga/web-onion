import { WOCssRuleSet } from '../entities/wo-css-rule-set.entity';
export declare class WORenderer {
    static append(to: string, element: HTMLElement | string, appendToLastMatch?: boolean): void;
    static setVal(to: string, newVal: any): void;
    static getVal(of: string): any;
    static getElement(whichElement: string, whichOneIfMultiple?: number): HTMLElement;
    static setFocus(to: string): void;
    static setCSS(to: string, cssRulesSet: WOCssRuleSet[]): void;
    static listenForKeyPressOnElement(elememt: string, keyCodeToCatch: number, callback: () => void, disposeListenerAfterCallbackExec?: boolean): void;
    static listenForDblClickOnElement(element: string, callback: () => void): void;
    static hasClass(element: string, className: string): boolean;
    static addClass(to: string, className: string): void;
    static removeClass(element: string, className: string): void;
    static remove(element: string): void;
    static after(what: string, elementToSet: HTMLElement | string): void;
    static scrollTop(onWhichElement: string, scrollAmount: number): void;
    static empty(whichElement: string): void;
}
