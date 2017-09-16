import { WODispatcherConfiguration } from '../entities/wo-dispatcher-configuration.entity';
import { WOCommandSet } from '../entities/wo-command-set.entity';
export declare class WODispatcher {
    static dispatch(configuration: WODispatcherConfiguration[], command_set: WOCommandSet): void;
}
