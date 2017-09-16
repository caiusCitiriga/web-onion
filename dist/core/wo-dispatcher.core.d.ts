import { WODispatcherConfiguration } from '../entities/wo-dispatcher-configuration.entity';
import { WOCommandSet } from '../entities/wo-command-set.entity';
import { WebOnionSDK } from '../web-onion';
export declare class WODispatcher {
    dispatch(configuration: WODispatcherConfiguration[], command_set: WOCommandSet, sdk: WebOnionSDK): void;
}
