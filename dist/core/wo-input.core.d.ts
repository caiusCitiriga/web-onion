import { WOSeverityEnum } from '../enums/wo-severity.enum';
import { WebOnionSDK } from '../web-onion';
export declare class WOInput {
    clearInput(): void;
    focusInput(): void;
    prompt(message: string, sdk: WebOnionSDK, dataKey: string, callback: () => void, severity?: WOSeverityEnum): void;
    getInputData(dataKey: string): string | null;
    private handleCallbackExecution(sdk, callback, dataKey);
}
