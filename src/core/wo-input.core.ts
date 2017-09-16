import * as $ from 'jquery';
import { WOSeverityEnum } from '../enums/wo-severity.enum';
import { WOGenericOutput } from './wo-generic-output.core';
import { WOParser } from './wo-parser.core';
import { WebOnionSDK } from '../web-onion';

export class WOInput {
    /**
     * 
     * 
     * @static
     * @memberof WOInput
     */
    public static clearInput() {
        $('input.wc-input-field').val('');
    }

    /**
     * 
     * 
     * @static
     * @memberof WOInput
     */
    public static focusInput() {
        $('input.wc-input-field').focus();
    }

    /**
     * 
     * 
     * @static
     * @param {string} message 
     * @param {string} dataKey 
     * @param {() => void} callback 
     * @param {WOSeverityEnum} [severity=WOSeverityEnum.message] 
     * @memberof WOInput
     */
    public static prompt(message: string, dataKey: string, callback: () => void, severity: WOSeverityEnum = WOSeverityEnum.message) {
        WOInput.clearInput();
        WOGenericOutput.printMessage(message, severity);
        WOInput.handleCallbackExecution(callback, dataKey);
    }

    /**
     * 
     * 
     * @static
     * @param {string} dataKey 
     * @returns {(string | null)} 
     * @memberof WOInput
     */
    public static getInputData(dataKey: string): string | null {
        return sessionStorage.getItem(`@wc-user-data-${dataKey}`) ? sessionStorage.getItem(`@wc-user-data-${dataKey}`) : null;
    }

    /**
     * 
     * 
     * @private
     * @static
     * @param {() => void} callback 
     * @param {string} dataKey 
     * @memberof WOInput
     */
    private static handleCallbackExecution(callback: () => void, dataKey: string) {
        $('input.wc-input-field').addClass('wc-input-wait'); // this will cause the parser to skip the data

        $('input.wc-input-field.wc-input-wait').on('keypress', k => {
            if (k.keyCode !== 13) { return; }

            const value = <string>$('input.wc-input-field').val();
            WOInput.clearInput();
            sessionStorage.setItem(`@wc-user-data-${dataKey}`, value);

            $('input.wc-input-field.wc-input-wait')
                .remove();   // remove the previous input field

            $('.wc-input > .wc-input-pointer')
                .after('<input type="text" class="wc-input-field"/>');   // and replace it with a new one

            WOInput.focusInput();
            WOParser.startParser(WebOnionSDK.dispatcherConfiguration);

            callback();
        });
    }
}