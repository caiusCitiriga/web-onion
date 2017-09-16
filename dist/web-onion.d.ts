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
        loading_screen_time?: number | undefined;
    };
}

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

export declare class WOGenericOutput {
    /**
     *
     *
     * @static
     * @memberof WOGenericOutput
     */
    static showInitializationScreen(): void;
    /**
     *
     *
     * @static
     * @param {string} message
     * @param {WOSeverityEnum} [severity=WOSeverityEnum.message]
     * @memberof WOGenericOutput
     */
    static printMessage(message: string, severity?: WOSeverityEnum): void;
    /**
     *
     *
     * @static
     * @memberof WOGenericOutput
     */
    static clearConsole(): void;
    /**
     *
     *
     * @static
     * @param {string} text
     * @memberof WOGenericOutput
     */
    static printTitle(text: string): void;
    /**
     *
     *
     * @static
     * @param {string} text
     * @param {boolean} [full_width=true]
     * @memberof WOGenericOutput
     */
    static printBoxedTitle(text: string, full_width?: boolean): void;
    /**
     *
     *
     * @static
     * @param {string} text
     * @memberof WOGenericOutput
     */
    static printSubtitle(text: string): void;
    /**
     *
     *
     * @static
     * @param {{ key: string, value: string }[]} set
     * @param {string} [space_char='&nbsp;']
     * @memberof WOGenericOutput
     */
    static printKeyValuePairs(set: {
        key: string;
        value: string;
    }[], space_char?: string): void;
}

export declare class WOInput {
    /**
     *
     *
     * @static
     * @memberof WOInput
     */
    static clearInput(): void;
    /**
     *
     *
     * @static
     * @memberof WOInput
     */
    static focusInput(): void;
    /**
     *
     *
     * @static
     * @param {string} message
     * @param {string} dataKey
     * @param {() => void} callback
     * @param {WOSeverityEnum} [severity=WOSeverityEnum.message]
     * @memberof WOInput
     */
    static prompt(message: string, dataKey: string, callback: () => void, severity?: WOSeverityEnum): void;
    /**
     *
     *
     * @static
     * @param {string} dataKey
     * @returns {(string | null)}
     * @memberof WOInput
     */
    static getInputData(dataKey: string): string | null;
    /**
     *
     *
     * @private
     * @static
     * @param {() => void} callback
     * @param {string} dataKey
     * @memberof WOInput
     */
    private static handleCallbackExecution(callback, dataKey);
}

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


export declare class WebOnionSDK {
    private static configuration;
    constructor();
    /**
     *
     *
     * @readonly
     * @static
     * @memberof WebOnionSDK
     */
    static readonly dispatcherConfiguration: WODispatcherConfiguration[];
    /**
     *
     *
     * @readonly
     * @static
     * @type {boolean}
     * @memberof WebOnionSDK
     */
    static readonly clearAfterSubmit: boolean;
    /**
     *
     * @param {boolean} value
     * @memberof WebOnionSDK
     */
    dbl_click_focus_to_input: boolean;
    /**
     *
     * @param {boolean} value
     * @memberof WebOnionSDK
     */
    clear_after_submit: boolean;
    /**
     *
     *
     * @memberof WebOnionSDK
     */
    load_timeout: number;
    /**
     *
     *
     * @memberof WebOnionSDK
     */
    initialize(): void;
    /**
     *
     *
     * @param {WODispatcherConfiguration[]} sets
     * @memberof WebOnionSDK
     */
    addSetsToDispatcher(sets: WODispatcherConfiguration[]): void;
    /**
     *
     *
     * @private
     * @memberof WebOnionSDK
     */
    private clearDocument();
    /**
     *
     *
     * @private
     * @memberof WebOnionSDK
     */
    private createConsole();
}
export declare const WOIn: WOInput;
export declare const WOGout: WOGenericOutput;
