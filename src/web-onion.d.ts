import { WODispatcherConfiguration } from './entities/wo-dispatcher-configuration.entity';
export declare class WebOnionSDK {
    private static configuration;
    constructor();
    static readonly dispatcherConfiguration: WODispatcherConfiguration[];
    static readonly clearAfterSubmit: boolean;
    addSetsToDispatcher(sets: WODispatcherConfiguration[]): void;
    private clearDocument();
    private createConsole();
}
