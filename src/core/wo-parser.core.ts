import { WebOnionSDK } from '../web-onion';

import { WOInput } from './wo-input.core';
import { WODispatcher } from './wo-dispatcher.core';

import { WOCommandSet } from '../entities/wo-command-set.entity';
import { WODispatcherConfiguration } from '../entities/wo-dispatcher-configuration.entity';
import { WOSeverityEnum } from '../enums/wo-severity.enum';
import { WOFlag } from '../entities/wo-flag.entity';
import { WORenderer } from './wo-renderer.core';

export class WOParser {

    private command_set: WOCommandSet = {
        command: null,
        flags: null
    };

    /**
     * Starts the parser.
     * 
     * @param {WODispatcherConfiguration[]} dispatcher_conf 
     * @param {WebOnionSDK} sdk 
     * @memberof WOParser
     */
    public startParser(dispatcher_conf: WODispatcherConfiguration[], sdk: WebOnionSDK) {
        WORenderer.listenForKeyPressOnElement('input.wc-input-field', 13, () => {
            if (this.inputIsInWaitMode()) {
                debugger;
                return;
            }
            const raw_command = WORenderer.getVal('input.wc-input-field') as string;

            this.command_set.command = raw_command.split(sdk.flagDelimiter) [0].trim(); //  This will take only what's before any flag

            const flags = raw_command.split(sdk.flagDelimiter);
            flags.shift(); // remove the command from the flags array;
            this.command_set.flags = flags.map(f => <WOFlag>{ flag: f.toLowerCase() });

            const checkResult = this.checkSuccessfulParse(this.command_set);
            if (!checkResult.isOk && checkResult.message) {
                sdk.out_lib.printMessage(checkResult.message, WOSeverityEnum.warning);
                return;
            }

            sdk.dispatcher_lib.dispatch(dispatcher_conf, this.command_set, sdk);
            this.resetCommandSet();

            sdk.clearAfterSubmit ? sdk.input_lib.clearInput() : null;
        });
    }

    /**
     * Resets the command set
     * 
     * @private
     * @memberof WOParser
     */
    private resetCommandSet() {
        this.command_set.command = null;
        this.command_set.flags = null;
    }

    private checkSuccessfulParse(cs: WOCommandSet): { isOk: boolean, message?: string } {
        if (cs.flags && cs.flags[0] && cs.flags[0].flag === '') {
            //  This may be caused when the flag delimiter is '-' and the user uses '--'.
            return { isOk: false, message: 'The flag/s provided cannot be used. This may happen when the flag delimiter is "-" but you\'ve used "--"' };
        }

        return { isOk: true };
    }

    private inputIsInWaitMode(): boolean {
        return $('input.wc-input-field').hasClass('wc-input-wait');
    }
}