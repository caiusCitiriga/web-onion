declare const $: any;

import { WOSeverityEnum } from '../enums/wo-severity.enum';
import { WebOnionSDK } from '../web-onion';
import { WOInput } from './wo-input.core';

export class WOGenericOutput {
    /**
     * 
     * 
     * @static
     * @memberof WOGenericOutput
     */
    public static showInitializationScreen() {
        $('body').css('background-color', '#000');
        $('body').append(`<h1 class="wc-intialization">WebCLI is loading...<br><small>v1.0.0</small></h1>`);
    }

    /**
     * 
     * 
     * @static
     * @param {string} message 
     * @param {WOSeverityEnum} [severity=WOSeverityEnum.message] 
     * @memberof WOGenericOutput
     */
    public static printMessage(message: string, severity: WOSeverityEnum = WOSeverityEnum.message) {
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
                message_wrapper = `<span class="wc-message wc-message-message"></span>`;
                break;
        }

        $('.wc-console').append(message_wrapper);
        $('.wc-message').last().append(message);
        $('.wc-console').append(`<br>`);

        $('.wc-console').scrollTop($('.wc-console')[0].scrollHeight); //scroll to bottom
    }

    /**
     * 
     * 
     * @static
     * @memberof WOGenericOutput
     */
    public static clearConsole() {
        $('.wc-console').empty();
    }

    /**
     * 
     * 
     * @static
     * @param {string} text 
     * @memberof WOGenericOutput
     */
    public static printTitle(text: string) {
        WOGenericOutput.printMessage(`<h1 class="wc-title">${text}</h1>`);
    }

    /**
     * 
     * 
     * @static
     * @param {string} text 
     * @param {boolean} [full_width=true] 
     * @memberof WOGenericOutput
     */
    public static printBoxedTitle(text: string, full_width: boolean = true) {
        WOGenericOutput.printMessage(`<div class="wc-title-width-wrapper"><h1 class="wc-title-boxed-${full_width ? 'full-width' : 'compact'}">${text}</h1></div>`);
    }

    /**
     * 
     * 
     * @static
     * @param {string} text 
     * @memberof WOGenericOutput
     */
    public static printSubtitle(text: string) {
        throw Error('Not implemented');
    }

    /**
     * 
     * 
     * @static
     * @param {{ key: string, value: string }[]} set 
     * @param {string} [space_char='&nbsp;'] 
     * @memberof WOGenericOutput
     */
    public static printKeyValuePairs(set: { key: string, value: string }[], space_char: string = '&nbsp;') {
        const longestKeyLen = <number>set.reduce((p, c) => p < c.key.length ? c.key.length : false, 0);
        set.forEach(pair => {
            let spaces = space_char;
            for (let i = 0; i < (longestKeyLen - pair.key.length); i++) {
                spaces += space_char;
            }

            $('.wc-console').append(`<span class="wc-key">${pair.key}:</span><span class="wc-value">${spaces + pair.value}</span><hr class="wc-kv-sep">`);
        });
    }
}