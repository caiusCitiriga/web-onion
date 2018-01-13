import { WOCssRuleSet } from '../entities/wo-css-rule-set.entity';
export declare class WORenderer {
    static append(to: string, element: HTMLElement | string, appendToLastMatch?: boolean): void;
    static addClass(to: string, className: string): void;
    static setVal(to: string, newVal: any): void;
    static getVal(of: string): any;
    static getElement(whichElement: string, whichOneIfMultiple?: number): HTMLElement;
    static setFocus(to: string): void;
    static setCSS(to: string, cssRulesSet: WOCssRuleSet[]): void;
    static listenForKeyPressOnElement(elememt: string, keyCodeToCatch: number, callback: () => void): void;
    static remove(element: string): void;
    static after(what: string, elementToSet: HTMLElement | string): void;
    static scrollTop(onWhichElement: string, scrollAmount: number): void;
    static empty(whichElement: string): void;
}
