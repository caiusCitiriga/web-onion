import { WOCssRuleSet } from '../entities/wo-css-rule-set.entity';

export class WORenderer {

    public static append(to: string, element: HTMLElement | string, appendToLastMatch = false) {
        appendToLastMatch ? $(to).last().append(element) : $(to).append(element);
    }

    public static addClass(to: string, className: string) {
        $(to).addClass(className);
    }

    public static setVal(to: string, newVal: any) {
        $(to).val(newVal);
    }

    public static getVal(of: string): any {
        return $(of).val();
    }

    public static getElement(whichElement: string, whichOneIfMultiple = 0): HTMLElement {
        return $(whichElement) [whichOneIfMultiple];
    }

    public static setFocus(to: string) {
        $(to).focus();
    }

    public static setCSS(to: string, cssRulesSet: WOCssRuleSet[]) {
        cssRulesSet.forEach(rs => {
            $(to).css(rs.rule, rs.value);
        });
    }

    public static listenForKeyPressOnElement(elememt: string, keyCodeToCatch: number, callback: () => void) {
        $(elememt).on('keypress', k => k.keyCode === 13 ? callback() : null);
    }

    public static remove(element: string) {
        $(element).remove();
    }

    public static after(what: string, elementToSet: HTMLElement | string) {
        $(what).after(elementToSet);
    }

    public static scrollTop(onWhichElement: string, scrollAmount: number) {
        $(onWhichElement).scrollTop(scrollAmount);
    }

    public static empty(whichElement: string) {
        $(whichElement).empty();
    }
}