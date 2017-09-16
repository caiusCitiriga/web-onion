
export declare enum WOSeverityEnum {
    message = 0,
    error = 1,
    warning = 2,
    info = 3,
}

export declare class WOCommandSet {
    command: string | null;
    flags: string[] | null;
}

export declare class WODispatcherConfiguration {
    command: string;
    aliases?: string[];
    flags?: string[];
    action: (flags: string[]) => void;
}

export declare class WOSDKConfiguration {
    dispatcher: WODispatcherConfiguration[];
    input_field: {
        clear_after_submit: boolean;
    };
    general: {
        theme: string;
    };
}

export declare class WODispatcher {
    static dispatch(configuration: WODispatcherConfiguration[], command_set: WOCommandSet): void;
}

export declare class WOGenericOutput {
    static showInitializationScreen(): void;
    static printMessage(message: string, severity?: WOSeverityEnum): void;
    static clearConsole(): void;
    static printTitle(text: string): void;
    static printBoxedTitle(text: string, full_width?: boolean): void;
    static printSubtitle(text: string): void;
    static printKeyValuePairs(set: {
        key: string;
        value: string;
    }[], space_char?: string): void;
}

export declare class WOInput {
    static clearInput(): void;
    static focusInput(): void;
    static prompt(message: string, dataKey: string, callback: () => void, severity?: WOSeverityEnum): void;
    static getInputData(dataKey: string): string;
    private static handleCallbackExecution(callback, dataKey);
}

export declare class WOParser {
    private static command_set;
    static startParser(dispatcher_conf: WODispatcherConfiguration[]): void;
    private static resetCommandSet();
}

export declare class WebOnionSDK {
    private static configuration;
    constructor();
    static readonly dispatcherConfiguration: WODispatcherConfiguration[];
    static readonly clearAfterSubmit: boolean;
    addSetsToDispatcher(sets: WODispatcherConfiguration[]): void;
    private clearDocument();
    private createConsole();
}