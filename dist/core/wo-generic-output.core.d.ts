import { WOSeverityEnum } from '../enums/wo-severity.enum';
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
