import { WebOnionSDK } from '../web-onion';
import { WODispatcherConfiguration } from '../entities/wo-dispatcher-configuration.entity';
export declare class WOParser {
    private command_set;
    startParser(dispatcher_conf: WODispatcherConfiguration[], sdk: WebOnionSDK): void;
    private resetCommandSet();
}
