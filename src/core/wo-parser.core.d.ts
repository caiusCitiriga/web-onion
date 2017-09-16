import { WODispatcherConfiguration } from '../entities/wo-dispatcher-configuration.entity';
export declare class WOParser {
    private static command_set;
    static startParser(dispatcher_conf: WODispatcherConfiguration[]): void;
    private static resetCommandSet();
}
