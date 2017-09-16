import { WODispatcherConfiguration } from '../entities/wo-dispatcher-configuration.entity';
import { WOCommandSet } from '../entities/wo-command-set.entity';
export declare class WODispatcher {
    /**
     *
     *
     * @static
     * @param {WODispatcherConfiguration[]} configuration
     * @param {WOCommandSet} command_set
     * @returns
     * @memberof WODispatcher
     */
    static dispatch(configuration: WODispatcherConfiguration[], command_set: WOCommandSet): void;
}
