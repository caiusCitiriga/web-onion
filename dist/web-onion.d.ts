import { WODispatcherConfiguration } from './entities/wo-dispatcher-configuration.entity';
import { WOOutput } from './core/wo-output.core';
import { WOInput } from './core/wo-input.core';
import { WODispatcher } from './core/wo-dispatcher.core';
import { WOParser } from './core/wo-parser.core';
export declare class WebOnionSDK {
    readonly out_lib: WOOutput;
    readonly input_lib: WOInput;
    readonly parser_lib: WOParser;
    readonly dispatcher_lib: WODispatcher;
    private configuration;
    constructor();
    readonly dispatcherConfiguration: WODispatcherConfiguration[];
    readonly clearAfterSubmit: boolean;
    dbl_click_focus_to_input: boolean;
    clear_after_submit: boolean;
    load_timeout: number;
    initialize(): void;
    addSetsToDispatcher(sets: WODispatcherConfiguration[]): void;
    private clearDocument();
    private createConsole();
}
