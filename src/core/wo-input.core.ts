import { WOSeverityEnum } from '../enums/wo-severity.enum';
import { WOOutput } from './wo-output.core';
import { WOParser } from './wo-parser.core';
import { WebOnionSDK } from '../web-onion';

export class WOInput {

    public clearInput() {
        $('input.wc-input-field').val('');
    }

    public focusInput() {
        $('input.wc-input-field').focus();
    }

    public prompt(
        message: string,
        sdk: WebOnionSDK,
        dataKey: string,
        callback: () => void,
        severity: WOSeverityEnum = WOSeverityEnum.message
    ) {
        this.clearInput();
        sdk.out_lib.printMessage(message, severity);
        this.handleCallbackExecution(sdk, callback, dataKey);
    }

    public getInputData(dataKey: string): string | null {
        return sessionStorage.getItem(`@wc-user-data-${dataKey}`) ? sessionStorage.getItem(`@wc-user-data-${dataKey}`) : null;
    }

    private handleCallbackExecution(sdk: WebOnionSDK, callback: () => void, dataKey: string) {
        $('input.wc-input-field').addClass('wc-input-wait'); // this will cause the parser to skip the data

        $('input.wc-input-field.wc-input-wait').on('keypress', k => {
            if (k.keyCode !== 13) { return; }

            const value = <string>$('input.wc-input-field').val();
            this.clearInput();
            sessionStorage.setItem(`@wc-user-data-${dataKey}`, value);

            $('input.wc-input-field.wc-input-wait')
                .remove();   // remove the previous input field

            $('.wc-input > .wc-input-pointer')
                .after('<input type="text" class="wc-input-field"/>');   // and replace it with a new one

            this.focusInput();
            sdk.parser_lib.startParser(sdk.dispatcherConfiguration, sdk);

            callback();
        });
    }
}