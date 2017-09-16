import { WODispatcherConfiguration } from '../entities/wo-dispatcher-configuration.entity';
export declare class WOParser {
    private static command_set;
    /**
     *
     *
     * @static
     * @param {WODispatcherConfiguration[]} dispatcher_conf
     * @memberof WOParser
     */
    static startParser(dispatcher_conf: WODispatcherConfiguration[]): void;
    /**
     *
     *
     * @private
     * @static
     * @memberof WOParser
     */
    private static resetCommandSet();
}
