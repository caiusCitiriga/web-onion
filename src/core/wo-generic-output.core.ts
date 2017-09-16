import * as $ from 'jquery';

import { WOSeverityEnum } from '../enums/wo-severity.enum';
import { WebOnionSDK } from '../web-onion';
import { WOInput } from './wo-input.core';

export class WOGenericOutput {
    /**
     * Shows the loading screen
     */
    public static showInitializationScreen() {
        $('body').css('background-color', '#000');
        $('body').append(`<h1 class="wc-intialization">WebCLI is loading...<br><small>v1.0.0</small></h1>`);
    }

    /**
     * Prints a message to the console. 
     * The second optional parameter states the severity. (0: msg, 1: err, 2: warn, 3: info)
     *
     * @param {string} message 
     * @param {number} [severity=0] 1: error, 2: warning, 3: info
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
     * Clears the console
     */
    public static clearConsole() {
        $('.wc-console').empty();
    }

    /**
     * Prints a title on the console
     *
     * @param {string} text the text for the title
     */
    public static printTitle(text: string) {
        WOGenericOutput.printMessage(`<h1 class="wc-title">${text}</h1>`);
    }

    /**
     * Prints a title with the borders around.
     *
     * @param {string} text the text for the title
     * @param {boolean} full_width if the box should be 100% width or not
     */
    public static printBoxedTitle(text: string, full_width: boolean = true) {
        WOGenericOutput.printMessage(`<div class="wc-title-width-wrapper"><h1 class="wc-title-boxed-${full_width ? 'full-width' : 'compact'}">${text}</h1></div>`);
    }

    /**
     * Prints a sub-tile
     *
     * @param {string} text the text for the title
     */
    public static printSubtitle(text: string) {
        throw Error('Not implemented');
    }

    /**
     * Takes an array of key-value objects and prints a list
     * on the console, illuminating the keys.
     *
     * @param {object} set an array of key-values Array<{key: string, value: string}>
     * @param {string} space_char the string used for the space
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