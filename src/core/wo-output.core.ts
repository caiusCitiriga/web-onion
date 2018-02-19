

import { WOSeverityEnum } from '../enums/wo-severity.enum';
import { WebOnionSDK } from '../web-onion';
import { WOInput } from './wo-input.core';
import { WORenderer } from './wo-renderer.core';
import { GENERAL_CONF } from '../conf/general.conf';

export class WOOutput {

    /**
     * Shows the legacy loading screen (dummy).
     * 
     * @memberof WOOutput
     */
    public showInitializationScreen() {
        WORenderer.setCSS('body', [{ rule: 'background-color', value: '#000' }]);
        WORenderer.append('body', `<h1 class="wc-intialization">WebCLI is loading...<br><small>v${GENERAL_CONF.version}</small></h1>`);
    }

    /**
     * Prints a message to the console
     * 
     * @param {string} message 
     * @param {WOSeverityEnum} [severity=WOSeverityEnum.message] 
     * @memberof WOOutput
     */
    public printMessage(message: string, severity: WOSeverityEnum = WOSeverityEnum.message) {
        let message_wrapper = '';

        switch (severity) {
            case 0:
                message_wrapper = `<span class="wc-message wc-message-message"></span>`;
                break;
            case 1:
                message_wrapper = `<span class="wc-message wc-message-error"></span>`;
                break;
            case 2:
                message_wrapper = `<span class="wc-message wc-message-warn"></span>`;
                break;
            case 3:
                message_wrapper = `<span class="wc-message wc-message-info"></span>`;
                break;
            default:
                message_wrapper = `<span class="wc-message wc-message-message">${message}</span>`;
                break;
        }

        WORenderer.append('.wc-console', message_wrapper);
        WORenderer.append('.wc-message', message, true);
        WORenderer.append('.wc-console', '<br>');

        WORenderer.scrollTop('.wc-console', WORenderer.getElement('.wc-console').scrollHeight); //scroll to bottom
    }

    /**
     * Clears the console
     * 
     * @memberof WOOutput
     */
    public clearConsole() {
        WORenderer.empty('.wc-console');
    }

    /**
     * Prints a message styled as title according
     * to the current style in use
     * 
     * @param {string} text 
     * @memberof WOOutput
     */
    public printTitle(text: string) {
        this.printMessage(`<h1 class="wc-title">${text}</h1>`);
    }

    /**
     * Prints a message styled as title, surrounded
     * with borders according to the current style in use
     * 
     * @param {string} text 
     * @param {boolean} [full_width=true] 
     * @memberof WOOutput
     */
    public printBoxedTitle(text: string, full_width: boolean = true) {
        this.printMessage(`<div class="wc-title-width-wrapper"><h1 class="wc-title-boxed-${full_width ? 'full-width' : 'compact'}">${text}</h1></div>`);
    }

    /**
     * 
     * 
     * @param {string} text 
     * @memberof WOOutput
     */
    public printSubtitle(text: string) {
        throw Error('Not implemented');
    }

    /**
     * Prints a list of key value pairs.
     * 
     * @param {{ key: string, value: string }[]} set 
     * @param {string} [space_char='&nbsp;'] 
     * @memberof WOOutput
     */
    public printKeyValuePairs(set: { key: string, value: string }[], space_char: string = '&nbsp;') {
        let longestKeyLen = set[0].key.length;
        set.forEach(s => longestKeyLen = s.key.length > longestKeyLen ? s.key.length : longestKeyLen);

        set.forEach(pair => {
            let spaces = space_char;
            for (let i = 0; i < (longestKeyLen - pair.key.length); i++) {
                spaces += space_char;
            }

            WORenderer.append('.wc-console', `<span class="wc-key">${pair.key}:</span><span class="wc-value">${spaces + pair.value}</span><hr class="wc-kv-sep">`);
        });
    }
}