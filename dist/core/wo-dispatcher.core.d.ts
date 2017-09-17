import { WODispatcherConfiguration } from '../entities/wo-dispatcher-configuration.entity';
import { WOCommandSet } from '../entities/wo-command-set.entity';
import { WebOnionSDK } from '../web-onion';
export declare class WODispatcher {
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
    dispatch(configuration: WODispatcherConfiguration[], command_set: WOCommandSet, sdk: WebOnionSDK): void;
}
