import { WOCssRuleSet } from '../entities/wo-css-rule-set.entity';

export class WORenderer {

    public static append(to: string, element: HTMLElement | string, appendToLastMatch = false) {
        appendToLastMatch ? $(to).last().append(element) : $(to).append(element);
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

    public static listenForKeyPressOnElement(elememt: string, keyCodeToCatch: number, callback: () => void, disposeListenerAfterCallbackExec = false) {
        const el = $(elememt).on('keypress', k => {
            //  If the keycode is different that the one to catch or if the element is in wait mode
            if (k.keyCode === keyCodeToCatch) {
                callback();
                disposeListenerAfterCallbackExec ? el.off() : null;
            }
        });
    }

    public static listenForDblClickOnElement(element: string, callback: () => void) {
        $(element).dblclick(() => callback());
    }

    public static hasClass(element: string, className: string): boolean {
        return $(element).hasClass(className);
    }

    public static addClass(to: string, className: string) {
        $(to).addClass(className);
    }

    public static removeClass(element: string, className: string) {
        $(element).removeClass(className);
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