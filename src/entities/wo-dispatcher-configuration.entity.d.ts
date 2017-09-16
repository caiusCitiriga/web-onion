export declare class WODispatcherConfiguration {
    command: string;
    aliases?: string[];
    flags?: string[];
    action: (flags: string[]) => void;
}
