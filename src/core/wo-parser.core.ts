import { WebOnionSDK } from '../web-onion';

import { WOInput } from './wo-input.core';
import { WODispatcher } from './wo-dispatcher.core';

import { WODispatcherConfiguration } from '../entities/wo-dispatcher-configuration.entity';
import { WOSeverityEnum } from '../enums/wo-severity.enum';
import { WOFlag } from '../entities/wo-flag.entity';
import { WORenderer } from './wo-renderer.core';
import { WOCommandSet } from '../entities/wo-command-set.entity';

export class WOParser {

    private sdk: WebOnionSDK;
    private history_index: number;
    private session_commands_history: string[] = [];

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

            this.dispatchCommand(dispatcher_conf);
            this.resetCommandSet();
            this.clearCommandInputIfNeeded();
        });

        //  This is the keycode for the ARROW-UP
        //  TODO set this into the configuration, so the developer can change it
        WORenderer.listenForKeyDownOnElement('input.wc-input-field', 40, () => {
            !this.history_index && this.history_index !== 0 ? this.history_index = 0 : this.history_index++;
            this.history_index > (this.session_commands_history.length - 1) ? this.history_index = (this.session_commands_history.length - 1) : null;

            const command = this.session_commands_history[this.history_index];
            if (!command) { return; }
            WORenderer.setVal('input.wc-input-field', command);

        });

        //  This is the keycode for the ARROW-DOWN
        //  TODO set this into the configuration, so the developer can change it
        WORenderer.listenForKeyDownOnElement('input.wc-input-field', 38, () => {
            !this.history_index && this.history_index !== 0 ? this.history_index = 0 : this.history_index--;
            this.history_index < 0 ? this.history_index = 0 : null;

            const command = this.session_commands_history[this.history_index];
            if (!command) { return; }
            WORenderer.setVal('input.wc-input-field', command);
        });
    }


    /**
     * Assigns the command set internally
     * 
     * @private
     * @memberof WOParser
     */
    private assignCommandSet(): void {
        const raw_command = this.extractRAWCommand();
        this.addCommandToHistory(raw_command);
        this.command_set = this.parseRAWCommand(raw_command);
    }


    /**
     * Extracts the command from the input field
     * 
     * @private
     * @returns {string} 
     * @memberof WOParser
     */
    private extractRAWCommand(): string {
        return WORenderer.getVal('input.wc-input-field') as string;
    }

    /**
     * Assigns the command set internally
     * 
     * @private
     * @param {string} raw_command 
     * @returns {WOCommandSet} 
     * @memberof WOParser
     */
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
     * Pushes the current command string in the session's commands histroy
     * 
     * @private
     * @memberof WOParser
     */
    private addCommandToHistory(raw_command: string): void {
        this.session_commands_history.push(raw_command);

        //  Increase the history index, to keep it up with the last command.
        this.history_index = this.session_commands_history.length;
    }

    /**
     * Dispatches the command using the SDK's dispatcher
     * 
     * @private
     * @param {WODispatcherConfiguration[]} dispatcher_conf 
     * @memberof WOParser
     */
    private dispatchCommand(dispatcher_conf: WODispatcherConfiguration[]): void {
        this.sdk.dispatcher_lib.dispatch(dispatcher_conf, this.command_set, this.sdk);
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

    /**
     * If the configs is set to clear the input, it will clear it
     * 
     * @private
     * @memberof WOParser
     */
    private clearCommandInputIfNeeded(): void {
        this.sdk.clearAfterSubmit ? this.sdk.input_lib.clearInput() : null;
    }

    /**
     * If the input is in "wait mode", meaning that the command should be treated as a info from the user.
     * If so, it will have a wc-input-wait class on it and returns TRUE
     * 
     * @private
     * @returns {boolean} 
     * @memberof WOParser
     */
    private inputIsInWaitMode(): boolean {
        return $('input.wc-input-field').hasClass('wc-input-wait');
    }
}