"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WORenderer {
    static append(to, element, appendToLastMatch = false) {
        appendToLastMatch ? $(to).last().append(element) : $(to).append(element);
    }
    static setVal(to, newVal) {
        $(to).val(newVal);
    }
    static getVal(of) {
        return $(of).val();
    }
    static getElement(whichElement, whichOneIfMultiple = 0) {
        return $(whichElement)[whichOneIfMultiple];
    }
    static setFocus(to) {
        $(to).focus();
    }
    static setCSS(to, cssRulesSet) {
        cssRulesSet.forEach(rs => {
            $(to).css(rs.rule, rs.value);
        });
    }
    static listenForKeyPressOnElement(elememt, keyCodeToCatch, callback, disposeListenerAfterCallbackExec = false) {
        const el = $(elememt).on('keypress', k => {
            //  If the keycode is different that the one to catch or if the element is in wait mode
            if (k.keyCode === keyCodeToCatch) {
                callback();
                disposeListenerAfterCallbackExec ? el.off() : null;
            }
        });
    }
    static listenForKeyDownOnElement(elememt, keyCodeToCatch, callback, disposeListenerAfterCallbackExec = false) {
        const el = $(elememt).on('keydown', k => {
            //  If the keycode is different that the one to catch or if the element is in wait mode
            if (k.keyCode === keyCodeToCatch) {
                k.preventDefault();
                callback();
                disposeListenerAfterCallbackExec ? el.off() : null;
            }
        });
    }
    static listenForDblClickOnElement(element, callback) {
        $(element).dblclick(() => callback());
    }
    static hasClass(element, className) {
        return $(element).hasClass(className);
    }
    static addClass(to, className) {
        $(to).addClass(className);
    }
    static removeClass(element, className) {
        $(element).removeClass(className);
    }
    static remove(element) {
        $(element).remove();
    }
    static after(what, elementToSet) {
        $(what).after(elementToSet);
    }
    static scrollTop(onWhichElement, scrollAmount) {
        $(onWhichElement).scrollTop(scrollAmount);
    }
    static empty(whichElement) {
        $(whichElement).empty();
    }
}
exports.WORenderer = WORenderer;
//# sourceMappingURL=wo-renderer.core.js.map