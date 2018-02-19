import { WOCommandSet } from './../entities/wo-command-set.entity';
import { WebOnionSDK } from '../web-onion';

import { WOInput } from './wo-input.core';
import { WODispatcher } from './wo-dispatcher.core';

import { WODispatcherConfiguration } from '../entities/wo-dispatcher-configuration.entity';
import { WOSeverityEnum } from '../enums/wo-severity.enum';
import { WOFlag } from '../entities/wo-flag.entity';
import { WORenderer } from './wo-renderer.core';

export class WOParser {

    private sdk: WebOnionSDK;
    private history_index = 0;
    private session_history: WOCommandSet[] = [];

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
        this.sdk = sdk;

        WORenderer.listenForKeyPressOnElement('input.wc-input-field', 13, () => {
            if (this.inputIsInWaitMode()) { return; }

            this.assignCommandSet();

            //  TODO handle a missing required flag (like echo command)
            //  TODO handle wrong flag delimiters (warn user)

            this.sdk.dispatcher_lib.dispatch(dispatcher_conf, this.command_set, this.sdk);
            this.resetCommandSet();

            sdk.clearAfterSubmit ? sdk.input_lib.clearInput() : null;
        });
    }

    private assignCommandSet(): void {
        this.command_set = this.parseRAWCommand(WORenderer.getVal('input.wc-input-field'));
    }

    private parseRAWCommand(raw_command: string): WOCommandSet {
        const command_set: WOCommandSet = {
            command: null,
            flags: null
        };

        command_set.command = raw_command.split(this.sdk.flagDelimiter)[0].trim(); //  This will take only what's before any flag

        const flags = raw_command.split(this.sdk.flagDelimiter);
        flags.shift(); // remove the command from the flags array;
        command_set.flags = flags.map(f => <WOFlag>{ flag: f.toLowerCase() });

        return command_set;
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

    private inputIsInWaitMode(): boolean {
        return $('input.wc-input-field').hasClass('wc-input-wait');
    }
}