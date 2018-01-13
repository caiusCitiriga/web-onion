import { WODispatcherConfiguration } from '../entities/wo-dispatcher-configuration.entity';

import { WOSeverityEnum } from '../enums/wo-severity.enum';
import { WOCommandSet } from '../entities/wo-command-set.entity';

import { WebOnionSDK } from '../web-onion';
import { WOOutput } from './wo-output.core';

export class WODispatcher {

    /**
     * Takes the configuration containing all the available commands, the current command set,
     * and the sdk itself to read the user command, search it through all the available
     * commands in the configuration.
     * If a match is found the action binded to that command will be executed.
     * Otherwise an error on the console will be printed.
     * 
     * @param {WODispatcherConfiguration[]} configuration 
     * @param {WOCommandSet} command_set 
     * @param {WebOnionSDK} sdk 
     * @returns 
     * @memberof WODispatcher
     */
    public dispatch(configuration: WODispatcherConfiguration[], command_set: WOCommandSet, sdk: WebOnionSDK) {
        let action: any = null;

        configuration.forEach(cs => {
            //  Try direct command match
            if (command_set.command && cs.command.toLowerCase() === command_set.command.trim().toLowerCase()) {
                action = cs.action;
            }

            //  If the action is still null, try aliases match
            if (action === null && cs.aliases && cs.aliases.find((a: string) => a === command_set.command)) {
                action = cs.action;
            }
        });

        //  Last check, if action is still null, fire an invalid command error
        if (!action) {
            sdk.out_lib.printMessage('Invalid command', WOSeverityEnum.error);
            return;
        }

        action(command_set.flags);   // Exec the action providing the flags
    }
}