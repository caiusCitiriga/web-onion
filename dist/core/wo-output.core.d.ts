import { WOSeverityEnum } from '../enums/wo-severity.enum';
export declare class WOOutput {
    showInitializationScreen(): void;
    printMessage(message: string, severity?: WOSeverityEnum): void;
    clearConsole(): void;
    printTitle(text: string): void;
    printBoxedTitle(text: string, full_width?: boolean): void;
    printSubtitle(text: string): void;
    printKeyValuePairs(set: {
        key: string;
        value: string;
    }[], space_char?: string): void;
}
