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

    public static setFocus(to: string) {
        $(to).focus();
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
}