import { WODispatcherConfiguration } from './entities/wo-dispatcher-configuration.entity';
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
