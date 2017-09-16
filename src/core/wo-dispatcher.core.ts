import { WODispatcherConfiguration } from '../entities/wo-dispatcher-configuration.entity';
import { WOCommandSet } from '../entities/wo-command-set.entity';
import { WOGenericOutput } from './wo-generic-output.core';

export class WODispatcher {
    /**
     * 
     * 
     * @static
     * @param {WODispatcherConfiguration[]} configuration 
     * @param {WOCommandSet} command_set 
     * @returns 
     * @memberof WODispatcher
     */
    public static dispatch(configuration: WODispatcherConfiguration[], command_set: WOCommandSet) {
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
            WOGenericOutput.printMessage('Invalid command', 1);
            return;
        }

        action(command_set.flags);   // Exec the action providing the flags
    }
}